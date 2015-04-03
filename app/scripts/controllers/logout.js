'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the calculatorApp
 */
app.controller('LogoutCtrl', function ($scope, $cookieStore, $location, toaster) {
    $cookieStore.remove('username');
    //$cookieStore.remove('password');
    toaster.pop('sucess', '', 'Session closed', 10000, 'trustedHtml');
    console.log('Session closed and cookie deleted!');
    //mandamos al login
    $location.path('/login');
  });
