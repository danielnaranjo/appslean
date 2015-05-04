'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:PerformanceCtrl
 * @description
 * # PerformanceCtrl
 * Controller of the calculatorApp
 */
angular.module('calculatorApp')
  .controller('PerformanceCtrl', function ($scope, $http, Data, toaster, $cookies, $filter, auth) {

  //console.log('cookie: ',$cookies);
  $scope.taxes = $cookies.taxes;
  $scope.partner = $cookies.partner ;
  $scope.type = $cookies.type;
    
  var d = new Date();
  var n = d.getTime();

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

  // var tags = $resource('tags.json');
  $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];
   
  $scope.loadTags = function(query) {
    return tags.query().$promise;
  };

  });
