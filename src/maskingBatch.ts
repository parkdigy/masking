/********************************************************************************************************************
 * 일괄 마스킹
 * @param data 데이터
 * @param names 마스킹 처리 할 데이터 이름(key)
 * @returns 마스킹 처리된 데이터
 * ******************************************************************************************************************/

import maskingName from './maskingName';
import maskingEmail from './maskingEmail';
import maskingTelNo from './maskingTelNo';
import maskingBusinessNo from './maskingBusinessNo';
import maskingPersonalNo from './maskingPersonalNo';

export function maskingBatch<T extends { [k: string]: unknown }>(
  data: T,
  names: {
    // 이름
    name?: keyof T | (keyof T)[];
    // 이메일
    email?: keyof T | (keyof T)[];
    // 전화번호
    telNo?: keyof T | (keyof T)[];
    // 사업자등록번호
    businessNo?: keyof T | (keyof T)[];
    // 주민등록번호
    personalNo?: keyof T | (keyof T)[];
  }
) {
  const newData = { ...data };
  const maskData = (key: keyof typeof names, maskFunc: (value: string) => string) => {
    const name = names[key];
    if (name) {
      if (Array.isArray(name)) {
        name.forEach((name) => {
          if (newData[name] && typeof newData[name] === 'string') {
            newData[name] = maskFunc(newData[name] as unknown as string) as unknown as T[typeof name];
          }
        });
      } else {
        if (newData[name] && typeof newData[name] === 'string') {
          newData[name] = maskFunc(newData[name] as unknown as string) as unknown as T[typeof name];
        }
      }
    }
  };

  if (names.name) maskData('name', maskingName);
  if (names.email) maskData('email', maskingEmail);
  if (names.telNo) maskData('telNo', maskingTelNo);
  if (names.businessNo) maskData('businessNo', maskingBusinessNo);
  if (names.personalNo) maskData('personalNo', maskingPersonalNo);

  return newData;
}

export default maskingBatch;
