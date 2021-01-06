import { useCallback, useEffect, useState } from 'react';
import useBasisCash from './useBasisCash';
import { TokenStat } from '../basis-cash/types';
import config from '../config';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const basisCash = useBasisCash();

  const fetchBondPrice = useCallback(async () => {
    basisCash && setStat(await basisCash.getBondStat());
  }, [basisCash]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch YSB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, basisCash, fetchBondPrice]);

  return stat;
};

export default useBondStats;
