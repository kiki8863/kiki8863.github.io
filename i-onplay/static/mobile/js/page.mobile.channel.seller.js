/*
*	channel - seller
*/
//alert('channel movie');



MOBILE_PAGE.channel = {};
MOBILE_PAGE.channel.DATA = {
	MAIN		: null,
	SUB			: null,
	SEARCH		: null,
	FILTER		: null,
	LAST_HASH	: null,
	SELECT_MOVIE	: null, 		//마지막 클릭 영화채널
	ELE	: {
		c_list	 	: '.mobile-channel-seller-list-wrap',
		info		: '.channel-seller-page-end-spy',
		seller		: '.channel-seller-info-card',
		search_form	: '#mobileChannelSellerContentsSearchForm'
		
	},
	SELLER		:
	{
		IDX		: null,
		NICK	: null,
	},
	ACTION_TYPE : null,
	LOADED_PAGE : null,
	
	
};

MOBILE_PAGE.channel.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.channel.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.channel.init(showContainerInfo, hashPrams);
	
}

MOBILE_PAGE.channel.defaultBinding = function(){
	console.log('MOBILE_PAGE.channel.defaultBinding');	
	//MOBILE_PAGE.channel.defaultBinding();
	//MOBILE_COMMON.CHANNEL.searchBinding();
	
	
	//채널 검색 form 바인딩
	var $channelSellerSearchFormEle = $(MOBILE_PAGE.channel.DATA.ELE.search_form);
	if($channelSellerSearchFormEle.length > 0){
		$channelSellerSearchFormEle.unbind( "submit");
		$channelSellerSearchFormEle.bind('submit', function(event){
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData:',formData);
			
			if(isDefined(formData.k) == false || formData.k.length < 2){
				$channelSellerSearchFormEle.find('input[name=k]').blur();
				disk_alert('검색하실 콘텐츠 제목이나 출연자 이름을 2자 이상 입력해주세요.');
				return false;
			}
			
			if(isDefined(formData.seller) == false){
				$channelSellerSearchFormEle.find('input[name=k]').blur();
				disk_alert('판매채널 정보가 올바르지 않습니다.');
				return false;
			}
			
			//location.hash = '#!action=theme&k='+encodeURIComponent(formData.k);
			MOBILE_PAGE.channel.setChannelSellerPage(1);	
			return false;
		});
	}
	
};


//마지막 선택 영화채널로 이동
MOBILE_PAGE.channel.setLastClickSellerContentsFocus = function(){
	console.log('MOBILE_PAGE.channel.setLastClickSellerContentsFocus');	
	
	MOBILE_COMMON_FUN.goLastContentsFocus();

};
		
		
MOBILE_PAGE.channel.init = function(info, params){
	console.log('MOBILE_PAGE.channel.init');	
	console.log(params);
	
	MOBILE_PAGE.channel.defaultBinding();
	
	
	console.log('MOBILE_PAGE.channel.DATA.LAST_HASH', MOBILE_PAGE.channel.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	
	
	var actionType, searchKeyword, actionMain, sellerIdx, sellerNick, mainType, subType, selectedCategory;
	if(isDefined(params) == true && $.isPlainObject(params)){
		actionType = params['!action'];
		searchKeyword = params['k'];
		sellerIdx = params['idx'];
		sellerNick = params['nick'];
		mainType = params['main'];
		
	}
	
	/*
	var actionType = params['!action'];
	var searchKeyword = params['k'];
	var actionMain = '';
	var mainType = params['main'];
	var subType	= params['sub'];
	*/
	if(actionType != 'channel'){
		console.log('action type err');
		return;
	}

	if(isDefined(searchKeyword) == true && $.type(searchKeyword) === "string"){
		//MOBILE_COMMON.CHANNEL.goChannelSearch(searchKeyword);
		//return;
		MOBILE_PAGE.channel.DATA.SEARCH = searchKeyword;
		$(MOBILE_PAGE.channel.DATA.ELE.search_form).find('input[name=k]').val(searchKeyword);
	}else{
		$(MOBILE_PAGE.channel.DATA.ELE.search_form).find('input[name=k]').val('');
	}
	
	
	
	
	console.log('sellerIdx', sellerIdx);
	console.log('sellerNick', sellerNick);
	console.log('mainType', mainType);
	
	if(isDefined(sellerIdx) == false && isDefined(sellerNick) == false){
		disk_alert('채널 정보가 없습니다.', GO_HOME);
		return;
	}
	
	//seler idx
	if(isDefined(sellerIdx)== true && $.isNumeric(sellerIdx) == true){
		MOBILE_PAGE.channel.DATA.SELLER.IDX = sellerIdx;
		$(MOBILE_PAGE.channel.DATA.ELE.search_form).find('input[name=seller]').val(sellerIdx);
		$(MOBILE_PAGE.channel.DATA.ELE.info).data('seller', sellerIdx);
	}
	//seller nickname
	if(isDefined(sellerNick)== true && $.type(sellerNick) === "string"){
		MOBILE_PAGE.channel.DATA.SELLER.NICK = sellerNick;
		$('.mobile-top-header-tit-txt').text(sellerNick+'님의 채널');
		$(MOBILE_PAGE.channel.DATA.ELE.info).data('nick', sellerNick);
	}
	 
	//selected category
	if(isDefined(mainType) == true, $.isNumeric(mainType)){
		selectedCategory = mainType;
		MOBILE_PAGE.channel.DATA.MAIN = selectedCategory;
	}
	
	
	var $innerEle = $(info.m_list);
	if($innerEle.length < 1){
		$innerEle = $(MOBILE_PAGE.channel.DATA.ELE.c_list);
	}
	console.log($innerEle);
	
	var startPage = 1;
	if(MOBILE_PAGE.channel.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		var listText = $innerEle.text();
		//console.log('listText'+listText);
		if(isDefined(listText) == false || listText.length < 100){
			console.log('empty category list');
			MOBILE_PAGE.channel.setChannelSellerPage(startPage, selectedCategory);	
		}
		
		MOBILE_PAGE.channel.setLastClickSellerContentsFocus();
		return;
	}
	
	MOBILE_PAGE.channel.DATA.SELECT_ANI = null;
	MOBILE_PAGE.channel.setChannelSellerPage(startPage, selectedCategory);	
	
};


//데이타 로딩 후 바인딩
MOBILE_PAGE.channel.dataAfterBinding = function(){
	console.log('MOBILE_PAGE.channel.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};







MOBILE_PAGE.channel.setChannelSellerPage = function(nextPage, selectedCategory){
	console.log('MOBILE_PAGE.channel.setChannelSellerPage:',nextPage);
	console.log('selectedCategory', selectedCategory);	
	//console.log('loadedPage', loadedPage);
	/*
	if(isDefined(nextPage) == fasle){
		nextPage = 1;
	}
	*/
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	var $infoEle = $(MOBILE_PAGE.channel.DATA.ELE.info);
	if($infoEle.length < 0){
		console.log('info length err');
		return;
	}
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	
	var loadPage = 0;
    if(isDefined(infoEleData.load) == true){
    	loadPage = parseInt(infoEleData.load);
    }
 	
 	var sellerIdx = null;
 	if(isDefined(infoEleData.seller) == true){
    	sellerIdx = parseInt(infoEleData.seller);
    }
    if(isDefined(sellerIdx) == false){
    	sellerIdx = parseInt(MOBILE_PAGE.channel.DATA.SELLER.IDX);
    }
    if($.isArray(sellerIdx) == false){
		sellerIdx = null;
	}
	
	
	var sellerNick = null;
 	if(isDefined(infoEleData.nick) == true){
    	sellerNick = infoEleData.nick;
    }
    if(isDefined(sellerNick) == false){
    	sellerNick = MOBILE_PAGE.channel.DATA.SELLER.NICK;
    }
    
    if(isDefined(sellerIdx) == false && isDefined(sellerNick) == false){
    	disk_alert('채널 정보를 확인할 수 없습니다.');
    	return;
    }
 	
 	var sendData = {
 		page 	:	nextPage,
 		cate1	:	null,
 		cate2	: 	null,
 		limit	: 	20,
 		sort	: 	null,
 		sort_type	:	'D',
 		adult_block	: 0,
 		search_keyword	: null,
 		search_force_category	: null,
 		seller	: sellerIdx,
 		nick	: sellerNick,
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
		
		if(isDefined(infoEleData.seller)){
			if(isDefined(sendData.seller) == false){
				sellerIdx = infoEleData.seller;
				sendData.seller = infoEleData.seller;
			}
		}
		
	}
	
	//cate1
	if(isDefined(selectedCategory) == true && $.isNumeric(selectedCategory) == true && selectedCategory > 0){
		sendData.cate1 = parseInt(selectedCategory);
	}
	
	//search keyword
	var searchKeyword = $(MOBILE_PAGE.channel.DATA.ELE.search_form).find('input[name=k]').val();
	if(isDefined(searchKeyword) == true && searchKeyword != '' && searchKeyword.length > 1){
		sendData.search_keyword = searchKeyword;
	}
	if(isDefined(searchKeyword) == false){
		if(isDefined(infoEleData)){
			if(isDefined(infoEleData.k)){
				sendData.k = infoEleData.k;	
			}
		}
	}
	
	console.log('sendData', sendData);
	MOBILE_PAGE.channel.getCategoryContentsData(sendData, $infoEle);
	return;

};


//get getCategoryContentsData
MOBILE_PAGE.channel.getCategoryContentsData = function(getData, $infoEle){
	console.log('MOBILE_PAGE.channel.getCategoryContentsData', getData);
	
	var sendData = {
		m			: '',		//cate1
		s			: '',		//cate2
		l			: '',		//limit
		sk			: '',		//sort
		st			: '',		//desc
		ba			: '',		//block adult 
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 1,		//is mobile
		k			: '',		//search keyword
		fc			: '',		//force category
		seller		: '',		//force category
		nick		: ''
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = $(MOBILE_PAGE.channel.DATA.ELE.info);
	}
	if(isDefined($infoEle) == false || $infoEle.length < 1){
		console.log('info ele err');
		return;
	}
	
	var eleData = $infoEle.data();
	
	if(isDefined(getData)){
		if(isDefined(getData.cate1)){ sendData.m = getData.cate1;}
		if(isDefined(getData.cate2)){ sendData.s = getData.cate2; }
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['sort'])){ sendData.sk = getData.sort; }
		if(isDefined(getData['sort_type'])){ sendData.st = getData.sort_type; }
		if(isDefined(getData['adult_block'])){ sendData.ba = getData.adult_block; }
		if(isDefined(getData['is_thumb'])){ sendData.it = getData.is_thumb;}
		if(isDefined(getData['seller'])){ sendData.seller = getData.seller;}
		if(isDefined(getData['nick'])){ sendData.nick = getData.nick;}
		if(isDefined(getData['search_keyword'])){ sendData.k = getData.search_keyword;}
		if(isDefined(getData['searchForceCategory'])){ sendData.fc = getData.searchForceCategory;}
	}
	
	if($.isNumeric( sendData.m) == false){
		sendData.m = '';
	}
	
	if(isDefined(sendData.seller) == false && isDefined(sendData.nick) == false){
		alert('채널 정보를 확인할 수 없습니다.');
    	return;
	}
	
	//마지막에 도달한 경우 처리
	var pageEndingFun = function(endPage){
		$infoEle.data({page :endPage,loaded : endPage, total_page:endPage}).removeClass('loading').addClass('ending');
	};
	
	console.log('sendData', sendData);
	var successFunGetCategoryContentsList = function(data){
			console.log('successFunGetCategoryContentsList', data);
			//console.log('eleData', eleData);
			
			//판매자 정보
			var $sellerInfoEle = $(MOBILE_PAGE.channel.DATA.ELE.seller);
			if(isDefined(data.channel_seller) && $sellerInfoEle.length > 0){
				$sellerInfoEle.html(MOBILE_TEMPLETE.PAGE.getChannelSellerInfoCardHtml(data.channel_seller));
			}
			
			var selectedCategory= 0;
			if(isDefined(data.selected_category)){
				selectedCategory = data.selected_category;
			}
			
			var contentsAction = 'category';
			if(isDefined(data.contents_action)){
				contentsAction = data.contents_action;
				
			}
			
			var searchKeyword = '';
			var linkType = 'channel';
			if(isDefined(data.search_keyword) == true){
				searchKeyword =  data.search_keyword;
				linkType = 'seller-search';
				MOBILE_PAGE.channel.DATA.SEARCH = data.search_keyword;
			}
			//MOBILE_PAGE.channel.setPagination(selectedCategory, contentsAction);
			
			//성인인증 여부
			var isAdultMember =utility.disk.checkIsAdultMember();
			console.log('isAdultMember', isAdultMember);
			
			var $innerTargetEle = $(MOBILE_PAGE.channel.DATA.ELE.c_list);
			if(isDefined(data.contents_data) && $innerTargetEle.length > 0){
				
				//html 파싱				
				//MOBILE_PAGE.channel.setCategoryListHtml(thumbType, data.contents_data);
				var bbsListData = data.contents_data.bbs_list_data;
				var curPage = bbsListData.page;
				var bbsListHtml = [];
				var diskBbs = null;
				var lCnt = 0;
				var pageLimit = parseInt(bbsListData.limit);
				for(var i =0; i < bbsListData.list.length; i++){
					diskBbs = new Contents_list(i+1, 0, 'channel');
					diskBbs.is_adult_member = isAdultMember;
					diskBbs.setData(bbsListData.list[i]);
					//console.log(diskBbs);
					bbsListHtml[i] = diskBbs.getMobileCategoryListHtml(false, linkType);
					lCnt++;
				}
				//innerContentsHtml = bbsListHtml.join('');
				if(curPage == 1){
					$innerTargetEle.html(bbsListHtml.join(''));
				}else{
					$innerTargetEle.append(bbsListHtml.join(''));	
				}
				
				
				
				//data-seller="" data-nick="" data-main="" data-sub="" data-k="" data-cate1="0" data-cate2="" data-limit="20" data-page="0" data-load="0"
				
				//console.log('rankListHtml', rankListHtml);
				var cate1 = selectedCategory;
				var reSavePageData =
				{
					cate1		:	parseInt(data.selected_category),
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(bbsListData.limit),
					seller		:	parseInt(data.seller_idx),
					main		: 	parseInt(data.selected_category),
					k			: '',
					
				};
				
				if(isDefined(data.search_keyword)){
					reSavePageData.k = data.search_keyword;
				}
				
				if(isDefined(searchKeyword)){
					reSavePageData.k = searchKeyword;
				}
				
				//save cache - seller idx
				if(isDefined(reSavePageData) == true && $.isNumeric(reSavePageData.seller)){
					$(MOBILE_PAGE.channel.DATA.ELE.search_form).find('input[name=seller]').val(reSavePageData.seller);
					MOBILE_PAGE.channel.DATA.SELLER.IDX = reSavePageData.seller;
				}
				
				//save cache - seller nick
				if(isDefined(data.seller_nick)){
					var sellerNickname = data.seller_nick;
					reSavePageData.nick = sellerNickname;
					//reSavePageData.sub = sellerNickname;
					//MOBILE_PAGE.channel.DATA.SUB = sellerNickname;
					MOBILE_PAGE.channel.DATA.SELLER.NICK = sellerNickname;
					$('.mobile-top-header-tit-txt').text(sellerNickname+'님의 채널');
				}
				
				//save cache
				MOBILE_PAGE.channel.DATA.MAIN = data.selected_category;
				MOBILE_PAGE.channel.DATA.ACTION_TYPE = contentsAction;
				MOBILE_PAGE.channel.DATA.LOADED_PAGE = curPage;
				
				
				
				//save paging
				if(lCnt > 0){
					//페이지 끝
					if(bbsListData.list.length < pageLimit){
						pageEndingFun(curPage);
					}else{
						reSavePageData.loaded = curPage;
						reSavePageData.total_page = curPage + 1;
						$infoEle.data(reSavePageData).addClass('loading').removeClass('ending');	
					}
				}else{
					pageEndingFun(curPage);
				}
				console.log('reSavePageData', reSavePageData);
				
				console.log('$infoEle data', $infoEle.data());
				
				//selected category
				MOBILE_PAGE.channel.setSelectedSellerChannelCategory(selectedCategory);
			
			}
			
			
			
			//save hash
			MOBILE_PAGE.channel.DATA.LAST_HASH = location.hash;
			MOBILE_PAGE.channel.dataAfterBinding();
		
			return;
		};
		
	var formData = sendData;
	
	console.log('~~~~~~~~~~~~formData~~~~~~~~');
	console.log('formData', formData);
	//return;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHANNEL.SELLER_CONTENTS_LIST,
		data		: formData,
		success_fun	: successFunGetCategoryContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//판매자 채널 : 태그 active
MOBILE_PAGE.channel.setSelectedSellerChannelCategory = function(selectedCategory){
	
	console.log('MOBILE_PAGE.channel.setSelectedSellerChannelCategory', selectedCategory);
	var $sellerInfoEle = $(MOBILE_PAGE.channel.DATA.ELE.seller);
	if($sellerInfoEle.length < 1 || isDefined(selectedCategory) == false){
		return;
	}
	$sellerInfoEle.find('.seller-category-tag.active').removeClass('active');
	//active tags
	var cate1 = 0;
	if(isDefined(selectedCategory) == true){
		if(selectedCategory > 0){
			cate1 = selectedCategory;
		}
	}
	$sellerInfoEle.find('.seller-category-tag.tags-'+cate1).addClass('active');
};

//판매자 채널 더보기 클릭
MOBILE_PAGE.channel.onclickMoreMobileSeller = function(thisEle){
	console.log('MOBILE_PAGE.ani.onclickMoreMobileAni');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	//return;
	
	var loadedPage = 1;
	var totalPage = 1;
	if(isDefined(eleData.page)){
		loadedPage = parseInt(eleData.page);
	}
	if(isDefined(eleData.total_page)){
		var totalPage = parseInt(eleData.total_page);
	}
	var nextPage = loadedPage + 1;
	if(nextPage > totalPage){
		console.log('max page');
		$(thisEle).data({page :loadedPage,loaded : loadedPage, total_page:loadedPage}).removeClass('loading').addClass('ending');
		return;
	}
	MOBILE_PAGE.channel.setChannelSellerPage(nextPage);
};

