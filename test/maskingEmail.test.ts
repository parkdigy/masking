import { maskingEmail } from '../src';

describe('maskingEmail', () => {
  it('test', () => {
    expect(maskingEmail('')).toBe('');
    expect(maskingEmail('a@a.com')).toBe('*@a.com');
    expect(maskingEmail('abc@a.com')).toBe('a**@a.com');
    expect(maskingEmail('abcde@a.com')).toBe('ab***@a.com');
    expect(maskingEmail('abcdefg@a.com')).toBe('abc****@a.com');
  });
});
