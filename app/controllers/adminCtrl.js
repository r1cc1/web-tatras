'use strict';
angular.module('adminCtrl', [])
    .controller('adminCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        console.log('adminCtrl init');

        $rootScope.getCurrentDay();

        // set Category
        $rootScope.category = 'admin';
        $rootScope.categoryName = 'Admin Center';

        $scope.adminLogin = false;
        $scope.adminCenter = true;

        $scope.adminUser = 'Admin';
        $scope.adminPass = 'info123Tatras';

        // TODO: Texty to Translate
        $scope.food1 = 'Polievka';
        $scope.food2 = 'Menu A';
        $scope.food3 = 'Menu B';
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

        // /// BEERS
        // $scope.beer1Activation = function() {
        //     console.log('beer1Activation init');
        //     $scope.beer1active = !$scope.beer1active;
        // };


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
            $scope.dailyMenuPrice1.$save();
            /// cena Denneho Menu
            $scope.dailyMenuPrice2.$save();

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

            /// Kúpele MASAZE
            $scope.massage1Time1.$save();
            $scope.massage1Time2.$save();
            $scope.massage1Price1.$save();
            $scope.massage1Price2.$save();
            
            $scope.massage2Time1.$save();
            $scope.massage2Time2.$save();
            $scope.massage2Price1.$save();
            $scope.massage2Price2.$save();
            
            $scope.massage3Time1.$save();
            $scope.massage3Time2.$save();
            $scope.massage3Price1.$save();
            $scope.massage3Price2.$save();
            
            $scope.massage4Time1.$save();
            $scope.massage4Time2.$save();
            $scope.massage4Price1.$save();
            $scope.massage4Price2.$save();
            
            $scope.massage5Time1.$save();
            $scope.massage5Time2.$save();
            $scope.massage5Price1.$save();
            $scope.massage5Price2.$save();
            
            $scope.massage6Time1.$save();
            $scope.massage6Time2.$save();
            $scope.massage6Price1.$save();
            $scope.massage6Price2.$save();

            /// SAUNA TIMES
            $scope.saunaPrice.$save();
            $scope.saunaTime.$save();

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


            $scope.beer1active.$save();
            console.log('$scope.beer1active = ' + $scope.beer1active.$value);
            $scope.beer1name.$save();
            $scope.beer1subtitle.$save();
            $scope.beer1text.$save();
            $scope.beer1slady.$save();
            $scope.beer1chmele.$save();
            $scope.beer1extrakt.$save();
            $scope.beer1alkohol.$save();
            $scope.beer1ibu.$save();

            $scope.beer2active.$save();
            $scope.beer2name.$save();
            $scope.beer2subtitle.$save();
            $scope.beer2text.$save();
            $scope.beer2slady.$save();
            $scope.beer2chmele.$save();
            $scope.beer2extrakt.$save();
            $scope.beer2alkohol.$save();
            $scope.beer2ibu.$save();

            $scope.beer3active.$save();
            $scope.beer3name.$save();
            $scope.beer3subtitle.$save();
            $scope.beer3text.$save();
            $scope.beer3slady.$save();
            $scope.beer3chmele.$save();
            $scope.beer3extrakt.$save();
            $scope.beer3alkohol.$save();
            $scope.beer3ibu.$save();

            $scope.beer4active.$save();
            $scope.beer4name.$save();
            $scope.beer4subtitle.$save();
            $scope.beer4text.$save();
            $scope.beer4slady.$save();
            $scope.beer4chmele.$save();
            $scope.beer4extrakt.$save();
            $scope.beer4alkohol.$save();
            $scope.beer4ibu.$save();

            $scope.beer5active.$save();
            $scope.beer5name.$save();
            $scope.beer5subtitle.$save();
            $scope.beer5text.$save();
            $scope.beer5slady.$save();
            $scope.beer5chmele.$save();
            $scope.beer5extrakt.$save();
            $scope.beer5alkohol.$save();
            $scope.beer5ibu.$save();

            $scope.beer6active.$save();
            $scope.beer6name.$save();
            $scope.beer6subtitle.$save();
            $scope.beer6text.$save();
            $scope.beer6slady.$save();
            $scope.beer6chmele.$save();
            $scope.beer6extrakt.$save();
            $scope.beer6alkohol.$save();
            $scope.beer6ibu.$save();

            $scope.beer7active.$save();
            $scope.beer7name.$save();
            $scope.beer7subtitle.$save();
            $scope.beer7text.$save();
            $scope.beer7slady.$save();
            $scope.beer7chmele.$save();
            $scope.beer7extrakt.$save();
            $scope.beer7alkohol.$save();
            $scope.beer7ibu.$save();

            $scope.beer8active.$save();
            $scope.beer8name.$save();
            $scope.beer8subtitle.$save();
            $scope.beer8text.$save();
            $scope.beer8slady.$save();
            $scope.beer8chmele.$save();
            $scope.beer8extrakt.$save();
            $scope.beer8alkohol.$save();
            $scope.beer8ibu.$save();

            $scope.beer9active.$save();
            $scope.beer9name.$save();
            $scope.beer9subtitle.$save();
            $scope.beer9text.$save();
            $scope.beer9slady.$save();
            $scope.beer9chmele.$save();
            $scope.beer9extrakt.$save();
            $scope.beer9alkohol.$save();
            $scope.beer9ibu.$save();

            $scope.beer10active.$save();
            $scope.beer10name.$save();
            $scope.beer10subtitle.$save();
            $scope.beer10text.$save();
            $scope.beer10slady.$save();
            $scope.beer10chmele.$save();
            $scope.beer10extrakt.$save();
            $scope.beer10alkohol.$save();
            $scope.beer10ibu.$save();

            $scope.beer11active.$save();
            $scope.beer11name.$save();
            $scope.beer11subtitle.$save();
            $scope.beer11text.$save();
            $scope.beer11slady.$save();
            $scope.beer11chmele.$save();
            $scope.beer11extrakt.$save();
            $scope.beer11alkohol.$save();
            $scope.beer11ibu.$save();

            $scope.beer12active.$save();
            $scope.beer12name.$save();
            $scope.beer12subtitle.$save();
            $scope.beer12text.$save();
            $scope.beer12slady.$save();
            $scope.beer12chmele.$save();
            $scope.beer12extrakt.$save();
            $scope.beer12alkohol.$save();
            $scope.beer12ibu.$save();
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

