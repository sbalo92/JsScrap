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
var _Position = (function (_super) {
    __extends(_Position, _super);
    function _Position(x, y) {
        var _this = _super.call(this) || this;
        _this[0] = x;
        _this[1] = y;
        return _this;
    }
    Object.defineProperty(_Position.prototype, "x", {
        get: function () {
            return this[0];
        },
        set: function (n) {
            this[0] = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Position.prototype, "lng", {
        get: function () {
            return this.x;
        },
        set: function (n) {
            this.x = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Position.prototype, "y", {
        get: function () {
            return this[1];
        },
        set: function (n) {
            this[1] = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Position.prototype, "lat", {
        get: function () {
            return this.y;
        },
        set: function (n) {
            this.y = n;
        },
        enumerable: true,
        configurable: true
    });
    _Position.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ")";
    };
    return _Position;
}(Array));
var AbstractGeometry = (function () {
    function AbstractGeometry(rawGeoJson) {
        if (rawGeoJson.type.toUpperCase() !== this.constructor.TYPE.toUpperCase()) {
            throw new Error("feature must be of type " + this.constructor.TYPE + " not " + rawGeoJson.type);
        }
        this._make(rawGeoJson);
    }
    Object.defineProperty(AbstractGeometry.prototype, "type", {
        get: function () {
            return this.constructor.TYPE;
        },
        set: function (ignored) {
            //Pass
        },
        enumerable: true,
        configurable: true
    });
    AbstractGeometry.prototype._make = function (rawGeoJson) {
        for (var property in rawGeoJson) {
            if (property.indexOf("_") !== 0) {
                this[property] = rawGeoJson[property];
            }
        }
    };
    AbstractGeometry.prototype.toString = function () {
        return this.type + ": " + JSON.stringify(this.coordinates);
    };
    return AbstractGeometry;
}());
AbstractGeometry.TYPE = "AbstractFeature";
/// <reference path="core.ts"/>
var Point = (function (_super) {
    __extends(Point, _super);
    function Point() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Point.prototype._make = function (rawGeoJson) {
        this._coordinates = (this._coordinates instanceof _Position) ? this._coordinates : new _Position(0, 0);
        _super.prototype._make.call(this, rawGeoJson);
    };
    Object.defineProperty(Point.prototype, "coordinates", {
        get: function () {
            return [this._coordinates.x, this._coordinates.y];
        },
        set: function (c) {
            this._x = c[0];
            this._y = c[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "_positions", {
        get: function () {
            return [this._coordinates];
        },
        set: function (positions) {
            this._coordinates = positions[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "_x", {
        get: function () {
            return this._coordinates.x;
        },
        set: function (x) {
            this._coordinates.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "_lng", {
        get: function () {
            return this._x;
        },
        set: function (n) {
            this._x = n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "_y", {
        get: function () {
            return this._coordinates.y;
        },
        set: function (y) {
            this._coordinates.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "_lat", {
        get: function () {
            return this._y;
        },
        set: function (n) {
            this._y = n;
        },
        enumerable: true,
        configurable: true
    });
    return Point;
}(AbstractGeometry));
Point.TYPE = "Point";
/// <reference path="core.ts"/>
var _LinearRing = (function (_super) {
    __extends(_LinearRing, _super);
    function _LinearRing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return _LinearRing;
}(Array));
;
var LinearRing = (function (_super) {
    __extends(LinearRing, _super);
    function LinearRing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LinearRing.prototype, "coordinates", {
        get: function () {
            return this._coordinates;
        },
        set: function (coords) {
            this._coordinates = (this._coordinates instanceof _LinearRing) ? this._coordinates : new _LinearRing();
            this._coordinates.length = 0;
            for (var _i = 0, coords_1 = coords; _i < coords_1.length; _i++) {
                var pos = coords_1[_i];
                this._coordinates.push(new _Position(pos[0], pos[1]));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinearRing.prototype, "_positions", {
        get: function () {
            return this._coordinates;
        },
        set: function (coords) {
            this.coordinates = coords;
        },
        enumerable: true,
        configurable: true
    });
    return LinearRing;
}(AbstractGeometry));
LinearRing.TYPE = "LinearRing";
var MultiPoint = (function (_super) {
    __extends(MultiPoint, _super);
    function MultiPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiPoint;
}(LinearRing));
MultiPoint.TYPE = "MultiPoint";
var LineString = (function (_super) {
    __extends(LineString, _super);
    function LineString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LineString;
}(LinearRing));
LineString.TYPE = "LineString";
