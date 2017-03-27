'use strict';

angular.module('myApp', [
    'ngRoute',
    'duScroll',
    'ngMdIcons',
    '720kb.datepicker'

])
    .value('duScrollDuration', 1000)
    .value('duScrollOffset', 0)

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    //$locationProvider.hashPrefix('#');

    $routeProvider.when('/', {
        controller: 'mainCtrl'
    });

    $routeProvider.when('/svk', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/eng', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    });

    $routeProvider.when('/pension/svk', {
        templateUrl: 'templates/pension.html',
        controller: 'pensionCtrl'
    });
    $routeProvider.when('/pension/eng', {
        templateUrl: 'templates/pension.html',
        controller: 'pensionCtrl'
    });

    $routeProvider.when('/restaurant/svk', {
        templateUrl: 'templates/restaurant.html',
        controller: 'restaurantCtrl'
    });
    $routeProvider.when('/restaurant/eng', {
        templateUrl: 'templates/restaurant.html',
        controller: 'restaurantCtrl'
    });

    $routeProvider.when('/spa/svk', {
        templateUrl: 'templates/spa.html',
        controller: 'spaCrl'
    });
    $routeProvider.when('/spa/eng', {
        templateUrl: 'templates/spa.html',
        controller: 'spaCrl'
    });


    $routeProvider.otherwise({redirectTo: '/svk'});

}])
    .controller('mainCtrl', ['$scope','$location', function ($scope, $location) {
        console.log('init');

        // Submenu State init
        $scope.subeMenuState = false;
        // set Language
        $scope.lang = 'svk';

        $scope.english = function () {
            $scope.lang = 'eng';
            console.log('$scope.lang ' + $scope.lang);
        };
        $scope.slovak = function () {
            $scope.lang = 'svk';
            console.log('$scope.lang ' + $scope.lang);
        };


        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        };



        /// get day name and highlight the day
        function myFunction() {
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var n = weekday[d.getDay()];
            $('.' + n).addClass('active-day');

            $scope.currentDay = n;
            console.log($scope.currentDay);
        }

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
        }

        function onScroll() {
            var scroll = $(window).scrollTop();
            //console.log("scroll: " + scroll);
            if(scroll >= $scope.displayHeight) {
                $scope.subMenuState = true;
                $scope.$apply();
            } else {
                $scope.subMenuState = false;
                $scope.$apply()
            }
        }

        $(window).scroll(function () {
            onScroll();
        });

        $(document).ready(function () {
            getWindowHeight();
            myFunction();
        });

        window.addEventListener('resize', function (event) {
            getWindowHeight();
        });


    }])
    .controller('homeCtrl', ['$scope','$http', function ($scope, $http) {

        // TEXTS
        $scope.btnBookSvk = 'Zavolaj Nam';
        $scope.btnBookEng = 'Call Us';
        $scope.btnIcon = 'call';

        $scope.btnBookTableSvk = 'Rezervovat Stol';
        $scope.btnBookTableEng = 'Book Table';

        $scope.btnBookRoomSvk = 'Rezervovat Izbu';
        $scope.btnBookRoomEng = 'Book Room';

        $scope.btnBookSpaSvk = 'Rezervovat SPA';
        $scope.btnBookSpaEng = 'Book SPA';




        $http.get('../components/assets/texts/text-svk.json')
            .success(function(data) {
                $scope.texts = data;
            })
            .error(function(data) {
                // log error
                console.log(error);
            });



        var map = jQuery('.map');
        var mapFrame = jQuery('.map iframe');

        map.click(function () {
            mapFrame.css("pointer-events", "auto");
        });

        map.mouseleave(function () {
            mapFrame.css("pointer-events", "none");
        });

    }])
    .controller('restaurantCtrl', ['$scope', '$window', function ($scope, $window) {

        // first scroll to top
        $window.scrollTo(0, 0);
        $scope.btnBookSvk = 'Rezervovat Stol';
        $scope.btnBookEng = 'Book a Table';
        $scope.btnIcon = 'local_restaurant';

        $scope.btnBookTableSvk = 'Rezervovat Stol';
        $scope.btnBookTableEng = 'Book Table';


        /// get day name and highlight the day
        function myFunction() {
            var d = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var n = weekday[d.getDay()];
            $('.' + n).addClass('active-day');

            $scope.currentDay = n;
            console.log($scope.currentDay);
        }

    }])
    .controller('pensionCtrl', ['$scope', '$window', function ($scope, $window) {

        // first scroll to top
        $window.scrollTo(0, 0);

        $scope.btnBookSvk = 'Rezervovat Izbu';
        $scope.btnBookEng = 'Book a Room';
        $scope.btnIcon = 'hotel';

        $scope.btnBookRoomSvk = $scope.btnBookSvk;
        $scope.btnBookRoomEng = $scope.btnBookEng;

    }])

    .controller('spaCrl', ['$scope', '$window', function ($scope, $window) {

        // first scroll to top
        $window.scrollTo(0, 0);

        $scope.btnBookSvk = 'Rezervovat SPA';
        $scope.btnBookEng = 'Book a SPA';
        $scope.btnIcon = 'spa';

        $scope.btnBookSpaSvk = $scope.btnBookSvk;
        $scope.btnBookSpaEng = $scope.btnBookEng;

    }]);
