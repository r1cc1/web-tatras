'use strict';

angular.module('myApp.SVK', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/SVK', {
    templateUrl: 'SVK/SVK.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

    function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './components/assets/texts/text-svk.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function init() {
        var mainTitle = $('#main-title');
        var mainText1 = $('#main-text1');
        var mainText2 = $('#main-text2');
        var title2 = $('#title2');
        var mainText3 = $('#main-text3');
        var mainBrewery = $('#main-brewery');
        var mainBrewery1 = $('#main-brewery1');
        var ourFood = $('#our-food');
        var food = $('#food');
        var foodText = $('#food-text');
        var contact = $('#contact');
        var beerSpa1 = $('#beer-spa1')
        var beerSpatext = $('#beer-spatext')
        var pension1 = $ ('#pension1')
        var pensionText = $('#pension-text')

        loadJSON(function(response) {
            // Parse JSON string into object
            var actual_JSON = JSON.parse(response);
            $.each(actual_JSON, function (index, value) {
                mainTitle.text(value[0].title1);
                mainText1.text(value[0].mainText1);
                mainText2.text(value[0].mainText2);
                title2.text(value[0].title2);
                mainText3.text(value[0].mainText3);
                mainBrewery.text(value[0].mainBrewery);
                mainBrewery1.text(value[0].mainBrewery1);
                ourFood.text(value[0].ourFood);
                food.text(value[0].food);
                foodText.text(value[0].foodText);
                contact.text(value[0].contact);
                beerSpa1.text(value[0].beerSpa1);
                beerSpatext.text(value[0].beerSpatext);
                pension1.text(value[0].pension1);
                pensionText.text(value[0].pensionText);


            });
        });
    }
    $(document).ready(function () {
        init();

        function getWindowHeight() {
            // get window height, apply to first div
            var viewportheight;
            if (typeof window.innerWidth != 'undefined')
            { viewportheight = window.innerHeight }
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            else if (typeof document.documentElement != 'undefined'
                && typeof document.documentElement.clientWidth !=
                'undefined' && document.documentElement.clientWidth != 0)
            {  viewportheight = document.documentElement.clientHeight }
            else{
                viewportheight = document.getElementsByTagName('body')[0].clientHeight
            }
            var firstView = document.getElementById("first");
            firstView.style.height = viewportheight + 'px';
        }
        getWindowHeight();
        //listen to window resize & resize the first view
        window.addEventListener('resize', function(event){
            getWindowHeight();
        });
    });

}]);