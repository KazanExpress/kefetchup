export declare type APIClientHandlers = {
    fetchHandler: (url: string, options?: RequestInit) => Promise<Response>;
    errorHandler: (error: Response) => Response | void;
    responseHandler: (response: Response) => Response;
};
declare type Optional<T> = {
    [key in keyof T]?: T[key];
};
/**
 * Generic API client with default request
 *
 * @export
 * @class GenericAPIClient
 */
export declare class GenericAPIClient {
    readonly baseURL: string;
    readonly clientConfig?: RequestInit | undefined;
    readonly handlers: APIClientHandlers;
    constructor(baseURL?: string, clientConfig?: RequestInit | undefined, handlers?: Optional<APIClientHandlers>);
    /**
     * Request method for making requests (duh)
     *
     * @param {string} url Url to make request
     * @param {RequestInit} [fetchConfig] Default fetch config
     * @param {boolean} [overrideDefaultConfig] Should override client base fetch config or not
     * @returns {(Promise<Response | any>)}
     * @memberof GenericAPIClient
     */
    request(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
    /**
     * Fast alias method for request
     *
     * @protected
     * @param {string} method HTTP method (GET, PUT, POST, etc)
     * @param {string} url Url to make request
     * @param {RequestInit} [fetchConfig] Default fetch config
     * @param {boolean} [overrideDefaultConfig] Should override client base fetch config or not
     * @returns {(Promise<Response | any>)}
     * @memberof GenericAPIClient
     */
    protected alias(method: string, url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
    get(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
    put(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
    post(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
    patch(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
    delete(url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean): Promise<Response | any>;
}
export declare class ResponseException extends Error {
    status: ResponseErrors;
    data?: Response | undefined;
    constructor(message: string, status: ResponseErrors, data?: Response | undefined);
    toString(): string;
}
/**
 * Retrieve string from response status
 *
 * @export
 * @param {number} [status=-1] Response status (200, 404, 500, etc)
 * @returns {string}
 */
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
export {};
