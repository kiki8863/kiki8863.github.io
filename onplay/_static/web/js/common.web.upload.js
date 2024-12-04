/*
* upload
*/

var COMMON_WEB_UPLOAD = {};
COMMON_WEB_UPLOAD.WS = null;		//websocket
var IS_UPLOADER_INSTALLED_WS = false;		//upload 파일 설치 여부 - 사용중이다 끈어진 경우 처리

COMMON_WEB_UPLOAD.DISK_WEBSOCKET = {};

//업로드 프로그램 설치 여부확인
COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_UPLOADER = function(callbackFun){
	console.log('COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_UPLOADER');	
	
	
	var checkCallbackFun = function(callbackData){
		console.log('checkCallbackFun');
		console.log('callbackData', callbackData);
		
		if(isDefined(callbackData.status)){
			//첫실행
			if(callbackData.status == 400){
		 		console.log('커스텀 실행해줘잉~~~<');
		 		console.log('customUrl');
		 		$('.upfile-check-curl').show();
		 		
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
		
		
		if (typeof callbackFun === "function"){
			callbackFun(callbackData, callbackData.ws);
			return;
		}
		//starter
		//if()
		
		/*
		console.log('xh', xh);
		var isInstalled = true;
		if(xh != 1){
			isInstalled = false;
		}
		
		if (typeof callbackFun === "function"){
			callbackFun(isInstalled);
			return;
		}
		
		if(isInstalled != true){
			alert('업로드 전용 프로그램을 설치하셔야합니다.');
		}
		*/
	}
	
	var DF = get_disk_config(false);
	var sendMessage = DF.WEB_APP_PROTOCOL_NAME.starter;
	
	COMMON_WEB_UPLOAD.DISK_WEBSOCKET.UP_CONNECT('starter', sendMessage, checkCallbackFun);
};

//파일업로드 및 폴더 선택
COMMON_WEB_UPLOAD.DISK_WEBSOCKET.SELECT_UP_FILES = function(selectType, callbackFun){
	console.log('COMMON_WEB_UPLOAD.DISK_WEBSOCKET.SELECT_UP_FILES');
	
	var upFileSelectCallbackFun = function(data){
		console.log('upFileSelectCallbackFun');
		console.log('data', data)
		
		if(isDefined(data)){
			if (typeof callbackFun === "function"){
				callbackFun(data);
				return;
			}
		}
		
		return;
		/*
		var isInstalled = true;
		if(xh != 1){
			isInstalled = false;
		}
		
		if (typeof callbackFun === "function"){
			callbackFun(isInstalled);
			return;
		}
		
		if(isInstalled != true){
			alert('업로드 전용 프로그램을 설치하셔야합니다.');
		}
		*/
	}
	
	var DF = get_disk_config(false);
	var sendMessage = DF.WEB_APP_PROTOCOL_NAME.up_file;
	if(selectType == 'folder'){
		sendMessage = DF.WEB_APP_PROTOCOL_NAME.up_folder;
	}
	
	COMMON_WEB_UPLOAD.DISK_WEBSOCKET.UP_CONNECT('up_'+selectType, sendMessage, upFileSelectCallbackFun);
	
	
};


//업로드 실행
COMMON_WEB_UPLOAD.DISK_WEBSOCKET.OPEN_UPLOADER = function(accessToken, callbackFun){
	console.log('COMMON_WEB_UPLOAD.DISK_WEBSOCKET.OPEN_UPLOADER');
	
	if(isDefined(accessToken) == false){
		console.log('토큰 정보가 올바르지 않습니다.');
		return;
	}
	
	var upFileActionCallbackFun = function(data){
		console.log('upFileActionCallbackFun');
		console.log('data', data)
		
		if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}
		return;
	}
	var DF = get_disk_config(false);
	var sendMessage = DF.WEB_APP_PROTOCOL_NAME.up_action+'://'+accessToken;
	
	COMMON_WEB_UPLOAD.DISK_WEBSOCKET.UP_CONNECT('up_action', sendMessage, upFileActionCallbackFun);
};


COMMON_WEB_UPLOAD.DISK_WEBSOCKET.UP_CONNECT = function(wsType, sendMessage, callbackFun){
	console.log('COMMON_WEB_UPLOAD.DISK_WEBSOCKET.UP_CONNECT',sendMessage);
	//ws = null;
	//var sendMessage = 'onplay_download://'+down_access_token;
	
	
	var callbackData = {
		
		status	:	-1,
		type	:	wsType,
		s_msg	:	sendMessage,
		g_msg	:	null,
		err_code:	null,
		err_msg	:	null,
		ws		:	null,
	}
	
	if(isDefined(sendMessage) == false){
		console.log('aaaa');
		if (typeof callbackFun === "function"){
			callbackFun(callbackData);
			return;
		}
		
		alert('업로드할 콘텐츠를 선택해주세요.');
		return;
	}
	/*
	var setConnected = function(connected) {
		console.log('setConnected', connected);
		if(connected){
			console.log('connect sendMessage', sendMessage);
			ws.send(sendMessage);
			return;	
		}else{
			console.log('connected ok');
			if (typeof callbackFun === "function"){
				callbackFun(0);
				return;
			}else{
				//COMMON_WEB_UPLOAD.showDownloaderApp();
				alert('업로드 전용 프로그램을 설치하셔야합니다.');		
			}
		}
		
		return;
	}
	*/
	
	//이미 소켓이 있으면
	console.log('COMMON_WEB_UPLOAD.WS', COMMON_WEB_UPLOAD.WS);
	if(isDefined(COMMON_WEB_UPLOAD.WS)){
		if(COMMON_WEB_UPLOAD.WS.hasOwnProperty('readyState')){
			console.log('COMMON_WEB_UPLOAD.WS.readyState', COMMON_WEB_UPLOAD.WS.readyState);
			if(COMMON_WEB_UPLOAD.WS.readyState == '1'){
				console.log('ws readyState');
				if(isDefined(sendMessage)){
					console.log('has msg');
					COMMON_WEB_UPLOAD.WS.send(sendMessage);
					return;
				}
			}
		}
	}
	
	var ws = null;
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
				//setConnected(true);
				console.log('======================onopen========================');
				console.log('Info: WebSocket connection opened.');
				IS_UPLOADER_INSTALLED_WS = true;
				
				COMMON_WEB_UPLOAD.WS = ws;
				if(isDefined(sendMessage)){
					ws.send(sendMessage);
				}
			};
			ws.onmessage = function (event) {
				console.log('======================onmessage========================');
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
				if (typeof callbackFun === "function"){
					console.log('bbbbb');
					//console.log(callbackFun);
					callbackFun(callbackData);
					//ws.close();
					return;
				}
				
				
				//alert('Received: ' + event.data);
				
				/*
				var successMsg = 2;
				var receivedData;
				if(isDefined(event.data)){
					if(isNumber(event.data)){
						successMsg = parseInt(event.data);
					}else{
						receivedData = event.data;
					}
					//successMsg = parseInt(event.data);
				}
				//successMsg = 2;
				if (typeof callbackFun === "function"){
					callbackFun(successMsg, receivedData);
					return;
				}
				*/
				
			};
			
			ws.onclose = function (event) {
				//setConnected(false);
				console.log('======================onclose========================');
				console.log('Info: WebSocket connection closed, Code: ' + event.code + (event.reason == "" ? "" : ", Reason: " + event.reason));
				console.log('wsType', wsType);
				if(wsType != 'starter'){
					if( event.code == '1006'){
						console.log('err close');
						//사용중이다 끈어진경우 패치임으로 창을 닫아준다.
						if(IS_UPLOADER_INSTALLED_WS == true){
							alert('사용중이 연결이 끈어져 다시 연결해야합니다.');
							window.close();
							return;
							
						}else{
							alert('업로드 전용 프로그램을 설치하셔야합니다.');	
						}
						
						return;
					}
					return;
				}
				if(isDefined( event.code)){
					if( event.code != '1006'){
						console.log('force close');
						return;
					}
					else if( event.code != '1000'){
						/*
						if (typeof callbackFun === "function"){
							callbackFun(0);
							return;
						}
						*/
						//alert('업로드 전용 프로그램을 설치하셔야합니다.');
									
					}
				}
				
				callbackData.status = event.code;
				callbackData.err_code = event.code;
				callbackData.ws = ws;
				//callbackData.err_msg = event.code;
				
				if (typeof callbackFun === "function"){
					console.log('cccc');
					callbackFun(callbackData);
					return;
				}
				
				
			};
		} catch (exception) {
			console.log('catch')
			//setConnected(false);
			if (typeof callbackFun === "function"){
				//callbackFun(callbackData);
				return;
			}
			console.log('ERROR exception : ',exception);
			
		}
	}
	diskWebSocketConnect();
};




/*
COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER = function(callbackFun){
	console.log('COMMON_WEB_UPLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER');
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