"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAPIClient = exports.JsonAPIClient = void 0;
var genericClient_1 = require("./genericClient");
__exportStar(require("./genericClient"), exports);
__exportStar(require("./errors"), exports);
__exportStar(require("./util"), exports);
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
    JsonAPIClient.prototype.$responseHandler = function (resp) {
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
    TextAPIClient.prototype.$responseHandler = function (resp) {
        return resp.text();
    };
    return TextAPIClient;
}(genericClient_1.GenericAPIClient));
exports.TextAPIClient = TextAPIClient;
//# sourceMappingURL=index.js.map