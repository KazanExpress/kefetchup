export type APIClientHandlers = {
  fetchHandler: (url: string, options?: RequestInit) => Promise<Response>
  errorHandler: (error: Response) => Response | void
  responseHandler: (response: Response) => Response
}

type Optional<T> = { [key in keyof T]?: T[key] };

export async function defaultFetch(url: string, options?: RequestInit) {
  return await new Response(JSON.stringify({ error: 'Response via default fetch handler', to: url, options }), { status: 200 });
}

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

  public async request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response|any> {
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
