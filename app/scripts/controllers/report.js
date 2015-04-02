'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the calculatorApp
 */
app.controller('ReportCtrl', function ($scope, $http, Data, auth, $cookies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //devolvemos a la vista el nombre del usuario
    $scope.username = $cookies.username;

  });
