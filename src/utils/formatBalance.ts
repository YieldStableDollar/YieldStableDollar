import { BigNumber } from 'ethers';

export const getDisplayBalance = (balance: BigNumber, decimals = 18, fractionDigits = 4) => {
  const number = getBalanceBN(balance, decimals - fractionDigits);
  // return (number / 10 ** fractionDigits).toFixed(fractionDigits);
  return (Number(number) / 10 ** fractionDigits).toFixed(fractionDigits);
  // return number.div(utils.parseUnits('1', fractionDigits)).toNumber().toFixed(fractionDigits);
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return getDisplayBalance(balance, decimals, decimals);
};

export function getBalance(balance: BigNumber, decimals = 18) : number {
  return balance.div(BigNumber.from(10).pow(decimals)).toNumber();
}

export function getBalanceBN(balance: BigNumber, decimals = 18) : BigNumber {
  return balance.div(BigNumber.from(10).pow(decimals));
}
