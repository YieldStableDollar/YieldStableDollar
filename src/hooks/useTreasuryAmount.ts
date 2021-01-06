import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useBasisCash from './useBasisCash';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const basisCash = useBasisCash();

  useEffect(() => {
    if (basisCash) {
      const { Treasury } = basisCash.contracts;
      basisCash.YSD.balanceOf(Treasury.address).then(setAmount);
    }
  }, [basisCash]);
  return amount;
};

export default useTreasuryAmount;
