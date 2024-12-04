/*
* mobile page : category
*/
MOBILE_PAGE.category = {};

MOBILE_PAGE.category.DATA ={
	ACTION_TYPE : 'category',
	LAST_HASH	: null,
	MAIN		: null,
	SUB			: 0,
	
};

MOBILE_PAGE.category.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.category.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	console.log('MOBILE_COMMON.DATA');
	console.log(MOBILE_COMMON.DATA);
	
	MOBILE_PAGE.category.defaultBinding();
	MOBILE_PAGE.category.pageInit(showContainerInfo, hashPrams);
}

MOBILE_PAGE.category.defaultBinding = function(){
	console.log('MOBILE_PAGE.category.defaultBinding');	
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.category.dataAfterBinding = function(){
	
	console.log('MOBILE_PAGE.category.dataAfterBinding');
	/*
	if(isDefined($dataEle) == false){
		$dataEle = $('.mobile-category-contents-list-wrap');
	}
	
	*/
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
	
	
	
	
	var $scrollSpyEleCategoryPageEnd = $('#category-page-end-spy');
	var actionGetCategoryContents = function(gData){
		console.log('actionGetSearchContents', gData);
		if(isDefined(gData) == false){
			console.log('gData err');
			return;
		}
		/*
		var nextPage = 1;
		var totalPage = 2;
		if(isDefined(gData.loaded) == true){
			if($.isNumeric(gData.loaded) == true){
				var loadPage = parseInt(gData.loaded);
				nextPage = loadPage+ 1;
			}
			
		}
		if(isDefined(gData.total_page) == true){
			if($.isNumeric(gData.total_page) == true){
				totalPage = parseInt(gData.total_page);
			}
		}
		if(nextPage > totalPage){
			console.log('max page');
			$scrollSpyEle.removeClass('loading').addClass('ending');
			return;
		}
		if($scrollSpyEle.hasClass('ending') == true){
			$scrollSpyEle.removeClass('ending').addClass('loading');	
		}
		MOBILE_PAGE.search.setSearchContentsPage(nextPage, gData.search_category);
		*/
		
		var nextPage = 1;
		var totalPage = 2;
		if(isDefined(gData.page)){
			nextPage = parseInt(gData.page) + 1;
		}
		if(isDefined(gData.loaded) == true){
			if($.isNumeric(gData.loaded) == true){
				var loadPage = parseInt(gData.loaded);
				nextPage = loadPage+ 1;
			}
			
		}
		
		console.log('nextPage', nextPage);
		
		if(isDefined(gData.total_page) == true){
			if($.isNumeric(gData.total_page) == true){
				totalPage = parseInt(gData.total_page);
			}
		}
		console.log('totalPage', totalPage);
		
		if(nextPage > totalPage){
			console.log('max page');
			$scrollSpyEleCategoryPageEnd.removeClass('loading').addClass('ending');
			return;
		}
		if($scrollSpyEleCategoryPageEnd.hasClass('ending') == true){
			$scrollSpyEleCategoryPageEnd.removeClass('ending').addClass('loading');	
		}
		
		var sendData = {
				main 	:	MOBILE_PAGE.category.DATA.MAIN,
				sub 	:	MOBILE_PAGE.category.DATA.SUB,
				page	: 	nextPage,
		};
		MOBILE_PAGE.category.setCategoryContentsData(sendData);
		
		/*
		if(nextPage > gData.loaded){
			var sendData = {
					main 	:	MOBILE_PAGE.category.DATA.MAIN,
					sub 	:	MOBILE_PAGE.category.DATA.SUB,
					page	: 	nextPage,
			};
			MOBILE_PAGE.category.setCategoryContentsData(sendData);
		}
		*/
		
	};
	
	if($scrollSpyEleCategoryPageEnd.length > 0){
		var spyData = $scrollSpyEleCategoryPageEnd.data();
		
		if(spyData.spy != 1){
			$scrollSpyEleCategoryPageEnd.on('scrollSpy:enter', function() {
				
				console.log('scrollSpy:enter');
				console.log('MOBILE_COMMON.DATA.ACTION', MOBILE_COMMON.DATA.ACTION);
				console.log('MOBILE_PAGE.category.DATA.ACTION_TYPE', MOBILE_PAGE.category.DATA.ACTION_TYPE);
				if(MOBILE_COMMON.DATA.ACTION != MOBILE_PAGE.category.DATA.ACTION_TYPE){
					return;
				}
				var eleData = $(this).data();
				console.log('enter', eleData);
				
				actionGetCategoryContents(eleData);
				/*
				var nextPage = 1;
				if(isDefined(eleData.page)){
					nextPage = parseInt(eleData.page) + 1;
				}
				console.log('nextPage', nextPage);
				if(nextPage > eleData.loaded){
					var sendData = {
							main 	:	MOBILE_PAGE.category.DATA.MAIN,
							sub 	:	MOBILE_PAGE.category.DATA.SUB,
							page	: 	nextPage,
					};
					
					MOBILE_PAGE.category.setCategoryContentsData(sendData);
				}
				*/
				
				
				/*
				if(isDefined(eleData.loaded)){
					if(eleData.loaded != 1 && eleData.spy == 1){
						console.log('spy new loaded');
						//MOBILE_PAGE.home.slickBindingCenterBanner();
						$scrollSpyEleBannerCenter.data('loaded', 1);
					}
				}
				*/
			});
			var scSpy  =  $scrollSpyEleCategoryPageEnd.scrollSpy();
			$scrollSpyEleCategoryPageEnd.data('spy', 1);
		}
		
	}
	
	//리스트로 이동
	//MOBILE_PAGE.category.goLastContentsFocus();
	
	
};



MOBILE_PAGE.category.pageInit = function(info, params){
	
	console.log('MOBILE_PAGE.category.pageInit');
	console.log('info', info);
	console.log('params', params);
	
	if(!params['!action']){
		console.log('no action');
		return;
	}
	
	var pageAction = params['!action'];
	if(isDefined(info.target) == false || isDefined(info.id) == false){
		console.log('empty target');
		return;
	}
	if(pageAction != info.id){
		console.log('dif id');
		return;
	}
	
	if(pageAction != 'category'){
		console.log('not category action');
		return;
	}
	
	var $targetEle = $('#'+info.target);
	var targetData = $targetEle.data(); 
	
	console.log('targetData', targetData);
	
	var isPageLoaded = false;
	var loadPage;
	var loadMain;
	if(isDefined(targetData.page) == true){
		loadPage = targetData.page;
	}
	if(isDefined(targetData.main)){
		loadMain = targetData.main;		
	}
	
	console.log('pageAction', pageAction);
	console.log('isPageLoaded', isPageLoaded);
	console.log('loadMain', loadMain);
	
	
	var page = 1;
	if(params['page'] && $.isNumeric(params['page'])){
		page = parseInt(params['page']);
	}
	
	var sub = 0;
	if(params['sub'] && $.isNumeric(params['sub'])){
		sub = parseInt(params['sub']);
	}
	console.log('sub', sub);
	
	//save default cache
	MOBILE_PAGE.category.DATA.MAIN	= params.main;
	
	//set sub category
	MOBILE_PAGE.category.setCategoryList(params.main, sub);
	
	var sendData = {
		main 	:	params.main,
		sub 	:	sub,
		page	: 	page,
	};
	console.log('sendData', sendData);
	var $innerEle = $(info.m_list);
	
	console.log('MOBILE_PAGE.category.DATA.LAST_HASH:', MOBILE_PAGE.category.DATA.LAST_HASH);
	console.log('MOBILE_COMMON.DATA.CONTAINER[info.deep].hash:', MOBILE_COMMON.DATA.CONTAINER[info.deep].hash);
	
	//MOBILE_COMMON.DATA.CONTAINER[showContainerInfo.deep].hash
	//call hash vs save page hash
	//if(MOBILE_PAGE.category.DATA.LAST_HASH == MOBILE_COMMON.DATA.CONTAINER[info.deep].hash){
	if(MOBILE_PAGE.category.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.category.setCategoryContentsData(sendData, $targetEle);
		}
		//리스트로 이동
		MOBILE_COMMON_FUN.goLastContentsFocus();
		
		return;
	} 
	console.log($innerEle.data());
	
	
	//카테고리가 다르면 리셋
	if(params.main != loadMain){
		MOBILE_PAGE.category.resetCategoryPageData();
	}
	
	
	if(params.main == loadMain && loadPage == 1 && params.sub == MOBILE_PAGE.category.DATA.SUB){
		console.log('loaded page & just show');
		
		//정보가 있는지 확인
		if($innerEle.data('loaded') == 1){
			console.log('has data');
			return;	
		}
		var listText = $innerEle.text();
		console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			MOBILE_PAGE.category.setCategoryContentsData(sendData, $targetEle);
		}
		
		return;
	}
	
	if(isDefined(params.main) == false){
		params.main = 11000;
	}
	
	
	console.log('sendData', sendData);
	
	
	MOBILE_PAGE.category.setCategoryContentsData(sendData, $targetEle);	
	
	
};

//설정 정보 리셋
MOBILE_PAGE.category.resetCategoryPageData = function(){
	console.log('MOBILE_PAGE.category.resetCategoryPageData');
	
	//sub category - sub_cate
	MOBILE_PAGE.category.DATA.SUB = 0;
	
	
	//성인 체크	
	$('input:checkbox[name="block_adult"]').attr("checked", false);
	$('input:checkbox[name="block_adult"]').prop("checked", false);
	
	//정렬순서
	if($('.mobile-category-sort-btn.s-S').hasClass('active') == false){
		$('.mobile-category-sort-btn.active').removeClass('active');
		$('.mobile-category-sort-btn.s-S').addClass('active');
	}
	var $categoryInfoFormEle = $('#mobileCatgoryFilterOption');
	if($categoryInfoFormEle.length > 0){
		$categoryInfoFormEle.find('input[name=sub_cate]').val('0');
		$categoryInfoFormEle.find('input[name=block_adult]').val('0');
		$categoryInfoFormEle.find('input[name=sort_type]').val('');
	}
};


//서브카테고리 세팅
MOBILE_PAGE.category.setCategoryList = function(mainCate, subCate){
	console.log('MOBILE_PAGE.category.setCategoryList', mainCate);	
	
	if(isDefined(mainCate) == false || $.isNumeric(mainCate) == false){
		console.log('main cate err');
		return;
	}
	
	if(isDefined(subCate) == false){
		subCate = 0;
	}
	
	var isCheckBlockAdultDomain = isAdDomain();
	var isCheckBlockAdultContents = DISK_MEMBER_FUN.isBlockAdultContents();
	if(mainCate == 21100){
		if(isCheckBlockAdultDomain == true || isCheckBlockAdultContents == true){
			return;
		}
	}
	
	
	var disk_category = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var subCategoryList = null;
	subCategoryList = disk_category.get_sub_cate_list(mainCate);
	console.log('subCategoryList', subCategoryList);
	if($.isArray(subCategoryList) == true && subCategoryList.length > 0){
		//subCategoryList.unshift('0');
		if($.inArray('0', subCategoryList) < 0){
			subCategoryList.unshift('0');
		}
	}
	
	var topSubCategoryHtml = [];
	for(var i =0; i < subCategoryList.length; i++){
		var cateKey = subCategoryList[i];
		topSubCategoryHtml.push(disk_category.getMobileTopSubCategoryMenuHtml(mainCate, cateKey));
	}
	
	
	if(mainCate > 0){
		//top-menu-category-list
		console.log('mainCate', mainCate);
		$('.top-main-category.active').removeClass('active');
		$('.top-main-category.cate-'+mainCate).addClass('active');
		
		
		
	}
	
	//active sub catename
	var cateName = disk_category.get_cate_name(subCate);
	console.log('subCate', subCate);
	console.log('cateName', cateName);
	if(subCate == 0){
		cateName = '카테고리 선택(전체)';
	}
	$('.mobile-category-selected-sub-cate-title').text(cateName);
	$('#mobileCatgoryFilterOption').find('input[name=sub_cate]').val(subCate);
	
	//console.log(topSubCategoryHtml);
	$('.mobile-top-sub-category-list-wrap').html(topSubCategoryHtml.join(''));
};




//서브 카테고리 선택(제목) 클릭
MOBILE_PAGE.category.onclickSubCateSelectArrow = function(thisEle){
	console.log('onclickSubCateSelectArrow');
	$(thisEle).parent('.cate_box').toggleClass('active');
};

//서브 카테고리 클릭
MOBILE_PAGE.category.onclickSubCateItem = function(thisEle){
	console.log('onclickSubCateItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	//$(thisEle).parent('.cate_box').toggleClass('active');
	var savedSubCate = $('#mobileCatgoryFilterOption').find('input[name=sub_cate]').val();
	if(eleData.sub == savedSubCate && MOBILE_PAGE.category.DATA.MAIN == eleData.main){
		console.log('same cate');
		$(thisEle).parents('.cate_box').toggleClass('active');
		return;
	}
	
	$('.'+eleData.target).text(eleData.name);
	$(thisEle).parents('.cate_box').toggleClass('active');
	
	location.hash = '#!action='+MOBILE_PAGE.category.DATA.ACTION_TYPE+'&main='+eleData.main+'&sub='+eleData.sub;
};

MOBILE_PAGE.category.onclickBlockAdult = function(thisEle){
	console.log('onclickBlockAdult');
	
	var savedBlockAdult = $('#mobileCatgoryFilterOption').find('input[name=block_adult]').val();
	console.log('savedBlockAdult', savedBlockAdult);
	
	var isChecked = 0;
	if($(thisEle).is(":checked") ==  true){
		isChecked = 1;
	}
	console.log('isChecked', isChecked);
	if(isChecked == savedBlockAdult){
		return;
	}
	$('#mobileCatgoryFilterOption').find('input[name=block_adult]').val(isChecked);
	
	var sendData = {
			main 	:	MOBILE_PAGE.category.DATA.MAIN,
			sub 	:	MOBILE_PAGE.category.DATA.SUB,
			page	: 	1,
	};
	console.log('sendData', sendData);
	MOBILE_PAGE.category.setCategoryContentsData(sendData);
};


MOBILE_PAGE.category.onclickChangeSortType = function(thisEle){
	console.log('onclickChangeSortType');
	
	var savedSortType = $('#mobileCatgoryFilterOption').find('input[name=sort_type]').val();
	console.log('savedSortType', savedSortType);
	
	var eleData = $(thisEle).data();
	if(isDefined(eleData.values) == false){
		return;
	}
	console.log('eleData', eleData);
	//mobile-category-sort-btn
	if(eleData.values == savedSortType){
		return;
	}
	
	//change active class
	$('.mobile-category-sort-btn.active').removeClass('active');
	$(thisEle).addClass('active');
	
	
	$('#mobileCatgoryFilterOption').find('input[name=sort_type]').val(eleData.values);
	
	var sendData = {
			main 	:	MOBILE_PAGE.category.DATA.MAIN,
			sub 	:	MOBILE_PAGE.category.DATA.SUB,
			page	: 	1,
	};
	console.log('sendData', sendData);
	
	
	
	//return;
	MOBILE_PAGE.category.setCategoryContentsData(sendData);
};


MOBILE_PAGE.category.setCategoryContentsData = function(getData, $targetEle){
	console.log('MOBILE_PAGE.best.setCategoryContentsData');
	console.log(getData);
	
	if(isDefined(getData) == false || isDefined(getData.main) == false){
		console.log('empty get data');
		return;
	}
	
	var sendData = {
		cate1	: getData.main,
		cate2	: getData.sub,
		page	: getData.page,
		limit	: 20,
		sort	: '',
		sort_type	: '',
		adult_block	: '',
	} 
	
	var savedBlockAdult = $('#mobileCatgoryFilterOption').find('input[name=block_adult]').val();
	if(isDefined(savedBlockAdult)){
		sendData.adult_block = parseInt(savedBlockAdult);
	}
	
	var savedSortType = $('#mobileCatgoryFilterOption').find('input[name=sort_type]').val();
	if(isDefined(savedSortType)){
		sendData.sort = savedSortType;
	}
	
	
	MOBILE_PAGE.category.getMobileCategoryContentsData(sendData, $targetEle);
	
};


MOBILE_PAGE.category.getMobileCategoryContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.category.getMobileCategoryContentsData', getData);
	
	var sendData = {
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		page		: 1,
		is_mobile	: 1			//is mobile
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = $('#mobile-container-deep-1');
	}
	
	if(isDefined(getData)){
		if(isDefined(getData.cate1)){ sendData.m = getData.cate1;}
		if(isDefined(getData.cate2)){ sendData.s = getData.cate2; }
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort'])){ sendData.sk = getData.sort; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['adult_block'])){ sendData.ba = getData.adult_block; }
	}
	

	console.log('sendData', sendData);
	var successFunMobileGetCategoryContentsList = function(data){
		console.log('successFunMobileGetCategoryContentsList', data);
		//premium list
		var bbsListHtml = [];
		var bbsPremiumListHtml = [];
		var tc = 0;
		/*
		if(isDefined(data.page) && $.isNumeric(data.page)){
			tc = parseInt(data.page) * 100;
		}
		*/
		//서버 버전 체크
		if(isDefined(data.client_ver)){
			MOBILE_COMMON.checkClientVer(data.client_ver);	
		}
		
		
		
		//성인인증 여부
		var isAdultMember =utility.disk.checkIsAdultMember();
		console.log('isAdultMember', isAdultMember);
			
		//premium list
		var $premiumInnerHtmlTarget = $infoEle.find('.mobile-category-premium-contents-list-wrap');
		if(isDefined(data.premium_category_list)){
			var premiumBbsListHtml = [];
			var premiumBbsListData = data.premium_category_list;
			var premiumDiskBbs = null;
			var premiumHtml = null;
			
			for(var k =0; k < premiumBbsListData.length; k++){
				premiumDiskBbs = new Contents_list(tc+1, 0, 'premium');
				premiumDiskBbs.is_adult_member = isAdultMember;
				premiumDiskBbs.setData(premiumBbsListData[k]);
				
				//console.log(premiumDiskBbs);
				premiumHtml = premiumDiskBbs.getMobileCategoryListHtml(false, 'premium');
				if(data.page == 1){
					premiumBbsListHtml[k] = premiumHtml;
				}else{
					bbsListHtml[tc] = premiumHtml;
				}
				tc++;
			}
				
			
			if(premiumBbsListHtml.length > 0){
				$('.content_50_list.premium').show();
				$premiumInnerHtmlTarget.html(premiumBbsListHtml.join('')).show();
			}else{
				$premiumInnerHtmlTarget.hide();
				$('.content_50_list.premium').hide();
			}
		}else{
			$('.content_50_list.premium').hide();
			$premiumInnerHtmlTarget.hide();
		}
		
		if(isDefined(data.category_data)){
			var $innerHtmlTarget = $infoEle.find('.mobile-category-contents-list-wrap');
			
			var bbsListData = data.category_data.bbs_list_data;
			var bbsListCount = bbsListData.list.length;
			var diskBbs = null;
			for(var i =0; i < bbsListCount; i++){
				diskBbs = new Contents_list(tc+1, 0, 'category');
				diskBbs.is_adult_member = isAdultMember;
				diskBbs.setData(bbsListData.list[i]);
				//console.log(diskBbs);
				bbsListHtml[tc] = diskBbs.getMobileCategoryListHtml(false, 'category');
				tc++;
			}
			if(data.page == 1){
				$innerHtmlTarget.html(bbsListHtml.join(''));	
			}else{
				$innerHtmlTarget.append(bbsListHtml.join(''));
			}
			
			
			//정보 업데이트
			var updateData = sendData;
			updateData.loaded = 1;
			updateData.main = data.ranking_category;
			if(bbsListData.page == 1){
				if(isDefined(bbsListData.page)){
					updateData['page'] = bbsListData.page;	
				}
				if(isDefined(bbsListData.total_count)){
					updateData['total_count'] = bbsListData.total_count;	
				}
				if(isDefined(bbsListData.total_page)){
					updateData['total_page'] = bbsListData.total_page;	
				}
				if(isDefined(bbsListData.limit)){
					updateData['limit'] = bbsListData.limit;	
				}
				//GO_TOP();
			}
			
			
			$innerHtmlTarget.data(updateData);
			$infoEle.data({page:data.page, main:data.main});
			
			//save cache
			if(isDefined(data.main)){
				MOBILE_PAGE.category.DATA.MAIN	= data.main;
			}
			if(isDefined(data.sub)){
				MOBILE_PAGE.category.DATA.SUB	= data.sub;
			}
			
			//save paging
			if(bbsListCount > 0){
				updateData.loaded = data.page;
				$('#category-page-end-spy').data(updateData);
			}else{
				$('#category-page-end-spy').data({page :data.page,loaded : data.page, total_page:data.page}).removeClass('loading').addClass('ending');
				
			}
			
			
			//save last call hash
			console.log('save location.hash', location.hash);
			MOBILE_PAGE.category.DATA.LAST_HASH = location.hash;
			
			//after binding
			MOBILE_PAGE.category.dataAfterBinding($innerHtmlTarget, data.category_data.bbs_list_data);
			
		}
		
		//top onpick list
		if(isDefined(data.on_pick_contents)){
			
			var rankList = data.on_pick_contents.rank_list;
			var selectedRankList, selectedRankName, selectedRankCode;
			for(var i in rankList){
				console.log('i', i)
				console.log(rankList[i]); 
				if(rankList[i].rank_list.length > 0){
					selectedRankCode = i;
					selectedRankList = rankList[i].rank_list;
					selectedRankName = rankList[i].tab_title;
					break;
				}
			}
			
			console.log('selectedRankCode', selectedRankCode);
			console.log('selectedRankName', selectedRankName);
			console.log('selectedRankList', selectedRankList);
			
			var onpickHtml;
			if(isDefined(selectedRankCode) == true && isDefined(selectedRankName) == true  && isDefined(selectedRankList) == true ){
				onpickHtml = MOBILE_TEMPLETE.PAGE.categoryTopOnpickContenstsHtml(selectedRankList, selectedRankName, selectedRankCode, data.on_pick_contents.onpick_type)	
			}
			//console.log(onpickHtml);
			if(isDefined(onpickHtml)){
				$('.mobile-category-top-onpick-list').html(onpickHtml).show();
			}
		}else{
			//banner
			if(isDefined(data.on_pick_banner) == true){
				$('.mobile-category-top-onpick-list').html(data.on_pick_banner.html);
			}else{
				$('.mobile-category-top-onpick-list').hide();	
			}
			
				
		}
		//image lazy
		MOBILE_COMMON.setImageLazy();
	};
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CATEGORY.CONTENTS_LIST,
		data		: formData,
		success_fun	: successFunMobileGetCategoryContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
};

