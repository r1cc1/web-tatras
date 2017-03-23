'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    //$locationProvider.hashPrefix('#');

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


    .controller('langCtrl', [
        '$scope',
        function langCtrl($scope) {

            $scope.lang = 'svk';

            $scope.english = function () {
                $scope.lang = 'eng';
                console.log('$scope.lang ' + $scope.lang);
            };

            $scope.slovak = function () {
                $scope.lang = 'svk';
                console.log('$scope.lang ' + $scope.lang);
            };
        }
    ])

    .controller('homeCtrl', ['$scope','$http', function ($scope, $http) {

        $http.get('../components/assets/texts/text-svk.json')
            .success(function(data) {
                $scope.texts = data;

                console.log($scope.texts.home);

                $scope.bookingText = 'Call Us';
            })
            .error(function(data) {
                // log error
                console.log(error);
            });






        $('.scroll-down').click(function () {
            console.log('test');
            $("html, body").animate({scrollTop: $('#start').offset().top}, 1000);

            console.log($scope.lang);
        });

        var map = jQuery('.map');
        var mapFrame = jQuery('.map iframe');

        map.click(function () {
            mapFrame.css("pointer-events", "auto");
        });

        map.mouseleave(function () {
            mapFrame.css("pointer-events", "none");
        });

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
            //alert(n);
            $('.' + n).addClass('active-day');
        }

        myFunction();




        function getWindowHeight() {
            // get window height, apply to first div
            var viewportheight;
            if (typeof window.innerWidth != 'undefined') {
                viewportheight = window.innerHeight
            }
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientWidth !=
                'undefined' && document.documentElement.clientWidth != 0) {
                viewportheight = document.documentElement.clientHeight
            }
            else {
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }
            var book = document.getElementById("book");
            book.style.height = viewportheight + 'px';
        }

        function onScroll(event) {
            var scrollPos = $(document).scrollTop();

            $('ul.main-menu li a').each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                    $('ul.main-menu li a').removeClass("active");
                    currLink.addClass("active");
                }
                else {
                    currLink.removeClass("active");
                }
            });
        }

        $(window).scroll(function () {

            onScroll();
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
            var scroll = $(window).scrollTop();

            if (scroll >= (viewportheight - 100)) {
                $(".navbar-default").removeClass("navbar-start");
            } else {
                $(".navbar-default").addClass("navbar-start");
            }
        });


        $(document).ready(function () {
            getWindowHeight();
        });

        window.addEventListener('resize', function (event) {
            getWindowHeight();
        });

    }])
    .controller('pensionCtrl', ['$scope', function ($scope) {

        $scope.bookingText = 'Book a Room';


        function loadJSON(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', './components/assets/texts/text-svk.json', true); // Replace 'my_data' with the path to your file
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }


        function getWindowHeight() {
            // get window height, apply to first div
            var viewportheight;
            if (typeof window.innerWidth != 'undefined') {
                viewportheight = window.innerHeight
            }
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientWidth !=
                'undefined' && document.documentElement.clientWidth != 0) {
                viewportheight = document.documentElement.clientHeight
            }
            else {
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }
            var firstView = document.getElementById("first");
            var startView = document.getElementById("book");

            firstView.style.height = viewportheight + 'px';
            startView.style.height = viewportheight + 'px';

        }

    }])
    .controller('restaurantCtrl', ['$scope', function ($scope) {


        function getWindowHeight() {
            // get window height, apply to first div
            var viewportheight;
            if (typeof window.innerWidth != 'undefined') {
                viewportheight = window.innerHeight
            }
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientWidth !=
                'undefined' && document.documentElement.clientWidth != 0) {
                viewportheight = document.documentElement.clientHeight
            }
            else {
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }
            var book = document.getElementById("book");

            book.style.height = viewportheight + 'px';

            $scope.height = viewportheight;
        }

        function onScroll() {
            var scroll = $(window).scrollTop();
            console.log("scroll: " + scroll);

            console.log($scope.height);

            if(scroll >= $scope.height) {
                $('.sub-menu').addClass("open");
            } else {
                //remove the background property so it comes transparent again (defined in your css)
                $('.sub-menu').removeClass("open");
            }
        }

        $(window).scroll(function () {

            onScroll();
            var scroll = $(window).scrollTop();

            if (scroll >= (viewportheight - 100)) {
                $(".navbar-default").removeClass("navbar-start");
            } else {
                $(".navbar-default").addClass("navbar-start");
            }
        });


        $(document).ready(function () {
            getWindowHeight();
        });

        window.addEventListener('resize', function (event) {
            getWindowHeight();
        });

    }])
        .controller('spaCrl', ['$scope', function ($scope) {
        $scope.bookingText = 'Book SPA';

            function getWindowHeight() {
                // get window height, apply to first div
                var viewportheight;
                if (typeof window.innerWidth != 'undefined') {
                    viewportheight = window.innerHeight
                }
                // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
                else if (typeof document.documentElement != 'undefined'
                    && typeof document.documentElement.clientWidth !=
                    'undefined' && document.documentElement.clientWidth != 0) {
                    viewportheight = document.documentElement.clientHeight
                }
                else {
                    viewportheight = document.getElementsByTagName('body')[0].clientHeight
                }
                var book = document.getElementById("book");

                book.style.height = viewportheight + 'px';

            }

            $(document).ready(function () {
                getWindowHeight();
            });

            window.addEventListener('resize', function (event) {
                getWindowHeight();
            });

    }]);

