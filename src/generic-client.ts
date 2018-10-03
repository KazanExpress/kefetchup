import { defaultFetch } from './default-fetch';

/**
 * Generic API client with default request
 *
 * @export
 * @class GenericAPIClient
 */
export class GenericAPIClient {
  public fetchHandler = window.fetch || defaultFetch;
  public responseHandler(response: Response): any {
    if (response.ok) {
      return response;
    } else {
      throw new ResponseException(handleStatus(response.status), response.status, response);
    }
  }

  public errorHandler(e): any {
    if (e instanceof ResponseException)
      throw e;
    else
      throw new ResponseException('Unkown Error: ', ResponseErrors.UnknownError, e);
  }

  constructor(
    public readonly baseURL: string = '',
    public readonly clientConfig: RequestInit = {}
  ) {}

  private request(
    url: string,
    fetchConfig: RequestInit = this.clientConfig,
    overrideDefaultConfig: boolean = false
  ): Promise<any> {
    if (!url.match(/^(\w+:)?\/\//)) {
      url = this.baseURL ? new URL(url, this.baseURL).href : url;
    }

    return this.requestFactory(
      url,
      overrideDefaultConfig ? fetchConfig : { ...this.clientConfig, ...fetchConfig },
      this.fetchHandler
    );
  }

  protected requestFactory(
    url: string,
    config: RequestInit,
    requestFunction: (url: string, config?: RequestInit) => Promise<Response>
  ): Promise<any> {
    return new Promise<Response>((resolve, _) => requestFunction(url, config)
      .then(r => resolve(this.responseHandler(r)))
      .catch(this.errorHandler)
    );
  }

  /**
   * Request method alias factory
   *
   * @protected
   * @param {string} method HTTP method (GET, PUT, POST, etc) to alias
   * @returns an alias function for request
   * @memberof GenericAPIClient
   */
  protected readonly alias = (method: string) => function (this: GenericAPIClient,
    url: string,
    fetchConfig?: RequestInit,
    overrideDefaultConfig?: boolean
  ): ReturnType<typeof this['request']> {
    fetchConfig = fetchConfig || {};
    fetchConfig.method = method || 'GET';
    return this.request(url, fetchConfig, overrideDefaultConfig);
  }

  public readonly get = this.alias('get');
  public readonly put = this.alias('put');
  public readonly post = this.alias('post');
  public readonly patch = this.alias('patch');
  public readonly delete = this.alias('delete');
}

export class ResponseException<T = Response> extends Error {
  constructor(
    message: string,
    public status: ResponseErrors,
    public data?: T
  ) {
    super(message)/* istanbul ignore next: I DON'T KNOW WHY!!!!! */;
    Object.setPrototypeOf(this, ResponseException.prototype);
    this.name = 'ResponseExcpetion';
  }

  toString() {
    return this.name + ': ' + this.message;
  }
}

/**
 * Retrieve string from response status
 *
 * @export
 * @param {number} [status=-1] Response status (200, 404, 500, etc)
 * @returns {string} a status literal for logging
 */
export function handleStatus(status: number = -1) {
  return ResponseErrors[status] || ResponseErrors[-1];
}

export enum ResponseErrors {
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  InvalidMedia = 415,
  'I\'m a teapot' = 418,
  Unprocessable = 422,
  TooManyRequests = 429,
  ServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  UnknownError = -1
}
