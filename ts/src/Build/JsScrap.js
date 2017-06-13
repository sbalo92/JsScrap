class _Position extends Array {
    constructor(x, y) {
        super();
        this[0] = x;
        this[1] = y;
    }
    get x() {
        return this[0];
    }
    set x(n) {
        this[0] = n;
    }
    get lng() {
        return this.x;
    }
    set lng(n) {
        this.x = n;
    }
    get y() {
        return this[1];
    }
    set y(n) {
        this[1] = n;
    }
    get lat() {
        return this.y;
    }
    set lat(n) {
        this.y = n;
    }
    toString() {
        return "(" + this.x + "," + this.y + ")";
    }
}
class _LinearRing extends Array {
}
;
class _LinearRingArray extends Array {
}
;
class AbstractGeometry {
    constructor(rawGeoJson) {
        if (rawGeoJson.type.toUpperCase() !== this.constructor.TYPE.toUpperCase()) {
            throw new Error("feature must be of type " + this.constructor.TYPE + " not " + rawGeoJson.type);
        }
        this._make(rawGeoJson);
    }
    get type() {
        return this.constructor.TYPE;
    }
    set type(ignored) {
        //Pass
    }
    _make(rawGeoJson) {
        for (const property in rawGeoJson) {
            if (property.indexOf("_") !== 0) {
                this[property] = rawGeoJson[property];
            }
        }
    }
    toString() {
        return this.type + ": " + JSON.stringify(this.coordinates);
    }
}
AbstractGeometry.TYPES = new Map();
AbstractGeometry.TYPE = "AbstractFeature";
/// <reference path="core.ts"/>
class Point extends AbstractGeometry {
    _make(rawGeoJson) {
        this._coordinates = (this._coordinates instanceof _Position) ? this._coordinates : new _Position(0, 0);
        super._make(rawGeoJson);
    }
    get coordinates() {
        return [this._coordinates.x, this._coordinates.y];
    }
    set coordinates(c) {
        this._x = c[0];
        this._y = c[1];
    }
    get _positions() {
        return [this._coordinates];
    }
    set _positions(positions) {
        this._coordinates = positions[0];
    }
    get _x() {
        return this._coordinates.x;
    }
    set _x(x) {
        this._coordinates.x = x;
    }
    get _lng() {
        return this._x;
    }
    set _lng(n) {
        this._x = n;
    }
    get _y() {
        return this._coordinates.y;
    }
    set _y(y) {
        this._coordinates.y = y;
    }
    get _lat() {
        return this._y;
    }
    set _lat(n) {
        this._y = n;
    }
}
Point.TYPE = "Point";
AbstractGeometry.TYPES.set(Point.TYPE, Point);
/// <reference path="core.ts"/>
class LinearRing extends AbstractGeometry {
    set coordinates(coords) {
        this._coordinates = (this._coordinates instanceof _LinearRing) ? this._coordinates : new _LinearRing();
        this._coordinates.length = 0;
        for (const pos of coords) {
            this._coordinates.push(new _Position(pos[0], pos[1]));
        }
    }
    get coordinates() {
        return this._coordinates;
    }
    get _positions() {
        return this._coordinates;
    }
    set _positions(coords) {
        this.coordinates = coords;
    }
}
LinearRing.TYPE = "LinearRing";
class MultiPoint extends LinearRing {
}
MultiPoint.TYPE = "MultiPoint";
AbstractGeometry.TYPES.set(MultiPoint.TYPE, MultiPoint);
class LineString extends LinearRing {
}
LineString.TYPE = "LineString";
AbstractGeometry.TYPES.set(LineString.TYPE, LineString);
/// <reference path="core.ts"/>
/// <reference path="linearRing.ts"/>
class LinearRingCollection extends AbstractGeometry {
    set coordinates(linearRings) {
        this._coordinates = (this._coordinates instanceof _LinearRing) ? this._coordinates : [new _LinearRing()];
        if (typeof linearRings[0][0] === "number") {
            this._coordinates.length = 1;
            this._coordinates[0] = new _LinearRing();
            for (const coordPair of linearRings) {
                this._coordinates[this._coordinates.length - 1].push(new _Position(coordPair[0], coordPair[1]));
            }
        }
        else if (typeof linearRings[0][0][0] === "number") {
            this._coordinates.length = 0;
            for (const linearRing of linearRings) {
                this._coordinates.push(new _LinearRing());
                for (const coordPair of linearRing) {
                    this._coordinates[this._coordinates.length - 1].push(new _Position(coordPair[0], coordPair[1]));
                }
            }
        }
    }
    get coordinates() {
        return this._coordinates;
    }
    get _positions() {
        let _pos = [];
        this.coordinates.forEach((linearRing) => {
            _pos = _pos.concat(linearRing);
        });
        return _pos;
    }
    set _positions(linearRings /*|_Position[][]|_LinearRing[]*/) {
        this.coordinates = linearRings;
    }
}
LinearRingCollection.TYPE = "LinearRingCollection";
class MultiLineString extends LinearRingCollection {
}
MultiLineString.TYPE = "MultiLineString";
AbstractGeometry.TYPES.set(MultiLineString.TYPE, MultiLineString);
class Polygon extends LinearRingCollection {
    get exteriorRing() {
        return this.coordinates[0];
    }
    set exteriorRing(v) {
        //pass
    }
}
Polygon.TYPE = "Polygon";
AbstractGeometry.TYPES.set(Polygon.TYPE, Polygon);
