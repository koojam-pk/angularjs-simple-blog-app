"use strict";angular.module("simpleBlogApp",["ngCookies","ngResource","ngRoute","angularUtils.directives.dirPagination","ui.bootstrap","kjNav","blogDetail","blogList","clickOutside"]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode({enabled:!0,requireBase:!1}).hashPrefix(""),a.when("/",{template:"<blog-list></blog-list>"}).when("/blog",{template:"<blog-list></blog-list>"}).when("/blog/:id",{template:"<blog-detail></blog-detail>"}).when("/about",{templateUrl:"views/about.html"}).otherwise({redirectTo:"/"})}]),angular.module("simpleBlogApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("post",[]),angular.module("post").factory("Post",["$resource",function(a){var b="https://thundering-factory.glitch.me/api/blogdata";return a(b,{},{query:{method:"GET",params:{},isArray:!0,cache:!0},get:{method:"GET",isArray:!0,cache:!0}})}]),angular.module("blogList",["post"]),angular.module("blogList").component("blogList",{templateUrl:"views/blog-list.html",controller:["Post","$location","$routeParams","$rootScope","$scope",function(a,b,c,d,e){function f(a,b){angular.isNumber(b)?e.numCols=b:e.numCols=2,e.cssClass="col-sm-"+12/e.numCols,e.items=a,e.colItems=g(a,e.numCols)}function g(a,b){for(var c=[],d=Math.ceil(a.length/b),e=0;d>e;e++)c.push(a.slice(e*b,(e+1)*b));return c}var h=b.search().q;h&&(e.query=h,e.searchQuery=!0),e.order="-publishDate",e.goToItem=function(a){d.$apply(function(){b.path("/blog/"+a.id)})},e.changeCols=function(a){angular.isNumber(a)?e.numCols=a:e.numCols=2,f(e.items,e.numCols)},e.loadingQuery=!1,e.$watch(function(){e.query?(e.loadingQuery=!0,e.cssClass="col-md-12",e.query!==h&&(e.searchQuery=!1)):e.loadingQuery&&(f(e.items,2),e.loadingQuery=!1)}),a.query(function(a){f(a,2)})}]}),angular.module("blogDetail",["post"]),angular.module("blogDetail").component("blogDetail",{templateUrl:"views/blog-detail.html",controller:["Post","$http","$location","$routeParams","$scope","$document",function(a,b,c,d,e,f){function g(){e.reply={id:e.comments.length+1,text:""}}a.query(function(a){e.notFound=!0,e.comments=[],angular.forEach(a,function(a){parseInt(a.id)===parseInt(d.id)&&(e.post=a,e.notFound=!1,a.comments&&(e.comments=a.comments),g())}),e.notFound&&c.path("/")}),e.addReply=function(a){e.comments.push(a),g()},e.deleteComment=function(){e.comments.splice(e.selectedComment,1),e.selectedComment=null;var a=angular.element(f[0].querySelector("#confirmDialog"));a.removeAttr("style")},e.confirmDialog=function(a){var b=angular.element(f[0].querySelector("#confirmDialog"));b.attr("style","display: block;"),e.selectedComment=a},e.cancelDialog=function(){var a=angular.element(f[0].querySelector("#confirmDialog"));a.removeAttr("style"),e.selectedComment=null},e.back=function(){window.history.back()}}]}),angular.module("clickOutside",[]),angular.module("clickOutside").directive("clickOutside",["$document","$parse","$timeout",function(a,b,c){return{restrict:"A",link:function(b,c,d){var e=function(a){var d=a.target.parentNode.nextElementSibling===c[0];d||b.isCollapsed||b.$apply(b.isCollapsed=!0)};b.$watch(c.hasClass(".navbar-collapse"),function(){a.bind("click",e)})}}}]),angular.module("kjNav",["post"]),angular.module("kjNav").directive("kjNav",["Post","$location",function(a,b){return{restrict:"E",templateUrl:"views/kj-nav.html",link:function(c,d,e){c.items=a.query(),c.selectItem=function(a,d,e){c.searchQuery="",b.path("/blog/"+a.id)},c.searchItem=function(){b.path("/blog/").search("q",c.searchQuery),c.searchQuery=""}}}}]),angular.module("simpleBlogApp").run(["$templateCache",function(a){a.put("views/about.html",'<h2>About</h2> <div class="btn-o"> <a id="follow-button" class="btn btn-primary btn-sm" title="Follow @koojam_pk on Twitter" href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ffollow-button&amp;ref_src=twsrc%5Etfw&amp;region=follow_link&amp;screen_name=koojam_pk&amp;tw_p=followbutton"> <i class="fa fa-twitter"></i> <span class="label" id="l">Follow <b>@koojam_pk</b></span> </a> </div> <div class="btn-o"> <a id="github-button" class="btn btn-primary btn-sm" title="Source code on Github" href="https://github.com/koojam-pk/angularjs-simple-blog-app" target="blank"> <i class="fa fa-github"></i> <span class="label">Source code on Github</span> </a> <br> </div> <article> <p>This is a simple blog web application that is taught in udemy - <b>Try AngularJS: Beginner\'s Guide to Front Web Devloper</b> course.</p> <p>What are taught in the course:-</p> <ul> <li>How to write directive</li> <li>How to write service</li> <li>How to use http</li> <li>How to map to a RESTful API</li> <li>How to use Typeahead</li> <li>How to use Bootstrap to style the web application (Bootstrap 4 beta is used)</li> </ul> <p>Additional learning not taught in the course</p> <ul> <li>Use Yeoman generator-angular to create project</li> <li>Use grunt for development and deployment</li> <li>Use bootstrap modal dialog to confirm deleting comment</li> </ul> </article>'),a.put("views/blog-detail.html",'<div class="row"> <div class="col-sm-8 mx-auto"> <div class="page-header"> <h1>{{ post.title }} <small>{{ post.publishDate }}</small></h1> </div> <span ng-if="post.image"> <img ng-src="{{ post.image }}" class="img-fluid"> <br> </span> <p>{{ post.description }}</p> <hr> <h3>Comments</h3> <div class="row" ng-show="comments.length>0"> <div class="col-sm-6"> <input class="form-control" type="text" ng-model="query" placeholder="Filter Comments"> <br> </div> </div> <ul ng-show="comments.length>0"> <li ng-repeat="comment in comments | filter: query"> {{ comment.text }} <a class="btn btn-sm btn-default delete-icon" ng-click="confirmDialog(comment)"> <i class="fa fa-trash pb-2" aria-hidden="true"></i></a> </li> </ul> <hr> <div class="row"> <div class="col-sm-6"> <p style="color:red" ng-if="reply.text">Preview: {{ reply.text }}</p> <form ng-submit="addReply()"> <input type="hidden" ng-model="reply.id"> <textarea class="form-control" ng-model="reply.text"></textarea> <button class="btn btn-primary mt-2" type="submit">Submit</button> <button class="btn btn-secondary mt-2" type="button" ng-click="back()">Back</button> </form> </div> </div> <div class="modal" id="confirmDialog"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title">Delete Comment</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <p>Are your sure?</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" ng-click="cancelDialog()">Cancel</button> <button type="button" class="btn btn-danger" ng-click="deleteComment()">Confirm</button> </div> </div> </div> </div> </div> </div>'),a.put("views/blog-list.html",'<div class="row"> <div class="col-12 mx-auto"> <h1 ng-hide="searchQuery" class="text-center">Blog List</h1> <h1 ng-show="searchQuery" class="text-center">Results for {{query}}</h1> <div class="row pb-2"> <div class="col-12 col-md-6 pb-2"> <input type="text" ng-model="query" class="form-control" placeholder="Filter"> </div> <div class="col-12 col-md-6 pb-2"> <select class="form-control" ng-model="order"> <option value="-publishDate">Recent</option> <option value="publishDate">Older</option> <option value="title">A-Z</option> <option value="-title">Z-A</option> </select> </div> </div> </div> <div class="row w-100 mx-auto"> <div class="col-md-2 d-none"></div> <div class="col-12 col-md-8 ml-0 pl-md-3"> <dir-pagination-controls ng-hide="query.length>0" pagination-id="sub-content"></dir-pagination-controls> </div> </div> <div class="row text-center"> <div class="col-12 col-sm-12" dir-paginate="item in items | orderBy: order | filter: query | itemsPerPage: 5 as postItems" pagination_id="sub-content"> <div class="thumbnail"> <a ng-href="/blog/{{ item.id }}" ng-if="item.image"> <img class="img-fluid pl-3 pr-3 pb-2" ng-src="{{ item.image }}" alt=""> </a> <div class="caption"> <h3><a ng-href="/blog/{{ item.id }}">{{ item.title }}</a></h3> <p>{{ item.text }} {{ item.publishDate }}</p> <p><a ng-href="/blog/{{ item.id }}" class="btn btn-primary">View</a></p> </div> </div> </div> <span ng-if="items.length == 0">Posts coming soon</span> </div> <div class="row w-100 mx-auto"> <div class="col-md-2 d-none"></div> <div class="col-12 col-md-8 ml-0 pl-md-3"> <dir-pagination-controls ng-hide="query.length>0" pagination-id="sub-content"></dir-pagination-controls> </div> </div> </div>'),a.put("views/kj-nav.html",'<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top"> <a class="navbar-brand" ng-href="/">KJ</a> <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" ng-click="isCollapsed=!isCollapsed" ng-init="isCollapsed=true" id="nav-button"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNavDropdown" ng-class="{show: !isCollapsed}" click-outside> <form class="form-inline" ng-submit="searchItem()"> <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" ng-model="searchQuery" uib-typeahead="item.title for item in items | filter:$viewValue | limitTo:8" typeahead-on-select="selectItem($item, $model, $label)"> <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> </form> <ul class="navbar-nav ml-auto"> <li class="nav-item"> <a class="nav-link" ng-href="/blog" ng-click="isCollapsed=!isCollapsed">Blog</a> </li> <li class="nav-item"> <a class="nav-link" ng-href="/about" ng-click="isCollapsed=!isCollapsed">About</a> </li> </ul> </div> </nav>')}]);