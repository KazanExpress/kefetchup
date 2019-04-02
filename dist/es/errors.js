export class ResponseError extends Error {
    constructor(message, status, data) {
        super(message) /* istanbul ignore next: because stupid typescript */;
        this.status = status;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
        this.name = 'ResponseError';
    }
    toString() {
        return this.name + ': ' + this.message + (this.data != undefined ? '\n\n' + this.data : '');
    }
}
/**
 * @deprecated use ResponseError instead
 */ /* istanbul ignore next */
export class ResponseException extends ResponseError {
    constructor(message, status, data) {
        super(message, status, data);
        this.name = 'ResponseException';
    }
}
export var ResponseErrors;
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
//# sourceMappingURL=errors.js.map