import { GenericAPIClient } from './client'

export default class KeFetchUpJsonClient extends GenericAPIClient {
  public async request(url: string | Request, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response|any> {
    return await (await super.request(url, fetchConfig, overrideDefaultConfig)).json()
  }
}
