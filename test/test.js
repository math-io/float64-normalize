'use strict';

// MODULES //

var test = require( 'tape' );
var pow = require( 'math-power' );
var pinf = require( 'const-pinf-float64' );
var ninf = require( 'const-ninf-float64' );
var smallest = require( 'const-smallest-float64' );
var normalize = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof normalize === 'function', 'main export is a function' );
	t.end();
});

test( 'the function normalizes a denormalized number, returning a normal number and an exponent', function test( t ) {
	var val;

	// Smallest denormalized number:
	val = normalize( smallest.DENORMALIZED );
	t.ok( val[ 0 ] >= smallest.VALUE, 'returns a normal number' );
	t.equal( val[ 0 ]*pow( 2, val[ 1 ] ), smallest.DENORMALIZED, 'x = y * 2^exp' );

	// Another denormalized value:
	val = normalize( 3.14e-319 );
	t.ok( val[ 0 ] >= smallest.VALUE, 'returns a normal number' );
	t.equal( val[ 0 ]*pow( 2, val[ 1 ] ), 3.14e-319, 'x = y * 2^exp' );

	t.end();
});

test( 'the function returns `[0,0]` if provided a `0`', function test( t ) {
	var val = normalize( 0 );
	t.deepEqual( val, [0,0], 'returns [0,0]' );
	t.end();
});

test( 'the function returns `null` if provided a `+infinity`', function test( t ) {
	var val = normalize( pinf );
	t.equal( val, null, 'returns null' );
	t.end();
});

test( 'the function returns `null` if provided a `-infinity`', function test( t ) {
	var val = normalize( ninf );
	t.equal( val, null, 'returns null' );
	t.end();
});

test( 'the function returns `null` if provided a `NaN`', function test( t ) {
	var val = normalize( NaN );
	t.equal( val, null, 'returns null' );
	t.end();
});
