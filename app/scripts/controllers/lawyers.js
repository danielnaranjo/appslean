'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:LawyersCtrl
 * @description
 * # LawyersCtrl
 * Controller of the calculatorApp
 */
app.controller('LawyersCtrl', function ($scope, $http, $modal, $log, toaster, auth, $cookies) {

	//console.log('cookie: ',$cookies);
	$scope.uID = $cookies.uID;
	$scope.taxes = $cookies.taxes;
	$scope.partner = $cookies.partner ;
	$scope.type = $cookies.type;
  
	var d = new Date();
	var n = d.getTime();
	$http({
		method: 'GET',
		url: 'http://apps-lean.com/api/v1/lawyers/'+n
	})
	.success(function(data){
		$scope.lawyers=data;
	})
	.error(function(){
		toaster.pop('error','','Cant complete this action, please try refresh', 2000,'trustedHtml');
		console.log('Error API lawyers');
	});

	$http({
		method: 'GET',
		url:'http://apps-lean.com/api/v1/typeof/'+n
	})
	.success(function(data){
		$scope.equity=data;
	})
	.error(function(){
		toaster.pop('error','','Cant complete this action, please try refresh', 2000, 'trustedHtml');
		console.log('Error API typeof');
	});
	// addLawyer
	$scope.lawyer = {};
    $scope.processSend = function() {
		$http({
			method:'POST',
			url:'http://apps-lean.com/api/v1/addLawyer',
			data:$.param($scope.lawyer),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})        
		.success(function(data) {
            toaster.pop(data.status, "", data.message, 10000, 'trustedHtml');
            $scope.lawyer = {};
        }).error(function(data){
        	 toaster.pop('error', "", 'Something wrong', 10000, 'trustedHtml');
        });
	};

	//modal
	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (id) {
		console.log('received:',id);

	var modalInstance = $modal.open({
		templateUrl: 'views/modal.html',
		controller: 'ModalInstanceCtrl',
		size: 'lg',
		resolve: {
			id: function () {
				return $scope.id;
			}
		}
	});

	modalInstance.result.then(function (selectedItem) {
	  $scope.selected = selectedItem;
	}, function () {
	  //$log.info('Modal dismissed at: ' + new Date());
	});
  };

});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, id) {

  $scope.abogado='Brenda Defendini';
  $scope.items = id;
  console.log(id);

  $scope.ok = function () {
    //$modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});