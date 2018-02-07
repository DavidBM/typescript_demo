"use strict";
exports.__esModule = true;
var Id = /** @class */ (function () {
    function Id(id) {
        this.id = id;
    }
    Id.prototype.clone = function () {
        return new Id(this.id);
    };
    Id.prototype.isSame = function (id) {
        return id.compareRawId(this.getRawId());
    };
    Id.prototype.getRawId = function () {
        return this.id;
    };
    Id.prototype.compareRawId = function (idToCompare) {
        return idToCompare === this.id;
    };
    return Id;
}());
exports["default"] = Id;
