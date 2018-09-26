/**
 * Default fetch handler
 *
 * @export
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export declare function defaultFetch(url: string, options?: RequestInit): Promise<Response>;
export declare const defaultFetchHandlerResponseBody: (url: string, options?: RequestInit | undefined) => {
    error: string;
    to: string;
    options: RequestInit | undefined;
};
export declare const defaultFetchHandlerResponseOptions: {
    status: number;
    statusText: string;
};
