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

    $scope.toPay=data[0].amount;
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

  $scope.items = [1,2];
  // $scope.add = function () {
  //   var newItemNo = newItemNo + 1;
  //   $scope.items.push({
  //     'name': 'lawyer'+ newItemNo,
  //     'ng-model': 'lawyer'+ newItemNo,
  //     'value': ""
  //   });
  //   console.log('clicked',newItemNo);
  // };

  $scope.calculate = function () {

    $scope.amount = $scope.transfer.amount;
    $scope.expenses = $scope.transfer.fees;

    $scope.asists = 0;
    $scope.toPay = 0;
    $scope.commision = 0;

    $scope.law1=0;
    $scope.law2=0;
    $scope.law3=0;
    $scope.law4=0;

    if($scope.toPay==NaN){
      $scope.toPay=$scope.transfer.amount;
    }
    
    if($scope.transfer.referral) {
      $scope.commision = 25;
    } 

    if($scope.transfer.hourly1>0) {
      $scope.law1 = $scope.transfer.hourly1;
    }
    if($scope.transfer.hourly2>0) {
      $scope.law2 = $scope.transfer.hourly2;
    }
    if($scope.transfer.hourly3>0) {
      $scope.law3 = $scope.transfer.hourly3;
    }
    if($scope.transfer.hourly4>0) {
      $scope.law4 = $scope.transfer.hourly4;
    }

    // Expenses
    $scope.fees = [];
    $scope.fees = $scope.transfer.fees.split(',');
    $scope.discount=0;
    for(var i=0; i<$scope.fees.length; i++) {
      $scope.discount += parseFloat($scope.fees[i]);
    }
    //console.log('discount', $scope.discount);


    // total
    $scope.toPay = $scope.amount - $scope.law1 - $scope.law2 - $scope.law3 - $scope.law4 - $scope.commision - $scope.discount;
    //console.log('toPay',$scope.toPay);
  };


});
