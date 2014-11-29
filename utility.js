var assert = require('assert');

var Utility = {};

Utility.isInt = function(a) {
	return (a === parseInt(a,10));
}

Utility.isNumber = function(a) {
	return (a === +a);
}

Utility.clone2dArray = function(arr) {
	assert(arr instanceof Array, 'cloneArray(): parameter is not array');
	var newArr = [];
	for (var i=0; i<arr.length; ++i) {
		assert(arr[i] instanceof Array, 'parameter is not 2d array');
		newArr[i] = arr[i].slice(0);
	}
	return newArr;
}

module.exports = Utility;