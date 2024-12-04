/*
* category
*/

var PAGE_CATEGORY = {};
PAGE_CATEGORY.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_BBS		: null,
	LAST_PREMIUM	: null,
	LAST_HASH		: null,
	CATE1			: null,
	CATE2			: null,
};

PAGE_CATEGORY.start = function(pageSub, pagData){
	console.log('PAGE_CATEGORY.start', pageSub);
	console.log(pagData);

	//save default hash
	PAGE_CATEGORY.DATA.LAST_HASH = '#!action=category&page=1';

	PAGE_CATEGORY.initBinding();
	PAGE_CATEGORY.initOnload();

	//PAGE_CATEGORY.setHashCheck('start');

	//상단 리스트 팝업
	//WEB_COMMON.setContentsListfilterBtnBinding(PAGE_CATEGORY.goCategoryPage);

};

//category image lazy
PAGE_CATEGORY.setImageLazy = function(){
	//image lazy
	if($('.disk-image-lazy-category').length > 0){
		$('.disk-image-lazy-category').lazy();
	}
};

//pjax binding
PAGE_CATEGORY.setBindingPjax = function(){
	console.log('PAGE_CATEGORY.setBindingPjax');
		
	if ($.support.pjax) {
		console.log('support pajx');
		var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		console.log('url', url);
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			var containerSelector = '#category-contents-list-wrap';
			var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
			console.log('url', url);
			
			var a = $.pjax.click(event, {
				container: containerSelector,
				url: url
			});
			console.log(a);
            return false;
		});
		WEB_COMMON.setBindingAfterPageDataLoad();
	}
	
	$(document).on('pjax:start', function() {
		console.log('pjax:start');
	});
	
	$(document).on('pjax:send', function() {
		utility.spinnerLoading.show();
	});
	
	$(document).on('pjax:complete', function() {
		utility.spinnerLoading.hide();
		
		//image lazy
		if($('.category-contents-list.img').hasClass('active')){
			PAGE_CATEGORY.setImageLazy();	
		}
		if($('.onpick-category-top-rank').length > 0){
			$('.onpick-category-top-rank').hide();
		}
		WEB_COMMON.setBindingAfterPageDataLoad();
	});

	// for google analytics
	$(document).on('pjax:end', function() {
		ga('set', 'location', window.location.href); // 현재 바뀐 주소를
		ga('send', 'pageview'); // 보고한다
	});
};



PAGE_CATEGORY.initBinding = function(){
	console.log('PAGE_CATEGORY.initBinding');
	
	
	PAGE_CATEGORY.setBindingPjax();
	//click binding
	PAGE_CATEGORY.setContentsListfilterBtnBinding();
	
	//image lazy
	if($('.category-contents-list.img').hasClass('active')){
		PAGE_CATEGORY.setImageLazy();	
	}
		

	//categor top onpick tab
	$( ".onpick-category-top-rank-tab" ).unbind( "click");
	$( ".onpick-category-top-rank-tab" ).bind( "click", function() {
		var selfEle = this;
		var eleData = $(selfEle).data();
		console.log('eleData',eleData);

		/*
		//taget list
		$tagetContentsEle = $('.'+eleData.target+'.'+eleData.type);
		$('.'+eleData.target).removeClass('active');
		$tagetContentsEle.addClass('active');

		//tab
		$('.on_tab_action.'+eleData.onpick).removeClass('active');
		$(this).addClass('active');
		*/

		if(isDefined(eleData.cate1) == false || isDefined(eleData.rank_key) == false  || isDefined(eleData.onpick) == false){
			return;
		}
		var targetEleClass = '.onpick-category-top-rank.'+eleData.onpick;
		if($(targetEleClass).find('.onpick_top_list_item.'+eleData.rank_key+'.'+eleData.onpick).length > 0){
			console.log('has data load yet');

			$('.category_oppick_top_rank.active').removeClass('active');
			$(targetEleClass).find('.category_oppick_top_rank.'+eleData.rank_key).addClass('active');

			$('.onpick-category-top-rank-tab.active').removeClass('active');
			$(selfEle).addClass('active');

			return;
		}
		var successFunGetRankOnpickList = function(data){
			console.log('successFunGetRankOnpickList', data);
			//console.log('eleData', eleData);

			if(isDefined(data.onpick_rank_list)){
				var rankList = data.onpick_rank_list;
				var rankListHtml = [];
				for(var i =0; i < rankList.length; i++){
					var diskRank = new Onpick_rank_list(0, i+1);
					diskRank.setData(rankList[i]);
					//console.log(diskRank);
					rankListHtml[i] = diskRank.getOnpickRankListHtml();
				}
				//console.log('rankListHtml', rankListHtml);
				var getCategory = data.rank_category;
				var listTargetEleClass = '.onpick_top_list.'+data.rank_key;
				console.log('targetEleClass', targetEleClass);
				console.log('listTargetEleClass', listTargetEleClass);

				if(rankListHtml.length > 0){
					var $slickEle = $(targetEleClass).find(listTargetEleClass);
					$slickEle.html(rankListHtml.join(''));

					$('.category_oppick_top_rank.active').removeClass('active');
					$(targetEleClass).find('.category_oppick_top_rank.'+data.rank_key).addClass('active');

					$('.onpick-category-top-rank-tab.active').removeClass('active');
					$(selfEle).addClass('active');

					//slick
					if($slickEle.hasClass('slick-slider') == false){
						$slickEle.slick({
						  lazyLoad: 'progressive',
						  infinite: true,
						  slidesToShow: 6,
						  slidesToScroll: 3,
						});

					}
				}

			}
		};
		var formData ={
			cate1		: eleData.cate1,
			rank_key	: eleData.rank_key,
		};
		var ajaxData =
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.CATEGORY.ONPIC_RANK,
			data		: formData,
			success_fun	: successFunGetRankOnpickList,
			error_fun	: null
		};
		DISK_PROTOCOL.AJAX(ajaxData);
	});


	//썸네일 & 리스트 형 변경
	$( ".btn-category-change-thumb-type" ).unbind( "click");
	$( ".btn-category-change-thumb-type" ).bind( "click", function() {
		var thumbType = 'text';
		var eleThumbType = $(this).data('thumb');
		console.log('eleThumbType', eleThumbType);
		if(isDefined(eleThumbType)){
			thumbType = eleThumbType;
		}
		console.log('thumbType', thumbType);
		$('.btn-category-change-thumb-type.active').removeClass('active');
		$('.btn-category-change-thumb-type.'+thumbType).addClass('active');
		
		if(eleThumbType == 'img'){
			$.cookie('is_thumb', 1,{ expires: 30, path: '/' });	
		}else{
			$.removeCookie('is_thumb', { path: '/'});
		}
		
		
		PAGE_CATEGORY.setChangeCategoryListThumbType(thumbType);

	});
};


//상단 필터 바인딩
PAGE_CATEGORY.setContentsListfilterBtnBinding = function(callbackFun){
	console.log('PAGE_CATEGORY.setContentsListfilterBtnBinding');
	//console.log(callbackFun);
	var $infoEle = $('#category-common-pagination');
	
	var goCategoryPjax = function(pJaxUrl){
		console.log('goCategoryPjax', pJaxUrl);
		if(isDefined(pJaxUrl) == false){
			return;
		}
		var containerSelector = '#category-contents-list-wrap';
  		if ($.support.pjax) {
  			console.log('support');
  			$.pjax({url: pJaxUrl, container:containerSelector});
		}
  		return;
	}

	//정렬 기준 버튼 클릭
	if($( "#btn-category-list-sort" ).length > 0){
		$( "#btn-category-list-sort" ).unbind( "click");
		$( "#btn-category-list-sort" ).bind( "click", function() {
			console.log('btn-category-list-sort');
			$('.btn-category-list-sort-list' ).toggleClass('active');

		});
	}

	//정렬 개수
	if($( "#btn-category-list-limit" ).length > 0){
		$( "#btn-category-list-limit" ).unbind( "click");
		$( "#btn-category-list-limit" ).bind( "click", function() {
			console.log('btn-category-list-limit');
			$( '.btn-category-list-limit-list' ).toggleClass('active');

		});
	}

	//정렬 기준 & 정렬 개수
	if($( ".category-top-filter-item" ).length > 0){
		$( ".category-top-filter-item" ).unbind( "click");
		$( ".category-top-filter-item" ).bind( "click", function() {
			console.log('category-top-filter-item');
			var eleData = $(this).data();
			console.log(eleData);
			
			if(isDefined(eleData.target)){
				var saveEleData = {};
				saveEleData[eleData.type] = eleData.values;
				console.log(saveEleData);
				//$('#'+eleData.target).data(saveEleData).text($(this).text()).trigger('click');
				$('#'+eleData.target).data(saveEleData).html($(this).text()+'<span class="arrow"></span>');
				$('.select-area-category-top.active').removeClass('active');
				console.log($('#'+eleData.target).data());
				console.log('callbackFun', callbackFun);
			}
			
			if(eleData.type == 'limit'){
				//location.href = showLocation + '?page=1&l='+parseInt(eleData.values);
				$('#btn-category-list-limit').data('limit', eleData.values);
			}else if(eleData.type == 'sort'){
				//location.href = showLocation + '?page=1&sk='+eleData.values;
				 $('#btn-category-list-sort').data('sort', eleData.values);
			}
			
			
			var goUrl = PAGE_CATEGORY.goCategoryPage(eleData);
			console.log('goUrl', goUrl);
			if(isDefined(goUrl)){
				goCategoryPjax(goUrl);
			}
			return;
		});
	}
	

	//성인 제외
	if($( "#check-category-is-adult" ).length > 0){
		$( "#check-category-is-adult" ).unbind( "click");
		$( "#check-category-is-adult" ).bind( "click", function() {
			console.log('check-category-is-adult');
			if(utility.disk.checkIsChildBlockMember() == true){
				$(this).prop("checked", true);
				var show_msg = "자녀보호 서비스를 이용중입니다.";
				$.ambiance({message: show_msg, type: "alert-warning"});
				return;
			}
			
			var goUrl = PAGE_CATEGORY.goCategoryPage();
			console.log('goUrl', goUrl);
			if(isDefined(goUrl)){
				goCategoryPjax(goUrl);
			}
			
			return;

		});
	}
};

//페이지 이동 분기 처리
PAGE_CATEGORY.goCategoryPage = function(goPage){
	console.log('PAGE_CATEGORY.goCategoryPage', goPage);
	console.log(' window.location.href',  window.location.href);
	console.log("pathname: "+location.pathname);
	var sendData = {
			l			: '',		//limit
			sk			: '',		//sort
			st			: '',		//desc
			ba			: '',		//block adult
			page		: 1,
			is_mobile	: 0			//is mobile
		};
	
	
	//sort
	var sortEleData = $('#btn-category-list-sort').data('sort');
	if(isDefined(sortEleData)){
		sendData.sk = sortEleData;
	}
	console.log('sortEleData', sortEleData);

	//var listLimit = sendData.l;
	var limitEleData = $('#btn-category-list-limit').data('limit');
	console.log('limitEleData',limitEleData);
	if(isDefined(limitEleData)){
		sendData.l = parseInt(limitEleData);
	}

	//ba
	if($('input:checkbox[id="check-category-is-adult"]').is(":checked") == true){
		sendData.ba = 1;
	}
	if(sendData.adult_block != 1){
		if(utility.disk.checkIsChildBlockMember() == true){
			sendData.ba = 1;
		}
	}
	var showLocation = location.pathname;
	var sendSrt = $.param( sendData );
	console.log('sendSrt', sendSrt);
	var goUrl = showLocation+'?'+sendSrt;
	
	return goUrl;
	
		
	
};



PAGE_CATEGORY.initOnload = function(){
	console.log('PAGE_CATEGORY.initOnload');

	//set search category number
	if($('.left-category-item.t_blue').length > 0){
		var sEleData = $('.left-category-item.t_blue').data();
		var selectCategory = 0;
		if(isDefined(sEleData.cate1) && $.isNumeric(sEleData.cate1)){
			selectCategory = parseInt(sEleData.cate1);
		}
		$('#disk_search_form_category_loc').val(selectCategory);
	}

	var $slickTarget = $('.category_oppick_top_rank.active');
	if($slickTarget.find('.onpick_top_list').length > 0){
		$slickTarget.find('.onpick_top_list').slick({
		  lazyLoad: 'ondemand',
		  infinite: true,
		  slidesToShow: 6,
		  slidesToScroll: 3
		});
	}



	//onpick css - 극장
	$('.onpick_top_list.theater').css({'max-height': '230px'});

	//pagination
	var $paginationEle = $('#category-common-pagination');
	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		var startPage = 1;
		var initiateStartPageClick = false;
		var totalPages = 1;
		if(isDefined(eleData.total_page)){
			totalPages = parseInt(eleData.total_page);
		}

		PAGE_CATEGORY.DATA.paginationEle = $paginationEle;


		PAGE_CATEGORY.DATA.pagination = $paginationEle.pagination({
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
			hrefTextPrefix	: '#!action=category&page=',
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//PAGE_CATEGORY.goCategoryPage(page);
			}
		});

		console.log(PAGE_CATEGORY.DATA.pagination);
	}
	
	//성인 오른쪽 배너 - random
	var adultBannerCnt = $('.adult-toptoon-banner').length;
	console.log('adultBannerCnt', adultBannerCnt);
	var rankInt = getRandomInt(0, adultBannerCnt -1);
	$('.adult-toptoon-banner').removeClass('active');
	$('.adult-toptoon-banner').eq(rankInt).addClass('active');
	if($('.adult-toptoon-banner').hasClass('active') == false){
		$('.adult_roll_wrap').hide();
	}else{
		$('.adult_roll_wrap').show();
	}
	
	var adultBannerSmallCnt = $('.adult-a_banner_wrap').length;
	console.log('adultBannerSmallCnt', adultBannerSmallCnt);
	var rankInt = getRandomInt(0, adultBannerSmallCnt -1);
	$('.adult-a_banner_wrap').removeClass('active');
	$('.adult-a_banner_wrap').eq(rankInt).addClass('active');

	

};

PAGE_CATEGORY.setChangeCategoryListThumbType = function(thumbType){
	console.log('PAGE_CATEGORY.setChangeCategoryListThumbType', thumbType);
	$('.category-contents-list.active').removeClass('active');
	$('.category-contents-list.'+thumbType).addClass('active');
	if(thumbType == 'img'){
		PAGE_CATEGORY.setImageLazy();	
	}
};


PAGE_CATEGORY.setGoRedirectMoreContents = function(cate1){
	console.log('PAGE_CATEGORY.setGoRedirectMoreContents');
	var eleData =
	{
		cate1	: cate1,
		onpick : 'movie',
		order	: 0,
		rank_key: 'new'
	}
	
	var $activeTab = $('.onpick-category-top-rank-tab.active');
	if($activeTab.length > 0){
		eleData = $activeTab.data();
	}
	console.log('eleData', eleData);
	var linkUrl = null;
	if(cate1 == 11000){
		if(eleData.rank_key == 'new'){
			linkUrl ='/movie/m_list';
		}else if(eleData.rank_key == 'best'){
			linkUrl ='/movie/m_list/hot';
		}else if(eleData.rank_key == 'soon'){
			linkUrl ='/movie/m_list/soon';
		}
	}else if(cate1 == 12000){
		if(eleData.rank_key == 'yesterday'){
			linkUrl ='/broadcast/b_list/today';
		}else if(eleData.rank_key == 'best'){
			linkUrl ='/broadcast/b_list/hot_drama';
		}else if(eleData.rank_key == 'new'){
			linkUrl ='/broadcast/b_list/latest';
		}
	}else if(cate1 == 13000){
		if(eleData.rank_key == 'theater'){
			linkUrl ='/ani/a_list';
		}else if(eleData.rank_key == 'tv'){
			linkUrl ='/ani/a_list/tv/latest';
		}
	}else if(cate1 == 21100){
		if(eleData.rank_key == 'mag'){
			linkUrl ='/mag/g_list/9';
		}else if(eleData.rank_key == 'webtoon_19'){
			GO_TOPTOON();
			return;
		}else if(eleData.rank_key == 'pink'){
			linkUrl ='/movie/m_list/pink';
		}
	}else if(cate1 == 14000){
		if(eleData.rank_key == 'magazine'){
			linkUrl ='/mag/best_list';
		}else if(eleData.rank_key == 'webtoon'){
			GO_TOPTOON();
			return;
		}
	}else if(cate1 == 21500){
		if(eleData.rank_key == 'child_theater'){
			linkUrl ='/movie/m_list';
		}else if(eleData.rank_key == 'child_tv'){
			linkUrl ='/broadcast/b_list/4';
		}else if(eleData.rank_key == 'child_ani'){
			linkUrl ='/ani/a_list/mv/a_child';
		}
	}
	
	if(isDefined(linkUrl)){
		location.href = linkUrl;
		return;
	}
	

};

PAGE_CATEGORY.getAdultChkMember = function(cate1,url){   //2019-11-04 omh 로그인 및 성인에 관한것 체크

    if(cate1 == 21100){
        if(utility.disk.checkIsLogin() == true){
    		if(!utility.disk.checkIsAdultMember()){
    		    alert("성인인증을 하셔야만 볼 수 있는컨텐츠입니다.");
                GO_ADULT_AUTH();
                return;
            }else{
                location.href = url;
            }
    	}else{
    	   alert("로그인을 하셔야만 볼 수 있는컨텐츠입니다.");
    	   GO_LOGIN();
	       return;
    	}
    }else{
         location.href = url;
    }


};


//인기 카테고리
PAGE_BEST = {};
PAGE_BEST.start = function(pageSub, pagData){
	console.log('PAGE_BEST.start', pageSub);
	console.log(pagData);

	WEB_COMMON.setBindingAfterPageDataLoad();
};


/*


//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_CATEGORY.setHashCheck = function(getHashPrams){
	console.log('PAGE_CATEGORY.setHashCheck');

	if(isDefined(getHashPrams)){
		if(getHashPrams != 'start'){
			PAGE_CATEGORY.setPageHashChange(getHashPrams);
			return;
		}
	}

	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] == 'contents'){
		if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
			WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']),'category');
		}
	}

	if(hashPrams['!action'] != 'category'){
		console.log(hashPrams['!action']);
		return;
	}

	//메인에서 바로 들어온 경우 : 해시 제거
	if(getHashPrams == 'start'){
		$.bbq.removeState();
		return;
	}


	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}

	if(isDefined(hashPage)){
		console.log('has hash', hashPage);
		if(parseInt(hashPage) == 1){
			console.log('1 default page');
			$('.category-contents-list.active').find('.category-contents-list-data').show();
		}else{
			PAGE_CATEGORY.setCategoryPage(hashPage);
		}
	}else{
		$('.category-contents-list.active').find('.category-contents-list-data').show();
		var loadEleData = $('#category-common-pagination').data();
		if(isDefined(loadEleData.cate1)){
			PAGE_CATEGORY.DATA.CAT1 = loadEleData.cate1;
			PAGE_CATEGORY.DATA.CAT2 = loadEleData.cate2;
		}
		PAGE_CATEGORY.DATA.LAST_HASH = location.hash;


	}
}



//해시가 변경되었을 경우 처리
PAGE_CATEGORY.setPageHashChange = function(hashPrams){
	console.log('PAGE_CATEGORY.setPageHashChange');
	//var hashUrl = $.param.fragment();
	//hashUrl = hashUrl.replace('!','');
	//console.log('hashUrl', hashUrl);
	var psase_int_key = new Array('idx', 'page', 'limit');
	if(isDefined(hashPrams)){
		hashPrams = jQuery.deparam.fragment();
	}
	console.log('hashPrams', hashPrams);


	console.log('PAGE_CATEGORY.DATA.CAT1', PAGE_CATEGORY.DATA.CAT1);
	console.log('PAGE_CATEGORY.DATA.CAT2', PAGE_CATEGORY.DATA.CAT2);
	console.log('PAGE_CATEGORY.DATA.LAST_HASH', PAGE_CATEGORY.DATA.LAST_HASH);
	//view에서 넘오온 경우
	if(isDefined(PAGE_CATEGORY.DATA.LAST_HASH)){
		if(PAGE_CATEGORY.DATA.LAST_HASH == location.hash){
			console.log('loaded hash before');
			return;
		}
	}

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
		PAGE_CATEGORY.setCategoryPage(nextPage);
	}

};

{
		
		var hashUrl = $.param.fragment();
		console.log('hashUrl', hashUrl);
	
		//return;
		if(hashUrl){
			var goHash = '#!action=category&page='+goPage;
			console.log('goHash', goHash);
			if(goHash != hashUrl){
				console.log('gohash'+goHash);
				location.hash = goHash;
	
			}else{
				PAGE_CATEGORY.setCategoryPage(goPage);
			}
		}else{
			PAGE_CATEGORY.setCategoryPage(goPage);
		}
	
}


PAGE_CATEGORY.setCategoryPage = function(nextPage, isThumb){
	console.log('PAGE_CATEGORY.setCategoryPage:',nextPage);
	//console.log('loadedPage', loadedPage);
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}

	var $infoEle = null;
	if(PAGE_CATEGORY.DATA.paginationEle){
		$infoEle = PAGE_CATEGORY.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#category-common-pagination');
	}
	if($infoEle.length < 1){
		return;
	}
	var infoEleData = $infoEle.data();
	if(isDefined(infoEleData) == false){
		return;
	}

	var loadPage = 0;
	if(isDefined(infoEleData.load) == true){
    	loadPage = parseInt(infoEleData.load);
    }

 	var sendData = {
 		page 	:	nextPage,
 		cate1	:	null,
 		cate2	: 	null,
 		limit	: 	null,
 		sort	: 	null,
 		sort_type	:	'D',
 		adult_block	: 0,
 		is_thumb 	: 0
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

	//sort
	var sortEleData = $('#btn-category-list-sort').data('sort');
	if(isDefined(sortEleData)){
		sendData.sort = sortEleData;
	}
	console.log('sortEleData', sortEleData);

	//var listLimit = sendData.l;
	var limitEleData = $('#btn-category-list-limit').data('limit');
	console.log('limitEleData',limitEleData);
	if(isDefined(limitEleData)){
		sendData.limit = parseInt(limitEleData);
	}

	//ba
	if($('input:checkbox[id="check-category-is-adult"]').is(":checked") == true){
		sendData.adult_block = 1;
	}
	if(sendData.adult_block != 1){
		if(utility.disk.checkIsChildBlockMember() == true){
			sendData.adult_block = 1;
		}
	}
	//thumb show
	if(isDefined(isThumb)){
 		sendData.is_thumb = isThumb;
 	}
 	var btnActive = $('.btn-category-change-thumb-type.active').data('thumb');
 	if(btnActive == 'img'){
 		sendData.is_thumb = 1;
 	}
	console.log('sendData', sendData);
	//return;
	PAGE_CATEGORY.getCategoryContentsData(sendData, $infoEle);
	return;

};


//get getCategoryContentsData
PAGE_CATEGORY.getCategoryContentsData = function(getData, $infoEle){
	console.log('PAGE_CATEGORY.getCategoryData', getData);

	var sendData = {
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
		$infoEle = PAGE_CATEGORY.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#category-common-pagination');
		}
	}
	
	//썸네일 여부	
	if(checkIsShowThumb() == true){
		getData.is_thumb = 1;
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
	}


	console.log('sendData', sendData);
	var successFunGetCategoryContentsList = function(data){
			console.log('successFunGetCategoryContentsList', data);
			//console.log('eleData', eleData);
			var thumbType = 'text';
			var isThumbEleData = $(".btn-category-change-thumb-type.active").data('thumb');
			console.log('isThumbEleData', isThumbEleData);
			if(isThumbEleData){
				thumbType = isThumbEleData;
			}
			//thumbType = 'img';
			console.log('thumbType', thumbType);

			var premiumData = [];
			if(isDefined(data.premium_category_list)){
				premiumData = data.premium_category_list;
				PAGE_CATEGORY.DATA.LAST_PREMIUM = premiumData;
			}

			if(isDefined(data.category_data)){

				//마지막 데이타 저장 - 썸네일형과 스위치위해
				PAGE_CATEGORY.DATA.LAST_BBS = data.category_data;
				//html 파싱
				PAGE_CATEGORY.setCategoryListHtml(thumbType, data.category_data, premiumData);

				//console.log('rankListHtml', rankListHtml);
				var cate1 = data.category_data.cate1;
				//페이지 상단으로 이동
				utility.ui.goToElement('.l_content');

				var saveCate2 = '';
				if(isDefined(data.category_data.cate2)){
					saveCate2 = data.category_data.cate2
				}

				var curPage = data.category_data.bbs_list_data.page;
				var reSavePageData =
				{
					cate1		:	parseInt(data.category_data.cate1),
					cate2		:	saveCate2,
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(data.category_data.bbs_list_data.limit),
				};

				if(parseInt(curPage) == 1){
					reSavePageData.total_count	= parseInt(data.category_data.bbs_list_data.total_count);
					reSavePageData.total_page	= parseInt(data.category_data.bbs_list_data.total_page);
				}


				$infoEle.data(reSavePageData);

				//pagination
				$infoEle.pagination('selectPage', curPage);

				//save cache
				PAGE_CATEGORY.DATA.LAST_HASH = location.hash;
				PAGE_CATEGORY.DATA.CAT1 = data.category_data.cate1;
				PAGE_CATEGORY.DATA.CAT2 = saveCate2;

			}


		};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CATEGORY.CONTENTS_LIST,
		data		: formData,
		success_fun	: successFunGetCategoryContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};


PAGE_CATEGORY.setCategoryListHtml = function(thumbType, category_data, premiumData){
	console.log('PAGE_CATEGORY.setCategoryListHtml');
	console.log(category_data);
	console.log(premiumData);
	
	//쿠키에서 제어 -썸네일 여부
	if(checkIsShowThumb() == true){
		thumbType = 'img';
	}

	var bbsListData = category_data.bbs_list_data;
	var premiumList = premiumData;;
	var innerContentsHtml = null;
	var $innerTargetEle = $('#category-contents-list-data-text');
	if(thumbType == 'img'){
		var contentsList = bbsListData.list;
		var coentents_total_count = contentsList.length;
		var ul_count = parseInt(coentents_total_count / 4);
		var cc = 0;
		var inHtml = '';
		var diskBbs = null;

		if(premiumList.length > 0){
			inHtml += '<ul class="list_line">';
			for(var jp = 0; jp < 4; jp++){
				if(premiumList[jp]){
					diskBbs = new Contents_list(jp+1, 0, 'category');
					diskBbs.setData(premiumList[jp]);
					//console.log(diskBbs);
					inHtml += diskBbs.getCantegoryListHtmlhasThumb(true);
				}
			}
			inHtml += '</ul>';
		}

		for(var i = 0; i < ul_count; i++){
			inHtml += '<ul class="list_line">';
			for(var j = 0; j < 4; j++){
				if(contentsList[cc]){
					diskBbs = new Contents_list(i+1, 0, 'category');
					diskBbs.setData(contentsList[cc]);
					//console.log(diskBbs);
					inHtml += diskBbs.getCantegoryListHtmlhasThumb();
				}

				cc++;
			}
			inHtml += '</ul>';
		}

		//console.log(inHtml);
		innerContentsHtml = inHtml;
		$innerTargetEle = $('#category-contents-list-data-img');

	}else{
		var bbsListHtml = [];
		var diskBbs = null;
		var tCnt = 1;
		if(isDefined(premiumList) == true){
			for(var p = 0; p < premiumList.length; p++){
				diskBbs = new Contents_list(tCnt, 0, 'category');
				diskBbs.setData(premiumList[p]);
				console.log(diskBbs);
				bbsListHtml[tCnt] = diskBbs.getCantegoryListHtml(true);
				tCnt++;
			}
		}

		for(var i =0; i < bbsListData.list.length; i++){
			diskBbs = new Contents_list(tCnt, 0, 'category');
			diskBbs.setData(bbsListData.list[i]);
			//console.log(diskBbs);
			bbsListHtml[tCnt] = diskBbs.getCantegoryListHtml();
			tCnt++;
		}

		innerContentsHtml = bbsListHtml.join('');

	}

	$innerTargetEle.html(innerContentsHtml);
	$('.category-contents-list.active').removeClass('active');
	$('.category-contents-list.'+thumbType).addClass('active');
	//hide premium
	$('.rec_content_wrap').removeClass('show');
}


PAGE_CATEGORY.setChangeCategoryListThumbType = function(thumbType){
	console.log('PAGE_CATEGORY.setChangeCategoryListThumbType', thumbType);
	//PAGE_CATEGORY.DATA.LAST_BBS = null;
	
	if(isLoadedBbqScript() == true){
		var nextPage = 1;
		var hashUrl = $.param.fragment();
		console.log('hashUrl', hashUrl);
		var hashPrams = jQuery.deparam.fragment();
		console.log('hashPrams', hashPrams);
		if(hashPrams['page']){
			if($.isNumeric(hashPrams['page'])){
				nextPage = parseInt(hashPrams['page']);
			}
		}
		if(thumbType == 'img'){
			var isThumb = 1;
			PAGE_CATEGORY.setCategoryPage(nextPage, isThumb);
		}else{
			if(PAGE_CATEGORY.DATA.LAST_BBS){
				PAGE_CATEGORY.setCategoryListHtml(thumbType, PAGE_CATEGORY.DATA.LAST_BBS, PAGE_CATEGORY.DATA.LAST_PREMIUM);
			}else{
				PAGE_CATEGORY.setCategoryPage(nextPage, 0);
			}
		}
	}else{
		$('.category-contents-list.active').removeClass('active');
		$('.category-contents-list.'+thumbType).addClass('active');
		if(thumbType == 'img'){
			PAGE_CATEGORY.setImageLazy();	
		}
		
		
		
	}
	
};
*/