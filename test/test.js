'use strict';

// MODULES //

var test = require( 'tape' );
var pow = require( 'math-power' );
var round = require( 'math-round' );
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
	var frac;
	var exp;
	var x1;
	var x;
	var v;
	var i;

	// Smallest denormalized number:
	v = normalize( smallest.DENORMALIZED );
	t.ok( v[ 0 ] >= smallest.VALUE, 'returns a normal number' );
	t.equal( v[ 0 ]*pow( 2, v[ 1 ] ), smallest.DENORMALIZED, 'x = y * 2^exp' );

	// Other subnormals...
	for ( i = 0; i < 1000; i++ ) {
		frac = Math.random() * 10;
		exp = -309 - round( Math.random()*14 );
		x = frac * pow( 10, exp );
		v = normalize( x );

		t.ok( v[ 0 ] >= smallest.VALUE, 'returns a normal number' );

		x1 = v[ 0 ] * pow( 2, v[ 1 ] );
		t.equal( x1, x, 'y*2^exp=x. y='+v[0]+', exp='+v[1]+', x='+x );
	}
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
