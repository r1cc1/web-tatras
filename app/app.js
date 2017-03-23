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

    .controller('homeCtrl', ['$scope', function ($scope) {


        $scope.bookingText = 'Call Us';


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

        function loadJSON(callback) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', '../components/assets/texts/text-svk.json', true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }

        function init() {
            var mainTitle = $('#main-title');
            var mainText1 = $('#main-text1');
            var mainText2 = $('#main-text2');
            var title2 = $('#title2');
            var mainText3 = $('#main-text3');
            var mainBrewery = $('#main-brewery');
            var mainBrewery1 = $('#main-brewery1');
            var ourFood = $('#our-food');
            var food = $('#food');
            var foodText = $('#food-text');
            var contact = $('#contact-text');
            var beerSpa1 = $('#beer-spa1');
            var beerSpatext = $('#beer-spatext');
            var pension1 = $('#pension1');
            var pensionText = $('#pension-text');

            loadJSON(function (response) {
                // Parse JSON string into object
                var actual_JSON = JSON.parse(response);
                $.each(actual_JSON, function (index, value) {
                    mainTitle.text(value[0].title1);
                    mainText1.text(value[0].mainText1);
                    mainText2.text(value[0].mainText2);
                    title2.text(value[0].title2);
                    mainText3.text(value[0].mainText3);
                    mainBrewery.text(value[0].mainBrewery);
                    mainBrewery1.text(value[0].mainBrewery1);
                    ourFood.text(value[0].ourFood);
                    food.text(value[0].food);
                    foodText.text(value[0].foodText);
                    contact.text(value[0].contact);
                    beerSpa1.text(value[0].beerSpa1);
                    beerSpatext.text(value[0].beerSpatext);
                    pension1.text(value[0].pension1);
                    pensionText.text(value[0].pensionText);
                });
            });
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
            var welcome = document.getElementById("welcome");
            welcome.style.height = viewportheight + 'px';

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
            init();
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

        $scope.bookingText = 'Book a Table';


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

        function init() {
            var mainTitle = $('#main-title');
            var mainText1 = $('#main-text1');
            var mainText2 = $('#main-text2');
            var title2 = $('#title2');
            var mainText3 = $('#main-text3');
            var mainBrewery = $('#main-brewery');
            var mainBrewery1 = $('#main-brewery1');
            var ourFood = $('#our-food');
            var food = $('#food');
            var foodText = $('#food-text');
            var contact = $('#contact-text');
            var beerSpa1 = $('#beer-spa1');
            var beerSpatext = $('#beer-spatext');
            var pension1 = $('#pension1');
            var pensionText = $('#pension-text');

            loadJSON(function (response) {
                // Parse JSON string into object
                var actual_JSON = JSON.parse(response);
                $.each(actual_JSON, function (index, value) {
                    mainTitle.text(value[0].title1);
                    mainText1.text(value[0].mainText1);
                    mainText2.text(value[0].mainText2);
                    title2.text(value[0].title2);
                    mainText3.text(value[0].mainText3);
                    mainBrewery.text(value[0].mainBrewery);
                    mainBrewery1.text(value[0].mainBrewery1);
                    ourFood.text(value[0].ourFood);
                    food.text(value[0].food);
                    foodText.text(value[0].foodText);
                    contact.text(value[0].contact);
                    beerSpa1.text(value[0].beerSpa1);
                    beerSpatext.text(value[0].beerSpatext);
                    pension1.text(value[0].pension1);
                    pensionText.text(value[0].pensionText);
                });
            });
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
            var startView = document.getElementById("start");
            var pension = document.getElementById("pension");
            var welcome = document.getElementById("welcome");
            var contact = document.getElementById("contact");

            welcome.style.height = viewportheight + 'px';
            firstView.style.height = viewportheight + 'px';
            startView.style.height = viewportheight + 'px';
            pension.style.height = viewportheight + 'px';

            contact.style.height = viewportheight + 'px';
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


        $(document).ready(function ($target) {
            init();
            getWindowHeight();

            //smoothscroll
            // $('a[href^="#"]').on('click', function (e) {
            //
            //     e.preventDefault();
            //     $(document).off("scroll");
            //
            //     $('a').each(function () {
            //         $(this).removeClass('active');
            //     });
            //     $(this).addClass('active');
            //
            //     var target = this.hash,
            //         menu = target;
            //     $target = $(target);
            //     $('html, body').stop().animate({
            //         'scrollTop': $target.offset().top+2
            //     }, 500, 'swing', function () {
            //         //window.location.hash = target;
            //         $(document).on("scroll", onScroll);
            //     });
            //
            // });
        });

        window.addEventListener('resize', function (event) {
            getWindowHeight();
        });

    }])
    .controller('spaCrl', ['$scope', function ($scope) {
        $scope.bookingText = 'Book SPA';

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

        function init() {
            var mainTitle = $('#main-title');
            var mainText1 = $('#main-text1');
            var mainText2 = $('#main-text2');
            var title2 = $('#title2');
            var mainText3 = $('#main-text3');
            var mainBrewery = $('#main-brewery');
            var mainBrewery1 = $('#main-brewery1');
            var ourFood = $('#our-food');
            var food = $('#food');
            var foodText = $('#food-text');
            var contact = $('#contact-text');
            var beerSpa1 = $('#beer-spa1');
            var beerSpatext = $('#beer-spatext');
            var pension1 = $('#pension1');
            var pensionText = $('#pension-text');

            loadJSON(function (response) {
                // Parse JSON string into object
                var actual_JSON = JSON.parse(response);
                $.each(actual_JSON, function (index, value) {
                    mainTitle.text(value[0].title1);
                    mainText1.text(value[0].mainText1);
                    mainText2.text(value[0].mainText2);
                    title2.text(value[0].title2);
                    mainText3.text(value[0].mainText3);
                    mainBrewery.text(value[0].mainBrewery);
                    mainBrewery1.text(value[0].mainBrewery1);
                    ourFood.text(value[0].ourFood);
                    food.text(value[0].food);
                    foodText.text(value[0].foodText);
                    contact.text(value[0].contact);
                    beerSpa1.text(value[0].beerSpa1);
                    beerSpatext.text(value[0].beerSpatext);
                    pension1.text(value[0].pension1);
                    pensionText.text(value[0].pensionText);
                });
            });
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
            var startView = document.getElementById("start");
            var pension = document.getElementById("pension");
            var welcome = document.getElementById("welcome");
            var contact = document.getElementById("contact");

            welcome.style.height = viewportheight + 'px';
            firstView.style.height = viewportheight + 'px';
            startView.style.height = viewportheight + 'px';
            pension.style.height = viewportheight + 'px';

            contact.style.height = viewportheight + 'px';
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


        $(document).ready(function ($target) {
            init();
            getWindowHeight();

            //smoothscroll
            // $('a[href^="#"]').on('click', function (e) {
            //
            //     e.preventDefault();
            //     $(document).off("scroll");
            //
            //     $('a').each(function () {
            //         $(this).removeClass('active');
            //     });
            //     $(this).addClass('active');
            //
            //     var target = this.hash,
            //         menu = target;
            //     $target = $(target);
            //     $('html, body').stop().animate({
            //         'scrollTop': $target.offset().top+2
            //     }, 500, 'swing', function () {
            //         //window.location.hash = target;
            //         $(document).on("scroll", onScroll);
            //     });
            //
            // });
        });

        window.addEventListener('resize', function (event) {
            getWindowHeight();
        });

    }]);
