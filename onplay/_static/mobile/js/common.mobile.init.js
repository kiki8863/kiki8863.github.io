$(document).ready(function() {
	console.log('document ready');
	//return;
	var isMobile = true;
	var pageMain = $('#onplay_form_info_main').val();
	var pageSub = $('#onplay_form_info_sub').val();
	var getPageData = $('#onplay_form_info_data').val();
	var pageData = null;

	console.log('pageMain:'+pageMain);
	console.log('pageSub:'+pageSub);
	console.log('getPageData:'+getPageData);
	if(isDefined(getPageData)){
		pageData = $.parseJSON(getPageData);
	}
	console.log(pageData);

	//sns login
	if(pageMain == 'login'){
		//$('#mobile-footer-common-1').show();
		if(isDefined(pageData)){
			console.log('get page data');
			var actionType = null;
			if(pageData['action_type']){
				actionType = pageData['action_type'];
			}
			//sns 연동
			if(actionType == 'connect'){
				var DF = get_disk_config(isMobile);
				alert('SNS 계정 연동에 성공 하셨습니다.');
				var returnUrl = $.cookie(DF.cookiePrefix+'mrt_url');
				console.log('returnUrl', returnUrl);
				//alert(returnUrl);
				//return;
				MOBILE_COMMON.DATA.HASH.LOGIN = null;
				if(isDefined(returnUrl)){
					$.removeCookie(DF.cookiePrefix+'rt_url', { path: '/',domain: DF.COOKIE_DOMAIN });
					location.href = returnUrl;
				}else{
					location.href = '/mobile.php/mobile/main/#!action=mypage&group=info&id=info_edit';
				}
				return;
			}
			//sns login
			if(pageData['member']){
				var loginedData =
				{
					action_type : pageData['action_type'],
					member		: pageData['member'],
				};
				if(pageData['action_type']){
					loginedData.action_type =	pageData['action_type'];
				}

				MOBILE_PAGE.SUCCESS_LOGIN(loginedData);
			}
			
			
		}


		return;
	}else if(pageMain == 'main'){
		var actionType = null;
		if(isDefined(pageData)){
			if(pageData['action_type']){
				actionType = pageData['action_type'];
			}
		}
		console.log('actionType', actionType);
		if(actionType == 'search'){
			
			var keyWd = '';
			if(isDefined(pageData.search_keyword)){
				keyWd = pageData.search_keyword;
			}
			var hashPrams = {
				'!action': "search", 
				'k': keyWd 
			};
			MOBILE_PAGE.search.start(null, hashPrams);
			//return;
			
			//MOBILE_PAGE.search.start();
		}
	}else if(pageMain == 'toptoon'){
		MOBILE_PAGE.toptoon.start(pageSub, getPageData);
		return;
		
	}else if(pageMain == 'join'){
		
		//로그인 체크
		if(utility.disk.checkIsLogin() == true){
			location.href = "/mobile.php";
			return;
		}
		MOBILE_PAGE.join_form.defaultBinding();
		return;
		
	}



	MOBILE_COMMON.loadPageScriptBinding(pageMain, pageSub, pageData);

	//bbq hash
	$(window).on('hashchange', MOBILE_COMMON.setHashChange);
	
	



	//MOBILE_COMMON.defaultBinding(isMobile);

	MOBILE_COMMON.setHashChange();
});




MOBILE_COMMON.DATA = {
	ACTION	: null,
	MAIN	: null,
	SUB		: null,
	CACHE	: {
		CATEGORY	: new Disk_category(1),	//disk_category binding
		HISTORY		: [],	//해시 히스토리
	},
	//컨테이너 저장소
	CONTAINER	: {
		0	: {id:null,hash:null},
		1	: {id:null,hash:null},
		2	: {id:null,hash:null},
		3	: {id:null,hash:null},
		4	: {id:null,hash:null},
		5	: {id:null,hash:null},
		9	: {id:null,hash:null},
		10	: {id:null,hash:null},
		11	: {id:null,hash:null},
		12	: {id:null,hash:null},
		21	: {id:null,hash:null},
		22	: {id:null,hash:null},
		23	: {id:null,hash:null},
		24	: {id:null,hash:null},
		25	: {id:null,hash:null},
		30	: {id:null,hash:null},
		31	: {id:null,hash:null},
		32	: {id:null,hash:null},
		33	: {id:null,hash:null},
		34	: {id:null,hash:null},
		35	: {id:null,hash:null},
		45	: {id:null,hash:null},
	},
	HASH	: {
		BACK	: null,		//마지막 back hash url
		LAST	: null,		//최근 선택한 hash url
		FORWARD	: null,		//뒤로 온경우 앞 페이지
		LOGIN	: null,		//로그인 호출한 경우
		LAST_LIST	: null,	//컨텐츠 리스트형 마지막 해시(view back)
		LAST_CONTENTS	: null,	//컨텐츠 마지막 해시(view)
	},
	SCROLLER	: {
		TOP_CATEGORY	: null,
		W_SCROLL		: true,		//window scroll off or true
		V_SCROLL		: false,	//window scroll - contents view
	},
	CONTENTS	: {
		OPENED_OPENED_IDX : null,		//현재 오픈되어 있는 콘텐츠 idx
	}
};

MOBILE_COMMON.loadPageScriptBinding = function(pageMain, pageSub, pageData){
	console.log('MOBILE_COMMON.loadPageScriptBinding:', pageMain);
	console.log(isPassive());
	/*
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
		capture: false,
		passive: false
	} : false);
	*/
	
	var DF = get_disk_config(true);
	console.log('Kakao', Kakao);
	if(isDefined(Kakao.Link) == false){
		Kakao.init(DF.kokao_key);	
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
	
	
	var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
	
	window.addEventListener(orientationEvent, function() {
		//alert("the orientation has changed");
		changeOrientationScreen();
	}, false);
	
	
	//가로 세로
	/*
	var changeOrientationScreen = function(changeMode){
		console.log('changeOrientationScreen',changeMode);
		if($('#mobile-container-deep-30').hasClass('show')){
			MOBILE_PAGE.contents.setMobileConetnsScreenView(changeMode);
		}
		return;
	};
	$(window).on("orientationchange", function(event){
		
		if(window.matchMedia("(orientation: portrait)").matches){
		    console.log('orientationchange portrait');
		    changeOrientationScreen('portrait');
		}else if(window.matchMedia("(orientation: landscape)").matches){
		    console.log('orientationchange landscape');
		    changeOrientationScreen('landscape');
		}
		
	});
	*/
	return;

};

//모바일 컨테이너 오픈
MOBILE_COMMON.showMobileContainer = function(containerId, hashPrams){
	console.log('MOBILE_COMMON.showMobileContainer', containerId);
	console.log('hashPrams', hashPrams);

	var contentsIdx;
	if(isDefined(hashPrams)){
		contentsIdx = hashPrams.idx;
	}
	console.log('contentsIdx-1', contentsIdx);
	if(isDefined(containerId) == false){
		containerId = 'home';
	}

	var actionCallId = 'home';
	if(hashPrams['!action']){
		actionCallId = hashPrams['!action'];
	}


	var showContainerInfo = MOBILE_CONTAINER.getContainerInfo(containerId);
	console.log('showContainerInfo', showContainerInfo);
	
	//동영상 플레이어 제거
	
	if(MOBILE_COMMON.NEW_VIDEO_PLAYER){
		//$('.mobile-contents-view-top-player-area').empty();
		//MOBILE_COMMON.NEW_VIDEO_PLAYER = null;
		//MOBILE_COMMON.NEW_VIDEO_PLAYER.dispose();
		//var oldPlayer = $('.mobile-contents-view-top-player-area');
		//videojs(oldPlayer[0]).dispose();
		if($('.mobile-contents-view-top-player-area').length > 0){
			if($('.mobile-contents-view-top-player-area').find('video').hasClass('vjs-tech') == true){
				MOBILE_COMMON.NEW_VIDEO_PLAYER.dispose();
				MOBILE_COMMON.NEW_VIDEO_PLAYER = null;
			}
		}
	}

	var $containerEle;
	var $targetEle;
	if(isDefined(showContainerInfo)){
		//header
		if(isDefined(showContainerInfo.header)){
			console.log('showContainerInfo.header', showContainerInfo.header);
			$targetEle = $('#'+showContainerInfo.header);
			if($targetEle.length > 0){
				if($targetEle.hasClass('show') == false){
					$('.mobile-header.show').removeClass('show');
					$targetEle.addClass('show');


				}

				//home top fixed
				if(showContainerInfo.header == 'mobile-top-header-0'){
					if(containerId == 'home'){
						$targetEle.addClass('fix_style');
					}else{
						if($targetEle.hasClass('fix_style')){
							console.log('remove fix_style');
							$targetEle.removeClass('fix_style');
						}
					}
				}

			}
		}else{
			$('.mobile-header.show').removeClass('show');
		}

		//main container
		if(isDefined(showContainerInfo.target)){
			$containerEle = $('#'+showContainerInfo.target);
			if($containerEle.length > 0){
				if($containerEle.hasClass('show') == false){
					$('.mobile-container.show').removeClass('show');
					if(isDefined(showContainerInfo.ani)){
						$containerEle.addClass('show animated '+showContainerInfo.ani);
					}else{
						$containerEle.addClass('show');
					}
				}
				//$targetEle.data('id', showContainerInfo.target);
			}
		}else{
			GO_HOME();
			return;
		}

		//footer
		if(isDefined(showContainerInfo.footer)){
			$targetEle = $('#'+showContainerInfo.footer);
			if($targetEle.length > 0){
				if($targetEle.hasClass('show') == false){
					$('.mobile-footer-common.show').removeClass('show');
					$targetEle.addClass('show');
				}
				if($targetEle.hasClass('empty') == true){
					$('body').addClass('white');
				}else{
					$('body.white').removeClass('white');
				}
			}
		}else{
			$('.mobile-footer-common.show').removeClass('show');
		}

		//go top menu
		if(isDefined(showContainerInfo.go_top)){
			$targetEle = $('#'+showContainerInfo.go_top);
			if($targetEle.length > 0){
				if($targetEle.hasClass('show') == false){
					$('.mobile-bottom-top-btn.show').removeClass('show');
					$targetEle.addClass('show');
				}
			}
		}else{
			$('.mobile-bottom-top-btn.show').removeClass('show');
		}

		//bottom navs
		if(isDefined(showContainerInfo.navs)){
			$targetEle = $('#'+showContainerInfo.navs);
			if($targetEle.length > 0){
				if($targetEle.hasClass('show') == false){
					$('.mobile-bottom-navs.show').removeClass('show');
					$targetEle.addClass('show open');
				}
			}
		}else{
			$('.mobile-bottom-navs.show').removeClass('show open');
		}

		//call fun id
		if(isDefined(showContainerInfo.id)){
			actionCallId = showContainerInfo.id;
		}
	}

	console.log('actionCallId', actionCallId);

	if(actionCallId== 'login'){
		GO_LOGIN();
	}

	//메인 컨테이너 삽입
	var orignId = actionCallId;
	console.log('orignId', orignId);
	if(isDefined($containerEle) == true){
		if($containerEle.length < 1){
			console.log('ele empty', actionCallId);
			
			actionCallId = 'home';
		}
		var eleData = $containerEle.data();
		console.log('eleData', eleData);
		if(isDefined(eleData) == false){
			console.log('actionCallId',actionCallId);
			//if(actionCallId != 'home'){
				if(orignId == 'find_id' || orignId == 'find_pass' || orignId == 'join'){
					GO_OUTER_LINK(orignId);
					return;
				}
				return;	
			//}
			
		}
		console.log('contentsIdx', contentsIdx);

		//cotnets view
		if(actionCallId == 'contents'){
			if(eleData.idx != contentsIdx){
				$containerEle.empty().data('loaded', 0);
			}
			GO_TOP(0);
		}else{
			if(actionCallId == 'category' || actionCallId == 'best' || actionCallId == 'event_list' || actionCallId == 'movie' || actionCallId == 'broadcast'){

			}else{
				GO_TOP(0);
			}
			console.log('empty contents'+actionCallId);
			$('.contents-view-container').empty().data('loaded', 0);
		}


		//return;
		if(isDefined(showContainerInfo.deep)){
			if(!MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep]){
				MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep] = {id:null,hash:null};
			}

			if(MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep].id == actionCallId){
				console.log('container already loaded');
				//비어 있는지 검사
				if($containerEle.text().length < 10){
					var containerTemplete = MOBILE_TEMPLETE.CONNTAINER[actionCallId];
					console.log('containerTemplete');

					if(isDefined(containerTemplete)){
						var containerHtml = containerTemplete.call(null, showContainerInfo, hashPrams);
						if(isDefined(containerHtml) == true){
							$containerEle.html(containerHtml);
						}
						MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep].id = 	actionCallId;
					}
				}
			}else{
				console.log('container new loaded');
				if(actionCallId == 'home'){
					
					if(eleData.loaded > 0 && eleData.id == actionCallId){
						console.log('container already loaded');
					}else{
						console.log('home new load');
					}
					MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep].id = 	actionCallId;
				}else{
				
					var containerTemplete = MOBILE_TEMPLETE.CONNTAINER[actionCallId];
					if(isDefined(containerTemplete)){
						var containerHtml = containerTemplete.call(null, showContainerInfo, hashPrams);
						//console.log(containerHtml);
						//console.log($containerEle);
						if(isDefined(containerHtml) == true){
							$containerEle.html(containerHtml);
						}
						MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep].id = 	actionCallId;
					}
				}
			}
		}


		//return;
		//container loaded val
		var newLoaded = 1;
		if(isDefined(eleData.loaded)){
			if(eleData.loaded > 0){
				newLoaded = parseInt(eleData.loaded);
			}
		}
		showContainerInfo.loaded = newLoaded;

		//container contents idx
		if(isDefined(contentsIdx)){
			showContainerInfo.idx =parseInt(contentsIdx);
		}

		$containerEle.data(showContainerInfo);

		//해시 정보 저장
		//var saveHash = {};
		//saveHash[actionCallId] = location.hash;
		//$.bbq.pushState( saveHash );


		MOBILE_COMMON.DATA.ACTION = actionCallId;
	}
	//console.log('MOBILE_COMMON.DATA.CONTAINER');
	//console.log(MOBILE_COMMON.DATA.CONTAINER);

	//slick stop
	MOBILE_COMMON.stopSlick(actionCallId);
	/*
	if($('.disk-mobile-main-slick.slick-slider').length > 0){
		//$('disk-mobile-main-slick slick-initialized slick-slider')
		$('.disk-mobile-main-slick.slick-slider').each(function(index) {
			//alert(index + ': ' + $(this).text());
			console.log('slick ~~~');
			console.log($(this));
			if($(this)[0].hasOwnProperty('slick') == true){
				console.log('has slick obj~~~~~');
				if(actionCallId == 'home'){
					$(this).slick('slickPlay');
				}else{
					$(this).slick('slickPause');
				}
			}
		});
	}
	*/

	//save call hash
	MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep].hash = location.hash;

	//리스트형 해시 저장
	if($.inArray(actionCallId, MOBILE_CONTAINER.CONTENTS_LIST) >= 0){
		MOBILE_COMMON.DATA.HASH.LAST_LIST = location.hash;
	}


	//기본 바인딩은 페이지 함수 호출전
	MOBILE_COMMON.defaultBinding(actionCallId);
	//top binding
	if(isDefined(showContainerInfo.header)){
		MOBILE_COMMON.setHeaderBinding(showContainerInfo.header);
	}

	//auto focus
	if(actionCallId == 'search_form'){
		//$('#disk_search_form_keyword').focus();

	}

	//페이지 초기화
	MOBILE_COMMON.resetCommonPageData(showContainerInfo);


	//페이지 start js call
	console.log('actionCallId', actionCallId);
	var actionCallFun = MOBILE_PAGE[actionCallId];
	//console.log('actionCallFun', actionCallFun);
	if(isDefined(actionCallFun) == true){
		if(actionCallFun['start']){
			var startCallBackFun = actionCallFun['start'];
			if (typeof startCallBackFun === "function"){
				startCallBackFun.call(null,  showContainerInfo, hashPrams);
				return;
			}
		}
	}
};

//stop slick
MOBILE_COMMON.stopSlick = function(actionCallId){
	//home
	if($('.disk-mobile-main-slick.slick-slider').length > 0){
		//$('disk-mobile-main-slick slick-initialized slick-slider')
		$('.disk-mobile-main-slick.slick-slider').each(function(index) {
			//alert(index + ': ' + $(this).text());
			console.log('slick ~~~');
			//console.log($(this));
			if($(this)[0].hasOwnProperty('slick') == true){
				console.log('has slick obj~~~~~');
				if(actionCallId == 'home'){
					$(this).slick('slickPlay');
				}else{
					$(this).slick('slickPause');
				}
			}
		});
	}

	//event list
	if($('.disk-mobile-autoplay-slick.slick-slider').length > 0){
		//$('disk-mobile-main-slick slick-initialized slick-slider')
		$('.disk-mobile-autoplay-slick.slick-slider').each(function(index) {
			//alert(index + ': ' + $(this).text());
			console.log('slick ~~~');
			//console.log($(this));
			if($(this)[0].hasOwnProperty('slick') == true){
				console.log('has slick obj~~~~~');
				if(actionCallId == 'event_list'){
					$(this).slick('slickPlay');
				}else{
					$(this).slick('slickPause');
				}
			}
		});
	}

}


//bbq hash change fun - when hash change
MOBILE_COMMON.setHashChange = function(){
	console.log('MOBILE_COMMON.setHashChange:');

	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	var hashAction = null;
	if(hashPrams['!action']){
		hashAction = hashPrams['!action'];
		//startPage = loadedPage;
	}
	console.log('hashAction', hashAction);
	console.log(hashPrams);

	var hasActionType = false;
	var containerId = 'home';
	if(isDefined(hashAction) == true){
		containerId = hashAction;
		hasActionType = true;
	}
	console.log('containerId', containerId);
	if(containerId == 'login'){
		location.hash = '#!action=home&main=login';
		return;
	}

	var isHistoryAction = false;
	if(hashPrams['history']){
		if(hashPrams['history'] == 1){
			isHistoryAction = true;
		}
	}
	console.log('MOBILE_COMMON.DATA.HASH.FORWARD', MOBILE_COMMON.DATA.HASH.FORWARD);
	if(isDefined(MOBILE_COMMON.DATA.HASH.FORWARD) == true){
		isHistoryAction = true;
	}

	//검사 : 브라우저 히스토리 백으로 들어온경우
	if(isHistoryAction != true){
		var savedHistory = MOBILE_COMMON.DATA.CACHE.HISTORY;
		console.log('savedHistory', savedHistory);
		if(savedHistory.length > 1){
			if(savedHistory[(savedHistory.length -2)] == location.hash){
				console.log('windows back history back action');
				isHistoryAction = true;
				MOBILE_COMMON.DATA.CACHE.HISTORY.pop();
			}
		}
	}

	//var lastContainerUrl = $.bbq.getState(containerId);
	//console.log('lastContainerUrl', lastContainerUrl);
	//MOBILE_CONTAINER.NO_CACHE_CONTAINER

	var updateHashCacheData = function(sType, uHashUrl){
		console.log('updateHashCacheData', uHashUrl);
		if(isDefined(uHashUrl) == false){
			return;
		}
		var uhParams = $.deparam.fragment(uHashUrl);
		console.log('uhParams', uhParams);
		if(uhParams['!action']){
			if($.inArray(uhParams['!action'], MOBILE_CONTAINER.NO_CACHE_CONTAINER) < 0){
				if(sType == 'last'){
					MOBILE_COMMON.DATA.HASH.LAST = uHashUrl;
				}else if(sType == 'back'){
					MOBILE_COMMON.DATA.HASH.BACK = uHashUrl;
				}
			}
		}
		return;
	};

	//해시 저장
	var nowHash = location.hash;
	console.log('nowHash', nowHash);

	var isEscepHash = false;		//예외처리
	if($.inArray(containerId, MOBILE_CONTAINER.NO_CACHE_CONTAINER) < 0 && hasActionType == true){
		isEscepHash = true;

		//히스토리 저장 - 최대 10개저장
		if(isHistoryAction == false){
			var savedHistory = MOBILE_COMMON.DATA.CACHE.HISTORY;
			console.log('savedHistory1', savedHistory);
			if(savedHistory.length >= 10){
				savedHistory.shift();
				console.log('savedHistory', savedHistory);
			}
			if(savedHistory.length > 0){
				var lastLen = savedHistory.length - 1;
				if(savedHistory[lastLen] != nowHash){
					savedHistory.push(nowHash);
				}
			}else{
				savedHistory.push(nowHash);
			}

			console.log('savedHistory', savedHistory);
			MOBILE_COMMON.DATA.CACHE.HISTORY = savedHistory;
			$('.btn_go_history_back').data('his', savedHistory.length);
		}
	}
	MOBILE_COMMON.DATA.HASH.FORWARD = null;
	console.log('MOBILE_COMMON.DATA.CACHE.HISTORY', MOBILE_COMMON.DATA.CACHE.HISTORY);


	//이전해시 저장 : 깊은 복사
	var lastHash = MOBILE_COMMON.DATA.HASH.LAST;
	console.log('nowHash', nowHash);
	console.log('lastHash', lastHash);
	if(lastHash != nowHash){
		//MOBILE_COMMON.DATA.HASH.BACK = lastHash;
		//MOBILE_COMMON.DATA.HASH.LAST = nowHash;
		//console.log(MOBILE_COMMON.DATA.HASH.LAST);
		updateHashCacheData('back', lastHash);
		updateHashCacheData('last', nowHash);
	}
	console.log(MOBILE_COMMON.DATA.HASH.BACK);
	console.log(MOBILE_COMMON.DATA.HASH.LAST);

	console.log('containerId', containerId);


	if(isDefined(containerId)){
		MOBILE_COMMON.showMobileContainer(containerId, hashPrams);
	}



	return;
};



//기본 바인딩 - 컨테이너 로드 후
MOBILE_COMMON.defaultBinding = function(actionId){
	console.log('MOBILE_COMMON.defaultBinding', actionId);

	//모달 닫기
	//CLOSE_PAGE_MODAL();

	MOBILE_COMMON.resetDaefaultData(actionId);



	//btn
	MOBILE_COMMON.setBtnBinding(actionId);


	//modal - alert
	$('#disk-modal-mobile-alert').on($.modal.OPEN , function(event, modal) {
		console.log('disk-modal-mobile-alert OPEN ');
		$(this).focus();
	});
	$('#disk-modal-mobile-alert').on($.modal.BEFORE_CLOSE, function(event, modal) {
		console.log('disk-modal-mobile-alert close');
	});

};

//페이지 로드 후 공통으로 바인딩
MOBILE_COMMON.afterLoadCommonBinding = function(){
	console.log('MOBILE_COMMON.afterLoadCommonBinding');
	
	//adult 인증 처리인지	
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	var hashAdultHash = false;
	var checkLoginKey = null;
	if(hashPrams['adult']){
		hashAdultHash = hashPrams['adult'];
	}
	if(hashPrams['refresh']){
		hashAdultHash = hashPrams['refresh'];
	}
	if(hashPrams['mkey']){
		checkLoginKey = hashPrams['mkey'];
	}
	var isAlert = false;
	//성인인증후 들어온경우 회원정보 다시 로드
	if(hashAdultHash == 'true' || hashAdultHash == true || hashAdultHash == 1){
		var goHoem = function(){
			location.href = '/mobile.php/mobile/main';
			return;
		}
		var callbackFun = function(data){
			console.log('adult check callbackFun');
			console.log('data', data);
			
			//login
			MOBILE_COMMON.loginCheckBinding(1);
			
			//check join_userid
			var memberJoinId = utility.disk.getMemberJoinId();
			console.log('memberJoinId', memberJoinId);
			if(memberJoinId == '100000'){
				if(utility.disk.checkIsAdultMember() == true){
					location.href = '/mobile.php/mobile//#!action=category&main=21100';
					return;
				}
			}
			//이벤트 메시지 체크
			if(isDefined(data.member_show_msg)){
				$.modal.close();
				disk_alert(data.member_show_msg, goHoem);
				isAlert = true;
			}
			
			//리턴시에는 결제 메시지 없음
			/*
			if(isAlert != true){
				isAlert = MOBILE_PAGE.shoPayAlert();
				if(isAlert == true){
					return false;
				}
			}
			*/
			
		};
		//새로 로그인
		if(isDefined(checkLoginKey) == true){
			DISK_MEMBER_FUN.setAutoLoginMkey(checkLoginKey, 1, callbackFun);
		}else{
			DISK_MEMBER_FUN.getMemberLoginInfo(1, callbackFun, 1);
			return;
		}
	}else{
		//login
		MOBILE_COMMON.loginCheckBinding(1);	
	}
	
	

	//top menu position
	MOBILE_COMMON.setTopMenuScrollPosition();

	//툴팁
	//MOBILE_COMMON.setDiskToolTipster();
	
	//image lazy
	MOBILE_COMMON.setImageLazy();

	//scroll
	MOBILE_COMMON_SCROLL.setCommonScroll(MOBILE_COMMON.DATA.ACTION);
};

//데이타 초기화
MOBILE_COMMON.resetDaefaultData = function(actionId){
	console.log('MOBILE_COMMON.resetDaefaultData', actionId);



}

//ui 초기화 : 공통
MOBILE_COMMON.resetCommonPageData = function(pageInfo){
	console.log('MOBILE_COMMON.resetCommonPageData');
	console.log(pageInfo);

	var containerDeep = 0;
	var actionId = 'home';
	if(isDefined(pageInfo.id)){
		actionId = pageInfo.id;
	}
	if(isDefined(pageInfo.deep)){
		containerDeep = pageInfo.deep;
	}

	var deepC = 1;
	var deepS = 10;
	//카테고리 리스트 비우기
	var resetCategoryContainer = function(){

		$('#mobile-container-deep-'+deepC).empty().data('loaded', 0);
		MOBILE_COMMON.DATA.CONTAINER[deepC] = {id:null,hash:null};
		MOBILE_PAGE.category.DATA.LAST_HASH = null;
		$('.top-main-category.active').removeClass('active');

	};
	//검색 리스트 비우기
	var resetSearchContainer = function(){

		$('#mobile-container-deep-'+deepS).empty().data('loaded', 0);
		MOBILE_COMMON.DATA.CONTAINER[deepS] = {id:null,hash:null};
		MOBILE_PAGE.search.DATA.LAST_HASH = null;
		$('#disk_search_keyword').val('');
		MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY = false;
	};

	//modal-page empty
	if(actionId != 'on_channel'){
		CLOSE_PAGE_MODAL();
	}

	//alert modal
	if($('.blocker.current').length > 0){
		$.modal.close();
	}

	//join start empty
	if(actionId != 'join'){
		$('.join-container').empty().data('loaded', 0);
		MOBILE_COMMON.DATA.CONTAINER[34] = {id:null,hash:null};
	}
	//channel deep empty
	if(actionId != 'channel' && actionId != 'contents'){
		$('.channel-container').empty().data('loaded', 0);
		MOBILE_COMMON.DATA.CONTAINER[2] = {id:null,hash:null};
	}

	if(actionId == 'home'){
		resetSearchContainer();
		resetCategoryContainer();
	}else if(actionId == 'contents'){

	}else if(actionId == 'category' || actionId == 'best' || containerDeep == deepC){
		resetSearchContainer();
		//reset data
		$('#mobileCatgoryFilterOption').find('input[name=sub_cate]').val('0');

	}else if(actionId == 'search' || containerDeep == deepS){
		resetCategoryContainer();
		$('.top-main-category.active').removeClass('active');
	}else{
		//팝업형일 경우
		if($.inArray(actionId, MOBILE_CONTAINER.POPUP_CONTAINER) >= 0){

		}else{
			resetSearchContainer();
			resetCategoryContainer();
		}
	}

	//검색 form
	if(actionId != 'search_form'){
		var $easyAutocompleteEle = $('#disk_search_form_keyword');
		if($easyAutocompleteEle.length > 0){
			$easyAutocompleteEle.off("keyup").off("keydown").off("focus").off("blur");
		}
		if($('#mobileDiskTopMainSearchForm').length > 0){
			$('#mobileDiskTopMainSearchForm').data('loaded', 0);
		}
	}

	//reset ui
	$('.cate_box').removeClass('active');
	$('.mobile-top-gnb-wrap').removeClass('menu_open');

}



MOBILE_COMMON.loginCheckBinding = function(isMobile){
	console.log('MOBILE_COMMON.loginCheckBinding');

	var DF = get_disk_config(isMobile);
	var isLoginedMember = utility.disk.checkIsLogin();
	//회원 로그인에 따른 노출 처리
	DISK_MEMBER_FUN.setMemberInfo(null, isMobile);


	if(isLoginedMember == true){
		console.log('isLoginedMember');
		
		//check copy
		if(isBlockAdultDomain() == true){
			if(utility.disk.checkIsRealName() == true){
				location.href = '//m.onplay.co.kr';
				return;
			}
		}
		
		//세션여부 체크 - 세션을 읽었을때만
		var hasAutoLogin = $.cookie(DF.cookiePrefix+'has_auto_login');
		console.log('hasAutoLogin', hasAutoLogin);
		if(parseInt(hasAutoLogin) == 1){
			console.log('hasAutoLogin : 1');
			DISK_MEMBER_FUN.setAutoLogin(isMobile);
		}

		//코멘트 로그인 덮개 열림
		if($('.disk-need-login-contents').length > 0){
			$('.disk-need-login-contents').remove();
		}

	}else{
		//로그인버튼 바인딩
		//PAGE_LOGIN.LOGIN.formBinding();
	}
}

//버튼 바인딩
MOBILE_COMMON.setBtnBinding = function(actionId){
	console.log('MOBILE_COMMON.setBtnBinding');

	//go top
	$( ".mobile-bottom-top-btn" ).unbind( "click");
	$( ".mobile-bottom-top-btn" ).bind( "click", function() {
		console.log('go top');
		GO_TOP(100);
	});

	//카테고리 메뉴 설정
	/*
	$( ".mobile-top-gnb-arrow-btn" ).unbind( "click");
	$( ".mobile-top-gnb-arrow-btn" ).bind( "click", function() {
		console.log('.mobile-top-gnb-arrow-btn');
		$('.mobile-top-gnb-wrap').toggleClass('menu_open');
	});
	*/


	//b-nav-btn home
	//하단 네비 active 설정
	if(isDefined(actionId)){
		$('.b-nav-btn.active').removeClass('active');
		if($('.b-nav-btn.'+actionId).length > 0){
			$('.b-nav-btn.'+actionId).addClass('active');
		}
	}

}


//세로 & 가로 lazy
MOBILE_COMMON.setImageLazy = function(){
	console.log('MOBILE_COMMON.setImageLazy');
	//image lazy
	if($('.disk-image-lazy').length > 0){
		//$('.disk-image-lazy').lazy();

		var lazyLoadComplete = function(){
			consloe.log('lazycomplete');
		}

		$.extend($.lazyLoadXT, {
			/*edgeY:  200,*/
			srcAttr: 'data-src',
			selector : '.disk-image-lazy'
		});

		$(window).on('lazycomplete', function(eData, bData) {
			console.log('lazycomplete');
			console.log(eData);
			console.log(bData);
		});



		//$.lazyLoadXT.oncomplete = 'lazyLoadComplete';
		//$.lazyLoadXT.onload.addClass = 'animated fadeIn';

		setTimeout(function() {
			$(window).lazyLoadXT({
				selector	: '.disk-image-lazy'
			});
			$.lazyLoadXT.onload.addClass = 'lazy-loaded';
			$.lazyLoadXT.onload.removeClass = 'disk-image-lazy';
			console.log($.lazyLoadXT);

		}, 50);

	}

	if($( ".horizontal-scroller" ).length > 0){
		$.lazyLoadXT.scrollContainer = '.horizontal-scroller';
	}

	/*
	if($("#mobile-container-modal-page").hasClass('show') == true){
		$.lazyLoadXT.scrollContainer = '.#mobile-container-modal-page';
	}
	*/

};

//가로 lazy
MOBILE_COMMON.setImageLazyHorizontal  = function(){
	//image lazy
	if($('.disk-image-lazy-h').length > 0){
		console.log('Horizontal lazy');
		$('.disk-image-lazy-h').lazy({
			scrollDirection: 'horizontal'
		});
	}
};

//툴팁
MOBILE_COMMON.setDiskToolTipster = function(){

	//tooltip
	/*
	$('.disk-tooltip').tooltipster({
		theme: 'tooltipster-light',
		//theme: 'tooltipster-shadow',
		contentCloning: true,
		debug : true,
		maxWidth	: 300,
		minWidth	: 100,
		side		: 'top'			//top', 'bottom', 'right', 'left'
	});
	*/
};


//상단 메뉴 위치 값
MOBILE_COMMON.setTopMenuScrollPosition = function(){
	console.log('MOBILE_COMMON.setTopMenuScrollPosition');

	var $headerEle = $('.mobile-header.show');
	if($headerEle.length < 1){
		console.log('header not show');
		return;
	}

	if($headerEle.find('#top-menu-category-list-gnb').length < 1){
		console.log('category gnb not show');
		return;
	}

	var defaultTopMenuScroll = function(){
		if(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY){
			MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY.scrollTo(0,0);
		}
		return;
	}

	if(isDefined(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY)){
		console.log('MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY');
		console.log(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY);
		var gnbWidth = $('#top-menu-category-list-gnb').width();
		var centerLeft = gnbWidth / 2 - 52;
		var moveLeft = 52;
		var activeMenuOffSet = $('.top-main-category.active').position();
		if(isDefined(activeMenuOffSet) == false){
			defaultTopMenuScroll();
			return;
		}
		console.log('activeMenuOffSet', activeMenuOffSet);
		if(isDefined(activeMenuOffSet.left)){
			var mvLeft = 0;
			if(activeMenuOffSet.left > centerLeft){
				//mvLeft = activeMenuOffSet.left - centerLeft;
				mvLeft = activeMenuOffSet.left - moveLeft;
			}
			console.log('centerLeft', centerLeft);
			console.log('moveLeft', moveLeft);
			console.log('mvLeft', mvLeft);
			MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY.scrollTo(mvLeft,0);
		}
	}
};

//상단 바인딩
MOBILE_COMMON.setHeaderBinding = function(headerEle){
	console.log('MOBILE_COMMON.setHeaderBinding', headerEle);
	if(isDefined(headerEle) == true){
		var $targetHeaderEle = $('#'+headerEle);
		if($targetHeaderEle.length > 0){
			if($targetHeaderEle.data('loaded') == 1){
				return;
			}

			//console.log(callbackFun);
			MOBILE_COMMON.setTopCategoryListBinding(false);

			//set loaded
			$targetHeaderEle.data('loaded', 1);

		}
	}
};


//상단 바인딩
MOBILE_COMMON.setTopCategoryListBinding = function(forceReload){
	console.log('MOBILE_COMMON.setTopCategoryListBinding');
	//console.log(callbackFun);

	var $headerEle = $('.mobile-header.show');
	if($headerEle.length < 1){
		console.log('header not show');
		return;
	}

	if($headerEle.find('#top-menu-category-list-gnb').length < 1){
		console.log('category gnb not show');
		return;
	}

	var category = new Disk_category(1);
	var isCheckBlockAdultDomain = isAdDomain();
	//category.isBlockAdult = isCheckBlockAdultDomain;
	var isCheckBlockAdultContents = DISK_MEMBER_FUN.isBlockAdultContents();
	//var topCategoryList = category.show_mobile_top_category_list;
	var topMenuList = category.getTopCategoryList();
	var topCategoryList = $.merge($.merge([], category.show_mobile_top_category_list), topMenuList);
	console.log('topCategoryList', topCategoryList);

	var memberCustomCategoryList =  MOBILE_COMMON_FUN.getMemberCustomCategory();
	console.log('memberCustomCategoryList', memberCustomCategoryList);

	if(isDefined(memberCustomCategoryList) == true){
		if($.isArray(memberCustomCategoryList) == true || memberCustomCategoryList.length > 0){
			topCategoryList = memberCustomCategoryList;
		}
	}

	var topCategoryHtml = [];
	var cateName;
	var totalStrLength = 0;
	var lw = 52;
	var cl = 1;
	for(var i =0; i < topCategoryList.length; i++){
		var cateKey = topCategoryList[i];
		if(cateKey == 21100){
			if(isCheckBlockAdultDomain == true || isCheckBlockAdultContents == true){
				continue;
			}
		}
		cateName = category.get_cate_name(cateKey);
		cl= cateName.length;
		if(cl == 3){ lw = 70;}
		else if(cl == 4){ lw = 84;}
		else if(cl == 5){ lw = 92;}
		totalStrLength += lw;
		topCategoryHtml.push(category.getMobileTopCategoryMenuHtml(cateKey, cateName));
	}
	console.log('totalStrLength', totalStrLength);

	//var listWidth = 52 * topCategoryHtml.length + 54;
	var listWidth = totalStrLength + 54;
	console.log('listWidth', listWidth);
	$('.top-menu-category-list').html(topCategoryHtml.join('')).css({width: listWidth+'px'});

	if(forceReload == true){
		if(isDefined(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY) == true){
			MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY.destroy();
		}
		MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY = null;
	}

	//console.log(topCategoryHtml);
	if(topCategoryHtml.length > 0){
		if(isDefined(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY) == false){
			console.log('new ft scroller');
			MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY = new FTScroller(document.getElementById('top-menu-category-list-gnb'), {
				scrollingY: false,
				snapping: false,
				scrollbars: false,
				bouncing: false
			});
			console.log('scroller');
			console.log(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY);

			MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY.scrollTo(0,0);
		}

	}
};
