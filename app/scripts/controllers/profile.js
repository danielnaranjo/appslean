'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the calculatorApp
 */
app.controller('ProfileCtrl', function ($scope, $cookies) {
    $scope.profile = $cookies.profile||'Attorney';
    $scope.partner = $cookies.partner;
    // console.log('profile',$cookies.profile);
  });
