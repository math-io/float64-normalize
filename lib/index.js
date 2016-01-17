'use strict';

// MODULES //

var SMALLEST_FLOAT64 = require( 'const-smallest-float64' ).VALUE;
var isinfinite = require( 'validate.io-infinite' );
var abs = require( 'math-abs' );


// CONSTANTS //

// (1<<52)
var SCALAR = 4503599627370496;


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
		return [ x, 0 ];
	}
	if ( x !== 0 && abs( x ) < SMALLEST_FLOAT64 ) {
		return [ x*SCALAR, -52 ];
	}
	return [ x, 0 ];
} // end FUNCTION normalize()


// EXPORTS //

module.exports = normalize;
