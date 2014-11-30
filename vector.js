var Utility = require('./utility.js');
var assert = require('assert');

var Vector = function(arr) {
	this.data = Utility.cloneArray(arr);
	this.size = arr.length;
}

Vector.zero = function(n) {
	this.size = n;
	this.data = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);;
}

var method = Vector.prototype;

method.add = function(a) {
	assert(a instanceof Vector, 'Parameter is not vector');
	assert(a.size == this.size, 'Wrong size');
	var sum = new Vector(this.data);
	for (var i=0; i<a.size; ++i) {
		sum.data[i] += a.data[i];
	}
	return sum;
}

method.sub = function(a) {
	assert(a instanceof Vector, 'Parameter is not vector');
	assert(a.size == this.size, 'Wrong size');
	var sum = new Vector(this.data);
	for (var i=0; i<a.size; ++i) {
		sum.data[i] -= a.data[i];
	}
	return sum;
}

method.dot = function(a) {
	assert(a instanceof Vector, 'Parameter is not vector');
	assert(a.size == this.size, 'Wrong size');
	var sum = 0;
	for (var i=0; i<a.size; ++i) {
		sum += a.data[i]*this.data[i];
	}
	return sum;
}

method.mulNum = function(a) {
	var sum = new Vector(this.data);
	for (var i=0; i<sum.size; ++i) {
		sum.data[i] *= a;
	}
	return sum;
}

method.toString = function() {
	if (this.size==0) return '()';
	var s = '(';
	for (var i=0; i<this.size-1; ++i) {
		s+=this.data[i] + ',';
	}
	s+= this.data[this.size-1] + ')';
	return s;
}

module.exports = Vector;