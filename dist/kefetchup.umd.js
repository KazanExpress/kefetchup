(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.kefetchup = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    (function(global) {
      /**
       * Polyfill URLSearchParams
       *
       * Inspired from : https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js
       */

      var checkIfIteratorIsSupported = function() {
        try {
          return !!Symbol.iterator;
        } catch (error) {
          return false;
        }
      };


      var iteratorSupported = checkIfIteratorIsSupported();

      var createIterator = function(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return { done: value === void 0, value: value };
          }
        };

        if (iteratorSupported) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }

        return iterator;
      };

      /**
       * Search param name and values should be encoded according to https://url.spec.whatwg.org/#urlencoded-serializing
       * encodeURIComponent() produces the same result except encoding spaces as `%20` instead of `+`.
       */
      var serializeParam = function(value) {
        return encodeURIComponent(value).replace(/%20/g, '+');
      };

      var deserializeParam = function(value) {
        return decodeURIComponent(value).replace(/\+/g, ' ');
      };

      var polyfillURLSearchParams = function() {

        var URLSearchParams = function(searchString) {
          Object.defineProperty(this, '_entries', { writable: true, value: {} });

          if (typeof searchString === 'string') {
            if (searchString !== '') {
              this._fromString(searchString);
            }
          } else if (searchString instanceof URLSearchParams) {
            var _this = this;
            searchString.forEach(function(value, name) {
              _this.append(name, value);
            });
          }
        };

        var proto = URLSearchParams.prototype;

        proto.append = function(name, value) {
          if (name in this._entries) {
            this._entries[name].push(value.toString());
          } else {
            this._entries[name] = [value.toString()];
          }
        };

        proto.delete = function(name) {
          delete this._entries[name];
        };

        proto.get = function(name) {
          return (name in this._entries) ? this._entries[name][0] : null;
        };

        proto.getAll = function(name) {
          return (name in this._entries) ? this._entries[name].slice(0) : [];
        };

        proto.has = function(name) {
          return (name in this._entries);
        };

        proto.set = function(name, value) {
          this._entries[name] = [value.toString()];
        };

        proto.forEach = function(callback, thisArg) {
          var entries;
          for (var name in this._entries) {
            if (this._entries.hasOwnProperty(name)) {
              entries = this._entries[name];
              for (var i = 0; i < entries.length; i++) {
                callback.call(thisArg, entries[i], name, this);
              }
            }
          }
        };

        proto.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return createIterator(items);
        };

        proto.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return createIterator(items);
        };

        proto.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return createIterator(items);
        };

        if (iteratorSupported) {
          proto[Symbol.iterator] = proto.entries;
        }

        proto.toString = function() {
          var searchArray = [];
          this.forEach(function(value, name) {
            searchArray.push(serializeParam(name) + '=' + serializeParam(value));
          });
          return searchArray.join('&');
        };

        Object.defineProperty(proto, '_fromString', {
          enumerable: false,
          configurable: false,
          writable: false,
          value: function(searchString) {
            this._entries = {};
            searchString = searchString.replace(/^\?/, '');
            var attributes = searchString.split('&');
            var attribute;
            for (var i = 0; i < attributes.length; i++) {
              attribute = attributes[i].split('=');
              this.append(
                deserializeParam(attribute[0]),
                (attribute.length > 1) ? deserializeParam(attribute[1]) : ''
              );
            }
          }
        });

        global.URLSearchParams = URLSearchParams;
      };

      if (!('URLSearchParams' in global) || (new URLSearchParams('?a=1').toString() !== 'a=1')) {
        polyfillURLSearchParams();
      }

      if (typeof URLSearchParams.prototype.sort !== 'function') {
        URLSearchParams.prototype.sort = function() {
          var _this = this;
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
            if (!_this._entries) {
              _this.delete(name);
            }
          });
          items.sort(function(a, b) {
            if (a[0] < b[0]) {
              return -1;
            } else if (a[0] > b[0]) {
              return +1;
            } else {
              return 0;
            }
          });
          if (_this._entries) { // force reset because IE keeps keys index
            _this._entries = {};
          }
          for (var i = 0; i < items.length; i++) {
            this.append(items[i][0], items[i][1]);
          }
        };
      }

      // HTMLAnchorElement

    })(
      (typeof commonjsGlobal !== 'undefined') ? commonjsGlobal
        : ((typeof window !== 'undefined') ? window
        : ((typeof self !== 'undefined') ? self : commonjsGlobal))
    );

    (function(global) {
      /**
       * Polyfill URL
       *
       * Inspired from : https://github.com/arv/DOM-URL-Polyfill/blob/master/src/url.js
       */

      var checkIfURLIsSupported = function() {
        try {
          var u = new URL('b', 'http://a');
          u.pathname = 'c%20d';
          return (u.href === 'http://a/c%20d') && u.searchParams;
        } catch (e) {
          return false;
        }
      };


      var polyfillURL = function() {
        var _URL = global.URL;

        var URL = function(url, base) {
          if (typeof url !== 'string') url = String(url);

          // Only create another document if the base is different from current location.
          var doc = document, baseElement;
          if (base && (global.location === void 0 || base !== global.location.href)) {
            doc = document.implementation.createHTMLDocument('');
            baseElement = doc.createElement('base');
            baseElement.href = base;
            doc.head.appendChild(baseElement);
            try {
              if (baseElement.href.indexOf(base) !== 0) throw new Error(baseElement.href);
            } catch (err) {
              throw new Error('URL unable to set base ' + base + ' due to ' + err);
            }
          }

          var anchorElement = doc.createElement('a');
          anchorElement.href = url;
          if (baseElement) {
            doc.body.appendChild(anchorElement);
            anchorElement.href = anchorElement.href; // force href to refresh
          }

          if (anchorElement.protocol === ':' || !/:/.test(anchorElement.href)) {
            throw new TypeError('Invalid URL');
          }

          Object.defineProperty(this, '_anchorElement', {
            value: anchorElement
          });


          // create a linked searchParams which reflect its changes on URL
          var searchParams = new URLSearchParams(this.search);
          var enableSearchUpdate = true;
          var enableSearchParamsUpdate = true;
          var _this = this;
          ['append', 'delete', 'set'].forEach(function(methodName) {
            var method = searchParams[methodName];
            searchParams[methodName] = function() {
              method.apply(searchParams, arguments);
              if (enableSearchUpdate) {
                enableSearchParamsUpdate = false;
                _this.search = searchParams.toString();
                enableSearchParamsUpdate = true;
              }
            };
          });

          Object.defineProperty(this, 'searchParams', {
            value: searchParams,
            enumerable: true
          });

          var search = void 0;
          Object.defineProperty(this, '_updateSearchParams', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function() {
              if (this.search !== search) {
                search = this.search;
                if (enableSearchParamsUpdate) {
                  enableSearchUpdate = false;
                  this.searchParams._fromString(this.search);
                  enableSearchUpdate = true;
                }
              }
            }
          });
        };

        var proto = URL.prototype;

        var linkURLWithAnchorAttribute = function(attributeName) {
          Object.defineProperty(proto, attributeName, {
            get: function() {
              return this._anchorElement[attributeName];
            },
            set: function(value) {
              this._anchorElement[attributeName] = value;
            },
            enumerable: true
          });
        };

        ['hash', 'host', 'hostname', 'port', 'protocol']
          .forEach(function(attributeName) {
            linkURLWithAnchorAttribute(attributeName);
          });

        Object.defineProperty(proto, 'search', {
          get: function() {
            return this._anchorElement['search'];
          },
          set: function(value) {
            this._anchorElement['search'] = value;
            this._updateSearchParams();
          },
          enumerable: true
        });

        Object.defineProperties(proto, {

          'toString': {
            get: function() {
              var _this = this;
              return function() {
                return _this.href;
              };
            }
          },

          'href': {
            get: function() {
              return this._anchorElement.href.replace(/\?$/, '');
            },
            set: function(value) {
              this._anchorElement.href = value;
              this._updateSearchParams();
            },
            enumerable: true
          },

          'pathname': {
            get: function() {
              return this._anchorElement.pathname.replace(/(^\/?)/, '/');
            },
            set: function(value) {
              this._anchorElement.pathname = value;
            },
            enumerable: true
          },

          'origin': {
            get: function() {
              // get expected port from protocol
              var expectedPort = { 'http:': 80, 'https:': 443, 'ftp:': 21 }[this._anchorElement.protocol];
              // add port to origin if, expected port is different than actual port
              // and it is not empty f.e http://foo:8080
              // 8080 != 80 && 8080 != ''
              var addPortToOrigin = this._anchorElement.port != expectedPort &&
                this._anchorElement.port !== '';

              return this._anchorElement.protocol +
                '//' +
                this._anchorElement.hostname +
                (addPortToOrigin ? (':' + this._anchorElement.port) : '');
            },
            enumerable: true
          },

          'password': { // TODO
            get: function() {
              return '';
            },
            set: function(value) {
            },
            enumerable: true
          },

          'username': { // TODO
            get: function() {
              return '';
            },
            set: function(value) {
            },
            enumerable: true
          },
        });

        URL.createObjectURL = function(blob) {
          return _URL.createObjectURL.apply(_URL, arguments);
        };

        URL.revokeObjectURL = function(url) {
          return _URL.revokeObjectURL.apply(_URL, arguments);
        };

        global.URL = URL;

      };

      if (!checkIfURLIsSupported()) {
        polyfillURL();
      }

      if ((global.location !== void 0) && !('origin' in global.location)) {
        var getOrigin = function() {
          return global.location.protocol + '//' + global.location.hostname + (global.location.port ? (':' + global.location.port) : '');
        };

        try {
          Object.defineProperty(global.location, 'origin', {
            get: getOrigin,
            enumerable: true
          });
        } catch (e) {
          setInterval(function() {
            global.location.origin = getOrigin();
          }, 100);
        }
      }

    })(
      (typeof commonjsGlobal !== 'undefined') ? commonjsGlobal
        : ((typeof window !== 'undefined') ? window
        : ((typeof self !== 'undefined') ? self : commonjsGlobal))
    );

    var GenericAPIClient = /** @class */ (function () {
        function GenericAPIClient(baseURL, fetchHandler, clientConfig, errorHandler) {
            if (baseURL === void 0) { baseURL = ''; }
            if (fetchHandler === void 0) { fetchHandler = fetch; }
            this.baseURL = baseURL;
            this.fetchHandler = fetchHandler;
            this.clientConfig = clientConfig;
            this.errorHandler = errorHandler;
        }
        GenericAPIClient.prototype.handleError = function (resp) {
            if (this.errorHandler) {
                this.errorHandler(resp);
            }
            else {
                throw new ResponseException(ResponseErrors[resp.status].toString(), resp.status, resp);
            }
        };
        GenericAPIClient.prototype.request = function (url, fetchConfig, overrideDefaultConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var uri, response, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uri = typeof url === 'string' ? url : url.url;
                            if (!uri.match(/^(\w+:)?\/\//)) {
                                uri = new URL(this.baseURL, uri).href;
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.fetchHandler(new Request(uri, overrideDefaultConfig ? fetchConfig : __assign({}, this.clientConfig, fetchConfig)))];
                        case 2:
                            response = _a.sent();
                            if (!response.ok) {
                                this.handleError(response);
                            }
                            return [2 /*return*/, response];
                        case 3:
                            e_1 = _a.sent();
                            throw new ResponseException(e_1, -1);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return GenericAPIClient;
    }());
    var ResponseException = /** @class */ (function (_super) {
        __extends(ResponseException, _super);
        function ResponseException(message, status, data) {
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.status = status;
            _this.data = data;
            Object.setPrototypeOf(_this, ResponseException.prototype);
            _this.name = 'ResponseExcpetion';
            _this.message = message;
            _this.data = data;
            return _this;
        }
        ResponseException.prototype.toString = function () {
            return this.name + ': ' + this.message;
        };
        return ResponseException;
    }(Error));
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
        ResponseErrors[ResponseErrors["NotImplemented"] = 500] = "NotImplemented";
        ResponseErrors[ResponseErrors["BadGateway"] = 502] = "BadGateway";
        ResponseErrors[ResponseErrors["ServiceUnavailable"] = 503] = "ServiceUnavailable";
        ResponseErrors[ResponseErrors["GatewayTimeout"] = 504] = "GatewayTimeout";
    })(ResponseErrors || (ResponseErrors = {}));

    var KeFetchUpJsonClient = /** @class */ (function (_super) {
        __extends(KeFetchUpJsonClient, _super);
        function KeFetchUpJsonClient() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        KeFetchUpJsonClient.prototype.request = function (url, fetchConfig, overrideDefaultConfig) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _super.prototype.request.call(this, url, fetchConfig, overrideDefaultConfig)];
                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return KeFetchUpJsonClient;
    }(GenericAPIClient));

    return KeFetchUpJsonClient;

})));
//# sourceMappingURL=kefetchup.umd.js.map
