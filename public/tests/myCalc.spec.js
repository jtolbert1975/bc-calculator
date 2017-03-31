
describe('ADD', function(){
    "use strict";
    var runningTotal = 2;
    var pendingVal = 2;
  it('spec to test 2 + 2', function(){

      expect(runningTotal + pendingVal).toEqual(4);
  });
});

describe('SUBTRACT', function () {
    var runningTotal = 2;
    var pendingVal = 2;
    it('spec to test 2 - 2', function () {
       expect(runningTotal - pendingVal).toEqual(0);
    });
});

describe('MULTIPLY', function () {
    var runningTotal = 2;
    var pendingVal = 3;
    it('spec to test 2 * 3', function () {
        expect(runningTotal * pendingVal).toEqual(6);
    });
});

describe('DIVIDE', function () {
    var runningTotal = 6;
    var pendingVal = 3;
    it('spec to test 6 / 3', function () {
        expect(runningTotal / pendingVal).toEqual(2);
    });
});

describe('DivideByZero', function () {
    var runningTotal = 2;
    var pendingVal = 0;
    it('spec to test 2 / 0', function () {
        expect(runningTotal / pendingVal).toBe(Infinity);
    });


});

describe('SubtractingFromASmallerNumber', function(){
    "use strict";
    var runningTotal = 3;
    var pendingVal = 5;
    it('spec to test 3 - 5', function () {
        expect(runningTotal - pendingVal).toEqual(-2);
    });
});