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
var stated_1 = require("../interfaces/stated");
/*
Here we did some dirty things.
Maybe first that is not good that the same file that creates the class User, applies a mixin.
Second, we applied the mixing in a weird way. It should be after the class with a "var StatedUser = Stated(User);"
Adding a extend is a hack for a problem in Typescript that is not able to infer some types. (That StatedUser wouldn't have a type)
    that would make impossible to use its definitions in a argument type definition, function return type definition, etc
More things, Stated should require the interface StatedInterface to be implemented. This would be true in the case we use the mixing in a normal way
    but then we lose the type. Doing it like this forces Stated to get a empty class that don't requires the StatedInterface
    making possible to create bugs without the type system telling you what is happening.

The correct way would be to create the file statedUser.ts and inside do:
export default class StatedUser extends Stated(User) {};
*/
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    User.prototype.clone = function () {
        var user = new User(this.id.clone());
        return user;
    };
    User.prototype.isSame = function (user) {
        return this.getId().isSame(user.getId());
    };
    User.prototype.getId = function () {
        return this.id;
    };
    User.fromUser = function (user) {
        return user;
    };
    User.prototype.getClassMetadata = function () {
        return {
            name: User.name
        };
    };
    return User;
}(stated_1["default"](/** @class */ (function () {
    function class_1() {
    }
    return class_1;
}()))));
exports["default"] = User;
;
//In case we apply the Mixin after the class creatin
//export default class StatedUser extends Stated(User) {};
