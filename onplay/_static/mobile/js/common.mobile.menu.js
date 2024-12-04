/*
*
*/
MOBILE_MENU = {};

MOBILE_MENU.DATA = {
	HOME	:	'#!action=home',
};


//상단 탑 카테고리 클릭
MOBILE_MENU.onclickTopCategory = function(cateKey)
{
	console.log('MOBILE_MENU.onclickTopCategory', cateKey);
	//GO_TOP();
	//top-menu-category-list-gnb
	//utility.ui.goToElement('#top-menu-category-list-gnb',4000);
	//$( '#mobile-container-deep-1' ).animate( { scrollTop : 400 }, 400 );

	var $mobileCommonHeader = $('.mobile-common-header');	//common header ele
	var headerEleHeight = 66;										//로고 높이
	if($mobileCommonHeader.find('.h_top').length > 0){
		headerEleHeight = $mobileCommonHeader.find('.h_top').outerHeight();
	}
	headerEleHeight = parseInt(headerEleHeight) + 2;
	console.log('onclickTopCategory-headerEleHeight', headerEleHeight);
	if($mobileCommonHeader.length > 0){
		if($mobileCommonHeader.hasClass('menu')){
			$("html, body").animate({ scrollTop: headerEleHeight }, "fast");
		}else{
			$mobileCommonHeader.removeClass('fixed menu');
			//$("html, body").animate({ scrollTop: 0 }, "fast");
			GO_TOP();
		}
	}

	//특수 카테고리
	if($.isNumeric(cateKey) && cateKey > 30000){
		GO_TOP_SP_CATEGORY(cateKey, 0);
		return;
	}
	GO_CATEGORY(cateKey);
	return;

};


//link herf로 이동하는 메뉴인지
var isHerfLinkAction = function(actionType){

	return false;
};


var setLoginRedirectUrl = function(targetAction){
	console.log('setLoginRedirectUrl', location.hash);
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	var actionId = null;
	if(hashPrams['!action']){
		actionId = hashPrams['!action'];
	}
	//예외
	if(actionId == 'service'){
		actionId = 'home';
	}

	if(isDefined(targetAction)){
		if(targetAction == 'service'){
			targetAction = 'home';
		}
		MOBILE_COMMON.DATA.HASH.LOGIN = "#!action="+targetAction;
	}else{
		if($.inArray(actionId, MOBILE_CONTAINER.NO_CACHE_CONTAINER_LOGIN) < 0){
			MOBILE_COMMON.DATA.HASH.LOGIN = location.hash;
		}else{
			if(isDefined(MOBILE_COMMON.DATA.HASH.LAST)){
				MOBILE_COMMON.DATA.HASH.LOGIN = MOBILE_COMMON.DATA.HASH.LAST;
			}else if(isDefined(MOBILE_COMMON.DATA.HASH.BACK)){
				MOBILE_COMMON.DATA.HASH.LOGIN = MOBILE_COMMON.DATA.HASH.BACK;
			}
		}
	}

	console.log('MOBILE_COMMON.DATA.HASH.LOGIN', MOBILE_COMMON.DATA.HASH.LOGIN);

	return true;
};


//메뉴 이동 함수
var GO_MENU = function(actionType, cateMain, cateSub, sPage,  menuOpt){
	console.log('GO_MENU');
	console.log('cateMain', cateMain);
	console.log('cateSub', cateSub);
	console.log('menuOpt', menuOpt);

	//로그인 체크 action

	//로그인해야 접근 가능한 경우

	//로그인 했으면 접근 불가능 한 경우




	if(isDefined(actionType) == false){
		return;
	}
	if(isDefined(cateMain) == false){
		cateMain = '';
	}

	if(isDefined(cateSub) == false){
		cateSub = '';
	}

	if(isHerfLinkAction(actionType)){
		console.log('action href');
		return;
	}

	if(actionType == 'movie_channel'){
		actionType ='movie';
	}else if(actionType == 'movie_latest'){ //최신영화
		actionType ='movie';
		cateSub  = 'A';
	}else if(actionType == 'movie_pink'){ //최신영화
		actionType ='movie';
		cateSub  = 'P';
	}else if(actionType == 'broadcast_channel'){
		actionType ='broadcast';
	}else if(actionType == 'ani_channel'){
		actionType ='ani';
	}else if(actionType == 'request_board'){
		actionType ='request_list';
	}else if(actionType == 'login'){
		GO_LOGIN();
		return;
	}else if(actionType == 'toptoon'){
		GO_TOPTOON();
		return;
	}else if(actionType == 'webnovel'){
		GO_WEBNOVEL();
		return;
	}else if(actionType == 'real_name'){
		openType = 'my_info';
		location.href = '/mobile.php/adult/mobile/?authType=phone&open_page='+openType+'&user_email=';
		return;
	}
	

	var hashUrl = '#!action='+actionType;
	if(isDefined(cateMain) == true){
		hashUrl += '&main='+cateMain;
	}
	if(isDefined(cateSub) == true){
		hashUrl += '&sub='+cateSub;
	}
	if(isDefined(sPage) == true){
		hashUrl += '&page='+sPage;
	}

	if(actionType == 'home'){
		var hashUrl = MOBILE_MENU.DATA.HOME;;
	}

	if(actionType != 'category'){
		//GO_TOP();
	}
	console.log('hashUrl', hashUrl);
	location.hash = hashUrl;
};

//로그인 회원 메뉴
var GO_MEMBER_MENU = function(actionType){
	console.log('GO_MEMBER_MENU');
	if(isDefined(actionType) == false){
		console.log('actionType err');
	}

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN(actionType);
		return;
	}

	GO_MENU(actionType);
};




//카테고리 이동 메뉴
var GO_CATEGORY = function(cateMain, cateSub){
	console.log('GO_CATEGORY', cateMain);

	if(isDefined(cateMain) == false || $.isNumeric(cateMain) == false){
		return;
	}
	cateMain = parseInt(cateMain);
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var isAdultCategory = diskCategory.isAdultCategory(cateMain);
	//sub category
	if(isDefined(cateSub) == true &&  $.isNumeric(cateSub) == true){
		if(diskCategory.isAdultCategory(cateSub) == true){
			isAdultCategory = true;
		}
	}

	//성인이면 카테고리 처리
	if(isAdultCategory == true){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
		//성인인증 여부
		if(utility.disk.checkIsAdultMember() != true){
			GO_REAL_NAME();
			return;
		}

	}

	var actionType = 'category';
	//특수 카테고리
	if(cateMain > 30000){
		GO_TOP_SP_CATEGORY(cateMain, 0, cateSub);
		return;
	}

	GO_MENU(actionType, cateMain, cateSub);
	return;
};

//특수 매뉴 이동
var GO_TOP_SP_CATEGORY = function(catAction, cateMain, cateSub){
	console.log('GO_TOP_SP_CATEGORY');
	//광고는 로그인 여부
	if(isAdDomain() == true){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
	}
		
	if(isDefined(catAction) == false || $.isNumeric(catAction) == false){
		return;
	}
	catAction = parseInt(catAction);
	if(catAction == 50000 || catAction == 90003){
		GO_TOPTOON();
		return;
	}else if(catAction == 90004){
		GO_WEBNOVEL();
		return;
	}
	//충전하기
	else if(catAction == 77703){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
		GO_CHARGE();
		return;
	//충전하기
	}else if(catAction == 91002){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
		if(utility.disk.checkIsRealName() != true){
			GO_REAL_NAME('adult');
			return;
		}
	
	//실명인증
	}else if(catAction == 77704){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
		if(utility.disk.checkIsRealName() == true){
			disk_alert('이미 인증하셨습니다.');
			return;
		}
		GO_REAL_NAME_PHONE('realName');
		return;
	}
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	if(isDefined(diskCategory) == false){
		diskCategory = new Disk_category(1);
	}

	//remove active - channel
	$('.channel-list-item.active').removeClass('active');

	console.log('diskCategory.main_menu_list', diskCategory.main_menu_list);

	var SP_CATEGORY = {};
	for(var si in diskCategory.main_menu_list){
		SP_CATEGORY[si] = diskCategory.main_menu_list[si];
		if(catAction == si){
			break;
		}
	}
	console.log('SP_CATEGORY', SP_CATEGORY);
	//return;
	var actionType = SP_CATEGORY[catAction];
	console.log('actionType', actionType);
	if(isDefined(actionType)){
		GO_MENU(actionType, cateMain, cateSub);
	}
	return;
};


//홈으로 이동
var GO_HOME = function(){
	console.log('GO_HOME');
	if($('#mobile-container-deep-0').length < 1){
		location.href = '/mobile';
		return;
	}
	GO_MENU('home');
	return;

};

//메인 검색하기
var GO_SEARCH = function(k, fc, lo){
	console.log('GO_SEARHC');
	//GO_MENU('home');

	if(isDefined(k) == false){
		disk_alert('검색어를 입력해주세요.');
		return;
	}

	if(k.length < 2){
		disk_alert('검색어는 2자 이상 입력해주세요.');
		return;
	}

	var forceCategory = '';
	if(isDefined(fc) == true && $.isNumeric(fc)){
		forceCategory = fc;
	}
	var locationCategory = 0;
	if(isDefined(lo) == true && $.isNumeric(lo)){
		forceCategory = lo;
	}

	location.hash = '#!action=search&k='+encodeURIComponent(k)+'&fc='+forceCategory+'&lo='+locationCategory+'&page=1';

	return;

};
/*
//하단 네비 : 마이페이지
var GO_MYPAGE = function(thisEle){
	console.log('GO_MYPAGE');

	var actionType = 'mypage';

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN(actionType);
		return;
	}
	GO_MENU(actionType);
};
*/
//상단 네비: 서비스
var OPEN_SERVICE = function(thisEle){
	console.log('OPEN_SERVICE');
	var actionType = 'service';
	GO_MENU(actionType);
};

//하단 네비: 검색
var OPEN_SEARCH = function(thisEle){
	console.log('OPEN_SEARCH');
	var actionType = 'search_form';
	GO_MENU(actionType);
};

//하단 네비: 카테고리
var GO_ASIDE = function(thisEle){
	console.log('GO_ASIDE');

	var actionType = 'aside';
	GO_MENU(actionType);
};

//하단 네비 :  for you
var GO_FORYOU = function(thisEle){
	console.log('GO_FORYOU');
	
	//광고는 로그인 여부
	if(isAdDomain() == true){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
	}
	
	var actionType = 'for_you';
	GO_MENU(actionType);
};

//방송국 이동
var GO_BROADCAST_STATION = function(thisEle){
	console.log('GO_BROADCAST_STATION');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData.idx)){
		location.hash = '#!action=broadcast&sub='+eleData.idx;
	}
	return;
};

//판매자 채널로 이동
var GO_SELLER = function(thisEle){
	console.log('GO_SELLER');

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	//return;
	//로그인 체크
	//광고는 로그인 여부
	if(isAdDomain() == true){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
	}
	var actionType = 'channel';
	var sellerIdx = '';
	if(isDefined(eleData.idx) && $.isNumeric(eleData.idx)){
		sellerIdx = eleData.idx;
	}
	if($.isNumeric(sellerIdx) == false){
		sellerIdx = '';
	}
	var sellerName = '';
	if(isDefined(eleData.seller)){
		sellerName = encodeURIComponent(eleData.seller);
	}
	var mainCategory = '';
	if(isDefined(eleData.cate1) && $.isNumeric(eleData.cate1)){
		mainCategory = eleData.cate1;
	}
	console.log('sellerIdx', sellerIdx);
	console.log('sellerName', sellerName);

	//back hash save
	$('.mobile-fixed-title-header').find('.btn_back').data('hash', location.hash);

	location.hash = '#!action=channel&idx='+sellerIdx+'&nick='+sellerName+'&main='+mainCategory;


	//GO_MENU(actionType, sellerIdx, sellerName);
};



//join
var GO_JOIN = function(targetAction){
	console.log('GO_JOIN');
	
	//fm_p_code
	if(utility.disk.checkIsPartnerJoin() == true){
		location.href = '/mobile.php/join/index/';
		return;
	}
	//set redirect url
	setLoginRedirectUrl(targetAction);

	//로그인 체크 : 이미 로그인 중인지
	var actionType = 'join';
	

	GO_MENU(actionType);
};

var GO_LOGIN = function(targetAction){
	console.log('GO_LOGIN', targetAction);

	//set redirect url
	setLoginRedirectUrl(targetAction);

	/*
	//로그인 체크 : 이미 로그인 중인지
	var actionType = 'login';

	GO_MENU(actionType);
	*/

	var loginFormHtml = MOBILE_TEMPLETE.CONNTAINER.login();
	var loginModalOpenCallbackFun = function($modalEle){
		console.log('openCallbackFun');
		console.log($modalEle);
		MOBILE_PAGE.login.start();
	}

	OPEN_PAGE_MODAL(loginFormHtml, loginModalOpenCallbackFun);

};

var GO_FINDID = function(targetAction){
    console.log('GO_FINDID');

    if(utility.disk.checkIsLogin()){
        alert("이미 로그인되어있습니다.");
		return;
	}
	/*
    //setLoginRedirectUrl(targetAction);
    var resultFindid = function(){
       //MOBILE_COMMON_MEMBER.setFlashSessionData();
    }
    //var findidFormHtml = MOBILE_TEMPLETE.CONNTAINER.findUserId();
    //OPEN_PAGE_MODAL(findidFormHtml, resultFindid);
    */
    
	GO_MENU('find_id');
}

var GO_FINDPASS = function(targetAction){
    console.log('GO_FINDPASS');

    if(utility.disk.checkIsLogin()){
        alert("이미 로그인되어있습니다.");
		return;
	}
	/*
    //setLoginRedirectUrl(targetAction);
    var resultFindpass = function(){
       //MOBILE_COMMON_MEMBER.setFlashSessionData();
    }
    //var findpassFormHtml = MOBILE_TEMPLETE.CONNTAINER.findUserPass();
    //OPEN_PAGE_MODAL(findpassFormHtml, resultFindpass);
    */
    GO_MENU('find_pass');

}

var GO_SELLER_CASH_INFOMATION = function(targetAction){
    console.log('GO_SELLER_CASH_INFOMATION');

    //로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('mypage');
		return;
	}

    setLoginRedirectUrl(targetAction);
    var result_cash = function(){
       //MOBILE_COMMON_MEMBER.setFlashSessionData();
    }
    var seller_cash = 0;
    if(isDefined($("#ssc").val()) && isNumber($("#ssc").val())){
        seller_cash = disk_number_format($("#ssc").val());
    }
    var chargeinfomationFormHtml = MOBILE_TEMPLETE.CONNTAINER.chargeinfomation(seller_cash);
    OPEN_PAGE_MODAL(chargeinfomationFormHtml, result_cash);

}

var GO_SELLER_JOIN = function(targetAction){
	console.log('GO_SELLER_JOIN');

	//set redirect url
	//setLoginRedirectUrl(targetAction);
	var actionType = 'seller_join';

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN(actionType);
		return;
	}

	GO_MENU(actionType);
};

//실명인증하기
var GO_REAL_NAME = function(openType, email){
	console.log('real_name');
	//console.log('utility.disk.checkIsAdultMember', utility.disk.checkIsAdultMember());
	if(utility.disk.checkIsAdultMember() == true){
		disk_alert('이미 실명 인증된 회원입니다.');
	 	return;
	}
	if(isDefined(openType) == false){
		openType = 'adult';
	}
	
	if(isDefined(email) == false){
		email = '';
	}
	
	location.href = '/adult/mobile/?open_page='+openType+'&user_email='+email;
	
	//location.href = '/adult/mobile_index/';
	return;
	if(isDefined(openType) == false){
		openType = '';
		location.href = '/adult/mobile_index/';
		return;
	}
	if(isDefined(email) == false){
		email = '';
	}
	location.href = '/adult/mobile/?authType=phone&open_page='+openType+'&user_email='+email;

};

var GO_FOCES_REAL_NAME = function(){
	console.log('GO_FOCES_REAL_NAME');
	location.href = '/adult/mobile_index/';
	return true;
};

var GO_REAL_NAME_PHONE = function(openType){
	console.log('real_name GO_REAL_NAME_PHONE');
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('real_name');
		return;
	}
	if(isDefined(openType) == false){
		openType = 'realName';
	}
	GO_REAL_NAME(openType);
	return true;

};


//mobile contetns open
var GO_CONTENTS = function(thisEle){
	console.log('GO_CONTENTS');
	GO_TOP();
	
	//광고는 로그인 여부
	if(isAdDomain() == true){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
	}

	var eleData = $(thisEle).data();
	console.log(eleData);
	var hasIdx = false;
	var hasSearch = false;
	if(isDefined(eleData.idx) == true){
		//disk_alert('콘텐츠 정보가 올바르지 않습니다.');
		//return;
		//hasIdx = false;
		if($.isNumeric(eleData.idx) == true && eleData.idx > 0){
			hasIdx = true;
		}
	}
	//empty idx
	var searchKeyword;
	if(isDefined(eleData.search)){
		searchKeyword = eleData.search;
		if(searchKeyword.length > 1){
			hasSearch = true;
		}
	}

	var searchCategory;
	if(isDefined(eleData.cate1)){
		searchCategory = eleData.cate1;
	}

	if(hasIdx == false && hasSearch == false){
		disk_alert('콘텐츠 정보가 올바르지 않습니다.');
		return;
	}

	if(isDefined(eleData.adult) == true){
		if(eleData.adult == 1){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_LOGIN();
				return;
			}
			//성인인증 여부
			if(utility.disk.checkIsAdultMember() != true){
				//GO_REAL_NAME();
				GO_REAL_NAME();
				return;
			}

		}
	}

	if(hasIdx == false && hasSearch == true && isDefined(searchKeyword) == true){
		console.log('search contents');
		GO_SEARCH(searchKeyword, searchCategory);
		return;
	}

	MOBILE_COMMON_FUN.getMobileContentsView(eleData);
	//location.hash = '#!action=contents&idx='+eleData.idx+'&link='+eleData.link;

	//alert('aaaa');
	return;
};

//go mypage
var GO_MYPAGE = function(thisEle){
	console.log('GO_MYPAGE');
	var eleData = $(thisEle).data();
	console.log(eleData);

	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('mypage');
		return;
	}

	var mypageGroup = '';
	if(isDefined(eleData.group)){
		mypageGroup = eleData.group;
	}

	var mypageId = '';
	if(isDefined(eleData.id)){
		mypageId = eleData.id;
	}
	var hashUrl = '#!action=mypage';
	if(isDefined(mypageGroup) == true && isDefined(mypageId) == true){
		hashUrl = '#!action=mypage&group='+mypageGroup+'&id='+mypageId;
	}

	console.log('hashUrl', hashUrl);
	location.hash = hashUrl;
};

var GO_MYSELLER = function(thisEle){
	console.log('GO_MYSELLER');
	var eleData = $(thisEle).data();
	console.log(eleData);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('mypage');
		return;
	}
	if(utility.disk.checkIsUploaderMember() != true){
		disk_alert('판매자 채널 운영자만 이용 가능한 매뉴입니다.');
		return;	
	}
	
	
	//return;
	var mysellerGroup = '';
	var mysellerId = '';
	if(isDefined(eleData) == true){
		if(isDefined(eleData.group)){
			mysellerGroup = eleData.group;
		}
		if(isDefined(eleData.id)){
			mysellerId = eleData.id;
		}
	}



	var hashUrl = '#!action=myseller';
	if(isDefined(mysellerGroup) == true && isDefined(mysellerId) == true){
		hashUrl = '#!action=myseller&group='+mysellerGroup+'&id='+mysellerId;
	}

	console.log('hashUrl', hashUrl);
	location.hash = hashUrl;
};

//go coupon
var GO_GOUPON = function(thisEle){
	console.log('GO_MYPAGE');
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('coupon');
		return;
	}

	GO_MENU('coupon');

};

//go channel
var GO_CHANNEL = function(thisEle){
	console.log('GO_CHANNEL');

	var eleData = $(thisEle).data();
	console.log(eleData);
	//return;
	
	var rankIdx = null;
	if(isDefined(eleData.idx)){
		rankIdx = eleData.idx;
	}
	var rankType = 'movie';
	if(isDefined(eleData.rank_type)){
		rankType = eleData.rank_type;
	}
	
	if(rankType == 'webtoon' || rankType == 'webtoon_19'){
		if(rankType == 'webtoon_19'){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_LOGIN();
				return;
			}
			//성인인증 여부
			if(utility.disk.checkIsAdultMember() != true){
				GO_REAL_NAME();
				return;
			}
		}
		
		if(isDefined(rankIdx)){
			location.href = '/toptoon/m_toon/'+rankIdx+'/';
			return;
		}
		location.href = '/toptoon/m_toon';
	}
	
	var searchCategory;
	if(isDefined(eleData.cate)){
		if($.isNumeric(eleData.cate)){
			searchCategory = eleData.cate;
		}
	}
	//유아 & 성인
	if(searchCategory == 21500 || searchCategory == 21100){
		GO_SEARCH(eleData.search);
		return;
	}

	if(isDefined(eleData.adult) == true){
		if(eleData.adult == 1){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_LOGIN();
				return;
			}
			//성인인증 여부
			if(utility.disk.checkIsAdultMember() != true){
				GO_REAL_NAME();
				return;
			}
		}
	}

	var bbsIdx;
	if(isDefined(eleData.bbs)){
		if($.isNumeric(eleData.bbs)){
			bbsIdx = eleData.bbs;
		}
	}
	/*
	if(rankType =='theater'){
		eleData.type = 'movie'
	}else if(rankType =='tv'){
		eleData.type = 'broadcast';
	}
	*/

	var channelIdx, channelType;
	if(isDefined(eleData.idx)){
		if($.isNumeric(eleData.idx)){
			channelIdx = eleData.idx;
			if(channelIdx < 1){
				channelIdx = null;
			}
		}
	}
	if(isDefined(eleData.type)){
		channelType = eleData.type;
	}
	//애니
	if(channelType == 'ani'){
		if(isDefined(eleData.search)){
			GO_SEARCH(eleData.search);
			return;
		}else{
			if(rankType =='theater'){
				eleData.type = 'movie'
			}else if(rankType =='tv'){
				eleData.type = 'broadcast';
			}
		}
	}
	

	//방송 채널 idx
	var broIdx;
	if(channelType == 'broadcast' && isDefined(eleData.bro)){
		if($.isNumeric(eleData.bro)){
			broIdx = parseInt(eleData.bro);
		}
	}

	if(isDefined(bbsIdx) == true){
		console.log('has bbs idx');
		eleData.idx = parseInt(bbsIdx);
		MOBILE_COMMON_FUN.getMobileContentsView(eleData);
		return;
	}
	else if(isDefined(broIdx) == true && channelType == 'broadcast'){
		MOBILE_PAGE.broadcast.openMobileBroadcastContentsView(broIdx, 0);
		return;
	}
	else if(isDefined(channelIdx) == true && isDefined(channelType) == true){
		//MOBILE_COMMON.openMobileChannelContentsView(channelType, channelIdx, 0);
		if(eleData.cate == 11000){
			location.hash = "#!action=channel_view&type=movie&idx="+channelIdx;
		}else if(eleData.cate == 12000){
			location.hash = "#!action=channel_view&type=broadcast&idx="+channelIdx;
		}else{
			MOBILE_COMMON.openMobileChannelContentsView(channelType, channelIdx, 0);
		}
		
		return;
	}
	else if(isDefined(eleData.search)){
		GO_SEARCH(eleData.search, searchCategory);
	}
	return;
};

//go channel view
var GO_CHANNEL_VIEW = function(thisEle, openModal){
	console.log('GO_CHANNEL_VIEW');
	
	//광고는 로그인 여부
	if(isAdDomain() == true){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
	}
	
	//alert('GO_CHANNEL_VIEW');
	var eleData = $(thisEle).data();
	console.log(eleData);

	var isAni = 0;
	if(isDefined(eleData.ani) == true){
		isAni = eleData.ani;
	}

	if(isDefined(eleData.adult) == true){
		if(eleData.adult == 1){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_LOGIN();
				return;
			}

			//성인인증 여부
			if(utility.disk.checkIsAdultMember() != true){
				GO_REAL_NAME();
				return;
			}
		}
	}
	var isSearchLink = false;
	var searchKeyword;
	if(isDefined(eleData.idx) == false || isDefined(eleData.type) == false){
		console.log('err channel info');
		if(isDefined(eleData.keyword) == true){
			isSearchLink = true;
			searchKeyword = encodeURI(eleData.keyword);
		}else{
			return;
		}
	}

	var actionType,  viewType, hashUrl;
	var channelIdx = eleData.idx;
	var	channelType = eleData.type;
	var forceCategory = 0;

	if(isDefined(channelIdx) == true && $.isNumeric(channelIdx) == true){
		if(channelType == 'movie'){
			//actionType = 'm_view';
			viewType = 'idx';
			forceCategory = 11000;
			$('.movie_list').find('li').removeClass('active');
			$(thisEle).parent('li').addClass('active');
		}else if(channelType == 'broadcast'){
			//actionType = 'b_view';
			viewType = 'idx';
			forceCategory = 12000;

			$('.broad_list').find('li').removeClass('active');
			$(thisEle).addClass('active');
		}
	}

	var openChannelView = function(){
		//alert('openChannelView');
		if(isDefined(viewType) == true){

			if(openModal == 1){
				MOBILE_COMMON.openMobileChannelContentsView(channelType, channelIdx);
			}else{
				//hashUrl = '#!action='+channelType+'&idx='+channelIdx;
				hashUrl = '#!action=channel_view&type='+channelType+'&idx='+channelIdx;
				console.log('hashUrl', hashUrl);
				location.hash = hashUrl;
				return;
			}
			return;
		}else if(isSearchLink == true && isDefined(searchKeyword) == true){
			GO_SEARCH(searchKeyword, forceCategory);
			return;
		}
	};


	if(isAni != 1){
		openChannelView();
		return;
	}

	var mvScrollTop = $(thisEle).offset().top - 65;
	var $target = $('html,body');
	$target.animate({
		scrollTop: mvScrollTop
	}, 200).promise().done(function(){
		console.log("Done animating");
		openChannelView();
	});

	return;

};

var GO_EVENT_VIEW = function(thisEle, openModal){
	console.log('GO_EVENT_VIEW');
	var eleData = $(thisEle).data();
	console.log(eleData);

	var isAni = 0;
	if(isDefined(eleData.ani) == true){
		isAni = eleData.ani;
	}

	if(isDefined(eleData.idx) == false){
		return;
	}

	if(eleData.adult == 1){
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_LOGIN();
			return;
		}
		//성인인증 여부
		if(utility.disk.checkIsAdultMember() != true){
			GO_REAL_NAME();
			return;
		}
	}

	if(eleData.type == 2){
		console.log('end event status');
		return;
	}
	
	if(isDefined(eleData.vip)){
		if(eleData.vip == 1){
			if(utility.disk.checkIsVip() != true){
				disk_alert('접근권한이 없습니다.');
				return;
			}
		}
	}
	

	var eventIdx = eleData.idx;
	if(isDefined(eventIdx) == true && $.isNumeric(eventIdx) == true){
		$('.mobile-event-list-wrap').find('.e_section').removeClass('active');
		$(thisEle).addClass('active');
	}

	var openEventView = function(){
		if(openModal == 1){
			MOBILE_COMMON.openMobileEventDetailView(eventIdx);
		}else{
			location.hash = '#!action=event_list&idx='+eventIdx;
		}

		return;
	};

	if(isAni != 1){
		openEventView();
		return;
	}
	var mvScrollTop = $(thisEle).offset().top - 58;
	var $target = $('html,body');
	$target.animate({
		scrollTop: mvScrollTop
	}, 200).promise().done(function(){
		console.log("Done animating");
		openEventView();
	});
	return;

};


//go board view
var GO_BOARD_VIEW = function(csType, viewIdx){
	if(isDefined(viewIdx) == false || isDefined(csType) == false){
		return;
	}
	MOBILE_COMMON.openMobileCsBoardDetailView(csType, viewIdx);
	return;
};

var GO_ONPICK = function(thisEle){
	console.log('GO_BACK');
	var eleData = $(thisEle).data();
	console.log(eleData);
	if(isDefined(eleData.type) == false || isDefined(eleData.code) == false){
		console.log('err type');
		return;
	}
	
	var onpickType = eleData.type;
	var onpickAction = eleData.code;
	var hashUrl;
	if(onpickType == 'movie'){
		if(onpickAction == 'new'){
			hashUrl = '#!action=movie&sub=A';
		}else if(onpickAction == 'best'){
			hashUrl = '#!action=movie&sub=E';
		}else if(onpickAction == 'soon'){
			hashUrl = '#!action=movie&sub=G';
		}
	}else if(onpickType == 'broadcast'){
		hashUrl = '#!action=broadcast';	
	}else if(onpickType == 'ani'){
		if(onpickAction == 'theater'){
			hashUrl = '#!action=ani&main=11000';
		}else if(onpickAction == 'tv'){
			hashUrl = '#!action=ani&main=12000';
		}else if(onpickAction == 'sale'){
			hashUrl = '#!action=ani&main=11000';
		}
	}else if(onpickType == 'book'){
		GO_TOPTOON();
		return;
	}else if(onpickType == 'child'){
		if(onpickAction == 'child_tv'){
			hashUrl = '#!action=broadcast&sub=4';
		}else if(onpickAction == 'child_theater'){
			hashUrl = '#!action=movie&main=0&sub=A';
		}else if(onpickAction == 'child_ani'){
			hashUrl = '#!action=ani&main=a_child';
		}
	}else if(onpickType == 'adult'){
		if(onpickAction == 'webtoon_19'){
			GO_TOPTOON();
			return;
		}else if(onpickAction == 'pink'){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_LOGIN();
				return;
			}
			//성인인증 여부
			if(utility.disk.checkIsAdultMember() != true){
				GO_REAL_NAME();
				return;
			}
			hashUrl = '#!action=movie&sub=P';
		}
	}
	console.log('hashUrl', hashUrl);
	if(isDefined(hashUrl) == false){
		console.log('hashUrl empty');
		return;
	}

	location.hash = hashUrl;
	return;
};

//go company
var GO_COMPANY = function(companyType){
	console.log('GO_COMPANY', companyType);

	if(isDefined(companyType) == false){
		console.log('companyType empty');
		return;
	}
	MOBILE_COMMON.openMobileCompanyContentsView(companyType);
};


//go company
var GO_REQUEST = function(requestType){
	console.log('GO_REQUEST', requestType);
	var actionType = 'request_list';
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN(actionType);
		return;
	}

	if(isDefined(requestType) == false){
		GO_MENU(actionType);
		return;
	}
	var hashUrl = '#!action='+actionType;
	if(requestType == 'my'){
		hashUrl += '&type='+requestType+'&page=1';
	}
	console.log('hashUrl', hashUrl);
	location.hash = hashUrl;
	return;
};

//go change: 포인트 충전
var GO_CHARGE = function(thisEle,is_active){
	console.log('GO_CHARGE');
	var eleData = $(thisEle).data();
	console.log(eleData);
	/*
	if(!utility.disk.checkIsLogin()){
		alert("이미 로그인후 사용할 수 있습니다.");
		return;
	}
	*/
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('charge');
		return;
	}
	if(is_active == 1){
		location.href ='/mobile.php/charge/m_flat';
		return;
	}
	location.href ='/mobile.php/charge/m_point'
	
	return;
	if(is_active == 1){
		MOBILE_PAGE.pay.pay_charge_fixed_view();
		return;
	}
	MOBILE_PAGE.pay.pay_charge_point_view();
	return;
}

//app install
var APP_INSTALL = function(thisEle){
	console.log('APP_INSTALL');
	var eleData = $(thisEle).data();
	console.log(eleData);
	var mAgent = checkMobileDeviceAgent();
	console.log('mAgent', mAgent);
	//disk_alert('앱 설치 : 준비중입니다.');
	var DF = get_disk_config(true);
	if(mAgent != 'AOS'){
		alert('현재 안드로이드 버전만 배포중입니다. IOS는 준비중입니다.');
		return;
	}
	if(isMobileOnplayWebviewAgent() == true){
		disk_alert('감사합니다. 이미 사용중이십니다.');
		return;
	}
	console.log('DF.app_market_url', DF.app_market_url);
	location.href = DF.app_market_url;
	
}

var GO_BACK = function(thisEle, bTarget){
	console.log('GO_BACK');
	var eleData = $(thisEle).data();
	console.log(eleData);
	var backTarget;
	if(isDefined(eleData) == true){
		backTarget = eleData.target;
	}
	if(isDefined(backTarget) == false){
		if(isDefined(bTarget)){
			backTarget = bTarget;
		}
	}


	//로그인 모달이 닫힐 경우
	var loginModalCloseCallBackFun = function(){
		console.log('loginModalCloseCallBackFun');
		//HASH_REFRESH();
		//GO_HOME();
	}

	if(isDefined(backTarget)){
		if(backTarget == 'back'){
			//GO_TOP();
			console.log('MOBILE_COMMON.DATA.HASH.BACK', MOBILE_COMMON.DATA.HASH.BACK);
			GO_HISTORY_BACK(thisEle);
			return;
		}else if(backTarget == 'hash'){
			if(isDefined(eleData.hash)){
				location.hash = eleData.hash;
				return;
			}
			GO_HISTORY_BACK(thisEle);
			return;

		}else if(backTarget == 'modal'){
			CLOSE_PAGE_MODAL();
			return;

		}
		else if(backTarget == 'login-modal'){
			CLOSE_PAGE_MODAL(loginModalCloseCallBackFun);
			return;

		}
		else if(backTarget == 'contents'){
			console.log('LAST_LIST', MOBILE_COMMON.DATA.HASH.LAST_LIST);
			console.log('FORWARD', MOBILE_COMMON.DATA.HASH.FORWARD);
			console.log('LAST', MOBILE_COMMON.DATA.HASH.LAST);
			console.log('BACK', MOBILE_COMMON.DATA.HASH.BACK);
			
			var openedConentsIdx = $('.contentsModalViewBbsIdx').val();
			
			//동영상 플레이어 제거
			if(isDefined(openedConentsIdx)){
				if(MOBILE_COMMON.NEW_VIDEO_PLAYER){
					
					//MOBILE_COMMON.NEW_VIDEO_PLAYER = null;
					//var oldPlayer = $('.mobile-contents-view-top-player-area');
					//var oldPlayer = document.getElementById('mobile-view-video-js-video-player_html5_api');
					MOBILE_COMMON.NEW_VIDEO_PLAYER.dispose();
					$('.mobile-contents-view-top-player-area').empty();
					MOBILE_COMMON.NEW_VIDEO_PLAYER = null;
				}
			}
			
			//back 주소가 있으면 뒤로 가기
			if(isDefined(MOBILE_COMMON.DATA.HASH.BACK) == true){
				console.log('cccc');
				var uhParams = $.deparam.fragment(MOBILE_COMMON.DATA.HASH.BACK);
				console.log('uhParams', uhParams);
				if(uhParams['!action'] != 'contents'){
					//console.log('conents view action');
					GO_HISTORY_BACK(thisEle);
					return;
				}
			}
			//unbind view scroll
			/*
			if(MOBILE_PAGE.contents.DATA.V_SCROLL == true){
				console.log($(window));
				//$(window).off('scroll');
				MOBILE_PAGE.contents.DATA.V_SCROLL = false;
				MOBILE_COMMON.DATA.SCROLLER.W_SCROLL = false;
			}
			*/

			if(isDefined(MOBILE_COMMON.DATA.HASH.LAST_LIST)){
				console.log('aaaaa');
				/*
				if(isDefined(eleData.idx)){
					var targetContentsEleName = '.mobile-contents-list-'+eleData.idx;
					console.log('targetContentsEleName', targetContentsEleName);
					utility.ui.goToElement(targetContentsEleName);
				}
				*/
				location.hash = MOBILE_COMMON.DATA.HASH.LAST_LIST;
				return;
			}else{
				console.log('bbbbb');
				GO_HISTORY_BACK(thisEle);
				return;
				//GO_HOME();
			}
			econsole.log('dddddd');
			return;
		}else{
			GO_MENU(backTarget);
			return;
		}
	}
	GO_HOME();
	return;
};

//하단 뒤로가기
var GO_HISTORY_BACK = function(thisEle){
	console.log('GO_HISTORY_BACK');

	//console.log('referrer', document.referrer);
	//console.log(jQuery.bbq.getState());
	//return;
	var nowHistoryIdx = 10;
	if(isDefined(thisEle) == true){
		var eleData = $(thisEle).data();
		if(isDefined(eleData.his) == true){
			nowHistoryIdx = parseInt(eleData.his);
		}
	}


	console.log('nowHistoryIdx', nowHistoryIdx);

	var homeHashUrl = MOBILE_MENU.DATA.HOME+"&history=1";
	if($.isNumeric(nowHistoryIdx) == false){
		//GO_HOME();
		location.hash = homeHashUrl;
		return;
	}

	var cachedHistoryLen = MOBILE_COMMON.DATA.CACHE.HISTORY.length;
	console.log('MOBILE_COMMON.DATA.CACHE.HISTORY');
	console.log(MOBILE_COMMON.DATA.CACHE.HISTORY);

	if(cachedHistoryLen < 1){
		//GO_HOME();
		if(MOBILE_COMMON.DATA.ACTION != 'home'){
			location.hash = homeHashUrl;
		}
		return;
	}
	
	var pageHash = location.hash;
	//console.log('pageHash', pageHash);
	//return;

	if(MOBILE_COMMON.DATA.CACHE.HISTORY.length > 0){
		console.log('history back');
		if(MOBILE_COMMON.DATA.CACHE.HISTORY[0] == pageHash){
			GO_HOME();
			return;
		}
		MOBILE_COMMON.DATA.CACHE.HISTORY.pop();

		MOBILE_COMMON.DATA.HASH.FORWARD = location.hash;
		history.back(true);
	}


	return;
};

var GO_TOP = function(aniTime){
	console.log('GO_TOP~~~~<', aniTime);
	//go top btn hidden
	$('#mobile-bottom-top-btn-0').removeClass('open');

	//remove fixed menu
	$('.mobile-common-header').removeClass('fixed menu');
	if(isDefined(aniTime) == false){
		aniTime = 10;
	}
	$("html, body").animate({ scrollTop: 0 }, aniTime);
	return;
	/*
	if(isDefined(aniTime) == false){
		aniTime = 0;
	}
	console.log('aniTime', aniTime);
	utility.ui.goToElement('#wrap', aniTime);
	*/
};

var GO_MODAL_TOP = function(){
	console.log('GO_MODAL_TOP~~~~<');
	var aniTime = 10;
	var $modalContainerEle = $('#mobile-container-modal-page');
	//utility.ui.goToElement('#mobile-container-modal-page', aniTime);
	if($modalContainerEle.hasClass('show')){
		//$modalContainerEle.find('.f_content').offset({top: 0});
		$modalContainerEle.scrollTop(0);
	}
};


//close 이동
var MENU_CLOSE = function(thisEle){
	console.log('MENU_CLOSE');
	GO_TOP();

	var eleData = $(thisEle).data();
	console.log(eleData);
	//return;
	var closeTarget = eleData.target;
	if(isDefined(closeTarget) == true){
		if(closeTarget == 'back'){
			//GO_BACK(thisEle);
			GO_HISTORY_BACK(thisEle);
			return;
		}
		var hashPrams = $.deparam.fragment(closeTarget);
		console.log('hashPrams', hashPrams);
		if(hashPrams['!action']){
			$.bbq.pushState( closeTarget);
			return;
		}
		GO_HOME();
		return;
	}
	GO_HOME();
	return;
};

//page modal open
var OPEN_PAGE_MODAL = function(modalHtml, callbackFun){

	if(isDefined(modalHtml) == false){
		console.log('empty html');
		return;
	}

	var $navEle = $('#mobile-bottom-navs-0');
	if($navEle.length > 0){
		if($navEle.hasClass('show') == true){
			$navEle.addClass('animated fadeOutDown');
		}
	}

	/*
	var body = document.body,
    html = document.documentElement;

	var maxHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
 	*/

	//$('#mobile-container-modal-page').css({'height': maxHeight+'px' }).html(modalHtml).addClass('show');
	$('#mobile-container-modal-page').html(modalHtml).addClass('show');
	$('body').addClass('page-modal');
	setTimeout(function(){
		if (typeof callbackFun === "function"){
	        callbackFun($('#mobile-container-modal-page'));
	        return;
		}
	}, 100);
};

//page modal close
var CLOSE_PAGE_MODAL = function(callbackFun){
	console.log('CLOSE_PAGE_MODAL');

	var $modalContainerEle = $('#mobile-container-modal-page');
	if($modalContainerEle.hasClass('show')){
		$modalContainerEle.scrollTop(0).removeClass('show').empty();
	}else{
		$modalContainerEle.empty();
	}

	if($('body').hasClass('page-modal')){
		$('body').removeClass('page-modal');
	}else{
		console.log('no body page-modal ');
		return;
	}

	//show nav

	var $navEle = $('#mobile-bottom-navs-0');
	if($navEle.length > 0){
		if($navEle.hasClass('open') == true){
			//if($navEle.hasClass('show') == false){
				$navEle.removeClass('fadeOutDown').addClass('show animated fadeInUp');
			//}
		}
	}


	//remove scroll spy
	if($modalContainerEle.hasClass('show') != true && $modalContainerEle.length > 0){
		$modalContainerEle.off('scroll');
	}
	//on chanell view close
	if(location.hash.indexOf('on_channel') >= 0 && location.hash.indexOf('idx') >= 0){
		//GO_HISTORY_BACK();
		var hashPrams = $.deparam.fragment();
		console.log('hashPrams', hashPrams);
		if(hashPrams['!action'] == 'on_channel' && isDefined(hashPrams['type']) == true){
			location.hash = '#!action='+hashPrams['type'];
			return;
		}
		GO_HISTORY_BACK();
		return;
	}

	if (typeof callbackFun === "function"){
        setTimeout(function(){
			if (typeof callbackFun === "function"){
		        callbackFun();
		        return;
			}
		}, 100);
        return;
	}

	return;
};

//현재 페이지 리로드
var HASH_REFRESH = function(){
	console.log('HASH_REFRESH');
	if(isDefined(location.hash)){
		$(window).trigger('hashchange');
	}else{
		location.reload(true);
	}
};

var GO_TOPTOON = function(thisEle){
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('toptoon');
		return;
	}
	
	if(utility.disk.checkIsRealName() != true){
		GO_REAL_NAME();
		return;
	}
	var idx = $(thisEle).data('idx');
	if(isDefined(idx)){
		location.href = '/toptoon/m_toon/'+idx+'/';
		return;
	}
	location.href = '/toptoon/m_toon';
	
	//GO_MENU('toptoon');
};

var GO_WEBNOVEL = function(thisEle){
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('toptoon');
		return;
	}
	
	if(utility.disk.checkIsRealName() != true){
		GO_REAL_NAME();
		return;
	}
	var idx = $(thisEle).data('idx');
	if(isDefined(idx)){
		location.href = '/touchbook//m_main/'+idx+'/';
		return;
	}
	location.href = '/touchbook/m_main/';
};

//외부에서 해시없이 링크
var GO_OUTER_LINK = function(goAction, goUrl){
	
	if(goAction == 'charge'){
		GO_CHARGE();
		return;
	}else if(goAction == 'category'){
		location.href = '/mobile/#!action=aside';
		return;
	}else if(goAction == 'channel'){
		location.href = '/mobile/#!action=movie';
		return;
	}else if(goAction == 'mypage'){
		location.href = '/mobile/#!action=mypage';
		return;
	}
	else if(goAction == 'login'){
		location.href = '/mobile/#!action=home&main=login';
		return;
	}
	else{
		location.href = '/mobile/#!action='+goAction;
	}
	return;
};

//다운로드 보관함 열기
var OPEN_APP_DOWNLOAD_BOX = function(thisEle){
	console.log('OPEN_APP_DOWNLOAD_BOX');
	if(isMobileOnplayWebviewAgent() != true){
		disk_alert('전용 앱에서 사용가능합니다.');
		return;
	}
	/*
	if(getAppVersion() < 2){
		disk_alert('최신 버전이 아닙니다. 최신버전을 업데이트 후 이용해주세요.');
		return;
	}
	*/
	if(checkMobileDeviceAgent() == 'IOS'){
		disk_alert('이 메뉴는 안드로이드 전용 메뉴입니다.');
		return;
	}
	var appBoxUrl = 'onplay.downloader.activity://:';
	console.log('appBoxUrl', appBoxUrl);
	//alert(appBoxUrl);
	location.href = appBoxUrl;
	return;
};