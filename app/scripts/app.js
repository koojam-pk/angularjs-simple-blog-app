'use strict';

/**
 * @ngdoc overview
 * @name simpleBlogApp
 * @description
 * # simpleBlogApp
 *
 * Main module of the application.
 */
angular
  .module('simpleBlogApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'angularUtils.directives.dirPagination',
    'ui.bootstrap',
    'kjNav',
    'blogDetail',
    'blogList',
    'clickOutside'
  ])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode({enabled: true}).hashPrefix('');
    //if(window.history && window.history.pushState){
      $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('');
    //}
    $routeProvider
      .when('/', {
        template: '<blog-list></blog-list>'
      })
      .when('/blog', {
        template: '<blog-list></blog-list>'
      })
      .when('/blog/:id', {
        template: '<blog-detail></blog-detail>'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
