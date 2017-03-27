(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($state, $scope, $mdSidenav, $timeout, categories) {

            var vm = this;

            vm.sidenavOpen;
            vm.saveEdit = saveEdit;
            vm.closeSidebar = closeSidebar;
            vm.classified = $state.params.classified;

            $scope.$watch('vm.sidenavOpen', function(sidenavOpen) {
                if (sidenavOpen === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('account');
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

            function saveEdit(classified) {
                $scope.$emit('editSaved', 'Edit saved.', classified);
                vm.sidenavOpen = false;
            }

        });
})();
