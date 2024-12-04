
MOBILE_COMMON.EVENT = {};

//닉네임 중복 체크
MOBILE_COMMON.EVENT.checkMemberDuplicateNickname = function(thisEle){
	console.log('MOBILE_COMMON.EVENT.checkMemberDuplicateNickname');
	
	var eleData = $(thisEle).data();
	console.log(eleData);
	
	//var targetEleId = $(thisEle).data('target');
	//var checkEleId = $(thisEle).data('check');
	
	if(isDefined(eleData.target) == false){
		console.log('empty targetEleId');
		return;
	}
	var $targetEle = $('#'+eleData.target);
	var memberNick = $targetEle.val();
	console.log(memberNick.length);
	
	var inputFocusFun = function(){
		$targetEle.focus();
		return;
	};
	
	if(isDefined(memberNick) == false || memberNick == ''){
		disk_alert('원하시는 닉네임을 입력해주세요.', inputFocusFun);
		$targetEle.focus();
		return;
	}
	
	if(memberNick.length < 2 || memberNick.length > 8){
		disk_alert('닉네임은 2자 이상 8자까지 입력이 가능합니다.', inputFocusFun);
		$targetEle.focus();
		return;
	}
	
	console.log('memberNick', memberNick);
	
	var successFunGetMemberDupCheck = function(data){
		console.log('successFunGetMovieContentsList', data);
		if(isDefined(data.check)){
			if(data.check == 'OK'){
				//disk_alert('탁월한 선택입니다. 사용가능한 닉네임입니다.');
				var show_msg = '탁월한 선택입니다. 사용가능한 닉네임입니다.';
				$.ambiance({message: show_msg, type: "alert-info"});
				$('#'+eleData.checker).val(data.nickname);
				
				$(thisEle).removeClass('active');
				return;
			}
		}
		disk_alert('사용하실 없는 닉네임입니다. 다른 닉네임을 선택해주세요.');
	};
	var formData = {
		req_nickname	: memberNick,
		type			: 'member'
	};
	
	COMMON_ACTION.MEMBER.checkDuplicateNicknames(formData, successFunGetMemberDupCheck);
};

//닉네임 설정 폼데이타 전송
MOBILE_COMMON.EVENT.onclickSetMemberNicknameFormAction = function(targetFormId){
	console.log('MOBILE_COMMON.EVENT.onclickSetMemberNicknameFormAction');	
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
	
	var inputFocusFun = function(){
		$targetForm.find('input[name=member_nickname]').focus();
		return;
	};
	
	if(isDefined(formData.member_nickname) == false){
		disk_alert('원하시는 닉네임을 입력해주세요.', inputFocusFun);
		return;
	}
	
	if(formData.member_nickname != formData.checkedNickname){
		disk_alert('사용하실 닉네임에 대하여 중복채크를 해주세요.');
		$targetForm.find('.btn_check').addClass('active');
		return;
	}
	
	
	if(isDefined(formData.agree_info) == false){
		disk_alert('닉네임 개인정보 수집에 동의해 주세요');
		return;
	}
	console.log('formData:',formData);
	
	if(isDefined(formData) == false){
		disk_alert('전송정보가 올바르지 않습니다.');
		return;
	}
	
	
	var successMemberNicknameRegistActionFun = function(data){
		console.log('successMemberNicknameRegistActionFun', data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true);
		}
		
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		
		if(isDefined(data.member_nickname)){
			$('.mypage-member-nickname-span').text(data.member_nickname);
		}
		
		$.modal.close();
		
	};
    //return false;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.INFO.SET_NICKNAME_ACTION,
		data		: formData,
		success_fun	: successMemberNicknameRegistActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	return false;
			
};