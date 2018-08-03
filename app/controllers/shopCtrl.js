'use strict';
angular.module('shopCtrl', [])
    .controller('shopCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        console.log('shopCtrl init');

        // set Loading
        $scope.isloading = true;
        $scope.isHome = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 3000);
        $rootScope.getCurrentDay();

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;
        // set Category
        $rootScope.category = 'shop';
        $rootScope.categoryName = 'shop';
        $rootScope.categoryDescription = 'shop.text.1';

        $scope.btnIcon = 'call';
    }]);

