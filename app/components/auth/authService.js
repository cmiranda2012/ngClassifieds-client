(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .factory('AuthService', function ($window, $q, $timeout, $http) {

            var user = null;

            function isLoggedIn(cb) {
                $http.get('http://localhost:8081/api/islogged')
                    .success(function() {
                        return cb(null, true);
                    })
                    .error(function(err) {
                        return cb(err);
                    });
            }

            function login(email, password) {

                var deferred = $q.defer();

                $http.post('http://localhost:8081/api/login', {
                    email: email,
                    password: password
                }).success(function(data, status) {
                    if (data && status === 200) {
                        user = true;
                        $window.sessionStorage.token = data.token;
                        deferred.resolve(data);
                    } else {
                        user = false;
                        deferred.reject();
                    }
                }).error(function(err) {
                    user = false;
                    deferred.reject(err);
                });

                return deferred.promise;
            }

            function logout() {

                var deferred = $q.defer();

                $http.get('http://localhost:8081/api/logout')
                    .success(function() {
                        user = false;
                        delete $window.sessionStorage.token;
                        deferred.resolve();
                    })
                    .error(function() {
                        user = false;
                        deferred.reject();
                    });

                return deferred.promise;
            }

            function register(firstName, lastName, phone, city, state, email, password) {

                var deferred = $q.defer();

                $http.post('http://localhost:8081/api/register', {
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        city: city,
                        state: state,
                        email: email,
                        password: password
                    })
                    .success(function(data, status) {
                        if (data && status === 200) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    .error(function(err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            return {
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout,
                register: register
            };

        });
})();