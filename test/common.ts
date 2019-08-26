import 'isomorphic-fetch';
import { GenericAPIClient } from '../src';

export const realFetch = window.fetch;

export const fetchHandler = (url: string | Request, fetchConfig: RequestInit = {}): Promise<Response> => {
  return new Promise((resolve) => {
    resolve(new Response(JSON.stringify({
      method: fetchConfig.method ? fetchConfig.method.toUpperCase() : 'GET',
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

export class TestAPIClient extends GenericAPIClient {
  public $fetchHandler = fetchHandler;

  protected $responseHandler(r: Response) {
    return r.json();
  }

  protected $errorHandler(e) {
    return e.data;
  }

  public readonly get = this.$alias('get');
  public readonly put = this.$alias('put');
  public readonly post = this.$alias('post');
  public readonly patch = this.$alias('patch');
  public readonly delete = this.$alias('delete');
  public readonly trace = this.$alias('');
}
