/// <reference path="core.ts"/>
/// <reference path="linearRing.ts"/>
class LinearRingCollection extends AbstractGeometry {
    static TYPE = "LinearRingCollection";
    _coordinates: _LinearRingArray;
    set coordinates(linearRings: number[][] | number[][][] | any) {
        this._coordinates = (this._coordinates instanceof _LinearRing) ? this._coordinates : [new _LinearRing()];
        if (typeof linearRings[0][0] === "number") {
            this._coordinates.length = 1;
            this._coordinates[0] = new _LinearRing();
            for (const coordPair of linearRings) {
                this._coordinates[this._coordinates.length - 1].push(new _Position(coordPair[0], coordPair[1]));
            }
        } else if (typeof linearRings[0][0][0] === "number") {
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
    set _positions(linearRings: _Position[] | _LinearRing | any[]/*|_Position[][]|_LinearRing[]*/) {
        this.coordinates = linearRings;
    }

}
class MultiLineString extends LinearRingCollection {
    static TYPE = "MultiLineString";
}
AbstractGeometry.TYPES.set(MultiLineString.TYPE,MultiLineString);
class Polygon extends LinearRingCollection {
    static TYPE = "Polygon";
    get exteriorRing() {
        return this.coordinates[0];
    }
    set exteriorRing(v) {
        //pass
    }
}
AbstractGeometry.TYPES.set(Polygon.TYPE,Polygon);

