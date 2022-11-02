import { ResponseErrors } from './errors';
/**
 * Default fetch handler
 *
 * @export
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export function defaultFetch(url, options) {
    return Promise.resolve(new Response(JSON.stringify(defaultFetchHandlerResponseBody(url, options)), defaultFetchHandlerResponseOptions));
}
export const defaultFetchHandlerResponseBody = (url, options) => (Object.assign(Object.assign({ error: 'Default-fetch-handler response.' }, (url === undefined ? {} : { to: url })), (options === undefined ? {} : { options })));
export const defaultFetchHandlerResponseOptions = {
    status: ResponseErrors[`I'm a teapot`],
    statusText: (typeof fetch !== 'undefined') ? 'why do you use mee?..' : '`fetch` missing in `window`'
};
//# sourceMappingURL=defaultFetch.js.map