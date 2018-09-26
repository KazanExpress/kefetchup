import { JsonAPIClient } from '../src';
import { fetchHandler } from './common';

const aliasTest = (alias: string) => async () => {
  const API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
  let resp = await API[alias]('other.io/route');
  expect(resp).toHaveProperty('method');
  expect(resp.method).toBe(alias);
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
