var Enum = require('enum');
var assert = require('assert');
var Utility = require('./utility.js');

//// MATRIX CONSTANTS
constants = new Enum({'InvalidMatrix': { invalid: true, toString: function(){ return 'InvalidMatrix'; } } });


//// MATRIX CONSTRUCTOR
var Matrix = function(arr, opts) {
	if (opts !== undefined && opts.isSize === true) {
		this.size = arr;
		// generate empty array with size arr.rows, arr.cols
		this.value = [];
		for (var i = 0; i<arr.rows; ++i) {
			this.value[i] = [];
			for (var j = 0; j<arr.cols; ++j) {
				this.value[i][j] = 0;
			}
		}
	} else {
		// clone value from input array
		this.value = Utility.clone2dArray(arr);

		// get matrix dimension from this array
		this.size = getDimensionFromArray(arr);
	}

	assert(this.size !== constants.InvalidMatrix, 'parameter is not a valid matrix');
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

// multiply with another matrix
method.multiply = function(a) {
	if (!(a instanceof Matrix)) {
		return constants.InvalidMatrix;
	}
	
	if (!Matrix.canMultiply(this, a)) return constants.InvalidMatrix;

	var sum = new Matrix({ rows: this.size.rows, cols: a.size.cols }, { isSize: true });

	for (var i=0; i<this.size.rows; ++i) {
		for (var j=0; j<a.size.cols; ++j) {
			for (var t=0; t<this.size.cols; ++t) {
				sum.value[i][j] += this.value[i][t]*a.value[t][j];		
			}			
		}		
	}
	return sum;

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