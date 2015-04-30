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

	$scope.collects = {};
    $scope.processSend = function() {
		$http({
			method:'POST',
			url:'http://apps-lean.com/api/v1/addCollect',
			data:$.param($scope.collects),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})        
		.success(function(data) {
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
          // console.log('post:',$scope.transfer);
          toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
          $scope.transfer = {};
          // console.log('success',data);
        }).error(function(data){
           toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
           // console.log('error',data);
        });
  };

//
$scope.splits = [
    { id: 1, account: 'Other Trust Acc 4670', name: 'Caja Holdings', file: '2015-DW-123456', amount: '745', expense: 'Court Filling', fees: '150', comments: 'not set', split: [{lawyers: 'CL', fee: '386.75'},{lawyers: 'FIRM', fee: '208.25'}]},
    { id: 2, account: 'Other Trust Acc 4670', name: 'Caja Holdings', file: '2015-DW-123456', amount: '250', expense: '', fees: '', comments: 'add funds', split: [{lawyers: 'CL', fee: '137.50'},{lawyers: 'DW', fee: '25'},{lawyers: 'FIRM', fee: '87.50'}]},
    { id: 3, account: 'Other Trust Acc 4670', name: 'Caja Holdings', file: '2015-DW-123456', amount: '1655', expense: '', fees: '', comments: 'add funds', split: [{lawyers: 'CL', fee: '526.75'},{lawyers: 'DW', fee: '150.50'},{lawyers: 'FIRM', fee: '827.75'}]}
  ];
//

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


