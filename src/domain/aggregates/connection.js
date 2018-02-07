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
var Connection = /** @class */ (function () {
    function Connection(id, gateA, gateB) {
        this.gateA = gateA;
        this.gateB = gateB;
        this.id = id;
    }
    ;
    Connection.prototype.isSame = function (item) {
        return this === item;
    };
    Connection.prototype.getId = function () {
        return this.id;
    };
    Connection.prototype.get = function () {
        return [this.gateA, this.gateB];
    };
    Connection.prototype.hasJumpGate = function (gate) {
        return this.gateA.isSame(gate) || this.gateB.isSame(gate);
    };
    Connection.prototype.getOtherJumpGate = function (gate) {
        if (this.gateA.isSame(gate) && this.gateB.isSame(gate))
            return new SelfReferencedConnection();
        if (this.gateA.isSame(gate)) {
            return this.gateB;
        }
        else {
            return this.gateA;
        }
    };
    return Connection;
}());
exports["default"] = Connection;
;
var SelfReferencedConnection = /** @class */ (function (_super) {
    __extends(SelfReferencedConnection, _super);
    function SelfReferencedConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SelfReferencedConnection;
}(Error));
exports.SelfReferencedConnection = SelfReferencedConnection;
;
