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
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    function Collection() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return _super.call(this, items) || this;
    }
    Collection.prototype.add = function (item) {
        if (this.has(item))
            return this;
        return _super.prototype.add.call(this, item);
    };
    Collection.prototype.get = function (itemToGet) {
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isSame(itemToGet)) {
                return item;
            }
        }
    };
    Collection.prototype.has = function (itemToCompare) {
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.isSame(itemToCompare)) {
                return true;
            }
        }
        return false;
    };
    Collection.prototype.every = function (cb) {
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!cb(item))
                return false;
        }
        ;
        return true;
    };
    Collection.prototype.some = function (cb) {
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!cb(item))
                return true;
        }
        ;
        return false;
    };
    Collection.prototype.find = function (cb) {
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var item = _a[_i];
            if (cb(item))
                return item;
        }
        ;
        return;
    };
    return Collection;
}(Set));
exports["default"] = Collection;
