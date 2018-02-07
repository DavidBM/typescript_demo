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
var user_1 = require("../models/user");
var Collection_1 = require("../helpers/Collection");
var UserFleetsCollection = /** @class */ (function (_super) {
    __extends(UserFleetsCollection, _super);
    function UserFleetsCollection(user) {
        var _this = _super.call(this) || this;
        _this.user = user;
        return _this;
    }
    UserFleetsCollection.prototype.isSame = function (userFleet) {
        var sameUser = userFleet.getUser().isSame(this.getUser());
        if (!sameUser) {
            return false;
        }
        var containAllFleet = this.every(function (fleet) { return userFleet.has(fleet); });
        var sameQuantityOfFleets = this.size === userFleet.countFleets();
        return containAllFleet && sameQuantityOfFleets;
    };
    UserFleetsCollection.prototype.addFleet = function (fleet) {
        this.add(fleet);
    };
    UserFleetsCollection.prototype.getUser = function () {
        return user_1["default"].fromUser(this.user);
    };
    UserFleetsCollection.prototype.isEmpty = function () {
        return this.size === 0;
    };
    UserFleetsCollection.prototype.removeFleet = function (fleet) {
        var _this = this;
        var foundFleets = new Set();
        this.forEach(function (userFleet) {
            if (userFleet.isSame(fleet)) {
                foundFleets.add(userFleet);
            }
        });
        foundFleets.forEach(function (fleet) { return _this["delete"](fleet); });
    };
    UserFleetsCollection.prototype.countFleets = function () {
        return this.size;
    };
    UserFleetsCollection.prototype.iterateFleets = function (fn) {
        this.forEach(fn);
    };
    UserFleetsCollection.prototype.isUser = function (user) {
        return this.user.isSame(user);
    };
    return UserFleetsCollection;
}(Collection_1["default"]));
exports["default"] = UserFleetsCollection;
