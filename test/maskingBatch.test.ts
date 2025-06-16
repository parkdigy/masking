import { maskingBatch } from '../src';

describe('maskingBatch', () => {
  it('test', () => {
    expect(
      maskingBatch(
        {
          id: 1,
          name: '홍길동',
          email: 'name@domain.com',
          telNo: '010-1234-5678',
          businessNo: '123-45-67890',
          personalNo: '012345-1234567',
        },
        { name: 'name', email: 'email', telNo: 'telNo', businessNo: 'businessNo', personalNo: 'personalNo' }
      )
    ).toEqual({
      id: 1,
      name: '홍*동',
      email: 'na**@domain.com',
      telNo: '010-****-5678',
      businessNo: '123-45-*****',
      personalNo: '012345-*******',
    });

    expect(
      maskingBatch(
        {
          id: 1,
          name2: '홍길동',
          email2: 'name@domain.com',
          telNo2: '010-1234-5678',
          businessNo2: '123-45-67890',
          personalNo2: '012345-1234567',
        },
        { name: 'name2', email: 'email2', telNo: 'telNo2', businessNo: 'businessNo2', personalNo: 'personalNo2' }
      )
    ).toEqual({
      id: 1,
      name2: '홍*동',
      email2: 'na**@domain.com',
      telNo2: '010-****-5678',
      businessNo2: '123-45-*****',
      personalNo2: '012345-*******',
    });

    expect(
      maskingBatch(
        {
          id: 1,
          name: '홍길동',
          name2: '홍길동',
          email: 'name@domain.com',
          email2: 'name@domain.com',
          telNo: '010-1234-5678',
          telNo2: '010-1234-5678',
          businessNo: '123-45-67890',
          businessNo2: '123-45-67890',
          personalNo: '012345-1234567',
          personalNo2: '012345-1234567',
        },
        {
          name: ['name', 'name2'],
          email: ['email', 'email2'],
          telNo: ['telNo', 'telNo2'],
          businessNo: ['businessNo', 'businessNo2'],
          personalNo: ['personalNo', 'personalNo2'],
        }
      )
    ).toEqual({
      id: 1,
      name: '홍*동',
      name2: '홍*동',
      email: 'na**@domain.com',
      email2: 'na**@domain.com',
      telNo: '010-****-5678',
      telNo2: '010-****-5678',
      businessNo: '123-45-*****',
      businessNo2: '123-45-*****',
      personalNo: '012345-*******',
      personalNo2: '012345-*******',
    });
  });
});
