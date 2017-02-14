(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('editClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;
      vm.closeSidebar = closeSidebar;
      vm.saveEdit = saveEdit;
      vm.classified = $state.params.classified;
      // // We need a watcher to trigger the sidenav
      // // opening and closing
      $scope.$watch('vm.sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
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
        vm.sidenavOpen = false;        
      }

      function saveEdit() {
        $scope.$emit('editSaved', 'Edit saved.');
        vm.sidenavOpen = false;
      }

    });

})();