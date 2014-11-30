var assert = require('assert');

var Utility = {};

Utility.isInt = function(a) {
	return (a === parseInt(a));
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

Utility.cloneArray = function (arr) {
	return arr.slice(0);
}

Utility.gcd = function(a,b) {
	assert(Utility.isInt(a) && Utility.isInt(b), 'Wrong paramter to calc gcd');
	if (a<b) {
		var tmp = a; a = b; b = tmp;
	}
	while (true) {
		if (b==0) {
		 	return a;
		}
		var tmp = a%b;
		a = b;
		b = tmp;
	}

}

module.exports = Utility;