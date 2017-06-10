class Coordinate extends BaseClass {
    /**
     * params = {x:number, y:number}
     *         or  
                x(number),y(number)
     * 
     * new Coordinate({x:2,y:5});
     * or
     * new Coordinate (2,5);
     */
    constructor() {
        if (typeof arguments[0] instanceof Coordinate) {
            super({ x: arguments[0].x, y: arguments[1].y });
        }
        else if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
            super({ x: arguments[0], y: arguments[1] });
        } else {
            super(arguments[0]);
        }
    }
    get x() {
        return this._x;
    }
    set x(v) {
        this._x = v;
        return this.x;
    }
    get y() {
        return this._y;
    }
    set y(v) {
        this._y = v;
        return this.y;
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