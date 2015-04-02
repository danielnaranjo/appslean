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

    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    // $scope.doLogin = function (customer) {
    //     Data.post('login', {
    //         customer: customer
    //     }).then(function(results) {
    //         Data.toast(results);
    //         console.log('GET results:'+JSON.stringify(results));
    //         console.log(JSON.stringify(customer));
    //         if (results.status == "success") {
    //             $location.path('/main');
    //         }
    //     });
    // };
    // $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    // $scope.signUp = function (data) {
    //     Data.post('signUp', {
    //         data: data
    //     }).then(function (results) {
    //         Data.toast(results);
    //         if (results.status == "success") {
    //             $location.path('/main');
    //         }
    //     });
    // };
    // $scope.logout = function () {
    //     Data.get('logout').then(function (results) {
    //         Data.toast(results);
    //         $location.path('/login');
    //     });
    // };

    $scope.login = function() {
        $http({
            method:'POST',
            url:'http://apps-lean.com/api/v1/login',
            data:$.param($scope.login),
            headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
        })        
        .success(function(data) {
            console.log(JSON.stringify(data));
            if(data.status==='success') {
                toaster.pop(data.status, '', data.message, 5000, 'trustedHtml');
                $cookies.username = data.name;
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
