import 'isomorphic-fetch';
import { TextAPIClient } from '../src';
import { defaultFetchHandlerResponseBody } from '../src/default-fetch';

describe('TextAPIClient test', () => {
  it('uses default fetch handler and returns text', async () => {
    window.fetch = undefined;
    const baseUrl = 'https://google.com/api/';
    const url = 'other/api/route';

    const API = new TextAPIClient(baseUrl);
    API.errorHandler = (resp: Response) => resp;

    const resp = await API.request(url);

    expect(typeof resp === 'string');
    expect(resp).toBe(JSON.stringify(defaultFetchHandlerResponseBody(baseUrl + url, {})));
  });
});
