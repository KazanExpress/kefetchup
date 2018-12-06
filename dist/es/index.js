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
    $responseHandler(resp) {
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
    $responseHandler(resp) {
        return resp.text();
    }
}
//# sourceMappingURL=index.js.map