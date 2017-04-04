angular.module("QuestionBank")
/**
 * 题库首页
 */
    .controller("bankIndexCtrl", ['$scope', '$location','HttpService','xiangdao', function ($scope, $location,HttpService,xiangdao) {

        var itemPath = {
            'sjcs': 'bank/sjcs',  //随机测试
            'zxts': 'bank/zxts',  //专项提升
            'qzmn': 'bank/qzmn',  //全真模拟
            'yctj': 'bank/zxts',  //易错题集 与 专项提升用一个界面
            'mszt': 'bank/mszt',  //名师专题
            'xxbg': 'bank/xxbg'   //学习报告
        }
        /**
         * 跳转页面
         * @param indexName
         */
        $scope.goItemDetail = function (indexName) {
            $location.path(itemPath[indexName]);
        }
        var code = xiangdao.getSearch()['code'];
        var a = HttpService.get('http://zx.omniinfo.cn/zaxue/wxpage/xdwx_param?code='+code,{});
        a.then(function(data){
            var param1 = {}
            param1['jsapi_ticket'] = data.jsapi_ticket;
            param1['nonceStr'] = data.nonceStr;
            param1['timestamp'] = data.timestamp;
            param1['url'] = window.location.href;
            var p = [];
            p.push('jsapi_ticket='+data.jsapi_ticket)
            p.push('noncestr='+data.nonceStr)
            p.push('timestamp='+data.timestamp)
            var url = "http://zx.omniinfo.cn/zaxue/static/build/"+window.location.search;
            p.push('url='+url)
            var signature = CryptoJS.SHA1(p.join("&")).toString();
            console.log(p);
            console.log(signature);
            data.signature = signature;
            initWxConfig(data);
        })

    }])
    /**
     * 随机测试
     */
    .controller('bankSjcsCtrl', ['$scope','$location', function ($scope,$location) {
        $scope.goItemDetail = function(){
            $location.path('bank/question');
        }
    }])
    /**
     * 专项提升、易错题集
     */
    .controller("bankZxtsCtrl", ['$scope','$location', function ($scope,$location) {

        $scope.toggleItem = function(e){
            angular.element(e.target).parents('.outer').toggleClass('close');
        }

        $scope.continueLast = function(e){
            console.log("打开上次练习")
            console.log(e);
            e.stopPropagation();
        }

        /**
         * 跳转到具体习题内容
         */
        $scope.goItemDetail = function(){
            $location.path('bank/question')
        }

    }])
    /**
     * 全真模拟
     */
    .controller("bankQzmnCtrl", ['$scope','$location', function ($scope,$location) {

        $scope.toggleItem = function(e){
            angular.element(e.target).parents('.outer').toggleClass('close');
        }

        $scope.continueLast = function(e){
            console.log("打开上次练习")
            console.log(e);
            e.stopPropagation();
        }

        /**
         * 跳转到具体习题内容
         */
        $scope.goItemDetail = function(){
            $location.path('bank/question')
        }

        $scope.gotItemDesc = function(){
            $location.path('bank/qzmn/desc')
        }

    }])

    /**
     * 公共做题界面
     */
    .controller("bankQuestionCtrl", ['$scope','$interval','$location','xiangdao','$timeout', function ($scope,$interval,$location,xiangdao,$timeout) {
        $scope.title = "在angularJS中免不了使用<a></a>标签，使用的时候，在google下，能够正常的过滤掉默认事件，但是在IE中，不行。在IE8里面，如果不进行默认事件的阻止，那么会在执行完相应的代码后，再执行默认的事件。那么，在angularjs中如何解决这个问题。在AngularJS中有一个$event参数。这个是angualrjs处理事件后对外暴露的接口，让开发者使用。下面是一个使用的小例子：";
        $scope.title += "在angularJS中免不了使用<a></a>标签，使用的时候，在google下，能够正常的过滤掉默认事件，但是在IE中，不行。在IE8里面，如果不进行默认事件的阻止，那么会在执行完相应的代码后，再执行默认的事件。那么，在angularjs中如何解决这个问题。在AngularJS中有一个$event参数。这个是angualrjs处理事件后对外暴露的接口，让开发者使用。下面是一个使用的小例子：";
        $scope.title += "在angularJS中免不了使用<a></a>标签，使用的时候，在google下，能够正常的过滤掉默认事件，但是在IE中，不行。在IE8里面，如果不进行默认事件的阻止，那么会在执行完相应的代码后，再执行默认的事件。那么，在angularjs中如何解决这个问题。在AngularJS中有一个$event参数。这个是angualrjs处理事件后对外暴露的接口，让开发者使用。下面是一个使用的小例子：";
        $scope.title += "在angularJS中免不了使用<a></a>标签，使用的时候，在google下，能够正常的过滤掉默认事件，但是在IE中，不行。在IE8里面，如果不进行默认事件的阻止，那么会在执行完相应的代码后，再执行默认的事件。那么，在angularjs中如何解决这个问题。在AngularJS中有一个$event参数。这个是angualrjs处理事件后对外暴露的接口，让开发者使用。下面是一个使用的小例子：";

        $scope.clockValue = 0; //当前定时器值
        $scope.questionIndex = 0;  //当前试题下标

        $scope.showMore = function(e){
            angular.element('.more-list').toggle();
        }
        $scope.collectThis = function(e){
            xiangdao.toast('收藏成功');
            $timeout(function(){
                angular.element('.more-list').hide();
            },300)
            e.stopPropagation();
        }
        $scope.shareThis = function(e){

            e.stopPropagation();
        }

        /**
         * 选择选项
         * @param e
         */
        $scope.selectOption = function(e){
            console.log(angular.element(e.target))
            angular.element(e.target).parents('.options').find('.option').removeClass('checked');
            if(angular.element(e.target).hasClass('option')){
                angular.element(e.target).addClass('checked');
            }else{
                angular.element(e.target).parents('.option').addClass('checked');
            }
        }

        $scope.preQuestion = function(e){
            angular.element('.questions .question').hide();
            angular.element('.questions .question').each(function(i,val){
                var index = $(this).data('index');
                if(index == 1){
                    $(this).show();
                }
            })
        }

        $scope.nextQuestion = function(e){
            angular.element('.questions .question').hide();
            angular.element('.questions .question').each(function(i,val){
                var index = $(this).data('index');
                if(index == 2){
                    $(this).show();
                }
            })
        }



        /**
         * 保存退出
         */
        $scope.saveQuit = function(e){
            xiangdao.showDialog('确认保存退出？',function(){
                $location.path('bank/index')
            })
            e.stopPropagation();
        }
        /**
         * 保存退出
         */
        $scope.submitQuestion = function(e){
            xiangdao.showDialog('您还有题目未做完，确定交卷吗？',function(){
                $location.path('bank/index')
            })
            e.stopPropagation();
        }

        $scope.toggleItem = function(e){
            angular.element(e.target).parents('.material').toggleClass('close');
        }

        var formatSecond = function(s){
            var fillleft = function(m){
                m = m < 10 ? '0'+m : m;
                return m;
            }

            var h = Math.floor(s/60/60),
                m = Math.floor(s%60/60),
                s = Math.floor(s%60%60);
            h = fillleft(h);
            m = fillleft(m);
            s = fillleft(s);
            var tmp = [];
            if(h == 0){
                tmp = [m,s];
            }else{
                tmp = [h,m,s];
            }
            return tmp.join(":");
        }

        $scope.initClock = function(){
            var clock = angular.element('.question-header .clock');
            clock.text(formatSecond($scope.clockValue))
            $interval(function(){
                clock.text(formatSecond($scope.clockValue++))
            },1000)
        }
        $scope.$on('$viewContentLoaded', function() {

        });
    }])
