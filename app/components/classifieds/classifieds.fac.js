(function() {

    "use strict";

    angular
        .module("ngClassifieds")
        .factory("classifiedsFactory", function($http) {

            function getClassifieds() {
                return $http.get('http://localhost:8081/api/classifieds');
            }

            function getUserClassifieds() {
                return $http.get('http://localhost:8081/api/myclassifieds');
            }

            function getUser() {
                return $http.get('http://localhost:8081/api/account');
            }

            return {
                getClassifieds: getClassifieds,
                getUserClassifieds: getUserClassifieds,
                getUser: getUser
            }

        });

})();
