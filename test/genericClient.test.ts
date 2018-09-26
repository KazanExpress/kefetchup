import { GenericAPIClient, ResponseException } from '../src';
import { fetchHandler, fetchHandlerNoStatus, errorHandler, responseHandler, realFetch } from './common';

describe('GenericAPIClient test', () => {
  it('does request', async () => {
    window.fetch = realFetch;
    var API = new GenericAPIClient('https://jsonplaceholder.typicode.com/');
    let resp = await API.request('todos/1');
    expect(!!resp).toBeTruthy();
  }, 15000);

  it('uses empty baseUrl', async () => {
    var API = new GenericAPIClient(undefined, {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    expect(API.baseURL).toBe('');
  });

  it('throws from default error handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler });
    try {
      await API.request('todos/1');
    } catch (e) {
      expect(e).toBeInstanceOf(ResponseException);
    }
  });

  it('throws from default error handler with no status', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler: fetchHandlerNoStatus });
    try {
      await API.request('todos/1');
    } catch (e) {
      expect(e).toBeInstanceOf(ResponseException);
      expect(e).toHaveProperty('status');
      expect(e.status).toBe(-1);
    }
  });

  it('uses custom error handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler });
    let resp = await API.request('other/api/route');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(500);
    expect(resp).toHaveProperty('statusText');
    expect(resp.statusText).toBe('my status text');
  });

  it('returns undefined from custom error handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: () => undefined });
    let resp = await API.request('other/api/route');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(403);
  });

  it('uses custom fetch handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(403);
  });

  it('uses default fetch handler', async () => {
    window.fetch = undefined;
    var API = new GenericAPIClient('https://google.com/api/', {}, { errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(418);
  });

  it('uses custom response handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, responseHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(resp).not.toHaveProperty('payload');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(403);
  });

  it('throws ResponseException', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler });
    try {
      await API.request('other/api/route');
    } catch (e) {
      expect(e).toBeInstanceOf(ResponseException);
    }
  });
});
