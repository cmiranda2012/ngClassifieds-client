(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('loginCtrl', function($scope, $state, $mdSidenav, $mdDialog, $timeout, AuthService) {

            const vm = this;

            vm.sidenavOpen;
            vm.login = login;
            vm.clear = clear;

            AuthService.isLoggedIn(function(loggedIn) {
                if (!loggedIn) {
                    $state.go('classifieds');
                }
            })

            $scope.$watch('vm.sidenavOpen', function(sidenavOpen) {

                if (sidenavOpen === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('classifieds');
                        });
                }
            });

            $timeout(function() {
                $mdSidenav('left').open();
            });

            function clear() {
                $scope.loginForm = {};
            }

            function login() {
                $scope.error = false;

                AuthService.login(
                        $scope.loginForm.email,
                        $scope.loginForm.password
                    ).then(function(data) {
                        $state.go('classifieds', null, {
                            reload: true
                        });
                        $scope.loginForm = {};
                    })
                    .catch(function(err) {
                        if (err) {
                            $scope.error = true;
                            $scope.errorMessage = err.msg;
                            $scope.loginForm.password = '';
                        }
                    });
            }
            
        });
})();