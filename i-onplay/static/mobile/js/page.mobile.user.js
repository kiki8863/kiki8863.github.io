/*
* mobile page : mypage
*/
MOBILE_PAGE.user = {};
MOBILE_PAGE.user.DATA = {
	
};

MOBILE_PAGE.user.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.user.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	

	MOBILE_PAGE.user.init(showContainerInfo, hashPrams);
}

MOBILE_PAGE.find_id = {};
MOBILE_PAGE.find_id.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.user.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.find_id.defaultBinding();
	MOBILE_PAGE.find_id.init(showContainerInfo, hashPrams);
}



MOBILE_PAGE.find_id.defaultBinding = function(){
	console.log('MOBILE_PAGE.mypage.defaultBinding');	
};


MOBILE_PAGE.find_id.init = function(info, params){
	console.log('MOBILE_PAGE.find_id.init');	
}



MOBILE_PAGE.find_pass = {};
MOBILE_PAGE.find_pass.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.find_pass.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.find_pass.defaultBinding();
	MOBILE_PAGE.find_pass.init(showContainerInfo, hashPrams);
}



MOBILE_PAGE.find_pass.defaultBinding = function(){
	console.log('MOBILE_PAGE.find_pass.defaultBinding');	
};


MOBILE_PAGE.find_pass.init = function(info, params){
	console.log('MOBILE_PAGE.find_pass.init');	
}



MOBILE_COMMON_USER = {};

//비밀번호 찾기 휴대폰인증 모달
/*
MOBILE_COMMON_USER.openMobileMemberPassPhoneAuthForm = function(){
	console.log('MOBILE_COMMON_FUN.openMobileMemberPassPhoneAuthForm');

	var $targetModal = $('#disk-modal-mobile-common');

	var isModalCloseExisting = false;
    var modalHtml = MOBILE_TEMPLETE.MODAL.memberFindPassPhoneAuthHtml();
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal"
		});
	}
    return;
};
*/


//find_id
MOBILE_COMMON_USER.onclickFindID = function(targetForm){
	console.log('MOBILE_COMMON_USER.onclickFindID');
		
	var $targetForm = $("#"+targetForm);
	if($targetForm.length < 1){
		return;
	}
	
    var sendData = $targetForm.serializeArray();
    console.log('formValues:', sendData);

    var formData = changeFormArrToObject(sendData);
		console.log('formData:',formData);

    /*if(isDefined(formData.hd_check_data)== false){
        alert("잘못된 경로로 접속하였습니다.");
        return;
    }*/
    formData.hd_check_data = encodeURIComponent(formData.hd_check_data);
    if(isDefined(formData.fa_name) == false){
        disk_alert("이름을 적지 않으셨습니다.");
        return;
    }

    if(!(isDefined(formData.fa_birthday) && $.isNumeric(formData.fa_birthday)) ){
        disk_alert("생년 월일을 적지 않으셨거나 \n 잘못적으셨습니다.");
        return;
    }

    var successFindIDResult = function(data){
		console.log('successFindIDResult');
		console.log(data);
		
		if(isDefined(data.cnt)){
			if(data.cnt < 1){
				disk_alert('가입하신 회원 정보가 없습니다.<br>회원가입후 이용해 주시길 바랍니다.');
				return;
			}
			if(isDefined(data.rt_html)){
				OPEN_PAGE_MODAL(data.rt_html, null);
			}
		}
		
		return;
		var findidResultFormHtml =  MOBILE_TEMPLETE.CONNTAINER.findidempty();
  		
		
		return;
         if(res.member_check != "no"){
            GO_BACK();
            return;
        }
        if(res.cnt > 0){
            console.log(res.user_return_data)
            //var list = res.user_list_data;
            var list = res.user_return_data
            var findidResultFormHtml = MOBILE_TEMPLETE.CONNTAINER.findidresult(list,res.cnt);


            OPEN_PAGE_MODAL(findidResultFormHtml, null);
        }else{
            var findidResultFormHtml =  MOBILE_TEMPLETE.CONNTAINER.findidempty();
            OPEN_PAGE_MODAL(findidResultFormHtml, null);
        }
    }

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.MOBILE.FIND_ACCOUNT_RNAME,
		data		: formData,
		success_fun	: successFindIDResult,
		isSpinner	: true,
		error_fun	: null
	};

    DISK_PROTOCOL.AJAX(ajaxData);
    return false;
};

//메일로 비번 찾기
MOBILE_COMMON_USER.onclickRequestMyPasswordCodeWithMail = function(thisEle){
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
		formData.is_mobile = 1;
	}
	$targetEle.addClass('disabled').attr('disabled', true);
	
	var okAlertFun = function(){
		GO_HOME();
		return;
	};
	
	var successFunRequestMail = function(data){
		console.log('successFunRequestMail');
		console.log(data);
		if(isDefined(data.access_token)){
			var showMsg = "메일로 비밀번호 재설정 요청이 발송되었습니다.<br>스팸 메일함을 확인하시고 만일 받지 못하셨으면 10분뒤에 재요청 해주시길 바랍니다.";
			disk_alert(showMsg, okAlertFun);
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

//find_pass
MOBILE_COMMON_USER.onclickFindPassAuth = function(){

    var sendData = $("#mobileFindPASSForm").serializeArray();
    console.log('formValues:', sendData);

    var formData = changeFormArrToObject(sendData);
		console.log('formData:',formData);

    if(!validateEmail(formData.fp_email)){
        alert("이메일 형식이 아닙니다.");
        return;
    }
    /*if(isDefined(formData.hd_check_data)== false){
        alert("잘못된 경로로 접속하였습니다.");
        return;
    }*/

    if(isDefined(formData.fp_email) == false){
        alert("이름을 적지 않으셨습니다.");
        return;
    }

    var successFindPASSResult = function(res){
        
        if(isDefined(res.user_email)){
        	var findpassResultFormHtml =  MOBILE_TEMPLETE.MODAL.findResultUserEmailId(res.user_email, res.email_key);
        }else{
        	var findpassResultFormHtml =  MOBILE_TEMPLETE.MODAL.emptyUserEmailId();	
        }
        OPEN_PAGE_MODAL(findpassResultFormHtml, null);
    }

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.MOBILE.FIND_PASSWORD,
		data		: formData,
		success_fun	: successFindPASSResult,
		error_fun	: null,
		isSpinner	: true,
	};

    DISK_PROTOCOL.AJAX(ajaxData);
    return false;
};


//find_pass_result
MOBILE_COMMON_USER.onclickFindPassReuslt = function(){

    var sendData = $("#mobileFindPASSReulstForm").serializeArray();
    console.log('onclickFindPassReuslt');
    console.log('formValues:', sendData);

    var formData = changeFormArrToObject(sendData);
		console.log('formData:',formData);

    if(!validateEmail(formData.hd_user_id)){
        alert("이메일 형식이 아닙니다.");
        return;
    }

    var successFindPASSResult = function(res){

        if(res.cnt > 0){
            MOBILE_COMMON_FUN.openMobileMemberPassPhoneAuthForm();
        }else{
            var findpassResultFormHtml =  MOBILE_TEMPLETE.CONNTAINER.findpassEmpty();
            OPEN_PAGE_MODAL(findpassResultFormHtml, null);
        }
    }
    /*
    	var ajaxData =
    	{
    		url			: DISK_PROTOCOL.ONPLAY_URL.USER.MOBILE.FIND_PASSWORD,
    		data		: formData,
    		success_fun	: successFindPASSResult,
    		error_fun	: null
    	};

        DISK_PROTOCOL.AJAX(ajaxData);
    */
    return false;
};




MOBILE_COMMON_USER.setNewPassword = function(targetForm){
    
	

	var $targetForm = $('#'+targetForm);
	if($targetForm.length < 1){
		return;
	}
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return;
	}
	if(isDefined(formData.user_email) == false){
		//disk_alert("이메일 정보를 확인할 수 없습니다.");
		alert('이메일 정보를 확인할 수 없습니다.');
		return;
	}

    if(!isDefined(formData.user_pass_1)){
		alert("변경 하실 비밀번호를 적지 않으셨습니다.");
        return;
	}

    if(formData.user_pass_1 != formData.user_pass_2){
        alert("비밀번호가 서로 다릅니다.");
        return;
    }
	var successAjaxPwUpdateData = function(res){
	    if(res.is_ok == "ok"){
	       alert("비밀번호가 재설정 되었습니다.");
           location.href = "/mobile.php/mobile/main/";
           return;
	    }else{
			alert(" 비밀번호를 변경하는데 실패 했습니다. 고객센터에 문의하세요");
			return;
		}
	};
        
	var sendData = {
		user	  : formData.user_email,
        pass 	: formData.user_pass_1,
        passchk : formData.user_pass_2,
        is_mobile: 1,
        auth_key: formData.auth_key,
        
	};
	

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.UPDATE_PASSWORD,
		data		: sendData,
		success_fun	: successAjaxPwUpdateData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: true
	};

	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};

//카카오 성인 인증

MOBILE_COMMON_USER.AUTH_KAKAO = {};

//카카오 페이 실명인증 완료
MOBILE_COMMON_USER.AUTH_KAKAO.checkAuthComplete = function(formEle){
	console.log('MOBILE_COMMON_USER.AUTH_KAKAO.checkAuthComplete');
	
	var $targetFrom = $('#'+formEle);
	if($targetFrom.length < 1){
		disk_alert("인증 정보가 올바르지 않습니다.");
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
	
	
	var formData = {authId : formData.authData, userKey : formData.authKey, reqIdx : formData.reqIdx, is_mobile : 1};
	var successGetKakaoCertData = function(data){
		console.log('successGetKakaoCertData');
		console.log(data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
		}
		
		//alert(data.return_url);
		//return;
		if(isDefined(data.return_url)){
			location.href = data.return_url;
			return;
		}
		//self close
		if(isDefined(data.check_state)){
			if(data.check_state == 9){
				location.href = '/mobile.php';
				return;
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
