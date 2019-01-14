export class ResponseError<T = Response> extends Error {
  constructor(
    message: string,
    public status: ResponseErrors,
    public data?: T
  ) {
    super(message)/* istanbul ignore next: because stupid typescript */;
    Object.setPrototypeOf(this, ResponseError.prototype);
    this.name = 'ResponseError';
  }

  toString() {
    return this.name + ': ' + this.message + (this.data != undefined ? '\n\n' + this.data : '');
  }
}

/**
 * @deprecated use ResponseError instead
 *//* istanbul ignore next */
export class ResponseException<T = Response> extends ResponseError<T> {
  constructor(message: string, status: ResponseErrors, data?: T) {
    super(message, status, data);
    this.name = 'ResponseException';
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
