'use strict';

/**
 * @ngdoc filter
 * @name calculatorApp.filter:expenses
 * @function
 * @description
 * # expenses
 * Filter in the calculatorApp.
 */
app.filter('expenses', function () {
    return function (input) {
      return input.replace(',', '+');
    };
  });


/*
angular.module('webApp')
  .filter('activa', function () {
        return function (input) {
      return input.replace('-', ' ');
    };
  });
*/