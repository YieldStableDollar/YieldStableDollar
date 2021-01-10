import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';
import { Bank } from '../basis-cash';
import config from '../config';

const useStakedBalance = (bank: Bank) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  const fetchBalance = useCallback(async () => {
    const balance = await basisCash.stakedBalanceOnBank(bank, basisCash.myAccount);
    setBalance(balance);
  }, [bank, basisCash]);

  useEffect(() => {
    if (basisCash?.isUnlocked) {
      fetchBalance().catch(err => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [setBalance, basisCash, fetchBalance]);

  return balance;
};

export default useStakedBalance;
