'use strict';

/**
 * @ngdoc overview
 * @name calculatorApp
 * @description
 * # calculatorApp
 *
 * Main module of the application.
 */

var app = angular.module('calculatorApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'googlechart',
    'toaster',
    'ngAnimate',
    'ui.bootstrap'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/login.html',
        controller: 'LogoutCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'LoginCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .when('/lawyers', {
        templateUrl: 'views/lawyers.html',
        controller: 'LawyersCtrl'
      })
      .when('/collects', {
        templateUrl: 'views/collects.html',
        controller: 'CollectsCtrl'
      })
      .when('/report/:uid', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
// app.run(function($rootScope, $location, Data) {
//   $rootScope.$on('$routeChangeStart',function (event, next, current){
//     $rootScope.authenticated = false;
//     Data.get('session').then(function (results) {
//       if (results.uid) {
//         $rootScope.authenticated = true;
//         $rootScope.uid = results.uid;
//         $rootScope.name = results.name;
//         $rootScope.email = results.email;
//       } else {
//         var nextUrl = next.$$route.originalPath;
//         if (nextUrl === '/signup' || nextUrl === '/login') {
//           // none behavior
//         } else {
//           $location.path('/main');
//         }
//       }
//     });
//   });
// });
app.run(function($rootScope, auth) {
  //al cambiar de rutas
  $rootScope.$on('$routeChangeStart', function() {
    //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
    //la cuál hemos inyectado en la acción run de la aplicación
    auth.checkStatus();
  });
});