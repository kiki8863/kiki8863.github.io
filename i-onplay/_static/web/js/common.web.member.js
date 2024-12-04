/*
* member
*/


//로그인 탑 right 회원 정보
DISK_member.prototype.getPcTopMemberLoginedInfoHtml = function() {

	var returnHtml = '';

	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};


//로그인 탑 right 회원 정보 - old
DISK_member.prototype.getPcTopMemberLoginedInfoHtmlOld = function() {

	var returnHtml = '';
		returnHtml += '<p class="txt">';
		returnHtml += '	<span class="ico"></span><span class="name common-member-nickname-span">'+this.show_member_nickname+'</span> 님 환영합니다.';
		returnHtml += '</p>';
		returnHtml += '<div class="alim_area disk-member-notice-area">';
		returnHtml += '	<div class="alim disk-member-new-notice-wrap disk-member-new-news-wrap" data-load="" data-type="news" onclick="WEB_COMMON_MEMBER.onclickOpenMemberNotice(this);">';
		returnHtml += '		<span class="ico"></span>';
		returnHtml += '		<span class="num"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="memo disk-member-new-notice-wrap disk-member-new-memo-wrap" data-load="" data-type="memo" onclick="WEB_COMMON_MEMBER.onclickOpenMemberNotice(this);">';
		returnHtml += '		<span class="ico"></span>';
		returnHtml += '		<span class="num"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="news_popup" id="disk-member-new-notice-popup-wrap">';

		//returnHtml += '		<span class="bg_arrow"></span>';
		//returnHtml += '		<div class="top">';
		//returnHtml += '			<p class="tit">새소식</p>';
		//returnHtml += '			<span class="close"></span>';
		//returnHtml += '		</div>';
		//returnHtml += '		<div class="news_list_wrap">';
		//returnHtml += '			<div class="n_section">';
		//returnHtml += '				<p class="n_content">가나다라마바님의 채널에 새로운 콘텐츠가 업로드..</p>';
		//returnHtml += '				<span class="time">2시간전</span>';
		//returnHtml += '			</div>';
		//returnHtml += '			<div class="n_section">';
		//returnHtml += '				<p class="n_content">1:1 문의에 새로운 답변이 작성되었습니다. 확인해보세요</p>';
		//returnHtml += '				<span class="time">2시간전</span>';
		//returnHtml += '			</div>';
		//returnHtml += '		</div>';
		//returnHtml += '		<div class="btm">';
		//returnHtml += '			<span class="btn_all">전체보기<span class="arrow"></span></span>';
		//returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="point_info_wrap">';
		returnHtml += '					<div class="info_area">';
		returnHtml += '						<div class="type flat">';
		returnHtml += '							<dl class="t_info">';
		returnHtml += '								<dt>정액제</dt>';
		returnHtml += '								<dd><span class="num">'+this.remain_subscription_day+'</span>일</dd>';
		returnHtml += '							</dl>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="type point">';
		returnHtml += '							<dl class="t_info">';
		returnHtml += '								<dt>총 포인트</dt>';
		returnHtml += '								<dd><span class="num">'+disk_number_format(this.total_cash + this.total_bonus)+'</span>P</dd>';
		returnHtml += '							</dl>';
		returnHtml += '							<span class="arrow"></span>';
		returnHtml += '							<div class="more_info_area">';
		returnHtml += '								<ul class="m_info_list">';
		returnHtml += '									<li>';
		returnHtml += '										<dl class="m_info">';
		returnHtml += '											<dt>포인트</dt>';
		returnHtml += '											<dd><span class="num">'+disk_number_format(this.total_cash)+'</span>P</dd>';
		returnHtml += '										</dl>';
		returnHtml += '									</li>';
		returnHtml += '									<li>';
		returnHtml += '										<dl class="m_info">';
		returnHtml += '											<dt>보너스 포인트</dt>';
		returnHtml += '											<dd><span class="num">'+disk_number_format(this.total_bonus)+'</span>B</dd>';
		returnHtml += '										</dl>';
		returnHtml += '									</li>';
		returnHtml += '									<li>';
		returnHtml += '										<dl class="m_info">';
		returnHtml += '											<dt>마일리지</dt>';
		returnHtml += '											<dd><span class="num">'+disk_number_format(this.member_mileage)+'</span>M</dd>';
		returnHtml += '										</dl>';
		returnHtml += '									</li>';
		returnHtml += '									<li>';
		returnHtml += '										<dl class="m_info">';
		returnHtml += '											<dt>쿠폰</dt>';
		returnHtml += '											<dd><span class="num">50</span>장</dd>';
		returnHtml += '										</dl>';
		returnHtml += '									</li>';
		returnHtml += '								</ul>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';


	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};


var WEB_COMMON_MEMBER = {};
//로그아웃 하기
WEB_COMMON_MEMBER.logOutAction = function(){
	console.log('WEB_COMMON_MEMBER.logOutAction');
	var sendData = {
		type		: 'JSON',
		is_mobile	: 0
	}
	var successMemberLogOut = function(data){
		DISK_MEMBER_FUN.setMemberLogout(false);
		alert('안전하게 로그아웃하였습니다.');
		GO_HOME();
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


//자녀안신 On
WEB_COMMON_MEMBER.setChildBlockOn = function(){
	
	
	$('.onplay-adult-menu').addClass('block');
	$('.onplay-adult-contents').addClass('block');
	$(".checkbox-category-block-adult").prop("checked", true)
	
};

//자녀안심 Off
WEB_COMMON_MEMBER.setChildBlockOff = function(){
	
	$('.onplay-adult-menu').removeClass('block');
	$('.onplay-adult-contents').removeClass('block');
	$(".checkbox-category-block-adult").prop("checked", false)
};

//자녀안심 설정
WEB_COMMON_MEMBER.setChildBlock = function(diskMember){
	console.log('WEB_COMMON_MEMBER.setChildBlock');
	if(isDefined(diskMember) == false){
		return;
	}

	var targetSafeEle = $('#top-pc-disk-safe-child');
	targetSafeEle.data('loaded', diskMember.is_child_block).show();
	if(diskMember.is_child_block == 1){
		targetSafeEle.addClass('active');
		WEB_COMMON_MEMBER.setChildBlockOn();
	}else{
		targetSafeEle.removeClass('active');
		WEB_COMMON_MEMBER.setChildBlockOff();
	}
};

//회원 포인트 정보를 ele에 넣습니다.
WEB_COMMON_MEMBER.setPointInfoToEle = function(diskMember){
	console.log('WEB_COMMON_MEMBER.setPointInfoToEle');
	console.log('diskMember', diskMember);
	if(isDefined(diskMember) == false){
		return;
	}
	
	$('.onplay-member-info-tot-point').text(disk_number_format(diskMember.total_point));
	$('.onplay-member-info-tot-cash').text(disk_number_format(diskMember.total_cash));
	$('.onplay-member-info-tot-bonus').text(disk_number_format(diskMember.total_bonus));
	$('.onplay-member-info-tot-mileage').text(disk_number_format(diskMember.member_mileage));
	$('.onplay-member-info-tot-down-coupon').text(disk_number_format(diskMember.member_down_coupon));
	$('.onplay-member-info-tot-webtoon').text(disk_number_format(diskMember.cartoon_point));
	
	//remain_subscription_day
	$('.onplay-member-info-remain-subscription-day').text(disk_number_format(diskMember.remain_subscription_day));
	
	//member name
	$('.user_name.user-login-on').text(diskMember.show_member_nickname+'님');
	//$('total_point').text(diskMember.total_point);
	
};


//로그인 정보 혹은 로그인 폼 출력
WEB_COMMON_MEMBER.showMemberInfo = function(diskMember, isMobile){
	console.log('WEB_COMMON_MEMBER.showMemberInfo', diskMember);

	if(isDefined(diskMember)){
		console.log('member logined show');
		
		WEB_COMMON_MEMBER.setPointInfoToEle(diskMember);
		
		//home right banner
		$(".logined-contents-banner").addClass('logined');
		
		//disk - old
		//$('#fm-pc-login-container').hide();
		//$('#fm-pc-loged-container').show();

		//var memberInfoHtml = diskMember.getPcTopMemberLoginedInfoHtml(diskMember);
		//$('#user-login-on-info-box').html(memberInfoHtml).show();
		$('#user-login-on-info-box').addClass('active');


		//user login divs
		$('.user-login-on').show();
		$('.user-login-off').hide();

		//top navy
		$('.link.user-login-on-inline').css({'display':'inline-block'})
		$('.link.user-login-off-inline').hide();

		//set child block
		WEB_COMMON_MEMBER.setChildBlock(diskMember);

		//코멘트 로그인 덮개 열림
		console.log('remove');
		$('.disk-need-login-contents').remove();

		//상단 새소식 알림 마우스 바인딩
		WEB_COMMON_MEMBER.setMemberNoticeAlarmBinding();
		
		/*
		if(isDefined(location.hash)){
			$(window).trigger('hashchange');
		}
		*/
		//view
		if($('.wrap-contents-modal-view').length > 0){
			$('.wrap-contents-modal-view').addClass('logined');
		}


	}else{
		console.log('member logout show');
		//$('#fm-pc-loged-container').hide();
		//$('#fm-pc-login-container').show();

		WEB_COMMON_MEMBER.setChildBlockOff();
		
		//home right banner
		$(".logined-contents-banner").removeClass('logined');
		
		//$('#user-login-on-info-box').hide();
		$('#user-login-on-info-box').removeClass('active');

		$('.user-login-off').show();
		$('.user-login-on').hide();

		//top navy
		$('.link.user-login-off-inline').css({'display':'inline-block'})
		$('.link.user-login-on-inline').hide();

		if(isMobile == true){

		}else{
			//로그인버튼 바인딩
			PAGE_LOGIN.LOGIN.formBinding();
		}
	}
};


//자녀 안심 서비스 설정
WEB_COMMON_MEMBER.onclickSetMemberSafeChild = function(actionType){
	console.log('WEB_COMMON_MEMBER.onclickSetMemberSafeChild', actionType);

	var $targetForm = $('#memberSafeChildModalForm');
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return;
	}

	if(isDefined(formData.safe_passwd) == false || formData.safe_passwd.length < 4){
		alert('원하시는 비밀번호를 4자이상 입력해주세요.');
		$('#memberSafeChildModalForm_safe_passwd').focus();
		return;
	}

	if(actionType == 1){
		if(formData.safe_passwd != formData.safe_passwd2){
			alert('비밀 번호가 서로 일치하지 않습니다.');
			$('#memberSafeChildModalForm_safe_passwd2').focus();
			return;
		}
	}

	var successMemberSafeChildChangeFun = function(data){
		console.log('successMemberSafeChildChangeFun', data);

		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		if(isDefined(data.member_safe_child)){
			$('#top-pc-disk-safe-child').data('loaded', data.member_safe_child);
		}


		console.log(WEB_COMMON.DATA.MAIN);
		if(isDefined(WEB_COMMON.DATA.MAIN)){
			var notReloadUri = ['home'];
			if($.inArray(WEB_COMMON.DATA.MAIN, notReloadUri) < 0){
				//alert('reload');
				location.reload(true);
			}
		}

		$.modal.close();
	};

	//var sendData = formData;
	COMMON_ACTION.MEMBER.changeMemberInfoChildBlock(formData, successMemberSafeChildChangeFun);
};

//상단 알림 처리
WEB_COMMON_MEMBER.setMemberNoticeAlarmBinding = function(){
	
	var $noticeEle = $('#member-pc-top-notice-alarm');
	if($noticeEle.length < 1){
		return;
	}
	
	if($noticeEle.hasClass('over_binding') == true){
		return;
	}
	
	$noticeEle.mouseenter(function() {
		console.log('mouseenter over');
		if($(this).hasClass('show_list')){
			return;
		}
		WEB_COMMON_MEMBER.showNewMemberAlarm(this);
	})
	.mouseleave(function() {
		console.log('mouseleave out');
		$(this).removeClass('show_list');
	}).addClass('over_binding');
};

//new show mmmo - 마우스 오버했을 경우
WEB_COMMON_MEMBER.showNewMemberAlarm = function(thisEle){
	console.log('WEB_COMMON_MEMBER.showNewMemberAlarm');
	var $noticeEle = $('#member-pc-top-notice-alarm');
	if(isDefined(thisEle) == true){
		$noticeEle = $(thisEle);
	}
	if($noticeEle.length < 1){
		return;
	}
	
	//member-new-alarm-list
	if($noticeEle.find('.member-new-alarm-list').data('load') == 1){
		if($noticeEle.find('.member-new-alarm-list .alarm-item').length > 0){
			console.log('loaded item')
			return;
		}
	}
	
	//신규 알람 아이콘 없을 경우
	if($noticeEle.hasClass('active') != true){
		var memberArlarmListHtml = '<li class="alarm-item n_alim"><div class="txt_area"><p class="a_txt">새로 도착한 알림이 없습니다.</p></div></li>';
		$noticeEle.find('.member-new-alarm-list').html(memberArlarmListHtml).data('load', 1);
		return;
	}
	
	
	var eleData = $($noticeEle).data();
	console.log('eleData', eleData);
	
	var requestType = 'alarm';
	if(eleData.news < 1 && eleData.memo > 0){
		requestType = 'memo';
	}else if(eleData.news > 0 && eleData.memo < 1){
		requestType = 'news';
	}else if(eleData.news > 0 && eleData.memo > 0){
		requestType = 'alarm';
	}else{
		return;
	}
	
	var successGetMemberNoticeFun = function(data){
		console.log('successGetMemberNoticeFun', data);
		
		var memberArlarmListHtml = '<li class="alarm-item n_alim"><div class="txt_area"><p class="a_txt">새로 도착한 알림이 없습니다.</p></div></li>';
		if(isDefined(data.notice_list)){
			var listHtml = [];
			for(var i in data.notice_list){
				listHtml[i] = TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml(data.notice_type, data.notice_list[i]);
			}
			if(listHtml.length > 0){
				memberArlarmListHtml = listHtml.join('');
			}
		}
		$noticeEle.find('.member-new-alarm-list').html(memberArlarmListHtml).data('load', 1);
		$noticeEle.addClass('show_list');
		return;
	}
	var sendData =
	{
		is_mobile 	: 0,
		type		: requestType
	};
	COMMON_ACTION.MEMBER.getMemberNoticeData(sendData, successGetMemberNoticeFun);
};


//알림 팝업 - 내용이동
WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail = function(thisEle){
	console.log('WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	var goUrl;
	if(isDefined(eleData.type) == true){
		var DF = get_disk_config(0);
		var jsTimestampSecond = Math.floor(+ new Date() / 1000);
		$.cookie(DF.cookiePrefix+'notice_ck_time', jsTimestampSecond, { expires: 1, path: '/', domain: DF.COOKIE_DOMAIN  });
		
		if(eleData.type == 'news'){
			//save check time - new click time 저장
			$.cookie(DF.cookiePrefix+'notice_news_ck_time', jsTimestampSecond, { expires: 1, path: '/', domain: DF.COOKIE_DOMAIN  });
		
			goUrl = '/cs_news/';
			if(isDefined(eleData.idx) == true){
				goUrl = '/cs_news#!action=news&idx='+eleData.idx;
			}
		}else if(eleData.type == 'memo'){
			goUrl = '/my/community/#!action=my&group=community&id=community_memo&page=1';
		}
	}
	//WEB_COMMON_MEMBER.onclickOpenMemberNoticeClose();

	if(isDefined(goUrl)){
		location.href = goUrl;
	}

	//$('.disk-member-new-notice-wrap').removeClass('open');
	//$('.disk-member-notice-area').removeClass('active news memo');
};
//메모 알림 : show
WEB_COMMON_MEMBER.showMemberAlaimFlag = function(member_idx, memberNewsCount, memberMemoCount){
	console.log('WEB_COMMON_MEMBER.showMemberAlaimFlag');
	console.log(member_idx);
	console.log('memberNewsCount', memberNewsCount);
	console.log('memberMemoCount', memberMemoCount);
	
	if(isDefined(member_idx) == false){
		return;
	}
	var DF = get_disk_config(false);
	var jsTimestampSecond = Math.floor(+ new Date() / 1000);
	
	//새소식 체크 타임 - 새소식은 새속은 세부를 확인한 클릭 하거나 확인한 시간 저장 -- 3일
	//var newsCheckTime = jsTimestampSecond;
	var savedCheckTime = $.cookie(DF.cookiePrefix+'notice_news_ck_time');
	if(isDefined(savedCheckTime) == true && $.isNumeric(savedCheckTime) == true){
		var newsCheckTime = parseInt(savedCheckTime);	
		newsCheckTime = newsCheckTime + (60 * 60 * 24 * 3);
	}else{
		var newsCheckTime = 0;
	}
	
	
	//save check time -- 서버에서만 체크할 경우
	//$.cookie(DF.cookiePrefix+'notice_ck_time', jsTimestampSecond, { expires: 1 });
	if(isDefined(member_idx) == true){
		var member_news_count = 0;
		if($.isNumeric(memberNewsCount) == true){
			member_news_count = parseInt(memberNewsCount);	
		}
		console.log('newsCheckTime', newsCheckTime);
		console.log('jsTimestampSecond', jsTimestampSecond);
		if(newsCheckTime > jsTimestampSecond){
			member_news_count = 0;
		}
		
		var member_memo_count = 0;
		if($.isNumeric(memberMemoCount) == true){
			member_memo_count = parseInt(memberMemoCount);	
		}
		var saveData = {
			news:member_news_count,
			memo: member_memo_count
		}
		console.log('saveData', saveData);
		var totCount = member_memo_count + member_news_count;
		if( totCount > 0){
			$('.login_box .user_top_area .notice').data(saveData).addClass('active');
		}else{
			$('.login_box .user_top_area .notice').data(saveData).removeClass('active');
		}
		$.cookie(DF.cookiePrefix+'notice_ck_news', member_news_count, { expires: 1, path: '/', domain: DF.COOKIE_DOMAIN });
		$.cookie(DF.cookiePrefix+'notice_ck_memo', member_memo_count, { expires: 1,  path: '/', domain: DF.COOKIE_DOMAIN });
	}
	return;
};

/*

//메모 알림 : remove
WEB_COMMON_MEMBER.removeNewMemoFlag = function(){
	console.log('WEB_COMMON_MEMBER.removeNewMemoFlag');
	var targetMemoEle = $('.disk-member-new-memo-wrap');
	if(targetMemoEle.length > 0){
		targetMemoEle.data('idx', 0).removeClass('active');
	}
	//var DF = get_disk_config(false);
	//var savedCookieName = DF.cookiePrefix+'memo_idx'
	//$.removeCookie(savedCookieName);
};

//뉴스 알림 : show
WEB_COMMON_MEMBER.showNewNewsFlag = function(newsIdx){
	console.log('WEB_COMMON_MEMBER.showNewNewsFlag', newsIdx);
	if(isDefined(newsIdx) == false || $.isNumeric(newsIdx) == false){
		return;
	}
	newsIdx = parseInt(newsIdx);
	if(newsIdx < 1){
		return;
	}
	var DF = get_disk_config(false);
	var readNewsIdx = $.cookie(DF.cookiePrefix+'news_read_idx');
	console.log('readNewsIdx', readNewsIdx);
	if(isDefined(readNewsIdx)){
		if(parseInt(readNewsIdx) == parseInt(newsIdx)){
			console.log('read and new same news');
			return;
		}
	}
	//var jsTimestampSecond = Math.floor(+ new Date() / 1000);
	//console.log('jsTimestampSecond', jsTimestampSecond);
	console.log('newsIdx', newsIdx);
	//if(jsTimestampSecond < expireTime){
		var targetMemoEle = $('.disk-member-new-news-wrap');
		if(targetMemoEle.length > 0){
			targetMemoEle.data({'idx': newsIdx}).addClass('active');
		}
	//}
};
//뉴스 알림 : remove
WEB_COMMON_MEMBER.removeNewNewFlag = function(){
	console.log('WEB_COMMON_MEMBER.removeNewNewFlag');
	var targetMemoEle = $('.disk-member-new-news-wrap');
	if(targetMemoEle.length > 0){
		targetMemoEle.data('idx', 0).removeClass('active');
	}
	//var DF = get_disk_config(false);
	//var savedCookieName = DF.cookiePrefix+'memo_idx'
	//$.removeCookie(savedCookieName);
};
*/




//알림 클릭 - news, memo
/*
WEB_COMMON_MEMBER.onclickOpenMemberNotice = function(thisEle){
	console.log('WEB_COMMON_MEMBER.onclickOpenMemberNotice');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.type) == false){
		alert('데이타가 올바르지 않습니다.');
		return;
	}

	var noticeIdx;
	if(isDefined(eleData.idx) == true){
		noticeIdx = eleData.idx;
	}

	if($(thisEle).hasClass('open')){
		$(thisEle).parent('.disk-member-notice-area').removeClass('active news memo');
		$(thisEle).removeClass('open');
		return;
	}

	//return;

	if(isDefined(eleData.load)){
		var noticeList = eleData.load;
		if($.isArray(noticeList)){
			console.log('load data show');
			var noticeListHtml = TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml(eleData.type, noticeList);
			$('#disk-member-new-notice-popup-wrap').html(noticeListHtml);

			$('.disk-member-new-notice-wrap').removeClass('open');
			$(thisEle).parent('.disk-member-notice-area').removeClass('news memo');
			$(thisEle).parent('.disk-member-notice-area').addClass('active '+eleData.type);
			$(thisEle).addClass('open');
			return;
		}
	}

	var successGetMemberNoticeFun = function(data){
		console.log('successGetMemberNoticeFun', data);
	//	if(isDefined(data.notice_type) == true && isDefined(data.notice_list) == true){
		if(isDefined(data.notice_type) == true){
			var noticeListHtml = TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml(data.notice_type, data.notice_list);
			$('#disk-member-new-notice-popup-wrap').html(noticeListHtml);
			//save load data
			if($(thisEle).length > 0){
				$(thisEle).data('load', data.notice_list);
			}
		}

		//알림 읽은 상태로 처리
		console.log('noticeIdx', noticeIdx);
		if(isDefined(noticeIdx) == true){
			if(eleData.type == 'news'){
				var DF = get_disk_config(false);
				$.cookie(DF.cookiePrefix+'news_read_idx', noticeIdx, { expires: 1 });
				WEB_COMMON_MEMBER.removeNewNewFlag();
			}else if(eleData.type == 'memo'){
				var DF = get_disk_config(false);
				$.cookie(DF.cookiePrefix+'memo_read_idx', noticeIdx, { expires: 1 });
				WEB_COMMON_MEMBER.removeNewMemoFlag();
			}
		}


		$('.disk-member-new-notice-wrap').removeClass('open');
		$(thisEle).parent('.disk-member-notice-area').removeClass('news memo');
		$(thisEle).parent('.disk-member-notice-area').addClass('active '+eleData.type);
		$(thisEle).addClass('open');

	}

	var sendData =
	{
		is_mobile 	: 0,
		type		: eleData.type
	};


	COMMON_ACTION.MEMBER.getMemberNoticeData(sendData, successGetMemberNoticeFun);

};

//알림 팝업 닫기
WEB_COMMON_MEMBER.onclickOpenMemberNoticeClose = function(thisEle){
	console.log('WEB_COMMON_MEMBER.onclickOpenMemberNoticeClose');
	$('.disk-member-new-notice-wrap').removeClass('open');
	$('.disk-member-notice-area').removeClass('active news memo');
};

//알림 팝업 - 내용이동
WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail = function(thisEle){
	console.log('WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	var goUrl;
	if(isDefined(eleData.type) == true){

		if(eleData.type == 'news'){
			goUrl = '/cs_news/';
			if(isDefined(eleData.idx) == true){
				goUrl = '/cs_news#!action=news&idx='+eleData.idx;
			}
		}else if(eleData.type == 'memo'){
			goUrl = '/my/community/#!action=my&group=community&id=community_memo&page=1';
		}
	}
	WEB_COMMON_MEMBER.onclickOpenMemberNoticeClose();

	if(isDefined(goUrl)){
		location.href = goUrl;
	}

	//$('.disk-member-new-notice-wrap').removeClass('open');
	//$('.disk-member-notice-area').removeClass('active news memo');
};
*/
