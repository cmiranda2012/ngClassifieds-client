(function() {

    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl", function($http, $scope, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $state, $interval, AuthService) {

            const vm = this;

            isLoggedIn();

            vm.classifieds;
            vm.showFilters = false;
            vm.loggedIn = false;
            vm.openSidebar = openSidebar;
            vm.login = login;
            vm.register = register;
            vm.account = account;
            vm.toggleFilterShow = toggleFilterShow;
            vm.isLoggedIn = isLoggedIn;
            vm.logout = logout
            vm.categories = [
                'Antiques',
                'Art',
                'Baby',
                'Books',
                'Business & Industrial',
                'Cameras & Photo',
                'Cell Phones & Accessories',
                'Clothing, Shoes & Accessories',
                'Coins & Paper Money',
                'Collectible',
                'Computers/Tablets & Networking',
                'Consumer Electronics',
                'Crafts',
                'Dolls & Bears',
                'DVDs & Movies',
                'Entertainment Memorabilia',
                'Everything Else',
                'Gift Cards & Coupons',
                'Health & Beauty',
                'Home & Garden',
                'Jewelry & Watches',
                'Music',
                'Musical Instruments & Gear',
                'Pet Supplies',
                'Pottery & Glass',
                'Real Estate',
                'Specialty Services',
                'Sporting Goods',
                'Sports Mem, Cards & Fan Shop',
                'Stamps',
                'Tickets & Experiences',
                'Toys & Hobbies',
                'Travel',
                'Video Games & Consoles'
            ];

            classifiedsFactory.getClassifieds().then(function(classifieds) {
                vm.classifieds = classifieds.data;
            });

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
