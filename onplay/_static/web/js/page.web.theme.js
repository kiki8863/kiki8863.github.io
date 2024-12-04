/*
*	channel search common 
*/

var PAGE_THEME = {};

PAGE_THEME.start = function(pageSub, pagData){
	console.log('PAGE_THEME.start', pageSub);
	console.log(pagData);

	
	if(pageSub == 't_list'){
		PAGE_THEME_LIST.start(pageSub, pagData);
	}
	
	
};



//채널 검색
var PAGE_THEME_LIST = {};
PAGE_THEME_LIST.DATA = {
	HASH_ACTION		: 'theme_list',
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	paginationEle	: null,
	pagination		: null,
	
	
};

PAGE_THEME_LIST.start = function(pageSub, pagData){
	console.log('PAGE_THEME_LIST.start', pageSub);
	console.log(pagData);
	PAGE_THEME_LIST.DATA.LAST_HASH = '#!action='+PAGE_THEME_LIST.DATA.HASH_ACTION+'&m=&page=1';
	
	PAGE_THEME_LIST.initBinding();
	PAGE_THEME_LIST.initOnload();
	
	//오른쪽 매뉴 바인딩
	PAGE_CHANNEL_ON.rightBinding();
	
	PAGE_THEME_LIST.setHashCheck(null);
	
	
};



PAGE_THEME_LIST.initBinding = function(){
	console.log('PAGE_THEME_LIST.initBinding');

};







PAGE_THEME_LIST.initOnload = function(){
	console.log('PAGE_THEME_LIST.initOnload');
	
	PAGE_THEME_LIST.initOnloadSlick();
	
	//pagination
	var $paginationEle = $('#channel-theme-common-pagination');
	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		if(isDefined(eleData.load)){
			PAGE_THEME_LIST.DATA.LOADED_PAGE = parseInt(eleData.load);
		}
		
		
		var totalPages = 1;
		if(isDefined(eleData.total_page)){
			totalPages = parseInt(eleData.total_page);
		}
		var themeCategory = '';
		if(isDefined(eleData.cate1)){
			themeCategory = eleData.cate1;
			PAGE_THEME_LIST.DATA.LAST_HASH = '#!action='+PAGE_THEME_LIST.DATA.HASH_ACTION+'&m='+themeCategory+'&page=1';
		}
		var pageLinkUrl = '#!action='+PAGE_THEME_LIST.DATA.HASH_ACTION+'&m='+themeCategory+'&page=';
		PAGE_THEME_LIST.DATA.paginationEle = $paginationEle;
		PAGE_THEME_LIST.DATA.pagination = $paginationEle.pagination({
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
			hrefTextPrefix	: pageLinkUrl,
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_THEME_LIST.goCategoryPage(page);
			}
		});
		
		console.log(PAGE_THEME_LIST.DATA.pagination);
	}
};

PAGE_THEME_LIST.initOnloadSlick = function(){

	//slick theme
	var $slickTarget = $('.theme_con');
	if($('.theme_con').find('.theme_list').length > 1){
		$('.theme_con').slick({
			//lazyLoad: 'ondemand',
			slidesToShow: 6,
			slidesToScroll: 3,
			infinite: false,
			arrows : true,
			draggable: false,
			//prevArrow : $('.theme_con-prev'),
			//nextArrow : $('.theme_con-next'),
			dots	: false
		});
	}
}


//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_THEME_LIST.setHashCheck = function(hashPrams){
	console.log('PAGE_THEME_LIST.setLoadHashCheck');
	//hash check
	if(isLoadedBbqScript() != true){
		return;	
	}
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != PAGE_THEME_LIST.DATA.HASH_ACTION){
		console.log(hashPrams['!action']);
		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']),'theme');
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
		
		if(PAGE_THEME_LIST.DATA.LAST_HASH != location.hash){
			PAGE_THEME_LIST.setThemePage(hashPage);
			return;
		}
		
		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_THEME_LIST.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_THEME_LIST.DATA.LOADED_PAGE);
			}
			//var loadEleData = $('#channel-themecommon-pagination').data('load');
			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	PAGE_THEME_LIST.setThemePage(hashPage);
};

//페이지 이동 분기 처리
/*
PAGE_THEME_LIST.goChangeMoviePage = function(goPage, addHash){
	console.log('PAGE_THEME_LIST.goChangeMoviePage', goPage);
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
			PAGE_THEME_LIST.setThemePage(goPage);	
		}
	}else{
		PAGE_THEME_LIST.setThemePage(goPage);	
	}
};
*/


PAGE_THEME_LIST.setThemePage = function(nextPage){
	console.log('PAGE_THEME_LIST.setThemePage:',nextPage);	
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
	if(PAGE_THEME_LIST.DATA.paginationEle){
		$infoEle = PAGE_THEME_LIST.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#channel-themecommon-pagination');
	}
	var infoEleData = $infoEle.data();
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 			:	nextPage,
 		limit			: 	null,
 		adult_block		: 0,
 		theme_category	: ''
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.cate1)){
			sendData.theme_category = infoEleData.cate1;	
		}
	}

	console.log('sendData', sendData);
	PAGE_THEME_LIST.getThemeContentsData(sendData, $infoEle);
	
	
	return;

};



//get getThemeContentsData
PAGE_THEME_LIST.getThemeContentsData = function(getData, $infoEle){
	console.log('PAGE_THEME_LIST.getThemeContentsData', getData);
	
	var sendData = {
		c			: '',		//cate1
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,		//is mobile
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = PAGE_THEME_LIST.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#channel-themecommon-pagination');
		}
	}
	
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['block_adult'])){ sendData.ba = getData.block_adult; }
		if(isDefined(getData['theme_category'])){ sendData.c = getData.theme_category; }
	}
	

	console.log('sendData', sendData);
	var $innerTargetEle = $('#theme-contents-list-inner-wrap');
	var successFunGetThemeContentsList = function(data){
			console.log('successFunGetThemeContentsList', data);
			var tmData = null;
			if(isDefined(data.channel_theme_list)){
				
				
				
				var tmData = data.channel_theme_list;
				var tmListData = tmData.theme_list;
				var mvListHtml = [];
				var lCnt = 0;
				for(var i in tmListData){
					mvListHtml.push(TEMPLETE.WEB_PAGE.channelThemeListHtml(tmListData[i]));
				}
				//console.log('mvListHtml', mvListHtml);
				//페이지 상단으로 이동
				utility.ui.goToElement('.l_content_wrap');
				$innerTargetEle.html(mvListHtml.join(''));
				
				var curPage = tmData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(tmData.limit),
				};
				/*
				if(parseInt(curPage) == 1){
					if(isDefined(tmData.total_count)){
						reSavePageData.total_count	= parseInt(tmData.total_count);	
					}
					if(isDefined(tmData.total_page)){
						reSavePageData.total_page	= parseInt(tmData.total_page);	
					}
				}
				*/
				
				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(tmData.total_count)){
						reSavePageData.total_count	= parseInt(tmData.total_count);	
						get_total_count = parseInt(tmData.total_count);
					}
					if(isDefined(tmData.total_page)){
						reSavePageData.total_page	= parseInt(tmData.total_page);	
						get_total_page = parseInt(tmData.total_page);
					}
				}
				$infoEle.data(reSavePageData);
				
				
				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_THEME_LIST.DATA.pagination)){
					
					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					console.log('aaa');
					if(isDefined(PAGE_THEME_LIST.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}
					
				}
				
				//$infoEle.pagination('selectPage', curPage);
				PAGE_THEME_LIST.DATA.LOADED_PAGE = parseInt(curPage);
				
				//save cache
				PAGE_THEME_LIST.DATA.LAST_HASH = location.hash;
				
				//img lazy 스크롤 때문에 lazy가 의미 없음
				$('.disk-image-lazy').lazy();
				
				//slick
				PAGE_THEME_LIST.initOnloadSlick();
			}
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.THEME.THEME_LIST,
		data		: formData,
		success_fun	: successFunGetThemeContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};
