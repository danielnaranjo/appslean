'use strict';

describe('Filter: sumByKey', function () {

  // load the filter's module
  beforeEach(module('calculatorApp'));

  // initialize a new instance of the filter before each test
  var sumByKey;
  beforeEach(inject(function ($filter) {
    sumByKey = $filter('sumByKey');
  }));

  it('should return the input prefixed with "sumByKey filter:"', function () {
    var text = 'angularjs';
    expect(sumByKey(text)).toBe('sumByKey filter: ' + text);
  });

});
