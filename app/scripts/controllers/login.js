'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the calculatorApp
 */
//app.controller('LoginCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
app.controller('LoginCtrl', function ($scope, $location, $http, auth, Data, toaster, $cookies) {

    $scope.login = {};
    $scope.signup = {};

    $scope.login = function() {
        $http({
            method:'POST',
            url:'http://apps-lean.com/api/v1/login',
            data:$.param($scope.login),
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        })        
        .success(function(data) {
            //console.log(JSON.stringify(data));
            if(data.status==='success') {
                toaster.pop('success', '', 'Welcome back '+data.name, 2000, 'trustedHtml');
                toaster.pop(data.status, '', data.message, 1000, 'trustedHtml');

                $cookies.uID = data.uID;
                $cookies.taxes = data.taxes;
                $cookies.partner = data.partner;
                $cookies.type = data.type;
                console.log('cookie: ',$cookies);

                auth.login($scope.username, $scope.password);
            } 
            if(data.status==='error') {
                toaster.pop('error', '', 'Check your credentials', 3000, 'trustedHtml');
            }
        }).error(function(data){
            toaster.pop('error', '', 'Please try again..', 5000, 'trustedHtml');
        });
    };
});
