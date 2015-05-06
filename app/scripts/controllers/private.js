'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:PrivateCtrl
 * @description
 * # PrivateCtrl
 * Controller of the calculatorApp
 */
app.controller("PrivateCtrl", function($scope, $firebaseArray, auth, $cookies) {
  var ref = new Firebase("https://appslean.firebaseio.com/messages");
  // create a synchronized array
  $scope.messages = $firebaseArray(ref);
  // add new items to the array
  
  // the message is automatically added to Firebase!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText,
      website: 'apps-lean.com',
      startedAt: Firebase.ServerValue.TIMESTAMP
  	});
    $scope.newMessageText = '';
  };
  // click on `index.html` above to see $remove() and $save() in action

  $scope.uID = $cookies.uID;
  $scope.taxes = $cookies.taxes;
  $scope.partner = $cookies.partner ;
  $scope.type = $cookies.type;
});