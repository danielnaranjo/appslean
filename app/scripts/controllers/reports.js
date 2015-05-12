'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the calculatorApp
 */
app.controller('ReportsCtrl', function ($scope, Data, $http, auth, $cookies) {

	console.log('cookie: ',$cookies);
	$scope.uID = $cookies.uID;
    $scope.taxes = $cookies.taxes;
	$scope.partner = $cookies.partner ;
	$scope.type = $cookies.type;
  
    var d = new Date();
    var n = d.getTime();
    $http({
        method:'GET',
        url:'http://apps-lean.com/api/v1/lawyer/splitbylawyer/'+$cookies.uID
    })
    .success(function(data){
        $scope.reports=data;
    })
    .error(function(){
        console.log('Error API lawyers');
    });

  });
