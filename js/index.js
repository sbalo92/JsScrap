(() => { 
    const c1 = new Vector(0,0);
    const c2 = new Vector(3,4);
    Coordinate.map((n)=>{return n**2;},c1,c2);
    console.log(c1.toString(),c2.toString()) ;
})();