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
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'angularUtils.directives.dirPagination',
    'kjNav',
    'blogDetail',
    'blogList',
    'clickOutside'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled:true});
    $routeProvider
      .when('/', {
        template: '<blog-list></blog-list>'
      })
      .when('/blog', {
        template: '<blog-list></blog-list>'
      })
      .when("/blog/:id", {
        template: '<blog-detail></blog-detail>'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
