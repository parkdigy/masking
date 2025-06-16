import { maskingName } from '../src';

describe('maskingName', () => {
  it('test', () => {
    expect(maskingName('')).toBe('');
    expect(maskingName('홍')).toBe('*');
    expect(maskingName('홍길')).toBe('홍*');
    expect(maskingName('홍길동')).toBe('홍*동');
    expect(maskingName('홍 길동')).toBe('홍 *동');
    expect(maskingName('홍길 동전')).toBe('홍* 동*');
    expect(maskingName('Michael')).toBe('M*****l');
    expect(maskingName('Michael Jordan')).toBe('M*****l J****n');
    expect(maskingName('Michael Jordan Junior')).toBe('M*****l J****n J****r');
  });
});
