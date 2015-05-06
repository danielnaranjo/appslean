'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the calculatorApp
 */
app.controller('MenuCtrl', function($scope, $cookies, auth, $firebaseArray) {
    // $scope.name='Daniel N.';
    // $scope.uid='b2027ffb0eae211a2aab930af8a7a794';

    $scope.uID = $cookies.uID;
    $scope.taxes = $cookies.taxes;
    $scope.partner = $cookies.partner ;
    $scope.type = $cookies.type;
    // console.log('cookie: ',$cookies);

    // $scope.menus = [{
    //     name: 'Dashboad',
    //     url: 'main'
    //   },
    //   // {
    //   //   name: 'Clients',
    //   //   url: 'clients'
    //   // },
    //   {
    //     name: 'Deposits',
    //     url: 'collects'
    //   },// ,{
    //   //   name: 'Payments',
    //   //   url: 'payments'
    //   // },
    //   {
    //     name: 'Attorney',
    //     url: 'lawyers'
    //   },{
    //     name: 'Reports',
    //     url: 'reports'
    //   },
    //   {
    //     name: 'Changelog ',
    //     url: 'private'
    //   }
    //   ];
  });
