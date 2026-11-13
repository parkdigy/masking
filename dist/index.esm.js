import {formatTelNo,formatBusinessNo,formatPersonalNo}from'@pdg/formatting';/********************************************************************************************************************
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
        const [localPart = ''] = emails;
        const emailMaskingLength = Math.ceil(localPart.length / 2);
        emails[0] = `${localPart.substring(0, localPart.length - emailMaskingLength)}${'*'.repeat(emailMaskingLength)}`;
        newEmail = emails.join('@');
    }
    return newEmail;
}/********************************************************************************************************************
 * 전화번호 마스킹
 * ******************************************************************************************************************/
function maskingTelNo(v, formatting = true) {
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
}/********************************************************************************************************************
 * 사업자등록번호 마스킹
 * ******************************************************************************************************************/
function maskingBusinessNo(v, formatting = true) {
    const value = v.trim();
    let newCompanyNo = value;
    if (value !== '') {
        const newCompanyNos = formatBusinessNo(value).split('-');
        const maskingPart = newCompanyNos[2];
        if (maskingPart !== undefined) {
            newCompanyNos[2] = '*'.repeat(maskingPart.length);
        }
        newCompanyNo = newCompanyNos.join('');
        if (formatting) {
            newCompanyNo = formatBusinessNo(newCompanyNo);
        }
    }
    return newCompanyNo;
}/********************************************************************************************************************
 * 주민등록번호 마스킹
 * ******************************************************************************************************************/
function maskingPersonalNo(v, formatting = true) {
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
};export{index as default,maskingBatch,maskingBusinessNo,maskingEmail,maskingName,maskingPersonalNo,maskingTelNo};