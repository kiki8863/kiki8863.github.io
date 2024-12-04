/*
* mobile page contents js
*/

MOBILE_PAGE.contents = {};
MOBILE_PAGE.contents.DATA = {
	SELLER_PAGE	: 1,					//판매자 콘텐츠 페이지 번호
	V_SCROLL	: false					//스크롤 진행여부
};

MOBILE_PAGE.contents.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.contents.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//return;

	MOBILE_PAGE.contents.defaultBinding();
	MOBILE_PAGE.contents.pageInit(showContainerInfo, hashPrams);
}


MOBILE_PAGE.contents.defaultBinding = function(){
	console.log('MOBILE_PAGE.contents.defaultBinding');

	//slick destory
	var $loadedChapterSlick = $('.mobile-view-broadcast-chapter-swipe');
	if($loadedChapterSlick.length > 0){
		if($loadedChapterSlick[0].hasOwnProperty('slick') == false){
			console.log('unslick ~~~~~~~~');
			//$loadedChapterSlick.slick('unslick');
		}
	}

	//scroll off - scroll spy
	//$(window).off('scroll');//This works
	$('.mobile-contents-view-scroll-spy-wrap').data('load', 0);
	
	//preview vidoe size
	/*
	//if(isMobileOnplayWebviewAgent() == true){
		console.log('$(window).width()', $(window).width());
		var windowWidth = $(window).width();
		var setVideoHeight = windowWidth * (9/16);
		console.log('setVideoHeight', setVideoHeight);
		$('.mobile-contents-view-top-player-area video').css('height', setVideoHeight+'px');
	//}
	*/	
};

MOBILE_PAGE.contents.afterBinding = function(bbsIdx){
	console.log('MOBILE_PAGE.contents.afterBinding');
	console.log('bbsIdx', bbsIdx);

	MOBILE_COMMON.afterLoadCommonBinding();

	if(isDefined(bbsIdx) == false){
		return;
	}
	
	var goBack = function(){
		history.back(true);
	};
	
	//check 퍼미션
	var isMobileContents = $('#contentsModalViewBbsIsMobile_'+bbsIdx).val();
	console.log('isMobileContents', isMobileContents);
	if(isDefined(isMobileContents)){
		if(isMobileContents != 1){
			disk_alert('선택된 콘텐츠가 삭제되었거나 판매가 종료되었습니다.', goBack);
			return;
		}
	}
	
	var isStateContents = $('#contentsModalViewBbsState_'+bbsIdx).val();
	console.log('isStateContents', isStateContents);
	var jbAry = [1,98,99];
	if(isDefined(isStateContents)){
		if(utility.disk.checkIsGmMember() != true){
			//if(isStateContents != 1){
			if(jQuery.inArray( parseInt(isStateContents), jbAry ) == -1){	
				disk_alert('선택된 콘텐츠가 삭제되었거나 판매가 종료되었습니다.', goBack);
				return;
			}
		}
	}
	
	//재다운 여부
	if(utility.disk.checkIsRedownContents(bbsIdx) == true){
		console.log('redown contents');
		$('#wrap-contents-mobile-view-'+bbsIdx).addClass('redown-contents');
	}
	
	//broadcast-chapter swip
	var $broChapterSlick = $('#mobile-view-broadcast-chapter-swipe-'+bbsIdx);
	if($broChapterSlick.length > 0){
		if($broChapterSlick[0].hasOwnProperty('slick') == false){
			$broChapterSlick.slick({
				lazyLoad: 'ondemand',
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows : false,
				dotsClass : 'good_dots',
				infinite	: false
			});
		}
	}else{
		$('.mobile-contents-view-broadcast-chapter-wrap').empty();
	}
	//스크롤 감지
	//MOBILE_COMMON_SCROLL.setMobileContestScrollSpy(bbsIdx);


	//판매자 다른 콘텐츠 - 이전, 다음
	var $btnChannelBroChapterControler = $( ".btn-view-seller-contents" );
	if($btnChannelBroChapterControler.length > 0){
		//$btnChannelBroChapterControler.unbind( "click");
		$btnChannelBroChapterControler.on( "click", function() {
			console.log('btn-view-seller-contents');
			utility.shortPagination.action($(this), '.btn-view-seller-contents', MOBILE_PAGE.getMoreSellerOtherContentsListData);	//반드시 .을 붙인다
		});
	}

	//contents hash 저장
	MOBILE_COMMON.DATA.HASH.LAST_CONTENTS = location.hash;
	
	//미리보기 text - hls
	/*
	var video = document.getElementById('playerId');
	if(Hls.isSupported()) {
		console.log('Hls.isSupported');
		var hls = new Hls();
		hls.loadSource('//fca-pre.mobile.pconn.co.kr/clip/H-Mcs9VKWscR9MBR2n9viJ_J84HwpIlLiCUaUDGF7iUBDWTqpwbowv-TY0CMKdG4BiTgtFUw40NO3PDzc4du5OcsrnuKm5W_UiUIrl-9hWhGqTT_cIaT2mHvGeHKyzDnKwekpva35CpSzrrhjLl0Aw');
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED,function() {
		  //video.play();
		});
	}
	else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = '//fca-pre.mobile.pconn.co.kr/clip/H-Mcs9VKWscR9MBR2n9viJ_J84HwpIlLiCUaUDGF7iUBDWTqpwbowv-TY0CMKdG4BiTgtFUw40NO3PDzc4du5OcsrnuKm5W_UiUIrl-9hWhGqTT_cIaT2mHvGeHKyzDnKwekpva35CpSzrrhjLl0Aw';
		video.addEventListener('loadedmetadata',function() {
		  video.play();
		});
	}
	*/
	
	//미리보기 사이즈
	MOBILE_PAGE.contents.setVideoPlayerBinding(bbsIdx);

	


};

//스크린 가로 세로에 따른 처리 - portrait, landscape
MOBILE_PAGE.contents.setMobileConetnsScreenView = function(changeMode){
	console.log('MOBILE_PAGE.contents.setMobileConetnsScreenView', changeMode);
	
	//가로 본능
	if(changeMode == 'landscape'){
		//$('#mobile-container-deep-30').find('.mobile_view_wrap .v_content_num').css({'margin-top':'5px'});
		//$('#mobile-container-deep-30').find('.mobile_wrap-contents-modal-view ').removeClass('video_fiexed');
		$('.mobile_wrap-contents-modal-view').removeClass('video_fixed btn_fixed');
		
	//세로 본능		
	}else{
	
		console.log('fixed~~~');
		var playerH = 235;
		if($('#mobile-view-video-js-video-player_html5_api').data('vh') > 0){
			var playerH = $('#mobile-view-video-js-video-player_html5_api').data('vh');
			console.log('playerH', playerH);
			playerH = parseInt(playerH) + 5;	
		}
		
		console.log('playerH', playerH);
		//$('#mobile-container-deep-30').find('.mobile_view_wrap .v_content_num').css({'margin-top': playerH+'px'});
		//$('#mobile-container-deep-30').find('.mobile_wrap-contents-modal-view ').addClass('video_fiexed');
	}
	
	
	$('.mobile_wrap-contents-modal-view').removeClass('landscape portrait').addClass(changeMode);
	window.scrollTo(0,0);
	
}


//비디오 플레이어 높이 초기화
MOBILE_PAGE.contents.setVideoPlayerBinding = function(bbsIdx)
{
	console.log('setVideoPlayerBinding', bbsIdx);
	//동영상 플레이어 제거
	//return;
	
	if(MOBILE_COMMON.NEW_VIDEO_PLAYER){
		//MOBILE_COMMON.NEW_VIDEO_PLAYER.reset();
		
		MOBILE_COMMON.NEW_VIDEO_PLAYER.dispose();
		$('.mobile-contents-view-top-player-area').empty();
		MOBILE_COMMON.NEW_VIDEO_PLAYER = null;
		
	}
	
	
			
	var $targetEle = $('#mobile-view-video-js-preview-contents-'+bbsIdx);
	if($targetEle.length < 0){
		console.log('empty prev area');
		return;
	}
	
	var eleData = $targetEle.data();
	console.log('eleData', eleData);
	if(isDefined(eleData) == false){
		console.log('empty eleData');
		return;
	}
	
	var vPoster = '';
	if(isDefined(eleData.poster)){
		vPoster = eleData.poster;
	}
	var actionType = 'M_STREAM';
	if(isDefined(eleData.action_type)){
		actionType = eleData.action_type;
	}
	
	//회전방향 변경되었을 경우
	var changeOrientationScreen = function(){
		var changeMode = 'landscape';
		var isAndroid = /(android)/i.test(navigator.userAgent);
		if(isAndroid){
		    if(screen.width < screen.height){
		        //portrait mode on Android
		        changeMode = 'portrait';
		    }
		} else {
		    if(window.orientation == 0){
		        //portrait mode iOS and other devices
		        changeMode = 'portrait';
		    }
		}
		if($('#mobile-container-deep-30').hasClass('show')){
			MOBILE_PAGE.contents.setMobileConetnsScreenView(changeMode);
		}	
	};
	var vEleId = 'mobile-view-video-js-video-player';
	//미리보기가 지원하지 않는 콘텐츠
	var isBlockVideo = false;
	var isVideoClass = 'mobile_prev';
	var isTopClass = 'prev';
	if(isDefined(eleData.url) == false){
		eleData.url = '//github.com/mediaelement/mediaelement-files/blob/master/big_buck_bunny.mp4?raw=true';
		isBlockVideo = true;
		var isVideoClass = 'mobile_live';
		var isTopClass = 'live';
		/*
		$('.mobile_view_wrap').find('.login_check_area').hide();
		var videoHtml = MOBILE_TEMPLETE.VIDEO.getMobileEmptyPrevHtml(eleData, vPoster);
		//$targetEle.hide();
		console.log('empty url');
		$targetEle.html(videoHtml);
		//changeOrientationScreen();
		
		
		//MOBILE_COMMON.contentsMobileVideoJsVideoInit(vEleId);
		//return;
		*/
	}
	if(actionType == 'M_CARTOON_VIEWER'){
		var videoHtml = MOBILE_TEMPLETE.VIDEO.getMobileEmptyPrevHtml(eleData, vPoster);
	}else{
		var videoHtml = MOBILE_TEMPLETE.VIDEO.getMobilePrevVedeoHtml(vEleId, eleData.url, vPoster, isBlockVideo, eleData);	
	}
	//console.log('videoHtml', videoHtml);
	if(isDefined(videoHtml)){
		$targetEle.html(videoHtml).addClass(isVideoClass);
	}
	$('.v_top_player_area').removeClass('live prev').addClass(isTopClass);
		
	if(utility.disk.checkIsLogin() != true){
		$('.mobile_view_wrap').find('.login_check_area').show();
	}else{
		$('.mobile_view_wrap').find('.login_check_area').hide();
	}
		
	
	//미리보기 바인딩
	if($('#mobile-view-video-js-preview-contents-'+bbsIdx).length > 0){
		setTimeout(function(){
		  	//MOBILE_COMMON.contentsMobilePreviewVideoInit(bbsIdx);
		  	MOBILE_COMMON.contentsMobileVideoJsVideoInit(vEleId);
		  },500);
	}
	
	return;
				
}

MOBILE_PAGE.contents.pageInit = function(info, params){
	console.log('MOBILE_PAGE.contents.pageInit');

	var linkType;
	if( params['link']){
		linkType = params['link'];
	}
	var bbsIdx = params['idx'];
	var $infoEle = $('#'+info.target);
	var isLoaded = 0;	//1-container, 2- view data
	if($infoEle.length < 1){
		$infoEle = $('.contents-view-container');

	}
	var infoData = $($infoEle).data();
	console.log('infoData', infoData);
	if(isDefined(infoData.loaded)){
		isLoaded = infoData.loaded;
	}

	if(isDefined(bbsIdx) == false){
		if(isDefined(infoData.idx)){
			bbsIdx = parseInt(infoData.idx);
		}
	}
	var linkType = 'category';
	if(params['link']){
		linkType = params['link'];
	}

	var seller_page;
	if(params['page']){
		if(isDefined(params['page']) && $.isNumeric(params['page'])){
			seller_page = params['page'];
		}
	}

	//view가 비어 있으면 새로 가져온다
	if(isLoaded < 1 || $infoEle.text().length < 100){
		console.log('empty mobile view contents');
		var sendViewData =
		{
			idx		: bbsIdx,
			link	: linkType,
			page	: seller_page,
		}
		console.log('sendViewData', sendViewData);
		MOBILE_COMMON_FUN.getMobileContentsView(sendViewData, MOBILE_PAGE.contents.afterBinding);
	}else{
		console.log('has view data load');
		MOBILE_PAGE.contents.afterBinding(bbsIdx);
	}
};


//판매자 : 처음 콘텐츠 가져오기
MOBILE_PAGE.contents.setSellerContentsFirstLoad = function($spyEle){
	console.log('MOBILE_PAGE.contents.setSellerContentsFirstLoad');

	if(isDefined($spyEle) == false){
		return;
	}
	if($spyEle.length < 1){
		return;
	}
	var spyData = $spyEle.data();
	console.log(spyData);

	if(isDefined(spyData.info) == false){
		return;
	}

	$infoEle = $('#'+spyData.info);
	if($infoEle.length < 1){
		return;
	}

	var eleData = $infoEle.data();
	//eleData.page = 1;
	eleData.next_page = 1;
	if(eleData.page != 1){
		eleData.next_page = eleData.page;
	}
	eleData.fc_page = 1;
	eleData.info = spyData.info;
	console.log('eleData', eleData);

	MOBILE_PAGE.getMoreSellerOtherContentsListData(eleData, true);
	return;
};




//판매자 다른 콘텐츠 더가져오기
MOBILE_PAGE.getMoreSellerOtherContentsListData = function(eleData, isFirst){
	console.log('MOBILE_PAGE.getMoreSellerOtherContentsListData');
	console.log('eleData', eleData);
	//var eleData = $slickTarget.data();
	if(isDefined(eleData.idx) == false || isDefined(eleData.page) == false || isDefined(eleData.next_page) == false){
		return;
	}

	if(isDefined(isFirst) == false){
		isFirst = false;
	}

	var nextPage = 1;
	if(isDefined(eleData.next_page)){
		nextPage = parseInt(eleData.next_page);
	}

	if(isFirst == false && nextPage > parseInt(eleData.total_page)){
		console.log('end page');
		return;
	}

	//페이지 정보 가져오기
	var isFcPage = 0;
	if(nextPage == 1 || isFirst == true){
		isFcPage = 1;
	}
	//성인인증 여부
	var isAdultMember =utility.disk.checkIsAdultMember();
	console.log('isAdultMember', isAdultMember);
	
	var successFunGetSellerContentsList = function(data){
		console.log('successFunGetSellerContentsList', data);


		if(isDefined(data.seller_contents_list)){
			var $innerHtmlTarget;
			if(isDefined(eleData.target)){
				$innerHtmlTarget = $('#'+eleData.target);
			}else{
				$innerHtmlTarget = $('.view.seller-contensts');
			}


			var bbsListHtml = [];
			var bbsListData = data.seller_contents_list;
			var bbsListCount = bbsListData.list.length;
			var diskBbs = null;
			for(var i =0; i < bbsListCount; i++){
				diskBbs = new Contents_list(i+1, 1, 'seller_contents');
				diskBbs.is_adult_member = isAdultMember;
				diskBbs.setData(bbsListData.list[i]);
				//console.log(diskBbs);
				bbsListHtml[i] = diskBbs.getMobileSellerContentsListHtml(eleData.bbs, data.seller_contents_list.page);
			}
			//bbsListHtml = [];
			$innerHtmlTarget.html(bbsListHtml.join(''));

			if(isDefined(eleData.info) == true){
				$infoEle = $('#'+eleData.info);
				var saveData = {
					page : parseInt(data.seller_contents_list.page),
					limit : parseInt(data.seller_contents_list.limit),
				};

				if(saveData.page == 1 || data.seller_contents_list.force_page == 1){
					if(isDefined(data.seller_contents_list.total_page)){
						saveData.total_page = parseInt(data.seller_contents_list.total_page);
					}
					if(isDefined(data.seller_contents_list.total_count)){
						saveData.total_count = parseInt(data.seller_contents_list.total_count);
					}

					if(saveData.total_page > 0){
						$infoEle.find('.next.btn-view-seller-contents.disabled').removeClass('disabled');
					}
				}

				$infoEle.data(saveData);
			}
		}
	};

	var sendData = {
		idx		: eleData.idx,
		page	: nextPage,
		limit	: eleData.limit,
		is_mobile	: 1,
		fc_page	: isFcPage
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CONTENTS.SELLER_CONTENTS_LIST,
		data		: sendData,
		success_fun	: successFunGetSellerContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};





//코멘트 : 코멘트 처음 불러오기
MOBILE_PAGE.contents.setCommentFirstLoad = function($infoEle){
	console.log('MOBILE_PAGE.contents.setCommentFirstLoad');
	console.log($infoEle);
	if(isDefined($infoEle) == false){
		console.log('not info');
		return;
	}
	if($infoEle.length < 1){
		return;
	}
	var eleData = $infoEle.data();
	console.log(eleData);

	if(isDefined(eleData.idx) == false){
		console.log('not idx');
		return;
	}

	if(isDefined(eleData.count) == true){
		if(eleData.count < 1){
			console.log('empty comment count');
			$(".btn-more-comment").hide();  //2019-10-14 omh 댓글더보기 처리 hide
			return;
		}

	}

	var successLoadFirstComment = function(data){
		console.log('successLoadFirstComment');
		console.log(data);
	};

	var sendData = {
		idx		: eleData.idx,
		page	: 1,
		t		: 'contents',
		target	: eleData.target,
		info	: eleData.info,
		o		: eleData.owner,
	};
	console.log('sendData', sendData);
	MOBILE_COMMON.COMMENT.setCommentList(sendData, successLoadFirstComment);
};

//코멘트 : 코멘트 더 가져오기
/*
MOBILE_PAGE.contents.getCommentMoreCommentData = function(thisEle){
	console.log('MOBILE_PAGE.contents.getCommentMoreCommentData');
	if(isDefined(thisEle) == false){
		return;
	}

	if($(thisEle).hasClass('disabled') == true){
		console.log('disabled');
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

//코멘트 : 만족도 평가
MOBILE_PAGE.contents.onclickContentsViewCommentRatting = function(thisEle){

	console.log('rating btn');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.grade)){
		$('#'+eleData.target).val(eleData.grade);
	}
	var formEle = 'contentsViewCommentWriteForm';
	if(isDefined(eleData.form)){
		formEle = eleData.form;
	}

	$('.btn-comment-rating.active').removeClass('active');
	$(thisEle).addClass('active');


};


//코멘트 작성후 view 정보 업데이트
MOBILE_PAGE.contents.setCommentDataUpdateViewEle = function(data, upType){
	console.log('MOBILE_PAGE.contents.setCommentDataUpdateViewEle', upType);
	console.log(data);

	if(isDefined(data.idx) == false){
		console.log('empty idx');
		return;
	}

	var changeType = 'new';
	var bbsIdx = data.idx;
	if(upType == 'del'){
		changeType = 'del';
		if(isDefined(data.target)){
			bbsIdx = data.target
		}
	}

	//view 속성 수정
	$contentsViewEle = $('#wrap-contents-mobile-view-'+bbsIdx);
	if(isDefined(data.up_data.bbs)){
		//update like cnt
		if(data.up_data.bbs.like > 0){
			var $targetEle = $('#contents-view-good-count-'+bbsIdx);
			var beforeLike = $targetEle.data('cnt');
			if(isDefined(beforeLike) == false){
				beforeLike = 0;
			}
			var nextLike = beforeLike + 1;
			if(changeType == 'del'){
				nextLike = beforeLike - 1;
			}
			if(nextLike < 1) { nextLike = 0;}

			console.log('nextLike', nextLike);
			$targetEle.data('cnt', nextLike);
			$contentsViewEle.find('.contents-view-like-cnt-txt').text(disk_number_format(nextLike));

		}
		//update dislike cnt
		if(data.up_data.bbs.dislike > 0){
			var $targetEle = $('#contents-view-bad-count-'+bbsIdx);
			var beforeDislike = $targetEle.data('cnt');
			if(isDefined(beforeDislike) == false){
				beforeDislike = 0;
			}
			var nextDislike = beforeDislike + 1;
			if(changeType == 'del'){
				nextDislike = beforeDislike - 1;
			}
			if(nextDislike < 1) { nextDislike = 0;}

			console.log('nextDislike', nextDislike);
			$targetEle.data('cnt', nextDislike);
			$contentsViewEle.find('.contents-view-dislike-cnt-txt').text(disk_number_format(nextDislike));
		}

		//update comment cnt
		if(data.up_data.bbs.comment > 0){
			var $targetEle = $('#contents-view-comment-count-'+bbsIdx);
			var beforeComment = $targetEle.data('cnt');
			if(isDefined(beforeComment) == false){
				beforeComment = 0;
			}
			var nextComment = beforeComment + 1;
			if(changeType == 'del'){
				nextComment = beforeComment - 1;
			}
			if(nextComment < 1) { nextComment = 0;}
			console.log('nextComment', nextComment);
			$targetEle.data('cnt', nextComment);
			$contentsViewEle.find('.contents-view-comment-cnt-txt').text(disk_number_format(nextComment));
		}
	}
};


//찜하기
MOBILE_PAGE.addContentsMemberWishList = function(thisEle){
	console.log('MOBILE_PAGE.getMoreSellerOtherContentsListData');
	if(utility.disk.checkIsLogin() != true){
		fc_alert('로그인 후 찜하기가 이용가능하십니다.');
		return;
	}

	if($(thisEle).hasClass('active')){
		$.ambiance({message: '이미 찜하신 콘텐츠입니다.', type: 'alert-warning'});
		return;
	}

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.idx) == false){
		return;
	}

	var successFunSetWishContentsList = function(data){
		console.log('successFunSetWishContentsList', data);

		if(isDefined(eleData.target) == true){
			var beforeCnt = 0;
			var beforeCntData = $('#'+eleData.target).text();
			if(isDefined(beforeCnt) == true && $.isNumeric(beforeCnt) == true){
				beforeCnt = parseInt(beforeCntData);
			}

		 	$('#'+eleData.target).text(disk_number_format(beforeCnt + 1));

			//disk_number_format
		}
		var alertMsg = '찜목록에 선택한 콘텐츠를 추가하였습니다.';
		var msgType = 'alert-danger';
		if(data.is_ok != 1){
			msgType = 'alert-warning';
		}
		if(isDefined(data.show_msg)){
			alertMsg = data.show_msg;
		}
		$.ambiance({message: alertMsg, type: msgType});
		$(thisEle).addClass('active');
	};

	var sendData = {
		idx		: eleData.idx
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MEMBER_SET_WISHLIST,
		data		: sendData,
		success_fun	: successFunSetWishContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

MOBILE_PAGE.contents.onclickContentsBuy = function(thisEle){
	console.log('MOBILE_PAGE.contents.onclickContentsBuy');
	
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.bbs) == false || isDefined(eleData.file) == false){
		disk_alert('선택된 콘텐츠가 없습니다.');
		return;
	}
	
	var $bbsInfoEle = $(eleData.info+'-'+eleData.bbs);
	var isAdultFlag = $bbsInfoEle.find('input[name=contentsModalViewBbsIsAdult]').val(); 
	
	//성인인증여부
	if(isAdultFlag == 1){
		if(utility.disk.checkIsAdultMember() != true){
			GO_REAL_NAME();
			return;		
		}	
	}
	var sendData =
	{
		is_mobile	: 1,
		deviceType	: 0,
		bbsIdx		: null,
		fileIdx		: null,
		actionType	: 'M_STREAM',
		payType		: 'cache',
		searchKeyword	: '',
		lastIdx		: '',
	}
	

	if(isDefined(eleData.bbs) == false){
		disk_alert('다운로드할 콘텐츠를 선택해 주세요.');
		return;
	}
	sendData.bbsIdx = parseInt(eleData.bbs);
	
	if(isDefined(eleData.file) == false){
		disk_alert('다운로드할 콘텐츠를 선택해 주세요.');
		return;
	}
	sendData.fileIdx = parseInt(eleData.file);

	if(isDefined(eleData.action_type) == false){
		disk_alert('다운로드할 콘텐츠를 선택해 주세요.');
		return;
	}
	sendData.actionType = eleData.action_type;
	
	
	var btnType = 'stream';
	if(isDefined(eleData.type) == true){
		btnType = eleData.type;
	}
	//콘텐츠 다운로드 : 체크
	if(btnType == 'm_down'){
		if(checkMobileDeviceAgent() == 'IOS'){
			disk_alert('모바일 다운로드는 안드로이드 전용 서비스입니다.');
			return;
		}
		
		var openIntentOnpleApp = function(){
			COMMON_MOBILE_DOWNLOAD.openIntentOnpleApp('m_open', sendData.bbsIdx);
			return;
		};
		
		if(isMobileOnplayWebviewAgent() != true){
			disk_alert('모바일 다운로드는 앱 전용 서비스입니다.', openIntentOnpleApp);
			return;	
		}
	}

	if(isDefined(eleData.pay) == true){
		sendData.payType = eleData.pay;
	}
	if(isDefined($('#disk_search_form_keyword').val()) == true){
		sendData.searchKeyword = $('#disk_search_form_keyword').val();
	}
	
	console.log('sendData', sendData);
	
	var successMobilePayActionFun = function(data){
		console.log('successMobilePayActionFun');
		console.log(data);
		
		//재다운로드 버튼
		$('#wrap-contents-mobile-view-'+sendData.bbsIdx).addClass('redown-contents');
		
		
		//mobile down
		if(data.download.is_mobile_down == 1){
			COMMON_MOBILE_DOWNLOAD.contentsDownloadWithApp(data.download);
			return;
			
		}else if(data.download.is_cartoon == 1){
			if(isDefined(data.download.mobile_cartoon_url) == false){
				disk_alert('실시간 볼 수 있는 콘텐츠가 없습니다.');
				return;
			}
			if(data.download.mobile_cartoon_url.length < 1){
				disk_alert('실시간 볼 수 있는 콘텐츠가 없습니다.');
				return;
			}
			MOBILE_CARTOON.mobileCartoonStart(data.download.mobile_cartoon_ext, data.download.mobile_cartoon_url);
			return;
			
		}else{
			if(isDefined(data.download.mobile_stream_url) == false){
				disk_alert('재생할 파일이 없습니다.');
				return;
			}
			//alert(data.download.mobile_stream_url);
			if(isDefined(data.download.mobile_stream_url)){
				MOBILE_COMMON.contentsMobilePayStreamVideoInit(sendData.bbsIdx, data.download.mobile_stream_url);	
			}	
		}
	};
	
	
	COMMON_MOBILE_DOWNLOAD.actionMobileContentsPay(sendData, successMobilePayActionFun);
	
};


/*
	var sViewport = utility.ui.viewport();
	console.log('sViewport', sViewport);
	var vWidth = sViewport.width;
	var vHeight = sViewport.height;
	var isWide = false;
	if(vWidth > vHeight){
		isWide = true;
	}
	var topMenuHeight = 52;
	var setMinHeight = 210;
	var wideHeight = vWidth;
	if(isWide == true){
		setMinHeight = vHeight - topMenuHeight;
	}else{
		setMinHeight = parseInt(vWidth * (9/16));
	}
	console.log('setMinHeight', setMinHeight);
	var setCss = {
		'max-height': setMinHeight+'px',
		'min-height': setMinHeight+'px',
		'max-width': '100%'
	};
	console.log('setCss', setCss);
	
	//$('.mobile-contents-view-top-player-area').css(setCss);
	//$('.mobile_video_player').css({'max-height':setMinHeight+'px'});
	
	//inset vedeo html
	
	console.log('$(window).width()', $(window).width());
	var windowWidth = $(window).width();
	var setVideoHeight = windowWidth * (9/16);
	console.log('setVideoHeight', setVideoHeight);
	$('.mobile-contents-view-top-player-area video').css('height', setVideoHeight+'px');
	
	
	
	//미리보기 바인딩
	
	if($('#mobile-view-video-js-preview-contents-'+bbsIdx).length > 0){
		setTimeout(function(){
		  	//MOBILE_COMMON.contentsMobilePreviewVideoInit(bbsIdx);
		  	MOBILE_COMMON.contentsMobileVideoJsVideoInit(vEleId);
		  },500);
	}
	
	
	//$('.mobile-contents-view-top-player-area').css(setCss);
	//$('.mobile_preview_player').css(setCss);
	//$('.mejs__container').css(setCss);
	
	var getVideoHtml = function(eleData, cData)
	{
		console.log('getVideoHtml',eleData);
		console.log('getVideoHtml',cData);
		var rtHtml = '';
		rtHtml +='<video class="mobile_preview_player" id="onplay_mobile_preview_player_'+eleData.idx+'" preload="none" style="max-width:100%;min-height:'+cData['max-height']+';" data-poster="'+eleData.poster+'">';
		rtHtml +='	<source type="video/mp4" class="mobileViewVideoPlayerSource" src="'+eleData.url+'"/>';
		rtHtml +='	지원하지 않는 브라우져입니다.';
		rtHtml +='</video>';
		
		return rtHtml;
	};
	
	if(isDefined(bbsIdx) == false){
		return;
	}
	var $videoInfoEle = $('#mobile-view-video-js-preview-contents-'+bbsIdx);
	if($videoInfoEle.length < 1){
		return;
	}
	$videoInfoEle.empty();
	console.log('$videoInfoEle', $videoInfoEle);
	
	
	var videoSetHtml = getVideoHtml($videoInfoEle.data(), setCss);
	console.log('videoSetHtml', videoSetHtml);
	if(isDefined(videoSetHtml) == false){
		console.log('videoSetHtml', videoSetHtml);
		return;
	}
	$videoInfoEle.css(setCss).html(videoSetHtml);
	
	$('.mobile-contents-view-top-player-area').css(setCss);
	$('.mobile_preview_player').css(setCss);
	
	
	//미리보기 바인딩
	if($('#mobile-view-video-js-preview-contents-'+bbsIdx).length > 0){
		setTimeout(function(){
		  	MOBILE_COMMON.contentsMobilePreviewVideoInit(bbsIdx);
		  },500);
	}	
*/	

/*
//스크롤 스파이 - 판매자 최신 자료, 코멘트
	var $scrollSpyEle = $('.mobile-contents-view-scroll-spy-wrap');
	if($scrollSpyEle.length > 0){
		console.log('$scrollSpyEle has length');
		$scrollSpyEle.on('scrollSpy:enter', function() {
			var eleData = $(this).data();
			console.log('enter', eleData);

			var spyType = 'comment';
			if(isDefined(eleData.type)){
				spyType = eleData.type;
			}
			//load -0 첨, 1-불러오는중, 2-완료
			var isLoaded = 0;
			if(isDefined(eleData.load)){
				isLoaded = parseInt(eleData.load);
			}

			if(isLoaded > 0){
				console.log('already loaded:'+spyType);
				return;
			}

			console.log('enter:', $(this).attr('id'));



			if(isLoaded == 0){
				//코멘트
				if(eleData.type == 'comment'){
					console.log('comment not loaded');
					var sendData = {
						idx		: eleData.idx,
						page	: 1,
						t		: 'contents',
						target	: 'disk-contents-view-comment-list-warp-'+eleData.idx,
						info	: 'comment-list-contents-view-pagnation-controller',
						o		: eleData.owner,
					}
					console.log('sendData', sendData);
					MOBILE_COMMON.COMMENT.setCommentList(sendData);
					$(this).data('load', 1);

				//채널 최신 자료
				}else if(eleData.type == 'seller_contents'){
					console.log('seller_contents not loaded');

					eleData.target	= 'disk-channel-contents-list-warp-'+eleData.idx;
					eleData.infoEle = $(this);

					$(this).data('load', 1);
					if(isDefined(eleData.cate) == false || isDefined(eleData.search) == false){
						return;
					}
					console.log('enter', eleData);

					//console.log('sendData', sendData);
					//MOBILE_COMMON.COMMENT.setCommentList(sendData);
					//PAGE_CHANNEL_ON_VIEW.getLastContentsList(eleData);



				}
			}


		});
		var $scrollSpy =  $scrollSpyEle.scrollSpy();
	}
	*/
