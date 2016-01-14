'use strict';

var round = require( 'math-round' );
var pow = require( 'math-power' );
var normalize = require( './../lib' );

var frac;
var exp;
var x;
var v;
var i;

// Generate denormalized numbers and then normalize them...
for ( i = 0; i < 100; i++ ) {
	frac = Math.random() * 10;
	exp = 309 + round( Math.random()*14 );
	x = frac * pow( 10, -exp );
	v = normalize( x );
	console.log( '%d = %d * 2^%d = %d', x, v[0], v[1], v[0]*pow(2,v[1]) );
}
