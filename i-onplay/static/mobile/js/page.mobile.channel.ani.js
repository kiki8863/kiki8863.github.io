/*
*	channel ani
*/


MOBILE_PAGE.ani = {};
MOBILE_PAGE.ani.DATA = {
	MAIN		: null,
	SUB			: null,
	FILTER		: null,
	LAST_HASH	: null,
	SELECT_ANI	: null, 		//마지막 클릭 방송채널
	ELE	: {
		ani_list 	: '.mobile-channel-ani-list-wrap',
		info		: '.channel-ani-page-end-spy'
	},


};

MOBILE_PAGE.ani.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.ani.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//MOBILE_COMMON.loginCheckBinding(1);


	MOBILE_PAGE.ani.init(showContainerInfo, hashPrams);

}

MOBILE_PAGE.ani.defaultBinding = function(){
	console.log('MOBILE_PAGE.ani.defaultBinding');

	MOBILE_COMMON.CHANNEL.searchBinding();
};


//마지막 선택 방송채널로 이동
MOBILE_PAGE.ani.setLastClickAniContentsFocus = function(){
	console.log('MOBILE_PAGE.ani.setLastClickAniContentsFocus');
	var topOff = 65;
	if(MOBILE_PAGE.ani.DATA.SELECT_ANI){
		var targetContentsEleName = '#mobile-theme-wrap-'+MOBILE_PAGE.ani.DATA.SELECT_ANI;
		console.log('targetContentsEleName', targetContentsEleName);
		if($(targetContentsEleName).length > 0){
			$('.mobile-channel-theme-list.active').removeClass('active');
			$(targetContentsEleName).addClass('active');
			utility.ui.goToElement(targetContentsEleName, 50, topOff);
		}

	}
};


MOBILE_PAGE.ani.init = function(info, params){
	console.log('MOBILE_PAGE.ani.init');
	console.log(params);
	MOBILE_PAGE.ani.defaultBinding();

	console.log('MOBILE_PAGE.ani.DATA.LAST_HASH', MOBILE_PAGE.ani.DATA.LAST_HASH);
	console.log('location.hash', location.hash);

	var channelType = 'ani';
	var actionType = params['!action'];
	var searchKeyword = params['k'];
	var actionMain = '';
	var mainType = params['main'];
	if(actionType != channelType){
		console.log('action type err');
		return;
	}
	if(isDefined(searchKeyword) == true){
		MOBILE_COMMON.CHANNEL.goChannelSearch(searchKeyword);
		return;
	}
	$('#mobileChannelContentsSearchForm-search_keyword').val(searchKeyword);

	console.log('mainType', mainType);
	if(isDefined(mainType) == true){
		var $subCateInfoEle = $('.channel-ani-sub-category');
		if($subCateInfoEle.length > 0){
			//$subCateInfoEle.data('val', subType).toggleClass('active');
			console.log($subCateInfoEle.find('.deep-sub-'+mainType).text());
			var $subDeepEle = $subCateInfoEle.find('.deep-sub-'+mainType);
			if($subDeepEle.length > 0){
				$subCateInfoEle.find('.sub-tit').text($.trim($subDeepEle.text()));
				actionMain = mainType;
				$('.mobile-channel-ani-title-wrap').text($subDeepEle.text());
			}
		}
	}


	var $innerEle = $(info.m_list);
	if($innerEle.length < 1){
		$innerEle = $(MOBILE_PAGE.ani.DATA.ELE.ani_list);
	}
	var startPage = 1;
	//set scroll type
	MOBILE_COMMON_SCROLL.DATA.ACTION = channelType;

	if(MOBILE_PAGE.ani.DATA.LAST_HASH == location.hash){
		console.log('same saved hash');
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.ani.setChannelAniPage(startPage, actionMain);
		}

		MOBILE_PAGE.ani.setLastClickAniContentsFocus();
		return;
	}

	MOBILE_PAGE.ani.DATA.SELECT_ANI = null;
	MOBILE_PAGE.ani.setChannelAniPage(startPage, actionMain);
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.ani.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.ani.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};


//방송채널 데이타 가져오기 : 페이지
MOBILE_PAGE.ani.setChannelAniPage = function(nextPage, actionMain){
	console.log('MOBILE_PAGE.ani.setChannelAniPage:',nextPage);
	console.log('actionMain', actionMain);
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

	var $infoEle = $(MOBILE_PAGE.ani.DATA.ELE.info);
	if($infoEle.length < 0){
		console.log('non info ele');
		return;
	}
	var infoEleData = $infoEle.data();
 	var sendData = {
 		page 			:	nextPage,
 		category		: 11000,
 		sub				: 'ANI',
 		mv_type			: null,
 	};

 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;
		}
		if(isDefined(infoEleData.main)){
			sendData.category = infoEleData.main;
		}

	}

	if(isDefined(actionMain)== true){
 		if($.isNumeric(actionMain)){
 			sendData.category = actionMain;
 		}else{
 			sendData.mv_type = actionMain;
 		}
 	}

	console.log('sendData', sendData);
	MOBILE_PAGE.ani.getAniContentsData(sendData, $infoEle);


	return;
};

//get getAniContentsData
MOBILE_PAGE.ani.getAniContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.ani.getAniContentsData', getData);

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
		mv_type		: '',
	};

	if(isDefined($infoEle) == false){
		$infoEle = $(MOBILE_PAGE.ani.DATA.ELE.info);
	}

	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['block_adult'])){ sendData.ba = getData.a_child; }
		if(isDefined(getData['category'])){ sendData.c = getData.category; }
		if(isDefined(getData['sub'])){ sendData.sub = getData.sub; }
		if(isDefined(getData['mv_type'])){ sendData.mv_type = getData.mv_type; }
	}
	console.log('sendData', sendData);

	var $innerEle = $(MOBILE_PAGE.ani.DATA.ELE.ani_list);

	var isMovieAni = true;
	if(sendData.c == 12000){
		isMovieAni = false;
	}

	var successFunGetAniContentsList = function(data){
		console.log('successFunGetAniContentsList', data);


		var mData = null;
		var mPage = 0;
		var channel_list = null;
		if(isMovieAni == true){
			channel_list = data.channel_movie_list;
			$('.mobile-channel-ani-wrap').find('.channel-category-list').removeClass('broad_list').addClass('movie_list');
		}else{
			channel_list = data.channel_broadcast_list;
			console.log(111111);
			console.log(data.channel_broadcast_list);
			$('.mobile-channel-ani-wrap').find('.channel-category-list').removeClass('movie_list').addClass('broad_list');
		}

		if(isDefined(channel_list)){

			var mData = channel_list;
			var mListData = mData.list;
			var mvListHtml = [];
			var lCnt = 0;
			var mRank = null;
			var bRank = null;
			var offSetList = utility.getMobileDeviceChannelListSize();

			for(var i in mListData){
				mRank = null;
				if(isMovieAni == true){
					mRank = new Movie_rank(lCnt);
					mRank.setData(mListData[i]);
					mRank.m_width = offSetList.width;
					mRank.m_height =  offSetList.height;
					//console.log(mRank);
					mvListHtml.push(mRank.getRankMovieMobileHtml());
				}else{
					bRank = new Broadcast_rank(lCnt);
					bRank.setData(mListData[i]);
					//console.log(bRank);
					mvListHtml.push(bRank.getRankBroadcastMobileHtml('ani'));
					//getRankBroadcastMobileHtml
				}
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
				MOBILE_PAGE.ani.DATA.SUB	= data.sub;
			}

			if(isDefined(data.main)){
				updateData['main'] = data.main;
				updateData.cate1 = mData.cate1;
				MOBILE_PAGE.ani.DATA.MAIN	= data.main;
			}else{
				//save cache
				updateData['main'] = sendData.c;
				MOBILE_PAGE.ani.DATA.MAIN	= sendData.c;
			}


			if(isDefined(data.data)){
				MOBILE_PAGE.ani.DATA.FILTER = data.data;
			}

			//save paging
			if(lCnt > 0){
				updateData.loaded = mPage;
				$infoEle.data(updateData).addClass('loading').removeClass('ending');
			}else{
				$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
			}

			console.log('$infoEle data', $infoEle.data());

			//랭킹은 다음이 없음
			if(isTopRank == true){
				$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
			}

		}else{
			$infoEle.data({page :mPage,loaded : mPage, total_page:mPage}).removeClass('loading').addClass('ending');
		}




		//save hash
		MOBILE_PAGE.ani.DATA.LAST_HASH = location.hash;

		MOBILE_PAGE.ani.dataAfterBinding();
	};

	var pUrl = DISK_PROTOCOL.ONPLAY_URL.MOVIE.MOVIE_LIST;
	if(isDefined(getData.category)){
		if(getData.category == 12000){
			pUrl = DISK_PROTOCOL.ONPLAY_URL.BROADCAST.BROADCAST_LIST;
		}
	}

	var formData = sendData;
	var ajaxData =
	{
		url			: pUrl,
		data		: formData,
		success_fun	: successFunGetAniContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//방송채널 더보기 클릭
MOBILE_PAGE.ani.onclickMoreMobileAni = function(thisEle){
	console.log('MOBILE_PAGE.ani.onclickMoreMobileAni');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	//return;

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
	MOBILE_PAGE.ani.setChannelAniPage(nextPage);
};


//방송채널 - 포스터 클릭
MOBILE_PAGE.ani.onclickThemeContentsItem = function(thisEle){
	console.log('MOBILE_PAGE.ani.onclickThemeContentsItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.url)){
		if(isDefined(eleData.idx)){
			MOBILE_PAGE.ani.DATA.SELECT_ANI =	eleData.idx;
		}
		location.hash = eleData.url;
	}

};



//방송채널 - 서브 카테고리 클릭
MOBILE_PAGE.ani.onclickChannelAniCategoryItem = function(thisEle){
	console.log('MOBILE_PAGE.ani.onclickChannelAniCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	var $subCateInfoEle = $('.channel-ani-sub-category');
	if($subCateInfoEle.length > 0){
		$subCateInfoEle.data('val', eleData.val).toggleClass('active');
		$subCateInfoEle.find('.sub-tit').text($.trim($(thisEle).text()));
	}
	if(isDefined(eleData.val)){
		location.hash = '#!action=ani&main='+eleData.val;
	}

};
