import { useContext } from 'react';
import { Context as BanksContext } from '../contexts/Banks';
import { Bank } from '../basis-cash';

const useBank = (definitionName: string): Bank => {
  const { banks } = useContext(BanksContext);
  return banks.find((bank) => bank.bankDefinitionName === definitionName);
};

export default useBank;
