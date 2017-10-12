'use strict';
angular.module('adminCtrl', [])
    .controller('adminCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        console.log('adminCtrl init');

        $rootScope.getCurrentDay();

        // set Category
        $rootScope.category = 'admin';
        $rootScope.categoryName = 'Admin Center';

        $scope.adminLogin = true;
        $scope.adminCenter = false;
        $scope.adminUser = 'Admin';
        $scope.adminPass = 'info123Tatras';

        // TODO: Texty to Translate
        $scope.food1 = 'Polievka';
        $scope.food2 = 'Menu 1.';
        $scope.food3 = 'Menu 2.';
        $scope.person = 'osoba';
        $scope.people = 'osoby';
        $scope.night = 'noc';

        $scope.showError = false;

        $scope.logMeIn = function (loginEmail, loginPass) {
            // console.log('--user--');
            // console.log(loginEmail);
            // console.log('--pass--');
            // console.log(loginPass);

            if(loginEmail === $scope.adminUser) {
                if(loginPass === $scope.adminPass) {
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
                $scope.adminLogin = true;
                $scope.adminCenter = false;
            }
        };

        $scope.previewOpen = false;
        $scope.editOver = false;

        $scope.showPreview = function() {
            $scope.previewOpen = true;
        };
        $scope.closePreview = function(){
            $scope.previewOpen = false;
        };
        $scope.backToStart = function(){
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
            // set edit is over, set Flag
            $scope.editOver = true;

            /// cena Denneho Menu
            $scope.dailyMenuPrice.$save();

            /// vaha Denneho Menu
            $scope.dailyMenuWeight1.$save();
            $scope.dailyMenuWeight2.$save();
            $scope.dailyMenuWeight3.$save();

            /// day 1 date
            $scope.day1Date.$save();
            /// day 1 food 1
            $scope.day1food1.$save();
            /// day 1 food 1 allergens
            $scope.day1allergens1.$save();
            /// day 1 food 2
            $scope.day1food2.$save();
            /// day 1 food 2 allergens
            $scope.day1allergens2.$save();
            /// day 1 food 3
            $scope.day1food3.$save();
            /// day 1 food 3 allergens
            $scope.day1allergens3.$save();


            /// day 2 date
            $scope.day2Date.$save();
            /// day 2 food 1
            $scope.day2food1.$save();
            /// day 2 food 1 allergens
            $scope.day2allergens1.$save();
            /// day 2 food 2
            $scope.day2food2.$save();
            /// day 2 food 2 allergens
            $scope.day2allergens2.$save();
            /// day 2 food 3
            $scope.day2food3.$save();
            /// day 2 food 3 allergens
            $scope.day2allergens3.$save();

            /// day 3 date
            $scope.day3Date.$save();
            /// day3 food 1
            $scope.day3food1.$save();
            /// day3 food 1 allergens
            $scope.day3allergens1.$save();
            /// day3 food 2
            $scope.day3food2.$save();
            /// day3 food 2 allergens
            $scope.day3allergens2.$save();
            /// day3 food 3
            $scope.day3food3.$save();
            /// day3 food 3 allergens
            $scope.day3allergens3.$save();


            /// day 4 date
            $scope.day4Date.$save();
            /// day4 food 1
            $scope.day4food1.$save();
            /// day4 food 1 allergens
            $scope.day4allergens1.$save();
            /// day4 food 2
            $scope.day4food2.$save();
            /// day4 food 2 allergens
            $scope.day4allergens2.$save();
            /// day4 food 3
            $scope.day4food3.$save();
            /// day4 food 3 allergens
            $scope.day4allergens3.$save();


            /// day 5 date
            $scope.day5Date.$save();
            /// day5 food 1
            $scope.day5food1.$save();
            /// day5 food 1 allergens
            $scope.day5allergens1.$save();
            /// day5 food 2
            $scope.day5food2.$save();
            /// day5 food 2 allergens
            $scope.day5allergens2.$save();
            /// day5 food 3
            $scope.day5food3.$save();
            /// day5 food 3 allergens
            $scope.day5allergens3.$save();



            /// Restauracia TIMES
            /// Monday
            $scope.restMonTimeFrom.$save();
            $scope.restMonTimeTo.$save();
            /// tuesday
            $scope.restTueTimeFrom.$save();
            $scope.restTueTimeTo.$save();
            /// Wednesday
            $scope.restWedTimeFrom.$save();
            $scope.restWedTimeTo.$save();
            /// Thursday
            $scope.restThuTimeFrom.$save();
            $scope.restThuTimeTo.$save();
            /// Friday
            $scope.restFriTimeFrom.$save();
            $scope.restFriTimeTo.$save();
            /// Saturday
            $scope.restSatTimeFrom.$save();
            $scope.restSatTimeTo.$save();
            /// Sunday
            $scope.restSunTimeFrom.$save();
            $scope.restSunTimeTo.$save();



            /// Kúpele TIMES
            /// Monday
            $scope.spaMonTimeFrom.$save();
            $scope.spaMonTimeTo.$save();
            /// tuesday
            $scope.spaTueTimeFrom.$save();
            $scope.spaTueTimeTo.$save();
            /// Wednesday
            $scope.spaWedTimeFrom.$save();
            $scope.spaWedTimeTo.$save();
            /// Thursday
            $scope.spaThuTimeFrom.$save();
            $scope.spaThuTimeTo.$save();
            /// Friday
            $scope.spaFriTimeFrom.$save();
            $scope.spaFriTimeTo.$save();
            /// Saturday
            $scope.spaSatTimeFrom.$save();
            $scope.spaSatTimeTo.$save();
            /// Sunday
            $scope.spaSunTimeFrom.$save();
            $scope.spaSunTimeTo.$save();


            /// Kúpele TERMINY
            $scope.spaTime1.$save();
            $scope.spaTime2.$save();
            $scope.spaTime3.$save();
            $scope.spaTime4.$save();
            $scope.spaTime5.$save();
            $scope.spaTime6.$save();
            $scope.spaTime7.$save();


            /// PENSION TIMES
            /// OD
            $scope.pensionTimeFrom.$save();
            /// Do
            $scope.pensionTimeTo.$save();
            /// Checkin
            $scope.pensionCheckIn.$save();
            /// checkout
            $scope.pensionCheckOut.$save();


            /// PENSION Prices
            /// OD
            $scope.pensionPrice1.$save();
            $scope.pensionPrice2.$save();
            $scope.pensionPrice3.$save();
            $scope.pensionPrice4.$save();

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



    }]);

