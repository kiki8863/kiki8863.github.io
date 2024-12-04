/*
* seller page
*/

var PAGE_MY_SELLER = {};
PAGE_MY_SELLER.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LAST_HASH_NO_PAGE		: null,
	LOADED_PAGE		: null,
	IS_LOADED_PAGE	: false,
	IS_LOADED_PAGE_ID	: null,
};

PAGE_MY_SELLER.start = function(pageMain, pageSub, pagData){
	console.log('PAGE_MY_SELLER.start', pageMain);
	console.log('pageSub', pageSub);
	console.log(pagData);
	PAGE_MY_SELLER.DATA.PAGE_SUB = pageSub;
	PAGE_MY_SELLER.DATA.PAGE_MEMU = pageMain;
	var defaultHash = null;
	PAGE_MY_SELLER.DATA.LAST_HASH =  null;
	PAGE_MY_SELLER.DATA.LAST_HASH_NO_PAGE = null;

	console.log('defaultHash', defaultHash);
	console.log('PAGE_MY_SELLER.DATA', PAGE_MY_SELLER.DATA);



	PAGE_MY_SELLER.initBinding();
	PAGE_MY_SELLER.initOnload();

	//PAGE_MY_SELLER.setHashCheck('YES');

	if(pageMain == 'my_seller_category'){
		PAGE_MY_SELLER.category.start();
	}else if(pageMain == 'my_seller_info'){
		if(pageSub == 'info_edit'){
			PAGE_MY_SELLER.info.edit.initBinding();
		}else if(pageSub == 'comments'){
			PAGE_MY_SELLER.info.comments.start();
		}
	}else if(pageMain == 'my_seller_logs'){
		PAGE_MY_SELLER.logs.start();
	}

};


//오른쪽 메뉴 바인딩
PAGE_MY_SELLER.leftBtnBinding = function(){
	console.log('PAGE_CHANNEL_ON.initBinding');

	//오른쪽 서브 메뉴 오픈
	if($( ".seller_left_main_menu" ).length > 0){
		$( ".seller_left_main_menu" ).unbind( "click");
		$( ".seller_left_main_menu" ).bind( "click", function() {
			console.log('.seller_left_main_menu');
			$(this).parent().toggleClass('active');
		});
	}

};

PAGE_MY_SELLER.initBinding = function(){
	console.log('PAGE_MY_SELLER.initBinding');
	PAGE_MY_SELLER.leftBtnBinding();
	
	PAGE_MY_SELLER.setBindingPjax();
};

PAGE_MY_SELLER.initOnload = function(){
	console.log('PAGE_MY_SELLER.initOnload');

};

//페이노출 후 바인딩
PAGE_MY_SELLER.afterPageLoadBinding = function(){


};


// image lazy
PAGE_MY_SELLER.setImageLazy = function(){
	console.log('PAGE_MY_SELLER.setImageLazy');
	//image lazy
	if($('.disk-image-lazy').length > 0){
		$('.disk-image-lazy').lazy();
	}
};


//pjax binding
PAGE_MY_SELLER.setBindingPjax = function(){
	console.log('PAGE_MY_SELLER.setBindingPjax');
		
	if ($.support.pjax) {
		console.log('support pajx');
		var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		console.log('url', url);
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			var containerSelector = '#my-seller-center-contents-wrap';
			var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
			console.log('url', url);
			
			var a = $.pjax.click(event, {
				container: containerSelector,
				url: url
			});
			console.log(a);
		});
	}
	
	$(document).on('pjax:send', function() {
		utility.spinnerLoading.show();
	});
	
	$(document).on('pjax:complete', function() {
		utility.spinnerLoading.hide();
		
		//image lazy
		PAGE_MY_SELLER.setImageLazy();
		
		//option
		PAGE_MY_SELLER.category.defaultBindig();
		
		if($('.onpick-category-top-rank').length > 0){
			$('.onpick-category-top-rank').hide();
		}
	});

	// for google analytics
	$(document).on('pjax:end', function() {
		ga('set', 'location', window.location.href); // 현재 바뀐 주소를
		ga('send', 'pageview'); // 보고한다
	});
};


//수동으로 리스트  가져오기
PAGE_MY_SELLER.goSearchContentsDatayPjax = function(pJaxUrl){
	console.log('goCategoryPjax', pJaxUrl);
	if(isDefined(pJaxUrl) == false){
		return;
	}
	var containerSelector = '#my-seller-center-contents-wrap';
	if ($.support.pjax) {
		console.log('support');
		$.pjax({url: pJaxUrl, container:containerSelector});
	}
	return;

};


//판매자 아이템(채널 아이템) 충전 모달
PAGE_MY_SELLER.openSellerItemChargeModalForm = function(thisEle){
	console.log('PAGE_MY_SELLER.openSellerItemChargeModalForm');
	var $targetModal = $('#disk-pc-common-modal');
	$targetModal.empty();

	var successFunGetModalHtml = function(data){
		console.log('successFunGetModalHtml');
		console.log(data);
		if(isDefined(data.modal_html)){
			var modalHtml = data.modal_html;
			var isModalCloseExisting = false;
			if(isDefined(modalHtml)){

				$targetModal.html(modalHtml).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-modal-blocker",
					clickClose		: false,
					keyboard		: false
				});
			}
		}


	};
	var formData = {
		is_mobile	: 0
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.MODAL_FORM_CHANNEL_ITEM,
		data		: formData,
		success_fun	: successFunGetModalHtml,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//판매자 제재 해제 신청 - form
PAGE_MY_SELLER.openSellerBlockEndReauestModalForm = function(thisEle){
	console.log('PAGE_MY_SELLER.openSellerItemChargeModalForm');
	var $targetModal = $('#disk-pc-common-modal');
	$targetModal.empty();

	var successFunGetModalHtml = function(data){
		console.log('successFunGetModalHtml');
		console.log(data);
		if(isDefined(data.modal_html)){
			var modalHtml = data.modal_html;
			var isModalCloseExisting = false;
			if(isDefined(modalHtml)){

				$targetModal.html(modalHtml).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-modal-blocker",
					clickClose		: false,
					escapeClose		: false
				});
			}
		}
	};
	var formData = {
		is_mobile	: 0
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.MODAL_FORM_END_BLOCK,
		data		: formData,
		success_fun	: successFunGetModalHtml,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



//판매자 제재 해제 신청 - action
PAGE_MY_SELLER.openSellerBlockEndBlockRequestAction = function(targetForm){
	console.log('PAGE_MY_SELLER.openSellerBlockEndBlockRequestAction', targetForm);
	var requestMemo = $('#'+targetForm).find('textarea[name=req_memo]').val();
	console.log('requestMemo', requestMemo);
	if(requestMemo.length < 2 || requestMemo.length > 200){
		alert('요청글은 최소 2자 이상 최대 200자까지 가능합니다.');
		return;
	}


	var formData = {
		is_mobile	: 0,
		req_memo	: requestMemo
	};

	var successFunEndblockRequest = function(data){
		console.log('successFunEndblockRequest');
		console.log(data);

		if(isDefined(data.auto_completed)){
			if(data.auto_completed == 1){
				if(isDefined(data.show_msg)){
					alert(data.show_msg);
					location.reload(true);
					return;
				}
			}
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		$.modal.close();
	};

	COMMON_ACTION.SELLER.actionSellerEndBlockRequest(formData, successFunEndblockRequest);
	return;
};



//판매자 등급 업 신청
PAGE_MY_SELLER.onclickSellerChannelLevelUpRequest = function(thisEle){
	console.log('PAGE_MY_SELLER.onclickSellerChannelLevelUpRequest');

	if($(thisEle).hasClass('disable-btn')){
		$.ambiance({message: "등업 신청이 접수되어 확인 중입니다.", type: "alert-success"});
		return;
	}

	var formData = {
		is_mobile	: 0
	};

	var successFunLevelupRequest = function(data){
		console.log('successFunLevelupRequest');
		console.log(data);
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		$(thisEle).addClass('disable-btn')
	};

	COMMON_ACTION.SELLER.actionSellerGradeUpRequest(formData, successFunLevelupRequest);
	return;
};


//판매자 가이드 모달
PAGE_MY_SELLER.openSellerGuideModalHtml = function(thisEle){
	console.log('PAGE_MY_SELLER.openSellerGuideModalHtml');
	var eleData = $(thisEle).data();
	if(isDefined(eleData) == false){
		return;
	}
	if(isDefined(eleData.key) == false){
		return;
	}
	//

	var gudie_key = eleData.key;

	var $targetModal = $('#disk-pc-seller-guide-modal');
	$targetModal.empty();

	var successFunGetModalHtml = function(data){
		console.log('successFunGetModalHtml');
		console.log(data);
		if(isDefined(data.modal_html)){
			var modalHtml = data.modal_html;
			var isModalCloseExisting = false;
			if(isDefined(modalHtml)){

				$targetModal.html(modalHtml).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "guide-modal-blocker",
					clickClose		: true,
					keyboard		: false
				});
				$('.seller-sub-menu-item').removeClass('active');
				$(thisEle).addClass('active');
			}
		}


	};
	var formData = {
		gudie_key	: gudie_key
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.WEB.GET_SELLER_GUIDE_MODAL,
		data		: formData,
		success_fun	: successFunGetModalHtml,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



/* seller category */
PAGE_MY_SELLER.category = {};
PAGE_MY_SELLER.category.start = function(){
	console.log('PAGE_MY_SELLER.category.start');

	PAGE_MY_SELLER.category.defaultBindig();
};

PAGE_MY_SELLER.category.defaultBindig = function(){
	console.log('PAGE_MY_SELLER.category.defaultBindig');

	//정렬순서
	$( "#btn-seller-top-sort-key" ).unbind( "click");
	$( "#btn-seller-top-sort-key" ).bind( "click", function() {
		console.log('btn-seller-top-sort-key');
		$( '#select-area-seller-sort-key' ).toggleClass('active');
	});

	//필터 옵션 클릭
	$( ".select-top-seller-option" ).unbind( "click");
	$( ".select-top-seller-option" ).bind( "click", function() {
		console.log('select-top-seller-option');
		var eleData = $(this).data();
		console.log(eleData);
		if(isDefined(eleData) == false){
			return;
		}

		if($(this).hasClass('active')){
			return;
		}

		if(eleData.values == 'all'){
			eleData.values = '';
		}
		if(isDefined(eleData.url) == false || isDefined(eleData.type) == false || isDefined(eleData.values) == false){
			return;
		}
		var hUrl = eleData.url;
		if(hUrl.indexOf(eleData.values) != -1) {
			$( '#select-area-seller-sort-key' ).toggleClass('active');
			return;
		}

		if(hUrl.indexOf('?') != -1) {
			goUrl = eleData.url+'&st='+eleData.values;
		}else{
			goUrl = eleData.url+'?st='+eleData.values;
		}
		console.log('goUrl', goUrl);
		PAGE_MY_SELLER.goSearchContentsDatayPjax(goUrl);
	/*
		var showLocation = location.pathname;
		var sendSrt = $.param( cData );
		console.log('sendSrt', sendSrt);
		var goUrl = showLocation+'?'+sendSrt;
		console.log('goUrl',goUrl);
	*/	
		
		

	});

	//전체 선택
	$( "#seller-contents-list-check-all" ).unbind( "click");
	$( "#seller-contents-list-check-all" ).bind( "click", function() {
		console.log('seller-contents-list-check-all');
		if($(this).prop("checked")) {
			$('#sellerContentsOwnerListForm').find(".seller_contents_check").prop("checked",true);
		}else{
			$('#sellerContentsOwnerListForm').find(".seller_contents_check").prop("checked",false);
		}
	});


	//개별 선택
	$( ".seller_contents_check" ).unbind( "click");
	$( ".seller_contents_check" ).bind( "click", function() {
		checkBoxLength = $("[name=seller_contents_check]").length;
		checkedLength = $("[name=seller_contents_check]:checked").length;
		if(checkBoxLength == checkedLength){
			$( "#seller-contents-list-check-all").prop("checked",true);
		}else{
			$( "#seller-contents-list-check-all").prop("checked",false);
		}
	});

};


//콘텐츠 삭제
PAGE_MY_SELLER.category.onclickDelContentsList = function(){
	console.log('PAGE_MY_SELLER.category.onclickDelContentsList');

	var checkDelList = [];
	$('#sellerContentsOwnerListForm').find("input[name=seller_contents_check]:checked").each(function() {
		checkDelList.push($(this).val());
	});

	console.log('checkDelList', checkDelList);

	if(isDefined(checkDelList) == false){
		alert('삭제할 콘텐츠를 선택해주세요.');
		return;
	}

	if(checkDelList.length > 20){
		alert('한번에 최대 삭제 가능한 콘텐츠는 20개입니다.');
		return;
	}

	if(confirm('선택한 게시물을 모두 삭제할까요?') != true){
		return;
	}


	var successFunChangeContents = function(data){
		console.log('successFunChangeContents', data);
		var $targetList;
		if(isDefined(data.idxs)){
			for(var i in data.idxs){
				var bbsIdx = data.idxs[i];
				$targetList = $('#seller-contents-action-list-'+bbsIdx);
				$targetList.remove();
			}
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-danger"});
		}
		/*
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
		}
		*/

		if($('.seller-contents-action-list').length < 1){
			location.reload(true);
		}
		//var $targetList = $('#seller-contents-action-list-'+eleData.idx);

	};

	var formData = {
		action		: 'del',
		idxs		: checkDelList
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.CONTENTS.DEL,
		data		: formData,
		success_fun	: successFunChangeContents,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);




};

//게시정보 변경
PAGE_MY_SELLER.category.onclickChangeContentsState = function(thisEle){
	console.log('PAGE_MY_SELLER.category.onclickChangeContentsState');

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.action) == false || isDefined(eleData.idx) == false){
		alert('정보가 올바르지 않습니다.');
		return;
	}
	PAGE_MY_SELLER.category.actionContentsChange(eleData);
};

//게시중지
PAGE_MY_SELLER.category.actionContentsChange = function(eleData){
	console.log('PAGE_MY_SELLER.category.actionContentsChange');
	console.log('eleData', eleData);
	if(isDefined(eleData.idx) == false){
		alert('정보가 올바르지 않습니다.');
		return;
	}
	var $targetList = $('#seller-contents-action-list-'+eleData.idx);

	var uploadActionAppCallbackFun = function(rt){
		console.log('uploadActionAppCallbackFun');
		console.log(rt);

		if(isDefined(rt.ws)){
			rt.ws.close();
			rt.ws = null;
			COMMON_WEB_UPLOAD.WS  = null;
		}

	}

	var successFunChangeContents = function(data){
		console.log('successFunChangeContents', data);
		//이어올리기
		if(data.change_action == 'pulling'){
			if(isDefined(data.access_token)){
				// omh 2020-0920
				var up_access_token = Base64.encode(data.access_token);
				//COMMON_WEB_UPLOAD.DISK_WEBSOCKET.OPEN_UPLOADER(up_access_token, uploadActionAppCallbackFun);  //웹소켓통신 안하기로함
				var DF = get_disk_config(false);
				var up_access_token = Base64.encode(data.access_token);
		 		console.log('customUrl');

				var customUrlCheckerFailFun = function(){
					console.log('customUrlCheckerFailFun');
				}
				var customUrlCheckersuccessFun = function(){
					console.log('customUrlCheckersuccessFun');
				}
				delDiskInstalledCUS('upload');
				//var starterUrl = DF.WEB_APP_PROTOCOL_NAME.up_action+'://'; //뒤에  DF.WEB_APP_PROTOCOL_NAME.up_action 한번더 붙여주지 않으면 토큰을 못알아본다.
				var starterUrl = DF.WEB_APP_PROTOCOL_NAME.up_action+'://'+up_access_token+DF.WEB_APP_PROTOCOL_NAME.up_action+'://';
				console.log('customUrl starterUrl:'+starterUrl);
				window.custom_url_checker(starterUrl,customUrlCheckerFailFun, customUrlCheckersuccessFun);
			 	event.preventDefault ? event.preventDefault() : event.returnValue = false;
			}
		}else{

			$targetList.find('.btn-seller-contents-action.'+data.change_action).hide();
			$targetList.find('.btn-seller-contents-action.'+eleData.target).css({'display': 'block'});
			if(isDefined(data.show_msg)){
				alert(data.show_msg);
			}
		}

	};

	var formData = eleData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.CONTENTS.CHANGE_STATE,
		data		: formData,
		success_fun	: successFunChangeContents,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



PAGE_MY_SELLER.contents = {};
PAGE_MY_SELLER.contents.start = function(){

};
PAGE_MY_SELLER.contents.callbackFun = function(data, saveData){
	console.log('PAGE_MY_SELLER.contents.callbackFun');
	console.log(data);
	console.log(saveData);
};


PAGE_MY_SELLER.log = {};
PAGE_MY_SELLER.log.start = function(){

};
PAGE_MY_SELLER.log.callbackFun = function(data, saveData){
	console.log('PAGE_MY_SELLER.log.callbackFun');
	console.log(data);
	console.log(saveData);
};



PAGE_MY_SELLER.info = {};
PAGE_MY_SELLER.info.start = function(){

};

//채널 정보 관리
PAGE_MY_SELLER.info.edit = {};

PAGE_MY_SELLER.info.edit.initBinding = function(){
	console.log('PAGE_MY_SELLER.info.edit.initBinding');

	//판매자 프로필 이미지 등록
	$("#sellerProfileThumbUploadForm").unbind('submit');
	$("#sellerProfileThumbUploadForm").on('submit',(function(e) {
		e.preventDefault();
		// Get form
        var form = $('#sellerProfileThumbUploadForm')[0];
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

		request.done(function( imgData ) {
			console.log('ajax don', imgData)
			if(imgData.status != 1){
				alert(imgData.msg);
				return;
			}
			var gData = imgData.data;
			if(isDefined(gData.down_url)){
				var timestamp = new Date().getTime();
				$("#sellerProThumbTargetLayer").find('img.s_thumb').attr({'src':gData.up_url+'?t='+timestamp});
				$("#sellerProThumbTargetLayer").css('opacity','1');
				//set edit form
				$('#sellerForm-edit_seller_profile_picture').val(gData.down_url);
				//set right picture
				//$('.channel-seller-profile-picture').attr('src', gData.up_url+'?t='+timestamp);
			}
			/*
			var gData = DISK_PROTOCOL.checkServerValuation(data);
			console.log('gData', gData);
			if(isDefined(gData) == false){
				return;
			}

			if(isDefined(gData.seller_image)){
				var timestamp = new Date().getTime();
				$("#sellerProThumbTargetLayer").find('img.s_thumb').attr({'src':gData.seller_image+'?t='+timestamp});
				$("#sellerProThumbTargetLayer").css('opacity','1');
				//set edit form
				$('#sellerForm-edit_seller_profile_picture').val(gData.seller_image);
			}
			*/

		});

		request.fail(function( jqXHR, textStatus ) {
			//alert( "Request failed: " + textStatus );
			DISK_PROTOCOL.requestFailAjax(jqXHR, textStatus);
		});

	   return false;
	}));

	//판매자 정보 변경
	$("#sellerInfoEditForm").unbind('submit');
	$("#sellerInfoEditForm").on('submit',(function(e) {
		e.preventDefault();
		// Get form

		var $targetForm = $(this);
		var getFormData = $targetForm.serializeArray();
		console.log('getFormData', getFormData);

		var formData = {
			edit_seller					: null,
			edit_seller_category		: null,
			edit_seller_memo			: null,
			edit_seller_profile_picture	: null,
			edit_seller_theme			: null,
			edit_seller_first_category	: null
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

		console.log('formData', formData);
		if(isDefined(formData.edit_seller) == false ){
			alert('판매자 정보를 확인할 수 없습니다.');
			return;
		}

		if(selectCategory.length < 1 ){
			alert('최소 1개 이상의 카테고리를 선택해주세요.');
			$('#sellerForm-edit_seller_category-11000').focus();
			return;
		}

		console.log('formData', formData);
		WEB_COMMON_SELLER.editFormAction(formData, PAGE_MY_SELLER.info.edit.doneCallbackFun);
		return false;
	}));
};

//프로필 이미지 클릭시
PAGE_MY_SELLER.info.edit.showPreview = function(objFileInput){

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

    $("#sellerProfileThumbUploadForm").submit();

};

//정보수정 후 콜백
PAGE_MY_SELLER.info.edit.doneCallbackFun = function(data){
	console.log('PAGE_MY_SELLER.info.edit.doneCallbackFun');
	console.log(data);

	if(isDefined(data.seller)){
		$('.seller-info-wrap').find('.seller-theme-span').text(data.seller.seller_theme);
		$('.seller-info-wrap').find('.seller-memo-span').text(data.seller.seller_memo);
		if(isDefined(data.seller.seller_profile_picture)){
			var timestamp = new Date().getTime();
			//$("#sellerProThumbTargetLayer").find('img.s_thumb').attr({'src':gData.seller_image+'?t='+timestamp});
			$('.seller-info-wrap').find('.seller_img.main_img').removeClass('no_img');
			$('.seller-info-wrap').find('.seller_img.main_img img').attr({'src':data.seller.seller_profile_picture});

		}
	}

	if(isDefined(data.seller_category_tags)){
		if(data.seller_category_tags.length > 0){
			var cateData;
			var cateTagHtml = [];
			for(var ci in data.seller_category_tags){
				cateData = 	data.seller_category_tags[ci];
				cateTagHtml.push('<span class="tag">#'+cateData.name+'</span> ');
			}
			$('.seller-info-wrap').find('.seller_h_tag_area').html(cateTagHtml.join(''));
		}
	}

	if(data.is_ok == true){
		alert('정보가 변경되었습니다.');
	}

};

PAGE_MY_SELLER.info.comments = {};

PAGE_MY_SELLER.info.comments.start = function(){
	console.log('PAGE_MY_SELLER.info.comments.start');
	PAGE_MY_SELLER.info.comments.initBinding();
}


PAGE_MY_SELLER.info.comments.initBinding = function(){
	console.log('PAGE_MY_SELLER.info.comments.initBinding');


	//댓글 리스트 클릭
	var $infoLogCommentListEle = $( ".seller-log-comment-list" );
	if($infoLogCommentListEle.length > 0){
		$infoLogCommentListEle.unbind( "click");
		$infoLogCommentListEle.bind( "click", function() {
			console.log('.seller_left_main_menu');
			$(this).parent('.m_click_area').toggleClass('active');
		});
	}

	//댓글 사용자 검색
	var $searchBuyerNicknameFormEle = $( "#sellerCommentListBuyerSearchForm");
	if($searchBuyerNicknameFormEle.length > 0){
		$searchBuyerNicknameFormEle.unbind('submit');
		$searchBuyerNicknameFormEle.submit(function(event){
			console.log('sellerManagerRangeDateForm submit');


			//event.preventDefault();
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);

			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);

			if(isDefined(formData.nick) == false){
				alert('검색하실 구매자 닉네임을 입력해주세요.');
				$searchBuyerNicknameFormEle.find('input[name=nick]').focus();
				return false;
			}
			var bNick = formData.nick;
			return true;

		});
	}



};


PAGE_MY_SELLER.logs = {};
PAGE_MY_SELLER.logs.start = function(){
	console.log('PAGE_MY_SELLER.logs.start');
	PAGE_MY_SELLER.logs.defaultBinding();
	PAGE_MY_SELLER.logs.setPagination();

	//var $paginationEle = $('#my-slller-logs-contents-pagination');
	//PAGE_MY_SELLER.logs.getSellerLogPageData(2, $paginationEle);

};

PAGE_MY_SELLER.logs.defaultBinding = function(){
	console.log('PAGE_MY_SELLER.logs.defaultBinding');

	//datepicker :날짜 조회 : 시작
	var $starDatePicker = $('#sellerManagerRangeDateForm_start_date');
	var startDatepickerDate;
	if($starDatePicker.length > 0){
		console.log('$starDatePicker');

		var startDate = new Date();
		var isLoadDate = false;
		if(isDefined($starDatePicker.val())){
			startDate = new Date(Date.parse($starDatePicker.val()));
			isLoadDate = true;
		}
		console.log(startDate);

		var pickerOption = {
			language	: 'kr',
			startDate	: startDate,
			autoClose	: true,
			maxDate: new Date(),
		};

		// Initialization
		$starDatePicker.datepicker(pickerOption);
		// Access instance of plugin
		startDatepickerDate = $starDatePicker.data('datepicker');
		if(isLoadDate){
			startDatepickerDate.selectDate(startDate);
		}
	}

	//datepicker :날짜 조회 : 종료
	var $endDatePicker = $('#sellerManagerRangeDateForm_end_date');
	var endDatepickerDate;
	if($endDatePicker.length > 0){
		console.log('$endDatePicker');

		var loadDate = new Date();
		var isLoadDate = false;
		if(isDefined($endDatePicker.val())){
			loadDate = new Date(Date.parse($endDatePicker.val()));
			var isLoadDate = true;
		}
		console.log(loadDate);

		var pickerOption = {
			language	: 'kr',
			startDate	: loadDate,
			autoClose	: true,
			maxDate: new Date(),
		};

		// Initialization
		$endDatePicker.datepicker(pickerOption);
		// Access instance of plugin
		endDatepickerDate = $endDatePicker.data('datepicker');
		if(isLoadDate){
			endDatepickerDate.selectDate(loadDate);
		}
	}

	//btn btn_calendar_start
	if($( "#btn_calendar_start").length > 0){
		$( "#btn_calendar_start").unbind( "click");
		$( "#btn_calendar_start").bind( "click", function() {
			console.log('#btn_calendar_start');
			if(isDefined(startDatepickerDate)){
				startDatepickerDate.show();
			}
		});
	}

	//btn btn_calendar_end
	if($( "#btn_calendar_end").length > 0){
		$( "#btn_calendar_end").unbind( "click");
		$( "#btn_calendar_end").bind( "click", function() {
			console.log('#btn_calendar_end');
			if(isDefined(endDatepickerDate)){
				endDatepickerDate.show();
			}
		});
	}


	var $infoEle = $('#my-slller-logs-contents-pagination');

	//날짜 조회 버튼 : btn-mypage-search-date-action
	//if($( "#btn-seller-search-date-action").length > 0){
		//$( "#btn-seller-search-date-action").unbind( "click");
		//$( "#btn-seller-search-date-action").bind( "click", function() {
	if($( "#sellerManagerRangeDateForm").length > 0){
		$("#sellerManagerRangeDateForm").unbind('submit');
		$("#sellerManagerRangeDateForm").submit(function(event){
			console.log('sellerManagerRangeDateForm submit');

			var $bNick = $('#sellerManagerRangeDateForm_buyer_nickname');
			var bNick;
			if(isDefined($bNick.val()) == true){
				bNick = $bNick.val();
			}else{
				bNick = '';
			}


			var $sDate = $('#sellerManagerRangeDateForm_start_date');
			var sDate = $sDate.val();

			if(isDefined(sDate) == false && isDefined(bNick) == false){
				alert('조회 시작일을 입력해주세요.');
				$sDate.focus();
				return false;
			}

			var $eDate = $('#sellerManagerRangeDateForm_end_date');
			var eDate = $eDate.val();
			if(isDefined(eDate) == false && isDefined(bNick) == false){
				alert('조회 종료일을 입력해주세요.');
				$eDate.focus();
				return false;
			}
			//location.href  = '/my_seller_logs/logs_list/sales_history/?sd='+encodeURI(sDate)+'&ed='+encodeURI(eDate)+'&nick='+encodeURI(bNick);
			return true;

		});
	}


};

//log pagination
PAGE_MY_SELLER.logs.setPagination = function(){
	console.log('PAGE_MY_SELLER.setPagination');
	var $paginationEle = $('#my-slller-logs-contents-pagination');
	if($paginationEle.length < 1){
		return;
	}

	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);

		var loadedPage = 0;
		if(isDefined(eleData.load)){
			loadedPage = eleData.load;
		}

		var get_total_count = parseInt(eleData.total_count);
		var get_total_page = parseInt(eleData.total_page);
		var curPage = parseInt(eleData.page);
		if($.isNumeric( eleData.page ) != true){
			curPage = 1;
		}


		//pagination
		if(isDefined(PAGE_MY_SELLER.DATA.pagination) == true && isChangePage == false){
			if(parseInt(curPage) == 1){
				console.log('drawPage',get_total_count);
				console.log('get_total_page', get_total_page);
				$paginationEle.pagination('updateItems', get_total_page);
				$paginationEle.pagination('selectPage', curPage);
			}else{
				$paginationEle.pagination('selectPage', curPage);
			}
		}else{
			PAGE_MY_SELLER.DATA.paginationEle = $paginationEle;
			PAGE_MY_SELLER.DATA.pagination = $paginationEle.pagination({
				/*
				items: totalPages,
				itemsOnPage: 20,
				*/
				//selectOnClick	: false,
				currentPage	: curPage,
				pages 		: get_total_page,
				displayedPages: 5,
				cssStyle: 'page-link',
				edges	: 0,
				prevText: '&lt;',
				nextText: '&gt;',
				hrefTextPrefix: '#!action=my_seller_logs&page=',
				//hrefTextPrefix	: PAGE_MY_SELLER.DATA.LAST_HASH_NO_PAGE+'&page=',
				//hrefTextPrefix	: '',
				hrefTextSuffix	: '',
				onPageClick		: function(page, event){
					console.log('page', page);
					console.log('onPageClick', event);
					//utility.ui.goToElement('.l_content_wrap');
					//PAGE_MY_SELLER.goCategoryPage(page);
					//PAGE_MY_SELLER.logs.getSellerLogPageData(page, $paginationEle);
				}
			});
		}
		//PAGE_MY_SELLER.DATA.LOADED_PAGE = parseInt(curPage);
		//console.log(PAGE_MY_SELLER.DATA.pagination.pagination);
		if(isDefined(location.hash)){
			$.bbq.removeState();
		}



	}else{
		console.log('has no pagination ele');
		return;
	}


	//$infoEle.data(saveData);
	//$infoEle.data(saveData);
	//$infoEle.pagination('selectPage', curPage);
};


//get getSellerPageContentsData
PAGE_MY_SELLER.logs.getSellerLogPageData = function(page, $paginationEle){
	console.log('PAGE_MY_SELLER.logs.getSellerLogPageData', page);

	if(isDefined(page) == false){
		page = 1;
	}
	if(isDefined($paginationEle) == false){
		$paginationEle = $('#my-slller-logs-contents-pagination');
	}
	var eleData =  $paginationEle.data();
	var sendData =
	{
		id : eleData.id,
		group	: eleData.group,
		page	: page,
		sd		: eleData.sd,
		ed		: eleData.ed,
		nick	: eleData.nick,
	}
	console.log('sendData', sendData);

	/*
	var saveDAta = {
		sd	: encodeURI(sDate),
		ed	: encodeURI(eDate),
		nick	:encodeURI(bNick)
	};
	*/

	//var $contentsEle = $('#slller-manager-contents-section');
	var $infoEle = $paginationEle;
	//return;

	//var $infoEle = $('#mypage-contents-session');
	var successFunGetLogData = function(data){
		console.log('successFunGetLogData', data);
		if(isDefined(data.log_data)){
			if(isDefined(data.log_data.rt_html)){
				$('#my_seller_logs-sales_history-ul').html(data.log_data.rt_html);
			}

			//페이지 상단으로 이동- paging
			utility.ui.goToElement('.seller_nav_wrap.home');

		}

		return;

	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.WEB.GET_SELLER_SALE_HISTORY,
		data		: formData,
		success_fun	: successFunGetLogData,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



//마이페이지 > 구독채널
PAGE_MY_SELLER.guide = {};
PAGE_MY_SELLER.guide.start = function(){

};
PAGE_MY_SELLER.guide.callbackFun = function(data, saveData){
	console.log('PAGE_MY_SELLER.guide.callbackFun', saveData);
	console.log(data);

	if(isDefined(saveData.id)){
		if(saveData.id == 'channel_create'){
			//WEB_COMMON_SELLER.joinformBinding();
		}
	}
};


//판매자 페이지 > home
PAGE_MY_SELLER.home = {};
PAGE_MY_SELLER.home.start = function(){

};
PAGE_MY_SELLER.home.callbackFun = function(data, saveData){
	console.log('PAGE_MY_SELLER.home.callbackFun', saveData);
	console.log(data);

};


PAGE_MY_SELLER.mecross = {};

PAGE_MY_SELLER.mecross.go = function(flag,id){

    if(flag == "fp"){
        window.open('https://point.onplay.co.kr/point_cash/go_mecross_connect?id='+id);
		return false;
    }else if (flag == "ff"){
        alert('50,000p 이상이 되어야 출금 신청이 가능합니다.');
		return false;
    }else if (flag == "fomi"){
		alert('출금 대상이 아닙니다.');
	}
}

//판매자 페이지 > premium
PAGE_MY_SELLER.rankup = {};

//상위 등록 - 모달
PAGE_MY_SELLER.rankup.openSellerRankupRegistModalForm = function(thisEle){
	console.log('PAGE_MY_SELLER.premium.openSellerRankupRegistModalForm');

	//alert('현재 준비중인 매뉴입니다. 빠른 시간안에 선보이겠습니다.');
	//return;

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	var actionType = 'contents';
	if(isDefined(eleData.action)){
		actionType = eleData.action;
	}

	var adType = 'category';
	if(isDefined(eleData.type)){
		adType = eleData.type;
	}

	var targetEle = '';

	var checkContents = [];
    var checkErrContents = [];
	var isErrState = false;
	
	$("input[name=seller_contents_check]:checked").each(function() {
		var checkedContetnsVal = $(this).val();
		if(isDefined(checkedContetnsVal)){
			var $targetEle = $("#seller-contents-action-list-"+checkedContetnsVal);
			if($targetEle.length > 0){
				if($targetEle.data('state') != 1){
					isErrState = true;
                    checkErrContents.push(checkedContetnsVal);
				}else{
					checkContents.push(checkedContetnsVal);
				}
			}

		}
	});
	
	console.log('isErrState', isErrState);
	console.log('checkErrContents', checkErrContents);
	console.log('checkContents', checkContents);
    if(checkErrContents.length == checkContents.length ){
    	if(isErrState == true){
    		//alert('선택된 콘텐츠에 정상적이지 않는 콘텐츠가 포함되어 있습니다.');
    		//return;

            alert("선택된 콘텐츠 중에 콘텐츠번호 "+checkErrContents.join(',')+"는(은) 비정상 콘텐츠가 포함되어 있어 상위등록을 할수 없습니다.");      //2019-10-10 인서트
    	}

    	if(checkContents.length < 1){
    		alert('선택된 콘텐츠가 없습니다.');
    		return;
    	}
    }
    //alert("선택된 콘텐츠 중에 콘텐츠번호 "+checkErrContents.join(',')+"는(은) 비정상 콘텐츠가 포함되어 있어 상위등록을 할수 없습니다.");
    //return;
    

	var $targetModal = $('#disk-pc-common-modal-mid');
	$targetModal.empty();

	var successFunGetModalHtml = function(data){
		console.log('successFunGetModalHtml');
		console.log(data);
		if(isDefined(data.modal_html)){
			var modalHtml = data.modal_html;
			var isModalCloseExisting = false;
			if(isDefined(modalHtml)){
				$targetModal.html(modalHtml).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-modal-blocker",
					clickClose		: false,
					escapeClose		: false
				});
			}
		}


	};
	var formData = {
		is_mobile	: 0,
		contents_idxs	: checkContents,
		ad_type			: adType,
		action_type		: actionType,
		target			: targetEle,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.CONTENTS.MODAL_PREMIUM,
		data		: formData,
		success_fun	: successFunGetModalHtml,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//판매자 페이지 > premium
PAGE_MY_SELLER.premium = {};

//프리미엄 등록 - 모달
PAGE_MY_SELLER.premium.openSellerPremiumRegistModalForm = function(thisEle){
	console.log('PAGE_MY_SELLER.premium.openSellerPremiumRegistModalForm');

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	var actionType = 'contents';
	if(isDefined(eleData.action)){
		actionType = eleData.action;
	}

	var adType = 'category';
	if(isDefined(eleData.type)){
		adType = eleData.type;
	}

	var targetEle = '';

	var checkContents = [];
    var checkErrContents = [];
	var isErrState = false;
	if(actionType == 'contents'){
		$("input[name=seller_contents_check]:checked").each(function() {
			var checkedContetnsVal = $(this).val();
			if(isDefined(checkedContetnsVal)){
				var $targetEle = $("#seller-contents-action-list-"+checkedContetnsVal);
				if($targetEle.length > 0){
					if($targetEle.data('state') != 1){
						isErrState = true;
                        checkErrContents.push(checkedContetnsVal);
					}else{
						checkContents.push(checkedContetnsVal);
					}
				}

			}
		});
	}else if(actionType == 'log'){
		if(isDefined(eleData.idx)){
			if(eleData.state != 1){
				isErrState = true;
                checkErrContents.push(eleData.idx);
			}else{
				checkContents.push(eleData.idx);
			}
		}

		if(isDefined(eleData.target)){
			targetEle = eleData.target;
		}
	}

	console.log('checkContents', checkContents);
    if(checkErrContents.length == checkContents.length ){
    	if(isErrState == true){
    		//alert('선택된 콘텐츠에 정상적이지 않는 콘텐츠가 포함되어 있습니다.');
    		//return;

            alert("선택된 콘텐츠 중에 콘텐츠번호 "+checkErrContents.join(',')+"는(은) 정상적이지 않아 프리미엄을 등록하실 수 없습니다.");      //2019-10-10 인서트
    	}

    	if(checkContents.length < 1){
    		alert('선택된 콘텐츠가 없습니다.');
    		return;
    	}
    }else{
        alert("선택된 콘텐츠 중에 콘텐츠번호 "+checkErrContents.join(',')+"는(은) 정상적이지 않아 프리미엄을 등록하실 수 없습니다.");
        return;
    }

	var $targetModal = $('#disk-pc-common-modal-mid');
	$targetModal.empty();

	var successFunGetModalHtml = function(data){
		console.log('successFunGetModalHtml');
		console.log(data);
		if(isDefined(data.modal_html)){
			var modalHtml = data.modal_html;
			var isModalCloseExisting = false;
			if(isDefined(modalHtml)){
				$targetModal.html(modalHtml).modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-modal-blocker",
					clickClose		: false,
					escapeClose		: false
				});
			}
		}


	};
	var formData = {
		is_mobile	: 0,
		contents_idxs	: checkContents,
		ad_type			: adType,
		action_type		: actionType,
		target			: targetEle,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.CONTENTS.MODAL_PREMIUM,
		data		: formData,
		success_fun	: successFunGetModalHtml,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//콘텐츠 프리미엄 등록 - 정보 업데이트
PAGE_MY_SELLER.premium.setChangePremiumInfo = function(){
	console.log('PAGE_MY_SELLER.premium.setChangePremiumInfo');
	var $targetFormEle = $('#sellerPremiumContentsRegistForm');
	if($targetFormEle.length < 1){
		console.log('$targetFormEle empty');
		return;
	}
	var adType = $targetFormEle.find('input[name=ad_type]').val();
	console.log('adType', adType);
	
	if(adType =='rankup'){
		var changeDays = $targetFormEle.find('input[name=seller_premium_days]').val();
	}else{
		var changeDays = $targetFormEle.find('select[name=seller_premium_days]').val();
		if(isDefined(changeDays) == false || $.isNumeric(changeDays) != true || changeDays < 1){
			console.log('changeDays err');
			return;
		}	
	}
	

	var contentsCount = $targetFormEle.find('input[name=seller_premium_count]').val();
	if(isDefined(contentsCount) == false || $.isNumeric(contentsCount) != true || contentsCount < 1){
		console.log('contentsCount err');
		return;
	}
	if(contentsCount > 0){
		$('.seller-premium-contents-num-txt').text(contentsCount);
	}else{
		alert('선택된 콘텐츠가 없습니다.');
		$.modal.close();
		return;
	}

	var newTotalItemCash = 0 ;
	if($targetFormEle.find('.seller-premium-target-contents').length > 0){
		$targetFormEle.find('.seller-premium-target-contents').each(function() {
			var selectContentsEleData = $(this).data();
			console.log('selectContentsEleData', selectContentsEleData);
			var costUnitPrice = 0;
			if(isDefined(selectContentsEleData.cost) == true){
				if($.isNumeric(selectContentsEleData.cost)){
					//parseInt(changeDays) * parseInt(contentsCount) * parseInt(costUnitPrice);
					costUnitPrice = parseInt(selectContentsEleData.cost);
				}
			}
			if($.isNumeric(costUnitPrice) && costUnitPrice > 0){
				newTotalItemCash += (parseInt(changeDays) * costUnitPrice);
			}

		});

	}else{
		alert('선택된 콘텐츠가 없습니다.');
		$.modal.close();
		return;
	}
	console.log('changeDays', changeDays);
	console.log('newTotalItemCash', newTotalItemCash);


	if($.isNumeric(newTotalItemCash) == true && newTotalItemCash > 0 && newTotalItemCash > 0){
		$targetFormEle.find('input[name=seller_item_total_cost]').val(newTotalItemCash);
		$('.total-cost-price').html(newTotalItemCash);
	}

	return;


};

//콘텐츠 프리미엄 등록 - 게시 기간 변경
PAGE_MY_SELLER.premium.changeSelectPremiumDays = function(thisEle){
	console.log('PAGE_MY_SELLER.premium.changeSelectPremiumDays');

	var changeDays = $(thisEle).val();
	if(isDefined(changeDays) == false || $.isNumeric(changeDays) != true || changeDays < 1){
		console.log('changeDays err');
		return;
	}
	if(changeDays > 0){
		PAGE_MY_SELLER.premium.setChangePremiumInfo();
	}
	return;

};

//콘텐츠 프리미엄 등록 - 선택한 게시물 삭제
PAGE_MY_SELLER.premium.deleteContentsList = function(thisEle){
	console.log('PAGE_MY_SELLER.premium.changeSelectPremiumDays');


	var $targetFormEle = $('#sellerPremiumContentsRegistForm');
	if($targetFormEle.length < 1){
		console.log('$targetFormEle empty');
		return;
	}
	if($(thisEle).parents('.seller-premium-target-contents').length > 0){
		$(thisEle).parents('.seller-premium-target-contents').remove();
		var contentsCount = $('.seller-premium-target-contents').length;
		console.log('contentsCount', contentsCount);
		if(contentsCount > 0){
			$targetFormEle.find('input[name=seller_premium_count]').val(parseInt(contentsCount));
			PAGE_MY_SELLER.premium.setChangePremiumInfo();
		}else{
			alert('선택된 콘텐츠가 없습니다.');
			$.modal.close();
			return;
		}
	}
	return;
};

//콘텐츠 프리미엄 등록 - form action
PAGE_MY_SELLER.premium.onclickActionPremiumRegist = function(thisEle){
	console.log('PAGE_MY_SELLER.premium.onclickActionPremiumRegist');
	if(isDefined(thisEle) == false){
		return;
	}
	var targetFormName = $(thisEle).data('target');
	if(isDefined(targetFormName) == false){
		console.log('targetFormName err');
		return;
	}
	var $targetForm = $('#'+targetFormName);
	if($targetForm.length < 1){
		console.log('target form ele err');
	}

	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return;
	}
	formData.seller_premium_bbs_idxs = [];

	var checkContentsList = [];
	$targetForm.find("input[name=seller_premium_bbs]").each(function() {
		var bbsIdx = $(this).val();
		if(isDefined(bbsIdx) == true && $.isNumeric(bbsIdx)){
			checkContentsList.push(bbsIdx);
		}
	});

	console.log('checkContentsList', checkContentsList);
	if(checkContentsList.length < 1){
		var show_msg = "선택된 게시물이 없습니다.";
		alert(show_msg);
		//$.ambiance({message: show_msg, type: "alert-danger"});
		return;
	}

	if(isDefined(formData.seller_premium_days)== false || isDefined(formData.seller_premium_count)== false){
		var show_msg = "전달 정보가 올바르지 않습니다.";
		alert(show_msg);
		//$.ambiance({message: show_msg, type: "alert-danger"});
		return;
	}

	if(isDefined(formData.seller_item_cash)== false){
		var show_msg = "전달 정보가 올바르지 않습니다.";
		alert(show_msg);
		//$.ambiance({message: show_msg, type: "alert-danger"});
		return;
	}

	if(parseInt(formData.seller_item_cash) < parseInt(formData.seller_item_total_cost)){
		var show_msg = "보유하신 채널 아이템이 부족합니다.";
		alert(show_msg);
		//$.ambiance({message: show_msg, type: "alert-danger"});
		return;
	}

	formData.seller_premium_bbs_idxs = checkContentsList;
	console.log('formData', formData);

	var successFunPremiumRegistContents = function(data){
		console.log('successFunPremiumRegistContents');
		console.log(data);

		if(isDefined(data.seller)){
			WEB_COMMON_SELLER.setSellerInfo(data.seller);
		}
		if(isDefined(data.is_ok)){
			if(data.is_ok != 1){
				if(isDefined(data.show_msg)){
					alert(data.show_msg);
					return;
				}
			}
		}



		//기간 연장
		if(data.action_type == 'log'){
			if(isDefined(data.completed_bbs_list) == true){
				$('.my-seller-premium-list').removeClass('active');
				for(var i in data.completed_bbs_list){
					var showData = data.completed_bbs_list[i];
					var targetEle = '#my-seller-premium-list-'+showData.show_premium_type+'-'+showData.show_idx;
					if($(targetEle).length > 0){
						var updateListHtml = TEMPLETE.WEB_PAGE.getSellerMyPremiumListHtml(showData);
						$(targetEle).html(updateListHtml).addClass('active');
					}
				}
			}
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		$.modal.close();
	};

	COMMON_ACTION.SELLER.actionSellerPremiumRegist(formData, successFunPremiumRegistContents);

	return;
};

//판매자 아이템 구매
PAGE_MY_SELLER.buyItemModal = {};

//아이템 구매 완료
PAGE_MY_SELLER.buyItemModal.successFunBuyItem = function(data){
	console.log('PAGE_MY_SELLER.buyItemModal.successBuyItem');
	console.log(data);	
	
	//회원정보 저장
	if(isDefined(data.member)){
		var saveMemberData = JSON.stringify(data.member);
		utility.disk.setStorageData('member_data', saveMemberData);
		DISK_MEMBER_FUN.setMemberInfo(data.member, false);
	}
	
	if(isDefined(data.seller)){
		$('.my-seller-cash').text(disk_number_format(data.seller.seller_cash));
		$('.my-seller-item-cash').text(disk_number_format(data.seller.seller_item_cash));
		$('#sellerPremiumContentsRegistForm').find("input[name=seller_item_cash]").val(data.seller.seller_item_cash);
		
	}
	if(isDefined(data.show_msg)){
		//alert(data.show_msg);
		$.ambiance({message: data.show_msg, type: "alert-info"});
	}
	$.modal.close();
	
};


PAGE_MY_SELLER.buyItemModal.intBinding = function(){
	console.log('PAGE_MY_SELLER.buyItemModal.intBinding');
	var $targetForm = $('#sellerModalItemBuyForm');
	if($targetForm.length < 1){
		return;
	}
	console.log('has form');
	
	var payMethod = null;
	var payCount = 0;
	var payPrice = 0;
	var payMethodName = '';
	//pay-method-name
	
	var setBuyText = function(setMethodName, setPrice, setTotalPrice){
		if(isDefined(setMethodName) == true && isDefined(setPrice) == true && isDefined(setTotalPrice)){
			
			$targetForm.find('.pay-method-name').text(setMethodName);
			$targetForm.find('#seller-buy-item-price').text(setPrice);
			$targetForm.find('#seller-buy-item-total-sum').text(setTotalPrice);
			$targetForm.find("input[name=total_price_cash]").val(setTotalPrice);
			$targetForm.find("input[name=item_price]").val(setPrice);
			
		}
	}
	
	$targetForm.find("input[name=pay_method]").change(function() {
		console.log('pay_method click');
		var eleData = $(this).data();
		payMethod = $(this).val();
		payPrice = parseInt(eleData.val);
		if(payMethod == 'cash'){
			payMethodName = 'C';
		}else{
			payMethodName = 'CP';
		}
		
		console.log('eleData', eleData);
		console.log('payMethod', payMethod);
		console.log('payPrice', payPrice);
		
		payCount = $targetForm.find("select[name=item_count]").val();

		var totalPrice = 0;
		if(isDefined(payMethod) == true && isDefined(payPrice) == true){
			totalPrice = payPrice * parseInt(payCount);
		}
		
		console.log('totalPrice', totalPrice);
		
		setBuyText(payMethodName, payPrice, totalPrice);
		
		
		
	})
	
	$targetForm.find("select[name=item_count]").change(function() {
		console.log('item_count click');
		var payCount = $(this).val();
		console.log('thisVal', payCount);
		
		payMethod = $targetForm.find("input[name=pay_method]").val();
		
		var totalPrice = 0;
		if(isDefined(payMethod) == true){
			totalPrice = payPrice * parseInt(payCount);
		}
		console.log('totalPrice', totalPrice);
		
		if(payMethod == 'cash'){
			payMethodName = 'C';
		}else{
			payMethodName = 'CP';
		}
		setBuyText(payMethodName, payPrice, totalPrice);
		
	})
	
	
	
	
	console.log('PAGE_LOGIN.LOGIN.modalFormBinding');
	$targetForm.unbind('submit');
	$targetForm.submit(function(event){
		event.preventDefault(); 
		if($(this).hasClass('was-validated')){
			console.log('was-validated');
			//return false;
		} 
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);
		
		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);
		
		if(isDefined(formData)== false){
			return false;
		}
		
		if(isDefined(formData.pay_method) == false){
			alert('지불 방법을 선택해주세요.');
			return false;
		}
		
		if(isDefined(formData.seller_cash)== false || isDefined(formData.member_cash)== false || isDefined(formData.total_price_cash)== false || isDefined(formData.item_price)== false || isDefined(formData.item_count)== false){
			return false;
		}
		
		
		var sellerHasPoint = formData.seller_cash;
		var costPoint = formData.total_price_cash;
		costPoint = parseInt(formData.item_price) * parseInt(formData.item_count)
		if(formData.pay_method == 'cash'){
			sellerHasPoint = parseInt(formData.member_cash);
			
		}else if(formData.pay_method == 'point'){
			
		}else{
			alert('지불 방법을 선택해주세요.');
			return false;
		}
		
		if(costPoint > sellerHasPoint){
			alert('캐시가 부족합니다. 충전후 구매해 주세요.');
			return false;
		}
		
        
		var ajaxData = 
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.MY_SELLER.BUY_SELLER_CHANNEL_ITEM,
			data		: formData,
			success_fun	: PAGE_MY_SELLER.buyItemModal.successFunBuyItem,
			error_fun	: null,
			isSpinner	: true,
			
		};
		DISK_PROTOCOL.AJAX(ajaxData);
		
		return false;
		
	});

	
};


	/*
	if(isDefined(pageSub)){
		var pageMenu = '';
		if(isDefined(pagData)){
			if(isDefined(pagData.selected_group)){
				pageSub = pagData.selected_group;
			}
			if(isDefined(pagData.selected_menu)){
				pageMenu = pagData.selected_menu;
			}
		}
		if(isDefined(pageSub) == false){
			pageSub = '';
		}

		PAGE_MY_SELLER.DATA.PAGE_SUB = pageSub;
		PAGE_MY_SELLER.DATA.PAGE_MEMU = pageMenu;
		var defaultHash = '#!action=seller&group='+pageSub+'&id='+pageMenu+'&page=1';
		PAGE_MY_SELLER.DATA.LAST_HASH =  defaultHash;
		console.log('defaultHash', defaultHash);
	}
	*/
	/*
	var pageMenu = '';
	if(isDefined(pagData)){
		if(isDefined(pagData.selected_group)){
			pageSub = pagData.selected_group;
		}
		if(isDefined(pagData.selected_menu)){
			pageMenu = pagData.selected_menu;
		}
	}
	if(isDefined(pageSub) == false){
		pageSub = '';
	}
	*/

/*



//get getSellerPageContentsData
PAGE_MY_SELLER.getSellerPageContentsData = function(getData, callbackFun){
	console.log('PAGE_MY_SELLER.getSellerPageContentsData', getData);

	var pageGroup = 'contents';
	if(isDefined(getData.group)){
		pageGroup = getData.group;
	}
	var sendData = getData;

	console.log('sendData', sendData);

	var $contentsEle = $('#slller-manager-contents-section');
	var $infoEle = $('#slller-manager-contents-pagination');


	//var $infoEle = $('#mypage-contents-session');
	var successFunGetMovieContentsList = function(data){
		console.log('successFunGetMovieContentsList', data);

		if(isDefined(data.sller_page_html)){
			$contentsEle.html(data.sller_page_html);
		}else{
			$contentsEle.empty();
		}

		PAGE_MY_SELLER.DATA.PAGE_SUB = getData.group;
		PAGE_MY_SELLER.DATA.PAGE_MEMU = getData.id;

		//data-group="" data-id="" data-load="0" data-page="1" data-total_count="0" data-total_page="0" data-limit="0"
		var saveData =
		{
			group 	: getData.group,
			id		: getData.id,
			page	: getData.page,
			is_page	: 0,
		};
		var curPage = parseInt(getData.page);
		var isPageShow = false;
		if(isDefined(data.seller_menu)){
			if(isDefined(data.seller_menu.is_page)){
				if(data.seller_menu.is_page == '1' || data.seller_menu.is_page == 1){
					isPageShow = true;
				}
				saveData.is_page = data.seller_menu.is_page;
			}
			//save cash
			if(isDefined(data.seller_menu.group)){
				PAGE_MY_SELLER.DATA.PAGE_SUB = data.seller_menu.group;
				saveData.group = 	data.seller_menu.group;
			}
			if(isDefined(data.seller_menu.id)){
				PAGE_MY_SELLER.DATA.PAGE_MEMU = data.seller_menu.id;
				saveData.id = 	data.seller_menu.id;
			}

			if(isDefined(data.seller_menu.id)){
				PAGE_MY_SELLER.DATA.PAGE_MEMU = data.seller_menu.id;
				saveData.id = 	data.seller_menu.id;
			}

			PAGE_MY_SELLER.DATA.LAST_HASH =  '#!action=seller&group='+saveData.group+'&id='+saveData.id+'&page=1';
			PAGE_MY_SELLER.DATA.LAST_HASH_NO_PAGE =  '#!action=seller&group='+saveData.group+'&id='+saveData.id;
			PAGE_MY_SELLER.DATA.IS_LOADED_PAGE_ID = saveData.id;
		}



		if(isDefined(data.seller_page_info)){
			if(isDefined(data.seller_page_info.page)){
				curPage = parseInt(data.seller_page_info.page);
				saveData.page = curPage;
			}

			if(isPageShow == true){
				if(isDefined(data.seller_page_info.total_count)){
					if(parseInt(data.seller_page_info.total_count) > 0){
						saveData.total_count	= parseInt(data.seller_page_info.total_count);
					}

				}
				if(isDefined(data.seller_page_info.total_page)){
					if(parseInt(data.seller_page_info.total_page) > 0){
						saveData.total_page	= parseInt(data.seller_page_info.total_page);
					}
				}
			}
		}

		//set hash
		//var defaultHash = '#!action=seller&group='+pageSub+'&id='+pageMenu;



		//set top menu
		PAGE_MY_SELLER.setTopMenu(saveData);

		if(parseInt(curPage) == 1){
			//페이지 상단으로 이동
			utility.ui.goToElement('.content.sub');
			//alert('a');
		}else{
			//페이지 상단으로 이동- paging
			utility.ui.goToElement('.content.sub');
		}

		//pagination
		isChangePage = false;
		if(isPageShow == true){
			if(isDefined(PAGE_MY_SELLER.DATA.pagination) == true && isDefined(PAGE_MY_SELLER.DATA.paginationEle) == true){
				//PAGE_MY_SELLER.DATA.paginationEle.pagination('destroy');
				var pagingEleData = $infoEle.data();
				if(pagingEleData.group != saveData.group || pagingEleData.id != saveData.id){
					console.log('destroy');
					PAGE_MY_SELLER.DATA.paginationEle.pagination('destroy');
					PAGE_MY_SELLER.DATA.paginationEle = null;
					PAGE_MY_SELLER.DATA.pagination = null;
					isChangePage = true;
				}
				//$paginationEle.data(saveData);
			}
			$infoEle.data(saveData);
			PAGE_MY_SELLER.setPagination(saveData, isChangePage);
		}else{
			if(isDefined(PAGE_MY_SELLER.DATA.pagination) == true && isDefined(PAGE_MY_SELLER.DATA.paginationEle) == true){
				PAGE_MY_SELLER.DATA.paginationEle.pagination('destroy');
			}
		}

		//save loaded page
		PAGE_MY_SELLER.DATA.IS_LOADED_PAGE = true;

		//save cache
		PAGE_MY_SELLER.DATA.LAST_HASH = location.hash;

		//img lazy 스크롤 때문에 lazy가 의미 없음
		WEB_COMMON.setImageLazy();

		//페이지 바이딩
		PAGE_MY_SELLER.afterPageLoadBinding();

		if (typeof callbackFun=== "function"){
			callbackFun(data, saveData);
			return;
		}
	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.SELLER.GET_PAGE_DATA[pageGroup],
		data		: formData,
		success_fun	: successFunGetMovieContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



PAGE_MY_SELLER.setTopMenu = function(getData){
	console.log('PAGE_MY_SELLER.setTopMenu', getData)

	var pageGroup = 'contents';
	if(isDefined(getData.group)){
		pageGroup = getData.group;
	}
	var pageMenu = 'SA0';
	if(isDefined(getData.id)){
		pageMenu = getData.id;
	}

	console.log('pageMenu', pageMenu);

	$('.seller-main-menu-item.active').removeClass('active');
	$('.seller-main-menu-item.'+pageGroup).addClass('active');

	$('.seller-sub-menu-item.active').removeClass('active');
	$('.seller-sub-menu-item.'+pageMenu).addClass('active');

	//sub title
	var sellerSubTitle = $('.seller-sub-menu-item.active').find('.menu-title').text();
	if(isDefined(sellerSubTitle)){
		$('.seller-top-sub-menu-title').text(sellerSubTitle);
	}

	//순서변경
	//$(".seller-main-menu-item."+pageGroup).insertAfter(".seller-info-wrap");

	//top notice
	$('.l_contents_top_wrap.seller.active').removeClass('active');
	$('.l_contents_top_wrap.seller.'+pageGroup+'.'+pageMenu).addClass('active');


};


	//오른쪽 서브 메뉴 클릭
	if($('.seller-sub-menu-item').length > 0){
		$( ".seller-sub-menu-item" ).unbind( "click");
		$( ".seller-sub-menu-item" ).bind( "click", function() {
			console.log('.seller-sub-menu-item');
			//$(this).toggleClass('active');

			var eleData = $(this).data();
			console.log('eleData', eleData);
			var mainMenu = 'contents';
			if(isDefined(eleData.main)){
				mainMenu = eleData.main;//
			}
			var subMenu = 'SA0';
			if(isDefined(eleData.sub)){
				subMenu = eleData.sub;
			}

			$('.seller-sub-menu-item').removeClass('active');
			$(this).addClass('active');


			//sub tilte
			var subTitle = $(this).find('.menu-title').text();
			if(isDefined(subTitle)){
				$('.seller-top-sub-menu-title').text(subTitle);
			}

			//검색 초기화
			$('#channel_owner_seller-search_keyword').val('');
			$('#sellerChannelInfoForm_fc').val('');
			$('#seller-owner-search-category-count-list').hide();

			var sellerUrl = '';
			if(isDefined(eleData.url)){
				sellerUrl = eleData.url;
			}
			var goChangeHash = '#!action=seller&group='+mainMenu+'&id='+subMenu+'&page=1';

			if(isDefined(sellerUrl)){
				goChangeHash = sellerUrl+goChangeHash;
				console.log('goChangeHash', goChangeHash);
				location.href = goChangeHash;
			}else{
				location.hash = goChangeHash;
			}


		});
	}

	//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_MY_SELLER.setHashCheck = function(isStart){
	console.log('PAGE_MY_SELLER.setLoadHashCheck');
	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	console.log('sub', PAGE_MY_SELLER.DATA.PAGE_SUB);

};
	//카테고리 토탈 카운터
	console.log($('.seller-sub-menu-item-total').data());
	var categorTotalCnt = $('.seller-sub-menu-item-total').data('total');
	console.log('categorTotalCnt', categorTotalCnt);
	if($.isNumeric(categorTotalCnt)){
		$('.category-total-num').text('('+disk_number_format(categorTotalCnt)+')');
	}

	PAGE_MY_SELLER.rightBinding();

	//판매자 자료 검색 FORM

	$("#channelSellerContentsOwnerSearchForm").unbind('submit');
	$("#channelSellerContentsOwnerSearchForm").submit(function(event){
		console.log('channelSellerContentsOwnerSearchForm submit');
		//event.preventDefault();
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);

		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);

		if(isDefined(formData)== false){
			console.log('err formData', formData);
			return false;
		}
		if(isDefined(formData.ck)== false || isDefined(formData.seller)== false){
			//event.preventDefault();
			console.log('search_keyword', formData.ck);
			console.log('search_seller_idx', formData.seller);
			return false;
		}
		var search_force_category = '';
		if(isDefined(formData.fc)== true){
			search_force_category = formData.fc;
		}

		if(formData.ck.length < 2){
			//event.preventDefault();
			alert('검색어는 2자 이상 입력해주세요.');
			$('#channel_seller-search_keyword').focus().select();
			return false;
		}
		//$(this).submit();
		return true;
	});




*/
	/*
	if($targetFormEle.find('.seller-premium-target-contents').length > 0){
		var contentsTotalCount = $('.seller-premium-target-contents').length;
		console.log('contentsTotalCount', contentsTotalCount);
		if(contentsTotalCount > 0){
			$targetFormEle.find('input[name=seller_premium_count]').val(parseInt(contentsCount));
			PAGE_MY_SELLER.premium.setChangePremiumInfo();
		}else{
			alert('선택된 콘텐츠가 없습니다.');
			$.modal.close();
			return;
		}
	}


	var costUnitPrice = $targetFormEle.find('input[name=seller_premium_unit_price]').val();
	if(isDefined(costUnitPrice) == false || $.isNumeric(costUnitPrice) != true || costUnitPrice < 1){
		console.log('costUnitPrice err');
		return;
	}

	var totalItemCash = $targetFormEle.find('input[name=seller_item_total_cost]').val();

	console.log('changeDays', changeDays);
	console.log('contentsCount', contentsCount);
	console.log('costUnitPrice', costUnitPrice);
	console.log('totalItemCash', totalItemCash);
	if(changeDays > 0){
		var newTotalItemCash =	parseInt(changeDays) * parseInt(contentsCount) * parseInt(costUnitPrice);
		console.log('newTotalItemCash', newTotalItemCash);
		if($.isNumeric(newTotalItemCash) == true && newTotalItemCash > 0 && newTotalItemCash > 0){
			$targetFormEle.find('input[name=seller_item_total_cost]').val(newTotalItemCash);
			$('.total-cost-price').html(newTotalItemCash);
		}

	}
	*/

	/*



PAGE_MY_SELLER.category.callbackFun = function(data, saveData){
	console.log('PAGE_MY_SELLER.category.callbackFun');
	//console.log(data);

	//default sort key
	if(isDefined(data.filter_data)){
		if(isDefined(data.filter_data.sort_key)){
			$('#sellerChannelInfoForm_sort').val(data.filter_data.sort_key);
		}
	}

	//검색 결과일 경우
	if(isDefined(data.search_info)){
		//카테고리 카운트
		if(data.search_info.is_search == 1 && isDefined(data.search_info.category_list)){
			var cateList = data.search_info.category_list;
			var searchCategoryHtml = [];
			var cc = 0;
			var cData;
			var selectCategoryCount = 0;
			for(var ci in cateList){
				cData = cateList[ci];
				if(cData.key == data.search_info.fc){
					selectCategoryCount = parseInt(cData.cnt);
				}
				searchCategoryHtml.push(TEMPLETE.WEB_PAGE.caegoryListSellerSearchResult(cData, data.search_info.fc));
			}

			if(searchCategoryHtml.length > 0){
				$('#seller-owner-search-category-count-list').html(searchCategoryHtml.join('')).show();
			}

			//pagination
			console.log('selectCategoryCount',selectCategoryCount);
			if(selectCategoryCount > data.seller_page_info.limit){

			}

		}
		if(isDefined(data.search_info.sk) == true){
			$('#channel_owner_seller-search_keyword').val(data.search_info.sk);
			//class="depth seller-top-sub-menu-title"
			var sellerSubTitle = '"'+data.search_info.sk+'"' + ' 검색 결과'
			$('.seller-top-sub-menu-title').text(sellerSubTitle);
		}
	}




	//검색 결과 카테고리 클릭
	if($( ".seller-owner-category-list-item" ).length > 0){
		$( ".seller-owner-category-list-item" ).unbind( "click");
		$( ".seller-owner-category-list-item" ).bind( "click", function() {
			var eleData = $(this).data();
			console.log('eleData', eleData);
			if(eleData.cnt < 1){
				console.log('cnt err', eleData.cnt);
				return;
			}
			var selectedCategory = 0;
			if(isDefined(eleData.cate1)){
				selectedCategory = eleData.cate1;
			}

			if($.isNumeric(selectedCategory) == false){
				selectedCategory = 0;
			}

			console.log('selectedCategory', selectedCategory);

			if(selectedCategory > 1){
				$( ".seller-owner-category-list-item.active" ).removeClass('active');
				$( ".seller-owner-category-list-item.cate1-"+selectedCategory ).addClass('active');


			}

			$('#sellerChannelInfoForm_fc').val(selectedCategory);



		});
	}

};

*/
