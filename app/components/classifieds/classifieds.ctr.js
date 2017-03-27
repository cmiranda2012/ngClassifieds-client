(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($http, $scope, $mdSidenav, $mdToast, $mdDialog, $state, $interval, AuthService, classifieds, categories) {

            const vm = this;

            isLoggedIn();

            vm.classifieds = classifieds.data;
            vm.showFilters = false;
            vm.loggedIn = false;
            vm.openSidebar = openSidebar;
            vm.login = login;
            vm.register = register;
            vm.account = account;
            vm.toggleFilterShow = toggleFilterShow;
            vm.isLoggedIn = isLoggedIn;
            vm.logout = logout
            vm.categories = categories;

            $scope.$on('newClassified', function(event, classified) {

                $http.post('http://localhost:8081/api/classifieds', classified)
                    .success(function(data) {
                        vm.classifieds.push(data);
                        showToast('Classified saved');
                    })
                    .error(function(data) {
                        console.log(`Error: ${data}`);
                    });
            });

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function login() {
                $state.go('classifieds.login');
            }

            function register() {
                $state.go('classifieds.register');
            }

            function logout() {
                AuthService.logout()
                    .then(function() {
                        $state.go('classifieds', null, {
                            reload: true
                        });
                    });
            }

            function account() {
                $state.go('account');
            }

            function isLoggedIn() {
                AuthService.isLoggedIn(function(err) {
                    if (!err) {
                        vm.loggedIn = true;
                    }
                });
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000)
                );
            }

            function toggleFilterShow() {
                vm.showFilters = !vm.showFilters;
            }

        });
})();
