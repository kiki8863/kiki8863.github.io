/*
* channel view
*/


MOBILE_PAGE.channel_view = {};
MOBILE_PAGE.channel_view.DATA = {
	ACTION			: null,
	CHANNEL_TYPE	: null,
	CHANNEL_IDX	: null,
	LAST_HASH		: null,
	CONTAINER_ELE	: '#mobile-container-deep-31'
};

MOBILE_PAGE.channel_view.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.channel_view.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.channel_view.init(showContainerInfo, hashPrams);
	
}

MOBILE_PAGE.channel_view.defaultBinding = function(){
	console.log('MOBILE_PAGE.channel_view.defaultBinding');	
	
};

MOBILE_PAGE.channel_view.init = function(info, params){
	console.log('MOBILE_PAGE.channel_view.init');
	
	var actionType = params['!action'];
	var channelType = params['type'];
	var channelIdx = params['idx'];
	if(actionType != 'channel_view' || isDefined(channelType) == false){
		console.log('action type err');
		return;
	}
	
	if(isDefined(channelType) == false || isDefined(channelIdx) == false){
		console.log('empty idx');
		GO_TOP_SP_CATEGORY(91000);
		return;
	}
	
	MOBILE_PAGE.channel_view.DATA.ACTION = actionType;
	MOBILE_PAGE.channel_view.DATA.CHANNEL_TYPE = channelType;
	
	console.log('movieView', channelIdx);
	if(isDefined(channelIdx) == true){
		console.log('channel view');
		MOBILE_PAGE.channel_view.DATA.CHANNEL_IDX = channelIdx;
	}
	var $containerEle = $(MOBILE_PAGE.channel_view.DATA.CONTAINER_ELE);
	
	if(MOBILE_PAGE.channel_view.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		var listText = $containerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.channel_view.setChannelViewData(channelType, channelIdx);
			return;
		}
		MOBILE_PAGE.channel.view.start(channelType, channelIdx, true);
		return;
	}
	
	
	MOBILE_PAGE.channel_view.setChannelViewData(channelType, channelIdx);
};


//채널 세부 정보 보기 view
MOBILE_PAGE.channel_view.setChannelViewData = function(channelType, channelIdx){
	console.log('MOBILE_COMMON.openMobileChannelContentsView');
	console.log('channelType', channelType);
	console.log('channelIdx', channelIdx);
	if(isDefined(channelType) == false || isDefined(channelIdx) == false){
		console.log('empty idx');
		return;
	}
	var isHash = true;
	var successAjaxViewData = function(data){
		console.log('successAjaxViewData');
		//console.log(data);
		var viewHtml = null;
		if(data == 'ERR_ONPLAY_USER_NOT_LOGIN'){
        	console.log('data:', data);
			disk_alert('로그인이 필요한 콘텐츠입니다.', GO_LOGIN);
			return;
        }else if(data == 'ERR_ONPLAY_NOT_ADULT_REGISTER'){
        	console.log('data:', data);
			disk_alert('성인 인증이 필요한 콘텐츠입니다.', GO_REAL_NAME);
			return;
        }else if(data == 'ERR_ONPLAY_CHANNEL_NOT_FOUND_DATA'){
        	console.log('data:', data);
			disk_alert('채널 콘텐츠 정보를 확인할수 없습니다.', GO_HOME);
        	//history.back(true);
        	
			return;
        }else{
			if(data.length < 100 ||  data.indexOf('wrap-channel-contents-modal-view') < 0){
        		console.log('err modal html');
				disk_alert('채널 콘텐츠 정보를 확인할수 없습니다', goHomeFun);
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			//console.log(viewHtml);
			var $containerEle = $(MOBILE_PAGE.channel_view.DATA.CONTAINER_ELE);
			if($containerEle.length > 0){
				$('.mobile-container.show').removeClass('show');
				$containerEle.html(viewHtml).data({loaded : 1, idx : channelIdx, type: channelType}).addClass('show');
				$containerEle.find('.btn-top-back').data('target', 'back');
				MOBILE_PAGE.channel_view.DATA.LAST_HASH = location.hash;
				
				MOBILE_PAGE.channel.view.start(channelType, channelIdx, isHash);
				return;	
			}
		}
	};
	
	var contentsUrl;
	if(channelType == 'movie'){
		contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CHANNEL.MOBILE.MOVIE_VIEW+''+channelIdx;	
	}else if(channelType == 'broadcast'){
		contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CHANNEL.MOBILE.BROADCAST_VIEW+''+channelIdx;
	}
	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var formData = {
		is_mobile	: 1,
		is_cache	: 0
	};
	var ajaxData = 
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};




MOBILE_PAGE.channel.view = {};
MOBILE_PAGE.channel.view.DATA = {
	ACTION_TYPE		: 'channel_view',
	CHANNEL_TYPE	: null,
	CHANNEL_IDX		: null,
	LAST_HASH		: null,
	IS_HASH			: 0,
	ELE	: {
		wrap	 	: 'wrap-channel-contents-modal-view',
		info		: '.channel-theme-page-end-spy'
	},
};

MOBILE_PAGE.channel.view.start = function(channelType, channelIdx, isHash){
	
	console.log('MOBILE_PAGE.channel.view.start');
	console.log('channelType', channelType);
	console.log('channelIdx', channelIdx);
	console.log('isHash', isHash);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	MOBILE_PAGE.channel.view.DATA.IS_HASH = 0;
	if(isHash == 1){
		MOBILE_PAGE.channel.view.DATA.IS_HASH = 1;
	}
	
	if(isDefined(channelType) == true){
		MOBILE_PAGE.channel.view.DATA.CHANNEL_TYPE = channelType;
	}
	
	if(isDefined(channelIdx) == true){
		if($.isNumeric(channelIdx)){
			MOBILE_PAGE.channel.view.DATA.CHANNEL_IDX = channelIdx;
		}
		
	}
	
	
	MOBILE_PAGE.channel.view.defaultBinding(channelType, channelIdx);
	
	MOBILE_PAGE.channel.view.init(channelType, channelIdx);
	
}

//scroll spy : 채널 관련 최신 콘텐츠 리스트 가져오기 
MOBILE_PAGE.channel.view.loadChannelNewContentsList = function($contentsListWrapEle){
	console.log('MOBILE_PAGE.channel.view.loadChannelNewContentsList');	
	console.log($contentsListWrapEle);
	if(isDefined($contentsListWrapEle) == false){
		var $wrapEle = $('#'+MOBILE_PAGE.channel.view.DATA.ELE.wrap+'-'+MOBILE_PAGE.channel.view.DATA.CHANNEL_TYPE+'-'+MOBILE_PAGE.channel.view.DATA.CHANNEL_IDX);
		$contentsListWrapEle = $wrapEle.find('.channel-view-contents-list-wrap');
		//$commentListWrapEle = $contentsEle.find('.channel-comment-list-wrap');
	}
	
	var eleData = $contentsListWrapEle.data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.idx) == true && isDefined(eleData.load) == true){
		if(eleData.load < 1){
			MOBILE_PAGE.channel.view.getLastContentsList(eleData, $contentsListWrapEle);
			$contentsListWrapEle.data('load', 1);	
		}
	}
};

//scroll spy : 채널 관련 최신 코멘트 리스트 가져오기
MOBILE_PAGE.channel.view.loadChannelCommentList = function($commentListWrapEle){
	console.log('MOBILE_PAGE.channel.view.loadChannelCommentList');	
	console.log($commentListWrapEle);
	if(isDefined($commentListWrapEle) == false){
		var $wrapEle = $('#'+MOBILE_PAGE.channel.view.DATA.ELE.wrap+'-'+MOBILE_PAGE.channel.view.DATA.CHANNEL_TYPE+'-'+MOBILE_PAGE.channel.view.DATA.CHANNEL_IDX);
		$commentListWrapEle = $wrapEle.find('.channel-comment-list-wrap');
	}
	
	var eleData = $commentListWrapEle.data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.idx) == true && isDefined(eleData.load) == true){
		if(eleData.load < 1){
			MOBILE_PAGE.channel.view.setChannelCommentFirstLoad($commentListWrapEle);
			$commentListWrapEle.data('load', 1);	
		}
	}
	
	
	
};

MOBILE_PAGE.channel.view.defaultBinding = function(channelType, channelIdx){
	console.log('MOBILE_PAGE.channel.view.defaultBinding');
	console.log('channelType', channelType);
	console.log('channelIdx', channelIdx);
	
	
	if(MOBILE_PAGE.channel.view.DATA.IS_HASH == true){
		
		GO_TOP();
		
		//common binding
		//툴팁
		//MOBILE_COMMON.setDiskToolTipster();
		
		//image lazy
		MOBILE_COMMON.setImageLazy();
		
		//scroll
		MOBILE_COMMON_SCROLL.setDiskMobileScrollSpy(MOBILE_PAGE.channel.view.DATA.ACTION_TYPE, MOBILE_PAGE.channel.view.loadChannelNewContentsList, MOBILE_PAGE.channel.view.loadChannelCommentList);
		/*
		//스크롤 스파이 - 최신자료, 코멘트
		$(window).off('scroll');
		
		var $wrapEle = $('#'+MOBILE_PAGE.channel.view.DATA.ELE.wrap+'-'+channelType+'-'+channelIdx);
		if($wrapEle.length > 0){
			MOBILE_COMMON_SCROLL.setDiskMobileModalScrollSpy('channel_view', $wrapEle
			, function(eleA){
				MOBILE_PAGE.channel.view.loadChannelNewContentsList(eleA);
			}, function(eleB){
				MOBILE_PAGE.channel.view.loadChannelCommentList(eleB);
			}, $(window));	
		}
		*/
		
	}else{
		//go top
		GO_MODAL_TOP();
		MOBILE_COMMON.setImageLazy();
		
		//스크롤 스파이 - 최신자료, 코멘트
		var $wrapEle = $('#'+MOBILE_PAGE.channel.view.DATA.ELE.wrap+'-'+channelType+'-'+channelIdx);
		$wrapEle.find('.channel-comment-list-wrap').removeClass('loaded-data').data('page', 0);
		
		if($wrapEle.length > 0){
			MOBILE_COMMON_SCROLL.setDiskMobileModalScrollSpy('channel_view', $wrapEle
			, function(eleA){
				MOBILE_PAGE.channel.view.loadChannelNewContentsList(eleA);
			}, function(eleB){
				MOBILE_PAGE.channel.view.loadChannelCommentList(eleB);
			});	
		}
	
	
	}
	
	
	//image lazy
	//MOBILE_COMMON_SCROLL.setModalImageLazy();
	
	//slick steel cut
	var $slickTarget = $('.channel-view-steel-cut-slick');
	console.log('$slickTarget',$slickTarget);
	if($slickTarget.find('.slick-item').length > 1){
		if($slickTarget.hasClass('slick-initialized') != true){
			$slickTarget.on('init', function(slick){
			  console.log('init');
			  console.log(slick);
			  $('.btn-channel-steel-cut-slick').removeAttr("style");
			});
			
			$slickTarget.slick({
				lazyLoad: 'ondemand',
				infinite: true,
				arrows : true,
				draggable: false,
				swipe: true,
				prevArrow : $('.channel-movie-steel-cut-slick-prev'),
				nextArrow : $('.channel-movie-steel-cut-slick-next'),
				dots	: false
			});
			
			$slickTarget.on('afterChange', function(event, slick, currentSlide){
				console.log('afterChange',currentSlide);
				$('.channel-movie-steel-cut-slick-current-page').text((currentSlide + 1));
			});
		}
	}		
	
	//image lazy
	if($( ".horizontal-scroller").length > 0 && isDefined($.lazyLoadXT) == true){
		console.log('horizontal-scroller lazy');
	
		$( ".horizontal-scroller").find('.disk-image-lazy').lazyLoadXT({
			selector	: '.disk-image-lazy',
			scrollContainer : '.horizontal-scroller'
		});
		//$.lazyLoadXT.scrollContainer = '.horizontal-scroller';
	}
	
	//평점  별표 - stars
	if($('#halfRatingStars-'+channelIdx).length > 0){
		console.log('halfRatingStars');
		utility.halfRatingStars('#halfRatingStars-'+channelIdx);	
	}
	
	//check login
	if(utility.disk.checkIsLogin() == true){
		//코멘트 로그인 덮개 열림
		$('.disk-need-login-contents').remove();	
	}
	
	//slick destory
	/*
	var $loadedChapterSlick = $('.mobile-channel-broadcast-chapter-swipe');
	if($loadedChapterSlick.length > 0){
		if($loadedChapterSlick[0].hasOwnProperty('slick') == false){
			console.log('unslick ~~~~~~~~');
			//$loadedChapterSlick.slick('unslick');
		}
	}
	*/
	
	
	//broadcast-chapter swip
	var $broChapterSlick = $('#mobile-channel-broadcast-chapter-swipe-'+channelIdx);
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
		$('.mobile-channel-view-broadcast-chapter-wrap').empty();
	}
	
	
};


MOBILE_PAGE.channel.view.init = function(){
	console.log('MOBILE_PAGE.channel.view.init');
};





//최신 자료 가져오기
MOBILE_PAGE.channel.view.getLastContentsList = function(eleData, $contentsListWrapEle){
	console.log('MOBILE_PAGE.channel.view.getLastContentsList', eleData);
	
	console.log($contentsListWrapEle);
	if(isDefined($contentsListWrapEle) == false){
		var $wrapEle = $('#'+MOBILE_PAGE.channel.view.DATA.ELE.wrap+'-'+MOBILE_PAGE.channel.view.DATA.CHANNEL_TYPE+'-'+MOBILE_PAGE.channel.view.DATA.CHANNEL_IDX);
		$contentsListWrapEle = $wrapEle.find('.channel-view-contents-list-wrap');
		//$commentListWrapEle = $contentsEle.find('.channel-comment-list-wrap');
	}
	
	if(isDefined(eleData.search) == false || isDefined(eleData.cate) == false || eleData.type != 'channel'){
		console.log('err prams');
		return;
	}
	
	var sendData = {
		k			: eleData.search,	//kewword
		c			: eleData.cate,		//select category
		m			: eleData.cate,		//cate1
		l			: 5,		//limit
		page		: 1,
		is_mobile	: 1,		//is mobile
		nc			: 1,			//no count
		is_channel  : 1
	};
	
	//성인인증 여부
	var isAdultMember =utility.disk.checkIsAdultMember();
	console.log('isAdultMember', isAdultMember);
	
	var successFunGetLastSearchContentsList = function(data){
		console.log('successFunGetSearchContentsList', data);
		
		if(isDefined(data.search_data)){
			
			var bbsListData = data.search_data.contents_list;
			var bbsListHtml = [];
			var diskBbs = null;
			var contentsCount = 0;
			for(var i =0; i < bbsListData.length; i++){
				diskBbs = new Contents_list(i+1, 0, 'search');
				diskBbs.is_adult_member = isAdultMember;
				diskBbs.setData(bbsListData[i]);
				//console.log(diskBbs);
				bbsListHtml[i] = diskBbs.getMobileRankingCantegoryListHtml('channel_on');
				contentsCount++;
			}
			//contentsCount = 0;
			var innerContentsHtml = bbsListHtml.join('');
			if(isDefined(eleData.target) == true){
				$('#'+eleData.target).html(innerContentsHtml);
			}
			
			if(isDefined(eleData.infoEle)){
				$contentsListWrapEle.data('load', 2);
			}
			
			if(contentsCount < 1){
				$contentsListWrapEle.find('.channel-new-content-list.no-list').addClass('show');
			}
		}
			
	};
	
	COMMON_ACTION.SEARCH.getSearchContentsList(sendData, successFunGetLastSearchContentsList);
};



//코멘트 : 코멘트 처음 불러오기
MOBILE_PAGE.channel.view.setChannelCommentFirstLoad = function($infoEle){
	console.log('MOBILE_PAGE.channel.view.setChannelCommentFirstLoad');
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
		t		: 'channel',
		target	: eleData.target,
		info	: eleData.info,
	};
	console.log('sendData', sendData);
	MOBILE_COMMON.COMMENT.setCommentList(sendData, successLoadFirstComment);
};

//코멘트 : 코멘트 더 가져오기
/*
MOBILE_PAGE.channel.view.getChannelCommentMoreCommentData = function(thisEle){
	console.log('MOBILE_PAGE.channel.view.getCommentMoreCommentData');
	if(isDefined(thisEle) == false){
		return;
	}

	if($(thisEle).hasClass('disabled') == true){
		console.log('disabled');
		$(thisEle).addClass('no-more');
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

//채널 추천하기
MOBILE_PAGE.channel.view.onclickMobileChannelRecommend = function(thisEle){
	console.log('MOBILE_PAGE.channel.view.onclickChannelRecommend');	
	var eleData = $(thisEle).data();
	console.log(eleData);
	
	if(isDefined(eleData.idx) == false){
		console.log('idx err');
		disk_alert('정보가 올바르지 않습니다.');
		return;
	}
	
	//로그인 채크
	if(utility.disk.checkIsLoginWithModal() != true){
		return;
	}
	
	if($(thisEle).hasClass('active')){
		$.ambiance({message: '이미 추천하셨습니다.', type: "alert-danger"});
		return;
	}
	
	$(thisEle).addClass('active');
	
	var successChannelRecommendFun = function(data){
		console.log('successChannelRecommendFun');
		console.log(data);
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		
		if(isDefined(eleData.target)){
			var $numEle = $(eleData.target);
			if($numEle.length > 0){
				$numEle.text(disk_number_format(data.ok_cnt));
			}
		}
	};
	COMMON_ACTION.CHANNEL.setRecommend(eleData, successChannelRecommendFun);
};
