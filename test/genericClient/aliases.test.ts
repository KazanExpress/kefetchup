import { ResponseError } from '../../src';
import { TestAPIClient } from '../common';

const aliasTest = (alias: string) => async () => {
  const API = new TestAPIClient('https://google.com/api/');

  try {
    await API.get('other.io/route');
  } catch (e) {
    expect(e).toBeInstanceOf(ResponseError);
    if (e instanceof ResponseError) {
      const resp = e.data;
      expect(resp).toHaveProperty('method');
      expect(resp.method.toUpperCase()).toBe(alias.toUpperCase());
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
      'get'
    ];

    for (const alias of aliases) {
      it(alias, aliasTest(alias));
    }
  });
});
