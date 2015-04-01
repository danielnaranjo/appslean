'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:CollectsCtrl
 * @description
 * # CollectsCtrl
 * Controller of the calculatorApp
 */
app.controller('CollectsCtrl', function ($scope, $http, Data) {

	var d = new Date();
	var n = d.getTime();


	var d = new Date();
	var n = d.getTime();
	$http({
		method: 'GET',
		url: 'http://apps-lean.com/api/v1/lawyers/'+n
	})
	.success(function(data){ $scope.lawyers=data; })
	.error(function(){ console.log('Error API lawyers'); });

	$http({
		method: 'GET',
		url: 'http://apps-lean.com/api/v1/payments/'+n
	})
	.success(function(data){ $scope.payments=data; })
	.error(function(){ console.log('Error API payments'); });

  });
