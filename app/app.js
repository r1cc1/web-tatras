'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'duScroll',
    'angular-flexslider',
    'ngMdIcons',
    'firebase',
    'angulartics',
    'angulartics.google.analytics',
    'ajoslin.promise-tracker',
    '720kb.datepicker',
    'pascalprecht.translate',
    'mainCtrl',
    'welcomeCtrl',
    'beerCtrl',
    'restaurantCtrl',
    'pensionCtrl',
    'spaCtrl',
    'shopCtrl',
    'sutazCtrl',
    'adminCtrl'
])
    .value('duScrollDuration', 200)
    .value('duScrollOffset', 0 )
    .value('duScrollSpyWait', 200)
    .config(['$locationProvider', '$routeProvider', '$translateProvider', function ($locationProvider, $routeProvider, $translateProvider) {

        $routeProvider.when('/welcome', {
            templateUrl: 'templates/welcome.html',
            controller: 'welcomeCtrl'
        });
        $routeProvider.when('/beer', {
            templateUrl: 'templates/beer.html',
            controller: 'beerCtrl'
        });
        $routeProvider.when('/restaurant', {
            templateUrl: 'templates/restaurant.html',
            controller: 'restaurantCtrl'
        });
        $routeProvider.when('/pension', {
            templateUrl: 'templates/pension.html',
            controller: 'pensionCtrl'
        });
        $routeProvider.when('/spa', {
            templateUrl: 'templates/spa.html',
            controller: 'spaCtrl'
        });
        $routeProvider.when('/shop', {
            templateUrl: 'templates/shop.html',
            controller: 'shopCtrl'
        });
        $routeProvider.when('/sutaz', {
            templateUrl: 'templates/sutaz.html',
            controller: 'sutazCtrl'
        });
        $routeProvider.when('/admin', {
            templateUrl: 'templates/admin.html',
            controller: 'adminCtrl'
        });
        $routeProvider.when('/gdpr', {
            templateUrl: 'templates/gdpr.html',
            controller: 'adminCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/welcome'});
        $locationProvider.hashPrefix('!');

        //use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $translateProvider.preferredLanguage(navigator.language);
        $translateProvider.registerAvailableLanguageKeys(['en', 'sk'], {
            'en-*': 'en',
            'sk-*': 'sk'
        });

        $translateProvider.useStaticFilesLoader({
            prefix: 'components/assets/texts/',
            suffix: '.json'
        });

    }])
    .controller("calendarDemo", function($scope) {

        moment.locale('en'); // default the locale to English
        var localLocale = moment();

        localLocale.locale('sk'); // set this instance to use French

        moment.locale('sk', {
            months : 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_'),
            monthsShort : 'jan._feb._mar_apr._maj_jun_jul._aug_sep._oct._nov._dec.'.split('_'),
            monthsParseExact : true,
            weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
            weekdaysShort : 'ned._pon._uto._str._štv._pia._sob.'.split('_'),
            weekdaysMin : 'Ne_Po_Ut_St_Št_Pi_So'.split('_'),
            weekdaysParseExact : true,
            longDateFormat : {
                LT : 'HH:mm',
                LTS : 'HH:mm:ss',
                L : 'DD/MM/YYYY',
                LL : 'D MMMM YYYY',
                LLL : 'D MMMM YYYY HH:mm',
                LLLL : 'dddd D MMMM YYYY HH:mm'
            },
            calendar : {
                sameDay : '[Aujourd’hui à] LT',
                nextDay : '[Demain à] LT',
                nextWeek : 'dddd [à] LT',
                lastDay : '[Hier à] LT',
                lastWeek : 'dddd [dernier à] LT',
                sameElse : 'L'
            },
            relativeTime : {
                future : 'dans %s',
                past : 'il y a %s',
                s : 'quelques secondes',
                m : 'une minute',
                mm : '%d minutes',
                h : 'une heure',
                hh : '%d heures',
                d : 'un jour',
                dd : '%d jours',
                M : 'un mois',
                MM : '%d mois',
                y : 'un an',
                yy : '%d ans'
            },
            dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
            ordinal : function (number) {
                return number + (number === 1 ? '.' : '.');
            },
            meridiemParse : /PD|MD/,
            isPM : function (input) {
                return input.charAt(0) === 'M';
            },
            // In case the meridiem units are not separated around 12, then implement
            // this function (look at locale/id.js for an example).
            // meridiemHour : function (hour, meridiem) {
            //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
            // },
            meridiem : function (hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week : {
                dow : 1, // Monday is the first day of the week.
                doy : 4  // The week that contains Jan 4th is the first week of the year.
            }
        });


        $scope.day = moment();

        console.log('$scope.day' + $scope.day);

    }).directive("calendar", function() {
        return {
            restrict: "E",
            templateUrl: "templates/calendar.html",
            scope: {
                selected: "="
            },
            link: function(scope) {
                scope.selected = _removeTime(scope.selected || moment());
                scope.month = scope.selected.clone();

                var start = scope.selected.clone();
                start.date(1);
                _removeTime(start.day(0));

                _buildMonth(scope, start, scope.month);

                scope.select = function(day) {
                    scope.selected = day.date;
                };

                scope.next = function() {
                    var next = scope.month.clone();
                    _removeTime(next.month(next.month()+1).date(1));
                    scope.month.month(scope.month.month()+1);
                    _buildMonth(scope, next, scope.month);
                };

                scope.previous = function() {
                    var previous = scope.month.clone();
                    _removeTime(previous.month(previous.month()-1).date(1));
                    scope.month.month(scope.month.month()-1);
                    _buildMonth(scope, previous, scope.month);
                };
            }
        };

        function _removeTime(date) {
            return date.day(0).hour(0).minute(0).second(0).millisecond(0);
        }

        function _buildMonth(scope, start, month) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            while (!done) {
                scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                date.add(1, "w");
                done = count++ > 2 && monthIndex !== date.month();
                monthIndex = date.month();
            }
        }

        function _buildWeek(date, month) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date
                });
                date = date.clone();
                date.add(1, "d");
            }
            return days;
        }
    })
    .run(['$rootScope', '$location', '$routeParams','$window', '$anchorScroll', function ($rootScope, $location,$routeParams, $window, $anchorScroll) {

        angular.element(document).ready(function () {

            //get domain from URL
            $rootScope.domainUrl = $window.location.host;
            //console.log('domainUrl= ' + $rootScope.domainUrl);

            ///Google Analytics
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            window['GoogleAnalyticsObject'] = 'ga';
            window['ga'] = window['ga'] || function() {
                    (window['ga'].q = window['ga'].q || []).push(arguments)
                };
            ga('create', 'UA-101344344-1', 'auto');
        });


        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function () {
            ga('send', 'pageview', $location.url());
            console.log('$routeChangeStart baseLen= ' + $location.url());
        });


    }]);



