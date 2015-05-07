'use strict';

/**
 * @ngdoc filter
 * @name calculatorApp.filter:sumByKey
 * @function
 * @description
 * # sumByKey
 * Filter in the calculatorApp.
 */
app.filter('sumByKey', function () {
	// http://cacodaemon.de/index.php?id=55
  	return function(data, key) {
        if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
            return 0;
        }

        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key]);
        }

        return sum;
    };
  });
