
//mypage >> news
MOBILE_PAGE.mypage.news = {};
MOBILE_PAGE.mypage.news.start = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.start');
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
		$(MOBILE_PAGE.mypage.DATA.ELE.container).data('id','mypage-news-'+myId);	
	}
	MOBILE_PAGE.mypage.news.getNewsList(myId, nextPage, searchKeyword);
	
	
};
MOBILE_PAGE.mypage.news.getNewsList = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.getNewsList');	
	
	if(myId == 'news'){
		MOBILE_PAGE.mypage.news.news.setNewsListPage(nextPage, searchKeyword);
	}else if(myId == 'memo_receive'){
		MOBILE_PAGE.mypage.news.memo_receive.setMemoReceiveListPage(nextPage, searchKeyword);
	}else if(myId == 'memo_send'){
		MOBILE_PAGE.mypage.news.memo_send.setMemoSendListPage(nextPage, searchKeyword);
	}
};

MOBILE_PAGE.mypage.news.afterBinding = function(){
	console.log('MOBILE_PAGE.mypage.news.afterBinding');
	//show top
	$('.mobile-bottom-top-btn').addClass('show');
	
	MOBILE_COMMON.afterLoadCommonBinding();	
};




//마이페이지 : news
MOBILE_PAGE.mypage.news.news = {};
MOBILE_PAGE.mypage.news.news.setNewsListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.news.setNewsListPage',nextPage);	
	//get page data
	//MOBILE_PAGE.mypage.news.news.getWishListData(nextPage, searchKeyword);
	var newsId = 'news';
	//MOBILE_PAGE.mypage.news.commonListListData(newsId, nextPage, searchKeyword);
	MOBILE_PAGE.mypage.news.news.getBoardListContentsData(newsId, nextPage);
	
};


//마이페이지 : news 데이타 가져오기
/*
MOBILE_PAGE.mypage.news.news.getNewsListData = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.getNewsListData');
	
	var newsId = 'news';
	MOBILE_PAGE.mypage.news.commonListListData(newsId, nextPage, searchKeyword);
};
*/




MOBILE_PAGE.mypage.news.news.getBoardListContentsData = function(newsId, nextPage, callbackFun){
	console.log('MOBILE_PAGE.mypage.news.news.getNoticeListContentsData', nextPage);
	
	var pageLimit = 20;
	var sendData = {
		l			: pageLimit,			//limit
		page		: nextPage,
		is_mobile	: 1,			//is mobile
		t			: 'cs',				//
		b			: 'news',				//cs type
		c			: 'ALL',			//category
		s			: ''
	};
	
	console.log('sendData', sendData);
	if(isDefined(sendData.b) == false){
		console.log('cs type err');
		return;
	}
	
	var $containerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
	var $infoEle = $containerEle.find('.mobile-mypage-'+newsId+'-page-end-spy');
	var $innerHtmlTarget = $containerEle.find('.mypage-news-'+newsId);
	
	var csType = sendData.b;
	var successFunGetBoardContentsList = function(data){
		console.log('successFunGetBoardContentsList', data);
		var curPage = 1;



		if(isDefined(data.board_list_data)){
			var boardData = data.board_list_data;
			var boardList = boardData.list;
			var bbsListHtml = [];

			if(isDefined(boardData.page)){
				curPage = boardData.page;
			}


			var csBoard;
			for(var cc in boardList){
				csBoard = new Cs_board(csType, cc, 1);
				csBoard.setData(boardList[cc]);
				bbsListHtml.push(csBoard.getMobileCsNewsListHtml());
			}
			console.log('curPage', curPage);
			//listCount = 0;
			//페이징 : 더보기 타입
			
			//$innerHtmlTarget.html(bbsListHtml.join(''));
			var curPage = 1;
			if(isDefined(boardData.page) == true){ curPage = parseInt(boardData.page);}	
			
			if(isDefined(boardData.limit) == true){ pageLimit = parseInt(boardData.limit);}
			var communityCount = bbsListHtml.length;
			//if(isDefined(boardData.total_count) == true){ communityCount = parseInt(boardData.total_count);}
			
			var saveData = {
				group	:	'news',
				id		:	newsId,
				total_page	: boardData.total_page
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
				if(pageLimit < communityCount){
					saveData.total_page = curPage;
				}
				$infoEle.data(saveData).addClass('loading').removeClass('ending');
				
			}else{
				saveData.page = curPage;
				saveData.loaded = curPage;
				saveData.total_page = curPage;
				if(curPage == 1){
					console.log('no data show', newsId);
					$containerEle.find('.f_content.'+newsId).addClass('no-data');
				}
				$infoEle.data(saveData).removeClass('loading').addClass('ending');
	
			}
			
			
			if(curPage == 1){
				GO_TOP();
			}
			
			MOBILE_PAGE.mypage.news.afterBinding();
		}

		
		//MOBILE_PAGE.cs.DATA.LAST_HASH = location.hash;



	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_BOARD_LIST,
		data		: formData,
		success_fun	: successFunGetBoardContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};




//마이페이지 : 받은 쪽지
MOBILE_PAGE.mypage.news.memo_receive = {};
MOBILE_PAGE.mypage.news.memo_receive.setMemoReceiveListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.memo_receive.setMemoReceiveListPage',nextPage);	
	//get page data
	//MOBILE_PAGE.mypage.news.memo.getWishListData(nextPage, searchKeyword);
	var newsId = 'memo_receive';
	MOBILE_PAGE.mypage.news.memoCommonListListData(newsId, nextPage);
	
};





//마이페이지 : 보낸 쪽지
MOBILE_PAGE.mypage.news.memo_send = {};
MOBILE_PAGE.mypage.news.memo_send.setMemoSendListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.memo_send.setMemoReceiveListPage',nextPage);	
	//get page data
	//MOBILE_PAGE.mypage.news.memo.getWishListData(nextPage, searchKeyword);
	var newsId = 'memo_send';
	MOBILE_PAGE.mypage.news.memoCommonListListData(newsId, nextPage);
	
};


//마이페이지 : 컨텐츠 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.news.memoCommonListListData = function(newsId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.news.memoCommonListListData', newsId);
	
	if(isDefined(newsId) == false){
		console.log('empty newsId');
		return;
	}
	
	var startPage = 1;
	if(isDefined(nextPage) == true && $.isNumeric(nextPage)){
		startPage = parseInt(nextPage);
	}
	
	var memoType = 'receive';
	if(newsId == 'memo_send'){
		memoType = 'send';
	}
	var pageLimit = 15;
	var sendData = {
		page		: startPage,
		is_mobile	: 1,
		idx			: DISK_MEMBER_FUN.getMyMemberData('member_idx'),
		type		: memoType,
		limit		: pageLimit
	};

	console.log('sendData', sendData);
	
	//var $innerEle = $('.aaa');
	var $containerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
	var $infoEle = $containerEle.find('.mobile-mypage-'+newsId+'-page-end-spy');
	
	var successFunGetMemoListnewsList = function(data){
		console.log('successFunGetMemoListnewsList', data);
		var bbsListCount = 0;
		var $innerHtmlTarget = $containerEle.find('.mypage-news-'+newsId);
		var $innerSubscribeHtmlTarget;
		var bbsListHtml = [];
		var channelListHtml = [];
		var diskBbs;
		var memoData;
		if(isDefined(data.memo_data)){
			memoData = data.memo_data;
		}
		
		console.log(memoData);
		if(isDefined(memoData.list)){
			var bbsListData = memoData.list;
			bbsListCount = bbsListData.length;
			for(var i =0; i < bbsListCount; i++){
				bbsListHtml[i] = MOBILE_TEMPLETE.PAGE.getMobileMemoListHtml(bbsListData[i], newsId);;
			}
			
		}
		//console.log(bbsListHtml);
		
		var curPage = 1;
		if(isDefined(memoData.page) == true){ curPage = parseInt(memoData.page);}	
		
		if(isDefined(memoData.limit) == true){ pageLimit = parseInt(memoData.limit);}
		var newsCount = bbsListHtml.length;
		//if(isDefined(memoData.total_count) == true){ newsCount = parseInt(memoData.total_count);}
		if(curPage == 1){
			$('.memo-tot-cnt').text(memoData.new_memo_count);
		}
		var saveData = {
			group	:	'news',
			id		:	newsId,
		}	
		console.log('curPage', curPage);
		console.log('newsCount', newsCount);
		//console.log('pageLimit', pageLimit);
		
		if(bbsListHtml.length > 0){
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage + 1;
			if(curPage == 1){
				$innerHtmlTarget.html(bbsListHtml.join('')).data('load', 1);	
			}else{
				$innerHtmlTarget.append(bbsListHtml.join(''));
			}
			if(pageLimit > newsCount){
				saveData.total_page = curPage;
			}
			console.log('saveData', saveData);
			$infoEle.data(saveData).addClass('loading').removeClass('ending');
			
		}else{
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show', newsId);
				$containerEle.find('.f_content.'+newsId).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}
		
		
		if(curPage == 1){
			GO_TOP();
		}
		
		MOBILE_PAGE.mypage.news.afterBinding();
		
	};
	
	var serverUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MOBILE[newsId];
	if(isDefined(serverUrl) == false){
		console.log('empty url');
		return;
	}
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: serverUrl,
		data		: formData,
		success_fun	: successFunGetMemoListnewsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



//쪽지 읽음 표시
MOBILE_PAGE.mypage.news.onClickMemoRead = function(thisEle){
	console.log('MOBILE_PAGE.mypage.news.onClickMemoRead');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData) == false){
		return;
	}
		
	var isRead = eleData.is_read;
	if(isDefined(isRead) == true){
		if(isRead == '0'){
			console.log('서버로 읽음 표시 보내줘요'+$(thisEle).data('idx'));
			$(thisEle).data('is_read', 1);
		}
		
		if($(thisEle).hasClass('read') == false){
			$(thisEle).removeClass('not_read').addClass('read');
		}
		if(eleData.type == "receive"){
			if(eleData.readed != 1){
				MOBILE_PAGE.mypage.news.onclickChangeMyMemoList(thisEle);
			}
		}
	}
	utility.onClikcTogleTargetEle(eleData.target);
};

//메모 삭제
MOBILE_PAGE.mypage.news.onClickMemoDelete = function(thisEle){
	console.log('MOBILE_PAGE.mypage.news.onClickMemoDelete');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData) == false){
		return;
	}
	
	if(eleData.action == 'del'){
		MOBILE_PAGE.mypage.news.onclickChangeMyMemoList(thisEle);
	}
};


//메모 : 선택 목록 삭제 action
MOBILE_PAGE.mypage.news.onclickChangeMyMemoList = function(thisEle){
	console.log('PAGE_MY.contents.onclickChangeMyMemoList');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.action) == false){
		console.log('action empty');
		return;
	}
	var memoType = eleData.type;

	var checkDelList = [];
	var isSpinner = true;
	var readIdx = eleData.idx;
	checkDelList.push(readIdx);

	var successFunDelMyMemo = function(data){
		console.log('successFunDelMyMemo', data);
		var $targetList;
		if(isDefined(data.idxs)){
			for(var i in data.idxs){
				var contentsIdx = data.idxs[i];
				$targetList = $('.mypage-mobile-bbs-memo-item-'+contentsIdx);
				if(data.action_type == 'read'){
					$targetList.data('readed', 1);
				}else if(data.action_type == 'del'){
					$targetList.remove();
				}
			}
		}
		//new count update
		if(data.action_type == 'read'){
			var newMemoCnt = $('.memo-tot-cnt.'+eleData.id).text() -1;
			if(newMemoCnt < 0){
				newMemoCnt = 1;
			}
			$('.memo-tot-cnt.'+eleData.id).text(newMemoCnt);
		}else if(data.action_type == 'del'){
			if(+eleData.id == 'memo_send'){
				var newMemoCnt = $('.memo-tot-cnt.'+eleData.id).text() -1;
				if(newMemoCnt < 0){
					newMemoCnt = 1;
				}
				$('.memo-tot-cnt.'+eleData.id).text(newMemoCnt);
			}
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			if(data.action_type == 'read'){
				$.ambiance({message: data.show_msg, type: "alert-info"});
			}else{
				$.ambiance({message: data.show_msg, type: "alert-warning"});
			}
		}
	};

	var formData = {
		id			: eleData.id,
		group		: eleData.group,
		action		: eleData.action,
		idxs		: checkDelList,
		type		: memoType,
		is_mobile	: 1
	};
	//console.log(formData);
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.COMMUNITY.CHANGE_MY_MEMO,
		data		: formData,
		success_fun	: successFunDelMyMemo,
		error_fun	: null,
		isSpinner	: isSpinner,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


