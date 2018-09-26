import 'isomorphic-fetch';
import { GenericAPIClient, JsonAPIClient, TextAPIClient, ResponseException, handleStatus } from "../src";

const realFetch = window.fetch;
const fetchHandler = (url: string | Request, fetchConfig?: RequestInit): Promise<Response | any> => {
  return new Promise((resolve, reject) => {
    resolve(new Response(JSON.stringify({
      method: fetchConfig.method || 'get',
      url,
      payload: [
        { id: 1, text: 'item 1' },
        { id: 2, text: 'item 2' },
        { id: 3, text: 'item 3' },
        { id: 4, text: 'item 4' }
      ]
    }), {
      status: 403
    }));
  });
}

const fetchHandlerNoStatus = (url: string | Request, fetchConfig?: RequestInit): Promise<Response | any> => {
  return new Promise((resolve, reject) => {
    resolve(new Response(JSON.stringify({}), { status: undefined }));
  })
}

const responseHandler = (resp: Response): Response => {
  const { status } = resp;
  return new Response(JSON.stringify({ payload: 'MyCustomPayload' }), { status });
}

const errorHandler = (resp: Response): Response | void => {
  const { headers } = resp;
  return new Response(JSON.stringify({ error: 'MyCustomError' }), { status: 500, statusText: 'my status text', headers })
}

const headers = {
  'Content-Type': 'application/json'
}

describe('handleStatus test', () => {
  it('handles known status', () => {
    let e = handleStatus(500);
    expect(e).toBe('ServerError');
  });

  it('handles unknown status', () => {
    let e = handleStatus(692);
    expect(e).toBe('UnknownError');
  });

  it('handles empty status', () => {
    let e = handleStatus();
    expect(e).toBe('UnknownError');
  });
});

describe('ResponseException test', () => {
  it('creates ResponseException class', () => {
    let e = new ResponseException('My error message', 403);
    expect(e).toBeInstanceOf(ResponseException);
  });

  it('stringifies error', () => {
    let e = new ResponseException('My error message', 403, new Response());
    expect(e).toBeInstanceOf(ResponseException);
    expect(e).toHaveProperty('message');
    expect(e).toHaveProperty('name');
    expect(e.toString()).toBe('ResponseExcpetion: My error message');
  });
});

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
    expect(resp.status).toBe(200);
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
    var API = new JsonAPIClient('https://google.com/api/', {}, { errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(resp).toHaveProperty('error');
    expect(resp.error).toBe('Response via default fetch handler');
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

describe('Aliases test', () => {
  it('sends get request', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.get('other.io/route');
    expect(resp).toHaveProperty('method');
    expect(resp.method).toBe('get');
  });

  it('sends put request', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.put('other.io/route');
    expect(resp).toHaveProperty('method');
    expect(resp.method).toBe('put');
  });

  it('sends post request', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.post('other.io/route');
    expect(resp).toHaveProperty('method');
    expect(resp.method).toBe('post');
  });

  it('sends delete request', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.delete('other.io/route');
    expect(resp).toHaveProperty('method');
    expect(resp.method).toBe('delete');
  });

  it('sends patch request', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.patch('other.io/route');
    expect(resp).toHaveProperty('method');
    expect(resp.method).toBe('patch');
  });
});

describe('TextAPIClient test', () => {
  it('uses default fetch handler and returns text', async () => {
    window.fetch = undefined;
    var API = new TextAPIClient('https://google.com/api/', {}, { errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(typeof resp === 'string');
    expect(resp).toBe('{\"error\":\"Response via default fetch handler\",\"to\":\"https://google.com/api/other/api/route\",\"options\":{}}');
  });
});
