/// <reference path="core.ts"/>

abstract class LinearRing extends AbstractGeometry {
    static TYPE = "LinearRing";
    // _positions:_LinearRing;  
    _coordinates: _LinearRing;
    set coordinates(coords: _LinearRing | _Position[] | number[][]) {
        this._coordinates = (this._coordinates instanceof _LinearRing) ? this._coordinates : new _LinearRing();
        this._coordinates.length = 0;
        for (const pos of coords) {
            this._coordinates.push(
                new _Position(pos[0], pos[1])
            );
        }
    }
    get coordinates() {
        return this._coordinates;
    }
    get _positions() {
        return this._coordinates;
    }
    set _positions(coords: _LinearRing | _Position[]) {
        this.coordinates = coords;
    }
}

class MultiPoint extends LinearRing {
    static TYPE = "MultiPoint";
}
AbstractGeometry.TYPES.set(MultiPoint.TYPE,MultiPoint);
class LineString extends LinearRing {
    static TYPE = "LineString";
}
AbstractGeometry.TYPES.set(LineString.TYPE,LineString);
