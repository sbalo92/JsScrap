class Vector extends BaseClass {
    /**
     * params = Array of Numbers
     * 
     */
    constructor(ListOfNumbers) {
        //Extend to arguements
        super();
        this._vector = [].concat(ListOfNumbers);
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

    static map(func, p, q /* unlimited arguments allowed*/) {
        let f
        Array.prototype.forEach.call(arguments, (arg, index) => {
            switch (index) {
                case 0:
                    f = arg;
                    break;
                default:
                    arg.x = f(arg.x);
                    arg.y = f(arg.y);
            }
        });
        return;
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}