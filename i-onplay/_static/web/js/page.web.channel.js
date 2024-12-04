/*
* movie channel
*/

var PAGE_CHANNEL = {};
PAGE_CHANNEL.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	SBU				: null,
	INDEX_URL	: {
		'SELLER'	: '/channel/seller',
		'SEARCH'	: '/channel/search',
	}
};

PAGE_CHANNEL.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL.DATA.LAST_HASH = '#!action=channel&type=seller&mod=category&cate=0&page=1';
	
	
	PAGE_CHANNEL.setBindingPjax();
	
	PAGE_CHANNEL.kakaoBinding();
	PAGE_CHANNEL.initBinding();
	PAGE_CHANNEL.initOnload(pageSub);
	
	
	//상단 필터 바인딩
	//WEB_COMMON.setContentsListfilterBtnBinding(PAGE_CHANNEL.setSellerContentsPage);
	
	if(isDefined(pageSub)){
		PAGE_CHANNEL.DATA.SBU = pageSub;
		
		if(pageSub == 'seller'){
			PAGE_CHANNEL.DATA.LOADED_PAGE = 1;
			PAGE_CHANNEL.SELLER.start(pageSub, pagData);
			//PAGE_CHANNEL.setHashCheck('start');
		}else if(pageSub == 'search'){
			PAGE_CHANNEL.SEARCH.start(pageSub, pagData);
			PAGE_CHANNEL.DATA.LAST_HASH = '#!action=channel&type=search&mod=category&cate=0&page=1';
			//PAGE_CHANNEL.setHashCheck('search');
		}
		
	}
};

//pjax binding
PAGE_CHANNEL.setBindingPjax = function(){
	console.log('PAGE_CHANNEL.setBindingPjax');
		
	if ($.support.pjax) {
		$.pjax.defaults.scrollTo = false;
		console.log('support pajx');
		var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		console.log('url', url);
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			var containerSelector = '#seller-channel-contents-list-wrap';
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
		PAGE_CHANNEL.setImageLazy();
		utility.ui.goToElement('.content.sub');	

	});

	// for google analytics
	$(document).on('pjax:end', function() {
		ga('set', 'location', window.location.href); // 현재 바뀐 주소를
		ga('send', 'pageview'); // 보고한다
	});
};


//category image lazy
PAGE_CHANNEL.setImageLazy = function(){
	//image lazy
	if($('.disk-image-lazy-seller').length > 0){
		$('.disk-image-lazy-seller').lazy();
	}
};

//load kakao api
PAGE_CHANNEL.kakaoBinding = function(){
	
	var bindingKakaoFun = function(){
		console.log('bindingKakaoFun');	
		
		//kakao binding
		if($('#KAKAO_SHARD_BTN_ID').length > 0){
			PAGE_CONTENTS.initKakaoShareBtnBinding();
		}
		
	};
	
	
	if($('.kakao_developers_1').data('loaded') == 1){
		bindingKakaoFun();
	}else{
		
		var successLoadKakaoCallbackFun = function(){
			console.log('successLoadKakaoCallbackFun');
			bindingKakaoFun();
		}
		
		var kakaoJs = $('#kakao_developers_1').val();
		if(isDefined(kakaoJs)){
			loadJsAsync(kakaoJs, successLoadKakaoCallbackFun, 'kakao_developers_1');	
		}
		
	}
};


//수동으로 리스트  가져오기
PAGE_CHANNEL.goSearchContentsDatayPjax = function(pJaxUrl){
	console.log('goCategoryPjax', pJaxUrl);
	if(isDefined(pJaxUrl) == false){
		return;
	}
	var containerSelector = '#seller-channel-contents-list-wrap';
	if ($.support.pjax) {
		console.log('support');
		$.pjax({url: pJaxUrl, container:containerSelector});
	}
	return;

};




//상단 필터 바인딩
PAGE_CHANNEL.initBinding = function(){
	console.log('PAGE_CHANNEL.initBinding');
	
	//console.log(callbackFun);
	var $infoEle = $('#seller-channel-pagination');

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
				
				
			}
			if(eleData.type == 'limit'){
				//location.href = showLocation + '?page=1&l='+parseInt(eleData.values);
				$('#btn-category-list-limit').data('limit', eleData.values);
			}else if(eleData.type == 'sort'){
				//location.href = showLocation + '?page=1&sk='+eleData.values;
				 $('#btn-category-list-sort').data('sort', eleData.values);
			}
			PAGE_CHANNEL.goChannelSellerPage();
			return;
			var goUrl = PAGE_CHANNEL.goChannelSellerPage(eleData);
			console.log('goUrl', goUrl);
			if(isDefined(goUrl)){
				goCategoryPjax(goUrl);
			}
			return;
		});
	}
	

	//성인 제외
	if($( "#check-category-is-adult" ).length > 0){
		$( "#check-category-is-adult" ).unbind( "click");
		$( "#check-category-is-adult" ).bind( "click", function() {
			console.log('check-category-is-adult');
			if(utility.disk.checkIsChildBlockMember() == true){
				$(this).prop("checked", true);
				var show_msg = "자녀보호 서비스를 이용중입니다.";
				$.ambiance({message: show_msg, type: "alert-warning"});
				return;
			}
			PAGE_CHANNEL.goChannelSellerPage();
			return;
		});
	}
	
	//SNS Share
	if($( ".m_link.share" ).length > 0){
		$( ".m_link.share" ).unbind( "click");
		$( ".m_link.share" ).bind( "click", function() {
			console.log('.m_link.share');
			$(this).next().toggleClass('active');
		});
	}
	
	//카테고리 클릭
	if($( ".seller-channel-category-list-item" ).length > 0){
		$( ".seller-channel-category-list-item" ).unbind( "click");
		$( ".seller-channel-category-list-item" ).bind( "click", function() {
			$( ".seller-channel-category-list-item.active" ).removeClass('active');	
			$(this).addClass('active');
			$('#channel_seller-search_keyword').val('');
		});
	}
	
	//판매자 자료 검색 FORM
	$("#channelSellerContentsSearchForm").unbind('submit');
	$("#channelSellerContentsSearchForm").submit(function(event){
		console.log('channelSellerContentsSearchForm submit');
		//event.preventDefault(); 
		var formValues = $(this).serializeArray();
		console.log('formValues:', formValues);
		
		var formData = changeFormArrToObject(formValues);
		console.log('formData:',formData);
		
		if(isDefined(formData)== false){
			console.log('err formData', formData);
			return false;
		}
		if(isDefined(formData.k)== false || isDefined(formData.seller)== false){
			//event.preventDefault();
			console.log('search_keyword', formData.k);
			console.log('search_seller_idx', formData.seller);
			return false;
		}
		var search_force_category = '';
		if(isDefined(formData.fc)== true){
			search_force_category = formData.fc;
		}
		
		if(formData.k.length < 2){
			//event.preventDefault();
			alert('검색어는 2자 이상 입력해주세요.');
			$('#channel_seller-search_keyword').focus().select();
			return false;
		}
		
		//var hashUrl = '#!action=channel&type=seller&mod=search&k='+encodeURI(formData.k)+'&cate=0&page=1';
	 	//console.log('hashUrl', hashUrl);
		//location.hash = hashUrl;
		PAGE_CHANNEL.goChannelSellerPage();
		return false;
		
	});
};



//페이지 이동 분기 처리
PAGE_CHANNEL.goChannelSellerPage = function(goPage){
	
	console.log('PAGE_CATEGORY.goCategoryPage', goPage);
	console.log(' window.location.href',  window.location.href);
	console.log("pathname: "+location.pathname);
	var sendData = {
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,		//is mobile
		ck			: '',		//search keyword
		fc			: '',		//force category
		seller		: ''		//force category
	};
	
	var $infoEle = $('#seller-channel-pagination');
	
	var selectedCategory = 0;
	if($('.cate.seller-channel-category-list-item.active').length > 0){
		selectedCategory = $('.cate.seller-channel-category-list-item.active').data('cate1');
	}
	console.log('selectedCategory_~~~', selectedCategory);
	if(isDefined(selectedCategory) == true && selectedCategory != 0){
		sendData.m = parseInt(selectedCategory);
	}
	
	//sort
	var sortEleData = $('#btn-category-list-sort').data('sort');
	if(isDefined(sortEleData)){
		sendData.sk = sortEleData;
	}
	console.log('sortEleData', sortEleData);
	
	//var listLimit = sendData.l;
	var limitEleData = $('#btn-category-list-limit').data('limit');
	console.log('limitEleData',limitEleData);
	if(isDefined(limitEleData)){
		sendData.l = parseInt(limitEleData);
	}
	
	//ba
	if($('input:checkbox[id="check-category-is-adult"]').is(":checked") == true){
		sendData.ba = 1;
	}
		
	//search keyword - 키워드가 있으면 전체검색으로
	var searchKeyword = $('#channel_seller-search_keyword').val();
	if(isDefined(searchKeyword) == true && searchKeyword != '' && searchKeyword.length > 1){
		sendData.ck = searchKeyword;
		sendData.m = 0;
		$('.cate.seller-channel-category-list-item.active').removeClass('active');
	}
	
	
	//search_force_category
	var searchForceCategory = $('#channel_seller-search_force_category').val();
	if(isDefined(searchForceCategory) == true && searchForceCategory != ''){
		sendData.fc = searchForceCategory;
	}
	
	var showLocation = location.pathname;
	var sendSrt = $.param( sendData );
	console.log('sendSrt', sendSrt);
	var goUrl = showLocation+'?'+sendSrt;
	console.log('goUrl', goUrl);
	$infoEle.data(sendData);
	
	PAGE_CHANNEL.goSearchContentsDatayPjax(goUrl);
};




PAGE_CHANNEL.initOnload = function(pageSub){
	console.log('PAGE_CHANNEL.initOnload');

	var selectedCategory = 0;
	var contentsAction = 'category';
	if(pageSub == 'search'){
		contentsAction = 'search';
	}
	
	PAGE_CHANNEL.setImageLazy();
	//PAGE_CHANNEL.setPagination(selectedCategory, contentsAction);
};

PAGE_CHANNEL.setCategoryCountList = function(sCategory, contentsAction){
	
	//setCategoryCountList
	//상단 카테고리 속성 입력
	if(isDefined(contentsAction) == false){
		var contentsAction = 'category';
		if(PAGE_CHANNEL.DATA.SBU == 'search'){
			contentsAction = 'search';
		}
	}
	
	console.log('setCategoryCountList', sCategory);
	console.log('contentsAction', contentsAction);
	if(isDefined(sCategory) == true && parseInt(sCategory) > 10000){
		$( ".seller-channel-category-list-item.active" ).removeClass('active');	
		$( ".seller-channel-category-list-item.cate1-"+sCategory ).addClass('active');
	}
	
};




//판매자 채널  - 카테고리
PAGE_CHANNEL.SELLER = {};

PAGE_CHANNEL.SELLER.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	CATE1			: null,
	ACTION_TYPE		: null,
}

PAGE_CHANNEL.SELLER.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL.SELLER.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL.SELLER.DATA.LAST_HASH = '#!action=channel&type=seller&mod=category&cate=0&page=1';
	PAGE_CHANNEL.DATA.LAST_HASH = PAGE_CHANNEL.SELLER.DATA.LAST_HASH;
	
	
	/*
	PAGE_CHANNEL.SELLER.initBinding();
	PAGE_CHANNEL.SELLER.initOnload();
	PAGE_CHANNEL.SELLER.setHashCheck(null);
	
	//상단 필터 바인딩
	WEB_COMMON.setContentsListfilterBtnBinding(PAGE_CHANNEL.SELLER.setSellerContentsPage);
	if(pageSub == 'seller'){
		
	}
	*/
};


PAGE_CHANNEL.SELLER.initBinding = function(){
	console.log('PAGE_CHANNEL.SELLER.initBinding');
};

PAGE_CHANNEL.SELLER.initOnload = function(){
	console.log('PAGE_CHANNEL.SELLER.initOnload');
	
};

//공유하기 복사 클릭
PAGE_CHANNEL.SELLER.onclickShareUrlOnSnsOpenUrl = function(targetEleId){
	console.log('PAGE_CHANNEL.SELLER.onclickShareUrlOnSnsOpenUrl', targetEleId);
	var $targetEle = $('#'+targetEleId);
	if($targetEle.length < 1){
		return;
	}
	if($targetEle.hasClass('active')){
		console.log('has class');
		$targetEle.removeClass('active');
	}else{
		console.log('non class');
		$targetEle.addClass('active');
	}
};



//판매자 채널  - 검색
PAGE_CHANNEL.SEARCH = {};

PAGE_CHANNEL.SEARCH.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	CATE1			: null,
	ACTION_TYPE		: null,
}

PAGE_CHANNEL.SEARCH.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL.SEARCH.start', pageSub);
	console.log(pagData);
	
	PAGE_CHANNEL.SEARCH.DATA.LAST_HASH = '#!action=channel&type=seller&mod=search&cate=0&page=1';
	PAGE_CHANNEL.DATA.LAST_HASH = PAGE_CHANNEL.SEARCH.DATA.LAST_HASH;
	
	PAGE_CHANNEL.SEARCH.initBinding();
	PAGE_CHANNEL.SEARCH.initOnload();
	
	
	//상단 필터 바인딩
	//WEB_COMMON.setContentsListfilterBtnBinding(PAGE_CHANNEL.SELLER.setSellerContentsPage);
	if(pageSub == 'seller'){
		
	}
};



PAGE_CHANNEL.SEARCH.initBinding = function(){
	console.log('PAGE_CHANNEL.SELLER.initBinding');
};

PAGE_CHANNEL.SEARCH.initOnload = function(){
	console.log('PAGE_CHANNEL.SELLER.initOnload');
	
};


/*


PAGE_CHANNEL.setSellerContentsPage = function(nextPage, selectedCategory){
	console.log('PAGE_CHANNEL.setSellerContentsPage:',nextPage);
	console.log('selectedCategory', selectedCategory);	
	//console.log('loadedPage', loadedPage);

	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	var $infoEle = null;
	if(PAGE_CHANNEL.DATA.paginationEle){
		$infoEle = PAGE_CHANNEL.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#seller-channel-pagination-list');
	}
	var infoEleData = $infoEle.data();
	
	var loadPage = 0;
    if(isDefined(infoEleData.load) == true){
    	loadPage = parseInt(infoEleData.load);
    }
 	
 	var sellerIdx = null;
 	if(isDefined(infoEleData.seller) == true){
    	sellerIdx = parseInt(infoEleData.seller);
    }
    
    if(isDefined(sellerIdx) == false){
    	alert('채널 정보를 확인할 수 없습니다.');
    	return;
    }
 	
 	var sendData = {
 		page 	:	nextPage,
 		cate1	:	null,
 		cate2	: 	null,
 		limit	: 	null,
 		sort	: 	null,
 		sort_type	:	'D',
 		adult_block	: 0,
 		search_keyword	: null,
 		search_force_category	: null,
 		seller	: sellerIdx,
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.cate1)){
			sendData.cate1 = infoEleData.cate1;	
		}
		if(isDefined(infoEleData.cate2)){
			sendData.cate2 = infoEleData.cate2;	
		}
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
	}
	
	//cate1
	if(isDefined(selectedCategory) == true && $.isNumeric(selectedCategory) == true && selectedCategory > 0){
		sendData.cate1 = parseInt(selectedCategory);
	}else{
		var selectedCategory = 0;
		if($('.cate.seller-channel-category-list-item.active').length > 0){
			selectedCategory = $('.cate.seller-channel-category-list-item.active').data('cate1');
		}
		console.log('selectedCategory_~~~', selectedCategory);
		sendData.cate1 = parseInt(selectedCategory);
	}
	
	//sort
	var sortEleData = $('#btn-category-list-sort').data('sort');
	if(isDefined(sortEleData)){
		sendData.sort = sortEleData;
	}
	console.log('sortEleData', sortEleData);
	
	//var listLimit = sendData.l;
	var limitEleData = $('#btn-category-list-limit').data('limit');
	console.log('limitEleData',limitEleData);
	if(isDefined(limitEleData)){
		sendData.limit = parseInt(limitEleData);
	}
	
	//ba
	if($('input:checkbox[id="check-category-is-adult"]').is(":checked") == true){
		sendData.adult_block = 1;
	}
		
	//search keyword
	var searchKeyword = $('#channel_seller-search_keyword').val();
	if(isDefined(searchKeyword) == true && searchKeyword != '' && searchKeyword.length > 1){
		sendData.search_keyword = searchKeyword;
	}
	
	
	//search_force_category
	var searchForceCategory = $('#channel_seller-search_force_category').val();
	if(isDefined(searchForceCategory) == true && searchForceCategory != ''){
		sendData.search_force_category = searchForceCategory;
	}
	
	
	console.log('sendData', sendData);
	PAGE_CHANNEL.getCategoryContentsData(sendData, $infoEle);
	return;

};


//get getCategoryContentsData
PAGE_CHANNEL.getCategoryContentsData = function(getData, $infoEle){
	console.log('PAGE_CHANNEL.getCategoryData', getData);
	
	var sendData = {
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,		//is mobile
		k			: '',		//search keyword
		fc			: '',		//force category
		seller		: ''		//force category
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = PAGE_CHANNEL.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#seller-channel-pagination-list');
		}
	}
	
	var eleData = $infoEle.data();
	
	if(isDefined(getData)){
		if(isDefined(getData.cate1)){ sendData.m = getData.cate1;}
		if(isDefined(getData.cate2)){ sendData.s = getData.cate2; }
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort'])){ sendData.sk = getData.sort; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['adult_block'])){ sendData.ba = getData.adult_block; }
		if(isDefined(getData['is_thumb'])){ sendData.it = getData.is_thumb;}
		if(isDefined(getData['seller'])){ sendData.seller = getData.seller;}
		if(isDefined(getData['search_keyword'])){ sendData.k = getData.search_keyword;}
		if(isDefined(getData['searchForceCategory'])){ sendData.fc = getData.searchForceCategory;}
	}
	
	if($.isNumeric( sendData.m) == false){
		sendData.m = '';
	}
	
	if(isDefined(sendData.seller) == false){
		alert('채널 정보를 확인할 수 없습니다.');
    	return;
	}

	console.log('sendData', sendData);
	var successFunGetCategoryContentsList = function(data){
			console.log('successFunGetCategoryContentsList', data);
			//console.log('eleData', eleData);
			
			var selectedCategory= 0;
			if(isDefined(data.selected_category)){
				selectedCategory = data.selected_category;
			}
			
			var contentsAction = 'category';
			if(isDefined(data.contents_action)){
				contentsAction = data.contents_action;
				
			}
			
			var searchKeyword = '';
			if(isDefined(data.search_keyword) == true){
				searchKeyword =  data.search_keyword;
			}
			//PAGE_CHANNEL.setPagination(selectedCategory, contentsAction);
			
			
			var $innerTargetEle = $('#channel-sller-main-contents-list');
			if(isDefined(data.contents_data)){
				
				//html 파싱				
				//PAGE_CHANNEL.setCategoryListHtml(thumbType, data.contents_data);
				var bbsListData = data.contents_data.bbs_list_data;
				var curPage = bbsListData.page;
				var isLazy = false;
				if(curPage == 1){
					isLazy = true;
				}
				
				
				var bbsListHtml = [];
				var diskBbs = null;
				for(var i =0; i < bbsListData.list.length; i++){
					diskBbs = new Contents_list(i+1, 0, 'channel');
					diskBbs.setData(bbsListData.list[i]);
					//console.log(diskBbs);
					bbsListHtml[i] = diskBbs.getSellerContentsListHtml(isLazy, searchKeyword);
				}
				//innerContentsHtml = bbsListHtml.join('');
				$innerTargetEle.html(bbsListHtml.join(''));
				
				
				
				
				//console.log('rankListHtml', rankListHtml);
				var cate1 =selectedCategory;
				
				//페이지 상단으로 이동
				if(curPage == 1){
					utility.ui.goToElement('.header');
				}else{
					utility.ui.goToElement('.l_content');	
				}
				
				var reSavePageData =
				{
					cate1		:	parseInt(data.selected_category),
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(bbsListData.limit),
				};
				
				if(parseInt(curPage) == 1){
					reSavePageData.total_count	= parseInt(bbsListData.total_count);
					reSavePageData.total_page	= parseInt(bbsListData.total_page);	
				}
				
				
				
				
				//pagination
				var isNewLoadPagination = true; 
				if(isDefined(eleData.cate1)){
					if(eleData.cate1 == reSavePageData.cate1){
						if(PAGE_CHANNEL.DATA.pagination){
							$infoEle.pagination('selectPage', curPage);	
							isNewLoadPagination = false; 
						}
					}
				}
				$infoEle.data(reSavePageData);
				if(isNewLoadPagination == true){
					PAGE_CHANNEL.setPagination(data.selected_category, data.contents_action, curPage);	
				}
			
				
				//save cache
				PAGE_CHANNEL.DATA.LAST_HASH = location.hash;
				PAGE_CHANNEL.DATA.CAT1 = data.selected_category;
				PAGE_CHANNEL.DATA.ACTION_TYPE = contentsAction;
				PAGE_CHANNEL.DATA.LOADED_PAGE = curPage;
				
				//img lazy
				//if(isLazy == true){
				WEB_COMMON.setImageLazy();
				//}
				
				//상단 카테고리
				PAGE_CHANNEL.setCategoryCountList(reSavePageData.cate1);
			}
			return;
		};
		
	var formData = sendData;
	
	console.log('~~~~~~~~~~~~formData~~~~~~~~');
	console.log('formData', formData);
	//return;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHANNEL.SELLER_CONTENTS_LIST,
		data		: formData,
		success_fun	: successFunGetCategoryContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_CHANNEL.setHashCheck = function(isStart){
	console.log('PAGE_CHANNEL.setHashCheck', isStart);
	//hash check
	
	if(isLoadedBbqScript() != true){
		return;
	}
	
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	
	//해시가 없는 경우 첫페이지 가져온다
	if(isDefined(hashPrams['!action']) == false){
		if(isStart == 'search'){
			location.hash = PAGE_CHANNEL.DATA.LAST_HASH;	
		}
		return;
	}
	
	if(hashPrams['!action'] == 'contents'){
		if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
			WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']),'channel');
			return;
		}	
	}
	
	//메인에서 바로 들어온 경우 : 해시 제거
	if(isStart == 'start'){
		$.bbq.removeState();
		return;
	}
	
	
	if(hashPrams['!action'] != 'channel'){
		console.log(hashPrams['!action']);
		
		return;
	}
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}
	console.log('hashPage',hashPage);
	
	var hashCategory = null;
	if(hashPrams['cate']){
		if($.isNumeric(hashPrams['cate'])){
			hashCategory = parseInt(hashPrams['cate']);	
		}
	}
	console.log('hashCategory',hashCategory);
	
	
	if(isDefined(hashPage)){
		console.log('has hashaa', hashPage);
		console.log(PAGE_CHANNEL.DATA.LAST_HASH);
		console.log(location.hash);
		var loadedPage = parseInt(PAGE_CHANNEL.DATA.LOADED_PAGE);
		
		if(PAGE_CHANNEL.DATA.LAST_HASH != location.hash){
			PAGE_CHANNEL.setSellerContentsPage(hashPage, hashCategory);
			return;
		}
		if(parseInt(loadedPage) == parseInt(hashPage)){
			console.log('loaded page');
			return
		}
		
		PAGE_CHANNEL.setSellerContentsPage(hashPage, hashCategory);
	}
	
};


//페이지 정보 저장
PAGE_CHANNEL.setPagination = function(selectedCategory, contentsAction, curPage){
	console.log('PAGE_CHANNEL.setPagination');
	
	if(isDefined(selectedCategory) == false){
		selectedCategory = 80000;	
	}
	//pagination
	var $paginationEle = $('#seller-channel-pagination-list');
	var eleData = $paginationEle.data();
	console.log('eleData', eleData);
	var totalPages = 1;
	if(isDefined(selectedCategory) == true && parseInt(selectedCategory) > 10000){
		var total_cnt = $('.seller-channel-category-list-item.cate1-'+selectedCategory).data('cnt');
		console.log('total_cnt', total_cnt);
		if(isDefined(total_cnt)){
			var pagelimit = 20;
			var limitEleData = $('#btn-seller-contents-list-limit').data('limit');
			console.log('limitEleData',limitEleData);
			if(isDefined(limitEleData)){
				pagelimit = parseInt(limitEleData);
			}
			totalPages = Math.ceil(parseInt(total_cnt) / pagelimit);
		}
		PAGE_CHANNEL.setCategoryCountList(selectedCategory);
		
	}else{
		if(isDefined(eleData)){
			if(isDefined(eleData.total_page)){
				totalPages = parseInt(eleData.total_page);
			}
		}
	}
	if(isDefined(eleData) == false){
		return;
	}
	console.log('totalPages', totalPages);
	console.log('contentsAction', contentsAction);
	console.log('selectedCategory', selectedCategory);
	console.log('eleData', eleData);
	
	console.log(parseInt(selectedCategory));
	console.log(parseInt(eleData.cate1));	
	
	if($.isNumeric( selectedCategory) == false){
		selectedCategory = 0;
	}
	
	if(contentsAction != eleData.action || parseInt(selectedCategory)  != parseInt(eleData.cate1) || parseInt(totalPages) < 2){
		console.log('new pagination');
		if(PAGE_CHANNEL.DATA.pagination){
			console.log('pagination destroy');
			$paginationEle.pagination('destroy');
			PAGE_CHANNEL.DATA.paginationEle = null;
			PAGE_CHANNEL.DATA.pagination = null;
		}
	}
	
	var startPage = 1;
	if(isDefined(curPage) == true){
		startPage = curPage;
	}
	
	if($paginationEle.length > 0 && parseInt(totalPages) > 1){
		//var startPage = 1;
		//var initiateStartPageClick = false;
		var pageLinkUrl = '#!action=channel&type=seller&mod='+contentsAction+'&cate='+selectedCategory+'&page=';
		PAGE_CHANNEL.DATA.paginationEle = $paginationEle;
		PAGE_CHANNEL.DATA.pagination = $paginationEle.pagination({
			currentPage	: startPage,
			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: pageLinkUrl,
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//PAGE_CHANNEL.goCategoryPage(page);
			}
		});
		
		console.log(PAGE_CHANNEL.DATA.pagination);
	}
};
	
	//카테고리 클릭
	if($( ".seller-channel-category-list-item" ).length > 0){
		$( ".seller-channel-category-list-item" ).unbind( "click");
		$( ".seller-channel-category-list-item" ).bind( "click", function() {
			var eleData = $(this).data();
			console.log('eleData', eleData);
			
			var selectedCategory = 0;
			if(isDefined(eleData.cate1)){
				selectedCategory = eleData.cate1;
			}
			
			if($.isNumeric(selectedCategory) == false){
				selectedCategory = 0;
			}
			var contentsAction = 'category';
			if(isDefined(eleData.action)){
				contentsAction = eleData.action;
			}
			
			if(contentsAction == 'search' && eleData.cnt < 1){
				console.log('cnt err', eleData.cnt);
				return;
			}
			
			if(selectedCategory > 1){
				if(isDefined(contentsAction)){
					$( ".seller-channel-category-list-item" ).removeClass('active').data({'action': contentsAction});
				}else{
					$( ".seller-channel-category-list-item.active" ).removeClass('active');	
				}
				$( ".seller-channel-category-list-item.cate1-"+selectedCategory ).addClass('active');
			}
			
			if(contentsAction == 'category'){
				hashUrl = '#!action=channel&type=seller&mod=category&cate='+selectedCategory+'&page=1';
			}else if(contentsAction == 'search'){
				if(isDefined(eleData.cate1) == true && $.isNumeric( eleData.cate1)){
					$('#channel_seller-search_force_category').val(eleData.cate1);	
				}
				var searchKeyword = $('#channel_seller-search_keyword').val();
				if(isDefined(searchKeyword) == false){
					location.href = PAGE_CHANNEL.DATA.INDEX_URL.SELLER+'#!action=channel&type=seller&mod=category&cate='+selectedCategory+'&page=1';
					return;
				}
				
				hashUrl = '#!action=channel&type=seller&mod=search&k='+encodeURI(searchKeyword)+'&cate='+selectedCategory+'&page=1';
			}
			
			location.hash = hashUrl;
		});
	}
*/