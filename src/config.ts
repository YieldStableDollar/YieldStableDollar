// import { ChainId } from '@lychees/uniscam-sdk';
import { Configuration } from './basis-cash/config';
import { BankInfo } from './basis-cash';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 170,
    etherscanUrl: 'https://testnet.hscscan.com',
    defaultProvider: 'https://http-testnet.hoosmartchain.com',
    deployments: require('./basis-cash/deployments/deployments.hoo_testnet.json'),
    externalTokens: {
      // DAI: ['0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18],
      // yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      // BUSD: ['0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18],
      // USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
      USDT: ['0xd3B564c88dAd592d857cF2155feF24B287806A48', 18],
      'YSD_BUSD-UNI-LPv2': ['0x4a4703Ba8bFeb213f12e9053eD080B5Fa4c212F2', 18],
      'YSS_BUSD-UNI-LPv2': ['0x01EBaE19C59790c25874d7617c9521410d91f8f0', 18],
    },
    baseLaunchDate: new Date('2021-01-26T11:00:00Z'),
    wholeSiteLaunchesAt: new Date('2021-01-26T11:00:00Z'),
    bondLaunchesAt: new Date('2021-01-27T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-02T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
  // Ready
  production: {
    chainId: 170,
    etherscanUrl: 'https://testnet.hscscan.com',
    defaultProvider: 'https://http-testnet.hoosmartchain.com',
    deployments: require('./basis-cash/deployments/deployments.hoo_testnet.json'),
    externalTokens: {
      // DAI: ['0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18],
      // yCRV: ['0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8', 18],
      // BUSD: ['0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 18],
      // USDC: ['0x64544969ed7ebf5f083679233325356ebe738930', 18],
      USDT: ['0xd3B564c88dAd592d857cF2155feF24B287806A48', 18],
      'YSD_BUSD-UNI-LPv2': ['0x4a4703Ba8bFeb213f12e9053eD080B5Fa4c212F2', 18],
      'YSS_BUSD-UNI-LPv2': ['0x01EBaE19C59790c25874d7617c9521410d91f8f0', 18],
    },
    baseLaunchDate: new Date('2021-01-26T11:00:00Z'),
    wholeSiteLaunchesAt: new Date('2021-01-26T11:00:00Z'),
    bondLaunchesAt: new Date('2021-01-27T00:00:00Z'),
    boardroomLaunchesAt: new Date('2021-01-02T00:00:00Z'),
    refreshInterval: 10000,
    gasLimitMultiplier: 1.1,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  YSDDAIPool: {
    name: 'Earn YSD by DAI',
    contract: 'YSDMultiPool',
    depositTokenName: 'DAI',
    earnTokenName: 'YSD',
    finished: false,
    sort: 5,
  },
  YSDUSDCPool: {
    name: 'Earn YSD by USDC',
    contract: 'YSDMultiPool',
    depositTokenName: 'USDC',
    earnTokenName: 'YSD',
    finished: false,
    sort: 4,
  },
  YSDBUSDPool: {
    name: 'Earn YSD by BUSD',
    contract: 'YSDMultiPool',
    depositTokenName: 'BUSD',
    earnTokenName: 'YSD',
    finished: false,
    sort: 3,
  },
  YSDUSDTPool: {
    name: 'Earn YSD by USDT',
    contract: 'YSDMultiPool',
    depositTokenName: 'USDT',
    earnTokenName: 'YSD',
    finished: false,
    sort: 6,
  },
  // YSDyCRVPool: {
  //   name: 'Earn YSD by yCRV',
  //   contract: 'YSDyCRVPool',
  //   depositTokenName: 'yCRV',
  //   earnTokenName: 'YSD',
  //   finished: true,
  //   sort: 7,
  // },
  BUSDYSDLPTokenSharePool: {
    name: 'Earn YSS by YSD-BUSD-LP',
    contract: 'BUSDYSDLPTokenSharePool',
    depositTokenName: 'YSD_BUSD-UNI-LPv2',
    earnTokenName: 'YSS',
    finished: false,
    sort: 1,
  },
  BUSDYSSLPTokenSharePool: {
    name: 'Earn YSS by YSS-BUSD-LP',
    contract: 'BUSDYSSLPTokenSharePool',
    depositTokenName: 'YSS_BUSD-UNI-LPv2',
    earnTokenName: 'YSS',
    finished: false,
    sort: 2,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
