import { withQuery } from '../src';

describe('withQuery', () => {
  it('encodes query params', () => {
    const url = 'url';

    expect(withQuery(url, {
      test: 'testarg'
    })).toBe(url + '?test=testarg');

    expect(withQuery(url, {
      test: 'testarg',
      tests: ['test1', 'test2'],
      none: undefined
    })).toBe(url + '?test=testarg&tests=test1,test2');
  });

  it('encodes empty query params', () => {
    const url = 'url';
    expect(withQuery(url, {
      // empty
    })).toBe(url);
  });

  it('appends query to url that already has query params', () => {
    const url = 'url?test=testarg';

    expect(withQuery(url, {
      tests: ['test1', 'test2'],
      none: undefined
    })).toBe(url + '&tests=test1,test2');
  })
});
