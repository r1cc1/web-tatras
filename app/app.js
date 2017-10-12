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
    'daypilot',
    'pascalprecht.translate',
    'mainCtrl',
    'startCtrl',
    'homeCtrl',
    'restaurantCtrl',
    'pensionCtrl',
    'spaCtrl',
    'shopCtrl',
    'adminCtrl'
])
    .value('duScrollDuration', 500)
    .value('duScrollOffset', 60 )
    .value('duScrollSpyWait', 500)
    .config(['$locationProvider', '$routeProvider', '$translateProvider', function ($locationProvider, $routeProvider, $translateProvider) {


        $routeProvider.when('/en', {
            templateUrl: 'templates/start.html',
            controller: 'startCtrl'
        });

        $routeProvider.when('/welcome', {
            templateUrl: 'templates/start.html',
            controller: 'startCtrl'
        });

        $routeProvider.when('/beer', {
            templateUrl: 'templates/minipivovar.html',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/beer/!pivovica', {
            templateUrl: 'templates/minipivovar.html',
            controller: 'homeCtrl'
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
        $routeProvider.when('/admin', {
            templateUrl: 'templates/admin.html',
            controller: 'adminCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/welcome'});
        //$locationProvider.hashPrefix('#');

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
    .run(['$rootScope', '$location', '$routeParams','$window', '$anchorScroll', function ($rootScope, $location,$routeParams, $window, $anchorScroll) {

        angular.element(document).ready(function () {

            //get domain from URL
            $rootScope.domainUrl = $window.location.host;
            console.log('domainUrl= ' + $rootScope.domainUrl);

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



