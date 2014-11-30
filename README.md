## LinearAlgJS (not completed)
#### Introduction
LinearAlgJS is a Linear algebra library for JavaScript. It includes basic functions for Matrix, Vector such as add, multiply, calculate least square regression, SVD, matrix inversion, etc.

Current version only contains functions of add and multiply of Matrix. I am continuing to add more functions.

#### API
- First, remember to include the library
```javascript
var Matrix = require('./matrix.js');
```
- Create a matrix with an existed array
```javascript
var A = new Matrix([[1,2,3,4], [1,0,1,0]]);
```

- Create an empty matrix with size m and n
```javascript
var A = new Matrix.zero(m,n);
```

- Basic Matrix manipulation
```javascript
var A = new Matrix([[1,2,3,4], [1,0,1,0]]);
var B = new Matrix([[1,2,0,1], [2,0,1,2]]);
var C = new Matrix([[1,2,3], [1,0,1], [0,1,0], [2,1,3]]);

var D = A.add(B);
var E = A.mul(C);

// transpose
console.log(A.transpose().toString());

// identity matrix
var I = Matrix.identity(4);

// zero matrix
var Z = Matrix.zero(4);

// calculate determinant
var toCalcDet = new Matrix([[1,2,3],[-4,5,6],[7,-8,9]]);
var det = toCalcDet.det();
```
- Basic Vector manipulation 
```javascript
var Vector = require('./vector.js');

var A = new Vector([1,2,3]);
var B = A.mulNum(4);
var C = A.add(B);
var D = C.sub(A);

console.log(D.toString());

var dotProduct = A.dot(B);
```

- To print Matrix, Vector, etc., you can use ```A.toString()```

Clone this git source (I haven't completed it so it's not packaged yet). There are some examples in ```example.js```.