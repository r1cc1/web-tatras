'use strict';
angular.module('mainCtrl', [])
    .controller('mainCtrl', ['$scope', '$location', '$document', '$rootScope', '$translate', '$firebaseArray', '$firebaseObject','$anchorScroll', '$timeout',
        function ($scope, $location, $document, $rootScope, $translate, $firebaseArray, $firebaseObject, $anchorScroll, $timeout) {

            console.log('MainCtrl init');

            // Submenu State init
            $scope.subeMenuState = false;

            // detect Language
            var getLang = navigator.language || navigator.userLanguage;
            var langLoad = getLang.toLowerCase();
            console.log('Browser Language detected = ' + langLoad);

            // set Language
            if (langLoad == 'sk' || langLoad == 'sk-sk' || langLoad == 'cz' || langLoad == 'cs-cz') {
                $translate.use('sk');
                $rootScope.language = 'sk';
                console.log('mainCtrl - Language set = ' + $rootScope.language);
            }
            else {
                $translate.use('sk');
                $rootScope.language = 'sk';
                console.log('mainCtrl - Language set = ' + $rootScope.language);
            }
            // else {
            //     $translate.use('en');
            //     $rootScope.language = 'en';
            //     console.log('mainCtrl - Language set = ' + $rootScope.language);
            // }

            $rootScope.changeLanguage = function (lang) {
                console.log('langSelected = ' + lang);
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
                console.log('Todays Name is :' + $rootScope.todayName);

                $rootScope.currentDay = n;
                console.log('Current Day ->' + $rootScope.currentDay);

                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();

                var today = day + ". " + month + ". " + year;
                console.log('Todays DATE is :' + today);
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
                //
                // var firestore = firebase.firestore();
                // var slost = firestore.doc("slots/months");
                //
                // var myNovember = firestore.collection("slots").doc("months").collection("october");
                //
                //
                //
                // slost.get().then(function (doc) {
                //         if(doc && doc.exists) {
                //             const myData = doc.data();
                //             console.log(myData.october.s01102017);
                //
                //             $scope.october =  myData.october.s01102017;
                //         }
                //
                //     }).catch (function (error) {
                //         console.log('Got an ERROR: ' + error);
                //     });
                



                var rootRef = firebase.database().ref();

                $scope.test = $firebaseArray(rootRef);
                console.log($scope.test);

                $scope.dailyMenuList = $firebaseArray(rootRef.child('week'));
                console.log($scope.dailyMenuList);

                $scope.dailyMenuPrice = $firebaseObject(rootRef.child('price'));

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


                $scope.pensionCheckIn = $firebaseObject(rootRef.child('pensionCheckIn'));
                $scope.pensionCheckOut = $firebaseObject(rootRef.child('pensionCheckOut'));
                $scope.pensionTimeFrom = $firebaseObject(rootRef.child('pensionTimeFrom'));
                $scope.pensionTimeTo = $firebaseObject(rootRef.child('pensionTimeTo'));

                $scope.pensionPrice1 = $firebaseObject(rootRef.child('pensionPrice1'));
                $scope.pensionPrice2 = $firebaseObject(rootRef.child('pensionPrice2'));
                $scope.pensionPrice3 = $firebaseObject(rootRef.child('pensionPrice3'));
                $scope.pensionPrice4 = $firebaseObject(rootRef.child('pensionPrice4'));


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

                $scope.massagePrice = $firebaseObject(rootRef.child('massagePrice'));

                $scope.spaTime1 = $firebaseObject(rootRef.child('spaTime1'));
                $scope.spaTime2 = $firebaseObject(rootRef.child('spaTime2'));
                $scope.spaTime3 = $firebaseObject(rootRef.child('spaTime3'));
                $scope.spaTime4 = $firebaseObject(rootRef.child('spaTime4'));
                $scope.spaTime5 = $firebaseObject(rootRef.child('spaTime5'));
                $scope.spaTime6 = $firebaseObject(rootRef.child('spaTime6'));
                $scope.spaTime7 = $firebaseObject(rootRef.child('spaTime7'));


                $scope.termin911 = $firebaseObject(rootRef.child('termin911'));

            });

            window.addEventListener('resize', function () {
                getWindowHeight();
            });

            $scope.$watch('lang', function () {

                if ($rootScope.lang === 'svk') {
                    console.log('Active Language ' + $rootScope.lang);

                    $rootScope.openHours = 'Otváracie Hodiny';
                    $scope.setDaysSvk();
                }
                if ($rootScope.lang === 'eng') {
                    console.log('Active Language ' + $rootScope.lang);

                    $rootScope.openHours = 'Open Hours';
                    $scope.setDaysEng();
                }
            });

            $scope.mobileMenu = function () {
                $rootScope.openMobileMenu = !$rootScope.openMobileMenu;
                console.log('$rootScope.openMobileMenu= ' + $rootScope.openMobileMenu);
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

