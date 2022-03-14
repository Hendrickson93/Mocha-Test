var MyClass = require("../src/myclass.js");
var sinon = require("sinon");
var myObj = new MyClass();
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);


describe("Test Suite", function() {
  after(function() {
    console.log("\n///////////////////////////////////////////////////////////////////////////////");
    console.log("/                            After The Test Suite                             /");
    console.log("///////////////////////////////////////////////////////////////////////////////");

  });
  before(function() {
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("/                            Before The Test Suite                            /");
    console.log("///////////////////////////////////////////////////////////////////////////////");

  });
  afterEach(function() {
    console.log("");
  });
  beforeEach(function() {
    sinon.restore();
    
  });

  // WHAT IS BEING TESTED
  it("Test the add() method", function() {
    var actual = myObj.add(1, 2);
    var expected = 3;
    
    expect(actual).to.be.equal(expected);
    
    console.log("Actual: ", actual);
    console.log("Expect: ", expected);
  });

  it("Spy the add() method", function() {
    var spy = sinon.spy(myObj, "add");
    var arg1 = 10, arg2 = 20;

    var result = myObj.callAnotherFn(arg1, arg2);
    
    //sinon.assert.calledTwice(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(10, 20)).to.be.true;
   
    console.log("Result: ", result);
  });


   it("Copy of spy for the add() method", function() {
    // This test will fail in case sinon.restore() is not called
    var spy = sinon.spy(myObj, "add");
    var arg1 = 10, arg2 = 20;
   
    myObj.callAnotherFn(arg1, arg2);
   
    //sinon.assert.calledTwice(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(10, 20)).to.be.true;
  }); 


  it("Spy the callback() method", function() {
    var callback = sinon.spy();
    myObj.callTheCallback(callback);
    expect(callback.calledOnce).to.be.true;
  });

  
  it("mock the sayHello method", function() {
    var mock = sinon.mock(myObj);
    var expetcation = mock.expects("sayHello");
    
    expetcation.exactly(1);
    expetcation.withArgs("hello world");
    
    myObj.callAnotherFn(10, 20);
    mock.verify();

    console.log("Expected: ", expetcation);
    console.log("Mocked: ", expetcation.withArgs("hello world"));
  });
});



////////////////////////////// TEST SUITE /////////////////////////////////////
describe("Test Suite For Stub", function() {
  it("Stub the add() method", function() {

    var stub = sinon.stub(myObj, "add");

    stub
      .onFirstCall().returns(500)
      .onSecondCall().returns(200);
    
    
    console.log("1st Call: ", expect(myObj.callAnotherFn(10, 20)).to.be.equal(500));
    
    console.log("2nd Call: ", expect(myObj.callAnotherFn(10, 20)).to.be.equal(200));
  });
});

describe("\n Test the Promise", function() {
  it("Promise Test Case", function(done) {
    this.timeout(0);
    myObj.testPromise().then(function(result) {
      expect(result).to.be.equal(6);
      done();
    });
  });
});
