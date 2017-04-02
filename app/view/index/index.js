'use strict';

angular.module('myApp.index', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view/index/index.html',
            controller: 'IndexCtrl'
        });
    }])

    .controller('IndexCtrl', ['$scope','version','appName',function ($scope,version,appName) {
        console.log(version,appName)

        $scope.appName = appName;
    }]);

