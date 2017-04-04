'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'xiangdao.service',
    'xiangdao.directive',
    'myApp.index',
    'QuestionBank', //题库
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.otherwise({redirectTo: '/bank/index'});
}])



.service("mainService",[function(){
    this.show = function(){
        alert("name")
    }
}])
.controller("mainCtrl",['$scope',function($scope){

}])
