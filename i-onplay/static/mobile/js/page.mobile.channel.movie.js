/*
*	channel movie
*/
//alert('channel movie');
MOBILE_PAGE.movie = {};
MOBILE_PAGE.movie.DATA = {
	MAIN		: null,
	SUB			: null,
	FILTER		: null,
	LAST_HASH	: null,
	SELECT_MOVIE	: null, 		//마지막 클릭 영화채널
	ELE	: {
		movie_list 	: '.mobile-channel-movie-list-wrap',
		info		: '.channel-movie-page-end-spy'
	},
	
	
};

MOBILE_PAGE.movie.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.movie.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.movie.init(showContainerInfo, hashPrams);
	
}

MOBILE_PAGE.movie.defaultBinding = function(){
	console.log('MOBILE_PAGE.movie.defaultBinding');	
	
	MOBILE_COMMON.CHANNEL.searchBinding();
};


//마지막 선택 영화채널로 이동
MOBILE_PAGE.movie.setLastClickMovieContentsFocus = function(){
	console.log('MOBILE_PAGE.movie.setLastClickMovieContentsFocus');	
	
	var activeItem = $('.channel-list-item.channel-movie-list-item.active');
	if(activeItem.length > 0){
		var topOff = 65;
		utility.ui.goToElement('.channel-list-item.channel-movie-list-item.active', 50, topOff);
	}else{
		GO_TOP();	
	}
	
	return;
	/*
	var topOff = 65;
	if(MOBILE_PAGE.movie.DATA.SELECT_MOVIE){
		var targetContentsEleName = '#mobile-theme-wrap-'+MOBILE_PAGE.movie.DATA.SELECT_MOVIE;
		console.log('targetContentsEleName', targetContentsEleName);
		if($(targetContentsEleName).length > 0){
			$('.mobile-channel-theme-list.active').removeClass('active');
			$(targetContentsEleName).addClass('active');
			utility.ui.goToElement(targetContentsEleName, 50, topOff);	
		}
	}
	*/
};
		
		
MOBILE_PAGE.movie.init = function(info, params){
	console.log('MOBILE_PAGE.movie.init');	
	console.log(params);
	MOBILE_PAGE.movie.defaultBinding();
	
	console.log('MOBILE_PAGE.movie.DATA.LAST_HASH', MOBILE_PAGE.movie.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	var channelType = 'movie';
	var actionType = params['!action'];
	var searchKeyword = params['k'];
	var actionSub = '';
	var subType = params['sub'];
	var channelIdx = params['idx'];
	if(actionType != channelType){
		console.log('action type err');
		return;
	}
	
	console.log('channelIdx', channelIdx);
	if(isDefined(channelIdx) == true){
		console.log('m view');
		if($.isNumeric(channelIdx)){
			location.hash = '#!action=channel_view&type=movie&idx='+channelIdx;
			//return;
			//MOBILE_COMMON.openMobileChannelContentsView(channelType, channelIdx, 1);
			return;
		}
	}
	
	
	if(isDefined(searchKeyword) == true){
		MOBILE_COMMON.CHANNEL.goChannelSearch(searchKeyword);
		return;
	}
	$('#mobileChannelContentsSearchForm-search_keyword').val(searchKeyword);
	
	console.log('subType', subType);
	if(isDefined(subType) == true){
		var $subCateInfoEle = $('.channel-movie-sub-category');
		if($subCateInfoEle.length > 0){
			//$subCateInfoEle.data('val', subType).toggleClass('active');
			//console.log($subCateInfoEle.find('.deep-sub-'+subType).text());
			var $subDeepEle = $subCateInfoEle.find('.deep-sub-'+subType);
			if($subDeepEle.length > 0){
				$subCateInfoEle.find('.sub-tit').text($.trim($subDeepEle.text()));
				actionSub = subType;
				$('.mobile-channel-movie-title-wrap').text($subDeepEle.text());
			}
		}
	}
	
	
	var $innerEle = $(info.m_list);
	if($innerEle.length < 1){
		$innerEle = $(MOBILE_PAGE.movie.DATA.ELE.movie_list);
	}
	var startPage = 1;
	console.log('MOBILE_PAGE.movie.DATA.LAST_HASH', MOBILE_PAGE.movie.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	//set scroll type
	MOBILE_COMMON_SCROLL.DATA.ACTION = channelType;
	
	if(MOBILE_PAGE.movie.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.movie.setChannelMoviePage(startPage, actionSub);	
		}
		MOBILE_PAGE.movie.setLastClickMovieContentsFocus();
		return;
	}else{
		GO_TOP();
	}
	
	MOBILE_PAGE.movie.DATA.SELECT_MOVIE = null;
	MOBILE_PAGE.movie.setChannelMoviePage(startPage, actionSub);	
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.movie.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.movie.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};


//영화채널 데이타 가져오기 : 페이지
MOBILE_PAGE.movie.setChannelMoviePage = function(nextPage, subType){
	console.log('MOBILE_PAGE.movie.setChannelMoviePage:',nextPage);
	console.log('subType', subType);	
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
	
	var $infoEle = $(MOBILE_PAGE.movie.DATA.ELE.info);
	if($infoEle.length < 0){
		console.log('non info ele');
		return;
	}
	var infoEleData = $infoEle.data();
 	var sendData = {
 		page 			:	nextPage,
 		adult_block		: 0,
 		category		: 11000,
 		sub				: ''
 	};
 	
 	
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.sub)){
			sendData.sub = infoEleData.sub;	
		}
		
	}
	
	if(isDefined(subType)){
		if(subType.length == 1){
			sendData.sub = subType;	
			console.log('subType', subType);
		}
	}
	
	
	console.log('sendData', sendData);
	MOBILE_PAGE.movie.getMovieContentsData(sendData, $infoEle);
	
	
	return;

};



//get getMovieContentsData
MOBILE_PAGE.movie.getMovieContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.movie.getMovieContentsData', getData);
	
	var sendData = {
		c			: '',		//cate1
		l			: 20,		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 1,		//is mobile
		my			: '',
		mn			: '',
		mg			: '',
		is_hot			: '',
		is_new			: '',
		is_event		: '',
		is_top			: '',
		sub			: '',
		
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = $(MOBILE_PAGE.movie.DATA.ELE.info);
	}
	
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['block_adult'])){ sendData.ba = getData.block_adult; }
		if(isDefined(getData['category'])){ sendData.c = getData.category; }
		if(isDefined(getData['sub'])){ sendData.sub = getData.sub; }
	}
	console.log('sendData', sendData);
	
	var $innerEle = $(MOBILE_PAGE.movie.DATA.ELE.movie_list);
	
	var successFunGetMovieContentsList = function(data){
		console.log('successFunGetMovieContentsList', data);
		
		
		var mData = null;
		var mPage = 0;
		if(isDefined(data.channel_movie_list)){
			
			
			
			
			var offSetList = utility.getMobileDeviceChannelListSize();
			var mData = data.channel_movie_list;
			var mListData = mData.list;
			var mvListHtml = [];
			var lCnt = 0;
			for(var i in mListData){
				var mRank = new Movie_rank(lCnt);
				mRank.setData(mListData[i]);
				mRank.m_width = offSetList.width;
				mRank.m_height =  offSetList.height;
				//console.log(mRank);
				mvListHtml.push(mRank.getRankMovieMobileHtml());
				lCnt++;
			}
			mPage = parseInt(mData.page);
			//console.log('mvListHtml', mvListHtml);
			
			if(data.page == 1){
				$innerEle.html(mvListHtml.join(''));
			}else{
				$innerEle.append(mvListHtml.join(''));
			}
			
			
			//정보 업데이트
			var updateData = sendData;
			updateData.loaded = 1;
			updateData.cate1 = mData.cate1;
			var isTopRank = false;
			if(mData.page == 1){
				if(isDefined(mData.page)){
					updateData['page'] = mData.page;	
				}
				if(isDefined(mData.total_count)){
					updateData['total_count'] = mData.total_count;	
				}
				if(isDefined(mData.total_page)){
					updateData['total_page'] = mData.total_page;	
				}else{
					isTopRank = true;
				}
				if(isDefined(mData.limit)){
					updateData['limit'] = mData.limit;	
				}
				
			}
			if(isDefined(data.sub)){
				updateData['sub'] = data.sub;
				MOBILE_PAGE.movie.DATA.SUB	= data.sub;
			}
			
			//save cache
			MOBILE_PAGE.movie.DATA.MAIN	= sendData.c;
						
			
			if(isDefined(data.data)){
				MOBILE_PAGE.movie.DATA.FILTER = data.data;
			}
			
			//save paging
			if(lCnt > 0){
				updateData.loaded = mPage;
				$infoEle.data(updateData).addClass('loading').removeClass('ending');
			}else{
				$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
			}
			
			//랭킹은 다음이 없음
			if(isTopRank == true){
				$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
			}
			
		}else{
			$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
		}
	

	
		
		//save hash
		MOBILE_PAGE.movie.DATA.LAST_HASH = location.hash;
		
		MOBILE_PAGE.movie.dataAfterBinding();
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MOVIE.MOVIE_LIST,
		data		: formData,
		success_fun	: successFunGetMovieContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//영화채널 더보기 클릭
MOBILE_PAGE.movie.onclickMoreMobileMovie = function(thisEle){
	console.log('MOBILE_PAGE.movie.onclickMoreMobileMovie');
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
		$(thisEle).data({page :loadedPage,loaded : loadedPage, total_page:loadedPage}).removeClass('loading').addClass('ending');
		return;
	}
	MOBILE_PAGE.movie.setChannelMoviePage(nextPage);
};


//영화채널 - 포스터 클릭
MOBILE_PAGE.movie.onclickThemeContentsItem = function(thisEle){
	console.log('MOBILE_PAGE.movie.onclickThemeContentsItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.url)){
		if(isDefined(eleData.idx)){
			MOBILE_PAGE.movie.DATA.SELECT_MOVIE =	eleData.idx;
		}
		location.hash = eleData.url;
	}
	
};



//영화채널 - 서브 카테고리 클릭
MOBILE_PAGE.movie.onclickChannelMovieCategoryItem = function(thisEle){
	console.log('MOBILE_PAGE.movie.onclickChannelMovieCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	var $subCateInfoEle = $('.channel-movie-sub-category');
	if($subCateInfoEle.length > 0){
		$subCateInfoEle.data('val', eleData.val).toggleClass('active');
		$subCateInfoEle.find('.sub-tit').text($.trim($(thisEle).text()));
	}
	if(isDefined(eleData.val)){
		if(eleData.val == 'P'){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_LOGIN();
				return;
			}
			//성인인증 여부
			if(utility.disk.checkIsAdultMember() != true){
				GO_REAL_NAME();
				return;
			}
		}
		
		location.hash = '#!action=movie&sub='+eleData.val;	
	}
	
};