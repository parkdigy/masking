import { maskingPersonalNo } from '../src';

describe('maskingPersonalNo', () => {
  it('test', () => {
    expect(maskingPersonalNo('0123567890123')).toBe('012356-*******');
    expect(maskingPersonalNo('01235678')).toBe('012356-**');
    expect(maskingPersonalNo('0123567890123', false)).toBe('012356*******');
    expect(maskingPersonalNo('01235678', false)).toBe('012356**');
  });
});
