import { GenericAPIClient } from './generic-client';

export * from './generic-client';

export class JsonAPIClient extends GenericAPIClient {
  public responseHandler(resp: Response) {
    return new Promise((res, rej) => resp
      .json()
      .then(res)
      .catch(rej)
    );
  }
}

export class TextAPIClient extends GenericAPIClient {
  public responseHandler(resp: Response) {
    return new Promise((res, rej) => resp
      .text()
      .then(res)
      .catch(rej)
    );
  }
}
