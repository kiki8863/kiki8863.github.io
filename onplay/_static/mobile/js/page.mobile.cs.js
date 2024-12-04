/*
*	moible cs board
*/
var qa_page =1;

MOBILE_PAGE.cs = {};


MOBILE_PAGE.cs.DATA = {
	LAST_HASH	: null,
	INFO_ELE	: null,
	LIST_ELE	: null,
	CONTAINER_ELE	: '#mobile-container-deep-25',
}
MOBILE_PAGE.cs.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.cs.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);



	if(isDefined(showContainerInfo.target)){
		MOBILE_PAGE.cs.DATA.CONTAINER_ELE = '#'+showContainerInfo.target;
	}
	MOBILE_PAGE.cs.init(showContainerInfo, hashPrams, 'notice');
};




MOBILE_PAGE.cs.defaultBinding = function(csType){
	console.log('MOBILE_PAGE.cs.defaultBinding', csType);
	//tab active

	if($('.cs-list-top-tab.type-'+csType).hasClass('active') == false){
		$('.cs-list-top-tab.active').removeClass('active');
		$('.cs-list-top-tab.type-'+csType).addClass('active');
	}
};

MOBILE_PAGE.cs.afterBindingPagingSet  = function(csType, curPage){
	console.log('MOBILE_PAGE.cs.afterBindingPagingSet ', curPage);


	if(isDefined(curPage) == false || $.isNumeric(curPage) == false){
		curPage = 1;
	}

	if(isDefined(csType) == false){
		return;
	}

	var pagNationCallbackFun = function(cData){
		console.log('pagNationCallbackFun', cData);
		//MOBILE_PAGE.cs.setCsBoardListData(cData.next_page);


		if(isDefined(cData.next_page) == true){
			if(isDefined(cData.type) == false){
				cData.type = 'notice';
			}

			if(cData.type == 'faq'){
				var search = '';
				if(isDefined(cData.search)){
					search = encodeURIComponent(cData.search);
				}
				var boardCategory = '';
				if(isDefined(cData.cate1)){
					boardCategory = encodeURIComponent(cData.cate1);
				}
				console.log('boardCategory', boardCategory);
				location.hash = '#!action='+cData.type+'&type='+boardCategory+'&search='+search+'&page='+cData.next_page;
			}else{
				location.hash = '#!action='+cData.type+'&page='+cData.next_page;
			}


			/*
			if(cData.type == 0 && cData.next_page == 1){

				 location.hash = '#!action=notice';
				 //&& isDefined(cData.type) == true
			}else{

			}
			*/
			return;
		}
		console.log('err empty next page');

	};

	//리스트 - 이전, 다음
	var $infoEle = $(MOBILE_PAGE.cs.DATA.INFO_ELE);
	console.log($infoEle.data());
	var isLoaded = false;
	if($infoEle.length > 0 && csType != 'news'){
		if($infoEle.data('load') > 0){
			isLoaded = true;
		}
		if(isLoaded == false){
			console.log('shortPagination isLoaded', isLoaded);
			var btnEleName = '.btn-'+csType+'-list';
			var $btnChannelBroChapterControler = $( btnEleName );
			if($btnChannelBroChapterControler.length > 0){
				//$btnChannelBroChapterControler.unbind( "click");
				$btnChannelBroChapterControler.on( "click", function() {
					console.log('click btn-list');
					utility.shortPagination.action($(this), btnEleName, pagNationCallbackFun);	//반드시 .을 붙인다
				});
				$infoEle.data('load', 1);
				$infoEle.find('.now_page').empty();
				utility.shortPagination.reset();
			}
		}
	}



	MOBILE_COMMON.afterLoadCommonBinding();

};


MOBILE_PAGE.cs.afterBinding  = function(){
	console.log('MOBILE_PAGE.cs.afterBinding ');
	MOBILE_COMMON.afterLoadCommonBinding();
	return;
};

MOBILE_PAGE.cs.init = function(info, params, csType){
	console.log('MOBILE_PAGE.cs.init');


	if(isDefined(csType)== false){
		csType = 'notice';
	}

	if(csType == 'qa'){
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN('qa');
			return;
		}
	}



	var actionType = params['!action'];
	if(actionType != csType){
		console.log('action type err');
		return;
	}

	var page = params['page'];
	if(isDefined(page) == false || $.isNumeric(page) == false){
		page = 1;
	}
	page = parseInt(page);
	var viewIdx = params['idx'];
	if(isDefined(viewIdx) == true && $.isNumeric(viewIdx) == true && isDefined(csType) == true){
		GO_BOARD_VIEW(csType, viewIdx);
		return;
	}

	var boardCategory = '';
	var boardCate = params['type'];
	if(boardCate && isDefined(boardCate) == true){
		boardCategory = decodeURIComponent(boardCate);
	}

	if(isDefined(boardCategory) == false){
		 $(MOBILE_PAGE.cs.DATA.INFO_ELE).data('cate1','');
	}

	var $boardListContentsEle = $(MOBILE_PAGE.cs.DATA.LIST_ELE);
	if(isDefined(info.m_list) == true){
		$boardListContentsEle = $(info.m_list);
	}

	MOBILE_PAGE.cs.defaultBinding(csType);

	if(MOBILE_PAGE.cs.DATA.LAST_HASH == location.hash){
		console.log('same saved hash');
		//console.log($boardListContentsEle.data('load'));
		if($boardListContentsEle.length > 0){
			if($boardListContentsEle.text().length < 100 || $boardListContentsEle.data('load') != 1){
				console.log('empty coupon contents list 1');
				MOBILE_PAGE.cs.setCsBoardListData(page, csType);
			}
		}else{
			console.log('empty foryou contents list 2');
			MOBILE_PAGE.cs.setCsBoardListData(page, csType);
		}
		return;
	}

	MOBILE_PAGE.cs.setCsBoardListData(page, csType);
};




//for you contetns : member
MOBILE_PAGE.cs.setCsBoardListData = function(nextPage, csType){
	console.log('MOBILE_PAGE.cs.setCsBoardListData');

	if(isDefined(nextPage) == false || $.isNumeric(nextPage) == false){
		nextPage = 1;
	}

	var $infoEle = $(MOBILE_PAGE.cs.DATA.INFO_ELE);
	var infoData = null;
	if($infoEle.length > 0){
		infoData = $infoEle.data();
		console.log('infoData', infoData);

	}
	if(isDefined(csType) == false){
		csType = 'notice';
		if(isDefined(infoData) == true){
			if(isDefined(infoData.type)){
				csType = infoData.type;
			}
		}
	}
	var csBoardGroup = 'cs';
	if(csType == 'faq'){
		csBoardGroup = 'member';
	}else if(csType == 'faq'){
		csBoardGroup = 'one';
	}

	if(isDefined(infoData)){
		if(isDefined(infoData.group) == true){
			csBoardGroup = infoData.group;
		}
	}

	var sendData = {
 		page 		:	nextPage,
 		limit		: 	null,
 		type		:	csType,
 		group		:	csBoardGroup,
 		cate		:	'ALL',
 		search		:	'',
 	};

 	if(isDefined(infoData) == true){
 		if(isDefined(infoData.cate1)){
			sendData.cate = infoData.cate1;
		}

		if(isDefined(infoData.search)){
			sendData.search = infoData.search;
		}
	}

 	console.log('sendData', sendData);

 	MOBILE_PAGE.cs.getBoardListContentsData(sendData, $infoEle);

};

MOBILE_PAGE.cs.getBoardListContentsData = function(getData, $infoEle, callbackFun){
	console.log('MOBILE_PAGE.cs.getNoticeListContentsData', getData);

	var sendData = {
		l			: 10,			//limit
		page		: 1,
		is_mobile	: 1,			//is mobile
		t			: 'cs',				//
		b			: '',				//cs type
		c			: 'ALL',			//category
		s			: ''
	};
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['type'])){ sendData.b = getData.type; }
		if(isDefined(getData['group'])){ sendData.t = getData.group; }
		if(isDefined(getData['cate'])){ sendData.c = getData.cate; }
		if(isDefined(getData['search'])){ sendData.s = getData.search; }

	}
	console.log('sendData', sendData);


	if(isDefined(sendData.b) == false){
		console.log('cs type err');
		return;
	}

	var csType = sendData.b;


	var $boardListContentsEle = $(MOBILE_PAGE[csType].DATA.LIST_ELE);
	if(isDefined($infoEle) == false){
		$infoEle = $(MOBILE_PAGE.cs.DATA.INFO_ELE);
	}

	if($boardListContentsEle.length < 1){
		console.log('$boardListContentsEle empty');
		return;
	}

	var $containerEle = $(MOBILE_PAGE.cs.DATA.CONTAINER_ELE);
	var containerId = 'mobile-cs-list-'+csType;
	var successFunGetBoardContentsList = function(data){
		console.log('successFunGetBoardContentsList', data);
		var curPage = 1;



		if(isDefined(data.board_list_data)){
			var boardData = data.board_list_data;
			var boardList = boardData.list;
			var innerContentsHtml = [];

			if(isDefined(boardData.page)){
				curPage = boardData.page;
			}


			var csBoard;
			for(var cc in boardList){
				csBoard = new Cs_board(csType, cc, 1);
				csBoard.setData(boardList[cc]);
				if(csType == 'news'){
					innerContentsHtml.push(csBoard.getMobileCsNewsListHtml());
				}else{
					innerContentsHtml.push(csBoard.getMobileCsListHtml());
				}

			}
			//console.log('innerContentsHtml', innerContentsHtml);
			var listCount = innerContentsHtml.length;
			var pageLimit = 20;
			if(isDefined(boardData.limit)){
				pageLimit = parseInt(boardData.limit);
			}

			var boardCategory = 0;
			if(isDefined(data.board_category)){
				boardCategory = data.board_category;
			}
			var boardSearch = '';
			if(isDefined(data.search)){
				boardSearch = data.search;
			}
			var saveData = {
				cate1	:	boardCategory,
				search	:	boardSearch,
				type	: 	csType
			}

			console.log('curPage', curPage);
			console.log('pageLimit', pageLimit);
			console.log('listCount', listCount);
			//listCount = 0;
			//페이징 : 더보기 타입
			if(csType == 'qa'){


				/*
				if(listCount > 0){
					if(curPage == 1){
						$boardListContentsEle.html(innerContentsHtml.join(''));
					}else{
						$boardListContentsEle.append(innerContentsHtml.join(''));
					}
				}
				*/

				//var listCount =  mvListHtml.length;
				/*
				var saveData = {
						type	:	data.type,
						page	:	curPage,
						load	: 1,
				}
				*/
				//saveData.page = curPage;
				saveData.load = 1;
				saveData.group = 'one';

				var pageLimit = boardData.limit;
				if(listCount > 0){
					saveData.page = curPage;
					saveData.loaded = curPage;
					saveData.total_page = curPage + 1;
					if(curPage == 1){
						$boardListContentsEle.html(innerContentsHtml.join('')).data('load', 1);
					}else{
						$boardListContentsEle.append(innerContentsHtml.join(''));
					}
					if(listCount < pageLimit){
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
						console.log('no data show', containerId);
						//$('.f_content.mobile-cs-list-qa').addClass('no-data');
						$containerEle.find('.f_content.'+containerId).addClass('no-data');
					}
					$infoEle.data(saveData).removeClass('loading').addClass('ending');

				}

				console.log('saveData', saveData);

				MOBILE_PAGE.cs.afterBinding();




			//페이징 : 이전 다음 타입
			}else{
				$boardListContentsEle.html(innerContentsHtml.join(''));

				//내용을 ele에 저장 - view 때문
				if(csType == 'notice' || csType == 'faq'){
					for(var cd in boardList){
						var sData = boardList[cd];
						sData.load = 0;
						var $targetBoardEle = $('#mobile-cs-'+csType+'-list-item-'+sData.bbs_board_idx);
						if($targetBoardEle.length > 0){
							$targetBoardEle.data(sData);
						}

					}
				}


				if(curPage == 1){
					$infoEle.find('.prev').addClass('disabled');
				}

				if(innerContentsHtml.length > 0){
					saveData.page = curPage;
					saveData.loaded = curPage;
					saveData.total_page = curPage + 2;

					if(pageLimit > listCount){
						saveData.total_page = curPage;
						$infoEle.data(saveData).removeClass('loading').addClass('ending');
						//$infoEle.find('.prev').addClass('disabled');
						$infoEle.find('.next').addClass('disabled');

					}else{
						$infoEle.data(saveData).addClass('loading').removeClass('ending');
						$infoEle.find('.next').removeClass('disabled');
						if(curPage > 1){
							$infoEle.find('.prev').removeClass('disabled');
						}
					}
					$containerEle.find('.f_content.'+containerId).removeClass('no-data');
				}else{

					saveData.page = curPage;
					saveData.loaded = curPage;
					saveData.total_page = curPage;
					if(curPage == 1){
						console.log('no data show', containerId);
						$containerEle.find('.f_content.'+containerId).addClass('no-data');
					}
					$infoEle.data(saveData).removeClass('loading').addClass('ending');
					$infoEle.find('.next').addClass('disabled');
					$infoEle.find('.prev').addClass('disabled');

				}
				console.log('saveData', saveData);
				MOBILE_PAGE.cs.afterBindingPagingSet(csType, curPage);
				GO_TOP();
			}



		}

		//save hash
		MOBILE_PAGE.cs.DATA.LAST_HASH = location.hash;



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

//게시판 내용 보기
MOBILE_PAGE.cs.onclickOpenBoardView = function(thisEle){
	console.log('MOBILE_PAGE.cs.onclickOpenBoardView');

	var eleData = $(thisEle).data();
	console.log(eleData);
	var csIdx = eleData.idx;
	var csType = eleData.type;

	if(isDefined(csIdx) == false || isDefined(csType) == false){
		return;
	}

	var eleId = $(thisEle).attr('id');
	console.log('eleId' , eleId);

	if(csType == 'news'){
		if(eleData.load == 1){
			$(thisEle).toggleClass('active');

		}
	}
	else if(csType == 'faq'){
		if(eleData.load == 1){
			$(thisEle).toggleClass('active');
		}else{
			if(isDefined(eleData.bbs_board_contents)){
				$(thisEle).find('.board-contents-area').html(eleData.bbs_board_contents);
				$(thisEle).data('load', 1).toggleClass('active');
			}else{
				GO_BOARD_VIEW(csType, csIdx);
			}
		}
	}else if(csType == 'notice'){

		/*
		if(eleData.load == 1){
			$(thisEle).toggleClass('active');
		}else{
			if(isDefined(eleData.bbs_board_contents)){
				$(thisEle).find('.board-contents-area').html(eleData.bbs_board_contents);
				$(thisEle).data('load', 1).toggleClass('active');
			}else{
				GO_BOARD_VIEW(csIdx, csType);
			}
		}
		*/

		if(isDefined(eleData.bbs_board_contents)){
			$(thisEle).find('.board-contents-area').html(eleData.bbs_board_contents);
			$(thisEle).data('load', 1);

			var csBoard = new Cs_board(csType, 0, 1);
			csBoard.setData(eleData);
			var noticeViewHtml = csBoard.getMobileCsViewHtml(1);

			var openModalCallbackFun = function($modalEle){
				console.log('openModalCallbackFun');
				console.log($modalEle);


			};
			if(isDefined(noticeViewHtml)){
				var endListAniFun = function(){
					OPEN_PAGE_MODAL(noticeViewHtml, openModalCallbackFun);

					$('.mobile-cs-list-item.active').removeClass('active');
					$(thisEle).addClass('active');
				};

				//set ani
				var mvScrollTop = $(thisEle).offset().top - 111;
				var $target = $('html,body');
				$target.animate({
					scrollTop: mvScrollTop
				}, 200).promise().done(function(){
					console.log("Done animating");
					endListAniFun();
				});

			}

		}else{
			GO_BOARD_VIEW(csType, csIdx);
		}

	}else if(csType == 'qa'){
		GO_BOARD_VIEW(csType, csIdx);
	}

	if(csType == 'news' || csType == 'faq'){
		if(isDefined(eleId)){
			if($(thisEle).hasClass('active')){
				utility.ui.goToElement('#'+eleId, 110, 110);
			}else{
				$('.mobile-cs-list-item.active').removeClass('active');
			}
		}

	}
};


//게시물 좋아요
MOBILE_PAGE.cs.onclickLikeBoardContents = function(thisEle){
	console.log('MOBILE_PAGE.cs.onclickLikeBoardContents');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.type) == false || isDefined(eleData.idx) == false){
		console.log('empty idx');
		return;
	}


	var lastTime = utility.disk.getStorageData('boardHeartTime');
	console.log('lastTime', lastTime);

	var timestampSecond = Math.floor(+ new Date() / 1000);
	console.log('timestampSecond', timestampSecond);
	//return;
	var checkTime = 0;
	if(isDefined(lastTime) == true){
		checkTime = parseInt(lastTime);
	}
	//시간  체크 -10초 - 중복 방지
	if(timestampSecond < (checkTime + 10) ){
		//alert('당신의 하트는 기다림이 필요합니다. 1분뒤에 다시 시도해주세요.');
		console.log('time check');
		//var show_msg = '를 좋아합니다.';
		var show_msg = '게시물을 좋아합니다.';
		var msgType =  "alert-warning";
		$.ambiance({message: show_msg, type:msgType});
		$(thisEle).addClass('active');
		return;
	}

	var likeCount = 0;
	if(isDefined(eleData.cnt)){
		if($.isNumeric(eleData.cnt)){
			likeCount = parseInt(eleData.cnt);
		}
	}

	var sendData = {
		is_mobile	: 1,
		idx			: parseInt(eleData.idx),
		t			: eleData.type,
		action		: 'like'
	};
	console.log('sendData', sendData);

	var successLikeContentsCallbackFun = function(data){
		console.log('successLikeContentsCallbackFun');
		console.log(data);

		if(isDefined(data.show_msg)){
			var msgType =  "alert-info";
			//if(data.action == 'like'){
				msgType =  "alert-danger";
				$(thisEle).addClass('active');
				utility.disk.setStorageData('boardHeartTime', timestampSecond);
			//}
			$.ambiance({message: data.show_msg, type:msgType});
		}

		if(isDefined(data.is_ok)){
			if(data.is_ok == 1){
				likeCount = likeCount + 1;
				$(thisEle).data('cnt', likeCount);
				$(thisEle).find('.num').text(disk_number_format(likeCount));
			}

		}


	}
	COMMON_ACTION.BBS.BOARD.actionLikeBbsContents(sendData, successLikeContentsCallbackFun);

};



MOBILE_PAGE.notice= {};
MOBILE_PAGE.notice.DATA = {
	CS_TYPE		: 'notice',
	LAST_HASH	: null,
	INFO_ELE	: '#mobile-notice-list-page-end-spy',
	LIST_ELE	: '.mobile-notice-list-main-list-wrap',

	//CONTAINER_ELE	: '#mobile-container-deep-24',
}
MOBILE_PAGE.notice.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.notice.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//MOBILE_PAGE.notice.DATA.LAST_HASH = MOBILE_PAGE.notice.DATA.LAST_HASH;
	MOBILE_PAGE.cs.DATA.INFO_ELE = MOBILE_PAGE.notice.DATA.INFO_ELE;
	MOBILE_PAGE.cs.DATA.LIST_ELE = MOBILE_PAGE.notice.DATA.LIST_ELE;

	MOBILE_PAGE.cs.init(showContainerInfo, hashPrams);
	return;
};


/* cs board news */
MOBILE_PAGE.news= {};
MOBILE_PAGE.news.DATA = {
	CS_TYPE		: 'news',
	LAST_HASH	: null,
	INFO_ELE	: '#mobile-news-list-page-end-spy',
	LIST_ELE	: '.mobile-news-list-main-list-wrap',
	//CONTAINER_ELE	: '#mobile-container-deep-24',
}
MOBILE_PAGE.news.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.news.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//MOBILE_PAGE.news.DATA.LAST_HASH = MOBILE_PAGE.news.DATA.LAST_HASH;
	MOBILE_PAGE.cs.DATA.INFO_ELE = MOBILE_PAGE.news.DATA.INFO_ELE;
	MOBILE_PAGE.cs.DATA.LIST_ELE = MOBILE_PAGE.news.DATA.LIST_ELE;

	MOBILE_PAGE.cs.init(showContainerInfo, hashPrams, MOBILE_PAGE.news.DATA.CS_TYPE);
	return;
};


//새소식에서 태크 클릭
MOBILE_PAGE.news.onclickNewsContentsTags = function(thisEle){
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.search) == false){
		console.log('search key empty');
		return;
	}
	var searchCategory;
	if(isDefined(eleData.cate) == true && $.isNumeric(eleData.cate) == true){
		searchCategory = eleData.cate;
	}
	GO_SEARCH(eleData.search, searchCategory);

};



/* cs board faq */
MOBILE_PAGE.faq= {};
MOBILE_PAGE.faq.DATA = {
	CS_TYPE		: 'faq',
	LAST_HASH	: null,
	INFO_ELE	: '#mobile-faq-list-page-end-spy',
	LIST_ELE	: '.mobile-faq-list-main-list-wrap',
	SEARCH_FORM : 'form[name=mobileCsFaqSearchForm]',
	//CONTAINER_ELE	: '#mobile-container-deep-24',
}

MOBILE_PAGE.faq.faqSearchBinding = function(){
	console.log('MOBILE_PAGE.faq.faqSearchBinding');

	//fqq 검색 form 바인딩
	var $reqListSearchFormEle = $(MOBILE_PAGE.faq.DATA.SEARCH_FORM);
	if($reqListSearchFormEle.length > 0){
		$reqListSearchFormEle.unbind( "submit");
		$reqListSearchFormEle.bind('submit', function(event){
			event.preventDefault();
			var formValues = $(this).serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData:',formData);

			if(isDefined(formData.faq_search) == false || formData.faq_search.length < 2){
				$reqListSearchFormEle.find('input[name=faq_search]').blur();
				disk_alert('검색하실 게시물의 제목을 2자 이상 입력해주세요.');
				return false;
			}


			var $infoEle = $(MOBILE_PAGE.faq.DATA.INFO_ELE);
			if($infoEle.length < 1 && isDefined(eleData.info) == true){
				$infoEle = $('#'+eleData.info);
			}
			if($infoEle.length > 0){
				$infoEle.data('search', formData.faq_search);
				MOBILE_PAGE.cs.setCsBoardListData(1, MOBILE_PAGE.faq.DATA.CS_TYPE);
			}
			return false;
		});
	}
}
MOBILE_PAGE.faq.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.faq.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//MOBILE_PAGE.faq.DATA.LAST_HASH = MOBILE_PAGE.faq.DATA.LAST_HASH;
	MOBILE_PAGE.cs.DATA.INFO_ELE = MOBILE_PAGE.faq.DATA.INFO_ELE;
	MOBILE_PAGE.cs.DATA.LIST_ELE = MOBILE_PAGE.faq.DATA.LIST_ELE;


	MOBILE_PAGE.faq.faqSearchBinding();

	MOBILE_PAGE.cs.init(showContainerInfo, hashPrams, MOBILE_PAGE.faq.DATA.CS_TYPE);
	return;
};

//FAQ : 서브 카테고리 클릭
MOBILE_PAGE.faq.onclickShowFaqSubCategory = function(thisEle){
	var targetEle = $(thisEle).data('target');
	if(isDefined(targetEle)){
		$(thisEle).parent('.'+targetEle).toggleClass('active');
	}
};


//FAQ : 카테고리 선택
MOBILE_PAGE.faq.onclickFaqSelectCategoryItem = function(thisEle){
	console.log('MOBILE_PAGE.faq.onclickFaqSelectCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	/*
	var $formEle = $(MOBILE_PAGE.request_write.DATA.FORM_ELE);
	if($formEle.length < 1){
		console.log('form ele err');
	}
	*/

	var $fContentsEle = $('.f_content.mobile-cs-list-faq');
	if($fContentsEle.length < 1){
		console.log('$fContentsEle empty');
		return;
	}

	if(isDefined(eleData.key) == true && isDefined(eleData.name) == true){
		$fContentsEle.find('.faq-selected-category-tit').text(eleData.name);
		var $infoEle = $(MOBILE_PAGE.faq.DATA.INFO_ELE);
		if($infoEle.length < 1 && isDefined(eleData.info) == true){
			$infoEle = $('#'+eleData.info);
		}
		if($infoEle.length > 0){
			var boardCategory = '';
			if(isDefined(eleData.key)){
				boardCategory = encodeURIComponent(eleData.key);
				$infoEle.data('cate1', eleData.key);
			}
			location.hash = '#!action=faq&type='+boardCategory+'&search=&page=1';
		}


	}
	$fContentsEle.find('.cs-faq-sub-category').toggleClass('active');
};




/* cs board qa */
MOBILE_PAGE.qa= {};
MOBILE_PAGE.qa.DATA = {
	CS_TYPE		: 'qa',
	LAST_HASH	: null,
	INFO_ELE	: '#mobile-cs-qa-list-page-end-spy',
	LIST_ELE	: '.mobile-qa-list-main-list-wrap',
	SEARCH_FORM : 'form[name=mobileCsQaSearchForm]',
	//CONTAINER_ELE	: '#mobile-container-deep-24',
}

MOBILE_PAGE.qa.defaultBinding = function(){
	console.log('MOBILE_PAGE.qa.defaultBinding');

};

MOBILE_PAGE.qa.start = function(showContainerInfo, hashPrams){

	console.log('MOBILE_PAGE.qa.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}

	//MOBILE_PAGE.qa.DATA.LAST_HASH = MOBILE_PAGE.qa.DATA.LAST_HASH;
	MOBILE_PAGE.cs.DATA.INFO_ELE = MOBILE_PAGE.qa.DATA.INFO_ELE;
	MOBILE_PAGE.cs.DATA.LIST_ELE = MOBILE_PAGE.qa.DATA.LIST_ELE;


	MOBILE_PAGE.qa.defaultBinding();

	MOBILE_PAGE.cs.init(showContainerInfo, hashPrams, MOBILE_PAGE.qa.DATA.CS_TYPE);
	return;
};

//board list : more
MOBILE_PAGE.qa.onclickMoreMobileData = function(thisEle){
	console.log('MOBILE_PAGE.qa.onclickMoreMobileData');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if($(thisEle).hasClass('ending')){
		console.log('has cls ending');
		return;
	}


	var mypageLoadedPage = 1;
	var mypageTotalPage = 1;
	if(isDefined(eleData.loaded)){
		mypageLoadedPage = parseInt(eleData.loaded);
	}
	if(isDefined(eleData.total_page)){
		mypageTotalPage = parseInt(eleData.total_page);
	}

	var nextPage = mypageLoadedPage + 1;
	if(nextPage > mypageTotalPage){
		console.log('max page');
		$(thisEle).data({page :mypageLoadedPage, loaded : mypageLoadedPage, total_page:mypageLoadedPage}).removeClass('loading').addClass('ending');
		return;
	}

	MOBILE_PAGE.cs.setCsBoardListData(nextPage, MOBILE_PAGE.qa.DATA.CS_TYPE);
};



//1:1 문의 하기 글쓰기
MOBILE_PAGE.qa.openMobileBoardWriteFormView = function(){
	console.log('MOBILE_PAGE.qa.openMobileBoardWriteFormView');


	var viewHtml = MOBILE_TEMPLETE.CONNTAINER.qa_write();
	var openCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);

		MOBILE_PAGE.qa_write.formBinding();
	};
	OPEN_PAGE_MODAL(viewHtml, openCallbackFun);
	return;
};

MOBILE_PAGE.qa_write = {};


MOBILE_PAGE.qa_write.formBinding = function(){
	console.log('MOBILE_PAGE.qa_write.formBinding');



	var closeFormCallBackFun = function(){
		console.log('closeFormCallBackFun');
		MOBILE_PAGE.cs.setCsBoardListData(1, MOBILE_PAGE.qa.DATA.CS_TYPE);
		return;
	}

	var successQaWriteFormFun = function(data){
		console.log('successQaWriteFormFun');
		console.log(data);

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		//location.reload(true);
		CLOSE_PAGE_MODAL(closeFormCallBackFun);

	};



	//var $reqListSearchFormEle = $(MOBILE_PAGE.faq.DATA.SEARCH_FORM);
	var $targetFormEle = $('#MobileCsQaWriteForm');
	if($targetFormEle.length > 0){
		$targetFormEle.unbind( "submit");
		$targetFormEle.bind('submit', function(event){
			console.log('csFaqSearchForm submit');
			event.preventDefault();
			//event.preventDefault();
			var formValues = $targetFormEle.serializeArray();
			console.log('formValues:', formValues);

			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);

			$targetFormEle.find('.input-err-msg').removeClass('show');

			if(isDefined(formData.qa_category) == false){
				//alert('문의 구분을 선택해주세요.');
				$targetFormEle.find('.input-err-msg.qa_category').addClass('show');
				return false;
			}

			if(isDefined(formData.qa_title) == false){
				//alert('문의 제목을 입력해주세요.');
				$targetFormEle.find('.input-err-msg.qa_title').addClass('show');
				return false;
			}

			if(formData.qa_title.length < 5 || formData.qa_title.length > 100){
				//alert('문의 제목은 최소 10자에서 최대 100자까지 가능합니다.');
				$targetFormEle.find('.input-err-msg.qa_title').addClass('show');
				return false;
			}

			var qaContentsDefaultValus =  $('#csQaWriteForm-qa_contents').prop("defaultValue");
			console.log('qaContentsDefaultValus', qaContentsDefaultValus);
			if(qaContentsDefaultValus == $('#csQaWriteForm-qa_contents').val()){
				console.log('same def');
				//alert('문의 내용을 입력해주세요.');
				$targetFormEle.find('.input-err-msg.qa_contents').addClass('show');
				return false;
			}


			if(isDefined(formData.qa_contents) == false){
				//alert('문의 내용을 입력해주세요.');
				$targetFormEle.find('.input-err-msg.qa_contents').addClass('show');
				return false;
			}

			if(qaContentsDefaultValus == formData.qa_contents){
				//alert('문의 내용을 입력해주세요.');
				$targetFormEle.find('.input-err-msg.qa_contents').addClass('show');
				return false;
			}

			if(formData.qa_contents.length < 10){
				//alert('문의 내용을 20자 이상 입력해주세요.');
				$targetFormEle.find('.input-err-msg.qa_contents').addClass('show');
				return false;
			}

			if(formData.qa_contents.length > 2000){
				alert('문의 내용을 2000자 이하로 입력해주세요.');
				//$('#'+formEleId+'-qa_contents').focus();
				return false;
			}

			var isReplyEmail = 0;
			if(isDefined(formData.qa_reply_email) == true){

				if(formData.qa_reply_email == 'on'){
					isReplyEmail = 1;
					if(isDefined(formData.qa_email) == false){
						//alert('답변 알림을 받으실 메일 주소를 입력해주세요.');
						$targetFormEle.find('.input-err-msg.qa_email').addClass('show');
						return false;
					}
				}

			}

			if(isReplyEmail == true){
				if(isDefined(formData.qa_reply_email_agree) == false || formData.qa_reply_email_agree != 'on'){
					//alert('답변 알림을 받으실려면 개인정보 수집·이용에 동의하셔야 합니다.');
					$targetFormEle.find('.input-err-msg.qa_reply_email_agree').addClass('show');
					//$('#'+formEleId+'-qa_reply_email_agree').focus();
					return false;
				}
			}

			formData.is_replay_email = isReplyEmail;
			formData.is_mobile = 1;
			console.log('formData', formData);






			COMMON_ACTION.CS.setWriteQaFormAction(formData, successQaWriteFormFun);



		});
	}

};

//개인정보 수집 이용 동의 내용 보기
MOBILE_PAGE.qa_write.onclickMorePrivacyTxt = function(thisEle){
	console.log('MOBILE_PAGE.qa_write.onclickMorePrivacyTxt');
	$(thisEle).parents('.privacy-agree-area').toggleClass('active');
};

//문의 분류 박스 클릭
MOBILE_PAGE.qa_write.onclickOpenQaTypeSelectBox = function(thisEle){
	console.log('MOBILE_PAGE.qa_write.onclickOpenQaTypeSelectBox');
	$(thisEle).parents('.qa-type-select-area').toggleClass('active');
};

//문의 분류 선택
MOBILE_PAGE.qa_write.onclickSelectedQaTypeItem = function(thisEle){
	console.log('MOBILE_PAGE.qa_write.onclickSelectedQaTypeItem');
	var eleData = $(thisEle).data();
	var $targetFormEle = $('#MobileCsQaWriteForm');
	if($targetFormEle.length > 0 && isDefined(eleData)){
		console.log('eleData', eleData);
		if(isDefined(eleData.val)){
			$targetFormEle.find('input[name='+eleData.form+']').val(eleData.val);
			$targetFormEle.find('.'+eleData.target).text(eleData.name);

			$(thisEle).parents('.qa-type-select-area').toggleClass('active');
		}
	}
};

MOBILE_PAGE.qa_write.onclickBuylist = function (page){

   $tartgetDiv = ".one_my_list";
   if(!isDefined($tartgetDiv)){
        alert("재시도 부탁드립니다.");
        return;
   }
   if(page == 1){
        qa_page = 1;
   }
   var successBuyContentsList = function(res){
        console.log("MOBILE_PAGE.qa_write.onclickBuylist");
        console.log(res);

        var Cnt = 0;
            Cnt = parseInt(res.contents_cnt) - (res.page* res.page_limit);
        var innerHtml = MOBILE_TEMPLETE.QA_IN_BUY_LIST.getMobileBuyContentsListHtmlVer2(res.member_contents_list);
        //console.log(innerHtml)
        if(qa_page == 1){
           $($tartgetDiv).show();
           $($tartgetDiv).empty();
           $($tartgetDiv).append(innerHtml);
        }else{
            $(".g_btn_all").remove();
            $(".c_list_ul").append(innerHtml);
        }

        if(Cnt>5){
            var more ='<span class="g_btn_all" onclick="MOBILE_PAGE.qa_write.onclickBuylist(\'.one_my_list\')"><span>더보기</span><span class="ico_arrow"></span></span>'
            $(more).appendTo(".innerSubDiv");
        }

        qa_page++;
    }

    var formData = {page : qa_page};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_BUY_LIST,
		data		: formData,
		success_fun	: successBuyContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
}

MOBILE_PAGE.qa_write.bbsInputClick = function (inputdata){
    $("#csQaWriteForm-qa_bbs_id").val(inputdata);
    $("#csQaWriteForm-qa_bbs_id").focus();
}
