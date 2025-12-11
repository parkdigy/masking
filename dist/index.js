'use strict';Object.defineProperty(exports,'__esModule',{value:true});var formatting=require('@pdg/formatting');/********************************************************************************************************************
 * 이름 마스킹
 * ******************************************************************************************************************/
function maskingName(v) {
    const value = v.trim();
    if (value === '')
        return v;
    if (value.length === 4 && value[1] === ' ') {
        return `${value[0]} *${value[3]}`;
    }
    const values = value.split(' ');
    const finalValues = [];
    for (const namePart of values) {
        finalValues.push(namePart.length === 1
            ? '*'
            : namePart.length === 2
                ? `${namePart[0]}*`
                : `${namePart[0]}${'*'.repeat(namePart.length - 2)}${namePart[namePart.length - 1]}`);
    }
    return finalValues.join(' ');
}/********************************************************************************************************************
 * 이메일 마스킹
 * ******************************************************************************************************************/
function maskingEmail(v) {
    const value = v.trim();
    let newEmail = value;
    if (value !== '') {
        const emails = value.split('@');
        const emailMaskingLength = Math.ceil(emails[0].length / 2);
        emails[0] = `${emails[0].substring(0, emails[0].length - emailMaskingLength)}${'*'.repeat(emailMaskingLength)}`;
        newEmail = emails.join('@');
    }
    return newEmail;
}/********************************************************************************************************************
 * 전화번호 마스킹
 * ******************************************************************************************************************/
function maskingTelNo(v, formatting$1 = true) {
    const value = v.trim();
    let newTel = value;
    if (v !== '') {
        const mobileNums = formatting.formatTelNo(value).split('-');
        switch (mobileNums.length) {
            case 1:
                mobileNums[0] = `${mobileNums[0].substring(0, 3)}${'*'.repeat(mobileNums[0].length - 3)}`;
                break;
            default:
                mobileNums[1] = '*'.repeat(mobileNums[1].length);
                break;
        }
        newTel = mobileNums.join('');
        if (formatting$1) {
            newTel = formatting.formatTelNo(newTel);
        }
    }
    return newTel;
}/********************************************************************************************************************
 * 사업자등록번호 마스킹
 * ******************************************************************************************************************/
function maskingBusinessNo(v, formatting$1 = true) {
    const value = v.trim();
    let newCompanyNo = value;
    if (value !== '') {
        const newCompanyNos = formatting.formatBusinessNo(value).split('-');
        if (value.length > 2) {
            newCompanyNos[2] = '*'.repeat(newCompanyNos[2].length);
        }
        newCompanyNo = newCompanyNos.join('');
        if (formatting$1) {
            newCompanyNo = formatting.formatBusinessNo(newCompanyNo);
        }
    }
    return newCompanyNo;
}/********************************************************************************************************************
 * 주민등록번호 마스킹
 * ******************************************************************************************************************/
function maskingPersonalNo(v, formatting$1 = true) {
    const value = v.trim();
    let newPersonalNo = value;
    if (value !== '') {
        const newPersonalNos = formatting.formatPersonalNo(value).split('-');
        if (value.length > 1) {
            newPersonalNos[1] = '*'.repeat(newPersonalNos[1].length);
        }
        newPersonalNo = newPersonalNos.join('');
        if (formatting$1) {
            newPersonalNo = formatting.formatPersonalNo(newPersonalNo);
        }
    }
    return newPersonalNo;
}/********************************************************************************************************************
 * 일괄 마스킹
 * @param data 데이터
 * @param names 마스킹 처리 할 데이터 이름(key)
 * @returns 마스킹 처리된 데이터
 * ******************************************************************************************************************/
function maskingBatch(data, names) {
    const newData = Object.assign({}, data);
    const maskData = (key, maskFunc) => {
        const name = names[key];
        if (name) {
            if (Array.isArray(name)) {
                name.forEach((name) => {
                    if (newData[name] && typeof newData[name] === 'string') {
                        newData[name] = maskFunc(newData[name]);
                    }
                });
            }
            else {
                if (newData[name] && typeof newData[name] === 'string') {
                    newData[name] = maskFunc(newData[name]);
                }
            }
        }
    };
    if (names.name)
        maskData('name', maskingName);
    if (names.email)
        maskData('email', maskingEmail);
    if (names.telNo)
        maskData('telNo', maskingTelNo);
    if (names.businessNo)
        maskData('businessNo', maskingBusinessNo);
    if (names.personalNo)
        maskData('personalNo', maskingPersonalNo);
    return newData;
}var index = {
    batch: maskingBatch,
    businessNo: maskingBusinessNo,
    email: maskingEmail,
    name: maskingName,
    personalNo: maskingPersonalNo,
    telNo: maskingTelNo,
};exports.default=index;exports.maskingBatch=maskingBatch;exports.maskingBusinessNo=maskingBusinessNo;exports.maskingEmail=maskingEmail;exports.maskingName=maskingName;exports.maskingPersonalNo=maskingPersonalNo;exports.maskingTelNo=maskingTelNo;