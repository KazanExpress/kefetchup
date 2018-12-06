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
export function withQuery(url, queryParams) {
    const encodeQuery = (value, key) => `${encodeURIComponent(key)}=${encodeURI(value)}`;
    const queryArr = Object.keys(queryParams)
        .filter(k => !!k && queryParams[k] !== undefined)
        .map((k) => {
        if (Array.isArray(queryParams[k])) {
            return encodeQuery(queryParams[k].join(','), k);
        }
        return encodeQuery(queryParams[k], k);
    });
    const queryStr = queryArr.length !== 1 ? queryArr.join('&') : queryArr[0];
    const prefix = (url.indexOf('?') > -1 ? '&' : '?');
    return url + (queryStr.length > 0 ? prefix + queryStr : '');
}
//# sourceMappingURL=util.js.map