import { formatBusinessNo } from '@pdg/formatting';

/********************************************************************************************************************
 * 사업자등록번호 마스킹
 * ******************************************************************************************************************/
export function maskingBusinessNo(v: string, formatting = true) {
  const value = v.trim();
  let newCompanyNo = value;
  if (value !== '') {
    const newCompanyNos = formatBusinessNo(value).split('-');

    if (value.length > 2) {
      newCompanyNos[2] = '*'.repeat(newCompanyNos[2].length);
    }
    newCompanyNo = newCompanyNos.join('');
    if (formatting) {
      newCompanyNo = formatBusinessNo(newCompanyNo);
    }
  }
  return newCompanyNo;
}

export default maskingBusinessNo;
