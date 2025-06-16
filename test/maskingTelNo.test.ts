import { maskingTelNo } from '../src';

describe('maskingTelNo', () => {
  it('test', () => {
    expect(maskingTelNo('021234567')).toBe('02-***-4567');
    expect(maskingTelNo('0212345678')).toBe('02-****-5678');
    expect(maskingTelNo('0101234567')).toBe('010-***-4567');
    expect(maskingTelNo('01012345678')).toBe('010-****-5678');
    expect(maskingTelNo('02-123-4567')).toBe('02-***-4567');
    expect(maskingTelNo('02-1234-5678')).toBe('02-****-5678');

    expect(maskingTelNo('021234567', false)).toBe('02***4567');
    expect(maskingTelNo('0212345678', false)).toBe('02****5678');
    expect(maskingTelNo('0101234567', false)).toBe('010***4567');
    expect(maskingTelNo('01012345678', false)).toBe('010****5678');
    expect(maskingTelNo('02-123-4567', false)).toBe('02***4567');
    expect(maskingTelNo('02-1234-5678', false)).toBe('02****5678');
  });
});
