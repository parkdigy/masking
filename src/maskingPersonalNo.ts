import { formatPersonalNo } from '@pdg/formatting';

/********************************************************************************************************************
 * 주민등록번호 마스킹
 * ******************************************************************************************************************/
export function maskingPersonalNo(v: string, formatting = true) {
  const value = v.trim();
  let newPersonalNo = value;
  if (value !== '') {
    const newPersonalNos = formatPersonalNo(value).split('-');
    if (value.length > 1) {
      newPersonalNos[1] = '*'.repeat(newPersonalNos[1].length);
    }
    newPersonalNo = newPersonalNos.join('');
    if (formatting) {
      newPersonalNo = formatPersonalNo(newPersonalNo);
    }
  }
  return newPersonalNo;
}

export default maskingPersonalNo;
