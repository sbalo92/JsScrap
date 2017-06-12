
class Vector extends BaseClass {
    /**
     * params = Array of Numbers
     * 
     */

    static apply(func, p, q /* unlimited arguments allowed*/) {
        let f
        Array.prototype.forEach.call(arguments, (arg, index) => {
            switch (index) {
                case 0:
                    f = arg;
                    break;
                default:
                    const v = arg;
                    v._vector.forEach((n, i, arr) => {
                        arr[i] = f(n);
                    });
            }
        });
        return;
    }

    static add(p, q) {
        const newVec = [];
        const length = Math.min(p.dimension, q.dimension);
        for (let i = 0; i < length; i++) {
            newVec[i] = p._vector[i] + q._vector[i];
        }
        return new Vector(newVec);
    }
    static inverse(p) {
        const inverse = new Vector(p);
        Vector.apply((n) => { return n * -1; }, inverse);
        return inverse;
    }
    static sub(p, q) {
        return Vector.add(
            p,
            Vector.inverse(q)
        );
    }

    static mult(p, scalar) {
        const newVec = new Vector(p);
        newVec.apply((n) => { return n * scalar; });
        return newVec;
    }

    constructor(input) {
        //Extend to arguments
        super();
        if (Array.isArray(input)) {
            this._vector = [].concat(input);
        } else if (input instanceof Vector) {
            this._vector = input._vector.slice(0);
        } else if (typeof input === "number") {
            this._vector = Array.prototype.slice.call(arguments);
        }
    }
    get dimension() {
        return this._vector.length;
    }
    set dimension(v) {
        //NO
        return this.dimension;
    }
    get x() {
        return this._vector[0];
    }
    get y() {
        return this._vector[1];
    }
    get z() {
        return this._vector[2];
    }
    set x(v) {
        this._vector[0] = v;
    }
    set y(v) {
        this._vector[1] = v;
    }
    set z(v) {
        this._vector[2] = v;
    }
    apply(f) {
        Vector.apply(f, this);
    }

    inverse() {
        return Vector.inverse(this);
    }
    add(q) {
        return Vector.add(this, q);
    }
    sub(q) {
        return Vector.sub(this, q);
    } 
    toString() {
        return "(" + this._vector.toString() + ")";
    }
}