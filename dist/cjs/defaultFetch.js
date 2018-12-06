"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
/**
 * Default fetch handler
 *
 * @export
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response>}
 */
function defaultFetch(url, options) {
    return Promise.resolve(new Response(JSON.stringify(exports.defaultFetchHandlerResponseBody(url, options)), exports.defaultFetchHandlerResponseOptions));
}
exports.defaultFetch = defaultFetch;
exports.defaultFetchHandlerResponseBody = function (url, options) { return (__assign({ error: 'Default-fetch-handler response.' }, (url === undefined ? {} : { to: url }), (options === undefined ? {} : { options: options }))); };
exports.defaultFetchHandlerResponseOptions = {
    status: errors_1.ResponseErrors["I'm a teapot"],
    statusText: (typeof fetch !== 'undefined') ? 'why do you use mee?..' : '`fetch` missing in `window`'
};
//# sourceMappingURL=defaultFetch.js.map