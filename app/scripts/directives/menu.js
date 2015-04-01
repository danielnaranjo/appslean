'use strict';

/**
 * @ngdoc directive
 * @name calculatorApp.directive:menu
 * @description
 * # menu
 */
app.controller('MenuCtrl', function($scope) {
    $scope.name='Daniel N.';
    $scope.uid='b2027ffb0eae211a2aab930af8a7a794';

    $scope.menus = [{
        name: 'Hi '+$scope.name,
        url: 'main?uid='+$scope.uid
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
      // {
      //   name: 'Settings',
      //   url: 'settings'
      // }
      ];
  })
  .directive('menu', function() {
  return {
    templateUrl: 'views/menu.html'
  };
});