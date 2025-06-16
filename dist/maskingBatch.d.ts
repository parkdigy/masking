/********************************************************************************************************************
 * 일괄 마스킹
 * @param data 데이터
 * @param names 마스킹 처리 할 데이터 이름(key)
 * @returns 마스킹 처리된 데이터
 * ******************************************************************************************************************/
export declare function maskingBatch<T extends {
    [k: string]: unknown;
}>(data: T, names: {
    name?: keyof T | (keyof T)[];
    email?: keyof T | (keyof T)[];
    telNo?: keyof T | (keyof T)[];
    businessNo?: keyof T | (keyof T)[];
    personalNo?: keyof T | (keyof T)[];
}): T;
export default maskingBatch;
