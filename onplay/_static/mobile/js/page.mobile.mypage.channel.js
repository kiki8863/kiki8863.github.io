
//mypage >> channel
MOBILE_PAGE.mypage.channel = {};
MOBILE_PAGE.mypage.channel.start = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.channel.start');
	console.log('myId', myId);
	console.log('nextPage', nextPage);
	console.log('searchKeyword', searchKeyword);
	
	//indrt container
	var containerFun = MOBILE_TEMPLETE.CONNTAINER.m_mypage[myId];
	if(containerFun){
		$(MOBILE_PAGE.mypage.DATA.ELE.container).html(containerFun.call(null, myId));	
	}else{
		console.log('empty containerFun');
		return;
	}
	if(isDefined(myId)){
		$(MOBILE_PAGE.mypage.DATA.ELE.container).data('id','mypage-channel-'+myId);	
	}
	MOBILE_PAGE.mypage.channel.getChannelList(myId, nextPage, searchKeyword);
};
//mypage >> channel : 페이지 데이타 가져오기
MOBILE_PAGE.mypage.channel.getChannelList = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.channel.getChannelList');
	if(isDefined(myId) == false){
		console.log('myId empty');
		return;
	}	
	var channelListFun = MOBILE_PAGE.mypage.channel[myId];
	if(isDefined(channelListFun) == false){
		console.log('channelListFun empty');
		return;
	}
	channelListFun.getListPage(nextPage, searchKeyword);
	
	
};

MOBILE_PAGE.mypage.channel.afterBinding = function(){
	console.log('MOBILE_PAGE.mypage.channel.afterBinding');
	//show top
	$('.mobile-bottom-top-btn').addClass('show');
	
	MOBILE_COMMON.afterLoadCommonBinding();	
};

//마이페이지 : 구독채널 콘텐츠 목록
MOBILE_PAGE.mypage.channel.channel_list = {};
MOBILE_PAGE.mypage.channel.channel_list.getListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.channel.getListPage',nextPage);	
	
	
	//get page data
	//MOBILE_PAGE.mypage.channel.channel_list.getBuyListData(nextPage, searchKeyword);
	var channelId = 'channel_list';
	MOBILE_PAGE.mypage.channel.commonListListData(channelId, nextPage, searchKeyword);
	
};


//마이페이지 : 구독채널 리스트 - 관리
MOBILE_PAGE.mypage.channel.channel_management = {};
MOBILE_PAGE.mypage.channel.channel_management.getListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.channel.getListPage',nextPage);	
	//get page data
	var channelId = 'channel_management';
	MOBILE_PAGE.mypage.channel.commonListListData(channelId, nextPage, searchKeyword);
	
};

//채널 구독해제
MOBILE_PAGE.mypage.channel.channel_management.unsubscribe = function(thisEle){
	console.log('MOBILE_PAGE.mypage.channel.channel_management.unsubscribe');
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('mypage');
		return;
	}
	var eleData = $(thisEle).data();
	
	console.log('eleData', eleData);
	var sIdx;
	if(isDefined(eleData.idx)){
		sIdx = parseInt(eleData.idx);
	}
	
	var successCallbackFun = function(data){
		console.log('successCallbackFun', data);
		if(isDefined(data.show_msg)){
			$.ambiance({message: data.show_msg, type: "alert-warning"});
		}
		if(isDefined(data.idx)){
			if(isDefined(eleData.target)){
				$(eleData.target).remove();
			}
		}
		
		if($('.mobile-my-page-subscribe-item').length < 1){
			HASH_REFRESH();
		}
		
	};
	
	COMMON_ACTION.SUBSCRIBE.actionUnsubscribe(sIdx, successCallbackFun);
};




//마이페이지 : 채널 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.channel.commonListListData = function(channelId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.channel.commonListListData', channelId);
	
	if(isDefined(channelId) == false){
		console.log('empty channelId');
		return;
	}
	
	var startPage = 1;
	if(isDefined(nextPage) == true && $.isNumeric(nextPage)){
		startPage = parseInt(nextPage);
	}
	
	var sendData = {
		page		: startPage,
		is_mobile	: 1
	};

	console.log('sendData', sendData);
	
	//var $innerEle = $('.aaa');
	var $containerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
	var $infoEle = $containerEle.find('.mobile-mypage-'+channelId+'-page-end-spy');
	
	var successFunGetBuyListChannelList = function(data){
		console.log('successFunGetBuyListChannelList', data);
		var bbsListCount = 0;
		var $innerHtmlTarget = $containerEle.find('.mypage-channel-'+channelId);
		console.log($innerHtmlTarget);
		//var $innerSubscribeHtmlTarget = $containerEle.find('.mypage-channel-'+channelId);
		var bbsListHtml = [];
		//var channelListHtml = [];
		var diskBbs;
		if(isDefined(data.member_channel_contents_list)){
			var bbsListData = data.member_channel_contents_list;
			bbsListCount = bbsListData.length;
			if(bbsListCount > 0){
				console.log('member_channel_contents_list');
				var subList = data.member_channel_contents_list;
				//$innerHtmlTarget = $contentsInnerEle.find('.member-foryou-subscribe-contents-list');
				for(var k = 0; k < subList.length; k++){
					if(channelId == 'channel_list'){
						bbsListHtml.push(MOBILE_TEMPLETE.PAGE.getMemberMySubscribeListMobileHtml(subList[k]));	
					}else if(channelId == 'channel_management'){
						bbsListHtml.push(MOBILE_TEMPLETE.PAGE.getMemberMySellerChannelListHtml(subList[k]));
					}
				}
			}	
		}
		
		console.log('bbsListHtml', bbsListHtml);
		
		var curPage = 1;
		if(isDefined(data.page) == true){ curPage = parseInt(data.page);}	
		var pageLimit = 20;
		if(isDefined(data.page_limit) == true){ pageLimit = parseInt(data.page_limit);}
		var channelCount = bbsListHtml.length;
		if(isDefined(data.channel_cnt) == true){ channelCount = parseInt(data.channel_cnt);}
		
		var saveData = {
			group	:	'channel',
			id		:	channelId
		}	
		console.log('curPage', curPage);	
		if(bbsListHtml.length > 0){
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage + 1;
			if(curPage == 1){
				$innerHtmlTarget.html(bbsListHtml.join('')).data('load', 1);	
			}else{
				$innerHtmlTarget.append(bbsListHtml.join(''));
			}
			if(channelCount < pageLimit){
				saveData.total_page = curPage;
				$infoEle.data(saveData).removeClass('loading').addClass('ending');
			}else{
				$infoEle.data(saveData).addClass('loading').removeClass('ending');	
			}
			
			
		}else{
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show', channelId);
				$containerEle.find('.f_content.'+channelId).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}
		
		
		if(curPage == 1){
			GO_TOP();
		}
		
		MOBILE_PAGE.mypage.channel.afterBinding();
		
	};
	
	var serverUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MOBILE[channelId];
	if(isDefined(serverUrl) == false){
		console.log('empty url');
		return;
	}
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: serverUrl,
		data		: formData,
		success_fun	: successFunGetBuyListChannelList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};