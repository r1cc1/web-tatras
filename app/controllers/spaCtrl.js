'use strict';
angular.module('spaCtrl', [])
    .controller('spaCtrl', ['$scope', '$rootScope', '$http', '$parse', function ($scope, $rootScope, $http, $parse ) {

        console.log('spaCtrl init');

        $rootScope.getCurrentDay();

        // set Loading
        $scope.isloading = true;

        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 1000);

        // set Category
        $rootScope.categoryName = 'wellness';

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;

        // ICON
        $scope.btnIcon = 'spa';

        // TEXTS
        $scope.spaText1 = 'Kde inde by mali byť pivné kúpele, keď nie priamo v pivovare? Pivný kúpeľ bol už v stredoveku obľúbenou a účinnou terapiou. Využíva prírodné suroviny – chmeľ, výťažok z pivovarského mláta, kvasinky. Má liečivé účinky a je vynikajúcou prevenciou pred ochorením. Pivný kúpeľ prečisťuje pokožku, má ozdravný účinok na vlasy i pleť, uvoľňuje svaly, podporí Váš imunitný systém. Pivné kvasnice a látky obsiahnuté v pive odovzdávajú Vášmu telu celý rad B vitamínov. Proteíny a minerály prispievajú k celkovému zvláčneniu a renegerácií pokožky s omladzujúcim efektom, liečia akné a celulitídu. Priestor pivných kúpeľov poteší moderným interiérom nielen Vaše oko. Osviežia Vás očistné procesy, ktoré si môžete v tomto príjemnom prostredí vychutnať.';

        $scope.spaUl = 'Tato kúpeľnícka procedúra zahŕňa:';
        $scope.spaLi1 = 'chmeľová suchá sauna, kde chmeľové silice vitalizujú a uvoľňujú kožné póry, prehriatím sa odplavia z tela škodlivé látky';
        $scope.spaLi2 = 'ochladenie pod studeným vedrom vody alebo v studenej kadi';
        $scope.spaLi3 = 'pivný vaňový perličkový kúpeľ s neobmedzenou konzumáciou dobre vychladeného kvasnicového piva Tatras, ktoré si sami načapujete. Kvasnicové pivo obsahuje živé kultúry pivovarských kvasníc, ktoré priaznivo pôsobia na tráviaci trakt. Liečba tak pôsobí nielen zvonku, ale i zvnútra. Pivo môžete zajesť čerstvým domácim pivným chlebom s masťou. Teplota kúpeľa je 38 °C';
        $scope.spaLi4 = 'odpočinok na lôžku z pravej pšeničnej slamy, kde dochádza k uvoľneniu napätia, únavy a stresu.';
        $scope.spaLi5 = 'Pivne Kúpele (sauna, ľadová kaď, ovsené lôžko, pivný kúpeľ, čapovanie piva)';
        $scope.spaLiTime = '1hod 15 min';

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


        $scope.spaPrices = false;
        $scope.showPrice = function () {
            $scope.spaPrices = !$scope.spaPrices;
            checkPrices();
        };
        $scope.saunaPrices = false;
        $scope.showPriceSauna = function () {
            $scope.saunaPrices = !$scope.saunaPrices;
        };

        $scope.url = 'bookSpa.php';

        $scope.getCurrentMonth = function() {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;

            $scope.currentMonth = month.toString();
        };
        $scope.getCurrentMonth();

        $scope.getCurrentYear = function() {
            var dateObj = new Date();
            var year = dateObj.getUTCFullYear();

            $scope.currentYear = year.toString();
        };
        $scope.getCurrentYear();

        $scope.treatments = [
            {"type": "special.treatment", "no": "1"},
            {"type": "sauna", "no": "2"},
            {"type": "massage", "no": "3"}
        ];

        $scope.terminMonths = [
            {"no": "10", "name": "oktober", "year" : "2017"},
            {"no": "11", "name": "november", "year" : "2017"},
            {"no": "12", "name": "december", "year" : "2017"},
            {"no": "1", "name": "januar", "year" : "2018"}
        ];
        $scope.terminMonth = $scope.currentMonth; // set current month as default

        console.log('TerminMonth---');
        console.log($scope.terminMonth);
        //
        //
        // $scope.terminTimes = [
        //     {"no": "1", "name": "11:00"},
        //     {"no": "2", "name": "12:30"},
        //     {"no": "2", "name": "14:30"},
        //     {"no": "3", "name": "16:00"},
        //     {"no": "4", "name": "17:30"},
        //     {"no": "5", "name": "19:00"},
        //     {"no": "6", "name": "20:30"}
        // ];


        
        $scope.setTermin = function (month, day, time) {

            $scope.selectedMonth = month.toString();
            $scope.selectedDay = day.toString();
            $scope.selectedTime = time.toString();

            if ($scope.selectedTime == '1') {
                $scope.selectedTimeText = $scope.spaTime1.$value;
            }
            if ($scope.selectedTime == '2') {
                $scope.selectedTimeText = $scope.spaTime2.$value;
            }
            if ($scope.selectedTime == '3') {
                $scope.selectedTimeText = $scope.spaTime3.$value;
            }
            if ($scope.selectedTime == '4') {
                $scope.selectedTimeText = $scope.spaTime4.$value;
            }
            if ($scope.selectedTime == '5') {
                $scope.selectedTimeText = $scope.spaTime5.$value;
            }
            if ($scope.selectedTime == '6') {
                $scope.selectedTimeText = $scope.spaTime6.$value;
            }
            if ($scope.selectedTime == '7') {
                $scope.selectedTimeText = $scope.spaTime7.$value;
            }

            console.log('---selectedTimeText---');
            console.log($scope.selectedTimeText);

            console.log('---setTerminCode---');
            console.log($scope.selectedMonth+$scope.selectedDay+$scope.selectedTime);
            console.log('month' + $scope.selectedMonth + 'day' +  $scope.selectedDay + 'termin' + $scope.selectedTime );

            var selectedTerminCode = $scope.selectedMonth+$scope.selectedDay+$scope.selectedTime;
            console.log('---selectedTerminCode---');
            console.log(selectedTerminCode);

            var selectedTermin = $parse(selectedTerminCode);
            // Assigns a value to it
            selectedTermin.assign($scope, false);

            console.log($scope['termin' + selectedTerminCode ]);

            $scope['termin' + selectedTerminCode ].$save()
        };

        $scope.selectMe = function (event){
            $(event.target).addClass('selected');
        };


        //
        // // number of persons
        // $scope.amounts = [
        //     {id: 0, value: '0', displayName: 'select'},
        //     {id: 1, value: '1', displayName: '1'},
        //     {id: 2, value: '2', displayName: '2'},
        //     {id: 3, value: '3', displayName: '3'},
        //     {id: 4, value: '4', displayName: '4'},
        //     {id: 5, value: '5', displayName: '5'},
        //     {id: 6, value: '6', displayName: '6'},
        //     {id: 7, value: '7', displayName: '7'},
        //     {id: 8, value: '8', displayName: '8'}
        // ];
        //
        // // number of baths
        // $scope.baths = [
        //     {value: '0', displayName: 'select'}
        // ];
        //
        // $scope.filterCondition={
        //     bath: '0',
        //     amount: '0'
        // };


        $scope.checkPrices = function () {

            // if treatment = Kupele
            if($scope.treatment == 1) {

                if(!$scope.amount && !$scope.amount2 ){
                    $scope.finalPrice = '0';
                }
                if($scope.amount && !$scope.amount2 ){
                    $scope.finalPrice = '0';
                }

                if($scope.amount == 1 && $scope.amount2 == 1){
                    $scope.finalPrice = $scope.spaPrice1.$value;
                }
                if($scope.amount == 2 && $scope.amount2 == 1){
                    $scope.finalPrice = $scope.spaPrice2.$value;
                }
                if($scope.amount == 2 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice3.$value;
                }
                if($scope.amount == 3 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice4.$value;
                }
                if($scope.amount == 3 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice5.$value;
                }
                if($scope.amount == 4 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice6.$value;
                }
                if($scope.amount == 4 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice7.$value;
                }
                if($scope.amount == 4 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice8.$value;
                }
                if($scope.amount == 5 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice9.$value;
                }
                if($scope.amount == 5 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice10.$value;
                }
                if($scope.amount == 6 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice11.$value;
                }
                if($scope.amount == 6 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice12.$value;
                }
                if($scope.amount == 7 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice13.$value;
                }
                if($scope.amount == 8 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice14.$value;
                }

            } /// if Sauna
             if ($scope.treatment == 2) {

                 if(!$scope.amount){
                     $scope.finalPrice = '0';
                 }

                if($scope.amount == 1 ){
                    $scope.finalPrice = $scope.saunaPrice1.$value;
                }
                if($scope.amount == 2 ){
                    $scope.finalPrice = $scope.saunaPrice2.$value;
                }
                if($scope.amount == 3 ){
                    $scope.finalPrice = $scope.saunaPrice3.$value;
                }
                if($scope.amount == 4 ){
                    $scope.finalPrice = $scope.saunaPrice4.$value;
                }
                if($scope.amount == 5 ){
                    $scope.finalPrice = $scope.saunaPrice5.$value;
                }
                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);
            }
            /// if Massage
            if ($scope.treatment == 3) {
                if(!$scope.amount){
                    $scope.finalPrice = '0';
                }

                if($scope.amount == 1 ){
                    $scope.finalPrice = $scope.massagePrice.$value;
                }
                if($scope.amount == 2 ){
                    $scope.finalPrice = ($scope.massagePrice.$value)*2;
                }

                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);
            }

            console.log('$scope.treatment ' + $scope.treatment);
            console.log('$scope.finalPrice ' + $scope.finalPrice);
        };



        /// Reservation Form Submit
        $scope.formsubmit = function () {
            console.log('$scope.treatment ' + $scope.treatment);
            console.log('$scope.termin ' + $scope.termin);
            console.log('$scope.amount ' + $scope.amount);
            console.log('$scope.amount2 ' + $scope.amount2);
            console.log('$scope.text ' + $scope.text);

            if(!$scope.amount2) {
                $scope.amount2 = '------';
            }

            // if treatment = Kupele
            if($scope.treatment == '1') {
                $scope.treatment = $scope.treatments[0].type;

                if($scope.amount == 1 && $scope.amount2 == 1){
                    $scope.finalPrice = $scope.spaPrice1.$value;
                }
                if($scope.amount == 2 && $scope.amount2 == 1){
                    $scope.finalPrice = $scope.spaPrice2.$value;
                }
                if($scope.amount == 2 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice3.$value;
                }
                if($scope.amount == 3 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice4.$value;
                }
                if($scope.amount == 3 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice5.$value;
                }
                if($scope.amount == 4 && $scope.amount2 == 2){
                    $scope.finalPrice = $scope.spaPrice6.$value;
                }
                if($scope.amount == 4 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice7.$value;
                }
                if($scope.amount == 4 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice8.$value;
                }
                if($scope.amount == 5 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice9.$value;
                }
                if($scope.amount == 5 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice10.$value;
                }
                if($scope.amount == 6 && $scope.amount2 == 3){
                    $scope.finalPrice = $scope.spaPrice11.$value;
                }
                if($scope.amount == 6 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice12.$value;
                }
                if($scope.amount == 7 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice13.$value;
                }
                if($scope.amount == 8 && $scope.amount2 == 4){
                    $scope.finalPrice = $scope.spaPrice14;
                }

            } /// if Sauna
             if ($scope.treatment == '2') {
                $scope.treatment = $scope.treatments[1].type;

                if($scope.amount == 1 ){
                    $scope.finalPrice = $scope.saunaPrice1.$value;
                }
                if($scope.amount == 2 ){
                    $scope.finalPrice = $scope.saunaPrice2.$value;
                }
                if($scope.amount == 3 ){
                    $scope.finalPrice = $scope.saunaPrice3.$value;
                }
                if($scope.amount == 4 ){
                    $scope.finalPrice = $scope.saunaPrice4.$value;
                }
                if($scope.amount == 5 ){
                    $scope.finalPrice = $scope.saunaPrice5.$value;
                }
                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);
            }
            /// if Massage
            if ($scope.treatment == 3) {
                $scope.treatment = $scope.treatments[2].type;
                if(!$scope.amount){
                    $scope.finalPrice = '0';
                }

                if($scope.amount == 1 ){
                    $scope.finalPrice = $scope.massagePrice.$value;
                }
                if($scope.amount == 2 ){
                    $scope.finalPrice = ($scope.massagePrice.$value)*2;
                }

                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);
            }


            console.log("treatment: " + $scope.treatment + " date: " + $scope.date + " termin: " + $scope.termin + " amount: " + $scope.amount +
                " amount2: " + $scope.amount2 + " price: " + $scope.finalPrice + " name: " + $scope.name +
                " email: " + $scope.email + " phone: " + $scope.phone + " text:" + $scope.text);

            $http.post($scope.url, {"treatment: " : $scope.treatment, "date": $scope.date, "termin": $scope.termin, "treatment": $scope.treatment, "amount": $scope.amount,
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

    }]);

