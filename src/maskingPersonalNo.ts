import { formatPersonalNo } from '@pdg/formatting';

/********************************************************************************************************************
 * 주민등록번호 마스킹
 * ******************************************************************************************************************/
export function maskingPersonalNo(v: string, formatting = true) {
  const value = v.trim();
  let newPersonalNo = value;
  if (value !== '') {
    const newPersonalNos = formatPersonalNo(value).split('-');
    const maskingPart = newPersonalNos[1];
    if (maskingPart !== undefined) {
      newPersonalNos[1] = '*'.repeat(maskingPart.length);
    }
    newPersonalNo = newPersonalNos.join('');
    if (formatting) {
      newPersonalNo = formatPersonalNo(newPersonalNo);
    }
  }
  return newPersonalNo;
}

export default maskingPersonalNo;
