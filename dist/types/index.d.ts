import { GenericAPIClient } from './genericClient';
export * from './genericClient';
export * from './errors';
/**
 * @inheritdoc
 */
export declare class JsonAPIClient extends GenericAPIClient {
    /**
     * @inheritdoc
     */
    responseHandler(resp: Response): Promise<unknown>;
}
/**
 * @inheritdoc
 */
export declare class TextAPIClient extends GenericAPIClient {
    /**
     * @inheritdoc
     */
    responseHandler(resp: Response): Promise<string>;
}
