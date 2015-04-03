'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculatorApp
 */
app.controller('MainCtrl', function ($scope, $http, $location, $window, Data, $cookies, auth) {

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
        chart2.data.push(['Brandy Milazzo','200'],['Suzanne Schaffer','12500'],['colin stockton','4444'],['christa sumwalt','1'],['david boggs','500'],['steve horowitz','11001']);

        var values = data;
        var log =[];
        angular.forEach(values, function(value, key) {
          log.push(value);
          //chart2.data.push(angular.fromJson(value[0]));
          
        });
        console.log(log);
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
    chart1.cssStyle = "height:250px; width:350px;";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "laptop-id", label: "NETK Work- NETK Generated Client", type: "number"},
        {id: "desktop-id", label: "NETK Work- Equity Member Generated Client (No supervision)", type: "number"},
        {id: "server-id", label: "NETK Work- Equity Member Generated Client (Supervision)", type: "number"},
        {id: "cost-id", label: "NETK Work- Other NETK client (Supervision)", type: "number"}
    ], "rows": [
        {c: [
            {v: "January"},
            {v: 19, f: "42 items"},
            {v: 12, f: "Ony 12 items"},
            {v: 7, f: "7 servers"},
            {v: 4}
        ]},
        {c: [
            {v: "February"},
            {v: 13},
            {v: 1, f: "1 unit (Out of stock this month)"},
            {v: 12},
            {v: 2}
        ]},
        {c: [
            {v: "March"},
            {v: 24},
            {v: 0},
            {v: 11},
            {v: 6}

        ]}
    ]};

    chart1.options = {
        "title": "Compensation Splits",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Monthly collects", "gridlines": {"count": 6}
        },
        "hAxis": {
            "title": "Date"
        }
    };
    chart1.formatters = {};
    $scope.chart1 = chart1;
  //
  });
