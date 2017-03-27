(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, $timeout, categories) {

            const vm = this;

            vm.sidenavOpen;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
            vm.categories = categories;

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

            function closeSidebar() {
                vm.classified = {};
                vm.sidenavOpen = false;
            }

            function saveClassified(classified) {
                if (classified.title && classified.price) {
                    $scope.$emit('newClassified', classified)
                    vm.sidenavOpen = false;
                }
            }

        });
})();
