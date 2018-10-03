import { GenericAPIClient } from './generic-client';

export * from './generic-client';

/**
 * @inheritdoc
 */
export class JsonAPIClient extends GenericAPIClient {
  /**
   * @override
   * @inheritdoc
   */
  responseHandler(resp: Response): Promise<unknown> {
    return resp.json();
  }
}

/**
 * @inheritdoc
 */
export class TextAPIClient extends GenericAPIClient {
  /**
   * @override
   * @inheritdoc
   */
  responseHandler(resp: Response) {
    return resp.text();
  }
}
