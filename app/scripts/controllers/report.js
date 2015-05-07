'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the calculatorApp
 */
app.controller('ReportCtrl', function ($scope, $http, Data, auth, $cookies, $routeParams) {
    $scope.cid = $routeParams.cid;
    //console.log('cookie: ',$cookies);
  	$scope.uID = $cookies.uID;
    $scope.taxes = $cookies.taxes;
  	$scope.partner = $cookies.partner;
  	$scope.type = $cookies.type;

    var d = new Date();
    var n = d.getTime();
    $http({
        method:'GET',
        url:'http://apps-lean.com/api/v1/splits/split/'+$routeParams.cid
    })
    .success(function(data){
        $scope.reports=data;
        console.log($routeParams.cid);
    })
    .error(function(){
        console.log('Error API lawyers');
    });

  });
