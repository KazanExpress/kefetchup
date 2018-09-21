import { GenericAPIClient } from './client';
export default class KeFetchUpJsonClient extends GenericAPIClient {
    request(url: string | Request, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
}
