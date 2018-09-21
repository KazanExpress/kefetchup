import 'url-polyfill';
export declare abstract class GenericAPIClient {
    private readonly baseURL;
    private readonly fetchHandler;
    private readonly clientConfig?;
    protected readonly errorHandler?: ((error: Response) => void) | undefined;
    constructor(baseURL?: string, fetchHandler?: (url: string | Request, options?: RequestInit) => Promise<Response>, clientConfig?: RequestInit | undefined, errorHandler?: ((error: Response) => void) | undefined);
    private handleError;
    request(url: string | Request, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response>;
}
export declare class ResponseException extends Error {
    message: string;
    status: ResponseErrors;
    data?: Response | undefined;
    constructor(message: string, status: ResponseErrors, data?: Response | undefined);
    toString(): string;
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
    Unprocessable = 422,
    TooManyRequests = 429,
    ServerError = 500,
    NotImplemented = 500,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}
