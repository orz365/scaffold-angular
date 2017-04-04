'use strict';
angular.module('myApp.index')

.controller('IndexCtrl', ['$scope','HttpService',function ($scope,HttpService) {
    HttpService.get("");
}]);

