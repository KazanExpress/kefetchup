import { ResponseErrors } from './errors';
/**
 * Default fetch handler
 *
 * @export
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export declare function defaultFetch(url: string, options?: RequestInit): Promise<Response>;
export declare const defaultFetchHandlerResponseBody: (url: string, options?: RequestInit) => {
    options?: RequestInit | undefined;
    to?: string | undefined;
    error: string;
};
export declare const defaultFetchHandlerResponseOptions: {
    status: ResponseErrors;
    statusText: string;
};
