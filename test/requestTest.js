/**
 * http://usejsdoc.org/
 */
var chai = require('chai')
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var assert = require('chai').assert;
// Note that here it is should() and not just should.
// Whereas for expect and assert styles, it is just assert and expect.
var should = require('chai').should();

chai.use(chaiHttp);

describe('tests', function(){
	// Read Caveat at https://github.com/chaijs/chai-http to understand why done is needed.
	it('Passes if the server is running', function(done) { // <= Pass in done callback
		// Ensure that the server is running
		  chai.request('http://localhost:4000')
		  .get('/')
		  .end(function(err, res) {
			  if(err)
			   {
				  // Fail the test
				  console.log(err);
				  assert.equal(err,'');
			   }
			  console.log("status is "+res.status);
		    expect(res).to.have.status(200);
		    expect(res).to.be.html;
		    console.log(JSON.stringify(res));
		    var resString = JSON.stringify(res);
		    // If the response is correct, the text would be contained in the output html.
		    var properOutput = resString.includes("Input Your Chat Name");
		    console.log(properOutput);
		    assert.equal(properOutput,true);
		    done();                               // <= Call done to signal callback end
		  });
		});
	
});
