import { maskingEmail } from '../src';

describe('maskingEmail', () => {
  it('공백과 짧은 입력을 안전하게 처리한다', () => {
    expect(maskingEmail('   ')).toBe('');
    expect(maskingEmail('abc')).toBe('a**');
    expect(maskingEmail('@a.com')).toBe('@a.com');
  });

  it('test', () => {
    expect(maskingEmail('')).toBe('');
    expect(maskingEmail('a@a.com')).toBe('*@a.com');
    expect(maskingEmail('abc@a.com')).toBe('a**@a.com');
    expect(maskingEmail('abcde@a.com')).toBe('ab***@a.com');
    expect(maskingEmail('abcdefg@a.com')).toBe('abc****@a.com');
  });
});
