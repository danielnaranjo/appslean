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
    //console.log('cookie: ',$cookies);
	$scope.taxes = $cookies.taxes;
	$scope.partner = $cookies.partner ;
	$scope.type = $cookies.type;
  });
