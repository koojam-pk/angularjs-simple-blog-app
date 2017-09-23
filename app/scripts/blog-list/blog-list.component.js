'use strict';

angular.module('blogList')
    .component('blogList', {
        templateUrl: 'views/blog-list.html',
        controller: ['Post', '$location', '$routeParams', '$rootScope', '$scope',
            function(Post, $location, $routeParams, $rootScope, $scope) {
            var q = $location.search().q;
            if (q) {
                $scope.query = q;
                $scope.searchQuery = true;
            }

            $scope.order = '-publishDate';
            $scope.goToItem = function(post) {
                $rootScope.$apply(function() {
                    $location.path('/blog/' + post.id);
                });
            };
            $scope.changeCols = function(number) {
                if (angular.isNumber(number)) {
                    $scope.numCols = number;
                } else {
                    $scope.numCols = 2;
                }
                setupCols($scope.items, $scope.numCols);
            };
            $scope.loadingQuery = false;

            $scope.$watch(function(){
                if ($scope.query) {
                    $scope.loadingQuery = true;
                    $scope.cssClass = 'col-md-12';
                    if ($scope.query !== q) {
                        $scope.searchQuery = false;
                    }
                } else {
                    if ($scope.loadingQuery) {
                        setupCols($scope.items, 2);
                        $scope.loadingQuery = false;
                    }
                }
            });
            Post.query(function(data) {
                setupCols(data, 2);
            });
            function setupCols(data, number) {
                if (angular.isNumber(number)) {
                    $scope.numCols = number;
                } else {
                    $scope.numCols = 2;
                }
                $scope.cssClass =  'col-sm-' + (12/$scope.numCols);
                $scope.items = data;
                $scope.colItems = chunkArrayInGroups(data, $scope.numCols);
            }
            function chunkArrayInGroups(array, unit) {
                var results = [];
                var length = Math.ceil(array.length / unit);
                for (var i=0; i<length; i++) {
                    results.push(array.slice(i*unit, (i+1)*unit));
                }
                return results;
            }
        }]
    });
