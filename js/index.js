// (() => { 
// var a = new _Position(0,0);  
// var b = new _Position(3,4)  ;
// var ls = new _LinearRing(a,b);
var rawPoint;
var point = new Point({ "type": "Point", "coordinates": [100.0, 0.0] });
var multiPoint = new MultiPoint({
    "type": "MultiPoint",
    "coordinates": [[100.0, 0.0], [101.0, 1.0]]
});
var lineString = new LineString({
            'type': 'LineString',
            'coordinates': [[4e6, 2e6], [8e6, -2e6]]
          });
// })();