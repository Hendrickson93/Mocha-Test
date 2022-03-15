var MyClass = require("../src/myclass.js");
var sinon = require("sinon");
var myObj = new MyClass();
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);


describe("Test Suite", function() {
  before(function() { // runs once before the first test of the Test Suite
    console.log("///////////////////////////////////////////////////////////////////////////////");
    console.log("/                           Start of the Test Suite                           /");
    console.log("///////////////////////////////////////////////////////////////////////////////");
  });

  after(function() { // runs once after the last test of the Test Suite
    console.log("\n///////////////////////////////////////////////////////////////////////////////");
    console.log("/                           End of the Test Suite                             /");
    console.log("///////////////////////////////////////////////////////////////////////////////");
  });

  beforeEach(function() { // runs before each test in the Test Suite
    console.log("------------------------------------------");
    console.log("                 UNIT TEST                ");
    console.log("------------------------------------------");
    sinon.restore(); 
  });

  afterEach(function() { // runs after each test the Test Suite
    console.log("__________________________________________");
  });
  

  ////////////////////////////////////////////////////////////////////// TEST THE ADD() METHOD
  it("Test the add() method", function() {
    var actual = myObj.add(1, 2); // actual = 3
    var expected = 3;
    
    // self-explanatory
    expect(actual).to.be.equal(expected);
    
    // dispaly actual and expected results
    console.log("Actual: ", actual);
    console.log("Expect: ", expected);
  });

  ////////////////////////////////////////////////////////////////////// SPY THE ADD() METHOD
  it("Spy the add() method", function() {

    // Prevents the sayHello() method from being returned 
    var stubHello = sinon.stub(myObj, "sayHello");
    stubHello.onCall().returns(0);
    
    // creates a spy object for 'add' and returns it
    var spy = sinon.spy(myObj, "add");
     
    // create arguments
    var arg1 = 10, arg2 = 20;  

    // calls myObj.callAnotherFn(arg1, arg2) and assigns return to 'result'
    var result = myObj.callAnotherFn(arg1, arg2);
    
    //sinon.assert.calledTwice(spy);
    expect(spy.calledOnce).to.be.true;            // expects add() to be called ONCE
    expect(spy.calledWith(10, 20)).to.be.true;    // expects add(10, 20) to be called

    // displays the resulting value
    console.log("Result: ", result);
  });



  ////////////////////////////////////////////////////////////////////// SPY THE CALLBACK() METHOD
  it("Spy the callback() method", function() {
    
    var callback = sinon.spy();
    
    myObj.callTheCallback(callback);

    expect(callback.calledOnce).to.be.true;
    
    //Displays 'true' if the callback() is called 
    console.log("callback() Called: ", Boolean(1));
  });



  ////////////////////////////////////////////////////////////////////// MOCK THE SAYHELLO() METHOD
  it("mock the sayHello() method", function() {
    
    /*Creates a mock for 'myObj' 
    Does NOT change the object, but returns a mock object */
    var mock = sinon.mock(myObj);

    //Overrides 'sayHello()' with a mock function 
    var expectation = mock.expects("sayHello"); 
    
    //Expects mock function to be called EXACTLY ONCE
    expectation.exactly(1);
    
    //Expects mock function with 'hello world' as an arguement
    expectation.withArgs("hello world"); 
        
    /*we call sayHello() indirectly using callAnotherFn() 
    since sayHello() is nested inside of callAnotherFn()*/
    myObj.callAnotherFn(10, 20);  
    
    //Verifies all expectations on the mock have passed
    mock.verify();                

    //Displays the expectation of the mock function
    console.log("Mocked: ", expectation);

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
