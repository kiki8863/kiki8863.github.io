var PAGE_LOGIN = {};


PAGE_LOGIN.start = function(pageSub, pagData){
	console.log('PAGE_LOGIN.start', pageSub);
	PAGE_LOGIN.defaultBinding();
	
	
	if(pageSub == 'join'){
		if(utility.disk.checkIsLogin() == true){
			GO_HOME();
			return;
		}
		PAGE_LOGIN.JOIN.joinFormStart();
		//PAGE_LOGIN.JOIN.formBinding();
	}if(pageSub == 'join_form'){
		if(utility.disk.checkIsLogin() == true){
			GO_HOME();
			return;
		}
		PAGE_LOGIN.JOIN.joinPartnerFormStart();
		//PAGE_LOGIN.JOIN.formBinding();
	}
};

PAGE_LOGIN.defaultBinding = function(){
	console.log('PAGE_LOGIN.defaultBinding');
};


//captcha data get
/*
PAGE_LOGIN.getCaptchaData = function(callbackFun){
	console.log('PAGE_LOGIN.getCaptchaData');
	COMMON_ACTION.SECURITY.getCaptchaData(null, callbackFun);
	
	var httpSucessGetCaptcha = function(data){
		console.log(data);
		if (typeof callbackFun === "function"){
            callbackFun(data.img_tag);
            return;
		}
		return data.img;
	}
	var sendData = {};
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CAPTCHA.CREATE_CAPTCHA,
		data		: sendData,
		success_fun	: httpSucessGetCaptcha,
		error_fun	: null,
		data_type	: 'jsonp'
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};
*/

//보안코드 새로고침
PAGE_LOGIN.reloadCaptchaLogin = function(){
	console.log('PAGE_LOGIN.reloadCaptchaLogin');
	
	var captchaCallBackFun = function(captchaImgTag){
		console.log('captchaCallBackFun', captchaImgTag);
		if(isDefined(captchaImgTag)){
			$('#disk-login-security-captcha').html(captchaImgTag);	
		}
	};
	
	COMMON_ACTION.SECURITY.getCaptchaData(null, captchaCallBackFun);
		
};



PAGE_LOGIN.LOGIN = {};

PAGE_LOGIN.LOGIN.formBinding = function()
{
	console.log('PAGE_LOGIN.LOGIN.formBinding');
	
	
	
};


PAGE_LOGIN.LOGIN.shoPayAlert = function()
{
	var DF = get_disk_config(false);
	
	//var remainingHour = getCountDownTimer('11/04/2020 4:00 PM', 'hours');
	var isAlert = false;
	
	//vip
	if(utility.disk.checkIsVip() == true){
		var cKey = DF.cookiePrefix+'pay_vip_msg';
		var payCookieMsg = $.cookie(cKey);
		if(payCookieMsg != 1){
			$.cookie(cKey, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
			alert("축하드립니다.\n\n11월 VIP 회원으로 선정되셨습니다.\n지금 VIP회원만의 특별한 혜택을 확인하세요");
			location.href = '/event/e_view/vip_info_2011?page=1';
			return true;
		}
	
		//pay
		if(isAlert != true){
			var cKey = DF.cookiePrefix+'pay_non_msg';
			var payCookieMsga = $.cookie(cKey);
			if(payCookieMsga != 1){
				$.cookie(cKey, 1, { expires: 3,  path: '/', domain: DF.COOKIE_DOMAIN });
				alert("11월 온플레이 VIP 회원만의 특별한 혜택\n\n지금 충전하시면\n50%할인된 가격으로 제휴 캐시 2배 적립과 + 300,000B + 쿠폰 30장을 추가로 드립니다.");
				isAlert = true;
				location.href = '/charge';
				return true;
			}
		}
	}else{
		//pay
		if(isAlert != true){
			var cKey = DF.cookiePrefix+'pay_non_msg';
			var payCookieMsgb = $.cookie(cKey);
			if(payCookieMsgb != 1){
				$.cookie(cKey, 1, { expires: 3,  path: '/', domain: DF.COOKIE_DOMAIN });
				alert("11월 온플레이 반값 이벤트\n\n지금 충전하시면\n포인트 2배 적립과 + 300,000B + 쿠폰 30장을 추가로 드립니다.");
				isAlert = true;
				location.href = '/charge';
				return true;
			}
		}
	}
	
	return false;
}


//로그인 실패 처리
PAGE_LOGIN.SUCCESS_FALE = function(data){
	console.log('PAGE_LOGIN.SUCCESS_FALE', data);
	
	var captchaCallBackFun = function(captchaImgTag){
		console.log('captchaCallBackFun', captchaImgTag);
		if(isDefined(captchaImgTag)){
			$('#disk-login-security-captcha').html(captchaImgTag);	
			$('#disk-login-security_word').show();
		}
	};
	
	if(isDefined(data.status) == true){
		var dataStatusKey = data.status.key;
		if(dataStatusKey == 'ERR_ONPLAY_USER_LOGIN_NOT_WITH_CAPTCHA' || dataStatusKey == 'ERR_ONPLAY_USER_LOGIN_NOT_CAPTCHA'){
			console.log('ERR_ONPLAY_USER_LOGIN_NOT_CAPTCHA');
			if ( $('#disk-login-security_word').css('display') == 'none'){
				alert('3회 이상 암호 입력이 실패하여 보안문자 입력이 필요합니다.');
			}else{
				var checkData = DISK_PROTOCOL.checkServerValuation(data, null);
			}
			//PAGE_LOGIN.getCaptchaData(captchaCallBackFun);
			COMMON_ACTION.SECURITY.getCaptchaData(null, captchaCallBackFun);
		}else{
			var checkData = DISK_PROTOCOL.checkServerValuation(data, null);
		}
	}
};




//로그인 성공시
PAGE_LOGIN.SUCCESS_LOGIN = function(data){
	console.log('PAGE_LOGIN.SUCCESS_LOGIN');
	console.log(data);
	var DF = get_disk_config(false);
	var jsTimestampSecond = Math.floor(+ new Date() / 1000);
	var actionType = null;
	if(isDefined(data.action_type)){
		actionType = data.action_type;
	}
	//회원정보 저장
	if(isDefined(data.member)){
		var saveMemberData = JSON.stringify(data.member);
		utility.disk.setStorageData('member_data', saveMemberData);
		DISK_MEMBER_FUN.setMemberInfo(data.member, false);
	}
	//data.new_momo_count = 0;
	/*
	//쪽지 저장 - 10분 유효
	if(isDefined(data.new_momo_idx)){
		console.log('save memo count');
		if(data.new_momo_idx > 0){
			var saveCookieName = DF.cookiePrefix+'memo_idx';
			$.cookie(saveCookieName, data.new_momo_idx, { expire_time: 600 });
			WEB_COMMON_MEMBER.showNewMemoFlag(data.new_momo_idx);
		}
	}
	//save check time
	var jsTimestampSecond = Math.floor(+ new Date() / 1000);
	$.cookie(DF.cookiePrefix+'notice_ck_time', jsTimestampSecond, { expires: 1 });
	
	
	//뉴스 저장 - 10분 유효
	if(isDefined(data.new_news_data)){
		console.log('save news count');
		var savedCookieName = DF.cookiePrefix+'news_idx';
		var savedNewsIdx = $.cookie(savedCookieName);
		console.log('data.new_news_data', data.new_news_data);
		console.log('savedNewsIdx', savedNewsIdx);
		if(savedNewsIdx != data.new_news_data.idx){
			$.cookie(savedCookieName, data.new_news_data.idx, { expire_time: 600 });
		}
		WEB_COMMON_MEMBER.showNewNewsFlag(data.new_news_data.idx);
	}
	*/
	//상단 쪽지 & news 알림
	if(isDefined(data.member_news_count)){
		$.cookie(DF.cookiePrefix+'notice_ck_time', jsTimestampSecond, { expires: 1,  path: '/', domain: DF.COOKIE_DOMAIN });
		WEB_COMMON_MEMBER.showMemberAlaimFlag(data.member.member_idx, data.member_news_count, data.member_memo_count);
	}
	
	//join event
	var isAlert = false;
	
	
	//check alert
	if(actionType == 'join_action'){
		if(isDefined(data.join_event)){
			var alertMsg = null;
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
		/*
		if(isAlert != true){
			alert('감사합니다.\n회원가입이 완료되었습니다.');
			isAlert = true;
		}
		*/

	}else if(actionType == 'login_action'){
		console.log('actionType', actionType);
		if(isDefined(data.login_event)){
			var alertMsg = null;
			var linkUrl = null;
			for(var ei in data.login_event){
				eData = data.login_event[ei];
				if(eData.modal == 'alert'){
					alertMsg = eData.event_contents;
					if(isDefined(eData.link)){
						linkUrl = eData.link;
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
	
	
	
	//pay alert
	if(isAlert != true){
		isAlert = PAGE_LOGIN.LOGIN.shoPayAlert();
		if(isAlert == true){
			return false;
		}
	}
	//return;
	//return check
	var returnUrl = $.cookie(DF.cookiePrefix+'rt_url');
	console.log('returnUrl', returnUrl);
	if(actionType == 'join_action'){
		/*
		if(isAlert != true){
			alert('감사합니다.\n회원가입이 완료되었습니다.');
			isAlert = true;
		}
		*/
		
	}else if(actionType == 'login_action'){
		console.log('actionType', actionType);
		console.log($.modal.isActive());
		console.log($.modal.getCurrent());
		
		
		if($("#pcLoginActionForm").find('input[name=save_email]').is(":checked") == true){
			console.log('save email checked');
			var saveCookieName = 'fms_save_email';
			$.cookie(saveCookieName, data.member.member_email, { expires: 365 });
		}else{
			$.removeCookie('fms_save_email');
		}
		//return;
		$.modal.close();
	}
	
	if(isDefined(returnUrl)){
		$.removeCookie(DF.cookiePrefix+'rt_url', { path: '/',domain: DF.COOKIE_DOMAIN });
		location.href = returnUrl;
		return;
	}
	console.log('WEB_COMMON.DATA.MAIN', WEB_COMMON.DATA.MAIN);
	if(isDefined(WEB_COMMON.DATA.MAIN)){
		if(WEB_COMMON.DATA.MAIN == 'login' || WEB_COMMON.DATA.MAIN == 'user'){
			location.href = '/home';
		}
	}
	
};




//로그인 submit 처리
PAGE_LOGIN.LOGIN.modalFormBinding = function()
{
	console.log('PAGE_LOGIN.LOGIN.modalFormBinding');
	$("#pcLoginActionForm").unbind('submit');
	$("#pcLoginActionForm").submit(function(event){
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
		
		if(isDefined(formData.user_email)== false || isDefined(formData.user_pass)== false){
			return false;
		}
	
		//이메일 패턴 검사
		//var special_pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
		var special_pattern = /[`~!+#$%^&*|\\\'\";:\/?\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/gi;
        if( isDefined(formData.user_email) == false  || special_pattern.test(formData.user_email) == true ){
            alert('아이디 형식이 올바르지 않습니다.');
			return false;
        }
		var ajaxData = 
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.LOGIN,
			data		: formData,
			success_fun	: PAGE_LOGIN.SUCCESS_LOGIN,
			error_fun	: PAGE_LOGIN.SUCCESS_FALE
		};
		DISK_PROTOCOL.AJAX(ajaxData);
		
		return false;
		
	});
	
	//save cookie - 아이디 저장
	//var isSaveCookieEmail $.cookie('fms_save_email');
	if(isDefined($.cookie('fms_save_email')) == true){
		$("#pcLoginActionForm").find('input[name=user_email]').val($.cookie('fms_save_email'));
		$("#pcLoginActionForm").find('input[name=save_email]').prop('checked', true);
		
	}
	
};



PAGE_LOGIN.JOIN = {};

//일반회원 가입
PAGE_LOGIN.JOIN.joinFormStart = function(){
	console.log('PAGE_LOGIN.JOIN.joinFormStart');
	
	
	
	if($('.join_form_with_partner').length > 0){
		PAGE_LOGIN.JOIN.joinFormBindinWithPartner();
	}else{
		PAGE_LOGIN.JOIN.joinFormAgreeBinding();
	}
		
};

//agree 세션 바인딩
PAGE_LOGIN.JOIN.joinFormAgreeBinding = function(){
	console.log('PAGE_LOGIN.JOIN.joinFormAgreeBinding');	
	
	//binding checkbox click
	var $agreeJoinForm = $('#webJoinAgreeForm');
	if($agreeJoinForm.length < 1){
		return;
	}
	var aggressCheckBoxClickFun = function(thisEle){
		console.log('aggressCheckBoxClickFun');
		//console.log($(this).val());
		
		$agreeJoinForm.find('.login-pc-join-form-ok-btn').removeClass('active');
		$agreeJoinForm.find('.btn_all_agree').removeClass('active');
		
		var isTermsCheck = false;
		var isPrivacyCheck= false;
		isPrivacyCheckOptions = false;
		//var self = this;
		 $agreeJoinForm.find('.join_form_checkbox').each(function() {
			var slefBox = this;
		      if(slefBox.checked){//checked 처리된 항목의 값
				if(slefBox.id == 'join_form_terms_check'){
					isTermsCheck = true;
				}
				else if(slefBox.id == 'join_form_privacy_check'){
					isPrivacyCheck = true;
				}else if(slefBox.id == 'join_form_privacy_check_options'){
					isPrivacyCheckOptions = true;
				}
		      }
		
		 });
		
		if(isTermsCheck == true && isPrivacyCheck == true){
			$agreeJoinForm.find('.login-pc-join-form-ok-btn').addClass('active');
		}
		if(isTermsCheck == true && isPrivacyCheck == true && isPrivacyCheckOptions == true){
			$agreeJoinForm.find('.btn_all_agree').addClass('active');
		}
	};
	$agreeJoinForm.find('.join_form_checkbox').off( "click");
	$agreeJoinForm.find('.join_form_checkbox').on( "click", aggressCheckBoxClickFun);

	//모두 동의 바인딩
	var changeJoinAgreeCheckBox = function(checkType){
		console.log('changeJoinAgreeCheckBox', checkType);
		$agreeJoinForm.find('.join_form_checkbox').each(function() {
			if(checkType == 'on'){
				this.checked = true; //checked 처리
				$(this).prop('checked', true) ;
				$(this).attr('checked', true) ;
				$agreeJoinForm.find('.login-pc-join-form-ok-btn').addClass('active');
			}else{
				this.checked = false; //checked 처리
				$(this).prop('checked', false) ;
				$(this).attr('checked', false) ;
				$agreeJoinForm.find('.login-pc-join-form-ok-btn').removeClass('active');
			}
		});
			
	};
	$agreeJoinForm.find( ".btn_all_agree" ).unbind( "click");
	$agreeJoinForm.find( ".btn_all_agree" ).bind( "click", function() {
		console.log('.btn_all_agree');
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			changeJoinAgreeCheckBox('off');
		}else{
			$(this).addClass('active');
			changeJoinAgreeCheckBox('on');
		}
	});

};

//이용 약관 동의 버트 클릭
PAGE_LOGIN.JOIN.onclickJoinAgreeContractBtn = function(thisEle){
	console.log('PAGE_LOGIN.JOIN.onclickJoinAgreeContractBtn');
	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	
	
	if($(thisEle).hasClass('active') == false){
		//alert('필수 이용약관은 모두 동의하셔야 회원가입이 진행합니다.');
		return;
	}
	var formValues = $(eleData.self_form).serializeArray();
		console.log('formValues:', formValues);
		
	var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);
	if(isDefined(formData) == false){
		alert('필수 이용약관은 모두 동의하셔야 회원가입이 진행합니다.');
		return;
	}
	
	if(isDefined(formData.join_form_terms_check)== false){
		alert('필수 이용약관은 모두 동의하셔야 회원가입이 진행합니다.1');
		return;
	}
	if(isDefined(formData.join_form_privacy_check)== false){
		alert('필수 이용약관은 모두 동의하셔야 회원가입이 진행합니다.2');
		return;
	}
	
	if(formData.join_form_terms_check != 'on' || formData.join_form_privacy_check != 'on'){
		alert('필수 이용약관은 모두 동의하셔야 회원가입이 진행합니다.');
		return;
	}
	var isEssentialAgree = true;
	
	var privacyCheckOptions = null;
	if(isDefined(formData.join_form_privacy_check_options)== true){
		privacyCheckOptions = formData.join_form_privacy_check_options;
	}
	console.log('privacyCheckOptions', privacyCheckOptions);
	if(isDefined(eleData.join_form)){
		var $targetJoinForm = 	$(eleData.join_form);
		if($targetJoinForm.length > 0){
			$targetJoinForm.find('input[name="is_essential_agree"]').val('1');
		}
		if(privacyCheckOptions == 'on'){
			$targetJoinForm.find('input[name="is_options_agree"]').val('1');
		}
	}
	
	$('.web-login-join-agree').removeClass('is_show');
	$('.web-login-join-form').addClass('is_show');
	
	utility.ui.goToElement('.header'); 
	PAGE_LOGIN.JOIN.formBinding();
};

//파트너 회원 가입
PAGE_LOGIN.JOIN.joinPartnerFormStart = function(){
	PAGE_LOGIN.JOIN.formBinding();
};

PAGE_LOGIN.JOIN.openPrivacyModal = function(modalName)
{
	console.log('PAGE_LOGIN.JOIN.openPrivacyModal', modalName);
	if(isDefined(modalName) == false){
		return;
	}
	if($('#'+modalName).length < 1){
		return;
	}
	
	var isModalCloseExisting = false;
		$('#'+modalName).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker",
			clickClose: false,
			escapeClose: true,
			showClose	: false
		});
		return;
}
	
PAGE_LOGIN.JOIN.checkEmailUniq = function(){
	console.log('PAGE_LOGIN.JOIN.checkEmailUniq');	
	
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

//파트너 회원 가입
PAGE_LOGIN.JOIN.joinFormBindinWithPartner = function(){
	PAGE_LOGIN.JOIN.formBinding();	
};
	
PAGE_LOGIN.JOIN.formBinding = function(){
	console.log('PAGE_LOGIN.JOIN.fromBinding v1');
	
	//페스워드 유효성 체크 여부 - 테스트시에는 false
	var isCheckPassValid = false;
	
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
			
			$('#'+eleData.target).text($(this).text()).trigger('click');
			console.log($('#'+eleData.target).data());
			if(eleData.values == '@'){
				$('#join_select_email_host').val('').removeAttr('readonly');
				$('#join_is_check_unque_email').val('0');
			}else{
				$('#join_select_email_host').val(eleData.values).attr('readonly','readonly');
				PAGE_LOGIN.JOIN.checkEmailUniq();
			}
		}
	
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
				PAGE_LOGIN.JOIN.checkEmailUniq();
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
				PAGE_LOGIN.JOIN.checkEmailUniq();	
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
			if(isCheckPassValid == true){
				if(selfPass.length < 8 || selfPass.length > 16){
					invalidMsg = '비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 8~16자입니다';
					$(this).removeClass('is-valid').addClass('is-invalid');
					$('#user_pass_is_valid').text(invalidMsg).addClass('is-invalid');
					return;
				}
				/*
				else{
					$(this).removeClass('is-invalid').addClass('is-valid');
					$('#user_pass_is_valid').text(defaultPassInvalidMsg).removeClass('is-invalid');
				}
				*/
			}else{
				if(selfPass.length < 4 || selfPass.length > 16){
					invalidMsg = '비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 4~16자입니다';
					$(this).removeClass('is-valid').addClass('is-invalid');
					$('#user_pass_is_valid').text(invalidMsg).addClass('is-invalid');
					return;
				}
			}
			$(this).removeClass('is-invalid').addClass('is-valid');
			$('#user_pass_is_valid').text(defaultPassInvalidMsg).removeClass('is-invalid');
			
			
			var join_user_email = null;
			if(isDefined(selectEmailHost) == true){
				var inputEmail = $('#join_input_email').val();
				join_user_email = inputEmail+'@'+selectEmailHost;
			} 
			console.log('join_user_email', join_user_email);
			//메일 유니크 체크
			if(parseInt($('#join_is_check_unque_email').val()) != 1){
				PAGE_LOGIN.JOIN.checkEmailUniq();	
			}
		});
	
	
	var joinSuccessFun = function(data){
		console.log('joinSuccessFun');
		console.log(data);
		PAGE_LOGIN.SUCCESS_LOGIN(data);
		return;
	};
	
	var joinFaliFun = function(data){
		console.log('joinSuccessFun');
		console.log(data);
		$( "#login-pc-join-form" ).find('.btn_join').attr('disabled', false);
		
		if(isDefined(data.status) == true){
			var dataStatusKey = data.status.key;
			var checkData = DISK_PROTOCOL.checkServerValuation(data, null);
		}
	};
	
	$( "#login-pc-join-form" ).unbind( "submit");
	$("#login-pc-join-form").submit(function(event){
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
        var isPartner  = false;
        if(isDefined(formData.is_partner)){
        	if(formData.is_partner == '1' || formData.is_partner == 1){
        		isPartner  = true;
        	}
        }
        
		if(isDefined(formData.input_full_email)== true){
			formData.join_user_email = formData.input_full_email;
		}else{
			if(isDefined(formData.input_email)== false){
				alert('아이디(이메일)을 입력해주세요.');
				$('#join_input_email').removeClass('is-valid').addClass('is-invalid').focus();
				return false;
			}
			$('#join_input_email').removeClass('is-invalid').addClass('is-valid');
			
			if(isDefined(formData.select_email_host)== false){
				alert('이메일 호스트를 선택하거나 입력해주세요.');
				$('#join_select_email_host').removeClass('is-valid').addClass('is-invalid').focus();
				return false;
			}
			$('#join_select_email_host').removeClass('is-invalid').addClass('is-valid');
			
			if(isDefined(formData.input_email)== true && isDefined(formData.select_email_host)== true){
				formData.join_user_email = formData.input_email+'@'+formData.select_email_host;
			}
		}
		
		
		var invalidMsg = "비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 8~16자입니다.";
		if(isDefined(formData.user_pass)== false){
			//alert('패스워드를 입력해 주세요.');
			//$('#join_user_pass').removeClass('is-valid').addClass('is-invalid').focus();
			invalidMsg = '패스워드를 입력해 주세요.';
			$('#join_user_pass').removeClass('is-valid').addClass('is-invalid');
			$('#user_pass_is_valid').text(invalidMsg).addClass('is-invalid');
			return false;
		}
		$('#join_user_pass').removeClass('is-invalid').addClass('is-valid');

		if(isDefined(formData.user_pass2)== false || formData.user_pass != formData.user_pass2){
			//alert('패스워드가 서로 일치하지 않습니다.');
			//$('#join_user_pass2').removeClass('is-valid').addClass('is-invalid').focus();
			//invalidMsg = '비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 4~16자입니다';
			invalidMsg = '패스워드가 서로 일치하지 않습니다';
			$('#join_user_pass2').removeClass('is-valid').addClass('is-invalid');
			$('#user_pass_is_valid').text(invalidMsg).addClass('is-invalid');
			
			return false;
		}
		
		if(formData.user_pass2.length < 4 || formData.user_pass2.length > 16){
			invalidMsg = '비밀번호 영문 대소문자, 숫자, 특수문자 2종류 조합 4~16자입니다';
			$('#join_user_pass2').removeClass('is-valid').addClass('is-invalid').focus();
			alert(invalidMsg);
			return false;
		}
		$('#join_user_pass2').removeClass('is-invalid').addClass('is-valid');
		$('#user_pass_is_valid').text(invalidMsg).removeClass('is-invalid').addClass('is-valid');
	
				
			
		
		//이메일 패턴 검사
		//var special_pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
		var special_pattern = /[`~!+#$%^&*|\\\'\";:\/?\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/gi;
        if( isDefined(formData.join_user_email) == false  || special_pattern.test(formData.join_user_email) == true ){
            alert('이메일 형식이 올바르지 않습니다.');
			return false;
        }
        //password 검사
		//var (?=.*?[A-Z])) 대문자, (?=.*?[a-z]) 소문자,  (?=.*?[0-9]) 숫자, (?=.*?[#?!@$%^&*-])특수문자, .{8,} 최소길이 8자
		//test를 위해 길이 체크 안함
		if(isCheckPassValid == true){
	        var checkpass1 = /^(?=.*?[a-z])(?=.*?[A-Z]).{8,16}$/.test(formData.user_pass);
	        var checkpass2 = /^(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/.test(formData.user_pass)
	        var checkpass3 = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(formData.user_pass);
	        var checkpass4 = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/.test(formData.user_pass);
	        var checkpass5 = /^(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(formData.user_pass);
	        var checkpass6 = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(formData.user_pass);
	        if(!(checkpass1||checkpass2||checkpass3||checkpass4 ||checkpass5 ||checkpass6)){
	    		alert("사용할 수 없은 패스워드입니다.\n패스워드 설정안내를 확인해 주세요.");
	            $("#join_user_pass").focus();
	    		return false;
	    	}
 		}
    	
        if(isPartner == true){
	        if($('#join_form_terms_check').is(":checked") != true){
				alert('아래의 필수 약관에 동의하신 후  회원 가입이 가능합니다.');
				$('#join_form_terms_check').focus();
				return false;
			}
			
			if($('#join_form_privacy_check').is(":checked") != true){
				alert('아래의 개인정보수집에 동의하신 후  회원 가입이 가능합니다.');
				$('#join_form_privacy_check').focus();
				return false;
			}
		}
		
		$(this).find('.btn_join').attr('disabled', true);
		
        console.log('formData:',formData);
        
        
        
        //return false;
		var ajaxData = 
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.JOIN,
			data		: formData,
			success_fun	: joinSuccessFun,
			error_fun	: joinFaliFun
		};
		DISK_PROTOCOL.AJAX(ajaxData);
		
		return false;
		
	});
	
};



//sns login
PAGE_LOGIN.onclickSnsJoin = function(thisEle){
	console.log('SHOP_SIGN_IN.onclickSnsJoin');
	var DF = get_disk_config(false);
	var eleData = $(thisEle).data();
	var actionType = 'join';
	if(isDefined(eleData.type) == true){
		actionType = eleData.type;
	}
	var isPartner = false;
	if(isDefined(eleData.is_partner) == true){
		if(eleData.is_partner == 1){
			isPartner = true;
		}
	}
	
	if(isDefined(eleData.sns) == false){
		alert('SNS 로그인 타입을 선택해주세요.');
		return;
	}
	console.log('eleData', eleData);
	var retrunUrl = null;
	if(actionType == 'join'){
		if(isPartner == true){
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
	}
	//돌아갈 페이지를 쿠키에 저장
	else if(actionType == 'login'){
		retrunUrl = getSelfHostFullUrl();
		console.log('retrunUrl', retrunUrl);
		/*
		if(retrunUrl == '/login/join_form/'){
			retrunUrl == '/home/';
		}
		
		*/

		if(isDefined(retrunUrl) == true){
			if (retrunUrl.indexOf('/login') != -1) {
			  retrunUrl = '/index.php/home/';
			}
			$.cookie(DF.cookiePrefix+'rt_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });
		}
	}
	console.log('retrunUrl', retrunUrl);
	//return;
	
	var snsType = eleData.sns;
	console.log('snsType::'+snsType);
	var openUrl = null;
	//var snsOauthPopup = null;
	var snsOauthPopup = window.open('about:blank', 'sns_oAuth', 'scrollbars=yes, width=650, height=700, top=0, left=0');
	
	if(snsType == 'naver'){
		openUrl = '/index.php/login/sns_naver/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);
	}else if(snsType == 'kakao'){
		openUrl = '/index.php/login/sns_kakao/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);
	
	}else if(snsType == 'facebook'){
		openUrl = '/index.php/login/sns_facebook/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);
	
	}else if(snsType == 'google'){
		openUrl = '/index.php/login/sns_google/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);
	
	}else{
		//location.href = "/index.php/login/";
		
	}
	//console.log('snsOauthPopup', snsOauthPopup);
	//window.postMessage({ childData : 'test data' }, '*');
	if(snsOauthPopup && openUrl){
		snsOauthPopup.location.href = openUrl;
	}else{
		snsOauthPopup.close();
		snsOauthPopup = null;
	}
	return;

};
