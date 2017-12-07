'use strict';
angular.module('pensionCtrl', [])
    .controller('pensionCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        console.log('pensionCtrl init');

        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }

        setTimeout(stopLoading, 1000);

        $rootScope.getCurrentDay();

        // set Category
        $rootScope.categoryName = 'pension';

        $rootScope.openMobileMenu = false;
        $scope.bookFinnish = false;

        /// icon
        $scope.btnIcon = 'hotel';

        // TEXTS
        $scope.pensionText1 = ' V centre mesta  Poprad, na 1. nadzemnom podlaží budovy Minipivovaru a Reštaurácie Tatras, vedľa Pivných kúpeľov, je umiestnený útulný Penzión. Disponuje 4 komfortnými priestrannými izbami, v ktorých môže ubytovať 11 hostí. Ponúka oázu pokoja a dokonalé súkromie.';
        $scope.bookingSend1 = 'Ďakujeme o Váš záujem, Vaša rezervácia bola odoslaná';
        $scope.bookingSend2 = 'Budeme Vás kontaktovať pre potvrdenie rezervácie.';

        $scope.pensionRoomText1 = 'Všetky izby sú vybavené LED televízorom, Wi-Fi internetom, chladničkou s minibarom, kúpeľňou sosprchovým kútom a fénom, WC. V budove sa nachádza kozmetika, krajčírstvo, zlatník. K dispozícií je privátne parkovisko strážené kamerovým systémom, spoplatnené sumou ';
        $scope.pensionRoomText2 = 'Chcete si prenajať izbu na jeden či viac mesiacov? Je to možné. U nás sa budete cítiť ako „vo svojom“.';
        $scope.pensionServiceText1 = 'Poloha penziónu je skvelým východiskovým bodom pre Vaše ďaľšie aktivity. Ak chcete zažiťpestrú dovolenku, navrhneme Vám program z ktorého si určite vyberiete. Zabezpečíme Vám zľavnené vstupenky.';
        $scope.pensionServiceText2 = 'Doporučíme sprievodcu, vyhľadáme a zarezervujeme dopravné spojenie a večer môžete zregenerovať a načerpať sily v pivných kúpeloch, povečerať v našej reštaurácií a dobre savyspať v našom útulnom penzióne ktorý si určite zamilujete.';

        $scope.pensionOfferText1 = 'Prehliadku pivovaru s degustáciou a výkladom';
        $scope.pensionOfferText2 = 'Možnosť zúčastníť sa varenia piva so sládkom';
        $scope.pensionOfferText3 = 'Návštevu pivných kúpeľov, sauna, masáž';

        $scope.pensionOffers = [
            {id: 0, text: 'Prehliadku pivovaru s degustáciou a výkladom'},
            {id: 1, text: 'Možnosť zúčastníť sa varenia piva so sládkom'},
            {id: 2, text: 'Návštevu pivných kúpeľov, sauna, masáž'}
        ];



        $scope.mySlides = [
            './components/assets/imgs/jedlo/kolacik.jpg',
            './components/assets/imgs/jedlo/loparik.jpg',
            './components/assets/imgs/jedlo/rebra.JPG',
            './components/assets/imgs/jedlo/polievka.jpg',
            './components/assets/imgs/jedlo/licka.JPG'
        ];


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

    }]);

