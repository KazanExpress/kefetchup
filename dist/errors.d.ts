import { RequestFunction } from './genericClient';
export declare class ResponseError<T = Response> extends Error {
    status: ResponseErrors;
    data?: T | undefined;
    request?: {
        url: string;
        config: RequestInit;
        request: RequestFunction;
    } | undefined;
    constructor(message: string, status: ResponseErrors, data?: T | undefined, request?: {
        url: string;
        config: RequestInit;
        request: RequestFunction;
    } | undefined);
    toString(): string;
}
/**
 * @deprecated use ResponseError instead
 */ export declare class ResponseException<T = Response> extends ResponseError<T> {
    constructor(message: string, status: ResponseErrors, data?: T);
}
export declare enum ResponseErrors {
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
