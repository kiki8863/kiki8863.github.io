/*
* search form page js
*/

MOBILE_PAGE.search_form = {};

MOBILE_PAGE.search_form.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.search_form.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.search_form.pageInit(showContainerInfo, hashPrams);
}


MOBILE_PAGE.search_form.defaultBinding = function(){
	console.log('MOBILE_PAGE.search_form.defaultBinding');	
	
	//인기 랭킹 보여주기
	//$('.realtime-rank-container').addClass('show');
	
	//검색 form 바인딩
	var $topSearchFormEle = $('#mobileDiskTopMainSearchForm');
	if($topSearchFormEle.length > 0){
		$topSearchFormEle.unbind( "submit");
		$topSearchFormEle.bind('submit', function(event){
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData:',formData);
			
			if(isDefined(formData.k) == false || formData.k.length < 2){
				$topSearchFormEle.find('input[name=k]').blur();
				disk_alert('찾을 파일이나 콘텐츠 제목을 2자 이상 입력해주세요.');
				return false;
			}
			//MOBILE_PAGE.search.actionSearchForm();
			//formData.is_mobile = 1;
			//MOBILE_PAGE.getMobileSearchResultView(formData);
			$('#disk_search_keyword').val(formData.k).blur();
			GO_SEARCH(formData.k, formData.fc, formData.lo);
			return false;
		});
	}
	
	
	//image lazy
	MOBILE_COMMON.afterLoadCommonBinding();
	
	//member search history
	MOBILE_PAGE.search_form.bindingSearchHistory();
	
	//search auto completed
	MOBILE_PAGE.search_form.bindingAutoCompleted();
	

};

//검색하기 :action
MOBILE_PAGE.search_form.actionSearchForm = function(formEleName){
	console.log('formEleName', formEleName);
	var $searchFormEle = $('#'+formEleName);
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
	
	//insert search result form
	var $targetForm = $('#mobileDiskTopSearchActionForm');
	if($targetForm.length > 0){
		$targetForm.find('input[name=k]').val(searchKeyword);
		if(isDefined(fc)){
			$targetForm.find('input[name=loc]').val(fc);
		}
		if(isDefined(lo)){
			$targetForm.find('input[name=lo]').val(lo);
		}
	}
	
	
	GO_SEARCH(searchKeyword, fc, lo);
	
	
};


MOBILE_PAGE.search_form.bindingSearchHistory = function(){
	
	console.log('MOBILE_PAGE.search_form.bindingSearchHistory');
		
	//test
	/*
	var savedHistoryData = ['소년탐정 김전일 리턴즈', '승리 버닝썬', '부천 택시기사', '아이유 연말콘서트', '오만과 편견', '오', '오만', '명량', '자백', '열혈사제', '똥양국', '와이키키', '긴제목은 어떻게 쓰여지지?','30자이상 제목을가진 검색어는 저장하는걸 30자까지만 하도록 수정하도록 합시다'];
	//var savedHistoryData = ['소년탐정 김전일 리턴즈', '승리 버닝썬'];
	//var savedHistoryData = ['아이유 연말콘서트'];
	for(var i = 0; i < savedHistoryData.length; i++){
		MOBILE_COMMON_FUN.setMemberSearchHistory(savedHistoryData[i]);	
	}
	*/
	var memberSearchHisgoryData = MOBILE_COMMON_FUN.getMemberSearchHistory(true);
	console.log('memberSearchHisgoryData', memberSearchHisgoryData);
	
	var recentKeyListHtml = [];
	var riCnt = 0;
	for(var ri in memberSearchHisgoryData){
		if(riCnt > 8){
			break;
		}
		recentKeyListHtml.push(MOBILE_TEMPLETE.PAGE.searchFormGetRecentSearchKeywordListHtml(memberSearchHisgoryData[ri], riCnt));
		riCnt++;	
	}
	
	$('.recent-search-keyword').find('.recent-search-keyword-list').html(recentKeyListHtml.join(''));
	if(recentKeyListHtml.length > 0){
		$('.search-input-data.recent-search-keyword').addClass('has-keyword');
	}else{
		$('.search-input-data.recent-search-keyword').removeClass('has-keyword');
	}
	
	
	//var utility.disk.setStorageData();
	
	//var memberDataStorage = utility.disk.getStorageData('member_data');
	
	
	
	
};

//최근 검색어 삭제
MOBILE_PAGE.search_form.delSearchHistoryKeyword = function(thisEle){
	console.log('MOBILE_PAGE.search_form.delSearchHistoryKeyword');
	var delKeyWord = $(thisEle).data('kw');
	console.log('delKeyWord', delKeyWord);
	if(isDefined(delKeyWord) == true){
		var rtDel = MOBILE_COMMON_FUN.delMemberSearchHistory(delKeyWord);
		if(rtDel == 'ALL'){
			$('.recent-search-keyword').find('.recent-search-keyword-list').empty();
			$('.search-input-data.recent-search-keyword').removeClass('has-keyword');
		}else if(rtDel == true){
			$(thisEle).parent('.recent-list-item').remove();
			if($('.recent-search-keyword-list').find('.recent-list-item').length < 1){
				$('.recent-search-keyword').find('.recent-search-keyword-list').empty();
				$('.search-input-data.recent-search-keyword').removeClass('has-keyword');
			}
		}
	}
};

//최근 검색어 적용
MOBILE_PAGE.search_form.setSearchHistoryKeyword = function(thisEle){
	console.log('MOBILE_PAGE.search_form.delSearchHistoryKeyword');
	var setKeyWord = $(thisEle).data('kw');
	console.log('setKeyWord', setKeyWord);
	if(isDefined(setKeyWord) == true){
		if(setKeyWord.length < 2){
			disk_alert('검색어는 2자 이상 입력해주세요.');
			return;
		}
		$('#disk_search_form_keyword').val(setKeyWord);
		MOBILE_PAGE.search_form.actionSearchForm('mobileDiskTopMainSearchForm');
	}
	return;
};


//검색 키워드 초기화
MOBILE_PAGE.search_form.resetSearchKeyword = function(){
	console.log('MOBILE_PAGE.search_form.resetSearchKeyword');
	var $targetSearchForm = $('#mobileDiskTopMainSearchForm');
	
	//del btn
	$('.search-form-container').addClass('clear');
	$('#disk_search_form_keyword').val('');
		
};

//자동완성에서 텍스트 추가  클릭
MOBILE_PAGE.search_form.onclickAutoCompleteItmeUp = function(thisEle){
	console.log('MOBILE_PAGE.search_form.onclickAutoCompleteItmeUp');
	if(isDefined(thisEle) == false){
		return;
	}
	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.val) == false){
		return;
	}
	
	var inputKeyWord = $('#disk_search_form_keyword').val();
	var newInputKeyword = $.trim(inputKeyWord)+$.trim(eleData.val);
	$('#disk_search_form_keyword').val(newInputKeyword);
};


MOBILE_PAGE.search_form.bindingAutoCompleted = function(){
	console.log('MOBILE_PAGE.search_form.bindingAutoCompleted');	
	var $targetSearchForm = $('#mobileDiskTopMainSearchForm');
	if(isDefined($targetSearchForm) == false || $targetSearchForm.length < 1){
		console.log('form id empty');
		return;
	}
	
	var isPageLoaded = false;
	var formEleData = $targetSearchForm.data();
	console.log('formEleData', formEleData);
	
	if(formEleData.loaded == 1){
		isPageLoaded = true;
		console.log('loaeded already  form');
		return;
	}
	console.log('isPageLoaded', isPageLoaded);
	
			
	
	
	//검색어 취소 버튼
	var $delResetSearchKeywordBtnEle = $targetSearchForm.find('.mobile-del-keyword-btn');
	if($delResetSearchKeywordBtnEle.length > 0){
		$delResetSearchKeywordBtnEle.unbind( "click");
		$delResetSearchKeywordBtnEle.bind( "click", function() {
			console.log('clear search keyword');
			console.log($targetSearchForm.data());
			if($targetSearchForm.data('auto') == 1){
				//$('.search-form-container').addClass('clear');
				MOBILE_PAGE.search_form.resetSearchKeyword();
			}else{
				$(this).hide();
				MOBILE_PAGE.search_form.resetSearchKeyword();
			}
			
		});	
	}
	
	//자동완겅 끄기
	if(isDefined(formEleData.auto)){
		if(formEleData.auto != 1){
			$targetSearchForm.data('loaded', 1);
			isPageLoaded = true;
			MOBILE_PAGE.search_form.bindKeydown();
			return;
		}
	}
	
	//MOBILE_PAGE.search_form.bindKeydown();
	//return;
	//return;
	
	var options = {
		url: function(phrase) {
			return DISK_PROTOCOL.ONPLAY_URL.SEARCH.AUTO_CONTEST_LIST;
		},
		
		getValue: function(element) {
			return element.name;
		},
		
		ajaxSettings: {
			dataType: "jsonp",
			method: "POST",
			data: {
			  dataType: "json"
			}
		},
		
		preparePostData: function(data) {
			data.phrase = $("#disk_search_form_keyword").val();
			return data;
		},
		
		requestDelay: 400,
		minCharNumber	: 2,	
		//getValue: "name",
	
		template: {
			type: "custom",
			method: function(value, item) {
				 var rtHtml ='<span class="word">'+value+'</span>';
					rtHtml +='<span class="btn_input search-auto-item-icon" data-val="'+value+'"></span>';
				return rtHtml;
			}
		},
		
		list: {
			
			maxNumberOfElements: 10,
			match: {
				enabled: false
			},
			sort: {
				enabled: true
			},
			onSelectItemEvent: function() {
				console.log("onSelectItemEvent !");
			},
			onLoadEvent: function($inputEle) {
				console.log("onLoadEvent !");
				console.log($inputEle);
				if(isDefined($inputEle)){
					if(isDefined($inputEle.val()) == false){
						console.log('empty key')
						$('.search-form-container').addClass('clear');
					}else{
						$('.search-form-container.clear').removeClass('clear');
					}
				}
			},
			onClickEvent: function(e) {
				console.log("Click !");
				console.log(e);
				MOBILE_PAGE.search_form.actionSearchForm('mobileDiskTopMainSearchForm');
			},
			onKeyEnterEvent: function() {
				console.log("onKeyEnterEvent !");
			},
			onMouseOverEvent: function() {
				console.log("onMouseOverEvent !");
			},
			onMouseOutEvent: function() {
				console.log("onMouseOutEvent !");
			},
			onShowListEvent: function() {
				console.log("onShowListEvent !");
				$(".search-auto-item-icon").unbind("click");
				$(".search-auto-item-icon").bind("click", function(e) {
					console.log(e);
					e.stopPropagation();
					console.log('search-auto-item-icon');
					console.log($(this));
					MOBILE_PAGE.search_form.onclickAutoCompleteItmeUp($(this));
				});
				
				//$('.search-form-container.clear').removeClass('clear');
				
			},
			onHideListEvent: function($inputEle, $elementsContainer) {
				console.log("onHideListEvent !");
				console.log($inputEle);
				console.log($elementsContainer);
				
				if(isDefined($inputEle)){
					var searchKeyStr = $inputEle.val();
					if(isDefined(searchKeyStr) == false){
						console.log('empty key')
						$('.search-form-container').addClass('clear');
					}
					/*
					if(isDefined(searchKeyStr)){
						var searchKeyLen = searchKeyStr.length;
						console.log('searchKeyLen', searchKeyLen);	
					}
					*/
				
				}
			}
		}
	};
	
	
	//자동완성은 일단 끕니다.
	//var searchAutoComplete = $("#disk_search_form_keyword").easyAutocomplete(options);
	//console.log(searchAutoComplete);
	
	
	if(isDefined($targetSearchForm)){
		$targetSearchForm.data('loaded', 1);
		isPageLoaded = true;
	}
	
};

//검색 키워드 input binding
MOBILE_PAGE.search_form.bindKeydown = function() {
	console.log('MOBILE_PAGE.search_form.bindKeydown');
	//console.log('bindKeydown');
	var $easyAutocompleteEle = $('#disk_search_form_keyword'); 
	$easyAutocompleteEle
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
				$('.mobile-del-keyword-btn').hide();
			}else{
				$('.mobile-del-keyword-btn').show();
			}
			
    	})
		.keyup(function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
			}
			console.log('keyup fun');
			var searchKeyStr = $(this).val();
			console.log('searchKeyStr', searchKeyStr);
			
		});
};
			
			
//자동 완성 끄기
MOBILE_PAGE.search_form.onclickAutoCompletedOff = function(){
	console.log('MOBILE_PAGE.search_form.onclickAutoCompletedOff');
	var $targetSearchForm = $('#mobileDiskTopMainSearchForm');
	if(isDefined($targetSearchForm) == false || $targetSearchForm.length < 1){
		console.log('form id empty');
		return;
	}
	//un binding input
	var easyAutocompleteEle = $('#disk_search_form_keyword'); 
	easyAutocompleteEle.unwrap().off("keyup").off("keydown").off("focus").off("blur");
	$('.easy-autocomplete').removeClass('easy-autocomplete');
	$('#mobile-autocomplete-list-container').empty();
	$('.autocomplete-search-keyword').hide();
	
	//키다운 바인딩
	MOBILE_PAGE.search_form.bindKeydown();
	
	$targetSearchForm.data('auto', 0);
};


//최근 검색어, 인기 검색어,  닫기
MOBILE_PAGE.search_form.onclickCloseFavSearchKeyword = function(thisEle){
	console.log('MOBILE_PAGE.search_form.onclickCloseFavSearchKeyword');
	var eleData = $(thisEle).data();
	if(isDefined(eleData) == false){ return;}
	if(isDefined(eleData.target) == false){ return;}
	var $targetEle = $('.'+eleData.target);
	if($targetEle.length > 0){
		$targetEle.toggleClass('show');
	}
};


MOBILE_PAGE.search_form.pageInit = function(pageInfo, params){
	console.log('MOBILE_PAGE.search_form.pageInit');
	
	//page top
	utility.ui.goToElement('.mobile-container search-form-container');
	
	$targetContainerEle = $('#'+pageInfo.target);
	if($targetContainerEle.length < 1){
		return;
	}
	var targetData = $targetContainerEle.data();
	console.log('targetData', targetData);
	
	if(targetData.loaded == 1){
		isPageLoaded = true;
	}
	
	
	//초기화
	MOBILE_PAGE.search_form.resetSearchKeyword();
	
	MOBILE_PAGE.search_form.defaultBinding();
}





