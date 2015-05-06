'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:PerformanceCtrl
 * @description
 * # PerformanceCtrl
 * Controller of the calculatorApp
 */
app.controller('PerformanceCtrl', function ($scope, $http, Data, toaster, $cookies, $filter, auth, $resource) {

  //console.log('cookie: ',$cookies);
  $scope.uID = $cookies.uID;
  $scope.taxes = $cookies.taxes;
  $scope.partner = $cookies.partner ;
  $scope.type = $cookies.type;
    
  var d = new Date();
  var n = d.getTime();

  var gastos = $resource('http://apps-lean.com/api/v1/expenses/1');
  $scope.gastos = [
    { text: 'Court filling' },
    { text: 'Copy' },
    { text: 'FedEx' }
  ];

  $scope.loadTags = function(query){
    return gastos.query().$promise;
  };

  // $http({ 
  //   method: 'GET', 
  //   url: 'http://apps-lean.com/api/v1/expenses/'+n 
  // })
  // .success(function(data){
  //   $scope.gastos=data;
  //   $scope.loadTags = function(query){
  //     return gastos.query().$promise;
  //   };
  // })
  // .error(function(){
  //   console.log('Error API expenses');
  // });

  $http({ method: 'GET',url: 'http://apps-lean.com/api/v1/lawyers/'+n })
  .success(function(data){ $scope.lawyers=data; })
  .error(function(){ console.log('Error API lawyers'); });

  $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/trusts/'+n })
  .success(function(data){ $scope.trusts=data; })
  .error(function(){ console.log('Error API trusts'); });

  $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/split/'+n })
  .success(function(data){ $scope.splits=data; })
  .error(function(){ console.log('Error API trusts'); });

  $scope.transfer = {};
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
