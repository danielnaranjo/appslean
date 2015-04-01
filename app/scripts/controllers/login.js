'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the calculatorApp
 */
app.controller('LoginCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function(results) {
            Data.toast(results);
            console.log('GET results:'+JSON.stringify(results));
            console.log(JSON.stringify(customer));
            if (results.status == "success") {
                $location.path('/main');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (data) {
        Data.post('signUp', {
            data: data
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/main');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('/login');
        });
    };
  });
