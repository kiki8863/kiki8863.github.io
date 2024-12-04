/*
*	channel movie
*/
//alert('channel movie');
MOBILE_PAGE.channel_search = {};
MOBILE_PAGE.channel_search.DATA = {
	MAIN		: null,
	SUB			: null,
	KEY_WROD	: null,
	FILTER		: null,
	LAST_HASH	: null,
	SELECT_IDX	: null, 		
	
	ELE	: {
		channel_list 	: '.mobile-channel-search-list-wrap',
		info			: '.channel-search-page-end-spy'
	},
	
	
};

MOBILE_PAGE.channel_search.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.channel_search.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.channel_search.init(showContainerInfo, hashPrams);
	
}

MOBILE_PAGE.channel_search.defaultBinding = function(){
	console.log('MOBILE_PAGE.channel_search.defaultBinding');	
	
	MOBILE_COMMON.CHANNEL.searchBinding();
};


//마지막 선택 영화채널로 이동
MOBILE_PAGE.channel_search.setLastClickMovieContentsFocus = function(){
	console.log('MOBILE_PAGE.channel_search.setLastClickMovieContentsFocus');	
	console.log(MOBILE_PAGE.channel_search.DATA.SELECT_IDX);
	var topOff = 65;
	if(MOBILE_PAGE.channel_search.DATA.SELECT_IDX){
		//var targetContentsEleName = '#mobile-theme-wrap-'+MOBILE_PAGE.channel_search.DATA.SELECT_IDX;
		var targetContentsEleName = '#channel-search-list-item-'+MOBILE_PAGE.channel_search.DATA.SELECT_IDX;
		console.log('targetContentsEleName', targetContentsEleName);
		if($(targetContentsEleName).length > 0){
			$('.mobile-channel-theme-list.active').removeClass('active');
			$(targetContentsEleName).addClass('active');
			utility.ui.goToElement(targetContentsEleName, 50, topOff);	
		}
		
	}
};

		
MOBILE_PAGE.channel_search.init = function(info, params){
	console.log('MOBILE_PAGE.channel_search.init');	
	console.log(params);
	MOBILE_PAGE.channel_search.defaultBinding();
	
	console.log('MOBILE_PAGE.channel_search.DATA.LAST_HASH', MOBILE_PAGE.channel_search.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	
	var actionType = params['!action'];
	var searchKeyword = params['k'];
	var actionSub = '';
	var subType = params['sub'];
	if(actionType != 'channel_search'){
		console.log('action type err');
		return;
	}
	var isSearchChannel = false;
	if(isDefined(searchKeyword) == true){
		isSearchChannel = true;
	}else{
		searchKeyword = '';
	}
	$('#mobileChannelContentsSearchForm-search_keyword').val(searchKeyword);
	
	if(isSearchChannel != true){
		console.log('empty search key');
		GO_TOP_SP_CATEGORY(91000);
		return;
	}
	
	//console.log('MOBILE_PAGE.movie.DATA.LAST_HASH', MOBILE_PAGE.movie.DATA.LAST_HASH);
	//console.log('location.hash', location.hash);
	var $innerEle = $(info.m_list);
	if($innerEle.length < 1){
		$innerEle = $(MOBILE_PAGE.channel_search.DATA.ELE.channel_list);
	}
	console.log($innerEle);
	
	//해시가 같아도 재검색
	if(MOBILE_PAGE.channel_search.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		/*
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.channel_search.setSearchChannelPage(searchKeyword);	
		}
		MOBILE_PAGE.channel_search.setLastClickMovieContentsFocus();
		*/
		//return;
	}else{
		//GO_TOP();
	}
	
	MOBILE_PAGE.channel_search.setSearchChannelPage(searchKeyword);
	
	return;
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.channel_search.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.channel_search.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};


//영화채널 데이타 가져오기 : 검색
MOBILE_PAGE.channel_search.setSearchChannelPage = function(searchKeyword){
	console.log('MOBILE_PAGE.channel_search.setSearchChannelPage:',searchKeyword);	
	
	var $channelSearchFormEle = $('#mobileChannelContentsSearchForm');
	if($channelSearchFormEle.length < 1){
		console.log('empty search form');
		MOBILE_PAGE.channel_search.setChannelMoviePage(1);
		return;
	}
	
	if(isDefined(searchKeyword) == false || searchKeyword.length < 2){
		disk_alert('검색하실 영화채널의 키워드를 2자 이상 입력해주세요.');
		//$channelSearchFormEle.find('input[name=k]').focus();
		return;
	}

 	var sendData = {
 		k 	:	searchKeyword,
 		fc	:	'',
 		sc	:	'',  
 		a	: 	'on',
 		d	: 	'on',
 		t	: 	'on',
 		sub	:	'A',
		is_mobile	: 1,
 		channel_type	: 'movie',
 		
 	};
 
	console.log('sendData', sendData);
	
	
	//channel_search_list
	var successChannelSearchResult = function(data){
		console.log('successThemeSearchResult');
		console.log(data);
		
		//non result
		$('.mobile-channel-search-keyword').text(sendData.k);
		
		//var innerEle = MOBILE_PAGE.channel_search.DATA.ELE.channel_list;
		var $infoEle = $(MOBILE_PAGE.channel_search.DATA.ELE.info);
		var mData = null;
		var mPage = 1;
		var lCnt = 0;
		var $innerEle = null;
		if(isDefined(data.channel_search_list)){
			console.log('has channel_search_list');
			 
			var mListData = data.channel_search_list;
			var mvListHtml = null;
			var offSetList = utility.getMobileDeviceChannelListSize();
			var lCnt = 0;
			var sList = null;
			for(var g in mListData){
				sList = mListData[g];
				mvListHtml = [];
				$innerEle = $(MOBILE_PAGE.channel_search.DATA.ELE.channel_list+'.'+g+'-list');
				for(var i in sList){
					if(sList[i].IS_BROADCAST == 1){
						offSetList = {width:120, height :172};
					}
					mvListHtml.push(MOBILE_TEMPLETE.PAGE.getSearchChannelMobileHtml(sList[i], offSetList));	
				}
				if(mvListHtml.length > 0){
					$innerEle.html(mvListHtml.join(''));
				}
				
				lCnt++;
			}

			//정보 업데이트
			var updateData = sendData;
			updateData.loaded = 1;
			updateData.page = 1;
			updateData['total_count'] = 1;	
			updateData['total_page'] = 1;
			
			$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
			
			if(lCnt > 0){
				$('.channel-search-no-result').removeClass('no-data');
				MOBILE_PAGE.channel_search.dataAfterBinding();
			}else{
				$infoEle.data({page :1,loaded : 1, total_page:1}).removeClass('loading').addClass('ending');
			}
		}else{
			$infoEle.data({page :1,loaded : 1, total_page:1}).removeClass('loading').addClass('ending');
			
		}
		if(mPage == 1 && lCnt < 1){
			$('.channel-search-no-result').addClass('no-data');
		}
		
		//save hash
		MOBILE_PAGE.channel_search.DATA.LAST_HASH = location.hash;
		
		if(isDefined(data.search_keyword)){
			MOBILE_PAGE.channel_search.DATA.KEY_WROD = data.search_keyword;
		}
		
		MOBILE_PAGE.channel_search.setLastClickMovieContentsFocus();
	};
	
	MOBILE_COMMON.CHANNEL.searchAction(sendData, successChannelSearchResult);
	return;

};






//채널 - 포스터 클릭
MOBILE_PAGE.channel_search.onclickChannelContentsItem = function(thisEle){
	console.log('MOBILE_PAGE.channel_search.onclickThemeContentsItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.idx)){
		MOBILE_PAGE.channel_search.DATA.SELECT_IDX = eleData.idx;
	}
	GO_CHANNEL_VIEW(thisEle);
	/*
	if(isDefined(eleData.url)){
		if(isDefined(eleData.idx)){
			MOBILE_PAGE.channel_search.DATA.SELECT_IDX =	eleData.idx;
		}
		//location.hash = eleData.url;
	}
	*/
	
};

