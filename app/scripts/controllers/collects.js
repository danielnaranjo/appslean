'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:CollectsCtrl
 * @description
 * # CollectsCtrl
 * Controller of the calculatorApp
 */
app.controller('CollectsCtrl', function ($scope, $http, Data, toaster, $cookies, $filter, auth) {
    
	var d = new Date();
	var n = d.getTime();

  $http({ method: 'GET',url: 'http://apps-lean.com/api/v1/lawyers/'+n })
  .success(function(data){ $scope.lawyers=data; })
  .error(function(){ console.log('Error API lawyers'); });

	$http({ method: 'GET', url: 'http://apps-lean.com/api/v1/payments/'+n })
	.success(function(data){ $scope.payments=data; })
	.error(function(){ console.log('Error API payments'); });

	$http({ method: 'GET', url: 'http://apps-lean.com/api/v1/trusts/'+n })
	.success(function(data){ $scope.trusts=data; })
	.error(function(){ console.log('Error API trusts'); });

  $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/incomes/'+n })
  .success(function(data){ $scope.incomes=data; })
  .error(function(){ console.log('Error API trusts'); });

  $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/split/'+n })
  .success(function(data){ $scope.splits=data; })
  .error(function(){ console.log('Error API trusts'); });

	$scope.collects = {};
    $scope.processSend = function() {
		$http({
			method:'POST',
			url:'http://apps-lean.com/api/v1/addCollect',
			data:$.param($scope.collects),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})        
		.success(function(data) {
        console.log('post',$scope.collects); 
        toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
        $scope.collects = {};
        }).error(function(data){
        	 toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
        });
	};

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


