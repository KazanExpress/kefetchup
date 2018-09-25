import 'isomorphic-fetch';
import { GenericAPIClient, JsonAPIClient, ResponseException } from "../src";

const realFetch = window.fetch;
const fetchHandler = (url: string | Request, fetchConfig?: RequestInit): Promise<Response | any> => {
  return new Promise((resolve, reject) => {
    resolve(new Response(JSON.stringify({
      payload: [
        { id: 1, text: 'item 1' },
        { id: 2, text: 'item 2' },
        { id: 3, text: 'item 3' },
        { id: 4, text: 'item 4' }
      ]
    }), {
        status: 403
      }))
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

describe('GenericAPIClient test', () => {
  it('does request', async () => {
    window.fetch = realFetch;
    var API = new GenericAPIClient('https://jsonplaceholder.typicode.com/');
    let resp = await API.request('todos/1');
    expect(!!resp).toBeTruthy();
  });

  it('uses custom fetch handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(403);
  });

  it('uses default fetch handler', async () => {
    window.fetch = undefined;
    var API = new GenericAPIClient('https://google.com/api/', {}, { errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(200);
  });

  it('uses custom error handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).not.toHaveProperty('error');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(500);
    expect(resp).toHaveProperty('statusText');
    expect(resp.statusText).toBe('my status text');
  });

  it('uses custom response handler', async () => {
    var API = new GenericAPIClient('https://google.com/api/', {}, { fetchHandler, responseHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).not.toHaveProperty('payload');
    expect(resp).toHaveProperty('status');
    expect(resp.status).toBe(403);
  });
});

describe('JsonAPIClient test', () => {
  it('does request', async () => {
    window.fetch = realFetch;
    var API = new JsonAPIClient('https://jsonplaceholder.typicode.com/');
    try {
      let resp = await API.request('todos/1');
      expect(!!resp).toBeTruthy();
    } catch (e) {
      console.log(e);
    }
  });

  it('uses custom fetch handler', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).toHaveProperty('payload');
    expect(resp.payload).toHaveLength(4);
    expect(Array.isArray(resp.payload)).toBeTruthy();
  });

  it('uses default fetch handler', async () => {
    window.fetch = undefined;
    var API = new JsonAPIClient('https://google.com/api/', {}, { errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).toHaveProperty('error');
    expect(resp.error).toBe('Response via default fetch handler');
  });

  it('uses custom error handler', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, errorHandler });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).not.toHaveProperty('status');
    expect(resp).toHaveProperty('error');
    expect(resp.error).toBe('MyCustomError');
  });

  it('uses custom response handler', async () => {
    var API = new JsonAPIClient('https://google.com/api/', {}, { fetchHandler, responseHandler, errorHandler: (resp: Response) => resp });
    let resp = await API.request('other/api/route');
    expect(!!resp).toBeTruthy();
    expect(resp).not.toHaveProperty('status');
    expect(resp).toHaveProperty('payload');
    expect(resp.payload).toBe('MyCustomPayload');
  });
});
