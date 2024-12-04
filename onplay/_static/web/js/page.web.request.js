/*
PAGE_REQUEST
*/


var PAGE_REQUEST = {};
PAGE_REQUEST.DATA = {
	PAGE_MAIN		: null,
	PAGE_SUB		: null,
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_REQUEST.start = function(pageSub, pagData){
	
	if(isDefined(pageSub) == false){
		pageSub = 'r_list';
	}
	
	PAGE_REQUEST.initBinding();
	PAGE_REQUEST.initOnload();
	
	if(isDefined(pageSub)){
		
		PAGE_REQUEST.DATA.PAGE_MAIN = 'request';
		PAGE_REQUEST.DATA.PAGE_SUB = pageSub;
		

		if(pageSub == 'r_list'){
			PAGE_REQUEST_LIST.start(pageSub, pagData);
		}
		else if(pageSub == 'r_write'){
			PAGE_REQUEST_WRITE.start(pageSub, pagData);
		}
	}
};



PAGE_REQUEST.initBinding = function(){
	console.log('PAGE_REQUEST.initBinding');
	
	//탭 클릭 : 전체, 내 요청
	if($('.tab-btn-request-type').length > 0){
		$(".tab-btn-request-type").unbind('click');
		$(".tab-btn-request-type").bind('click', function(event){
			var eleData = $(this).data();
			console.log('eleData', eleData);
			if(isDefined(eleData.my) == false || isDefined(eleData.target) == false){
				return;
			}
			
			$('#'+eleData.target).data('my', eleData.my);
			//$('.tab-btn-request-type.active').removeClass('active');
			//$(this).addClass('active');
			location.hash = '#!action=request&page=1&type='+eleData.my;	
		});
	}
	
	
	//카테고리 선택
	var $filterCategory = $('.filter-req-category');
	if($filterCategory.length > 0){
		$filterCategory.unbind( "click");
		$filterCategory.bind( "click", function() {
			console.log('filter-req-category');
			$(this).parent().toggleClass('active');
		});
	}
	
	//카테고리 아이템 클릭
	var filterCategoryItemName = '.filter-req-category-item';
	if($(filterCategoryItemName).length > 0){
		$(filterCategoryItemName).unbind( "click");
		$(filterCategoryItemName).bind( "click", function() {
			console.log('filterCategoryItemEle');
			var eleData = $(this).data();
			console.log(eleData);
			if(isDefined(eleData.target)){
				$('#'+eleData.target).val(eleData.cate);
			}else{
				return;
			}
			
			if(isDefined(eleData.ele)){
				$('.'+eleData.ele).text(eleData.name);
			}
			$(filterCategoryItemName+'.active').removeClass('active');
			$(this).addClass('active');
			$filterCategory.parent().toggleClass('active');
			
			//리스트 가져오기
			if(eleData.type == 'list'){
				location.hash = '#!action=request&page=1&cate='+eleData.cate;	
			}
			else if(eleData.type == 'write'){
				$('.filter-req-category').removeClass('is-invalid');
			}
			
			
		});
	}
	
	
	//완료여부 선택
	var $filterCompleted = $('.filter-req-completed');
	if($filterCompleted.length > 0){
		$filterCompleted.unbind( "click");
		$filterCompleted.bind( "click", function() {
			console.log('filter-req-completed');
			$(this).parent().toggleClass('active');
			
		});
	}
	
	//완료여부 클릭
	var filterCompletedItemName = '.filter-req-completed-item';
	if($(filterCompletedItemName).length > 0){
		$(filterCompletedItemName).unbind( "click");
		$(filterCompletedItemName).bind( "click", function() {
			console.log('filterCategoryItemEle');
			var eleData = $(this).data();
			console.log(eleData);
			if(isDefined(eleData.target)){
				$('#'+eleData.target).val(eleData.state);
			}else{
				return;
			}
			
			if(isDefined(eleData.ele)){
				$('.'+eleData.ele).text(eleData.name);
			}
			$(filterCompletedItemName+'.active').removeClass('active');
			$(this).addClass('active');
			$filterCompleted.parent().toggleClass('active');
			
			location.hash = '#!action=request&page=1&state='+eleData.state;
		});
	}
	
	
	//요청 자료 검색
	if($('#boardReqSearchForm').length > 0){
		$("#boardReqSearchForm").unbind('submit');
		$("#boardReqSearchForm").submit(function(event){
			console.log('boardReqSearchForm submit');
			//event.preventDefault(); 
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);
			
			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);
			
	    	if(isDefined(formData.req_search) == false){
				alert('검색어를 입력해주세요.');
				$('#boardReqSearchForm_search').focus();
				return false;
			}
			if(formData.req_search.length < 2){
				alert('검색어는 2자 이상 입력해주세요.');
				$('#boardReqSearchForm_search').focus();
				return false;
			}
			
			var searchKey = encodeURIComponent(formData.req_search);
			console.log('searchKey', searchKey);
			location.hash = '#!action=request&page=1&search='+searchKey;
			
			return false;
			
		});
	}
	
	
};

PAGE_REQUEST.initOnload = function(){
	console.log('PAGE_REQUEST.initOnload');

};

//페이지 설정
PAGE_REQUEST.setPagination = function(){
	//pagination
	var $paginationEle = $('#req-board-common-pagination');
	var hrefTextPrefix = '#!action=request&page=';
	
	var loadedPage = $paginationEle.data('load');
	if(isDefined(loadedPage)){
		PAGE_REQUEST.DATA.LOADED_PAGE = parseInt(loadedPage);
	}
	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		var startPage = 1;
		var initiateStartPageClick = false;
		var totalPages = 1;
		if(isDefined(eleData.total_page)){
			totalPages = parseInt(eleData.total_page);
		}
		PAGE_REQUEST.DATA.paginationEle = $paginationEle;
		PAGE_REQUEST.DATA.pagination = $paginationEle.pagination({
			/*
			items: totalPages,
			itemsOnPage: 20,
			*/
			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: hrefTextPrefix,
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_REQUEST.goCategoryPage(page);
			}
		});
		
		console.log(PAGE_REQUEST.DATA.pagination);
	}
}

//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_REQUEST.setHashCheck = function(isStart){
	console.log('PAGE_REQUEST.setHashCheck');
	//hash check
	if(isLoadedBbqScript() != true){
		
	}
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] == 'request'){
		
	}else{
		console.log(hashPrams['!action']);
		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']));
			}	
		}
		return;
	}
	var hashAction = hashPrams['!action'];
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}
	
	console.log('hashPage',hashPage);
	
	
	//메인에서 바로 들어온 경우 : 해시 제거
	if(isStart == 'start'){
		$.bbq.removeState();
		return;
	}
	
	//return;
	if(isDefined(hashPage)){
		console.log('has hash', hashPage);
		
		if(PAGE_REQUEST.DATA.LAST_HASH != location.hash){
			/*
			if(hashAction == 'request'){
				PAGE_REQUEST_LIST.setBoardListPage(hashPage);
			}else if(hashAction == 'mrequest'){
				//PAGE_REQUEST_FAQ.setFaqListPage(hashPage);
			}
			*/
			PAGE_REQUEST_LIST.setBoardListPage(hashPage);
			return;
		}
		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_REQUEST.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_REQUEST.DATA.LOADED_PAGE);
			}
			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	PAGE_REQUEST_LIST.setBoardListPage(hashPage);
	/*
	if(hashAction == 'request'){
		PAGE_REQUEST_LIST.setBoardListPage(hashPage);
	}else if(hashAction == 'mrequest'){
		//PAGE_REQUEST_FAQ.setFaqListPage(hashPage);
	}
	*/
};


//get getNoticeListContentsData
PAGE_REQUEST.getBoardListContentsData = function(getData, callbackFun){
	console.log('PAGE_REQUEST.getNoticeListContentsData', getData);
	
	var sendData = {
		l			: '',			//limit
		page		: 1,
		is_mobile	: 0,			//is mobile
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
	var successFunGetBoardContentsList = function(data){
			console.log('successFunGetBoardContentsList', data);
			
			if (typeof callbackFun === "function"){
				callbackFun(data);
				return;
			}
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



/* REQ LIST */
var PAGE_REQUEST_LIST = {};
PAGE_REQUEST_LIST.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
};

PAGE_REQUEST_LIST.start = function(pageSub, pagData){
	console.log('PAGE_REQUEST_LIST.start', pagData);
	
	
	
	PAGE_REQUEST.DATA.LAST_HASH = '#!action=request&page=1';
	
	PAGE_REQUEST.setHashCheck('start');
	
	PAGE_REQUEST_LIST.initBinding();
	PAGE_REQUEST_LIST.initOnload();
	PAGE_REQUEST_LIST.afterDataBinding();
};



PAGE_REQUEST_LIST.initBinding = function(){
	console.log('PAGE_REQUEST_LIST.initBinding');
	
	//내용 닫기
	if($( ".btn-close-self-contents").length > 0){
		$( ".btn-close-self-contents").unbind( "click");
		$( ".btn-close-self-contents").bind( "click", function() {
			console.log('.btn-close-self-contents');
			$('.l_content.board_view').removeClass('show');
			$('#board-req-view-contents').empty();
			
			//리스트 active remove
			//$('.board-req-list-tit.active').removeClass('active');
			
			//코멘트 초기화
			PAGE_REQUEST_LIST.resetCommentOnView();
			
			//페이지 상단으로 이동
			utility.ui.goToElement('.container');
		});
	}
	
	
};

PAGE_REQUEST_LIST.afterDataBinding = function(){
	console.log('PAGE_REQUEST_LIST.afterDataBinding');
	
	//목록 제목 클릭 - 내용 가져오기
	if($( ".board-req-list-tit").length > 0){
		$( ".board-req-list-tit").unbind( "click");
		$( ".board-req-list-tit").bind( "click", function() {
			console.log('.tit board-req-list-tit');
			
			var eleData = $(this).data();
			console.log('eleData', eleData);
			
			var $targetEle;
			if(isDefined(eleData.target)){
				$targetEle = $('#'+eleData.target);
			
			}
			$( ".board-req-list-tit.active").removeClass('active')
			$(this).addClass('active');
			
			if(isDefined(eleData.saved) == true && isDefined(eleData.idx) == true){
				var savedHtml = $('#'+eleData.saved).html();
				var savedData = $('#req-board-list-ele-'+eleData.idx).data();
				console.log('savedData', savedData);
				
				
				if(isDefined(savedHtml) == true && savedHtml.length > 0 && isDefined(savedData) == true){
					
					
					if(isDefined($targetEle)){
						$targetEle.html(savedHtml);
						$('.l_content.board_view').addClass('show');
						//페이지 상단으로 이동
						utility.ui.goToElement('.container');
						
						PAGE_REQUEST_LIST.setBoardViewSetCommentData(savedData);
						return;
					}
				}
			}
			//view idx가 있으면
			if(isDefined(eleData.idx)){
				var sendData = 
				{
					t	: 'req',
					idx	: eleData.idx
				}
				PAGE_REQUEST_LIST.getBoardViewContentsData(sendData, $targetEle);
			}
		});
	}

	
	
};

//코멘트 정보 초기화
PAGE_REQUEST_LIST.resetCommentOnView = function(){
	console.log('PAGE_REQUEST_LIST.resetComment');	
	$('#reqViewCommentWriteForm').find('input[name=idx]').val('');
	$('#disk-request-comment-list-warp-list').empty();
	$('#comment-list-request-pagnation-controller').data({'idx':'', loaded: 0});
	utility.shortPagination.reset();
	$('.disk-comment-list-warp').css({'min-height': '10px'});
};



PAGE_REQUEST_LIST.initOnload = function(){
	console.log('PAGE_REQUEST_LIST.initOnload');
	PAGE_REQUEST.setPagination();
	
};




PAGE_REQUEST_LIST.setBoardListPage = function(nextPage){
	console.log('PAGE_REQUEST_LIST.setBoardListPage:',nextPage);	
	//console.log('loadedPage', loadedPage);
	/*
	if(isDefined(nextPage) == fasle){
		nextPage = 1;
	}
	*/
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	var $infoEle = null;
	if(PAGE_REQUEST.DATA.paginationEle){
		$infoEle = PAGE_REQUEST.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#req-board-common-pagination');
	}
	var infoEleData = $infoEle.data();
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 		:	nextPage,
 		limit		: 	null,
 		my			:	'',
 		cate		:	0,
 		complete	:	0,
 		search		:	'',
 		
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.my)){
			sendData.my = infoEleData.my;	
		}
	}
	
	//필터 데이타
	if($('#boardReqSearchForm_req_cate').length > 0){
		var reqCate = $('#boardReqSearchForm_req_cate').val();
		if(isDefined(reqCate)){
			sendData.cate  = reqCate;
		}
	}
	if($('#boardReqSearchForm_req_complete').length > 0){
		 var reqCom = $('#boardReqSearchForm_req_complete').val();
		 if(isDefined(reqCom)){
		 	sendData.complete = reqCom;
		 }
		 
	}
	if($('#boardReqSearchForm_search').length > 0){
		var reqSearch = $('#boardReqSearchForm_search').val();
		if(isDefined(reqSearch) && reqSearch != ''){
			sendData.search = reqSearch;
		}
	}
	
	console.log('sendData', sendData);
	
	//boardReqSearchForm_req_cate
	
	
	
	var successFunGetBoardContentsList = function(data){
		console.log('successFunGetBoardContentsList', data);
		var $innerTargetEle = $('#req-board-contents-list-data');
		var boardData = null;
		if(isDefined(data.board_list_data)){
			var boardData = data.board_list_data;
			var noticeList = boardData.list;
			var boardListHtml = [];
			var lCnt = 0;
			for(var i in noticeList){
				boardListHtml.push(TEMPLETE.WEB_PAGE.getCsReqestBoardListHtml(noticeList[i], lCnt));
				lCnt++;
			}
			
			$innerTargetEle.html(boardListHtml.join(''));
			
			var curPage = boardData.page;
			var reSavePageData =
			{
				load		:	parseInt(curPage),
				page		:	parseInt(curPage),
				limit		:	parseInt(boardData.limit),
			};
			var get_total_count = 0
			var get_total_page = 0;
			if(parseInt(curPage) == 1){
				if(isDefined(boardData.total_count)){
					reSavePageData.total_count	= parseInt(boardData.total_count);	
					get_total_count = parseInt(boardData.total_count);
				}
				if(isDefined(boardData.total_page)){
					reSavePageData.total_page	= parseInt(boardData.total_page);	
					get_total_page = parseInt(boardData.total_page);
				}
			}
			$infoEle.data(reSavePageData);
			
			//pagination
			//pagination
			if(parseInt(curPage) == 1 && isDefined(PAGE_REQUEST.DATA.pagination)){
				console.log('drawPage',get_total_count);
				console.log('get_total_page', get_total_page);
				$infoEle.pagination('updateItems', get_total_page);
				$infoEle.pagination('selectPage', curPage);
				
				if(get_total_count < 1){
					$('.request-no-content').show();
				}else{
					$('.request-no-content').hide();
				}
				
			}else{
				console.log('aaa');
				if(isDefined(PAGE_REQUEST.DATA.pagination)){
					$infoEle.pagination('selectPage', curPage);
				}
				
			}
			
			//view 제거
			$('#board-req-view-contents').empty();
			$('.l_content.board_view').removeClass('show');
			
			//binding
			PAGE_REQUEST_LIST.afterDataBinding();
			
			//페이지 상단으로 이동
			utility.ui.goToElement('.container');
			
			//$infoEle.pagination('selectPage', curPage);
			PAGE_REQUEST_LIST.DATA.LOADED_PAGE = parseInt(curPage);
			
			//save cache
			PAGE_REQUEST.DATA.LAST_HASH = location.hash;
			
			//img lazy 스크롤 때문에 lazy가 의미 없음
			//$('.disk-image-lazy').lazy();
			
			//tab & title
			if(isDefined(data.is_my)){
				if(data.is_my == 1){
					$('.tab-btn-request-type.active').removeClass('active');
					$('.tab-btn-request-type.my').addClass('active');
					$('.list_style.request').removeClass('all');
				}else{
					$('.tab-btn-request-type.active').removeClass('active');
					$('.tab-btn-request-type.all').addClass('active');
					$('.list_style.request').addClass('all');
				}
				$('#req-page-top-navy-path').find('.depth-1').text($('.tab-btn-request-type.active').data('name'));
				
				
			}
			
		}
	};
	
	
	console.log('sendData', sendData);
	PAGE_REQUEST.getBoardListContentsData(sendData, successFunGetBoardContentsList);
	
	
	return;

};

//REQ 내용 가져오기
PAGE_REQUEST_LIST.getBoardViewContentsData = function(getData, $targetEle){
	console.log('PAGE_REQUEST_LIST.getBoardViewContentsData', getData);
	
	if(isDefined(getData.idx) == false){
		console.log('empty idx');
		return;
	}
	
	var successFunGetBoardContentsView = function(data){
		console.log('successFunGetBoardContentsView', data);
		
		if(isDefined(data.board_data)){
			
			var viewHtml = TEMPLETE.WEB_PAGE.getCsBoardReqViewHtml(data.board_data);
			if(isDefined($targetEle) == false){
				$targetEle = $('#board-req-view-contents');
			}
			$targetEle.html(viewHtml);
			
			
			if(isDefined(data.board_data.show_data_ele_id)){
				$('#'+data.board_data.show_data_ele_id).html(viewHtml);
			}
			//save get data on ele
			if(isDefined(data.board_data.show_ele_id)){
				$('#'+data.board_data.show_ele_id).data(data.board_data);
			}
			
			
			$('.l_content.board_view').addClass('show');
			
			PAGE_REQUEST_LIST.setBoardViewSetCommentData(data.board_data);
		}	
		
		
				
		//페이지 상단으로 이동
		utility.ui.goToElement('.container');
			
	};
		
	var formData = getData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.REQ.GET_BOARD_VIEW,
		data		: formData,
		success_fun	: successFunGetBoardContentsView,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//코멘트 세팅
PAGE_REQUEST_LIST.setBoardViewSetCommentData = function(viewData){
	console.log('PAGE_REQUEST_LIST.setBoardViewSetCommentData',viewData);
	
	//코멘트 초기화
	PAGE_REQUEST_LIST.resetCommentOnView();
			
	
	if(isDefined(viewData.show_comment_cnt)){
		$('.comment-cnt-num').text(viewData.show_comment_cnt);
		if(viewData.show_comment_cnt > 0){
			$('#board-req-view-contents-comment').find('.req-commeent-write-form').removeClass('active');
			//코멘트 불러오기
		}else{
			$('#board-req-view-contents-comment').find('.req-commeent-write-form').addClass('active');
		}
	}
	if(isDefined(viewData.bbs_board_idx) == true){
		$('#reqViewCommentWriteForm').find('input[name=idx]').val(viewData.bbs_board_idx);
		$('#comment-list-request-pagnation-controller').data('idx',viewData.bbs_board_idx);	
		
		if(isDefined(viewData.show_comment_cnt)== true && viewData.show_comment_cnt > 0){
			$('#comment-list-request-pagnation-controller').show();
			PAGE_REQUEST_LIST.getBoardViewGetCommentData(viewData.bbs_board_idx);
		}else{
			$('#comment-list-request-pagnation-controller').hide();
		}
	}
	
	//btn binding - r-btn-open-comment-form	
	
	var $btnOpenCommentForm = $('.r-btn-open-comment-form	');
	if($btnOpenCommentForm.length > 0){
		$btnOpenCommentForm.unbind( "click");
		$btnOpenCommentForm.bind( "click", function() {
			$('.req-commeent-write-form').toggleClass('active');
		});
	}
	
	
	if(utility.disk.checkIsLogin() == true){
		$('.login_check_area').hide();
	}
};

//코멘트 리스트 가져오기
PAGE_REQUEST_LIST.getBoardViewGetCommentData = function(boardIdx){
	console.log('PAGE_REQUEST_LIST.getBoardViewGetCommentData:', boardIdx);
	
	
	if(isDefined(boardIdx) == false || $.isNumeric(boardIdx) == false){
		return;
	}
	
	var sendData = {
		idx		: boardIdx,
		page	: 1,
		t		: 'board',
		n		: 'request',
		target	: 'disk-request-comment-list-warp-list',
		info	: 'comment-list-request-pagnation-controller',
	}
	
	WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
	
};


//요청글 수정
PAGE_REQUEST_LIST.onclickEditRequest = function(boardIdx){
	console.log('PAGE_REQUEST_LIST.onclickEditRequest', boardIdx);
	
	//check login
	var isLogined = utility.disk.checkIsLoginWithModal(false);
	if(isLogined != true){
		return;
	}
	
	if(isDefined(boardIdx) == false || $.isNumeric(boardIdx) == false){
		return;
	}
	location.href = '/request/r_write/'+boardIdx;
	return;
	
	
};
//요청글 삭제
PAGE_REQUEST_LIST.onclickDelRequest = function(boardIdx, onView){
	console.log('PAGE_REQUEST_LIST.onclickDelRequest', boardIdx);
	
	if(isDefined(boardIdx) == false || $.isNumeric(boardIdx) == false){
		return;
	}
	
	//check login
	var isLogined = utility.disk.checkIsLoginWithModal(false);
	if(isLogined != true){
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
		
		//empty view area
		//$('#board-req-view-contents').empty();
		if(onView == 1){
			$( ".btn-close-self-contents").trigger('click');
		}
	
		if($('.req-board-list-item').length < 1){
			location.reload(true);
		}
		
	};
	var sendData = {
		idx	: parseInt(boardIdx)
	}
	COMMON_ACTION.BBS.REQ.setDelReqFormAction(sendData, callbackFunSuccessDellBoradIdx);
	return;
};



/* REQ write */
var PAGE_REQUEST_WRITE = {};
PAGE_REQUEST_WRITE.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
};

PAGE_REQUEST_WRITE.start = function(pageSub, pagData){
	console.log('PAGE_REQUEST_WRITE.start', pagData);
	
	
	
	PAGE_REQUEST.DATA.LAST_HASH = '#!action=request&page=1';
	
	PAGE_REQUEST_WRITE.initBinding();
	PAGE_REQUEST_WRITE.initOnload();
	
};



PAGE_REQUEST_WRITE.initBinding = function(){
	console.log('PAGE_REQUEST_WRITE.initBinding');
	
	//요청 자료 글쓰기
	if($('#boardReqWriteForm').length > 0){
		$("#boardReqWriteForm").unbind('submit');
		$("#boardReqWriteForm").submit(function(event){
			console.log('boardReqWriteForm submit');
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);
			
			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);
			
			if(isDefined(formData.req_cate) == false || formData.req_cate < 1){
				alert('카테고리를 선택해주세요.');
				$('.filter-req-category').addClass('is-invalid');
				return false;
			}
			
			$('.filter-req-category').removeClass('is-invalid');
			
	    	if(isDefined(formData.req_title) == false || formData.req_title.length < 10 || formData.req_title.length > 100){
				alert('제목을 10자 이상 100자 이하로 입력해주세요.');
				$('#boardReqWriteForm_req_title').focus();
				return false;
			}
			if(isDefined(formData.req_contents) == false || formData.req_contents.length < 20){
				alert('내용을 20 이상 입력해주세요.');
				$('#boardReqWriteForm_req_contents').focus();
				return false;
			}
			
			COMMON_ACTION.BBS.REQ.setWriteReqFormAction(formData, PAGE_REQUEST_WRITE.callbackActionFun);
			
			return false;
			
		});
	}
};

PAGE_REQUEST_WRITE.initOnload = function(){
	console.log('PAGE_REQUEST_WRITE.initOnload');
	
};

//요청 게시판 : 글 등록 완료
PAGE_REQUEST_WRITE.callbackActionFun = function(data){
	console.log('PAGE_REQUEST_WRITE.callbackActionFun');
	console.log(data);	
	//check login
	var isLogined = utility.disk.checkIsLoginWithModal(false);
	if(isLogined != true){
		return;
	}
	
	if(isDefined(data.show_msg)==true){
		alert(data.show_msg);
	}
	if(isDefined(data.is_edit)){
		if(data.is_edit == 1){
			location.href = '/request/r_list/1';
			return;	
		}
	}
	location.href = '/request';
	
};

