'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the calculatorApp
 */
app.controller('ReportsCtrl', function ($scope, Data, $http, auth, $cookies, toaster, $window) {

	//console.log('cookie: ',$cookies);
	$scope.uID = $cookies.uID;
    $scope.taxes = $cookies.taxes;
	$scope.partner = $cookies.partner;
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

    $scope.custom = true;// abierto = true cerrado=false
    $scope.filter={};
    $scope.filter.uID=$cookies.uID;
    // $scope.filter.in= new Date();//'04/01/2015T04:30:00.000Z'
    // $scope.filter.out= new Date();//'30/01/2015T04:30:00.000Z'
    $scope.execute = function() {
        $http({
            method:'POST',
            url:'http://apps-lean.com/api/v1/lawyer/splitbydaterange', //'+$scope.filter.uID+'/'+$scope.filter.in+'/'+$scope.filter.out
            data:$.param($scope.filter),
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        })        
        .success(function(data){
            $scope.range = data;
            console.log('Sent: ',$scope.filter);
        }).error(function(data){
            toaster.pop('error', '', 'Error we can not complete this action', 5000, 'trustedHtml');
            console.log('error:',data);
        });
    };

    $scope.refresh = function () {
        $window.location.reload();
        // $route.reload();
    };
//
//
  });
