class ResponseException extends Error {
    constructor(message, status, data) {
        super(message) /* istanbul ignore next: because stupid typescript */;
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, ResponseException.prototype);
        this.name = 'ResponseException';
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
var ResponseErrors;
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
})(ResponseErrors || (ResponseErrors = {}));

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
const defaultFetchHandlerResponseBody = (url, options) => (Object.assign({ error: 'Default-fetch-handler response.' }, (url === undefined ? {} : { to: url }), (options === undefined ? {} : { options })));
const defaultFetchHandlerResponseOptions = {
    status: ResponseErrors[`I'm a teapot`],
    statusText: '`fetch` missing in `window`'
};

/**
 * Generic API client with default request.
 * Inherit from this class to create a custom extendable api client.
 *
 * Can be instantiated on its own for simple singular requests.
 */
class GenericAPIClient {
    /**
     * Creates an instance of GenericAPIClient.
     * @param {string} [baseURL=''] a base url to prepend to all request urls except for the ones with root urls
     * @param {RequestInit} [baseClientConfig={}] a default config for requests
     */
    constructor(baseURL = '', baseClientConfig = {}) {
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
    request(url, fetchConfig, overrideDefaultConfig = false) {
        if (!url.match(/^(\w+:)?\/\//)) {
            url = this.baseURL ? new URL(url, this.baseURL).href : url;
        }
        return this.requestFactory(url, overrideDefaultConfig ? fetchConfig : Object.assign({}, this.baseClientConfig, fetchConfig), this.fetchHandler);
    }
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
    responseHandler(response) {
        if (response.ok) {
            return response;
        }
        else {
            throw new ResponseException(GenericAPIClient.handleStatus(response.status), response.status, response);
        }
    }
    /**
     * Processes the request error before allowing to throw it upstack.
     * Override this function to provide custom response error handling.
     * Return value instead of throwing for soft error handling.
     *
     * @protected
     * @param e the error catched from the request promise
     * @memberof GenericAPIClient
     */
    errorHandler(e) {
        if (e instanceof ResponseException)
            throw e;
        else
            throw new ResponseException('Unkown Error: ', ResponseErrors.UnknownError, e);
    }
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
    requestFactory(url, config, requestFunction) {
        return new Promise((resolve, _) => requestFunction(url, config)
            .then(r => resolve(this.responseHandler(r)))
            .catch(this.errorHandler));
    }
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
    alias(method) {
        return function (url, fetchConfig = this.baseClientConfig, overrideDefaultConfig) {
            fetchConfig = fetchConfig;
            fetchConfig.method = method ? method.toUpperCase() : (fetchConfig.method || 'GET').toUpperCase();
            return this.request(url, fetchConfig, overrideDefaultConfig);
        };
    }
    static handleStatus(status = -1) {
        return ResponseErrors[status] || ResponseErrors[-1];
    }
}

/**
 * @inheritdoc
 */
class JsonAPIClient extends GenericAPIClient {
    /**
     * @inheritdoc
     */
    responseHandler(resp) {
        return resp.json();
    }
}
/**
 * @inheritdoc
 */
class TextAPIClient extends GenericAPIClient {
    /**
     * @inheritdoc
     */
    responseHandler(resp) {
        return resp.text();
    }
}

export { JsonAPIClient, TextAPIClient, GenericAPIClient, ResponseException, ResponseErrors };
//# sourceMappingURL=kefetchup.es.js.map
