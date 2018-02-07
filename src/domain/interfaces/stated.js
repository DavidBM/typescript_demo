"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
;
function Stated(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._state = {};
            return _this;
        }
        class_1.prototype.serialize = function () {
            return JSON.stringify(this._state);
        };
        class_1.prototype.deserialize = function (jsonStr) {
            this._state = JSON.parse(jsonStr);
        };
        class_1.prototype._getFullState = function () {
            return this._state;
        };
        class_1.prototype._setFullState = function (state) {
            this._state = Object.assign(this._state, state);
        };
        class_1.prototype.setState = function (key, value) {
            this._state[key] = value;
        };
        return class_1;
    }(Base));
}
exports["default"] = Stated;
