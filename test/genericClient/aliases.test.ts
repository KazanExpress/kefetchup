import { ResponseError } from '../../src';
import { TestAPIClient } from '../common';

const aliasTest = (alias: string) => async () => {
  const API = new TestAPIClient('https://google.com/api/');

  try {
    await API[alias]('other.io/route');
  } catch (e) {
    expect(e).toBeInstanceOf(ResponseError);
    if (e instanceof ResponseError) {
      const resp = e.data;
      expect(resp).toHaveProperty('method');
      expect(resp.method).toBe(alias);
    } else {
      // DISCLAIMER: this should never happen.
      expect(true).toBe(false);
      console.log('Wow, it came this far...');
    }
  }
}

describe('GenericAPIClient', () => {
  describe('Aliases', () => {
    const aliases = [
      'get',
      'put',
      'post',
      'delete',
      'patch',
    ];

    for (const alias of aliases) {
      it(alias, aliasTest(alias));
    }
  });
});
