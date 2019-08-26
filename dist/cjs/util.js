"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function withQuery(url, queryParams) {
    var encodeQuery = function (value, key) { return encodeURIComponent(key) + "=" + encodeURI(value); };
    var queryArr = Object.keys(queryParams)
        .filter(function (k) { return !!k && queryParams[k] !== undefined; })
        .map(function (k) {
        if (Array.isArray(queryParams[k])) {
            return encodeQuery(queryParams[k].join(','), k);
        }
        return encodeQuery(queryParams[k], k);
    });
    var queryStr = queryArr.length !== 1 ? queryArr.join('&') : queryArr[0];
    var prefix = (url.indexOf('?') > -1 ? '&' : '?');
    return url + (queryStr.length > 0 ? prefix + queryStr : '');
}
exports.withQuery = withQuery;
//# sourceMappingURL=util.js.map