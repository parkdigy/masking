import { formatTelNo } from '@pdg/formatting';

/********************************************************************************************************************
 * 전화번호 마스킹
 * ******************************************************************************************************************/
export function maskingTelNo(v: string, formatting = true) {
  const value = v.trim();
  let newTel = value;
  if (v !== '') {
    const mobileNums = formatTelNo(value).split('-');
    switch (mobileNums.length) {
      case 1:
        mobileNums[0] = `${mobileNums[0].substring(0, 3)}${'*'.repeat(mobileNums[0].length - 3)}`;
        break;
      default:
        mobileNums[1] = '*'.repeat(mobileNums[1].length);
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
