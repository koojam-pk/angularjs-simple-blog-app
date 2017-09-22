'use strict';

angular.module('kjNav')
    .directive('kjNav', function(Post, $location) {
        return {
            restrict: 'E',
            templateUrl: 'views/kj-nav.html',
            link: function(scope, element, attr) {
                scope.items = Post.query();
                scope.selectItem = function($item, $model, $label) {
                    scope.searchQuery = '';
                    $location.path('/blog/' + $item.id);
                };
                scope.searchItem = function() {
                    $location.path('/blog/').search('q', scope.searchQuery);
                    scope.searchQuery = '';
                };
            }
        }
    });
