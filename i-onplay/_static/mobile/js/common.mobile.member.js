/*
* member
*/




//로그인 mypage 회원 정보
/*
DISK_member.prototype.getMobileMypageMemberLoginedInfoHtml = function() {

	var isChildBlock = '';
	if(this.is_child_block == 1){
		isChildBlock = 'on';
	}

	var returnHtml = '';
		returnHtml += '<div class="my_info_wrap">';
		returnHtml += '	<p class="txt"><span class="level vvip"><span class="ico"></span>FRIEND, </span><span class="name">'+this.show_member_nickname+'</span> 님</p>';
		returnHtml += '	<p class="e_adress">'+this.show_member_email+'</p>';
		returnHtml += '	<span class="btn_info">회원정보</span>';
		returnHtml += '</div>';
		returnHtml += '<div class="my_news_area">';
		returnHtml += '	<div class="n_info">';
		returnHtml += '		<span class="c_btn '+isChildBlock+'"></span>';
		returnHtml += '		<span class="txt">자녀안심보호</span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="n_info">';
		returnHtml += '		<span class="num">153</span>';
		returnHtml += '		<span class="txt">새소식 알림</span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="n_info b_none">';
		returnHtml += '		<span class="num">42</span>';
		returnHtml += '		<span class="txt">쪽지함</span>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="s_info_wrap active">';
		returnHtml += '	<span class="btn_info_view" onclick="MOBILE_COMMON_MEMBER.onclickShowMoreMemberPointInfo(this);">포인트 정보 보기 <span class="arrow"></span></span>';
		returnHtml += '	<div class="my_point_info">';
		returnHtml += '		<dl class="m_info">';
		returnHtml += '			<dd class="t_red"><span class="num" >'+disk_number_format(this.total_cash)+'</span>P</dd>';
		returnHtml += '			<dt>포인트</dt>';
		returnHtml += '		</dl>';
		returnHtml += '		<dl class="m_info">';
		returnHtml += '			<dd class="t_red"><span class="num">'+disk_number_format(this.remain_subscription_day)+'</span>일</dd>';
		returnHtml += '			<dt>월정액</dt>';
		returnHtml += '		</dl>';
		returnHtml += '		<dl class="m_info b_none">';
		returnHtml += '			<dd><span class="num">'+disk_number_format(this.cartoon_point)+'</span>w</dd>';
		returnHtml += '			<dt>웹툰 포인트</dt>';
		returnHtml += '		</dl>';
		returnHtml += '		<dl class="m_info">';
		returnHtml += '			<dd><span class="num">'+disk_number_format(this.total_bonus)+'</span>B</dd>';
		returnHtml += '			<dt>보너스 포인트</dt>';
		returnHtml += '		</dl>';
		returnHtml += '		<dl class="m_info">';
		returnHtml += '			<dd><span class="num">'+disk_number_format(this.member_mileage)+'</span>M</dd>';
		returnHtml += '			<dt>마일리지</dt>';
		returnHtml += '		</dl>';
		returnHtml += '		<dl class="m_info b_none">';
		returnHtml += '			<dd><span class="num">'+disk_number_format(this.member_down_coupon)+'</span>장</dd>';
		returnHtml += '			<dt>쿠폰</dt>';
		returnHtml += '		</dl>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="cherge_btn_wrap">';
		returnHtml += '	<span class="c_btn point" data-type="point" data-loc="service" onclick="GO_CHARGE(this);">포인트 충전</span>';
		returnHtml += '	<span class="c_btn flat" data-type="point" data-loc="flat" onclick="GO_CHARGE(this);">정액제 가입</span>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};
*/


var MOBILE_COMMON_MEMBER = {};


//자녀안심 설정
MOBILE_COMMON_MEMBER.setChildBlock = function(diskMember){
	console.log('MOBILE_COMMON_MEMBER.setChildBlock');
	var isChildBlock = false;
	var blockStatus = 0;
	if(isDefined(diskMember) == false){
		isChildBlock = false;
	}else{
		console.log('diskMember', diskMember);
		blockStatus = diskMember.is_child_block;
		if(diskMember.is_child_block == 1){
			isChildBlock = true;
		}
	}

	var removeStatus = 'on';
	var blockStatusMsg = 'off';
 	var blockShowStatusMsg = 'Off';
	if(isChildBlock == true){
		blockStatusMsg = 'on';
		removeStatus = 'off';
		blockStatus = 1;
	 	blockShowStatusMsg = 'On';
	}

	var $targetEle = $('.mobile-member-child-block-area');
	if($targetEle.length < 1){
		return;
	}
	console.log('blockStatusMsg', blockStatusMsg);
	console.log('blockStatus', blockStatus);
	console.log('blockShowStatusMsg', blockShowStatusMsg);
	console.log('removeStatus', removeStatus);
	$targetEle.data({status: blockStatusMsg, val : blockStatus, name : blockShowStatusMsg });
	$targetEle.find('.child-block-status').removeClass(removeStatus).addClass(blockStatusMsg);
	$targetEle.find('.child-block-status-txt').text(blockShowStatusMsg);
	
	if(blockStatusMsg == 'on'){
		MOBILE_COMMON_MEMBER.setChildBlockOn();
	}else{
		MOBILE_COMMON_MEMBER.setChildBlockOff();
	}
};



//자녀안신 On
MOBILE_COMMON_MEMBER.setChildBlockOn = function(){
	console.log('MOBILE_COMMON_MEMBER.setChildBlockOn');	
	
	$('.cate-21100').addClass('child-block');
	//$('[data-adult=1]').addClass('child-block');
	//conents list
	$('[data-adult=1]').closest('.mobile-contents-list').addClass('child-block');
	$('[data-is_adult=1]').closest('.mobile-contents-list').addClass('child-block');
	$('[data-cate=21100]').addClass('child-block');
	
	
};

//자녀안심 Off
MOBILE_COMMON_MEMBER.setChildBlockOff = function(){
	
	$('.cate-21100').removeClass('child-block');
	
	$('[data-adult=1]').closest('.mobile-contents-list').removeClass('child-block');
	$('[data-is_adult=1]').closest('.mobile-contents-list').removeClass('child-block');
	$('[data-cate=21100]').removeClass('child-block');
	
	MOBILE_COMMON_MEMBER.setLoginedMemberToptoonBanner();
};

//콘텐츠 구매 로그 
MOBILE_COMMON_MEMBER.setLoginedMemberContentsLog = function(diskMember){
	console.log('MOBILE_COMMON_MEMBER.setLoginedMemberContentsLog');
	console.log(diskMember);
	if(isDefined(diskMember) == false){
		return;
	}
	
	var callbackMemberContentsLogData = function(data){
		console.log('callbackMemberContentsLogData');
		console.log(data);
		
		
	}
	DISK_MEMBER_FUN.setMemberBuyContentsList(diskMember.member_idx, 1, callbackMemberContentsLogData);
};


//자녀안심 설정
MOBILE_COMMON_MEMBER.setLoginedMemberChildBlock = function(diskMember){
	console.log('MOBILE_COMMON_MEMBER.setLoginedMemberChildBlock');
	console.log(diskMember);

	//광고 도메인 경우
	if(isDefined(diskMember) == false){
		return;
	}

	if(diskMember.is_child_block == 1){
		MOBILE_COMMON_MEMBER.setChildBlockOn();
	}else{
		MOBILE_COMMON_MEMBER.setChildBlockOff();
		
	}
};

//탑툰 베너
MOBILE_COMMON_MEMBER.setLoginedMemberToptoonBanner = function(){
	console.log('MOBILE_COMMON_MEMBER.setLoginedMemberToptoonBanner');
	var hostName = location.hostname;
	if(hostName != 'm.onplay.co.kr'){
		return;
	}

	
	$('.mobile-topton-banner').addClass('logined');
	//console.log(MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerHtml());
	
	//slick banner add
	/*
	var $goodContetsSlick = $('#mobile_main_good_contents_slick');
	if($goodContetsSlick.length > 0){
		if($goodContetsSlick[0].hasOwnProperty('slick') == true){
			console.log('aaaaa');
			if($goodContetsSlick.find('.mobile-topton-banner').length < 1){
				$goodContetsSlick.slick('slickAdd',MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerHtml());
			}
			$goodContetsSlick.slick('setPosition');
			
		}else{
			if($goodContetsSlick.find('.mobile-topton-banner').length < 1){
				console.log('bbbbbbbbbbbbb');
				$goodContetsSlick.append(MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerHtml());
			}
		}
	}
	*/
	/*
	var $mainCennterBanner = $('.mobile_main_banner_slick');
	if($mainCennterBanner.find('.disk_slick_item').length > 1){
		var slickItemHtml =MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerSmallHtml();
		if($mainCennterBanner[0].hasOwnProperty('slick') == true){
			console.log('aaaaa');
			if($mainCennterBanner.find('.mobile-topton-banner-center').length < 1){
				$mainCennterBanner.slick('slickAdd',slickItemHtml);
			}
			$mainCennterBanner.slick('setPosition');
			
		}else{
			if($mainCennterBanner.find('.mobile-topton-banner-center').length < 1){
				console.log('bbbbbbbbbbbbb');
				$mainCennterBanner.append(slickItemHtml);
			}
		}
	}
	*/
			
}


//로그인 정보 혹은 로그인 폼 출력
MOBILE_COMMON_MEMBER.showMemberInfo = function(diskMember, isMobile, isLogin){
	console.log('MOBILE_COMMON_MEMBER.showMemberInfo', isLogin);

	console.log('diskMember', diskMember);
	if(isDefined(diskMember)){
		
		//set child block
		//MOBILE_COMMON_MEMBER.setChildBlock(diskMember);

		//코멘트 로그인 덮개 열림
		$('.disk-need-login-contents').remove();
		
		//view 덮개 열기
		$('.mobile_view_wrap').find('.login_check_area').hide();

		//처음 로그인 경우
		if(isLogin == 'childBlock'){
			MOBILE_COMMON_MEMBER.setChildBlock(diskMember);
		}else if(isLogin == true){
			//만약 서비스가 오픈중이면
			if($('.service-container').hasClass('show')){
				MOBILE_PAGE.service.showLoginData(diskMember);
			}

			//만약 마이온플이 오픈중이면
			if($('.mypage-container').hasClass('show')){
				MOBILE_PAGE.mypage.showLoginData(diskMember);
			}
			
			//성인웹툰
			$('#toptoon-member-total-cash').text(disk_number_format(diskMember.total_cash));
			$('#toptoon-member-cartoon-cash').text(disk_number_format(diskMember.cartoon_point));
			//회원 성인 블록
			MOBILE_COMMON_MEMBER.setLoginedMemberChildBlock(diskMember);
			
			//콘텐츠 로그 가져오기
			MOBILE_COMMON_MEMBER.setLoginedMemberContentsLog(diskMember);
		}

		//user login divs
		$('.user-login-on').show();
		$('.user-login-off').hide();


	}else{
		$('.service-login-info.ok').removeClass('active');
		$('.service-login-info.none').addClass('active');

		$('.user-login-off').show();
		$('.user-login-on').hide();

	}
	return;
};

//회원 포인트 정보 더보기
MOBILE_COMMON_MEMBER.onclickShowMoreMemberPointInfo = function(thisEle){
	console.log('MOBILE_COMMON_MEMBER.onclickShowMoreMemberPointInfo');
	if(isDefined(thisEle) == false){
		return;
	}
	$(thisEle).parent('.s_info_wrap').toggleClass('active');
};



//로그아웃 하기
MOBILE_COMMON_MEMBER.onclickLogOutAction = function(){
	console.log('MOBILE_COMMON_MEMBER.logOutAction');
	var sendData = {
		type		: 'JSON',
		is_mobile	: 0
	}
	var logOutCalback = function(data){
		location.href = "/mobile";
		return;
	};
	var successMemberLogOut = function(data){

		//delete member storage
		//utility.disk.delStorageData('member_data');
		DISK_MEMBER_FUN.setMemberLogout(true);
		disk_alert('안전하게 로그아웃하였습니다.', logOutCalback);
		return;
	};

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.LOGIN.LOGOUT_ACTION,
		data		: sendData,
		success_fun	: successMemberLogOut,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};

//멤버 찾기 flashsession 만들기


//플레세션 데이터셋팅
MOBILE_COMMON_MEMBER.setFlashSessionData = function(){

    var sendData = {
        is_mobile : 1 ,
        keepFlash : 1 ,
    }

    var successSetFlashSession = function(res){
        if(res.member_check != "no"){
            GO_BACK();
            return;
        }
        if(sendData.is_mobile == 1){
           // $("#hd_check_data").val(res.check_flash_data);
        }
    }

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.MOBILE.SET_FLASH_DATA,
		data		: sendData,
		success_fun	: successSetFlashSession,
		error_fun	: null
	};

    DISK_PROTOCOL.AJAX(ajaxData);
    return false;
};

