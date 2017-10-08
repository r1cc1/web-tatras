'use strict';
angular.module('startCtrl', [])
    .controller('startCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        console.log('startCtrl init');

        $rootScope.getCurrentDay();

        $scope.isHome = false;

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 2000);

        // set Category
        $rootScope.category = 'welcome';
        $rootScope.categoryName = 'welcome';
        $rootScope.openMobileMenu = false;

    }]);

