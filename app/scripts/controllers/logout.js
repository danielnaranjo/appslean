'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the calculatorApp
 */
app.controller('LogoutCtrl', function ($scope, $cookieStore, $location, toaster) {
    $cookieStore.remove('uID');
    $cookieStore.remove('taxes');
    $cookieStore.remove('partner');
    $cookieStore.remove('type');
    $cookieStore.remove('name');
    $cookieStore.remove('profile');
    $cookieStore.remove('username');
    $cookieStore.remove('password');
    toaster.pop('info', '', 'Session closed', 2000, 'trustedHtml');
    console.log('Session closed and cookie deleted!');
    //mandamos al login
    $location.path('/login');
  });
