angular.module('myApp.index', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'view/index/index-template.html',
        controller: 'IndexCtrl'
    });
}])