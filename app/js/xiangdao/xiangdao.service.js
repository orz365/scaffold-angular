angular.module('xiangdao.service',[])

.service('xiangdao',['$timeout',function($timeout){

    var _this = this;

    this.loading = function(){
        var body = angular.element('body');
        body.append('<div class="zero-loading">加载中...</div>')
    }

    this.toast = function(msg,interval){
        var toast = angular.element('.bank-toast');
        toast.find('.message').text(msg);
        toast.show();
        $timeout(function(){
            toast.fadeOut();
        },interval || 2000)
    }

    this.showDialog = function(msg,okcallback,cancelcallback){
        var alert = angular.element('.bank-alert');
        alert.find('.content').text("确认保存退出？");
        alert.find('.btn-ok').unbind('click');
        alert.find('.btn-ok').bind('click',function(e){
            if(okcallback) okcallback();
        });
        alert.find('.btn-cancel').unbind('click')
        alert.find('.btn-cancel').bind('click',function(e){
            alert.hide();
            if(cancelcallback) cancelcallback();
        })
        alert.show();
    }

    this.getSearch = function(){
        var search = location.search;
        search = search.replace('?','').replace('/','');
        var searchArr = search.split('&');
        var param = {};
        for(var i = 0;i<searchArr.length;i++){
            var p =  searchArr[i].split("=");
            param[p[0]] = p[1];
        }
        return param;
    }

}])