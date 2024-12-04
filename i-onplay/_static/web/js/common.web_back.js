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
	WEB_COMMON.loadPageScriptBinding(pageMain, pageSub, pageData);
	
	//bbq hash
	$(window).on('hashchange', WEB_COMMON.setHashChange);
	
	//common binding
	//modal defaults
	/*
	$.modal.defaults = {
		closeExisting	: false,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
		modalClass		: "modal",    // CSS class added to the element being displayed in the modal.
  		blockerClass	: "modal-blocker",  // CSS class added to the overlay (blocker).
		
	};
	*/
});






var WEB_COMMON = {};
WEB_COMMON.DATA = {
	MAIN	: null,
	SUB		: null,	
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
	
	
	switch(pageMain) {
		case 'home':
		case 'main':
			PAGE_HOME.start(pageSub);
			break;
		case 'category':
			PAGE_CATEGORY.start(pageSub);
			
			break;
		case 'search':
			PAGE_SEARCH.start(pageSub);
			//WEB_COMMON.setContentsListfilterBtnBinding(PAGE_CHANNEL.SELLER.setCategoryPage);
			break;
		case 'broadcast':
			PAGE_BROADCAST.start(pageSub);
			break;
		case 'movie':
			//PAGE_CHANNEL_MOVIE.start(pageSub);
			PAGE_MOVIE.start(pageSub);
			break;
		case 'ani':
			PAGE_ANI.start(pageSub);
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
		case 'disk':
			PAGE_DISK.start(pageSub);
			break;	
		case 'contents':
			PAGE_CONTENTS.start(pageSub);
			break;
		case 'login':
			PAGE_LOGIN.start(pageSub);
			break;
		case 'upload':
			PAGE_UPLOAD.start(pageSub);
			break;
		default:
			PAGE_HOME.start(pageSub);
            break;
	}
} 

//bbq hash change fun - when hash change
WEB_COMMON.setHashChange = function(){
	console.log('WEB_COMMON.setHashChange:');	

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
	if(hashAction != 'contents'){
		if($('.wrap-contents-modal-view').length > 0){
			$.modal.close();
			if(isDefined(PAGE_CONTENTS.DATA.SLICK)){
				PAGE_CONTENTS.DATA.SLICK.slick('unslick');
			}
			$('#disk-pc-contents-view-modal').empty();
		}
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
					WEB_COMMON.openContentsModal(parseInt(hashPrams['idx']), linkType);	
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
		case 'my':
			PAGE_MY.setHashCheck(hashPrams);
			break;
		case 'seller':
			PAGE_SELLER.setHashCheck(hashPrams);
			break;
			
			
		case 'login':
			$('#disk-pc-login-modal').modal();
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
				
		case 'disk':

			break;	
		case 'upload':

			break;
		default:
            break;
	}
	
	return;
} 




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
	}else{
		//로그인버튼 바인딩
		PAGE_LOGIN.LOGIN.formBinding();
	}
	
	//회원가입 버튼 바인딩
	$( ".btn-disk-join" ).unbind( "click");
	$( ".btn-disk-join" ).bind( "click", function() {
		console.log('.btn-disk-join');
		var retrunUrl = getSelfHostFullUrl();
		console.log('retrunUrl', retrunUrl);
		if(isDefined(retrunUrl) == true){
			if (retrunUrl.indexOf('/login') != -1) {
			  retrunUrl = '/home/';
			}
			$.cookie(DF.cookiePrefix+'rt_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });
		}
		location.href = '/login/join_form/'		
	
	});
	
	//로그인 버튼 바인딩
	$( ".btn-disk-login" ).unbind( "click");
	$( ".btn-disk-login" ).bind( "click", function() {
		console.log('.btn-disk-login');
		$('#disk-pc-login-modal').modal();
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
					blockerClass	: "common-modal-blocker"
				});
			}
			
			
			//$(this).toggleClass('active');
			
		});
	}
	
	
	$( ".modal").unbind( "on" );
	$('.modal').on($.modal.OPEN, function(event, modal) {
		console.log('modal open');
		console.log('event',event);
		console.log('modal',modal);
		
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
			PAGE_CONTENTS.start('modal', modalEleData);
		}
		//if(IsBrowserChrome_FC() == true){
         //alert('IsBrowserChrome_FC');
		
        //}
	});
	
	$('.modal').on($.modal.AFTER_CLOSE, function(event, modal) {
		console.log('AFTER_CLOSE ');
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
		
		var hashPrams = $.deparam.fragment();
		console.log('hashPrams', hashPrams);
		
		//서브 모달이 비어 있는 경우 삭제
		if($('.common-modal-blocker').length > 0){
			if($('.common-modal-blocker').find('.common-modal-container').length < 1){
				//$('.common-modal-blocker').remove();
			}
		}
		
		
		//로그인 창 닫힐때
		if(modalEleId == 'disk-pc-login-modal'){
			if(hashPrams['!action'] == 'login'){
				//location.hash = '#';
				//해시 제거
				history.pushState('', document.title, window.location.pathname);
				return;	
			}
		//view 가 닫힐때
		}else if(modalEleId == 'disk-pc-contents-view-modal'){
			var eleData = $('#disk-pc-contents-view-modal').data();
			console.log('eleData',eleData);
			if(hashPrams['!action'] == 'contents'){
				if(hashPrams['idx'] == eleData.bbs_id){
					// || 
					console.log('same idx');
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
	$('.disk-tooltip').tooltipster({
		theme: 'tooltipster-light',
		//theme: 'tooltipster-shadow',
		contentCloning: true,
		debug : true,
		maxWidth	: 200,
		minWidth	: 200,
		side		: 'top'			//top', 'bottom', 'right', 'left'
	});
};

//상단 필터 바인딩
WEB_COMMON.setContentsListfilterBtnBinding = function(callbackFun){
	console.log('WEB_COMMON.setContentsListfilterBtnBinding');
	//console.log(callbackFun);
	
	//정렬 기준 버튼 클릭
	if($( "#btn-category-list-sort" ).length > 0){
		$( "#btn-category-list-sort" ).unbind( "click");
		$( "#btn-category-list-sort" ).bind( "click", function() {
			console.log('btn-category-list-sort');
			$('.btn-category-list-sort-list' ).toggleClass('active');
			
		});
	}
	
	//정렬 개수
	if($( "#btn-category-list-limit" ).length > 0){
		$( "#btn-category-list-limit" ).unbind( "click");
		$( "#btn-category-list-limit" ).bind( "click", function() {
			console.log('btn-category-list-limit');
			$( '.btn-category-list-limit-list' ).toggleClass('active');
		
		});
	}
	
	//정렬 기준 & 정렬 개수
	if($( ".category-top-filter-item" ).length > 0){
		$( ".category-top-filter-item" ).unbind( "click");
		$( ".category-top-filter-item" ).bind( "click", function() {
			console.log('category-top-filter-item');
			var eleData = $(this).data();
			console.log(eleData);
			if(isDefined(eleData.target)){
				var saveEleData = {};
				saveEleData[eleData.type] = eleData.values;
				console.log(saveEleData);
				//$('#'+eleData.target).data(saveEleData).text($(this).text()).trigger('click');
				$('#'+eleData.target).data(saveEleData).html($(this).text()+'<span class="arrow"></span>');
				$('.select-area-category-top.active').removeClass('active');
				console.log($('#'+eleData.target).data());
				console.log('callbackFun', callbackFun);
				if(isDefined(callbackFun)){
					if (typeof callbackFun === "function"){
						callbackFun(1);
						return;
					}
				}
				return;
			}
		
		});
	}
	
	//성인 제외
	if($( "#check-category-is-adult" ).length > 0){
		$( "#check-category-is-adult" ).unbind( "click");
		$( "#check-category-is-adult" ).bind( "click", function() {
			console.log('check-category-is-adult');
			if(isDefined(callbackFun)){
				if (typeof callbackFun === "function"){
					callbackFun(1);
					return;
				}
			}
			
			return;
		
		});
	}
};


//컨텐츠 오픈 - modal
WEB_COMMON.openContentsModal = function(bbsIdx, linkType){
	console.log('WEB_COMMON.openContentsModal',bbsIdx);
	console.log('linkType', linkType);
	
	
	
	if(isDefined(bbsIdx) == false){
		console.log('bbsIdx empty');
		return;
	}
	if(!$.isNumeric(bbsIdx)){
		console.log('no numberic');
		return;
		
	}
	//var ele_class_name = 
	var eleData = $('.contents-list-link-area-'+bbsIdx).data();
	console.log('eleData', eleData);
	
	//유효성 체크
	if(isDefined(eleData) == true){
		if(isDefined(eleData.idx) == true){
			if(eleData.idx == bbsIdx){
				//check
				console.log('check~~~');
			}
			
		}
	}
	
	var searchKeyword = '';
	var sellerPage = 1;
	if(linkType == 'search'){
		var formKeyword = $('#disk_search_form_keyword').val();
		if(isDefined(formKeyword)){
			searchKeyword = formKeyword;
		}
	}else if(linkType == 'search'){
		var channelFormKeyword = $('#channel_seller-search_keyword').val();
		if(isDefined(channelFormKeyword)){
			searchKeyword = channelFormKeyword;
		}
	}else if(linkType == 'seller'){
		if($('#contents-view-seller-contensts-controller').length > 0){
			var getSellerPage = $('#contents-view-seller-contensts-controller').data('page');
			console.log('getSellerPage', getSellerPage);
			if(isDefined(getSellerPage)){
				sellerPage = parseInt(getSellerPage);
			}
		}
	}
	
	
	//기존 모다은 모두 비운다.
	$('#disk-pc-contents-view-modal').empty();
	
	var saveData = {
		type	: 'modal',
		bbs_id	: bbsIdx,
		link	: linkType,
		search	: searchKeyword,
		s_page	: sellerPage
	};
	var successAjaxViewData = function(data){
		console.log('successAjaxViewData');
		//console.log(data);
		
		var viewHtml = null;
		if(data == 'ERR_ONPLAY_USER_NOT_LOGIN'){
        	return;
        }else if(data == 'ERR_ONPLAY_NOT_ADULT_REGISTER'){
        	return;
        }else{
        	viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			$('#disk-pc-contents-view-modal').html(viewHtml).data(saveData).modal({
				escapeClose: false,
				clickClose: true,
				showClose: false
			});
			
			console.log($.modal.OPEN);	
		}
	}
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CONTENTS.CONTENTS_MODAL_VIEW+''+bbsIdx;
	var formData = saveData;
	
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
  
}

//컨텐츠 오픈 - windown
WEB_COMMON.openContentsDetail = function(thisEle){
	
	var eleData = $(thisEle).data();
	
	if(isDefined(eleData.idx) == true && isDefined(eleData.url) == true){
		PopupCenter(eleData.url, 'bbsContentsDetail', 850, 880);	
	}
	return;
}


WEB_COMMON.openContents = function(bbsIdx, theEle){
	console.log('WEB_COMMON.openContents');
	
	
	
	var eleData = $(theEle).data();
	console.log('eleData', eleData);
	
	var linkType = 'rank';
	if(isDefined(eleData)){
		if(isDefined(eleData.idx) == true){
			
			//유효성 체크
			console.log('open check~~');		
			bbsIdx = parseInt(eleData.idx);
			
			
			
			
		}
		if(isDefined(eleData.link)){
			linkType = 	eleData.link;
			
			
		}
		
		
	}
	
	//seller click
	if(linkType == 'seller'){
		//$('#disk-pc-contents-view-modal').empty();
	}
	
	if(isDefined(bbsIdx) == false || $.isNumeric(bbsIdx) == false){
		alert('콘텐츠 세부 정보가 올바르지 않습니다.');
		return;
	}
	
	WEB_COMMON.openContentsModal(bbsIdx, linkType);
		
}


//파일 업로드  오픈
WEB_COMMON.openFileUploadForm = function(thisEle){
	console.log('WEB_COMMON.openFileUploadForm');
	
	//로그인 체크
	
	//판매자 체크
	
	
	var eleData = $(thisEle).data();
	console.log(eleData);
	
	var openUrl = '';
	var openCategory = 0;
	if(isDefined(eleData.url) == false){
		alert('새로고침후 다시 시도해 주세요.');
		return;
	}
	openUrl = eleData.url+'?bbsIdx=';
	
	
	//수정
	if(isDefined(eleData.idx) == true){
		openUrl += eleData.idx+'&isEdit=1';	
	}else{
		if(isDefined(eleData.cate) == true){
			openCategory = parseInt(eleData.cate);
			openUrl += '&selectedCategory='+eleData.cate;
		}
	}
	
	var rtOpen = PopupCenter(openUrl, 'bbsContentsUpload', 900, 880);
	if(rtOpen == null || rtOpen.screenLeft == 0){
		alert('팝업 차단 중');
	}
	return;
};

//이벤트 페이지로 이동 -- 리스트에서
WEB_COMMON.goEventView = function(thisEle){
	console.log('WEB_COMMON.goEventView');
	var eleData = $(thisEle).data();
	
	console.log(eleData);
	//성인 체크
	if(eleData.is_adult == 1){
		alert('성인 인증 후 이용해 주세요.');
		//임시 오픈
		if(isDefined(eleData.href)){
			console.log(eleData.href)
			window.location = eleData.href;
		}
		return;
		
	}else{
		if(isDefined(eleData.href)){
			console.log(eleData.href)
			window.location = eleData.href;
		}else{
			if(isDefined(data.idx)){
				WEB_COMMON.goEventViewIdx(data.idx);
			}
		}
	}
	
};


//이벤트 페이지로 이동 - number
WEB_COMMON.goEventViewIdx = function(eventIdx){
	
};


//쪽지 보내기 오픈
WEB_COMMON.openBbsMemoForm = function(thisEle){
	console.log('WEB_COMMON.openBbsMemoForm');
	
	
	var $targetModal = $('#disk-pc-memo-modal'); 
	$targetModal.empty();
	
	
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		return;
	}
	
	var eleData = $(thisEle).data();
	
	/*
	if(isDefined(eleData.sender) == false){
		var memberDataStorage = utility.disk.getStorageData('member_data');
		memberData = JSON.parse(memberDataStorage);
	}
	*/
	
	
	//$('#disk-pc-send-memo-modal').modal();
	
	var isModalCloseExisting = false;
	/*
	if($('.common-modal-blocker').length > 0){
		isModalCloseExisting = false;
	}
	*/
	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.sendMemoPopupHtml(eleData);	
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker"
		});
	}
		
};

//닉네일 설정 오픈
WEB_COMMON.openMemberNicknameSetForm = function(thisEle){
	console.log('WEB_COMMON.openBbsMemoForm');
	var $targetModal = $('#disk-pc-common-modal'); 
	$targetModal.empty();
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		return;
	}
	
	var eleData = $(thisEle).data();
	var isModalCloseExisting = false;
	/*
	if($('.common-modal-blocker').length > 0){
		isModalCloseExisting = false;
	}
	*/
	
	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.setMemberNickname(eleData);	
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker"
		});
	}
		
};


/*
	var saveData = {
		type	: 'modal',
		bbs_id	: bbsIdx,
	};
	var isSpinner = true;
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CONTENTS.CONTENTS_MODAL_VIEW+''+bbsIdx+'/';
	var successAjaxViewHtmlData = function(viewHtml){
		console.log('successAjaxViewData', viewHtml);
		if(isDefined(viewHtml)){
			$('#disk-pc-contents-view-modal').html(viewHtml).data(saveData).modal({
				escapeClose: false,
				clickClose: false,
				showClose: false
			});
			
			console.log($.modal.OPEN);	
		}
	}
	
	//캐싱을 위해 html를 가져온다
	var aRequest = $.ajax({
		url: contentsUrl,
		success: function(newHTML, textStatus, jqXHR) {
			
			successAjaxViewHtmlData(newHTML);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// Handle AJAX errors
		},
		beforeSend: function(XMLHttpRequest) {
			console.log('beforeSend');
			DISK_PROTOCOL.beforeAjaxSender(isSpinner);
		},
	});
	
	aRequest.always(function() {
		console.log('always');
		DISK_PROTOCOL.completedAjaxSender(isSpinner);
	});
	
	aRequest.fail(function( x, exception ) {
		console.log('ajaxError');
		console.log(x.status);
		console.debug(exception);
		DISK_PROTOCOL.requestFailAjax(x, exception);
		
	});
	*/
	/*
	$( "#disk-pc-login-modal").unbind( "on" );
	$('#disk-pc-login-modal').on($.modal.OPEN, function(event, modal) {
		console.log('disk-pc-login-modal open');
		console.log('event',event);
		console.log('modal',modal);
		PAGE_LOGIN.LOGIN.modalFormBinding();
		//if(IsBrowserChrome_FC() == true){
            //alert('IsBrowserChrome_FC');
			jQuery('body').css({'padding-right': '17px'});
        //}
	});
	
	$('#disk-pc-login-modal').on($.modal.AFTER_CLOSE, function(event, modal) {
		console.log('disk-pc-login-modal AFTER_CLOSE ');
		console.log('event',event);
		console.log('modal',modal);
		
		//if(IsBrowserChrome_FC() == true){
            jQuery('body').css({'padding-right': '0px'});
        //}
	});
	*/
