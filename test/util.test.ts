import { withQuery } from '../src';

describe('withQuery', () => {
  it('encodes query params', () => {
    const url = 'url';
    expect(withQuery(url, {
      test: 'testarg',
      none: undefined
    })).toBe(url + '?test=testarg')
  });
});
