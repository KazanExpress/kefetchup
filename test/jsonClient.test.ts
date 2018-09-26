import { JsonAPIClient } from '../src';
import { fetchHandler, errorHandler, responseHandler, headers } from './common';
import { defaultFetchHandlerResponseBody } from '../src/default-fetch';

describe('JsonAPIClient test', () => {
  it('uses custom fetch handler', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(resp).toHaveProperty('payload');
    expect(resp.payload).toHaveLength(4);
    expect(Array.isArray(resp.payload)).toBeTruthy();
  });

  it('does request with empty baseUrl', async () => {
    var API = new JsonAPIClient(undefined, {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('todos/1');
    expect(API.baseURL).toBe('');
    expect(resp).toHaveProperty('url');
    expect(resp.url).toBe('todos/1');
  });

  it('uses default fetch handler', async () => {
    window.fetch = undefined;
    const baseUrl = 'https://google.com/api/';
    const url = 'other/api/route';

    const API = new JsonAPIClient(baseUrl, {}, { errorHandler: (resp: Response) => resp });
    const resp = await API.request(url);

    expect(resp).toMatchObject(defaultFetchHandlerResponseBody(baseUrl + url, {}));
  });

  it('uses custom error handler', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler });
    let resp = await API.request('other/api/route');
    expect(resp).not.toHaveProperty('status');
    expect(resp).toHaveProperty('error');
    expect(resp.error).toBe('MyCustomError');
  });

  it('uses custom response handler', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, responseHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(resp).not.toHaveProperty('status');
    expect(resp).toHaveProperty('payload');
    expect(resp.payload).toBe('MyCustomPayload');
  });

  it('overrides client config', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {
      headers,
      method: 'post'
    }, {
      fetchHandler,
      errorHandler: (resp: Response) => resp
    });
    let resp = await API.request('other/api/route', { method: 'put' }, true);
    expect(resp).toHaveProperty('method');
    expect(resp.method).toBe('put');
  });

  it('does request to an "outside" url', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('https://other.io/api/route');
    expect(resp).toHaveProperty('url');
    expect(resp.url).toBe('https://other.io/api/route');
  });
});
