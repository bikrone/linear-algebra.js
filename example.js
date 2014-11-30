var assert = require('assert');
var Matrix = require('./matrix.js');

var A = new Matrix([[1,2,3,4], [1,0,1,0]]);
var B = new Matrix([[1,2,0,1], [2,0,1,2]]);
var C = new Matrix([[1,2,3], [1,0,1], [0,1,0], [2,1,3]]);

var D = A.add(B);
var E = A.mul(C);

console.log(D.toString());
console.log(E.toString());
console.log(D.add(E).toString());


// should print error with these ones
// var F = new Matrix(123);
// var G = new Matrix([['A','B', 'C']]);


A = new Matrix([[1,2], [3, 4], [0,1]]);
B = new Matrix([[10,9], [4,3]]);
console.log(A.mul(B).toString());

// print identity
console.log('Identity matrix');
var I = Matrix.identity(4);
console.log(I.toString());

// transpose
console.log('Transpose of A*B');
console.log(A.mul(B).transpose().toString());


// testing calculate determinant
var toCalcDet = new Matrix([[1,2,3],[-4,5,6],[7,-8,9]]);
var det = toCalcDet.det();
assert(Math.abs(det - 240) < 0.01 , 'Wrong in calculating determinant: det = ' + det);
console.log('Determinant: ' + det);

toCalcDet = new Matrix([[1,2],[-4,5]]);
det = toCalcDet.det();
assert(Math.abs(det - 13) < 0.01, 'Wrong in calculating determinat, det = ' + det);
console.log('Determinant: ' + det);

toCalcDet = new Matrix([[0,1,5],[3,-6,9],[2,6,1]]);
det = toCalcDet.det();
assert(Math.abs(det - 165) < 0.01, 'Wrong in calculating determinat, det = ' + det);
console.log('Determinant: ' + det);

toCalcDet = new Matrix([[1,0,0,3],[2,7,0,6],[0,6,3,0],[7,3,1,-5]]);
det = toCalcDet.det();
assert(Math.abs(det + 546) < 0.01, 'Wrong in calculating determinat, det = ' + det);
console.log('Determinant: ' + det);

toCalcDet = new Matrix([[1,0,0,0],[0,1,0,0],[0,0,1/3,0],[0,0,0,1]]);
det = toCalcDet.det();
assert(Math.abs(det - (1/3)) < 0.01, 'Wrong in calculating determinat, det = ' + det);
console.log('Determinant: ' + det);

console.log(toCalcDet.add(Matrix.identity(4)).toString());

