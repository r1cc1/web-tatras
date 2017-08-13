'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'duScroll',
    'angular-flexslider',
    'ngMdIcons',
    'firebase',
    'ajoslin.promise-tracker',
    '720kb.datepicker'
])
    .value('duScrollDuration', 1000)
    .value('duScrollOffset', 60 )
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //$locationProvider.hashPrefix('#');

        $routeProvider.when('/home', {
            controller: 'mainCtrl'
        });

        $routeProvider.when('/home/svk', {
            templateUrl: 'templates/start.html',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/home/eng', {
            templateUrl: 'templates/start.html',
            controller: 'homeCtrl'
        });

        $routeProvider.when('/beer/svk', {
            templateUrl: 'templates/minipivovar.html',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/beer/eng', {
            templateUrl: 'templates/minipivovar.html',
            controller: 'homeCtrlEng'
        });

        $routeProvider.when('/restaurant/svk', {
            templateUrl: 'templates/restaurant.html',
            controller: 'restaurantCtrl'
        });
        $routeProvider.when('/restaurant/eng', {
            templateUrl: 'templates/restaurant.html',
            controller: 'restaurantCtrlEng'
        });

        $routeProvider.when('/pension/svk', {
            templateUrl: 'templates/pension.html',
            controller: 'pensionCtrl'
        });
        $routeProvider.when('/pension/eng', {
            templateUrl: 'templates/pension.html',
            controller: 'pensionCtrl'
        });

        $routeProvider.when('/spa/svk', {
            templateUrl: 'templates/spa.html',
            controller: 'spaCrl'
        });
        $routeProvider.when('/spa/eng', {
            templateUrl: 'templates/spa.html',
            controller: 'spaCrlEng'
        });

        $routeProvider.when('/shop/svk', {
            templateUrl: 'templates/shop.html',
            controller: 'shopCtrl'
        });
        $routeProvider.when('/shop/eng', {
            templateUrl: 'templates/shop.html',
            controller: 'shopCtrlEng'
        });
        $routeProvider.when('/admin/svk', {
            templateUrl: 'templates/admin.html',
            controller: 'adminCtrlSvk'
        });

        $routeProvider.otherwise({redirectTo: '/home/svk'});

    }])
    .controller('mainCtrl', ['$scope', '$location', '$rootScope', '$firebaseArray', '$firebaseObject', function ($scope, $location, $rootScope, $firebaseArray, $firebaseObject) {

        // Submenu State init
        $scope.subeMenuState = false;

        $scope.english = function () {
            $rootScope.lang = 'eng';
            $location.path('/' + $rootScope.category + '/' + $rootScope.lang);
        };
        $scope.slovak = function () {
            $rootScope.lang = 'svk';
            $location.path('/' + $rootScope.category + '/' + $rootScope.lang);
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
            $scope.teaserHeight = viewportheight/2;
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
            $('.' + n).addClass('today');
            $rootScope.currentDay = n.toLowerCase();

            console.log('Current Day ->' + $rootScope.currentDay);
        };


        $(window).scroll(function () {
            onScroll();
        });

        $(document).ready(function () {
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

        });

        window.addEventListener('resize', function () {
            getWindowHeight();
        });


        $scope.setDaysEng = function () {
            $rootScope.monday = 'Monday';
            $rootScope.tuesday = 'Tuesday';
            $rootScope.wednesday = 'Wednesday';
            $rootScope.thursday = 'Thursday';
            $rootScope.friday = 'Friday';
            $rootScope.saturday = 'Saturday';
            $rootScope.sunday = 'Sunday';
        };
        $scope.setDaysSvk = function () {
            $rootScope.monday = 'Pondelok';
            $rootScope.tuesday = 'Utorok';
            $rootScope.wednesday = 'Streda';
            $rootScope.thursday = 'Štvrtok';
            $rootScope.friday = 'Piatok';
            $rootScope.saturday = 'Sobota';
            $rootScope.sunday = 'Nedeľa';
        };


        $scope.$watch('lang', function (newValue, oldValue, scope) {

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

        $scope.mobileMenu = function() {
            $rootScope.openMobileMenu = !$rootScope.openMobileMenu;
            console.log($rootScope.openMobileMenu);
        };

        var $stopPropagation = $('a');

        function clickHandler (event) {
            $(this).toggleClass('distinctive')
            if($stopPropagation.is(':checked'))
                event.stopPropagation();

            console.log('yeah');
        }
        $('.left').on('click', clickHandler);


    }])
    .controller('homeCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
        $rootScope.getCurrentDay();

        $scope.isHome = true;

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }

        setTimeout(stopLoading, 2000);

        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'home';
        console.log('$rootScope.category: ' + $rootScope.category);
        $rootScope.openMobileMenu = false;
        $scope.categoryName = 'Minipivovar';

        // TEXTS
        $scope.btnBook = 'Zavolajte Nam';
        $scope.btnIcon = 'call';

        $scope.welcome = 'Vitajte';

        $scope.minipivovar = 'Minipivovar';
        $scope.restaurant = 'Reštaurácia';
        $scope.wellness = 'Pivné kúpele';
        $scope.pension = 'Penzión ***';

        $scope.btnBookTable = 'Rezervovat Stol';
        $scope.btnBookRoom = 'Rezervovat Izbu';
        $scope.btnBookSpa = 'Rezervovat SPA';

        $scope.minipivovarTitle1 = 'ozajstné pivo';
        $scope.minipivovarText1 = 'Všetky pivá varené v Tatrase majú vlastnú tajnú receptúru. Aby sa zachovala ich nezameniteľná vôňa a chuť, pivá sa nefiltrujú ani nepasterizujú. Nepoužívajú sa žiadne konzervačné látky, prísady, náhrady sladu, ochucovadlá, arómy, stabilizátory peny či farbivá. ';
        $scope.minipivovarText2 = 'Tatras neriedi pivo vodou ako veľké pivovary. Naše pivo ostáva živé a plné vitamínov, nemusí vydržať roky skladovania, ale musí mať ozajstnú chuť, musí to byť';

        $scope.otvaracieHodiny = 'Otváracie Hodiny';

        $scope.history = 'História';
        $scope.historyTitle = 'Príbeh';
        $scope.historyText1 = 'Po veľkom požiari Popradu, na námestí, kde pôvodne stál drevený dom, postavil v r. 1731 spišský Nemec Jakub Emmerici kamenný dom. Odkaz pre budúcich vlastníkov domu zanechal na zakrytej hrazde, kde vytesal nápis: ,,Soli Deo Gloria“ (Len Bohu patrí sláva). Uhorská kráľovná Mária Terézia v r. 1778 potvrdila Popradu staroveké právo varenia piva. Medzi 19 domov, v ktorých mešťania varili pivo a mohli ho i čapovať, patril aj tento náš dom. Pivo sa vtedy varilo prevažne pre vlastnú potrebu a väčšinou ho varili ženy. Po založení popradského pivovaru v r. 1812 domáce varenie piva v Poprade zaniká.';
        $scope.historyText2 = 'Počas štúdia na Vysokej škole podnikania v Ostrave, prichádza rodák z Popradu Lukáš Vdovjak s myšlienkou založenia vlastného minipivovaru. Nechutia mu mdlé pivá nadnárodných spoločností, spoznáva malé české remeselné minipivovary vyrábajúce úplne iné pivá – chutnejšie, plnšie, voňavejšie, pestrejšie... Navrhuje otcovi Milanovi využiť dom na námestí v Poprade, kde sídli rodinná firma a pretvoriť ju na Reštauračný minipivovar. V spolupráci s otcom (tiež milovníkom dobrého piva), skúseným podnikateľom, zostavuje štúdiu realizovateľnosti, ktorá sa stane i témou jeho bakalárskej práce. Lukáš sa pokúša, ako „domavarič“, o svoje prvé pivá. Zisťuje však, že v „garážových podmienkach“ nie je ľahké uvariť kvalitné pivo. Takisto cíti, že je potrebné doplniť si vedomosti.';
        $scope.historyText3 = 'Lukáš využije, že v r. 2014 Slovenská živnostenská komora organizuje vzdelávací program Sladovník-Pivovarník a prihlási do kurzu seba i svojho otca. Lukáš sa stáva najmladším a otec najstarším študentom v tomto programe na Slovenskej poľnohospodárskej univerzite v Nitre. Počas štúdia obaja pripravujú projekty a začínajú s rekonštrukciou a novou prístavbou domu na námestí v Poprade s cieľom vybudovať Reštauračný minipivovar. Lukášovi sa začína napĺňať sen o vlastnom pivovare a o vlastnom slovenskom poctivom „ozajstnom pive“. Lukáš zakladá vlastnú spoločnosť, časť domu si prenajíma a žiada o úver. ';
        $scope.historyText4 = 'Počas výstavby ďalej rozvíja zámer poskytnúť svojím hosťom aj ubytovanie v penzióne i  nezvyčajné pivné kúpele. Projekt dostáva názov Tatras – na počesť nádherného pohoria, ktoré vytvára scenériu Popradu. Tatras chce variť „ozajstné pivo“ nielen Popradčanom, ale i všetkým návštevníkom Tatier. Pre technológiu minipivovaru je v náročnej medzinárodnej súťaži vybraná slovenská firma PSS, a. s. Svidník. A tá nesklame, dodáva kvalitné, moderné zariadenie s kapacitou varne až 1200 l, umožňujúcou variť pivá rôzny';
        $scope.historyText5 = 'Prvú várku spodne kvaseného svetlého ležiaka plzenského typu varia sládkovia Ing. Ján Koma a Bc. Lukáš Vdovjak v novozaloženom minipivovare 30. septembra 2015. Nazvú ho „Odležiak“, keďže technológia minipivovaru je síce inštalovaná, ale budova je stále vo výstavbe, navarené pivo bude ešte rok ležať v tanku a čakať do 8. septembra 2016, kedy je reštaurácia otvorená do skúšobnej prevádzky. Pivo je skvostné – archívne, jeden navarený tank s objemom cca 5000 veľkých pív na výčape mizne do jedného mesiaca. Hostia naň doteraz s nostalgiou spomínajú. Tatras začína variť pivá spodne i vrchne kvasené - ležiaky i ale....';
        $scope.historyText6 = 'U všetkých navarených pív dodržiava Tatras zákon o čistote piva z r. 1516 – prvý zákon o potravinách na svete, vydaný bavorským vojvodom Viliamom IV. Ten určuje, že pivo môže byť vyrobené iba z vody, jačmenného alebo pšeničného sladu, chmeľu a za pomoci pivovarských kvasiniek. Vlastná 50 m hlboká studňa dodáva krištáľovú tatranskú vodu. Slad sa kupuje predovšetkým z českých Záhliníc, ale i z Nemecka. Chmeľ sa dováža z Čiech, Nemecka, Nového Zélandu, Anglicka či USA, kvasnice z Belgicka. ';

        $scope.aboutUs = 'O Nás';

        $scope.mySlides = [
            '/components/assets/imgs/varenie/varenie1.jpg',
            '/components/assets/imgs/varenie/Varenie3.jpg',
            '/components/assets/imgs/varenie/varenie4.jpg',
            '/components/assets/imgs/varenie/varenie5.jpg'
        ];

        var map = jQuery('.map');
        var mapFrame = jQuery('.map iframe');

        map.click(function () {
            mapFrame.css("pointer-events", "auto");
        });

        map.mouseleave(function () {
            mapFrame.css("pointer-events", "none");
        });

    }])
    .controller('homeCtrlEng', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
        $rootScope.getCurrentDay();
        $scope.isHome = true;

        // set Language
        $rootScope.lang = 'eng';
        // set Category
        $rootScope.category = 'home';
        console.log('$rootScope.category: ' + $rootScope.category);

        $scope.categoryName = 'MiniBrewery';

        $scope.minipivovar = 'MiniBrewery';
        $scope.restaurant = 'Restaurant';
        $scope.wellness = 'Beer Wellness';
        $scope.pension = 'Pension ***';

        // TEXTS
        $scope.btnBook = 'Call Us Now';
        $scope.btnIcon = 'call';

        $scope.welcome = 'Welcome';

        $scope.btnBookTable = 'Book Table';
        $scope.btnBookRoom = 'Book Room';
        $scope.btnBookSpa = 'Book SPA';

        $scope.minipivovarTitle1 = 'true beer';
        $scope.minipivovarText1 = 'Všetky pivá varené v Tatrase majú vlastnú tajnú receptúru. Aby sa zachovala ich nezameniteľná vôňa a chuť, pivá sa nefiltrujú ani nepasterizujú. Nepoužívajú sa žiadne konzervačné látky, prísady, náhrady sladu, ochucovadlá, arómy, stabilizátory peny či farbivá. ';
        $scope.minipivovarText2 = 'Tatras neriedi pivo vodou ako veľké pivovary. Naše pivo ostáva živé a plné vitamínov, nemusí vydržať roky skladovania, ale musí mať ozajstnú chuť, musí to byť';

        $scope.otvaracieHodiny = 'Opening Hours';

        $scope.history = 'History';
        $scope.historyTitle = 'The Story';
        $scope.historyText1 = 'Po veľkom požiari Popradu, na námestí, kde pôvodne stál drevený dom, postavil v r. 1731 spišský Nemec Jakub Emmerici kamenný dom. Odkaz pre budúcich vlastníkov domu zanechal na zakrytej hrazde, kde vytesal nápis: ,,Soli Deo Gloria“ (Len Bohu patrí sláva). Uhorská kráľovná Mária Terézia v r. 1778 potvrdila Popradu staroveké právo varenia piva. Medzi 19 domov, v ktorých mešťania varili pivo a mohli ho i čapovať, patril aj tento náš dom. Pivo sa vtedy varilo prevažne pre vlastnú potrebu a väčšinou ho varili ženy. Po založení popradského pivovaru v r. 1812 domáce varenie piva v Poprade zaniká.';
        $scope.historyText2 = 'Počas štúdia na Vysokej škole podnikania v Ostrave, prichádza rodák z Popradu Lukáš Vdovjak s myšlienkou založenia vlastného minipivovaru. Nechutia mu mdlé pivá nadnárodných spoločností, spoznáva malé české remeselné minipivovary vyrábajúce úplne iné pivá – chutnejšie, plnšie, voňavejšie, pestrejšie... Navrhuje otcovi Milanovi využiť dom na námestí v Poprade, kde sídli rodinná firma a pretvoriť ju na Reštauračný minipivovar. V spolupráci s otcom (tiež milovníkom dobrého piva), skúseným podnikateľom, zostavuje štúdiu realizovateľnosti, ktorá sa stane i témou jeho bakalárskej práce. Lukáš sa pokúša, ako „domavarič“, o svoje prvé pivá. Zisťuje však, že v „garážových podmienkach“ nie je ľahké uvariť kvalitné pivo. Takisto cíti, že je potrebné doplniť si vedomosti.';
        $scope.historyText3 = 'Lukáš využije, že v r. 2014 Slovenská živnostenská komora organizuje vzdelávací program Sladovník-Pivovarník a prihlási do kurzu seba i svojho otca. Lukáš sa stáva najmladším a otec najstarším študentom v tomto programe na Slovenskej poľnohospodárskej univerzite v Nitre. Počas štúdia obaja pripravujú projekty a začínajú s rekonštrukciou a novou prístavbou domu na námestí v Poprade s cieľom vybudovať Reštauračný minipivovar. Lukášovi sa začína napĺňať sen o vlastnom pivovare a o vlastnom slovenskom poctivom „ozajstnom pive“. Lukáš zakladá vlastnú spoločnosť, časť domu si prenajíma a žiada o úver. ';
        $scope.historyText4 = 'Počas výstavby ďalej rozvíja zámer poskytnúť svojím hosťom aj ubytovanie v penzióne i  nezvyčajné pivné kúpele. Projekt dostáva názov Tatras – na počesť nádherného pohoria, ktoré vytvára scenériu Popradu. Tatras chce variť „ozajstné pivo“ nielen Popradčanom, ale i všetkým návštevníkom Tatier. Pre technológiu minipivovaru je v náročnej medzinárodnej súťaži vybraná slovenská firma PSS, a. s. Svidník. A tá nesklame, dodáva kvalitné, moderné zariadenie s kapacitou varne až 1200 l, umožňujúcou variť pivá rôzny';
        $scope.historyText5 = 'Prvú várku spodne kvaseného svetlého ležiaka plzenského typu varia sládkovia Ing. Ján Koma a Bc. Lukáš Vdovjak v novozaloženom minipivovare 30. septembra 2015. Nazvú ho „Odležiak“, keďže technológia minipivovaru je síce inštalovaná, ale budova je stále vo výstavbe, navarené pivo bude ešte rok ležať v tanku a čakať do 8. septembra 2016, kedy je reštaurácia otvorená do skúšobnej prevádzky. Pivo je skvostné – archívne, jeden navarený tank s objemom cca 5000 veľkých pív na výčape mizne do jedného mesiaca. Hostia naň doteraz s nostalgiou spomínajú. Tatras začína variť pivá spodne i vrchne kvasené - ležiaky i ale....';
        $scope.historyText6 = 'U všetkých navarených pív dodržiava Tatras zákon o čistote piva z r. 1516 – prvý zákon o potravinách na svete, vydaný bavorským vojvodom Viliamom IV. Ten určuje, že pivo môže byť vyrobené iba z vody, jačmenného alebo pšeničného sladu, chmeľu a za pomoci pivovarských kvasiniek. Vlastná 50 m hlboká studňa dodáva krištáľovú tatranskú vodu. Slad sa kupuje predovšetkým z českých Záhliníc, ale i z Nemecka. Chmeľ sa dováža z Čiech, Nemecka, Nového Zélandu, Anglicka či USA, kvasnice z Belgicka. ';

        $scope.aboutUs = 'About Us';

        $scope.mySlides = [
            '/components/assets/imgs/varenie/varenie1.jpg',
            '/components/assets/imgs/varenie/Varenie3.jpg',
            '/components/assets/imgs/varenie/varenie4.jpg',
            '/components/assets/imgs/varenie/varenie5.jpg'
        ];

        var map = jQuery('.map');
        var mapFrame = jQuery('.map iframe');

        map.click(function () {
            mapFrame.css("pointer-events", "auto");
        });

        map.mouseleave(function () {
            mapFrame.css("pointer-events", "none");
        });

    }])
    .controller('restaurantCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        // set Loading
        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 1000);

        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'restaurant';
        $scope.categoryName = 'Reštaurácia';

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;

        $scope.bookFinnish = false;


        $scope.btnBook = 'Rezervovať Stôl';
        $scope.btnIcon = 'local_restaurant';

        $scope.btnBookTableSvk = 'Rezervovať Stôl';
        $scope.btnBookTableEng = 'Book Table';

        $scope.food1 = 'Polievka';
        $scope.food2 = 'Menu 1.';
        $scope.food3 = 'Menu 2.';


        $scope.restaurantWelcome = 'Vitajte';
        $scope.otvaracieHodiny = 'Otváracie hodiny';
        $scope.restaurantSaloniky = 'Salóniky';

        $scope.restaurantSalonik1 = "Ponúka na výčape 8 druhov vlastného piva. Na tabuli je vždy aktuálne jedlo dňa.";
        $scope.restaurantSalonik2 = "Je prvá pivnica v našom pivovare, kde sa dozviete viac o histórii varenia piva v Poprade.";
        $scope.restaurantSalonik3 = "Je druhá pivnica v našom pivovare. Tu sa dozviete, čím sa v tomto dome v minulosti platilo za pivo.";
        $scope.restaurantSalonik4 = "Je spomienkou na firmu Kleinberger & syn, ktorá v minulosti vyrábala v Poprade cca 100 druhov likérov.";
        $scope.restaurantSalonik5 = "Je venovaná láske. Hovorí sa, že ak v nej zaľúbenci spoločne pošúchajú červené srdce v srdci, do roka a do dňa sú svoji i s …";
        $scope.restaurantSalonik6 = 'Je určená pre milovníkov umenia. Vyzdobená je 19 výtvarnými dielami.';
        $scope.restaurantSalonik7 = "Vzdeláva rodokmeňom piva a odhaľuje pivné štýly, ktoré varí sám majiteľ podľa vlastnej tajnej receptúry.";
        $scope.restaurantSalonik8 = "Pripomína najlepších slovenských spevákov. Je jediným fajčiarskym salónikom v našej reštaurácii. ";
        $scope.restaurantSalonik9 = "Celková kapacita reštaurácie je 171 hostí. Každý salónik sa môže rezervovať pre privátnu spoločnosť a uzavrieť.";

        $scope.restaurantText1 = "Príďte si vychutnať pokojnú atmosféru reštaurácie Tatras, príjemnú obsluhu, skvelé jedlo a „ozajstné pivo“.Radi Vás privítame pri oslave Vášho jubilea, firemnej akcii, svadbe, krstinách..."
        $scope.restaurantPribehTitle = "Príbeh";
        $scope.restaurantPribehText = "V 90-tych rokoch minulého storočia, po oprave schátraného domu, vzniká v jeho priestore piváreň s názvom „Zvon“. Na výčape ponúka aj čierne pivo, čo bolo v Poprade v tom čase raritou. Piváreň strieda obchod s odevmi. Až potom prichádza myšlienka Reštauračného minipivovaru, teda vynikajúcej reštaurácie, ktorá by podávala i vlastné „ozajstné pivo“. Reštaurácie, ktorá využije bývalé obytné miestnosti starého nemeckého domu, pretvorené na útulné salóniky, ktoré budú mať spoločné črty, ale každý s vlastnou atmosférou a myšlienkou. Reštaurácie, ktorá ponúkne hosťovi niečo nezvyčajné a originálne, kde nájde zákutia na romantiku, obchodné rokovania či priestory pre rôzne akcie.";
        $scope.restaurantPribehText2 = " sa po dvoch rokoch projektovania, búrania, rekonštrukcie, výstavby a zariaďovania, otvára do skúšobnej prevádzky na jeseň 2016. Každý salónik má svoj názov podľa charakteru miestnosti a interiérového vybavenia. Hostia môžu často z pohodlia reštaurácie pozorovať sládka pri práci na varni. Vôňa chmeľu a mladého piva vtedy prenikne i do reštaurácie.„Tu varíme s láskou, koreníme smiechom“ – to je motto moderne vybavenej kuchyne reštaurácie Tatras, v ktorej šéfkuchár Milan Duráni so svojím tímom, pripravuje pre Vás z čerstvých surovín chutné jedlá. Milan Duráni desaťročie šefoval v prestížnych reštauráciach v Nemecku a Taliansku, odkiaľ si priniesol svoje zásady pre vybudovanie dobrej kuchyne – nie polotovary, nie chemické zvýrazňovače chuti, nie prehnane veľa jedál, nie... Kuchári pod jeho vedením vyrábajú vlastné zmesi korenín, omáčky, špaldové cestoviny, pečú vlastný chlieb, varia vlastnú pivnú polievku, miešajú svoju pivnú zmrzlinu.";
        $scope.restaurantPribehText3 = "Pomalým varením pri nízkych teplotách. Varia tak, ako by varili pre seba a svoje deti. Ponúkajú hosťovi možnosť vybrať si a uloviť pstruha z vlastného akvária a vybrať si spôsob, akým ho má kuchyňa pripraviť. Záleží im na čerstvosti a sezónnosti jedálnička. Ponúkané jedlá môžete spojiť s „ozajstným pivom“, a tak spoznať skutočný gurmánsky zážitok.  ";

        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/_RK_0005.JPG',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/_RK_0105.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/_RK_5912.JPG',
            './components/assets/imgs/jedlo/licka.JPG',
            './components/assets/imgs/jedlo/_RK_5947.JPG'
        ];



        // var dailyMenu = $http.get('https://tatras-d2f55.firebaseio.com/data');
        // //var dailyMenu = $http.get('/components/assets/texts/daily-menu.json');
        // dailyMenu.then(
        //     function (data) {
        //
        //         var data = data.data;
        //         console.log('data.data');
        //         console.log(data);
        //
        //         $scope.dailyMenuList = data.databaseTatras.week;
        //         console.log('--$scope.dailyMenuList--');
        //         console.log($scope.dailyMenuList);
        //         console.log('--$scope.dailyMenuList--');
        //
        //         $scope.dailyMenuPrice = data.databaseTatras.price;
        //
        //         console.log('--$scope.dailyMenuPrice--');
        //         console.log($scope.dailyMenuPrice);
        //         console.log('--$scope.dailyMenuPrice--');
        //
        //         for (var i = 0, l = $scope.dailyMenuList.length; i < l; i++) {
        //             $scope.dailyMenuDay = $scope.dailyMenuList[i].food[0];
        //             //console.log($scope.dailyMenuDay);
        //         }
        //     }
        // ).catch(function (error) {
        //     console.log(error);
        // });


        $scope.todayDate  = function() {
            Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            });
            $scope.currentDay = new Date().toDateInputValue();
            $scope.day = $scope.currentDay;

            console.log('---todayDate----');
            console.log('---$scope.currentDay----');
            console.log($scope.currentDay);
        };
        $scope.todayDate();

        $scope.bookingSend1 = 'Ďakujeme o Váš záujem, Vaša rezervácia bola odoslaná';
        $scope.bookingSend2 = 'Budeme Vás kontaktovať pre potvrdenie rezervácie.';

        $scope.nameLabel = 'Meno';
        $scope.yourName = 'Vaše Meno';
        $scope.phoneLabel = 'Telefón';
        $scope.timeLabel = 'Čas';
        $scope.dateLabel = 'Dátum';
        $scope.amountLabel = 'Počet';
        $scope.roomLabel = 'Miestnost';

        $scope.url = 'bookRestaurant.php';


        $scope.formsubmit = function () {
            $scope.formatTime = $scope.timer.toLocaleTimeString('sk-SK');

            console.log("date: " + $scope.date + " timer: " + $scope.formatTime + " amount: " + $scope.amount +
                " room: " + $scope.room + " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone + " text" + $scope.text);

            $http.post($scope.url, {"date": $scope.date, "timer": $scope.formatTime, "amount": $scope.amount,
                "room": $scope.room, "name": $scope.name, "email": $scope.email, "phone": $scope.phone, " text" : $scope.text})
                .success(function (data, status) {


                $scope.status = status;
                $scope.data = data;
                $scope.result = data; // Show result from server in our <pre></pre> element

                console.log('poslane: ' + $scope.result);
                console.log('status > ' + $scope.status);

                $scope.bookFinnish = true;
            })
        };

        $scope.printMenu = function() {

            $('div.daily-menu-item.today').addClass('transparent');
            $('div.actions-share').hide('fast');
            $('#content-logo').show('fast');

            function explode(){
                html2canvas($('#menu'), {

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

            function backit() {
                $('#content-logo').hide('fast');
                $('div.actions-share').show('fast');
                $('div.daily-menu-item.today').removeClass('transparent');

            }
            setTimeout(explode, 1000);
            setTimeout(backit, 2000);
        };

        $scope.printToday = function() {

            $('div.daily-menu-item.today').addClass('transparent');

            function explode(){
                html2canvas($('div.daily-menu-item.today'), {
                    
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

            function backit() {
                $('div.daily-menu-item.today').removeClass('transparent');
            }
            setTimeout(explode, 1000);
            setTimeout(backit, 2000);

        };


        /// get day name and highlight the day
        function highlightDay() {

            var dateObj = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var n = weekday[dateObj.getDay()];
            $('.' + n).addClass('today');


            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            var today = day + "." + month + "." + year;

            $scope.istoday = today;
            console.log('today is Day:' + $scope.istoday);

            var yesterday = (day -1) + "." + month + "." + year;
            $scope.yesterday = yesterday;

            console.log('yesterday Was:' + $scope.yesterday);

            var twoDaysAgo = (day -2) + "." + month + "." + year;
            $scope.twoDaysAgo = twoDaysAgo;

            console.log('twoDaysAgo Was:' + $scope.twoDaysAgo);

            var threeDaysAgo = (day -3) + "." + month + "." + year;
            $scope.threeDaysAgo = threeDaysAgo;

            console.log('threeDaysAgo Was:' + $scope.threeDaysAgo);

            var fourDaysAgo = (day -4) + "." + month + "." + year;
            $scope.fourDaysAgo = fourDaysAgo;

            console.log('fourDaysAgo Was:' + $scope.fourDaysAgo);

            var fiveDaysAgo = (day -5) + "." + month + "." + year;
            $scope.fiveDaysAgo = fiveDaysAgo;

            console.log('fiveDaysAgo Was:' + $scope.fiveDaysAgo);

        }
        highlightDay();


    }])
    .controller('restaurantCtrlEng', ['$scope', '$rootScope','$http', '$window', function ($scope, $rootScope, $window) {
        // set Language
        $rootScope.lang = 'eng';

        // set Category
        $rootScope.category = 'restaurant';
        console.log('$rootScope.category: ' + $rootScope.category);

        $scope.categoryName = 'Restaurant';


        // first scroll to top
        //$window.scrollTo(0, 0);

        $scope.btnBook = 'Book Table';
        $scope.btnIcon = 'local_restaurant';

        $scope.btnBookTableSvk = 'Rezervovat Stol';
        $scope.btnBookTableEng = 'Book Table';

        $scope.food1 = 'Soup';
        $scope.food2 = 'Menu 1.';
        $scope.food3 = 'Menu 2.';

        $scope.bookStep1 = true;
        $scope.bookStep2 = false;

        $scope.bookIt = function () {
            $scope.bookStep2 = true;
            $scope.bookStep1 = false;
        };

        $scope.continueBook = function () {
            $scope.bookStep2 = true;
            $scope.bookStep1 = false;
        };
        $scope.bookStepBack = function () {
            $scope.bookStep2 = false;
            $scope.bookStep1 = true;

        };

        $scope.restaurantWelcome = 'Welcome';

        $scope.otvaracieHodiny = 'Hodiny';

        $scope.restaurantSaloniky = 'Salóniky';

        $scope.restaurantSalonik1 = "Ponúka na výčape 8 druhov vlastného piva. Na tabuli je vždy aktuálne jedlo dňa.";
        $scope.restaurantSalonik2 = "Je prvá pivnica v našom pivovare, kde sa dozviete viac o histórii varenia piva v Poprade.";
        $scope.restaurantSalonik3 = "Je druhá pivnica v našom pivovare. Tu sa dozviete, čím sa v tomto dome v minulosti platilo za pivo.";
        $scope.restaurantSalonik4 = "Je spomienkou na firmu Kleinberger & syn, ktorá v minulosti vyrábala v Poprade cca 100 druhov likérov.";
        $scope.restaurantSalonik5 = "Je venovaná láske. Hovorí sa, že ak v nej zaľúbenci spoločne pošúchajú červené srdce v srdci, do roka a do dňa sú svoji i s …";
        $scope.restaurantSalonik6 = 'Je určená pre milovníkov umenia. Vyzdobená je 19 výtvarnými dielami.';
        $scope.restaurantSalonik7 = "Vzdeláva rodokmeňom piva a odhaľuje pivné štýly, ktoré varí sám majiteľ podľa vlastnej tajnej receptúry.";
        $scope.restaurantSalonik8 = "Pripomína najlepších slovenských spevákov. Je jediným fajčiarskym salónikom v našej reštaurácii. ";
        $scope.restaurantSalonik9 = "Celková kapacita reštaurácie je 171 hostí. Každý salónik sa môže rezervovať pre privátnu spoločnosť a uzavrieť. ";

        $scope.restaurantText1 = "Príďte si vychutnať pokojnú atmosféru reštaurácie Tatras, príjemnú obsluhu, skvelé jedlo a „ozajstné pivo“.Radi Vás privítame pri oslave Vášho jubilea, firemnej akcii, svadbe, krstinách... Celková kapacita reštaurácie je 8 miestnosti a 171 hostí. Každý salónik sa môže rezervovať pre privátnu spoločnosť a uzavrieť."
        $scope.restaurantPribehTitle = "Príbeh";
        $scope.restaurantPribehText = "V 90-tych rokoch minulého storočia, po oprave schátraného domu, vzniká v jeho priestore piváreň s názvom „Zvon“. Na výčape ponúka aj čierne pivo, čo bolo v Poprade v tom čase raritou. Piváreň strieda obchod s odevmi. Až potom prichádza myšlienka Reštauračného minipivovaru, teda vynikajúcej reštaurácie, ktorá by podávala i vlastné „ozajstné pivo“. Reštaurácie, ktorá využije bývalé obytné miestnosti starého nemeckého domu, pretvorené na útulné salóniky, ktoré budú mať spoločné črty, ale každý s vlastnou atmosférou a myšlienkou. Reštaurácie, ktorá ponúkne hosťovi niečo nezvyčajné a originálne, kde nájde zákutia na romantiku, obchodné rokovania či priestory pre rôzne akcie.";
        $scope.restaurantPribehText2 = " sa po dvoch rokoch projektovania, búrania, rekonštrukcie, výstavby a zariaďovania, otvára do skúšobnej prevádzky na jeseň 2016. Každý salónik má svoj názov podľa charakteru miestnosti a interiérového vybavenia. Hostia môžu často z pohodlia reštaurácie pozorovať sládka pri práci na varni. Vôňa chmeľu a mladého piva vtedy prenikne i do reštaurácie.„Tu varíme s láskou, koreníme smiechom“ – to je motto moderne vybavenej kuchyne reštaurácie Tatras, v ktorej šéfkuchár Milan Duráni so svojím tímom, pripravuje pre Vás z čerstvých surovín chutné jedlá. Milan Duráni desaťročie šefoval v prestížnych reštauráciach v Nemecku a Taliansku, odkiaľ si priniesol svoje zásady pre vybudovanie dobrej kuchyne – nie polotovary, nie chemické zvýrazňovače chuti, nie prehnane veľa jedál, nie... Kuchári pod jeho vedením vyrábajú vlastné zmesi korenín, omáčky, špaldové cestoviny, pečú vlastný chlieb, varia vlastnú pivnú polievku, miešajú svoju pivnú zmrzlinu.";
        $scope.restaurantPribehText3 = " Pomalým varením pri nízkych teplotách. Varia tak, ako by varili pre seba a svoje deti. Ponúkajú hosťovi možnosť vybrať si a uloviť pstruha z vlastného akvária a vybrať si spôsob, akým ho má kuchyňa pripraviť. Záleží im na čerstvosti a sezónnosti jedálnička. Ponúkané jedlá môžete spojiť s „ozajstným pivom“, a tak spoznať skutočný gurmánsky zážitok.  ";

        $scope.mySlides = [
            './components/assets/imgs/jedlo/_RK_0005.JPG',
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/_RK_0105.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/_RK_5912.JPG',
            './components/assets/imgs/jedlo/licka.JPG',
            './components/assets/imgs/jedlo/_RK_5947.JPG'
        ];

        /// get day name and highlight the day
        function highlightDay() {

            var dateObj = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var n = weekday[dateObj.getDay()];
            $('.' + n).addClass('today');


            var month = dateObj.getUTCMonth() + 1; //months from 1-12
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            var today = day + "." + month + "." + year;

            $scope.istoday = today;
            console.log('today is Day:' + $scope.istoday);
        }
        highlightDay();

    }])
    .controller('pensionCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }

        setTimeout(stopLoading, 2000);

        $rootScope.getCurrentDay();
        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'pension';
        console.log('$rootScope.category: ' + $rootScope.category);
        $rootScope.openMobileMenu = false;
        $scope.categoryName = 'Penzión';

        // TEXTS
        $scope.welcome = 'Vitajte';
        $scope.btnBook = 'Rezervovať Izbu';
        $scope.btnIcon = 'hotel';
        $scope.person = 'osoba';
        $scope.people = 'osoby';
        $scope.night = 'noc';

        $scope.pensionText1 = ' V centre mesta  Poprad, na 1. nadzemnom podlaží budovy Minipivovaru a Reštaurácie Tatras, vedľa Pivných kúpeľov, je umiestnený útulný mini-penzión. Disponuje 4 komfortnými priestrannými izbami, v ktorých môže ubytovať 11 hostí. Ponúka oázu pokoja a dokonalé súkromie.';

        $scope.bookFinnish = false;

        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];


        $scope.bookingSend1 = 'Ďakujeme o Váš záujem, Vaša rezervácia bola odoslaná';
        $scope.bookingSend2 = 'Budeme Vás kontaktovať pre potvrdenie rezervácie.';

        $scope.nameLabel = 'Meno';
        $scope.yourName = 'Vaše Meno';
        $scope.phoneLabel = 'Telefón';
        $scope.amountLabel = 'Počet';
        $scope.checkinLabel = 'Príchod';
        $scope.checkoutLabel = 'Odchod';

        $scope.url = 'bookPenzion.php';

        $scope.formsubmit = function () {

            console.log('$scope.checkin ' + $scope.checkin);
            console.log('$scope.checkout ' + $scope.checkout);
            console.log('$scope.amount ' + $scope.amount);

            console.log("checkin: " + $scope.checkin + " checkout: " + $scope.checkout + " amount: " + $scope.amount +
                " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone);

            $http.post($scope.url, {"checkin": $scope.checkin, "checkout": $scope.checkout, "amount": $scope.amount,
                "name": $scope.name, "email": $scope.email, "phone": $scope.phone})
                .success(function (data, status) {


                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element

                    console.log('poslane: ' + $scope.result);
                    console.log('status > ' + $scope.status);

                    $scope.bookFinnish = true;
                })


        };


    }])
    .controller('pensionCtrlEng', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.getCurrentDay();
        // set Language
        $rootScope.lang = 'eng';
        // set Category
        $rootScope.category = 'pension';
        console.log('$rootScope.category: ' + $rootScope.category);

        $scope.categoryName = 'Pension';

        // TEXTS
        $scope.btnBook = 'Book a Room';
        $scope.btnIcon = 'hotel';
        $scope.person = 'person';
        $scope.people = 'people';
        $scope.night = 'night';

        $scope.pensionText1 = ' V centre mesta  Poprad, na 1. nadzemnom podlaží budovy Minipivovaru a Reštaurácie Tatras, vedľa Pivných kúpeľov, je umiestnený útulný mini-penzión. Disponuje 4 komfortnými priestrannými izbami, v ktorých môže ubytovať 11 hostí. Ponúka oázu pokoja a dokonalé súkromie.';

        $scope.bookStep1 = true;
        $scope.bookStep2 = false;

        $scope.bookIt = function () {
            $scope.bookStep2 = true;
            $scope.bookStep1 = false;
        };
        $scope.continueBook = function () {
            $scope.bookStep2 = true;
            $scope.bookStep1 = false;
        };
        $scope.bookStepBack = function () {
            $scope.bookStep2 = false;
            $scope.bookStep1 = true;
        };

        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];
    }])
    .controller('spaCrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
            $rootScope.getCurrentDay();

        // set Loading
        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 1000);

            // set Language
            $rootScope.lang = 'svk';
            // set Category
            $rootScope.category = 'spa';
            console.log('$rootScope.category: ' + $rootScope.category);

            $scope.categoryName = 'Pivné kúpele';

            $scope.perfectRelax = 'Dokonalý relax';

            // TEXTS
            $scope.btnBook = 'Rezervovať';
            $scope.btnIcon = 'spa';

            $scope.spaText1 = 'Kde inde by mali byť pivné kúpele, keď nie priamo v pivovare? Pivný kúpeľ bol už v stredoveku obľúbenou a účinnou terapiou. Využíva prírodné suroviny – chmeľ, výťažok z pivovarského mláta, kvasinky. Má liečivé účinky a je vynikajúcou prevenciou pred ochorením. Pivný kúpeľ prečisťuje pokožku, má ozdravný účinok na vlasy i pleť, uvoľňuje svaly, podporí Váš imunitný systém. Pivné kvasnice a látky obsiahnuté v pive odovzdávajú Vášmu telu celý rad B vitamínov. Proteíny a minerály prispievajú k celkovému zvláčneniu a renegerácií pokožky s omladzujúcim efektom, liečia akné a celulitídu. Priestor pivných kúpeľov poteší moderným interiérom nielen Vaše oko. Osviežia Vás očistné procesy, ktoré si môžete v tomto príjemnom prostredí vychutnať.';
            $scope.spaTitle2 = 'Špeciálna procedúra';

            $scope.spaUl = 'Tato kúpeľnícka procedúra zahŕňa:';
            $scope.spaLi1 = 'chmeľová suchá sauna, kde chmeľové silice vitalizujú a uvoľňujú kožné póry, prehriatím sa odplavia z tela škodlivé látky';
            $scope.spaLi2 = 'ochladenie pod studeným vedrom vody alebo v studenej kadi';
            $scope.spaLi3 = 'pivný vaňový perličkový kúpeľ s neobmedzenou konzumáciou dobre vychladeného kvasnicového piva Tatras, ktoré si sami načapujete. Kvasnicové pivo obsahuje živé kultúry pivovarských kvasníc, ktoré priaznivo pôsobia na tráviaci trakt. Liečba tak pôsobí nielen zvonku, ale i zvnútra. Pivo môžete zajesť čerstvým domácim pivným chlebom s masťou. Teplota kúpeľa je 38 °C';
            $scope.spaLi4 = 'odpočinok na lôžku z pravej pšeničnej slamy, kde dochádza k uvoľneniu napätia, únavy a stresu.';

            $scope.spaTitle3 = 'Odporúčame Vám ';
            $scope.spaText3 = 'Odpočinok podporí vstrebávanie vitamínov a extraktov z predchádzajúceho kúpeľa.Pre dlhodobejší účinok sa odporúča byť niekoľko hodín bez opláchnutia alebo sprchy.Zažite ten pravý pivný kúpeľ pre dvoch v jednej vani. Na tento zážitok určite nezabudnete. Ležíte vo vani a môžete si, len tak mimochodom, načapovať pivo. Nie je to báječné? K dispozícii sú štyri vane či už pre jednotlivcov alebo pre pár. Kapacita pivných kúpeľov je max. 8 osôb. Ako doplnok sa ponúka masáž, zábal alebo maska z pivovarských kvasníc. Odporúčame Vám vypnúť mobil a myseľ a maximálne sa uvoľniť. So sebou si nič brať nemusíte. O všetko sa postaráme my (uteráky, plachty, prezuvky...). Celý priestor kúpeľov bude počas procedúry súkromný - iba Váš. Naša obsluha Vás iba uvedie, všetko vysvetlí a už Vás nikto nebude rušiť. Pivné kúpele neodporúčame tehotným ženám, ľuďom s vysokým krvným tlakom, chorobami srdca a otvorenými kožnými chorobami. Osoby alergické na bielkoviny, kvasnice či chmeľ by sa mali pred pivným kúpeľom poradiť s lekárom.';

            $scope.bookFinnish = false;

            $scope.mySlides = [
                './components/assets/imgs/jedlo/kolacik.jpg',
                './components/assets/imgs/jedlo/loparik.jpg',
                './components/assets/imgs/jedlo/rebra.JPG',
                './components/assets/imgs/jedlo/polievka.jpg',
                './components/assets/imgs/jedlo/licka.JPG'
            ];

        $scope.bookingSend1 = 'Ďakujeme o Váš záujem, Vaša rezervácia bola odoslaná';
        $scope.bookingSend2 = 'Budeme Vás kontaktovať pre potvrdenie rezervácie.';

        $scope.nameLabel = 'Meno';
        $scope.yourName = 'Vaše Meno';
        $scope.phoneLabel = 'Telefón';
        $scope.timeLabel = 'Čas';
        $scope.dateLabel = 'Dátum';
        $scope.amountLabel = 'Počet';
        $scope.treatmentLabel = 'Procedúra';

        $scope.termin = '10:00';

        $scope.spaPrice1 = '30';
        $scope.spaPrice2 = '50';
        $scope.spaPrice3 = '60';
        $scope.spaPrice4 = '80';
        $scope.spaPrice5 = '90';
        $scope.spaPrice6 = '95';
        $scope.spaPrice7 = '105';
        $scope.spaPrice8 = '120';
        $scope.spaPrice9 = '125';
        $scope.spaPrice10 = '130';
        $scope.spaPrice11 = '140';
        $scope.spaPrice12 = '155';
        $scope.spaPrice13 = '175';
        $scope.spaPrice14= '185';

        $scope.saunaPrice1= '10';
        $scope.saunaPrice2= '16';
        $scope.saunaPrice3= '24';
        $scope.saunaPrice4= '32';
        $scope.saunaPrice5= '40';


        $scope.spaPrices = false;
        $scope.showPrice = function () {
            $scope.spaPrices = !$scope.spaPrices;
        };
        $scope.saunaPrices = false;
        $scope.showPriceSauna = function () {
            $scope.saunaPrices = !$scope.saunaPrices;
        };

        $scope.url = 'bookSpa.php';

        $scope.formsubmit = function () {


            console.log('$scope.treatment ' + $scope.treatment);
            console.log('$scope.date ' + $scope.date);
            console.log('$scope.termin ' + $scope.termin);
            console.log('$scope.amount ' + $scope.amount);
            console.log('$scope.amount2 ' + $scope.amount2);
            console.log('$scope.text ' + $scope.text);


            // if treatment = Kupele
            if($scope.treatment == 1) {
                $scope.treatment = 'Pivne Kupele';

                if($scope.amount == 1 && $scope.amount2 == 1){
                    $scope.finalPrice = $scope.spaPrice1;
                }
                if($scope.amount == 2 && $scope.amount2 == 1){
                    $scope.finalPrice = $scope.spaPrice2;
                }
                if($scope.amount == 2 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice3;
                }
                if($scope.amount == 3 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice4;
                }
                if($scope.amount == 3 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice5;
                }
                if($scope.amount == 4 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice6;
                }
                if($scope.amount == 4 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice7;
                }
                if($scope.amount == 4 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice8;
                }
                if($scope.amount == 5 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice9;
                }
                if($scope.amount == 5 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice10;
                }
                if($scope.amount == 6 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice11;
                }
                if($scope.amount == 6 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice12;
                }
                if($scope.amount == 7 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice13;
                }
                if($scope.amount == 8 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice14;
                }

                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);

            } /// if Sauna
            else if ($scope.treatment == 2) {
                $scope.treatment = 'Sauna';
                if($scope.amount == 1 ){
                    $scope.finalPrice = $scope.saunaPrice1;
                }
                if($scope.amount == 2 ){
                    $scope.finalPrice = $scope.saunaPrice2;
                }
                if($scope.amount == 3 ){
                    $scope.finalPrice = $scope.saunaPrice3;
                }
                if($scope.amount == 4 ){
                    $scope.finalPrice = $scope.saunaPrice4;
                }
                if($scope.amount == 5 ){
                    $scope.finalPrice = $scope.saunaPrice5;
                }
                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);
            }


            console.log("date: " + $scope.date + " termin: " + $scope.termin + " amount: " + $scope.amount +
                " amount2: " + $scope.amount2 + " price: " + $scope.finalPrice + " name: " + $scope.name +
                " email: " + $scope.email + " phone: " + $scope.phone + " text:" + $scope.text);

            $http.post($scope.url, {"date": $scope.date, "termin": $scope.termin, "treatment": $scope.treatment, "amount": $scope.amount,
                "amount2": $scope.amount2, "finalPrice": $scope.finalPrice, "name": $scope.name, "email": $scope.email,
                "phone": $scope.phone, "text" : $scope.text})
                .success(function (data, status) {

                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element

                    console.log('poslane: ' + $scope.result);
                    console.log('status > ' + $scope.status);

                    $scope.bookFinnish = true;
                })
        };

        }])
    .controller('spaCrlEng', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
        $rootScope.getCurrentDay();

        // set Language
        $rootScope.lang = 'eng';
        // set Category
        $rootScope.category = 'spa';
        console.log('$rootScope.category: ' + $rootScope.category);

        $scope.categoryName = 'Beer Wellness';


        // TEXTS
        $scope.perfectRelax = 'Perfect Relax';
        $scope.btnBook = 'Book NOW';
        $scope.btnIcon = 'spa';

        $scope.spaText1 = 'Kde inde by mali byť pivné kúpele, keď nie priamo v pivovare? Pivný kúpeľ bol už v stredoveku obľúbenou a účinnou terapiou. Využíva prírodné suroviny – chmeľ, výťažok z pivovarského mláta, kvasinky. Má liečivé účinky a je vynikajúcou prevenciou pred ochorením. Pivný kúpeľ prečisťuje pokožku, má ozdravný účinok na vlasy i pleť, uvoľňuje svaly, podporí Váš imunitný systém. Pivné kvasnice a látky obsiahnuté v pive odovzdávajú Vášmu telu celý rad B vitamínov. Proteíny a minerály prispievajú k celkovému zvláčneniu a renegerácií pokožky s omladzujúcim efektom, liečia akné a celulitídu. Priestor pivných kúpeľov poteší moderným interiérom nielen Vaše oko. Osviežia Vás očistné procesy, ktoré si môžete v tomto príjemnom prostredí vychutnať.';
        $scope.spaTitle2 = 'Špeciálna procedúra';

        $scope.spaUl = 'Tato kúpeľnícka procedúra zahŕňa:';
        $scope.spaLi1 = 'chmeľová suchá sauna, kde chmeľové silice vitalizujú a uvoľňujú kožné póry, prehriatím sa odplavia z tela škodlivé látky';
        $scope.spaLi2 = 'ochladenie pod studeným vedrom vody alebo v studenej kadi';
        $scope.spaLi3 = 'pivný vaňový perličkový kúpeľ s neobmedzenou konzumáciou dobre vychladeného kvasnicového piva Tatras, ktoré si sami načapujete. Kvasnicové pivo obsahuje živé kultúry pivovarských kvasníc, ktoré priaznivo pôsobia na tráviaci trakt. Liečba tak pôsobí nielen zvonku, ale i zvnútra. Pivo môžete zajesť čerstvým domácim pivným chlebom s masťou. Teplota kúpeľa je 38 °C';
        $scope.spaLi4 = 'odpočinok na lôžku z pravej pšeničnej slamy, kde dochádza k uvoľneniu napätia, únavy a stresu.';

        $scope.spaTitle3 = 'Odporúčame Vám ';
        $scope.spaText3 = 'Odpočinok podporí vstrebávanie vitamínov a extraktov z predchádzajúceho kúpeľa.Pre dlhodobejší účinok sa odporúča byť niekoľko hodín bez opláchnutia alebo sprchy.Zažite ten pravý pivný kúpeľ pre dvoch v jednej vani. Na tento zážitok určite nezabudnete. Ležíte vo vani a môžete si, len tak mimochodom, načapovať pivo. Nie je to báječné? K dispozícii sú štyri vane či už pre jednotlivcov alebo pre pár. Kapacita pivných kúpeľov je max. 8 osôb. Ako doplnok sa ponúka masáž, zábal alebo maska z pivovarských kvasníc. Odporúčame Vám vypnúť mobil a myseľ a maximálne sa uvoľniť. So sebou si nič brať nemusíte. O všetko sa postaráme my (uteráky, plachty, prezuvky...). Celý priestor kúpeľov bude počas procedúry súkromný - iba Váš. Naša obsluha Vás iba uvedie, všetko vysvetlí a už Vás nikto nebude rušiť. Pivné kúpele neodporúčame tehotným ženám, ľuďom s vysokým krvným tlakom, chorobami srdca a otvorenými kožnými chorobami. Osoby alergické na bielkoviny, kvasnice či chmeľ by sa mali pred pivným kúpeľom poradiť s lekárom.';

        $scope.bookStep3 = false;

        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];


        $scope.todayDate  = function() {
            Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            });

            $scope.currentDay = new Date().toDateInputValue();
            $scope.day = $scope.currentDay;
        };

        $scope.todayDate();

        console.log($scope.currentDay);

        $scope.bookingSend1 = 'Dakujeme o Vas zaujem, Vasa rezervacia bola odoslana';
        $scope.bookingSend2 = 'Budeme Vas kontaktovat pre potvrdenie rezervacie.';

        $scope.nameLabel = 'Meno';
        $scope.yourName = 'Vaše Meno';
        $scope.phoneLabel = 'Telefón';
        $scope.amountLabel = 'Počet';
        $scope.checkinLabel = 'Príchod';
        $scope.checkoutLabel = 'Odchod';

        $scope.url = 'bookPension.php';
        $scope.formsubmit = function () {

            $scope.formatDate = $scope.date.toLocaleDateString('sk-SK');
            $scope.formatTime = $scope.timer.toLocaleTimeString('sk-SK');

            console.log("date: " + $scope.formatDate + " timer: " + $scope.formatTime + " amount: " + $scope.amount +
                " room: " + $scope.room + " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone);

            $http.post($scope.url, {"date": $scope.formatDate, "timer": $scope.timer, "amount": $scope.amount,
                "room": $scope.room, "name": $scope.name, "email": $scope.email, "phone": $scope.phone})
                .success(function (data, status) {


                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element

                    console.log('poslane: ' + $scope.result);
                    console.log('status > ' + $scope.status);

                    $scope.bookFinnish = true;
                })


        };

    }])
    .controller('shopCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
        $rootScope.getCurrentDay();

        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'shop';
        console.log('$rootScope.category: ' + $rootScope.category);

        $scope.isHome = true;
        $scope.categoryName = 'Predajnička';

        // TEXTS
        $scope.btnBook = 'Zavolajte';
        $scope.btnIcon = 'call';

        $scope.shopText1 = 'V našej predajničke nájdete pivá nášho minipivovaru Tatras, ktoré sú vhodné na každú príležitosť. Všetky sú kvasinkové, nefiltrované a nepasterizované. Okrem pív v predajničke ponúkame náš špeciálny pivný destilát – pivovicu Jacobus Emerici, vybrané slovenské vína, alkohol.';

        $scope.shopTitle1 = 'Vítame Vás';
        $scope.shopText2 = 'Na pamiatku Vašej návštevy u nás a pre zberateľov máme pripravené krásne suveníry - pivové poháre, pivné tácky, etikety nášho minipivovaru, pivnú kozmetiku.Samozrejmosťou je zaslanie vybraného tovaru na Vašu adresu. ';
        $scope.shopText3 = 'Veríme že chuťová rôznorodosť, neopakovateľná vôňa a charakter naších pív Vám ponúkne skutočný zážitok. Doprajte si aj pôžitok z nášho čapovaného „ozajstného piva“.  Všetci z nás niekedy niečo slávia. Na záhrade, v altánku či v lese na guláši. Viete akú môžete urobiť radosť priateľom, ak si budú môcť načapovať pivo sami? Požičajte si naše výčapne zariadenie domov. K nemu si vyberte z naších ôsmich druhov ozajstného piva súdok a užívajte svet!';
        $scope.shopTitle2 = 'Skutočný zážitok';

        $scope.bookStep1 = true;
        $scope.bookStep2 = false;

        $scope.bookIt = function () {
            $scope.bookStep2 = true;
            $scope.bookStep1 = false;
        };
        $scope.bookStepBack = function () {
            $scope.bookStep2 = false;
            $scope.bookStep1 = true;
        };
        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];

    }])
    .controller('shopCtrlEng', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
        $rootScope.getCurrentDay();

        // set Language
        $rootScope.lang = 'eng';
        // set Category
        $rootScope.category = 'shop';
        console.log('$rootScope.category: ' + $rootScope.category);

        $scope.isHome = true;
        $scope.categoryName = 'Shop';

        // TEXTS
        $scope.btnBook = 'Call Us Now';
        $scope.btnIcon = 'call';

        $scope.shopTitle1 = 'Welcome';
        $scope.shopText1 = 'V našej predajničke nájdete pivá nášho minipivovaru Tatras, ktoré sú vhodné na každú príležitosť. Všetky sú kvasinkové, nefiltrované a nepasterizované. Okrem pív v predajničke ponúkame náš špeciálny pivný destilát – pivovicu Jacobus Emerici, vybrané slovenské vína, alkohol.';

        $scope.shopText2 = 'Na pamiatku Vašej návštevy u nás a pre zberateľov máme pripravené krásne suveníry - pivové poháre, pivné tácky, etikety nášho minipivovaru, pivnú kozmetiku.Samozrejmosťou je zaslanie vybraného tovaru na Vašu adresu. ';
        $scope.shopText3 = 'Veríme že chuťová rôznorodosť, neopakovateľná vôňa a charakter naších pív Vám ponúkne skutočný zážitok. Doprajte si aj pôžitok z nášho čapovaného „ozajstného piva“.  Všetci z nás niekedy niečo slávia. Na záhrade, v altánku či v lese na guláši. Viete akú môžete urobiť radosť priateľom, ak si budú môcť načapovať pivo sami? Požičajte si naše výčapne zariadenie domov. K nemu si vyberte z naších ôsmich druhov ozajstného piva súdok a užívajte svet!';
        $scope.shopTitle2 = 'True experience';

        $scope.bookStep1 = true;
        $scope.bookStep2 = false;

        $scope.bookIt = function () {
            $scope.bookStep2 = true;
            $scope.bookStep1 = false;
        };
        $scope.bookStepBack = function () {
            $scope.bookStep2 = false;
            $scope.bookStep1 = true;
        };
        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];

    }])
    .controller('help', function ($scope, $http, $log, promiseTracker, $timeout) {
        $scope.subjectListOptions = {
            'bug': 'Report a Bug',
            'account': 'Account Problems',
            'mobile': 'Mobile',
            'user': 'Report a Malicious User',
            'other': 'Other'
        };

        // Inititate the promise tracker to track form submissions.
        $scope.progress = promiseTracker();

        // Form submit handler.
        $scope.submit = function(form) {


            $scope.step3 = function () {
                $scope.bookStep3 = true;
                $scope.bookStep2 = false;
                $scope.bookStep1 = false;
            };

            $scope.step3();


            // Trigger validation flag.
            $scope.submitted = true;

            // If form is invalid, return and let AngularJS show validation errors.
            if (form.$invalid) {
                return;
            }

            // Default values for the request.
            var config = {
                params : {
                    'callback' : 'JSON_CALLBACK',
                    'name' : $scope.name,
                    'email' : $scope.email,
                    'subjectList' : $scope.subjectList,
                    'comments' : $scope.comments
                },
            };

            // Perform JSONP request.
            var $promise = $http.jsonp('response.json', config)
                .success(function(data, status, headers, config) {
                    if (data.status == 'OK') {
                        $scope.name = null;
                        $scope.email = null;
                        $scope.phone = null;
                        $scope.amount = null;
                        $scope.checkin = null;
                        $scope.checkout = null;

                        $scope.messages = 'Your form has been sent!';
                        $scope.submitted = false;
                    } else {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                        $log.error(data);
                    }
                })
                .error(function(data, status, headers, config) {
                    $scope.progress = data;
                    $scope.messages = 'There was a network error. Try again later.';
                    $log.error(data);
                })
                .finally(function() {
                    // Hide status messages after three seconds.
                    $timeout(function() {
                        $scope.messages = null;
                    }, 3000);
                });

            // Track the request and show its progress to the user.
            $scope.progress.addPromise($promise);
        };
    })
    // .controller('bookTable', function ($scope, $http, $log, promiseTracker, $timeout) {
    //     $scope.subjectListOptions = {
    //         'bug': 'Report a Bug',
    //         'account': 'Account Problems',
    //         'mobile': 'Mobile',
    //         'user': 'Report a Malicious User',
    //         'other': 'Other'
    //     };
    //
    //     // Inititate the promise tracker to track form submissions.
    //     $scope.progress = promiseTracker();
    //
    //     // Form submit handler.
    //     $scope.submit = function(form) {
    //
    //
    //         $scope.step3 = function () {
    //             $scope.bookStep3 = true;
    //             $scope.bookStep2 = false;
    //             $scope.bookStep1 = false;
    //         };
    //
    //         $scope.step3();
    //
    //
    //         // Trigger validation flag.
    //         $scope.submitted = true;
    //
    //         // If form is invalid, return and let AngularJS show validation errors.
    //         if (form.$invalid) {
    //             return;
    //         }
    //
    //         // Default values for the request.
    //         var config = {
    //             params : {
    //                 'callback' : 'JSON_CALLBACK',
    //                 'name' : $scope.name,
    //                 'email' : $scope.email,
    //                 'subjectList' : $scope.subjectList,
    //                 'comments' : $scope.comments
    //             }
    //         };
    //
    //         // Perform JSONP request.
    //         var $promise = $http.jsonp('response.json', config)
    //             .success(function(data, status, headers, config) {
    //                 if (data.status == 'OK') {
    //                     $scope.name = null;
    //                     $scope.email = null;
    //                     $scope.phone = null;
    //                     $scope.amount = null;
    //                     $scope.checkin = null;
    //                     $scope.checkout = null;
    //
    //                     $scope.messages = 'Your form has been sent!';
    //                     $scope.submitted = false;
    //                 } else {
    //                     $scope.messages = 'Oops, we received your request, but there was an error processing it.';
    //                     $log.error(data);
    //                 }
    //             })
    //             .error(function(data, status, headers, config) {
    //                 $scope.progress = data;
    //                 $scope.messages = 'There was a network error. Try again later.';
    //                 $log.error(data);
    //             })
    //             .finally(function() {
    //                 // Hide status messages after three seconds.
    //                 $timeout(function() {
    //                     $scope.messages = null;
    //                 }, 3000);
    //             });
    //
    //         // Track the request and show its progress to the user.
    //         $scope.progress.addPromise($promise);
    //     };
    // })
    // .controller('bookSpa', function ($scope, $http, $log, promiseTracker, $timeout) {
    //     $scope.subjectListOptions = {
    //         'bug': 'Report a Bug',
    //         'account': 'Account Problems',
    //         'mobile': 'Mobile',
    //         'user': 'Report a Malicious User',
    //         'other': 'Other'
    //     };
    //
    //
    //     $scope.$watch('amount', function() {
    //
    //         if($scope.amount == 1) {
    //             alert('1');
    //         }else if($scope.amount == 2) {
    //             alert('2');
    //         } else {
    //             alert('huh');
    //         }
    //
    //     });
    //
    //     // Inititate the promise tracker to track form submissions.
    //     $scope.progress = promiseTracker();
    //
    //
    //     // Form submit handler.
    //     $scope.submit = function(form) {
    //
    //
    //         $scope.step3 = function () {
    //             $scope.bookStep3 = true;
    //             $scope.bookStep2 = false;
    //             $scope.bookStep1 = false;
    //         };
    //
    //         $scope.step3();
    //
    //
    //         // Trigger validation flag.
    //         $scope.submitted = true;
    //
    //         // If form is invalid, return and let AngularJS show validation errors.
    //         if (form.$invalid) {
    //             return;
    //         }
    //
    //         // Default values for the request.
    //         var config = {
    //             params : {
    //                 'callback' : 'JSON_CALLBACK',
    //                 'name' : $scope.name,
    //                 'email' : $scope.email,
    //                 'subjectList' : $scope.subjectList,
    //                 'comments' : $scope.comments
    //             }
    //         };
    //
    //
    //
    //
    //
    //
    //         // Perform JSONP request.
    //         var $promise = $http.jsonp('response.json', config)
    //             .success(function(data, status, headers, config) {
    //                 if (data.status == 'OK') {
    //                     $scope.name = null;
    //                     $scope.email = null;
    //                     $scope.phone = null;
    //                     $scope.amount = null;
    //                     $scope.checkin = null;
    //                     $scope.checkout = null;
    //
    //                     $scope.messages = 'Your form has been sent!';
    //                     $scope.submitted = false;
    //                 } else {
    //                     $scope.messages = 'Oops, we received your request, but there was an error processing it.';
    //                     $log.error(data);
    //                 }
    //             })
    //             .error(function(data, status, headers, config) {
    //                 $scope.progress = data;
    //                 $scope.messages = 'There was a network error. Try again later.';
    //                 $log.error(data);
    //             })
    //             .finally(function() {
    //                 // Hide status messages after three seconds.
    //                 $timeout(function() {
    //                     $scope.messages = null;
    //                 }, 3000);
    //             });
    //
    //         // Track the request and show its progress to the user.
    //         $scope.progress.addPromise($promise);
    //     };
    // })

    .controller('adminCtrlSvk', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        $rootScope.getCurrentDay();
        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'admin';
        console.log('$rootScope.category: ' + $rootScope.category);
        $rootScope.openMobileMenu = false;
        $scope.categoryName = 'Admin';

        $scope.adminLogin = true;
        $scope.adminCenter = false;
        $scope.adminUser = 'w@w.w';
        $scope.adminPass = 'w';

        $scope.food1 = 'Polievka';
        $scope.food2 = 'Menu 1.';
        $scope.food3 = 'Menu 2.';


        $scope.logMeIn = function () {
            console.log('--email--');
            console.log($scope.loginEmail);
            console.log('--pass--');
            console.log($scope.loginPass);

            if($scope.loginEmail === $scope.adminUser) {
                console.log('MSG: good-email');

                if($scope.loginPass === $scope.adminPass) {
                    console.log('MSG: good-pass');
                    /// open dashboard
                    $scope.adminCenter = true;
                    /// close Login
                    $scope.adminLogin = false;
                } else {
                    console.log('ERROR: wrong-pass');
                    $scope.adminCenter = false;
                    $scope.adminLogin = true;
                    return;
                }

            }else {
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



    }])

    .directive('splashScreen', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            link: function (scope, elem, attr) {
                // fade it out for 300 milliseconds (see css)
                elem.addClass('_splash_fade_out');

                // remove splash screen after animation is completed
                $timeout(function () {
                    elem.remove();
                    scope = elem = attr = null;
                }, 5000);
            }
        }
    }])
    .directive('testClick', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.onclick = function() {
                    alert('click');
                }
            }
        }
    })
    .run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location) {

        $rootScope.$on( "$routeChangeStart", function(event, next) {

            var nextLocation = JSON.stringify(next.originalPath);
            //console.log('nextLocation' + nextLocation);

            var urlMatch = nextLocation.includes($rootScope.category);
            if(urlMatch) {
                console.log('url match');
            }else {
                console.log('url not match');
                window.scrollTo(0, 0);
            }
        });
    }]);

