/*
* mobile home js
*/


MOBILE_PAGE.home = {};

MOBILE_PAGE.home.DATA = {
	SPY	:
	{
		BANNER_1	: null,
	}	
};

MOBILE_PAGE.home.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.home.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.home.defaultBinding();
	MOBILE_PAGE.home.pageInit();
	
	//utility.spinnerLoading.show();
}

MOBILE_PAGE.home.pageInit = function(){
	//top category position set
	/*
	if(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY){
		MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY.scrollTo(0,0);
	}
	*/
	
	MOBILE_PAGE.home.dataAfterBinding();
};

//home hash 관련 처리
MOBILE_PAGE.home.checkHomeHash = function(){
	console.log('MOBILE_PAGE.home.checkHomeHash');
		
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	var hashAction = null;
	if(hashPrams['!action']){
		hashAction = hashPrams['!action'];
		//startPage = loadedPage;
	}
	console.log('hashAction', hashAction);
	console.log(hashPrams);
	if(hashAction != 'home'){
		return;
	}
	
	var hashMain = null;
	if(hashPrams['main']){
		hashMain = hashPrams['main'];
	}
	
	var hashSub = null;
	if(hashPrams['sub']){
		hashSub = hashPrams['sub'];
	}
	
	if(isDefined(hashMain)){
		if(hashMain == 'company'){
			if(isDefined(hashSub)){
				GO_COMPANY(hashSub);	
			}
		}else if(hashMain == 'login'){
			
			GO_LOGIN();
			
		}
	}
	
};





MOBILE_PAGE.home.defaultBinding = function(){
	console.log('MOBILE_PAGE.home.defaultBinding');
	
	//realtime rank swip
	var $realRankSlick = $('.mobile-home-real-rank-swipe');
	if($realRankSlick.length > 0){
		if($realRankSlick[0].hasOwnProperty('slick') == false){
			setTimeout(function() {
				$realRankSlick.slick({
					lazyLoad: 'ondemand',
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					arrows : false,
					mobileFirst	: true,
					/*variableWidth: true,*/
					dotsClass : 'good_dots'
				});
			}, 50);
		}else{
			console.log('go slick 0');
			//$realRankSlick.slick('slickGoTo',"0");
			$realRankSlick.slick('setPosition');
		}
		
		$realRankSlick.on('init', function(event, slick, currentSlide, nextSlide){
		  console.log('==================slick int ==========================');
		});
		$realRankSlick.on('reInit', function(event, slick, currentSlide, nextSlide){
		  console.log('==================slick reInit ==========================');
		});
		
		$realRankSlick.on('setPosition', function(event, slick, currentSlide, nextSlide){
		  console.log('==================slick setPosition ==========================');
		});
		
		$realRankSlick.on('breakpoint', function(event, slick, currentSlide, nextSlide){
		  console.log('==================slick breakpoint ==========================');
		});
	}
			
		
		
	
	//main good contents list
	var $goodContetsSlick = $('#mobile_main_good_contents_slick');
	console.log($goodContetsSlick);
	if($goodContetsSlick.length > 0){
		if($goodContetsSlick[0].hasOwnProperty('slick') == true){
			//$goodContetsSlick.slick('slickPlay');
			$goodContetsSlick.slick('setPosition');
		}else{
			if($goodContetsSlick.find('.disk_slick_item').length > 1){
				$('#mobile_main_good_contents_slick').slick({
					lazyLoad: 'ondemand',
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: true,
					infinite: true,
					speed: 500,
					fade: true,
					autoplay: true,
					autoplaySpeed	: 2500,
					cssEase: 'linear',
					arrows : false,
					mobileFirst	: true,
					dotsClass : 'good_dots'
				});
			}
		}
	}
	
	var $bannerContetsSlick = $('#mhome-mobile_main_banner_slick');
	console.log($bannerContetsSlick);
	if($bannerContetsSlick.length > 0){
		if($bannerContetsSlick[0].hasOwnProperty('slick') == true){
			//$bannerContetsSlick.slick('slickPlay');
			$bannerContetsSlick.slick('setPosition');
		}else{
			if($bannerContetsSlick.find('.disk_slick_item').length > 1){
				$bannerContetsSlick.slick({
					lazyLoad: 'ondemand',
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					infinite: true,
					speed: 500,
					fade: true,
					autoplay: true,
					autoplaySpeed	: 2500,
					cssEase: 'linear',
					arrows : false,
					mobileFirst	: true,
					dotsClass : 'good_dots'
				});
			}
		}
	}
	
	
	
	var $footerBannerSlick = $('.mobile_main_footer_banner_slick');
	if($footerBannerSlick.find('.disk_slick_item').length > 1){
		if($footerBannerSlick[0].hasOwnProperty('slick') == true){
			//$targetSlick.slick('slickPlay');
			$footerBannerSlick.slick('setPosition');
			console.log('$footerBannerSlick setPosition');
		}
	}
	
	MOBILE_PAGE.home.checkHomeHash();
	
	
	
	//console.log(goodContetsSlick[0].hasOwnProperty('slick'));
	
	/*
	var $scrollSpyEleBanner1 = $('.mobile-home-scroll-spy-wrap-banner-1');
	if($scrollSpyEleBanner1.length > 0){
		if($scrollSpyEleBanner1[0].hasOwnProperty('slick') == true){
			$scrollSpyEleBanner1.slick('slickPlay');
		}else{
			if($scrollSpyEleBanner1.data('spy') != 1){
				$scrollSpyEleBanner1.on('scrollSpy:enter', function() {
					var eleData = $(this).data();
					console.log('enter', eleData);
					if(isDefined(eleData.loaded)){
						if(eleData.loaded != 1 && eleData.spy == 1){
							console.log('spy new loaded');
							MOBILE_PAGE.home.slickBindingRightBanner();
							$scrollSpyEleBanner1.data('loaded', 1);
						}
					}
				});
				var scSpy  =  $scrollSpyEleBanner1.scrollSpy();
				$scrollSpyEleBanner1.data('spy', 1);
				console.log('mobile-home-scroll-spy-wrap-banner-1 spy saved');
			}
		}
	}
	
	var $scrollSpyEleBannerCenter = $('.mobile-home-scroll-spy-wrap-banner-center');
	if($scrollSpyEleBannerCenter.length > 0){
		if($scrollSpyEleBannerCenter[0].hasOwnProperty('slick') == true){
			$scrollSpyEleBannerCenter.slick('slickPlay');
		}else{
			if($scrollSpyEleBannerCenter.data('spy') != 1){
				$scrollSpyEleBannerCenter.on('scrollSpy:enter', function() {
					var eleData = $(this).data();
					console.log('enter', eleData);
					if(isDefined(eleData.loaded)){
						if(eleData.loaded != 1 && eleData.spy == 1){
							console.log('spy new loaded');
							MOBILE_PAGE.home.slickBindingCenterBanner();
							$scrollSpyEleBannerCenter.data('loaded', 1);
						}
					}
				});
				var scSpy  =  $scrollSpyEleBannerCenter.scrollSpy();
				$scrollSpyEleBannerCenter.data('spy', 1);
				console.log('mobile-home-scroll-spy-wrap-banner-center spy saved');
			}
		}
	}
	*/
	
	//MOBILE_PAGE.home.slickBindingRightBanner();
	//MOBILE_PAGE.home.slickBindingCenterBanner();
	
};



//slick right banner 하단 배너
MOBILE_PAGE.home.slickBindingRightBanner = function(){
	console.log('MOBILE_PAGE.home.slickBindingRightBanner');
	//main right banner
	var $footerBannerSlick = $('.mobile_main_footer_banner_slick');
	if($footerBannerSlick.find('.disk_slick_item').length > 1){
		$footerBannerSlick.slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			infinite: true,
			speed: 500,
			fade: true,
			autoplay: true,
			autoplaySpeed	: 3000,
			cssEase: 'linear',
			arrows : false,
			dotsClass : 'good_dots'
		});
	}
};

//slick center banner : 결제 & 배너
/*
MOBILE_PAGE.home.slickBindingCenterBanner = function(){
	console.log('MOBILE_PAGE.home.slickBindingCenterBanner');
	//main main(center) banner 
	if($('.mobile_main_banner_slick').find('.disk_slick_item').length > 1){
		$('.mobile_main_banner_slick').slick({
			lazyLoad: 'ondemand',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			infinite: true,
			speed: 500,
			fade: true,
			autoplay: true,
			autoplaySpeed	: 3000,
			cssEase: 'linear',
			arrows : false,
			dotsClass : 'good_dots'
		});
	}
};
*/


//home - 추천 테마 
MOBILE_PAGE.home.setForyouThemeList = function(){
	console.log('MOBILE_PAGE.home.setForyouThemeList');
	var $scrollSpyEleForyouTheme = $('#mobile-home-scroll-spy-wrap-foryou-theme');
	var successFunHomeGetForyouContentsList = function(data){
		console.log('successFunHomeGetForyouContentsList');
		console.log(data);
		//서버 버전 체크
		if(isDefined(data.client_ver)){
			MOBILE_COMMON.checkClientVer(data.client_ver);	
		}
		
		if(isDefined(data.contents_html) == true){
			if(data.contents_html.length > 100){
				$scrollSpyEleForyouTheme.html(data.contents_html).data('loaded', 1).addClass('show has');
			}
		}			
		
		//탭 active 처리
		//$('.tab-foryou.active').removeClass('active');
		//$('.tab-foryou.tab-'+foryouType).addClass('active');
		MOBILE_PAGE.for_you.afterBinding();
		
	}
	
	MOBILE_PAGE.for_you.getForyouIndexData('home', successFunHomeGetForyouContentsList)
	
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.home.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.home.dataAfterBinding');
	
	//로그인 모달
	if(isBlockAdultDomain() == true && utility.disk.checkIsLogin() != true){
		GO_LOGIN('home');
		return;
	}
		
	var DF = get_disk_config(true);
	//이벤트 모달 처리
	var $homeEventModalEle = $('#disk-modal-mobile-home-event');
	if($homeEventModalEle.length > 0){
		if($homeEventModalEle.hasClass('open_modal')){
			var openModalEvent = false;
			$('.mobile-event-modal-dialog').removeClass('active');
			$('.mobile-event-modal-dialog').each(function (index, item) {
				var eleData = $(this).data();
				console.log('eleId', eleData);
				if(isDefined(eleData)){
					if(openModalEvent == true){
						return false;
					}
					if(isDefined(eleData.id) == false){
						return true;
					}
					if(isDefined(eleData.app)){
						if(eleData.app != 1 && isMobileOnplayWebviewAgent() ==  true){
							return true;
						}
					}
					if(isDefined(eleData.copy)){
						if(eleData.copy != 1 && isBlockAdultDomain() ==  true){
							return true;
						}
					}
					
					if(isDefined(eleData.login)){
						if(eleData.login == 1 && utility.disk.checkIsLogin() != true){
							return true;
						}
					}
					
					if(isDefined(eleData.adult)){
						if(eleData.adult == 1 && utility.disk.checkIsAdultMember() != true){
							return true;
						}
					}
					
					//쿠키 채크
					var modalId = eleData.id;
					var savedReadData = 0;
					if(isDefined(modalId)){
						savedReadData = $.cookie(DF.cookiePrefix+modalId);
					}
					console.log('savedReadData', savedReadData);
					if(savedReadData != 1){
						var isModalCloseExisting = false;
						$(this).addClass('active');
						$homeEventModalEle.css({'border-radius':'15px','width': '100%'}).modal({
							closeExisting: isModalCloseExisting,
							blockerClass	: "common-event-modal-blocker",
							clickClose: false,
							escapeClose: true,
							showClose	: false
						});
						openModalEvent = true;
						return false;
					}
				}
			});
		}
	}
	
	
	
	
	//home event check
	/*
	var $homeEventModalEle = $('#disk-modal-mobile-home-event');
	if($homeEventModalEle.length > 0){
		if($homeEventModalEle.hasClass('open_modal')){
			
			var modalId = $homeEventModalEle.data('modal_id');
			
			//쿠키 채크
			var DF = get_disk_config(true);
			var savedReadData = 0;
			if(isDefined(modalId)){
				var DF = get_disk_config(false);
				savedReadData = $.cookie(DF.cookiePrefix+modalId);
			}
			console.log('savedReadData', savedReadData);
			if(savedReadData != 1){
				var isModalCloseExisting = false;
				$homeEventModalEle.css({'border-radius':'15px','width': '100%'}).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-event-modal-blocker",
					clickClose: false,
					escapeClose: true,
					showClose	: false
				});
			}
		}
	}
	*/
	
	
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
	
	return;
	
	
	
	
};

//event modal 페이지 세부보기
MOBILE_PAGE.home.onclickEventModalPopupGoDetailPage = function(thisEle){
	var eleData = $(thisEle).data();
	console.log(eleData);
	if(isDefined(eleData) == true){
		
		
		if(isDefined(eleData.go)){
			console.log('has go');
			
			if(eleData.go == 'app'){
				$.modal.close();
				APP_INSTALL(thisEle);
				return;
			}else if(eleData.go == 'login'){
				if(utility.disk.checkIsLogin() == true){
					disk_alert('이미 로그인 중입니다.');
					return;	
				}
				$.modal.close();
				GO_LOGIN();
				return;
			}else if(eleData.go == 'join'){
				if(utility.disk.checkIsLogin() == true){
					disk_alert('이미 로그인 중입니다.');
					return;	
				}
				$.modal.close();
				GO_JOIN();
				return;
				
			//이벤트 포인트 받기	
			}else if(eleData.go == 'point'){
				
			}
			
			
			return;
		}
		else if(isDefined(eleData.idx)){
			console.log('has idx');
			//쿠키저장 - 다시 노출 안함
			if(isDefined(eleData.target)){
				var DF = get_disk_config(true);
				$.cookie(DF.cookiePrefix+eleData.target, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
			}
			$.modal.close();
			GO_EVENT_VIEW(thisEle, 1);
			return;
		}
		
		//쿠키저장 - 다시 노출 안함
		if(isDefined(eleData.target)){
			var DF = get_disk_config(true);
			$.cookie(DF.cookiePrefix+eleData.target, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
		}
		
		$.modal.close();
		return;
		
	}
};




/*-------------------event *******************************/

//이벤트 포인트 보상 - 못받은 사람 위해
MOBILE_PAGE.home.getMobileEventReward = function(thisEle){
	console.log('MOBILE_PAGE.home.getMobileEventReward');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	$.modal.close();
	
	var callbackFun = function(data){
		console.log('callbackFun');
		
		if(isDefined(data.rt_bonus)){
			var eventPoint = data.event_point;
			if(eventPoint > 0){
		    	disk_alert('축하합니다.<br><br>이벤트 보상으로 '+eventPoint+'p가 지급되었습니다.');
  			}
		}else{
			disk_alert('포인트가 지급되지 않았습니다.<br>운영팀에 문의해 주세요.');
		}
		
		//쿠키저장 - 다시 노출 안함
		if(isDefined(eleData.target)){
			var DF = get_disk_config(true);
			$.cookie(DF.cookiePrefix+eleData.target, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
		}
		
	}
	
	MOBILE_PAGE.event_reward.join_app_install(thisEle, callbackFun);
	
};

MOBILE_PAGE.home.onclickAppDownEvent = function(thisEle){
	console.log('MOBILE_PAGE.home.onclickAppDownEvent');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		//alert('not login');
		$.modal.close();
		GO_LOGIN('realname');
		return;
	}
	
	var goAppMarket = function(){
		
		APP_INSTALL();
		return;
	}
	
	if(isMobileOnplayWebviewAgent() != true){
		$.modal.close();
		disk_confirm('앱 전용 이벤트입니다.<br>전용 앱을 다운 받으시겠습니까?', goAppMarket);
		return;
	}

	var okGoRealNameCallbackFun = function(){
		console.log('okGoRealNameCallbackFun');
		$.modal.close();
		GO_REAL_NAME_PHONE('event');
		return;
	}
	
	if(isBlockAdultDomain() == true){
		if(utility.disk.checkIsAdultMember() != true){
			//var cMsg = "포인트 수령은 실명인증 후 받을 수 있습니다.<br><br>온플은 인증된 회원에게 더 다양한 콘텐츠를 제공하고 있습니다. 제공되는 포인트를 이용해 무료로 이용하 실수 있습니다.<br><br>확인을 누르면 진행됩니다.";
			var cMsg = "포인트 수령은 실명인증 후 받을 수 있습니다.<br><br>확인을 누르면 계속 진행됩니다.";
			disk_confirm(cMsg, okGoRealNameCallbackFun);
			
			//쿠키저장 - 다시 노출 안함
			if(isDefined(eleData.target)){
				//var DF = get_disk_config(true);
				//$.cookie(DF.cookiePrefix+eleData.target, 1, { expires: 1,  path: '/', domain: DF.COOKIE_DOMAIN });
			}
			return;
		}	
	}
	
	MOBILE_PAGE.home.getMobileEventReward(thisEle);
		
}

MOBILE_PAGE.home.onclickEventRealname = function(thisEle){
	console.log('MOBILE_PAGE.home.onclickEventRealname');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	//GO_REAL_NAME_PHONE('event');
	
	//return;
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		//alert('not login');
		$.modal.close();
		GO_LOGIN('realname');
		return;
	}
	if(utility.disk.checkIsRealName() == true){
		$.modal.close();
		MOBILE_PAGE.home.getMobileEventReward(thisEle);
		return;
	}
	
	var okGoRealNameCallbackFun = function(){
		console.log('okGoRealNameCallbackFun');
		$.modal.close();
		GO_REAL_NAME_PHONE('event');
		
		return;
	}
	
	if(isBlockAdultDomain() == true){
		//var cMsg = "포인트 수령은 실명인증 후 받을 수 있습니다.<br><br>온플은 인증된 회원에게 더 다양한 콘텐츠를 제공하고 있습니다. 제공되는 포인트를 이용해 무료로 이용하 실수 있습니다.<br><br>확인을 누르면 진행됩니다.";
		var cMsg = "포인트 수령은 실명인증 후 받을 수 있습니다.<br><br>확인을 누르면 계속 진행됩니다.";
		disk_confirm(cMsg, okGoRealNameCallbackFun);
		
		//쿠키저장 - 다시 노출 안함
		if(isDefined(eleData.target)){
			var DF = get_disk_config(true);
			$.cookie(DF.cookiePrefix+eleData.target, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
		}
		return;
	}
	
	MOBILE_PAGE.home.getMobileEventReward(thisEle);
		
}