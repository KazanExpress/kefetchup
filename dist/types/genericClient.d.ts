/**
 * Generic API client with default request.
 * Inherit from this class to create a custom extendable api client.
 *
 * Can be instantiated on its own for simple singular requests.
 */
export declare class GenericAPIClient {
    readonly $baseURL: string;
    readonly $baseClientConfig: RequestInit;
    $fetchHandler: any;
    /**
     * Creates an instance of GenericAPIClient.
     * @param {string} [$baseURL=''] a base url to prepend to all request urls except for the ones with root urls
     * @param {RequestInit} [$baseClientConfig={}] a default config for requests
     */
    constructor($baseURL?: string, $baseClientConfig?: RequestInit);
    /**
     * Makes requests using request factory and resolves config merge conflicts.
     *
     * @private
     */
    private $request;
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
    protected $responseHandler(response: Response): any;
    /**
     * Processes the request error before allowing to throw it upstack.
     * Override this function to provide custom response error handling.
     * Return value instead of throwing for soft error handling.
     *
     * @protected
     * @param e the error catched from the request promise
     * @memberof GenericAPIClient
     */
    protected $errorHandler(e: any): any;
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
    protected $requestFactory(url: string, config: RequestInit, requestFunction: (url: string, config?: RequestInit) => Promise<Response>): Promise<any>;
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
    protected $alias(method: string): (this: GenericAPIClient, url: string, fetchConfig?: RequestInit, overrideDefaultConfig?: boolean | undefined) => Promise<any>;
    /**
     * Retrieves response status string in a readable format from a status number
     *
     * @param {number|string} [status=-1] Response status (200, 404, 500, etc)
     * @returns {string} a status literal for logging
     */
    static handleStatus(status?: number): string;
    /**
     * Retrieves response status number from a readable PascalCase string
     *
     * @param {number|string} [status=-1] Response status ("NotFound", "OK", "Unknown", etc)
     * @returns {number} a status number for requests
     */
    static handleStatus(status: string): number;
}
