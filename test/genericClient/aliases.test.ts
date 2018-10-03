import 'isomorphic-fetch';
import { JsonAPIClient, ResponseException } from '../../src';
import { fetchHandler } from '../common';

const aliasTest = (alias: string) => async () => {
  const API = new JsonAPIClient('https://google.com/api/');
  API.fetchHandler = fetchHandler;

  try {
    await API[alias]('other.io/route');
  } catch (e) {
    expect(e).toBeInstanceOf(ResponseException);
    if (e instanceof ResponseException) {
      const resp = e.data;
      expect(resp).toHaveProperty('method');
      expect(resp.method).toBe(alias);
    } else {
      expect(true).toBe(false);
      console.log('Wow, it came this far...');
    }
  }
}

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
