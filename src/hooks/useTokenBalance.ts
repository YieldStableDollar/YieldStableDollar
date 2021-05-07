import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../basis-cash/ERC20';
import useBasisCash from './useBasisCash';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    if (basisCash && basisCash.myAccount) {
      const balance = await token.balanceOf(basisCash.myAccount);
      console.info(`Balance for ${token.address}: ${balance}`)
      setBalance(balance);
    }
  }, [basisCash, token]);

  useEffect(() => {
    console.info('useEffect in useTokenBalance')
    if (basisCash?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [basisCash, fetchBalance, token]);

  return balance;
};

export default useTokenBalance;
