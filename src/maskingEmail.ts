/********************************************************************************************************************
 * 이메일 마스킹
 * ******************************************************************************************************************/
export function maskingEmail(v: string) {
  const value = v.trim();
  let newEmail = value;
  if (value !== '') {
    const emails = value.split('@');
    const emailMaskingLength = Math.ceil(emails[0].length / 2);
    emails[0] = `${emails[0].substring(0, emails[0].length - emailMaskingLength)}${'*'.repeat(emailMaskingLength)}`;
    newEmail = emails.join('@');
  }
  return newEmail;
}

export default maskingEmail;
