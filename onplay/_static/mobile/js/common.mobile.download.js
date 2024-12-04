/*
* download
*/

var COMMON_MOBILE_DOWNLOAD = {};


COMMON_MOBILE_DOWNLOAD.actionMobileContentsPay = function(sendData, callbackFun){

	console.log('COMMON_MOBILE_DOWNLOAD.actionMobileContentsPay');
	console.log(sendData);

	var lastDownloadIdx = utility.disk.getStorageData('last_download_idx');
	if(isDefined(lastDownloadIdx) == true){
		if(sendData.bbsIdx != lastDownloadIdx){
			sendData.lastIdx = lastDownloadIdx;
		}
	}
	
	var isSetMobile = true;
	var DF = get_disk_config(isSetMobile);
	var errFunDownloadAction = function(errData){
		console.log('errFunDownloadAction', errData);
		var data = DISK_PROTOCOL.checkServerValuation(errData, null);

	}
	var successFunDownloadAction = function(data){
		console.log('successFunDownloadAction', data);

		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, isSetMobile);
		}
		if(isDefined(data.download)){
			
			//마지막 다운로드 저장
			if(isDefined(data.download.bbs_idx) == true){
				if(lastDownloadIdx != data.download.bbs_idx){
					utility.disk.setStorageData('last_download_idx', data.download.bbs_idx);
				}
			}
			
			//다운로드 idx 저장
			if(isDefined(data.download.contents_down_log) == true){
				utility.disk.setdownContentsLog(data.member.member_idx,data.download.contents_down_log);
			}
		}

		if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}

	}

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DOWNLOAD.DOWN_ACTION_MOBILE,
		data		: sendData,
		success_fun	: successFunDownloadAction,
		error_fun	: errFunDownloadAction
	};
	console.log(ajaxData);
	
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;

};

//모바일 웹에서 모바일 앱 실행- 호출
COMMON_MOBILE_DOWNLOAD.openIntentOnpleApp = function(urlType, Idx){
	console.log('COMMON_MOBILE_DOWNLOAD.openIntentOnpleApp');
	
	if(isMobileAgent() != true){
		console.log('not mobile agent');
		return;
	}
	if(isDefined(urlType) == false){
		urlType = 'm_open';
	}
			
	var thiAgent = getMobileBrowserInfo();
	console.log('thiAgent', thiAgent);
	
	var browserName = thiAgent.browser.name.toLowerCase();
	console.log('browserName', browserName);
	

	var DF = get_disk_config(true);
	var custumSkimUrl = null;
	
	var ios_appstoreUrl = "https://itunes.apple.com/kr/app/instagram/id389801252?mt=8";
	var ios_appUrl = "instagram://media";
	var runApp_ios = function() {
	    var clickedAt = +new Date;
	 
	    var naverAppCheckTimer = setTimeout(function () {
	        if (+new Date - clickedAt < 2000)
	            if (window.confirm("네이버앱 최신 버전이 설치되어 있지 않습니다.\n설치페이지로 이동하시겠습니까?"))
	                location.href = ios_appstoreUrl;
	    }
	        , 1500);
	    location.href = ios_appUrl;
	}
	 
	//여기까지 IOS
	 
	 
	//var android_marketUrl = "market://details?id=com.google.zxing.client.android";
	//var android_appUrl = "zxing://scan";
	//var android_intent = "intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end";
	
	var appScheme = 'onplay_arkworks';
	
	if(urlType == 'm_down'){
		appScheme = 'onplay.downloader.start';
	}else if(urlType == 'stream'){
		appScheme = 'onplay.streaming';
	}
	
	var appServiceUrl = 'https://m.onplay.co.kr';
	var appUrl = appServiceUrl+'/mobile.php?is_app=1&app_key=&app_ver='+DF.app_ver+'&push_key=';
	var appHost = 'com.arkworks.onplay';
	if(urlType == 'm_open'){
		if(isDefined(Idx)){
			appHost = 'com.arkworks.onplay';
			appUrl = appServiceUrl+'/#!action=contents&idx='+Idx+'&link=category&page=1'
		}
	}
	
	var app_package = 'com.arkworks.onplay';
	var openUrl = encodeURIComponent(appUrl);
	
	var android_marketUrl = DF.app_market_url;
	var android_appUrl = appScheme+"://"+appHost;
	//var android_intent = "intent://calc/#Intent;scheme=gsbk;package="+DF.app_package+";end";
	//intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end
	//var android_intent = 'intent://'+appHost+'/#Intent;package='+DF.app_package+';scheme='+appScheme+';end';
	var android_intent = 'intent://'+appHost+'?onplay_request_url='+openUrl+'#Intent;scheme='+appScheme+';package='+app_package+';end'
	
	//alert(android_intent);
	
	//onplay_arkworks://com.arkworks.onplay?url=
	
	console.log('android_marketUrl', android_marketUrl);
	console.log('android_appUrl', android_appUrl);
	console.log('android_intent', android_intent); 
	//alert('urlType:'+urlType);
	if(urlType == 'market'){
		android_intent = android_marketUrl;
	}
	 
	var timer;
	var heartbeat;
	var iframe_timer;
	 
	var clearTimers = function() {
	    clearTimeout(timer);
	    clearTimeout(heartbeat);
	    clearTimeout(iframe_timer);
	};
	 
	var intervalHeartbeat = function() {
	    if (document.webkitHidden || document.hidden) {
	        clearTimers();
	    }
	};
	 
	var tryIframeApproach = function() {
	    var iframe = document.createElement("iframe");
	    iframe.style.border = "none";
	    iframe.style.width = "1px";
	    iframe.style.height = "1px";
	    iframe.onload = function () {
	        document.location = android_marketUrl;
	    };
	    iframe.src = android_appUrl;
	    document.body.appendChild(iframe);
	};
	 
	var tryWebkitApproach = function() {
	    document.location = android_appUrl;
	    timer = setTimeout(function () {
	        document.location = android_marketUrl;
	    }, 2500);
	};
	 
	var useIntent = function() {
		console.log('useIntent');
	    document.location = android_intent;
	};
	 
	var launch_app_or_alt_url = function(el) {
	    heartbeat = setInterval(intervalHeartbeat, 200);
	    if(browserName == 'chrome'){
	        useIntent();
	    //} else if (navigator.userAgent.match(/Firefox/)) {
	    }else if(browserName == 'firefox'){	
	        tryWebkitApproach();
	        iframe_timer = setTimeout(function () {
	            tryIframeApproach();
	        }, 1500);
	    } else {
	        tryIframeApproach();
	    }
	};
	

	if(checkMobileDeviceAgent() == 'IOS'){
		runApp_ios();
	}else{
		launch_app_or_alt_url($(this));
  		event.preventDefault();
	}
	
	return;		

};

//인앱에서 파일 다운로드 호출
COMMON_MOBILE_DOWNLOAD.contentsDownloadWithApp = function(down){
	console.log('COMMON_MOBILE_DOWNLOAD.contentsDownloadWithApp');
	console.log(down);
	
	if(isDefined(down.mobile_app_download_url) == false){
		disk_alert('다운로드 주소가 올바르지 않습니다. 관리자에게 문의해주세요.');
		return;	
	}
	
	var opeeOnplayApp = function(){
		if(checkMobileDeviceAgent() == 'AOS'){
			COMMON_MOBILE_DOWNLOAD.openIntentOnpleApp('m_open', down.bbs_idx);
			return;
		}
	};
	
	if(isMobileOnplayWebviewAgent() != true){
		disk_alert('전용앱에서만 파일 다운로드가 가능합니다. 전용 앱을 설치해주세요.',opeeOnplayApp);
		return;
	}
	var downUrl = 'onplay.downloader.start://'+down.mobile_app_download_url;
	//alert(downUrl);
	location.href = downUrl;
	
};


