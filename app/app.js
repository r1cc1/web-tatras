'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'duScroll',
    'angular-flexslider',
    'ngMdIcons',
    'ajoslin.promise-tracker'

])
    .value('duScrollDuration', 1000)
    .value('duScrollOffset', 0)

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        //$locationProvider.hashPrefix('#');

        $routeProvider.when('/home', {
            controller: 'mainCtrl'
        });

        $routeProvider.when('/home/svk', {
            templateUrl: 'templates/index.html',
            controller: 'homeCtrl'
        });
        $routeProvider.when('/home/eng', {
            templateUrl: 'templates/index.html',
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

        $routeProvider.otherwise({redirectTo: '/home/svk'});
    }])
    .controller('mainCtrl', ['$scope', '$location', '$rootScope', '$window', function ($scope, $location, $rootScope, $window) {

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

            $scope.teaserHeight = viewportheight/2;
        }

        function onScroll() {
            var scroll = $(window).scrollTop();
            //console.log("scroll: " + scroll);
            if (scroll >= $scope.displayHeight) {
                $scope.subMenuState = true;
                $scope.$apply();
            }else {
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
            $rootScope.currentDay = n;
            console.log('Current Day:' + $rootScope.currentDay);
        };


        $(window).scroll(function () {
            onScroll();
        });

        $(document).ready(function () {
            getWindowHeight();
            $rootScope.getCurrentDay();
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

                $rootScope.openHours = 'Otvaracie Hodiny';
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
        }



    }])
    .controller('homeCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
        $rootScope.getCurrentDay();

        $scope.isHome = true;

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

        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'restaurant';
        console.log('$rootScope.category: ' + $rootScope.category);

        $rootScope.openMobileMenu = false;


        $scope.categoryName = 'Reštaurácia';


        $scope.btnBook = 'Rezervovať Stôl';
        $scope.btnIcon = 'local_restaurant';

        $scope.btnBookTableSvk = 'Rezervovať Stôl';
        $scope.btnBookTableEng = 'Book Table';

        $scope.bookFinnish = false;

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

        $scope.restaurantText1 = "Príďte si vychutnať pokojnú atmosféru reštaurácie Tatras, príjemnú obsluhu, skvelé jedlo a „ozajstné pivo“.Radi Vás privítame pri oslave Vášho jubilea, firemnej akcii, svadbe, krstinách..."
        $scope.restaurantPribehTitle = "Príbeh";
        $scope.restaurantPribehText = "V 90-tych rokoch minulého storočia, po oprave schátraného domu, vzniká v jeho priestore piváreň s názvom „Zvon“. Na výčape ponúka aj čierne pivo, čo bolo v Poprade v tom čase raritou. Piváreň strieda obchod s odevmi. Až potom prichádza myšlienka Reštauračného minipivovaru, teda vynikajúcej reštaurácie, ktorá by podávala i vlastné „ozajstné pivo“. Reštaurácie, ktorá využije bývalé obytné miestnosti starého nemeckého domu, pretvorené na útulné salóniky, ktoré budú mať spoločné črty, ale každý s vlastnou atmosférou a myšlienkou. Reštaurácie, ktorá ponúkne hosťovi niečo nezvyčajné a originálne, kde nájde zákutia na romantiku, obchodné rokovania či priestory pre rôzne akcie.";
        $scope.restaurantPribehText2 = " sa po dvoch rokoch projektovania, búrania, rekonštrukcie, výstavby a zariaďovania, otvára do skúšobnej prevádzky na jeseň 2016. Každý salónik má svoj názov podľa charakteru miestnosti a interiérového vybavenia. Hostia môžu často z pohodlia reštaurácie pozorovať sládka pri práci na varni. Vôňa chmeľu a mladého piva vtedy prenikne i do reštaurácie.„Tu varíme s láskou, koreníme smiechom“ – to je motto moderne vybavenej kuchyne reštaurácie Tatras, v ktorej šéfkuchár Milan Duráni so svojím tímom, pripravuje pre Vás z čerstvých surovín chutné jedlá. Milan Duráni desaťročie šefoval v prestížnych reštauráciach v Nemecku a Taliansku, odkiaľ si priniesol svoje zásady pre vybudovanie dobrej kuchyne – nie polotovary, nie chemické zvýrazňovače chuti, nie prehnane veľa jedál, nie... Kuchári pod jeho vedením vyrábajú vlastné zmesi korenín, omáčky, špaldové cestoviny, pečú vlastný chlieb, varia vlastnú pivnú polievku, miešajú svoju pivnú zmrzlinu.";
        $scope.restaurantPribehText3 = " Pomalým varením pri nízkych teplotách. Varia tak, ako by varili pre seba a svoje deti. Ponúkajú hosťovi možnosť vybrať si a uloviť pstruha z vlastného akvária a vybrať si spôsob, akým ho má kuchyňa pripraviť. Záleží im na čerstvosti a sezónnosti jedálnička. Ponúkané jedlá môžete spojiť s „ozajstným pivom“, a tak spoznať skutočný gurmánsky zážitok.  ";

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

        ///Menu
        ///MOnday
        $scope.menuMonday1 = "Hrachová";
        $scope.menuMonday1alergen = "(1,7)";
        $scope.menuMonday2 = "Grilovaná krkovička na zelenom korení s pečenými zemiakmi";
        $scope.menuMonday2alergen = "";
        $scope.menuMonday3 = "Miešaný šalát s kúskami lososa a so smotanovo-citrónovým drezingom";
        $scope.menuMonday3alergen = "(7)";

        $scope.menuTuesday1 = "Cesnaková so syrom";
        $scope.menuTuesday1alergen = "(7)";
        $scope.menuTuesday2 = "Morčací rezeň v zemiakovom cestičku so štuchanými zemiakmi";
        $scope.menuTuesday2alergen = "(1,3,7)";
        $scope.menuTuesday3 = "Penne so šalotkou, syrovou omáčkou a polničkom";
        $scope.menuTuesday3alergen = "(1,3,7)";

        $scope.menuWednesday1 = "Hovädzí vývar so zeleninkou a celestínskymi rezankami";
        $scope.menuWednesday1alergen = "(1,3,7)";
        $scope.menuWednesday2 = "Jemne pikantné fašírky na tuniakovej omáčke s varenými zemiakmi a s jarnou oblohou ";
        $scope.menuWednesday2alergen = "(1,3,7)";
        $scope.menuWednesday3 = "Hubové rizoto s parmezánom a rukolou";
        $scope.menuWednesday3alergen = "(7)";

        $scope.menuThursday1 = "S listového špenátu s krutónmi";
        $scope.menuThursday1alergen = "(7)";
        $scope.menuThursday2 = "Znojemská hovädzia pečienka s tarhoňou";
        $scope.menuThursday2alergen = "(1)";
        $scope.menuThursday3 = "Špagety s červenou cibuľou, repkovým olejom, sušenými paradajkami, kapary, jemným chilli a parmezánom  ";
        $scope.menuThursday3alergen = "(1,3,7)";

        $scope.menuFriday1 = "Fazuľová s údeným mäsom";
        $scope.menuFriday1alergen = "(9)";
        $scope.menuFriday2 = "Bravčová plnená panenka s kyslou kapustou a domácou parenou knedlou";
        $scope.menuFriday2alergen = "(1,3,7)";
        $scope.menuFriday3 = "Miešaný šalát s kúskami vyprážaného ementálu, hermelínu, nivou a brusnicami";
        $scope.menuFriday3alergen = "(1,3,7)";


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
        $scope.timeLabel = 'Čas';
        $scope.dateLabel = 'Dátum';
        $scope.amountLabel = 'Počet';
        $scope.roomLabel = 'Miestnost';

        $scope.room = 'nezalezi';

        $scope.url = 'bookRestaurant.php';
        $scope.formsubmit = function () {

            $scope.formatDate = $scope.date.toLocaleDateString('sk-SK');
            $scope.formatTime = $scope.timer.toLocaleTimeString('sk-SK');

            console.log("date: " + $scope.formatDate + " timer: " + $scope.formatTime + " amount: " + $scope.amount +
                " room: " + $scope.room + " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone);

            $http.post($scope.url, {"date": $scope.formatDate, "timer": $scope.formatTime, "amount": $scope.amount,
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
            $('.' + n).addClass('today');
            $scope.currentDay = n;


            if ($scope.currentDay == 'Tuesday') {
                $('div.daily-menu-item.Monday').hide('fast');
            }
            if ($scope.currentDay == 'Wednesday') {
                $('div.daily-menu-item.Monday').hide('fast');
                $('div.daily-menu-item.Tuesday').hide('fast');
            }
            if ($scope.currentDay == 'Thursday') {
                $('div.daily-menu-item.Monday').hide('fast');
                $('div.daily-menu-item.Tuesday').hide('fast');
                $('div.daily-menu-item.Wednesday').hide('fast');
            }
            if ($scope.currentDay == 'Friday') {
                $('div.daily-menu-item.Monday').hide('fast');
                $('div.daily-menu-item.Tuesday').hide('fast');
                $('div.daily-menu-item.Wednesday').hide('fast');
                $('div.daily-menu-item.Thursday').hide('fast');
            }
        }

        myFunction();





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
            $('.' + n).addClass('today');
            $scope.currentDay = n;
        }

        myFunction();

    }])
    .controller('pensionCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

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

        $scope.pensionText1 = ' V centre mesta  Poprad, na 1. nadzemnom podlaží budovy Minipivovaru a Reštaurácie Tatras, vedľa Pivných kúpeľov, je umiestnený útulný mini-penzión. Disponuje 4 komfortnými priestrannými izbami, v ktorých môže ubytovať 11 hostí. Ponúka oázu pokoja a dokonalé súkromie.';

        $scope.bookFinnish = false;

        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];


        $scope.bookingSend1 = 'Dakujeme o Vas zaujem, Vasa rezervacia bola odoslana';
        $scope.bookingSend2 = 'Budeme Vas kontaktovat pre potvrdenie rezervacie.';

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

            $scope.formatcheckin = $scope.checkin.toLocaleDateString('sk-SK');
            $scope.formatcheckout = $scope.checkout.toLocaleDateString('sk-SK');

            console.log("checkin: " + $scope.formatcheckin + " checkout: " + $scope.formatcheckout + " amount: " + $scope.amount +
                " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone);

            $http.post($scope.url, {"checkin": $scope.formatcheckin, "checkout": $scope.formatcheckout, "amount": $scope.amount,
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

            // set Language
            $rootScope.lang = 'svk';
            // set Category
            $rootScope.category = 'spa';
            console.log('$rootScope.category: ' + $rootScope.category);

            $scope.categoryName = 'Pivné kúpele';

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

        $scope.bookingSend1 = 'Dakujeme o Vas zaujem, Vasa rezervacia bola odoslana';
        $scope.bookingSend2 = 'Budeme Vas kontaktovat pre potvrdenie rezervacie.';

        $scope.nameLabel = 'Meno';
        $scope.yourName = 'Vaše Meno';
        $scope.phoneLabel = 'Telefón';
        $scope.timeLabel = 'Čas';
        $scope.dateLabel = 'Dátum';
        $scope.amountLabel = 'Počet';
        $scope.treatmentLabel = 'Procedúra';

        $scope.treatment = 'sauna';

        $scope.url = 'bookSpa.php';
        $scope.formsubmit = function () {

            $scope.formatDate = $scope.date.toLocaleDateString('sk-SK');
            $scope.formatTime = $scope.timer.toLocaleTimeString('sk-SK');

            console.log("date: " + $scope.formatDate + " timer: " + $scope.formatTime + " amount: " + $scope.amount +
                "treatment: " + $scope.treatment + " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone);

            $http.post($scope.url, {"date": $scope.formatDate, "timer": $scope.formatTime, "amount": $scope.amount,
                "treatment": $scope.treatment, "name": $scope.name, "email": $scope.email, "phone": $scope.phone})
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
        $scope.btnBook = 'Zavolajte Nám';
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
    .controller('bookTable', function ($scope, $http, $log, promiseTracker, $timeout) {
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
    .controller('bookSpa', function ($scope, $http, $log, promiseTracker, $timeout) {
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

