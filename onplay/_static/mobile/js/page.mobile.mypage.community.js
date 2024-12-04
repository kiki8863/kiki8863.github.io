
//mypage >> community
MOBILE_PAGE.mypage.community = {};
MOBILE_PAGE.mypage.community.start = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.community.start');
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
		$(MOBILE_PAGE.mypage.DATA.ELE.container).data('id','mypage-community-'+myId);	
	}
	MOBILE_PAGE.mypage.community.getCommunityList(myId, nextPage, searchKeyword);
};
//mypage >> community : 페이지 데이타 가져오기
MOBILE_PAGE.mypage.community.getCommunityList = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.community.getCommunityList');	
	
	if(myId == 'buy_list'){
		MOBILE_PAGE.mypage.community.buy_list.setBuyListPage(nextPage, searchKeyword);
	}else if(myId == 'wish_list'){
		MOBILE_PAGE.mypage.community.wish_list.setWishListPage(nextPage, searchKeyword);
	}
	
	
};

MOBILE_PAGE.mypage.community.afterBinding = function(){
	console.log('MOBILE_PAGE.mypage.community.afterBinding');
	//show top
	$('.mobile-bottom-top-btn').addClass('show');
	
	MOBILE_COMMON.afterLoadCommonBinding();	
};

//마이페이지 : 구매목록
MOBILE_PAGE.mypage.community.buy_list = {};
MOBILE_PAGE.mypage.community.buy_list.setBuyListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.community.setBuyListPage',nextPage);	
	
	
	//get page data
	//MOBILE_PAGE.mypage.community.buy_list.getBuyListData(nextPage, searchKeyword);
	var communityId = 'buy_list';
	MOBILE_PAGE.mypage.community.commonListListData(communityId, nextPage, searchKeyword);
	
};




//마이페이지 : 찜한목록
MOBILE_PAGE.mypage.community.wish_list = {};
MOBILE_PAGE.mypage.community.wish_list.setWishListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.community.wish_list.setWishListPage',nextPage);	
	//get page data
	//MOBILE_PAGE.mypage.community.wish_list.getWishListData(nextPage, searchKeyword);
	var communityId = 'wish_list';
	MOBILE_PAGE.mypage.community.commonListListData(communityId, nextPage, searchKeyword);
	
};

//마이페이지 : 찜한목록 데이타 가져오기
MOBILE_PAGE.mypage.community.wish_list.getWishListData = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.community.getWishListData');
	
	var communityId = 'wish_list';
	MOBILE_PAGE.mypage.community.commonListListData(communityId, nextPage, searchKeyword);
};



//마이페이지 : 컨텐츠 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.community.commonListListData = function(communityId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.community.commonListListData', communityId);
	
	if(isDefined(communityId) == false){
		console.log('empty communityId');
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
	var pageLimit = 20;
	
	//var $innerEle = $('.aaa');
	var $containerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
	var $infoEle = $containerEle.find('.mobile-mypage-'+communityId+'-page-end-spy');
	
	var successFunGetBuyListCommunityList = function(data){
		console.log('successFunGetBuyListCommunityList', data);
		var bbsListCount = 0;
		var $innerHtmlTarget = $containerEle.find('.mypage-community-'+communityId);
		var $innerSubscribeHtmlTarget;
		var bbsListHtml = [];
		var channelListHtml = [];
		var diskBbs;
		if(isDefined(data.member_community_list)){
			var bbsListData = data.member_community_list;
			bbsListCount = bbsListData.length;
			for(var i =0; i < bbsListCount; i++){
				diskBbs = new Community_list(i+1, 0, 'category');
				diskBbs.setData(bbsListData[i]);
				//console.log(diskBbs);
				bbsListHtml[i] = diskBbs.getMobileCategoryListHtml(false, 'category');
			}
			
		}
		
		var curPage = 1;
		if(isDefined(data.page) == true){ curPage = parseInt(data.page);}	
		
		if(isDefined(data.page_limit) == true){ pageLimit = parseInt(data.page_limit);}
		var communityCount = bbsListHtml.length;
		//if(isDefined(data.community_cnt) == true){ communityCount = parseInt(data.community_cnt);}
		
		var saveData = {
			group	:	'community',
			id		:	communityId
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
			if(pageLimit > communityCount){
				saveData.total_page = curPage;
			}
			$infoEle.data(saveData).addClass('loading').removeClass('ending');
			
		}else{
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show', communityId);
				$containerEle.find('.f_content.'+communityId).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}
		
		
		if(curPage == 1){
			GO_TOP();
		}
		
		MOBILE_PAGE.mypage.community.afterBinding();
		
	};
	
	var serverUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MOBILE[communityId];
	if(isDefined(serverUrl) == false){
		console.log('empty url');
		return;
	}
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: serverUrl,
		data		: formData,
		success_fun	: successFunGetBuyListCommunityList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};





