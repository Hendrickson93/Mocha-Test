var MyClass = require("../src/myclass.js");
var sinon = require("sinon");
var myObj = new MyClass();
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);


describe("Test Suite", function() {
  after(function() { // after() hook
    console.log("\n///////////////////////////////////////////////////////////////////////////////");
    console.log("/                           End of the Test Suite                             /");
    console.log("///////////////////////////////////////////////////////////////////////////////");

  });
  before(function() { // before() hook
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("/                           Start of the Test Suite                           /");
    console.log("///////////////////////////////////////////////////////////////////////////////");

  });
  beforeEach(function() { //beforeEach() hook
    console.log("------------------------------------------");
    console.log("                 UNIT TEST                ");
    console.log("------------------------------------------");
    sinon.restore();
    
  });
  afterEach(function() { //afterEach() hook
    console.log("__________________________________________");
  });
  

  ////////////////////////////////////////////////////////////////////// TEST THE ADD() METHOD
  it("Test the add() method", function() {
    var actual = myObj.add(1, 2);
    var expected = 3;
    
    expect(actual).to.be.equal(expected);
    
    console.log("Actual: ", actual);
    console.log("Expect: ", expected);
  });

  ////////////////////////////////////////////////////////////////////// SPY THE ADD() METHOD
  it("Spy the add() method", function() {
    var spy = sinon.spy(myObj, "add");
    var arg1 = 10, arg2 = 20;

    var result = myObj.callAnotherFn(arg1, arg2);
    
    //sinon.assert.calledTwice(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(10, 20)).to.be.true;
    console.log("Result: ", result);
  });

   /* it("Copy of spy for the add() method", function() {
    // This test will fail in case sinon.restore() is not called
    var spy = sinon.spy(myObj, "add");
    var arg1 = 10, arg2 = 20;
   
    myObj.callAnotherFn(arg1, arg2);
   
    //sinon.assert.calledTwice(spy);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(10, 20)).to.be.true;
  });  */

  ////////////////////////////////////////////////////////////////////// SPY THE CALLBACK() METHOD
  it("Spy the callback() method", function() {
    var callback = sinon.spy();
    myObj.callTheCallback(callback);

    expect(callback.calledOnce).to.be.true;
    
    console.log("callback() Called: ", Boolean(1));
  });

  ////////////////////////////////////////////////////////////////////// MOCK THE SAYHELLO() METHOD
  it("mock the sayHello method", function() {
    var mock = sinon.mock(myObj);
    var expectation = mock.expects("sayHello");
    
    expectation.exactly(1);
    expectation.withArgs("hello world");
    
    myObj.callAnotherFn(10, 20);
    mock.verify();

    console.log("Expected: ", expectation);
    console.log("Mocked: ", expectation.withArgs("hello world"));
  });

  ////////////////////////////////////////////////////////////////////// STUB THE ADD() FUNCTION
  it("Stub the add() method", function() {

    var stubHello = sinon.stub(myObj, "sayHello");
    stubHello.onFirstCall().returns(0).onSecondCall().returns(0);

    var stub = sinon.stub(myObj, "add");
    var test1 = 500;
    var test2 = 300;

    stub.onFirstCall().returns(500);
    expect(myObj.callAnotherFn(10, 40)).to.be.equal(test1); //test1 = 500;
    console.log("1st Call: ", test1); 
    
    stub.onSecondCall().returns(300);
    expect(myObj.callAnotherFn(10, 40)).to.be.equal(test2); //test2 = 300;
    console.log("2nd Call: ", test2);  
  });

  ////////////////////////////////////////////////////////////////////// RUN THE PROMISE TEST CASE
  it("Promise Test Case", function(done) {
    this.timeout(0);
    myObj.testPromise().then(function(result) {
      expect(result).to.be.equal(6);
      done();
    });
  });
});
