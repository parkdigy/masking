import { maskingBusinessNo } from '../src';

describe('maskingBusinessNo', () => {
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
