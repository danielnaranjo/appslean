'use strict';

/**
 * @ngdoc directive
 * @name calculatorApp.directive:menu
 * @description
 * # menu
 */
app.directive('menu', function() {
  return {
    restrict: 'AE',
    scope: {
      name: '=name'
    },
    templateUrl: 'views/menu.html'
  };
});