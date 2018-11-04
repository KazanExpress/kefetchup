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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var genericClient_1 = require("./genericClient");
__export(require("./genericClient"));
__export(require("./errors"));
__export(require("./util"));
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
}(genericClient_1.GenericAPIClient));
exports.JsonAPIClient = JsonAPIClient;
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
}(genericClient_1.GenericAPIClient));
exports.TextAPIClient = TextAPIClient;
//# sourceMappingURL=index.js.map