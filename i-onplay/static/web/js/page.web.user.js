var PAGE_USER = {};
PAGE_USER.start = function(pageSub, pagData){
	console.log('PAGE_USER.start', pageSub);
	console.log(pagData);
	PAGE_USER.defaultBinding(pagData);


	if(pageSub == 'find_account'){
		PAGE_USER.FIND_ACCOUNT.start();
	}else if(pageSub == 'find_password'){
		PAGE_USER.FIND_PASSWORD.start();
	}else if(pageSub == 'adult_form'){
		PAGE_USER.ADULT_FORM.start();
	}
};

PAGE_USER.defaultBinding = function(pagData){
	console.log('PAGE_USER.defaultBinding');

	if(isDefined(pagData)){
		if(isDefined(pagData.member_idx)){
			var member_idx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
			if(member_idx == pagData.member_idx){
				if(isDefined(pagData.member_data)){
					var saveMemberData = JSON.stringify(pagData.member_data);
					utility.disk.setStorageData('member_data', saveMemberData);
					DISK_MEMBER_FUN.setMemberInfo(pagData.member_data, false);
				}
			}
		}
	}
};



PAGE_USER.FIND_ACCOUNT = {};
PAGE_USER.FIND_ACCOUNT.start = function(){
	if(utility.disk.checkIsLogin() == true){
		GO_HOME();
		return;
	}
	console.log('PAGE_USER.FIND_ACCOUNT.start');
	PAGE_USER.FIND_ACCOUNT.formBinding();
};

PAGE_USER.FIND_ACCOUNT.formBinding = function(){
	console.log('PAGE_USER.FIND_ACCOUNT.formBinding');

	var $submitFormEle = $( "#webFindAccountForm");
	if($submitFormEle.length < 1){
		console.log('empty form ele');
		return;
	}

	$submitFormEle.unbind( "submit");
	$submitFormEle.submit(function(event){
		event.preventDefault();
		console.log('form submit action');
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

		if(isDefined(formData)== false){
			return false;
		}
		$submitFormEle.find('.input_line').removeClass('is-invalid');
		$submitFormEle.find('.err-mag').removeClass('is-show');

		if(isDefined(formData.fa_name)== false){
			$submitFormEle.find('input[name=fa_name]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('.err-mag.fa_name').addClass('is-show');
			return false;
		}

		if(isDefined(formData.fa_birthday)== false){
			$submitFormEle.find('input[name=fa_birthday]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('.err-mag.fa_birthday').addClass('is-show');
			return false;
		}

		//생년월일 체크
		var userBirthday = formData.fa_birthday;
		console.log('userBirthday len', userBirthday.length);
		if(isDefined(userBirthday) == false || $.isNumeric(userBirthday) == false || userBirthday.length != 8){
			//alert('생년월일 8자를 정확히 입력해주세요');
			$submitFormEle.find('input[name=fa_birthday]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('.err-mag.fa_birthday').addClass('is-show');
			$submitFormEle.find('input[name=fa_birthday]').focus();
			return false;
		}
		//return true;
		$submitFormEle[0].submit();

		//PAGE_USER.FIND_ACCOUNT.formSubmitAction(formData);

	});
};




//비밀번호찾기
PAGE_USER.FIND_PASSWORD = {};
PAGE_USER.FIND_PASSWORD.start = function(){
	console.log('PAGE_USER.FIND_PASSWORD.start');
	if(utility.disk.checkIsLogin() == false){
		//GO_HOME('login');
		//return;
	}
	PAGE_USER.FIND_PASSWORD.formBinding();
};



PAGE_USER.FIND_PASSWORD.formBinding = function(){
	console.log('PAGE_USER.FIND_PASSWORD.formBinding');


	var $submitFormEle = $( "#webFindPasswordForm");
	if($submitFormEle.length < 1){
		console.log('empty form ele');
		return;
	}

	$submitFormEle.unbind( "submit");
	$submitFormEle.submit(function(event){
		event.preventDefault();
		console.log('form submit action');
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

		if(isDefined(formData)== false){
			return false;
		}

		$submitFormEle.find('.input_line').removeClass('is-invalid');
		$submitFormEle.find('.err-mag').removeClass('is-show');
		if(isDefined(formData.fp_email)== false){
			$submitFormEle.find('input[name=fp_email]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('.err-mag.fp_email').addClass('is-show');
			return false;
		}

		if(isDefined(formData.fp_code)== false){
			$submitFormEle.find('input[name=fp_code]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('.err-mag.fp_code').addClass('is-show');
			return false;
		}

		//생년월일 체크
		var userCode = formData.fp_code;
		console.log('userCode len', userCode.length);
		if(userCode.length <  4){
			//alert('보안코드를 정확히 입력해주세요');
			$submitFormEle.find('.err-mag.fp_code').addClass('is-show');
			$submitFormEle.find('input[name=fp_code]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('input[name=fp_code]').focus();
			return false;
		}
		//return true;
		$submitFormEle[0].submit();

	});
};

// 캡쳐 그림 바꾸기
PAGE_USER.FIND_PASSWORD.reloadCaptchaLogin = function(){
    console.log('PAGE_LOGIN.reloadCaptchaLogin');
	var captchaCallBackFun = function(captchaImg){
		console.log('captchaCallBackFun', captchaImg);
		if(isDefined(captchaImg)){
			$('#disk-findpw-security-captcha').prop("src",captchaImg);
		}
	};
    var sendData ={ type:"pass"}
	COMMON_ACTION.SECURITY.getCaptchaData(sendData, captchaCallBackFun);
}

//보안 코드 가져오기
PAGE_USER.FIND_PASSWORD.chkFindPassIdCapcha = function(){
    var formValues = $("#webFindPasswordForm").serializeArray();
		var formData = changeFormArrToObject(formValues);

	var succ_chk_pw_id = function(data){
        var $targetModal = $('#pw_layer');
        	$targetModal.empty();
		if(isDefined(data.user_email) == true){
			if(data.is_ok == "ok"){
			   $("#fp_check").val(data.check);
			   var htmlData = TEMPLETE.WEB_PAGE_MODAL.getPassAuthPopupHtml(data.user_email, data.email_key);
			   var isModalCloseExisting = true;
				if(isDefined(htmlData)){
					$targetModal.html(htmlData).modal({
						closeExisting: isModalCloseExisting,
						blockerClass	: "common-modal-blocker",
						clickClose		: false,
						escapeClose		: false
					});
				}
			}
		}
	}

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.FINE_PASSWORD_ID_CHK,
		data		: formData,
		success_fun	: succ_chk_pw_id,
		error_fun	: null,
		data_type	: 'json',
		isSpinner	: true
		
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//메일로 비번 찾기
PAGE_USER.FIND_PASSWORD.requestMyPasswordCodeWithMail = function(thisEle){
	var $targetEle = $(thisEle);
	if($targetEle.length < 1){
		return;
	}
	if($targetEle.hasClass('disabled')){
		return;
	}
	var eleData = $targetEle.data();
	var formData = {};
	if(isDefined(eleData)){
		formData.email = eleData.email;
		formData.email_key = eleData.key;
	}
	$targetEle.addClass('disabled').attr('disabled', true);

	var successFunRequestMail = function(data){
		console.log('successFunRequestMail');
		console.log(data);
		if(isDefined(data.access_token)){
			var showMsg = "메일로 비밀번호 재설정 요청이 발송되었습니다.\n스팸 메일함을 확인하시고 만일 받지 못하셨으면 10분뒤에 재요청 해주시길 바랍니다.";
			alert(showMsg);
		}
	};
	
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.REQUEST_FIND_PW_EMAIL,
		data		: formData,
		success_fun	: successFunRequestMail,
		error_fun	: null,
		data_type	: 'json',
		isSpinner	: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



//보안 코드 가져오기
PAGE_USER.FIND_PASSWORD.UPDATE_PASSWORD = function(){

   if(!isDefined($("#pass").val())){
        alert("비밀번호를 빈칸으로 둘수 없습니다.");
        $("#pass").focus();
        return;
   }

   if(!isDefined($("#passchk").val())){
        alert("비밀번호를 빈칸으로 둘수 없습니다.");
        $("#passchk").focus();
        return;
   }

   if($("#passchk").val() != $("#pass").val() ){
        alert("비밀번호가 서로 다릅니다.");
        return;
   }
   
   var auth_key = $('#member_auth_key').val();
   if(isDefined(auth_key) == false){
   	alert("인증키 오류입니다.");
   	return;
   }
   
   var formValues = $("#passForm").serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

    var succ_update_pw = function(data){

	   if(data.is_ok == "ok"){
	       alert("비밀번호가 안전하게 재설정 되었습니다.\n홈으로 돌아가 다시 로그인 후 이용하시길 바랍니다.");
           location.href = "/home/main";
	   }
	}

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.UPDATE_PASSWORD,
		data		: formData,
		success_fun	: succ_update_pw,
		error_fun	: null,
		data_type	: 'json',
		isSpinner	: true
		
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//성인인증
PAGE_USER.ADULT_FORM = {};
PAGE_USER.ADULT_FORM.start = function(){
	console.log('PAGE_USER.ADULT_FORM.start');
	if(utility.disk.checkIsLogin() != true){
		GO_HOME('login');
		return;
	}

	if(utility.disk.checkIsRealName() == true){
		alert('이미 성인 인증을 받으신 회원이십니다. 정보가 갱신 안되셨을 경우 다시 로그인 해주세요.');
		GO_HOME('home');
		return;
	}

	PAGE_USER.ADULT_FORM.formBinding();
};



PAGE_USER.ADULT_FORM.formBinding = function(){
	console.log('PAGE_USER.ADULT_FORM.formBinding');

	return;

	var $submitFormEle = $( "#webFindAccountForm");
	if($submitFormEle.length < 1){
		console.log('empty form ele');
		return;
	}

	$submitFormEle.unbind( "submit");
	$submitFormEle.submit(function(event){
		event.preventDefault();
		console.log('form submit action');
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

		if(isDefined(formData)== false){
			return false;
		}
		$submitFormEle.find('.input_line').removeClass('is-invalid');

		if(isDefined(formData.fa_name)== false){
			$submitFormEle.find('input[name=fa_name]').parent('.input_line').addClass('is-invalid');
			return false;
		}

		if(isDefined(formData.fa_birthday)== false){
			$submitFormEle.find('input[name=fa_birthday]').parent('.input_line').addClass('is-invalid');
			return false;
		}

		//생년월일 체크
		var userBirthday = formData.fa_birthday;
		console.log('userBirthday len', userBirthday.length);
		if(isDefined(userBirthday) == false || $.isNumeric(userBirthday) == false || userBirthday.length != 8){
			alert('생년월일 8자를 정확히 입력해주세요');
			$submitFormEle.find('input[name=fa_birthday]').parent('.input_line').addClass('is-invalid');
			$submitFormEle.find('input[name=fa_birthday]').focus();
			return false;
		}
		//return true;
		$submitFormEle[0].submit();

	});
};

//성인인증 : 비밀번호 찾기
PAGE_USER.ADULT_FORM.openFindPassRealNameCheck = function(thisEle){
	console.log('PAGE_USER.ADULT_FORM.openFindPassRealNameCheck');	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData)){
		if(isDefined(eleData.openpage)){
			$('#disk-web-realname-modal').find('.btn-auth-action').data('openpage', eleData.openpage);	
		}
		if(isDefined(eleData.email)){
			$('#disk-web-realname-modal').find('.btn-auth-action').data('email', eleData.email);	
		}
	}
	
	$('#disk-web-realname-modal').modal({
		closeExisting: false,
		blockerClass	: "common-modal-blocker",
		clickClose: false,
		escapeClose: true,
		showClose: false
	});
	
	
	
}



//성인인증 : action
PAGE_USER.ADULT_FORM.openAdultCheck = function(thisEle){

    var eleData = $(thisEle).data();
	if(isDefined(eleData.auth)){
		if(eleData.auth == 1){
			alert('이미 실명인증 서비스를 이용하여 인증된 회원입니다.');
			return;
		}
	}
	console.log('eleData', eleData);
	if($(thisEle).hasClass('disabled')){
		return;
	}

	var returnUrl = eleData.rt;

	returnUrl = encodeURIComponent(returnUrl);

    var fp_check = "";
	var openUrl = eleData.open;
	if(isDefined(openUrl) == false){
		alert('경로를 다시 확인해 주세요.');
		return;
	}
		
 	var authType = eleData.type;
    var openpage    = "";
	if(isDefined(eleData.openpage)){
	   fp_check = encodeURIComponent($("#fp_check").val());
	   if(isDefined(fp_check) == false){
			fp_check = '';
	   }
	   var userEmeil = '';
	   if(eleData.openpage == 'findPass'){
			userEmeil = eleData.email;
			if(isDefined(userEmeil) == false){
				alert('선택하신 아이디 정보가 없습니다.');
				return;
			}
		}	
	   openpage = "&open_page="+eleData.openpage +"&fc="+fp_check + "&user_email="+userEmeil;

	}
	var winOpenUrl = openUrl+'?authType='+authType+'&returnURL='+returnUrl+openpage;
	console.log('winOpenUrl', winOpenUrl);

	if(authType == 'ipin'){
		window.open(winOpenUrl,'ipinAuth','width=448,height=560');
	}else if(authType == 'phone'){
		window.open(winOpenUrl,'MobileAuthWindow','width=720,height=720');
	}else if(authType == 'kakao'){
		window.open(winOpenUrl,'kakaoAuthWindow','width=720,height=720');
	}
	
	//$(thisEle).addClass('disabled').attr('disabled', true);
	return;
};

///실명인증 : action
PAGE_USER.ADULT_FORM.openRealnameCheck = function(thisEle){

    var eleData = $(thisEle).data();
	if(isDefined(eleData.auth)){
		if(eleData.auth == 1){
			alert('이미 실명인증 서비스를 이용하여 인증된 회원입니다.');
			return;
		}
	}
	console.log('eleData', eleData);
	if($(thisEle).hasClass('disabled')){
		return;
	}

	var returnUrl = eleData.rt;

	returnUrl = encodeURIComponent(returnUrl);

    var fp_check = "";
	var openUrl = eleData.open;
	if(isDefined(openUrl) == false){
		alert('경로를 다시 확인해 주세요.');
		return;
	}
		
 	var authType = eleData.type;
    var openpage    = "";
	if(isDefined(eleData.openpage)){
	   fp_check = encodeURIComponent($("#fp_check").val());
	   if(isDefined(fp_check) == false){
			fp_check = '';
	   }
	   var userEmeil = '';
	   if(eleData.openpage == 'findPass'){
			userEmeil = eleData.email;
			if(isDefined(userEmeil) == false){
				alert('선택하신 아이디 정보가 없습니다.');
				return;
			}
		}	
	   openpage = "&open_page="+eleData.openpage +"&fc="+fp_check + "&user_email="+userEmeil;

	}
	var winOpenUrl = openUrl+'?authType='+authType+'&returnURL='+returnUrl+openpage;
	console.log('winOpenUrl', winOpenUrl);

	if(authType == 'ipin'){
		window.open(winOpenUrl,'ipinAuth','width=448,height=560');
	}else if(authType == 'phone'){
		window.open(winOpenUrl,'MobileAuthWindow','width=720,height=720');
	}else if(authType == 'kakao'){
		window.open(winOpenUrl,'kakaoAuthWindow','width=720,height=720');
	}
	
	//$(thisEle).addClass('disabled').attr('disabled', true);
	return;
};

//위치 선정중
PAGE_USER.ADULT_FORM.movePwAuthResult = function (email, check){
    console.log("page_move_pw_auth");
    var form = $('<form></form>');
    var input = new Array();
    form.attr('name','directFrom');
    form.attr('method','post');
    form.attr('action','/user/find_password_result');

    var eleData = {};
    eleData.fp_email = email;
    eleData.fp_check = check;

    for(key in eleData) {
        form.append($('<input/>', {type: 'hidden', name: key, value:eleData[key] }));
        form.appendTo('body');
    }
    form.submt();
}

//제자리걸음방지
PAGE_USER.ADULT_FORM.GO_BACK = function (){
	var url = document.referrer;
		url = url.split('?')[0];
		window.location.href = url;
};


//카카오 성인 인증

PAGE_USER.AUTH_KAKAO = {};

//카카오 페이 실명인증 완료
PAGE_USER.AUTH_KAKAO.checkAuthComplete = function(formEle){

	
	var $targetFrom = $('#'+formEle);
	if($targetFrom.length < 1){
		alert("인증 정보가 올바르지 않습니다.");
	    return;
	}
	
	var formValues = $targetFrom.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	
	
	
	if(isDefined(formData.authData) == false || isDefined(formData.authKey) == false || isDefined(formData.reqIdx) == false){
	    alert("인증 정보가 올바르지 않습니다.");
	    return;
	}
	
	
	var formData = {authId : formData.authData, userKey : formData.authKey, reqIdx : formData.reqIdx};
	var successGetKakaoCertData = function(data){
		console.log('successGetKakaoCertData');
		console.log(data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
		}
		
		if(isDefined(data.return_url)){
			//location.href = data.return_url;
			var sendData = {
				action	: 'go',
				link	: data.return_url
			}
			window.opener.postMessage(sendData, '*');
			self.close();
			return;
		}
		//self close
		if(isDefined(data.check_state)){
			if(data.check_state == 9){
				self.close();
				//window.open('', '_self', '');
				//window.close();
			}
		}
	   
	}
	
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.CHECK_KAKAO_CERT_IS_COMPLETED,
		data		: formData,
		success_fun	: successGetKakaoCertData,
		error_fun	: null,
		data_type	: 'json',
		isSpinner	: true
		
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};
