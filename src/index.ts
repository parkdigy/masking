export * from './maskingBatch';
export * from './maskingBusinessNo';
export * from './maskingEmail';
export * from './maskingName';
export * from './maskingPersonalNo';
export * from './maskingTelNo';

import maskingBatch from './maskingBatch';
import maskingBusinessNo from './maskingBusinessNo';
import maskingEmail from './maskingEmail';
import maskingName from './maskingName';
import maskingPersonalNo from './maskingPersonalNo';
import maskingTelNo from './maskingTelNo';

export default {
  batch: maskingBatch,
  businessNo: maskingBusinessNo,
  email: maskingEmail,
  name: maskingName,
  personalNo: maskingPersonalNo,
  telNo: maskingTelNo,
};
