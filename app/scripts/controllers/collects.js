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


//
$scope.splits = [
    { id: 1, account: 'Other Trust Acc 4670', name: 'Caja Holdings', file: '2015-DW-123456', amount: '745', expense: 'Court Filling', fees: '150', comments: 'not set', split: [{lawyers: 'CL', fee: '386.75'},{lawyers: 'FIRM', fee: '208.25'}]},
    { id: 2, account: 'Other Trust Acc 4670', name: 'Caja Holdings', file: '2015-DW-123456', amount: '250', expense: '', fees: '', comments: 'add funds', split: [{lawyers: 'CL', fee: '137.50'},{lawyers: 'DW', fee: '25'},{lawyers: 'FIRM', fee: '87.50'}]},
    { id: 3, account: 'Other Trust Acc 4670', name: 'Caja Holdings', file: '2015-DW-123456', amount: '1655', expense: '', fees: '', comments: 'add funds', split: [{lawyers: 'CL', fee: '526.75'},{lawyers: 'DW', fee: '150.50'},{lawyers: 'FIRM', fee: '827.75'}]}
  ];
/*
// dropbox lawyers
  $scope.lawyers = [];
  $scope.loadLawyers = function() {
    return $scope.lawyers.length ? null : $http.get('http://apps-lean.com/api/v1/lawyers/1')
    .success(function(data) {
      $scope.lawyers = data.data;
    });
  };
  $scope.showLawyers = function(user) {
    if(user.lawyers && $scope.lawyers.length) {
      var selected = $filter('filter')($scope.lawyers, {lawyers: lawyers.lawyers});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.lawyers || 'Not set';
    }
  };

  // dropbox incomes
  $scope.incomes = [];
  $scope.loadIncomes = function() {
    return $scope.incomes.length ? null : $http.get('http://apps-lean.com/api/v1/incomes/1')
      .success(function(data) {
        $scope.incomes = data.data;
    });
  };
  $scope.showIncomes = function(user) {
    if(user.incomes && $scope.lawyers.length) {
      var selected = $filter('filter')($scope.incomes, {eID: incomes.eID});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.incomes || 'Not set';
    }
  };

  // dropbox accounts
  $scope.accounts = [];
  $scope.loadAccounts = function() {
    return $scope.accounts.length ? null : $http.get('http://apps-lean.com/api/v1/trusts/1')
      .success(function(data) {
        $scope.accounts = data.data;
    });
  };
  $scope.showAccounts = function(user) {
    if(user.accounts && $scope.accounts.length) {
      var selected = $filter('filter')($scope.accounts, {sID: accounts.sID});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.accounts || 'Not set';
    }
  };


//////
  $scope.showStatus = function(user) {
    var selected = [];
    if(user.status) {
      selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  // $scope.checkName = function(data, id) {
  //   if (id === 2 && data !== 'awesome') {
  //     return "Username 2 should be `awesome`";
  //   }
  // };

  $scope.saveUser = function(data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      name: '',
      status: null,
      group: null 
    };
    $scope.users.push($scope.inserted);
  };
*/
//
  });


