(function() {

    angular
        .module('ngClassifieds', ['ngMaterial', 'ui.router', 'ngMessages'])
        .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('teal')
                .accentPalette('orange');

            $urlRouterProvider
                .otherwise('/classifieds');

            $stateProvider
                .state('classifieds', {
                    url: '/classifieds',
                    templateUrl: 'app/components/classifieds/classifieds.tpl.html',
                    controller: 'classifiedsCtrl as vm'
                })
                .state('classifieds.new', {
                    url: '/new',
                    templateUrl: 'app/components/classifieds/new/classifieds.new.tpl.html',
                    controller: 'newClassifiedsCtrl as vm'
                })
                .state('account.edit', {
                    url: '/edit/:id',
                    templateUrl: 'app/components/classifieds/edit/classifieds.edit.tpl.html',
                    controller: 'editClassifiedsCtrl as vm',
                    params: {
                        classified: null
                    }
                });
        });

})();
