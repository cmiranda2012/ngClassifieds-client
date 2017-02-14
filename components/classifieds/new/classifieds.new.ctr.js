(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('newClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;

      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified;
      // vm.sidebarTitle = 'Add a Classifed';

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
        vm.classified = {};
        $scope.sidenavOpen = false;        
      }

      function saveClassified(classified) {
        if(classified) {
          // used to send messages between scopes. Used to send messages or data up to parent scopes from child scopes
          //first argument name of it, second data we want to send or message
          $scope.$emit('newClassified', classified)          
          vm.sidenavOpen = false;
        }
      }

    });

})();