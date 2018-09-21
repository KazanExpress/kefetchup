import 'url-polyfill';

export abstract class GenericAPIClient {

  constructor(
    private readonly baseURL: string = '',
    private readonly fetchHandler: (url: string | Request, options?: RequestInit) => Promise<Response> = fetch,
    private readonly clientConfig?: RequestInit,
    protected readonly errorHandler?: (error: Response) => void
  ) { }

  private handleError(resp: Response) {
    if (this.errorHandler) {
      this.errorHandler(resp);
    } else {
      throw new ResponseException(ResponseErrors[resp.status].toString(), resp.status, resp);
    }
  }

  public async request(url: string | Request, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response> {
    let uri: string = typeof url === 'string' ? url : url.url
    if (!uri.match(/^(\w+:)?\/\//)) {
      uri = new URL(this.baseURL, uri).href
    }
    try {
      let response = await this.fetchHandler(new Request(uri, overrideDefaultConfig ? fetchConfig : { ...this.clientConfig, ...fetchConfig }));
      if (!response.ok) {
        this.handleError(response);
      }
      return response;
    } catch (e) {
      throw new ResponseException(e, -1);
    }
  }
}

export class ResponseException extends Error {
  constructor(
    public message: string,
    public status: ResponseErrors,
    public data?: Response
  ) {
    super(message);
    Object.setPrototypeOf(this, ResponseException.prototype);
    this.name = 'ResponseExcpetion';
    this.message = message;
    this.data = data;
  }

  toString() {
    return this.name + ': ' + this.message;
  }
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
  Unprocessable = 422,
  TooManyRequests = 429,
  ServerError = 500,
  NotImplemented = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}
