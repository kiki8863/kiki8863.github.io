/*
CS
*/


var PAGE_CS = {};
PAGE_CS.DATA = {
	PAGE_MAIN		: null,
	PAGE_SUB		: null,
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_CS.start = function(pageMain, pageSub, pagData){
	
	console.log('PAGE_CS.start');
	console.log('pageMain:', pageMain);
	console.log('pageSub:',pageSub);
	console.log('pagData:', pagData);
	
	if(isDefined(pageSub) == false){
		//pageSub = 'faq';
	}
	
	PAGE_CS.initBinding();
	PAGE_CS.initOnload();
	
	if(isDefined(pageMain) || isDefined(pageSub)){
		
		PAGE_CS.DATA.PAGE_MAIN = 'cs';
		PAGE_CS.DATA.PAGE_SUB = pageMain;
		if(isDefined(pageSub)){
			PAGE_CS.DATA.PAGE_SUB = pageSub;	
		}
		
		if(pageMain =='cs_notice' || pageSub == 'notice'){
			PAGE_CS.DATA.PAGE_SUB = 'notice';
			PAGE_CS_NOTICE.start(pageSub, pagData);
			return;
		}else if(pageMain =='cs_faq' || pageSub == 'faq'){
			PAGE_CS.DATA.PAGE_SUB = 'faq';
			PAGE_CS_FAQ.start(pageSub, pagData);
			return;
		}else if(pageMain =='cs_qa' || pageSub == 'qa'){
			PAGE_CS.DATA.PAGE_SUB = 'qa';
			PAGE_CS_QA.start(pageSub, pagData);
			return;
		}else if(pageMain =='cs_news' || pageSub == 'news'){
			PAGE_CS.DATA.PAGE_SUB = 'news';
			PAGE_CS_NEWS.start(pageSub, pagData);
			return;
		}
		
		
		
	}
};



PAGE_CS.initBinding = function(){
	console.log('PAGE_CS.initBinding');
	

	
	
};

PAGE_CS.initOnload = function(){
	console.log('PAGE_CS.initOnload');

};

//페이지 설정
PAGE_CS.setPagination = function(){
	console.log('PAGE_CS.setPagination');
	console.log(PAGE_CS.DATA);
	
	//pagination
	var $paginationEle = $('#cs-notice-common-pagination');
	var hrefTextPrefix = '#!action=notice&page=';
	if(PAGE_CS.DATA.PAGE_SUB == 'faq'){
		$paginationEle = $('#cs-faq-common-pagination');
		hrefTextPrefix = '#!action=faq&page=';
	}else if(PAGE_CS.DATA.PAGE_SUB == 'qa'){
		$paginationEle = $('#cs-qa-common-pagination');
		hrefTextPrefix = '#!action=qa&page=';
	}
	//console.log($paginationEle);
	//console.log(hrefTextPrefix);
	
	var loadedPage = $paginationEle.data('load');
	if(isDefined(loadedPage)){
		PAGE_CS.DATA.LOADED_PAGE = parseInt(loadedPage);
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
		PAGE_CS.DATA.paginationEle = $paginationEle;
		PAGE_CS.DATA.pagination = $paginationEle.pagination({
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
				//PAGE_CS.goCategoryPage(page);
			}
		});
		
		console.log(PAGE_CS.DATA.pagination);
	}
}

//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_CS.setHashCheck = function(isStart){
	console.log('PAGE_CS.setHashCheck');
	//hash check
	if(isLoadedBbqScript() != true){
		return;
	}
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] == 'notice' || hashPrams['!action'] == 'faq' || hashPrams['!action'] == 'qa' || hashPrams['!action'] == 'news'){
	
	//공지사항 view
	}else if(hashPrams['!action'] == 'notice_view'){
		if(hashPrams['idx'] && $.isNumeric(hashPrams['idx'])){
			var boardIdx = parseInt(hashPrams['idx']);
			var sendData = 
			{
				t	: 'cs',
				b	: 'notice',
				idx	: boardIdx
			}
			var $targetEle = $('#cs-notice-view-contents');
			PAGE_CS_NOTICE.getNoticeViewContentsData(sendData, $targetEle);
			return;
		}
	//faq view	
	}else if(hashPrams['!action'] == 'faq_view'){
		if(hashPrams['idx'] && $.isNumeric(hashPrams['idx'])){
			var boardIdx = parseInt(hashPrams['idx']);
			var $targetEle = $('#cs-faq-board-contets-'+boardIdx);
			
			if($targetEle.length > 0){
				console.log('faq view has ele');
				$targetEle.addClass('active');
				utility.ui.goToElement('#cs-faq-board-contets-'+boardIdx);
				return;
			}
			var sendData = 
			{
				t	: 'member',
				b	: 'faq',
				idx	: hashPrams['idx']
			}
			var $targetEle = $('#cs-faq-contents-list-data');
			PAGE_CS_FAQ.getFaqViewContentsData(sendData, $targetEle);
			return;
		}
	//qa view	
	}else if(hashPrams['!action'] == 'qa_view'){
		if(hashPrams['idx'] && $.isNumeric(hashPrams['idx'])){
			var boardIdx = parseInt(hashPrams['idx']);
			var sendData = 
			{
				t	: 'one',
				b	: 'qa',
				idx	: boardIdx
			}
			var $targetEle = $('#one-to-one-view-wrap');
			PAGE_CS_QA.getBoardViewContentsData(sendData, $targetEle);
			return;
		}
		
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
	var hashIdx = hashPrams['idx'];
	
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}
	
	console.log('hashPage',hashPage);
	
	
	//메인에서 바로 들어온 경우 : 해시 제거
	if(isStart == 'start'){
		if(hashAction == 'news'){
			
		}else{
			$.bbq.removeState();
			return;	
		}
		
	}
	
	//return;
	if(isDefined(hashPage)){
		console.log('has hash', hashPage);
		
		if(PAGE_CS.DATA.LAST_HASH != location.hash){
			if(hashAction == 'notice'){
				PAGE_CS_NOTICE.setNoticeListPage(hashPage);
			}else if(hashAction == 'faq'){
				PAGE_CS_FAQ.setFaqListPage(hashPage);
			}else if(hashAction == 'qa'){
				PAGE_CS_QA.setQaListPage(hashPage);
			}
			return;
		}
		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_CS.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_CS.DATA.LOADED_PAGE);
			}
			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	if(hashAction == 'notice'){
		PAGE_CS_NOTICE.setNoticeListPage(hashPage);
	}else if(hashAction == 'faq'){
		PAGE_CS_FAQ.setFaqListPage(hashPage);
	}else if(hashAction == 'qa'){
		PAGE_CS_QA.setQaListPage(hashPage);
	}
};


//get getNoticeListContentsData
PAGE_CS.getBoardListContentsData = function(getData, callbackFun){
	console.log('PAGE_CS.getNoticeListContentsData', getData);
	
	var sendData = {
		l			: '',			//limit
		page		: 1,
		is_mobile	: 0,			//is mobile
		t			: '',			//board type
		b			: 'notice',		//board
		c			: 'ALL',			//category
		s			: ''
	};
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['board_type'])){ sendData.t = getData.board_type; }
		if(isDefined(getData['board'])){ sendData.b = getData.board; }
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
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_BOARD_LIST,
		data		: formData,
		success_fun	: successFunGetBoardContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



/* 공지 사항 */
var PAGE_CS_NOTICE = {};
PAGE_CS_NOTICE.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
};

PAGE_CS_NOTICE.start = function(pageSub, pagData){
	console.log('PAGE_CS_NOTICE.start', pagData);
	
	
	
	PAGE_CS.DATA.LAST_HASH = '#!action=notice&page=1';
	
	PAGE_CS.setHashCheck('start');
	
	PAGE_CS_NOTICE.initBinding();
	PAGE_CS_NOTICE.initOnload();
	PAGE_CS_NOTICE.afterDataBinding();
};

PAGE_CS_NOTICE.initBinding = function(){
	console.log('PAGE_CS_NOTICE.initBinding');
	
	//내용 닫기
	if($( ".btn-close-self-contents").length > 0){
		$( ".btn-close-self-contents").unbind( "click");
		$( ".btn-close-self-contents").bind( "click", function() {
			console.log('.btn-close-self-contents');
			$('.l_content.notice_view').removeClass('show');
			$('#cs-notice-view-contents').empty();
			
			//리스트 active remove
			//$('.cs-notice-list-tit.active').removeClass('active');
			
			//페이지 상단으로 이동
			utility.ui.goToElement('.container');
		});
	}
	
	
};

PAGE_CS_NOTICE.afterDataBinding = function(){
	console.log('PAGE_CS_NOTICE.afterDataBinding');
	
	//목록 제목 클릭 - 내용 가져오기
	if($( ".cs-notice-list-tit").length > 0){
		$( ".cs-notice-list-tit").unbind( "click");
		$( ".cs-notice-list-tit").bind( "click", function() {
			console.log('.tit cs-notice-tit');
			
			var eleData = $(this).data();
			console.log('eleData', eleData);
			
			var $targetEle;
			if(isDefined(eleData.target)){
				$targetEle = $('#'+eleData.target);
			
			}
			$( ".cs-notice-list-tit.active").removeClass('active')
			$(this).addClass('active');
			
			if(isDefined(eleData.saved)){
				var savedHtml = $('#'+eleData.saved).html();
				if(isDefined(savedHtml) == true && savedHtml.length > 0){
					if(isDefined($targetEle)){
						$targetEle.html(savedHtml);
						$('.l_content.notice_view').addClass('show');
						//페이지 상단으로 이동
						utility.ui.goToElement('.container');
						return;
					}
				}
			}
			//view idx가 있으면
			if(isDefined(eleData.idx)){
				var sendData = 
				{
					t	: 'cs',
					b	: 'notice',
					idx	: eleData.idx
				}
				if(isDefined(eleData.type)){
					sendData.t = eleData.type;
				}
				PAGE_CS_NOTICE.getNoticeViewContentsData(sendData, $targetEle);
			}
		});
	}
	
	
	//탭 클릭 : 회원 공지, 판매자 채널 공지
	if($('.tab-btn-notice-type').length > 0){
		$(".tab-btn-notice-type").unbind('click');
		$(".tab-btn-notice-type").bind('click', function(event){
			var eleData = $(this).data();
			console.log('eleData', eleData);
			if(isDefined(eleData.type) == false || isDefined(eleData.target) == false){
				return;
			}
			
			$('#'+eleData.target).data('type', eleData.type);
			$('.tab-btn-notice-type.active').removeClass('active');
			$(this).addClass('active');
			location.hash = '#!action=notice&page=1&type='+eleData.type;	
		});
	}
};

PAGE_CS_NOTICE.initOnload = function(){
	console.log('PAGE_CS_NOTICE.initOnload');
	PAGE_CS.setPagination();
	
};

PAGE_CS_NOTICE.setNoticeListPage = function(nextPage){
	console.log('PAGE_CS_NOTICE.setMoviePage:',nextPage);	
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
	if(PAGE_CS.DATA.paginationEle){
		$infoEle = PAGE_CS.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#cs-notice-common-pagination');
	}
	var infoEleData = $infoEle.data();
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 		:	nextPage,
 		limit		: 	null,
 		board_type	:	'cs',
 		board		: 	'notice',
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.type)){
			sendData.board_type = infoEleData.type;	
		}
	}
	
	
	
	var successFunGetNoticeContentsList = function(data){
			console.log('successFunGetNoticeContentsList', data);
			var $innerTargetEle = $('#cs-notice-contents-list-data');
			var noticeData = null;
			if(isDefined(data.board_list_data)){
				var noticeData = data.board_list_data;
				var noticeList = noticeData.list;
				var noticeListHtml = [];
				var lCnt = 0;
				for(var i in noticeList){
					noticeListHtml.push(TEMPLETE.WEB_PAGE.getCsNoticeListHtml(noticeList[i], lCnt));
					lCnt++;
				}
				
				$innerTargetEle.html(noticeListHtml.join(''));
				
				var curPage = noticeData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(noticeData.limit),
				};
				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(noticeData.total_count)){
						reSavePageData.total_count	= parseInt(noticeData.total_count);	
						get_total_count = parseInt(noticeData.total_count);
					}
					if(isDefined(noticeData.total_page)){
						reSavePageData.total_page	= parseInt(noticeData.total_page);	
						get_total_page = parseInt(noticeData.total_page);
					}
				}
				$infoEle.data(reSavePageData);
				
				//pagination
				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_CS.DATA.pagination)){
					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					console.log('aaa');
					if(isDefined(PAGE_CS.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}
					
				}
				
				//view 제거
				$('#cs-notice-view-contents').empty();
				$('.l_content.notice_view').removeClass('show');
				
				//binding
				PAGE_CS_NOTICE.afterDataBinding();
				
				//페이지 상단으로 이동
				utility.ui.goToElement('.container');
				
				//$infoEle.pagination('selectPage', curPage);
				PAGE_CS_NOTICE.DATA.LOADED_PAGE = parseInt(curPage);
				
				//save cache
				PAGE_CS.DATA.LAST_HASH = location.hash;
				
				//img lazy 스크롤 때문에 lazy가 의미 없음
				//$('.disk-image-lazy').lazy();
				
			}
	};
	
	
	console.log('sendData', sendData);
	PAGE_CS.getBoardListContentsData(sendData, successFunGetNoticeContentsList);
	
	
	return;

};

//공지사항 내용 가져오기
PAGE_CS_NOTICE.getNoticeViewContentsData = function(getData, $targetEle){
	console.log('PAGE_CS_NOTICE.getNoticeViewContentsData', getData);
	
	if(isDefined(getData.idx) == false){
		console.log('empty idx');
		return;
	}
	
	var successFunGetNoticeContentsView = function(data){
		console.log('successFunGetNoticeContentsView', data);
		
		if(isDefined(data.view_data)){
			
			var viewHtml = TEMPLETE.WEB_PAGE.getCsNoticeViewHtml(data.view_data);
			if(isDefined($targetEle) == false){
				$targetEle = $('#cs-notice-view-contents');
			}
			$targetEle.html(viewHtml);
			
			
			if(isDefined(data.view_data.saved_ele)){
				$('#'+data.view_data.saved_ele).html(viewHtml);
			}
			$('.l_content.notice_view').addClass('show');
		}	
				
		//페이지 상단으로 이동
		utility.ui.goToElement('.container');
			
				
			
	};
		
	var formData = getData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_NOTICE_VIEW,
		data		: formData,
		success_fun	: successFunGetNoticeContentsView,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};




/* FAQ */
var PAGE_CS_FAQ = {};
PAGE_CS_FAQ.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
};

PAGE_CS_FAQ.start = function(pageSub, pagData){
	console.log('PAGE_CS_FAQ.start', pagData);
	
	
	
	PAGE_CS.DATA.LAST_HASH = '#!action=faq&page=1';
	
	PAGE_CS.setHashCheck('start');
	
	PAGE_CS_FAQ.initBinding();
	PAGE_CS_FAQ.initOnload();
	PAGE_CS_FAQ.afterDataBinding();
};



PAGE_CS_FAQ.initBinding = function(){
	console.log('PAGE_CS_FAQ.initBinding');
	
	//탭클릭
	if($( ".cs-faq-tab-btn").length > 0){
		$( ".cs-faq-tab-btn").unbind( "click");
		$( ".cs-faq-tab-btn").bind( "click", function() {
			console.log('.cs-faq-tab-btn');
			var eleData = $(this).data();
			if(isDefined(eleData.name)){
				
				$('.cs-faq-tab-btn.active').removeClass('active');
				$(this).addClass('active');
				
				//remove search
				$('#csFaqSearchForm_faq_search').val('');
				
				$('#cs-faq-common-pagination').data({'cate':eleData.name});
				var cateName = encodeURIComponent(eleData.name);
				location.hash = '#!action=faq&page=1&cate='+cateName;
				
			}
			
		});
	}
	
	
};

PAGE_CS_FAQ.afterDataBinding = function(){
	console.log('PAGE_CS_FAQ.afterDataBinding');
	
	//목록 제목 클릭 - 내용 가져오기
	if($( ".cs-faq-list-item" ).length > 0){ 
		$( ".cs-faq-list-item" ).unbind( "click");
		$( ".cs-faq-list-item" ).bind( "click", function() {
			console.log('.cs-faq-list-item');
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$('.cs-faq-list-item.active').removeClass('active');
				$(this).toggleClass('active');
					
			}
			utility.ui.goToElement(this);
			
		});
	}
	
	//faq 검색
	if($('#csFaqSearchForm').length > 0){
		$("#csFaqSearchForm").unbind('submit');
		$("#csFaqSearchForm").submit(function(event){
			console.log('csFaqSearchForm submit');
			//event.preventDefault(); 
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);
			
			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);
			
	    	if(isDefined(formData.faq_search) == false){
				alert('검색어를 입력해주세요.');
				$('#csFaqSearchForm_faq_search').focus();
				return false;
			}
			if(formData.faq_search.length < 2){
				alert('검색어는 2자 이상 입력해주세요.');
				$('#csFaqSearchForm_faq_search').focus();
				return false;
			}
			
			$('.cs-faq-tab-btn.active').removeClass('active');
			
			var searchKey = encodeURIComponent(formData.faq_search);
			location.hash = '#!action=faq&page=1&search='+searchKey;
			
			return false;
			
		});
	
	}
	
};


PAGE_CS_FAQ.initOnload = function(){
	console.log('PAGE_CS_FAQ.initOnload');
	
	PAGE_CS.setPagination();
};


PAGE_CS_FAQ.setFaqListPage = function(nextPage){
	console.log('PAGE_CS_FAQ.setFaqListPage:',nextPage);	
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
	if(PAGE_CS.DATA.paginationEle){
		$infoEle = PAGE_CS.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#cs-faq-common-pagination');
	}
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 		:	nextPage,
 		limit		: 	null,
 		board_type	:	'member',
 		board		: 	'faq',
 		cate		: 	'',
	 	search		:	''
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.cate)){
			sendData.cate = infoEleData.cate;	
		}
	}
	console.log('sendData', sendData);
	
	//검색어
	var faqSearchVal = $('#csFaqSearchForm_faq_search').val();
	if(isDefined(faqSearchVal)){
		sendData.search = faqSearchVal;
	}
	
	var successFunGetFaqContentsList = function(data){
			console.log('successFunGetNoticeContentsList', data);

			var $innerTargetEle = $('#cs-faq-contents-list-data');
			var faqData = null;
			if(isDefined(data.board_list_data)){
				var faqData = data.board_list_data;
				var noticeList = faqData.list;
				var faqListHtml = [];
				var lCnt = 0;
				for(var i in noticeList){
					faqListHtml.push(TEMPLETE.WEB_PAGE.getCsFaqListHtml(noticeList[i], lCnt));
					lCnt++;
				}
				
				$innerTargetEle.html(faqListHtml.join(''));
				
				var curPage = faqData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(faqData.limit),
				};
				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(faqData.total_count)){
						reSavePageData.total_count	= parseInt(faqData.total_count);	
						get_total_count = parseInt(faqData.total_count);
					}
					if(isDefined(faqData.total_page)){
						reSavePageData.total_page	= parseInt(faqData.total_page);	
						get_total_page = parseInt(faqData.total_page);
					}
				}
				$infoEle.data(reSavePageData);
				
				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_CS.DATA.pagination)){
					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					console.log('aaa');
					if(isDefined(PAGE_CS.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}
					
				}
				
				//binding
				PAGE_CS_FAQ.afterDataBinding();
				
				//페이지 상단으로 이동
				utility.ui.goToElement('.container');
				
				//$infoEle.pagination('selectPage', curPage);
				PAGE_CS.DATA.LOADED_PAGE = parseInt(curPage);
				
				//save cache
				PAGE_CS.DATA.LAST_HASH = location.hash;
				
				//img lazy 스크롤 때문에 lazy가 의미 없음
				//$('.disk-image-lazy').lazy();
				
			}
	};
	
	
	console.log('sendData', sendData);
	PAGE_CS.getBoardListContentsData(sendData, successFunGetFaqContentsList);
	
	
	return;

};



//Faq 내용 가져오기
PAGE_CS_FAQ.getFaqViewContentsData = function(getData, $targetEle){
	console.log('PAGE_CS_FAQ.getFaqViewContentsData', getData);
	
	if(isDefined(getData.idx) == false){
		console.log('empty idx');
		return;
	}
	
	var successFunGetNoticeContentsView = function(data){
		console.log('successFunGetNoticeContentsView', data);
		
		if(isDefined(data.view_data)){
			
			var viewHtml = TEMPLETE.WEB_PAGE.getCsFaqListHtml(data.view_data, 0, true);
			console.log('viewHtml', viewHtml);
			if(isDefined($targetEle) == false){
				$targetEle = $('#cs-faq-contents-list-data');
			}
			$targetEle.prepend(viewHtml);
			//타겟으로 이동
			utility.ui.goToElement('#cs-faq-board-contets-'+getData.idx);
			
			PAGE_CS_FAQ.afterDataBinding();	
		}	
			
	};
		
	var formData = getData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_NOTICE_VIEW,
		data		: formData,
		success_fun	: successFunGetNoticeContentsView,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};









/* QA */
var PAGE_CS_QA = {};
PAGE_CS_QA.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
};

PAGE_CS_QA.start = function(pageSub, pagData){
	console.log('PAGE_CS_QA.start', pagData);
	
	
	
	PAGE_CS.DATA.LAST_HASH = '#!action=qa&page=1';
	
	PAGE_CS.setHashCheck('start');
	
	PAGE_CS_QA.initBinding();
	PAGE_CS_QA.initOnload();
	PAGE_CS_QA.afterDataBinding();
};



PAGE_CS_QA.initBinding = function(){
	console.log('PAGE_CS_QA.initBinding');
};

PAGE_CS_QA.afterDataBinding = function(){
	console.log('PAGE_CS_QA.afterDataBinding');
	
	//목록 제목 클릭 - 내용 가져오기
	var $qaTitleEle = $( ".cs-qa-list-tit");
	if($qaTitleEle.length > 0){
		$qaTitleEle.unbind( "click");
		$qaTitleEle.bind( "click", function() {
			console.log('.tit cs-notice-tit');
			
			var eleData = $(this).data();
			console.log('eleData', eleData);
			
			var $targetEle;
			if(isDefined(eleData.target)){
				$targetEle = $('#'+eleData.target);
			
			}
			if(isDefined(eleData.idx) == false){
				console.log('empty ele');
				return;
			}
			
			$( ".cs-qa-list-tit.active").removeClass('active')
			$(this).addClass('active');
			
			if(isDefined(eleData.info)){
				//var $infoEle = $('#'+eleData.info);
				var infoData = $('#'+eleData.info).data();
				if(isDefined(infoData)){
					if(infoData.load == 1){
						if(isDefined(infoData.view_html)){
							console.log(infoData);
							$($targetEle).html(infoData.view_htm).addClass('active');
							//페이지 상단으로 이동
							utility.ui.goToElement('.container');
							return;
						}
					}
				}
			}
			//view idx가 있으면
			if(isDefined(eleData.idx)){
				var sendData = 
				{
					t	: 'one',
					b	: 'qa',
					idx	: eleData.idx
				}
				PAGE_CS_QA.getBoardViewContentsData(sendData, $targetEle);
			}
		});
	}
	
	//문의 분류 클릭
	if($( ".radio-qa-category" ).length > 0){ 
		$( ".radio-qa-category" ).unbind( "click");
		$( ".radio-qa-category" ).bind( "click", function() {
			console.log('click');
			$('.radio_wrap').removeClass('is-invalid');	
		});
	}
	
};


PAGE_CS_QA.initOnload = function(){
	console.log('PAGE_CS_QA.initOnload');
	
	PAGE_CS.setPagination();
};





PAGE_CS_QA.setQaListPage = function(nextPage){
	console.log('PAGE_CS_QA.setQaListPage:',nextPage);	
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
	if(PAGE_CS.DATA.paginationEle){
		$infoEle = PAGE_CS.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#cs-qa-common-pagination');
	}
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 		:	nextPage,
 		limit		: 	15,
 		board_type	:	'one',
 		board		: 	'qa',
 		cate		: 	'',
	 	search		:	''
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.cate)){
			sendData.cate = infoEleData.cate;	
		}
	}
	console.log('sendData', sendData);
	
	//검색어
	var faqSearchVal = $('#csFaqSearchForm_faq_search').val();
	if(isDefined(faqSearchVal)){
		sendData.search = faqSearchVal;
	}
	
	var successFunGetFaqContentsList = function(data){
			console.log('successFunGetNoticeContentsList', data);

			var $innerTargetEle = $('#cs-qa-contents-list-data');
			var faqData = null;
			if(isDefined(data.board_list_data)){
				var faqData = data.board_list_data;
				var noticeList = faqData.list;
				var faqListHtml = [];
				var lCnt = 0;
				for(var i in noticeList){
					faqListHtml.push(TEMPLETE.WEB_PAGE.getCsQaListHtml(noticeList[i], lCnt));
					lCnt++;
				}
				
				$innerTargetEle.html(faqListHtml.join(''));
				
				var curPage = faqData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(faqData.limit),
				};
				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(faqData.total_count)){
						reSavePageData.total_count	= parseInt(faqData.total_count);	
						get_total_count = parseInt(faqData.total_count);
					}
					if(isDefined(faqData.total_page)){
						reSavePageData.total_page	= parseInt(faqData.total_page);	
						get_total_page = parseInt(faqData.total_page);
					}
				}
				$infoEle.data(reSavePageData);
				
				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_CS.DATA.pagination)){
					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					console.log('aaa');
					if(isDefined(PAGE_CS.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}
					
				}
				
				//binding
				PAGE_CS_QA.afterDataBinding();
				
				//페이지 상단으로 이동
				utility.ui.goToElement('.container');
				
				//$infoEle.pagination('selectPage', curPage);
				PAGE_CS.DATA.LOADED_PAGE = parseInt(curPage);
				
				//save cache
				PAGE_CS.DATA.LAST_HASH = location.hash;
				
				//img lazy 스크롤 때문에 lazy가 의미 없음
				//$('.disk-image-lazy').lazy();
				
			}
	};
	
	
	console.log('sendData', sendData);
	PAGE_CS.getBoardListContentsData(sendData, successFunGetFaqContentsList);
	return;
};

//qa 내용 가져오기
PAGE_CS_QA.getBoardViewContentsData = function(getData, $targetEle){
	console.log('PAGE_CS_QA.getBoardViewContentsData', getData);
	console.log($targetEle);
	if(isDefined(getData.idx) == false){
		console.log('empty idx');
		return;
	}
	
	var successFunGetNoticeContentsView = function(data){
		console.log('successFunGetNoticeContentsView', data);
		console.log(data);
		
		if(isDefined(data.view_html)){
			var viewHtml = data.view_html;
			$targetEle.empty().html(viewHtml).addClass('active');
			if(isDefined(data.saved_ele)){
				//$('#'+data.saved_ele).data({view_html: viewHtml, load : 1});
			}
			$('.l_content.notice_view').addClass('show');
			
			PAGE_CS_QA_VIEW.start(data);
		}	
				
		//페이지 상단으로 이동
		utility.ui.goToElement('.container');
	};
		
	var formData = getData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_NOTICE_VIEW,
		data		: formData,
		success_fun	: successFunGetNoticeContentsView,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//1:1문의 쓰기
PAGE_CS_QA.onclickWriteQaFormOpen = function(thisEle){
	console.log('PAGE_CS_QA.onclickWriteQaFormOpen');	
	
	$('.one_to_one_view_wrap').empty().removeClass('active');
	$('.one_to_one_list_wrap').removeClass('active');
	$('.one_to_one_write_wrap').addClass('active');
	
	
	//데이타 초기화
	$('#csQaWriteForm').find('input[name=qa_title]').val('');
	$('#csQaWriteForm').find('textarea[name=qa_contents]').val($('#csQaWriteForm-qa_contents').prop("defaultValue"));
	$('#csQaWriteForm').find('input[name=qa_bbs_id]').val('');
	utility.ui.goToElement('.container');
};


//get getMyPageContentsData
PAGE_CS_QA.getQaContentsData = function(page){	
    
    
    var isPageShow = true;
    var successFunGetContentsList = function(res){
     
        console.log(res.my_page_data);
        $(".file_list_wrap,#cs-buycontents-pagination-section").remove();
        $(".my_d_list_area").append(res.my_page_data);
		console.log(res);
		
        var $infoEle = $('#cs-buycontents-common-pagination');
        var pagination = $infoEle.pagination({
			/*
			items: totalPages,
			itemsOnPage: 20,
			*/
			pages 		: res.my_pagenation_data.total_count,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
            hrefTextPrefix: "javascript:;",
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
                PAGE_CS_QA.getQaContentsData(page);
                return;
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_CS.goCategoryPage(page);
			}
		});
        console.log($infoEle.length)
        var loadPage = 0;
        if(isDefined($infoEle.data('load'))){
        	loadPage = parseInt($infoEle.data('load'));
        }
        var infoEleData = $infoEle.data();
        var pageData = res.my_pagenation_data
        var curPage = pageData.page;
		var reSavePageData =
		{
			load		:	parseInt(curPage),
			page		:	parseInt(curPage),
			limit		:	parseInt(pageData.page_limit),
		};
		var get_total_count = 0
		var get_total_page = 0;
		if(isDefined(pageData.total_count)){
			reSavePageData.total_count	= parseInt(pageData.total_count);	
			get_total_count = parseInt(pageData.total_count);
		}
		if(isDefined(pageData.total_page)){
			reSavePageData.total_page	= parseInt(pageData.total_page);	
			get_total_page = parseInt(pageData.total_page);
		}
		$infoEle.data(reSavePageData);
		console.log(reSavePageData)
		//pagination
		if(isDefined(PAGE_CS.DATA.pagination)){
		 $infoEle.pagination('updateItems', get_total_page);
			//$infoEle.pagination('selectPage', curPage);
            $infoEle.pagination('drawPage', curPage);
		}
    }
	var formData = {page:page};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CS.GET_BUY_CONTENTS_LIST,
		data		: formData,
		success_fun	: successFunGetContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

PAGE_CS_QA.buyContentsCheck = function(thisval){
    
    $("input[name=my_contents_check]").prop("checked",false);
    $("input[name=my_contents_check][value="+$(thisval).val()+"]").prop("checked",true);
    $('input[name="qa_bbs_id"]').val($(thisval).val());
}
//목록 보이기 - back btn
PAGE_CS_QA.onclickShowQaListWrap = function(thisEle){
	console.log('PAGE_CS_QA.onclickWriteQaFormOpen');	
	
	$('.one_to_one_view_wrap').empty().removeClass('active');
	$('.one_to_one_write_wrap').removeClass('active');
	$('.one_to_one_list_wrap').addClass('active');
	
	utility.ui.goToElement('.container');
};

//QA 문의 남기기
PAGE_CS_QA.actionFormQaWrite = function(formEleId){

	console.log('csFaqSearchForm submit');
	//event.preventDefault(); 
	var formValues = $('#'+formEleId).serializeArray();
	console.log('formValues:', formValues);
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	
	
	if(isDefined(formData.qa_category) == false){
		alert('문의 구분을 선택해주세요.');
		$('.radio_wrap').addClass('is-invalid').focus();
		return false;
	}
	
	if(isDefined(formData.qa_title) == false){
		alert('문의 제목을 입력해주세요.');
		$('#'+formEleId+'-qa_title').focus();
		return false;
	}
	
	if(formData.qa_title.length < 10 || formData.qa_title.length > 100){
		alert('문의 제목은 최소 10자에서 최대 100자까지 가능합니다.');
		$('#'+formEleId+'-qa_contents').focus();
		return false;
	}
	
	var qaContentsDefaultValus =  $('#csQaWriteForm-qa_contents').prop("defaultValue");
	console.log('qaContentsDefaultValus', qaContentsDefaultValus);
	if(qaContentsDefaultValus == $('#csQaWriteForm-qa_contents').val()){
		console.log('same def');
		alert('문의 내용을 입력해주세요.');
		$('#'+formEleId+'-qa_contents').focus();
		return false;
	}
	
	
	if(isDefined(formData.qa_contents) == false){
		alert('문의 내용을 입력해주세요.');
		$('#'+formEleId+'-qa_contents').focus();
		return false;
	}
	
	if(qaContentsDefaultValus == formData.qa_contents){
		alert('문의 내용을 입력해주세요.');
		$('#'+formEleId+'-qa_contents').focus();
		return false;
	}
	
	if(formData.qa_contents.length < 20){
		alert('문의 내용을 20자 이상 입력해주세요.');
		$('#'+formEleId+'-qa_contents').focus();
		return false;
	}
	
	if(formData.qa_contents.length > 2000){
		alert('문의 내용을 2000자 이하로 입력해주세요.');
		$('#'+formEleId+'-qa_contents').focus();
		return false;
	}
	
	var isReplyEmail = 0;
	if(isDefined(formData.qa_reply_email) == true){
		
		if(formData.qa_reply_email == 'on'){
			isReplyEmail = 1;
			if(isDefined(formData.qa_email) == false){
				alert('답변 알림을 받으실 메일 주소를 입력해주세요.');
				$('#'+formEleId+'-qa_contents').focus();
				return false;
			}
		}
		
	}
	
	if(isReplyEmail == true){
		if(isDefined(formData.qa_reply_email_agree) == false || formData.qa_reply_email_agree != 'on'){
			alert('답변 알림을 받으실려면 개인정보 수집·이용에 동의하셔야 합니다.');
			$('#'+formEleId+'-qa_reply_email_agree').focus();
			return false;
		}	
	}
	
	formData.is_replay_email = isReplyEmail;
	
	console.log('formData', formData);
	
	
	var successQaWriteFormFun = function(data){
		console.log('successQaWriteFormFun');
		console.log(data);
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
		}
		
		location.reload(true);
	};
	
	
	
	COMMON_ACTION.CS.setWriteQaFormAction(formData, successQaWriteFormFun);
	
};


//요청글 삭제
PAGE_CS_QA.onclickDelQa = function(boardIdx){
	console.log('PAGE_CS_QA.onclickDelQa', boardIdx);
	
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
		location.reload(true);
		
	};
	var sendData = {
		idx	: parseInt(boardIdx)
	}
	COMMON_ACTION.CS.setDelQaFormAction(sendData, callbackFunSuccessDellBoradIdx);
	return;
};





/*QA View */
PAGE_CS_QA_VIEW = {};
PAGE_CS_QA_VIEW.start = function(data){
	console.log('PAGE_CS_QA_VIEW.start', data);
	
	PAGE_CS_QA_VIEW.initBinding();
	PAGE_CS_QA_VIEW.initOnload();
};


PAGE_CS_QA_VIEW.initBinding = function(){
	console.log('PAGE_CS_QA_VIEW.initBinding');
	
	
	
	//내용 닫기 & 목록보기
	if($( ".btn-close-self-contents").length > 0){
		$( ".btn-close-self-contents").unbind( "click");
		$( ".btn-close-self-contents").bind( "click", function() {
			console.log('.btn-close-self-contents');
			$('#one-to-one-view-wrap').removeClass('active');
			//리스트 active remove
			//$('.cs-notice-list-tit.active').removeClass('active');
			//페이지 상단으로 이동
			utility.ui.goToElement('.container');
		});
	}
};



PAGE_CS_QA_VIEW.initOnload = function(){
	console.log('PAGE_CS_QA_VIEW.initOnload');
	
	
};

PAGE_CS_QA_VIEW.ajax_



/* NEWS */
var PAGE_CS_NEWS = {};
PAGE_CS_NEWS.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
};

PAGE_CS_NEWS.start = function(pageSub, pagData){
	console.log('PAGE_CS_NEWS.start', pagData);
	console.log('pageSub', pageSub);
	
	
	PAGE_CS.DATA.LAST_HASH = '#!action=qa&page=1';
	
	PAGE_CS.setHashCheck('start');
	
	PAGE_CS_NEWS.initBinding(pageSub, pagData);
};



PAGE_CS_NEWS.initBinding = function(pageSub, pagData){
	console.log('PAGE_CS_NEWS.initBinding');
	
	//새소식 제목 클릭 - 내용보기
	if($( ".mypage-bbs-news-item" ).length > 0){ 
		$( ".mypage-bbs-news-item" ).unbind( "click");
		$( ".mypage-bbs-news-item" ).bind( "click", function() {
			console.log('.mypage-bbs-news-item');
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$('.mypage-bbs-news-item.active').removeClass('active');
				$(this).toggleClass('active');	
			}
			
		});
	}
	
	if(isLoadedBbqScript() == true){
		var hashPrams = $.deparam.fragment();
		console.log('hashPrams', hashPrams);
		
		var hashAction = hashPrams['!action'];
		var hashIdx = hashPrams['idx'];
		console.log('hashIdx', hashIdx);
		if(hashAction == 'news' && isDefined(hashIdx) == true){
			
			var $openTargetEle = $('#cs-news-board-contets-list-'+hashIdx);
			if($openTargetEle.length > 0){
				$('.cs-bbs-news-item.active').removeClass('active');
				$openTargetEle.addClass('active');
			}
		}
	}
	
	
	
};

//내용 더보기
PAGE_CS_NEWS.onclickMoreConetesDetail = function(thisEle){
	console.log('PAGE_CS_NEWS.onclickMoreConetesDetail');
	
	$(thisEle).parents('.cs-news-list-wrap').toggleClass('active');
};

