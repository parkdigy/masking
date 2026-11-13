import { maskingPersonalNo } from '../src';

describe('maskingPersonalNo', () => {
  it('공백과 짧은 입력을 안전하게 처리한다', () => {
    expect(maskingPersonalNo('   ')).toBe('');
    expect(maskingPersonalNo('12')).toBe('12');
    expect(maskingPersonalNo('123456')).toBe('123456');
    expect(maskingPersonalNo('1234567')).toBe('123456-*');
  });

  it('test', () => {
    expect(maskingPersonalNo('0123567890123')).toBe('012356-*******');
    expect(maskingPersonalNo('01235678')).toBe('012356-**');
    expect(maskingPersonalNo('0123567890123', false)).toBe('012356*******');
    expect(maskingPersonalNo('01235678', false)).toBe('012356**');
  });
});
