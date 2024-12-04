$(document).ready(function() {
	console.log('document ready');

	WEB_COMMON.defaultBinding();

	var pageMain = $('#onplay_form_info_main').val();
	var pageSub = $('#onplay_form_info_sub').val();
	var pageData = $('#onplay_form_info_data').val();
	
	

	console.log('pageMain:'+pageMain);
	console.log('pageSub:'+pageSub);
	console.log('pageData:'+pageData);
	if(isDefined(pageData)){
		pageData = $.parseJSON(pageData);
	}
	console.log(pageData);
	
	
	
	//var bbqHashPageList = ['my'];		//bbs hash use uri
	//var pushStatePageList = ['home','rank','category','search'];		//pushState use uri	
	
	if(isDefined(pageMain)){
		var getHashType = WEB_COMMON_GET_PAST_HASH_TYPE(pageMain);
		
		if(getHashType == 'push'){
			WEB_COMMON.setPushStateSystem(pageMain);
			WEB_COMMON.loadPageScriptBinding(pageMain, pageSub, pageData);
		}else if(getHashType == 'bbq'){
			WEB_COMMON.setBbqHasSystem(pageMain, pageSub, pageData);
		}else{
			//WEB_COMMON.setPushStateSystem(pageMain);
			WEB_COMMON.setBbqHasSystem(pageMain, pageSub, pageData);
			//WEB_COMMON.loadPageScriptBinding(pageMain, pageSub, pageData);
		}
	
	}
		

	//postMessage
	window.addEventListener("message", WEB_COMMON.receiveMessage, false);
	
	
	
	
	//common binding
	//modal defaults
	/*
	$.modal.defaults = {
		closeExisting	: false,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
		modalClass		: "modal",    // CSS class added to the element being displayed in the modal.
  		blockerClass	: "modal-blocker",  // CSS class added to the overlay (blocker).

	};
	*/
	//
});


var WEB_COMMON_GET_PAST_HASH_TYPE  = function(pageMain){
	var bbqHashPageList = ['my'];		//bbs hash use uri
	var pushStatePageList = ['home','rank','category','search','movie','broadcast', 'ani', 'channel'];		//pushState use uri	
	
	var rt = 'NONE';
	if(jQuery.inArray(pageMain, pushStatePageList ) != -1){
		rt = 'push';
	}else if(jQuery.inArray(pageMain, bbqHashPageList ) != -1){
		rt = 'bbq';
	}
	return rt;
}




var WEB_COMMON = {};
WEB_COMMON.DATA = {
	MAIN	: null,
	SUB		: null,
	CHANGE_HASH : null,
	BEFORE_CONTENS_LAST_HOST : null,		//컨텐츠 보기 전 마지막 호스트
	BEFORE_CONTENS_LAST_HASH : null,		//컨텐츠 보기 전 마지막 해시
	CONTENTS_HISTORY : [],
	ONPOPSTATE_BINDING : false,				//window.onpopstate 바인딩 여부,
	PAGE_LOADED_CONTENS_IDXS : null,			//페이지 로드하고 bbs idx 모음 - 모달에서 이전 다음 처리 위함
};

//pushState setting
WEB_COMMON.setPushStateSystem = function(pageMain){
	console.log('WEB_COMMON.setPushStateSystem', pageMain);
	
	var $infoEle = $('#onplayFormHeaderLoadedInfo').find('.onplay_form_info_PushState_load');
	if($infoEle.length < 1){
		return;
	}
	if($infoEle.data('loaded') == 1){
		return;
	}
	/*
	
	window.addEventListener('popstate', function (event) {
		// Log the state data to the console
		console.log(event);
		console.log(event.state);
		//WEB_COMMON.sethistoryPushStateChange(event.state, event);
		alert('change');
	});
	*/
	$infoEle.data('loaded', 1);
	
	//a binding
	//$( "a.on-link-href" ).bind( "click");
	//$( "a.on-link-href" ).bind( "click", function(e) {
	$(document).on('click', 'a.on-link-href', function(e) {	
	//$('nav a').click(function(e) {
		//e.preventDefault();
		
		console.log('on-post clikc');
		
		var self = this;
		//var url = $(self).attr("href");
		//console.log('url', url);
		
		//This function would get content from the server and insert it into the id="content" element
		//$.getJSON("content.php", {contentid : url},function (data) {
			//$("#content").html(data);
		//});
		
		//This is where we update the address bar with the 'url' parameter
		
		//selected target
		$('.web-contents-list-li').removeClass('now_v');
		$(this).closest('.web-contents-list-li').addClass('now_v');
		
		WEB_COMMON.sethistoryPushStateChange(self, e);
		
		//This stops the browser from actually following the link
		e.preventDefault();
		return false;
	});
	
	window.onpopstate = function(event) {
		//$("#loading").show();
		console.log('window.onpopstate');
		console.log('event');
		console.log(event);
		console.log("pathname: "+location.pathname);
		var showLocation = location.pathname;
		var urlQuery = getUrlParams();
		console.log('urlQuery',urlQuery);
		
		//loadContent(location.pathname);
		//앞으로 버튼이 view를 호출하고 있으면
		if(isDefined(event.state)){
			if(showLocation.indexOf('/contents/web/') != -1) {
				var modalData = event.state;
				console.log('modalData', modalData);
				var contentsIdx = null;
				if(isDefined(modalData.bbs_id)){
					contentsIdx = modalData.bbs_id;
				}
				var linkType ='rank';
				if(isDefined(modalData.link)){
					linkType = modalData.link;
				}
				var snedEle = null;
				if(isDefined(contentsIdx)){
					WEB_COMMON_GO.openContents(contentsIdx, linkType, snedEle, null);
					WEB_COMMON.DATA.CONTENTS_HISTORY.push(showLocation);
				}
			}else if(showLocation.indexOf('/category/web/') != -1) {
				if($('#category-contents-list-wrap').length < 1){
					var pushData = event.state;
					if(isDefined(pushData.url)){
						location.href = pushData.url;
					}
				}
				//location.href = showLocation;
				//return;
			}else if(showLocation.indexOf('/search/?') != -1) {
				if($('#search-contents-list-wrap').length < 1){
					var pushData = event.state;
					if(isDefined(pushData.url)){
						location.href = pushData.url;
					}
				}
				
				//location.href = showLocation;
				//return;
			}else if(showLocation.indexOf('/channel/?') != -1) {
				if($('#seller-channel-contents-list-wrap').length < 1){
					var pushData = event.state;
					if(isDefined(pushData.url)){
						location.href = pushData.url;
					}
				}
				
				//location.href = showLocation;
				//return;
			}
		}else{
			//만일 view 모달이 열려 있으면 닫는다
			if($('.contents-view-blocker').length > 0){
				if($('.contents-view-blocker').hasClass('current')){
					console.log('close view modal');
					$.modal.close();
					WEB_COMMON.DATA.CONTENTS_HISTORY = [];
				}
			}
			
			if(showLocation.indexOf('/category/web/') != -1) {
				//location.href = showLocation;
				//return;
			}
		}
	};
	WEB_COMMON.DATA.ONPOPSTATE_BINDING = true;
	console.log('popstate binding');
};


//bbq hash setting
WEB_COMMON.setBbqHasSystem = function(pageMain, pageSub, pageData){
	
	console.log('WEB_COMMON.setBbqHasSystem', pageMain);
	
	var $infoEle = $('#onplayFormHeaderLoadedInfo').find('.onplay_form_info_bbq_load');
	if($infoEle.length < 1){
		return;
	}
	
	
	var successLoadAfterActionFun = function(){
		console.log('setBbqHasSystem successLoadAfterActionFun');
		//bbq hash
		$(window).on('hashchange', WEB_COMMON.setHashChange);
		//$infoEle.data('loaded', 1);
		
		WEB_COMMON.loadPageScriptBinding(pageMain, pageSub, pageData);
	}
	
	if($infoEle.data('loaded') == 1){
		successLoadAfterActionFun();
		return;
	}
	
	var scriptSrc = $('#onplay_form_info_bbq_load').val();
	if(isDefined(scriptSrc)){
		loadJsAsync(scriptSrc, successLoadAfterActionFun,'onplay_form_info_bbq_load');	
	}
	
	//load kakao api
	if($('.kakao_developers_1').data('loaded') == 1){
		PAGE_CONTENTS.initKakaoShareBtnBinding();
	}else{
		
		var successLoadKakaoCallbackFun = function(){
			console.log('successLoadKakaoCallbackFun');
			PAGE_CONTENTS.initKakaoShareBtnBinding();
		}
		
		var kakaoJs = $('#kakao_developers_1').val();
		if(isDefined(kakaoJs)){
			loadJsAsync(kakaoJs, successLoadKakaoCallbackFun, 'kakao_developers_1');	
		}
		
	}
};


//post message get
WEB_COMMON.receiveMessage = function(event){
	console.log('WEB_COMMON.receiveMessage');
	console.log(event);
	var DF = get_disk_config(false);
	console.log(DF);
	console.log(window);
	var senderHost = event.origin;
	if(isDefined(event.data) == false){
		return;
	}
	var parentData = event.data;
	console.log('parentData', parentData);
	
	if(!parentData['action']){
		return;	
	}
	
	console.log('DF.SERVER_HOST',DF.SERVER_HOST);
	console.log('senderHostT', senderHost);

	//omh auth 하위 도메인 추가로 인한 업데이트
	var serverhost = DF.SERVER_HOST;
	var separate = DF.SERVER_HOST.split('.');
    if(separate.length >2 && separate[1] == 'onplay'){
		separate.shift();
		serverhost = separate.join('.');
		console.log(senderHost);
		console.log(' vs ');
		console.log(serverhost);
	}
	// end
	/*
	if (senderHost.indexOf(serverhost) == -1) {
		console.log('not match host');
		return;
	}
	*/
	
	
	//alert('else');
	//return;
	
	var loginCallbackFun = function(data){
		console.log('loginCallbackFun');
		console.log(data);
		
		
		if(isDefined(event.data) == false){
			return;
		}
		//alert('goPayPage');
		/*
		var goPayPage = function(){
			var remainingHour = getCountDownTimer('11/04/2020 4:00 PM', 'hours');
			//alert(remainingHour);
			if(parseInt(remainingHour) < 1){
				return false;
			}
			var cKey = DF.cookiePrefix+'pay_msg';
			var payCookieMsg = $.cookie(cKey);
			if(payCookieMsg != 1){
				$.cookie(cKey, 1, { expires: 1,  path: '/', domain: DF.COOKIE_DOMAIN });
				alert("오픈 기념 50%할인 이벤트 종료까지 "+remainingHour+"시간 남았습니다.\n\n지금 충전하시면\n포인트 2배 적립과 + 500,000B를 추가로 드립니다.");
				isAlert = true;
				location.href = '/charge';
				return true;
			}
			return false;
		}
		*/
		
		
		//return;
		if(parentData['action']){
			if(parentData['action'] == 'reload'){
				var rt = PAGE_LOGIN.LOGIN.shoPayAlert();
				if(rt == true){
					return false;
				}
				location.reload(true);
				return;
			//성인 인증이면
			}else if(parentData['action'] == 'adult'){
				var targetUrl = parentData['link'];
				var thisUrl = getSelfHostFullUrl();
				
				if(targetUrl == thisUrl){
					location.reload(true);
					return;
				}
				location.href = targetUrl;
				//return;
				return;
				
				
			}else if(parentData['action'] == 'go'){
				if(isDefined(parentData['link'])){
					var targetUrl = parentData['link'];
					var thisUrl = getSelfHostFullUrl();
					console.log('thisUrl', thisUrl);
					//alert('targetUrl:'+targetUrl);
					var rt = PAGE_LOGIN.LOGIN.shoPayAlert();
					if(rt == true){
						return false;
					}
					if(targetUrl == thisUrl){
						location.reload(true);
						return;
					}
					location.href = targetUrl;
					return;
				}
				GO_HOME();
				return;
			}else if(parentData['action'] == 'home'){
				var rt = PAGE_LOGIN.LOGIN.shoPayAlert();
				if(rt == true){
					return false;
				}
				GO_HOME();
				return;
			//sns 연동해제
			}else if(parentData['action'] == 'sns_connect'){
				console.log('sns_connect');
				PAGE_MY.info.getReloadSnsConnectList();
			}
		}
		
	};
	
	DISK_MEMBER_FUN.getMemberLoginInfo(0, loginCallbackFun, 1);
	
};


//스크롤 스파이 쓸 경우 동적 로딩 - 페이지 나중에 슬겨우
WEB_COMMON.scrollSpyBinding = function(callbackFun){
	
	console.log('WEB_COMMON.scrollSpyBinding');
	
	var $infoEle = $('#onplayFormHeaderLoadedInfo').find('.scrollspy_js_file');
	if($infoEle.length < 1){
		return;
	}
	if($infoEle.data('loaded') == 1){
		if (typeof callbackFun === "function"){
			callbackFun(true);
			return;
		}
		return;
	}
	
	var successLoadAfterActionFun = function(){
		console.log('scrollspy_js_file successLoadAfterActionFun');
		if (typeof callbackFun === "function"){
			callbackFun(true);
			return;
		}
		return;
	}
	
	var scriptSrc = $('#scrollspy_js_file').val();
	if(isDefined(scriptSrc)){
		loadJsAsync(scriptSrc, successLoadAfterActionFun,'scrollspy_js_file');	
	}
};

WEB_COMMON.loadPageScriptBinding = function(pageMain, pageSub, pageData){
	console.log('WEB_COMMON.loadPageScriptBinding:', pageMain);

	if(isDefined(pageMain)){
		WEB_COMMON.DATA.MAIN = pageMain;
	}
	if(isDefined(pageSub)){
		WEB_COMMON.DATA.SUB = pageSub;
	}
	console.log(WEB_COMMON.DATA);
	
	if(pageMain.indexOf('my_seller') != -1) {
		PAGE_MY_SELLER.start(pageMain, pageSub, pageData);
		return;
	}

	switch(pageMain) {
		case 'home':
		case 'main':
			PAGE_HOME.start(pageSub, pageData);
			break;
		case 'rank':
			PAGE_BEST.start(pageSub, pageData);
			break;	
		case 'category':
			PAGE_CATEGORY.start(pageSub);
			break;
		case 'search':
			PAGE_SEARCH.start(pageSub, pageData);
			//WEB_COMMON.setContentsListfilterBtnBinding(PAGE_CHANNEL.SELLER.setCategoryPage);
			break;
		case 'broadcast':
			PAGE_BROADCAST.start(pageSub);
			break;
		case 'movie':
			//PAGE_CHANNEL_MOVIE.start(pageSub);
			PAGE_MOVIE.start(pageSub, pageData);
			break;
		case 'mag':
			PAGE_MAG.start(pageSub, pageData);
			break;	
		case 'ani':
			PAGE_ANI.start(pageSub, pageData);
			break;
		case 'channel_home':
			PAGE_CHANNEL_ON_HOME.start(pageSub, pageData);
			break;	
		case 'channel':
			PAGE_CHANNEL.start(pageSub);
			break;
		case 'channel_search':
			PAGE_CHANNEL_SEARCH.start(pageSub);
			break;
		case 'theme':
			PAGE_THEME.start(pageSub);
			break;
		case 'event':
			PAGE_EVENT.start(pageSub, pageData);
			break;
		case 'my':
			PAGE_MY.start(pageSub, pageData);
			break;
		case 'seller':
			PAGE_SELLER.start(pageSub, pageData);
			break;
		case 'my_seller':
		case 'my_seller_category':
		case 'my_seller_top':
		case 'my_seller_premium':
			PAGE_MY_SELLER.start(pageMain, pageSub, pageData);
			break;	
		case 'disk':
			PAGE_DISK.start(pageSub);
			break;
		case 'contents':
			PAGE_CONTENTS.start(pageSub, pageData);
			break;
		case 'login':
			PAGE_LOGIN.start(pageSub);
			break;
		case 'upload':
			PAGE_UPLOAD.start(pageSub);
			break;
		case 'cs':
		case 'cs_qa':
		case 'cs_notice':
		case 'cs_faq':
		case 'cs_news':
			PAGE_CS.start(pageMain, pageSub, pageData);
			break;
		case 'request':
			PAGE_REQUEST.start(pageSub, pageData);
			break;
		case 'coupon':
			PAGE_COUPON.start(pageSub, pageData);
			break;
		case 'user':
			PAGE_USER.start(pageSub, pageData);
			break;
		case 'toptoon':
			PAGE_TOPTOON.start(pageSub, pageData);
			break;
		case 'touchbook':
			PAGE_WEBNOVEL.start(pageSub, pageData);
			break;	
		default:
			PAGE_HOME.start(pageSub);
            break;
	}
}


//push state change fun - when hash change
WEB_COMMON.sethistoryPushStateChange = function(thisEle, e){
	console.log('WEB_COMMON.sethistoryPushStateChange:');
	
	console.log(thisEle);
	
	if(isDefined(thisEle) == false){
		return;
	}
	
	if($(thisEle).length < 1){
		return;
	}
	
	var linkUrl = $(thisEle).attr('href');
	var urlType = 'contetns';
	var thisData = $(thisEle).data();
	var eleData = thisData;
	var snedEle = thisEle;
	var pushType = 'contents';
	var contentsIdx = null;
	var linkType = 'rank';
	if(isDefined(thisData.type)){
		pushType = thisData.type;
	}
	if(isDefined(thisData.idx)){
		contentsIdx = thisData.idx;
	}
	if(isDefined(thisData.contents_type)){
		linkType = thisData.contents_type;
	}
	if(isDefined(thisData.target)){
		console.log('a');
		if($(thisData.target).length > 0){
			console.log('b');
			eleData = $(thisData.target).data();
			snedEle = thisData.target;
			console.log('target');
		}
	}
	console.log('linkUrl', linkUrl);
	console.log('thisData', thisData);
	console.log('eleData', eleData);
	
	if(isDefined(linkUrl)){
		//window.history.pushState('object', 'New Title', linkUrl);	
		
		WEB_COMMON_GO.openContents(contentsIdx, linkType, snedEle, linkUrl);
	}
	return;
};


//bbq hash change fun - when hash change
WEB_COMMON.setHashChange = function(){
	console.log('WEB_COMMON.setHashChange:');
	
	WEB_COMMON.DATA.CHANGE_HASH = location.hash;

	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	var hashAction = null;
	if(hashPrams['!action']){
		hashAction = hashPrams['!action'];
		//startPage = loadedPage;
	}
	console.log('hashAction', hashAction);
	console.log(hashPrams);


	//view close
	if(hashAction == 'contents'){
		/*
		if(isDefined(hashPrams['idx'])){
			console.log('bbs idx', hashPrams['idx']);
			var $conetnsEle = $(".contents-list-link-area-"+hashPrams['idx']);
			if($conetnsEle.length > 0){
				var conentsData = $conetnsEle.data();
				console.log('conentsData', conentsData);
				var is_adult = 0;
				if(isDefined(conentsData.is_adult)){
					is_adult = conentsData.is_adult;
				}
				else if(isDefined(conentsData.adult)){
					is_adult = conentsData.adult;
				}
				if(is_adult == 1){
					//로그인 체크
					if(utility.disk.checkIsLogin() != true){
						GO_MENU('login');
						return;
					}
					if(utility.disk.checkIsRealName() != true){
						GO_MENU('real_name');
						return;
					}
				}
			}
		}
		*/
	}else{
		if($('.wrap-contents-modal-view').length > 0){
			$.modal.close();
			if(isDefined(PAGE_CONTENTS.DATA.SLICK)){
				PAGE_CONTENTS.DATA.SLICK.slick('unslick');
			}
			$('#disk-pc-contents-view-modal').empty();
		}
		if(isDefined(location.hash)){
			WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH =	location.hash;
			
		}
		/*
		else{
			var hostHref = document.location.href;
			if (hostHref.indexOf('#') == -1) {
				WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST =	document.location.href;
			}
		}
		*/
		WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST =	document.location.href;
		
		
	}

	switch(hashAction) {
		case 'home':
		case 'main':
			break;
		case 'category':
			PAGE_CATEGORY.setHashCheck(hashPrams);
			break;
		case 'search':
			PAGE_SEARCH.setHashCheck(hashPrams);
			break;
		case 'contents':
			if(hashPrams['idx']){
				if($.isNumeric(hashPrams['idx'])){
					var linkType = 'category';
					if(hashPrams['link']){
						if(isDefined(hashPrams['link'])){
							linkType = hashPrams['link'];
						}

					}
					PAGE_CONTENTS.DATA.OPENED_HASH_IDX = parseInt(hashPrams['idx']);
					WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']), linkType);
				}
				break;
			}
			break;
		case 'movie_list':
			PAGE_MOVIE_M_LIST.setHashCheck(hashPrams);
			break;
		case 'theme_list':
			PAGE_THEME_LIST.setHashCheck(hashPrams);
			break;
		case 'event_list':
			PAGE_EVENT_LIST.setHashCheck(hashPrams);
			break;
		case 'broadcast_list':
			PAGE_BROADCAST_B_LIST.setHashCheck(hashPrams);
			break;
    	case 'ani_list':
			PAGE_ANI_A_LIST.setHashCheck(hashPrams);
			break;
		case 'my':
			PAGE_MY.setHashCheck(hashPrams);
			break;
		case 'seller':
			PAGE_SELLER.setHashCheck(hashPrams);
			break;


		case 'login':
			$('#disk-pc-login-modal').modal({
				clickClose	: false,
				escapeClose	: false
			});
			break;
		case 'channel':
			/*
			if(hashPrams['type']){
				if(hashPrams['type'] == 'seller'){
					PAGE_CHANNEL.SELLER.setHashCheck(hashPrams);
				}
				break;
			}
			*/
			PAGE_CHANNEL.setHashCheck(hashPrams);
			break;
		case 'notice':
		case 'faq':
		case 'qa':
			PAGE_CS.setHashCheck(hashPrams);
			break;
		case 'request':
			PAGE_REQUEST.setHashCheck(hashPrams);
			break;
		case 'my_seller_logs':
			PAGE_MY_SELLER.logs.getSellerLogPageData(hashPrams.page, null);
			break;	
		case 'disk':
			break;
		case 'upload':

			break;
		default:
            break;
	}

	return;
};


WEB_COMMON.onclickCategoryMain = function(thisEle){
	console.log('WEB_COMMON.onclickCategoryMain');
	var eleData = $(thisEle).data();

	console.log('eleData', eleData);

	$('.top-sub-category.active').removeClass('active');
	$('.top-sub-category.'+eleData.type).addClass('active');


};



//공통 처리
WEB_COMMON.defaultBinding = function(){
	console.log('WEB_COMMON.defaultBinding');
	
	if(isDefined(location.hash)){
		var checkHash = location.hash;
		if(checkHash.indexOf('contents') < 0) {
			WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH =	location.hash;
			WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST =	document.location.href;
		}
	}
	
	
	var DF = get_disk_config(false);
	var isLoginedMember = utility.disk.checkIsLogin();

	//회원 로그인에 따른 노출 처리
	DISK_MEMBER_FUN.setMemberInfo(null, false);


	if(isLoginedMember == true){
		console.log('isLoginedMember');
		//세션여부 체크 - 세션을 읽었을때만
		var hasAutoLogin = $.cookie(DF.cookiePrefix+'has_auto_login');
		if(parseInt(hasAutoLogin) == 1){
			console.log('hasAutoLogin : 1');
			DISK_MEMBER_FUN.setAutoLogin(false);
		}

		//상단 메모 & 새소식
		DISK_MEMBER_FUN.setMemberNotice(false);

	}else{
		//로그인버튼 바인딩
		PAGE_LOGIN.LOGIN.formBinding();
	}

	//회원가입 버튼 바인딩
	/*
	$( ".btn-disk-join" ).unbind( "click");
	$( ".btn-disk-join" ).bind( "click", function() {
		console.log('.btn-disk-join');
		GO_JOIN();

	});
	*/

	//로그인 버튼 바인딩
	$( ".btn-disk-login" ).unbind( "click");
	$( ".btn-disk-login" ).bind( "click", function() {
		console.log('.btn-disk-login');
		//$('#disk-pc-login-modal').modal();
		GO_LOGIN();
	});


	//상단 자녀보호 버튼
	if($( "#top-pc-disk-safe-child" ).length > 0){
		$( "#top-pc-disk-safe-child" ).unbind( "click");
		$( "#top-pc-disk-safe-child" ).bind( "click", function() {
			console.log('top-pc-disk-safe-child click');

			var changeSafeChildVal = 1;
			if($(this).hasClass('active')){
				changeSafeChildVal = 2;
			}
			var loadData = $(this).data('loaded');
			console.log('loadData', loadData);

			console.log('changeSafeChildVal', changeSafeChildVal);

			if(loadData == changeSafeChildVal){
				return;
			}

			var $targetModal = $('#disk-pc-common-modal');
			$targetModal.empty();
			var isLogined = utility.disk.checkIsLoginWithModal();
			if(isLogined != true){
				return;
			}

			if(isDefined(changeSafeChildVal) == false || $.isNumeric(changeSafeChildVal) == false){
				console.log('변경된 정보가 없습니다.');
				return;
			}

			var eleData = {
				member_safe_child : changeSafeChildVal
			};

			var isModalCloseExisting = true;
			var modalHtml = TEMPLETE.WEB_PAGE_MODAL.setMemberSafeChildModeHtml(eleData);
			if(isDefined(modalHtml)){
				$targetModal.html(modalHtml).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-modal-blocker",
					clickClose		: false,
					escapeClose		: false
				});
			}


			//$(this).toggleClass('active');

		});
	}
	
	//view befor open
	$('#disk-pc-contents-view-modal').on($.modal.BEFORE_OPEN, function(event, modal) {
		console.log('disk-pc-contents-view-modal before open');
		
		console.log('=====================modal BEFORE_OPEN=========================');
		console.log('event',event);
		console.log('modal',modal);
		console.log('hash', location.hash);
		console.log('modal data', $(this).data());
		
		
		var modalData = $(this).data();
		var modalTitle = 'onplay contents'+modalData.bbs_id;
		var contentsTitle = $(this).find('.disk-contents-view-tit').find('.txt').text();
		if(isDefined(contentsTitle)){
			modalTitle = contentsTitle;
		}
		modalData.title = modalTitle;
		console.log('modalData', modalData);
		if(isDefined(modalData)){
			if(isDefined(modalData.url)){
				if(WEB_COMMON.DATA.CONTENTS_HISTORY.length > 0){
					window.history.replaceState(modalData, modalTitle, modalData.url);
				}else{
					window.history.pushState(modalData, modalTitle, modalData.url);
					WEB_COMMON.DATA.CONTENTS_HISTORY.push(modalData.url);	
				}
			}
		}
		
		
		
	});

	

	$( ".modal").unbind( "on" );
	$('.modal').on($.modal.OPEN, function(event, modal) {

		console.log('=====================modal open=========================');
		console.log('event',event);
		console.log('modal',modal);
		console.log('hash', location.hash);
		console.log('WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH', WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH);
		console.log('WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST', WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST);
			

		if($('.jquery-modal.blocker.behind').length < 1 ){
			jQuery('body').css({'padding-right': '17px'});
		}


		console.log(this);
		var modalEleId =  $(this).attr('id');
		var modalEleData = $(this).data();
		//var modalEleId =  $(modal.$elm[0]).attr('id');
		console.log('modalEleId:', modalEleId);
		if(modalEleId == 'disk-pc-login-modal'){
			PAGE_LOGIN.LOGIN.modalFormBinding();
		}
		else if(modalEleId == 'disk-pc-contents-view-modal'){
			$('#disk-pc-contents-view-modal').data('loaded', modalEleData.bbs_id);
			PAGE_CONTENTS.DATA.OPENED_MODAL_IDX = modalEleData.bbs_id;
			PAGE_CONTENTS.start('modal', modalEleData);
		}else if(modalEleId == 'disk-pc-common-modal'){
			//판매자 아이템 구매 모달인 경우
			if($('#disk-pc-common-modal').find('.modal-content.seller_item')){
				PAGE_MY_SELLER.buyItemModal.intBinding();
			}
		}
		//if(IsBrowserChrome_FC() == true){
         //alert('IsBrowserChrome_FC');

        //}
	});
	
	
	

	//$( ".modal").unbind( "on" );
	$('.modal').on($.modal.BEFORE_CLOSE, function(event, modal) {

		console.log('=====================BEFORE_CLOSE=========================');
	});


	$('.modal').on($.modal.AFTER_CLOSE, function(event, modal) {
		console.log('=========================AFTER_CLOSE ========================');
		console.log('event',event);
		console.log('modal',modal);
		//if(IsBrowserChrome_FC() == true){
            //jQuery('body').css({'padding-right': '0px'});
        //}
        //if($('.jquery-modal.blocker').length < 1 ){
       	if($.modal.isActive() == false){
			jQuery('body').css({'padding-right': '0px'});
		}
        var modalEleId =  $(modal.$elm[0]).attr('id');
		console.log('modalEleId', modalEleId);

		var hashPrams = null;
		if(isLoadedBbqScript() == true){
			hashPrams = $.deparam.fragment();
		}	
		console.log('hashPrams', hashPrams);

		//서브 모달이 비어 있는 경우 삭제
		if($('.common-modal-blocker').length > 0){
			if($('.common-modal-blocker').find('.common-modal-container').length < 1){
				//$('.common-modal-blocker').remove();
			}
		}


		//로그인 창 닫힐때
		if(modalEleId == 'disk-pc-login-modal'){
			/*
			if(hashPrams['!action']){
				if(hashPrams['!action'] == 'login'){
					//location.hash = '#';
					//해시 제거
					history.pushState('', document.title, window.location.pathname);
					return;
				}
				//해시 새로고침
				if(utility.disk.checkIsLogin() == true){
					$(window).trigger('hashchange');
				}else{
					history.back(true);
				}
			}
			*/
		//view 가 닫힐때
		}else if(modalEleId == 'disk-pc-contents-view-modal'){
			var eleData = $('#disk-pc-contents-view-modal').data();
			console.log('disk-pc-contents-view-modal close');
			console.log('eleData',eleData);
			console.log('hashPrams', hashPrams);
			console.log('----------------------------OPENED_MODAL_IDX-------------------------');
			console.log(PAGE_CONTENTS.DATA.OPENED_MODAL_IDX);
			console.log('WEB_COMMON.DATA.CHANGE_HASH',WEB_COMMON.DATA.CHANGE_HASH);
			console.log('WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH', WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH);
			console.log('WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST', WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST);
			
			
			var length= history.length;
			console.log('length', WEB_COMMON.DATA.CONTENTS_HISTORY.length);     
			//history.go(-length);
			//history.back();
			//window.location.replace("urlToRedirect");
			//history.back();
			/*
			for (i = 0; i < length; i++) {
			  history.pushState({}, '');
			}
			*/
			
			if(WEB_COMMON.DATA.CONTENTS_HISTORY.length > 0){
				WEB_COMMON.DATA.CONTENTS_HISTORY.pop();
				history.back();
			}
			
			return;
			

			/*
			if(isDefined(WEB_COMMON.DATA.CHANGE_HASH) == false){
				return;
			}else{
				
			}
			*/
			var curHash = location.hash;
			console.log('curHash', curHash);
			if (curHash.indexOf('action=contents') == -1) {
				return;
			}
			
			
			if(isDefined(WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH) == false && isDefined(WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST) == false){
				console.log('has contents hash');
				jQuery.bbq.removeState();
				return;
			}else if(isDefined(WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH) == true || isDefined(WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST) == true){
				/*
				var retrunUrl = WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HOST;
				if (retrunUrl.indexOf('/login') != -1 || retrunUrl.indexOf('/join') != -1) {
					retrunUrl = '/home/';
					location.href = retrunUrl;
					return;
				}else if (retrunUrl.indexOf('/user/') != -1 || retrunUrl.indexOf('/user/') != -1) {
					retrunUrl = '/home/';
					location.href = retrunUrl;
					return;
				}
				
				var retrunHash = WEB_COMMON.DATA.BEFORE_CONTENS_LAST_HASH;
				if (retrunHash.indexOf('/login') != -1 || retrunHash.indexOf('/join') != -1) {
					//retrunUrl = '/home/';
					jQuery.bbq.removeState();
					return;
				}else if (retrunHash.indexOf('/user/') != -1 || retrunHash.indexOf('/user/') != -1) {
					//retrunUrl = '/home/';
					jQuery.bbq.removeState();
					return;
				}
				*/
				
				history.back(true);
				return;
			}
			
			
			/*
			if(hashPrams['!action'] == 'contents'){
				console.log('has contents hash');
				jQuery.bbq.removeState();	
			}
			return;
			*/
			return;
			/*
			if(hashPrams['!action'] == 'contents'){
				//if(hashPrams['idx'] == eleData.bbs_id){
				if(hashPrams['idx'] == PAGE_CONTENTS.DATA.OPENED_MODAL_IDX && hashPrams['idx'] == eleData.bbs_id){
					console.log('same idx');
					//return;
					history.back(true);
					return;
				}else{
					if(eleData.link == 'seller' && eleData.bbs_id == eleData.loaded){
						console.log('seller loaded');
						history.back(true);
						return;
					}
				}
			}
			*/
		}

	});


	//닫기 버트 바인딩
	if($('.btn-close-self-contents').length > 0){
		$(".btn-close-self-contents").unbind( "click" );
		$( ".btn-close-self-contents" ).bind( "click", function() {
			console.log('.btn-close-self-contents');
			var eleData = $(this).data();
			if(isDefined(eleData.target) == true){
				$( '#'+eleData.target).slideToggle('fast');
			}
		});
	}

	//오른쪽 배너
	if($('#sub_right_banner_slick').find('.banner_img').length > 0){
		$('#sub_right_banner_slick').slick({
			infinite: true,
			speed: 500,
			fade: false,
			autoplay: true,
			autoplaySpeed	: 3500,
			cssEase: 'linear',
			arrows : false,
			dots	: false
		});
	}

	//검색 form 바인딩
	var $searchFormEle = $("#diskTopMainSearchForm");
	if($searchFormEle.length > 0){
		$searchFormEle.unbind( "submit");
		$searchFormEle.submit(function(event){
			//event.preventDefault();
			var formValues = $(this).serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData:',formData);

			if(isDefined(formData.k) == false || formData.k.length < 2){
				alert('찾을 파일이나 콘텐츠 제목을 2자 이상 입력해주세요.');
				$searchFormEle.find('input[name=k]').focus();
				return false;
			}

			return true;
		});
	}
	
	//쿠폰 등록
	/*
	if($( ".main-input-coupon-wrap" ).length > 0){
		$( ".main-input-coupon-wrap" ).bind( "click");
		$( ".main-input-coupon-wrap" ).bind( "click", function() {
			console.log('main-input-coupon-wrap click');
			//로그인 채크
			if(utility.disk.checkIsLoginWithModal() == false){
				console.log('not login');
				return;
			}
			GO_MENU('coupon');
		});
	}
	*/
	
	//툴팁
	WEB_COMMON.setDiskToolTipster();

	WEB_COMMON.setImageLazy();
};

WEB_COMMON.setImageLazy = function(){
	//image lazy
	if($('.disk-image-lazy').length > 0){
		$('.disk-image-lazy').lazy();
	}
};

//툴팁
WEB_COMMON.setDiskToolTipster = function(){

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


//페이지 데이타 로드 후 바인디
WEB_COMMON.setBindingAfterPageDataLoad = function(){
	console.log('WEB_COMMON.setBindingAfterPageDataLoad');
	
	//WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS
	//페이에 로드된 conents idxs 
	var nonColorCnt = 0;
	var eleCnt = 0;
	var nonCopyIdx = [];
	if($( ".contents-list-info-area" ).length > 0){
		WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS = [];
		$( ".contents-list-info-area" ).each(function( index ) {
			var listData = $(this).data();
			//console.log('listData', listData);
			if(isDefined(listData)){
				if(isDefined(listData.idx)){
					WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS.push(parseInt(listData.idx));
				}
				if(isDefined(listData.copy)){
					if(listData.copy == '0'){
						nonCopyIdx.push(index);	
					}	
				}
				if($(this).hasClass('none-color')){
					nonColorCnt++;
				}
			}
			eleCnt++;
			
		});
	}
	console.log('WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS', WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS);
	
	//제목 타이틀 추가
	/*
	console.log('nonColorCnt', nonColorCnt);
	console.log('eleCnt', eleCnt);
	console.log('nonCopyIdx', nonCopyIdx);
	//var rankInt = getRandomInt(0, nonCopyIdx.length);
	console.log('rankInt', rankInt);
	
	if(nonColorCnt > 0 && nonColorCnt == eleCnt){
		var rankInt = getRandomInt(0, nonCopyIdx.length);
		for(var i = 0; i< 4; i++){
			rankInt = getRandomInt(0, nonCopyIdx.length);
			console.log('rankInt', rankInt);
			$( ".contents-list-info-area" ).find('.tit_none-color').eq(rankInt).addClass('tit_green');
			$( ".thumb-item" ).find('.tit_none-color').eq(rankInt).addClass('tit_green');
			
		}
		for(var i =0; i< 2; i++){
			rankInt = getRandomInt(0, nonCopyIdx.length);
			console.log('rankInt', rankInt);
			$( ".contents-list-info-area" ).find('.tit_none-color').eq(rankInt).addClass('tit_blue');
			$( ".thumb-item" ).find('.tit_none-color').eq(rankInt).addClass('tit_blue');
		}
		
		rankInt = getRandomInt(0, nonCopyIdx.length);
		console.log('rankInt', rankInt);
		$( ".contents-list-info-area" ).find('.tit_none-color').eq(rankInt).addClass('tit_red');
		$( ".thumb-item" ).find('.tit_none-color').eq(rankInt).addClass('tit_red');
	}
	*/
	
	
};


