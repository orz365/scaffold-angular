angular.module('myApp')
    .service("HttpService", ['$http', '$q', function ($http, $q) {
        this.get = function (url,params) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                param:params,
                cache: false
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject(data);
            })
            return deferred.promise;
        }
    }])