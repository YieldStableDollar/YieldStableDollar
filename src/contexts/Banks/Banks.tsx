import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBasisCash from '../../hooks/useBasisCash';
import { Bank } from '../../basis-cash';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const basisCash = useBasisCash();

  const basicCashIsUnlocked = basisCash?.isUnlocked

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];


    for (const bankKey of Object.keys(bankDefinitions)) {
      const bankInfo = bankDefinitions[bankKey];
      const address = config.deployments[bankInfo.contract].address;
      const depositToken = basisCash.externalTokens[bankInfo.depositTokenName];
      const earnToken = bankInfo.earnTokenName === 'YSD' ? basisCash.YSD : basisCash.YSS;
      const tmpBank: Bank = {
        ...bankInfo,
        address,
        depositToken,
        earnToken,
        bankDefinitionName: bankKey,
      }

      if (bankInfo.finished) {
        if (!basisCash.isUnlocked) continue;
        // only show pools staked by user
        const balance = await basisCash.stakedBalanceOnBank(tmpBank, basisCash.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push(tmpBank);
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    console.log('Banks:', banks)
    setBanks(banks);
  }, [basisCash, setBanks]);

  useEffect(() => {
    if (basisCash) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [basisCash, basicCashIsUnlocked, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
