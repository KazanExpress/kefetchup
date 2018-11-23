import { GenericAPIClient } from './genericClient';

export * from './genericClient';
export * from './errors';
export * from './util';

/**
 * @inheritdoc
 */
export class JsonAPIClient extends GenericAPIClient {
  /**
   * @inheritdoc
   */
  $responseHandler(resp: Response): Promise<unknown> {
    return resp.json();
  }
}

/**
 * @inheritdoc
 */
export class TextAPIClient extends GenericAPIClient {
  /**
   * @inheritdoc
   */
  $responseHandler(resp: Response) {
    return resp.text();
  }
}
