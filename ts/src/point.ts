/// <reference path="core.ts"/>

class Point extends AbstractGeometry {
    static TYPE = "Point";
    _coordinates: _Position;
    _make(rawGeoJson: RawGeometry) {
        this._coordinates = (this._coordinates instanceof _Position) ? this._coordinates : new _Position(0, 0);
        super._make(rawGeoJson);
    }
    get coordinates() {
        return [this._coordinates.x, this._coordinates.y];
    }
    set coordinates(c: number[] | _Position) {
        this._x = c[0];
        this._y = c[1];
    }
    get _positions() {
        return [this._coordinates];
    }
    set _positions(positions: _Position[]) {
        this._coordinates = positions[0];
    }
    get _x() {
        return this._coordinates.x;
    }
    set _x(x) {
        this._coordinates.x = x;
    }
    get _lng(): number {
        return this._x;
    }
    set _lng(n: number) {
        this._x = n;
    }
    get _y() {
        return this._coordinates.y;
    }
    set _y(y) {
        this._coordinates.y = y;
    }
    get _lat(): number {
        return this._y;
    }
    set _lat(n: number) {
        this._y = n;
    }
}
