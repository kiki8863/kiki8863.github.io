/*
*	channel theme
*/

MOBILE_PAGE.theme = {};
MOBILE_PAGE.theme.DATA = {
	CAT1		: null,
	LAST_HASH	: null,
	SELECT_THEME	: null, 		//마지막 클릭 테마
	ELE	: {
		theme_list 	: '.mobile-channel-theme-list-wrap',
		info		: '.channel-theme-page-end-spy'
	}
	
};

MOBILE_PAGE.theme.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.theme.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.theme.init(showContainerInfo, hashPrams);
	
}

MOBILE_PAGE.theme.defaultBinding = function(){
	console.log('MOBILE_PAGE.theme.defaultBinding');
	
	MOBILE_COMMON.CHANNEL.searchBinding();	
};

//마지막 선택 테마로 이동
MOBILE_PAGE.theme.setLastClickThemeContentsFocus = function(){
	console.log('MOBILE_PAGE.theme.setLastClickThemeContentsFocus');	
	var topOff = 65;
	if(MOBILE_PAGE.theme.DATA.SELECT_THEME){
		var targetContentsEleName = '#mobile-theme-wrap-'+MOBILE_PAGE.theme.DATA.SELECT_THEME;
		console.log('targetContentsEleName', targetContentsEleName);
		if($(targetContentsEleName).length > 0){
			$('.mobile-channel-theme-list.active').removeClass('active');
			$(targetContentsEleName).addClass('active');
			utility.ui.goToElement(targetContentsEleName, 50, topOff);	
		}
		
	}
};
		
		
MOBILE_PAGE.theme.init = function(info, params){
	console.log('MOBILE_PAGE.theme.init');	
	console.log(params);
	MOBILE_PAGE.theme.defaultBinding();
	
	console.log('MOBILE_PAGE.theme.DATA.LAST_HASH', MOBILE_PAGE.theme.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	
	var actionType = params['!action'];
	var searchKeyword = params['k'];
	if(actionType != 'theme'){
		console.log('action type err');
		return;
	}
	var isSearchTheme = false;
	if(isDefined(searchKeyword) == true){
		isSearchTheme = true;
	}else{
		searchKeyword = '';
	}
	$('#mobileChannelContentsSearchForm-search_keyword').val(searchKeyword);
	
	var $innerEle = $(info.m_list);
	if($innerEle.length < 1){
		$innerEle = $(MOBILE_PAGE.theme.DATA.ELE.theme_list);
	}
	var startPage = 1;
	if(MOBILE_PAGE.theme.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			if(isSearchTheme){
				MOBILE_PAGE.theme.setSearchThemePage();
			}else{
				MOBILE_PAGE.theme.setThemePage(startPage);	
			}
			
		}
		
		MOBILE_PAGE.theme.setLastClickThemeContentsFocus();
		return;
	}
	
	MOBILE_PAGE.theme.DATA.SELECT_THEME = null;
	if(isSearchTheme){
		MOBILE_PAGE.theme.setSearchThemePage(searchKeyword);
	}else{
		MOBILE_PAGE.theme.setThemePage(startPage);	
	}
	
	
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.theme.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.theme.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};


//테마 데이타 가져오기 : 검색
MOBILE_PAGE.theme.setSearchThemePage = function(searchKeyword){
	console.log('MOBILE_PAGE.theme.setSearchThemePage:',searchKeyword);	
	
	var $channelSearchFormEle = $('#mobileChannelContentsSearchForm');
	if($channelSearchFormEle.length < 1){
		console.log('empty search form');
		MOBILE_PAGE.theme.setThemePage(1);
		return;
	}
	
	if(isDefined(searchKeyword) == false || searchKeyword.length < 2){
		disk_alert('검색하실 테마의 키워드를 2자 이상 입력해주세요.');
		//$channelSearchFormEle.find('input[name=k]').focus();
		return;
	}

 	var sendData = {
 		k 	:	searchKeyword,
 		fc	:	'',
 		sc	:	'',  
 		th	: 	'on',
 		is_mobile	: 1,
 		channel_type	: 'theme'
 	};
 
	console.log('sendData', sendData);
	
	
	
	var successThemeSearchResult = function(data){
		console.log('successThemeSearchResult');
		console.log(data);
		
		//non result
		$('.mobile-channel-search-keyword').text(sendData.k);
		
		var $innerEle = $(MOBILE_PAGE.theme.DATA.ELE.theme_list);
		var $infoEle = $(MOBILE_PAGE.theme.DATA.ELE.info);
		var tmData = null;
		var themePage = 1;
		var lCnt = 0;
		if(isDefined(data.channel_theme_list)){
			console.log('has channel_theme_list');
			var tmListData = data.channel_theme_list;
			var mvListHtml = [];
			for(var i in tmListData){
				mvListHtml.push(MOBILE_TEMPLETE.PAGE.mobileChannelThemeListHtml(tmListData[i]));
				lCnt++;
			}
			console.log('mvListHtml', mvListHtml);
			//페이지 상단으로 이동
			//utility.ui.goToElement('.l_content_wrap');
			$innerEle.html(mvListHtml.join(''));
			
			
			//정보 업데이트
			var updateData = sendData;
			updateData.loaded = 1;
			updateData.page = 1;
			updateData['total_count'] = 1;	
			updateData['total_page'] = 1;
			
			$infoEle.data({page :themePage,loaded : themePage, total_page:themePage}).removeClass('loading').addClass('ending');
			
			if(lCnt > 0){
				$('.channel-search-no-result').removeClass('no-data');
				MOBILE_PAGE.theme.dataAfterBinding();
			}else{
				$infoEle.data({page :1,loaded : 1, total_page:1}).removeClass('loading').addClass('ending');
			}
		}else{
			$infoEle.data({page :1,loaded : 1, total_page:1}).removeClass('loading').addClass('ending');
			
		}
		
		
		if(themePage == 1 && lCnt < 1){
			$('.channel-search-no-result').addClass('no-data');
		}
		
		//save hash
		MOBILE_PAGE.theme.DATA.LAST_HASH = location.hash;
		
		
		
	}
	
	MOBILE_COMMON.CHANNEL.searchAction(sendData, successThemeSearchResult);
	return;

};




//테마 데이타 가져오기 : 페이지
MOBILE_PAGE.theme.setThemePage = function(nextPage){
	console.log('MOBILE_PAGE.theme.setThemePage:',nextPage);	
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
	
	var $infoEle = $(MOBILE_PAGE.theme.DATA.ELE.info);
	if($infoEle.length < 0){
		console.log('non info ele');
		return;
	}
	var infoEleData = $infoEle.data();
 	var sendData = {
 		page 			:	nextPage,
 		limit			: 	null,
 		adult_block		: 0,
 		theme_category	: ''
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.cate1)){
			sendData.theme_category = infoEleData.cate1;	
		}
	}
	
	
	
	
	console.log('sendData', sendData);
	MOBILE_PAGE.theme.getThemeContentsData(sendData, $infoEle);
	
	
	return;

};



//get getThemeContentsData
MOBILE_PAGE.theme.getThemeContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.theme.getThemeContentsData', getData);
	
	var sendData = {
		c			: '',		//cate1
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 1,		//is mobile
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = $(MOBILE_PAGE.theme.DATA.ELE.info);
	}
	
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['block_adult'])){ sendData.ba = getData.block_adult; }
		if(isDefined(getData['theme_category'])){ sendData.c = getData.theme_category; }
	}
	console.log('sendData', sendData);
	
	var $innerEle = $(MOBILE_PAGE.theme.DATA.ELE.theme_list);
	
	var successFunGetThemeContentsList = function(data){
		console.log('successFunGetThemeContentsList', data);
		
		
		var tmData = null;
		var themePage = 0;
		if(isDefined(data.channel_theme_list)){
			
			var tmData = data.channel_theme_list;
			var tmListData = tmData.theme_list;
			var mvListHtml = [];
			var lCnt = 0;
			for(var i in tmListData){
				mvListHtml.push(MOBILE_TEMPLETE.PAGE.mobileChannelThemeListHtml(tmListData[i]));
				lCnt++;
			}
			themePage = parseInt(tmData.page);
			//console.log('mvListHtml', mvListHtml);
			//페이지 상단으로 이동
			//utility.ui.goToElement('.l_content_wrap');
			$innerEle.append(mvListHtml.join(''));
			
			
			//정보 업데이트
			var updateData = sendData;
			updateData.loaded = 1;
			updateData.cate1 = tmData.cate1;
			if(tmData.page == 1){
				if(isDefined(tmData.page)){
					updateData['page'] = tmData.page;	
				}
				if(isDefined(tmData.total_count)){
					updateData['total_count'] = tmData.total_count;	
				}
				if(isDefined(tmData.total_page)){
					updateData['total_page'] = tmData.total_page;	
				}
				if(isDefined(tmData.limit)){
					updateData['limit'] = tmData.limit;	
				}
			}
			
			//save cache
			MOBILE_PAGE.theme.DATA.CAT1	= updateData.cate1;
			
			//save paging
			if(lCnt > 0){
				updateData.loaded = themePage;
				$infoEle.data(updateData).addClass('loading').removeClass('ending');
			}else{
				$infoEle.data({page :themePage,loaded : themePage, total_page:themePage}).removeClass('loading').addClass('ending');
			}

		}
		
		//상태 테마 키워드
		var $topThemeTagEle = $('.mobile-channel-theme-top-tags-wrap');
		//$('.mobile-channel-theme-top-tags').removeClass('has-keyword');
		if(themePage == 1 && isDefined(data.channel_theme_tag_list) == true){
			var themeTagHtml = [];
			if(data.channel_theme_tag_list.length > 0){
				for(var ti = 0; ti < data.channel_theme_tag_list.length; ti++){
					themeTagHtml.push(MOBILE_TEMPLETE.PAGE.mobileChannelThemeTopThemeTagHtml(data.channel_theme_tag_list[ti]));	
				}
			}
			$topThemeTagEle.html(themeTagHtml.join(''));
			$('.mobile-channel-theme-top-tags').addClass('has-keyword');
		}
		
		//save hash
		MOBILE_PAGE.theme.DATA.LAST_HASH = location.hash;
		
		MOBILE_PAGE.theme.dataAfterBinding();
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.THEME.THEME_LIST,
		data		: formData,
		success_fun	: successFunGetThemeContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//테마 더보기 클릭
MOBILE_PAGE.theme.onclickMoreMobileTheme = function(thisEle){
	console.log('MOBILE_PAGE.theme.onclickMoreMobileTheme');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	
	var loadedPage = 1;
	var totalPage = 1;
	if(isDefined(eleData.page)){
		loadedPage = parseInt(eleData.page);
	}
	if(isDefined(eleData.total_page)){
		var totalPage = parseInt(eleData.total_page);
	}
	var nextPage = loadedPage + 1;
	if(nextPage > totalPage){
		console.log('max page');
		return;
	}
	MOBILE_PAGE.theme.setThemePage(nextPage);
};


//테마 - 포스터 클릭
MOBILE_PAGE.theme.onclickThemeContentsItem = function(thisEle){
	console.log('MOBILE_PAGE.theme.onclickThemeContentsItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.url)){
		if(isDefined(eleData.idx)){
			MOBILE_PAGE.theme.DATA.SELECT_THEME =	eleData.idx;
		}
		location.hash = eleData.url;
	}
	
};

