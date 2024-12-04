
//mypage >> contents
MOBILE_PAGE.mypage.contents = {};
MOBILE_PAGE.mypage.contents.start = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.contents.start');
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
		$(MOBILE_PAGE.mypage.DATA.ELE.container).data('id','mypage-contents-'+myId);
	}
	MOBILE_PAGE.mypage.contents.getContentsList(myId, nextPage, searchKeyword);
};
//mypage >> contents : 페이지 데이타 가져오기
MOBILE_PAGE.mypage.contents.getContentsList = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.contents.getContentsList');

	if(myId == 'buy_list'){
		MOBILE_PAGE.mypage.contents.buy_list.setBuyListPage(nextPage, searchKeyword);
	}else if(myId == 'wish_list'){
		MOBILE_PAGE.mypage.contents.wish_list.setWishListPage(nextPage, searchKeyword);
	}


};

MOBILE_PAGE.mypage.contents.afterBinding = function(){
	console.log('MOBILE_PAGE.mypage.contents.afterBinding');
	//show top
	$('.mobile-bottom-top-btn').addClass('show');

	MOBILE_COMMON.afterLoadCommonBinding();
};

//마이페이지 : 구매목록
MOBILE_PAGE.mypage.contents.buy_list = {};
MOBILE_PAGE.mypage.contents.buy_list.setBuyListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.contents.setBuyListPage',nextPage);


	//get page data
	//MOBILE_PAGE.mypage.contents.buy_list.getBuyListData(nextPage, searchKeyword);
	var contentsId = 'buy_list';
	MOBILE_PAGE.mypage.contents.commonListListData(contentsId, nextPage, searchKeyword);

};




//마이페이지 : 찜한목록
MOBILE_PAGE.mypage.contents.wish_list = {};
MOBILE_PAGE.mypage.contents.wish_list.setWishListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.contents.wish_list.setWishListPage',nextPage);
	//get page data
	//MOBILE_PAGE.mypage.contents.wish_list.getWishListData(nextPage, searchKeyword);
	var contentsId = 'wish_list';
	MOBILE_PAGE.mypage.contents.commonListListData(contentsId, nextPage, searchKeyword);

};

//마이페이지 : 찜한목록 데이타 가져오기
MOBILE_PAGE.mypage.contents.wish_list.getWishListData = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.contents.getWishListData');

	var contentsId = 'wish_list';
	MOBILE_PAGE.mypage.contents.commonListListData(contentsId, nextPage, searchKeyword);
};





//마이페이지 : 컨텐츠 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.contents.commonListListData = function(contentsId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.contents.commonListListData', contentsId);

	if(isDefined(contentsId) == false){
		console.log('empty contentsId');
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
	var $infoEle = $containerEle.find('.mobile-mypage-'+contentsId+'-page-end-spy');
	//성인인증 여부
	var isAdultMember =utility.disk.checkIsAdultMember();
	console.log('isAdultMember', isAdultMember);

	var successFunGetBuyListContentsList = function(data){
		console.log('successFunGetBuyListContentsList', data);
		var bbsListCount = 0;
		var $innerHtmlTarget = $containerEle.find('.mypage-contents-'+contentsId);
		var $innerSubscribeHtmlTarget;
		var bbsListHtml = [];
		var channelListHtml = [];
		var diskBbs;
		if(isDefined(data.member_contents_list)){
			var bbsListData = data.member_contents_list;
			bbsListCount = bbsListData.length;
			for(var i =0; i < bbsListCount; i++){
				diskBbs = new Contents_list(i+1, 0, 'category');
				diskBbs.is_adult_member = isAdultMember;
				diskBbs.setData(bbsListData[i]);
				//console.log(diskBbs);
				if(contentsId == 'buy_list'){
					bbsListHtml[i] = diskBbs.getMobileBuyContentsListHtmlVer2(contentsId);
				}else if(contentsId == 'wish_list'){
					bbsListHtml[i] = diskBbs.getMobileWishContentsListHtml(contentsId);
				}else{

					bbsListHtml[i] = diskBbs.getMobileCategoryListHtml(false, 'category');
				}

			}

		}

		var curPage = 1;
		if(isDefined(data.page) == true){ curPage = parseInt(data.page);}
		var pageLimit = 20;
		if(isDefined(data.page_limit) == true){ pageLimit = parseInt(data.page_limit);}
		var contentsCount = bbsListHtml.length;
		if(isDefined(data.contents_cnt) == true){ contentsCount = parseInt(data.contents_cnt);}

		var saveData = {
			group	:	'contents',
			id		:	contentsId
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
			if(contentsCount < pageLimit){
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
				console.log('no data show', contentsId);
				$containerEle.find('.f_content.'+contentsId).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}


		if(curPage == 1){
			GO_TOP();
		}

		MOBILE_PAGE.mypage.contents.afterBinding();

	};

	var serverUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MOBILE[contentsId];
	if(isDefined(serverUrl) == false){
		console.log('empty url');
		return;
	}

	var formData = sendData;
	var ajaxData =
	{
		url			: serverUrl,
		data		: formData,
		success_fun	: successFunGetBuyListContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};
