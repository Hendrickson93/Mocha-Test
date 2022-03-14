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
  console.log("                 UNIT TEST                ");
  console.log("------------------------------------------");
}); 
afterEach(function() {
  console.log("__________________________________________");
}); 
