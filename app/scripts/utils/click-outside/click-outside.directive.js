'use strict';


angular.module('clickOutside')
    .directive('clickOutside', function($document, $parse, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var onClick = function(event) {
                    var isInside = (event.target.parentNode.nextElementSibling === element[0]);
                    if (!isInside && !scope.isCollapsed) {
                        scope.$apply((scope.isCollapsed = true));
                    }
                }
                scope.$watch(element.hasClass('.navbar-collapse'),
                    function() {
                        $document.bind('click', onClick);
                });
            }
        }
    });
