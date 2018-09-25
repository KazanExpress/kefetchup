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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function defaultFetch(url, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Response(JSON.stringify({ error: 'Response via default fetch handler', to: url, options: options }), { status: 200 })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.defaultFetch = defaultFetch;
var GenericAPIClient = /** @class */ (function () {
    function GenericAPIClient(baseURL, clientConfig, handlers) {
        if (baseURL === void 0) { baseURL = ''; }
        this.baseURL = baseURL;
        this.clientConfig = clientConfig;
        var defaultHandlers = {
            fetchHandler: window.fetch || defaultFetch,
            errorHandler: function (resp) {
                throw new ResponseException(handleStatus(resp.status), resp.status, resp);
            },
            responseHandler: function (resp) { return resp; }
        };
        this.handlers = handlers ? __assign({}, defaultHandlers, handlers) : defaultHandlers;
    }
    GenericAPIClient.prototype.request = function (url, fetchConfig, overrideDefaultConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!url.match(/^(\w+:)?\/\//)) {
                            url = this.baseURL ? new URL(url, this.baseURL).href : url;
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = (_a = this.handlers).responseHandler;
                        return [4 /*yield*/, this.handlers.fetchHandler(url, overrideDefaultConfig ? fetchConfig : __assign({}, this.clientConfig, fetchConfig))];
                    case 2:
                        response = _b.apply(_a, [_c.sent()]);
                        if (!response.ok) {
                            return [2 /*return*/, this.handlers.errorHandler(response) || response];
                        }
                        return [2 /*return*/, response];
                    case 3:
                        e_1 = _c.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GenericAPIClient;
}());
exports.GenericAPIClient = GenericAPIClient;
var ResponseException = /** @class */ (function (_super) {
    __extends(ResponseException, _super);
    function ResponseException(message, status, data) {
        var _this = _super.call(this, message) /* istanbul ignore next: I DON'T KNOW WHY!!!!! */ || this;
        _this.status = status;
        _this.data = data;
        Object.setPrototypeOf(_this, ResponseException.prototype);
        _this.name = 'ResponseExcpetion';
        return _this;
    }
    ResponseException.prototype.toString = function () {
        return this.name + ': ' + this.message;
    };
    return ResponseException;
}(Error));
exports.ResponseException = ResponseException;
function handleStatus(status) {
    if (status === void 0) { status = -1; }
    return ResponseErrors[status] || ResponseErrors[-1];
}
exports.handleStatus = handleStatus;
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
    ResponseErrors[ResponseErrors["Unprocessable"] = 422] = "Unprocessable";
    ResponseErrors[ResponseErrors["TooManyRequests"] = 429] = "TooManyRequests";
    ResponseErrors[ResponseErrors["ServerError"] = 500] = "ServerError";
    ResponseErrors[ResponseErrors["NotImplemented"] = 501] = "NotImplemented";
    ResponseErrors[ResponseErrors["BadGateway"] = 502] = "BadGateway";
    ResponseErrors[ResponseErrors["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    ResponseErrors[ResponseErrors["GatewayTimeout"] = 504] = "GatewayTimeout";
    ResponseErrors[ResponseErrors["UnknownError"] = -1] = "UnknownError";
})(ResponseErrors = exports.ResponseErrors || (exports.ResponseErrors = {}));
//# sourceMappingURL=generic-client.js.map