MOBILE_ADULT = {};


MOBILE_ADULT.onplayMobileAuth =function (targetFrom) {
	if( jQuery("input:checkbox[id='agreeCbx']").is(":checked") == false ) {
		alert("개인 정보 수집 및 이용에 동의하여 주십시오.");
		return;
	}
	//opener.onplayOpenMobileAuth();
	//self.close();
	//actionOnplayMobileAuth();
	var $targetForm = $('#'+targetFrom);
	if($targetForm.length > 0){
		$targetForm.submit();
	}
	
	return;
};
	

MOBILE_ADULT.ADULT_FORM = {};
//성인인증 : action
MOBILE_ADULT.ADULT_FORM.openAdultCheck = function(thisEle){

    var eleData = $(thisEle).data();
	if(isDefined(eleData.auth)){
		if(eleData.auth == 1){
			alert('이미 실명인증 서비스를 이용하여 인증된 회원입니다.');
			return;
		}
	}

	var returnUrl = eleData.rt;
	returnUrl = encodeURIComponent(returnUrl);
	var openUrl = eleData.open;

	/*if(isDefined(openUrl) == false){
		alert('경로를 다시 확인해 주세요.');
		return;
	}*/
    var open_page = "";
    var user_id = "";

    if(isDefined(eleData.op) && eleData.op == "findPass" ){
        open_page = eleData.op;
        user_id   = $("#fp_email").val();

    }

 	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.ADULT.ADULT_PHONE_VIEW_AGR;
 	var authType = 'phone';
 	if(eleData.type == 'ipin'){
 		authType = 'ipin';
        contentsUrl = DISK_PROTOCOL.ONPLAY_URL.ADULT.ADULT_IPIN_VIEW;
 	}

    console.log(contentsUrl);
	var successAjaxAdultViewData = function(data){

		var viewHtml = null;
		if(data == 'ERR_ONPLAY_COMPANY_NOT_FOUND_CONTENTS'){
        	console.log('data:', data);
			disk_alert('페이지 정보를 확인할수 없습니다.');
        	//history.back(true);
			return;
        }else{
			if(data.length < 100 ){
        		console.log('err modal html');
				disk_alert('페이지 정보를 확인할수 없습니다.');
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('ipin viewHtml');

		    GO_TOP();
			var openCallbackFun = function($modalEle){
				$.modal.close();
			}

			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);
		}


	};


	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}

	var formData = {
		is_mobile	: 1,
        return_url  : returnUrl,
        open_page   : open_page,
        user_id     : user_id
	};

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxAdultViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
}


MOBILE_ADULT.ADULT_FORM.openPhoneAdult = function(thisEle){

    /*if( jQuery("input:checkbox[id='agreeCbx']").is(":checked") == false ) {
			alert("개인 정보 수집 및 이용에 동의하여 주십시오.");
			return;
	}*/

    var eleData = $(thisEle).data();
	if(isDefined(eleData.auth)){
		if(eleData.auth == 1){
			alert('이미 실명인증 서비스를 이용하여 인증된 회원입니다.');
			return;
		}
	}

	var returnUrl = eleData.rt;
	returnUrl = encodeURIComponent(returnUrl);
	var openUrl = eleData.open;


	/*if(isDefined(openUrl) == false){
		alert('경로를 다시 확인해 주세요.');
		return;
	}*/

    var open_page = "";
    var user_id = "";
    var member_idx = 0;
    if(isDefined(eleData.op) && eleData.op == "findPass" ){
        open_page = eleData.op;
        user_id   = eleData.user;
        if(!$("input:checkbox[id='agree']").is(":checked")){
            alert("동의하지 않으셨습니다.");
            return;
        }

    }else{
        member_idx = eleData.memberidx;
    }
 	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.ADULT.ADULT_PHONE_VIEW;
	var successAjaxAdultViewData = function(data){
	    console.log("omin");
		console.log(data);

		var viewHtml = null;
		if(data == 'ERR_ONPLAY_COMPANY_NOT_FOUND_CONTENTS'){
        	console.log('data:', data);
			disk_alert('페이지 정보를 확인할수 없습니다.');
        	//history.back(true);
			return;
        }else{
			if(data.length < 100 ){
        		console.log('err modal html');
				disk_alert('페이지 정보를 확인할수 없습니다.');
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('ipin viewHtml');
		    GO_TOP();
			var openCallbackFun = function($modalEle){

			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

		}


	};


	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var formData = {
		is_mobile	: 1,
        return_url  : returnUrl,
        open_page   : open_page,
        user_id     : user_id,
        member_idx  : member_idx
	};

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxAdultViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
}


function actionOnplayMobileAuth(){
		/*
		//MobileAuth_window = window.open('', 'MobileAuthWindow', 'width=425, height=550, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250' );
        if(MobileAuth_window == null){
			alert("※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다.");
        }
        */
        if( jQuery("input:checkbox[id='agreeCbx']").is(":checked") == false ) {
    		alert("개인 정보 수집 및 이용에 동의하여 주십시오.");
    		return;
    	}
        document.popupForm.action = "/mobile.php/adult/phone_auth1_pop";
        document.popupForm.target = 'MobileAuthWindow';
        document.popupForm.method = "post";
        document.popupForm.protocol.value = location.protocol;
        document.popupForm.referer.value = location.hostname;
        document.popupForm.accUri.value = location.pathname;
        document.popupForm.submit();

}

function onplayMobileAuth() {
	/*if( jQuery("input:checkbox[id='agreeCbx']").is(":checked") == false ) {
		alert("개인 정보 수집 및 이용에 동의하여 주십시오.");
		return;
	}*/
	//opener.onplayOpenMobileAuth();
	//self.close();
	actionOnplayMobileAuth();
	return;
}
