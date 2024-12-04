/*
* download
*/

var COMMON_WEB_DOWNLOAD = {};
COMMON_WEB_DOWNLOAD.WS = null;

COMMON_WEB_DOWNLOAD.actionWebContentsDownload = function(sendData, callbackFun){

	console.log('COMMON_WEB_DOWNLOAD.actionWebContentsDownload');
	console.log(sendData);

	var lastDownloadIdx = utility.disk.getStorageData('last_download_idx');
	if(isDefined(lastDownloadIdx) == true){
		if(sendData.bbsIdx != lastDownloadIdx){
			sendData.lastIdx = lastDownloadIdx;
		}
	}


	var DF = get_disk_config(false);
	var errFunDownloadAction = function(errData){
		console.log('errFunDownloadAction', errData);
		var data = DISK_PROTOCOL.checkServerValuation(errData, null);
		
		var errStatus = errData.status;
		console.log('errStatus', errStatus);
		if(isDefined(errStatus)){
			var errKey = errStatus.key;
			var errMsg = errStatus.message;
			//가격변동
			if(errKey == 'ERR_ONPLAY_DOWNLOAD_CHANGED_COPYRIGHT'){
				location.reload(true);
			}else if(errKey == 'ERR_ONPLAY_NON_LICENSE_BLOCK_CONTENTS'){
				window.history.back(true);
			}
		}
	}

	var openSuccessDownloaderApp = function(wsData, ws){
		console.log('openSuccessDownloaderApp');
		console.log(wsData);

		if(wsData.status == 0 ){
			COMMON_WEB_DOWNLOAD.showDownloaderApp();
			alert('다운로드 프로그램을 설치하셔야합니다.');
		}

		//프로그램 오류 - 재설치 안내
		else if(wsData.status == 2 ){
			COMMON_WEB_DOWNLOAD.showDownloaderApp();
			alert("다운로드 프로그램 버전이 올바르지 않습니다.\n재설치를 해주실 바랍니다.");
		}else if(wsData.status == 3 ){
			alert('다운로드할 콘텐츠를 선택해주세요.');
		}
		if(isDefined(wsData.ws)){
			wsData.ws.close();
			wsData.ws = null;
			COMMON_WEB_DOWNLOAD.WS = null;
		}

		if(isDefined(wsData.callbackFun)){
			//console.log(wsData.callbackFun);
			console.log('download callback fun del');
			wsData.callbackFun = null;
		}
	}

	var successFunDownloadAction = function(data){
		console.log('successFunDownloadAction', data);

		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		if(isDefined(data.download)){
			if(data.download.down_access_token){
				//alert('action download service');
				var down_access_token = Base64.encode(data.download.down_access_token);
				console.log('down_access_token', down_access_token);
				//웹소켓 지원여부
				if(isWebSocketSuport() == true){
					console.log('webWebSocketSuport');
					//var sendMessage = DF.WEB_APP_PROTOCOL_NAME.down_action+'://'+down_access_token+'://'+DF.WEB_APP_PROTOCOL_NAME.down_action;
					var sendMessage = DF.WEB_APP_PROTOCOL_NAME.down_action+'://'+down_access_token;
					COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER(sendMessage, openSuccessDownloaderApp);
				}else{
					console.log('customUrl');
					var customUrlCheckerFailFun = function(){
						console.log('customUrlCheckerFailFun');
					}
					var customUrlCheckersuccessFun = function(){
						console.log('customUrlCheckersuccessFun');
					}
					var downUrl = DF.WEB_APP_PROTOCOL_NAME.down_action+'://'+down_access_token+DF.WEB_APP_PROTOCOL_NAME.down_action+'://';
					console.log('customUrl open:'+downUrl);
					window.custom_url_checker(downUrl,customUrlCheckerFailFun, customUrlCheckersuccessFun);
				 	event.preventDefault ? event.preventDefault() : event.returnValue = false;
				}
			}
			//마지막 다운로드 저장
			if(isDefined(data.download.bbs_idx) == true){
				if(lastDownloadIdx != data.download.bbs_idx){
					utility.disk.setStorageData('last_download_idx', data.download.bbs_idx);
				}
			}
		}

		if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}

	}

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DOWNLOAD.DOWN_ACTION_WEB,
		data		: sendData,
		success_fun	: successFunDownloadAction,
		error_fun	: errFunDownloadAction
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;

};

//다운로드 프로그램 설치
COMMON_WEB_DOWNLOAD.showDownloaderApp = function(){
	console.log('COMMON_WEB_DOWNLOAD.showDownloaderApp');
	//alert('COMMON_WEB_DOWNLOAD.showDownloaderApp');

	PAGE_CONTENTS.showDownloaderGuide();

};


COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET = {};

//업로드 프로그램 설치 여부확인
COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER = function(callbackFun){
	console.log('COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_UPLOADER');


	var checkCallbackFun = function(callbackData){
		console.log('IS_INSTALL_DOWNLOADER checkCallbackFun');
		console.log('callbackData', callbackData);

		if(isDefined(callbackData.status)){
			//첫실행
			if(callbackData.status == 400){
		 		console.log('커스텀 실행해줘잉~~~<');
		 		console.log('customUrl');
				var customUrlCheckerFailFun = function(){
					console.log('customUrlCheckerFailFun');
				}
				var customUrlCheckersuccessFun = function(){
					console.log('customUrlCheckersuccessFun');
				}
				delDiskInstalledCUS('upload');
				var starterUrl = DF.WEB_APP_PROTOCOL_NAME.starter+'://';
				console.log('customUrl starterUrl:'+starterUrl);
				window.custom_url_checker(starterUrl,customUrlCheckerFailFun, customUrlCheckersuccessFun);
			 	event.preventDefault ? event.preventDefault() : event.returnValue = false;

		 		return;
			}
		}

		if(isDefined(callbackData.ws)){
			console.log('callbackData.ws close');
			callbackData.ws.close();
			callbackData.ws = null;
			COMMON_WEB_DOWNLOAD.WS = null;
		}


		if (typeof callbackFun === "function"){
			callbackFun(callbackData, callbackData.ws);
			return;
		}
	}

	var DF = get_disk_config(false);
	var sendMessage = DF.WEB_APP_PROTOCOL_NAME.starter;

	COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER_WS('starter', sendMessage, checkCallbackFun);
};



//다운로드 호출
COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER = function(sendMessage, callbackFun){
	console.log('COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER',sendMessage);



	var checkCallbackFun = function(callbackData, ws){
		console.log('checkCallbackFun');
		console.log('callbackData', callbackData);

		if(isDefined(callbackData.status)){

		}

		if(isDefined(callbackData.ws)){
			callbackData.ws.close();
			callbackData.ws = null;
			COMMON_WEB_DOWNLOAD.WS = null;
		}

		if (typeof callbackFun === "function"){
			callbackFun(callbackData);
			return;
		}
	}

	//var DF = get_disk_config(false);
	//var sendMessage = DF.WEB_APP_PROTOCOL_NAME.starter;

	COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER_WS('down_action', sendMessage, checkCallbackFun);
	return;
};



COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER_WS = function(wsType, sendMessage, callbackFun){
	console.log('COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.OPEN_DOWNLOADER',sendMessage);

	var callbackData = {

		status	:	-1,
		type	:	wsType,
		s_msg	:	sendMessage,
		g_msg	:	null,
		err_code:	null,
		err_msg	:	null,
		ws		:	null,
		callbackFun	: callbackFun
	}
	console.log('callbackData', callbackData);

	if(isDefined(sendMessage) == false){
		if (typeof callbackData.callbackFun === "function"){
			callbackData.callbackFun(callbackData);
			return;
		}
		alert('다운로드할 콘텐츠를 선택해주세요.');
		return;
	}



	//이미 소켓이 있으면
	console.log('COMMON_WEB_DOWNLOAD.WS', COMMON_WEB_DOWNLOAD.WS);
	if(isDefined(COMMON_WEB_DOWNLOAD.WS)){
		if(COMMON_WEB_DOWNLOAD.WS.hasOwnProperty('readyState')){
			console.log('COMMON_WEB_DOWNLOAD.WS.readyState', COMMON_WEB_DOWNLOAD.WS.readyState);
			if(COMMON_WEB_DOWNLOAD.WS.readyState == '1'){
				console.log('ws readyState');
				if(isDefined(sendMessage)){
					console.log('has msg');
					COMMON_WEB_DOWNLOAD.WS.send(sendMessage);
					return;
				}
			}
		}
	}




	var setConnectedErr = function(connected) {
		console.log('setConnected', connected);
		alert('다운로드 프로그램을 설치하셔야합니다.');
		return;
	}

	var ws = null;
	//var target = 'wss://127.0.0.1:3284';
	var target = 'ws://127.0.0.1:3284';
	//var target = 'ws://localhost:3284';
	if (target == '') {
		alert('Please select server side connection implementation.');
		return;
	}
	var diskWebSocketConnect = function()
	{
		try {

			if ('WebSocket' in window) {
				ws = new WebSocket(target);
			} else if ('MozWebSocket' in window) {
				ws = new MozWebSocket(target);
			} else {
				alert('지원하지 않는 브라우저입니다.');
				return;
			}

			ws.onopen = function () {
				//setConnected(true);
				console.log('Info: WebSocket connection opened.');

				COMMON_WEB_DOWNLOAD.WS = ws;
				if(isDefined(sendMessage)){
					ws.send(sendMessage);
				}

			};
			ws.onmessage = function (event) {
				console.log('Received: ' + event.data);
				var successMsg = -1;
				var receivedData;
				if(isDefined(event.data)){
					if(isNumber(event.data)){
						successMsg = parseInt(event.data);
					}else{
						receivedData = event.data;
					}
				}
				callbackData.status = successMsg;
				callbackData.g_msg = receivedData;
				callbackData.ws = ws;
				if (typeof callbackData.callbackFun === "function"){
					callbackData.callbackFun(callbackData);
					//ws.close();
					return;
				}

				//alert('Received: ' + event.data);
				/*
				var successMsg = 2;
				if(isDefined(event.data)){
					if(event.data == '1' || event.data != 1){
						successMsg = 1;
					}
				}
				//successMsg = 2;
				if (typeof callbackFun === "function"){
					callbackFun(successMsg, ws);
					return;
				}
				*/

			};

			ws.onclose = function (event) {
				//setConnected(false);
				console.log('Info: WebSocket connection closed, Code: ' + event.code + (event.reason == "" ? "" : ", Reason: " + event.reason));
				//return;
				if(wsType == 'starter'){
					if(isDefined( event.code)){
						if( event.code != '1000'){
							callbackData.err_code = event.code;
							callbackData.err_msg = event.reason;
							if (typeof callbackData.callbackFun === "function"){
								//callbackFun(false, ws);
								callbackData.callbackFun(callbackData);
								return;
							}
							//alert('다운로드 프로그램을 설치하셔야합니다.');
							if(isNaN(event.code) == false){
								if(event.code > 1000 &&  event.code <= 1015){
									console.log('ws onclose err');
									return;
								}
							}
						}
					}
				}
			};
		} catch (exception) {
			//alert('catch')
			setConnectedErr(false);
			console.log('ERROR exception : ',exception);

		}
	}
	diskWebSocketConnect();
};

//다운로드 전용  프로그램 받기
COMMON_WEB_DOWNLOAD.getDownloaderInstallApp = function(){
	console.log('COMMON_WEB_DOWNLOAD.getDownloaderInstallApp');
	alert('설치 프로그램 다운로드를 시작합니다.');
	PAGE_CONTENTS.hideDownloaderGuide();

	var DF = get_disk_config(false);

	location.href = DF.URL_INSTALL_DOWNLOADER_EXE;

};


//COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER
/*

var ws = null;
	//var sendMessage = 'onplay_download://'+down_access_token;
	if(isDefined(sendMessage) == false){
		if (typeof callbackFun === "function"){
			callbackFun(3, null);
			return;
		}
		alert('다운로드할 콘텐츠를 선택해주세요.');
		return;
	}

	var setConnected = function(connected) {
		console.log('setConnected', connected);
		if(connected){
			ws.send(sendMessage);
			return;
		}else{
			if (typeof callbackFun === "function"){
				callbackFun(0, ws);
				return;
			}else{
				//COMMON_WEB_DOWNLOAD.showDownloaderApp();
				alert('다운로드 프로그램을 설치하셔야합니다.');
			}
		}

		return;
	}

	var target = 'ws://127.0.0.1:3284';
	if (target == '') {
		alert('Please select server side connection implementation.');
		return;
	}
	var diskWebSocketConnect = function()
	{
		try {

			if ('WebSocket' in window) {
				ws = new WebSocket(target);
			} else if ('MozWebSocket' in window) {
				ws = new MozWebSocket(target);
			} else {
				alert('지원하지 않는 브라우저입니다.');
				return;
			}

			ws.onopen = function () {
				setConnected(true);
				console.log('Info: WebSocket connection opened.');
			};
			ws.onmessage = function (event) {
				console.log('Received: ' + event.data);
				//alert('Received: ' + event.data);
				var successMsg = 2;
				if(isDefined(event.data)){
					if(event.data == '1' || event.data != 1){
						successMsg = 1;
					}
				}
				//successMsg = 2;
				if (typeof callbackFun === "function"){
					callbackFun(successMsg, ws);
					return;
				}

			};

			ws.onclose = function (event) {
				//setConnected(false);
				console.log('Info: WebSocket connection closed, Code: ' + event.code + (event.reason == "" ? "" : ", Reason: " + event.reason));
			};
		} catch (exception) {
			//alert('catch')
			setConnected(false);
			console.log('ERROR exception : ',exception);

		}
	}
	diskWebSocketConnect();

COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.IS_INSTALL_SOCKET = function(callbackFun){
	console.log('COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER');
	var ws = null;


	var setConnected = function(connected) {
		console.log('setConnected', connected);
		if (typeof callbackFun === "function"){
			callbackFun(connected, ws);
			return;
		}
		return;
	}

	var target = 'ws://127.0.0.1:3284';
	if (target == '') {
		alert('Please select server side connection implementation.');
		return;
	}
	var diskWebSocketConnect = function()
	{
		try {

			if ('WebSocket' in window) {
				ws = new WebSocket(target);
			} else if ('MozWebSocket' in window) {
				ws = new MozWebSocket(target);
			} else {
				alert('지원하지 않는 브라우저입니다.');
				return;
			}

			ws.onopen = function () {
				setConnected(true);
				console.log('Info: WebSocket connection opened.');
			};
			ws.onmessage = function (event) {
				console.log('Received: ' + event.data);
			};

			ws.onclose = function (event) {
				//setConnected(false);
				console.log('Info: WebSocket connection closed, Code: ' + event.code + (event.reason == "" ? "" : ", Reason: " + event.reason));
				if(isDefined( event.code)){
					if( event.code != '1000'){
						if (typeof callbackFun === "function"){
							callbackFun(false, ws);
							return;
						}
						alert('다운로드 프로그램을 설치하셔야합니다.');
					}
				}

			};
		} catch (exception) {
			//alert('catch')
			setConnected(false);
			console.log('ERROR exception : ',exception);

		}
	}

	diskWebSocketConnect();
};
*/
