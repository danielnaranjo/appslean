'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:LawyersCtrl
 * @description
 * # LawyersCtrl
 * Controller of the calculatorApp
 */
app.controller('LawyersCtrl', function ($scope, $http) {

	var d = new Date();
	var n = d.getTime();
	$http({
		method: 'GET',
		url: 'http://apps-lean.com/api/v1/lawyers/'+n
	})
	.success(function(data){
		$scope.lawyers=data;
	})
	.error(function(){
		console.log('Error API');
	});

});
