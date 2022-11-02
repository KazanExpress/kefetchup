import { defaultFetch } from './defaultFetch';
import { ResponseError, ResponseErrors } from './errors';

export type RequestFunction = (url: string, config?: RequestInit) => Promise<Response>;

/**
 * Generic API client with default request.
 * Inherit from this class to create a custom extendable api client.
 *
 * Can be instantiated on its own for simple singular requests.
 */
export class GenericAPIClient {
  public $fetchHandler = window.fetch ? window.fetch.bind(window) : defaultFetch;

  /**
   * Creates an instance of GenericAPIClient.
   * @param {string} [$baseURL=''] a base url to prepend to all request urls except for the ones with root urls
   * @param {RequestInit} [$baseClientConfig={}] a default config for requests
   */
  constructor(
    public readonly $baseURL: string = '',
    public readonly $baseClientConfig: RequestInit = {}
  ) {}

  /**
   * Makes requests using request factory and resolves config merge conflicts.
   *
   * @private
   */
  private $request(
    url: string,
    fetchConfig: RequestInit,
    overrideDefaultConfig: boolean = false
  ): Promise<any> {
    if (!url.match(/^(\w+:)?\/\//)) {
      url = this.$baseURL ? new URL(url, this.$baseURL).href : url;
    }

    return this.$requestFactory(
      url,
      overrideDefaultConfig ?
        fetchConfig :
        {
          ...this.$baseClientConfig,
          ...fetchConfig,
          headers: {
            ...(this.$baseClientConfig.headers || {}), ...(fetchConfig.headers || {})
          }
        },
      this.$fetchHandler
    );
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
  protected $responseHandler(response: Response): any {
    if (response.ok) {
      return response;
    } else {
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
  protected $errorHandler(e: any, url: string, config: RequestInit, request: RequestFunction): any {
    if (e instanceof ResponseError) {
      throw e;
    } else {
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
  protected $requestFactory(
    url: string,
    config: RequestInit,
    requestFunction: RequestFunction
  ): Promise<any> {
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
  protected $alias(method: string) {
    return function (this: GenericAPIClient,
      url: string,
      fetchConfig: RequestInit = this.$baseClientConfig,
      overrideDefaultConfig?: boolean
    ): ReturnType<typeof this['$request']> {
      fetchConfig.method = method ? method.toUpperCase() : (fetchConfig.method || 'GET').toUpperCase();
      return this.$request(url, fetchConfig, overrideDefaultConfig);
    }
  }

  /**
   * Retrieves response status string in a readable format from a status number
   *
   * @param {number|string} [status=-1] Response status (200, 404, 500, etc)
   * @returns {string} a status literal for logging
   */
  public static handleStatus(status?: number): string;

  /**
   * Retrieves response status number from a readable PascalCase string
   *
   * @param {number|string} [status=-1] Response status ("NotFound", "OK", "Unknown", etc)
   * @returns {number} a status number for requests
   */
  public static handleStatus(status: keyof typeof ResponseErrors): number;

  public static handleStatus(status: keyof typeof ResponseErrors | number = -1) {
    return ResponseErrors[status] || ResponseErrors[-1];
  }
}
