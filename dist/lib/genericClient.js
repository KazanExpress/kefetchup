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
var defaultFetch_1 = require("./defaultFetch");
var errors_1 = require("./errors");
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
     * @param {RequestInit} [clientConfig={}] a default config for requests
     */
    function GenericAPIClient(baseURL, clientConfig) {
        if (baseURL === void 0) { baseURL = ''; }
        if (clientConfig === void 0) { clientConfig = {}; }
        this.baseURL = baseURL;
        this.clientConfig = clientConfig;
        this.fetchHandler = window.fetch ? window.fetch.bind(window) : defaultFetch_1.defaultFetch;
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
        return this.requestFactory(url, overrideDefaultConfig ? fetchConfig : __assign({}, this.clientConfig, fetchConfig), this.fetchHandler);
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
            throw new errors_1.ResponseException(GenericAPIClient.handleStatus(response.status), response.status, response);
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
        if (e instanceof errors_1.ResponseException)
            throw e;
        else
            throw new errors_1.ResponseException('Unkown Error: ', errors_1.ResponseErrors.UnknownError, e);
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
            if (fetchConfig === void 0) { fetchConfig = this.clientConfig; }
            fetchConfig = fetchConfig;
            fetchConfig.method = method ? method.toUpperCase() : (fetchConfig.method || 'GET').toUpperCase();
            return this.request(url, fetchConfig, overrideDefaultConfig);
        };
    };
    GenericAPIClient.handleStatus = function (status) {
        if (status === void 0) { status = -1; }
        return errors_1.ResponseErrors[status] || errors_1.ResponseErrors[-1];
    };
    return GenericAPIClient;
}());
exports.GenericAPIClient = GenericAPIClient;
//# sourceMappingURL=genericClient.js.map