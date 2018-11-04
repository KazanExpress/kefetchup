/**
 * Encode an object into the plain URL as url-query-string
 *
 * @param {String} url a url to encode params into
 * @param {Object} queryParams query params in object form
 * @returns url with encoded params
 */
export function withQuery<T extends object>(url: string, queryParams: T) {
  const encodeQuery = (value, key) => value !== undefined ? `${encodeURIComponent(key)}[]=${encodeURIComponent(value)}` : ''

  const queryStr = Object.keys(queryParams)
    .filter(k => !!k)
    .map((k: any) => {
      if (Array.isArray(queryParams[k])) {
        return queryParams[k]
          .map(v => encodeQuery(v, k))
          .join('&')
      }

      return encodeQuery(queryParams[k], k)
    })
    .join('&');

  const prefix = (url.indexOf('?') > -1 ? '?' : '&');

  return url + (queryStr.length > 0 ? prefix + queryStr : '');
}
