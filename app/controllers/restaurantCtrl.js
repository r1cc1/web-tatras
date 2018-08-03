'use strict';
angular.module('restaurantCtrl', [])
    .controller('restaurantCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        console.log('restaurantCtrl init');

        // set Loading
        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 3000);

        // set Category
        $rootScope.categoryName = 'restaurant';
        $rootScope.categoryDescription = 'restaurant.text.3';
        $scope.btnIcon = 'local_restaurant';

        // set default States
        $rootScope.openMobileMenu = false;
        $scope.bookFinnish = false;
        $scope.showMoreHistory = false;

        $scope.doShowMoreHistory = function () {
            $scope.showMoreHistory = !$scope.showMoreHistory;
        };

        $scope.todayDate  = function() {
            Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            });
            $scope.currentDay = new Date().toDateInputValue();
            $scope.day = $scope.currentDay;
            console.log('currentDay ' + $scope.currentDay);
        };
        $scope.todayDate();

        $scope.showTimer = function (data) {
            var TimerNow = data.replace(/\s+/g, '');
            $scope.formatTime = TimerNow;
            console.log('TimerNow1: ' + TimerNow);

            if (TimerNow < $scope.restMonTimeFrom.$value) {
                $scope.invalidTime = true;
                console.log('TimerNow JE MENSI AKO OTVARACI CAS');
            }
            if (TimerNow > $scope.restMonTimeTo.$value) {
                $scope.invalidTime = true;
                console.log('TimerNow JE VACSI AKO OTVARACI CAS');
            } else {
                $scope.invalidTime = false;
            }
        };

        // Booking
        $scope.url = 'bookRestaurant.php';

        $scope.formsubmit = function () {

            if ($scope.phone == null || $scope.phone == undefined) {
                console.log('user nezadal PHONE');
                $scope.phone = '---';
            }
            if ($scope.addText == null || $scope.addText == undefined) {
                console.log('user nezadal addText');
                $scope.addText = '---';
            }

            //console.log("NOTformatTime " + $scope.timer);
            //console.log("formatTime " + $scope.formatTime);
            //console.log("addText " + $scope.addText);
            console.log("date: " + $scope.date + " timer: " + $scope.formatTime + " amount: " + $scope.amount +
                " room: " + $scope.room + " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone + " addText " + $scope.addText);

            $http.post($scope.url, {"date": $scope.date, "timer": $scope.formatTime, "amount": $scope.amount,
                "room": $scope.room, "name": $scope.name, "email": $scope.email, "phone": $scope.phone, "addText" : $scope.addText})
                .success(function (data, status) {

                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element

                    console.log('Form DATA : ' + $scope.result);
                    console.log('Form status : ' + $scope.status);

                    $scope.bookFinnish = true;
                })
        };

        /// get day name and highlight the day
        $rootScope.getCurrentDay();

        var options = {
            twentyFour: true
        };
        jQuery('.timepicker').wickedpicker(options);

    }]);

