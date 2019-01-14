import { ResponseErrors } from './errors';

/**
 * Default fetch handler
 *
 * @export
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
export function defaultFetch(url: string, options?: RequestInit): Promise<Response> {
  return Promise.resolve(new Response(
    JSON.stringify(defaultFetchHandlerResponseBody(url, options)),
    defaultFetchHandlerResponseOptions
  ));
}

export const defaultFetchHandlerResponseBody = (url: string, options?: RequestInit) => ({
  error: 'Default-fetch-handler response.',

  // Emulate a behaviour of JSON.stringify that does not enumerate undefined properties
  ...(url === undefined ? {} : { to: url }),
  ...(options === undefined ? {} : { options })
});

export const defaultFetchHandlerResponseOptions = {
  status: ResponseErrors[`I'm a teapot`],
  statusText: (typeof fetch !== 'undefined') ? 'why do you use mee?..' : '`fetch` missing in `window`'
};
