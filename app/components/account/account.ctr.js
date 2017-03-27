(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('accountCtrl', function ($http, $scope, $mdToast, $mdSidenav, $mdDialog, $state, AuthService, user, userClassifieds) {

            const vm = this;

            vm.user = user.data;
            vm.classifieds = userClassifieds.data;
            vm.deleteClassified = deleteClassified;
            vm.editClassified = editClassified;
            vm.logout = logout;
            vm.home = home;

            $scope.$on('editSaved', function(event, message, classified) {
                $http.put(`http://localhost:8081/api/classifieds/${classified._id}`, classified)
                    .success(function(data) {
                        showToast('Classified saved');
                    })
                    .error(function(data) {
                        console.log(`Error: ${data}`);
                    });
            });

            function editClassified(classified) {
                $state.go('account.edit', {
                    classified: classified,
                    id: classified.id
                });
            }

            function home() {
                $state.go('classifieds');
            }

            function deleteClassified(event, classified, id) {

                var confirm = $mdDialog.confirm()
                    .title(`Are you sure you want to delete ${classified.title}?`)
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    $http.delete(`http://localhost:8081/api/classifieds/${id}`)
                        .success(function(data) {
                            vm.classifieds = data;
                            showToast('Classified Deleted');
                        })
                        .error(function(data) {
                            showToast('Unable to delete');
                            console.log(`Error: ${data}`);
                        });

                }, function() {

                });
            }

            function logout() {
                AuthService.logout()
                    .then(function() {
                        $state.go('classifieds', null, {
                            reload: true
                        });
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

        });
})();
