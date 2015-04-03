'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:CollectsCtrl
 * @description
 * # CollectsCtrl
 * Controller of the calculatorApp
 */
app.controller('CollectsCtrl', function ($scope, $http, Data, toaster, $cookies) {
    
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
            toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
            $scope.collects = {};
        }).error(function(data){
        	 toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
        });
	};

  });
