
MOBILE_COMMON_SCROLL = {};
MOBILE_COMMON_SCROLL.DATA =
{
	ON_LOAD		: 	false,
	$M_WINDOWS	:	null,
	ACTION 		:	null,
};

//공통 스크롤 처리
MOBILE_COMMON_SCROLL.setCommonScroll = function(actionId){
	console.log('MOBILE_COMMON_SCROLL.setCommonScroll', actionId);

	var actionType;
	if(isDefined(actionId)){
		actionType = actionId;
	}else{
		actionType = MOBILE_COMMON.DATA.ACTION;
	}
	/*
	console.log('actionType', actionType);
	var $mWindow = $(window);
	var commonScrollHandler = function(event){
		var mTop = $mWindow.scrollTop();

		//console.log('mTop', mTop);
	};

	$mWindow.scroll(commonScrollHandler);
	*/

	MOBILE_COMMON_SCROLL.setDiskMobileScrollSpy(actionType);

};

//mobile contents view scroll
MOBILE_COMMON_SCROLL.VIEW = {};
MOBILE_COMMON_SCROLL.CHANNEL_VIEW = {};
MOBILE_COMMON_SCROLL.CATEGORY = {};
MOBILE_COMMON_SCROLL.HEADER = {};
MOBILE_COMMON_SCROLL.callbackContentsFun = null;
MOBILE_COMMON_SCROLL.setDiskMobileScrollSpy = function(actionType, callbackContents, callbackComment){
	console.log('MOBILE_COMMON_SCROLL.setDiskMobileScrollSpy', actionType);
	console.log('callbackContents', callbackContents);
	console.log('callbackComment', callbackComment);
	
	MOBILE_COMMON_SCROLL.callbackContentsFun = callbackContents;
	MOBILE_COMMON_SCROLL.callbackCommentListFun = callbackComment;

	if(isDefined(actionType) == false){
		return;
	}

	var isFirstLoadedWinScroll = false;
	if(isDefined(MOBILE_COMMON_SCROLL.DATA.$M_WINDOWS) == false){
		isFirstLoadedWinScroll = true;
		MOBILE_COMMON_SCROLL.DATA.$M_WINDOWS = $(window);
	}



	//mobile common header
	var $mobileCommonHeader = $('.mobile-common-header');	//common header ele
	MOBILE_COMMON_SCROLL.CATEGORY.headerEleHeight = 66;										//로고 높이
	if($mobileCommonHeader.find('.h_top').length > 0){
		MOBILE_COMMON_SCROLL.CATEGORY.headerEleHeight = $mobileCommonHeader.find('.h_top').outerHeight();
	}
	MOBILE_COMMON_SCROLL.HEADER.isFixed = false;

	var $mobileCommonGoTopBtn = $('#mobile-bottom-top-btn-0');	//common go top btn
	var $navEle = $('#mobile-bottom-navs-0');
	var wHeight = $(window).height();
	var viewPort = utility.ui.screenViewport();
	var commonTopHeaderHeight = 58;
	var $channelLlistContainerEle = $('#mobile-container-deep-20');
	var isChannelCategoryFixed = false;		//채널리스트에서 카테고리 fixed 여부

	if(actionType == 'contents'){

		if($('.contents-view-container').hasClass('show') == false){
			console.log('view container not show');
			return;
		}
		
		//return;


		MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle = $('.wrap-contents-mobile-view');							//view ele
		if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.length < 0){
			console.log('not loaded view ele');
			return;
		}
		var $actionBtnScrollSpyEle = $('.mobile-contents-view-action-btn-area');						//다운버튼 시작점 ele
		MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle =  $('.mobile-contents-view-comment-list-wrap');				//코멘트 시작점 ele
		MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle =  $('.mobile-contents-view-seller-contents-wrap');		//판매자 최신 콘텐츠 시작점 ele
		var $userAreaSpyEle = $('.spy-contents-viwe-file-area');

		MOBILE_COMMON_SCROLL.VIEW.topTitleOutHeight = 58;																		//탑 타이틀 높이
		if($('.mobile-contents-view-top-title-area').length > 0){
			MOBILE_COMMON_SCROLL.VIEW.topTitleOutHeight = $('.mobile-contents-view-top-title-area').outerHeight();
		}
		MOBILE_COMMON_SCROLL.VIEW.winHeight = window.innerHeight;
		MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight = 58;
		MOBILE_COMMON_SCROLL.VIEW.btnElemTop	= 380;
		if($actionBtnScrollSpyEle.length > 0){
			MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight = $actionBtnScrollSpyEle.outerHeight();
			MOBILE_COMMON_SCROLL.VIEW.btnElemTop	= $actionBtnScrollSpyEle.offset().top;
		}
		console.log('btnElemTop', MOBILE_COMMON_SCROLL.VIEW.btnElemTop);
		
		MOBILE_COMMON_SCROLL.VIEW.guideTop	= 29;
		if($('.v_preview_area-guide.preview').length > 0){
			MOBILE_COMMON_SCROLL.VIEW.guideTop = $('.v_preview_area-guide.preview').outerHeight();
		}
		
		//var btnElemTop	= $actionBtnScrollSpyEle.offset().top;
		var userElemTop = 438;
		if($userAreaSpyEle.length > 0){
			userElemTop	= $userAreaSpyEle.offset().top;
		}
		MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop = userElemTop;					//버튼 변경 시점

		//최신자료
		MOBILE_COMMON_SCROLL.VIEW.isSellerContesntsLoaded = false;
		MOBILE_COMMON_SCROLL.VIEW.scElemTop = 736;
		if(MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle.length > 0){
			MOBILE_COMMON_SCROLL.VIEW.scElemTop 	= MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle.offset().top;
		}
		//코멘트
		MOBILE_COMMON_SCROLL.VIEW.isCommentLoaded = false;
		MOBILE_COMMON_SCROLL.VIEW.commentElemTop = 1000;
		if(MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.length > 0){
			MOBILE_COMMON_SCROLL.VIEW.commentElemTop 	= MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.offset().top;
		}


	}
	else if(actionType == 'channel_view'){
		console.log('set scroll channel_view');
		
		var $contentsEle = $('#mobile-container-deep-31');
		if($contentsEle.length < 1){
			return;
		}
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsEle = $contentsEle;
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.headerEleHeight = 58;
		if($contentsEle.find('.f_top').length > 0){
			MOBILE_COMMON_SCROLL.CHANNEL_VIEW.headerEleHeight = $contentsEle.find('.f_top').outerHeight();
		}



		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnEle = $contentsEle.find('.channel-view-btn-wrap');
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnTargetFixedEle = $contentsEle.find('.btn-fixed-section');
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle = $contentsEle.find('.channel-view-contents-list-wrap');
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle = $contentsEle.find('.channel-comment-list-wrap');
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.intContentsListTop = 1000;
		if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.length > 0){
			//contentsListHeight	= $contentsListWrapEle.outerHeight();
			//intContentsListTop	= $contentsListWrapEle.offset().top;
			//$contentsListWrapEle.position();
			//MOBILE_COMMON_SCROLL.CHANNEL_VIEW.intContentsListTop	= MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.position().top;
			MOBILE_COMMON_SCROLL.CHANNEL_VIEW.intContentsListTop	= MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.offset().top;
		}
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.userElemTop = 58;
		if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnEle.length > 0){
			//userElemTop	= $btnEle.offset().top;
			console.log('btn has');
			//userElemTop	= $btnEle.position().top;
			userElemTop	= MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnEle.offset().top;
			//userElemTop	= $scrollSpyEle.find('.content_info').position().top;

		}else{
			userElemTop	= 0;
		}
		console.log('userElemTop', MOBILE_COMMON_SCROLL.CHANNEL_VIEW.userElemTop);
		console.log('intContentsListTop', MOBILE_COMMON_SCROLL.CHANNEL_VIEW.intContentsListTop);


		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.hasFixedBtnTop = false;
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList = false;
		MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCommentList = false;
	}

	var channelViewScrollDefaultLoadData = function(){
		console.log('channelViewScrollDefaultLoadData');
		console.log('default scroll channel view');
		console.log(MOBILE_COMMON_SCROLL.CHANNEL_VIEW);
		console.log('wHeight', wHeight);
		if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.length  > 0){
			var intContentsListTop = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.offset().top;
			console.log('intContentsListTop', intContentsListTop);
			if(intContentsListTop < wHeight){
				console.log('==============call channel view contents list====================');
				if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.hasClass('loaded-data') == false){
					MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.addClass('loaded-data').data('page', 1);
					MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList = true;
					if (typeof MOBILE_COMMON_SCROLL.callbackContentsFun === "function"){
						MOBILE_COMMON_SCROLL.callbackContentsFun.call(null, MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle);
						//return;
					}
				}else{
					MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList = true;
				}
			}
		}

		console.log(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle);

		if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle.length > 0){
			var commentListTop	= MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle.offset().top;
			console.log('commentListTop', commentListTop);
			console.log('wHeight', wHeight);
			if(commentListTop < wHeight){
				console.log('-----------call modal view comment list--------------');
				if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle.hasClass('loaded-data') == false){
					MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle.addClass('loaded-data').data('page', 1);
					MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCommentList = true;
					if (typeof MOBILE_COMMON_SCROLL.callbackCommentListFun === "function"){
						MOBILE_COMMON_SCROLL.callbackCommentListFun.call(null, MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle);
						return;
					}
				}else{
					MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCommentList = true;
				}
			}
		}
	}


	if(MOBILE_COMMON_SCROLL.DATA.ON_LOAD == true){
		console.log('loaded scroll');
		MOBILE_COMMON_SCROLL.DATA.ACTION = actionType;
		console.log('MOBILE_COMMON_SCROLL.DATA.ON_LOAD', MOBILE_COMMON_SCROLL.DATA.ON_LOAD);
		if(actionType == 'channel_view'){
			channelViewScrollDefaultLoadData();
		}
		return;
	}



	MOBILE_COMMON_SCROLL.DATA.ACTION = actionType;

	console.log('MOBILE_COMMON_SCROLL.DATA.ACTION', MOBILE_COMMON_SCROLL.DATA.ACTION);
	
	var $homeContainerEle = $('.mobile-container.home-container');
	var homeContainerTop = $homeContainerEle.position().top;
	console.log('homeContainerTop', homeContainerTop);
	
	var homeCenterBannerTop = 850;
	var isLoadHomeCenterBanner = false;
	var $scrollSpyEleBanner1 = $('.mobile-home-scroll-spy-wrap-banner-1');
	if($scrollSpyEleBanner1.length > 0){
		homeCenterBannerTop	= $scrollSpyEleBanner1.position().top;
	}
	console.log('homeCenterBannerTop', homeCenterBannerTop);
	
	var homeCenterPayBannerTop = 2300;
	var isLoadHomeCenterPayBanner = false;
	var $scrollSpyEleBannerCenter = $('.mobile-home-scroll-spy-wrap-banner-center');
	if($scrollSpyEleBannerCenter.length > 0){
		homeCenterPayBannerTop	= $scrollSpyEleBannerCenter.position().top;
	}
	console.log('homeCenterPayBannerTop', homeCenterPayBannerTop);
	
	
	var homeForyouThemeConentsTop = 1500;
	var isLoadHomeForyorThemeConnets = false;
	var $scrollSpyEleForyouTheme = $('#mobile-home-scroll-spy-wrap-foryou-theme');
	if($scrollSpyEleForyouTheme.length > 0){
		homeForyouThemeConentsTop	= $scrollSpyEleForyouTheme.position().top;
	}
	homeForyouThemeConentsTop = 1500;
	console.log('homeForyouThemeConentsTop', homeForyouThemeConentsTop);
	
	//홈은 스크롤링 제외
	if( MOBILE_COMMON.DATA.ACTION == 'home' || MOBILE_COMMON_SCROLL.DATA.ACTION == 'home'){

		//return;
	}

	console.log('MOBILE_COMMON_SCROLL.HEADER.isFixed', MOBILE_COMMON_SCROLL.HEADER.isFixed);


	if(isFirstLoadedWinScroll != true){
		console.log('not isFirstLoadedWinScroll', isFirstLoadedWinScroll);
		return;
	}
	
	//channel list
	var channelLoadedPage = 0;		//채널 현재 페이지
	var $scrollSpyEleFooter = $('#mobile-footer-common-1');
	
	MOBILE_COMMON_SCROLL.DATA.$M_WINDOWS.scroll(function(event){
			var currentTop = MOBILE_COMMON_SCROLL.DATA.$M_WINDOWS.scrollTop();
			//console.log('currentTop',currentTop);
			//console.log('wHeight', wHeight);
			//var cTop = cWindow.scrollTop();


			//home
			if( MOBILE_COMMON.DATA.ACTION == 'home' && MOBILE_COMMON_SCROLL.DATA.ACTION == 'home'){
				//console.log('homeCenterBannerTop', homeCenterBannerTop);
				
				if(isLoadHomeCenterBanner == false){
					var checkCentetBannerScroll = homeCenterBannerTop - wHeight - currentTop;
					//console.log('checkCentetBannerScroll', checkCentetBannerScroll);
					//banner 1 slick
					if(checkCentetBannerScroll < 0){
						if( $scrollSpyEleBanner1.data('loaded') != 1){
							console.log('spy new loaded');
							MOBILE_PAGE.home.slickBindingRightBanner();
							//MOBILE_PAGE.home.slickBindingCenterBanner();
							$scrollSpyEleBanner1.data('loaded', 1);
							isLoadHomeCenterBanner = true;
						}
					}
				}

				//banner 2 slick
				/*
				if(isLoadHomeCenterPayBanner == false){
					var checkCentetPayBannerScroll = homeCenterPayBannerTop - wHeight - currentTop;
					//console.log('checkCentetPayBannerScroll', checkCentetPayBannerScroll);
					if(checkCentetBannerScroll < 0){
						if($scrollSpyEleBannerCenter.data('loaded') != 1){
							//console.log('spy new loaded');
							MOBILE_PAGE.home.slickBindingCenterBanner();
							//MOBILE_PAGE.home.slickBindingRightBanner();
							$scrollSpyEleBannerCenter.data('loaded', 1);
							isLoadHomeCenterPayBanner = true;
						}
					}
				}
				*/
				/*
				var homeForyouThemeConentsTop = 2300;
				var isLoadHomeForyorThemeConnets = false;
				var $scrollSpyEleForyouTheme = $('#mobile-home-scroll-spy-wrap-foryou-theme');
				if($scrollSpyEleForyouTheme.length > 0){
					homeForyouThemeConentsTop	= $scrollSpyEleForyouTheme.position().top;
				}
				*/
				
				//추천 테마
				if(isLoadHomeForyorThemeConnets == false){
					var checkHomeForyouThemeScroll = homeForyouThemeConentsTop - wHeight - currentTop;
					//console.log('checkHomeForyouThemeScroll', checkHomeForyouThemeScroll);
					if(checkHomeForyouThemeScroll < 0){
						if($scrollSpyEleForyouTheme.data('loaded') != 1){
							console.log('theme spy new loaded');
							MOBILE_PAGE.home.setForyouThemeList();
							$scrollSpyEleForyouTheme.data('loaded', 1);
							isLoadHomeForyorThemeConnets = true;
						}
					}
				}
			}
			

			//console.log('MOBILE_COMMON.DATA.ACTION', MOBILE_COMMON.DATA.ACTION);
			//console.log('MOBILE_COMMON_SCROLL.DATA.ACTION', MOBILE_COMMON_SCROLL.DATA.ACTION);

			//홈은 카테고리 변화 제외
			if( MOBILE_COMMON.DATA.ACTION == 'home' && MOBILE_COMMON_SCROLL.DATA.ACTION == 'home'){

				//하단 네비 숨기기
				/*
				if(currentTop < 165){
					if($navEle.hasClass('show') == false){
						$navEle.addClass('show animated fadeInUp');
					}
				}else{
					if($navEle.hasClass('show')){
						$navEle.removeClass('show animated fadeInUp');
					}
				}
				*/

			}else if( MOBILE_COMMON.DATA.ACTION == 'contents' && MOBILE_COMMON_SCROLL.DATA.ACTION == 'contents'){
				//상단 버튼
				//세로인 경우만 - 500 미만
				if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('portrait') && viewPort.width < 500 ){
					
					//var btnPosition = $actionBtnScrollSpyEle.position().top;
					//console.log('btnPosition', btnPosition);
					var hasVideoPlayer = false;
					var videoH = 188;
					var getVideoH = 200;
					if(('.mobile-contents-view-top-player-area').length > 0){
						hasVideoPlayer = true;
						getVideoH = $('.mobile-contents-view-top-player-area').height();
						if(isDefined(getVideoH)){
							videoH = parseInt(getVideoH);
						}
					}else{
						getVideoH = 188;
					}
					console.log('getVideoH', getVideoH);
					console.log('videoH', videoH);
					console.log('currentTop', currentTop);
					
					//MOBILE_COMMON_SCROLL.VIEW.btnElemTop	= $actionBtnScrollSpyEle.offset().top;
					console.log('MOBILE_COMMON_SCROLL.VIEW.btnElemTop', MOBILE_COMMON_SCROLL.VIEW.btnElemTop);
					
					var checkBtnScroll_1 = MOBILE_COMMON_SCROLL.VIEW.topTitleOutHeight - currentTop;
					console.log('ck~~~~ checkBtnScroll_1:', checkBtnScroll_1);
					if(checkBtnScroll_1 < 0 ){
						if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('video_fixed') == false){
							console.log('change video fixed', currentTop);
							//MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.addClass('video_fixed').css({'margin-top': videoH+'px'});
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.find('.v-top-mobile-vedeo-empty').css({'height': videoH+'px'});
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.addClass('video_fixed');
							
						}
					}else{
						if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('video_fixed') == true){
							//MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.find('.v-top-mobile-vedeo-empty').css({'height': videoH+'px'});
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.removeClass('video_fixed');
						}
					}
					
                    //var btnElemOffTop	= $actionBtnScrollSpyEle.offset().top;
                    //console.log('btnElemOffTop', btnElemOffTop);
                    
					console.log('MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop', MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop);
					//var btnTop = $actionBtnScrollSpyEle.offset().top;
					console.log('MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight',MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight);
                    console.log('MOBILE_COMMON_SCROLL.VIEW.guideTop',MOBILE_COMMON_SCROLL.VIEW.guideTop);
                    //var btnTop = $actionBtnScrollSpyEle.offset().top;
                    //console.log('btnTop~~~~~~~',btnTop);
                    
					//var checkBtnScroll = MOBILE_COMMON_SCROLL.VIEW.btnElemTop + MOBILE_COMMON_SCROLL.VIEW.guideTop - currentTop;
                    //var checkBtnScroll = MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop - currentTop;
					//var checkBtnScroll = btnTop - currentTop;
                    //if(MOBILE_COMMON_SCROLL.VIEW.topTitleOutHeight )
                    //var checkBtnScroll = videoH + 112.5 - MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight - currentTop;
                    var titHeight = $('.mobile-contents-view-top-title-area').outerHeight();
                    var checkBtnScroll = currentTop - 38 - videoH;
					console.log('ck~~~~ checkBtnScroll:', checkBtnScroll);
					if(checkBtnScroll > 0){
						//console.log('ck~~~~ checkBtnScroll:', checkBtnScroll);
						if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('btn_fixed') == false){
							console.log('change fixed', currentTop);
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.addClass('btn_fixed');
							console.log('btn -h', MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight);
							console.log('videoH', videoH);
							
							//var btnTopH = parseInt(MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight) + getVideoH;
							//var btnTopH = getVideoH + 50;
							//console.log('btnTopH', btnTopH);
							//console.log($actionBtnScrollSpyEle);
							
							$('.mobile-contents-view-action-btn-area').css({'top':videoH+'px'});
							
						}
					}else if(MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop >= currentTop){
						//console.log('ck~~~~ changeBtnFixedTop:', MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop);
						if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('btn_fixed') == true){
							console.log('change  unfixed', currentTop);
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.removeClass('btn_fixed');
						}
					}
					
					//return;
					/*
					
					if(checkBtnScroll <= 17){
						//console.log('ck~~~~ checkBtnScroll:', checkBtnScroll);
						if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('btn_fixed') == false){
							console.log('change fixed', currentTop);
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.addClass('btn_fixed').css({'margin-top': MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight+'px'});
							console.log('btn -h', MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight);
							
							//var btnTopH = parseInt(MOBILE_COMMON_SCROLL.VIEW.actionBtnOutHeight) + getVideoH;
							var btnTopH = getVideoH + 50;
							console.log('btnTopH', btnTopH);
							$actionBtnScrollSpyEle.css({'top':btnTopH+'px'});
						}
					}else if(MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop >= currentTop){
						//console.log('ck~~~~ changeBtnFixedTop:', MOBILE_COMMON_SCROLL.VIEW.changeBtnFixedTop);
						if(MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.hasClass('btn_fixed') == true){
							console.log('change  unfixed', currentTop);
							MOBILE_COMMON_SCROLL.VIEW.$contentsViewEle.removeClass('btn_fixed').css({'margin-top': '0px'})
						}
					}
					*/
				}
				
				
				//최신 자료 불러오기
				if(MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle.length > 0 && MOBILE_COMMON_SCROLL.VIEW.isSellerContesntsLoaded != true){
					//console.log('check seller contents');
					var scElemTop 	= MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle.offset().top;
					var winInnerHeight = window.innerHeight;
					//var scSpyEle = MOBILE_COMMON_SCROLL.VIEW.scElemTop - (currentTop + MOBILE_COMMON_SCROLL.VIEW.winHeight);
					var scSpyEle = scElemTop - (currentTop +winInnerHeight);
					//console.log('scSpyEle', scSpyEle);
					if(scSpyEle < 10){
						console.log('load seller contents');
						if(MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle.hasClass('loaded') == false){
							MOBILE_PAGE.contents.setSellerContentsFirstLoad(MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle);
							MOBILE_COMMON_SCROLL.VIEW.$sellerContentsScrollSpyEle.addClass('loaded').data('load', 1);
							MOBILE_COMMON_SCROLL.VIEW.isSellerContesntsLoaded = true;
						}
					}
				}
				//코멘트 불러오기
				if(MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.length > 0  && MOBILE_COMMON_SCROLL.VIEW.isCommentLoaded != true){
					//console.log('check comment');
					//var commentElemTop 	= MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.offset().top;
					var commentElemTop 	= MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.offset().top;
					var winInnerHeight = window.innerHeight;
					//var spyEle = MOBILE_COMMON_SCROLL.VIEW.commentElemTop - (currentTop + MOBILE_COMMON_SCROLL.VIEW.winHeight);
					var spyEle = commentElemTop - (currentTop + winInnerHeight);
					//console.log('spyEle', spyEle);
					if(spyEle < 10){
						console.log('load comment');
						if(MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.hasClass('loaded') == false){
							MOBILE_PAGE.contents.setCommentFirstLoad(MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle);
							MOBILE_COMMON_SCROLL.VIEW.$commentScrollSpyEle.addClass('loaded').data('load', 1);
							MOBILE_COMMON_SCROLL.VIEW.isCommentLoaded = true;
						}
					}
				}

			//채널 리스트
			}else if( MOBILE_COMMON_SCROLL.DATA.ACTION == 'broadcast' || MOBILE_COMMON_SCROLL.DATA.ACTION == 'movie' || MOBILE_COMMON_SCROLL.DATA.ACTION == 'ani' || MOBILE_COMMON_SCROLL.DATA.ACTION == 'theme'){
				//var $channelLlistContainerEle = $('#mobile-container-deep-20');
				if($channelLlistContainerEle.length > 0 && $channelLlistContainerEle.hasClass('show')){
					//console.log('isChannelCategoryFixed', isChannelCategoryFixed);
					if(isChannelCategoryFixed == false){
						if(currentTop > commonTopHeaderHeight){
							if($channelLlistContainerEle.hasClass('scroll_fix_style') == false){
								console.log('scroll_fix_style');
								$channelLlistContainerEle.addClass('scroll_fix_style');
								isChannelCategoryFixed = true;
								/*
								//하단 내비 숨기기
								if($navEle.hasClass('show')){
									$navEle.removeClass('show animated fadeInUp');
								}
								*/
							}
						}
					}else if(isChannelCategoryFixed == true){
						if(currentTop <= commonTopHeaderHeight){
							if($channelLlistContainerEle.hasClass('scroll_fix_style') == true){
								console.log('scroll_fix_style');
								$channelLlistContainerEle.removeClass('scroll_fix_style');
								isChannelCategoryFixed = false;
								/*
								//하단 내비 보이기
								if($navEle.hasClass('show') == false){
									$navEle.addClass('show animated fadeInUp');
								}
								*/
							}
						}
					}

					//하단 네비 숨기기
					if(currentTop < commonTopHeaderHeight){
						if($navEle.hasClass('show') == false){
							$navEle.addClass('show animated fadeInUp');
						}
					}else{
						if($navEle.hasClass('show')){
							$navEle.removeClass('show animated fadeInUp');
						}
					}
					
					
					//페이지 넘김
					var footerTop = $scrollSpyEleFooter.offset().top;
					//console.log('footerTop', footerTop);
					//var dHeight = $(document).height();
					//console.log('dHeight', dHeight);
					//console.log('=============currentTop========',currentTop);
					if(MOBILE_COMMON_SCROLL.DATA.ACTION == 'movie'){
						var $channelSpyEle = $('#channel-movie-page-end-spy');
					}else if(MOBILE_COMMON_SCROLL.DATA.ACTION == 'broadcast'){
						var $channelSpyEle = $('#channel-broadcast-page-end-spy');
					}else if(MOBILE_COMMON_SCROLL.DATA.ACTION == 'ani'){
						var $channelSpyEle = $('#channel-ani-page-end-spy');
					}else if(MOBILE_COMMON_SCROLL.DATA.ACTION == 'theme'){
						var $channelSpyEle = $('#channel-theme-page-end-spy');
					}
					
					var curPage = $channelSpyEle.data('page');
					//console.log('channelLoadedPage', channelLoadedPage);
					//console.log('curPage', curPage);
					if(channelLoadedPage != curPage){
						if(footerTop < 1000 + currentTop){
							console.log('go new contents call');
							$channelSpyEle.trigger( "click");
							channelLoadedPage = curPage;
						}
					}

				}


			}else if( MOBILE_COMMON.DATA.ACTION == 'channel_view' && MOBILE_COMMON_SCROLL.DATA.ACTION == 'channel_view'){
				console.log('scroll channel_view');
				var hasFixedBtnTop = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.hasFixedBtnTop;
				//var loadCotnetsList = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList;
				var loadCommentList = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCommentList;
				MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList = false;


				//다운로드 버튼
				var userElemTop	= MOBILE_COMMON_SCROLL.CHANNEL_VIEW.userElemTop;
				var $contentsEle =  MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsEle;
				if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnEle.length > 0){
					userElemTop	= MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnEle.position().top;
					/*
					console.log('btn has');
					console.log('userElemTop', userElemTop);
					*/
				}else{
					userElemTop = 0;
				}
				if($contentsEle.find('.content_info').length > 0){
					topSectionHeight = $contentsEle.find('.content_info').outerHeight();
				}
				var headerEleHeight = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.headerEleHeight;
				//var checkScroll = userElemTop - headerEleHeight - 10;
				var checkScroll = userElemTop - headerEleHeight - currentTop;
				
				if(userElemTop > 0){
					var upCheckScroll = currentTop - topSectionHeight;
					var $btnTargetFixedEle = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$btnTargetFixedEle;
					console.log('hasFixedBtnTop', hasFixedBtnTop);
					if(hasFixedBtnTop == false){
						if(checkScroll < 0){
							if($btnTargetFixedEle.hasClass('scroll_style') == false){
								console.log('scroll_style');
								$btnTargetFixedEle.addClass('scroll_style');
								hasFixedBtnTop = true;
								MOBILE_COMMON_SCROLL.CHANNEL_VIEW.hasFixedBtnTop = true;
							}
						}
	
					}else if(hasFixedBtnTop == true){
						//if(upCheckScroll < 0 && checkScroll < 0){
						console.log('hasFixedBtnTop', hasFixedBtnTop);
						if(upCheckScroll < 0 && checkScroll < 0){
							if($btnTargetFixedEle.hasClass('scroll_style') == true){
								console.log('remove scroll_style')
								$btnTargetFixedEle.removeClass('scroll_style');
								hasFixedBtnTop = false;
								MOBILE_COMMON_SCROLL.CHANNEL_VIEW.hasFixedBtnTop = false;
							}
						}
					}
				}
				/*
				console.log('userElemTop', userElemTop);
				console.log('checkScroll', checkScroll);
				console.log('upCheckScroll', upCheckScroll);
				console.log('topSectionHeight', topSectionHeight);
				console.log('headerEleHeight', headerEleHeight);
				console.log('$btnTargetFixedEle', $btnTargetFixedEle.offset().top);
				//infoHeight	= $btnTargetFixedEle.outerHeight();
				*/



				//최신 콘텐츠
			 	var $contentsListWrapEle =  MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle;
			 	console.log($contentsListWrapEle);
			 	var intContentsListTop = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$contentsListWrapEle.offset().top;
			 	if(isDefined($contentsListWrapEle) && $contentsListWrapEle.length > 0){
					var contentsListTop	= $contentsListWrapEle.offset().top;
					//var checkContentsScroll = 	contentsListTop - wHeight;
					var checkContentsScroll = 	contentsListTop - wHeight - currentTop;
					console.log('checkContentsScroll', checkContentsScroll);
					console.log('MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList', MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList);
					if(checkContentsScroll < 0){
						//console.log('loadCotnetsList', loadCotnetsList);
						if(MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList != true){
							console.log('==============call channel view contents list====================');
							if($contentsListWrapEle.hasClass('loaded-data') == false){
								$contentsListWrapEle.addClass('loaded-data').data('page', 1);
								MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList = true;
								console.log('callbackContents', MOBILE_COMMON_SCROLL.callbackContentsFun);
								if (typeof MOBILE_COMMON_SCROLL.callbackContentsFun === "function"){
									MOBILE_COMMON_SCROLL.callbackContentsFun.call(null, $contentsListWrapEle);
									return;
								}
							}else{
								MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCotnetsList = true;
							}
						}
					}
				}
				/*
				console.log('checkContentsScroll', checkContentsScroll);
				console.log('contentsListTop', contentsListTop);
				console.log('wHeight', wHeight);
				console.log('intContentsListTop', intContentsListTop);
				console.log('checkContentsScroll', checkContentsScroll);
				*/


				//코멘트 리스트
				var $commentListWrapEle = MOBILE_COMMON_SCROLL.CHANNEL_VIEW.$commentListWrapEle;
				//var commentListTop	= $commentListWrapEle.offset().top;
				//var commentListTop	= $commentListWrapEle.offset().top;
				console.log('$commentListWrapEle', $commentListWrapEle);

				if($commentListWrapEle != null && $commentListWrapEle.length > 0){
					var commentListTop	= $commentListWrapEle.offset().top;
					var checkCommentListScroll = commentListTop - wHeight - currentTop;
					if(checkCommentListScroll < 0){
						if(loadCommentList != true){
							console.log('-----------call modal view comment list--------------');
							if($commentListWrapEle.hasClass('loaded-data') == false){
								$commentListWrapEle.addClass('loaded-data').data('page', 1);
								//loadCommentList = true;
								MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCommentList = true;
								if (typeof MOBILE_COMMON_SCROLL.callbackCommentListFun === "function"){
									MOBILE_COMMON_SCROLL.callbackCommentListFun.call(null, $commentListWrapEle);
									return;
								}
							}
						}else{
							MOBILE_COMMON_SCROLL.CHANNEL_VIEW.loadCommentList = true;
						}
					}
					//console.log('commentListTop', commentListTop);
					//console.log('checkCommentListScroll', checkCommentListScroll);
				}



			//mobile-common-header - 상단 카테고리 처리
			}else if($mobileCommonHeader.hasClass('show') == true){
				 //console.log('$mobileCommonHeader');
				 var headerEleHeight = MOBILE_COMMON_SCROLL.CATEGORY.headerEleHeight;
				 //console.log('headerEleHeight', headerEleHeight);
				 //console.log('MOBILE_COMMON_SCROLL.HEADER.isFixed', MOBILE_COMMON_SCROLL.HEADER.isFixed);
				 if(headerEleHeight < 1){
				 	headerEleHeight = 65;
				 }
				 if(currentTop > headerEleHeight){
				 	//if(MOBILE_COMMON_SCROLL.HEADER.isFixed != true){
				 	if($mobileCommonHeader.hasClass('menu') == false){
				 		$mobileCommonHeader.addClass('fixed menu');
				 		MOBILE_COMMON_SCROLL.HEADER.isFixed = true;
			 		}
				 }else{
				 	if(currentTop < headerEleHeight + 44){
			 			//if(MOBILE_COMMON_SCROLL.HEADER.isFixed == true){
						 	if($mobileCommonHeader.hasClass('menu')){
						 		$mobileCommonHeader.removeClass('fixed menu');
						 		MOBILE_COMMON_SCROLL.HEADER.isFixed = false;
					 		}
				 		//}
			 		}

				 }
			}

			//moble top btn
			if($mobileCommonGoTopBtn.hasClass('show') == true){
				if(currentTop > 165){
					$mobileCommonGoTopBtn.addClass('open');
				}else{
					$mobileCommonGoTopBtn.removeClass('open');
				}
			}
		});
		console.log('new scroll load');
		//MOBILE_PAGE.contents.DATA.V_SCROLL = true;
		MOBILE_COMMON_SCROLL.DATA.ON_LOAD = true;
		console.log(MOBILE_COMMON_SCROLL.DATA.$M_WINDOWS);

		//스크롤 감지 전
		if( MOBILE_COMMON.DATA.ACTION == 'channel_view' && MOBILE_COMMON_SCROLL.DATA.ACTION == 'channel_view'){
			channelViewScrollDefaultLoadData();
		}

	return;

};


//모달 스크롤 스파이
MOBILE_COMMON_SCROLL.SpyCallbackContentsFun = null;
	MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun = null;
	
MOBILE_COMMON_SCROLL.setDiskMobileModalScrollSpy = function(actionType, $contentsEle, callbackContents, callbackComment, $targetScroll){
	console.log('MOBILE_COMMON_SCROLL.setDiskMobileModalScrollSpy');
	
	MOBILE_COMMON_SCROLL.SpyCallbackContentsFun = callbackContents;
	MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun = callbackComment;
	console.log('MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun', MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun);
	
	if(isDefined(actionType) == false || isDefined($contentsEle) == false){
		console.log('empty action typ');
		return;
	}

	if($contentsEle.length < 1){
		console.log('$contentsEle empty');
		return;
	}
	var userElemTop = 340;
	var $btnEle, $btnTargetFixedEle, $contentsListWrapEle;
	var $commentListWrapEle = null;
	var $navEle = $('#mobile-bottom-navs-0');

	var headerEleHeight = 58;										//로고 높이
	if($contentsEle.find('.f_top').length > 0){
		headerEleHeight = $contentsEle.find('.f_top').outerHeight();
	}
	var topSectionHeight = 240;

	var wHeight = $(window).height();
	var intContentsListTop = 1000;

	/*
	var infoHeight = 400;
	var steelCutHeight = 400;
	var reviewCutHeight = 400;
	var contentsListHeight = 400;
	*/

	

	if(actionType == 'channel_view'){
		$btnEle = $contentsEle.find('.channel-view-btn-wrap');
		$btnTargetFixedEle = $contentsEle.find('.btn-fixed-section');
		$contentsListWrapEle = $contentsEle.find('.channel-view-contents-list-wrap');
		$commentListWrapEle = $contentsEle.find('.channel-comment-list-wrap');

		/*
		if($btnTargetFixedEle.length > 0){
			infoHeight	= $btnTargetFixedEle.outerHeight();
		}

		if($contentsEle.find('.channel-view-steel-cut-wrap').length > 0){
			steelCutHeight	= $contentsEle.find('.channel-view-steel-cut-wrap').outerHeight();
		}
		if($contentsEle.find('.channel-view-review-list-wrap').length > 0){
			reviewCutHeight	= $contentsEle.find('.channel-view-review-list-wrap').outerHeight();
		}
		*/
		if($contentsListWrapEle.length > 0){
			//contentsListHeight	= $contentsListWrapEle.outerHeight();
			//intContentsListTop	= $contentsListWrapEle.offset().top;
			//$contentsListWrapEle.position();
			intContentsListTop	= $contentsListWrapEle.position().top;
		}
		console.log('intContentsListTop', intContentsListTop);
	}
	else if(actionType == 'event_view'){
		$commentListWrapEle = $contentsEle.find('.event-comment-list-wrap');
		if($commentListWrapEle.hasClass('loaded-data') == true){
			$commentListWrapEle.removeClass('loaded-data');
		}
	}

	var hasFixedBtnTop = false;
	var loadCotnetsList = false;
	var loadCommentList = false;

	var $scrollSpyEle = $('#mobile-container-modal-page');
	if(isDefined($targetScroll) == true){
		$scrollSpyEle = $targetScroll;
	}
    /*
    if(!hasVerticalScrollBar($scrollSpyEle)){  //스크롤이 없을경우  omh 2020-01-30
        if(loadCommentList != true){
			console.log('-----------call modal view comment list--------------');
			if($commentListWrapEle.hasClass('loaded-data') == false){
				$commentListWrapEle.addClass('loaded-data').data('page', 1);
				loadCommentList = true;
				if (typeof MOBILE_COMMON_SCROLL.callbackCommentListFun === "function"){
					MOBILE_COMMON_SCROLL.callbackCommentListFun.call(null, $commentListWrapEle);
					return;
				}
			}
		}
    }
    */
    
    
	if($scrollSpyEle.length > 0){
		$scrollSpyEle.scroll(function() {
			var currentTop = $scrollSpyEle.scrollTop();
			var wTop = $(window).scrollTop();
			//console.log('modal currentTop', currentTop);
			//console.log('wTop', wTop);

			//하단 네비 숨기기
			if(currentTop < 65){
				if($navEle.hasClass('show') == false){
					$navEle.addClass('show animated fadeInUp');
				}
			}else{
				if($navEle.hasClass('show')){
					$navEle.removeClass('show animated fadeInUp');
				}
			}

			if(actionType == 'channel_view'){
				console.log('channel_view');

				//다운로드 버튼
				if($btnEle.length > 0){
					//userElemTop	= $btnEle.offset().top;
					console.log('btn has');
					userElemTop	= $btnEle.position().top;
					//userElemTop	= $scrollSpyEle.find('.content_info').position().top;

				}
				if($contentsEle.find('.content_info').length > 0){
					topSectionHeight = $contentsEle.find('.content_info').outerHeight();
				}
				var checkScroll = userElemTop - headerEleHeight - 10;
				var upCheckScroll = currentTop - topSectionHeight;
				if(hasFixedBtnTop == false){
					if(checkScroll < 0){
						if($btnTargetFixedEle.hasClass('scroll_style') == false){
							$btnTargetFixedEle.addClass('scroll_style');
							hasFixedBtnTop = true;
						}
					}

				}else if(hasFixedBtnTop == true){
					if(upCheckScroll < 0 && checkScroll < 0){
						if($btnTargetFixedEle.hasClass('scroll_style') == true){
							$btnTargetFixedEle.removeClass('scroll_style');
							hasFixedBtnTop = false;
						}
					}
				}

				console.log('userElemTop', userElemTop);
				console.log('checkScroll', checkScroll);

				/*
				console.log('upCheckScroll', upCheckScroll);
				console.log('topSectionHeight', topSectionHeight);
				console.log('headerEleHeight', headerEleHeight);

				console.log('$btnTargetFixedEle', $btnTargetFixedEle.offset().top);
				//infoHeight	= $btnTargetFixedEle.outerHeight();
				*/



				//최신 콘텐츠
				//var contentsListTop	= $contentsListWrapEle.offset().top;
				if(isDefined($contentsListWrapEle) && $contentsListWrapEle.length > 0){
					var contentsListTop	= $contentsListWrapEle.position().top;
					var checkContentsScroll = 	contentsListTop - wHeight;
					if(checkContentsScroll < 0){
						if(loadCotnetsList != true){
							console.log('==============call channel view contents list====================');
							if($contentsListWrapEle.hasClass('loaded-data') == false){
								$contentsListWrapEle.addClass('loaded-data').data('page', 1);
								loadCotnetsList = true;
								if (typeof MOBILE_COMMON_SCROLL.SpyCallbackContentsFun === "function"){
									MOBILE_COMMON_SCROLL.SpyCallbackContentsFun.call(null, $contentsListWrapEle);
									return;
								}
							}
						}
					}
				}
				/*
				console.log('checkContentsScroll', checkContentsScroll);
				console.log('contentsListTop', contentsListTop);
				console.log('wHeight', wHeight);
				console.log('intContentsListTop', intContentsListTop);
				console.log('checkContentsScroll', checkContentsScroll);
				*/





			}


			//코멘트 리스트
			//$commentListWrapEle;
			//var commentListTop	= $commentListWrapEle.offset().top;
			//console.log('$commentListWrapEle', $commentListWrapEle);
			if($commentListWrapEle != null && $commentListWrapEle.length > 0){
				var commentListTop	= $commentListWrapEle.position().top;
				var checkCommentListScroll = commentListTop - wHeight;
				//console.log('checkCommentListScroll', checkCommentListScroll);
				if(checkCommentListScroll < 0){
					if(loadCommentList != true){
						console.log('-----------call modal view comment list--------------');
						console.log($commentListWrapEle);
						console.log('MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun', MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun);
						if($commentListWrapEle.hasClass('loaded-data') == false){
							console.log('not loaded');
							$commentListWrapEle.addClass('loaded-data').data('page', 1);
							loadCommentList = true;
							if (typeof MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun === "function"){
								MOBILE_COMMON_SCROLL.SpyCallbackCommentListFun.call(null, $commentListWrapEle);
								return;
							}
						}
					}
				}
				//console.log('commentListTop', commentListTop);
				//console.log('checkCommentListScroll', checkCommentListScroll);
			}
		});



		console.log('scroll spy');

		if(actionType == 'channel_view'){
			//스크롤 전에 이미 데이타가 없으면
			var checkIntContentsScroll = intContentsListTop - wHeight - 110;
			console.log('checkIntContentsScroll', checkIntContentsScroll);
			console.log('intContentsListTop', intContentsListTop);
			console.log('wHeight', wHeight);

			if(checkIntContentsScroll < 0){
				if(loadCotnetsList != true){
					console.log('**********call channel view contents list************');
					if($contentsListWrapEle.hasClass('loaded-data') == false){
						$contentsListWrapEle.addClass('loaded-data');
						loadCotnetsList = true;
						if (typeof MOBILE_COMMON_SCROLL.SpyCallbackContentsFun === "function"){
							MOBILE_COMMON_SCROLL.SpyCallbackContentsFun.call(null, $contentsListWrapEle);
							return;
						}
					}
				}
			}
		}

	}
};



//mobile contents view scroll
MOBILE_COMMON_SCROLL.setMobileContestScrollSpyBack = function(bbsIdx){
	console.log('MOBILE_COMMON_SCROLL.setMobileContestScrollSpy', bbsIdx);

	if(isDefined(bbsIdx) == false){
		return;
	}

	//scroll spy
	var $cWindow = $(window);
	var $contentsViewEle = $('#wrap-contents-mobile-view-'+bbsIdx);							//view ele
	var $actionBtnScrollSpyEle = $('.mobile-contents-view-action-btn-area');						//다운버튼 시작점 ele
	var $commentScrollSpyEle =  $('#mobile-contents-view-comment-list-wrap-'+bbsIdx);				//코멘트 시작점 ele
	var $sellerContentsScrollSpyEle =  $('#mobile-contents-view-seller-contents-wrap-'+bbsIdx);		//판매자 최신 콘텐츠 시작점 ele
	var $userAreaSpyEle = $('.spy-contents-viwe-file-area');

	var topTitleOutHeight = 58;																		//탑 타이틀 높이
	if($('.mobile-contents-view-top-title-area').length > 0){
		topTitleOutHeight = $('.mobile-contents-view-top-title-area').outerHeight();
	}
	var actionBtnOutHeight = 58;
	var btnElemTop	= 380;
	if($actionBtnScrollSpyEle.length > 0){
		actionBtnOutHeight = $actionBtnScrollSpyEle.outerHeight();
		btnElemTop	= $actionBtnScrollSpyEle.offset().top;
	}
	console.log('btnElemTop', btnElemTop);
	//var btnElemTop	= $actionBtnScrollSpyEle.offset().top;
	var userElemTop = 438;
	if($userAreaSpyEle.length > 0){
		userElemTop	= $userAreaSpyEle.offset().top;
	}
	var winHeight = window.innerHeight;
	var changeBtnFixedTop = userElemTop;					//버튼 변경 시점

	//최신자료
	var isSellerContesntsLoaded = false;
	var scElemTop = 736;
	if($sellerContentsScrollSpyEle.length > 0){
		scElemTop 	= $sellerContentsScrollSpyEle.offset().top;
	}
	//코멘트
	var isCommentLoaded = false;
	var commentElemTop = 1000;
	if($commentScrollSpyEle.length > 0){
		commentElemTop 	= $commentScrollSpyEle.offset().top;
	}

	if($contentsViewEle.length > 0 ){
		$cWindow.scroll(function(event){
			//var cTop = cWindow.scrollTop();
			//console.log('cTop',cTop);
			//console.log('MOBILE_COMMON.DATA.ACTION', MOBILE_COMMON.DATA.ACTION);
			if( MOBILE_COMMON.DATA.ACTION == 'contents'){
				var currentTop = $cWindow.scrollTop();
				/*
				console.log('************************');
				console.log('currentTop', currentTop);
				console.log('winHeight', winHeight);
				console.log('************************');
				*/


				//var userElemTop	= $userAreaSpyEle.offset().top;
				//var btnElemTop	= $actionBtnScrollSpyEle.offset().top;
				var checkBtnScroll = btnElemTop - currentTop - topTitleOutHeight;
				/*
				console.log('---------btn---------------');
				//console.log('btnScrollTop', btnScrollTop);
				console.log('btnElemTop', btnElemTop);
				console.log('userElemTop', userElemTop);
				console.log('topTitleOutHeight', topTitleOutHeight);
				console.log('checkBtnScroll', checkBtnScroll);
				console.log('----------btn--------------');
				*/
				if(checkBtnScroll <= 0){
					//console.log('ck~~~~ checkBtnScroll:', checkBtnScroll);
					if($contentsViewEle.hasClass('btn_fixed') == false){
						console.log('change fixed', currentTop);
						$contentsViewEle.addClass('btn_fixed').css({'margin-top': actionBtnOutHeight+'px'});
					}
				}else if(changeBtnFixedTop >= currentTop){
					//console.log('ck~~~~ changeBtnFixedTop:', changeBtnFixedTop);
					if($contentsViewEle.hasClass('btn_fixed') == true){
						console.log('change  unfixed', currentTop);
						$contentsViewEle.removeClass('btn_fixed').css({'margin-top': '0px'})
					}
				}



				//최신 자료 불러오기
				if($sellerContentsScrollSpyEle.length > 0 && isSellerContesntsLoaded != true){
					console.log('check seller contents');
					//var scElemTop 	= $sellerContentsScrollSpyEle.offset().top;
					var scSpyEle = scElemTop - (currentTop + winHeight);
					if(scSpyEle < 10){
						console.log('load seller contents');
						if($sellerContentsScrollSpyEle.hasClass('loaded') == false){
							MOBILE_PAGE.contents.setSellerContentsFirstLoad($sellerContentsScrollSpyEle);
							$sellerContentsScrollSpyEle.addClass('loaded').data('load', 1);
							isSellerContesntsLoaded = true;
						}
					}
					/*
					console.log('----------seller contetns--------------');
					console.log('scElemTop', scElemTop);
					console.log('currentTop', currentTop);
					console.log('winHeight', winHeight);
					console.log('scSpyEle', scSpyEle);
					console.log('----------seller contetns--------------');
					*/

				}


				//코멘트 불러오기
				if($commentScrollSpyEle.length > 0  && isCommentLoaded != true){
					console.log('check comment');
					//var commentElemTop 	= $commentScrollSpyEle.offset().top;
					var spyEle = commentElemTop - (currentTop + winHeight);
					if(spyEle < 10){
						console.log('load comment');
						if($commentScrollSpyEle.hasClass('loaded') == false){
							MOBILE_PAGE.contents.setCommentFirstLoad($commentScrollSpyEle);
							$commentScrollSpyEle.addClass('loaded').data('load', 1);
							isCommentLoaded = true;
						}
					}
					/*
					console.log('----------coment--------------');
					console.log('commentElemTop', commentElemTop);
					console.log('winHeight', winHeight);
					console.log('spyEle', spyEle);
					console.log('----------coment--------------');
					*/

				}
			}
		});
		MOBILE_PAGE.contents.DATA.V_SCROLL = true;

		console.log($cWindow);
	}
	return;

};
