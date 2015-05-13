'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the calculatorApp
 */
app.controller('SettingsCtrl', function ($scope, $http, auth, Data, toaster, $cookies, $routeParams) {
    $scope.attorney = {};
    $http({
        method:'GET',
        url:'http://apps-lean.com/api/v1/lawyer/'+$cookies.uID
    })
    .success(function(data){
        $scope.attorney=data;
    })
    .error(function(){
        console.log('Error API lawyer/single');
    });

	$scope.cpass = {};
	$scope.cpass.uID=$cookies.uID;
    $scope.updateProfile = function() {
        $http({
            method:'POST',
            url:'http://apps-lean.com/api/v1/changepassword',
            data:$.param($scope.cpass),
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        })        
        .success(function(data) {
            //console.log(JSON.stringify(data));
            if(data.status==='success') {
                toaster.pop(data.status, '', data.message, 5000, 'trustedHtml');
            } 
            if(data.status==='error') {
                toaster.pop('error', '', 'Something is wrong', 3000, 'trustedHtml');
                console.log('error', data);
            }
        }).error(function(data){
            toaster.pop('error', '', 'Error we can not complete this action', 5000, 'trustedHtml');
        });
    };

  });
