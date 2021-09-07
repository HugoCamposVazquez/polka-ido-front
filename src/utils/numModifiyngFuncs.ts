import { BigNumber, ethers } from 'ethers';

export const fixNums = (num: number, fixTo: number) => {
  if (!fixTo) return num.toFixed(fixTo); // don't go wrong if no decimal

  return num.toFixed(fixTo).replace(/\.?0+$/, '');
};

export const numberWithDots = (num: string) => {
  num = num.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, '$1.$2');

  return num; //
};

export const formatBalance = (str: string, maxDecimalDigits: number): string => {
  if (str.includes('.')) {
    const parts = str.split('.');

    return parts[0] + '.' + parts[1].slice(0, maxDecimalDigits);
  }

  return str;
};

export const formatWei = (numberInWei: string | BigNumber): string => {
  if (numberInWei.toString() === '0') {
    return '0';
  }
  const eth = ethers.utils.formatEther(numberInWei);
  return eth.replace(/\.0+$/, ''); // replace zeros
};