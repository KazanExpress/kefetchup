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
  status: 418,
  statusText: '`fetch` missing in `window`'
};
