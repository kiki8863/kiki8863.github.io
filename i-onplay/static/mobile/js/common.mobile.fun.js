/*
* mobile common fun - for ui
*/
MOBILE_COMMON.VIDEO_PLAYER = null;
MOBILE_COMMON.NEW_VIDEO_PLAYER = null;


//메모 관련
MOBILE_COMMON.MEMO = {};
MOBILE_COMMON.MEMO.submitSendMemo = function(formEleId){
	console.log('MOBILE_COMMON.MEMO.submitSendMemo');

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	if(isDefined(formEleId) == false){
		console.log('empty formEleId');
		return;
	}
	var formValues = $('#'+formEleId).serializeArray();
	console.log('formValues:', formValues);
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	//return;
	if(isDefined(formData.memo_data) == false || formData.memo_data.length < 5){
		disk_alert('보내실 내용을 5자 이상 입력해주세요.');
		return;
	}
	var sendMemoSuccessCallbackFun = function(data){
		console.log('sendMemoSuccessCallbackFun', data);
		CLOSE_PAGE_MODAL();
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
	};
	COMMON_ACTION.BBS.actionSendMemo(formData, sendMemoSuccessCallbackFun);
};





//쪽지 보내기 오픈
MOBILE_COMMON.MEMO.openMobileBbsMemoForm = function(thisEle){
	console.log('MOBILE_COMMON.MEMO.openMobileBbsMemoForm');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var eleData = $(thisEle).data();
	if(isDefined(eleData) == false){
		disk_alert('메모를 받을 사람이 정해지지 않았습니다.');
		return;
	}
	if(isDefined(eleData.receiver) == false){
		disk_alert('메모를 받을 사람이 정해지지 않았습니다.');
		return;
	}
	
	if(eleData.receiver == 0 || eleData.receiver =='0'){
		disk_alert('운영팀에는 쪽지를 답장하실 수 없습니다.<br>1:1문의를 이용해 주세요.');
		return;
	}
	
	var memoFormHtml = MOBILE_TEMPLETE.CONNTAINER.memo_write(eleData);
	var openCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
	}
	OPEN_PAGE_MODAL(memoFormHtml, openCallbackFun);
	return;
};




MOBILE_COMMON_FUN = {};

//회원(비회원) 자기 설정 카테고리
MOBILE_COMMON_FUN.getMemberCustomCategory = function(){
	console.log('MOBILE_COMMON_FUN.getMemberCustomCategory');
	var saveStorageKey = 'op_top_category';
	var getdMemberCategory = utility.disk.getStorageData(saveStorageKey);
	console.log('getdMemberCategory', getdMemberCategory);
	if(isDefined(getdMemberCategory) == false){
		return null;
	}
	var rtData = $.parseJSON(getdMemberCategory);
	if($.isArray(rtData) == true){
		return rtData;
	}
	return null;
};




MOBILE_COMMON_FUN.saveMemberCustomCategory = function(savedMemberCategoryData){
	console.log('MOBILE_COMMON_FUN.saveMemberCustomCategory');
	console.log(savedMemberCategoryData);
	if($.isArray(savedMemberCategoryData) == false || savedMemberCategoryData.length < 1){
		return false;
	}
	var savedMemberCategoryJson = JSON.stringify(savedMemberCategoryData);
	var saveStorageKey = 'op_top_category';
	var expireDay = 365;
	//var savedMemberCategory = utility.disk.getStorageData(saveStorageKey);
	//console.log('savedMemberCategory', savedMemberCategory);


	utility.disk.setStorageData(saveStorageKey, savedMemberCategoryJson, expireDay);
	return true;
};



//카테고리(메뉴) 전체 오픈
MOBILE_COMMON_FUN.openTopCategoryBtn = function(thisEle){
	console.log('MOBILE_COMMON_FUN.openTopCategoryBtn');

	MOBILE_COMMON_FUN.onclickEditCustomBtn(thisEle);
	return;
};


//회원 카테고리 편집
MOBILE_COMMON_FUN.onclickEditCustomBtn = function(thisEle){
	console.log('MOBILE_COMMON_FUN.onclickCustomBtn');
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(isDefined(eleData.target) == false || isDefined(eleData.type) == false || isDefined(eleData.gnb) == false || isDefined(eleData.wrap) == false){
		return;
	}
	var openType = eleData.type;
	console.log('openType', openType);

	//메뉴 오픈
	var $gnbEle = $('.'+eleData.gnb);
	if($gnbEle.length < 1){
		return;
	}
	if($gnbEle.hasClass('menu_open') == true && openType == 'link'){
		$gnbEle.removeClass('menu_open');
		return;
	}
	var $targetEle = $('.'+eleData.target);
	if($targetEle.length < 1){
		return;
	}
	var category = new Disk_category(1);
	var isCheckBlockAdultDomain = isAdDomain();
	var isCheckBlockAdultContents = DISK_MEMBER_FUN.isBlockAdultContents();
	var topMenuList = category.getTopCategoryList();
	//var topCategoryList = category.show_mobile_top_category_list;
	var topCategoryList = $.merge($.merge([], category.show_mobile_top_category_list), topMenuList);
	console.log('topCategoryList', topCategoryList);

	//saved category list
	var memberCustomCategoryList = topCategoryList;
	if(openType == 'edit'){
		var memberCustomCategoryList =  MOBILE_COMMON_FUN.getMemberCustomCategory();
		console.log('memberCustomCategoryList', memberCustomCategoryList);
		if(isDefined(memberCustomCategoryList) == false){
			memberCustomCategoryList = topCategoryList;
		}
	}

	var topEditCategoryHtml = [];
	for(var i =0; i < topCategoryList.length; i++){
		var cateKey = topCategoryList[i];
		var isSelected = $.inArray(cateKey, memberCustomCategoryList);
		//console.log('cateKey', cateKey);
		//console.log('isSelected', isSelected);
		if(cateKey == 21100){
			if(isCheckBlockAdultDomain == true || isCheckBlockAdultContents == true){
				continue;
			}
		}
		topEditCategoryHtml.push(category.getMobileTopCategoryEditMenuHtml(cateKey, isSelected, openType));
	}
	//console.log('topEditCategoryHtml', topEditCategoryHtml);
	$targetEle.html(topEditCategoryHtml.join(''));

	//type class
	$wrapEle = $('.'+eleData.wrap);
	if($wrapEle.length > 0){
		if(openType == 'edit'){
			$wrapEle.addClass(openType);
		}else{
			$wrapEle.removeClass('edit');
		}
	}
	//메뉴 오픈
	if($gnbEle.hasClass('menu_open') == false){
		$gnbEle.addClass('menu_open');
	}
};

//상단 메뉴 편집 : 취소
MOBILE_COMMON_FUN.onclickCancleCustomBtn = function(){
	console.log('MOBILE_COMMON_FUN.onclickCancleCustomBtn');

	$('.mobile-top-custom-category-wrap').removeClass('edit');
	$('.mobile-top-custom-category-wrap').find('.mobile-category-edit-item').data('type', 'link');


};


//커스터 메뉴 클릭시
MOBILE_COMMON_FUN.onclickCustomCategoryItem = function(thisEle){
	console.log('MOBILE_COMMON_FUN.onclickCustomCategoryItem');
	
	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.type) == false){
		return;
	}


	if(eleData.type == 'link'){
		console.log('go link');
		GO_CATEGORY(eleData.cate);
		/*
		if(eleData.cate < 30100){
			GO_CATEGORY(eleData.cate);
		}else{
			GO_MENU(eleData.cate);
		}
		*/
		$('.mobile-top-gnb-wrap').toggleClass('menu_open');
		return;
	}else if(eleData.type == 'edit'){
		if(eleData.def == 'def'){

		}else{
			$(thisEle).toggleClass('active');
		}
	}



	//$(this).toggleClass(\'active\');
	return;
	var alertMsg = $(thisEle).data('name')+'카테고리는 편집할 수 없는 기본 메뉴입니다.';
	disk_alert(alertMsg);
};


//카테고리 편집 - 적용
MOBILE_COMMON_FUN.onclickCustomCategoryEditOk = function(thisEle){
	console.log('MOBILE_COMMON_FUN.onclickCustomCategoryEditOk');
	var eleData = $(thisEle).data();
	if(isDefined(eleData.target_item) == false){
		return;
	}


	console.log(eleData);
	var $targetEles = $( '.'+eleData.target_item+'.active');
	if($targetEles.length < 0){
		disk_alert('하나 이상의 메뉴를 선택하셔야합니다.');
		return;
	}

	var savedMemberCategory = [];
	$( '.'+eleData.target_item+'.active').each( function() {
		var itemData = $(this).data();
		console.log(itemData);
		savedMemberCategory.push(itemData.cate);
	});
	console.log('savedMemberCategory', savedMemberCategory);
	if(savedMemberCategory.length < 0){
		disk_alert('하나 이상의 메뉴를 선택하셔야합니다.');
		return;
	}

	var rtsaved = MOBILE_COMMON_FUN.saveMemberCustomCategory(savedMemberCategory);
	console.log('rtsaved', rtsaved);

	if(rtsaved == true){
		//$('.mobile-top-gnb-wrap.menu_open')
		$('.mobile-top-gnb-arrow-btn').trigger('click');
		MOBILE_COMMON.setTopCategoryListBinding(true);
	}
};

//회원 자기 검색 히스토리
MOBILE_COMMON_FUN.getMemberSearchHistory = function(isReverse){
	console.log('MOBILE_COMMON_FUN.getMemberSearchHistory');
	var memberIdx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
	if(isDefined(memberIdx) == false){
		return;
	}

	//var memberIdx = 1;
	var saveStorageKey = 'op_search_history_'+memberIdx;
	var getdMemberSearchHistoryData = utility.disk.getStorageData(saveStorageKey);
	console.log('getdMemberSearchHistoryData', getdMemberSearchHistoryData);
	if(isDefined(getdMemberSearchHistoryData) == false){
		return null;
	}

	var rtData = $.parseJSON(getdMemberSearchHistoryData);
	if($.isArray(rtData) == true){
		//배열 순서 뒤집기
		if(isReverse == true){
			return rtData.reverse();
		}
		return rtData;
	}
	return null;
};


//모바일 검색 히스토리 저장
MOBILE_COMMON_FUN.setMemberSearchHistory = function(searchStr){
	console.log('MOBILE_COMMON_FUN.setMemberSearchHistory', searchStr);
	var memberIdx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
	if(isDefined(memberIdx) == false){
		return;
	}

	if($.type(searchStr) != 'string' || searchStr.length < 2){
		return false;
	}
	if(searchStr.length > 30){
		searchStr = $.trim(searchStr.substr(0, 30));
	}

	var newSavedHistoryData = [];
	var savedHistoryData = MOBILE_COMMON_FUN.getMemberSearchHistory(false);
	console.log('savedHistoryData', savedHistoryData);
	if(isDefined(savedHistoryData) == true){
		if($.isArray(savedHistoryData) == true && savedHistoryData.length > 0){
			/*
			if(savedHistoryData.length < 10){
				newSavedHistoryData = savedHistoryData;
			}else if(savedHistoryData.length == 10){
				savedHistoryData.shift();
				newSavedHistoryData = savedHistoryData;
			}else{
				var siCnt = 0;
				for(var si in savedHistoryData){
					if(siCnt >= 9){
						break;
					}
					newSavedHistoryData.push($.trim(savedHistoryData[si]));
					siCnt++;
				}
			}
			*/
			var siCnt = 0;
			for(var si in savedHistoryData){
				if(savedHistoryData[si] == searchStr){
					continue;
				}
				newSavedHistoryData.push($.trim(savedHistoryData[si]));
				siCnt++;
			}
		}
	}
	newSavedHistoryData.push($.trim(searchStr));
	//초과되는 수는 삭제 - 앞에서부터
	if(newSavedHistoryData.length > 10){
		var delCnt = newSavedHistoryData.length - 10;
		for(var di = 0; di < delCnt; di++){
			newSavedHistoryData.shift();
		}
	}
	console.log('newSavedHistoryData', newSavedHistoryData);

	var savedMemberHistoryJson = JSON.stringify(newSavedHistoryData);
	console.log('savedMemberHistoryJson', savedMemberHistoryJson);
	//var memberIdx = 1;
	var saveStorageKey = 'op_search_history_'+memberIdx;
	var expireDay = 365;
	utility.disk.setStorageData(saveStorageKey, savedMemberHistoryJson, expireDay);
	return true;

};


//모바일 검색 히스토리 삭제
MOBILE_COMMON_FUN.delMemberSearchHistory = function(searchStr){
	console.log('MOBILE_COMMON_FUN.setMemberSearchHistory', searchStr);
	var memberIdx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
	if(isDefined(memberIdx) == false){
		return;
	}

	if($.type(searchStr) != 'string' || searchStr.length < 2){
		return false;
	}
	if(searchStr.length > 30){
		searchStr = $.trim(searchStr.substr(0, 30));
	}
	var saveStorageKey = 'op_search_history_'+memberIdx;
	var expireDay = 365;
	var newSavedHistoryData = [];
	var savedHistoryData = MOBILE_COMMON_FUN.getMemberSearchHistory(false);
	if(isDefined(savedHistoryData) == true){
		if(searchStr == 'all'){
			utility.disk.delStorageData(saveStorageKey);
			return 'ALL';
		}
		if($.isArray(savedHistoryData) == true && savedHistoryData.length > 0){
			var siCnt = 0;
			for(var si in savedHistoryData){
				if(siCnt >= 9){
					break;
				}
				if(savedHistoryData[si] != searchStr){
					newSavedHistoryData.push($.trim(savedHistoryData[si]));
				}

				siCnt++;
			}
		}
	}else{
		return 'ALL';
	}
	//newSavedHistoryData.push($.trim(searchStr));
	if(newSavedHistoryData.length > 0){
		var savedMemberHistoryJson = JSON.stringify(newSavedHistoryData);
		console.log('savedMemberHistoryJson', savedMemberHistoryJson);
		//var memberIdx = 1;
		utility.disk.setStorageData(saveStorageKey, savedMemberHistoryJson, expireDay);
		return true;
	}

	utility.disk.delStorageData(saveStorageKey);
	return 'ALL';
};

//모바일 콘텐츠 오픈
MOBILE_COMMON_FUN.getMobileContentsView = function(getData, callbackFun){
	console.log('MOBILE_COMMON_FUN.getMobileContentsView');
	//console.log('linkType', linkType);
	console.log(getData);
	if(isDefined(getData) == false){
		return;
	}
	var bbsIdx = null;
	if(isDefined(getData.idx)){
		bbsIdx = getData.idx;
	}

	var linkType = '';
	if(isDefined(getData.link)){
		linkType = getData.link;
	}

	var page = 1;
	if(isDefined(getData.page)){
		page = getData.page;
	}
	//bbsIdx, linkType

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
	}else if(linkType == 'seller_contents'){
		if(isDefined(page)){
			sellerPage = page;
		}
	}
	else if(linkType == 'chapter'){

	}


	//기존 모다은 모두 비운다.
	//$('#disk-pc-contents-view-modal').empty();
	var closeConetntsViewModal = function(){
		//GO_BACK(null, 'contents');
	};

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
        	console.log('data:', data);
			disk_alert('로그인이 필요한 콘텐츠입니다.', GO_LOGIN);
			return;
        }else if(data == 'ERR_ONPLAY_NOT_ADULT_REGISTER'){
        	console.log('data:', data);
			disk_alert('성인 인증이 필요한 콘텐츠입니다.', GO_FOCES_REAL_NAME);
			return;
        }else if(data == 'ERR_ONPLAY_DOWNLOAD_NOT_FOUND_FILE'){
        	console.log('data:', data);
			disk_alert('선택한 콘텐츠는 기간이 지났거나 판매가 종료된 상품입니다.', closeConetntsViewModal);
        	//history.back(true);
			return;
        }else{
			if(data.length < 100 ||  data.indexOf('wrap-contents-modal-view') < 0){
        		console.log('err modal html');
				disk_alert('선택한 콘텐츠는 기간이 지났거나 판매가 종료된 상품입니다.');
        		//history.back(true);
        		return;
        	}

			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			//console.log(viewHtml);
			MOBILE_COMMON.DATA.CONTENTS.OPENED_OPENED_IDX = saveData.bbs_id;

			//insert html --loaded -1, data in - 2
			$('.contents-view-container').html(viewHtml).data({'loaded': 2, idx: bbsIdx});

			if (typeof callbackFun === "function"){
				callbackFun(bbsIdx);
				return;
			}


			//return;
			location.hash = '#!action=contents&idx='+bbsIdx+'&link='+linkType+'&page='+page;
			//console.log($.modal.OPEN);
		}


	};

	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CONTENTS.M_CONTENTS_MODAL_VIEW+''+bbsIdx;
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

//모바일 알럿 닫기
MOBILE_COMMON_FUN.closeDiskAlert = function(thisEle){
	console.log('MOBILE_COMMON_FUN.closeDiskAlert');
	//close_fun:callbackFun, close_data: data
	//console.log($.modal.getCurrent());
	//console.log($.modal.isActive());
	var $alertModalEle = $('#disk-modal-mobile-alert');
	if(isDefined(thisEle) == true){
		var $alertModalEle = $(thisEle).parents('.modal');
	}
	//console.log($alertModalEle);
	if($alertModalEle.length > 0 && $.modal.isActive() == true){
		var eleData = $alertModalEle.data();
		console.log(eleData);
		var sData;
		if(isDefined(eleData.close_data)){
			sData = eleData.close_data;
		}
		console.log('sData', sData);
		if(isDefined(eleData.close_fun)){
			//var callbackFun = eleData.cbf;
			var callbackFun = eleData.close_fun;
			//console.log(callbackFun);
			if (typeof callbackFun === "function"){
				console.log('is fun');
				//callbackFun(sData);
				callbackFun.call(null, sData);
				//return;
			}
		}

		$.modal.close();
	}
	return;
};

//마지막 선택 콘테츠로 이동
MOBILE_COMMON_FUN.goLastContentsFocus = function(topOffSet){
	console.log('MOBILE_COMMON_FUN.goLastContentsFocus');

	var topOff = topOffSet || 55;

	var goTop = function(){
		var $mobileCommonHeader = $('.mobile-common-header');	//common header ele
		var headerEleHeight = 66;										//로고 높이
		if($mobileCommonHeader.find('.h_top').length > 0){
			headerEleHeight = $mobileCommonHeader.find('.h_top').outerHeight();
		}
		headerEleHeight = parseInt(headerEleHeight) + 2;
		if($mobileCommonHeader.length > 0){
			if($mobileCommonHeader.hasClass('menu')){
				$("html, body").animate({ scrollTop: headerEleHeight }, "fast");
			}else{
				$mobileCommonHeader.removeClass('fixed menu');
				//$("html, body").animate({ scrollTop: 0 }, "fast");
				GO_TOP();
			}
		}
	};

	//리스트로 이동
	if(isDefined(MOBILE_COMMON.DATA.CONTENTS.OPENED_OPENED_IDX)){
		var targetContentsEleName = '.mobile-contents-list-'+MOBILE_COMMON.DATA.CONTENTS.OPENED_OPENED_IDX;
		console.log('targetContentsEleName', targetContentsEleName);
		if($(targetContentsEleName).length > 0){
			$('.mobile-contents-list.active').removeClass('active');
			$(targetContentsEleName).parent('.mobile-contents-list').addClass('active');
			utility.ui.goToElement(targetContentsEleName, 50, topOff);
		}else{
			goTop();
		}

	}else{
		goTop();
	}
};

//검색 결과 없음 : 통합검색으로 이동
MOBILE_COMMON_FUN.onclickGoSearchOnText = function(thisEle){
	console.log('MOBILE_COMMON_FUN.onclickGoSearchOnText');

	var searchKeyword = $(thisEle).text();
	if(isDefined(searchKeyword)){
		if(searchKeyword.length < 2){
			disk_alert('검색어는 2자 이상 입력해주세요.');
			return;
		}
		location.hash = '#!action=search&k='+encodeURIComponent(searchKeyword)+'&fc=&lo=0&page=1';
	}
};


//채널 구독
MOBILE_COMMON_FUN.onclickMobileActionSubscribeSellerChannel = function(thisEle){
	console.log('MOBILE_COMMON_FUN.onclickMobileActionSubscribeSellerChannel');

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}


	var eleData = $(thisEle).data();
	if(isDefined(eleData.idx) == false){
		alert('구독 채널이 선택되지 않았습니다.');
		return;
	}

	var mobileAddSubscribeSuccessFun = function(data){
		console.log('mobileAddSubscribeSuccessFun', data);

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
	};

	COMMON_ACTION.SUBSCRIBE.actionSubscribe(eleData.idx, null, mobileAddSubscribeSuccessFun);
};






//닉네임 설정 오픈
MOBILE_COMMON_FUN.openMobileMemberNicknameSetForm = function(thisEle){
	console.log('MOBILE_COMMON_FUN.openMobileMemberNicknameSetForm');

	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	var $targetModal = $('#disk-modal-mobile-common');
	var eleData = $(thisEle).data();
	var isModalCloseExisting = false;
	/*
	if($('.common-modal-blocker').length > 0){
		isModalCloseExisting = false;
	}
	*/

	var modalHtml = MOBILE_TEMPLETE.MODAL.eventSetMemberCommunityNicknameHtml(eleData);
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker"
		});
	}
};


//자녀안심 설정 오픈
MOBILE_COMMON_FUN.openMobileMemberChildBlockSetForm = function(thisEle){
	console.log('MOBILE_COMMON_FUN.openMobileMemberChildBlockSetForm');


	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}


	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.val) == false || $.isNumeric(eleData.val) == false){
		console.log('val empty');
		return;
	}

	var changeSafeChildVal = 1;
	var nowStatusBlock = parseInt(eleData.val);
	if(nowStatusBlock == 1){
		changeSafeChildVal = 2;
	}
	eleData.target = changeSafeChildVal;
	var $targetModal = $('#disk-modal-mobile-common');

	var isModalCloseExisting = false;
	/*
	if($('.common-modal-blocker').length > 0){
		isModalCloseExisting = false;
	}
	*/

	var modalHtml = MOBILE_TEMPLETE.MODAL.memberSetChildBlockSetHtml(eleData);
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker"
		});
	}


	return;

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


};


//자녀 안심 서비스 설정
MOBILE_COMMON_FUN.onclickActionSetMemberSafeChild = function(e, thisEle){
	console.log('MOBILE_COMMON_FUN.onclickActionSetMemberSafeChild');

	e.preventDefault();

	var $targetForm = $(thisEle);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return;
	}
	if(isDefined(formData.member_safe_child) == false || $.isNumeric(formData.member_safe_child) == false){
		console.log('member_safe_child err');
		return;
	}

	var actionType = formData.member_safe_child;
	$('.input-err-msg.show').removeClass('show');
	if(isDefined(formData.safe_passwd) == false || formData.safe_passwd.length < 4){
		//alert('원하시는 비밀번호를 4자이상 입력해주세요.');
		//$('#memberSafeChildModalForm_safe_passwd').focus();
		$('.input-err-msg.safe_passwd').addClass('show');
		return;
	}



	if(actionType == 1){
		if(formData.safe_passwd != formData.safe_passwd2){
			$('.input-err-msg.safe_passwd2').addClass('show');
			return;
		}
	}

	var successChangeMemberSafeChildInfo = function(data){
		console.log('successChangeMemberSafeChildInfo', data);

		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true, 'childBlock');
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		$.modal.close();
	};
	//var sendData = formData;
	COMMON_ACTION.MEMBER.changeMemberInfoChildBlock(formData, successChangeMemberSafeChildInfo);
};


//채널 세부 정보 보기 view
MOBILE_COMMON.openMobileChannelContentsView = function(channelType, channelIdx, isHash){
	console.log('MOBILE_COMMON.openMobileChannelContentsView');
	console.log('channelType', channelType);
	console.log('channelIdx', channelIdx);
	if(isDefined(channelType) == false || isDefined(channelIdx) == false){
		console.log('empty idx');
		return;
	}

	var goHomeFun;
	if(isHash == 1){
		goHomeFun = GO_HOME;
	}

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
			disk_alert('성인 인증이 필요한 콘텐츠입니다.', ERR_ONPLAY_NOT_ADULT_REGISTER);
			return;
        }else if(data == 'ERR_ONPLAY_CHANNEL_NOT_FOUND_DATA'){
        	console.log('data:', data);
			disk_alert('채널 콘텐츠 정보를 확인할수 없습니다.', goHomeFun);
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

			/*
			//console.log(viewHtml);
			MOBILE_COMMON.DATA.CONTENTS.OPENED_OPENED_IDX = saveData.bbs_id;

			//insert html --loaded -1, data in - 2
			$('.contents-view-container').html(viewHtml).data({'loaded': 2, idx: bbsIdx});

			if (typeof callbackFun === "function"){
				callbackFun(bbsIdx);
				return;
			}
			*/

			//return;
			//location.hash = '#!action=contents&idx='+bbsIdx+'&link='+linkType+'&page='+page;
			//console.log($.modal.OPEN);

			//var channelViewCommonHtml = MOBILE_TEMPLETE.CONNTAINER.channel_view(channelType, channelIdx);

			//mobile-container-deep-31
			//hash type : non modal
			if(isHash == 1){
				var $containerEle = $(MOBILE_PAGE.on_channel.DATA.CONTAINER_ELE);
				if($containerEle.length > 0){
					$('.mobile-container.show').removeClass('show');
					$containerEle.html(viewHtml).data({loaded : 1, idx : channelIdx, type: channelType}).addClass('show');
					$('.wrap-channel-contents-modal-view').find('.btn-top-back').data('target', 'back');
					MOBILE_PAGE.on_channel.DATA.LAST_HASH = location.hash;

					MOBILE_PAGE.channel.view.start(channelType, channelIdx, isHash);
					return;
				}
			}

			//modal type
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);

				if(isHash == 1){
					$('.wrap-channel-contents-modal-view').find('.btn-top-back').data('target', 'back');
					MOBILE_PAGE.on_channel.DATA.LAST_HASH = location.hash;
				}

				MOBILE_PAGE.channel.view.start(channelType, channelIdx);
			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

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



//이벤트 세부 보기 view
MOBILE_COMMON.openMobileEventDetailView = function(eventIdx, isHash){
	console.log('MOBILE_COMMON.openMobileEventDetailView');
	console.log('eventIdx', eventIdx);

	if(isDefined(eventIdx) == false || $.isNumeric(eventIdx) != true ){
		console.log('empty idx');
		return;
	}


	var successAjaxEventViewData = function(data){
		console.log('successAjaxViewData');
		//console.log(data);

		var viewHtml = null;
		if(data == 'ERR_ONPLAY_USER_NOT_LOGIN'){
        	console.log('data:', data);
			disk_alert('로그인이 필요한 콘텐츠입니다.', GO_LOGIN);
			return;
        }else if(data == 'ERR_ONPLAY_NOT_ADULT_REGISTER'){
        	console.log('data:', data);
			disk_alert('성인 인증이 필요한 콘텐츠입니다.', ERR_ONPLAY_NOT_ADULT_REGISTER);
			return;
        }else if(data == 'ERR_ONPLAY_EVENT_NOT_FOUND_CONTENTS'){
        	console.log('data:', data);
			disk_alert('종료된 이벤트이거나 이벤트 정보를 확인할수 없습니다.');
        	//history.back(true);

			return;
        }else{
			if(data.length < 100 ||  data.indexOf('event-detail-modal-view-wrap') < 0){
        		console.log('err modal html');
				disk_alert('종료된 이벤트이거나 이벤트 정보를 확인할수 없습니다.');
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			//console.log(viewHtml);

			/*
			//console.log(viewHtml);
			MOBILE_COMMON.DATA.CONTENTS.OPENED_OPENED_IDX = saveData.bbs_id;

			//insert html --loaded -1, data in - 2
			$('.contents-view-container').html(viewHtml).data({'loaded': 2, idx: bbsIdx});

			if (typeof callbackFun === "function"){
				callbackFun(bbsIdx);
				return;
			}
			*/

			//return;
			//location.hash = '#!action=contents&idx='+bbsIdx+'&link='+linkType+'&page='+page;
			//console.log($.modal.OPEN);

			//var channelViewCommonHtml = MOBILE_TEMPLETE.CONNTAINER.channel_view(channelType, channelIdx);
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);
				if(isHash == 1){
					$('.event-detail-modal-view-wrap').find('.btn-top-back').data('target', 'event_list');
				}


				MOBILE_PAGE.event_view.start(eventIdx);
			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

		}


	};
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT.MOBILE_M_VIEW +''+eventIdx;

	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var formData = {
		is_mobile	: 1,
		is_hash	: isHash
	};

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxEventViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};


//게시물 세부 보기 view
MOBILE_COMMON.openMobileBoardDetailView = function(boardType, boardIdx){
	console.log('MOBILE_COMMON.openMobileBoardDetailView');
	console.log('boardType', boardType);
	console.log('boardIdx', boardIdx);

	if(isDefined(boardType) == false || isDefined(boardIdx) == false || $.isNumeric(boardIdx) != true ){
		console.log('empty idx');
		return;
	}

	var successAjaxBoradViewData = function(data){
		console.log('successAjaxBoradViewData');
		console.log(data);

		var viewHtml ='';
		var diskBoard;


		if(isDefined(data.board_data)){
			if(boardType == 'req'){
				diskBoard = new Req(0, 1);
				diskBoard.setData(data.board_data);
				viewHtml = diskBoard.getMobileRequestViewHtml();
			}
		}

		if(isDefined(viewHtml)){
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);
				//MOBILE_PAGE.event_view.start(eventIdx);
				var eleBoardType = boardType;
				if(boardType == 'req'){
					eleBoardType = 'request';
					MOBILE_PAGE.request_view.start('request', boardIdx, diskBoard);
				}
				var $modalEle = $('#board-detail-modal-view-wrap-'+eleBoardType+'-'+boardIdx);
				if($modalEle.length > 0){
					$modalEle.data(data.board_data);
				}
			};
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);
		}
	};
	var formData = {
		is_mobile	: 1,
		idx			: boardIdx,
		t			: boardType,
	};

	var contentsUrl;
	if(boardType == 'req'){
		contentsUrl = DISK_PROTOCOL.ONPLAY_URL.REQ.GET_BOARD_VIEW;
	}
	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxBoradViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: false
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};






//cs board 세부 보기 view
MOBILE_COMMON.openMobileCsBoardDetailView = function(boardType, boardIdx){
	console.log('MOBILE_COMMON.openMobileBoardDetailView');
	console.log('boardType', boardType);
	console.log('boardIdx', boardIdx);

	if(isDefined(boardType) == false || isDefined(boardIdx) == false || $.isNumeric(boardIdx) != true ){
		console.log('empty idx');
		return;
	}

	var successAjaxCsBoradViewData = function(data){
		console.log('successAjaxCsBoradViewData');
		console.log(data);

		var viewHtml ='';
		var diskBoard;

		if(isDefined(data.board_name)){
			boardType = data.board_name;
		}

		if(isDefined(data.mobile_data)){
			//viewHtml = diskBoard.getMobileRequestViewHtml();
			var csBoard = new Cs_board(boardType, 0, 1);
			csBoard.setData(data.mobile_data);
			if(boardType == 'qa'){
				viewHtml = csBoard.getMobileCsQaViewHtml();
			}else{
				viewHtml = csBoard.getMobileCsViewHtml();
			}


		}

		if(isDefined(viewHtml)){
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);
			};
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);
		}
	};
	var csBoardGroup = 'cs';
	if(boardType == 'faq'){
		csBoardGroup = 'member';
	}else if(boardType == 'qa'){
		csBoardGroup = 'one';
	}
	var formData = {
		t			:	csBoardGroup,
		idx			: 	boardIdx,
		b			: 	boardType,
		is_mobile	: 1
	};

	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CS.GET_NOTICE_VIEW;
	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxCsBoradViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: false
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};



//Company view : 이용약관, 개인정보 처리방침, 개인정보 침해 신고
MOBILE_COMMON.openMobileCompanyContentsView = function(companyType){
	console.log('MOBILE_COMMON.openMobileCompanyContentsView');
	console.log('companyType', companyType);

	if(isDefined(companyType) == false ){
		console.log('empty companyType');
		return;
	}

	var successAjaxCompanyContentsViewData = function(data){
		console.log('successAjaxCompanyContentsViewData');
		//console.log(data);

		var viewHtml = null;
		if(data == 'ERR_ONPLAY_COMPANY_NOT_FOUND_CONTENTS'){
        	console.log('data:', data);
			disk_alert('페이지 정보를 확인할수 없습니다.');
        	//history.back(true);
			return;
        }else{
			if(data.length < 100 ||  data.indexOf('company-contents-modal-view-wrap') < 0){
        		console.log('err modal html');
				disk_alert('페이지 정보를 확인할수 없습니다.');
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			//console.log(viewHtml);

			//return;
			//location.hash = '#!action=contents&idx='+bbsIdx+'&link='+linkType+'&page='+page;
			//console.log($.modal.OPEN);

			//var channelViewCommonHtml = MOBILE_TEMPLETE.CONNTAINER.channel_view(channelType, channelIdx);
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);

				//	$('.company-contents-modal-view-wrap').find('.btn-top-back').data('target', 'event_list');
				//MOBILE_PAGE.event_view.start(eventIdx);
			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

		}


	};

	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.COMPANY.M_CONTENTS+companyType;
	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var formData = {
		is_mobile	: 1,
	};

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxCompanyContentsViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};


//video js player init
MOBILE_COMMON.contentsMobileVideoJsVideoInit = function(playerId) {
	console.log('MOBILE_COMMON.contentsMobileVideoJsVideoInit', playerId);
	
	if(isDefined(playerId) == false){
		return;
	}
	
	var options = {
		controls: true,
		language: 'ko',
		//aspectRatio: '16:9',
		fluid		: true,
		//autoplay: true,
		preload: 'auto'
	};
	
	//방향 체크
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
		
		if(changeMode == 'portrait'){
			var videoH = $('#mobile-view-video-js-video-player_html5_api').height();
			if(isDefined(videoH)){
				$('#mobile-view-video-js-video-player_html5_api').data('vh',videoH);
			}
			
		}
		
		MOBILE_PAGE.contents.setMobileConetnsScreenView(changeMode);
			
	};
	
	console.log('MOBILE_COMMON.NEW_VIDEO_PLAYER', MOBILE_COMMON.NEW_VIDEO_PLAYER);
	if(isDefined(MOBILE_COMMON.NEW_VIDEO_PLAYER) == true){
		MOBILE_COMMON.NEW_VIDEO_PLAYER.addClass('vjs-big-play-centered');
		MOBILE_COMMON.NEW_VIDEO_PLAYER.load();
		MOBILE_COMMON.NEW_VIDEO_PLAYER.bigPlayButton.show();
		changeOrientationScreen();
		return;
	}
	
	if($('video').length < 1){
		changeOrientationScreen();
		return;
	}

	MOBILE_COMMON.NEW_VIDEO_PLAYER = videojs(playerId, options, function onPlayerReady() {
		videojs.log('Your player is ready!');
		
		// In this context, `this` is the player that was created by Video.js.
		//this.play();
		
		//가로 세로 세팅
		
		changeOrientationScreen();
	
		// How about an event listener?
		this.on('ended', function() {
			videojs.log('Awww...over so soon?!');
			$('.mobile-contents-view-top-player-area').removeClass('played').addClass('ended');
		});
	});
	MOBILE_COMMON.NEW_VIDEO_PLAYER.addClass('vjs-big-play-centered');
	MOBILE_COMMON.NEW_VIDEO_PLAYER.landscapeFullscreen();
};



//모바일 stream - videojs
MOBILE_COMMON.contentsMobilePayStreamVideoInit = function(bbsIdx, streamUrl) {
	console.log('MOBILE_COMMON.contentsMobilePayStreamVideoInit', bbsIdx);	
	if(isDefined(bbsIdx) == false || isDefined(streamUrl) == false){
		console.log('not idx');
		return;
	}
	
	//mobile web view vedeo
	if(isMobileOnplayWebviewAgent() == true){
		console.log('web view ');
		var appStreamUrl = 'onplay.streaming://https:'+streamUrl;
		//alert(appStreamUrl);
		location.href = appStreamUrl;
		return;
	}else{
		//location.href = streamUrl;
		//return;
	}
	
	if(checkMobileDeviceAgent() == 'IOS'){
		console.log('ios');
		location.href = streamUrl;
		return;
	}
	

	
	//video js player
	var $targetEle = $('.mobile-contents-view-top-player-area');
	if(isDefined(MOBILE_COMMON.NEW_VIDEO_PLAYER) == true){
		MOBILE_COMMON.NEW_VIDEO_PLAYER.ready(function(){
			console.log('ready');	
			this.src({
			  type: 'video/mp4',
			  src: streamUrl
			});
			this.play();
			
			//클래스 추가
			$targetEle.removeClass('mobile_prev').addClass('mobile_live played');
			
			
		});
	}
	
	return;
	
	
	
	
};


//mediaelement player init
MOBILE_COMMON.contentsMobilePreviewVideoInit = function(bbsIdx) {

	console.log('MOBILE_COMMON.contentsMobilePreviewVideoInit : video on', bbsIdx);
	if(isDefined(bbsIdx) == false){
		console.log('bbsIdx empty');
		return;
	}
	var $previewMediaEle = $('#mobile-view-video-js-preview-contents-'+bbsIdx);
	if($previewMediaEle.length < 1){
		console.log('$previewMediaEle err');
		return;
	}

	var $playerVideoEle = $("#onplay_mobile_preview_player_"+bbsIdx);
	if($playerVideoEle.length < 1){
		console.log('$playerVideoEle err');
		return;
	}
	console.log('in');
	
	//login check
	
	var getPayMediaControllHtml = function(targetBbsIdx, targetFileNo){
		if(isDefined(targetFileNo) ==false){
			targetFileNo = $('#mobile-view-video-js-preview-contents-'+targetBbsIdx).data('file');
		}
		if(isDefined(targetFileNo) == false){
			console.log('재생 동영상 정보를 찾을 수 없습니다. 다시 시도해주세요.');
			return '';			
		}
		var rtHtml = '<div class="mobile-video-controll-btn" data-pay="cash" data-action_type="M_STREAM" data-type="stream" data-bbs="'+targetBbsIdx+'" data-target="0" data-file="'+targetFileNo+'" data-info="#mobileContentsViewBbsInfoForm" onclick="MOBILE_PAGE.contents.onclickContentsBuy(this);">';
			rtHtml += '	<span class="btn play now active">';
			rtHtml +='		<span class="p_ico"></span>';
			rtHtml +='	</span>';
			rtHtml +='</div>';
		return rtHtml;
	}
	
	var getPrevMediaControllHtmlForLogin = function(){

		var rtHtml = '<div class="mobile-video-controll-btn login_check_area"  onclick="GO_LOGIN();">';
			//rtHtml += '		<div class="player_guide_login">1분 미리보기 감상은 로그인후 이용이 가능합니다. >>Go Login</div>';
			rtHtml += '		<div class="player_guide_login">&nbsp;</div>';
			rtHtml +='</div>';
		return rtHtml;
	}

	
	if(utility.disk.checkIsLogin() == true){
		$('.mobile-view-video-player').find('.login_check_area').hide();
	}else{
		$('.mobile-view-video-player').find('.login_check_area').show();
	}
	
	
	//미리보기인 경우
	if($previewMediaEle.find('.mejs__mediaelement').length > 0){
		return;
	}
	
	var isPrevPlayer = true;
	if($('.mobile-contents-view-top-player-area').hasClass('non_prev')){
		isPrevPlayer = false;
	}
	


	var videoPlayerReady = function(media, node, player) {
		console.log('videoPlayerReady');
		media.addEventListener('ended', function(e) {
			//Do what you want, e.g. reload the page
			console.log('media ended');
			//media.load();
			//http://fca-pre.mobile.pconn.co.kr/clip/6h0v7t4fZVUfxk8xRHrF0dxKd6R2fNUavRYSh4zB7szoHQgnwk--h7PWxpcRH4fqnsIL0MR9qkumO8H0ka9EPpPoAT0KUjH2vQhYcC9eOOPkT3cmIfoIgtFZYBmJuEaVXOmtbc7QV5V2kyMCqngrwQ
		});
		//btn
		if(isPrevPlayer == true){
			$('.mejs__overlay-button').addClass('preview').removeClass('live replay');
			
			if(utility.disk.checkIsLogin() != true){
				if($('.mobile-view-video-player').find('.mejs__inner').find('.mobile-video-controll-btn').length < 1){
					$('.mobile-view-video-player').find('.mejs__inner').append(getPrevMediaControllHtmlForLogin());
				}else{
					$('.mobile-view-video-player').find('.mejs__inner').find('.mobile-video-controll-btn').remove();
					$('.mobile-view-video-player').find('.mejs__inner').append(getPrevMediaControllHtmlForLogin());
				}
			}else{
				$('.mobile-view-video-player').find('.login_check_area').hide();
			}
			
			//$('.mejs__controls').hide();
		}else{
			$('.mejs__overlay-button').addClass('live').removeClass('preview replay').hide();
			//$('.mejs__overlay-button').addClass('live').removeClass('preview replay');
			/*
			$('.mejs__controls').hide();
			if($('.mobile-view-video-player .mejs__overlay-play').find('.mobile-video-controll-btn').length < 1){
				$('.mobile-view-video-player').find('.mejs__overlay-play').append(getPayMediaControllHtml(bbsIdx));
			}
			*/
			//$('.mobile-view-video-player').find('.mejs__controls').hide();
			if($('.mobile-view-video-player').find('.mejs__inner').find('.mobile-video-controll-btn').length < 1){
				$('.mobile-view-video-player').find('.mejs__inner').append(getPayMediaControllHtml(bbsIdx));
			}
			
		}
		
		//poster
		var prevPoster = $playerVideoEle.data('poster');
		console.log('prevPoster', prevPoster);
		if(isDefined(prevPoster)){
			player.setPoster(prevPoster);
		}
		//media.play();
	}
	//return;
	MOBILE_COMMON.VIDEO_PLAYER = $playerVideoEle.mediaelementplayer({
		pluginPath: '/_static/_lib/mediaelementjs/',
		//pluginPath :  ' ../build/ ' ,
		// All the config related to HLS
		hls: {
			debug: true
		},
		/*
		videoWidth: 300,
		videoHeight: 200,
		*/
		setDimensions: false,			//CSS 대신 JS를 통해 치수 설정
		//clickToPlayPause : false,		//클릭 비디오 요소를 사용하여 재생 / 일시 중지 전환
		//hideVideoControlsOnPause	: true,
		//features					: ['current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen'],
		
		// More configuration parameters...

		success: function(media, node, instance) {
			// Use the conditional to detect if you are using `native_hls` renderer for that given media;
			// otherwise, you don't need it
			console.log('contentsPreviewVideoInit success');

			//if (Hls !== undefined)
			if(isDefined(Hls) == true){
				console.log('hls');

				//console.log(Hls.Events);
				media.addEventListener(Hls.Events.MEDIA_ATTACHED, function () {
					// All the code when this event is reached...
					console.log('contentsPreviewVideoInit Media attached!');
				});

				// Manifest file was parsed, invoke loading method
				media.addEventListener(Hls.Events.MANIFEST_PARSED, function () {
					// All the code when this event is reached...
					console.log('contentsPreviewVideoInit Manifest parsed!');
				});

				media.addEventListener(Hls.Events.FRAG_PARSING_METADATA, function (event, data) {
					// All the code when this event is reached...
					console.log(data);
				});

			}else{
				console.log('contentsPreviewVideoInit no hls')
			}
			
			media.addEventListener('loadedmetadata', function(e) {
			   console.log('prev addEventListener - loadedmetadata') ;
			   
			   //ele resize
			   var playerHeight = $('.mobile_view_wrap .mobile_preview_player').height();
			   console.log('playerHeight', playerHeight);
			   if(isDefined(playerHeight)){
			   	$('.mobile-contents-view-top-player-area').height(playerHeight);	
			   }
			   
			});
			
			videoPlayerReady(media, node, instance);
		},
		error: function (err) {
     			console.log('contentsPreviewVideoInit err');
     			console.log(err);
				//$('.mobile-contents-view-top-player-area').find('.web_view_preview_err-msg').addClass('show');
				disk_alert('동영상 재생은 모바일 디바이스에서만 가능합니다.');
    		}
	});
	return;
};

//모바일 stream - 미디어 js
MOBILE_COMMON.contentsMobilePayStreamVideoInitMediajs = function(bbsIdx, streamUrl) {

	
	var $playerVideoEle = $("#onplay_mobile_preview_player_"+bbsIdx);
	console.log('$playerVideoEle', $playerVideoEle);
	
	
	if($playerVideoEle.length > 0){
		/*
		$playerVideoEle.find('.mobileViewVideoPlayerSource').attr('src', data.download.mobile_stream_url);
		
		if(isDefined(MOBILE_COMMON.VIDEO_PLAYER)){
			console.log('MOBILE_COMMON.VIDEO_PLAYER', MOBILE_COMMON.VIDEO_PLAYER);
			//MOBILE_COMMON.VIDEO_PLAYER.play();
		}	
		*/
		//var player = $playerVideoEle[0].player.media;
		if($('.mobile-contents-view-top-player-area').hasClass('non_prev')){
			$('.mobile-contents-view-top-player-area').removeClass('non_prev');	
		}
		var player = MOBILE_COMMON.VIDEO_PLAYER[0].player.media;
		
		player.addEventListener('playing', function(e) {
		   console.log('addEventListener - playing') ;
		});
		
		player.addEventListener('loadedmetadata', function(e) {
		   console.log('addEventListener - loadedmetadata') ;
		   console.log('player',player);
		   $('.mejs__overlay-button').addClass('live').removeClass('preview replay');
		   $('.mejs__controls').show();
		   //$('.mobile-video-controll-btn').removeClass('active');
		   //재생버튼을 교환
		    $('.mejs__overlay-button').addClass('live').removeClass('preview replay').show();
			$('.mobile-view-video-player').find('.mobile-video-controll-btn').remove();
			$('.mobile-contents-view-top-player-area').css('height','auto');
			$('.mobile_view_wrap').find('.v_preview_area-guide').removeClass('preview').addClass('live');
			
			
		});
		
		player.addEventListener('ended', function(e) {
		   console.log('addEventListener - ended') ;
		});
		
		player.success = function(media, node, instance) {	
			console.log('successMobilePayAction player success');
			console.log('media',media);
			console.log('node',node);
			console.log('instance',instance);
		}
		if(isDefined(MOBILE_COMMON.VIDEO_PLAYER)){
			MOBILE_COMMON.VIDEO_PLAYER.clickToPlayPause = true;
		}
		console.log(player);
		
	    player.setSrc(streamUrl);
	    player.load();
	    player.play();
	    
	    
	    
	}
}


MOBILE_COMMON.openMobileAdultView = function() {
	console.log('MOBILE_COMMON.openMobileAdultView');


	var successAjaxAdultViewData = function(data){
		console.log('successAjaxCompanyContentsViewData');
		console.log(data);

		var viewHtml = null;
		if(data == 'ERR_ONPLAY_COMPANY_NOT_FOUND_CONTENTS'){
        	console.log('data:', data);
			disk_alert('페이지 정보를 확인할수 없습니다.');
        	//history.back(true);
			return;
        }else{
			if(data.length < 100 ){
        		console.log('err modal html');
				disk_alert('페이지 정보를 확인할수 없습니다.');
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			//console.log(viewHtml);

			//return;
			//location.hash = '#!action=contents&idx='+bbsIdx+'&link='+linkType+'&page='+page;
			//console.log($.modal.OPEN);

			//var channelViewCommonHtml = MOBILE_TEMPLETE.CONNTAINER.channel_view(channelType, channelIdx);
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);

				//	$('.company-contents-modal-view-wrap').find('.btn-top-back').data('target', 'event_list');
				//MOBILE_PAGE.event_view.start(eventIdx);
			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

		}


	};

	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.USER.ADULT_VIEW;
	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var formData = {
		is_mobile	: 1,
	};

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxAdultViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
}

//프로토콜 버전 체크해서 js 새로고침
MOBILE_COMMON.checkClientVer = function(verNum) {
	console.log('MOBILE_COMMON.checkClientVer', verNum);
	if(isDefined(verNum) == false){
		return;
	}
	
	var loadClientVer = utility.disk.getLoadedMobileClientVer();
	console.log('loadClientVer', loadClientVer);
	if(isDefined(loadClientVer) == false){
		return;
	}
	if(verNum != loadClientVer){
		location.reload(true);
	}
};


// 잔료일 js로 표현 omh 2020-01-28
/*
MOBILE_COMMON.contentsRemainingExpireTimeString = function(calc_date_time){
    console.log("contentsRemainingExpireTimeString");
    console.log( calc_date_time);
    console.log(Date.now());

    if(calc_date_time < 1){
			return '기간만료 ';
	}


	//if(86400 <= $calc_date){
	if((86400*3) <= calc_date_time){
		return Math.floor( calc_date_time / 86400)+'일';
	}else if(3600 <= calc_date_time){
		return Math.floor(calc_date_time / 3600)+'시간';
	}else if(60 <= calc_date_time){
		return Math.floor(calc_date_time / 60)+'분';
	}else if(0 <= calc_date_time){
		return calc_date_time+'초';
	}

	return null;
}*/
