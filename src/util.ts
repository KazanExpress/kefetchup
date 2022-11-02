/**
 * Encode an object into the plain URL as url-query-string
 *
 * ```js
withQuery('/list', {
  amount: 5,
  filters: ['price', 'date']
})```
 *
 * returns
 * ```js
'/list?amount=5&filters=price,date'```
 *
 * @param {String} url a url to encode params into
 * @param {Object} queryParams query params in object form
 * @returns url with encoded params
 */
export function withQuery<T extends Record<string, unknown>>(url: string, queryParams: T) {
  const encodeQuery = (value: string, key: string | number | boolean) => `${encodeURIComponent(key)}=${encodeURI(value)}`;

  const queryArr = Object.keys(queryParams)
    .filter(k => !!k && queryParams[k] !== undefined)
    .map((k) => {
      if (Array.isArray(queryParams[k])) {
        return encodeQuery((queryParams[k] as Array<unknown>).join(','), k);
      }

      return encodeQuery(String(queryParams[k]), k);
    });

  const queryStr = queryArr.length !== 1 ? queryArr.join('&') : queryArr[0];

  const prefix = (url.indexOf('?') > -1 ? '&' : '?');

  return url + (queryStr.length > 0 ? prefix + queryStr : '');
}
