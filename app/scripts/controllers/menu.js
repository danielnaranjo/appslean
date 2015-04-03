'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the calculatorApp
 */
app.controller('MenuCtrl', function($scope, $cookies, auth) {
    // $scope.name='Daniel N.';
    // $scope.uid='b2027ffb0eae211a2aab930af8a7a794';

    $scope.menus = [{
        name: 'Dashboad',
        url: 'main'
      },
      // {
      //   name: 'Clients',
      //   url: 'clients'
      // },
      {
        name: 'Collects',
        url: 'collects'
      },// ,{
      //   name: 'Payments',
      //   url: 'payments'
      // },
      {
        name: 'Lawyers',
        url: 'lawyers'
      },{
        name: 'Reports',
        url: 'reports'
      },
      {
        name: 'Changelog',
        url: 'private'
      }
      ];
  });
