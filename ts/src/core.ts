interface RawGeometry {
    type: string;
    coordinates: any[];
}
class _Position extends Array {
    constructor(x: number, y: number) {
        super();
        this[0] = x;
        this[1] = y
    }
    get x(): number {
        return this[0];
    }
    set x(n: number) {
        this[0] = n;
    }
    get lng(): number {
        return this.x;
    }
    set lng(n: number) {
        this.x = n;
    }
    get y(): number {
        return this[1];
    }
    set y(n: number) {
        this[1] = n;
    }
    get lat(): number {
        return this.y;
    }
    set lat(n: number) {
        this.y = n;
    }
    toString() {
        return "(" + this.x + "," + this.y + ")";
    }
}
class _LinearRing extends Array<_Position>{ };
class _LinearRingArray extends Array<_LinearRing>{ };

interface Geometry {
    _make(geoJson: RawGeometry);
    _positions: _Position[];
    coordinates: any[];
    readonly type: string;

}
abstract class AbstractGeometry implements Geometry {
    _positions: _Position[];
    coordinates: any[];
    static TYPES = new Map();
    static TYPE = "AbstractFeature";
    get type() {
        return (this.constructor as any).TYPE
    }
    set type(ignored) {
        //Pass
    }
    constructor(rawGeoJson: RawGeometry) {
        if (rawGeoJson.type.toUpperCase() !== (this.constructor as any).TYPE.toUpperCase()) {
            throw new Error("feature must be of type " + (this.constructor as any).TYPE + " not " + rawGeoJson.type);
        }
        this._make(rawGeoJson);
    }
    _make(rawGeoJson: RawGeometry) {

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
