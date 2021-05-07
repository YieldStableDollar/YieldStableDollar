import { Fetcher, Route, Token } from '@heshiswap/sdk';
import { Configuration } from './config';
import { Bank, ContractName, TokenStat, TreasuryAllocationTime } from './types';
import { BigNumber, Contract, ethers, Overrides, utils } from 'ethers';
import { decimalToBalance } from './ether-utils';
import { TransactionResponse } from '@ethersproject/providers';
import ERC20 from './ERC20';
import { getDisplayBalance } from '../utils/formatBalance';
import { getDefaultProvider } from '../utils/provider';
import IUniswapV2PairABI from './IUniswapV2Pair.abi.json';

/**
 * An API module of Yield Stable Dollar contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class BasisCash {
  myAccount: string;
  provider: ethers.providers.Web3Provider;
  signer?: ethers.Signer;
  config: Configuration;
  contracts: { [name: string]: Contract };
  externalTokens: { [name: string]: ERC20 };
  boardroomVersionOfUser?: string;

  bacDai: Contract;
  YSD: ERC20;
  YSS: ERC20;
  YSB: ERC20;

  constructor(cfg: Configuration) {
    const { deployments, externalTokens } = cfg;
    const provider = getDefaultProvider();

    // loads contracts from deployments
    this.contracts = {};
    for (const [name, deployment] of Object.entries(deployments)) {
      this.contracts[name] = new Contract(deployment.address, deployment.abi, provider);
    }
    this.externalTokens = {};
    for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
      this.externalTokens[symbol] = new ERC20(address, provider, symbol, decimal); // TODO: add decimal
    }
    this.YSD = new ERC20(deployments.Cash.address, provider, 'YSD');
    this.YSS = new ERC20(deployments.Share.address, provider, 'YSS');
    this.YSB = new ERC20(deployments.Bond.address, provider, 'YSB');

    // Uniswap V2 Pair
    this.bacDai = new Contract(
      externalTokens['YSD_USDT-UNI-LPv2'][0],
      IUniswapV2PairABI,
      provider,
    );

    this.config = cfg;
    this.provider = provider;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);

    this.signer = newProvider.getSigner(0);
    this.myAccount = account;
    for (const [name, contract] of Object.entries(this.contracts)) {
      this.contracts[name] = contract.connect(this.signer);
    }
    const tokens = [this.YSD, this.YSS, this.YSB, ...Object.values(this.externalTokens)];
    for (const token of tokens) {
      token.connect(this.signer);
    }
    this.bacDai = this.bacDai.connect(this.signer);
    console.log(`🔓 Wallet is unlocked. Welcome, ${account}!`);
    this.fetchBoardroomVersionOfUser()
      .then((version) => (this.boardroomVersionOfUser = version))
      .catch((err) => {
        console.error(`Failed to fetch boardroom version: ${err.stack}`);
        this.boardroomVersionOfUser = 'latest';
      });
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  gasOptions(gas: BigNumber): Overrides {
    const multiplied = Math.floor(gas.toNumber() * this.config.gasLimitMultiplier);
    console.log(`⛽️ Gas multiplied: ${gas} -> ${multiplied}`);
    return {
      gasLimit: BigNumber.from(multiplied),
    };
  }

  /**
   * @returns Yield Stable Dollar (YSD) stats from Uniswap.
   * It may differ from the YSD price used on Treasury (which is calculated in TWAP)
   */
  async getCashStatFromUniswap(): Promise<TokenStat> {
    const supply = await this.YSD.displayedTotalSupply();
    return {
      priceInBUSD: await this.getTokenPriceFromUniswap(this.YSD),
      totalSupply: supply,
    };
  }

  /**
   * @returns Estimated Yield Stable Dollar (YSD) price data,
   * calculated by 1-day Time-Weight Averaged Price (TWAP).
   */
  async getCashStatInEstimatedTWAP(): Promise<TokenStat> {
    const { SeigniorageOracle } = this.contracts;

    const expectedPrice = await SeigniorageOracle.expectedPrice(
      this.YSD.address,
      ethers.utils.parseEther('1'),
    );

    const totalSupply = await this.YSD.displayedTotalSupply();
    return {
      priceInBUSD: getDisplayBalance(expectedPrice, 6),
      totalSupply,
    };
  }

  async getCashPriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getSeigniorageOraclePrice();
  }

  async getBondOraclePriceInLastTWAP(): Promise<BigNumber> {
    const { Treasury } = this.contracts;
    return Treasury.getBondOraclePrice();
  }

  async getBondStat(): Promise<TokenStat> {
    const decimals = BigNumber.from(10).pow(6);

    const cashPrice: BigNumber = await this.getBondOraclePriceInLastTWAP();
    const bondPrice = cashPrice.pow(2).div(decimals);

    return {
      priceInBUSD: getDisplayBalance(bondPrice, 6),
      totalSupply: await this.YSB.displayedTotalSupply(),
    };
  }

  async getShareStat(): Promise<TokenStat> {
    return {
      priceInBUSD: await this.getTokenPriceFromUniswap(this.YSS),
      totalSupply: await this.YSS.displayedTotalSupply(),
    };
  }

  async getTokenPriceFromUniswap(tokenContract: ERC20): Promise<string> {
    await this.provider.ready;

    const { chainId } = this.config;
    const { USDT } = this.config.externalTokens;
    const dai = new Token(chainId, USDT[0], USDT[1]);
    const token = new Token(chainId, tokenContract.address, 18);

    try {
      const daiToToken = await Fetcher.fetchPairData(dai, token, this.provider);
      const priceInBUSD = new Route([daiToToken], token);
      return priceInBUSD.midPrice.toSignificant(3);
    } catch (err) {
      console.error(`Failed to fetch token price of ${tokenContract.symbol}: ${err}`);
    }
  }

  /**
   * Buy bonds with cash.
   * @param amount amount of cash to purchase bonds with.
   */
  async buyBonds(amount: string | number, cashPrice: BigNumber): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    console.log(`Buy ${amount} bonds for cashPrice: ${utils.formatUnits(cashPrice)}`);
    try {
      const res = await Treasury.buyBonds(decimalToBalance(amount), cashPrice);
      return res;
    } catch (error) {
      await Treasury.callStatic
        .buyBonds(decimalToBalance(amount), cashPrice)
        .catch((callError) => {
          console.error('Error happened when buyBonds, reason: ', callError.reason);
          throw callError;
          // if (callError.reason) throw new Error(callError.reason);
          // else throw new Error('Unknown error, please contact devs ASAP');
        });
    }
  }

  /**
   * Redeem bonds for cash.
   * @param amount amount of bonds to redeem.
   */
  async redeemBonds(amount: string, targetPrice: BigNumber): Promise<TransactionResponse> {
    const { Treasury } = this.contracts;
    try {
      const res = await Treasury.redeemBonds(decimalToBalance(amount), targetPrice);
      return res;
    } catch (error) {
      await Treasury.callStatic
        .redeemBonds(decimalToBalance(amount), targetPrice)
        .catch((callError) => {
          console.error('redeemBonds::callError::reason', callError.reason);
          console.error('redeemBonds::callError', callError);
          throw callError;
        });
    }
  }

  async earnedFromBank(poolName: ContractName, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[poolName];
    try {
      return await pool.earned(account);
    } catch (err) {
      console.error(`Failed to call earned() on pool ${pool.address}: ${err.stack}`);
      return BigNumber.from(0);
    }
  }

  async stakedBalanceOnBank(bank: Bank, account = this.myAccount): Promise<BigNumber> {
    const pool = this.contracts[bank.contract];
    const isMultiPool = bank && bank.contract === 'YSDMultiPool';
    console.info(
      'stakedBalanceOnBank::poolName',
      bank.contract,
      'pool',
      pool,
      'account',
      account,
      'isMultiPool:',
      isMultiPool,
    );
    try {
      if (isMultiPool) {
        const balance = await pool.subBalanceOf(account, bank.depositToken.address);
        console.info(
          `stakedBalanceOnBank::subBalance token ${bank.depositToken.address} for ${account} is ${balance}`,
        );
        return balance;
      }
      const balance = await pool.balanceOf(account);
      console.info(`stakedBalanceOnBank::balance for ${account} is ${balance}`);
      return balance;
    } catch (err) {
      if (pool === undefined) {
        console.error(
          `Failed to call balanceOf()/subBalanceOf(), pool undefined: ${err.stack}`,
        );
        return BigNumber.from(0);
      }
      console.error(
        `Failed to call balanceOf()/subBalanceOf() on pool ${pool.address}: ${err.stack}`,
      );
      return BigNumber.from(0);
    }
  }

  /**
   * Deposits token to given pool.
   * @param bank Bank info.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async stake(bank: Bank, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[bank.contract];
    console.info('BasisCash::stake:pool', pool);
    console.info('bank.contract', bank.contract)
    const isMultiPool = bank && bank.contract === 'YSDMultiPool';
    try {
      if (isMultiPool) {
        console.info('isMultiPool')
        const tokenAddress = bank.depositToken.address;
        console.info(
          'BasisCash::stake:depositToken',
          tokenAddress,
        );
        const gas = await pool.estimateGas.stake(tokenAddress, amount);
        console.info(
          'BasisCash::stake:estimateGas',
          gas,
          'tokenAddress:',
          tokenAddress,
          'amount:',
          amount,
        );
        return await pool.stake(tokenAddress, amount, this.gasOptions(gas));
      }
      const gas = await pool.estimateGas.stake(amount);
      console.info('BasisCash::stake:estimateGas', gas, 'amount:', amount);
      return await pool.stake(amount, this.gasOptions(gas));
    } catch (error) {
      if (isMultiPool) {
        pool.callStatic.stake(bank.depositToken.address, amount).then((callError) => {
          console.error('Error while staking, reason:' + callError.reason);
          throw callError;
        });
      } else {
        pool.callStatic.stake(amount).then((callError) => {
          console.error('Error while staking, reason:' + callError.reason);
          throw callError;
        });
      }
    }
  }

  /**
   * Withdraws token from given pool.
   * @param bank Bank info.
   * @param amount Number of tokens with decimals applied. (e.g. 1.45 DAI * 10^18)
   * @returns {string} Transaction hash
   */
  async unstake(bank: Bank, amount: BigNumber): Promise<TransactionResponse> {
    const pool = this.contracts[bank.contract];
    const isMultiPool = bank && bank.contract === 'YSDMultiPool';
    if (isMultiPool) {
      const tokenAddress = bank.depositToken.address;
      const gas = await pool.estimateGas.withdraw(tokenAddress, amount);
      console.info(
        'BasisCash::unstake:estimateGas',
        gas,
        'tokenAddress:',
        tokenAddress,
        'amount:',
        amount,
      );
      return await pool.withdraw(tokenAddress, amount, this.gasOptions(gas));
    }
    const gas = await pool.estimateGas.withdraw(amount);
    console.info('BasisCash::unstake:estimateGas', gas, 'amount:', amount);
    return await pool.withdraw(amount, this.gasOptions(gas));
  }

  /**
   * Transfers earned token reward from given pool to my account.
   */
  async harvest(poolName: ContractName): Promise<TransactionResponse> {
    const pool = this.contracts[poolName];
    const gas = await pool.estimateGas.getReward();
    return await pool.getReward(this.gasOptions(gas));
  }

  /**
   * Harvests and withdraws deposited tokens from the pool.
   * @param bank Bank info.
   */
  async exit(bank: Bank): Promise<TransactionResponse> {
    const pool = this.contracts[bank.contract];
    const isMultiPool = bank && bank.contract === 'YSDMultiPool';
    if (isMultiPool) {
      const tokenAddress = bank.depositToken.address;
      const gas = await pool.estimateGas.exit(tokenAddress);
      console.info('BasisCash::exit:estimateGas', gas, 'tokenAddress:', tokenAddress);
      return await pool.exit(tokenAddress, this.gasOptions(gas));
    }
    const gas = await pool.estimateGas.exit();
    console.info('BasisCash::exit:estimateGas', gas);
    return await pool.exit(this.gasOptions(gas));
  }

  async fetchBoardroomVersionOfUser(): Promise<string> {
    const { Boardroom1, Boardroom2 } = this.contracts;

    if (Boardroom1) {
      const balance1 = await Boardroom1.getShareOf(this.myAccount);
      if (balance1.gt(0)) {
        console.log(
          `👀 The user is using Boardroom v1. (Staked ${getDisplayBalance(balance1)} YSS)`,
        );
        return 'v1';
      }
    }

    if (Boardroom2) {
      const balance2 = await Boardroom2.balanceOf(this.myAccount);
      if (balance2.gt(0)) {
        console.log(
          `👀 The user is using Boardroom v2. (Staked ${getDisplayBalance(balance2)} YSS)`,
        );
        return 'v2';
      }
    }

    return 'latest';
  }

  boardroomByVersion(version: string): Contract {
    // if (version === 'v1') {
    //   return this.contracts.Boardroom1;
    // }
    // if (version === 'v2') {
    //   return this.contracts.Boardroom2;
    // }
    // return this.contracts.Boardroom3;
    return this.contracts.Boardroom;
  }

  currentBoardroom(): Contract {
    if (!this.boardroomVersionOfUser) {
      throw new Error('you must unlock the wallet to continue.');
    }
    return this.boardroomByVersion(this.boardroomVersionOfUser);
  }

  isOldBoardroomMember(): boolean {
    return this.boardroomVersionOfUser !== 'latest';
  }

  async stakeShareToBoardroom(amount: string): Promise<TransactionResponse> {
    if (this.isOldBoardroomMember()) {
      throw new Error("you're using old Boardroom. please withdraw and deposit the YSS again.");
    }
    const Boardroom = this.currentBoardroom();
    return await Boardroom.stake(decimalToBalance(amount));
  }

  async getStakedSharesOnBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getShareOf(this.myAccount);
    }
    return await Boardroom.balanceOf(this.myAccount);
  }

  async getEarningsOnBoardroom(): Promise<BigNumber> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.getCashEarningsOf(this.myAccount);
    }
    return await Boardroom.earned(this.myAccount);
  }

  async withdrawShareFromBoardroom(amount: string): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.withdraw(decimalToBalance(amount));
  }

  async harvestCashFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    if (this.boardroomVersionOfUser === 'v1') {
      return await Boardroom.claimDividends();
    }
    return await Boardroom.claimReward();
  }

  async exitFromBoardroom(): Promise<TransactionResponse> {
    const Boardroom = this.currentBoardroom();
    return await Boardroom.exit();
  }

  async getTreasuryNextAllocationTime(): Promise<TreasuryAllocationTime> {
    const { Treasury } = this.contracts;
    const nextEpochTimestamp: BigNumber = await Treasury.nextEpochPoint();
    const period: BigNumber = await Treasury.getPeriod();

    const nextAllocation = new Date(nextEpochTimestamp.mul(1000).toNumber());
    const prevAllocation = new Date(nextAllocation.getTime() - period.toNumber() * 1000);
    return { prevAllocation, nextAllocation };
  }
}
