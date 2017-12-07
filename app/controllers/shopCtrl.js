'use strict';
angular.module('shopCtrl', [])
    .controller('shopCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {

        console.log('shopCtrl init');

        // set Loading
        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 3000);

        $rootScope.getCurrentDay();

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;
        // set Category
        $rootScope.category = 'shop';
        $rootScope.categoryName = 'Predajnička';

        $scope.btnIcon = 'call';
        $scope.shopText1 = 'V našej predajničke nájdete pivá nášho minipivovaru Tatras, ktoré sú vhodné na každú príležitosť. Všetky sú kvasinkové, nefiltrované a nepasterizované. Okrem pív v predajničke ponúkame náš špeciálny pivný destilát – pivovicu Jacobus Emerici, vybrané slovenské vína, alkohol.';
        $scope.shopText2 = 'Na pamiatku Vašej návštevy u nás a pre zberateľov máme pripravené krásne suveníry - pivové poháre, pivné tácky, etikety nášho minipivovaru, pivnú kozmetiku. Samozrejmosťou je zaslanie vybraného tovaru na Vašu adresu. ';
        $scope.shopText3 = 'Vieme, že Vy naši zákazníci si chcete kúpiť to čo máte radi, čo najlacnejšie. Naše pivo však nemôže byť také lacné ako v supermarkete. Nemôže, lebo je najvyššej kvality, vyrába sa bez urýchľovania, remeselným spôsobom  a v malom množstve.';
        $scope.shopText4 = 'Tzv. europivá – masovo vyrábané veľkými nadnárodnými koncermi sa od seba chuťovo málo líšia. Kto chce vypiť veľa piva za málo peňazí, ten musí hľadať inde. Veríme že chuťová rôznorodosť, neopakovateľná vôňa a charakter naších pív Vám ponúkne skutočný zážitok. Doprajte si aj pôžitok z nášho čapovaného „ozajstného piva“.  Všetci z nás niekedy niečo slávia. Na záhrade, v altánku či v lese na guláši. Viete akú môžete urobiť radosť priateľom, ak si budú môcť načapovať pivo sami ?  Požičajte si naše výčapne zariadenie domov. K nemu si vyberte z naších ôsmich druhov ozajstného piva súdok a užívajte svet!';
        $scope.shopTitle2 = 'Skutočný zážitok';

    }]);

