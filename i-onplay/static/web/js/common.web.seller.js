/*
*	판매자
*/

var WEB_COMMON_SELLER = {};

//판매자 정보 업데이트
WEB_COMMON_SELLER.setSellerInfo = function(slllerData){
	console.log('WEB_COMMON_SELLER.setSellerInfo');
	console.log('slllerData', slllerData);
	if(isDefined(slllerData) == false){
		return;
	}
	/*
	if($.isArray(slllerData) == false){
		return;
	}
	*/
	//console.log('slllerData', slllerData);

	if(isDefined(slllerData.seller_item_cash)){
		if($.isNumeric(slllerData.seller_item_cash)){
			$('.my-seller-item-cash').text(disk_number_format(slllerData.seller_item_cash));
		}
	}

	if(isDefined(slllerData.seller_cash)){
		if($.isNumeric(slllerData.seller_cash)){
			$('.my-seller-cash').text(disk_number_format(slllerData.seller_cash));
		}
	}

};


//판매자 클릭
WEB_COMMON_SELLER.onclickSellerNickname = function(thisEle){
	console.log('WEB_COMMON_SELLER.onclickSellerNickname');
	var eleData = $(thisEle).data();
	console.log($(thisEle).find('.click_v_area'));
	if($(thisEle).find('.click_v_area').data('loaded') != '1'){
		console.log('no loaded')
		$(thisEle).find('.click_v_area').html(TEMPLETE.COMMON.sellerShortInfoHtml(eleData)).data('loaded', '1');
	}
	if($(thisEle).hasClass('active') == false){
		$('.list-seller-info').removeClass('active');
	}
	$(thisEle).toggleClass('active');
};


//판매자 채널 개설 약관 동의
WEB_COMMON_SELLER.onclickBtnAgreeSTOS = function(){
	console.log('WEB_COMMON_SELLER.onclickBtnAgreeSTOS');
	/*
	if(utility.disk.checkIsRealName() != true){
		alert('먼저 본인 인증 후 등록이 가능합니다.');
		GO_REAL_NAME();
		return;
	}
	*/
	
	if($('#sellerAgreeFormCheckbos').is(":checked") != true){
		alert('약관과 채널 운영 정책을 확인하였고, 위반 시 발생하는 책임에 동의해야 다음으로 진행이 가능합니다.');
		$('#sellerAgreeFormCheckbos').focus();
		return;
	}
	

	$('.channel_agree_wrap').hide();
	//$('#seller-create-input-wrap').css({'display': 'block'}).addClass('animated');
	$('#seller-create-input-wrap').fadeIn('slow');
};



//판매자 닉네임 체크
WEB_COMMON_SELLER.checkSellerDuplicateNickname = function(){
	console.log('WEB_COMMON_SELLER.checkSellerDuplicateNicknam');
	/*
	if(utility.disk.checkIsRealName() != true){
		alert('먼저 본인 인증 후 등록이 가능합니다.');
		GO_REAL_NAME();
		return;
	}
	*/
	
	var sellerNick = $('#sellerForm-join_seller_nickname').val();
	console.log(sellerNick.length);

	if(isDefined(sellerNick) == false || sellerNick == ''){
		alert('판매자 채널이름(닉네임)을 입력해주세요.');
		$('#sellerForm-join_seller_nickname').focus();
		return;
	}

	if(sellerNick.length < 2 || sellerNick.length > 8){
		alert('채널이름을 2자 이상 8자 이사롤 입력해주세요.');
		$('#sellerForm-join_seller_nickname').focus();
		return;
	}

	console.log('sellerNick', sellerNick);

	var successFunGetSellerDupCheck = function(data){
		console.log('successFunGetMovieContentsList', data);
		if(isDefined(data.check)){
			if(data.check == 'OK'){

				alert('탁월한 선택입니다. 사용가능한 채널이름입니다.');
				$('#sellerForm-seller_nick_check').val(data.nickname);
				return;
			}
		}
		alert('사용하실 없는 채널 이름입니다. 다른 이름을 선택해주세요.');
	};
	var formData = {
		req_nickname	: sellerNick,
		type			: 'seller'
	};

	COMMON_ACTION.MEMBER.checkDuplicateNicknames(formData, successFunGetSellerDupCheck);
};

//판매자 폼데이타 전송
WEB_COMMON_SELLER.joinFormAction = function(formData, callbackFun){
	console.log('WEB_COMMON_SELLER.joinformBinding');
	console.log('formData:',formData);

	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}
	var successRegistActionFun = function(data){
		console.log('successRegistActionFun', data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}

		if (typeof callbackFun === "function"){
			callbackFun(data);
			return null;
		}
	};
    //return false;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.REGIST_ACTION,
		data		: formData,
		success_fun	: successRegistActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;

};


//판매자 폼데이타 전송
WEB_COMMON_SELLER.editFormAction = function(formData, callbackFun){
	console.log('WEB_COMMON_SELLER.editFormAction');
	console.log('formData:',formData);
	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}

	var successSellerEditActionFun = function(data){
		console.log('successSellerEditActionFun', data);
		if (typeof callbackFun === "function"){
			callbackFun(data);
			return null;
		}
	};

    //return false;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.EDIT_ACTION,
		data		: formData,
		success_fun	: successSellerEditActionFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;

};

//판매자 정보 가져오기 모달
WEB_COMMON_SELLER.openSellerInfoModal = function(thisEle){

	console.log('WEB_COMMON_SELLER.openSellerInfoModal');

	$('#disk-pc-common-modal').empty();

	var eleData = $(thisEle).data();
	var sellerIdx, sellerNick;
	if(isDefined(eleData.idx)){
		sellerIdx = eleData.idx;
	}
	if(isDefined(eleData.nick)){
		sellerNick = eleData.nick;
	}
	if(isDefined(sellerIdx) == false && isDefined(sellerNick) == false){
		alert('판매자 채널 정보를 확인할 수 없습니다.');
		return;
	}

	var successGetSellerInfoData = function(data){
		console.log('successGetSellerInfoData', data);
		var modalHtml;
		if(isDefined(data.seller_data)){
			modalHtml = TEMPLETE.WEB_PAGE_MODAL.getSellerInfoPopupHtml(data.seller_data);
		}
		if(isDefined(modalHtml)){
			var isModalCloseExisting = false;
			/*
			if($('.common-modal-blocker').length > 0){
				isModalCloseExisting = true;
			}
			*/
			$('#disk-pc-common-modal').html(modalHtml).modal({
				closeExisting: isModalCloseExisting,
				blockerClass	: "common-modal-blocker"
			});
		}
	};

	//successGetSellerInfoData(eleData);

	//return false;

	var formData =
	{
		idx		: sellerIdx,
		nick	: sellerNick
	}
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHANNEL.SELLER_INFO,
		data		: formData,
		success_fun	: successGetSellerInfoData,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};

//채널로 이동
WEB_COMMON_SELLER.onclickGoSellerChannel = function(thisEle){
	console.log('WEB_COMMON_SELLER.onclickGoSellerChannel');
	var eleData = $(thisEle).data();


	var channelLink;
	if(isDefined(eleData.idx) == true){
		channelLink = '/channel/seller/'+eleData.idx;
	}else if(isDefined(eleData.nick) == true){
		channelLink = '/channel/seller/'+encodeURIComponent(eleData.nick);
	}

	if(isDefined(channelLink)){
		location.href = channelLink;
	}
	return;
};

//채널 구독
WEB_COMMON_SELLER.onclickActionSubscribeSellerChannel = function(thisEle){
	console.log('WEB_COMMON_SELLER.onclickActionSubscribeSellerChannel');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}

	var eleData = $(thisEle).data();
	if(isDefined(eleData.idx) == false){
		alert('구독 채널이 선택되지 않았습니다.');
		return;
	}

	var addSubscribeSuccessFun = function(data){
		console.log('addSubscribeSuccessFun', data);

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
	};

	COMMON_ACTION.SUBSCRIBE.actionSubscribe(eleData.idx, null, addSubscribeSuccessFun);
};




//판매자 가입 신청
/*
WEB_COMMON_SELLER.joinformBinding = function(){
	console.log('WEB_COMMON_SELLER.joinformBinding');


	if($("#myChannelSellerRegistForm").length > 0){
		$("#myChannelSellerRegistForm").unbind( "submit");
		$("#myChannelSellerRegistForm").submit(function(event){
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



			if(isDefined(formData.user_pass)== false){
				alert('패스워드를 입력해 주세요.');
				$('#join_user_pass').removeClass('is-valid').addClass('is-invalid').focus();
				return false;
			}
			$('#join_user_pass').removeClass('is-invalid').addClass('is-valid');

			if(isDefined(formData.user_pass2)== false || formData.user_pass != formData.user_pass2){
				alert('패스워드가 서로 일치하지 않습니다.');
				$('#join_user_pass2').removeClass('is-valid').addClass('is-invalid').focus();
				return;
			}
			$('#join_user_pass2').removeClass('is-invalid').addClass('is-valid');

			//이메일 패턴 검사
			//var special_pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
			var special_pattern = /[`~!+#$%^&*|\\\'\";:\/?\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/gi;
	        if( isDefined(formData.join_user_email) == false  || special_pattern.test(formData.join_user_email) == true ){
	            alert('이메일 형식이 올바르지 않습니다.');
				return false;
	        }

	        console.log('formData:',formData);

	        //return false;
			var ajaxData =
			{
				url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.JOIN,
				data		: formData,
				success_fun	: PAGE_LOGIN.SUCCESS_LOGIN,
				error_fun	: null
			};
			DISK_PROTOCOL.AJAX(ajaxData);

			return false;

		});

	}

};
*/
