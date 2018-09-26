export type APIClientHandlers = {
  fetchHandler: (url: string, options?: RequestInit) => Promise<Response>
  errorHandler: (error: Response) => Response | void
  responseHandler: (response: Response) => Response
}

type Optional<T> = { [key in keyof T]?: T[key] };

/**
 * Default fetch handler
 *
 * @export
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export async function defaultFetch(url: string, options?: RequestInit): Promise<Response> {
  return await new Response(JSON.stringify({ error: 'Response via default fetch handler', to: url, options }), { status: 200 });
}

/**
 * Generic API client with default request
 *
 * @export
 * @class GenericAPIClient
 */
export class GenericAPIClient {
  public readonly handlers: APIClientHandlers;
  constructor(
    public readonly baseURL: string = '',
    public readonly clientConfig?: RequestInit,
    handlers?: Optional<APIClientHandlers>
  ) {
    const defaultHandlers: APIClientHandlers = {
      fetchHandler: window.fetch || defaultFetch,
      errorHandler(resp) {
        throw new ResponseException(handleStatus(resp.status), resp.status, resp);
      },
      responseHandler: resp => resp
    }
    this.handlers = handlers ? { ...defaultHandlers, ...handlers } : defaultHandlers;
  }

  /**
   * Request method for making requests (duh)
   *
   * @param {string} url Url to make request
   * @param {RequestInit} [fetchConfig] Default fetch config
   * @param {boolean} [overrideDefaultConfig] Should override client base fetch config or not
   * @returns {(Promise<Response | any>)}
   * @memberof GenericAPIClient
   */
  public async request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    if (!url.match(/^(\w+:)?\/\//)) {
      url = this.baseURL ? new URL(url, this.baseURL).href : url;
    }
    try {
      let response = this.handlers.responseHandler(await this.handlers.fetchHandler(url, overrideDefaultConfig ? fetchConfig : { ...this.clientConfig, ...fetchConfig }));
      if (!response.ok) {
        return this.handlers.errorHandler(response) || response;
      }
      return response;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Fast alias method for request
   *
   * @private
   * @param {string} method HTTP method (GET, PUT, POST, etc)
   * @param {string} url Url to make request
   * @param {RequestInit} [fetchConfig] Default fetch config
   * @param {boolean} [overrideDefaultConfig] Should override client base fetch config or not
   * @returns {(Promise<Response | any>)}
   * @memberof GenericAPIClient
   */
  private async alias(method: string, url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    fetchConfig = fetchConfig || {};
    fetchConfig.method = method;
    return await this.request(url, fetchConfig, overrideDefaultConfig);
  }

  public async get(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    return await this.alias('get', url, fetchConfig, overrideDefaultConfig);
  }

  public async put(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    return await this.alias('put', url, fetchConfig, overrideDefaultConfig);
  }

  public async post(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    return await this.alias('post', url, fetchConfig, overrideDefaultConfig);
  }

  public async patch(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    return await this.alias('patch', url, fetchConfig, overrideDefaultConfig);
  }

  public async delete(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any> {
    return await this.alias('delete', url, fetchConfig, overrideDefaultConfig);
  }
}

export class ResponseException extends Error {
  constructor(
    message: string,
    public status: ResponseErrors,
    public data?: Response
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
 * @returns {string}
 */
export function handleStatus(status: number = -1): string {
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
