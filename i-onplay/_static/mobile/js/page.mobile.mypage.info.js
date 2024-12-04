
//mypage >> info
MOBILE_PAGE.mypage.info = {};
MOBILE_PAGE.mypage.info.start = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.start');
	console.log('myId', myId);
	console.log('nextPage', nextPage);
	console.log('searchKeyword', searchKeyword);
	
	//indrt container
	var containerFun = MOBILE_TEMPLETE.CONNTAINER.m_mypage[myId];
	if(containerFun){
		$(MOBILE_PAGE.mypage.DATA.ELE.container).html(containerFun.call(null, myId));	
	}else{
		console.log('empty containerFun');
		return;
	}
	if(isDefined(myId)){
		$(MOBILE_PAGE.mypage.DATA.ELE.container).data('id','mypage-info-'+myId);	
	}
	MOBILE_PAGE.mypage.info.getInfoList(myId, nextPage, searchKeyword);
};
//mypage >> info : 페이지 데이타 가져오기
MOBILE_PAGE.mypage.info.getInfoList = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.getInfoList');	
	
	if(myId == 'info_edit'){
		MOBILE_PAGE.mypage.info.info_edit.setBuyListPage(nextPage, searchKeyword);
	}else if(myId == 'wish_list'){
		MOBILE_PAGE.mypage.info.wish_list.setWishListPage(nextPage, searchKeyword);
	}
	
	
};

MOBILE_PAGE.mypage.info.afterBinding = function(){
	console.log('MOBILE_PAGE.mypage.info.afterBinding');
	//show top
	$('.mobile-bottom-top-btn').addClass('show');
	
	MOBILE_COMMON.afterLoadCommonBinding();	
};

//마이페이지 : 회원정보 / 수정
MOBILE_PAGE.mypage.info.info_edit = {};
MOBILE_PAGE.mypage.info.info_edit.setBuyListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.setBuyListPage',nextPage);	
	
	
	//get page data
	//MOBILE_PAGE.mypage.info.info_edit.getBuyListData(nextPage, searchKeyword);
	var infoId = 'info_edit';
	MOBILE_PAGE.mypage.info.commonListListData(infoId, nextPage, searchKeyword);
	
};




//마이페이지 : 찜한목록
MOBILE_PAGE.mypage.info.wish_list = {};
MOBILE_PAGE.mypage.info.wish_list.setWishListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.wish_list.setWishListPage',nextPage);	
	//get page data
	//MOBILE_PAGE.mypage.info.wish_list.getWishListData(nextPage, searchKeyword);
	var infoId = 'wish_list';
	MOBILE_PAGE.mypage.info.commonListListData(infoId, nextPage, searchKeyword);
	
};

//마이페이지 : 찜한목록 데이타 가져오기
MOBILE_PAGE.mypage.info.wish_list.getWishListData = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.getWishListData');
	
	var infoId = 'wish_list';
	MOBILE_PAGE.mypage.info.commonListListData(infoId, nextPage, searchKeyword);
};


MOBILE_PAGE.mypage.info.onclickSecurityLoginFormAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickSecurityLoginFormAction');	
	var eleData = $(thisEle).data();
	if(isDefined(eleData.target) == false){
		console.log('targetForm empty');
		return;
	}
	
	var formValues = $(eleData.target).serializeArray();
	console.log('formValues:', formValues);
	var infoId = 'info_edit';
	if(isDefined(eleData.type)){
		infoId = eleData.type;
	}
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData.member_password) == false){
		disk_alert('비밀번호를 입력해주세요.');
		return false;
	}
	formData.is_mobile = 1;
	var successSecurityLoginFun = function(data){
		console.log('successSecurityLoginFun');
		console.log(data);
		
		if(isDefined(data.is_ok)){
			if(data.is_ok == 1){
				MOBILE_PAGE.mypage.info.commonListListData(infoId);		
			}
		}
		
		
	};
	
	
	
	COMMON_ACTION.MYPAGE.actionSecurityLogin(formData, successSecurityLoginFun);
	return false;
}


//마이페이지 : 컨텐츠 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.info.commonListListData = function(infoId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.commonListListData', infoId);
	
	if(isDefined(infoId) == false){
		console.log('empty infoId');
		return;
	}
	
	var memberEmail = DISK_MEMBER_FUN.getMyMemberData('member_email');
	if(isDefined(memberEmail) == false){
		GO_LOGIN();
		return;
	}
		
	var startPage = 1;
	var sendData = {
		page		: startPage,
		is_mobile	: 1
	};

	console.log('sendData', sendData);
	
	//var $innerEle = $('.aaa');
	var $containerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
	var $infoEle = $containerEle.find('.mobile-mypage-'+infoId+'-page-end-spy');
	var $innerHtmlTarget = $containerEle.find('.mypage-info-'+infoId);
	var successFunGetInfoList = function(data){
		console.log('successFunGetInfoList', data);
		
		//비밀번호 확인
		var isSecurityCheck = false;
		if(isDefined(data.is_security_check)){
			if(data.is_security_check == 1){
				isSecurityCheck = true;
			}
		}
		
		if(isSecurityCheck == true){
			if(isDefined(data.my_page_data)){
				$innerHtmlTarget.html(data.my_page_data);
			}
		}else{
			var innerHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_security(memberEmail, infoId);
			console.log('innerHtml', innerHtml);
			if(innerHtml){
				$innerHtmlTarget.html(innerHtml);
			}
		}
		//GO_TOP();
		MOBILE_PAGE.mypage.info.afterBinding();
	};
	
	var serverUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MOBILE[infoId];
	if(isDefined(serverUrl) == false){
		console.log('empty url');
		return;
	}
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: serverUrl,
		data		: formData,
		success_fun	: successFunGetInfoList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



MOBILE_PAGE.mypage.info.onclickChangeEmailAgree = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickChangeEmailAgree');	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var actionVal = 1;
	if(eleData.val == 1){
		actionVal = 0;
	}
	
	MOBILE_PAGE.mypage.info.changeUserAgreeEmail(actionVal, thisEle);
};



//생일 입력 전송 폼
MOBILE_PAGE.mypage.info.onclickSetMemberBirthFormAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickSetMemberBirthFormAction');	
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	
	var targetFormId = $(thisEle).data('target');
	console.log('targetFormId', targetFormId);
	
	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}
	
	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData)== false){
		return false;
	}
	
	if(isDefined(formData.member_brith_year) == false){
		disk_alert('태어나신 년도를 선택해주세요.');
		return;
	}
	
	if(isDefined(formData.member_brith_month) == false){
		disk_alert('태어나신 년도의 월을 선택해주세요.');
		return;
	}
	if(isDefined(formData.member_brith_day) == false){
		disk_alert('태어나신 날짜(일)를 선택해주세요.');
		return;
	}
	
	
	
	console.log('formData:',formData);
	
	if(isDefined(formData) == false){
		disk_alert('전송정보가 올바르지 않습니다.');
		return;
	}
	var successUserBrithDataActionFun = function(data){
		console.log('successUserBrithDataActionFun', data);

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		if(isDefined(data.show_user_birth)){
			$targetForm.find('.s_box_style').prop('disabled', true);
			$(thisEle).remove();
		}
	};
    //return false;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.SET_BRITHDAY_INFO,
		data		: formData,
		success_fun	: successUserBrithDataActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	return false;
			
};

//이메일 수신 여부
MOBILE_PAGE.mypage.info.changeUserAgreeEmail = function(changeVal, targetEle){
	console.log('MOBILE_PAGE.mypage.info.changeUserAgreeEmail',changeVal );
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	if(isDefined(changeVal) == false || $.isNumeric(changeVal) == false){
		disk_alert('변경된 정보가 없습니다.');
		return;
	}
	var successChangeUserAgreeEmail = function(data){
		console.log('successChangeUserAgreeEmail');	
		
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		//user_agree_email
		//$('#myPageEditText_user_agree_email').data('loaded', changeVal);
		var setValues;
		var setStatus = 'off';
		var removeStatus = 'on';
		if(isDefined(data.user_agree_email)){
			setValues = data.user_agree_email;
		}
		if(setValues == 1){
			setStatus = 'on';
			removeStatus = 'off';
		}
		if(isDefined(targetEle)){
			$(targetEle).data({val :setValues, status : setStatus }).removeClass(removeStatus).addClass(setStatus);
		}
		
		
	};
	
	var formData = {
		user_agree_email: parseInt(changeVal),
		is_mobile		: 1
	};
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.CHANGE_EMAIL_STATUS,
		data		: formData,
		success_fun	: successChangeUserAgreeEmail,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//비밀번호 설정 & 변경 
MOBILE_PAGE.mypage.info.onclickSetOrChangePasswrod = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickSetOrChangePasswrod');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	var actionType = 'change';
	if(isDefined(eleData.action)){
		actionType = eleData.action;
	}
	if(actionType == 'change'){
		MOBILE_PAGE.mypage.info.openChangePasswrodPop(thisEle);
	}else{
		MOBILE_PAGE.mypage.info.openSetPasswrodPop(thisEle);
	}
	return;
};


//비밀번호 설정(set) 팝업
MOBILE_PAGE.mypage.info.openSetPasswrodPop = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.openSetPasswrodPop');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var eleData = $(thisEle).data();
	var infoId;
	if(isDefined(eleData.type)){
		infoId = eleData.type;
	}
	var memberEmail = DISK_MEMBER_FUN.getMyMemberData('member_email');
	if(isDefined(memberEmail) == false){
		GO_LOGIN();
		return;
	}
	
	var innerHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_set_passwd(memberEmail, infoId);
	//var innerHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_change_passwd(memberEmail, infoId);
	console.log('innerHtml', innerHtml);

	var loginModalOpenCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		
	}
	
	OPEN_PAGE_MODAL(innerHtml, loginModalOpenCallbackFun);
};


//비밀번호 변경 전송 폼
MOBILE_PAGE.mypage.info.onclickMobileSetUserNewPasswordFormAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickMobileSetUserNewPasswordFormAction');	
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var eleData = $(thisEle).data();;
	var targetFormId, infoType;
	if(isDefined(eleData.target)){
		targetFormId = eleData.target;
	}
	if(isDefined(eleData.type)){
		infoType = eleData.type;
	}
	
	console.log('targetFormId', targetFormId);
	
	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}
	
	var $targetForm = $(targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData)== false){
		return false;
	}
	if(isDefined(formData.user_email) == false){
		disk_alert('이메일 정보가 올바르지 않습니다.');
		return;
	}
	//remove invalid class
	$targetForm.find('input').removeClass('is-invalid');
		
	if(isDefined(formData.user_pass1) == false){
		disk_alert('원하시는 비밀번호를 입력해 주세요.');
		$targetForm.find('input[name=user_pass1]').addClass('is-invalid');
		return;
	}
	if(formData.user_pass1.length < 8){
		disk_alert('비밀번호는 최소 8자 이상입니다.');
		$targetForm.find('input[name=user_pass1]').addClass('is-invalid');
		return;
	}

	if(isDefined(formData.user_pass2) == false){
		disk_alert('비밀번호가 서로 일치하지 않습니다.');
		$targetForm.find('input[name=user_pass2]').addClass('is-invalid');
		return;
	}
	
	if(formData.user_pass1 != formData.user_pass2){
		disk_alert('비밀번호가 서로 일치하지 않습니다.');
		$targetForm.find('input[name=user_pass2]').addClass('is-invalid');
		return;
	}
	console.log('formData:',formData);
	
	var sendFormData = {
			user_email	: formData.user_email,
			user_password	: formData.user_pass1,
			device_type	: 1,
			is_mobile	: 1
	};
	console.log('sendFormData:',sendFormData);
	
	if(isDefined(sendFormData) == false){
		disk_alert('전송정보가 올바르지 않습니다.');
		return;
	}
	//return;
	
	var successUserPassDataActionFun = function(data){
		console.log('successUserPassDataActionFun', data);
		CLOSE_PAGE_MODAL();
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		//비밀번호 확인을 위해 다시 
		/*
		if(infoType == 'info_edit'){
			GO_MYPAGE(this);
		}
		*/
		//비밀번호 버튼 변경
		$('.mobile-user-edit-pass-dl').removeClass('set').addClass('change');
		$('.mobile-user-edit-pass-dl').find('.pass_txt').text('********');
		$('.mobile-user-edit-pass-dl').find('.user-pass-action-btn').text('변경').data('action','change');
		
		
	};
	
	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.SET_SNS_PASS_ACTION,
		data		: sendFormData,
		success_fun	: successUserPassDataActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	return false;
};


//비밀번호 변경(change) 팝업
MOBILE_PAGE.mypage.info.openChangePasswrodPop = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.openChangePasswrodPop');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var eleData = $(thisEle).data();
	var infoId;
	if(isDefined(eleData.type)){
		infoId = eleData.type;
	}
	var memberEmail = DISK_MEMBER_FUN.getMyMemberData('member_email');
	if(isDefined(memberEmail) == false){
		GO_LOGIN();
		return;
	}
	
	var innerHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_change_passwd(memberEmail, infoId);
	console.log('innerHtml', innerHtml);

	var loginModalOpenCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		
	}
	
	OPEN_PAGE_MODAL(innerHtml, loginModalOpenCallbackFun);
};



//비밀번호 변경 전송 폼
MOBILE_PAGE.mypage.info.onclickMobileChangeUserPasswordFormAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickMobileChangeUserPasswordFormAction');	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var eleData = $(thisEle).data();;
	var targetFormId, infoType;
	if(isDefined(eleData.target)){
		targetFormId = eleData.target;
	}
	if(isDefined(eleData.type)){
		infoType = eleData.type;
	}
	
	console.log('targetFormId', targetFormId);
	
	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}
	
	var $targetForm = $(targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData)== false){
		return false;
	}
	
	//remove invalid class
	$targetForm.find('input').removeClass('is-invalid');
	
	if(isDefined(formData.user_old_passwd) == false){
		disk_alert('현재 비밀번호를 입력해주세요.');
		$targetForm.find('input[name=user_old_passwd]').addClass('is-invalid');
		return;
	}
	
	if(isDefined(formData.user_new_passwd) == false){
		disk_alert('변경할 비밀번호를 입력해주세요.');
		return;
	}
	if(isDefined(formData.user_new_passwd2) == false){
		disk_alert('비밀번호 재확인를 입력해주세요.');
		$targetForm.find('input[name=user_new_passwd2]').addClass('is-invalid');
		return;
	}
	
	if(formData.user_new_passwd != formData.user_new_passwd2){
		disk_alert('변경하실 비밀번호가 서로 다릅니다.');
		$targetForm.find('input[name=user_new_passwd2]').addClass('is-invalid');
		return;
	}
	
	if(formData.user_old_passwd == formData.user_new_passwd){
		disk_alert('변경하실 비밀번호가 이전과 동일합니다.');
		$targetForm.find('input[name=user_new_passwd]').addClass('is-invalid');
		return;
	}
	
	var minStr = 4;
	if(formData.user_new_passwd.length < minStr){
		disk_alert('변경할 비밀번호를 '+minStr+'자 이상 입력해주세요.');
		$targetForm.find('input[name=user_new_passwd]').addClass('is-invalid');
		return;
	}
	console.log('formData:',formData);
	
	
	if(isDefined(formData) == false){
		disk_alert('전송정보가 올바르지 않습니다.');
		return;
	}
	var successUserPassDataActionFun = function(data){
		console.log('successUserPassDataActionFun', data);
		CLOSE_PAGE_MODAL();
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		//비밀번호 확인을 위해 다시 
		if(infoType == 'info_edit'){
			GO_MYPAGE(this);
		}
		
	};
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.PASSWORD_CHANGE_ACTION,
		data		: formData,
		success_fun	: successUserPassDataActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	return false;
};

//sns 연동  & 연동 해제
MOBILE_PAGE.mypage.info.onclickUserSnsConnectAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickUserSnsConnectAction');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var eleData = $(thisEle).data();;
	
	console.log('eleData', eleData);
	var actionType = null;
	if(isDefined(eleData.sns_action)){
		actionType = eleData.sns_action;
	}
	if(actionType == 'connect'){
		MOBILE_PAGE.mypage.info.actionUserSnsConnectAction(thisEle);
	}else if(actionType == 'disconnect'){
		MOBILE_PAGE.mypage.info.actionUserSnsDisConnectAction(thisEle);
	}
	return;
	
};


//sns 연동
MOBILE_PAGE.mypage.info.actionUserSnsConnectAction = function(thisEle){
	console.log('PAGE_MY.info.actionUserSnsConnectAction');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var DF = get_disk_config(true);
	var eleData = $(thisEle).data();
	var actionType = 'connect';
	if(isDefined(eleData.type) == false){
		eleData.type = 'mjoin';
	}
	if(isDefined(eleData.sns) == false){
		alert('SNS 로그인 타입을 선택해주세요.');
		return;
	}
	
	console.log('eleData', eleData);
	
	var retrunUrl = '/mobile.php/mobile/main/#!action=mypage&group=info&id=info_edit';
	console.log('retrunUrl', retrunUrl);
	if(isDefined(retrunUrl) == true){
		if (retrunUrl.indexOf('action=login') != -1 || retrunUrl.indexOf('action=service') != -1 || retrunUrl.indexOf('action=join') != -1) {
		  retrunUrl = '/mobile.php/mobile/main/';
		}
		$.cookie(DF.cookiePrefix+'mrt_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });
		//retrunUrl = encodeURIComponent(retrunUrl);
	}
	var snsType = eleData.sns;
	console.log('snsType::'+snsType);
	var openUrl = null;
	var snsOauthPopup = null;
	if(snsType == 'naver'){
		openUrl = '/mobile.php/login/sns_naver/1/?login_type='+actionType;
	}else if(snsType == 'kakao'){
		openUrl = '/mobile.php/login/sns_kakao/1/?login_type='+actionType;
	}else if(snsType == 'facebook'){
		openUrl = '/mobile.php/login/sns_facebook/1/?login_type='+actionType;
	}else if(snsType == 'google'){
		openUrl = '/mobile.php/login/sns_google/1/?login_type='+actionType;
	}else{
		
	}
	console.log('snsType', snsType);
	console.log('snsOauthPopup', openUrl);
	console.log('actionType', actionType);
	//alert(openUrl);
	if(openUrl){
		location.href = openUrl;
	}
	return;
};




//sns 연동 해제
MOBILE_PAGE.mypage.info.actionUserSnsDisConnectAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.actionUserSnsDisConnectAction');
	var eleData = $(thisEle).data();
	var actionType = 'connect';
	if(isDefined(eleData.sns) == false || isDefined(eleData.sns_key) == false){
		disk_alert('연동 해제할 SNS 정보를 선택해주세요.');
		return;
	}
	if(isDefined(eleData.idx) == false){
		disk_alert('선택한 데이타가 올바르지 않습니다.');
		return;
	}
	console.log('eleData', eleData);
	
	//컨펌
	if( confirm('선택하신 SNS 연동을 해제하시겠습니까?\n해제된 연동은 다시 연돌하기를 통해 재연결이 가능합니다.') != true){
		return;
	}
	
	var successSnsDisconnectFun = function(data){
		console.log('successSnsDisconnectFun');
		console.log(data);
		if(isDefined(data.inner_sns_html)){
			$('#mobile-user-info-sns-list').html(data.inner_sns_html);
		}
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
	};
	
	
	var formData = {
		is_mobile	: 1,
		idx			: eleData.idx,
		sns_channel	: eleData.sns_key
		
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.DISCONNECT_SNS_ACTION,
		data		: formData,
		success_fun	: successSnsDisconnectFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	
	return;
};

//회원 탈퇴 팝업
MOBILE_PAGE.mypage.info.openUserSecessionPop = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.openUserSecessionPop');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var eleData = $(thisEle).data();
	var infoId;
	if(isDefined(eleData.type)){
		infoId = eleData.type;
	}
	var memberEmail = DISK_MEMBER_FUN.getMyMemberData('member_email');
	if(isDefined(memberEmail) == false){
		GO_LOGIN();
		return;
	}
	
	var innerHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_secession(memberEmail, infoId);
	//console.log('innerHtml', innerHtml);
	var sModalOpenCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		
	}
	
	OPEN_PAGE_MODAL(innerHtml, sModalOpenCallbackFun);
};


//회원 탈퇴
MOBILE_PAGE.mypage.info.onclickMobileUserLeaveFormAction = function(thisEle){
	console.log('MOBILE_PAGE.mypage.info.onclickUserLeaveFormAction');
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var eleData = $(thisEle).data();;
	var targetFormId, infoType;
	if(isDefined(eleData.target)){
		targetFormId = eleData.target;
	}
	if(isDefined(eleData.type)){
		infoType = eleData.type;
	}
	
	console.log('targetFormId', targetFormId);
	
	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}
	
	var $targetForm = $(targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData)== false){
		return false;
	}
	
	if(isDefined(formData.user_passwd) == false){
		disk_alert('비밀번호를 입력해주세요.');
		return;
	}
	
	if(isDefined(formData.user_email) == false){
		disk_alert('로그인 이메일 정보가 올바르지 않습니다.');
		return;
	}
	
	console.log('formData:',formData);
	
	if(isDefined(formData) == false){
		disk_alert('전송정보가 올바르지 않습니다.');
		return;
	}
	
	if(confirm("보유하고 계신 포인트와 쿠폰이 모두 소멸되며,일정기간 재가입이 불가능하며  계정 복구가 불가능합니다.\n탈퇴를 진행하시겠습니까? ") == false){
		return;
	}
	
	var successUserLeaveActionFun = function(data){
		console.log('successUserLeaveActionFun', data);

		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		DISK_MEMBER_FUN.setMemberLogout(true);
		
		GO_MENU('home');
	};
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.LEAVE_ACTION,
		data		: formData,
		success_fun	: successUserLeaveActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	return false;
			
};