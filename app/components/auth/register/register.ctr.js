(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('registerCtrl', function($scope, $state, $mdSidenav, $mdDialog, $timeout, AuthService, states) {

            const vm = this;

            vm.sidenavOpen;
            vm.register = register;
            vm.clear = clear;
            vm.states = states

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
                $scope.registerForm = {};
            }

            function register() {

                $scope.error = false;

                const { firstName, lastName, phone, city, state, zipCode, email, password } = $scope.registerForm;

                AuthService.register(firstName, lastName, phone, city, state, zipCode, email, password)
                    .then(function() {
                        $state.go('classifieds.login');
                        $scope.registerForm = {};
                    })
                    .catch(function(err) {
                        if (err) {
                            $scope.error = true;
                            $scope.errorMessage = err.msg;
                        }
                    });
            }

        });
})();
