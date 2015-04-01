'use strict';

/**
 * @ngdoc directive
 * @name calculatorApp.directive:focus
 * @description
 * # focus
 */
app.directive('focus', function () {
    return function(scope, element) {
        element[0].focus();
    };
  });
