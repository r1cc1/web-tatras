'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.SVK',
  'myApp.ENG',
    'myApp.pension',
    'myApp.spa',
    'myApp.restaurant'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/SVK'});
}]);
