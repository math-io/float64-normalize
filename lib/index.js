'use strict';

// MODULES //

var SMALLEST_FLOAT64 = require( 'const-smallest-float64' ).VALUE;
var bigInt = require( 'big-integer' );
var isinfinite = require( 'validate.io-infinite' );
var abs = require( 'math-abs' );


// CONSTANTS //

// TODO: the following simulates 64-bit integers. Once Int64 is supported natively in JavaScript, we can replace with (1<<52).
var y = bigInt( 1 );
y = y.shiftLeft( 52 );


// NORMALIZE //

/**
* FUNCTION: normalize( x )
*	Returns a normal number `y` and exponent `exp` satisfying `x = y * 2^exp`.
*
* @param {Number} x - input value
* @returns {Number[]|Null} a two-element array containing `y` and `exp`
*/
function normalize( x ) {
	if ( x !== x || isinfinite( x ) ) {
		return null;
	}
	if ( x !== 0 && abs( x ) < SMALLEST_FLOAT64 ) {
		return [ y.multiply( x ).valueOf(), -52 ];
	}
	return [ x, 0 ];
} // end FUNCTION normalize()


// EXPORTS //

module.exports = normalize;
