import { GenericAPIClient } from './generic-client';
export * from './generic-client';
export declare class JsonAPIClient extends GenericAPIClient {
    request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<any>;
}
