'use strict';

angular.module('blogDetail').
    component('blogDetail', {
        templateUrl: 'views/blog-detail.html',
        controller: function(Post, $http, $location, $routeParams, $scope, $document) {
            Post.query(function(data){
                $scope.notFound = true;
                $scope.comments = [];
                angular.forEach(data, function(post) {
                    if (post.id == $routeParams.id) {
                        $scope.post = post;
                        $scope.notFound = false;
                        if (post.comments) {
                            $scope.comments = post.comments;
                        }
                        resetReply();
                    }
                });
            });

            $scope.addReply = function(reply) {
                $scope.comments.push($scope.reply);
                resetReply();
            }
            $scope.deleteComment = function() {
                $scope.comments.splice($scope.selectedComment, 1);
                $scope.selectedComment = null;
                var element = angular.element($document[0].querySelector('#confirmDialog'));
                element.removeAttr("style");
            }

            $scope.confirmDialog = function(comment) {
              var element = angular.element($document[0].querySelector('#confirmDialog'));
              element.attr("style", "display: block;");
              $scope.selectedComment = comment;
            }
            $scope.cancelDialog = function() {
              var element = angular.element($document[0].querySelector('#confirmDialog'));
              element.removeAttr("style");
              $scope.selectedComment = null;
            }
            $scope.back = function() {
              window.history.back();
            }
            function resetReply() {
                $scope.reply = { "id": $scope.comments.length+1, "text":"" };
            }
            if ($scope.notFound) {
                console.log("Not found");
                $location.path('/');
            }
        }
    });
