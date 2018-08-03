'use strict';
angular.module('beerCtrl', [])
    .controller('beerCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        //console.log('beerCtrl init');

        $rootScope.getCurrentDay();

        $scope.isHome = true;

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 2000);

        // set Category
        $rootScope.categoryName = 'minipivovar';
        $rootScope.categoryDescription = 'brewery.text.2';
        
        $rootScope.openMobileMenu = false;

        // Book Button Icon
        $scope.btnIcon = 'call';

        $scope.showMoreHistory = false;

        $scope.doShowMoreHistory = function () {
            $scope.showMoreHistory = !$scope.showMoreHistory;
        };
        $scope.doShowMoreText = function () {
            $scope.showMoreText = !$scope.showMoreText;
        };


        $scope.toggletext = function () {
            $scope.toggle = !$scope.toggle;
        };
        $scope.toggle2text = function () {
            $scope.toggle2 = !$scope.toggle2;
        };
        $scope.toggle3text = function () {
            $scope.toggle3 = !$scope.toggle3;
        };
        $scope.toggle4text = function () {
            $scope.toggle4 = !$scope.toggle4;
        };
        $scope.toggle5text = function () {
            $scope.toggle5 = !$scope.toggle5;
        };
        $scope.toggle6text = function () {
            $scope.toggle6 = !$scope.toggle6;
        };
        $scope.toggle7text = function () {
            $scope.toggle7 = !$scope.toggle7;
        };
        $scope.toggle8text = function () {
            $scope.toggle8 = !$scope.toggle8;
        };
        $scope.toggle9text = function () {
            $scope.toggle9 = !$scope.toggle9;
        };
        $scope.toggle10text = function () {
            $scope.toggle10 = !$scope.toggle10;
        };
        $scope.toggle11text = function () {
            $scope.toggle11 = !$scope.toggle11;
        };
        $scope.toggle12text = function () {
            $scope.toggle12 = !$scope.toggle12;
        };

        var map = jQuery('.map');
        var mapFrame = jQuery('.map iframe');

        map.click(function () {
            mapFrame.css("pointer-events", "auto");
        });

        map.mouseleave(function () {
            mapFrame.css("pointer-events", "none");
        });

    }]);

