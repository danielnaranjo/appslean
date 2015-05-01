'use strict';

describe('Service: exchange', function () {

  // load the service's module
  beforeEach(module('calculatorApp'));

  // instantiate service
  var exchange;
  beforeEach(inject(function (_exchange_) {
    exchange = _exchange_;
  }));

  it('should do something', function () {
    expect(!!exchange).toBe(true);
  });

});
