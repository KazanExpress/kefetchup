import { defaultFetch } from './defaultFetch';
import { ResponseError, ResponseErrors } from './errors';
/**
 * Generic API client with default request.
 * Inherit from this class to create a custom extendable api client.
 *
 * Can be instantiated on its own for simple singular requests.
 */
export class GenericAPIClient {
    /**
     * Creates an instance of GenericAPIClient.
     * @param {string} [$baseURL=''] a base url to prepend to all request urls except for the ones with root urls
     * @param {RequestInit} [$baseClientConfig={}] a default config for requests
     */
    constructor($baseURL = '', $baseClientConfig = {}) {
        this.$baseURL = $baseURL;
        this.$baseClientConfig = $baseClientConfig;
        this.$fetchHandler = window.fetch ? window.fetch.bind(window) : defaultFetch;
    }
    /**
     * Makes requests using request factory and resolves config merge conflicts.
     *
     * @private
     */
    $request(url, fetchConfig, overrideDefaultConfig = false) {
        if (!url.match(/^(\w+:)?\/\//)) {
            url = this.$baseURL ? new URL(url, this.$baseURL).href : url;
        }
        return this.$requestFactory(url, overrideDefaultConfig ?
            fetchConfig : Object.assign(Object.assign(Object.assign({}, this.$baseClientConfig), fetchConfig), { headers: Object.assign(Object.assign({}, (this.$baseClientConfig.headers || {})), (fetchConfig.headers || {})) }), this.$fetchHandler);
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
    $responseHandler(response) {
        if (response.ok) {
            return response;
        }
        else {
            throw new ResponseError(GenericAPIClient.handleStatus(response.status), response.status, response);
        }
    }
    /**
     * Processes the request error before allowing to throw it upstack.
     * Override this function to provide custom response error handling.
     * Return value instead of throwing for soft error handling.
     *
     * @protected
     * @param e the error catched from the request promise
     * @param url a url string that would be passed into the request function
     * @param config a request config that would be passed into the request function
     * @param request a function that performs a request (for retrying purposes)
     * @memberof GenericAPIClient
     */
    //@ts-ignore
    $errorHandler(e, url, config, request) {
        if (e instanceof ResponseError) {
            throw e;
        }
        else {
            // Network error!
            throw new ResponseError('Unkown Error: ', ResponseErrors.UnknownError, e, {
                url, config, request
            });
        }
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
    $requestFactory(url, config, requestFunction) {
        return requestFunction(url, config)
            .then(r => this.$responseHandler(r))
            .catch(e => this.$errorHandler(e, url, config, requestFunction));
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
    $alias(method) {
        return function (url, fetchConfig = this.$baseClientConfig, overrideDefaultConfig) {
            fetchConfig.method = method ? method.toUpperCase() : (fetchConfig.method || 'GET').toUpperCase();
            return this.$request(url, fetchConfig, overrideDefaultConfig);
        };
    }
    static handleStatus(status = -1) {
        return ResponseErrors[status] || ResponseErrors[-1];
    }
}
//# sourceMappingURL=genericClient.js.map