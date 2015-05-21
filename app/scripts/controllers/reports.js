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
    var URL="";
    // Get data with or without Lawyer's ID
    if($cookies.partner==0) {
        URL = 'http://apps-lean.com/api/v1/lawyer/splitbylawyer/'+$cookies.uID;
        console.log('NETK');
    } else {
        URL = 'http://apps-lean.com/api/v1/allsplits';
        console.log('EM');
    }
  
    var d = new Date();
    var n = d.getTime();
    $http({
        method:'GET',
        url: URL //'http://apps-lean.com/api/v1/lawyer/splitbylawyer/'+$cookies.uID
    })
    .success(function(data){
        $scope.reports=data;
        console.log('report',data);
    })
    .error(function(){
        console.log('Error API lawyers');
    });

    $scope.custom = true;// abierto = true cerrado=false
    $scope.filter={};
    $scope.filter.uID=$cookies.uID;
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

    $scope.firm = {};
    $scope.executeFirm = function() {
        $http({
            method: 'POST',
            url: 'http://apps-lean.com/api/v1/reportbylawyer',
            data:$.param($scope.firm),
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data){
            $scope.bylawyers=data;
            console.log('bylawyers: ',$scope.firm);
        })
        .error(function(data){
            console.log('Error API bylawyers',data);
        });
    };
    
    $scope.trust = {};
    $scope.executeTrusts = function() {
        $http({
            method: 'POST',
            url: 'http://apps-lean.com/api/v1/reportbytrusts',
            data:$.param($scope.trust),
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data){
            $scope.bytrust=data;
            console.log('bytrust: ',$scope.bytrust);
        })
        .error(function(data){
            console.log('Error API bytrust',data);
        });
    };


  });
