(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.kefetchup = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    var ResponseException = /** @class */ (function (_super) {
        __extends(ResponseException, _super);
        function ResponseException(message, status, data) {
            var _this = _super.call(this, message) /* istanbul ignore next: because stupid typescript */ || this;
            _this.status = status;
            _this.data = data;
            Object.setPrototypeOf(_this, ResponseException.prototype);
            _this.name = 'ResponseException';
            return _this;
        }
        ResponseException.prototype.toString = function () {
            return this.name + ': ' + this.message;
        };
        return ResponseException;
    }(Error));
    (function (ResponseErrors) {
        ResponseErrors[ResponseErrors["BadRequest"] = 400] = "BadRequest";
        ResponseErrors[ResponseErrors["Unauthorized"] = 401] = "Unauthorized";
        ResponseErrors[ResponseErrors["PaymentRequired"] = 402] = "PaymentRequired";
        ResponseErrors[ResponseErrors["Forbidden"] = 403] = "Forbidden";
        ResponseErrors[ResponseErrors["NotFound"] = 404] = "NotFound";
        ResponseErrors[ResponseErrors["MethodNotAllowed"] = 405] = "MethodNotAllowed";
        ResponseErrors[ResponseErrors["NotAcceptable"] = 406] = "NotAcceptable";
        ResponseErrors[ResponseErrors["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
        ResponseErrors[ResponseErrors["RequestTimeout"] = 408] = "RequestTimeout";
        ResponseErrors[ResponseErrors["Conflict"] = 409] = "Conflict";
        ResponseErrors[ResponseErrors["Gone"] = 410] = "Gone";
        ResponseErrors[ResponseErrors["LengthRequired"] = 411] = "LengthRequired";
        ResponseErrors[ResponseErrors["InvalidMedia"] = 415] = "InvalidMedia";
        ResponseErrors[ResponseErrors["I'm a teapot"] = 418] = "I'm a teapot";
        ResponseErrors[ResponseErrors["Unprocessable"] = 422] = "Unprocessable";
        ResponseErrors[ResponseErrors["TooManyRequests"] = 429] = "TooManyRequests";
        ResponseErrors[ResponseErrors["ServerError"] = 500] = "ServerError";
        ResponseErrors[ResponseErrors["NotImplemented"] = 501] = "NotImplemented";
        ResponseErrors[ResponseErrors["BadGateway"] = 502] = "BadGateway";
        ResponseErrors[ResponseErrors["ServiceUnavailable"] = 503] = "ServiceUnavailable";
        ResponseErrors[ResponseErrors["GatewayTimeout"] = 504] = "GatewayTimeout";
        ResponseErrors[ResponseErrors["UnknownError"] = -1] = "UnknownError";
    })(exports.ResponseErrors || (exports.ResponseErrors = {}));

    /**
     * Default fetch handler
     *
     * @export
     * @param {string} url
     * @param {RequestInit} [options]
     * @returns {Promise<Response>}
     */
    function defaultFetch(url, options) {
        return Promise.resolve(new Response(JSON.stringify(defaultFetchHandlerResponseBody(url, options)), defaultFetchHandlerResponseOptions));
    }
    var defaultFetchHandlerResponseBody = function (url, options) { return (__assign({ error: 'Default-fetch-handler response.' }, (url === undefined ? {} : { to: url }), (options === undefined ? {} : { options: options }))); };
    var defaultFetchHandlerResponseOptions = {
        status: exports.ResponseErrors["I'm a teapot"],
        statusText: '`fetch` missing in `window`'
    };

    /**
     * Generic API client with default request.
     * Inherit from this class to create a custom extendable api client.
     *
     * Can be instantiated on its own for simple singular requests.
     */
    var GenericAPIClient = /** @class */ (function () {
        /**
         * Creates an instance of GenericAPIClient.
         * @param {string} [baseURL=''] a base url to prepend to all request urls except for the ones with root urls
         * @param {RequestInit} [baseClientConfig={}] a default config for requests
         */
        function GenericAPIClient(baseURL, baseClientConfig) {
            if (baseURL === void 0) { baseURL = ''; }
            if (baseClientConfig === void 0) { baseClientConfig = {}; }
            this.baseURL = baseURL;
            this.baseClientConfig = baseClientConfig;
            this.fetchHandler = window.fetch ? window.fetch.bind(window) : defaultFetch;
            this.get = this.alias('get');
            this.put = this.alias('put');
            this.post = this.alias('post');
            this.patch = this.alias('patch');
            this.delete = this.alias('delete');
        }
        /**
         * Makes requests using request factory and resolves config merge conflicts.
         *
         * @private
         */
        GenericAPIClient.prototype.request = function (url, fetchConfig, overrideDefaultConfig) {
            if (overrideDefaultConfig === void 0) { overrideDefaultConfig = false; }
            if (!url.match(/^(\w+:)?\/\//)) {
                url = this.baseURL ? new URL(url, this.baseURL).href : url;
            }
            return this.requestFactory(url, overrideDefaultConfig ?
                fetchConfig : __assign({}, this.baseClientConfig, fetchConfig, { headers: __assign({}, (this.baseClientConfig.headers || {}), (fetchConfig.headers || {})) }), this.fetchHandler);
        };
        /**
         * Processes the response before allowing to return its value from request function.
         * Override this function to provide custom response interception.
         * Keep in mind that this function does not have to return a promise.
         *
         * @protected
         * @param {Response} response the response returned from fetchHandler
         * @returns {*} default: the same response
         * @memberof GenericAPIClient
         */
        GenericAPIClient.prototype.responseHandler = function (response) {
            if (response.ok) {
                return response;
            }
            else {
                throw new ResponseException(GenericAPIClient.handleStatus(response.status), response.status, response);
            }
        };
        /**
         * Processes the request error before allowing to throw it upstack.
         * Override this function to provide custom response error handling.
         * Return value instead of throwing for soft error handling.
         *
         * @protected
         * @param e the error catched from the request promise
         * @memberof GenericAPIClient
         */
        GenericAPIClient.prototype.errorHandler = function (e) {
            if (e instanceof ResponseException)
                throw e;
            else
                throw new ResponseException('Unkown Error: ', exports.ResponseErrors.UnknownError, e);
        };
        /**
         * A general request factory function.
         * Calls request and error handlers, can be used for pre-processing the url and request config before sending.
         * Override for a completely custom request & response handling behaviour.
         *
         * @protected
         * @param url a url string that would be passed into the request function
         * @param config a request config that would be passed into the request function
         * @param requestFunction
         */
        GenericAPIClient.prototype.requestFactory = function (url, config, requestFunction) {
            var _this = this;
            return new Promise(function (resolve, _) { return requestFunction(url, config)
                .then(function (r) { return resolve(_this.responseHandler(r)); })
                .catch(_this.errorHandler); });
        };
        /**
         * Request method alias factory.
         * Used to quickly produce alias function for class' decendants.
         * Override at your own risk.
         *
         * @protected
         * @param {string} method HTTP method (GET, PUT, POST, etc) to alias
         * @returns an alias function for request
         * @memberof GenericAPIClient
         */
        GenericAPIClient.prototype.alias = function (method) {
            return function (url, fetchConfig, overrideDefaultConfig) {
                if (fetchConfig === void 0) { fetchConfig = this.baseClientConfig; }
                fetchConfig = fetchConfig;
                fetchConfig.method = method ? method.toUpperCase() : (fetchConfig.method || 'GET').toUpperCase();
                return this.request(url, fetchConfig, overrideDefaultConfig);
            };
        };
        GenericAPIClient.handleStatus = function (status) {
            if (status === void 0) { status = -1; }
            return exports.ResponseErrors[status] || exports.ResponseErrors[-1];
        };
        return GenericAPIClient;
    }());

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

    /**
     * @inheritdoc
     */
    var JsonAPIClient = /** @class */ (function (_super) {
        __extends(JsonAPIClient, _super);
        function JsonAPIClient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        JsonAPIClient.prototype.responseHandler = function (resp) {
            return resp.json();
        };
        return JsonAPIClient;
    }(GenericAPIClient));
    /**
     * @inheritdoc
     */
    var TextAPIClient = /** @class */ (function (_super) {
        __extends(TextAPIClient, _super);
        function TextAPIClient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritdoc
         */
        TextAPIClient.prototype.responseHandler = function (resp) {
            return resp.text();
        };
        return TextAPIClient;
    }(GenericAPIClient));

    exports.JsonAPIClient = JsonAPIClient;
    exports.TextAPIClient = TextAPIClient;
    exports.GenericAPIClient = GenericAPIClient;
    exports.ResponseException = ResponseException;
    exports.withQuery = withQuery;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=kefetchup.umd.js.map
