import { formatTelNo } from '@pdg/formatting';

/********************************************************************************************************************
 * 전화번호 마스킹
 * ******************************************************************************************************************/
export function maskingTelNo(v: string, formatting = true) {
  const value = v.trim();
  let newTel = value;
  if (value !== '') {
    const mobileNums = formatTelNo(value).split('-');
    const [firstPart = '', secondPart] = mobileNums;
    switch (mobileNums.length) {
      case 1:
        mobileNums[0] = `${firstPart.substring(0, 3)}${'*'.repeat(Math.max(0, firstPart.length - 3))}`;
        break;
      default:
        if (secondPart !== undefined) {
          mobileNums[1] = '*'.repeat(secondPart.length);
        }
        break;
    }
    newTel = mobileNums.join('');
    if (formatting) {
      newTel = formatTelNo(newTel);
    }
  }
  return newTel;
}

export default maskingTelNo;
