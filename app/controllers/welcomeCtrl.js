'use strict';
angular.module('welcomeCtrl', [])
    .controller('welcomeCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        //console.log('welcomeCtrl init');
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
        $rootScope.openMobileMenu = false;
    }]);

