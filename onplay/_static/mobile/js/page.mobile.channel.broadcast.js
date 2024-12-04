/*
*	channel broadcast
*/

MOBILE_PAGE.broadcast = {};
MOBILE_PAGE.broadcast.DATA = {
	MAIN		: null,
	SUB			: null,
	FILTER		: null,
	LAST_HASH	: null,
	SELECT_BROADCAST	: null, 		//마지막 클릭 방송채널
	ELE	: {
		broadcast_list 	: '.mobile-channel-broadcast-list-wrap',
		info			: '.channel-broadcast-page-end-spy'
	},
	
	
};

MOBILE_PAGE.broadcast.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.broadcast.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	MOBILE_PAGE.broadcast.init(showContainerInfo, hashPrams);
};

MOBILE_PAGE.broadcast.defaultBinding = function(){
	console.log('MOBILE_PAGE.broadcast.defaultBinding');	
	
	MOBILE_COMMON.CHANNEL.searchBinding();
};


//마지막 선택 방송채널로 이동
MOBILE_PAGE.broadcast.setLastClickBroadcastContentsFocus = function(){
	console.log('MOBILE_PAGE.broadcast.setLastClickBroadcastContentsFocus');	
	var activeItem = $('.channel-list-item.channel-broadcast-list-item.active');
	if(activeItem.length > 0){
		var topOff = 65;
		utility.ui.goToElement('.channel-list-item.channel-broadcast-list-item.active', 50, topOff);
	}else{
		GO_TOP();
	}
	
	return;
	/*
	var topOff = 65;
	if(MOBILE_PAGE.broadcast.DATA.SELECT_BROADCAST){
		var targetContentsEleName = '#mobile-theme-wrap-'+MOBILE_PAGE.broadcast.DATA.SELECT_BROADCAST;
		console.log('targetContentsEleName', targetContentsEleName);
		if($(targetContentsEleName).length > 0){
			$('.mobile-channel-theme-list.active').removeClass('active');
			$(targetContentsEleName).addClass('active');
			utility.ui.goToElement(targetContentsEleName, 50, topOff);	
		}
	}
	*/
};
		
		
MOBILE_PAGE.broadcast.init = function(info, params){
	console.log('MOBILE_PAGE.broadcast.init');	
	console.log(params);
	MOBILE_PAGE.broadcast.defaultBinding();
	
	console.log('MOBILE_PAGE.broadcast.DATA.LAST_HASH', MOBILE_PAGE.broadcast.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	var channelType = 'broadcast';
	var actionType = params['!action'];
	var searchKeyword = params['k'];
	var actionSub = '';
	var subType = params['sub'];
	var channelIdx = params['idx'];
	if(actionType != channelType){
		console.log('action type err');
		return;
	}
	var broadcastIdx = params['bro'];
	
	console.log('channelIdx', channelIdx);
	if(isDefined(channelIdx) == true){
		console.log('m view');
		if($.isNumeric(channelIdx)){
			location.hash = '#!action=channel_view&type=broadcast&idx='+channelIdx;
			return;
			/*
			if(MOBILE_PAGE.on_channel.DATA.LAST_HASH == location.hash){
				console.log('same channelIdx');
				return;
			}
			MOBILE_COMMON.openMobileChannelContentsView(channelType, channelIdx, 1);
			return;
			*/
		}
	}
	else if(isDefined(broadcastIdx) == true){
		console.log('bro m view');
		if($.isNumeric(broadcastIdx)){
			MOBILE_PAGE.broadcast.openMobileBroadcastContentsView(broadcastIdx, 1);
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
		var $subCateInfoEle = $('.channel-broadcast-sub-category');
		if($subCateInfoEle.length > 0){
			//$subCateInfoEle.data('val', subType).toggleClass('active');
			//console.log($subCateInfoEle.find('.deep-sub-'+subType).text());
			var $subDeepEle = $subCateInfoEle.find('.deep-sub-'+subType);
			if($subDeepEle.length > 0){
				$subCateInfoEle.find('.sub-tit').text($.trim($subDeepEle.text()));
				actionSub = subType;
				$('.mobile-channel-broadcast-title-wrap').text($subDeepEle.text());
			}else{
				//방송국으로 들어온경우
				if($.isNumeric(subType)){
					var $infoEle = $(MOBILE_PAGE.broadcast.DATA.ELE.info);
					$infoEle.data('sub', subType);	
					actionSub = subType;
				}
			}
		}
	}
	
	//set scroll type
	MOBILE_COMMON_SCROLL.DATA.ACTION = channelType;
	
	var $innerEle = $(info.m_list);
	if($innerEle.length < 1){
		$innerEle = $(MOBILE_PAGE.broadcast.DATA.ELE.broadcast_list);
	}
	var startPage = 1;
	if(MOBILE_PAGE.broadcast.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.broadcast.setChannelBroadcastPage(startPage, actionSub);	
		}
		
		MOBILE_PAGE.broadcast.setLastClickBroadcastContentsFocus();
		return;
	}
	
	MOBILE_PAGE.broadcast.DATA.SELECT_BROADCAST = null;
	MOBILE_PAGE.broadcast.setChannelBroadcastPage(startPage, actionSub);	
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.broadcast.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.broadcast.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};


//방송채널 데이타 가져오기 : 페이지
MOBILE_PAGE.broadcast.setChannelBroadcastPage = function(nextPage, subType){
	console.log('MOBILE_PAGE.broadcast.setChannelBroadcastPage:',nextPage);
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
	
	var $infoEle = $(MOBILE_PAGE.broadcast.DATA.ELE.info);
	if($infoEle.length < 0){
		console.log('non info ele');
		return;
	}
	var infoEleData = $infoEle.data();
 	var sendData = {
 		page 			:	nextPage,
 		adult_block		: 0,
 		category		: 12000,
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
	MOBILE_PAGE.broadcast.getBroadcastContentsData(sendData, $infoEle);
	
	
	return;

};



//get getBroadcastContentsData
MOBILE_PAGE.broadcast.getBroadcastContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.broadcast.getBroadcastContentsData', getData);
	
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
		$infoEle = $(MOBILE_PAGE.broadcast.DATA.ELE.info);
	}
	
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['block_adult'])){ sendData.ba = getData.block_adult; }
		if(isDefined(getData['category'])){ sendData.c = getData.category; }
		if(isDefined(getData['sub'])){ sendData.sub = getData.sub; }
	}
	console.log('sendData', sendData);
	
	var $innerEle = $(MOBILE_PAGE.broadcast.DATA.ELE.broadcast_list);
	
	var successFunGetBroadcastContentsList = function(data){
		console.log('successFunGetBroadcastContentsList', data);
		
		
		var mData = null;
		var mPage = 0;
		if(isDefined(data.channel_broadcast_list)){
			
			var mData = data.channel_broadcast_list;
			var mListData = mData.list;
			var mvListHtml = [];
			var lCnt = 0;
			for(var i in mListData){
				var bRank = new Broadcast_rank(lCnt);
				bRank.setData(mListData[i]);
				//console.log(bRank);
				mvListHtml.push(bRank.getRankBroadcastMobileHtml());
				lCnt++;
			}
			mPage = parseInt(mData.page);
			console.log('mvListHtml', mvListHtml);
			
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
				MOBILE_PAGE.broadcast.DATA.SUB	= data.sub;
			}
			
			if(isDefined(data.main)){
				updateData['main'] = data.main;
				MOBILE_PAGE.broadcast.DATA.MAIN	= data.main;
			}else{
				//save cache
				updateData['main'] = sendData.c;
				MOBILE_PAGE.broadcast.DATA.MAIN	= sendData.c;	
			}
			
			
						
			
			if(isDefined(data.data)){
				MOBILE_PAGE.broadcast.DATA.FILTER = data.data;
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
	
		
		//방송국에서 들어온경우 
		if(isDefined(data.broadcast_corp)){
			$('.mobile-channel-broadcast-title-wrap').text(data.broadcast_corp);
		}
	
		
		//save hash
		MOBILE_PAGE.broadcast.DATA.LAST_HASH = location.hash;
		
		MOBILE_PAGE.broadcast.dataAfterBinding();
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.BROADCAST.BROADCAST_LIST,
		data		: formData,
		success_fun	: successFunGetBroadcastContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//방송채널 더보기 클릭
MOBILE_PAGE.broadcast.onclickMoreMobileBroadcast = function(thisEle){
	console.log('MOBILE_PAGE.broadcast.onclickMoreMobileBroadcast');
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
	MOBILE_PAGE.broadcast.setChannelBroadcastPage(nextPage);
};


//방송채널 - 포스터 클릭
MOBILE_PAGE.broadcast.onclickThemeContentsItem = function(thisEle){
	console.log('MOBILE_PAGE.broadcast.onclickThemeContentsItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.url)){
		if(isDefined(eleData.idx)){
			MOBILE_PAGE.broadcast.DATA.SELECT_BROADCAST =	eleData.idx;
		}
		location.hash = eleData.url;
	}
	
};



//방송채널 - 서브 카테고리 클릭
MOBILE_PAGE.broadcast.onclickChannelBroadcastCategoryItem = function(thisEle){
	console.log('MOBILE_PAGE.broadcast.onclickChannelBroadcastCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	var $subCateInfoEle = $('.channel-broadcast-sub-category');
	if($subCateInfoEle.length > 0){
		$subCateInfoEle.data('val', eleData.val).toggleClass('active');
		$subCateInfoEle.find('.sub-tit').text($.trim($(thisEle).text()));
	}
	if(isDefined(eleData.val)){
		location.hash = '#!action=broadcast&sub='+eleData.val;	
	}
	
};




//방송 채널 세부 정보 보기 view - bro idx 기준
MOBILE_PAGE.broadcast.openMobileBroadcastContentsView = function(BroadcastIdx, isHash){
	console.log('MOBILE_PAGE.broadcast.openMobileChannelContentsView', BroadcastIdx);
	
	console.log('BroadcastIdx', BroadcastIdx);
	if(isDefined(BroadcastIdx) == false || $.isNumeric(BroadcastIdx) == false){
		console.log('empty idx');
		return;
	}
	var channelType = 'broadcast';
	var goHomeFun;
	if(isHash == 1){
		goHomeFun = GO_HOME;
	}
	var successAjaxBroadcastChannelViewData = function(data){
		console.log('successAjaxBroadcastChannelViewData');
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
			//var channelViewCommonHtml = MOBILE_TEMPLETE.CONNTAINER.channel_view(channelType, channelIdx);
			var openCallbackFun = function($modalEle){
				console.log('openCallbackFun');
				console.log($modalEle);
				var channelIdx;
				var $channelInfoEle  = $('.wrap-channel-contents-modal-view.broadcast');
				if($channelInfoEle.length > 0){
					channelIdx = $channelInfoEle.data('idx');
				}
				
				
				if(isHash == 1){
					$('.wrap-channel-contents-modal-view').find('.btn-top-back').data('target', 'back');	
				}
				if(isDefined(channelIdx)){
					MOBILE_PAGE.channel.view.start(channelType, channelIdx);	
				}
				
			}
			OPEN_PAGE_MODAL(viewHtml, openCallbackFun);
			
		}
	};
	
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CHANNEL.MOBILE.BROADCAST_VIEW_DATA_AJAX;
	if(isDefined(contentsUrl) == false){
		console.log('contentsUrl empty');
		return;
	}
	var formData = {
		is_mobile	: 1,
		is_cache	: 0,
		idx			: '',
		bro			: BroadcastIdx,
	};
	
	var ajaxData = 
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxBroadcastChannelViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: false
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};
