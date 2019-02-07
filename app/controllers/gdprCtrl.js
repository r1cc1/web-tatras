'use strict';
angular.module('gdprCtrl', [])
    .controller('gdprCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        console.log('gdprCtrl init');

        $rootScope.getCurrentDay();



        // set Category
        $rootScope.category = 'gdpr';
        $rootScope.categoryName = 'Informácie o spracúvaní vašich osobných údajov';


        $scope.category = $rootScope.category;

        console.log('$scope.category ' + $scope.category);
    }]);

