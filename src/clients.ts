import { GenericAPIClient } from './generic-client';

export * from './generic-client';

export class JsonAPIClient extends GenericAPIClient {
  protected requestFactory(url, config, requestFunction): Promise<unknown> {
    return new Promise<unknown>((resolve, reject) => super
      .requestFactory(url, config, requestFunction)
      .then((r: Response) => resolve(r.json()))
      .catch(reject)
    );
  }
}

declare const j: JsonAPIClient;

j.

export class TextAPIClient extends GenericAPIClient {
  protected requestFactory(url, config, requestFunction): Promise<string> {
    return new Promise<string>((resolve, reject) => super
      .requestFactory(url, config, requestFunction)
      .then((r: Response) => resolve(r.text()))
      .catch(reject)
    );
  }
}
