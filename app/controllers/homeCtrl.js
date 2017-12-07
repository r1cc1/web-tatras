'use strict';
angular.module('homeCtrl', [])
    .controller('homeCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        console.log('homeCtrl init');

        $rootScope.getCurrentDay();

        $scope.isHome = true;

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 2000);

        // set Category
        $rootScope.categoryName = 'minipivovar';
        $rootScope.openMobileMenu = false;

        // Book Button Icon
        $scope.btnIcon = 'call';

        $scope.minipivovarText1 = 'Prvú várku spodne kvaseného svetlého ležiaka plzenského typu varia sládkovia Ing. Ján Koma a Bc. Lukáš Vdovjak v novozaloženom minipivovare 30. septembra 2015. Nazvú ho „Odležiak“, keďže technológia minipivovaru je síce inštalovaná, ale budova je stále vo výstavbe, navarené pivo bude ešte rok ležať v tanku a čakať do 8. septembra 2016, kedy je reštaurácia otvorená do skúšobnej prevádzky. Pivo je skvostné, navarený tank s objemom cca 5000 veľkých pív na výčape mizne do jedného mesiaca. ';
        $scope.minipivovarText2 = 'Tatras začína variť pivá spodne i vrchne kvasené - ležiaky i ALE (ejly)....U všetkých navarených pív dodržiava Tatras zákon o čistote piva z r. 1516 – prvý zákon o potravinách na svete, vydaný bavorským vojvodom Viliamom IV. Ten určuje, že pivo môže byť vyrobené iba z vody, jačmenného alebo pšeničného sladu, chmeľu a za pomoci pivovarských kvasiniek. Vlastná 50 m hlboká studňa dodáva krištáľovú tatranskú vodu.';

        $scope.minipivovarText3 = 'Všetky pivá varené v Tatrase majú vlastnú tajnú receptúru. Aby sa zachovala ich nezameniteľná vôňa a chuť, pivá sa nefiltrujú ani nepasterizujú. Nepoužívajú sa žiadne konzervačné látky, prísady, náhrady sladu, ochucovadlá, arómy, stabilizátory peny či farbivá. Tatras neriedi pivo vodou ako veľké pivovary. Naše pivo ostáva živé a plné vitamínov, nemusí vydržať roky skladovania, ale musí mať ozajstnú chuť, musí to byť ';

        $scope.pivovicaText1 = 'Keďže v stredoveku bol pivný destilát obľúbeným nápojom a v súčasnosti takmer málokto o ňom vie, rozhodol sa vrchný sládok Minipivovaru Tatras s.r.o., Bc. Lukáš Vdovjak oživiť túto tradičnú pivovarnícku pálenku. Starostlivo, priamo na tento účel uvaril vrchne kvasené pivo Tatras IPA (India pale ale) 14°. Po odležaní, bolo toto nepasterizované a nefiltrované pivo v ktorom neboli žiadne chemické konzervanty alebo arómy, prevezené do Tatranskej likérky s.r.o. Tam sa z tohto kvalitného nápoja, pomalou vákuovou destiláciou pri nižších teplotách, vypálil 45% pivný destilát. Výťažnosť nápoja je nízka. Na jeden liter alkoholu sme preto spotrebovali cca 18 litrov piva, čomu zodpovedá i jeho primeraná cena.';
        $scope.pivovicaText2 = 'Tento netradičný destilát alebo pivovica, je ozajstnou získanou dušou piva. Doporučujeme vychladiť ho na cca 18°C.  Očarí jedinečnou  vôňou pivnej peny a lahodnou sladovou chuťou. Je iskrivo číry a tak jemný, že nie je potrebné ho zapíjať. Naopak, ešte dlho po dopití  budete cítiť príjemne horkastú chuť chmeľu. Vychutnávajte každý pohárik na dvakrát, pite málo, ale pite zaručenú kvalitu. A tou, určite Jacobus Emerici je. Z tohto nápoja Vás ráno určite hlava bolieť nebude. Ponúkame ako skvelý, neznámy darček pre Vašich priateľov. Budete sa  s nimi ešte dlho rozprávať, tešiť, ochutnávať a porovnávať ho s inými destilátmi.';

        $scope.historyText1 = 'Po veľkom požiari Popradu, na námestí, kde pôvodne stál drevený dom, postavil v r. 1731 spišský Nemec Jakub Emmerici kamenný dom. Odkaz pre budúcich vlastníkov domu zanechal na zakrytej hrazde, kde vytesal nápis: ,,Soli Deo Gloria“ (Len Bohu patrí sláva). Uhorská kráľovná Mária Terézia v r. 1778 potvrdila Popradu staroveké právo varenia piva. Medzi 19 domov, v ktorých mešťania varili pivo a mohli ho i čapovať, patril aj tento náš dom. Pivo sa vtedy varilo prevažne pre vlastnú potrebu a väčšinou ho varili ženy. Po založení popradského pivovaru v r. 1812 domáce varenie piva v Poprade zaniká.';
        $scope.historyText2 = 'Počas štúdia na Vysokej škole podnikania v Ostrave, prichádza rodák z Popradu Lukáš Vdovjak s myšlienkou založenia vlastného minipivovaru. Nechutia mu mdlé pivá nadnárodných spoločností, spoznáva malé české remeselné minipivovary vyrábajúce úplne iné pivá – chutnejšie, plnšie, voňavejšie, pestrejšie... Navrhuje otcovi Milanovi využiť dom na námestí v Poprade, kde sídli rodinná firma a pretvoriť ju na Reštauračný minipivovar. V spolupráci s otcom (tiež milovníkom dobrého piva), skúseným podnikateľom, zostavuje štúdiu realizovateľnosti, ktorá sa stane i témou jeho bakalárskej práce. Lukáš sa pokúša, ako „domavarič“, o svoje prvé pivá. Zisťuje však, že v „garážových podmienkach“ nie je ľahké uvariť kvalitné pivo. Takisto cíti, že je potrebné doplniť si vedomosti.';
        $scope.historyText3 = 'Lukáš využije, že v r. 2014 Slovenská živnostenská komora organizuje vzdelávací program Sladovník-Pivovarník a prihlási do kurzu seba i svojho otca. Lukáš sa stáva najmladším a otec najstarším študentom v tomto programe na Slovenskej poľnohospodárskej univerzite v Nitre. Počas štúdia obaja pripravujú projekty a začínajú s rekonštrukciou a novou prístavbou domu na námestí v Poprade s cieľom vybudovať Reštauračný minipivovar. Lukášovi sa začína napĺňať sen o vlastnom pivovare a o vlastnom slovenskom poctivom „ozajstnom pive“. Lukáš zakladá vlastnú spoločnosť, časť domu si prenajíma a žiada o úver. ';
        $scope.historyText4 = 'Počas výstavby ďalej rozvíja zámer poskytnúť svojím hosťom aj ubytovanie v penzióne i  nezvyčajné pivné kúpele. Projekt dostáva názov Tatras – na počesť nádherného pohoria, ktoré vytvára scenériu Popradu. Tatras chce variť „ozajstné pivo“ nielen Popradčanom, ale i všetkým návštevníkom Tatier. Pre technológiu minipivovaru je v náročnej medzinárodnej súťaži vybraná slovenská firma PSS, a. s. Svidník. A tá nesklame, dodáva kvalitné, moderné zariadenie s kapacitou varne až 1200 l, umožňujúcou variť pivá rôzny';
        $scope.historyText5 = 'Prvú várku spodne kvaseného svetlého ležiaka plzenského typu varia sládkovia Ing. Ján Koma a Bc. Lukáš Vdovjak v novozaloženom minipivovare 30. septembra 2015. Nazvú ho „Odležiak“, keďže technológia minipivovaru je síce inštalovaná, ale budova je stále vo výstavbe, navarené pivo bude ešte rok ležať v tanku a čakať do 8. septembra 2016, kedy je reštaurácia otvorená do skúšobnej prevádzky. Pivo je skvostné – archívne, jeden navarený tank s objemom cca 5000 veľkých pív na výčape mizne do jedného mesiaca. Hostia naň doteraz s nostalgiou spomínajú. Tatras začína variť pivá spodne i vrchne kvasené - ležiaky i ale....';
        $scope.historyText6 = 'U všetkých navarených pív dodržiava Tatras zákon o čistote piva z r. 1516 – prvý zákon o potravinách na svete, vydaný bavorským vojvodom Viliamom IV. Ten určuje, že pivo môže byť vyrobené iba z vody, jačmenného alebo pšeničného sladu, chmeľu a za pomoci pivovarských kvasiniek. Vlastná 50 m hlboká studňa dodáva krištáľovú tatranskú vodu. Slad sa kupuje predovšetkým z českých Záhliníc, ale i z Nemecka. Chmeľ sa dováža z Čiech, Nemecka, Nového Zélandu, Anglicka či USA, kvasnice z Belgicka. ';

        $scope.showMoreHistory = false;

        $scope.doShowMoreHistory = function () {
            $scope.showMoreHistory = !$scope.showMoreHistory;
        };
        $scope.doShowMoreText = function () {
            $scope.showMoreText = !$scope.showMoreText;
        };

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

    }]);

