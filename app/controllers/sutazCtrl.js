'use strict';
angular.module('sutazCtrl', [])
    .controller('sutazCtrl', ['$scope', '$rootScope', '$http',  function ($scope, $rootScope, $http ) {

        console.log('sutazCtrl init');

        $rootScope.getCurrentDay();

        // set Loading
        $scope.isloading = true;

        function stopLoading(){
            $scope.isloading = false;
            $scope.$apply();
        }
        setTimeout(stopLoading, 1000);

        // set Category
        $rootScope.categoryName = 'sutaz.full.title';

        // set default Mobile Menu
        $rootScope.openMobileMenu = false;

        $scope.showMoreStatut = false;

        $scope.doShowMoreStatut = function () {
            $scope.showMoreStatut = !$scope.showMoreStatut;
        };

        $scope.bookFinnish = false;
        $scope.showError = false;
        $scope.loader = false;

        $scope.categoryEmail = 'info@minipivovartatras.sk';
        $scope.url = 'bookSutaz.php';
        $scope.endpoint = 'https://tatras.adus-technologies.com/tatras-api/index.php/usecase';
        $scope.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cudGF0cmFzLnNrIiwiYXVkIjoiaHR0cDpcL1wvd3d3LnRhdHJhcy5zayIsImp0aSI6InVpZCIsImlhdCI6MTUzMTEzMzQ1NCwibmJmIjoxNTMxMTMzNDQ0LCJleHAiOjQ2ODQ3MzM0NTQsImNsYWltVXNlcklkIjoxMDAwfQ.QJfpAGupmyk7d8Fh9ZOIpJB5Lms2L9JlqqvMBxCJFew';

        $scope.select= function(item) {
            $scope.selected = ($scope.selected === item ? null : item);
        };

        $scope.isActive = function(item) {
            return $scope.selected === item;
        };
        $scope.selectMe = function (event){
            $(event.target).addClass('selected');
        };

        $scope.resetForm = function() {
            $scope.bookFinnish = false;
            $scope.showError = false;
            $scope.name = '';
            $scope.surname = '';
            $scope.email = '';
            $scope.kod = '';
            $scope.first = '';
            $scope.second = '';
            $scope.third = '';
            $scope.fourth = '';
            $scope.fifth = '';
            $scope.GDPR = false;
        };

        $rootScope.today = $scope.today;

        $scope.isSameNumber2 = false;
        $scope.isSameNumber3 = false;
        $scope.isSameNumber4 = false;
        $scope.isSameNumber5 = false;

        $scope.checkIfSame2 = function (input) {
            if (input) {
                //console.log('input: ' + input);

                var upInput = input.toUpperCase();
                var lowInput = input.toLowerCase();

                if (upInput == $scope.first || lowInput == $scope.first) {
                    //console.log('Cislo sa ZHODUJE');
                    $scope.isSameNumber2 = true;
                }
                else {
                    //console.log('Cislo sa NEZHODUJE');
                    $scope.isSameNumber2 = false;
                }
            } 
        }
        $scope.checkIfSame3 = function (input) {
            if (input) {
                //console.log('input: ' + input);

                var upInput = input.toUpperCase();
                var lowInput = input.toLowerCase();

                if (upInput == $scope.first || lowInput == $scope.first || 
                    upInput == $scope.second || lowInput == $scope.second) {
                    //console.log('Cislo sa ZHODUJE');
                    $scope.isSameNumber3 = true;
                }
                else {
                    //console.log('Cislo sa NEZHODUJE');
                    $scope.isSameNumber3 = false;
                }
            } 
        }
        $scope.checkIfSame4 = function (input) {
            if (input) {
                //console.log('input: ' + input);
                
                var upInput = input.toUpperCase();
                var lowInput = input.toLowerCase();

                if (upInput == $scope.first || lowInput == $scope.first || 
                    upInput == $scope.second || lowInput == $scope.second || 
                    upInput == $scope.third || lowInput == $scope.third ) {
                    //console.log('Cislo sa ZHODUJE');
                    $scope.isSameNumber4 = true;
                }
                else {
                    //console.log('Cislo sa NEZHODUJE');
                    $scope.isSameNumber4 = false;
                }
            } 
        }
        $scope.checkIfSame5 = function (input) {
            if (input) {
                //console.log('input: ' + input);
                
                var upInput = input.toUpperCase();
                var lowInput = input.toLowerCase();
                
                if (upInput == $scope.first || lowInput == $scope.first || 
                    upInput == $scope.second || lowInput == $scope.second || 
                    upInput == $scope.third || lowInput == $scope.third || 
                    upInput == $scope.fourth || lowInput == $scope.fourth) {
                    //console.log('Cislo sa ZHODUJE');
                    $scope.isSameNumber5 = true;
                }
                else {
                    //console.log('Cislo sa NEZHODUJE');
                    $scope.isSameNumber5 = false;
                }
            } 
        }

        /// Reservation Form Submit
        $scope.formsubmit = function () {
            $scope.unvalid = false;

            // console.log('$scope.name ' + $scope.name);
            // console.log('$scope.surname ' + $scope.surname);
            // console.log('$scope.email ' + $scope.email);
            // console.log('$scope.kod ' + $scope.kod);
            // console.log('$scope.first ' + $scope.first);
            // console.log('$scope.second ' + $scope.second);
            // console.log('$scope.third ' + $scope.third);
            // console.log('$scope.fourth ' + $scope.fourth);
            // console.log('$scope.fifth ' + $scope.fifth);
            // console.log('$scope.GDPR ' + $scope.GDPR);

            // if($scope.first.toUpperCase() == $scope.second.toUpperCase() || $scope.first.toUpperCase() == $scope.third.toUpperCase() ||
            // $scope.first.toUpperCase() == $scope.third.toUpperCase() || $scope.first.toUpperCase() == $scope.fourth.toUpperCase() ||
            // $scope.first.toUpperCase() == $scope.fifth.toUpperCase())  {
            //     console.log('FIRST sa zhoduje s inym');
            //     $scope.unvalid = true;
            //     $scope.showError = true;
            // }
            // if($scope.second.toUpperCase() == $scope.third.toUpperCase() || $scope.second.toUpperCase() == $scope.fourth.toUpperCase() || 
            // $scope.second.toUpperCase() == $scope.fifth.toUpperCase()) {
            //     console.log('SECOND sa zhoduje s inym');
            //     $scope.unvalid = true;
            //     $scope.showError = true;
            // }
            // if($scope.third.toUpperCase() == $scope.fourth.toUpperCase() || $scope.third.toUpperCase() == $scope.fifth.toUpperCase()) {
            //     console.log('THIRD sa zhoduje s inym');
            //     $scope.unvalid = true;
            //     $scope.showError = true;
            // }
            // if($scope.fourth.toUpperCase() == $scope.fifth.toUpperCase()) {
            //     console.log('fourth sa zhoduje s inym');
            //     $scope.unvalid = true;
            //     $scope.showError = true;
            // }

           

            if(!$scope.unvalid) {
                $scope.loader = true;

                var first = $scope.first.toUpperCase();
                var second = $scope.second.toUpperCase();
                var third = $scope.third.toUpperCase();
                var fourth = $scope.fourth.toUpperCase();
                var fifth = $scope.fifth.toUpperCase();

                var data = {
                    "TTRegisterToDegustationUseCase": [{
                        "codeSet": $scope.kod,
                        "rank1": first,
                        "rank2": second,
                        "rank3": third,
                        "rank4": fourth,
                        "rank5": fifth,
                        "firstName": $scope.name,
                        "lastName": $scope.surname,
                        "email": $scope.email,
                        "conditionsGDPRAccepted": $scope.GDPR
                    }]
                }
                
                var config = { 
                    headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + $scope.token,
                    'AtsLocale': 'EN',
                    }
                }

                $http.post($scope.endpoint, data, config)
                .success(function (data, status, headers, config) {
                    $scope.PostDataResponse = data.payload;

                    $scope.DataResponse2 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.codeSet);
                    $scope.responseCodeSet = JSON.parse($scope.DataResponse2);

                    $scope.DataResponse3 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank1);
                    $scope.responseRank1 = JSON.parse($scope.DataResponse3);
                    $scope.DataResponse4 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank1Brand);
                    $scope.responseRank1Brand = JSON.parse($scope.DataResponse4);

                    $scope.DataResponse5 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank2);
                    $scope.responseRank2 = JSON.parse($scope.DataResponse5);
                    $scope.DataResponse6 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank2Brand);
                    $scope.responseRank2Brand = JSON.parse($scope.DataResponse6);

                    $scope.DataResponse7 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank3);
                    $scope.responseRank3 = JSON.parse($scope.DataResponse7);
                    $scope.DataResponse8 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank3Brand);
                    $scope.responseRank3Brand = JSON.parse($scope.DataResponse8);

                    $scope.DataResponse9 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank4);
                    $scope.responseRank4 = JSON.parse($scope.DataResponse9);
                    $scope.DataResponse10 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank4Brand);
                    $scope.responseRank4Brand = JSON.parse($scope.DataResponse10);

                    $scope.DataResponse11 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank5);
                    $scope.responseRank5 = JSON.parse($scope.DataResponse11);
                    $scope.DataResponse12 = JSON.stringify($scope.PostDataResponse.TTRegisterToDegustation[0].payload.rank5Brand);
                    $scope.responseRank5Brand = JSON.parse($scope.DataResponse12);

                    $scope.loader = false;
                    $scope.bookFinnish = true;
                })
                .error(function (data, status, header, config) {
                    console.log('POST ERROR ' + status);
                    $scope.loader = false;
                    $scope.showError = true;
                });


                   
                    
            }
        }

    }]);