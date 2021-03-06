'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculatorApp
 */
app.controller('MainCtrl', function ($scope, $http, $location, $window, Data, $cookies, auth) {

    $scope.uID = $cookies.uID;
    $scope.taxes = $cookies.taxes;
    $scope.partner = $cookies.partner ;
    $scope.type = $cookies.type;

    // $scope.push=false; 
    // console.log($scope.push);

    var d = new Date();
    var n = d.getTime();
    $http({
        method:'GET',
        url:'http://apps-lean.com/api/v1/lawyer/push/'+$cookies.uID
    })
    .success(function(data){
        $scope.notification=data;
        if(data>0) {
            $scope.push=false;
            console.log($scope.push);
        }
    })
    .error(function(){
        console.log('Error API lawyers/push');
    });
  
    // $http({ method: 'GET', url: 'http://apps-lean.com/api/v1/charts/1' })
    // .success(function(data){ $scope.chart1=data; })
    // .error(function(){ console.log('Error API chart1'); });
    $http({ 
        method: 'GET', 
        url: 'http://apps-lean.com/api/v1/charts/2'
    })
    .success(function(data){
        //console.log(JSON.stringify(data));
        var chart2 = {};
        chart2.type = 'PieChart';
        chart2.data = [['Component','cost']];
        chart2.data.push(['Brandy Milazzo',200],['Suzanne Schaffer',12500],['colin stockton',4444],['christa sumwalt',1],['david boggs',500],['steve horowitz',11001]);

        // var values = data;
        // var log =[];
        // angular.forEach(values, function(value, key) {
          // log.push(value);
          //chart2.data.push(angular.fromJson(value[0])); 
        // });
        // console.log(log);
        //console.log(chart2.data);

        //chart2.data.push(data);
        // chart2.data=JSON.stringify(data);
        //$scope.chart2=data.data;
        chart2.options = {
            displayExactValues: true,
            width: 350,
            height: 200,
            is3D: false,
            chartArea: {left:10,top:10,bottom:0,height:"100%"}
        };
        chart2.formatters = {
          number : [{
            columnNum: 1,
            pattern: "$ #,##0.00"
          }]
        };
        $scope.chart2 = chart2;
        $scope.aa=1*$scope.chart2.data[1][1];
        $scope.bb=1*$scope.chart2.data[2][1];
        $scope.cc=1*$scope.chart2.data[3][1];
        // 
    })
    .error(function(){
        console.log('Error API chart2');
    });
  
  //
 var chart1 = {};
    chart1.type = "ColumnChart";
    chart1.cssStyle = "height:300px; width:100%;";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "collects", label:"Deposits", type: "number"},
        {id: "amounts", label:"Amount", type: "number"}
    ], "rows": [
        {c: [
            {v: "January"},
            {v: 19, f: "42"},
            {v: 19, f: "50000"}
        ]},
        {c: [
            {v: "February"},
            {v: 13},
            {v: 19, f: "4200"}
        ]},
        {c: [
            {v: "March"},
            {v: 24},
            {v: 19, f: "420"}
        ]},
        {c: [
            {v: "April"},
            {v: 10},
            {v: 19, f: "5642"}
        ]},
        {c: [
            {v: "May"},
            {v: 1},
            {v: 19, f: "4442"}
        ]}
    ]};

    chart1.options = {
        "title": "Compensation Splits",
        "isStacked": "true",
        "fill": 50,
        "displayExactValues": true,
        "vAxis": {
            "title": "Monthly collects", "gridlines": {"count": 6}
        },
        "hAxis": {
            "title": "Compare by month"
        }
    };
    chart1.formatters = {};
    $scope.chart1 = chart1;
  //
  });
