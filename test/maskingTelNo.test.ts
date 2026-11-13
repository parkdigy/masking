import { maskingTelNo } from '../src';

describe('maskingTelNo', () => {
  it('공백과 짧은 입력을 안전하게 처리한다', () => {
    expect(maskingTelNo('   ')).toBe('');
    expect(maskingTelNo('1')).toBe('1');
    expect(maskingTelNo('12')).toBe('12');
    expect(maskingTelNo('123')).toBe('123');
    expect(maskingTelNo('1234')).toBe('123*');
  });

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
