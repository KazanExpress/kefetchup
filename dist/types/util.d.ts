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
export declare function withQuery<T extends Record<string, unknown>>(url: string, queryParams: T): string;
