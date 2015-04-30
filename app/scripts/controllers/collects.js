'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:CollectsCtrl
 * @description
 * # CollectsCtrl
 * Controller of the calculatorApp
 */
app.controller('CollectsCtrl', function ($scope, $http, Data, toaster, $cookies, $filter, auth) {
    
	var d = new Date();
	var n = d.getTime();

	$http({ method: 'GET',url: 'http://apps-lean.com/api/v1/lawyers/'+n })
	.success(function(data){ $scope.lawyers=data; })
	.error(function(){ console.log('Error API lawyers'); });

	$http({ method: 'GET', url: 'http://apps-lean.com/api/v1/payments/'+n })
	.success(function(data){ $scope.payments=data; })
	.error(function(){ console.log('Error API payments'); });

	$http({ method: 'GET', url: 'http://apps-lean.com/api/v1/trusts/'+n })
	.success(function(data){ $scope.trusts=data; })
	.error(function(){ console.log('Error API trusts'); });

  $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/incomes/'+n })
  .success(function(data){ $scope.incomes=data; })
  .error(function(){ console.log('Error API trusts'); });

  $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/split/'+n })
  .success(function(data){ $scope.splits=data; })
  .error(function(){ console.log('Error API trusts'); });

	$scope.collects = {};
    $scope.processSend = function() {
		$http({
			method:'POST',
			url:'http://apps-lean.com/api/v1/addCollect',
			data:$.param($scope.collects),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})        
		.success(function(data) {
        console.log('post',$scope.collects); 
        toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
        $scope.collects = {};
        }).error(function(data){
        	 toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
        });
	};

  $scope.transfer = {};
    $scope.transferSend = function() {
    $http({
      method:'POST',
      url:'http://apps-lean.com/api/v1/addDeposit',
      data:$.param($scope.transfer),
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
    })        
    .success(function(data) {
          console.log('post:',$scope.transfer);
          toaster.pop(data.status, '', data.message, 10000, 'trustedHtml');
          $scope.transfer = {};
          // console.log('success',data);
        }).error(function(data){
           toaster.pop('error', '', 'Something wrong', 10000, 'trustedHtml');
           // console.log('error',data);
        });
  };


// $scope.splits = [{"data":[
// {"cid":"36","date":"2015-04-30","trusts":"1","lawyer":"38","nameclient":"demo","filenumber":"demo","amount":"1760","comments":"","split":"36","expenses":"925","others":""},
// {"cid":"35","date":"2015-04-29","trusts":"5","lawyer":"57","nameclient":"demo","filenumber":"demo","amount":"1","comments":"demo note","split":"57","expenses":"test1","others":""},
// {"cid":"33","date":"2015-04-21","trusts":"4","lawyer":"38","nameclient":"Thomas Loria","filenumber":"1006-00001","amount":"250","comments":"$250 partial payment for invoice 2614","split":"","expenses":"","others":"0"},
// {"cid":"34","date":"2015-04-21","trusts":"4","lawyer":"50","nameclient":"Fahmi Alrumaih","filenumber":"1198-00001","amount":"5000","comments":"Attorney: Amanie Isaac and David Boggs","split":"","expenses":"","others":"0"},
// {"cid":"14","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Lindgren Alyson","filenumber":"750-00001","amount":"1760","comments":"","split":"43,37,57","expenses":"","others":"0"},
// {"cid":"15","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Davine Kristen","filenumber":"823-00001","amount":"27.50","comments":"","split":"43,37,57","expenses":"","others":"0"},
// {"cid":"16","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Titus Christopher","filenumber":"868-00001","amount":"27.50","comments":"","split":"43,37,57","expenses":"","others":"0"},
// {"cid":"17","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Hammer Todd","filenumber":"878-00001","amount":"110","comments":"","split":"43,37,57","expenses":"","others":"0"},
// {"cid":"18","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Galombeck Garrett","filenumber":"751-00001","amount":"770","comments":"","split":"43,37,57","expenses":"","others":"0"},
// {"cid":"19","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Hahn Miranda","filenumber":"595-00001","amount":"750","comments":"","split":"43,37,57,37","expenses":"","others":"0"},
// {"cid":"20","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Titus Christopher","filenumber":"0","amount":"275","comments":"","split":"43,57,37","expenses":"","others":"0"},
// {"cid":"21","date":"2015-04-10","trusts":"3","lawyer":"43","nameclient":"Jacqueline Johnson","filenumber":"0","amount":"275","comments":"","split":"43,57","expenses":"","others":"0"},
// {"cid":"24","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"Team Dev Cabot","filenumber":"501-00005","amount":"4000","comments":"","split":"36,38,57","expenses":"","others":"0"},
// {"cid":"25","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"carolina Asthma","filenumber":"840-00001","amount":"1805","comments":"","split":"36,57","expenses":"","others":"0"},
// {"cid":"26","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"Daniel Ratliff","filenumber":"218-00001","amount":"350","comments":"","split":"36,38,57","expenses":"","others":"0"},
// {"cid":"27","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"American Asset","filenumber":"0","amount":"1725","comments":"","split":"36,38,57,36","expenses":"9","others":"0"},
// {"cid":"28","date":"2015-04-10","trusts":"1","lawyer":"43","nameclient":"Lindgren Alyson","filenumber":"750-0001","amount":"1760","comments":"","split":"43,57,37","expenses":"","others":"0"},
// {"cid":"29","date":"2015-04-10","trusts":"1","lawyer":"43","nameclient":"Devine Kristen","filenumber":"823-00001","amount":"27.50","comments":"","split":"43,57,37","expenses":"","others":"0"},
// {"cid":"30","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"Titus Christopher","filenumber":"868-0001","amount":"27.50","comments":"","split":"43,57,37","expenses":"","others":"0"},
// {"cid":"31","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"Titus Christopher","filenumber":"0","amount":"275","comments":"","split":"43,57,37","expenses":"","others":"0"},
// {"cid":"32","date":"2015-04-10","trusts":"1","lawyer":"36","nameclient":"Johnson Jacquelyn","filenumber":"0","amount":"275","comments":"","split":"43,57","expenses":"","others":"0"},
// {"cid":"22","date":"2015-04-07","trusts":"3","lawyer":"43","nameclient":"Brooks Leslie","filenumber":"643-00001","amount":"1427.50","comments":"","split":"37,37,43,57","expenses":"","others":"0"},
// {"cid":"23","date":"2015-04-07","trusts":"3","lawyer":"43","nameclient":"Osterberg Amy","filenumber":"622-00001","amount":"372.50","comments":"","split":"43,37,57","expenses":"","others":"0"}]
// }];


  // var tags = $resource('tags.json');
  $scope.tags = [
    { text: 'Tag1' },
    { text: 'Tag2' },
    { text: 'Tag3' }
  ];
   
  $scope.loadTags = function(query) {
    return tags.query().$promise;
  };

  });


