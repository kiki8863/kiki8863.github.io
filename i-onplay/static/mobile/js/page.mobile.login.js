/*
* mobile page : login, join
*/

MOBILE_PAGE.shoPayAlert = function()
{
	var DF = get_disk_config(false);
	
	//var remainingHour = getCountDownTimer('11/04/2020 4:00 PM', 'hours');
	var isAlert = false;
	
	//vip
	if(utility.disk.checkIsVip() == true){
		var cKey = DF.cookiePrefix+'pay_vip_msg';
		var payCookieMsg = $.cookie(cKey);
		console.log('cKey', cKey);
		console.log('payCookieMsg', payCookieMsg);
		
		if(payCookieMsg != 1){
			$.cookie(cKey, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
			alert("축하드립니다.\n\n11월 VIP 회원으로 선정되셨습니다.\n지금 VIP회원만의 특별한 혜택을 확인하세요");
			location.href = '/mobile.php/mobile#!action=event_list&idx=20';
			return true;
		}
	
		//pay
		if(isAlert != true){
			var cKey = DF.cookiePrefix+'pay_non_msg';
			var payCookieMsga = $.cookie(cKey);
			console.log('cKey', cKey);
			console.log('payCookieMsga', payCookieMsga);
			if(payCookieMsga != 1){
				$.cookie(cKey, 1, { expires: 3,  path: '/', domain: DF.COOKIE_DOMAIN });
				alert("11월 온플레이 VIP 회원만의 특별한 혜택\n\n지금 충전하시면\n50%할인된 가격으로 제휴 캐시 2배 적립과 + 300,000B + 쿠폰 30장을 추가로 드립니다.");
				isAlert = true;
				location.href = '/mobile.php/charge/m_point';
				return true;
			}
		}
	}else{
		//pay
		if(isAlert != true){
			var cKey = DF.cookiePrefix+'pay_non_msg';
			var payCookieMsgb = $.cookie(cKey);
			if(payCookieMsga != 1){
				$.cookie(cKey, 1, { expires: 3,  path: '/', domain: DF.COOKIE_DOMAIN });
				alert("11월 온플레이 반값 이벤트\n\n지금 충전하시면\n포인트 2배 적립과 + 300,000B + 쿠폰 30장을 추가로 드립니다.");
				isAlert = true;
				location.href = '/mobile.php/charge/m_point';
				return true;
			}
		}
	}
	
	return false;
}



//로그인 성공시
MOBILE_PAGE.SUCCESS_LOGIN = function(data){
	console.log('MOBILE_PAGE.SUCCESS_LOGIN');
	console.log(data);
	var isMobile = true;
	var DF = get_disk_config(isMobile);

	var actionType = null;
	if(isDefined(data.action_type)){
		actionType = data.action_type;
	}
	console.log('actionType', actionType);
	//회원정보 저장
	if(isDefined(data.member)){
		var saveMemberData = JSON.stringify(data.member);
		utility.disk.setStorageData('member_data', saveMemberData);
		DISK_MEMBER_FUN.setMemberInfo(data.member, isMobile, true);
	}

	//return;
	var isAlert = false;
	var alertMsg = null;
	var linkUrl = null;
	
	//event msg
	if(actionType == 'join_action'){
		
		
		
		
		//check join_userid
		var hasCode = $.cookie('has_code');
		var memberJoinId = utility.disk.getMemberJoinId();
		console.log('memberJoinId', memberJoinId);
		if(isDefined(memberJoinId) == true){
			if(hasCode == 69 && utility.disk.checkIsAdultMember() == true){
				location.href = '/mobile.php/mobile/#!action=category&main=21100';
				return;
			}else{
				location.href = '/mobile.php/mobile/#!action=best&main=0';
				return;
			}	
		}
		
		
		if(isDefined(data.join_event)){
			for(var ei in data.join_event){
				eData = data.join_event[ei];
				if(eData.modal == 'alert'){
					alertMsg = eData.event_contents;
					break;
				}
			}
			if(isDefined(alertMsg)==true){
				alert(alertMsg);
				isAlert = true;
			}
		}
	}
	
	//event reward msg
	if(actionType != 'login_action'){
		if(isAlert != true){
			/*
			if(isDefined(data.member_show_msg)){
				$.modal.close();
				alert(data.member_show_msg);
				isAlert = true;
				//충전페이지로 이동
				location.href = '/mobile.php/charge/m_point';
				return;
			}
			*/
		}
	}
	//pay alert
	//alert(isAlert);
	if(isAlert != true){
		isAlert = MOBILE_PAGE.shoPayAlert();
		if(isAlert == true){
			return false;
		}
	}
	
	//sns login
	if(actionType == 'sns_action_login' || actionType == 'sns_action_join' || actionType == 'sns_login' || actionType == 'sns_join'){
		//alert(actionType);
		if(isAlert != true){
			alert('SNS 계정으로 로그인 하셨습니다.');
		}
		var returnUrl = $.cookie(DF.cookiePrefix+'mrt_url');
		console.log('returnUrl', returnUrl);

		console.log('save email checked');
		var saveCookieName = 'fms_save_email';
		$.cookie(saveCookieName, data.member.member_email, { expires: 365 });
		console.log('MOBILE_COMMON.DATA.HASH.LOGIN', MOBILE_COMMON.DATA.HASH.LOGIN);
		MOBILE_COMMON.DATA.HASH.LOGIN = null;
		//alert(returnUrl);
		//return;
		if(isDefined(returnUrl)){
			$.removeCookie(DF.cookiePrefix+'rt_url', { path: '/',domain: DF.COOKIE_DOMAIN });
			location.href = returnUrl;
		}else{
			location.href = '/mobile.php/main/';
		}
		return;
	}


	//return;
	else if(actionType == 'join_action'){
		if(isAlert != true){
			disk_alert('감사합니다.\n회원가입이 완료되었습니다.');
		}
		
		MOBILE_PAGE.join_form.resetJoinForm();
	}else if(actionType == 'login_action'){
		console.log('actionType', actionType);
		if($('#mobileLoginActionForm').find('input[name=save_email]').is(":checked") == true){
			console.log('save email checked');
			var saveCookieName = 'fms_save_email';
			$.cookie(saveCookieName, data.member.member_email, { expires: 365 });
		}else{
			$.removeCookie('fms_save_email');
		}

		MOBILE_PAGE.login.resetLoginForm();
		
		//event msg
		if(isAlert != true){
			if(isDefined(data.login_event)){
				
				for(var ei in data.login_event){
					eData = data.login_event[ei];
					if(eData.modal == 'alert'){
						alertMsg = eData.event_contents;
						if(isDefined(eData.mlink)){
							linkUrl = eData.mlink;
						}
						break;
					}
				}
				if(isDefined(alertMsg)==true){
					alert(alertMsg);
					isAlert = true;
					if(isDefined(linkUrl)){
						location.href = linkUrl;
						return;					
					}
				}
			}
		}
		var afterCloseModalCallbackFun = function(){
			console.log('afterCloseModalCallbackFun');
			console.log('MOBILE_COMMON.DATA.HASH.LOGIN', MOBILE_COMMON.DATA.HASH.LOGIN);
			if(isDefined(location.hash)){
				console.log('trigger window hashchange');
				$(window).trigger('hashchange');
				return;
			}
			if(isDefined(MOBILE_COMMON.DATA.HASH.LOGIN) == true){
				location.hash = MOBILE_COMMON.DATA.HASH.LOGIN;
				return;
			}

			GO_HOME();
			return;
		};
		if($('body').hasClass('page-modal')){
			CLOSE_PAGE_MODAL(afterCloseModalCallbackFun);
			return;
		}
	}
	
	//return;
	console.log('MOBILE_COMMON.DATA.HASH.LOGIN', MOBILE_COMMON.DATA.HASH.LOGIN);
	//return;
	if(isDefined(MOBILE_COMMON.DATA.HASH.LOGIN) == true){
		location.hash = MOBILE_COMMON.DATA.HASH.LOGIN;
		return;
	}
	GO_HOME();
	return;
};


//로그인 실패 처리
MOBILE_PAGE.SUCCESS_FALE = function(data){
	console.log('MOBILE_PAGE.SUCCESS_FALE', data);

	var captchaCallBackFun = function(captchaImgTag){
		console.log('captchaCallBackFun', captchaImgTag);
		if(isDefined(captchaImgTag)){
			$('#disk-login-security-captcha').html(captchaImgTag);
			$('#disk-login-security_word').addClass('active');
		}
	};

	if(isDefined(data.status) == true){
		var dataStatusKey = data.status.key;
		if(dataStatusKey == 'ERR_ONPLAY_USER_LOGIN_NOT_WITH_CAPTCHA' || dataStatusKey == 'ERR_ONPLAY_USER_LOGIN_NOT_CAPTCHA'){
			console.log('ERR_ONPLAY_USER_LOGIN_NOT_CAPTCHA');
			if ( $('#disk-login-security_word').hasClass('active') == false){
				alert('3회 이상 암호 입력이 실패하여 보안문자 입력이 필요합니다.');
			}else{
				var checkData = DISK_PROTOCOL.checkServerValuation(data, null);
			}
			//MOBILE_PAGE.getCaptchaData(captchaCallBackFun);
			COMMON_ACTION.SECURITY.getCaptchaData(null, captchaCallBackFun);
		}else{
			var checkData = DISK_PROTOCOL.checkServerValuation(data, null);
		}
	}
};


MOBILE_PAGE.login = {};

MOBILE_PAGE.login.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.login.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	MOBILE_PAGE.login.pageInit(showContainerInfo, hashPrams);

};


MOBILE_PAGE.login.pageInit = function(pageInfo, hashData){
	console.log('MOBILE_PAGE.login.pageInit');

	//로그인 체크
	/*
	if(utility.disk.checkIsLogin() == true){
		GO_HOME();
		return;
	}
	*/
	if(isDefined(pageInfo)){
		var isPageLoaded = false;
		console.log('pageInfo', pageInfo);
		var $targetContainerEle;
		if(isDefined(pageInfo.target)){
			$targetContainerEle = $('#'+pageInfo.target);
			if($targetContainerEle.length < 1){
				return;
			}
			var targetData = $targetContainerEle.data();
			console.log('targetData', targetData);

			if(targetData.loaded == 1){
				isPageLoaded = true;
			}
		}
		console.log('isPageLoaded', isPageLoaded);

		if(isPageLoaded == true){
			MOBILE_PAGE.login.defaultBinding(pageInfo);
		}
	}else{
		MOBILE_PAGE.login.defaultBinding(pageInfo);
	}

}

MOBILE_PAGE.login.defaultBinding = function(pageInfo){
	console.log('MOBILE_PAGE.login.defaultBinding');
	console.log('pageInfo',pageInfo);

	MOBILE_PAGE.login.loginFormBinding();

};

//login form 초기화
MOBILE_PAGE.login.resetLoginForm = function(){
	console.log('MOBILE_PAGE.login.resetLoginForm');
	var $mobileLoginFormEle = $('#mobileLoginActionForm');

	$mobileLoginFormEle.find('input[name=user_email]').val('');
	$mobileLoginFormEle.find('input[name=user_pass]').val('');
	$mobileLoginFormEle.find('input[name=login_captcah]').val('');
	$mobileLoginFormEle.find('input[type=checkbox]').prop('checked', false);
	$mobileLoginFormEle.find('input[type=checkbox]').attr('checked', false);

	$('#disk-login-security_word').removeClass('active');

};


MOBILE_PAGE.login.loginFormBinding = function(){
	console.log('MOBILE_PAGE.login.formBinding');


	var $mobileLoginFormEle = $('#mobileLoginActionForm');
	if(isDefined($mobileLoginFormEle) == false || $mobileLoginFormEle.length < 1){
		console.log('form id empty');
		return;
	}

	var isPageLoaded = false;
	var formEleData = $mobileLoginFormEle.data();
	console.log('formEleData', formEleData);

	if(formEleData.loaded == 1){
		isPageLoaded = true;
		console.log('loaeded already  form');
		return;
	}
	console.log('isPageLoaded', isPageLoaded);

	//save cookie - 아이디 저장
	//var isSaveCookieEmail $.cookie('fms_save_email');
	if(isDefined($.cookie('fms_save_email')) == true){
		$mobileLoginFormEle.find('input[name=user_email]').val($.cookie('fms_save_email'));
		$mobileLoginFormEle.find('input[name=save_email]').prop('checked', true);
	}

	$mobileLoginFormEle.unbind('submit');
	$mobileLoginFormEle.submit(function(event){
		event.preventDefault();
		if($(this).hasClass('was-validated')){
			console.log('was-validated');
			//return false;
		}
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

		if(isDefined(formData)== false){
			return false;
		}

		$('.invalid-feedback.user_email.active').removeClass('active');
		$('#ambiance-notification').empty();

		if(isDefined(formData.user_email)== false){
			//$('.invalid-feedback.user_email').addClass('active');
			disk_error('아이디는 이메일로 되어 있습니다. SNS계정일 경우 아래 SNS 계정 로그인을 해주세요.');
			return false;
		}


		if(isDefined(formData.user_pass)== false){
			//$('.invalid-feedback.user_pass').addClass('active');
			disk_error('비밀 번호를 입력해주세요.');
			return false;
		}
		$('.invalid-feedback.user_pass.active').removeClass('active');


		if ( $('#disk-login-security_word').hasClass('active') == true){
			if(isDefined(formData.login_captcah)== false){
				//$('.invalid-feedback.login_captcah').addClass('active');
				disk_error('보안 문자를 입력해주세요.');
				return false;
			}
		}
		$('.invalid-feedback.login_captcah.active').removeClass('active');


		//이메일 패턴 검사
		//var special_pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
		//var special_pattern = /[`~!+#$%^&*|\\\'\";:\/?\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/gi;
		var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
		//alert(exptext.test(formData.user_email));
		//return;
        if( isDefined(formData.user_email) == false  || exptext.test(formData.user_email) != true ){
            //alert('아이디 형식이 올바르지 않습니다.');
            disk_error('아이디 형식이 올바르지 않습니다.');
			return false;
        }
		var ajaxData =
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.LOGIN,
			data		: formData,
			success_fun	: MOBILE_PAGE.SUCCESS_LOGIN,
			error_fun	: MOBILE_PAGE.SUCCESS_FALE
		};
		DISK_PROTOCOL.AJAX(ajaxData);

		return false;

	});


	if(isDefined($mobileLoginFormEle)){
		$mobileLoginFormEle.data('loaded', 1);
		isPageLoaded = true;
	}
	
	//모든 모달은 닫아주세요.
	$.modal.close();
};




//보안코드 새로고침
MOBILE_PAGE.reloadCaptchaLogin = function(){
	console.log('MOBILE_PAGE.reloadCaptchaLogin');

	var captchaCallBackFun = function(captchaImgTag){
		console.log('captchaCallBackFun', captchaImgTag);
		if(isDefined(captchaImgTag)){
			$('#disk-login-security-captcha').html(captchaImgTag);
		}
	};
	COMMON_ACTION.SECURITY.getCaptchaData(null, captchaCallBackFun);
};

MOBILE_PAGE.join_form = {};
MOBILE_PAGE.join_form.start = function(showContainerInfo, hashPrams){
	console.log('MOBILE_PAGE.join_form.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	console.log('MOBILE_COMMON.DATA.HASH.LOGIN', MOBILE_COMMON.DATA.HASH.LOGIN);
	MOBILE_PAGE.join_form.pageInit(showContainerInfo, hashPrams);
};

MOBILE_PAGE.join_form.pageInit = function(pageInfo, hashData){
	//로그인 체크
	if(utility.disk.checkIsLogin() == true){
		GO_HOME();
		return;
	}

	var isPageLoaded = false;
	console.log('pageInfo', pageInfo);
	var $targetContainerEle;
	if(isDefined(pageInfo.target)){
		$targetContainerEle = $('#'+pageInfo.target);
		if($targetContainerEle.length < 1){
			return;
		}
		var targetData = $targetContainerEle.data();
		console.log('targetData', targetData);

		if(targetData.loaded == 1){
			isPageLoaded = true;
		}
	}
	console.log('isPageLoaded', isPageLoaded);

	if(isPageLoaded == true){
		MOBILE_PAGE.join_form.defaultBinding(pageInfo);
	}
};


MOBILE_PAGE.join_form.defaultBinding = function(pageInfo){
	console.log('MOBILE_PAGE.join_form.defaultBinding');
	console.log('pageInfo',pageInfo);

	MOBILE_PAGE.join_form.formBinding(pageInfo);

};

//login form 초기화
MOBILE_PAGE.join_form.resetJoinForm = function(){

	var $mobileJoinFormEle = $('#login-mobile-join-form');

	$mobileJoinFormEle.find('input[name=is_check_unque_email]').val('0');
	$mobileJoinFormEle.find('input[name=input_full_email]').val('');
	$mobileJoinFormEle.find('input[name=direct_email_host]').val('');

	$mobileJoinFormEle.find('input[name=user_pass]').val('');
	$mobileJoinFormEle.find('input[name=user_pass2]').val('');
	$mobileJoinFormEle.find('input[type=checkbox]').prop('checked', false);



};

//이메일 직접 입력 취소
/*
MOBILE_PAGE.join_form.onclickBackDirectInputEmail = function(){
	console.log('MOBILE_PAGE.join_form.onclickBackDirectInputEmail');
	//직접입력 취소 돌아오기
	//$('.select_input.active').removeClass('active');

	var directHostStr = $('#join_direct_email_host').val();
	if(isDefined(directHostStr) == false || directHostStr == '@'){
		$('#join_select_email_host').val('');
		$('#join_is_check_unque_email').val('0');
	}else{

		if(directHostStr.indexOf('@') == -1){
			directHostStr = '@'+directHostStr;
		}
		var savedHost = directHostStr.replace('@', '');
		$('#btn-login-select-email-host').text(directHostStr);
		$('#join_select_email_host').val(savedHost);
	}

	$('.select_input.direct-input').removeClass('active');
	$('.select_input.select-input').addClass('active');
};
*/

//약관 전체 동의
MOBILE_PAGE.join_form.onclickJoinAgreeAll = function(thisEle){
	console.log('MOBILE_PAGE.join_form.onclickJoinAgreeAll');

	if($(thisEle).is(":checked") == true){
		console.log('all checked')
		$('.join_form_agree').attr("checked", true);
		$('.join_form_agree').prop('checked', true) ;

	}else{
		console.log('all checked false')
		$('.join_form_agree').attr("checked", false);
		$('.join_form_agree').prop('checked', false) ;
	}

};

MOBILE_PAGE.join_form.formBinding = function(pageInfo){
	console.log('MOBILE_PAGE.join_form.fromBinding');

	var $mobileJoinFormEle = $('#login-mobile-join-form');
	if(isDefined($mobileJoinFormEle) == false || $mobileJoinFormEle.length < 1){
		console.log('form id empty');
		return;
	}

	var isPageLoaded = false;
	var formEleData = $mobileJoinFormEle.data();
	console.log('formEleData', formEleData);

	if(formEleData.loaded == 1){
		isPageLoaded = true;
		console.log('loaeded already  form');
		return;
	}
	console.log('isPageLoaded', isPageLoaded);

	if(isDefined(pageInfo)){
		MOBILE_PAGE.join_form.resetJoinForm();	
	}
	

	//약관동의
	$( ".join_form_agree" ).bind( "click", function() {
		console.log('join_form_agree');
		var agreeLen = $(".join_form_agree:checked").length ;
		console.log('agreeLen', agreeLen);
		if(agreeLen == 2){
			$('#join_form_agree_check_all').attr("checked", true);
			$('#join_form_agree_check_all').prop('checked', true);
		}else{
			$('#join_form_agree_check_all').attr("checked", false);
			$('#join_form_agree_check_all').prop('checked', false) ;
		}
	});


	//메일 호스트 선택
	$( "#btn-login-select-email-host" ).unbind( "click");
	$( "#btn-login-select-email-host" ).bind( "click", function() {
		console.log('btn-login-select-email-host');
		$( '#btn-login-select-email-host-list' ).toggle();

	});


	//메일 호스트 리스트 아이템 클릭
	$( ".login-select-email-host-item" ).unbind( "click");
	$( ".login-select-email-host-item" ).bind( "click", function() {
		console.log('login-select-email-host-item');
		var eleData = $(this).data();
		console.log(eleData);
		if(isDefined(eleData.target)){
			var emailTxt = $(this).text();

			console.log($('#'+eleData.target).data());
			if(eleData.values == '@'){
				//$('#'+eleData.target).text(emailTxt).trigger('click');
				//$('#join_select_email_host').val('')
				$('#join_select_email_host').val('@').removeClass('read-only').removeAttr('readonly');
				$('#join_is_check_unque_email').val('0');

				//직접입력 오픈
				/*
				$('.select_input.active').removeClass('active');
				$('.select_input.direct-input').addClass('active');
				*/

			}else{
				//$('#'+eleData.target).text('@'+eleData.values).trigger('click');
				//$('#join_select_email_host').val(eleData.values);
				$('#join_select_email_host').val(eleData.values).addClass('read-only').attr('readonly','readonly');
				//$('#join_direct_email_host').val('@');
				MOBILE_PAGE.join_form.checkEmailUniq();
			}

			$('#'+eleData.target).trigger('click');
		}

		$('.login-select-email-host-item.active').removeClass('active');
		$(this).addClass('active');

	});


	var emailFocus = 0;
	var emailBlur = 0;
	var defaultInvalidMsg = "비밀번호 분실 시, 해당 아이디(이메일)로 메일이 전달되므로 정확하게 입력해주세요.";
	var invalidMsg = "비밀번호 분실 시, 해당 아이디(이메일)로 메일이 전달되므로 정확하게 입력해주세요.";
	var isCheckUniqEmail = false;
	$( "#join_input_email" )
		.focus(function() {
			emailFocus++;
			console.log('focus', emailFocus);

			$(this).removeClass('is-invalid').addClass('is-valid');
			$('.email-validation').text(defaultInvalidMsg).removeClass('is-invalid');

			$('#join_is_check_unque_email').val('0');
		})
		.blur(function() {
			emailBlur++;
			console.log('blur', emailBlur);

			var selfEmail = $(this).val();
			console.log('selfEmail', selfEmail);
			if(selfEmail.length < 4){
				invalidMsg = '아이디는 4자 이상 입력해주세요.';
				$(this).removeClass('is-valid').addClass('is-invalid');
				$('.email-validation').text(invalidMsg).addClass('is-invalid');
				return;
			}else{
				$(this).removeClass('is-invalid').addClass('is-valid');
				$('.email-validation').text(defaultInvalidMsg).removeClass('is-invalid');
			}
			var selectEmailHost = $('#join_select_email_host').val();
			console.log('selectEmailHost', selectEmailHost);
			var join_user_email = null;
			if(isDefined(selectEmailHost) == true){
				join_user_email = $(this).val()+'@'+selectEmailHost;
			}
			console.log('join_user_email', join_user_email);
			//메일 유니크 체크
			if(isDefined(join_user_email) == true){
				console.log('check uniq email');
				MOBILE_PAGE.join_form.checkEmailUniq();
			}
	});

	var defaultPassInvalidMsg = "비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 8~16자입니다.";
	var passInvalidMsg = null;
	$( "#join_user_pass" )
		.focus(function() {
			$(this).removeClass('is-invalid').addClass('is-valid');
			$('#user_pass_is_valid').text(defaultPassInvalidMsg).removeClass('is-invalid');

			var selectEmailHost = $('#join_select_email_host').val();
			console.log('selectEmailHost', selectEmailHost);
			if(isDefined(selectEmailHost) == false){
				invalidMsg = '이메일 호스트를 선택해주세요.';
				$('#join_select_email_host').addClass('is-invalid');
				$('.email-validation').text(invalidMsg).addClass('is-invalid');
				return;
			}else{
				$('#join_select_email_host').removeClass('is-invalid');
				$('.email-validation').text(defaultInvalidMsg).removeClass('is-invalid');
			}
			/*
			if(parseInt($('#join_is_check_unque_email').val()) != 1){
				MOBILE_PAGE.join_form.checkEmailUniq();
			}
			*/


		})
		.blur(function() {
			emailBlur++;
			console.log('blur', emailBlur);


			var selectEmailHost = $('#join_select_email_host').val();
			console.log('selectEmailHost', selectEmailHost);
			if(isDefined(selectEmailHost) == false){
				invalidMsg = '이메일 호스트를 선택해주세요.';
				//$('#join_select_email_host').addClass('is-invalid').focus();
				$('.email-validation').text(invalidMsg).addClass('is-invalid');
				return;
			}

			var selfPass = $(this).val();
			console.log('selfPass', selfPass);
			if(selfPass.length < 8 || selfPass.length > 16){
				invalidMsg = '비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 8~16자입니다';
				$(this).removeClass('is-valid').addClass('is-invalid');
				$('#user_pass_is_valid').text(invalidMsg).addClass('is-invalid');
				return;
			}else{
				$(this).removeClass('is-invalid').addClass('is-valid');
				$('#user_pass_is_valid').text(defaultPassInvalidMsg).removeClass('is-invalid');
			}



			var join_user_email = null;
			if(isDefined(selectEmailHost) == true){
				join_user_email = formData.input_email+'@'+selectEmailHost;
			}
			console.log('join_user_email', join_user_email);
			//메일 유니크 체크
			if(parseInt($('#join_is_check_unque_email').val()) != 1){
				MOBILE_PAGE.join_form.checkEmailUniq();
			}
		});
	/*
	$( "#join_direct_email_host" )
		.focus(function() {
			console.log('join_direct_email_host focus');
		})
		.blur(function() {
			console.log('join_direct_email_host blur');
			var directEmailHost = $(this).val();
			console.log('directEmailHost', directEmailHost);

			if(isDefined(directEmailHost) == false || directEmailHost == '@'){
				$('#join_select_email_host').val('');
				$('#join_is_check_unque_email').val('0');
			}else{

				if(directEmailHost.indexOf('@') == -1){
					directEmailHost = '@'+directEmailHost;
				}
				var savedHost = directEmailHost.replace('@', '');
				$('#btn-login-select-email-host').text(directEmailHost);
				$('#join_select_email_host').val(savedHost);
			}

	});
	*/
	//회원 가입 완료
	var joinMobileSuccessFun = function(data){
		console.log('joinMobileSuccessFun');
		console.log(data);
		//MOBILE_PAGE.SUCCESS_LOGIN
		if(isDefined(data.is_login)){
			if(data.is_login == 1){
				MOBILE_PAGE.SUCCESS_LOGIN(data);
				return;	
			}else{
				
				//check event msg
				var alertMsg; 
				if(isDefined(data.join_event)){
					for(var ei in data.join_event){
						eData = data.join_event[ei];
						if(eData.modal == 'alert'){
							alertMsg = eData.event_contents;
							break;
						}
					}
				}

				if(isDefined(data.user) == true && isDefined(data.is_copy)){
					var user_email = data.user.user_email;
					if(data.is_copy == 1){
						if(isDefined(data.rt_url) == true){
							location.href = data.rt_url;
							return;
						}
					}
				}
				if(isDefined(alertMsg)){
					alert(alertMsg);
				}else{
					
					alert("가입해 주셔서 감사합니다.\n로그인후 이용해주세요.");
				}
				
				//GO_LOGIN('home');
				location.href = "/mobile.php";
				return;
			}
		}
		
		
	} 

	$mobileJoinFormEle.unbind( "submit");
	$mobileJoinFormEle.submit(function(event){
		event.preventDefault();
		if($(this).hasClass('was-validated')){
			console.log('was-validated');
			//return false;
		}
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

		if(isDefined(formData)== false){
			return false;
		}

		$('#ambiance-notification').empty();
		if(isDefined(formData.input_full_email)== true){
			formData.join_user_email = formData.input_full_email;
		}else{
			if(isDefined(formData.input_email)== false){
				//disk_alert('아이디(이메일)을 입력해주세요.');
				disk_error('아이디(이메일)을 입력해주세요.');
				$('#join_input_email').removeClass('is-valid').addClass('is-invalid').focus();
				return false;
			}
			$('#join_input_email').removeClass('is-invalid').addClass('is-valid');

			if(isDefined(formData.select_email_host)== false){
				//disk_alert('이메일 호스트를 선택하거나 입력해주세요.');
				disk_error('이메일 호스트를 선택하거나 입력해주세요.');
				$('#join_select_email_host').removeClass('is-valid').addClass('is-invalid').focus();
				return false;
			}
			$('#join_select_email_host').removeClass('is-invalid').addClass('is-valid');

			if(isDefined(formData.input_email)== true && isDefined(formData.select_email_host)== true){
				var selectEmailHost =  formData.select_email_host;
				if(selectEmailHost.indexOf('@') == -1){
					selectEmailHost = '@'+selectEmailHost;
				}
				formData.join_user_email = formData.input_email+selectEmailHost;
			}
		}



		if(isDefined(formData.user_pass)== false){
			//disk_alert('패스워드를 입력해 주세요.');
			disk_error('패스워드를 입력해 주세요.');
			$('#join_user_pass').removeClass('is-valid').addClass('is-invalid').focus();
			return false;
		}
		$('#join_user_pass').removeClass('is-invalid').addClass('is-valid');

		if(isDefined(formData.user_pass2)== false || formData.user_pass != formData.user_pass2){
			//disk_alert('패스워드가 서로 일치하지 않습니다.');
			disk_error('패스워드가 서로 일치하지 않습니다.');
			$('#join_user_pass2').removeClass('is-valid').addClass('is-invalid').focus();
			return;
		}
		$('#join_user_pass2').removeClass('is-invalid').addClass('is-valid');

		//이메일 패턴 검사
		//var special_pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
		//var special_pattern = /[`~!+#$%^&*|\\\'\";:\/?\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/gi;
		var special_pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if( isDefined(formData.join_user_email) == false  || special_pattern.test(formData.join_user_email) != true ){
            //disk_alert('이메일 형식이 올바르지 않습니다.');
            disk_error('이메일 형식이 올바르지 않습니다.');
			return false;
        }

        if($('#join_form_terms_check').is(":checked") != true){
			//disk_alert('필수 약관에 동의하신 후 회원 가입이 가능합니다.');
			disk_error('필수 약관에 동의하신 후 회원 가입이 가능합니다.');
			$('#join_form_terms_check').focus();
			return false;
		}

		if($('#join_form_privacy_check').is(":checked") != true){
			//disk_alert('개인정보수집에 동의하신 후 회원 가입이 가능합니다.');
			disk_error('개인정보수집에 동의하신 후 회원 가입이 가능합니다.');
			$('#join_form_privacy_check').focus();
			return false;
		}

        console.log('formData:',formData);
		
		
		
        //return false;
		var ajaxData =
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.JOIN,
			data		: formData,
			success_fun	: joinMobileSuccessFun,
			error_fun	: null
		};
		DISK_PROTOCOL.AJAX(ajaxData);

		return false;

	});


	if(isDefined($mobileJoinFormEle)){
		$mobileJoinFormEle.data('loaded', 1);
		isPageLoaded = true;
	}

};

MOBILE_PAGE.join_form.checkEmailUniq = function(){
	console.log('MOBILE_PAGE.join_form.checkEmailUniq');

	$('#join_is_check_unque_email').val('0');
	var inputEmail = $('#join_input_email').val();
	var selectEmailHost = $('#join_select_email_host').val();
	console.log('selectEmailHost', selectEmailHost);
	var join_user_email = null;
	if(isDefined(inputEmail) == true && isDefined(selectEmailHost) == true){
		join_user_email = inputEmail+'@'+selectEmailHost;
	}
	console.log('join_user_email', join_user_email);

	var emptyInvalidMsg = '이메일 주소를 입력해주세요.';

	if(isDefined(join_user_email) == false){
		$('.email-validation').text(emptyInvalidMsg).addClass('is-invalid');
		return;
	}

	var sendData = {
		'join_email' : join_user_email
	}
	var successCheckEmailUniq = function(data){
		console.log('successCheckEmailUniq', data);
		var isUnique = false;
		var isShow = false;
		if(isDefined(data.is_unique)){
			if(data.is_unique == 1){
				 isShow = true;
				isUnique = true;
				$('#join_is_check_unque_email').val('1');
			}else if(data.is_unique == 2){
				isUnique = false;
			}else{
				isUnique = false;
				isShow = true;
			}
		}

		var $targetInput = $( "#join_input_email");
		var $targetMsg = $( ".email-validation");

		if(isShow){
			if(isUnique == true){
				invalidMsg = '사용 가능한 아이디(이메일)입니다.';
				$targetInput.removeClass('is-invalid').addClass('is-valid');
				$targetMsg.text(invalidMsg).removeClass('is-invalid');
			}else{
				invalidMsg = '이미 사용중인 아이디(메일 주소)입니다. 다른 메일 주소를 입력해주세요.';
				$targetInput.removeClass('is-valid').addClass('is-invalid');
				$targetMsg.text(invalidMsg).addClass('is-invalid');
			}
		}


	};

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.CHECK_EMAIL_UNIQ,
		data		: sendData,
		success_fun	: successCheckEmailUniq,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};


MOBILE_PAGE.join = {};
MOBILE_PAGE.join.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.join.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

};

MOBILE_PAGE.sns = {};

//sns join & login
MOBILE_PAGE.sns.onclickMobileSnsJoin = function(thisEle){
	console.log('SHOP_SIGN_IN.sns.onclickSnsJoin');
	var DF = get_disk_config(true);
	var eleData = $(thisEle).data();
	if(isDefined(eleData.type) == false){
		eleData.type = 'join';
	}
	if(isDefined(eleData.sns) == false){
		alert('SNS 로그인 타입을 선택해주세요.');
		return;
	}

	console.log('eleData', eleData);


	var retrunUrl = null;
	if(eleData.type == 'mjoin'){
		if($('#join_form_terms_check').is(":checked") != true){
			alert('아래의 필수 약관에 동의하신 후 SNS로 회원 가입이 가능합니다.');
			$('#join_form_terms_check').focus();
			return;
		}

		if($('#join_form_privacy_check').is(":checked") != true){
			alert('아래의 개인정보수집에 동의하신 후 SNS로 회원 가입이 가능합니다.');
			$('#join_form_privacy_check').focus();
			return;
		}

	}
	//돌아갈 페이지를 쿠키에 저장
	else if(eleData.type == 'mlogin'){

	}

	retrunUrl = getSelfHostFullUrl();
	console.log('retrunUrl', retrunUrl);
	if(isDefined(retrunUrl) == true){
		if (retrunUrl.indexOf('action=login') != -1 || retrunUrl.indexOf('action=service') != -1 || retrunUrl.indexOf('action=join') != -1) {
		  retrunUrl = '/mobile.php/mobile/main/';
		}
		$.cookie(DF.cookiePrefix+'mrt_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });
	}

	var snsType = eleData.sns;
	console.log('snsType::'+snsType);
	var openUrl = null;
	var snsOauthPopup = null;
	if(snsType == 'naver'){
		openUrl = '/mobile.php/login/sns_naver/1/?url='+retrunUrl;
		//snsOauthPopup = PopupCenter(openUrl, 'shop_oAuth', 600, 600);
	}else if(snsType == 'kakao'){
		openUrl = '/mobile.php/login/sns_kakao/1/?url='+retrunUrl;
		//snsOauthPopup = PopupCenter(openUrl, 'shop_oAuth', 600, 600);

	}else if(snsType == 'facebook'){
		openUrl = '/mobile.php/login/sns_facebook/1/?url='+retrunUrl;
		//snsOauthPopup = PopupCenter(openUrl, 'shop_oAuth', 600, 600);

	}else if(snsType == 'google'){
		openUrl = '/mobile.php/login/sns_google/1/?url='+retrunUrl;
		//snsOauthPopup = PopupCenter(openUrl, 'shop_oAuth', 600, 600);

	}else{
		//location.href = "/index.php/login/";

	}
	console.log('snsType', snsType);
	console.log('snsOauthPopup', openUrl);
	console.log('openUrl', snsOauthPopup);
	//alert(openUrl);
	if(openUrl){
		location.href = openUrl;
	}
	return;
};

