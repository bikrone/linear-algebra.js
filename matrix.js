var Enum = require('enum');
var assert = require('assert');
var Utility = require('./utility.js');
var Vector = require('./vector.js')

//// MATRIX CONSTANTS
constants = new Enum({'InvalidMatrix': { invalid: true, toString: function(){ return 'InvalidMatrix'; } } });


//// MATRIX CONSTRUCTOR
// Matrix from array
var Matrix = function(arr) {
		if (!(arr instanceof Array && arr.length == 0)) {
			// clone value from input array
			this.value = Utility.clone2dArray(arr);

			// get matrix dimension from this array
			this.size = getDimensionFromArray(arr);
			
			assert(this.size !== constants.InvalidMatrix, 'parameter is not a valid matrix');
		} else {
			this.value = [];
			this.size = { rows:0, cols: 0 };
		}
}

// generate identity matrix of side n
Matrix.identity = function(n) {
	var ident = new Matrix([]);
	ident.size = { rows: n, cols: n };	
	for (var i=0; i<n; i++) {
		ident.value[i] = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
		ident.value[i][i] = 1;
	}
	return ident;
}

// generate zero matrix with size (m,n)
Matrix.zero = function(m, n) {
	var res = new Matrix([]);
	res.size = { rows: m, cols: n };	
	for (var i=0; i<m; i++) {
		res.value[i] = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);		
	}		
	return res;
}

// get dimension from input array
function getDimensionFromArray(arr) {
	// check if arr is an array
	if (!(arr instanceof Array)) return constants.InvalidMatrix;

	// get number of rows
	var m = arr.length;
	if (m<0) return constants.InvalidMatrix;

	// check if arr is a 2D array with consistent columns
	if (!(arr[0] instanceof Array)) return constants.InvalidMatrix;

	// get number of columns
	var n = arr[0].length;

	for (var i=0; i<m; ++i) {
		if (arr[i].length != n) return constants.InvalidMatrix;
		for (var j=0; j<n; ++j)
			if (!Utility.isNumber(arr[i][j])) return constants.InvalidMatrix;
	}

	// return dimension of the matrix
	return { rows: m, cols: n };
}


//// MATRIX CONSTRAINTS
Matrix.canMultiply = function(a, b) {
	return (a.size.cols == b.size.rows);
}

Matrix.canAdd = function(a, b) {
	return (a.size.rows == b.size.rows && a.size.cols == b.size.cols);
}



// save class prototype
var method = Matrix.prototype;


//// MATRIX FUNCTIONS

// add to another matrix
method.add = function(a) {
	assert(a instanceof Matrix, 'matrix.add(): parameter is not Matrix');
	
	if (Matrix.canAdd(this, a)) {
		var sum = new Matrix(this.value);
		for (var i=0; i<a.size.rows; ++i) { 
			for (var j=0; j<a.size.cols; ++j) {
				sum.value[i][j] += a.value[i][j];
			}
		}
	
		return sum;
	}

	return constants.InvalidMatrix;
}

// subtract another matrix
method.sub = function(a) {
	assert(a instanceof Matrix, 'matrix.add(): parameter is not Matrix');
	
	if (Matrix.canAdd(this, a)) {
		var sum = new Matrix(this.value);
		for (var i=0; i<a.size.rows; ++i) { 
			for (var j=0; j<a.size.cols; ++j) {
				sum.value[i][j] -= a.value[i][j];
			}
		}
	
		return sum;
	}

	return constants.InvalidMatrix;
}

// multiply with another matrix
method.mul = function(a) {
	if (!(a instanceof Matrix)) {
		return constants.InvalidMatrix;
	}
	
	if (!Matrix.canMultiply(this, a)) return constants.InvalidMatrix;

	var sum = Matrix.zero(this.size.rows, a.size.cols);

	for (var i=0; i<this.size.rows; ++i) {
		for (var j=0; j<a.size.cols; ++j) {
			for (var t=0; t<this.size.cols; ++t) {
				sum.value[i][j] += this.value[i][t]*a.value[t][j];		
			}			
		}		
	}
	return sum;
}


// transpose of a matrix 
method.transpose = function() {
	var trans = Matrix.zero(this.size.cols, this.size.rows);
	for (var i = 0; i<trans.size.rows; i++) {
		for (var j = 0; j<trans.size.cols; ++j) trans.value[i][j] = this.value[j][i];
	}
	return trans;
}


// determinant of matrix
method.det = function() {
	assert(this.size.rows == this.size.cols, 'calculate determinant: Matrix is not square');	
	var n = this.size.rows;
	
	//clone the array to vectors
	var a = [];
	var b = []; // temporary array to store first-non-zero-position of each vector in a
	for (var i=0; i<n; ++i) { 
		a[i] = new Vector(this.value[i]);	
	}

	for (var i=0; i<n; ++i) {
		for (var j=0; j<n; ++j) if (a[i].data[j] != 0) {
			b[i] = j;
			break;
		}
	}

	// sort the rows by first-non-zero-position descending
	var sum = 1;
	for (var i =0; i<n; ++i) {
		var max = b[i];
		var maxi = i;
		for (var j=i+1; j<n;++j) {
			if (max > b[j]) {
				maxi = j;
				max = b[j];
			}			
		}
		// swap element
		if (maxi != i) {
			var tmp = a[i];
			a[i] = a[maxi];
			a[maxi] = tmp;
			sum *= -1;
		}
	}
	
	var toDiv = 1;

	// we calculate the determinants by row reduction method
	for (var i=0; i<n; ++i) {
		for (var j=0; j<i; ++j) {
			if (a[i].data[j] != 0) {
				// if both number is integer, we calculate the LCM (and divide the result later) 
				// to keep the precision of result
				if (Utility.isInt(a[i].data[j]) && Utility.isInt(a[j].data[j])) {
					var gcd = Utility.gcd(a[i].data[j],a[j].data[j]);
					var lcm = a[i].data[j]*a[j].data[j]/gcd;
					toDiv *= lcm/a[i].data[j];
					a[i] = a[i].mulNum(lcm/a[i].data[j]).sub(a[j].mulNum(lcm/a[j].data[j]));					
				} else {
					var tile = a[i].data[j]/a[j].data[j];
					a[i] = a[i].sub(a[j].mulNum(tile));
				}
			}
		}
		sum *= a[i].data[i];
	}
	return sum/toDiv;
}


// visualize matrix into string
method.toString = function() {
	var s = '';
	for (var i=0; i<this.size.rows; ++i) {
		for (var j=0; j<this.size.cols; ++j) {
			s += this.value[i][j].toString() + ' ';
		}
		s += '\n';
	}
	return s;
}

// Set property for Matrix
Matrix.constants = constants;
Matrix.getDimensionFromArray = getDimensionFromArray;

module.exports = Matrix;