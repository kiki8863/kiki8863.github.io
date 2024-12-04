/*
*	moible coupon
*/

MOBILE_PAGE.request_list = {};
MOBILE_PAGE.request_list.DATA = {
	LAST_HASH	: null,
	INFO_ELE	: '#mobile-request-list-page-end-spy',
	LIST_ELE	: '.mobile-request-list-main-list-wrap',
	CONTAINER_ELE	: '#mobile-container-deep-25',
	SEARCH_FORM	: '#mobileRequestListSearchForm'
}
MOBILE_PAGE.request_list.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.request_list.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	
	if(isDefined(showContainerInfo.target)){
		MOBILE_PAGE.request_list.DATA.CONTAINER_ELE = '#'+showContainerInfo.target;
	}
	
	MOBILE_PAGE.request_list.init(showContainerInfo, hashPrams);	
};




MOBILE_PAGE.request_list.defaultBinding = function(requestType){
	console.log('MOBILE_PAGE.request_list.defaultBinding', requestType);	
	
	
	//tab active
	if(requestType != 0){
		$('.request-list-top-tab.active').removeClass('active');
		$('.request-list-top-tab.type-'+requestType).addClass('active');	
	}
	
	MOBILE_PAGE.request_list.reqSearchBinding();
	
};


MOBILE_PAGE.request_list.reqSearchBinding = function(){
	console.log('MOBILE_PAGE.request_list.reqSearchBinding');	
	
	
	//채널 검색 form 바인딩
	var $reqListSearchFormEle = $(MOBILE_PAGE.request_list.DATA.SEARCH_FORM);
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
			
			if(isDefined(formData.req_search) == false || formData.req_search.length < 2){
				$reqListSearchFormEle.find('input[name=req_search]').blur(); 
				disk_alert('검색하실 게시물의 제목을 2자 이상 입력해주세요.');
				//$reqListSearchFormEle.find('input[name=k]').focus();
				return false;
			}
			
			utility.shortPagination.reset();
			$('.request-selected-category-tit').text('카테고리 선택');
			$(MOBILE_PAGE.request_list.DATA.INFO_ELE).data({'cate1':0, 'search': formData.req_search});
			
			//tab active
			//$('.request-list-top-tab.active').removeClass('active');
			//$('.request-list-top-tab.type-0').addClass('active');
			

			MOBILE_PAGE.request_list.setRequestListData(1);
			return false;
			
		});
	}
};



MOBILE_PAGE.request_list.afterBinding  = function(curPage){
	console.log('MOBILE_PAGE.request_list.afterBinding ', curPage);	
	
	
	if(isDefined(curPage) == false || $.isNumeric(curPage) == false){
		curPage = 1;
	}
	
	var pagNationCallbackFun = function(cData){
		console.log('pagNationCallbackFun', cData);	
		//MOBILE_PAGE.request_list.setRequestListData(cData.next_page);
		if(isDefined(cData.next_page) == true){
			if(isDefined(cData.type) == false){
				cData.type = 0;
			}
			if(cData.type == 0 && cData.next_page == 1){
				
				 location.hash = '#!action=request_list';
				 //&& isDefined(cData.type) == true
			}else{
				location.hash = '#!action=request_list&type='+cData.type+'&page='+cData.next_page;
			}
			return;
		}
		console.log('err empty next page');
			
	};
		
	//리스트 - 이전, 다음
	var $infoEle = $(MOBILE_PAGE.request_list.DATA.INFO_ELE);
	console.log($infoEle.data());
	var isLoaded = false;
	if($infoEle.length > 0){
		if($infoEle.data('load') > 0){
			isLoaded = true;
		}
		if(isLoaded == false){
			console.log('shortPagination isLoaded', isLoaded);
			var $btnChannelBroChapterControler = $( ".btn-request-list" );
			if($btnChannelBroChapterControler.length > 0){
				//$btnChannelBroChapterControler.unbind( "click");
				$btnChannelBroChapterControler.on( "click", function() {
					console.log('click btn-request-list');
					utility.shortPagination.action($(this), '.btn-request-list',pagNationCallbackFun);	//반드시 .을 붙인다
				});
				$infoEle.data('load', 1);
				$infoEle.find('.now_page').empty();
				utility.shortPagination.reset();
			}
		}
	}
	
	
	
	MOBILE_COMMON.afterLoadCommonBinding();	
	
};



MOBILE_PAGE.request_list.init = function(info, params){
	console.log('MOBILE_PAGE.request_list.init');
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;		
	}
	
	
	var actionType = params['!action'];
	if(actionType != 'request_list'){
		console.log('action type err');
		return;
	}
	
	var requestType = params['type'];
	if(isDefined(requestType) == false){
		requestType = 0;
	}
	
	var page = params['page'];
	if(isDefined(page) == false || $.isNumeric(page) == false){
		page = 1;
	}
	page = parseInt(page);
	
	var $requestListContentsEle = $(MOBILE_PAGE.request_list.DATA.LIST_ELE);
	if(isDefined(info.m_list) == true){
		$requestListContentsEle = $(info.m_list);
	}
	
	MOBILE_PAGE.request_list.defaultBinding(requestType);
	
	if(MOBILE_PAGE.request_list.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		//console.log($requestListContentsEle.data('load'));
		if($requestListContentsEle.length > 0){
			if($requestListContentsEle.text().length < 100 || $requestListContentsEle.data('load') != 1){
				console.log('empty coupon contents list 1');
				MOBILE_PAGE.request_list.setRequestListData(page, requestType);	
			}
		}else{
			console.log('empty foryou contents list 2');
			MOBILE_PAGE.request_list.setRequestListData(page, requestType);
		}
		return;
	}
	
	MOBILE_PAGE.request_list.setRequestListData(page, requestType);
	
};




//for you contetns : member
MOBILE_PAGE.request_list.setRequestListData = function(nextPage, requestType){
	console.log('MOBILE_PAGE.request_list.setRequestListData');
	
	if(isDefined(nextPage) == false || $.isNumeric(nextPage) == false){
		nextPage = 1;
	}
	
	var $infoEle = $(MOBILE_PAGE.request_list.DATA.INFO_ELE);
	var infoData = null;
	if($infoEle.length > 0){
		var infoData = $infoEle.data();
		console.log('infoData', infoData);
		
	}
	if(isDefined(requestType) == false){
		requestType = 0;
		if(isDefined(infoData) == true){
			if(isDefined(infoData.type)){
				requestType = infoData.type;
			}
		}
	}
	
	var sendData = {
 		page 		:	nextPage,
 		limit		: 	null,
 		my			:	'',
 		cate		:	0,
 		complete	:	0,
 		search		:	'',
 	};
 	
 	if(requestType == 'my'){
 		sendData.complete = 0;
 		sendData.my = 1;
 	}else{
 		if($.isNumeric(requestType)){
 			sendData.complete = parseInt(requestType);	
 		}
 	}
 	
 	if(isDefined(infoData) == true){
 		if(isDefined(infoData.cate1)){
			sendData.cate = infoData.cate1;
		}
		
		if(isDefined(infoData.search)){
			sendData.search = infoData.search;
		}
	}
 	
 	console.log('sendData', sendData);
 	
 	MOBILE_PAGE.request_list.getBoardListContentsData(sendData, $infoEle);
 	
};



MOBILE_PAGE.request_list.getBoardListContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.request_list.getNoticeListContentsData', getData);
	
	var sendData = {
		l			: 20,			//limit
		page		: 1,
		is_mobile	: 1,			//is mobile
		q			: 0,			//is my
		f			: '',			//has file
		c			: '',			//category
		s			: ''
	};
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['my'])){ sendData.q = getData.my; }
		if(isDefined(getData['complete'])){ sendData.f = getData.complete; }
		if(isDefined(getData['cate'])){ sendData.c = getData.cate; }
		if(isDefined(getData['search'])){ sendData.s = getData.search; }
		
	}
	console.log('sendData', sendData);
	
	var $requestListContentsEle = $(MOBILE_PAGE.request_list.DATA.LIST_ELE);
	if(isDefined($infoEle) == false){
		$infoEle = $(MOBILE_PAGE.request_list.DATA.INFO_ELE);
	}
	
	if($requestListContentsEle.length < 1){
		console.log('$requestListContentsEle empty');
		return;
	}
	
	var $containerEle = $(MOBILE_PAGE.request_list.DATA.CONTAINER_ELE);
	var containerId = 'request-list';
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
			
			var isMy = 0;
			if(isDefined(data.is_my)){
				isMy = data.is_my;
			}
			
			var reqType = sendData.f;
			if(isDefined(data.request_type)){
				reqType = data.request_type;
				if(isMy == 1){
					reqType = 'my';
				}
			}
			var reqBoard;
			for(var cc in boardList){
				reqBoard = new Req(cc, 1);
				reqBoard.setData(boardList[cc]);
				innerContentsHtml.push(reqBoard.getMobileRequestListHtml(reqType));
				//innerContentsHtml.push(MOBILE_TEMPLETE.PAGE.getMobileRequestListHtml(boardList[cc] , reqType));
			}
			var listCount = innerContentsHtml.length;
			$requestListContentsEle.html(innerContentsHtml.join(''));
			/*
			if(listCount > 0){
				if(curPage == 1){
					$requestListContentsEle.html(innerContentsHtml.join(''));	
				}else{
					$requestListContentsEle.append(innerContentsHtml.join(''));
				}
			}
			*/
			var pageLimit = 20;
			if(isDefined(boardData.limit)){
				pageLimit = parseInt(boardData.limit);
			}
			
			var boardCategory = 0;
			if(isDefined(data.catetory)){
				boardCategory = data.catetory;
			}
			var saveData = {
				my		:	isMy,
				cate1	:	boardCategory,
				search	:	data.search,
				type	: 	reqType
			}
			
			console.log('curPage', curPage);	
			console.log('pageLimit', pageLimit);
			console.log('listCount', listCount);
			
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
			GO_TOP();
			
		}
		
		//save hash
		MOBILE_PAGE.request_list.DATA.LAST_HASH = location.hash;
		
		MOBILE_PAGE.request_list.afterBinding(curPage);
			
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.REQ.GET_BOARD_LIST,
		data		: formData,
		success_fun	: successFunGetBoardContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

/*
MOBILE_PAGE.request_list.onclickMoreMobileRequestData = function(thisEle){
	console.log('MOBILE_PAGE.request_list.onclickMoreMobileRequestData');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if($(thisEle).hasClass('ending')){
		console.log('has cls ending');
		return;
	}
	
	var mypageGroup, mypageId, searchKeyword;
	var mypageLoadedPage = 1;
	var mypageTotalPage = 1;
	if(isDefined(eleData.group)){
		mypageGroup = eleData.group; 
	}
	if(isDefined(eleData.id)){
		mypageId = eleData.id; 
	}
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
	
	MOBILE_PAGE.request_list.setRequestListData(nextPage);
	
};
*/

//요청자료 게시판 : 상단 tab
MOBILE_PAGE.request_list.onclickRequestTypeTab = function(thisEle){
	console.log('MOBILE_PAGE.request_list.onclickRequestTypeTab');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	
	if(isDefined(eleData.type) == true){
		
		//$(MOBILE_PAGE.request_list.DATA.INFO_ELE).data({'load': 0, 'cate1':0});
		$(MOBILE_PAGE.request_list.DATA.INFO_ELE).data({'cate1':0, 'search': ''});
		utility.shortPagination.reset();
		
		//tab active
		$('.request-list-top-tab.active').removeClass('active');
		$(thisEle).addClass('active');
		$('.request-selected-category-tit').text('카테고리 선택');
		
		$(MOBILE_PAGE.request_list.DATA.SEARCH_FORM).find('input[name=req_search]').val(''); 
		
		if(eleData.type == 0){
			location.hash = '#!action=request_list';
		}else{
			location.hash = '#!action=request_list&type='+eleData.type+'&page=1';
		}
	}
	return;
};


//카테고리 리스트 open
MOBILE_PAGE.request_list.onclickOpenCategoryList = function(thisEle){
	console.log('MOBILE_PAGE.request_list.onclickOpenCategoryList');
	$(thisEle).parent('.choice-category-area').toggleClass('active');
};

//카테고리 선택
MOBILE_PAGE.request_list.onclickSelectCategoryItem = function(thisEle){
	console.log('MOBILE_PAGE.request_list.onclickSelectCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.key) == true && $.isNumeric(eleData.key) == true){
		var $infoEle = $(MOBILE_PAGE.request_list.DATA.INFO_ELE);
		if($infoEle.length > 0){
			$infoEle.data('cate1', eleData.key);
			MOBILE_PAGE.request_list.setRequestListData(1);
		}	
		
		$('.f_content.request-list').find('.request-selected-category-tit').text(eleData.name);
	}
	$('.f_content.request-list').find('.choice-category-area').toggleClass('active');
};





MOBILE_PAGE.request_write = {};
MOBILE_PAGE.request_write.DATA = {
	FORM_ELE	: '#mobileBoardReqWriteForm',
}

//카테고리 리스트 open
MOBILE_PAGE.request_write.onclickOpenWriteCategoryList = function(thisEle){
	console.log('MOBILE_PAGE.request_list.onclickOpenWriteCategoryList');
	$(thisEle).parent('.write-choice-category-area').toggleClass('active');
};

//카테고리 선택
MOBILE_PAGE.request_write.onclickWriteSelectCategoryItem = function(thisEle){
	console.log('MOBILE_PAGE.request_list.onclickSelectCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	var $formEle = $(MOBILE_PAGE.request_write.DATA.FORM_ELE);
	if($formEle.length < 1){
		console.log('form ele err');
	} 
	
	if(isDefined(eleData.key) == true && $.isNumeric(eleData.key) == true){
		if($formEle.length > 0){
			$formEle.find('input[name=req_cate]').val(eleData.key);
			$('.f_content.request-write').find('.request-selected-category-tit').text(eleData.name);
		}	
		
	}
	$('.f_content.request-write').find('.write-choice-category-area').toggleClass('active');
};

//요청 게시판 : 글 등록 완료
MOBILE_PAGE.request_write.callbackActionFun = function(data){
	console.log('MOBILE_PAGE.request_write.callbackActionFun');
	console.log(data);	
	if(isDefined(data.show_msg)==true){
		var msgType =  "alert-info";
		$.ambiance({message: data.show_msg, type:msgType});
	}
	CLOSE_PAGE_MODAL();
	var timestampSecond = Math.floor(+ new Date() / 1000);
	
	location.hash = '#!action=request_list&page=1&rt='+timestampSecond;
};


//요청 게시판 : 글쓰기 폼 바인딩
MOBILE_PAGE.request_write.initBinding = function(){
	console.log('MOBILE_PAGE.request_write.initBinding');
	var $formEle = $(MOBILE_PAGE.request_write.DATA.FORM_ELE);
	//요청 자료 글쓰기
	if($formEle.length > 0){
		$formEle.unbind('submit');
		$formEle.submit(function(event){
			console.log('boardReqWriteForm submit');
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);
			
			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);
			
			
			$formEle.find('.input-err-msg').removeClass('show');
			
			
			if(isDefined(formData.req_cate) == false || formData.req_cate < 1){
				//disk_alert('카테고리를 선택해주세요.');
				//$formEle.find('input[name=req_cate]').blur();
				$formEle.find('.input-err-msg.req_cate').addClass('show');
				return false;
			}
			
			
			
	    	if(isDefined(formData.req_title) == false || formData.req_title.length < 10 || formData.req_title.length > 100){
				//disk_alert('제목을 10자 이상 100자 이하로 입력해주세요.');
				//$formEle.find('input[name=req_title]').blur();
				$formEle.find('.input-err-msg.req_title').addClass('show');
				return false;
			}
			if(isDefined(formData.req_contents) == false || formData.req_contents.length < 20){
				//disk_alert('내용을 20 이상 입력해주세요.');
				//$('#boardReqWriteForm_req_contents').focus();
				$formEle.find('.input-err-msg.req_contents').addClass('show');
				return false;
			}
			
			COMMON_ACTION.BBS.REQ.setWriteReqFormAction(formData, MOBILE_PAGE.request_write.callbackActionFun);
			
			return false;
			
		});
	}
};


MOBILE_PAGE.request_view = {};
MOBILE_PAGE.request_view.DATA = {
	BOARD_TYPE	: null,
	BOARD_IDX		: null,
	LAST_HASH		: null,
	ELE	: {
		wrap	 	: 'board-detail-modal-view-wrap',
		info		: '.board-comment-list-info-spy'
	}
	
};

MOBILE_PAGE.request_view.start = function(boardType, boardIdx, diskBoard){
	
	console.log('MOBILE_PAGE.request_view.start');
	console.log(diskBoard);
	
	console.log('boardType', boardType);
	console.log('boardIdx', boardIdx);
	
	if(isDefined(boardType) == true){
		MOBILE_PAGE.request_view.DATA.BOARD_TYPE = boardType;	
	}
	
	if(isDefined(boardIdx) == true){
		MOBILE_PAGE.request_view.DATA.BOARD_IDX = boardIdx;	
	}
	
	
	MOBILE_PAGE.request_view.defaultBinding(boardType, boardIdx);
	MOBILE_PAGE.request_view.init(boardType, boardIdx);
	
	
	//코멘트 불러오기
	if(isDefined(diskBoard)){
		if(isDefined(diskBoard.show_comment_cnt)){
			if(diskBoard.show_comment_cnt > 0){
				MOBILE_PAGE.request_view.setBoardCommentList(1, boardType, boardIdx);
			}
		}
		
	}
};


//scroll spy : 채널 관련 최신 코멘트 리스트 가져오기
MOBILE_PAGE.request_view.setBoardCommentList = function(nextPage, boardType, boardIdx){
	console.log('MOBILE_PAGE.request_view.setBoardCommentList');	
	console.log('boardType', boardType);
	console.log('boardIdx', boardIdx);
	
	if(isDefined(nextPage) == false || $.isNumeric(nextPage) == false){
		nextPage = 1;
	}
	
	if(isDefined(boardIdx) == false || $.isNumeric(boardIdx) == false){
		console.log('empty idx');
		return;
	}
	//var $wrapEle = $('#'+MOBILE_PAGE.request_view.DATA.ELE.wrap+'-'+MOBILE_PAGE.request_view.DATA.BOARD_TYPE+'-'+MOBILE_PAGE.request_view.DATA.BOARD_IDX);
	var $wrapEle = $('#'+MOBILE_PAGE.request_view.DATA.ELE.wrap+'-'+boardType+'-'+boardIdx);
	var $commentInfoWrapEle = $wrapEle.find(MOBILE_PAGE.request_view.DATA.ELE.info);
	
	console.log($commentInfoWrapEle);
	
	if(isDefined($commentInfoWrapEle) == false || $commentInfoWrapEle.length < 1){
		console.log('comment ele empty');
		return;
	}

	var eleData = $commentInfoWrapEle.data();
	console.log('eleData', eleData);
	
	var successCommentListFun = function(data){
		console.log('successCommentListFun');
		console.log(data);
		
		
	};
	
	var sendData = {
		idx		: eleData.idx,
		page	: nextPage,
		t		: eleData.type,
		n		: eleData.board_name,
		target	: eleData.target,
		info	: eleData.info,
	};
	console.log('sendData', sendData);
	MOBILE_COMMON.COMMENT.setCommentList(sendData, successCommentListFun);
	
	
	
	
};

MOBILE_PAGE.request_view.defaultBinding = function(boardType, boardIdx){
	console.log('MOBILE_PAGE.request_view.defaultBinding');
	console.log('boardType', boardType);
	console.log('boardIdx', boardIdx);
	
	//check login
	/*
	if(utility.disk.checkIsLogin() == true){
		//코멘트 로그인 덮개 열림
		$('.disk-need-login-contents').remove();	
	}
	*/
};


MOBILE_PAGE.request_view.init = function(){
	console.log('MOBILE_PAGE.request_view.init');
};






MOBILE_PAGE.request = {};
//요청 자료 글쓰기
MOBILE_PAGE.request.openRequestWriteForm = function(thisEle){
	console.log('MOBILE_PAGE.request.onclickSelectCategoryItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var writeFormHtml = MOBILE_TEMPLETE.CONNTAINER.request_write_form();
	var openCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		MOBILE_PAGE.request_write.initBinding();
		
	};
	OPEN_PAGE_MODAL(writeFormHtml, openCallbackFun);
};

//요청 수정
MOBILE_PAGE.request.onclickEditRequestData = function(thisEle){
	console.log('MOBILE_PAGE.request.onclickEditRequestData');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	if(isDefined(eleData.idx) == false){
		console.log('idx empty err');
		return;
	}
	
	if(isDefined(eleData.info) == false){
		console.log('info empty err');
		return;
	}
	
	var $infoEle = $('#'+eleData.info);
	if($infoEle.length < 1){
		console.log('info ele empty');
		return;
	}
	
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	if(isDefined(infoEleData) == false){
		console.log('info data err');
		return;
	}
	
	if(isDefined(infoEleData.bbs_board_idx) == false){
		console.log('info data idx err');
		return;
	}
	
	var closeModalCallbackFun = function(){
		
		var writeFormHtml = MOBILE_TEMPLETE.CONNTAINER.request_write_form(infoEleData);
		var openCallbackFun = function($modalEle){
			console.log('openCallbackFun');
			console.log($modalEle);
			MOBILE_PAGE.request_write.initBinding();
			
		};
		OPEN_PAGE_MODAL(writeFormHtml, openCallbackFun);
	}
	closeModalCallbackFun();
	return;
	//수정 모달을 닫고 오픈
	if(eleData.on_view == 1){
		CLOSE_PAGE_MODAL(closeModalCallbackFun);	
	}else{
		closeModalCallbackFun();
	}
	
	
	
};


//요청 삭제
MOBILE_PAGE.request.onclickDelRequestData = function(thisEle){
	console.log('MOBILE_PAGE.request.onclickDelRequestData');
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN();
		return;
	}
	
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if(isDefined(eleData.idx) == false){
		console.log('idx empty err');
		return;
	}
	var boardIdx = eleData.idx;
	if(isDefined(boardIdx) == false || $.isNumeric(boardIdx) == false){
		console.log('idx empty err');
		return;
	}
	var callbackFunSuccessDellBoradIdx = function(data){
		console.log('callbackFunSuccessDellBoradIdx', data);
		
		if(isDefined(data.show_msg)==true){
			var msgType =  "alert-info";
			$.ambiance({message: data.show_msg, type:msgType});
		}
		
		if(isDefined(data.board_idx)){
			var delTargetEle = '#req-board-list-ele-'+data.board_idx;
			$(delTargetEle).remove();	
		}
		
		CLOSE_PAGE_MODAL();	
		
	};
	var sendData = {
		idx	: parseInt(boardIdx)
	}
	COMMON_ACTION.BBS.REQ.setDelReqFormAction(sendData, callbackFunSuccessDellBoradIdx);
	return;
};


