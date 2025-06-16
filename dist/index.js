'use strict';Object.defineProperty(exports,'__esModule',{value:true});var formatting=require('@pdg/formatting');/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};/********************************************************************************************************************
 * 이름 마스킹
 * ******************************************************************************************************************/
function maskingName(v) {
    var value = v.trim();
    if (value === '')
        return v;
    if (value.length === 4 && value[1] === ' ') {
        return "".concat(value[0], " *").concat(value[3]);
    }
    var values = value.split(' ');
    var finalValues = [];
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var namePart = values_1[_i];
        finalValues.push(namePart.length === 1
            ? '*'
            : namePart.length === 2
                ? "".concat(namePart[0], "*")
                : "".concat(namePart[0]).concat('*'.repeat(namePart.length - 2)).concat(namePart[namePart.length - 1]));
    }
    return finalValues.join(' ');
}/********************************************************************************************************************
 * 이메일 마스킹
 * ******************************************************************************************************************/
function maskingEmail(v) {
    var value = v.trim();
    var newEmail = value;
    if (value !== '') {
        var emails = value.split('@');
        var emailMaskingLength = Math.ceil(emails[0].length / 2);
        emails[0] = "".concat(emails[0].substring(0, emails[0].length - emailMaskingLength)).concat('*'.repeat(emailMaskingLength));
        newEmail = emails.join('@');
    }
    return newEmail;
}/********************************************************************************************************************
 * 전화번호 마스킹
 * ******************************************************************************************************************/
function maskingTelNo(v, formatting$1) {
    if (formatting$1 === void 0) { formatting$1 = true; }
    var value = v.trim();
    var newTel = value;
    if (v !== '') {
        var mobileNums = formatting.formatTelNo(value).split('-');
        switch (mobileNums.length) {
            case 1:
                mobileNums[0] = "".concat(mobileNums[0].substring(0, 3)).concat('*'.repeat(mobileNums[0].length - 3));
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
function maskingBusinessNo(v, formatting$1) {
    if (formatting$1 === void 0) { formatting$1 = true; }
    var value = v.trim();
    var newCompanyNo = value;
    if (value !== '') {
        var newCompanyNos = formatting.formatBusinessNo(value).split('-');
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
function maskingPersonalNo(v, formatting$1) {
    if (formatting$1 === void 0) { formatting$1 = true; }
    var value = v.trim();
    var newPersonalNo = value;
    if (value !== '') {
        var newPersonalNos = formatting.formatPersonalNo(value).split('-');
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
    var newData = __assign({}, data);
    var maskData = function (key, maskFunc) {
        var name = names[key];
        if (name) {
            if (Array.isArray(name)) {
                name.forEach(function (name) {
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