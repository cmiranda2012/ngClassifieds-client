(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

            const vm = this;

            vm.sidenavOpen;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
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