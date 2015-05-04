'use strict';

describe('Directive: angucomplete', function () {

  // load the directive's module
  beforeEach(module('calculatorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<angucomplete></angucomplete>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the angucomplete directive');
  }));
});
