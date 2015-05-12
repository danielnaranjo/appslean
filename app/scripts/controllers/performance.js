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
  // initial values
  $scope.transfer.expenses=0;
  $scope.transfer.others=0;
    
  var d = new Date();
  var n = d.getTime();

  $scope.change = function() {
    // $scope.transfer.exists==1;
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
  };

  if($scope.transfer.exists==0) {
    $scope.transfer.expenses==0;
    console.log('Remove expenses');
  }

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
    url: 'http://apps-lean.com/api/v1/lawyer/splits/collect/'+$routeParams.id
  })
  .success(function(data){
    $scope.transfer.cID=$routeParams.id;
    $scope.transfer.nameclient=data[0].nameclient;
    $scope.transfer.filenumber=data[0].filenumber;
    $scope.transfer.lawyer=data[0].lawyer;
    $scope.transfer.amount=data[0].amount;
    $scope.transfer.trusts=data[0].account;
  })
  .error(function(){
    console.log('Error API splits/collect');
  });

  $scope.transferSend = function() {
    if($scope.transfer.exist==0) {
      $scope.transfer.expenses=0;
      $scope.transfer.fees=0;
    }
    $http({
      method:'POST',
      url:'http://apps-lean.com/api/v1/addDeposit',
      data:$.param($scope.transfer),
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .success(function(data) {
      console.log('post:',JSON.stringify($scope.transfer));
      toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
      $scope.transfer = {};
      window.location.href='#/main'
    }).error(function(data){
      toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
    });
  };

});
