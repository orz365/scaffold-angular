angular.module('QuestionBank', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/bank/index', {
            templateUrl: 'view/itembank/bank-index.template.html',
            controller: 'bankIndexCtrl'
        })
            .when('/bank/question',{
                templateUrl:'view/itembank/bank-question.template.html',
                controller:'bankQuestionCtrl'
            })
            .when('/bank/result',{
                templateUrl:'view/itembank/bank-result.template.html',
                controller:'bankQuestionCtrl'
            })
            .when('/bank/sjcs',{
                templateUrl: 'view/itembank/bank-sjcs.template.html',
                controller: 'bankSjcsCtrl'
            })
            .when('/bank/zxts',{
                templateUrl:'view/itembank/bank-zxts.template.html',
                controller:'bankZxtsCtrl'
            })
            .when('/bank/qzmn',{
                templateUrl:'view/itembank/bank-qzmn.template.html',
                controller:'bankQzmnCtrl'
            })
            .when('/bank/qzmn/desc',{
                templateUrl:'view/itembank/bank-qzmn-desc.template.html',
                controller:'bankQzmnCtrl'
            })


    }])