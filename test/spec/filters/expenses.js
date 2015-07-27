'use strict';

describe('Filter: expenses', function () {

  // load the filter's module
  beforeEach(module('calculatorApp'));

  // initialize a new instance of the filter before each test
  var expenses;
  beforeEach(inject(function ($filter) {
    expenses = $filter('expenses');
  }));

  it('should return the input prefixed with "expenses filter:"', function () {
    var text = 'angularjs';
    expect(expenses(text)).toBe('expenses filter: ' + text);
  });

});
