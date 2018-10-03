import { GenericAPIClient } from './generic-client';

export * from './generic-client';

export class JsonAPIClient extends GenericAPIClient {
  responseHandler(resp: Response): Promise<unknown> {
    return resp.json();
  }
}

export class TextAPIClient extends GenericAPIClient {
  responseHandler(resp: Response) {
    return resp.text();
  }
}
