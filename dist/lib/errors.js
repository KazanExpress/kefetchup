"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.ResponseException = ResponseException;
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
})(ResponseErrors = exports.ResponseErrors || (exports.ResponseErrors = {}));
//# sourceMappingURL=errors.js.map