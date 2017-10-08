'use strict';
angular.module('restaurantCtrl', [])
    .controller('restaurantCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

        console.log('restaurantCtrl init');

        // set Loading
        $scope.isloading = true;
        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 1000);

        // set Category
        $rootScope.categoryName = 'restaurant';

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;

        $scope.bookFinnish = false;

        $scope.btnIcon = 'local_restaurant';

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

        $scope.bookingSend1 = 'Ďakujeme o Váš záujem, Vaša rezervácia bola odoslaná';
        $scope.bookingSend2 = 'Budeme Vás kontaktovať pre potvrdenie rezervácie.';

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

        $scope.todayDate  = function() {
            Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
            });
            $scope.currentDay = new Date().toDateInputValue();
            $scope.day = $scope.currentDay;
            console.log($scope.currentDay);
        };
        $scope.todayDate();

        $scope.url = 'bookRestaurant.php';

        $scope.formsubmit = function () {
            $scope.formatTime = $scope.timer.toLocaleTimeString('sk-SK');

            console.log("addText " + $scope.addText);

            console.log("date: " + $scope.date + " timer: " + $scope.formatTime + " amount: " + $scope.amount +
                " room: " + $scope.room + " name: " + $scope.name + " email: " + $scope.email + " phone: " + $scope.phone + " addText " + $scope.addText);

            $http.post($scope.url, {"date": $scope.date, "timer": $scope.formatTime, "amount": $scope.amount,
                "room": $scope.room, "name": $scope.name, "email": $scope.email, "phone": $scope.phone, "addText" : $scope.addText})
                .success(function (data, status) {


                    $scope.status = status;
                    $scope.data = data;
                    $scope.result = data; // Show result from server in our <pre></pre> element

                    console.log('Form poslane : ' + $scope.result);
                    console.log('Form status > ' + $scope.status);

                    $scope.bookFinnish = true;
                })
        };
        //
        // $scope.printMenu = function() {
        //
        //     $('div.daily-menu-item.today').addClass('transparent');
        //     $('div.actions-share').hide('fast');
        //     $('#content-logo').show('fast');
        //
        //     function explode(){
        //         html2canvas($('#menu'), {
        //
        //             onrendered: function(canvas) {
        //
        //                 var img    = canvas.toDataURL("image/png");
        //
        //                 var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        //                 winPrint.document.write('<div style="display:block;position: relative;">');
        //                 winPrint.document.write('<img src="'+img+'"/></div>');
        //                 winPrint.document.close();
        //                 winPrint.focus();
        //
        //             }
        //         });
        //     }
        //
        //     function backit() {
        //         $('#content-logo').hide('fast');
        //         $('div.actions-share').show('fast');
        //         $('div.daily-menu-item.today').removeClass('transparent');
        //
        //     }
        //     setTimeout(explode, 1000);
        //     setTimeout(backit, 2000);
        // };
        //
        // $scope.printToday = function() {
        //
        //     $('div.daily-menu-item.today').addClass('transparent');
        //
        //     function explode(){
        //         html2canvas($('div.daily-menu-item.today'), {
        //
        //             onrendered: function(canvas) {
        //
        //                 var img    = canvas.toDataURL("image/png");
        //
        //                 var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
        //                 winPrint.document.write('<div style="display:block;position: relative;">');
        //                 winPrint.document.write('<img src="'+img+'"/></div>');
        //                 winPrint.document.close();
        //                 winPrint.focus();
        //
        //             }
        //         });
        //     }
        //
        //     function backit() {
        //         $('div.daily-menu-item.today').removeClass('transparent');
        //     }
        //     setTimeout(explode, 1000);
        //     setTimeout(backit, 2000);
        //
        // };


        /// get day name and highlight the day
        $rootScope.getCurrentDay();


    }]);

