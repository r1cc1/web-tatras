'use strict';
angular.module('adminCtrl', [])
    .controller('adminCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        console.log('adminCtrl init');

        $rootScope.getCurrentDay();

        // set Category
        $rootScope.category = 'admin';
        $rootScope.categoryName = 'admin';

        $scope.adminLogin = true;
        $scope.adminCenter = false;
        $scope.adminUser = 'admin';
        $scope.adminPass = 'info123Tatras';

        $scope.food1 = 'Polievka';
        $scope.food2 = 'Menu 1.';
        $scope.food3 = 'Menu 2.';

        $scope.person = 'osoba';
        $scope.people = 'osoby';
        $scope.night = 'noc';

        $scope.showError = false;

        $scope.logMeIn = function (loginEmail, loginPass) {
            console.log('--email--');
            console.log(loginEmail);
            console.log('--pass--');
            console.log(loginPass);

            if(loginEmail === $scope.adminUser) {
                console.log('MSG: good-email');

                if(loginPass === $scope.adminPass) {
                    console.log('MSG: good-pass');
                    /// open dashboard
                    $scope.adminCenter = true;
                    /// close Login
                    $scope.adminLogin = false;
                } else {
                    console.log('ERROR: wrong-pass');
                    $scope.showError = true;
                    $scope.adminCenter = false;
                    $scope.adminLogin = true;
                    return;
                }

            }else {
                $scope.showError = true;
                console.log('wrong-email');
                $scope.adminLogin = true;
                $scope.adminCenter = false;
            }
        };

        $scope.previewOpen = false;
        $scope.editOver = false;

        $scope.showPreview = function() {
            $scope.previewOpen = true;
        };

        $scope.backToStart = function(){
            $scope.previewOpen = false;
            $scope.editOver = false;
        };

        $(function(){
            /// trigger login Fucntion from Enter key
            $('.jumbotron').keypress(function(e){
                if(e.which == 13) {
                    angular.element('#SubmitLoginForm').triggerHandler('click');
                }
            })
        });

        $scope.formsubmit = function () {
            $scope.editOver = true;
            /// cena
            console.log('$scope.dailyMenuPrice.$value ' + $scope.dailyMenuPrice.$value);
            $scope.dailyMenuPrice.$save();

            /// vaha 1
            console.log('$scope.dailyMenuWeight1.$value ' + $scope.dailyMenuWeight1.$value);
            $scope.dailyMenuWeight1.$save();
            /// vaha 2
            console.log('$scope.dailyMenuWeight2.$value ' + $scope.dailyMenuWeight2.$value);
            $scope.dailyMenuWeight2.$save();
            /// vaha 3
            console.log('$scope.dailyMenuWeight3.$value ' + $scope.dailyMenuWeight3.$value);
            $scope.dailyMenuWeight3.$save();

            /// day 1
            console.log('$scope.day1Date.$value ' + $scope.day1Date.$value);
            $scope.day1Date.$save();
            /// day 1 food 1
            console.log('$scope.day1food1.$value ' + $scope.day1food1.$value);
            $scope.day1food1.$save();
            /// day 1 food 1 allergens
            console.log('$scope.day1allergens1.$value ' + $scope.day1allergens1.$value);
            $scope.day1allergens1.$save();

            /// day 1 food 2
            console.log('$scope.day1food2.$value ' + $scope.day1food2.$value);
            $scope.day1food2.$save();
            /// day 1 food 2 allergens
            console.log('$scope.day1allergens2.$value ' + $scope.day1allergens2.$value);
            $scope.day1allergens2.$save();

            /// day 1 food 3
            console.log('$scope.day1food3.$value ' + $scope.day1food3.$value);
            $scope.day1food3.$save();
            /// day 1 food 3 allergens
            console.log('$scope.day1allergens3.$value ' + $scope.day1allergens3.$value);
            $scope.day1allergens3.$save();


            /// day 2
            console.log('$scope.day2Date.$value ' + $scope.day2Date.$value);
            $scope.day2Date.$save();
            /// day 2 food 1
            console.log('$scope.day2food1.$value ' + $scope.day2food1.$value);
            $scope.day2food1.$save();
            /// day 2 food 1 allergens
            console.log('$scope.day2allergens1.$value ' + $scope.day2allergens1.$value);
            $scope.day2allergens1.$save();

            /// day 2 food 2
            console.log('$scope.day2food2.$value ' + $scope.day2food2.$value);
            $scope.day2food2.$save();
            /// day 2 food 2 allergens
            console.log('$scope.day2allergens2.$value ' + $scope.day2allergens2.$value);
            $scope.day2allergens2.$save();

            /// day 2 food 3
            console.log('$scope.day2food3.$value ' + $scope.day2food3.$value);
            $scope.day2food3.$save();
            /// day 2 food 3 allergens
            console.log('$scope.day2allergens3.$value ' + $scope.day2allergens3.$value);
            $scope.day2allergens3.$save();

            /// day3
            console.log('$scope.day3Date.$value ' + $scope.day3Date.$value);
            $scope.day3Date.$save();
            /// day3 food 1
            console.log('$scope.day3food1.$value ' + $scope.day3food1.$value);
            $scope.day3food1.$save();
            /// day3 food 1 allergens
            console.log('$scope.day3allergens1.$value ' + $scope.day3allergens1.$value);
            $scope.day3allergens1.$save();

            /// day3 food 2
            console.log('$scope.day3food2.$value ' + $scope.day3food2.$value);
            $scope.day3food2.$save();
            /// day3 food 2 allergens
            console.log('$scope.day3allergens2.$value ' + $scope.day3allergens2.$value);
            $scope.day3allergens2.$save();

            /// day3 food 3
            console.log('$scope.day3food3.$value ' + $scope.day3food3.$value);
            $scope.day3food3.$save();
            /// day3 food 3 allergens
            console.log('$scope.day3allergens3.$value ' + $scope.day3allergens3.$value);
            $scope.day3allergens3.$save();



            /// day4
            console.log('$scope.day4Date.$value ' + $scope.day4Date.$value);
            $scope.day4Date.$save();
            /// day4 food 1
            console.log('$scope.day4food1.$value ' + $scope.day4food1.$value);
            $scope.day4food1.$save();
            /// day4 food 1 allergens
            console.log('$scope.day4allergens1.$value ' + $scope.day4allergens1.$value);
            $scope.day4allergens1.$save();

            /// day4 food 2
            console.log('$scope.day4food2.$value ' + $scope.day4food2.$value);
            $scope.day4food2.$save();
            /// day4 food 2 allergens
            console.log('$scope.day4allergens2.$value ' + $scope.day4allergens2.$value);
            $scope.day4allergens2.$save();

            /// day4 food 3
            console.log('$scope.day4food3.$value ' + $scope.day4food3.$value);
            $scope.day4food3.$save();
            /// day4 food 3 allergens
            console.log('$scope.day4allergens3.$value ' + $scope.day4allergens3.$value);
            $scope.day4allergens3.$save();


            /// day5
            console.log('$scope.day5Date.$value ' + $scope.day5Date.$value);
            $scope.day5Date.$save();
            /// day5 food 1
            console.log('$scope.day5food1.$value ' + $scope.day5food1.$value);
            $scope.day5food1.$save();
            /// day5 food 1 allergens
            console.log('$scope.day5allergens1.$value ' + $scope.day5allergens1.$value);
            $scope.day5allergens1.$save();

            /// day5 food 2
            console.log('$scope.day5food2.$value ' + $scope.day5food2.$value);
            $scope.day5food2.$save();
            /// day5 food 2 allergens
            console.log('$scope.day5allergens2.$value ' + $scope.day5allergens2.$value);
            $scope.day5allergens2.$save();

            /// day5 food 3
            console.log('$scope.day5food3.$value ' + $scope.day5food3.$value);
            $scope.day5food3.$save();
            /// day5 food 3 allergens
            console.log('$scope.day5allergens3.$value ' + $scope.day5allergens3.$value);
            $scope.day5allergens3.$save();


        };

        $scope.printMenu = function() {

            function explode(){
                html2canvas($('#preview'), {

                    onrendered: function(canvas) {

                        var img    = canvas.toDataURL("image/png");

                        var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
                        winPrint.document.write('<div style="display:block;position: relative;">');
                        winPrint.document.write('<img src="'+img+'"/></div>');
                        winPrint.document.close();
                        winPrint.focus();

                    }
                });
            }
            setTimeout(explode, 1000);
        };

        //
        // $scope.dailyMenuList = null;
        // $http.get('/components/assets/texts/daily-menu.json').success(function(data, status, headers, config) {
        //     $scope.dailyMenuList = data[0];
        //     console.log('--$scope.dailyMenuList--');
        //     console.log($scope.dailyMenuList);
        //
        //
        //     console.log('--$scope.dailyMenuList--');
        //     console.log($scope.dailyMenuList);
        //
        // }).error(function(data, status, headers, config) {});

        //
        // $http({method: 'GET', url: '/components/assets/texts/daily-menu.json'}).success(function(data) {
        //     $scope.dailyMenuList = [];
        //     angular.forEach(data.week, function(value, key) {
        //         $scope.dailyMenuList.push(value);
        //     });
        //     $scope.isVisible = function(name){
        //         return true;// return false to hide this artist's albums
        //     };
        //
        //     console.log('--$scope.dailyMenuList--');
        //     console.log($scope.dailyMenuList);
        // });
        //


        $scope.dateConfig = {
            startDate: "2014-09-01"
        };

        $scope.events = [
            {
                start: new DayPilot.Date("2014-09-01T10:00:00"),
                end: new DayPilot.Date("2014-09-01T14:00:00"),
                id: DayPilot.guid(),
                text: "First Event"
            },
            {
                start: new DayPilot.Date("2014-09-01T14:00:00"),
                end: new DayPilot.Date("2014-09-01T16:00:00"),
                id: DayPilot.guid(),
                text: "Second Event"
            },
            {
                start: new DayPilot.Date("2014-09-01T16:00:00"),
                end: new DayPilot.Date("2014-09-01T18:00:00"),
                id: DayPilot.guid(),
                text: "Third Event"
            },
            {
                start: new DayPilot.Date("2014-09-01T18:00:00"),
                end: new DayPilot.Date("2014-09-01T20:00:00"),
                id: DayPilot.guid(),
                text: "Fourth Event"
            },
            {
                start: new DayPilot.Date("2014-09-01T20:00:00"),
                end: new DayPilot.Date("2014-09-01T22:00:00"),
                id: DayPilot.guid(),
                text: "Fifth Event"
            },
            {
                start: new DayPilot.Date("2014-09-01T22:00:00"),
                end: new DayPilot.Date("2014-09-01T24:00:00"),
                id: DayPilot.guid(),
                text: "Sixth Event"
            },
            {
                start: new DayPilot.Date("2014-09-02T10:00:00"),
                end: new DayPilot.Date("2014-09-02T14:00:00"),
                id: DayPilot.guid(),
                text: "Test Event"
            }
        ];

        $scope.add = function() {
            $scope.events.push(
                {
                    start: new DayPilot.Date("2014-09-01T10:00:00"),
                    end: new DayPilot.Date("2014-09-01T12:00:00"),
                    id: DayPilot.guid(),
                    text: "Simple Event"
                }
            );
        };

        $scope.move = function() {
            var event = $scope.events[0];
            event.start = event.start.addDays(1);
            event.end = event.end.addDays(1);
        };

        $scope.rename = function() {
            $scope.events[0].text = "New name";
        };


    }]);

