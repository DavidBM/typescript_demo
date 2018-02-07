"use strict";
exports.__esModule = true;
var JUMP_DELAY_MILISECONDS = 30000;
var Fleet = /** @class */ (function () {
    function Fleet(id, jumpDelay) {
        this.lastJump = new Date(0);
        this.jumpDelay = JUMP_DELAY_MILISECONDS;
        if (typeof jumpDelay !== "undefined")
            this.jumpDelay = jumpDelay;
        this.id = id;
    }
    Fleet.prototype.clone = function () {
        var fleet = new Fleet(this.id, this.jumpDelay);
        fleet.setJumpTime(this.lastJump);
        return fleet;
    };
    Fleet.prototype.isSame = function (fleet) {
        return this.id.isSame(fleet.getId());
    };
    Fleet.prototype.getId = function () {
        return this.id;
    };
    Fleet.prototype.setJumpTime = function (date) {
        if (!date)
            date = new Date();
        this.lastJump = date;
    };
    Fleet.prototype.canJump = function (now) {
        if (!now)
            now = new Date();
        if (now.getTime() - this.lastJump.getTime() >= this.jumpDelay) {
            return true;
        }
        return false;
    };
    return Fleet;
}());
exports["default"] = Fleet;
