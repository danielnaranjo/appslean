'use strict';

describe('Controller: PrivateCtrl', function () {

  // load the controller's module
  beforeEach(module('calculatorApp'));

  var PrivateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PrivateCtrl = $controller('PrivateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
