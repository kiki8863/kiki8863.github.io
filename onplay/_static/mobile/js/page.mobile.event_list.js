/*
*	event_list
*/



MOBILE_PAGE.event_list = {};
MOBILE_PAGE.event_list.DATA = {
	LAST_HASH	: null,
	ELE_LIST	: '.mobile-event-list-wrap',
	ELE_INFO	: '#mobile-event-list-page-end-spy'
	
}
MOBILE_PAGE.event_list.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.event_list.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.event_list.init(showContainerInfo, hashPrams);	
};




MOBILE_PAGE.event_list.defaultBinding = function(){
	console.log('MOBILE_PAGE.event_list.defaultBinding');	
	
	
};

MOBILE_PAGE.event_list.afterBinding  = function(){
	console.log('MOBILE_PAGE.event_list.afterBinding ');	
	
	MOBILE_COMMON.afterLoadCommonBinding();
};


MOBILE_PAGE.event_list.afterBindingSlick  = function(){
	console.log('MOBILE_PAGE.event_list.afterBindingSlick');
	
	if($('.mobile-swip-event-top-banner').find('.swipe-banner-item').length > 1){
		$('.mobile-swip-event-top-banner').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			infinite: true,
			speed: 500,
			fade: true,
			autoplay: true,
			autoplaySpeed	: 3000,
			cssEase: 'linear',
			arrows : false,
			dotsClass : 'good_dots',
			refresh	: true,
		});
	}
	
	return;
	
	
	if($('.disk-mobile-autoplay-slick.slick-slider').length > 0){
		$('.disk-mobile-autoplay-slick.slick-slider').each(function(index) { 
			console.log('slick ~~~');
			console.log($(this)); 
			if($(this)[0].hasOwnProperty('slick') == true){
				console.log('has slick obj~~~~~');
				if($(this).hasClass('mobile-swip-event-top-banner')){
					$(this).slick('slickPlay');	
				}
			}
		});
	}else{
		if($('.mobile-swip-event-top-banner').find('.swipe-banner-item').length > 1){
			$('.mobile-swip-event-top-banner').slick({
				lazyLoad: 'ondemand',
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				infinite: true,
				speed: 500,
				fade: true,
				autoplay: true,
				autoplaySpeed	: 3000,
				cssEase: 'linear',
				arrows : false,
				dotsClass : 'good_dots',
				refresh	: true
			});
		}
	}
	
	
};


MOBILE_PAGE.event_list.init = function(info, params){
	console.log('MOBILE_PAGE.event_list.init');
	/*
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;		
	}
	*/
	
	var actionType = params['!action'];
	if(actionType != 'event_list'){
		console.log('action type err');
		return;
	}
	
	var eventType = params['type'];
	if(isDefined(eventType) == false){
		eventType = 1;
	}
	
	var nextPage = params['page'];
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	var eventIdx = params['idx'];
	if(isDefined(eventIdx) && $.isNumeric(eventIdx)){
		
		MOBILE_COMMON.openMobileEventDetailView(eventIdx, 1);
		return;
	}
	
	var $eventListContentsEle = $(MOBILE_PAGE.event_list.DATA.ELE_LIST);
	if(isDefined(info.m_list) == true){
		$eventListContentsEle = $(info.m_list);
	}
	
	if(MOBILE_PAGE.event_list.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		//console.log($eventListContentsEle.data('load'));
		if($eventListContentsEle.length > 0){
			if($eventListContentsEle.text().length < 100 || $eventListContentsEle.data('load') != 1){
				console.log('empty coupon contents list 1');
				MOBILE_PAGE.event_list.getEventListData(nextPage, eventType);
				return;
			}
			if($eventListContentsEle.find('.mobile-event-list-item.active').length > 0){
				utility.ui.goToElement('.mobile-event-list-item.active', 100, 58);
			}
			
		}else{
			console.log('empty foryou contents list 2');
			MOBILE_PAGE.event_list.getEventListData(nextPage, eventType);
		}
		return;
	}
	
	MOBILE_PAGE.event_list.getEventListData(nextPage, eventType);
	
};





MOBILE_PAGE.event_list.getEventListData = function(nextPage, eventType){
	console.log('MOBILE_PAGE.event_list.getCouponMainData');
	
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	var $infoEle = $(MOBILE_PAGE.event_list.DATA.ELE_INFO);
	if($infoEle.length > 0){
		var eleData = $($infoEle).data();
		if(isDefined(eventType) == false){
			if(isDefined(eleData.type)){
				eventType = eleData.type;
			}
		}
	}
	if(isDefined(eventType) == false){
		eventType = 1;
	}
	
	
	if($infoEle.length < 1){
		console.log('$infoEle empty');
		return;
	}
	
	var sendData = {
		page		: nextPage,
		type		: eventType,
		limit		: 10
	};

	console.log('sendData', sendData);
	MOBILE_PAGE.event_list.getEventListContentsData(sendData, $infoEle);
};



//get getEventListContentsData
MOBILE_PAGE.event_list.getEventListContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.event_list.getEventListContentsData', getData);
	
	var sendData = {
		s			: 1,		//status
		l			: '',		//limit
		page		: 1,
		is_mobile	: 1,
	};

	
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['type'])){ sendData.s = getData.type; }
	}
	console.log('sendData', sendData);
	
	if(isDefined($infoEle) == false || $infoEle.length < 1){
		$infoEle = $(MOBILE_PAGE.event_list.DATA.ELE_INFO);
	}
	
	var $innerTargetEle = $(MOBILE_PAGE.event_list.DATA.ELE_LIST);
	var successFunGetEventContentsList = function(data){
			console.log('successFunGetEventContentsList', data);
			var tmData = null;
			
			
			if(isDefined(data.disk_event_list)){
				
				
				
				var tmData = data.disk_event_list;
				var tmListData = tmData.list;
				var mvListHtml = [];
				var lCnt = 0;
				for(var i in tmListData){
					mvListHtml.push(MOBILE_TEMPLETE.PAGE.getMobileEventListHtml(tmListData[i]));
				}
				//console.log('mvListHtml', mvListHtml);
				//페이지 상단으로 이동
				//utility.ui.goToElement('.container');
				var curPage = parseInt(tmData.page);
				/*
				if(curPage == 1){
					$innerTargetEle.html(mvListHtml.join(''));
				}else{
					$innerTargetEle.append(mvListHtml.join(''));
				}
				*/
				var listCount =  mvListHtml.length;
				var saveData = {
						type	:	data.type,
						page	:	curPage,
						load	: 1,
				}
				var pageLimit = tmData.limit;
				if(listCount > 0){
					saveData.page = curPage;
					saveData.loaded = curPage;
					saveData.total_page = curPage + 1;
					if(curPage == 1){
						$innerTargetEle.html(mvListHtml.join('')).data('load', 1);	
					}else{
						$innerTargetEle.append(mvListHtml.join(''));
					}
					if(listCount < pageLimit){
						saveData.total_page = curPage;
						$infoEle.data(saveData).removeClass('loading').addClass('ending');
					}else{
						$infoEle.data(saveData).addClass('loading').removeClass('ending');	
					}
					
				}else{
					saveData.page = curPage;
					saveData.loaded = curPage;
					saveData.total_page = curPage;
					if(curPage == 1){
						console.log('no data show');
						$('.f_content.event-list').addClass('no-data');
					}
					$infoEle.data(saveData).removeClass('loading').addClass('ending');
		
				}
				
				console.log('saveData', saveData);
				
				
				//save cache
				MOBILE_PAGE.event_list.DATA.LAST_HASH = location.hash;
				
				MOBILE_PAGE.event_list.afterBinding();
			}
			
			//event top banner -- 
			if(isDefined(data.event_top_banner_list)){
				var bannerHtml = [];
				var bannerList = data.event_top_banner_list;
				for(var bi in bannerList){
					bannerHtml.push(MOBILE_TEMPLETE.PAGE.getMobileEventTopBannerHtml(bannerList[bi]));
				}
				if($('.mobile-swip-event-top-banner').hasClass('slick-slider') == false){
					if(bannerHtml.length > 0){
						$('.mobile-swip-event-top-banner').html(bannerHtml.join(''));
						MOBILE_PAGE.event_list.afterBindingSlick();
					}
				}
				
			}
			
			
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT.E_LIST,
		data		: formData,
		success_fun	: successFunGetEventContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



//event list : more
MOBILE_PAGE.event_list.onclickMoreMobileData = function(thisEle){
	console.log('MOBILE_PAGE.event_list.onclickMoreMobileData');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if($(thisEle).hasClass('ending')){
		console.log('has cls ending');
		return;
	}
	
	var eventType = 1;
	var mypageLoadedPage = 1;
	var mypageTotalPage = 1;
	if(isDefined(eleData.type)){
		eventType = eleData.type; 
	}
	if(isDefined(eleData.loaded)){
		mypageLoadedPage = parseInt(eleData.loaded); 
	}
	if(isDefined(eleData.total_page)){
		mypageTotalPage = parseInt(eleData.total_page); 
	}
	
	var nextPage = mypageLoadedPage + 1;
	if(nextPage > mypageTotalPage){
		console.log('max page');
		$(thisEle).data({page :mypageLoadedPage, loaded : mypageLoadedPage, total_page:mypageLoadedPage}).removeClass('loading').addClass('ending');
		return;
	}
	
	MOBILE_PAGE.event_list.getEventListData(nextPage, eventType);
};

//change event type
MOBILE_PAGE.event_list.onclickChangeEventType = function(thisEle){
	console.log('MOBILE_PAGE.event_list.onclickChangeEventType');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.type) == false){
		console.log('empty event type');
		return;
	}
	var nextPage = 1;
	var eventType = eleData.type;
	var saveData = {
		page 	: 1,
		type	: eleData.type,
		totol_page : 1
	}
	
	var $infoEle = $(MOBILE_PAGE.event_list.DATA.ELE_INFO);
	if($infoEle.length > 0){
		$infoEle.data(saveData);
	}
	
	$('.btn-event-list-tab').removeClass('active');
	$(thisEle).addClass('active');
	
	MOBILE_PAGE.event_list.getEventListData(nextPage, eventType);
};







MOBILE_PAGE.event_view = {};
MOBILE_PAGE.event_view.DATA = {
	LAST_HASH	: null,
	EVENT_IDX	: null,
	ELE_WRAP	: '#event-detail-modal-view-wrap-',
	ELE_INFO	: '#mobile-event-list-page-end-spy',
	
	/*
	ELE	: {
		wrap	 	: 'wrap-channel-contents-modal-view',
		info		: '.channel-theme-page-end-spy'
	}
	*/
	
}
MOBILE_PAGE.event_view.start = function(eventIdx){
	
	console.log('MOBILE_PAGE.event_view.start');
	console.log('eventIdx', eventIdx);
	
	MOBILE_PAGE.event_view.defaultBinding(eventIdx);
	MOBILE_PAGE.event_view.init(eventIdx);
	//app down
	if(eventIdx == 18){
		MOBILE_PAGE.event_view.app_down_2009.start();
	}
};




MOBILE_PAGE.event_view.defaultBinding = function(eventIdx){
	console.log('MOBILE_PAGE.event_view.defaultBinding', eventIdx);	
	
	//go top
	GO_MODAL_TOP();
	
	//스크롤 스파이 - 최신자료, 코멘트
	var $wrapEle = $(MOBILE_PAGE.event_view.DATA.ELE_WRAP+eventIdx);
	if($wrapEle.length > 0){
		MOBILE_COMMON_SCROLL.setDiskMobileModalScrollSpy('event_view', $wrapEle
		, null, function(eleB){
			MOBILE_PAGE.event_view.loadChannelCommentList(eleB);
		});	
	}
	/*
	//kakao binding
	if($('#kakao-channel-add-button').length > 0){
		console.log('kakao-channel-add-button');
		var DF = get_disk_config(false);
		console.log('Kakao', Kakao);
		if(isDefined(Kakao.Link) == false){
			Kakao.init(DF.kokao_key);	
		}
		console.log('Kakao', Kakao);
	
	}
	kakao-channel-chat-action-button
	*/
	
	
};

MOBILE_PAGE.event_view.afterBinding  = function(){
	console.log('MOBILE_PAGE.event_view.afterBinding ');	
	
	MOBILE_COMMON.afterLoadCommonBinding();
	
	
};




MOBILE_PAGE.event_view.init = function(eventIdx){
	console.log('MOBILE_PAGE.event_view.init');
	
	
	MOBILE_PAGE.event_view.afterBinding();
};





//scroll spy : 채널 관련 최신 코멘트 리스트 가져오기
MOBILE_PAGE.event_view.loadChannelCommentList = function($commentListWrapEle){
	console.log('MOBILE_PAGE.event_view.loadChannelCommentList');	
	console.log($commentListWrapEle);
	if(isDefined($commentListWrapEle) == false){
		var $wrapEle = $('#'+MOBILE_PAGE.event_view.DATA.ELE.wrap+'-'+MOBILE_PAGE.event_view.DATA.CHANNEL_TYPE+'-'+MOBILE_PAGE.event_view.DATA.CHANNEL_IDX);
		$commentListWrapEle = $wrapEle.find('.channel-comment-list-wrap');
	}
	
	var eleData = $commentListWrapEle.data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.idx) == true && isDefined(eleData.load) == true){
		if(eleData.load < 1){
			MOBILE_PAGE.event_view.setChannelCommentFirstLoad($commentListWrapEle);
			$commentListWrapEle.data('load', 1);	
		}
	}
};




//코멘트 : 코멘트 처음 불러오기
MOBILE_PAGE.event_view.setChannelCommentFirstLoad = function($infoEle){
	console.log('MOBILE_PAGE.event_view.setChannelCommentFirstLoad');
	//console.log($infoEle);
	if(isDefined($infoEle) == false){
		console.log('not info');
		return;
	}
	if($infoEle.length < 1){
		return;
	}
	var eleData = $infoEle.data();
	console.log(eleData);
	
	var $targetPagnationEle;
	if(isDefined(eleData.info)){
		$targetPagnationEle = $('#'+eleData.info);
	}
				
	if(isDefined(eleData.idx) == false){
		console.log('not idx');
		if(isDefined($targetPagnationEle) == true  && $targetPagnationEle.length > 0){
			$targetPagnationEle.addClass('no-data no-more');	
		}
		return;
	}
	
	if(isDefined(eleData.count) == true){
		if(eleData.count < 1){
			console.log('empty comment count');
			if(isDefined($targetPagnationEle) == true  && $targetPagnationEle.length > 0){
				$targetPagnationEle.addClass('no-data no-more');	
			}
			return;
		}
	}else{
		$targetPagnationEle.addClass('no-data no-more');
		return;
	}
	
	var successLoadFirstComment = function(data){
		console.log('successLoadFirstComment');
		console.log(data);
	};
	
	var sendData = {
		idx		: eleData.idx,
		page	: 1,
		t		: 'event',
		target	: eleData.target,
		info	: eleData.info,
	};
	console.log('sendData', sendData);
	MOBILE_COMMON.COMMENT.setCommentList(sendData, successLoadFirstComment);
};


//출석체크 하기
MOBILE_PAGE.event_view.on_attend = {};
MOBILE_PAGE.event_view.on_attend.onclickJoinAttend = function(thisEle){
	console.log('PAGE_EVENT_VIEW.M_VIEW.on_attend.onclickJoinAttend');
	
	if($(thisEle).hasClass('disabled')){
		return;
	}
		
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		disk_alert('로그인 후 이벤트 참여가 가능합니다.', GO_LOGIN);
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		disk_alert('본인 인증 후 이벤트 참여가 가능합니다.',GO_REAL_NAME_PHONE);
		return;
	}
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	if(mm < 10){
		mm = '0'+''+mm;
	}
	var yyyy = today.getFullYear();
	
	var thisDay = yyyy+'-'+mm+'-'+dd;
	console.log('thisDay', thisDay);
	
	
    var successHttpJoinAttendEvent = function(data){
	    console.log('successHttpJoinAttendEvent');
	    console.debug(data);
	    //회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true, true);
		}
		
	    var eventPoint = data.log_data.event_point;
	    disk_alert('출석체크가 되었습니다.\n보상으로 '+eventPoint+'p가 지급되었습니다.');
	    $(thisEle).addClass('disabled');
	};
	
	var formData = {
		action_date		: thisDay,
		is_mobile		: 1
	}
	COMMON_ACTION.DISK_EVENT.joinAttendAction(formData, successHttpJoinAttendEvent);
	
	
};

//온플레이 전용 앱 출시 이벤트
MOBILE_PAGE.event_view.app_down_2009 = {};
MOBILE_PAGE.event_view.app_down_2009.start = function(){
	console.log('MOBILE_PAGE.event_view.app_down_2009.start');
	
	var $eViewEle = $('#event-detail-modal-view-wrap-18');
	if($eViewEle.length > 0){
		console.log('aaa');
		if(isMobileOnplayWebviewAgent() == true){
			$eViewEle.find('.btn_go_down').addClass('get_point');
			if(isAdDomain() == true){
				 $eViewEle.find('.event-appdown-get-point').addClass('is_copy'); 
			}else{
				$eViewEle.find('.event-appdown-get-point').addClass('non_copy');	
			}
			$( ".event-appdown-get-point" ).unbind( "click");
			$( ".event-appdown-get-point" ).bind( "click", function() {
				console.log('click btn');
				if($(this).hasClass('is_copy')){
					MOBILE_PAGE.home.onclickEventRealname(this);
				}else{
					MOBILE_PAGE.home.getMobileEventReward(this);
				}
			});
		}	
	}
	
	
	
}



//이벤트 보상
MOBILE_PAGE.event_reward = {};

//app 설치 보상 수동 요청
MOBILE_PAGE.event_reward.join_app_install = function(thisEle, callbackFun){
	console.log('MOBILE_PAGE.event_reward.join_app_install');
	
	if($(thisEle).hasClass('disabled')){
		return;
	}
		
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		disk_alert('로그인 후 이벤트 참여가 가능합니다.', GO_LOGIN);
		return;
	}

	
    var successHttpJoinAppInstallEvent = function(data){
	    console.log('successHttpJoinAttendEvent');
	    console.debug(data);
	    //회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true, true);
		}
	    $(thisEle).addClass('disabled');
	    if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}
	};

	var formData = {
		is_mobile : 1
	};
    var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.APP_INSTALL_JOIN,
		data		: formData,
		success_fun	: successHttpJoinAppInstallEvent,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	
};

//vip coupon download
MOBILE_PAGE.event_reward.getVipDownloadCoupon = function(){
	console.log('M_VIEW.getVipDownloadCoupon');
	
	if(utility.disk.checkIsVip() != true){
		disk_alert('VIP 회원 전용 이벤트입니다.');
		return;
	}
	var sendData = {
		is_mobile	: 1,
	};
	
	
	var successFunGetEventJoinFun = function(data){
		console.log('successFunGetEventJoinFun', data);
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true, true);
		}
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			return;
		}
	};

	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.VIP_DOWNCOUPON_GET,
		data		: sendData,
		success_fun	: successFunGetEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//웹툰포인트 공짜
MOBILE_PAGE.event_reward.getEventJoinWebtoonPoint = function(){
	console.log('M_VIEW.getEventJoinWebtoonPoint');
	
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		if(confirm("실명인증 후 이벤트에 참여가능합니다.\n실명인증을 진행하시겠어요?") == true){
			GO_FOCES_REAL_NAME();
			return;	
		}
		return;
	}
	
	var sendData = {
		is_mobile	: 1,
	};
	
	
	var successFunGetWebtoonEventJoinFun = function(data){
		console.log('successFunGetWebtoonEventJoinFun', data);
		
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true, true);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
		}
		GO_TOPTOON();
		return;
	};

	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.WEBTOONPOINT_GET,
		data		: sendData,
		success_fun	: successFunGetWebtoonEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//blog posting
MOBILE_PAGE.event_reward.joinBlogPostingEvent = function(formEleId){
	console.log('event_reward.joinBlogPostingEvent');
	
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		if(confirm("실명인증 후 이벤트에 참여가능합니다.\n실명인증을 진행하시겠어요?") == true){
			GO_MENU('real_name');
			return;	
		}
		return false;
	}
	
	if(isDefined(formEleId) == false){
		disk_alert('정보가 올바르지 않습니다.');
		return false;
	}
	
	var regUrlType = function(data) {
		var regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
		return regex.test(data);
	};

	
	var $targetFrom = $('#'+formEleId);
	if($targetFrom.length < 1){
		return false;
	}
	var formValues = $targetFrom.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData.blogId) == false){
		disk_alert('포털 아이디를 입력해 주세요.');
		//$targetFrom.find('input[name=blogId]').focus();
		return false;
	}
	
	if(isDefined(formData.blogUrl) == false){
		disk_alert('등록한 사이트 Url를 입력해 주세요.');
		//$targetFrom.find('input[name=blogUrl]').focus();
		return false;
	}
	
	if(formData.blogUrl.length < 10 || regUrlType(formData.blogUrl) != true){
		disk_alert('정확한 Url를 입력해 주세요.');
		//$targetFrom.find('input[name=blogUrl]').focus();
		return false;
	}
	
	var sendData = 
	{
		blog_type : formData.postingType,
		blog_id : formData.blogId,
		blog_url : formData.blogUrl,
		is_mobile : 1
	};

	var successFunSetJoinEventJoinFun = function(data){
		console.log('successFunSetJoinEventJoinFun', data);
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		if(isDefined(data.show_msg)){
			disk_alert(data.show_msg);
			//return;
		}
		return;
	};
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.JOIN_BLOG_POST_GET,
		data		: sendData,
		success_fun	: successFunSetJoinEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//2021 happy new year coupon download
MOBILE_PAGE.event_reward.getMobileHappyNewYear2021DownloadCoupon = function(targetModal){
	console.log('MOBILE_PAGE.event_reward.getMobileHappyNewYear2021DownloadCoupon');
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		if(confirm("실명인증 후 이벤트에 참여가능합니다.\n실명인증을 진행하시겠어요?") == true){
			GO_MENU('real_name');
			return;	
		}
		return false;
	}
	
	var sendData = {
		is_mobile	: 1,
	};
		
	var successHappyFunGetEventJoinFun = function(data){
		console.log('successHappyFunGetEventJoinFun', data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true);
		}
		
		//쿠키저장 - 다시 노출 안함
		if(isDefined(targetModal)){
			var DF = get_disk_config(true);
			$.cookie(DF.cookiePrefix+targetModal, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
			$.modal.close();
		}
		
		if(isDefined(data.show_msg)){
			disk_alert(data.show_msg);
			//return;
		}
		
		
	};
	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.HAPPY_2021_DOWNCOUPON_GET,
		data		: sendData,
		success_fun	: successHappyFunGetEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//코멘트 : 코멘트 더 가져오기
/*
MOBILE_PAGE.event_view.getEventViewCommentMoreCommentData = function(thisEle){
	console.log('MOBILE_PAGE.event_view.getEventViewCommentMoreCommentData');
	if(isDefined(thisEle) == false){
		return;
	}

	if($(thisEle).hasClass('disabled') == true){
		console.log('disabled');
		thisEle.addClass('no-more');
		return;
	}
	console.log($(thisEle));
	var eleData = $(thisEle).data();	
	if(isDefined(eleData.idx) == false){ console.log('not idx'); return;}
	if(isDefined(eleData.page) == false){ console.log('not page'); return;}
	var nowPage = parseInt(eleData.page);
	if($.isNumeric(nowPage) == false){
		console.log('page num err');
		return;
	}
	
	var nextPage = nowPage + 1;
	if(eleData.total_page < nextPage){
		$(thisEle).addClass('disabled');
		return;
	}
	eleData.next_page = nextPage;
	var successGetMoreComment = function(data){
		console.log('successGetMoreComment');
		console.log(data);
	};
	
	eleData.info = $(thisEle).attr('id');
	console.log(eleData);
	MOBILE_COMMON.COMMENT.getMoreCommentListData(eleData, successGetMoreComment);
};
*/