/*
*	모바일용 데이타 설정
*/


MOBILE_CONTAINER = {};
//MOBILE_CONTAINER.NO_CACHE_CONTAINER = ['service','login','join_form','search_form'];
//MOBILE_CONTAINER.NO_CACHE_CONTAINER = ['login','join','join_form','search_form'];
MOBILE_CONTAINER.NO_CACHE_CONTAINER = [];
MOBILE_CONTAINER.NO_CACHE_CONTAINER_LOGIN = ['service','aside','login','join','join_form','search_form'];
MOBILE_CONTAINER.CONTENTS_LIST = ['home','category','best', 'search','channel'];						//컨텐츠 리스트
MOBILE_CONTAINER.POPUP_CONTAINER = ['service','aside','for_you', 'mypage','search_form', 'login','join','join_form'];	//팝업형 컨테이너


MOBILE_CONTAINER.getContainerGroup = function(gropId){
	if(isDefined(gropId) == false){
		return false;
	}
	//var targetContainerEle = 'mobile-container-deep-';
	//var targetFooterEle = 'mobile-footer-common-';
	var mobileContainerGroupData =
	{
		mHome	: {
			deep	:	0,
			target	:	'0',
			header	:	'mobile-top-header-0',
			footer	:	'1',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	null,
			ani		:	null,
		},
		mCategory	: {
			deep	:	1,
			target	:	'1',
			header	:	'mobile-top-header-0',
			footer	:	'2',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	null,
			ani		:	null,
		},
		mSearchForm	: {
			deep	:	11,
			target	:	'11',
			header	:	null,
			footer	:	null,
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'',
			back	: 	'back',
			ani		:	'fadeInRightBig',
		},
		mSearch	: {
			deep	:	10,
			target	:	'10',
			header	:	'mobile-top-header-10',
			footer	:	'0',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	'back',
			ani		:	null,
		},
		mFullpage	: {
			deep	:	20,
			target	:	'20',
			header	:	null,
			footer	:	'1',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	'back',
			ani		:	null,
		},
		mBoard	: {
			deep	:	25,
			target	:	'25',
			header	:	null,
			footer	:	'1',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	'back',
			ani		:	null,
		},
		mService	: {
			deep	:	21,
			target	:	'21',
			header	:	'mobile-top-header-21',
			footer	:	'0',
			navs	:	null,
			go_top	:	null,
			back	: 	'back',
			ani		:	'fadeInLeftBig',
		},
		mMypage	: {
			deep	:	22,
			target	:	'22',
			header	:	null,
			footer	:	'0',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	null,
			back	: 	'back',
			ani		:	null,
		},
		mLogin	: {
			deep	:	33,
			target	:	'33',
			header	:	null,
			footer	:	'2',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	null,
			back	: 	'back',
			ani		:	'fadeInRightBig',
		},
		mJoinForm	: {
			deep	:	35,
			target	:	'35',
			header	:	null,
			footer	:	'0',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	null,
			back	: 	'back',
			ani		:	null,
		},
		mView	: {
			deep	:	30,
			target	:	'30',
			header	:	null,
			footer	:	'0',
			navs	:	null,
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	'back',
			ani		:	null,
		},
		mSeller	: {
			deep	:	2,
			target	:	'2',
			header	:	'mobile-top-header-2',
			footer	:	'2',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	'seller',
			ani		:	null,
		},
		mEmpty	: {
			deep	:	20,
			target	:	'20',
			header	:	null,
			footer	:	null,
			navs	:	'mobile-bottom-navs-0',
			go_top	:	null,
			back	: 	'back',
			ani		:	null,
		},
		/*
		mContents	: {
			deep	:	9,
			target	:	'9',
			header	:	null,
			footer	:	'1',
			navs	:	'mobile-bottom-navs-0',
			go_top	:	'mobile-bottom-top-btn-0',
			back	: 	'back',
			ani		:	null,
		},
		*/
	};
	//mobileContainerGroupData['mAside'] = mobileContainerGroupData['mMypage'];
	//mobileContainerGroupData.mAside.deep = 23;


	if(mobileContainerGroupData[gropId]){
		mobileContainerGroupData[gropId].id = null;
		mobileContainerGroupData[gropId].m_list = null;
		return mobileContainerGroupData[gropId];
	}

	return false;
};


MOBILE_CONTAINER.getContainerData = function(cId){
	if(isDefined(cId) == false){
		return false;
	}
	var c_group = {
		home	:
		{
			name	:	'모바일 홈',
			group	:	'mHome',
			back	:	'',
		},
		best	:
		{
			name	:	'인기',
			group	:	'mCategory',
			back	:	'',
			m_list	:	'.mobile-best-contents-list-wrap',
		},
		category	:
		{
			name	:	'카테고리',
			group	:	'mCategory',
			back	:	'',
			m_list	: 	'.mobile-category-contents-list-wrap',
		},
		service	:
		{
			name	:	'서비스',
			group	:	'mService',
			back	:	'',
		},
		aside	:
		{
			deep	: 23,
			name	:	'카테고리',
			group	:	'mMypage',
			back	:	'',
			ani		:	'fadeInUpBig',
		},
		for_you	:
		{
			deep	: 24,
			name	:	'For You',
			group	:	'mMypage',
			back	:	'',
		},
		mypage	:
		{
			name	:	'마이온플',
			group	:	'mMypage',
			back	:	'home',
			footer	:	'2',
		},
		myseller	:
		{
			name	:	'나의 판매 채널',
			group	:	'mMypage',
			back	:	'home',
			footer	:	'2',
			m_list	:	'.myseller-seller-info-wrap',
		},
		search_form	:
		{
			name	:	'검색',
			group	:	'mSearchForm',
			back	:	'',
		},
		search	:
		{
			name	:	'검색',
			group	:	'mSearch',
			back	:	'',
		},
		/*		
		login	:
		{
			name	:	'로그인',
			group	:	'mLogin',
			back	:	'',
		},
		*/		
		join	:
		{
			deep	: 34,
			name	:	'회원가입',
			group	:	'mLogin',
			back	:	'',
			ani		:	'fadeInRightBig',
		},
		join_form	:
		{
			name	:	'온플레이 회원가입',
			group	:	'mJoinForm',
			back	:	'',
		},
        find_id	    :	 //omin 2020-02-20
		{
			deep	: 45,
			name	:	'아이디 찾기',
			group	:	'mLogin',
			back	:	'back',
		},
        find_pass	:	 //omin 2020-02-20
		{
			deep	: 45,
			name	:	'비밀번호 찾기',
			group	:	'mLogin',
			back	:	'back',
		},
		contents	:
		{
			name	:	'컨텐츠 view',
			group	:	'mView',
			back	:	'',
		},
		event_list	:
		{
			name	:	'온플 이벤트',
			group	:	'mFullpage',
			back	:	'home',
			footer	:	'2',
			m_list	:	'.mobile-event-list-wrap',
		},
		theme	:
		{
			name	:	'테마 채널',
			group	:	'mFullpage',
			back	:	'home',
			m_list	:	'.mobile-channel-theme-list-wrap',
		},
		channel_search	:
		{
			name	:	'온플 채널 검색',
			group	:	'mFullpage',
			back	:	'back',
			m_list	:	'.mobile-channel-search-list-wrap',
		},
		movie	:
		{
			name	:	'영화 채널',
			group	:	'mFullpage',
			back	:	'home',
			m_list	:	'.mobile-channel-movie-list-wrap',
		},
		movie_latest	:
		{
			name	:	'영화 채널 최신업데이트 영화',
			group	:	'mFullpage',
			back	:	'home',
			m_list	:	'.mobile-channel-movie-list-wrap',
		},
		broadcast	:
		{
			name	:	'방송 채널',
			group	:	'mFullpage',
			back	:	'home',
			m_list	:	'.mobile-channel-broadcast-list-wrap',
		},
		ani	:
		{
			name	:	'애니메이션 채널',
			group	:	'mFullpage',
			back	:	'home',
			m_list	:	'.mobile-channel-ani-list-wrap',
		},
		/*
		my_buy_list	:
		{
			name	:	'콘텐츠 구매목록',
			group	:	'mMypage',
			back	:	'mypage',
		},
		my_wish_list	:
		{
			name	:	'찜 목록',
			group	:	'mMypage',
			back	:	'mypage',
		},
		my_request_list	:
		{
			name	:	'자료 요청',
			group	:	'mMypage',
			back	:	'mypage',
		},
		my_channel_list	:
		{
			name	:	'구독 채널',
			group	:	'mMypage',
			back	:	'mypage',
		},
		*/
		channel	:
		{
			name	:	'판매자 채널',
			group	:	'mSeller',
			//group	:	'mFullpage',
			//back	:	'home',
			m_list	: 	'.mobile-channel-seller-list-wrap',
		},
		on_channel	:
		{
			name	:	'온 채널',
			group	:	'mEmpty',
			back	:	'home',
			//m_list	:	'.mobile-channel-movie-list-wrap',
		},
		channel_view	:
		{
			deep	: 	31,
			name	:	'채널 VIEW',
			group	:	'mEmpty',
			back	:	'home',
			navs	:	'none',
			//m_list	:	'.mobile-channel-movie-list-wrap',
		},
		coupon	:
		{
			name	:	'쿠폰 등록',
			group	:	'mFullpage',
			back	:	'home',
			m_list	:	'.mobile-coupon-main-list-wrap',
		},
		request_list	:
		{
			name	:	'요청자료 게시판',
			group	:	'mBoard',
			back	:	'home',
			m_list	:	'.mobile-request-list-main-list-wrap',
		},
		notice	:
		{
			name	:	'공지사항',
			group	:	'mBoard',
			back	:	'home',
			m_list	:	'.mobile-notice-list-main-list-wrap',
		},
		news	:
		{
			name	:	'새소식',
			group	:	'mBoard',
			back	:	'home',
			m_list	:	'.mobile-news-list-main-list-wrap',
		},
		faq	:
		{
			name	:	'자주하는 질문',
			group	:	'mBoard',
			back	:	'home',
			m_list	:	'.mobile-faq-list-main-list-wrap',
		},
		qa	:
		{
			name	:	'1:1 문의',
			group	:	'mBoard',
			back	:	'mypage',
			m_list	:	'.mobile-qa-list-main-list-wrap',
		},
	}


	if(c_group[cId]){
		return c_group[cId];
	}
	return false;

};


MOBILE_CONTAINER.getContainerInfo = function(containerId){
	console.log('MOBILE_CONTAINER.getContainerInfo', containerId);
	if(isDefined(containerId) == false){
		return false;
	}

	var cGroup = MOBILE_CONTAINER.getContainerData(containerId);
	console.log('cGroup', cGroup);
	if(isDefined(cGroup) == false){
		return false;
	}

	var mobileContainerGroupData = MOBILE_CONTAINER.getContainerGroup(cGroup.group);
	console.log('mobileContainerGroupData', mobileContainerGroupData);
	if(isDefined(mobileContainerGroupData) == false){
		return false;
	}


	//var targetContainerEle = 'mobile-container-deep-';
	//var targetFooterEle = 'mobile-footer-common-';
	if(isDefined(mobileContainerGroupData.target)){
		mobileContainerGroupData.target = 'mobile-container-deep-'+mobileContainerGroupData.target;
	}
	if(isDefined(cGroup.footer)){
		mobileContainerGroupData.footer = cGroup.footer;
	}
	if(isDefined(mobileContainerGroupData.footer)){
		mobileContainerGroupData.footer = 'mobile-footer-common-'+mobileContainerGroupData.footer;
	}

	mobileContainerGroupData.id = containerId;
	if(isDefined(cGroup.back)){
		mobileContainerGroupData.back = cGroup.back;
	}
	if(isDefined(cGroup.name)){
		mobileContainerGroupData.name = cGroup.name;
	}
	if(isDefined(cGroup.m_list)){
		mobileContainerGroupData.m_list = cGroup.m_list;
	}
	if(isDefined(cGroup.ani)){
		mobileContainerGroupData.ani = cGroup.ani;
	}
	if(isDefined(cGroup.go_top)){
		mobileContainerGroupData.go_top = cGroup.go_top;
	}
	if(isDefined(cGroup.deep)){
		mobileContainerGroupData.deep = cGroup.deep;
		mobileContainerGroupData.target = 'mobile-container-deep-'+cGroup.deep;
	}

	if(isDefined(cGroup.navs)){
		mobileContainerGroupData.navs = cGroup.navs;
	}
	if(mobileContainerGroupData.navs == 'none'){
		mobileContainerGroupData.navs = null;
	}

	return mobileContainerGroupData;
};
