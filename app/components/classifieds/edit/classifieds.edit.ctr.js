(function() {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($state, $scope, $mdSidenav, $timeout) {

            var vm = this;

            vm.sidenavOpen;
            vm.saveEdit = saveEdit;
            vm.closeSidebar = closeSidebar;
            vm.classified = $state.params.classified;
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
                $scope.$emit('editSaved', 'Edit saved.', classified );
                vm.sidenavOpen = false;
            }

        });

})();
