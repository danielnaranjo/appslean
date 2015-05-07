'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:PerformanceCtrl
 * @description
 * # PerformanceCtrl
 * Controller of the calculatorApp
 */
app.controller('PerformanceCtrl', function ($scope, $http, Data, toaster, $cookies, $filter, auth, $resource, $routeParams) {

  //console.log('cookie: ',$cookies);
  $scope.uID = $cookies.uID;
  $scope.taxes = $cookies.taxes;
  $scope.partner = $cookies.partner ;
  $scope.type = $cookies.type;

  $scope.transfer = {};
    
  var d = new Date();
  var n = d.getTime();

  $http({
    method: 'GET',
    url: 'http://apps-lean.com/api/v1/expenses'
  })
  .success(function(data){
    $scope.transfer.expenses=data;
  })
  .error(function(){
    console.log('Error API expenses');
  });

  $http({
    method: 'GET',
    url: 'http://apps-lean.com/api/v1/lawyers/'+n
  })
  .success(function(data){
    $scope.lawyers=data;
  })
  .error(function(){
    console.log('Error API lawyers');
  });

  $http({ 
    method: 'GET', 
    url: 'http://apps-lean.com/api/v1/trusts/'+n 
  })
  .success(function(data){ 
    $scope.trusts=data; 
  })
  .error(function(){ 
    console.log('Error API trusts'); 
  });

  // $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/split/'+n })
  // .success(function(data){ $scope.splits=data; })
  // .error(function(){ console.log('Error API /splits'); });

  $http({
    method: 'GET',
    url: 'http://apps-lean.com/api/v1/splits/collect/'+$routeParams.id
  })
  .success(function(data){
    $scope.transfer.nameclient=data.nameclient;
    // $scope.collect = angular.toJson(data);
    console.log(JSON.stringify(data[0].nameclient));
  })
  .error(function(){
    console.log('Error API splits/collect');
  });

  $scope.transferSend = function() {
    $http({
      method:'POST',
      url:'http://apps-lean.com/api/v1/addDeposit',
      data:$.param($scope.transfer),
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
    })        
    .success(function(data) {
      console.log('post:',$scope.transfer);
      toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
      $scope.transfer = {};
      // console.log('success',data);
    }).error(function(data){
       toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
       // console.log('error',data);
    });
  };

});
