/*
* mobile page search js
*/

MOBILE_PAGE.search = {};
MOBILE_PAGE.search.DATA = {
	PAGE	:
	{
		k	: null,
		fc	: null,
		lo	: null,
		sk	: null,
		ba	: null,
		page: 1,
		MAIN	: null,
		SUB		: null
	},
	LAST_HASH	: null,
	ELE			:{
		CONTAINER	: 'mobile-container-deep-10',
		ACTION_FORM	: 'mobileDiskTopSearchActionForm',
		PAGE_INFO	: 'mobile-search-page-end-spy',
	},
	LOADED	: {
		SCROLL_SPY	: false
	}
	
	
};

MOBILE_PAGE.search.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.search.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.search.defaultBinding();	
	MOBILE_PAGE.search.pageInit(showContainerInfo, hashPrams);
}


MOBILE_PAGE.search.defaultBinding = function(){
	console.log('MOBILE_PAGE.search.defaultBinding');	
	
	//검색(search_form) 키워드 초기화
	MOBILE_PAGE.search_form.resetSearchKeyword();

	MOBILE_PAGE.search.bindKeydown();
	
	//검색 form 바인딩
	var $searchFormEle = $('#'+MOBILE_PAGE.search.DATA.ELE.ACTION_FORM);
	if($searchFormEle.length > 0){
		$searchFormEle.unbind( "submit");
		$searchFormEle.bind('submit', function(event){
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData:',formData);
			
			if(isDefined(formData.k) == false || formData.k.length < 2){
				disk_alert('찾을 파일이나 콘텐츠 제목을 2자 이상 입력해주세요.');
				//$searchFormEle.find('input[name=k]').focus();
				return false;
			}
			//MOBILE_PAGE.search.actionSearchForm();
			//formData.is_mobile = 1;
			//MOBILE_PAGE.getMobileSearchResultView(formData);
			$('#disk_search_keyword').blur();
			GO_SEARCH(formData.k, formData.fc, formData.lo);
			return false;
		});
		
		//value reset
		$searchFormEle.find('input[name=fc]').val('');
		$searchFormEle.find('input[name=lo]').val('');
	}

	
	//spy 초기화
	$infoEle = $('#'+MOBILE_PAGE.search.DATA.ELE.PAGE_INFO);
	if($infoEle.length > 0){
		$infoEle.data('load', 0);
		if(MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY == true){
			var $scrollSpyEle = $('.search-contetns-list-scroll-spy-wrap');
			if($scrollSpyEle.length > 0){
				$scrollSpyEle.off('scrollSpy:enter');
			}
			MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY = false;
			
		}
	}
	
	//검색어 취소 버튼
	var $btnEle = $('.btn-search-keyword');
	if($btnEle.length > 0){
		$btnEle.unbind('click');
		$btnEle.bind('click',function(event){
			console.log('del click btn');
			$('.mobile-search-header.has-keyword').removeClass('has-keyword');
			//$searchFormEle.find('input[name=k]').val('').focus();
			$searchFormEle.find('input[name=k]').val('');
			$('#disk_search_keyword').focus();
		});
	}
	
	MOBILE_PAGE.search.resetSearchPageData();
};


//설정 정보 리셋
MOBILE_PAGE.search.resetSearchPageData = function(){
	console.log('MOBILE_PAGE.search.resetSearchPageData');
	
	
	
	/*
	//성인 체크	
	$('input:checkbox[name="block_adult"]').attr("checked", false);
	$('input:checkbox[name="block_adult"]').prop("checked", false);
	
	//정렬순서
	if($('.mobile-search-sort-btn.s-S').hasClass('active') == false){
		$('.mobile-search-sort-btn.active').removeClass('active');
		$('.mobile-search-sort-btn.s-S').addClass('active');
	}
	
	var $searchInfoFormEle = $('#mobileSearchFilterOption');
	if($searchInfoFormEle.length > 0){
		$searchInfoFormEle.find('input[name=block_adult]').val('0');
		$searchInfoFormEle.find('input[name=sort_type]').val('');
	}
	*/
	
};




//검색 키워드 input binding
MOBILE_PAGE.search.bindKeydown = function() {
	console.log('MOBILE_PAGE.search.bindKeydown');
	//console.log('bindKeydown');
	var $searchInputKeyword = $('#'+MOBILE_PAGE.search.DATA.ELE.ACTION_FORM).find('input[name=k]'); 
	if($searchInputKeyword.length > 0){
		console.log('$searchInputKeyword');
		$searchInputKeyword.off("keyup").off("keydown").off("focus").off("blur");
		$searchInputKeyword
			.on("keyup", function(evt) {
			    console.log('keyup');
				evt = evt || window.event;
			    var keyCode = evt.keyCode;
			    console.log('keyCode', keyCode);
			    if (keyCode === 38) {
			        suppressKeypress = true; 
			        return;
			    }
			    
			    var searchKeyStr = $(this).val();
			    console.log('searchKeyStr', searchKeyStr);
				if(isDefined(searchKeyStr) == false){
					console.log('empty key')
					//$('.mobile-del-keyword-btn').hide();
					$('.mobile-search-header.has-keyword').removeClass('has-keyword');
				}else{
					//$('.mobile-del-keyword-btn').show();
					$('.mobile-search-header').addClass('has-keyword');
				}
				
	    	});
	}
};

//검색하기(search) :action
MOBILE_PAGE.search.actionSearchForm = function(){
	//console.log('formEleName', formEleName);
	var $searchFormEle = $('#'+MOBILE_PAGE.search.DATA.ELE.ACTION_FORM);
	if($searchFormEle.length < 1){
		console.log('$searchFormEle length 0');
		return;
	}
	var searchKeyword = $searchFormEle.find('input[name=k]').val();
	if(isDefined(searchKeyword) == false){
		disk_alert('검색어를 입력해주세요.');
		return;
	}
	if(searchKeyword.length < 2){
		disk_alert('검색어는 2자 이상 입력해주세요.');
		return;
	}
	
	var fc = $searchFormEle.find('input[name=loc]').val();
	var lo = $searchFormEle.find('input[name=fc]').val(); 
	GO_SEARCH(searchKeyword, fc, lo);
};




MOBILE_PAGE.search.afterBinding = function(){
	console.log('MOBILE_PAGE.search.afterBinding');	
	MOBILE_PAGE.search.sellerContentsListSpy();
	MOBILE_COMMON.afterLoadCommonBinding();
};

//스크롤 스파이 - 판매자 자료
MOBILE_PAGE.search.sellerContentsListSpy = function(isReload){
	console.log('MOBILE_PAGE.search.sellerContentsListSpy', isReload);
	
	var optIsReload = isReload || false;
	console.log('optIsReload', optIsReload);
	if(MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY == true){
		console.log('sellerContentsListSpy loaded');
		return;
	}
	
	
	var $scrollSpyEle = $('.search-contetns-list-scroll-spy-wrap');
	var actionGetSearchContents = function(gData){
		console.log('actionGetSearchContents', gData);
		if(isDefined(gData) == false){
			console.log('gData err');
			return;
		}
		var nextPage = 1;
		var totalPage = 2;
		if(isDefined(gData.loaded) == true){
			if($.isNumeric(gData.loaded) == true){
				var loadPage = parseInt(gData.loaded);
				nextPage = loadPage+ 1;
			}
			
		}
		if(isDefined(gData.total_page) == true){
			if($.isNumeric(gData.total_page) == true){
				totalPage = parseInt(gData.total_page);
			}
		}
		if(nextPage > totalPage){
			console.log('max page');
			$scrollSpyEle.removeClass('loading').addClass('ending');
			return;
		}
		if($scrollSpyEle.hasClass('ending') == true){
			$scrollSpyEle.removeClass('ending').addClass('loading');	
		}
		MOBILE_PAGE.search.setSearchContentsPage(nextPage, gData.search_category);
	};
	
	
	if($scrollSpyEle.length > 0){
		$scrollSpyEle.on('scrollSpy:enter', function() {
			var eleData = $(this).data();
			console.log('enter', eleData);
			
			var spyType = 'comment';
			if(isDefined(eleData.type)){
				spyType = eleData.type;
			}
			//load -0 첨, 1-불러오는중, 2-완료
			var isLoaded = 0;
			if(isDefined(eleData.load)){
				isLoaded = parseInt(eleData.load);
			}
			
			if(isLoaded > 0){
				console.log('already loaded:'+spyType);
				return;
			}
			
			if(isLoaded == 0){
				//conetest list
				if(eleData.type == 'seller-contents'){
					console.log('contents not loaded');
					/*
					var sendData = {
						//idx		: eleData.idx,
						page	: 1,
						target	: 'search-contents-list-data-text',
						info	: 'comment-list-channel-pagnation-controller',
					}
					
					console.log(sendData);
					*/
					var selectedCategory = 0;
					if(isDefined(eleData.cate) == true){
						selectedCategory = eleData.cate;
					}
					
					//MOBILE_PAGE.search.setSearchContentsPage(1, eleData.cate);
					//WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
					actionGetSearchContents(eleData);
					$(this).data('load', 1);
				}else if(eleData.type == 'comment'){
		
					
				}
			}
			
			
		});
		var $scrollSpy =  $scrollSpyEle.scrollSpy({reload:optIsReload});	
		MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY = true;
		console.log('MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY',MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY);
	}
};

MOBILE_PAGE.search.pageInit = function(info, params){
	console.log('MOBILE_PAGE.search.pageInit');	
	//MOBILE_PAGE.search.defaultBinding();
	
	console.log('info', info);
	console.log('params', params);
	console.log('MOBILE_PAGE.search.DATA.LAST_HASH', MOBILE_PAGE.search.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	var isNewContainer = true;
	
	if(MOBILE_PAGE.search.DATA.LAST_HASH == location.hash){
		console.log('same hash');
		//비어있는지 검사
		var $targetContainer = $('#'+MOBILE_PAGE.search.DATA.ELE.CONTAINER);
		if($targetContainer.length < 1){
			console.log('non container');
			return;
		}
		if($targetContainer.text().length < 10 && $targetContainer.data('loaded') < 1){
			console.log('empty container');
			isNewContainer = true;
			MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY = false;
			//MOBILE_COMMON.DATA.SCROLLER.W_SCROLL = false;
		}else{	
			isNewContainer = false;
			//리스트로 이동
			MOBILE_COMMON_FUN.goLastContentsFocus(75);
		}
		
		//스크롤 스파이
		if(MOBILE_PAGE.search.DATA.LOADED.SCROLL_SPY != true){
			 MOBILE_PAGE.search.sellerContentsListSpy(true);
		}
		
	}
	
	
	
	//새로페이지를 로드 해야합니다.
	if(isNewContainer == true){
		var sendData =
		{
			k	: '',
			fc	: '',
			lo	: '',
			page: 1,
			is_mobile: 1
		}
		var actionType = null;
		if(isDefined(params['!action'])){
			actionType = params['!action'];
		}
		var searchKeyword = null;
		if(isDefined(params['k'])){
			searchKeyword = params['k'];
		}
		if(actionType != 'search' || isDefined(searchKeyword) == false){
			console.log('err action type');
			disk_alert('키워드가 올바르지 않습니다.');
    		GO_HISTORY_BACK();
    		return;
		}
		
		sendData.k = searchKeyword;
		if($('#disk_search_keyword').val().length < 1){
			$('#disk_search_keyword').val(searchKeyword);
		}
		//del btn 활성화
		$('.mobile-search-header').addClass('has-keyword');
		
		if(isDefined(params['fc'])){
			sendData.fc = params['fc'];
		}
		if(isDefined(params['lo'])){
			sendData.lo = params['lo'];
		}
		if(isDefined(params['page']) && $.isNumeric(params['page'])){
			sendData.page = parseInt(params['page']);
		}
		console.log('sendData', sendData);
		
		MOBILE_PAGE.getMobileSearchResultView(sendData);
	}
};




//모바일 검색 결과 view
MOBILE_PAGE.getMobileSearchResultView = function(getData){
	console.log('MOBILE_COMMON_FUN.getMobileSearchResultView');
	//console.log('linkType', linkType);
	console.log(getData);
	if(isDefined(getData) == false){
		return;
	}
	
	//기존 모다은 모두 비운다.
	//$('#disk-pc-contents-view-modal').empty();
	
	var saveData = {
		k		: getData.k,
		fc		: getData.fc,
		lo		: getData.lo,
		page	: getData.page,
		is_mobile: 1,
	};
	
	
	var successAjaxSearchListViewData = function(data){
		console.log('successAjaxSearchListViewData');
		//console.log(data);
		//return;
		
		var viewHtml = null;
		if(data == 'ERR_ONPLAY_USER_NOT_LOGIN'){
        	console.log('data:', data);
			disk_alert('로그인이 필요한 콘텐츠입니다.');
			GO_LOGIN();
			return;
        }else if(data == 'ERR_ONPLAY_NOT_ADULT_REGISTER'){
        	console.log('data:', data);
			alert('성인 인증이 필요한 콘텐츠입니다.');
			ERR_ONPLAY_NOT_ADULT_REGISTER();
			return;
        }else if(data == 'ERR_ONPLAY_DOWNLOAD_NOT_FOUND_FILE'){
        	console.log('data:', data);
			disk_alert('선택한 콘텐츠는 기간이 지났거나 판매가 종료된 상품입니다.');
        	//history.back(true);
        	GO_HISTORY_BACK();
			return;
        }else{
			if(data.length < 100 ||  data.indexOf('search-result-container') < 0){
        		console.log('err modal html');
				disk_alert('선택한 콘텐츠는 기간이 지났거나 판매가 종료된 상품입니다.');
        		//history.back(true);
        		GO_HISTORY_BACK();
        		return;
        	}
        	
			
			viewHtml = data;
       	}
		if(isDefined(viewHtml)){
			console.log('has viewHtml');
			
			var $targetContainer = $('#'+MOBILE_PAGE.search.DATA.ELE.CONTAINER);
			if($targetContainer.length > 0){
				$targetContainer.html(viewHtml);
				
				//save page info
				MOBILE_PAGE.search.DATA.PAGE.k =  saveData.k;
				MOBILE_PAGE.search.DATA.PAGE.fc =  saveData.fc;
				MOBILE_PAGE.search.DATA.PAGE.lo =  saveData.lo;
				MOBILE_PAGE.search.DATA.PAGE.page =  saveData.page;
				
				//save hash
				MOBILE_PAGE.search.DATA.LAST_HASH = location.hash; 
				
				$('#disk_search_keyword').val(saveData.k);
				
				MOBILE_PAGE.search.afterBinding();
				
				//키워드 스토리지 저장
				MOBILE_COMMON_FUN.setMemberSearchHistory(saveData.k);
			}
			
		}
		
		
	};
	
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.SEARCH.M_SEARCH_LIST;
	var formData = saveData;
	
	var ajaxData = 
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxSearchListViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: false
	};
	DISK_PROTOCOL.AJAX(ajaxData);
  
};

//검색 결과 없음 : 랭킹 탭 클릭
MOBILE_PAGE.search.onclickResultRankingTab = function(thisEle){
	console.log('MOBILE_PAGE.search.onclickResultRankingTab');	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	var remvCla = 'real';
	if(eleData.val == 'real'){
		remvCla = 'rating';
	}
	$('.'+eleData.target).removeClass(remvCla);
	$('.'+eleData.target).addClass(eleData.val);
	
};

//sort : 카테고리 정렬
MOBILE_PAGE.search.onclickResultSearchCategory = function(thisEle){
	console.log('MOBILE_PAGE.search.onclickResultRankingTab');	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.category) == false){
		return;
	}
	if(eleData.category == 90001){
		console.log('search-only-channel-show');
		$('.search-only-channel-hide').hide();
		$('.search-only-channel-show').show();
		$('.search-only-channel-show .r_section.movie').show();
		//utility.ui.goToElement('.content.sub');
		$('.search-cate-item.active').removeClass('active');
		$(thisEle).addClass('active');
		GO_TOP();
		return;
		
	}else{
		console.log('search-only-channel-hide');
		if(eleData.category == 90000){
			$('.search-only-channel-show').show();
			$('.search-only-channel-show .r_section.movie').show();
			
		}else{
			$('.search-only-channel-show').hide();	
		}
		$('.search-only-channel-hide').show();
		//PAGE_SEARCH.setSearchContentsPage(1, eleData.category);
		//location.hash = '#!action=search&c='+eleData.category+'&page=1';
	}
	
	
	//select force category
	var $searchFormEle = $('#'+MOBILE_PAGE.search.DATA.ELE.ACTION_FORM);
	if($searchFormEle.length < 0){
		return;
	}
	$searchFormEle.find('input[name=fc]').val(eleData.category);
	$('.search-cate-item.active').removeClass('active');
	$(thisEle).addClass('active');
	
	MOBILE_PAGE.search.setSearchContentsPage(1, eleData.category);
	
	
};

//sort : 카테고리 정렬
MOBILE_PAGE.search.onclickSearchChangeSortType = function(thisEle){
	console.log('MOBILE_PAGE.search.onclickSearchChangeSortType');
	
	var $mobileSearchInfoFromEle = $('#mobileSearchFilterOption');
	if($mobileSearchInfoFromEle.length < 1){
		return;
	}
	var savedSortType = $mobileSearchInfoFromEle.find('input[name=sort_type]').val();
	console.log('savedSortType', savedSortType);
	
	var eleData = $(thisEle).data();
	if(isDefined(eleData.values) == false){
		return;
	}
	console.log('eleData', eleData);
	//mobile-category-sort-btn
	if(eleData.values == savedSortType){
		return;
	}
	
	//change active class
	$('.mobile-search-sort-btn.active').removeClass('active');
	$(thisEle).addClass('active');
	$mobileSearchInfoFromEle.find('input[name=sort_type]').val(eleData.values);
	
	$('.search-only-channel-show').hide();
	
	MOBILE_PAGE.search.setSearchContentsPage(1);
};


MOBILE_PAGE.search.onclickSearchBlockAdult = function(thisEle){
	console.log('MOBILE_PAGE.search.onclickSearchBlockAdult');
	
	var $mobileSearchInfoFromEle = $('#mobileSearchFilterOption');
	if($mobileSearchInfoFromEle.length < 1){
		return;
	}
	var savedBlockAdult = $mobileSearchInfoFromEle.find('input[name=block_adult]').val();
	console.log('savedBlockAdult', savedBlockAdult);
	
	var isChecked = 0;
	if($(thisEle).is(":checked") ==  true){
		isChecked = 1;
	}
	console.log('isChecked', isChecked);
	if(isChecked == savedBlockAdult){
		return;
	}
	$mobileSearchInfoFromEle.find('input[name=block_adult]').val(isChecked);
	
	$('.search-only-channel-show').hide();
	
	MOBILE_PAGE.search.setSearchContentsPage(1);
};




//판매자 컨텐츠 가져오기
MOBILE_PAGE.search.setSearchContentsPage = function(nextPage, selectedCategory){
	console.log('MOBILE_PAGE.search.setSearchContentsPage:',nextPage);	
	//console.log('loadedPage', loadedPage);
	/*
	if(isDefined(nextPage) == fasle){
		nextPage = 1;
	}
	*/
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	//return;
	var $infoEle = null;
	if(MOBILE_PAGE.search.DATA.ELE.PAGE_INFO){
		$infoEle = $('#'+MOBILE_PAGE.search.DATA.ELE.PAGE_INFO);
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#mobile-search-page-end-spy');
	}
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	/*
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
    */
 	
 	var sendData = {
 		page 	:	nextPage,
 		cate1	:	null,
 		cate2	: 	null,
 		limit	: 	null,
 		sort	: 	null,
 		sort_type	:	'D',
 		adult_block	: 0,
 		search_keyword	: null,
 		search_ctegory	: null,
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
	
	//search keyword
	var searchKeyword = $('#disk_search_keyword').val();
	console.log('searchKeyword:', searchKeyword);
	if(isDefined(searchKeyword) == false){
		if(isDefined(infoEleData.search)){
			searchKeyword = infoEleData.search;
		}
	}
	
	if(isDefined(searchKeyword) == false){
		disk_alert('찾을 자료의 제목이나 검색어를 입력해주세요.');
		return;
	}
	
	if(objLengthMinByte(searchKeyword, 4) == true){
		disk_alert('찾을 자료의 제목이나 검색어를 한글 2자 이상 입력해주세요.');
		return;
	}
	sendData.search_keyword = searchKeyword;
	
	//select category
	var $searchFormEle = $('#'+MOBILE_PAGE.search.DATA.ELE.ACTION_FORM);
	
	if(isDefined(selectedCategory) == false){
		selectedCategory = $searchFormEle.find('input[name=fc]').val();
	}
	if(isDefined(selectedCategory)){
		sendData.search_ctegory = parseInt(selectedCategory);
	}else{
		selectedCategory = $('.search-cate-item.active').data('category');
		if(isDefined(selectedCategory) == true){
			sendData.search_ctegory = parseInt(selectedCategory);
		}	
	}
	
	
	//select channel
	if(sendData.search_ctegory == 90001){
		console.log('channel show');
		return;
	}
	
	var $mobileSearchInfoFromEle = $('#mobileSearchFilterOption');
	if($mobileSearchInfoFromEle.length > 0){
		
		//sort
		var sortEleData = $mobileSearchInfoFromEle.find('input[name=sort_type]').val();
		if(isDefined(sortEleData)){
			sendData.sort = sortEleData;
		}
		console.log('sortEleData', sortEleData);
		
		//adult block
		var savedBlockAdult = $mobileSearchInfoFromEle.find('input[name=block_adult]').val();
		if(isDefined(savedBlockAdult)){
			sendData.adult_block = parseInt(savedBlockAdult);
		}
		console.log('savedBlockAdult', savedBlockAdult);
		
		//sendData.limit = parseInt(limitEleData);	
	}
	
	console.log('sendData', sendData);
	MOBILE_PAGE.search.getSearchContentsData(sendData, $infoEle);
	return;
};


//get getCategoryContentsData
MOBILE_PAGE.search.getSearchContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.search.getSearchContentsData', getData);
	console.log($infoEle);
	
	var sendData = {
		k			: '',		//kewword
		c			: '',		//select category
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 1			//is mobile
	};
	
	if(isDefined($infoEle) == false){
		if(MOBILE_PAGE.search.DATA.ELE.PAGE_INFO){
			$infoEle = $('#'+MOBILE_PAGE.search.DATA.ELE.PAGE_INFO);
		}
		if(isDefined($infoEle) == false){
			$infoEle = $('#mobile-search-page-end-spy');
		}
		//var infoEleData = $infoEle.data();
		//console.log('infoEleData', infoEleData);
		
	}
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	
	if(isDefined(getData)){
		if(isDefined(getData.cate1)){ sendData.m = getData.cate1;}
		if(isDefined(getData.cate2)){ sendData.s = getData.cate2; }
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort'])){ sendData.sk = getData.sort; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['adult_block'])){ sendData.ba = getData.adult_block; }
		if(isDefined(getData['is_thumb'])){ sendData.it = getData.is_thumb;}
		if(isDefined(getData['search_keyword'])){ sendData.k = getData.search_keyword;}
		if(isDefined(getData['search_ctegory'])){ sendData.c = getData.search_ctegory;}
	}
	
	//성인인증 여부
	var isAdultMember =utility.disk.checkIsAdultMember();
	console.log('isAdultMember', isAdultMember);
	
	console.log('sendData', sendData);
	var successFunGetSearchContentsList = function(data){
		console.log('successFunGetSearchContentsList', data);
		
		if(isDefined(data.search_data)){
			
			if(isDefined(infoEleData.target) == false){
				console.log('not target ele');
				return;
			}
		
			var $innerHtmlTarget = $('#'+infoEleData.target);
			var bbsListHtml = [];
			var diskBbs = null;
			var cc = 0;
			if(isDefined(data.search_data.search_premium_list)){
				var premiumData = data.search_data.search_premium_list;
				for(var k =0; k < premiumData.length; k++){
					diskBbs = new Contents_list(cc+1, 0, 'premium');
					diskBbs.is_adult_member = isAdultMember;
					diskBbs.setData(premiumData[k]);
					//console.log(diskBbs);
					bbsListHtml[cc] = diskBbs.getMobileCategoryListHtml(false, 'premium');
					cc++;
				}	
			}
			
			
			var bbsListData = data.search_data;
			var bbsListCount = bbsListData.contents_list.length;
			for(var i =0; i < bbsListCount; i++){
				diskBbs = new Contents_list(cc+1, 0, 'search');
				diskBbs.setData(bbsListData.contents_list[i]);
				diskBbs.is_adult_member = isAdultMember;
				//console.log(diskBbs);
				bbsListHtml[cc] = diskBbs.getMobileCategoryListHtml(false, 'search');
				//bbsListHtml[cc] = diskBbs.getMobileSearchContentsListHtml(false, 'search');
				
				cc++;
			}
			console.log('bbsListHtml');
			console.log(bbsListHtml);
			if(bbsListData.page == 1){
				$innerHtmlTarget.html(bbsListHtml.join(''));	
			}else{
				$innerHtmlTarget.append(bbsListHtml.join(''));
			}
			
			
			//정보 업데이트
			var updateData = sendData;
			updateData.loaded = 1;
			updateData.load = 0;		//spy
			updateData.main = data.ranking_category;
			var isEnding = false;
			if(bbsListData.page == 1){
				if(isDefined(bbsListData.page)){
					updateData['page'] = bbsListData.page;	
				}
				if(isDefined(bbsListData.total_count)){
					updateData['total_count'] = bbsListData.total_count;	
				}
				if(isDefined(bbsListData.total_page)){
					updateData['total_page'] = bbsListData.total_page;	
				}
				if(isDefined(bbsListData.limit)){
					updateData['limit'] = bbsListData.limit;	
				}
				if(isDefined(bbsListData.search_keyword)){
					updateData['search'] = bbsListData.search_keyword;	
				}
				if(bbsListData.total_page == 1){
					isEnding = true;
				}
			}
			if(isDefined(bbsListData.selected_category) == true){
				updateData['search_category'] = parseInt(bbsListData.selected_category);
				MOBILE_PAGE.search.DATA.PAGE.fc	= updateData['search_category'];	
			}
			
			if(isDefined(bbsListData.sort_key) == true){
				updateData['sk'] = bbsListData.sort_key;
				MOBILE_PAGE.search.DATA.PAGE.sk	= updateData['sk'];
			}
			if(isDefined(bbsListData.block_adult) == true){
				updateData['ba'] = bbsListData.block_adult;
				MOBILE_PAGE.search.DATA.PAGE.ba	= updateData['ba'];
			}
			
			//save paging
			if(bbsListCount > 0){
				updateData.loaded = bbsListData.page;
				if(isEnding == true){
					$infoEle.data({loaded : bbsListData.page, page : bbsListData.page, total_page:data.page}).removeClass('loading').addClass('ending');
				}else{
					$infoEle.data(updateData);	
				}
			}else{
				//$('#category-page-end-spy').data({loaded : data.page});
				$infoEle.data({loaded : bbsListData.page, page : bbsListData.page, total_page:data.page}).removeClass('loading').addClass('ending');
			}
			
			
			
			//$infoEle.data({page:data.page, main:data.main});
			
			//save cache
			if(isDefined(bbsListData.cate1)){
				MOBILE_PAGE.search.DATA.PAGE.MAIN	= data.main;
			}
			if(isDefined(bbsListData.cate2)){
				MOBILE_PAGE.search.DATA.PAGE.SUB	= data.sub;
			}
			
			
			
			
			//save last call hash
			console.log('save location.hash', location.hash);
			MOBILE_PAGE.search.DATA.LAST_HASH = location.hash;
			
			//after binding
			//MOBILE_PAGE.category.dataAfterBinding($innerHtmlTarget, data.category_data.bbs_list_data);
			MOBILE_PAGE.search.afterBinding();
			
		}
		
	};
	
	COMMON_ACTION.SEARCH.getSearchContentsList(sendData, successFunGetSearchContentsList);
};



