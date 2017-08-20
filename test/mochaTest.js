/**
 * 
 */
var expect = require('chai').expect;
var assert = require('chai').assert;
// Note that here it is should() and not just should.
// Whereas for expect and assert styles, it is just assert and expect.
var should = require('chai').should();
//describe is the syntax for test suite
describe('tests', function(){
	// it is syntaxt for test case.
	it('some tests that should fail as a!=b', function(){
		
		var a='a';
		// Will pass
		expect(a).to.equal('a');
		// Will pass
		assert.equal(a,'a');
		// Will pass
		a.should.equal('a');
		// Will  fail
		expect(a).to.equal('b');
		
		
		
	});
	
});