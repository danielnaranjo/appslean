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


	$scope.collects = {};
    $scope.processSend = function() {
		$http({
			method:'POST',
			url:'http://apps-lean.com/api/v1/addCollect',
			data:$.param($scope.collects),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})        
		.success(function(data) {
            console.log(data);
            if (!data.success) {
            	// if not successful, bind errors to error variables
            	Data.toast(message);
            	console.log('No OK:'+JSON.stringify(message));
            } else {
            	// if successful, bind success message to message
                Data.toast(message);
                console.log('OK:'+JSON.stringify(message));
            }
        });
	};

  });
