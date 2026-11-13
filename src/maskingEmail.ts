/********************************************************************************************************************
 * 이메일 마스킹
 * ******************************************************************************************************************/
export function maskingEmail(v: string) {
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
}

export default maskingEmail;
