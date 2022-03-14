var chai = require("chai");
var expect = chai.expect;

describe("Dummy Test Suite", function() {
  it("Dummy Test Case ", function() {
    expect(true).to.be.true;
  });
});

// Root level hook
beforeEach(function() {
  console.log("------------------------------------------");
  console.log("                 TEST CASE                ");
  console.log("------------------------------------------");
}); 
afterEach(function() {
  console.log("__________________________________________");
}); 
