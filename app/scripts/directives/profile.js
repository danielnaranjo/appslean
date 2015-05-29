'use strict';

/**
 * @ngdoc directive
 * @name calculatorApp.directive:profile
 * @description
 * # profile
 */

app.directive('profile', function () {
  return {
    restrict: 'AE',
    scope: {
      name: '=name'
    },
    templateUrl: 'views/profile.html'
  };
 });
