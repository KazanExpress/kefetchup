import 'isomorphic-fetch';

export const realFetch = window.fetch;
export const fetchHandler = (url: string | Request, fetchConfig?: RequestInit): Promise<Response | any> => {
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

export const fetchHandlerNoStatus = (url: string | Request, fetchConfig?: RequestInit): Promise<Response | any> => {
  return new Promise((resolve, reject) => {
    resolve(new Response(JSON.stringify({}), { status: undefined }));
  })
}

export const responseHandler = (resp: Response): Response => {
  const { status } = resp;
  return new Response(JSON.stringify({ payload: 'MyCustomPayload' }), { status });
}

export const errorHandler = (resp: Response): Response | void => {
  const { headers } = resp;
  return new Response(JSON.stringify({ error: 'MyCustomError' }), { status: 500, statusText: 'my status text', headers })
}

export const headers = {
  'Content-Type': 'application/json'
}
