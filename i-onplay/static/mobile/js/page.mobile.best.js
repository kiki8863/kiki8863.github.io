/*
* mobile page best js
*/


MOBILE_PAGE.best = {};
MOBILE_PAGE.best.DATA ={
	ACTION_TYPE : 'best',
	MAIN		: 30200,
	SUB			: 0,
	
};


MOBILE_PAGE.best.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.best.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	
	MOBILE_PAGE.best.defaultBinding();
	MOBILE_PAGE.best.pageInit(showContainerInfo, hashPrams);
	
};



MOBILE_PAGE.best.defaultBinding = function(){
	
	console.log('MOBILE_PAGE.best.defaultBinding');
	
	//select category active
	//top-main-category
};


MOBILE_PAGE.best.afterDataLoadBinding = function(){
	
	console.log('MOBILE_PAGE.best.afterDataLoadBinding');
	
	MOBILE_COMMON.afterLoadCommonBinding();
	
};
MOBILE_PAGE.best.pageInit = function(showContainerInfo, hashPrams){
	console.log('MOBILE_PAGE.best.pageInit');
		
	var mainCate = MOBILE_PAGE.best.DATA.MAIN;
	$('.top-main-category.active').removeClass('active');
	$('.top-main-category.cate-'+mainCate).addClass('active');
	/*
	if(MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY){
		MOBILE_COMMON.DATA.SCROLLER.TOP_CATEGORY.scrollTo(0,0);
	}
	*/
	
	
	
	MOBILE_PAGE.best.setPageHashChecker(showContainerInfo, hashPrams);
	
};

//인기 서브 카테고리
MOBILE_PAGE.best.setSubCategoryList = function(selectedCategory){

	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var isCheckBlockAdultDomain = isAdDomain();
	var isCheckBlockAdultContents = DISK_MEMBER_FUN.isBlockAdultContents();
	
	var bestCategoryList = diskCategory.show_mobile_best_sub_category_list;
	var bestCategoryHtml = [];
	for(var i =0; i < bestCategoryList.length; i++){
		var cateKey = bestCategoryList[i];
		if(cateKey == 21100){
			if(isCheckBlockAdultDomain == true || isCheckBlockAdultContents == true){
				continue;
			}
		}
		bestCategoryHtml.push(diskCategory.getMobileTopBestSubCategoryMenuHtml(MOBILE_PAGE.best.DATA.ACTION_TYPE, cateKey, selectedCategory));
	}
	console.log(bestCategoryHtml);
	$('.mobile-top-best-select-sub-cate-list').html(bestCategoryHtml.join(''));
	
	//topCategoryHtml
}

//서브 카테고리 선택(제목) 클릭
MOBILE_PAGE.best.onclickBestMainCateSelectArrow = function(thisEle){
	console.log('onclickBestMainCateSelectArrow');
	$(thisEle).parent('.cate_box').toggleClass('active');
};

//서브 카테고리 클릭
MOBILE_PAGE.best.onclickSubCateItem = function(thisEle){
	console.log('onclickSubCateItem');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	//$(thisEle).parent('.cate_box').toggleClass('active');
	//var savedSubCate = $('#mobileCatgoryFilterOption').find('input[name=sub_cate]').val();
	if(eleData.sub == MOBILE_PAGE.category.DATA.SUB && MOBILE_PAGE.category.DATA.MAIN == eleData.main){
		console.log('same cate');
		$(thisEle).parents('.cate_box').toggleClass('active');
		return;
	}
	
	$('.'+eleData.target).text(eleData.name);
	$(thisEle).parents('.cate_box').toggleClass('active');
	
	location.hash = '#!action='+MOBILE_PAGE.best.DATA.ACTION_TYPE+'&main='+eleData.sub;
};


MOBILE_PAGE.best.setPageHashChecker = function(info, params){
	
	console.log('MOBILE_PAGE.best.setPageHashChecker');
	console.log('info', info);
	
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
	
	var sendData = {
		main 	:	params.main,
		page	: 1,
	};
	
	//set sub category
	MOBILE_PAGE.best.setSubCategoryList(params.main);
	
	if(params.main == loadMain && loadPage == 1){
		console.log('loaded page & just show');
		var $innerEle = $(info.m_list);
		//정보가 있는지 확인
		if($innerEle.data('loaded') == 1){
			console.log('has data');
			return;	
		}
		var listText = $innerEle.text();
		console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			MOBILE_PAGE.best.getRankCategoryContentsData(sendData, $targetEle);
		}
		return;
	}
	
	if(isDefined(params.main) == false){
		params.main = 0;
	}
	
	
	console.log('sendData', sendData);
	
	if(pageAction == 'best'){
		MOBILE_PAGE.best.getRankCategoryContentsData(sendData, $targetEle);	
	}
	
	
};




//랭크 데이타 불러오기
MOBILE_PAGE.best.getRankCategoryContentsData = function(getData, $infoEle){
	console.log('PAGE_CATEGORY.getRankCategoryContentsData', getData);
	
	var sendData = {
		m			: '',		//cate1
		page		: 1,
		is_mobile	: 1			//is mobile
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = $('#mobile-container-deep-1');
	}
	
	
	
	if(isDefined(getData)){
		if(isDefined(getData.main)){ sendData.m = getData.main;}
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
	}
	console.log('sendData', sendData);
	//성인인증 여부
	var isAdultMember =utility.disk.checkIsAdultMember();
	console.log('isAdultMember', isAdultMember);
	
	var successFunGetCategoryRankingContentsList = function(data){
		console.log('successFunGetCategoryRankingContentsList', data);
		if(isDefined(data.ranking_data)){
			var $innerHtmlTarget = $infoEle.find('.mobile-best-contents-list-wrap');
			var bbsListHtml = [];
			var bbsListData = data.ranking_data;
			var diskBbs = null;
			for(var i =0; i < bbsListData.length; i++){
				/*
				diskBbs = new Contents_list(i+1, 0, 'category');
				diskBbs.setData(bbsListData[i]);
				//console.log(diskBbs);
				bbsListHtml[i] = diskBbs.getMobileRankingCantegoryListHtml();
				*/
				bbsListHtml[i] = MOBILE_TEMPLETE.CONTENTS_LIST.getMobileRankingContentsListHtml(bbsListData[i], i, isAdultMember);
			}
			
			$innerHtmlTarget.html(bbsListHtml.join('')).data('loaded', 1);
			
			//정보 업데이트
			$infoEle.data({page:data.ranking_page, main:data.ranking_category});
			
			//image lazy
			//MOBILE_COMMON.setImageLazy();
			
			MOBILE_PAGE.best.afterDataLoadBinding();
			
		}
		
		
			
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CATEGORY.CONTENTS_BEST_LIST,
		data		: formData,
		success_fun	: successFunGetCategoryRankingContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
};

