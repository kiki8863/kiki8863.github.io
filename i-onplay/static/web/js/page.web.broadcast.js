/*
* broadcast channel
*/


var PAGE_BROADCAST = {};
/*
PAGE_BROADCAST.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};
*/

PAGE_BROADCAST.start = function(pageSub, pagData){
	console.log('PAGE_BROADCAST.start', pageSub);
	console.log(pagData);

	PAGE_CHANNEL_ON.rightBinding();

	if(pageSub == 'b_list'){
		PAGE_BROADCAST_B_LIST.start(pageSub, pagData);
	}else if(pageSub == 'a_list'){
		PAGE_ANI_LIST.start(pageSub, 'broadcast');
	}else if(pageSub == 'b_view'){
		PAGE_BROADCAST_B_VIEW.start(pageSub, pagData);
	}else if(pageSub == 'b_schedule'){
		PAGE_BROADCAST_B_SCHEDULE.start(pageSub, pagData);
	}
};


//영화 리스트
PAGE_BROADCAST_B_LIST = {};



var PAGE_BROADCAST_B_LIST = {};
PAGE_BROADCAST_B_LIST.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_BROADCAST_B_LIST.start = function(pageSub, pagData){
	console.log('PAGE_BROADCAST_B_LIST.start', pageSub);
	console.log(pagData);
	PAGE_BROADCAST_B_LIST.DATA.LAST_HASH = '';
	
	PAGE_BROADCAST_B_LIST.setBindingPjax();
	PAGE_BROADCAST_B_LIST.initBinding();
	PAGE_BROADCAST_B_LIST.initOnload();
	//PAGE_BROADCAST_B_LIST.setHashCheck(null);


};
//pjax binding
PAGE_BROADCAST_B_LIST.setBindingPjax = function(){
	console.log('PAGE_BROADCAST_B_LIST.setBindingPjax');
		
	if($.support.pjax) {
		$.pjax.defaults.scrollTo = false;
		console.log('support pajx');
		//var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			console.log($(this));
			var containerSelector = '#broadcast-rank-contents-list-wrap';
			var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
			console.log('url', url);
            //alert('aaaaa');
			
			$.pjax.click(event, {
				container: containerSelector,
				url: url
				
			});
            return false;
		});
	}
	
	$(document).on('pjax:send', function() {
		utility.spinnerLoading.show();
        
	});
	
	$(document).on('pjax:complete', function() {
		utility.spinnerLoading.hide();
		//go top
		//utility.ui.goToElement('#search-contents-list-wrap');
		utility.ui.goToElement('.content.sub');
		
		//image lazy
		WEB_COMMON.setImageLazy();
		

		
	});

	// for google analytics
	$(document).on('pjax:end', function() {
		ga('set', 'location', window.location.href); // 현재 바뀐 주소를
		ga('send', 'pageview'); // 보고한다
	});
};


PAGE_BROADCAST_B_LIST.initBinding = function(){
	console.log('PAGE_BROADCAST_B_LIST.initBinding');

	//개봉 연도
	$( "#btn-broadcast-top-open-year" ).unbind( "click");
	$( "#btn-broadcast-top-open-year" ).bind( "click", function() {
		console.log('btn-broadcast-top-open-year');
		$( '#select-area-broadcast-top-open-year' ).toggleClass('active');
	});

	//방송국 선택
	$( "#btn-broadcast-top-station" ).unbind( "click");
	$( "#btn-broadcast-top-station" ).bind( "click", function() {
		console.log('btn-broadcast-top-station');
		$( '#select-area-broadcast-top-station' ).toggleClass('active');
	});

	//장르 선택
	$( "#btn-broadcast-top-genre" ).unbind( "click");
	$( "#btn-broadcast-top-genre" ).bind( "click", function() {
		console.log('btn-broadcast-top-genre');
		$( '#select-area-broadcast-top-genre' ).toggleClass('active');
	});

	//정렬순서
	$( "#btn-broadcast-top-sort-key" ).unbind( "click");
	$( "#btn-broadcast-top-sort-key" ).bind( "click", function() {
		console.log('btn-broadcast-top-sort-key');
		$( '#select-area-broadcast-sort-key' ).toggleClass('active');
	});


	//필터 옵션 클릭
	$( ".select-top-broadcast-option" ).unbind( "click");
	$( ".select-top-broadcast-option" ).bind( "click", function() {
		console.log('select-top-broadcast-option');
		var eleData = $(this).data();
		console.log(eleData);

		if(eleData.values == 'all'){
			eleData.values = '';
		}
		var isChange = false;
		if(isDefined(eleData.target)){
			var saveEleData = {};
			saveEleData[eleData.type] = eleData.values;
			console.log(saveEleData);

			//$('#'+eleData.target).data(saveEleData).text($(this).text()).trigger('click');
			$('#'+eleData.target).data(saveEleData).text($(this).text());
			$('.select-area-broadcast-top.active').removeClass('active');
			console.log($('#'+eleData.target).data());
			isChange = true;
		}

		var optName = 'option';
		if(isDefined(eleData.form)){

			$('#'+eleData.form).val(eleData.values);
			isChange = true;
			optName = $('#'+eleData.form).attr('name');

		}

		if(isChange == true){
			//var addHash = '&'+optName+'='+eleData.values;
			//PAGE_BROADCAST_B_LIST.goChangeBroadcastPage(1, addHash);
			PAGE_BROADCAST_B_LIST.getSearchPageWithOption(1);
		}
	});

};



PAGE_BROADCAST_B_LIST.initOnload = function(){
	console.log('PAGE_BROADCAST_B_LIST.initOnload');
	var $paginationEle = $('#channel-broadcast-common-pagination');
	var loadedPage = $paginationEle.data('load');
	if(isDefined(loadedPage)){
		PAGE_BROADCAST_B_LIST.DATA.LOADED_PAGE = parseInt(loadedPage);
	}


};


//수동으로 리스트  가져오기
PAGE_BROADCAST_B_LIST.goSearchContentsDatayPjax = function(pJaxUrl){
	console.log('goCategoryPjax', pJaxUrl);
	if(isDefined(pJaxUrl) == false){
		return;
	}
	var containerSelector = '#broadcast-rank-contents-list-wrap';
	if ($.support.pjax) {
		console.log('support');
		$.pjax({url: pJaxUrl, container:containerSelector});
	}
	return;

};


//페이지 이동 분기 처리
PAGE_BROADCAST_B_LIST.getSearchPageWithOption = function(goPage, selectedCategory){
	console.log('PAGE_BROADCAST_B_LIST.goSearchPageWithOption', goPage);

	console.log(' window.location.href',  window.location.href);
	console.log("pathname: "+location.pathname);
		
	var sendData = {
		c			: 12000,	//cate1
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,		//is mobile
		by			: '',		//open_year
		bn			: '',		//nation
		bg			: '',		//genre
		bs			: '',		//station
		is_hot		: '',		//is hot
		is_new		: '',		//is new
		is_event	: '',		//is event
		is_top		: '',		//is top
	};
	
	var $infoEle = $('#channel-broadcast-pagistation');
	if($infoEle.length > 0){
		sendData.bro_type = $infoEle.data('menu_type');
	}
	
	//open year
	var openYear = $('#topListOptionBroadcastFormOpenYear').val();
	if(isDefined(openYear)){
		sendData.by = openYear;
	}
	console.log('openYear', openYear);

	//nation
	if($('#topListOptionBroadcastFormNation').length > 0){
		var bNation = $('#topListOptionBroadcastFormNation').val();
		if(isDefined(bNation)){
			sendData.bn = bNation;
		}
		console.log('bNation', bNation);
	}

	//station
	var bStation = $('#topListOptionBroadcastFormStation').val();
	if(isDefined(bStation)){
		sendData.bs = bStation;
	}
	console.log('bStation', bStation);

	//genre
	var bGenre = $('#topListOptionBroadcastFormGenre').val();
	if(isDefined(bGenre)){
		sendData.bg = bGenre;
	}
	console.log('bGenre', bGenre);

	//is hot
	var bIsHot = $('#topListOptionBroadcastFormIsHot').val();
	if(isDefined(bIsHot)){
		sendData.is_hot = bIsHot;
	}
	console.log('bIsHot', bIsHot);

	//is new
	var bIsNew = $('#topListOptionBroadcastFormIsNew').val();
	if(isDefined(bIsNew)){
		sendData.is_new = bIsNew;
	}
	console.log('bIsNew', bIsNew);

	//is event
	var bIsEvent = $('#topListOptionBroadcastFormIsEvent').val();
	if(isDefined(bIsEvent)){
		sendData.is_event = bIsEvent;
	}
	console.log('bIsEvent', bIsEvent);

	//is top
	var bIsTop = $('#topListOptionBroadcastFormIsTop').val();
	if(isDefined(bIsTop)){
		sendData.is_top = bIsTop;
	}
	console.log('bIsTop', bIsTop);

	//sortKey
	var sortKey = $('#topListOptionBroadcastFormSortKey').val();
	if(isDefined(sortKey)){
		sendData.sk = sortKey;
	}
	console.log('sortKey', sortKey);
	console.log('sendData', sendData);
	
	var cData = {};
	for(var i in sendData){
		if(isDefined(sendData[i])){
			cData[i] = sendData[i];
		}
	}
	
		
	var showLocation = location.pathname;
	var sendSrt = $.param( cData );
	console.log('sendSrt', sendSrt);
	var goUrl = showLocation+'?'+sendSrt;
	console.log('goUrl',goUrl);
	
	
	PAGE_BROADCAST_B_LIST.goSearchContentsDatayPjax(goUrl);
	return;

};






/*
* broadcast view
*/

PAGE_BROADCAST_B_VIEW = {};

//var PAGE_BROADCAST_B_VIEW = {};
PAGE_BROADCAST_B_VIEW.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_BROADCAST_B_VIEW.start = function(pageSub, pagData){
	console.log('PAGE_BROADCAST_B_VIEW.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL_ON_VIEW.start(pageSub, pagData);
	PAGE_BROADCAST_B_VIEW.DATA.LAST_HASH = '#!action=broadcast&idx=1';



	PAGE_BROADCAST_B_VIEW.initBinding();
	PAGE_BROADCAST_B_VIEW.initOnload();
	//PAGE_BROADCAST_B_VIEW.setHashCheck(null);


};



PAGE_BROADCAST_B_VIEW.initBinding = function(){
	console.log('PAGE_BROADCAST_B_VIEW.initBinding');

	//회차별 - 이전, 다음
	var $btnChannelBroChapterControler = $( ".btn-channel-bro-chapter" );
	if($btnChannelBroChapterControler.length > 0){
		$btnChannelBroChapterControler.unbind( "click");
		$btnChannelBroChapterControler.bind( "click", function() {
			console.log('btn-channel-bro-chapter');
			utility.shortPagination.action($(this), '.btn-channel-bro-chapter', PAGE_BROADCAST_B_VIEW.getMoreBroadcastChapterData);	//반드시 .을 붙인다


		});
	}


	//회차 바로보기
	var $arrowChapterSelect = $(".arrow-broadcast-chapter-select");
	if($arrowChapterSelect.length > 0){
		$arrowChapterSelect.unbind( "click");
		$arrowChapterSelect.bind( "click", function() {
			console.log('.arrow-broadcast-chapter-select');
			$(this).parent().toggleClass('active');
		});
	}

	//다른시즌 보기
	var $arrowBroadcastSeasonSelect = $(".arrow-broadcast-season-select");
	if($arrowBroadcastSeasonSelect.length > 0){
		$arrowBroadcastSeasonSelect.unbind( "click");
		$arrowBroadcastSeasonSelect.bind( "click", function() {
			console.log('.arrow-broadcast-season-select');
			$(this).parent().toggleClass('active');
		});
	}

};

PAGE_BROADCAST_B_VIEW.initOnload = function(){
	console.log('PAGE_BROADCAST_B_VIEW.initOnload');



};

PAGE_BROADCAST_B_VIEW.setBroadcastRankingRecommend = function(contentsIdx){

var sucRecommend = function (res){
    console.log(res)
        	if(isDefined(res.show_msg)){
        	   alert(res.show_msg);
            }
    }
    var sendData = {
		idx		: contentsIdx,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHANNEL_ON.SET_RECOMMEND,
		data		: sendData,
		success_fun	: sucRecommend,
		error_fun	: null,
		isSpinner	: false,
	};
	DISK_PROTOCOL.AJAX(ajaxData);


}
//방송회차별 더가져오기
PAGE_BROADCAST_B_VIEW.getMoreBroadcastChapterData = function(eleData){
	console.log('PAGE_BROADCAST_B_VIEW.getMoreBroadcastChapterData');
	console.log('eleData', eleData);
	//var eleData = $slickTarget.data();
	if(isDefined(eleData.idx) == false || isDefined(eleData.page) == false || isDefined(eleData.next_page) == false){
		return;
	}

	var nextPage = 1;
	if(isDefined(eleData.next_page)){
		nextPage = parseInt(eleData.next_page);
	}

	if(nextPage > parseInt(eleData.total_page)){
		console.log('end page');
		return;
	}

	var successFunGetBroadcastChapterList = function(data){
		console.log('successFunGetBroadcastChapterList', data);
		if(isDefined(data.broadcast_chapter_data)){
			var cList = data.broadcast_chapter_data.list;
			var cHtml = [];
			var bChapter = null;
			for(var i = 0; i < cList.length; i++){
				bChapger = new Bchapter(i, false);
				bChapger.setData(cList[i]);
				cHtml[i] = bChapger.getChapterListHtmlChannel();
			}

			if(isDefined(eleData.target) == true){
				//$('#'+eleData.target).addClass('animated fadeIn').html(cHtml.join(''));
				$('#'+eleData.target).html(cHtml.join(''));
			}


			if(isDefined(eleData.info) == true){
				var saveData = {
					page : parseInt(data.broadcast_chapter_data.page),
					limit : parseInt(data.broadcast_chapter_data.limit),
				};
				$('#'+eleData.info).data(saveData);
			}

			/*
			if(cHtml.length > 0){
				for(var k in cHtml){
					 $slickTarget.slick('slickAdd',cHtml[k]);
				}
			}
			if(isDefined(data.broadcast_chapter_data.page)){
				var updateData ={
					page : data.broadcast_chapter_data.page
				};

				if(isDefined(data.broadcast_chapter_data.limit)){
					updateData.limit = 	data.broadcast_chapter_data.limit;
				}

				$slickTarget.data(updateData);
			}
			*/

		}
	};

	var sendData = {
		idx		: eleData.idx,
		page	: nextPage,
		limit	: eleData.limit,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.BROADCAST.CHAPTER_LIST,
		data		: sendData,
		success_fun	: successFunGetBroadcastChapterList,
		error_fun	: null,
		isSpinner	: false,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};


//방송회차별 바로가기 - 회차정보로 바로가기
PAGE_BROADCAST_B_VIEW.onclickContentsViewFormBroadcastChapter = function(thisEle){
	console.log('PAGE_BROADCAST_B_VIEW.openContentsViewFormBroadcastChapter');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	//bbs idx가 있으면
	if(isDefined(eleData.idx)){
		if($.isNumeric(eleData.idx)== true && eleData.idx > 0){
			WEB_COMMON_GO.openContents(null,'chapter', thisEle);
			return;
		}
	}
	
	if(isDefined(eleData.url)){
		location.href = eleData.url;
		return;
	}
	
	
	//차트 회차 번호만 아는 경우
	if(isDefined(eleData.chapter)){
		if($.isNumeric(eleData.chapter)== true && eleData.chapter > 0){
			PAGE_BROADCAST_B_VIEW.openContentsViewFormBroadcastChapterWithNumber(thisEle);
			return;
		}
	}

	//검색 주소로 이동
	/*
	if(isDefined(eleData.url)){
		location.href = eleData.url;
		return;
	}
	*/
	
	//타이틀로 이동 
	if(isDefined(eleData.title)){
		var searchUrl = "/search/?l=12000&fc=12000&k="+eleData.title;
		location.href = searchUrl;
		return;
	}

	return;
};


//방송회차별 바로가기 - 회차정보로 바로가기
PAGE_BROADCAST_B_VIEW.openContentsViewFormBroadcastChapterWithNumber = function(thisEle){
	console.log('PAGE_BROADCAST_B_VIEW.openContentsViewFormBroadcastChapterWithNumber');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	$('.chapter-select-item.active').removeClass('active');
	$(thisEle).addClass('active');
	if(isDefined(eleData) == false){
		return;
	}

	if(isDefined(eleData.chapter) == false || isDefined(eleData.bro) == false){
		return;
	}
	if(isDefined(eleData.title)  == false){
		eleData.title = '';
	}
	var successFunGetBroadcastChapterInfo = function(data){
		console.log('successFunGetBroadcastChapterInfo', data);

		if(isDefined(data.chapter_data)){
			//콘텐츠 오픈
			if(isDefined(data.chapter_data.show_bbs_idx) == true && data.chapter_data.show_bbs_idx > 0){
				WEB_COMMON_GO.openContents(data.chapter_data.show_bbs_idx, 'chapter');
				return;
			//검색으로 이동
			}else if(isDefined(data.chapter_data.show_search_link) == true){
				location.href = data.chapter_data.show_search_link;
				return;
			}
		}
		if(isDefined(data.search) == true){
			location.href = data.search;
			return;
		}
		if(isDefined(eleData.url)){
			location.href = eleData.url;
			return;
		}

		alert('회차 정보가 없습니다.');
		return;

	};


	var sendData = {
		idx		: eleData.bro,
		chapter	: eleData.chapter,
		title	: eleData.title
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.BROADCAST.CHAPTER_INFO,
		data		: sendData,
		success_fun	: successFunGetBroadcastChapterInfo,
		error_fun	: null,
		isSpinner	: false,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};














PAGE_BROADCAST_B_SCHEDULE = {};

//var PAGE_BROADCAST_B_SCHEDULE = {};
PAGE_BROADCAST_B_SCHEDULE.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_BROADCAST_B_SCHEDULE.start = function(pageSub, pagData){
	console.log('PAGE_BROADCAST_B_SCHEDULE.start', pageSub);
	console.log(pagData);

	PAGE_BROADCAST_B_SCHEDULE.DATA.LAST_HASH = '#!action=bsc&tab=1';



	PAGE_BROADCAST_B_SCHEDULE.initBinding();
	PAGE_BROADCAST_B_SCHEDULE.initOnload();
	//PAGE_BROADCAST_B_SCHEDULE.setHashCheck(null);


};



PAGE_BROADCAST_B_SCHEDULE.initBinding = function(){
	console.log('PAGE_BROADCAST_B_SCHEDULE.initBinding');

	//편성표 탭 클릭
	$( ".bro-sch-genre-tab" ).unbind( "click");
	$( ".bro-sch-genre-tab" ).bind( "click", function() {
		console.log('bro-sch-genre-tab');
		//$( '#select-area-broadcast-top-open-year' ).toggleClass('active');

		var that = this;
		var eleData = $(this).data();
		console.log('eleData', eleData);

		var tabContentsUrl = DISK_PROTOCOL.ONPLAY_URL.BROADCAST.BROADCAST_SCHEDULE +'/?tab='+eleData.tab;
		$.get( tabContentsUrl, function( data ) {
			$( "#"+eleData.target ).html( data );
			$('.bro-sch-genre-tab.active').removeClass('active');
			$(that).addClass('active');
		});





	});



};

PAGE_BROADCAST_B_SCHEDULE.initOnload = function(){
	console.log('PAGE_BROADCAST_B_SCHEDULE.initOnload');



};


/*
//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_BROADCAST_B_LIST.setHashCheck = function(hashPrams){
	console.log('PAGE_BROADCAST_B_LIST.setLoadHashCheck');
	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != 'broadcast_list'){
		console.log(hashPrams['!action']);
		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']),'channel');
			}
		}
		return;
	}
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}

	console.log('hashPage',hashPage);

	//return;
	if(isDefined(hashPage)){
		console.log('has hash', hashPage);

		if(PAGE_BROADCAST_B_LIST.DATA.LAST_HASH != location.hash){
			PAGE_BROADCAST_B_LIST.setBroadcastPage(hashPage);
			return;
		}

		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_BROADCAST_B_LIST.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_BROADCAST_B_LIST.DATA.LOADED_PAGE);
			}
			//var loadEleData = $('#channel-broadcast-common-pagination').data('load');
			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	PAGE_BROADCAST_B_LIST.setBroadcastPage(hashPage);
};

	//pagination

	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		var startPage = 1;
		var initiateStartPageClick = false;
		var totalPages = 1;
		if(isDefined(eleData.total_page)){
			totalPages = parseInt(eleData.total_page);
		}
		if(isDefined(eleData.page)){
			if(eleData.page > 1){
				startPage = eleData.page;
			}
		}
		
		PAGE_BROADCAST_B_LIST.DATA.paginationEle = $paginationEle;


		PAGE_BROADCAST_B_LIST.DATA.pagination = $paginationEle.pagination({
			
			currentPage	: startPage,
			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: '#!action=broadcast_list&page=',
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_BROADCAST_B_LIST.goCategoryPage(page);
			}
		});

		console.log(PAGE_BROADCAST_B_LIST.DATA.pagination);
	}
*/
/*


//페이지 이동 분기 처리
PAGE_BROADCAST_B_LIST.goChangeBroadcastPage = function(goPage, addHash){
	console.log('PAGE_BROADCAST_B_LIST.goChangeBroadcastPage', goPage);
	var hashUrl = $.param.fragment();
	console.log('hashUrl', hashUrl);

	//return;
	if(hashUrl){
		var goHash = '#!action=broadcast_list&page='+goPage;
		if(isDefined(addHash) == true){
			goHash += addHash;
		}
		console.log('goHash', goHash);
		if(goHash != hashUrl){
			console.log('gohash'+goHash);
			location.hash = goHash;

		}else{
			PAGE_BROADCAST_B_LIST.setBroadcastPage(goPage);
		}
	}else{
		PAGE_BROADCAST_B_LIST.setBroadcastPage(goPage);
	}
};


PAGE_BROADCAST_B_LIST.setBroadcastPage = function(nextPage){
	console.log('PAGE_BROADCAST_B_LIST.setBroadcastPage:',nextPage);
	//console.log('loadedPage', loadedPage);

	if(isDefined(nextPage) == false){
		nextPage = 1;
	}

	var $infoEle = null;
	if(PAGE_BROADCAST_B_LIST.DATA.paginationEle){
		$infoEle = PAGE_BROADCAST_B_LIST.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#channel-broadcast-common-pagination');
	}
	var infoEleData = $infoEle.data();

	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }

 	var sendData = {
 		page 	:	nextPage,
 		limit	: 	null,
 		sort_type	:	'D',
 		adult_block	: 0,
 		sort_key	: 	'',
 		open_year	: '',
 		station		: '',


 	};

 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;
		}
	}

	//open year
	var openYear = $('#topListOptionBroadcastFormOpenYear').val();
	if(isDefined(openYear)){
		sendData.open_year = openYear;
	}
	console.log('openYear', openYear);

	//nation
	if($('#topListOptionBroadcastFormNation').length > 0){
		var bNation = $('#topListOptionBroadcastFormNation').val();
		if(isDefined(bNation)){
			sendData.nation = bNation;
		}
		console.log('bNation', bNation);
	}

	//station
	var bStation = $('#topListOptionBroadcastFormStation').val();
	if(isDefined(bStation)){
		sendData.station = bStation;
	}
	console.log('bStation', bStation);

	//genre
	var bGenre = $('#topListOptionBroadcastFormGenre').val();
	if(isDefined(bGenre)){
		sendData.genre = bGenre;
	}
	console.log('bGenre', bGenre);

	//is hot
	var bIsHot = $('#topListOptionBroadcastFormIsHot').val();
	if(isDefined(bIsHot)){
		sendData.is_hot = bIsHot;
	}
	console.log('bIsHot', bIsHot);

	//is new
	var bIsNew = $('#topListOptionBroadcastFormIsNew').val();
	if(isDefined(bIsNew)){
		sendData.is_new = bIsNew;
	}
	console.log('bIsNew', bIsNew);

	//is event
	var bIsEvent = $('#topListOptionBroadcastFormIsEvent').val();
	if(isDefined(bIsEvent)){
		sendData.is_event = bIsEvent;
	}
	console.log('bIsEvent', bIsEvent);

	//is top
	var bIsTop = $('#topListOptionBroadcastFormIsTop').val();
	if(isDefined(bIsTop)){
		sendData.is_top = bIsTop;
	}
	console.log('bIsTop', bIsTop);

	//sortKey
	var sortKey = $('#topListOptionBroadcastFormSortKey').val();
	if(isDefined(sortKey)){
		sendData.sort_key = sortKey;
	}
	console.log('sortKey', sortKey);

	console.log('sendData', sendData);
	PAGE_BROADCAST_B_LIST.getBroadcastContentsData(sendData, $infoEle);


	return;

};



//get getBroadcastContentsData
PAGE_BROADCAST_B_LIST.getBroadcastContentsData = function(getData, $infoEle){
	console.log('PAGE_BROADCAST_B_LIST.getBroadcastContentsData', getData);

	var sendData = {
		c			: 12000,	//cate1
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,		//is mobile
		by			: '',		//open_year
		bn			: '',		//nation
		bg			: '',		//genre
		bs			: '',		//station
		is_hot		: '',		//is hot
		is_new		: '',		//is new
		is_event	: '',		//is event
		is_top		: '',		//is top
	};

	if(isDefined($infoEle) == false){
		$infoEle = PAGE_BROADCAST_B_LIST.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#channel-broadcast-common-pagination');
		}
	}

	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['sort_key'])){ sendData.sk = getData.sort_key; }
		if(isDefined(getData['nation'])){ sendData.bn = getData.nation; }
		if(isDefined(getData['open_year'])){ sendData.by = getData.open_year; }
		if(isDefined(getData['station'])){ sendData.bs = getData.station; }
		if(isDefined(getData['genre'])){ sendData.bg = getData.genre; }
		if(isDefined(getData['is_hot'])){ sendData.is_hot = getData.is_hot; }
		if(isDefined(getData['is_new'])){ sendData.is_new = getData.is_new; }
		if(isDefined(getData['is_event'])){ sendData.is_event = getData.is_event; }
		if(isDefined(getData['is_top'])){ sendData.is_top = getData.is_top; }
	}


	console.log('sendData', sendData);
	var $innerTargetEle = $('#broadcast-rank-contents-list-data-thumb');
    
    if(isDefined($("#rank_type").val())){ //omh 2019-12-23 애니를 위해 추가
        if($("#rank_type").val()== 2){
             $('#movie-rank-contents-list-data-thumb, #movie-rank-contents-list-data-thumb_option').hide();
             $('#broadcast-rank-contents-list-data-thumb_wrap').show();
            var $innerTargetEle = $('#broadcast-rank-contents-list-data-thumb_option');
            
        }
    }
	var successFunGetBroadcastContentsList = function(data){
			console.log('successFunGetBroadcastContentsList', data);

			var broData = null;

			if(isDefined(data.channel_broadcast_list)){
				var broData = data.channel_broadcast_list;
				var broDataList = broData['list'];
				var broListHtml = [];
				var lCnt = 0;
				for(var i in broDataList){
					//console.log(broDataList[i]);
					//var bDataList = broDataList[i];
					var broRank = new Broadcast_rank(lCnt);
					broRank.setData(broDataList[i]);
					broListHtml.push(broRank.getRankBroadcastHtml());
					lCnt++;
				}
				//console.log('broListHtml', broListHtml);
				//페이지 상단으로 이동
				utility.ui.goToElement('.l_content_wrap');

				$innerTargetEle.html(broListHtml.join(''));
                    


				var curPage = broData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(broData.limit),
				};

				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(broData.total_count)){
						reSavePageData.total_count	= parseInt(broData.total_count);
						get_total_count = parseInt(broData.total_count);
					}
					if(isDefined(broData.total_page)){
						reSavePageData.total_page	= parseInt(broData.total_page);
						get_total_page = parseInt(broData.total_page);
					}
				}
				$infoEle.data(reSavePageData);

				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_BROADCAST_B_LIST.DATA.pagination)){
					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					if(isDefined(PAGE_BROADCAST_B_LIST.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}else{
						console.log('NO PAGE~~~');
						$infoEle.pagination('selectPage', curPage);
					}
				}
				PAGE_BROADCAST_B_LIST.DATA.LOADED_PAGE = parseInt(curPage);

				//save cache
				PAGE_BROADCAST_B_LIST.DATA.LAST_HASH = location.hash;

				//img lazy 스크롤 때문에 lazy가 의미 없음
				$('.disk-image-lazy').lazy();

			}
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


PAGE_BROADCAST_B_LIST.openChannelView = function(thisEle){
	console.log('PAGE_BROADCAST_B_LIST.openChannelView');

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	//성인 체크
	if(eleData.is_adult == 1){
		alert('성인 인증 후 이용해 주세요.');
		return;

	}else{
		if(isDefined(eleData.href)){
			console.log(eleData.href)
			window.location = eleData.href;
		}else{
			voidLinkHref();
		}
	}
};


*/