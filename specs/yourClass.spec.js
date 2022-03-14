var chai = require("chai");
var expect = chai.expect;

var YourClass = require("../src/yourClass.js");
var yourObj = new YourClass();

describe("Test Suite ", function() {
  it("Should return sum of the numbers", function() {
    expect(yourObj.addSubtract(1, 2, true)).to.equal(3);
  });
});

/*  // Root level hook
beforeEach(function() {
  console.log("------------ Root Level Hook in yourClass.spec.js");
});  */
