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
        $rootScope.categoryDescription = 'spa.text.1';

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;

        // ICON
        $scope.btnIcon = 'spa';

        // TEXTS
        $scope.spaLiTime = '75 min';
        
        $scope.massageText1 = 'Milí hostia, doprajte si masáž. Iste si tiež potrebujete oddýchnuť a načerpať nové sily. Naša masáž je umenie dotyku, ktorý pre Vás vieme použiť k zmierneniu napätia, utíšeniu bolesti, regeneriácii telesného a i duševného  zdravia.';
        $scope.massageText2 = 'prináša uvolnenie, odstraňuje únavu, celkovo posilňuje zdravie a imunitu.';
        $scope.massageText3 = 'podľa vašej predstavy, momentálnej nálady a kondície, zohľadnuje Vaše aktuálne rozpoloženie, je prirodzeným spojením najlepších európskych i východných smerov ( reflexnej masáže, akupresúry, Lomi lomi,  Shia-tsu, klasickej masáže...) Je prostriedkom ako z masáže pre seba získať čo najviac.';
        $scope.massageText4 = 'účinná masážna a liečebná technika, zlepšuje krvný obeh, intezívne prekrvuje miesta kde boli banky priložené, obnovuje funkcie nevového systému, oživuje organizmus.';
        $scope.massageText5 = 'upokojuje vďaka vybraným ľahkým hmatom, pomocou esenciálnych relaxačných olejov a príjemnej hudby zharmonizuje telo aj myseľ.';
        $scope.massageText6 = 'špeciálne vhodná pred alebo po náročnom športovom výkone a fyzicky aktívným osobám.';
        $scope.massageText7 = 'obnovuje pohyblivosť, hĺbkovo uvoľňuje, výsledkom je pocit výrazného odľahčenia.';
        $scope.massageText8 = 'Masáž je úžasný prostredok ako uľaviť organizmu, zmierniť stres a predchádzať bolestiam. Vstúpte a budete sa cítiť znovuzrodení a svet čarokrásny.';

        $scope.bookFinnish = false;

        $scope.spaPrices = false;
        $scope.showPrice = function () {
            $scope.spaPrices = !$scope.spaPrices;
            $scope.checkPrices();
        };
        $scope.saunaPrices = false;
        $scope.showPriceSauna = function () {
            $scope.saunaPrices = !$scope.saunaPrices;
        };

        $scope.url = 'bookSpa.php';

        $scope.doShowMoreRelax = function () {
            $scope.showMoreRelax = !$scope.showMoreRelax;
        };
        $scope.doShowMoreMassage = function () {
            $scope.showMoreMassage = !$scope.showMoreMassage;
        };

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


        $scope.datalists = [
            { "name": "1"},
            {"name": "2"},
            {"name": "3"},
            {"name": "4"},
            {"name": "5"},
            {"name": "6"},
            {"name": "7"},
            {"name": "8"},
            {"name": "9"},
            {"name": "10"},
            {"name": "11"},
            {"name": "12"},
            {"name": "13"},
            {"name": "14"},
            {"name": "15"},
            {"name": "16"},
            {"name": "17"},
            {"name": "18"},
            {"name": "19"},
            {"name": "20"},
            {"name": "21"},
            {"name": "22"},
            {"name": "23"},
            {"name": "24"},
            {"name": "25"},
            {"name": "26"},
            {"name": "27"},
            {"name": "28"},
            {"name": "29"},
            {"name": "30"},
            {"name": "31"}
        ];


        $scope.select= function(item) {
            $scope.selected = ($scope.selected === item ? null : item);
        };
        $scope.isActive = function(item) {
            return $scope.selected === item;
        };

        
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

        $scope.dateSelected = false;

        $scope.checkTimes = function () {

            $scope.dateSelected = true;

            function getDayName(dateStr, locale)
            {
                var date = new Date(dateStr);
                return date.toLocaleDateString(locale, { weekday: 'long' });
            }

            if ($scope.date) {
                var day = getDayName($scope.date, "en-US"); // Gives back 'Vrijdag' which is Dutch for Friday.
                console.log('Day From Date is >>> ' + $scope.date + day);

                if (day == 'Monday') {
                    console.log('Selected is MONDAY');
                    $scope.hideMe1 =  true;
                    $scope.hideMe2 =  true;
                    $scope.hideMe3 =  true;
                    $scope.hideMe4 =  true;
                    $scope.hideMe5 =  true;
                    $scope.hideMe6 =  true;
                    $scope.hideMe7 =  true;
                    $scope.hideMeAll =  true;
                }
                if (day == 'Tuesday') {
                    console.log('Selected is TUESDAY');
                    $scope.hideMe1 =  true;
                    $scope.hideMe2 =  false;
                    $scope.hideMe3 =  false;
                    $scope.hideMe4 =  false;
                    $scope.hideMe5 =  false;
                    $scope.hideMe6 =  true;
                    $scope.hideMe7 =  true;
                    $scope.hideMeAll =  false;
                }
                if (day == 'Wednesday') {
                    console.log('Selected is WEDNESDAY');
                    $scope.hideMe1 =  true;
                    $scope.hideMe2 =  false;
                    $scope.hideMe3 =  false;
                    $scope.hideMe4 =  false;
                    $scope.hideMe5 =  false;
                    $scope.hideMe6 =  true;
                    $scope.hideMe7 =  true;
                    $scope.hideMeAll =  false;
                }
                if (day == 'Thursday') {
                    console.log('Selected is THURSDAY');
                    $scope.hideMe1 =  true;
                    $scope.hideMe2 =  false;
                    $scope.hideMe3 =  false;
                    $scope.hideMe4 =  false;
                    $scope.hideMe5 =  false;
                    $scope.hideMe6 =  true;
                    $scope.hideMe7 =  true;
                }
                if (day == 'Friday') {
                    console.log('Selected is FRIDAY');
                    $scope.hideMe1 =  true;
                    $scope.hideMe2 =  false;
                    $scope.hideMe3 =  false;
                    $scope.hideMe4 =  false;
                    $scope.hideMe5 =  false;
                    $scope.hideMe6 =  false;
                    $scope.hideMe7 =  true;
                    $scope.hideMeAll =  false;
                }
                if (day == 'Saturday') {
                    console.log('Selected is SATURDAY');
                    $scope.hideMe1 =  false;
                    $scope.hideMe2 =  false;
                    $scope.hideMe3 =  false;
                    $scope.hideMe4 =  false;
                    $scope.hideMe5 =  false;
                    $scope.hideMe6 =  false;
                    $scope.hideMe7 =  true;
                    $scope.hideMeAll =  false;
                }
                if (day == 'Sunday') {
                    console.log('Selected is SUNDAY');
                    $scope.hideMe1 =  false;
                    $scope.hideMe2 =  false;
                    $scope.hideMe3 =  false;
                    $scope.hideMe4 =  false;
                    $scope.hideMe5 =  false;
                    $scope.hideMe6 =  false;
                    $scope.hideMe7 =  true;
                    $scope.hideMeAll =  false;
                }
            }
        };


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

                console.log('if Massage ' + $scope.treatment);

                if(!$scope.amount){
                    $scope.finalPrice = '0';
                }

                if($scope.massageType == 1 ){
                    $scope.finalPrice = $scope.massageType1s;
                }
                if($scope.massageType == 2 ){
                    $scope.finalPrice = $scope.massageType1l;
                }
                if($scope.massageType == 3 ){
                    $scope.finalPrice = $scope.massageType2s;
                }
                if($scope.massageType == 4 ){
                    $scope.finalPrice = $scope.massageType2l;
                }
                if($scope.massageType == 5 ){
                    $scope.finalPrice = $scope.massageType3s;
                }
                if($scope.massageType == 6 ){
                    $scope.finalPrice = $scope.massageType3l;
                }

                if($scope.massageType == 7 ){
                    $scope.finalPrice = $scope.massageType4s;
                }
                if($scope.massageType == 8 ){
                    $scope.finalPrice = $scope.massageType4l;
                }


                console.log('$scope.treatment ' + $scope.treatment);
                console.log('$scope.finalPrice ' + $scope.finalPrice);
            }

            console.log('$scope.treatment ' + $scope.treatment);
            console.log('$scope.finalPrice ' + $scope.finalPrice);
        };

        $scope.massageType1s = "15";
        $scope.massageType1l = "28";

        $scope.massageType2s = "19";
        $scope.massageType2l = "29";

        $scope.massageType3s = "15";
        $scope.massageType3l = "28";

        $scope.massageType4s = "14";
        $scope.massageType4l = "25";





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

