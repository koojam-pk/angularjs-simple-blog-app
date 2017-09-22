'use strict';

angular.module('post')
    .factory('Post', function($resource) {
        var url = 'https://thundering-factory.glitch.me/api/blogdata';
        return $resource(url, {}, {
           query: {
               method: "GET",
               params: {},
               isArray: true,
               cache: true,
               /*transformResponse: function(data, header) {
                   console.log(data);
                   return JSON.stringify(data)
               }*/
               // interceptor
           },
            get: {
                method: "GET",
                // params: {},
                isArray: true,
                cache: true
            }
        });
    });
