/**
 * 初始化微信分享
 * @param shareDesc 配置分享信息
 */
function initWxShare(shareDesc){
	$(function(){
		 $.getJSON(HOST_SHARE,{valid_url:window.location.href},function(data){
	 		var datas = data.datas;
	 		initWxConfig(datas,shareDesc);
	 	 })
    })
}
/**
 * 初始化微信配置
 * @param datas 配置参数
 */
function initWxConfig(datas,shareDesc){
	var shareData = {
		  title: '享到教育',
	      desc: '享到教育',
	      link: window.location.href,
	      imgUrl: '../img/logo.png',
	  };
	if(shareDesc){
		$.extend(shareData,shareDesc); 
	}
	
	wx.config({
	 	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	 	    appId: datas.appId, // 必填，公众号的唯一标识
	 	    timestamp: datas.timestamp, // 必填，生成签名的时间戳
	 	    nonceStr: datas.nonceStr, // 必填，生成签名的随机串
	 	    signature: datas.signature,// 必填，签名，见附录1 
	 	    jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'translateVoice',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'onVoicePlayEnd',
				'pauseVoice',
				'stopVoice',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard'
	 	   ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	 	});  
	
	wx.ready(function () {
		  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断

		  // 2. 分享接口
		  // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
		 wx.onMenuShareAppMessage({
		      title: shareData.title,
		      desc: shareData.desc,
		      link: shareData.link,
		      imgUrl: shareData.imgUrl,
		      trigger: function (res) {
		        //alert('用户点击发送给朋友');
		      },
		      success: function (res) {
		        //alert('已分享');
		    	  if(shareData.friendCallback){
		    		  shareData.friendCallback();
		    	  }
		      },
		      cancel: function (res) {
		        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });
//		    alert('已注册获取“发送给朋友”状态事件');

		  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
		    wx.onMenuShareTimeline({
		    	 title: shareData.title,
		         desc: shareData.desc,
		         link: shareData.link,
		         imgUrl: shareData.imgUrl,
		      trigger: function (res) {
		        //alert('用户点击分享到朋友圈');
		      },
		      success: function (res) {
		        //alert('已分享');
		    	  if(shareData.friendCallback){
		    		  shareData.friendCallback();
		    	  }
		      },
		      cancel: function (res) {
		        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });
//		    alert('已注册获取“分享到朋友圈”状态事件');

		  // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
		    wx.onMenuShareQQ({
		    	 title: shareData.title,
		         desc: shareData.desc,
		         link: shareData.link_qq,
		         imgUrl: shareData.imgUrl,
		      trigger: function (res) {
		        //alert('用户点击分享到QQ');
		      },
		      complete: function (res) {
		        //alert(JSON.stringify(res));
		      },
		      success: function (res) {
		        //alert('已分享');
		      },
		      cancel: function (res) {
		        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });
		    
		  // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
		    wx.onMenuShareWeibo({
		    	 title: shareData.title,
		         desc: shareData.desc,
		         link: shareData.link,
		         imgUrl: shareData.imgUrl,
		      trigger: function (res) {
		        //alert('用户点击分享到微博');
		      },
		      complete: function (res) {
		        //alert(JSON.stringify(res));
		      },
		      success: function (res) {
		        //alert('已分享');
		      },
		      cancel: function (res) {
		        alert('已取消');
		      },
		      fail: function (res) {
		        alert(JSON.stringify(res));
		      }
		    });


		});
		wx.error(function (res) {
			console.log(res.errMsg);
		  //alert(res.errMsg);
		});
}