
/*
* mobile page : myseller
*/

MOBILE_PAGE.myseller.DATA = {
	MAIN		: null,
	SUB			: null,
	GROUP		: null,
	PAGE_ID		: null,


	SEARCH		: null,
	FILTER		: null,
	LAST_HASH	: null,
	ELE	: {
		info_wrap	: '.myseller-seller-info-wrap',
		container	: '#mobile-container-deep-22',
		modal_container	: '#mobile-container-modal-page',
		info		: '.channel-seller-page-end-spy',
		seller		: '.channel-seller-info-card',
		search_form	: '#mobileChannelSellerContentsSearchForm'

	},
	HASH		:
	{
		GROUP	: null,
		ID		: null,
	},


};

MOBILE_PAGE.myseller.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.myseller.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('myseller');
		return;
	}

	//판매자 여부 체크
	if(utility.disk.checkIsUploaderMember() != true){
		GO_SELLER_JOIN('myseller');
		return;
	}

	MOBILE_PAGE.myseller.init(showContainerInfo, hashPrams);
}


MOBILE_PAGE.myseller.defaultBinding = function(){
	console.log('MOBILE_PAGE.myseller.defaultBinding');
};


MOBILE_PAGE.myseller.init = function(info, params){
	console.log('MOBILE_PAGE.myseller.init');

	//MOBILE_PAGE.myseller.defaultBinding();
	if(isDefined(params) == false){
		return;
	}
	//MOBILE_PAGE.myseller.DATA.GROUP
	var actionType, myGroup, myId, searchKeyword, nextPage;
	if($.isPlainObject(params)){
		actionType = params['!action'];
		searchKeyword = params['k'];
		myGroup = params['group'];
		myId = params['id'];
		nextPage = params['page'];
	}

	if(actionType != 'myseller'){
		return;
	}
	if(isDefined(nextPage) == false || $.isNumeric(nextPage) == false){
		nextPage = 1;
	}

	//그룹함수 호출
	if(isDefined(myGroup) == true){
		var myGroupFun = MOBILE_PAGE.myseller[myGroup];
		if(myGroupFun){
			if(myGroupFun['start']){
				var startCallBackFun = myGroupFun['start'];
				if (typeof startCallBackFun === "function"){

					//remove white
					$('body.white').removeClass('white');
					MOBILE_PAGE.myseller.DATA.LAST_HASH = location.hash;
					$(MOBILE_PAGE.myseller.DATA.ELE.container).data('group','myseller-'+myGroup);
					startCallBackFun.call(null,  myId, nextPage, searchKeyword);


					return;
				}
			}
		}
	}

	if(MOBILE_PAGE.myseller.DATA.LAST_HASH == location.hash){
		console.log('same myseller saved hash');

		//var $innerEle = $(MOBILE_PAGE.myseller.DATA.ELE.container);
		var $sellerEle = $(MOBILE_PAGE.myseller.DATA.ELE.container).find(MOBILE_PAGE.myseller.DATA.ELE.info_wrap);
		var isLoaded = false;
		if($sellerEle.length > 0){
			var containerText = $sellerEle.text();
			if(isDefined(containerText) == false || containerText.length < 50){
				MOBILE_PAGE.myseller.setMysellerMain();
				return;
			}

			return;
		}
	}

	MOBILE_PAGE.myseller.setMysellerMain();
};



//마이페이지 : main 기본
MOBILE_PAGE.myseller.setMysellerMain = function(){
	console.log('MOBILE_PAGE.myseller.setMysellerMain');
	var getLoginCheckCallbackFunMyseller = function(data){
		console.log('getLoginCheckCallbackFunMyseller');
		console.log(data);

		if(isDefined(data.seller_info_html)){
			$(MOBILE_PAGE.myseller.DATA.ELE.info_wrap).html(data.seller_info_html);
			MOBILE_PAGE.myseller.DATA.LAST_HASH = location.hash;

		}else{
			disk_alert('판매자 정보를 확인할 수 없습니다.', GO_HOME);
			return;
		}
	};
	var formData ={
		is_mobile	:	1,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.MOBILE.SELLER_INFO,
		data		: formData,
		success_fun	: getLoginCheckCallbackFunMyseller,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};

//제재상태 열고 닫기
MOBILE_PAGE.myseller.onclickMoreDetailInfo = function(thisEle){
	console.log('MOBILE_PAGE.myseller.onclickMoreDetailInfo');
	var eleData = $(thisEle).data();
	if(isDefined(eleData) == false){ return;}
	if(isDefined(eleData.target) == false){ return;}
	var $targetEle = $('.'+eleData.target);
	if($targetEle.length > 0){
		$targetEle.toggleClass('active');
	}
};


//마이페이지 : common more data
MOBILE_PAGE.myseller.onclickMoreMobileData = function(thisEle){
	console.log('MOBILE_PAGE.myseller.onclickMoreMobileData');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if($(thisEle).hasClass('ending')){
		console.log('has cls ending');
		return;
	}

	var mysellerGroup, mysellerId, searchKeyword;
	var mysellerLoadedPage = 1;
	var mysellerTotalPage = 1;
	if(isDefined(eleData.group)){
		mysellerGroup = eleData.group;
	}
	if(isDefined(eleData.id)){
		mysellerId = eleData.id;
	}
	if(isDefined(eleData.loaded)){
		mysellerLoadedPage = parseInt(eleData.loaded);
	}
	if(isDefined(eleData.total_page)){
		mysellerTotalPage = parseInt(eleData.total_page);
	}

	var nextPage = mysellerLoadedPage + 1;
	if(nextPage > mysellerTotalPage){
		console.log('max page');
		$(thisEle).data({page :mysellerLoadedPage, loaded : mysellerLoadedPage, total_page:mysellerLoadedPage}).removeClass('loading').addClass('ending');
		return;
	}
	console.log('mysellerGroup', mysellerGroup);
	console.log('mysellerId', mysellerId);
	console.log('nextPage', nextPage);
	if(mysellerGroup == 'mlog'){
		if(isDefined(mysellerId) == true){
			MOBILE_PAGE.myseller.mlog.setMySellerLogList(mysellerId, nextPage);
		}
	}else if(mysellerGroup == 'info'){
		if(mysellerId == 'comments'){
			//MOBILE_PAGE.myseller.mlog.setMySellerLogList(mysellerId, nextPage);
			MOBILE_PAGE.myseller.info.setMySellerCommentList(mysellerId, nextPage);
		}
	}

};



/*
myseller info group
*/
MOBILE_PAGE.myseller.info = {};


//판매자 정보
MOBILE_PAGE.myseller.info.start = function(pageId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.info.start');
	console.log('pageId', pageId);
	console.log('nextPage', nextPage);
	console.log('searchKeyword', searchKeyword);

	if(pageId == 'info_edit'){
		MOBILE_PAGE.myseller.info.openInfoEditModal();
	}else if(pageId == 'comments'){
		MOBILE_PAGE.myseller.info.openInfoCommentsListModal(pageId);
	}else if( pageId == 'payback'){
	   MOBILE_PAGE.myseller.info.openInfocashInfoModal(pageId);
	}

};

//판매자 정보수정 : form html
MOBILE_PAGE.myseller.info.openInfoEditModal = function(isHash){
	console.log('MOBILE_PAGE.myseller.info.openInfoEditModal');
	var successAjaxSellerInfoFormFun = function(data){
		console.log('successAjaxSellerInfoFormFun');
		//console.log(data);
		var viewHtml = null;
		if(data == 'ERR_ONPLAY_USER_NOT_LOGIN'){
        	console.log('data:', data);
			disk_alert('로그인이 필요한 콘텐츠입니다.', GO_LOGIN);
			return;
        }else if(data == 'ERR_ONPLAY_USER_NOT_UPLOADER'){
        	console.log('data:', data);
			disk_alert('등록되지 않은 판매자입니다. 먼저 판매자로 등록후 이용해 주세요.', GO_SELLER_JOIN);
			return;
        }else if(data == 'ERR_ONPLAY_USER_NOT_FOUNDED'){
        	console.log('data:', data);
			disk_alert('판매자 채널 정보를 확인할 수 없습니다.');
			return;
        }else{
			if(data.length < 100 ||  data.indexOf('wrap-channel-seller-info-modal-view') < 0){
        		console.log('err modal html');
				disk_alert('판매자 채널 정보를 확인할 수 없습니다.');
        		return;
        	}
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			//console.log(viewHtml);
			//var channelViewCommonHtml = MOBILE_TEMPLETE.CONNTAINER.channel_view(channelType, channelIdx);
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);
				if(isHash == 1){
					$('.wrap-channel-seller-info-modal-view').find('.btn-top-back').data('target', 'myseller');
				}

			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

		}
	};

	var formData = {
		is_mobile	: 1
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.MOBILE.INFO_EDIT_FORM,
		data		: formData,
		success_fun	: successAjaxSellerInfoFormFun,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: false
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
};

//판매자 정보 수정 submit
MOBILE_PAGE.myseller.info.onclickEditFormSubmit = function(targetFormName, e){
	console.log('MOBILE_PAGE.myseller.info.onclickEditFormSubmit', targetFormName);

	if(isDefined(e) == true){
		e.preventDefault();
		//return;
	}
	if(isDefined(targetFormName) == false){
		return;
	}
	var $targetForm = $('#'+targetFormName);
	if($targetForm.length < 1){
		console.log('$targetForm empty');
		return;
	}
	var getFormData = $targetForm.serializeArray();
	console.log('getFormData', getFormData);
	var formData = {
		edit_seller					: null,
		edit_seller_category		: null,
		edit_seller_memo			: null,
		edit_seller_profile_picture	: null,
		edit_seller_theme			: null
	};

	var selectCategory = [];
	for(var i in getFormData){
		var fName = getFormData[i].name;
		var fVal = getFormData[i].value;
		if(fName == 'edit_seller_category_item[]'){
			selectCategory.push(fVal);
			continue;
		}
		formData[fName] = fVal;
	}
	formData.edit_seller_category = selectCategory;

	$('.input-err-msg.show').removeClass('show');
	console.log('formData', formData);

	if(isDefined(formData.edit_seller) == false ){
		//alert('판매자 정보를 확인할 수 없습니다.');
		$('.input-err-msg.edit_seller').addClass('show');
		return;
	}

	if(selectCategory.length < 1 ){
		//alert('최소 1개 이상의 카테고리를 선택해주세요.');
		$('.input-err-msg.edit_seller_category').addClass('show');
		return;
	}

	if(formData.edit_seller_theme.length < 1 && formData.edit_seller_memo.length < 1){
		//alert('최소 1개 이상의 카테고리를 선택해주세요.');
		$('.input-err-msg.edit_seller_memo').addClass('show');
		return;
	}
	console.log('formData', formData);
	//return;

	var successSellerEditActionFun = function(data){
		console.log('successSellerEditActionFun', data);
		var showMsg = "채널 정보가 수정되었습니다.";
		$.ambiance({message: showMsg, type: "alert-info"});
		GO_MYSELLER();
	};

    //return false;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.EDIT_ACTION,
		data		: formData,
		success_fun	: successSellerEditActionFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return;
};


//프로필 이미지 클릭시
MOBILE_PAGE.myseller.info.showProfileImgPreview = function(objFileInput){
	/*
    if (objFileInput.files[0]) {
        var fileReader = new FileReader();
        console.log(fileReader);
        fileReader.onload = function (e) {
            $("#sellerProThumbTargetLayer").html('<img src="'+e.target.result+'" class="s_thumb" />');
			$("#sellerProThumbTargetLayer").css('opacity','0.7');
			$(".icon-choose-image").css('opacity','0.1');

			//$("#sellerProfileThumbUploadForm").submit();

        }
		fileReader.readAsDataURL(objFileInput.files[0]);
    }
    */

    var form = $('#mobileSellerProfileThumbUploadForm')[0];
	// Create an FormData object
    var sData = new FormData(form);
	//sData.append("CustomField", "This is some extra data, testing");

	var request = $.ajax({
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.INFO.PROFILE_UP_IMG,
		type		: "POST",
		data		:  sData,
		enctype		: 'multipart/form-data',
		contentType	: false,
		processData	:false,
		cache		: false,
		timeout		: 600000,
		dataType	: 'json',
	});

	request.done(function( data ) {
		console.log('ajax don', data)
		var gData = DISK_PROTOCOL.checkServerValuation(data);
		console.log('gData', gData);
		if(isDefined(gData) == false){
			return;
		}

		if(isDefined(gData.seller_image)){
			var timestamp = new Date().getTime();
			$("#mobileSellerProThumbTargetLayer").find('img.s_thumb').attr({'src':gData.seller_image+'?t='+timestamp});
			//$("#sellerProThumbTargetLayer").css('opacity','1');
			//set edit form
			$('#sellerForm-edit_seller_profile_picture').val(gData.seller_image);

			var showMsg = "이미지를 업로드하였습니다. 아래 저장하기를 눌러주세요.";
			$.ambiance({message: showMsg, type: "alert-info"});

		}

	});

	request.fail(function( jqXHR, textStatus ) {
		//alert( "Request failed: " + textStatus );
		DISK_PROTOCOL.requestFailAjax(jqXHR, textStatus);
	});

   return false;


    //$("#sellerProfileThumbUploadForm").submit();

};



//이용자 댓글 모아보기 - modal
MOBILE_PAGE.myseller.info.openInfoCommentsListModal = function(pageId, isHash){
	console.log('MOBILE_PAGE.myseller.info.openInfoCommentsListModal');

	var viewHtml = MOBILE_TEMPLETE.CONNTAINER.m_myseller.infoCommentsModal(pageId);
	var openCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		if(isHash == 1){
			$('#mobile-container-modal-page').find('.btn-top-back').data('target', 'myseller');
		}
		MOBILE_PAGE.myseller.info.setMySellerCommentList(pageId, 1);

	}
	OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

	return;
};

//이용자 댓글 모아보기 - list
MOBILE_PAGE.myseller.info.setMySellerCommentList = function(pageId, setPage){
	console.log('MOBILE_PAGE.myseller.info.setMySellerCommentList', pageId);

	if(isDefined(pageId) == false){
		console.log('pageId empty');
		return;
	}

	var nextPage = 1;
	if(isDefined(setPage) == true && $.isNumeric(setPage) == true){
		nextPage = parseInt(setPage);
	}
	var sendData = {
		is_mobile 	: 1,
		info_type	: pageId,
		page		: nextPage
	};

	var $containerEle = $(MOBILE_PAGE.myseller.DATA.ELE.modal_container);
	var successAjaxGetSellerLogListData = function(data){
		console.log('successAjaxGetSellerLogListData');
		console.log(data);

		var infoType = pageId;
		var logListEleWrapId = '#mobile-myseller-info-'+infoType;
		var logInfoEleWrapId = '#mobile-page-end-spy-info-'+infoType;
		var $innerHtmlTarget =  $(logListEleWrapId);
		var $infoEle = $(logInfoEleWrapId);
		var listCount = 0;
		var commentListHtml = [];
		if(isDefined(data.bbs_comment_data) == true){
			var commentList = data.bbs_comment_data;
			var cc = 0;
			for(var i in commentList){
				commentListHtml[i] = MOBILE_TEMPLETE.MY_SELLER.MINFO.comments(infoType, commentList[i]);
				cc++;
			}
			listCount = cc;
		}

		var curPage = 1;
		if(isDefined(data.page) == true){ curPage = parseInt(data.page);}
		var pageLimit = 10;
		if(isDefined(data.limit) == true){ pageLimit = parseInt(data.limit);}
		var searchNick = '';
		if(isDefined(data.nick) == true){ searchNick = data.nick;}

		var saveData = {
			group	:	'info',
			id		:	infoType
		}
		console.log('curPage', curPage);
		console.log('listCount', listCount);

		if(commentListHtml.length > 0){
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage + 1;
			if(curPage == 1){
				$innerHtmlTarget.html(commentListHtml.join('')).data('load', 1);
			}else{
				$innerHtmlTarget.append(commentListHtml.join(''));
			}
			if(pageLimit < listCount){
				saveData.total_page = curPage;
			}
			$infoEle.data(saveData).addClass('loading').removeClass('ending');
			$containerEle.find('.f_content.'+infoType).removeClass('no-data');

		}else{
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show', infoType);
				$containerEle.find('.f_content.'+infoType).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}

		console.log('curPage', curPage);
		if(curPage == 1){
			GO_TOP();
		}
	};

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.MOBILE.INFO_COMMENT_LIST,
		data		: sendData,
		success_fun	: successAjaxGetSellerLogListData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;

}


//캐시 안내 - modal
MOBILE_PAGE.myseller.info.openInfocashInfoModal = function(pageId, isHash){
	console.log('MOBILE_PAGE.myseller.info.openInfocashInfoModal');
    var seller_cash = 0;
    if(document.readyState != "complete"){
       MOBILE_PAGE.myseller.info.getSellerCash();
    } 
    
    if(isDefined($("#send_ssc").val())){
        seller_cash = $("#send_ssc").val();
    }
    
	var viewHtml = MOBILE_TEMPLETE.CONNTAINER.chargeinfomation(seller_cash,pageId);
	var openCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		if(isHash == 1){
			$('#mobile-container-modal-page').find('.btn-top-back').data('target', 'myseller');
		}
	}
	OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

	return;
};

MOBILE_PAGE.myseller.info.getSellerCash = function(){
    
    var successAjaxGetSellerCashData = function(data){
        console.log("getSellerCash");      
        if(isDefined(data) && isDefined(data.show_seller_cash)){
            seller_cash = $("#end_ssc").text("'"+data.show_seller_cash+"'");
        }
        
    }
    var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.MOBILE.GET_SELLER_CASH,
		data		: null,
		success_fun	: successAjaxGetSellerCashData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;
}
/*
* myseller log group
*/
MOBILE_PAGE.myseller.mlog = {};
//판매자 로그
MOBILE_PAGE.myseller.mlog.start = function(pageId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.mlog.start');
	console.log('pageId', pageId);
	console.log('nextPage', nextPage);
	console.log('searchKeyword', searchKeyword);

	if(pageId == 'sales_history'){
		MOBILE_PAGE.myseller.mlog.openLogSalesHistoryModal(pageId);
	}
};


//판매자 적립내역
MOBILE_PAGE.myseller.mlog.openLogSalesHistoryModal = function(pageId, isHash){
	console.log('MOBILE_PAGE.myseller.mlog.openLogSalesHistoryModal');

	var viewHtml = MOBILE_TEMPLETE.CONNTAINER.m_myseller.commonLogHistory(pageId);
	var openCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		if(isHash == 1){
			$('#mobile-container-modal-page').find('.btn-top-back').data('target', 'myseller');
		}

		MOBILE_PAGE.myseller.mlog.setMySellerLogList(pageId, 1);

	}
	OPEN_PAGE_MODAL(viewHtml, openCallbackFun);

	return;
};


MOBILE_PAGE.myseller.mlog.setMySellerLogList = function(pageId, setPage){
	console.log('MOBILE_PAGE.myseller.mlog.setMySellerLogList', pageId);

	if(isDefined(pageId) == false){
		console.log('pageId empty');
		return;
	}

	var nextPage = 1;
	if(isDefined(setPage) == true && $.isNumeric(setPage) == true){
		nextPage = parseInt(setPage);
	}
	var sendData = {
		is_mobile 	: 1,
		logType		: pageId,
		page		: nextPage
	}

	var $containerEle = $(MOBILE_PAGE.myseller.DATA.ELE.modal_container);

	var successAjaxGetSellerLogListData = function(data){
		console.log('successAjaxGetSellerLogListData');
		console.log(data);

		var logType = pageId;
		if(isDefined(data.log_type) == true){ logType = data.log_type;}
		var logListEleWrapId = '#mobile-myseller-mlog-'+logType;
		var logInfoEleWrapId = '#mobile-page-end-spy-mlog-'+logType;
		var $innerHtmlTarget =  $(logListEleWrapId);
		var $infoEle = $(logInfoEleWrapId);

		
		var listCount = 0;
		var logListHtml = [];
		if(isDefined(data.seller_log_list) == true){
			var logList = data.seller_log_list;

			listCount = logList.length;
			for(var i =0; i < listCount; i++){
				logListHtml[i] = MOBILE_TEMPLETE.MY_SELLER.MLOG.sales_history(logType, logList[i]);
			}
		}

		var curPage = 1;
		if(isDefined(data.page) == true){ curPage = parseInt(data.page);}
		var pageLimit = 10;
		if(isDefined(data.limit) == true){ pageLimit = parseInt(data.limit);}
		var searchNick = '';
		if(isDefined(data.nick) == true){ searchNick = data.nick;}



		var saveData = {
			group	:	'mlog',
			id		:	logType
		}
		console.log('curPage', curPage);

		if(logListHtml.length > 0){
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage + 1;
			if(curPage == 1){
				$innerHtmlTarget.html(logListHtml.join('')).data('load', 1);
			}else{
				$innerHtmlTarget.append(logListHtml.join(''));
			}
			if(pageLimit < listCount){
				saveData.total_page = curPage;
			}
			$infoEle.data(saveData).addClass('loading').removeClass('ending');
			$containerEle.find('.f_content.'+logType).removeClass('no-data');

		}else{
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show', logType);
				$containerEle.find('.f_content.'+logType).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}

		console.log('curPage', curPage);
		if(curPage == 1){
			/*
			if(logListHtml.length < 1){
				console.log('list empty');
				$containerEle.find('.f_content').addClass('no-data');
			}else{
				$containerEle.find('.f_content.no-data').removeClass('no-data');
			}
			*/
			GO_TOP();
		}

		//MOBILE_PAGE.mypage.point.afterBinding();

	};


	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.MOBILE.LOG_SALES_HISTORY,
		data		: sendData,
		success_fun	: successAjaxGetSellerLogListData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	return;

};
