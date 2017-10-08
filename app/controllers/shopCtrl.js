'use strict';
angular.module('shopCtrl', [])
    .controller('shopCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        console.log('shopCtrl init');

        $rootScope.getCurrentDay();

        // set Language
        $rootScope.lang = 'svk';
        // set Category
        $rootScope.category = 'shop';
        console.log('Active category: ' + $rootScope.category);

        $scope.isHome = true;
        $rootScope.categoryName = 'Predajnička';

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

    }]);

