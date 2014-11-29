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
var A = new Matrix({ rows: m, cols: n }, {isSize: true});
```

- Add, multiply two matrices
```javascript
var A = new Matrix([[1,2,3,4], [1,0,1,0]]);
var B = new Matrix([[1,2,0,1], [2,0,1,2]]);
var C = new Matrix([[1,2,3], [1,0,1], [0,1,0], [2,1,3]]);

var D = A.add(B);
var E = A.multiply(C);
```

- Print matrix, you can use ```A.toString()```

Clone this git source (I haven't completed it so it's not packaged yet). There are some examples in ```example.js```.