import { withQuery } from '../src';

describe('withQuery', () => {
  it('encodes query params', () => {
    const url = 'url';
    expect(withQuery(url, {
      test: 'testarg',
      tests: ['test1', 'test2'],
      none: undefined
    })).toBe(url + '?test=testarg&tests=test1,test2')
  });
});
