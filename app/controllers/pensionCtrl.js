'use strict';
angular.module('pensionCtrl', [])
    .controller('pensionCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        console.log('pensionCtrl init');

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }

        setTimeout(stopLoading, 1000);

        $rootScope.getCurrentDay();

        // set Category
        $rootScope.categoryName = 'pension';
        $rootScope.categoryDescription = 'pension.text.1';

        $rootScope.openMobileMenu = false;
        $scope.bookFinnish = false;

        /// icon
        $scope.btnIcon = 'hotel';

        $scope.url = 'bookPenzion.php';

        $scope.formsubmit = function () {

            console.log('$scope.checkin ' + $scope.checkin);
            console.log('$scope.checkout ' + $scope.checkout);
            console.log('$scope.amount ' + $scope.amount);

            console.log("checkin: " + $scope.checkin + " checkout: " + $scope.checkout + " amount: " + $scope.amount +
                " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone);

            $http.post($scope.url, {"checkin": $scope.checkin, "checkout": $scope.checkout, "amount": $scope.amount,
                "name": $scope.name, "email": $scope.email, "phone": $scope.phone})
                .success(function (data, status) {


                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element

                    console.log('poslane: ' + $scope.result);
                    console.log('status > ' + $scope.status);

                    $scope.bookFinnish = true;
                })

        };

    }]);

