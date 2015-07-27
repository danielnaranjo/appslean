'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:CollectsCtrl
 * @description
 * # CollectsCtrl
 * Controller of the calculatorApp
 */
app.controller('CollectsCtrl', function ($scope, $http, Data, toaster, $cookies, $filter, $modal, $log, auth) {

  //console.log('cookie: ',$cookies);
  $scope.uID = $cookies.uID;
  $scope.taxes = $cookies.taxes;
  $scope.partner = $cookies.partner ;
  $scope.type = $cookies.type;
    
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

  $scope.getCollects = function() {
    $http({ method: 'GET',url: 'http://apps-lean.com/api/v1/collects' })
    .success(function(data){
      $scope.deposits=data;
    })
    .error(function(){
      console.log('Error API collects');
    });
  };

	$scope.collects = {};
  // $scope.collects.date=$filter('date')(d, 'MM/dd/yyyy'); //lastWeekUnformatted;
  $scope.processSend = function() {
		$http({
			method:'POST',
			url:'http://apps-lean.com/api/v1/addCollect',
			data:$.param($scope.collects),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})        
		.success(function(data) {
        //console.log('post',$scope.collects);
        toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
        $scope.collects = {};
        $scope.getCollects();
        }).error(function(data){
        	 toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
           //console.log('error',data);
        });
	};

  $scope.erase = function(cID) {
    $http({ 
      method: 'GET',
      url: 'http://apps-lean.com/api/v1/collects/delete/'+cID
    })
    .success(function(data){
      toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
      $scope.getCollects();
    })
    .error(function(){
      toaster.pop('error', '', 'Error: Cant complete this action', 10000, 'trustedHtml');
      console.log('Error API collects/delete');
    });
  };

//
  //modal
  $scope.items = ['item1', 'item2', 'item3'];

  $scope.editCollect = function (id) {
    console.log('received:',id);

  var modalInstance = $modal.open({
    templateUrl: 'views/editCollect.html',
    controller: 'ModalCollectCtrl',
    //size: 'sm',
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
//
  });

app.controller('ModalCollectCtrl', function ($scope, $modalInstance, id) {

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

app.controller('EditinPlaceCtrl', function ($scope, $filter, $http) {

// editable in place
$scope.user = {
    id: 1,
    name: 'awesome user',
    status: 2,
    group: 4,
    groupName: 'admin'
  }; 

  $scope.statuses = [
    {value: 1, text: 'status1'},
    {value: 2, text: 'status2'},
    {value: 3, text: 'status3'},
    {value: 4, text: 'status4'}
  ]; 

  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('http://apps-lean.com/api/v1/lawyers/1').success(function(data) {
      $scope.lawyers = data;
    });
  };

  $scope.showGroup = function() {
    if($scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: $scope.user.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return $scope.user.groupName;
    }
  };

  $scope.checkName = function(data) {
    if (data !== 'awesome' && data !== 'error') {
      return "Username should be `awesome` or `error`";
    }
  };

  $scope.saveUser = function() {
    // $scope.user already updated!
    return $http.post('/saveUser', $scope.user).error(function(err) {
      if(err.field && err.msg) {
        // err like {field: "name", msg: "Server-side error for this username!"} 
        $scope.editableForm.$setError(err.field, err.msg);
      } else { 
        // unknown error
        $scope.editableForm.$setError('name', 'Unknown error!');
      }
    });
  };

});