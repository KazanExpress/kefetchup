import { GenericAPIClient } from './generic-client';

export * from './generic-client';

export class JsonAPIClient extends GenericAPIClient {
  public async request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<any> {
    return await (await super.request(url, fetchConfig, overrideDefaultConfig)).json();
  }
}

export class TextAPIClient extends GenericAPIClient {
  public async request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<string> {
    return await (await super.request(url, fetchConfig, overrideDefaultConfig)).text();
  }
}
