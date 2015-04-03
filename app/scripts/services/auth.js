'use strict';

/**
 * @ngdoc service
 * @name calculatorApp.auth
 * @description
 * # auth
 * Factory in the calculatorApp.
 */

// http://uno-de-piera.com/login-con-angularjs-utilizando-cookies-con-el-modulo-ngcookies/
app.factory('auth', function ($cookies,$cookieStore,$location) {
    return {
        login : function(username, password) {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.username = username;
            $cookies.password = password;
            //mandamos a la home
            $location.path('/main');
        },
        logout : function() {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove('username'),
            $cookieStore.remove('password');
            console.log('logout');
            //mandamos al login
            $location.path('/login');
        },
        checkStatus : function() {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ['/main','/collects','/lawyers','/reports','/report','/private'];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) === 'undefined') {
                $location.path('/login');
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array('/login',rutasPrivadas) && typeof($cookies.username) !== 'undefined') {
                $location.path('/main');
            }
        },
        in_array : function(needle, haystack) {
            var key = '';
            for(key in haystack) {
                if(haystack[key] === needle) {
                    return true;
                }
            }
            return false;
        }
    }
  });
