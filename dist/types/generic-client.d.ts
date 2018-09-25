export declare type APIClientHandlers = {
    fetchHandler: (url: string, options?: RequestInit) => Promise<Response>;
    errorHandler: (error: Response) => Response | void;
    responseHandler: (response: Response) => Response;
};
declare type Optional<T> = {
    [key in keyof T]?: T[key];
};
export declare function defaultFetch(url: string, options?: RequestInit): Promise<Response>;
export declare class GenericAPIClient {
    readonly baseURL: string;
    readonly clientConfig?: RequestInit | undefined;
    readonly handlers: APIClientHandlers;
    constructor(baseURL?: string, clientConfig?: RequestInit | undefined, handlers?: Optional<APIClientHandlers>);
    request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
}
export declare class ResponseException extends Error {
    status: ResponseErrors;
    data?: Response | undefined;
    constructor(message: string, status: ResponseErrors, data?: Response | undefined);
    toString(): string;
}
export declare function handleStatus(status?: number): string;
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
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    UnknownError = -1
}
export {};
