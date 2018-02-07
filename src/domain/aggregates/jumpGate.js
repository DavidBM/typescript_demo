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
var Collection_1 = require("../helpers/Collection");
var JumpGate = /** @class */ (function () {
    function JumpGate(id) {
        this.userFleets = new Collection_1["default"]();
        this.id = id;
    }
    JumpGate.prototype.isSame = function (gate) {
        return this.getId() === gate.getId();
    };
    JumpGate.prototype.getId = function () {
        return this.id;
    };
    JumpGate.prototype.addFleet = function (userFleets) {
        var foundUserFleets = this.getUserFleets(userFleets.getUser());
        if (foundUserFleets) {
            for (var _i = 0, userFleets_1 = userFleets; _i < userFleets_1.length; _i++) {
                var fleet = userFleets_1[_i];
                foundUserFleets.addFleet(fleet);
            }
            return;
        }
        this.userFleets.add(userFleets);
    };
    JumpGate.prototype.removeFleet = function (userFleets) {
        var userFleetsOfGate = this.getUserFleets(userFleets.getUser());
        if (!userFleetsOfGate) {
            return;
        }
        for (var _i = 0, userFleets_2 = userFleets; _i < userFleets_2.length; _i++) {
            var fleet = userFleets_2[_i];
            userFleetsOfGate.removeFleet(fleet);
            if (userFleetsOfGate.isEmpty()) {
                this.userFleets["delete"](userFleetsOfGate);
            }
        }
    };
    JumpGate.prototype.getUserFleets = function (user) {
        return this.userFleets.find(function (ownUserFleets) { return user.isSame(ownUserFleets.getUser()); });
    };
    JumpGate.prototype.countFleets = function () {
        var total = 0;
        this.userFleets.forEach(function (userFleet) { return total += userFleet.countFleets(); });
        return total;
    };
    JumpGate.prototype.countUserFleets = function () {
        return this.userFleets.size;
    };
    JumpGate.prototype.hasFleet = function (fleet) {
        return Array.from(this.userFleets.values()).some(function (userFleets) { return userFleets.has(fleet); });
    };
    JumpGate.prototype.getFleetsInUserView = function (user) {
        var userFleets = Array.from(this.userFleets.values())
            .some(function (userFleets) { return userFleets.isUser(user); });
        if (!userFleets) {
            return new NoFleetsOfUserInJumpGate();
        }
        return new Set(this.userFleets);
    };
    return JumpGate;
}());
exports["default"] = JumpGate;
;
var NoFleetsOfUserInJumpGate = /** @class */ (function (_super) {
    __extends(NoFleetsOfUserInJumpGate, _super);
    function NoFleetsOfUserInJumpGate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NoFleetsOfUserInJumpGate;
}(Error));
exports.NoFleetsOfUserInJumpGate = NoFleetsOfUserInJumpGate;
;
