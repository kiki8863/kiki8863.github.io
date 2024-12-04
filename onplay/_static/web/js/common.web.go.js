//매뉴  이동

var GO_MENU = function(goPage, params){
	console.log('GO_MENU', goPage);
	if(isDefined(goPage) == false){
		return;
	}

	var siteHomeIndex = '';

	var pageRef = {
		'home'			: 	'/home',
		'join'		: 	'/login/join',
		'logout'	:	'/login/action_logout/?type=HTML',
		'info_edit'	: 	'/my/info/#!action=my&group=info&id=info_edit&page=1',
		'coupon'	: 	'/coupon',
		'charge'	: 	'/charge',
		'charge_fixed'	: 	'/charge/fixed',
		'adult_auth'	:	'/user/adult_form',
		'real_name'	:	'/user/realname_form',
		'toptoon'	:	'/toptoon',
		'request'	:	'/request',
	};
	
	//location.href = '/login/join_form/'
	if(goPage == 'login'){
		//$('#disk-pc-login-modal').modal();
		var isModalCloseExisting = false;
		$('#disk-pc-login-modal').modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker",
			clickClose: false,
			escapeClose: true
		});
		return;
	}else if(goPage == 'real_name'){
		
		var isModalCloseExisting = false;
		$('#disk-web-realname-modal').modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker",
			clickClose: false,
			escapeClose: true,
			showClose: false
		});
		return;
	}else{
		if(pageRef[goPage]){
			var goHref = siteHomeIndex+pageRef[goPage];
			if(isDefined(params) == true){
				if(goPage == 'home'){
					goHref += '/#!action='+params;
				}else{
					goHref += params;
				}
			}
			//alert(goHref);
			location.href = goHref;
		}
	}
};

var setLoginRedirectUrl = function(){
	console.log('setLoginRedirectUrl', location.hash);
	var retrunUrl = getLocationUrl();
	if (retrunUrl.indexOf('/login') != -1 || retrunUrl.indexOf('/join') != -1) {
		retrunUrl = '/home/';
	}else if (retrunUrl.indexOf('/user/') != -1 || retrunUrl.indexOf('/user/') != -1) {
		retrunUrl = '/home/';
	}
	console.log('retrunUrl', retrunUrl);
	var DF = get_disk_config(false);
	$.cookie(DF.cookiePrefix+'rt_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });
	
	var pageHash = location.hash;
	if(isDefined(pageHash)){
		$.cookie(DF.cookiePrefix+'rt_hash', pageHash, { path: '/',domain: DF.COOKIE_DOMAIN });
	}
	
	return true;
};


//join
var GO_JOIN = function(thisEle){
	console.log('GO_JOIN');

	//리다이렉트 페이지 저장
	setLoginRedirectUrl();
	//로그인 체크 : 이미 로그인 중인지
	if(utility.disk.checkIsLogin() == true){
		GO_MENU('home');
		return;
	}
	GO_MENU('join');
};

var GO_LOGIN = function(thisEle){
	console.log('GO_LOGIN');
	//set redirect url
	setLoginRedirectUrl();

	//로그인 체크 : 이미 로그인 중인지
	GO_MENU('login');
};


var GO_LOGOUT = function(thisEle){
	console.log('GO_LOGOUT');
	WEB_COMMON_MEMBER.logOutAction();
};

//실명인증하기
var GO_REAL_NAME = function(thisEle){
	console.log('GO_REAL_NAME');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	GO_MENU('real_name');
};

//성인 인증 하기
var GO_ADULT_AUTH = function(thisEle){
	console.log('GO_ADULT_AUTH');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	GO_MENU('adult_auth');
};

var GO_HOME = function(thisEle){
	console.log('GO_HOME');
	if(thisEle == 'login'){
		GO_MENU('home', thisEle);
		return;
	}
	GO_MENU('home');
};

var GO_CHARGE = function(chargeType){
	console.log('GO_CHARGE', chargeType);
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(chargeType == 'fixed'){
		GO_MENU('charge_fixed');
		return;
	}
	GO_MENU('charge');
};


var GO_TOPTOON = function(thisEle){
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		GO_MENU('adult_auth');
		return;
	}
	var idx = $(thisEle).data('idx');
	if(isDefined(idx)){
		location.href = '/toptoon/index/'+idx+'/';
		return;
	}
	location.href = '/toptoon';
};

var GO_WEBNOVEL = function(thisEle){
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		GO_MENU('adult_auth');
		return;
	}
	var idx = $(thisEle).data('idx');
	if(isDefined(idx)){
		location.href = '/touchbook/main/'+idx+'/';
		return;
	}
	location.href = '/touchbook/main';
};

var GO_ADULT_CATE = function(thisEle){
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		GO_MENU('adult_auth');
		return;
	}
	var cate1 = $(thisEle).data('cate1');
	if(isDefined(cate1)){
		location.href = '/category/web/'+cate1+'/';
		return;
	}
	location.href = '/category/web/21100/';
	
	//GO_MENU('toptoon');
};

//이벤트 페이지로 이동 -- 리스트에서
var GO_EVENT = function(thisEle){
	console.log('GO_EVENT');
	
	if(isAdDomain() == true){
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
	}
	location.href = '/event/e_list/1/1/';	
};


WEB_COMMON_GO = {};

//컨텐츠 오픈 - 이전 다음
WEB_COMMON_GO.moveOtherContents = function(thisEle){
	console.log('WEB_COMMON_GO.moveOtherContents');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	var bbsIdx = null;
	var moveAction = null;
	var thisPage = 1;
	if(isDefined(eleData)){
		if(isDefined(eleData.loaded)){
			bbsIdx = parseInt(eleData.loaded);
		}
		if(isDefined(bbsIdx) == false){
			bbsIdx = parseInt(eleData.idx);
		}
		if(isDefined(eleData.action)){
			moveAction = eleData.action;
		}
		if(isDefined(eleData.page)){
			thisPage = eleData.page;
		}
	}
	console.log('bbsIdx', bbsIdx);
	if(isDefined(bbsIdx) == false){
		return;
	}
	
	
	
	if(isDefined(WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS)){
		var contentsIdxs = WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS;
		console.log('contentsIdxs', contentsIdxs);
		if(contentsIdxs.length > 0){
			
			var targetIdx = null;
			var thisIndex = 0;
			var nextIdx = 0;
			for(var i in contentsIdxs){
				var sIdx = contentsIdxs[i];
				if(sIdx == bbsIdx){
					thisIndex = parseInt(i);
					break;
				}
			}
			console.log('thisIndex', thisIndex);
			
			if(moveAction == 'prev'){
				if(thisIndex == 0){
					$.ambiance({message: "현재 보고 계신 콘텐츠가 "+thisPage+"페이지에서 첫번째 콘텐츠입니다.<br>페이지 이동후 이용해주세요.", type: "alert-warning"});
					return;
				}
				nextIdx = thisIndex -1;
				
			}
			else if(moveAction == 'next'){
				if(thisIndex == (contentsIdxs.length - 1)){
					$.ambiance({message: "현재 보고 계신 콘텐츠가 "+thisPage+"페이지에서 마지막 콘텐츠입니다.<br> 페이지 이동후 이용해주세요.", type: "alert-warning"});
					return;
				}
				nextIdx = thisIndex +1;
			}
			if(nextIdx < 0){
				nextIdx = 0;
			}else if(nextIdx > (contentsIdxs.length - 1)){
				nextIdx = contentsIdxs[contentsIdxs.length - 1];
			}
			nextIdx = parseInt(nextIdx);
			console.log('nextIdx',nextIdx);
			
			if(contentsIdxs[nextIdx]){
				targetIdx = contentsIdxs[nextIdx];
			}
			console.log('targetIdx', targetIdx);
			if(isDefined(targetIdx)){
				
				//bbsIdx, linkType, hrefUrl, curentPage
				var isMove = true;
				WEB_COMMON_GO.openContentsModal(targetIdx, eleData.link, null, thisPage, isMove);
			}
			 
		}
	}
	//loaded
};

//컨텐츠 오픈 - onclick
WEB_COMMON_GO.openContents = function(bbsIdx, linkType, theEle, hrefUrl){
	console.log('WEB_COMMON_GO.openContents'+bbsIdx);
	
	var $bbsEle = null;
	var eleIdx = $(theEle).data('idx');
	var curentPage = 1;
	console.log('eleIdx', eleIdx);
	if(isDefined(eleIdx)){
		if($.isNumeric(eleIdx)){
			$bbsEle = $(theEle);
			bbsIdx = eleIdx;
		}
	}
	console.log('bbsIdx', bbsIdx);
	if(isDefined(bbsIdx) == false){
		alert('콘텐츠가 선택되지 않았습니다.');
		return;
	}
	
	if($('.contents-list-link-area-'+bbsIdx).length > 0){
		if(isDefined($('.contents-list-link-area-'+bbsIdx).data('idx'))){
			$bbsEle = $('.contents-list-link-area-'+bbsIdx);
		}
	}
	var linkType = 'rank';
	if(isDefined($bbsEle) == true && $bbsEle.length > 0){
		//var ele_class_name =
		var eleData = $bbsEle.data();
		console.log('eleData', eleData);
		
		//유효성 체크
		if(isDefined(eleData) == true){
			console.log('check adult');
			if(isDefined(eleData.idx) == true){
				if(eleData.idx == bbsIdx){
					
					var is_adult = 0;
					if(isDefined(eleData.is_adult)){
						is_adult = eleData.is_adult;
					}else if(isDefined(eleData.adult)){
						is_adult = eleData.adult;
					}
					//alert(is_adult);
					if(is_adult == 1){
						//로그인 체크
						if(utility.disk.checkIsLogin() != true){
							var nowHash = location.hash;
							if(nowHash.indexOf('action=contents') != -1) {
								jQuery.bbq.removeState();	
							}
							GO_MENU('login');
							//location.hash = "#!action=login";
							return;
						}
						if(utility.disk.checkIsRealName() != true){
							GO_MENU('adult_auth');
							return;
						}
					}
				}
			}
			if(isDefined(eleData.link)){
				linkType = 	eleData.link;
			}
			
			if(isDefined(eleData.page) == true){
				curentPage = parseInt(eleData.page);
			}
		}
	}

	//seller click
	if(linkType == 'seller'){
		//$('#disk-pc-contents-view-modal').empty();
	}
	//chapter
	else if(linkType == 'chapter'){
		$('.chapter-select-item.active').removeClass('active');
		$(theEle).addClass('active');
	}

	if(isDefined(bbsIdx) == false || $.isNumeric(bbsIdx) == false){
		alert('콘텐츠 세부 정보가 올바르지 않습니다.');
		return;
	}

	WEB_COMMON_GO.openContentsModal(bbsIdx, linkType, hrefUrl, curentPage);
};



//컨텐츠 오픈 - modal
WEB_COMMON_GO.openContentsModal = function(bbsIdx, linkType, hrefUrl, curentPage, isMove){
	console.log('WEB_COMMON_GO.openContentsModal',bbsIdx);
	console.log('linkType', linkType);
	if(isDefined(bbsIdx) == false){
		console.log('bbsIdx empty');
		return;
	}
	if(!$.isNumeric(bbsIdx)){
		console.log('no numberic');
		return;
	}
	
	//광고도메인은 로그인후
	if(isAdDomain() == true){
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
	}
	
	//현재 페이지 -카테, 검색등
	if(isDefined(curentPage) == false){
		curentPage = 1;	
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
	else if(linkType == 'chapter'){

	}

	var closeViewModal = function(){
		console.log('closeViewModal');
		var hashHash = location.hash;
		if(isDefined(hashHash)){
			if (hashHash.indexOf('action=contents') != -1) {
				history.back(true);
			}else{
				return;
			}
		}
		return;
	}

	//페이지 이동형인지
	if($('.webContentsViewIsOuter').val() == 1 && $.isNumeric(bbsIdx) == true){
		location.href = '/contents/web/'+bbsIdx+'/';
		return;
	}


	//기존 모다은 모두 비운다.
	//페이지 좌우 이동이면 블링크 때문에 비우지 않는다.
	if(isMove == true){
		
	}else{
		$('#disk-pc-contents-view-modal').empty();	
	}
	

	var saveData = {
		type	: 'modal',
		bbs_id	: bbsIdx,
		link	: linkType,
		search	: searchKeyword,
		s_page	: sellerPage,
		c_page	: curentPage,
		url		: hrefUrl
	};
	var $modalTargetScrollEle = $(".contents-view-blocker.blocker.current");
	var successAjaxViewData = function(data){
		console.log('successAjaxViewData');
		//console.log(data);
		
		//return;

		var viewHtml = null;
		if(data == 'ERR_ONPLAY_USER_NOT_LOGIN'){
        	console.log('data:', data);
			alert('로그인이 필요한 콘텐츠입니다.');
			GO_MENU('login');
			return;
        }else if(data == 'ERR_ONPLAY_NOT_ADULT_REGISTER'){
        	console.log('data:', data);
			alert('성인 인증이 필요한 콘텐츠입니다.');
            GO_ADULT_AUTH();
			return;
        }else if(data == 'ERR_ONPLAY_DOWNLOAD_NOT_FOUND_FILE'){
        	console.log('data:', data);
			alert('선택한 콘텐츠는 기간이 지났거나 판매가 종료된 상품입니다.');
        	closeViewModal();
			//history.back(true);
			return;
        }else{
			if(data.length < 100 ||  data.indexOf('wrap-contents-modal-view') < 0){
        		console.log('err modal html');
				alert('선택한 콘텐츠는 기간이 지났거나 판매가 종료된 상품입니다.');
        		//history.back(true);
        		closeViewModal();
        	}

			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			//이미 있는 경우는 교체
			if($('.contents-view-blocker.blocker').length > 0){
				if($('.contents-view-blocker.blocker ').hasClass('current')){
					console.log('current blocker');
					$('#disk-pc-contents-view-modal').html(viewHtml).data(saveData);
					PAGE_CONTENTS.DATA.OPENED_OPENED_IDX = saveData.bbs_id;
					$modalTargetScrollEle.scrollTop(0);
					PAGE_CONTENTS.start('modal', saveData);
					return;
				}
			}
			//$('#disk-pc-contents-view-modal').empty();
			$('#disk-pc-contents-view-modal').html(viewHtml).data(saveData).modal({
				escapeClose: false,
				clickClose: true,
				showClose: false,
				blockerClass	: 'contents-view-blocker'
			});

			PAGE_CONTENTS.DATA.OPENED_OPENED_IDX = saveData.bbs_id;
			//console.log($.modal.OPEN);
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

};

//컨텐츠 오픈 - windown
WEB_COMMON_GO.openContentsDetail = function(thisEle){

	var eleData = $(thisEle).data();

	if(isDefined(eleData.idx) == true && isDefined(eleData.url) == true){
		PopupCenter(eleData.url, 'bbsContentsDetail', 850, 880);
	}
	return;
}


//파일 업로드  오픈
WEB_COMMON_GO.openFileUploadForm = function(thisEle){
	console.log('WEB_COMMON_GO.openFileUploadForm');

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		alert('로그인 후 이용가능한 매뉴입니다.');
		GO_MENU('login');
		return;
	}
	
	if(utility.disk.checkIsUploaderMember() != true){
		alert('먼저 판매자로 등록후 파일 업로드가 가능합니다.');
		location.href = "/my/channel/channel_create#!action=my&group=channel&id=channel_create&page=1";
		return;
	}
	
	if(utility.disk.checkIsRealName() != true){
		alert('실명인증 후 파일 업로드가 가능합니다.');
		GO_REAL_NAME();
		return;
	}


	var eleData = $(thisEle).data();
	console.log(eleData);

	var openUrl = '';
	var openCategory = 0;
	if(isDefined(eleData.url) == false){
		alert('새로고침후 다시 시도해 주세요.');
		return;
	}
	openUrl = eleData.url+'?bbsIdx=';

	var reqIdx = '';
	if(isDefined(eleData.req)){
		reqIdx = eleData.req;
	}

	//수정
	if(isDefined(eleData.idx) == true){
		openUrl += eleData.idx+'&isEdit=1';
	}else{
		if(isDefined(eleData.cate) == true){
			openCategory = parseInt(eleData.cate);
			openUrl += '&selectedCategory='+eleData.cate+'&req='+reqIdx;
		}
	}

	var rtOpen = PopupCenter(openUrl, 'bbsContentsUpload', 900, 880);
	if(rtOpen == null || rtOpen.screenLeft == 0){
		alert('팝업 차단 중');
	}
	return;
};

//이벤트 페이지로 이동 -- 리스트에서
WEB_COMMON_GO.goEventView = function(thisEle){
	console.log('WEB_COMMON_GO.goEventView');
	
	if(isAdDomain() == true){
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
	}

	var eleData = $(thisEle).data();
	console.log(eleData);
	//성인 체크
	if(eleData.is_adult == 1){
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
		
		if(utility.disk.checkIsRealName() != true){
			GO_MENU('adult_auth');
			return;
		}
		//return;

	}
	
	if(isDefined(eleData.href)){
		console.log(eleData.href)
		window.location = eleData.href;
	}else{
		if(isDefined(data.idx)){
			WEB_COMMON_GO.goEventViewIdx(data.idx);
		}
	}
	
};


//이벤트 페이지로 이동 - number
WEB_COMMON_GO.goEventViewIdx = function(eventIdx){

};


//쪽지 보내기 오픈
WEB_COMMON_GO.openBbsMemoForm = function(thisEle){
	console.log('WEB_COMMON_GO.openBbsMemoForm');


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
			blockerClass	: "common-modal-blocker",
			clickClose: false,
			escapeClose: false
		});
	}

};

//닉네일 설정 오픈
WEB_COMMON_GO.openMemberNicknameSetForm = function(thisEle){
	console.log('WEB_COMMON_GO.openBbsMemoForm');
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
			blockerClass	: "common-modal-blocker",
			clickClose		: false,
			escapeClose		: false
		});
	}
};


//저작권 보호센터  - windown
WEB_COMMON_GO.openCopyrightCenter = function(thisEle){
	var eleData = $(thisEle).data();

	if(isDefined(eleData.url) == true){
		PopupCenter(eleData.url, 'copyrightCenter', 860, 880);
	}
	return;
};


//저작권 보호센터  - windown
WEB_COMMON_GO.openCrimeout = function(thisEle){
	var eleData = $(thisEle).data();

	if(isDefined(eleData.url) == true){
		PopupCenter(eleData.url, 'openCrimeout', 720, 1200);
	}
	return;
};


//페이지 이동할 경우 - onclick
var GO_LINK_MENU = function(thisEle){
	console.log('GO_LINK_MENU');
	
	var eleData = $(thisEle).data();
	if(isDefined(eleData) == false){
		return;
	}
	var linkUrl = null;
	if(isDefined(eleData.href)){
		linkUrl = eleData.href;
	}
	var linkAdult = 0;
	if(isDefined(eleData.adult)){
		linkAdult = eleData.adult;
	}
	if(linkAdult == 1){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
		if(utility.disk.checkIsRealName() != true){
			GO_MENU('adult_auth');
			return;
		}
	}
	if(isDefined(linkUrl)){
		location.href = linkUrl;
	}
	
	
};


//현재 페이지 리로드
var HASH_REFRESH = function(){
	console.log('HASH_REFRESH');
	if(isDefined(location.hash)){
		$(window).trigger('hashchange');
	}else{
		location.reload(true);
	}
};

//인스톨 파일 다운로드
var DOWNLOAD_INSTALLER = function(thisEle){
	console.log('DOWNLOAD_INSTALLER');

	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		return;
	}

	var eleData = $(thisEle).data();
	if(isDefined(eleData.url)){
		window.location.assign(eleData.url);
	}
};

//자료 요청하기
var GO_REQUEST_CONTENTS = function(thisEle){
	console.log('GO_REQUEST_CONTENTS');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	GO_MENU('request');

};

