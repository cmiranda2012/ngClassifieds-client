(function() {

    "use strict";

    angular
        .module("ngClassifieds")
        .controller('registerCtrl', function($scope, $state, $mdSidenav, $mdDialog, $timeout, AuthService) {

            const vm = this;

            vm.sidenavOpen;
            vm.register = register;
            vm.clear = clear;

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

                AuthService.register($scope.registerForm.firstName, $scope.registerForm.lastName, $scope.registerForm.phone, $scope.registerForm.city, $scope.registerForm.state, $scope.registerForm.email, $scope.registerForm.password)
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
