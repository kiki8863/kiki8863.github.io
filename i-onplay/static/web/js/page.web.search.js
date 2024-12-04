/*
* category
*/

var PAGE_SEARCH = {};
PAGE_SEARCH.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_BBS		: null,
	LAST_HASH		: null,
};

PAGE_SEARCH.start = function(pageSub, pageData){
	console.log('PAGE_SEARCH.start', pageSub);
	console.log('pageData', pageData);
	PAGE_SEARCH.DATA.LAST_HASH = '#';
	
	PAGE_SEARCH.initBinding();
	PAGE_SEARCH.initOnload();
	
	if(WEB_COMMON_GET_PAST_HASH_TYPE('search') == 'bbq'){
		PAGE_SEARCH.setHashCheck(null, pageData);	
	}
};


//pjax binding
PAGE_SEARCH.setBindingPjax = function(){
	console.log('PAGE_SEARCH.setBindingPjax');
		
	if($.support.pjax) {
		$.pjax.defaults.scrollTo = false;
		console.log('support pajx');
		var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		console.log('url', url);
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			console.log($(this));
			var containerSelector = '#search-contents-list-wrap';
			var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
			console.log('url', url);
			
			$.pjax.click(event, {
				container: containerSelector,
				url: url
				
			});
		});
		WEB_COMMON.setBindingAfterPageDataLoad();
	}
	
	$(document).on('pjax:send', function() {
		utility.spinnerLoading.show();
	});
	
	$(document).on('pjax:complete', function() {
		utility.spinnerLoading.hide();
		//go top
		//utility.ui.goToElement('#search-contents-list-wrap');
		
		 
		
		
		
		//image lazy
		if($('.search-contents-list.img').hasClass('active')){
			PAGE_CATEGORY.setImageLazy();	
		}
		
		//channel hide - 통합 페이지가 아니면 2페이지 부터
		if($('#search-pagination').find('.page.active').text() != 1){
			$('.search-only-channel-show').hide();
			utility.ui.goToElement('.content.sub');
		}else{
			//통합
			if($('.search-cate-item.cate-90000').hasClass('active')){
				$('.search-only-channel-show').show();
				$('.search-only-channel-hide').show();
				
				utility.ui.goToElement('.wrap.sub');
			}else{
				utility.ui.goToElement('.content.sub');
			}
		}
		WEB_COMMON.setBindingAfterPageDataLoad();
		
	});

	// for google analytics
	$(document).on('pjax:end', function() {
		ga('set', 'location', window.location.href); // 현재 바뀐 주소를
		ga('send', 'pageview'); // 보고한다
	});
};



//스크롤 스파이 동적 로딩
PAGE_SEARCH.scrollSpyBinding = function(){
	console.log('PAGE_SEARCH.scrollSpyBinding');
		
	var loadScrollSypFun = function(isLoaded){
		console.log('loadScrollSypFun', isLoaded);
		
		/*	
		if($('#onplayFormHeaderLoadedInfo').find('.scrollspy_js_file').data('loaded') == 1){
			var $scrollSpyEle = $('.search-contetns-list-scroll-spy-wrap');
			if($scrollSpyEle.length > 0){
				
				$scrollSpyEle.on('scrollSpy:enter', function() {
					var eleData = $(this).data();
					console.log('enter', eleData);
					
					var spyType = 'comment';
					if(isDefined(eleData.type)){
						spyType = eleData.type;
					}
					//load -0 첨, 1-불러오는중, 2-완료
					var isLoaded = 0;
					if(isDefined(eleData.load)){
						isLoaded = parseInt(eleData.load);
					}
					
					if(isLoaded > 0){
						console.log('already loaded:'+spyType);
						return;
					}
					
					if(isLoaded == 0){
						//conetest list
						if(eleData.type == 'contents'){
							console.log('contents not loaded');
							
							var selectedCategory = 0;
							if(isDefined(eleData.cate) == true){
								selectedCategory = eleData.cate;
							}
							
							PAGE_SEARCH.setSearchContentsPage(1, eleData.cate);
							//WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
							$(this).data('load', 1);
						}else if(eleData.type == 'comment'){
				
							
						}
					}
					
					
				});
				var $scrollSpy =  $scrollSpyEle.scrollSpy();	
			}
		}
		*/	
	};
	
	WEB_COMMON.scrollSpyBinding(loadScrollSypFun);
	
};

//수동으로 검색 결과 가져오기
PAGE_SEARCH.goSearchContentsDatayPjax = function(pJaxUrl){


	console.log('goCategoryPjax', pJaxUrl);
	if(isDefined(pJaxUrl) == false){
		return;
	}
	var containerSelector = '#search-contents-list-wrap';
	if ($.support.pjax) {
		console.log('support');
		$.pjax({url: pJaxUrl, container:containerSelector});
	}
	return;

};


//페이지 이동 분기 처리
PAGE_SEARCH.getSearchPageWithOption = function(goPage, selectedCategory){
	console.log('PAGE_SEARCH.goSearchPageWithOption', goPage);

		console.log(' window.location.href',  window.location.href);
		console.log("pathname: "+location.pathname);
		
		
	var sendData = {
		k			: '',		//kewword
		c			: '',		//select category
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0			//is mobile
	};
	
	
	//search keyword
	var searchKeyword = $('#disk_search_form_keyword').val();
	console.log('searchKeyword:', searchKeyword);
	if(isDefined(searchKeyword) == false){
		alert('찾을 자료의 제목이나 검색어를 입력해주세요.');
		return;
	}
	if(objLengthMinByte(searchKeyword, 4) == true){
		alert('찾을 자료의 제목이나 검색어를 한글 2자 이상 입력해주세요.');
		return;
	}
	sendData.k = searchKeyword;
	
	if(isDefined(goPage)){
		sendData.page =parseInt(goPage);
	}
	
	//select category
	if(isDefined(selectedCategory) == false){
		selectedCategory = $('#diskTopMainSearchForm').find('input[name=fc]').val();
	}
	if(isDefined(selectedCategory)){
		sendData.c = parseInt(selectedCategory);
	}else{
		selectedCategory = $('.search-cate-item.active').data('category');
		if(isDefined(selectedCategory) == true){
			sendData.c = parseInt(selectedCategory);
		}	
	}
	
	
	//select channel
	if(sendData.search_ctegory == 90001){
		console.log('channel show');
		return;
	}
	
	//sort
	var sortEleData = $('#btn-search-list-sort').data('sort');
	if(isDefined(sortEleData)){
		sendData.sk = sortEleData;
	}
	console.log('sortEleData', sortEleData);
	
	//var listLimit = sendData.l;
	var limitEleData = $('#btn-search-list-limit').data('limit');
	console.log('limitEleData',limitEleData);
	if(isDefined(limitEleData)){
		sendData.l = parseInt(limitEleData);
	}
	//ba
	if($('input:checkbox[id="check-search-is-adult"]').is(":checked") == true){
		sendData.ba = 1;
	}
	console.log('sendData', sendData);
		
	var showLocation = location.pathname;
	var sendSrt = $.param( sendData );
	console.log('sendSrt', sendSrt);
	var goUrl = showLocation+'?'+sendSrt;
	console.log('goUrl',goUrl);
	
	
	PAGE_SEARCH.goSearchContentsDatayPjax(goUrl);
	return;
	//return goUrl;
};
	
PAGE_SEARCH.initBinding = function(){
	console.log('PAGE_SEARCH.initBinding');
	
	PAGE_SEARCH.setBindingPjax();
	
	PAGE_SEARCH.broChannelDataAfterBinding();
	
	
	//카테고리
	if($( ".search-cate-item" ).length > 0){
		$( ".search-cate-item" ).unbind( "click");
		$( ".search-cate-item" ).bind( "click", function() {
			console.log('search-cate-item');
			var eleData = $(this).data();
			console.log('eleData', eleData);
			if(isDefined(eleData.category) == false){
				return;
			}
			if(eleData.category == 90000){
				$('.search-only-channel-show').show();
				$('.search-only-channel-hide').show();
				PAGE_SEARCH.broChannelDataAfterBinding();
				
				//새로 선택되었으면 다시 가져와요
				if($(this).hasClass('active') == false){
					PAGE_SEARCH.getSearchPageWithOption(1, eleData.category);
				}else{
					utility.ui.goToElement('.content.sub');	
				}
				$('.search-cate-item.active').removeClass('active');
				$(this).addClass('active');
				
				
				return;
				
			}else if(eleData.category == 90001){
				console.log('search-only-channel-show');
				$('.search-only-channel-hide').hide();
				$('.search-only-channel-show').show();
				$('.search-cate-item.active').removeClass('active');
				if($(this).hasClass('active') == true){
					return;	
				}
				PAGE_SEARCH.broChannelDataAfterBinding();
				
				$(this).addClass('active');
				utility.ui.goToElement('.content.sub');
				return;
			}else{
				console.log('search-only-channel-hide');
				if(eleData.category == 90000){
					$('.search-only-channel-show').show();
				}else{
					$('.search-only-channel-show').hide();
				}
				$('.search-only-channel-hide').show();
				//PAGE_SEARCH.setSearchContentsPage(1, eleData.category);
				//location.hash = '#!action=search&c='+eleData.category+'&page=1';
				
				if($(this).hasClass('active') == true){
					return;	
				}
			}
			
			//select force category
			$('#diskTopMainSearchForm').find('input[name=fc]').val(eleData.category);
			$('.search-cate-item.active').removeClass('active');
			$(this).addClass('active');
			
			PAGE_SEARCH.getSearchPageWithOption(1, eleData.category);
			//location.hash = '#!action=search&c='+eleData.category+'&page=1';
		
		});
	}
	

	
	

	
	//썸네일 & 리스트 형 변경
	$( ".btn-search-change-thumb-type" ).unbind( "click");
	$( ".btn-search-change-thumb-type" ).bind( "click", function() {
		var thumbType = 'text';
		var eleThumbType = $(this).data('thumb');
		if(isDefined(eleThumbType)){
			thumbType = eleThumbType;
		}
		console.log('thumbType', thumbType);
		//PAGE_SEARCH.setChangeSearchListThumbType(thumbType)
		$('.btn-search-change-thumb-type.active').removeClass('active');
		$('.btn-search-change-thumb-type.'+thumbType).addClass('active');
		
		$('.search-contents-list').removeClass('active');
		$('.search-contents-list.'+thumbType).addClass('active');
		if(eleThumbType == 'img'){
			PAGE_CATEGORY.setImageLazy();
			$.cookie('is_thumb', 1,{ expires: 30, path: '/' });	
		}else{
			$.removeCookie('is_thumb', { path: '/'});
		}
		
		utility.ui.goToElement('.l_content');
	});
	
	
	//정렬 기준 버튼 클릭
	$( "#btn-search-list-sort" ).unbind( "click");
	$( "#btn-search-list-sort" ).bind( "click", function() {
		console.log('btn-search-list-sort');
		$( '.btn-search-list-sort-list' ).toggle();
	
	});
	
	//정렬 개수
	$( "#btn-search-list-limit" ).unbind( "click");
	$( "#btn-search-list-limit" ).bind( "click", function() {
		console.log('btn-search-list-limit');
		$( '.btn-search-list-limit-list' ).toggle();
	
	});
	
	//정렬 기준 & 정렬 개수
	$( ".search-top-filter-item" ).unbind( "click");
	$( ".search-top-filter-item" ).bind( "click", function() {
		console.log('search-top-filter-item');
		var eleData = $(this).data();
		console.log(eleData);
		if(isDefined(eleData.target)){
			
			var saveEleData = {};
			saveEleData[eleData.type] = eleData.values;
			console.log(saveEleData);
			
			$('#'+eleData.target).data(saveEleData).text($(this).text()).trigger('click');
			console.log($('#'+eleData.target).data());
			
			var hashData = {
				l	: 	eleData.values
			};
			PAGE_SEARCH.getSearchPageWithOption(1);
			//PAGE_SEARCH.goSearchNextPage(1, hashData);
		}
	
	});
	
	//성인 제외
	$( "#check-search-is-adult" ).unbind( "click");
	$( "#check-search-is-adult" ).bind( "click", function() {
		console.log('check-search-is-adult');
		/*
		if($(this).is(":checked") == true){
			alert('checked');	
		}else{
			alert('un -checked');
		}
		*/
		if(utility.disk.checkIsChildBlockMember() == true){
			$(this).prop("checked", true);
			var show_msg = "자녀보호 서비스를 이용중입니다.";
			$.ambiance({message: show_msg, type: "alert-warning"});
			return;
		}
		var adult_block = 0;
		if($(this).is(":checked") == true){
			adult_block = 1;
		}
		var hashData = {
			ba	: 	adult_block
		};
		PAGE_SEARCH.getSearchPageWithOption(1);
		//PAGE_SEARCH.goSearchNextPage(1, hashData);
	
	});
	
	
	//스크롤 스파이 - 판매자 자료
	PAGE_SEARCH.scrollSpyBinding();
	
	
};

//채널 정보 보기 바이딩
PAGE_SEARCH.broChannelDataAfterBinding = function(){
	console.log('PAGE_SEARCH.channelDataAfterBinding');
	
	if($('#search-channel-broadcast-wrap').css('display') == 'none'){
		return;
	}
	
	//방송회차 - slick
	if($('#search-channel-broadcast-wrap').find('.slick-initialized').length < 1){
		var $slickTarget = $('#search-bro-chapter-slick');
		if($slickTarget.find('.bro-chapter-slick-item').length > 0){
			//버튼 hover
			$slickTarget.on('init', function(slick){
			  console.log('init');
			  console.log(slick);
			  $('.btn-bro-chapter-slick').removeAttr("style");
			});
			//set slick
			$slickTarget.slick({
				lazyLoad: 'ondemand',
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				arrows : true,
				prevArrow : $('.btn-bro-chapter-slick-prev'),
				nextArrow : $('.btn-bro-chapter-slick-next'),
				dots	: false,
				draggable: false
			});
			
			//방송회차 - 마지막
			$slickTarget.on('afterChange', function(event, slick, currentSlide){
			  console.log('afterChange');
			  console.log(currentSlide);
			  console.log(slick);
			  var _ = slick;
			  if(_.slideCount == (currentSlide + _.options.slidesToShow)){
			  	var eleData = $slickTarget.data();
			  	var broTotalPage = 1;
			  	var broPage = 1;
			  	if(isDefined(eleData.total_page)){
			  		broTotalPage = parseInt(eleData.total_page);
			  	}
			  	if(isDefined(eleData.total_page)){
			  		broPage = parseInt(eleData.page);
			  	}
			  	if(broTotalPage > broPage){
			  		PAGE_SEARCH.getMoreBroadcastChapterData($slickTarget);	
			  	}
			  }
			});
		}
	}
	
	
		
	//방송회차 - 다른시즌 보기
	if($( ".btn-broadcast-another-season" ).length > 0){
		$( ".btn-broadcast-another-season" ).unbind( "click");
		$( ".btn-broadcast-another-season" ).bind( "click", function() {
			console.log('btn-broadcast-another-season');
			$( '.channel-broadcast-another-season-list' ).toggle();
		
		});
	}
	//방송회차 - 다른 회차 보기
	if($( ".btn-broadcast-another-chapter" ).length > 0){
		$( ".btn-broadcast-another-chapter" ).unbind( "click");
		$( ".btn-broadcast-another-chapter" ).bind( "click", function() {
			console.log('btn-broadcast-another-chapter');
			$( '.channel-broadcast-another-chapter-list' ).toggle();
		
		});
	}
}

PAGE_SEARCH.initOnload = function(){
	console.log('PAGE_SEARCH.initOnload');	
	
	//slick theme
	var $slickTarget = $('.theme_con');
	if($slickTarget.find('.theme_list').length > 1){
		$slickTarget.on('init', function(slick){
		  console.log('init');
		  console.log(slick);
		  //$('.btn-theme_con').removeAttr("style");
		});
		
		$slickTarget.slick({
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
		
		$slickTarget.on('afterChange', function(event, slick, currentSlide){
			console.log(currentSlide);
			//$('.channel-movie-steel-cut-slick-current-page').text((currentSlide + 1));
		});
	}
	
	//image lazy
	if($('.search-contents-list.img').hasClass('active')){
		PAGE_CATEGORY.setImageLazy();	
	}
	
};

//방송회차별 더가져오기
PAGE_SEARCH.getMoreBroadcastChapterData = function($slickTarget){
	console.log('PAGE_SEARCH.getMoreBroadcastChapterData');	
	
	var eleData = $slickTarget.data();
	if(isDefined(eleData.idx) == false || isDefined(eleData.page) == false){
		return;
	}
	
	var curPage = 1;
	if($.isNumeric( eleData.page)){
		curPage = parseInt(eleData.page);
	}
	
	var nextPage = curPage + 1;
	
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
				cHtml[i] = bChapger.getChapterListHtmlSearch();
			}
			
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
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
};



/*
PAGE_SEARCH.setChangeSearchListThumbType = function(thumbType){
	console.log('PAGE_SEARCH.setChangeSearchListThumbType');
	//PAGE_SEARCH.DATA.LAST_BBS = null;	
	if(PAGE_SEARCH.DATA.LAST_BBS){
		PAGE_SEARCH.setSearchContentsListHtml(thumbType, PAGE_SEARCH.DATA.LAST_BBS);		
	}else{
		PAGE_SEARCH.setSearchContentsPage(1);
	}
};
*/


PAGE_SEARCH.setSearchContentsListHtml = function(thumbType, searchData){
	console.log('PAGE_SEARCH.setSearchContentsListHtml', searchData);
	
	var bbsListData = searchData.contents_list;
	var premiumListData = searchData.search_premium_list;
	console.log('premiumListData', premiumListData);
	
	var innerContentsHtml = null;
	var $innerTargetEle = $('#search-contents-list-data-text');
	if(thumbType == 'img'){
		var contentsList = bbsListData;
		var coentents_total_count = contentsList.length;
		var ul_count = parseInt(coentents_total_count / 4);
		var cc = 0;
		var inHtml = '';
		var diskBbs = null;
		var tc = 0;
		
		if(premiumListData.length > 0){
			inHtml += '<ul class="list_line">';
			for(var jp = 0; jp < 4; jp++){
				if(premiumListData[jp]){
					diskBbs = new Contents_list(tc+1, 0, 'premium');
					diskBbs.setData(premiumListData[jp]);
					//console.log(diskBbs);
					inHtml += diskBbs.getCantegoryListHtmlhasThumb(true);
				}
				tc++;
			}
			inHtml += '</ul>';
		}
		
		for(var i = 0; i < ul_count; i++){
			inHtml += '<ul class="list_line">';
			for(var j = 0; j < 4; j++){
				if(contentsList[cc]){
					diskBbs = new Contents_list(tc+1, 0, 'search');
					diskBbs.setData(contentsList[cc]);
					//console.log(diskBbs);
					inHtml += diskBbs.getCantegoryListHtmlhasThumb();
				}
				cc++;
				tc++;
			}
			inHtml += '</ul>';
		}
		//console.log(inHtml);
		innerContentsHtml = inHtml;					
		$innerTargetEle = $('#search-contents-list-data-img');
		
	}else{
		var bbsListHtml = [];
		var diskBbs = null;
		var cc = 0;
		for(var k =0; k < premiumListData.length; k++){
			diskBbs = new Contents_list(cc+1, 0, 'premium');
			diskBbs.setData(premiumListData[k]);
			//console.log(diskBbs);
			bbsListHtml[cc] = diskBbs.getCantegoryListHtml(true);
			cc++;
		}
		
		
		for(var i =0; i < bbsListData.length; i++){
			diskBbs = new Contents_list(cc+1, 0, 'search');
			diskBbs.setData(bbsListData[i]);
			//console.log(diskBbs);
			bbsListHtml[cc] = diskBbs.getCantegoryListHtml();
			cc++;
		}
		innerContentsHtml = bbsListHtml.join('');
		
	}

	$innerTargetEle.html(innerContentsHtml);
	$('.search-contents-list.active').removeClass('active');
	$('.search-contents-list.'+thumbType).addClass('active');
	
	
};

/*
PAGE_SEARCH.setSearchResultPagination = function(searchCategory, pageLimit, curPage){

	console.log('PAGE_SEARCH.setSearchResultPagination',searchCategory);
	console.log('pageLimit', pageLimit);
	console.log('curPage', curPage);
	//return;
	var searchCategoryTotalCount = 0;
	if(isDefined(searchCategory) == false){
		searchCategory = $('.search-cate-item.active').data('category');
	}
	if(isDefined(searchCategory) == true){
		searchCategoryTotalCount = parseInt($('.search-cate-item.active').data('total_count'));
	}
	console.log('searchCategoryTotalCount',searchCategoryTotalCount);
	
	//select channel
	if(searchCategory == 90001){
		console.log('channel category');		
		return;
	}
	
	if(isDefined(curPage) == false || $.isNumeric(curPage) == false){
		curPage = 1;
	}else{
		curPage = parseInt(curPage);
	}
	console.log('curPage', curPage);
	
	if(isDefined(pageLimit) == false){
		pageLimit = 20;
	}else{
		pageLimit = parseInt(pageLimit);
	}
	
	//page
	var totalPage =  0;
	if($.isNumeric(searchCategoryTotalCount) == true && searchCategoryTotalCount > 0){
		 totalPage = Math.ceil(searchCategoryTotalCount / pageLimit);
	}
	console.log('totalPage:', totalPage);
	
	
	//pagination
	var $paginationEle = $('#search-common-pagination');
	$paginationEle.pagination('destroy');
	
	
	if($paginationEle.length && totalPage > 1){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		//var startPage = 1;
		//var startPage = curPage;
		
		var initiateStartPageClick = false;
		var totalPages = totalPage;
		var hrefText = "#!action=search&c="+searchCategory+"&page=";
		PAGE_SEARCH.DATA.paginationEle = $paginationEle;
		PAGE_SEARCH.DATA.pagination = $paginationEle.pagination({
			currentPage	: curPage,
			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: hrefText,
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//PAGE_SEARCH.goSearchNextPage(page);
			}
		});
		
		$paginationEle.data('search_category', searchCategory);
		console.log(PAGE_SEARCH.DATA.pagination);
	}
}



//페이지 이동 분기 처리
PAGE_SEARCH.goSearchNextPage = function(goPage, hashData){
	console.log('PAGE_SEARCH.goSearchNextPage', goPage);
	var hashUrl = $.param.fragment();
	console.log('hashUrl', hashUrl);
	
	
	var selectSearchCategory = $('.search-cate-item.active').data('category');
	if(isDefined(selectSearchCategory) == false){
		selectSearchCategory = 90000;
	}
	selectSearchCategory = parseInt(selectSearchCategory);
	
	//return;
	if(hashUrl){
		//var goHash = '#!action=search&page='+goPage;
		var addHashUrl = '';
		if(isDefined(hashData)){
			for(var i in hashData){
				addHashUrl += '&'+i+'='+hashData[i];
			}
		}
		var goHash = "#!action=search&c="+selectSearchCategory+addHashUrl+"&page="+goPage;
		console.log('goHash', goHash);
		if(goHash != hashUrl){
			console.log('gohash'+goHash);
			location.hash = goHash;
			
		}else{
			PAGE_SEARCH.setSearchContentsPage(goPage);	
		}
	}else{
		PAGE_SEARCH.setSearchContentsPage(goPage);
	}
}


//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_SEARCH.setHashCheck = function(hashPrams, pageData){
	console.log('PAGE_SEARCH.setHashCheck');
	console.log('pageData', pageData);
	if(isDefined(hashPrams)){
		PAGE_SEARCH.setPageHashChange(hashPrams);
		return;
	}
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	
	if(hashPrams['!action'] == 'contents'){
		if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
			WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']));
			return;
		}	
	}
	
	//해시 모두 제거
	if(isDefined(location.hash) == true){
		$.bbq.removeState();	
	}	
	return;
	
	
	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != 'search'){
		var startPage = 1;
		var fcCategory = '';
		if(isDefined(pageData)){
			if(pageData['selected_category']){
				fcCategory = pageData['selected_category'];
				if(fcCategory > 90000){
					fcCategory = 90000;
				}
			}
		}
		console.log('fcCategory', fcCategory);
		PAGE_SEARCH.setSearchContentsPage(startPage, fcCategory);
		return;
	}
	
	
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}
	
	var hashCategory = null;
	if(hashPrams['c']){
		hashCategory = parseInt(hashPrams['c']);
	}
	
	
	
	if(isDefined(hashPage)){
		console.log('has hash', hashPage);
		PAGE_SEARCH.setSearchContentsPage(hashPage, hashCategory);
	}else{
		$('.search-contents-list.active').find('.search-contents-list-data').show();
	}
};



//해시가 변경되었을 경우 처리
PAGE_SEARCH.setPageHashChange = function(hashPrams){
	console.log('PAGE_SEARCH.setPageHashChange');
	//var hashUrl = $.param.fragment();
	//hashUrl = hashUrl.replace('!','');
	//console.log('hashUrl', hashUrl);
	var psase_int_key = new Array('idx', 'page', 'limit');
	if(isDefined(hashPrams)){
		hashPrams = jQuery.deparam.fragment();	
	}
	console.log('hashPrams', hashPrams);
	
	var newParams = {};
	var isOpenContents = false;
	for(var i in hashPrams){
		console.log(i);
		var a =  i;
		if (i.indexOf('!') != -1) {
			console.log("Find!");
			var a =  i.replace('!','');
		}
		if(a == 'idx'  && isOpenContents == false){
			isOpenContents = true;
		}
		//숫자로 변환
		if(jQuery.inArray(a, psase_int_key) >= 0){
			newParams[a] = parseInt(hashPrams[i]);	
		}else{
			newParams[a] = hashPrams[i];
		}
		
		console.log(hashPrams[i]);
	}
	
	console.log('newParams', newParams);
	//return;
	//컨텐츠 오픈
	if(isOpenContents == true){
		
	}
	//리스트 갱신
	else{
		var nextPage = 1;
		if(newParams['page']){
			nextPage = newParams['page'];
		}
		PAGE_SEARCH.setSearchContentsPage(nextPage);
	}
	
};



PAGE_SEARCH.setSearchContentsPage = function(nextPage, selectedCategory){
	console.log('PAGE_SEARCH.setSearchContentsPage:',nextPage);	
	//console.log('loadedPage', loadedPage);

	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	//return;
	var $infoEle = null;
	if(PAGE_SEARCH.DATA.paginationEle){
		$infoEle = PAGE_SEARCH.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#search-common-pagination');
	}
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 	:	nextPage,
 		cate1	:	null,
 		cate2	: 	null,
 		limit	: 	null,
 		sort	: 	null,
 		sort_type	:	'D',
 		adult_block	: 0,
 		search_keyword	: null,
 		search_ctegory	: null,
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.cate1)){
			sendData.cate1 = infoEleData.cate1;	
		}
		if(isDefined(infoEleData.cate2)){
			sendData.cate2 = infoEleData.cate2;	
		}
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
	}
	
	//search keyword
	var searchKeyword = $('#disk_search_form_keyword').val();
	console.log('searchKeyword:', searchKeyword);
	if(isDefined(searchKeyword) == false){
		alert('찾을 자료의 제목이나 검색어를 입력해주세요.');
		return;
	}
	if(objLengthMinByte(searchKeyword, 4) == true){
		alert('찾을 자료의 제목이나 검색어를 한글 2자 이상 입력해주세요.');
		return;
	}
	sendData.search_keyword = searchKeyword;
	
	//select category
	if(isDefined(selectedCategory) == false){
		selectedCategory = $('#diskTopMainSearchForm').find('input[name=fc]').val();
	}
	if(isDefined(selectedCategory)){
		sendData.search_ctegory = parseInt(selectedCategory);
	}else{
		selectedCategory = $('.search-cate-item.active').data('category');
		if(isDefined(selectedCategory) == true){
			sendData.search_ctegory = parseInt(selectedCategory);
		}	
	}
	
	
	//select channel
	if(sendData.search_ctegory == 90001){
		console.log('channel show');
		return;
	}
	
	//sort
	var sortEleData = $('#btn-search-list-sort').data('sort');
	if(isDefined(sortEleData)){
		sendData.sort = sortEleData;
	}
	console.log('sortEleData', sortEleData);
	
	//var listLimit = sendData.l;
	var limitEleData = $('#btn-search-list-limit').data('limit');
	console.log('limitEleData',limitEleData);
	if(isDefined(limitEleData)){
		sendData.limit = parseInt(limitEleData);
	}
	
	//ba
	if($('input:checkbox[id="check-search-is-adult"]').is(":checked") == true){
		sendData.adult_block = 1;
	}
	console.log('sendData', sendData);
	PAGE_SEARCH.getSearchContentsData(sendData, $infoEle);
	
	
	return;

};


//get getCategoryContentsData
PAGE_SEARCH.getSearchContentsData = function(getData, $infoEle){
	console.log('PAGE_SEARCH.getSearchContentsData', getData);
	
	var sendData = {
		k			: '',		//kewword
		c			: '',		//select category
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0			//is mobile
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = PAGE_SEARCH.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#search-common-pagination');
		}
	}
	
	if(isDefined(getData)){
		if(isDefined(getData.cate1)){ sendData.m = getData.cate1;}
		if(isDefined(getData.cate2)){ sendData.s = getData.cate2; }
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort'])){ sendData.sk = getData.sort; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['adult_block'])){ sendData.ba = getData.adult_block; }
		if(isDefined(getData['is_thumb'])){ sendData.it = getData.is_thumb;}
		if(isDefined(getData['search_keyword'])){ sendData.k = getData.search_keyword;}
		if(isDefined(getData['search_ctegory'])){ sendData.c = getData.search_ctegory;}
	}
	

	console.log('sendData', sendData);
	var successFunGetSearchContentsList = function(data){
			console.log('successFunGetSearchContentsList', data);
			//console.log('eleData', eleData);
			var thumbType = 'text';
			var isThumbEleData = $(".btn-search-change-thumb-type.active").data('thumb');
			console.log('isThumbEleData', isThumbEleData);
			if(isThumbEleData){
				thumbType = isThumbEleData;
			}
			//thumbType = 'img';
			console.log('thumbType', thumbType);
			
			if(isDefined(data.search_data)){
				
				//마지막 데이타 저장 - 썸네일형과 스위치위해
				PAGE_SEARCH.DATA.LAST_BBS = data.search_data;
				//html 파싱				
				PAGE_SEARCH.setSearchContentsListHtml(thumbType, data.search_data);
				
				//console.log('rankListHtml', rankListHtml);
				var cate1 = data.search_data.cate1;
				var curPage = data.search_data.page;
				
				//페이지 상단으로 이동
				var $scrollSpyEle = $('.search-contetns-list-scroll-spy-wrap');
				if(parseInt(curPage) == 1){
					if($scrollSpyEle.data('load') == 2){
						utility.ui.goToElement('.content.sub');	
					}
				}else{
					utility.ui.goToElement('.l_content');
				}
				$scrollSpyEle.data('load', 2);
				
				
				var saveCate2 = 0;
				if(isDefined(data.search_data.cate2)){
					saveCate2 = parseInt(data.search_data.cate2);
				}
				var saveCate1 = 0;
				if(isDefined(data.search_data.cate1)){
					saveCate1 = parseInt(data.search_data.cate1);
				}
				
				var reSavePageData =
				{
					cate1		:	saveCate1,
					cate2		:	saveCate2,
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(data.search_data.limit),
				};
				
				if(parseInt(curPage) == 1){
					reSavePageData.total_count	= parseInt(data.search_data.total_count);
					reSavePageData.total_page	= parseInt(data.search_data.total_page);
					
					//토탈 카운터 갱신 - text
					if(isDefined(data.search_data.selected_category)){
						console.log('update total count');
						var selectedCate = data.search_data.selected_category;
						var selectedCateName = data.search_data.selected_category_name;
						var cateShowName = selectedCateName+'('+data.search_data.total_count+')';
						$('.search-cate-item.cate-'+selectedCate).find('.cate-item').text(cateShowName);	
					}
					
					//자료없음 알림
					if(data.search_data.total_count < 1){
						$('#search-contents-list-data-empty').show();
					}else{
						$('#search-contents-list-data-empty').hide();
					}
					
					//block keyword
					if(isDefined(data.block)){
						if(data.block.is_bbs_cate_block == 1){
							
						}
					}
					
						
				}
				
				console.log('reSavePageData', reSavePageData);
				$infoEle.data(reSavePageData);
				
				//pagination
				//$infoEle.pagination('selectPage', curPage);
				
				//pagination
				if(isDefined(data.search_data.selected_category) == false){
					data.search_data.selected_category = 90000;
				}
				
				var isNewLoadPagination = true; 
				if(PAGE_SEARCH.DATA.pagination){
					var pageSelectedCategory =  $infoEle.data('search_category');
					if(isDefined(pageSelectedCategory) == true){
						if(parseInt(pageSelectedCategory) == parseInt(data.search_data.selected_category)){
							$infoEle.pagination('selectPage', curPage);
							isNewLoadPagination = false;
						}
					}
				}
				console.log('isNewLoadPagination',isNewLoadPagination);
				console.log('curPage', curPage);
				if(isNewLoadPagination == true){
					PAGE_SEARCH.setSearchResultPagination(data.search_data.selected_category, data.search_data.limit, curPage);	
				}
				
				//save last hash
				PAGE_SEARCH.DATA.LAST_HASH = location.hash;
				
			}
			
			
	};
	
	COMMON_ACTION.SEARCH.getSearchContentsList(sendData, successFunGetSearchContentsList);
};

*/