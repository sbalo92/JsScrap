class Coordinate extends Vector {
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
            super( arguments[0].x, arguments[1].y );
        }
        else if (typeof arguments[0] === "number" && typeof arguments[1] === "number") {
            super(arguments[0], arguments[1]);
        } else {
            super(arguments[0]);
        }
    }
    // get x() {
    //     return this._vector[0];
    // }
    // set x(v) {
    //     this._vector[0] = v;
    //     return this.x;
    // }
    // get y() {
    //     return this._vector[1];
    // }
    // set y(v) {
    //     this.vector[1] = v;
    //     return this.y;
    // }
    static centroid(coords){
        let total = new Coordinate(coords[0]);
        for(let i=1;i<coords.length;i++){
            total = total.add(coords[i]);
        }
        return Vector.mult(total, coords.length**-1);
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}