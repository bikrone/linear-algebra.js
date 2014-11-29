var Matrix = require('./matrix.js');

var A = new Matrix([[1,2,3,4], [1,0,1,0]]);
var B = new Matrix([[1,2,0,1], [2,0,1,2]]);
var C = new Matrix([[1,2,3], [1,0,1], [0,1,0], [2,1,3]]);

var D = A.add(B);
var E = A.multiply(C);

console.log(D.toString());
console.log(E.toString());
console.log(D.add(E).toString());


// should print error with these ones
// var F = new Matrix(123);
// var G = new Matrix([['A','B', 'C']]);