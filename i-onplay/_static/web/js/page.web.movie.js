/*
* movie channel
*/

/*
* movie list
*/

var PAGE_MOVIE = {};
/*
PAGE_MOVIE.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};
*/

PAGE_MOVIE.start = function(pageSub, pagData){
	console.log('PAGE_MOVIE.start', pageSub);
	console.log(pagData);

	PAGE_CHANNEL_ON.rightBinding();

	if(pageSub == 'm_list'){
		PAGE_MOVIE_M_LIST.start(pageSub, pagData);
	}else if(pageSub == 'm_view'){
		PAGE_MOVIE_M_VIEW.start(pageSub, pagData);
	}else if(pageSub == 'a_list'){
		PAGE_ANI_A_LIST.start(pageSub, 'movie');
	}
};


//영화 리스트
PAGE_MOVIE_M_LIST = {};



var PAGE_MOVIE_M_LIST = {};
PAGE_MOVIE_M_LIST.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_MOVIE_M_LIST.start = function(pageSub, pagData){
	console.log('PAGE_MOVIE_M_LIST.start', pageSub);
	console.log(pagData);
	//PAGE_MOVIE_M_LIST.DATA.LAST_HASH = '#!action=movie_list&page=1';
	PAGE_MOVIE_M_LIST.setBindingPjax();
	
	PAGE_MOVIE_M_LIST.initBinding();
	PAGE_MOVIE_M_LIST.initOnload();
	//PAGE_MOVIE_M_LIST.setHashCheck(null);
	
	
};



//pjax binding
PAGE_MOVIE_M_LIST.setBindingPjax = function(){
	console.log('PAGE_MOVIE_M_LIST.setBindingPjax');
		
	if($.support.pjax) {
		$.pjax.defaults.scrollTo = false;
		console.log('support pajx');
		//var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		//console.log('url', url);
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			console.log($(this));
			var containerSelector = '#movie-rank-contents-list-data-thumb';
			var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
			console.log('url', url);
			
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



PAGE_MOVIE_M_LIST.initBinding = function(){
	console.log('PAGE_MOVIE_M_LIST.initBinding');

	//개봉 연도
	$( "#btn-movie-top-open-year" ).unbind( "click");
	$( "#btn-movie-top-open-year" ).bind( "click", function() {
		console.log('btn-movie-top-open-year');
		$( '#select-area-movie-top-open-year' ).toggleClass('active');
	});

	//국가 선택
	$( "#btn-movie-top-nation" ).unbind( "click");
	$( "#btn-movie-top-nation" ).bind( "click", function() {
		console.log('btn-movie-top-nation');
		$( '#select-area-movie-top-nation' ).toggleClass('active');
	});

	//장르 선택
	$( "#btn-movie-top-genre").unbind( "click");
	$( "#btn-movie-top-genre" ).bind( "click", function() {
		console.log('btn-movie-top-genre');
		$( '#select-area-movie-top-genre' ).toggleClass('active');
	});


	//정렬순서
	$( "#btn-movie-top-sort-key" ).unbind( "click");
	$( "#btn-movie-top-sort-key" ).bind( "click", function() {
		console.log('btn-movie-top-sort-key');
		$( '#select-area-movie-sort-key' ).toggleClass('active');
	});


	//필터 옵션 클릭
	$( ".select-top-movie-option" ).unbind( "click");
	$( ".select-top-movie-option" ).bind( "click", function() {
		console.log('select-top-movie-option');
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
			$('.select-area-movie-top.active').removeClass('active');
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
			//PAGE_MOVIE_M_LIST.goChangeMoviePage(1, addHash);
			PAGE_MOVIE_M_LIST.getSearchPageWithOption(1);
		}
	});

};

PAGE_MOVIE_M_LIST.initOnload = function(){
	console.log('PAGE_MOVIE_M_LIST.initOnload');
};




//수동으로 리스트  가져오기
PAGE_MOVIE_M_LIST.goSearchContentsDatayPjax = function(pJaxUrl){
	console.log('goCategoryPjax', pJaxUrl);
	if(isDefined(pJaxUrl) == false){
		return;
	}
	var containerSelector = '#movie-rank-contents-list-data-thumb';
	if ($.support.pjax) {
		console.log('support');
		$.pjax({url: pJaxUrl, container:containerSelector});
	}
	return;

};


//페이지 이동 분기 처리
PAGE_MOVIE_M_LIST.getSearchPageWithOption = function(goPage, selectedCategory){
	console.log('PAGE_MOVIE_M_LIST.goSearchPageWithOption', goPage);

	console.log(' window.location.href',  window.location.href);
	console.log("pathname: "+location.pathname);
		
	var sendData = {
		c			: 11000,		//cate1
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult
		it			: '',		//is thumb
		page		: goPage,
		my			: '',		//open_year
		mn			: '',		//nation
		mg			: '',		//genre
		is_hot		: '',		//is hot
		is_new		: '',		//is new
		is_event	: '',		//is event
		is_top		: '',		//is top
		mv_type		: 'M1',		//is top
	};
	
	var $infoEle = $('#channel-movie-pagination');
	if($infoEle.length > 0){
		sendData.mv_type = $infoEle.data('mv_type');
	}

	
	//open year
	var openYear = $('#topListOptionMovieFormOpenYear').val();
	if(isDefined(openYear)){
		sendData.my = openYear;
	}
	console.log('openYear', openYear);

	//nation
	var mNation = $('#topListOptionMovieFormNation').val();
	if(isDefined(mNation)){
		sendData.mn = mNation;
	}
	console.log('mNation', mNation);

	//open sortKey
	var sortKey = $('#topListOptionMovieFormSortKey').val();
	if(isDefined(sortKey)){
		sendData.sk = sortKey;
	}
	console.log('sortKey', sortKey);


	//genre
	var bGenre = $('#topListOptionMovieFormGenre').val();
	if(isDefined(bGenre)){
		sendData.mg = bGenre;
	}
	console.log('bGenre', bGenre);

	//is hot
	var bIsHot = $('#topListOptionMovieFormIsHot').val();
	if(isDefined(bIsHot)){
		sendData.is_hot = bIsHot;
	}
	console.log('bIsHot', bIsHot);

	//is new
	var bIsNew = $('#topListOptionMovieFormIsNew').val();
	if(isDefined(bIsNew)){
		sendData.is_new = bIsNew;
	}
	console.log('bIsNew', bIsNew);

	//is event
	var bIsEvent = $('#topListOptionMovieFormIsEvent').val();
	if(isDefined(bIsEvent)){
		sendData.is_event = bIsEvent;
	}
	console.log('bIsEvent', bIsEvent);

	//is top
	var bIsTop = $('#topListOptionMovieFormIsTop').val();
	if(isDefined(bIsTop)){
		sendData.is_top = bIsTop;
	}
	console.log('bIsTop', bIsTop);
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
	
	
	PAGE_MOVIE_M_LIST.goSearchContentsDatayPjax(goUrl);
	return;
	//return goUrl;
};








/*
* movie view
*/

PAGE_MOVIE_M_VIEW = {};

//var PAGE_MOVIE_M_VIEW = {};
PAGE_MOVIE_M_VIEW.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_MOVIE_M_VIEW.start = function(pageSub, pagData){
	console.log('PAGE_MOVIE_M_VIEW.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL_ON_VIEW.start(pageSub, pagData);
	PAGE_MOVIE_M_VIEW.DATA.LAST_HASH = '#!action=movie&idx=1';



	PAGE_MOVIE_M_VIEW.initBinding();
	PAGE_MOVIE_M_VIEW.initOnload();
	//PAGE_MOVIE_M_VIEW.setHashCheck(null);


};



PAGE_MOVIE_M_VIEW.initBinding = function(){
	console.log('PAGE_MOVIE_M_VIEW.initBinding');

	//회차별 - 이전, 다음
	/*
	var $btnChannelBroChapterControler = $( ".btn-channel-bro-chapter" );
	if($btnChannelBroChapterControler.length > 0){
		$btnChannelBroChapterControler.unbind( "click");
		$btnChannelBroChapterControler.bind( "click", function() {
			console.log('btn-channel-bro-chapter');
			utility.shortPagination.action($(this), '.btn-channel-bro-chapter', PAGE_MOVIE_M_VIEW.getMoreMovieChapterData);	//반드시 .을 붙인다


		});
	}
	*/

};

PAGE_MOVIE_M_VIEW.initOnload = function(){
	console.log('PAGE_MOVIE_M_VIEW.initOnload');


	/*
	//slick steel cut
	var $slickTarget = $('#channel-view-steel-cut-slick');
	if($slickTarget.find('.slick-item').length > 1){
		$slickTarget.on('init', function(slick){
		  console.log('init');
		  console.log(slick);
		  $('.btn-channel-movie-steel-cut-slick').removeAttr("style");
		});

		$slickTarget.slick({
			lazyLoad: 'ondemand',
			infinite: true,
			arrows : true,
			draggable: false,
			prevArrow : $('.channel-movie-steel-cut-slick-prev'),
			nextArrow : $('.channel-movie-steel-cut-slick-next'),
			dots	: false
		});

		$slickTarget.on('afterChange', function(event, slick, currentSlide){
			console.log(currentSlide);
			$('.channel-movie-steel-cut-slick-current-page').text((currentSlide + 1));
		});
	}
	*/

};


/*



//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_MOVIE_M_LIST.setHashCheck = function(hashPrams){
	console.log('PAGE_MOVIE_M_LIST.setLoadHashCheck');
	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != 'movie_list'){
		console.log(hashPrams['!action']);
		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']));
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

		if(PAGE_MOVIE_M_LIST.DATA.LAST_HASH != location.hash){
			PAGE_MOVIE_M_LIST.setMoviePage(hashPage);
			return;
		}

		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_MOVIE_M_LIST.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_MOVIE_M_LIST.DATA.LOADED_PAGE);
			}
			//var loadEleData = $('#channel-movie-common-pagination').data('load');
			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	PAGE_MOVIE_M_LIST.setMoviePage(hashPage);
};


	//pagination
	var $paginationEle = $('#channel-movie-common-pagination');
	var loadedPage = $paginationEle.data('load');
	if(isDefined(loadedPage)){
		PAGE_MOVIE_M_LIST.DATA.LOADED_PAGE = parseInt(loadedPage);
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

		PAGE_MOVIE_M_LIST.DATA.paginationEle = $paginationEle;


		PAGE_MOVIE_M_LIST.DATA.pagination = $paginationEle.pagination({

			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: '#!action=movie_list&page=',
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_MOVIE_M_LIST.goCategoryPage(page);
			}
		});

		console.log(PAGE_MOVIE_M_LIST.DATA.pagination);
	}
*/
//페이지 이동 분기 처리
/*
PAGE_MOVIE_M_LIST.goChangeMoviePage = function(goPage, addHash){
	console.log('PAGE_MOVIE_M_LIST.goChangeMoviePage', goPage);
	var hashUrl = $.param.fragment();
	console.log('hashUrl', hashUrl);

	//return;
	if(hashUrl){
		var goHash = '#!action=movie_list&page='+goPage;
		if(isDefined(addHash) == true){
			goHash += addHash;
		}
		console.log('goHash', goHash);
		if(goHash != hashUrl){
			console.log('gohash'+goHash);
			location.hash = goHash;

		}else{
			PAGE_MOVIE_M_LIST.setMoviePage(goPage);
		}
	}else{
		PAGE_MOVIE_M_LIST.setMoviePage(goPage);
	}
};



//get getMovieContentsData
PAGE_MOVIE_M_LIST.getMovieContentsData = function(getData, $infoEle){
	console.log('PAGE_MOVIE_M_LIST.getMovieContentsData', getData);

	var sendData = {
		c			: 11000,		//cate1
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,			//is mobile
		my			: '',		//open_year
		mn			: '',		//nation
		mg			: '',		//genre
		is_hot		: '',		//is hot
		is_new		: '',		//is new
		is_event	: '',		//is event
		is_top		: '',		//is top
		mv_type		: 'M1',		//is top
	};

	if(isDefined($infoEle) == false){
		$infoEle = PAGE_MOVIE_M_LIST.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#channel-movie-common-pagination');
		}
	}

	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['sort_key'])){ sendData.sk = getData.sort_key; }
		if(isDefined(getData['open_year'])){ sendData.my = getData.open_year; }
		if(isDefined(getData['nation'])){ sendData.mn = getData.nation; }
		if(isDefined(getData['genre'])){ sendData.mg = getData.genre; }
		if(isDefined(getData['is_hot'])){ sendData.is_hot = getData.is_hot; }
		if(isDefined(getData['is_new'])){ sendData.is_new = getData.is_new; }
		if(isDefined(getData['is_event'])){ sendData.is_event = getData.is_event; }
		if(isDefined(getData['is_top'])){ sendData.is_top = getData.is_top; }
		if(isDefined(getData['mv_type'])){ sendData.mv_type = getData.mv_type; }
	}


	console.log('sendData', sendData);
	var $innerTargetEle = $('#movie-rank-contents-list-data-thumb');
    if(isDefined($("#rank_type").val())){ //omh 2019-12-23 애니를 위해 추가
        if($("#rank_type").val()== 1){
            $('#broadcast-rank-contents-list-data-thumb_wrap , #broadcast-rank-contents-list-data-thumb_on_wrap').hide();            
            var $innerTargetEle = $('#movie-rank-contents-list-data-thumb_option').show();
            var $innerTargetEle = $('#movie-rank-contents-list-data-thumb_option');
            
        }
    }
    
	var successFunGetMovieContentsList = function(data){
			console.log('successFunGetMovieContentsList', data);

			var mvData = null;

			// 역대급 흥행일때 각 나라명으로 이름 바뀌게 설정
            if(data.data.is_top == 2){
                document.getElementById("channelSubTitle").innerHTML=("역대 흥행률 높은 "+sendData.mn+" 영화");
            }

			if(isDefined(data.channel_movie_list)){
				var mvData = data.channel_movie_list;
				var mvDataGroup = mvData['group'];

				var mvListHtml = [];
				var lCnt = 0;
				for(var i in mvDataGroup){
					//console.log(mvDataGroup[i]);
					var mDataList = mvDataGroup[i];
					mvListHtml.push('<div class="update_movie_list"><ul>');
					for(var k in mDataList){
						var mRank = new Movie_rank(lCnt);
						mRank.setData(mDataList[k]);
						//console.log(mRank);
						mvListHtml.push(mRank.getRankMovieHtml());
					}
					mvListHtml.push('</ul></div>');
					lCnt++;
				}
				//console.log('mvListHtml', mvListHtml);

				//페이지 상단으로 이동
				utility.ui.goToElement('.l_content_wrap');

				$innerTargetEle.html(mvListHtml.join(''));



				var curPage = mvData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(mvData.limit),
				};


				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(mvData.total_count)){
						reSavePageData.total_count	= parseInt(mvData.total_count);
						get_total_count = parseInt(mvData.total_count);
					}
					if(isDefined(mvData.total_page)){
						reSavePageData.total_page	= parseInt(mvData.total_page);
						get_total_page = parseInt(mvData.total_page);
					}
				}
				$infoEle.data(reSavePageData);

				//pagination
				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_MOVIE_M_LIST.DATA.pagination)){

					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					console.log('aaa');
					if(isDefined(PAGE_MOVIE_M_LIST.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}

				}

				//$infoEle.pagination('selectPage', curPage);
				PAGE_MOVIE_M_LIST.DATA.LOADED_PAGE = parseInt(curPage);

				//save cache
				PAGE_MOVIE_M_LIST.DATA.LAST_HASH = location.hash;

				//img lazy 스크롤 때문에 lazy가 의미 없음
				$('.disk-image-lazy').lazy();

			}
	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MOVIE.MOVIE_LIST,
		data		: formData,
		success_fun	: successFunGetMovieContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};






PAGE_MOVIE_M_LIST.setMoviePage = function(nextPage){
	console.log('PAGE_MOVIE_M_LIST.setMoviePage:',nextPage);
	//console.log('loadedPage', loadedPage);

	if(isDefined(nextPage) == false){
		nextPage = 1;
	}

	var $infoEle = null;
	if(PAGE_MOVIE_M_LIST.DATA.paginationEle){
		$infoEle = PAGE_MOVIE_M_LIST.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#channel-movie-common-pagination');
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
 		nation		: '',
 		mv_typ		: ''
 	};
 	
 	

 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;
		}
		if(isDefined(infoEleData.mv_type)){
			sendData.mv_type = infoEleData.mv_type;
		}
		
		
	}

	//open year
	var openYear = $('#topListOptionMovieFormOpenYear').val();
	if(isDefined(openYear)){
		sendData.open_year = openYear;
	}
	console.log('openYear', openYear);

	//nation
	var mNation = $('#topListOptionMovieFormNation').val();
	if(isDefined(mNation)){
		sendData.nation = mNation;
	}
	console.log('mNation', mNation);

	//open year
	var sortKey = $('#topListOptionMovieFormSortKey').val();
	if(isDefined(sortKey)){
		sendData.sort_key = sortKey;
	}
	console.log('sortKey', sortKey);


	//genre
	var bGenre = $('#topListOptionMovieFormGenre').val();
	if(isDefined(bGenre)){
		sendData.genre = bGenre;
	}
	console.log('bGenre', bGenre);

	//is hot
	var bIsHot = $('#topListOptionMovieFormIsHot').val();
	if(isDefined(bIsHot)){
		sendData.is_hot = bIsHot;
	}
	console.log('bIsHot', bIsHot);

	//is new
	var bIsNew = $('#topListOptionMovieFormIsNew').val();
	if(isDefined(bIsNew)){
		sendData.is_new = bIsNew;
	}
	console.log('bIsNew', bIsNew);

	//is event
	var bIsEvent = $('#topListOptionMovieFormIsEvent').val();
	if(isDefined(bIsEvent)){
		sendData.is_event = bIsEvent;
	}
	console.log('bIsEvent', bIsEvent);

	//is top
	var bIsTop = $('#topListOptionMovieFormIsTop').val();
	if(isDefined(bIsTop)){
		sendData.is_top = bIsTop;
	}
	console.log('bIsTop', bIsTop);


	console.log('sendData', sendData);
	PAGE_MOVIE_M_LIST.getMovieContentsData(sendData, $infoEle);


	return;

};


*/