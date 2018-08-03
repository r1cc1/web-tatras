'use strict';
angular.module('mainCtrl', [])
    .controller('mainCtrl', ['$scope', '$location', '$rootScope', '$translate', '$firebaseArray', '$firebaseObject','$anchorScroll', '$timeout',
        function ($scope, $location, $rootScope, $translate, $firebaseArray, $firebaseObject, $anchorScroll, $timeout) {

            console.log('MainCtrl init');

            // Submenu State init
            $scope.subeMenuState = false;

            // detect Language
            var getLang = navigator.language || navigator.userLanguage;
            var langLoad = getLang.toLowerCase();
            //console.log('Browser Language detected = ' + langLoad);

            // set Language
            if (langLoad == 'sk' || langLoad == 'sk-sk' || langLoad == 'cz' || langLoad == 'cs-cz' || langLoad == 'cs') {
                $translate.use('sk');
                $rootScope.language = 'sk';
                //console.log('mainCtrl - Language set = ' + $rootScope.language);
            }
            else {
                $translate.use('en');
                $rootScope.language = 'en';
                //console.log('mainCtrl - Language set = ' + $rootScope.language);
            }

            $rootScope.changeLanguage = function (lang) {
                //console.log('langSelected = ' + lang);
                $translate.use(lang);
                $rootScope.language = lang;
            };

            $rootScope.scrollTo = function (id) {

                var scrollit = function() {
                    var old = $location.hash();
                    $location.hash(id);
                    $anchorScroll(id);
                    //reset to old to keep any additional routing logic from kicking in
                    $location.hash(old);

                };
                $timeout(scrollit, 500);
            };

            $rootScope.scrollToTop = function () {

                var scrollit = function() {
                    window.scrollTo(0, 0);
                };
                $timeout(scrollit, 500);
            };


            $scope.getClass = function (path) {
                return ($location.path().substr(0, path.length) === path) ? 'active' : '';
            };

            function getWindowHeight() {
                var viewportheight;
                if (typeof window.innerWidth != 'undefined') {
                    viewportheight = window.innerHeight
                }
                else if (typeof document.documentElement != 'undefined'
                    && typeof document.documentElement.clientWidth !=
                    'undefined' && document.documentElement.clientWidth != 0) {
                    viewportheight = document.documentElement.clientHeight
                }
                else {
                    viewportheight = document.getElementsByTagName('body')[0].clientHeight
                }
                $scope.displayHeight = viewportheight;
                $scope.scrollHeight = (viewportheight - 50);
                $scope.teaserHeight = viewportheight / 2;
            }

            function onScroll() {
                var scroll = $(window).scrollTop();
                //console.log("scroll: " + scroll);
                if (scroll >= $scope.scrollHeight) {
                    $scope.subMenuState = true;
                    $scope.$apply();
                }
                else {
                    $scope.subMenuState = false;
                    $scope.$apply()
                }
            }

            $rootScope.getCurrentDay = function () {
                var dateObj = new Date();
                var weekday = new Array(7);
                weekday[0] = "sunday";
                weekday[1] = "monday";
                weekday[2] = "tuesday";
                weekday[3] = "wednesday";
                weekday[4] = "thursday";
                weekday[5] = "friday";
                weekday[6] = "saturday";
                var n = weekday[dateObj.getDay()];

                $rootScope.todayName = n;
                //console.log('Todays Name is :' + $rootScope.todayName);

                $rootScope.currentDay = $rootScope.todayName;

                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();

                var today = day + "." + month + "." + year;
                $rootScope.today = today;
                //console.log('Todays DATE is :' + today);
            };


            $(window).scroll(function () {
                onScroll();
            });


            angular.element(document).ready(function () {
                getWindowHeight();
                $rootScope.getCurrentDay();

                $rootScope.config = {
                    apiKey: "AIzaSyDn-C5v-if7rnYBp4tYHpA4Zvuu6HAId5w",
                    authDomain: "tatras-d2f55.firebaseapp.com",
                    databaseURL: "https://tatras-d2f55.firebaseio.com",
                    projectId: "tatras-d2f55",
                    storageBucket: "tatras-d2f55.appspot.com",
                    messagingSenderId: "679876825482"
                };


                firebase.initializeApp($rootScope.config);
                var rootRef = firebase.database().ref();

                $scope.test = $firebaseArray(rootRef);
                //console.log($scope.test);

                $scope.dailyMenuList = $firebaseArray(rootRef.child('week'));
                //console.log($scope.dailyMenuList);

                $scope.parkingPrice = $firebaseObject(rootRef.child('parkingPrice'));

                $scope.dailyMenuPrice1 = $firebaseObject(rootRef.child('dailyMenuPrice1'));
                $scope.dailyMenuPrice2 = $firebaseObject(rootRef.child('dailyMenuPrice2'));
                $scope.dailyMenuPrice3 = $firebaseObject(rootRef.child('dailyMenuPrice3'));

                $scope.dailyMenuWeight1 = $firebaseObject(rootRef.child('weight1'));
                $scope.dailyMenuWeight2 = $firebaseObject(rootRef.child('weight2'));
                $scope.dailyMenuWeight3 = $firebaseObject(rootRef.child('weight3'));

                $scope.day1Name = $firebaseObject(rootRef.child('day1Name'));
                $scope.day2Name = $firebaseObject(rootRef.child('day2Name'));
                $scope.day3Name = $firebaseObject(rootRef.child('day3Name'));
                $scope.day4Name = $firebaseObject(rootRef.child('day4Name'));
                $scope.day5Name = $firebaseObject(rootRef.child('day5Name'));

                $scope.day1Date = $firebaseObject(rootRef.child('day1Date'));
                $scope.day2Date = $firebaseObject(rootRef.child('day2Date'));
                $scope.day3Date = $firebaseObject(rootRef.child('day3Date'));
                $scope.day4Date = $firebaseObject(rootRef.child('day4Date'));
                $scope.day5Date = $firebaseObject(rootRef.child('day5Date'));

                $scope.day1food1 = $firebaseObject(rootRef.child('day1food1'));
                $scope.day2food1 = $firebaseObject(rootRef.child('day2food1'));
                $scope.day3food1 = $firebaseObject(rootRef.child('day3food1'));
                $scope.day4food1 = $firebaseObject(rootRef.child('day4food1'));
                $scope.day5food1 = $firebaseObject(rootRef.child('day5food1'));

                $scope.day1food2 = $firebaseObject(rootRef.child('day1food2'));
                $scope.day2food2 = $firebaseObject(rootRef.child('day2food2'));
                $scope.day3food2 = $firebaseObject(rootRef.child('day3food2'));
                $scope.day4food2 = $firebaseObject(rootRef.child('day4food2'));
                $scope.day5food2 = $firebaseObject(rootRef.child('day5food2'));

                $scope.day1food3 = $firebaseObject(rootRef.child('day1food3'));
                $scope.day2food3 = $firebaseObject(rootRef.child('day2food3'));
                $scope.day3food3 = $firebaseObject(rootRef.child('day3food3'));
                $scope.day4food3 = $firebaseObject(rootRef.child('day4food3'));
                $scope.day5food3 = $firebaseObject(rootRef.child('day5food3'));

                $scope.day1allergens1 = $firebaseObject(rootRef.child('day1allergens1'));
                $scope.day1allergens2 = $firebaseObject(rootRef.child('day1allergens2'));
                $scope.day1allergens3 = $firebaseObject(rootRef.child('day1allergens3'));

                $scope.day2allergens1 = $firebaseObject(rootRef.child('day2allergens1'));
                $scope.day2allergens2 = $firebaseObject(rootRef.child('day2allergens2'));
                $scope.day2allergens3 = $firebaseObject(rootRef.child('day2allergens3'));

                $scope.day3allergens1 = $firebaseObject(rootRef.child('day3allergens1'));
                $scope.day3allergens2 = $firebaseObject(rootRef.child('day3allergens2'));
                $scope.day3allergens3 = $firebaseObject(rootRef.child('day3allergens3'));

                $scope.day4allergens1 = $firebaseObject(rootRef.child('day4allergens1'));
                $scope.day4allergens2 = $firebaseObject(rootRef.child('day4allergens2'));
                $scope.day4allergens3 = $firebaseObject(rootRef.child('day4allergens3'));

                $scope.day5allergens1 = $firebaseObject(rootRef.child('day5allergens1'));
                $scope.day5allergens2 = $firebaseObject(rootRef.child('day5allergens2'));
                $scope.day5allergens3 = $firebaseObject(rootRef.child('day5allergens3'));


                $scope.restMonTimeFrom = $firebaseObject(rootRef.child('restMonTimeFrom'));
                $scope.restMonTimeTo = $firebaseObject(rootRef.child('restMonTimeTo'));
                $scope.restTueTimeFrom = $firebaseObject(rootRef.child('restTueTimeFrom'));
                $scope.restTueTimeTo = $firebaseObject(rootRef.child('restTueTimeTo'));
                $scope.restWedTimeFrom = $firebaseObject(rootRef.child('restWedTimeFrom'));
                $scope.restWedTimeTo = $firebaseObject(rootRef.child('restWedTimeTo'));
                $scope.restThuTimeFrom = $firebaseObject(rootRef.child('restThuTimeFrom'));
                $scope.restThuTimeTo = $firebaseObject(rootRef.child('restThuTimeTo'));
                $scope.restFriTimeFrom = $firebaseObject(rootRef.child('restFriTimeFrom'));
                $scope.restFriTimeTo = $firebaseObject(rootRef.child('restFriTimeTo'));
                $scope.restSatTimeFrom = $firebaseObject(rootRef.child('restSatTimeFrom'));
                $scope.restSatTimeTo = $firebaseObject(rootRef.child('restSatTimeTo'));
                $scope.restSunTimeFrom = $firebaseObject(rootRef.child('restSunTimeFrom'));
                $scope.restSunTimeTo = $firebaseObject(rootRef.child('restSunTimeTo'));


                $scope.spaMonTimeFrom = $firebaseObject(rootRef.child('spaMonTimeFrom'));
                $scope.spaMonTimeTo = $firebaseObject(rootRef.child('spaMonTimeTo'));
                $scope.spaTueTimeFrom = $firebaseObject(rootRef.child('spaTueTimeFrom'));
                $scope.spaTueTimeTo = $firebaseObject(rootRef.child('spaTueTimeTo'));
                $scope.spaWedTimeFrom = $firebaseObject(rootRef.child('spaWedTimeFrom'));
                $scope.spaWedTimeTo = $firebaseObject(rootRef.child('spaWedTimeTo'));
                $scope.spaThuTimeFrom = $firebaseObject(rootRef.child('spaThuTimeFrom'));
                $scope.spaThuTimeTo = $firebaseObject(rootRef.child('spaThuTimeTo'));
                $scope.spaFriTimeFrom = $firebaseObject(rootRef.child('spaFriTimeFrom'));
                $scope.spaFriTimeTo = $firebaseObject(rootRef.child('spaFriTimeTo'));
                $scope.spaSatTimeFrom = $firebaseObject(rootRef.child('spaSatTimeFrom'));
                $scope.spaSatTimeTo = $firebaseObject(rootRef.child('spaSatTimeTo'));
                $scope.spaSunTimeFrom = $firebaseObject(rootRef.child('spaSunTimeFrom'));
                $scope.spaSunTimeTo = $firebaseObject(rootRef.child('spaSunTimeTo'));

                $scope.shopMonTimeFrom = $firebaseObject(rootRef.child('shopMonTimeFrom'));
                $scope.shopMonTimeTo = $firebaseObject(rootRef.child('shopMonTimeTo'));
                $scope.shopTueTimeFrom = $firebaseObject(rootRef.child('shopTueTimeFrom'));
                $scope.shopTueTimeTo = $firebaseObject(rootRef.child('shopTueTimeTo'));
                $scope.shopWedTimeFrom = $firebaseObject(rootRef.child('shopWedTimeFrom'));
                $scope.shopWedTimeTo = $firebaseObject(rootRef.child('shopWedTimeTo'));
                $scope.shopThuTimeFrom = $firebaseObject(rootRef.child('shopThuTimeFrom'));
                $scope.shopThuTimeTo = $firebaseObject(rootRef.child('shopThuTimeTo'));
                $scope.shopFriTimeFrom = $firebaseObject(rootRef.child('shopFriTimeFrom'));
                $scope.shopFriTimeTo = $firebaseObject(rootRef.child('shopFriTimeTo'));
                $scope.shopSatTimeFrom = $firebaseObject(rootRef.child('shopSatTimeFrom'));
                $scope.shopSatTimeTo = $firebaseObject(rootRef.child('shopSatTimeTo'));
                $scope.shopSunTimeFrom = $firebaseObject(rootRef.child('shopSunTimeFrom'));
                $scope.shopSunTimeTo = $firebaseObject(rootRef.child('shopSunTimeTo'));


                $scope.pensionCheckIn = $firebaseObject(rootRef.child('pensionCheckIn'));
                $scope.pensionCheckOut = $firebaseObject(rootRef.child('pensionCheckOut'));
                $scope.pensionTimeFrom = $firebaseObject(rootRef.child('pensionTimeFrom'));
                $scope.pensionTimeTo = $firebaseObject(rootRef.child('pensionTimeTo'));

                $scope.pensionPrice1 = $firebaseObject(rootRef.child('pensionPrice1'));
                $scope.pensionPrice2 = $firebaseObject(rootRef.child('pensionPrice2'));
                $scope.pensionPrice3 = $firebaseObject(rootRef.child('pensionPrice3'));
                $scope.pensionPrice4 = $firebaseObject(rootRef.child('pensionPrice4'));
                $scope.pensionPrice5 = $firebaseObject(rootRef.child('pensionPrice5'));
                $scope.pensionPrice6 = $firebaseObject(rootRef.child('pensionPrice6'));
                $scope.pensionPrice7 = $firebaseObject(rootRef.child('pensionPrice7'));
                $scope.pensionPrice8 = $firebaseObject(rootRef.child('pensionPrice8'));


                $scope.spaPrice1 = $firebaseObject(rootRef.child('spaPrice1'));
                $scope.spaPrice2 = $firebaseObject(rootRef.child('spaPrice2'));
                $scope.spaPrice3 = $firebaseObject(rootRef.child('spaPrice3'));
                $scope.spaPrice4 = $firebaseObject(rootRef.child('spaPrice4'));
                $scope.spaPrice5 = $firebaseObject(rootRef.child('spaPrice5'));
                $scope.spaPrice6 = $firebaseObject(rootRef.child('spaPrice6'));
                $scope.spaPrice7 = $firebaseObject(rootRef.child('spaPrice7'));
                $scope.spaPrice8 = $firebaseObject(rootRef.child('spaPrice8'));
                $scope.spaPrice9 = $firebaseObject(rootRef.child('spaPrice9'));
                $scope.spaPrice10 = $firebaseObject(rootRef.child('spaPrice10'));
                $scope.spaPrice11 = $firebaseObject(rootRef.child('spaPrice11'));
                $scope.spaPrice12 = $firebaseObject(rootRef.child('spaPrice12'));
                $scope.spaPrice13 = $firebaseObject(rootRef.child('spaPrice13'));
                $scope.spaPrice14 = $firebaseObject(rootRef.child('spaPrice14'));

                $scope.saunaPrice1 = $firebaseObject(rootRef.child('saunaPrice1'));
                $scope.saunaPrice2 = $firebaseObject(rootRef.child('saunaPrice2'));
                $scope.saunaPrice3 = $firebaseObject(rootRef.child('saunaPrice3'));
                $scope.saunaPrice4 = $firebaseObject(rootRef.child('saunaPrice4'));
                $scope.saunaPrice5 = $firebaseObject(rootRef.child('saunaPrice5'));

                $scope.saunaPrice = $firebaseObject(rootRef.child('saunaPrice'));
                $scope.saunaTime = $firebaseObject(rootRef.child('saunaTime'));

                $scope.massage1Time1 = $firebaseObject(rootRef.child('massage1Time1'));
                $scope.massage1Time2 = $firebaseObject(rootRef.child('massage1Time2'));
                $scope.massage1Price1 = $firebaseObject(rootRef.child('massage1Price1'));
                $scope.massage1Price2 = $firebaseObject(rootRef.child('massage1Price2'));
                
                $scope.massage2Time1 = $firebaseObject(rootRef.child('massage2Time1'));
                $scope.massage2Time2 = $firebaseObject(rootRef.child('massage2Time2'));
                $scope.massage2Price1 = $firebaseObject(rootRef.child('massage2Price1'));
                $scope.massage2Price2 = $firebaseObject(rootRef.child('massage2Price2'));
                
                $scope.massage3Time1 = $firebaseObject(rootRef.child('massage3Time1'));
                $scope.massage3Time2 = $firebaseObject(rootRef.child('massage3Time2'));
                $scope.massage3Price1 = $firebaseObject(rootRef.child('massage3Price1'));
                $scope.massage3Price2 = $firebaseObject(rootRef.child('massage3Price2'));
                
                $scope.massage4Time1 = $firebaseObject(rootRef.child('massage4Time1'));
                $scope.massage4Time2 = $firebaseObject(rootRef.child('massage4Time2'));
                $scope.massage4Price1 = $firebaseObject(rootRef.child('massage4Price1'));
                $scope.massage4Price2 = $firebaseObject(rootRef.child('massage4Price2'));
                
                $scope.massage5Time1 = $firebaseObject(rootRef.child('massage5Time1'));
                $scope.massage5Time2 = $firebaseObject(rootRef.child('massage5Time2'));
                $scope.massage5Price1 = $firebaseObject(rootRef.child('massage5Price1'));
                $scope.massage5Price2 = $firebaseObject(rootRef.child('massage5Price2'));
                
                $scope.massage6Time1 = $firebaseObject(rootRef.child('massage6Time1'));
                $scope.massage6Time2 = $firebaseObject(rootRef.child('massage6Time2'));
                $scope.massage6Price1 = $firebaseObject(rootRef.child('massage6Price1'));
                $scope.massage6Price2 = $firebaseObject(rootRef.child('massage6Price2'));
                
                

                $scope.spaTime1 = $firebaseObject(rootRef.child('spaTime1'));
                $scope.spaTime2 = $firebaseObject(rootRef.child('spaTime2'));
                $scope.spaTime3 = $firebaseObject(rootRef.child('spaTime3'));
                $scope.spaTime4 = $firebaseObject(rootRef.child('spaTime4'));
                $scope.spaTime5 = $firebaseObject(rootRef.child('spaTime5'));
                $scope.spaTime6 = $firebaseObject(rootRef.child('spaTime6'));
                $scope.spaTime7 = $firebaseObject(rootRef.child('spaTime7'));


                $scope.beer1active = $firebaseObject(rootRef.child('beer1active'));
                $scope.beer1new = $firebaseObject(rootRef.child('beer1new'));
                $scope.beer1name = $firebaseObject(rootRef.child('beer1name'));
                $scope.beer1subtitle = $firebaseObject(rootRef.child('beer1subtitle'));
                $scope.beer1text = $firebaseObject(rootRef.child('beer1text'));
                $scope.beer1slady = $firebaseObject(rootRef.child('beer1slady'));
                $scope.beer1chmele = $firebaseObject(rootRef.child('beer1chmele'));
                $scope.beer1extrakt = $firebaseObject(rootRef.child('beer1extrakt'));
                $scope.beer1alkohol = $firebaseObject(rootRef.child('beer1alkohol'));
                $scope.beer1ibu = $firebaseObject(rootRef.child('beer1ibu'));

                $scope.beer2active = $firebaseObject(rootRef.child('beer2active'));
                $scope.beer2new = $firebaseObject(rootRef.child('beer2new'));
                $scope.beer2name = $firebaseObject(rootRef.child('beer2name'));
                $scope.beer2subtitle = $firebaseObject(rootRef.child('beer2subtitle'));
                $scope.beer2text = $firebaseObject(rootRef.child('beer2text'));
                $scope.beer2slady = $firebaseObject(rootRef.child('beer2slady'));
                $scope.beer2chmele = $firebaseObject(rootRef.child('beer2chmele'));
                $scope.beer2extrakt = $firebaseObject(rootRef.child('beer2extrakt'));
                $scope.beer2alkohol = $firebaseObject(rootRef.child('beer2alkohol'));
                $scope.beer2ibu = $firebaseObject(rootRef.child('beer2ibu'));

                $scope.beer3active = $firebaseObject(rootRef.child('beer3active'));
                $scope.beer3new = $firebaseObject(rootRef.child('beer3new'));
                $scope.beer3name = $firebaseObject(rootRef.child('beer3name'));
                $scope.beer3subtitle = $firebaseObject(rootRef.child('beer3subtitle'));
                $scope.beer3text = $firebaseObject(rootRef.child('beer3text'));
                $scope.beer3slady = $firebaseObject(rootRef.child('beer3slady'));
                $scope.beer3chmele = $firebaseObject(rootRef.child('beer3chmele'));
                $scope.beer3extrakt = $firebaseObject(rootRef.child('beer3extrakt'));
                $scope.beer3alkohol = $firebaseObject(rootRef.child('beer3alkohol'));
                $scope.beer3ibu = $firebaseObject(rootRef.child('beer3ibu'));

                $scope.beer4active = $firebaseObject(rootRef.child('beer4active'));
                $scope.beer4new = $firebaseObject(rootRef.child('beer4new'));
                $scope.beer4name = $firebaseObject(rootRef.child('beer4name'));
                $scope.beer4subtitle = $firebaseObject(rootRef.child('beer4subtitle'));
                $scope.beer4text = $firebaseObject(rootRef.child('beer4text'));
                $scope.beer4slady = $firebaseObject(rootRef.child('beer4slady'));
                $scope.beer4chmele = $firebaseObject(rootRef.child('beer4chmele'));
                $scope.beer4extrakt = $firebaseObject(rootRef.child('beer4extrakt'));
                $scope.beer4alkohol = $firebaseObject(rootRef.child('beer4alkohol'));
                $scope.beer4ibu = $firebaseObject(rootRef.child('beer4ibu'));

                $scope.beer5active = $firebaseObject(rootRef.child('beer5active'));
                $scope.beer5new = $firebaseObject(rootRef.child('beer5new'));
                $scope.beer5name = $firebaseObject(rootRef.child('beer5name'));
                $scope.beer5subtitle = $firebaseObject(rootRef.child('beer5subtitle'));
                $scope.beer5text = $firebaseObject(rootRef.child('beer5text'));
                $scope.beer5slady = $firebaseObject(rootRef.child('beer5slady'));
                $scope.beer5chmele = $firebaseObject(rootRef.child('beer5chmele'));
                $scope.beer5extrakt = $firebaseObject(rootRef.child('beer5extrakt'));
                $scope.beer5alkohol = $firebaseObject(rootRef.child('beer5alkohol'));
                $scope.beer5ibu = $firebaseObject(rootRef.child('beer5ibu'));

                $scope.beer6active = $firebaseObject(rootRef.child('beer6active'));
                $scope.beer6new = $firebaseObject(rootRef.child('beer6new'));
                $scope.beer6name = $firebaseObject(rootRef.child('beer6name'));
                $scope.beer6subtitle = $firebaseObject(rootRef.child('beer6subtitle'));
                $scope.beer6text = $firebaseObject(rootRef.child('beer6text'));
                $scope.beer6slady = $firebaseObject(rootRef.child('beer6slady'));
                $scope.beer6chmele = $firebaseObject(rootRef.child('beer6chmele'));
                $scope.beer6extrakt = $firebaseObject(rootRef.child('beer6extrakt'));
                $scope.beer6alkohol = $firebaseObject(rootRef.child('beer6alkohol'));
                $scope.beer6ibu = $firebaseObject(rootRef.child('beer6ibu'));

                $scope.beer7active = $firebaseObject(rootRef.child('beer7active'));
                $scope.beer7new = $firebaseObject(rootRef.child('beer7new'));
                $scope.beer7name = $firebaseObject(rootRef.child('beer7name'));
                $scope.beer7subtitle = $firebaseObject(rootRef.child('beer7subtitle'));
                $scope.beer7text = $firebaseObject(rootRef.child('beer7text'));
                $scope.beer7slady = $firebaseObject(rootRef.child('beer7slady'));
                $scope.beer7chmele = $firebaseObject(rootRef.child('beer7chmele'));
                $scope.beer7extrakt = $firebaseObject(rootRef.child('beer7extrakt'));
                $scope.beer7alkohol = $firebaseObject(rootRef.child('beer7alkohol'));
                $scope.beer7ibu = $firebaseObject(rootRef.child('beer7ibu'));

                $scope.beer8active = $firebaseObject(rootRef.child('beer8active'));
                $scope.beer8new = $firebaseObject(rootRef.child('beer8new'));
                $scope.beer8name = $firebaseObject(rootRef.child('beer8name'));
                $scope.beer8subtitle = $firebaseObject(rootRef.child('beer8subtitle'));
                $scope.beer8text = $firebaseObject(rootRef.child('beer8text'));
                $scope.beer8slady = $firebaseObject(rootRef.child('beer8slady'));
                $scope.beer8chmele = $firebaseObject(rootRef.child('beer8chmele'));
                $scope.beer8extrakt = $firebaseObject(rootRef.child('beer8extrakt'));
                $scope.beer8alkohol = $firebaseObject(rootRef.child('beer8alkohol'));
                $scope.beer8ibu = $firebaseObject(rootRef.child('beer8ibu'));

                $scope.beer9active = $firebaseObject(rootRef.child('beer9active'));
                $scope.beer9new = $firebaseObject(rootRef.child('beer9new'));
                $scope.beer9name = $firebaseObject(rootRef.child('beer9name'));
                $scope.beer9subtitle = $firebaseObject(rootRef.child('beer9subtitle'));
                $scope.beer9text = $firebaseObject(rootRef.child('beer9text'));
                $scope.beer9slady = $firebaseObject(rootRef.child('beer9slady'));
                $scope.beer9chmele = $firebaseObject(rootRef.child('beer9chmele'));
                $scope.beer9extrakt = $firebaseObject(rootRef.child('beer9extrakt'));
                $scope.beer9alkohol = $firebaseObject(rootRef.child('beer9alkohol'));
                $scope.beer9ibu = $firebaseObject(rootRef.child('beer9ibu'));

                $scope.beer10active = $firebaseObject(rootRef.child('beer10active'));
                $scope.beer10new = $firebaseObject(rootRef.child('beer10new'));
                $scope.beer10name = $firebaseObject(rootRef.child('beer10name'));
                $scope.beer10subtitle = $firebaseObject(rootRef.child('beer10subtitle'));
                $scope.beer10text = $firebaseObject(rootRef.child('beer10text'));
                $scope.beer10slady = $firebaseObject(rootRef.child('beer10slady'));
                $scope.beer10chmele = $firebaseObject(rootRef.child('beer10chmele'));
                $scope.beer10extrakt = $firebaseObject(rootRef.child('beer10extrakt'));
                $scope.beer10alkohol = $firebaseObject(rootRef.child('beer10alkohol'));
                $scope.beer10ibu = $firebaseObject(rootRef.child('beer10ibu'));

                $scope.beer11active = $firebaseObject(rootRef.child('beer11active'));
                $scope.beer11new = $firebaseObject(rootRef.child('beer11new'));
                $scope.beer11name = $firebaseObject(rootRef.child('beer11name'));
                $scope.beer11subtitle = $firebaseObject(rootRef.child('beer11subtitle'));
                $scope.beer11text = $firebaseObject(rootRef.child('beer11text'));
                $scope.beer11slady = $firebaseObject(rootRef.child('beer11slady'));
                $scope.beer11chmele = $firebaseObject(rootRef.child('beer11chmele'));
                $scope.beer11extrakt = $firebaseObject(rootRef.child('beer11extrakt'));
                $scope.beer11alkohol = $firebaseObject(rootRef.child('beer11alkohol'));
                $scope.beer11ibu = $firebaseObject(rootRef.child('beer11ibu'));

                $scope.beer12active = $firebaseObject(rootRef.child('beer12active'));
                $scope.beer12new = $firebaseObject(rootRef.child('beer12new'));
                $scope.beer12name = $firebaseObject(rootRef.child('beer12name'));
                $scope.beer12subtitle = $firebaseObject(rootRef.child('beer12subtitle'));
                $scope.beer12text = $firebaseObject(rootRef.child('beer12text'));
                $scope.beer12slady = $firebaseObject(rootRef.child('beer12slady'));
                $scope.beer12chmele = $firebaseObject(rootRef.child('beer12chmele'));
                $scope.beer12extrakt = $firebaseObject(rootRef.child('beer12extrakt'));
                $scope.beer12alkohol = $firebaseObject(rootRef.child('beer12alkohol'));
                $scope.beer12ibu = $firebaseObject(rootRef.child('beer12ibu'));

                $scope.loginUser = $firebaseObject(rootRef.child('loginUser'));
                $scope.loginPass = $firebaseObject(rootRef.child('loginPass'));
            });
            

            window.addEventListener('resize', function () {
                getWindowHeight();
            });

            $scope.mobileMenu = function () {
                $rootScope.openMobileMenu = !$rootScope.openMobileMenu;
                console.log('$rootScope.openMobileMenu= ' + $rootScope.openMobileMenu);
            };

            $scope.closeMenu = function () {
                $rootScope.openMobileMenu = false;
            };

            var $stopPropagation = $('a');

            function clickHandler(event) {
                $(this).toggleClass('distinctive');
                if ($stopPropagation.is(':checked'))
                    event.stopPropagation();

                console.log('yeah');
            }

            $('.left').on('click', clickHandler);


        }]);

