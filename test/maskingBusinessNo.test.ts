import { maskingBusinessNo } from '../src';

describe('maskingBusinessNo', () => {
  it('공백과 짧은 입력을 안전하게 처리한다', () => {
    expect(maskingBusinessNo('   ')).toBe('');
    expect(maskingBusinessNo('123')).toBe('123');
    expect(maskingBusinessNo('12345')).toBe('123-45');
    expect(maskingBusinessNo('123456')).toBe('123-45-*');
  });

  it('test', () => {
    expect(maskingBusinessNo('01234567')).toBe('012-34-***');
    expect(maskingBusinessNo('0123456789')).toBe('012-34-*****');
    expect(maskingBusinessNo('012-3456789')).toBe('012-34-*****');
    expect(maskingBusinessNo('012-34-56789')).toBe('012-34-*****');

    expect(maskingBusinessNo('01234567', false)).toBe('01234***');
    expect(maskingBusinessNo('0123456789', false)).toBe('01234*****');
    expect(maskingBusinessNo('012-3456789', false)).toBe('01234*****');
    expect(maskingBusinessNo('012-34-56789', false)).toBe('01234*****');
  });
});
