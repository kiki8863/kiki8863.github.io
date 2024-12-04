
/*
* mobile page : mypage
*/

MOBILE_PAGE.mypage.DATA = {
	MAIN		: null,
	SUB			: null,
	GROUP		: null,
	PAGE_ID		: null,
	
	
	SEARCH		: null,
	FILTER		: null,
	LAST_HASH	: null,
	ELE	: {
		container	: '.mypage-container',
		info		: '.channel-seller-page-end-spy',
		seller		: '.channel-seller-info-card',
		search_form	: '#mobileChannelSellerContentsSearchForm'
		
	},
	HASH		:
	{
		GROUP	: null,
		ID		: null,
	},
	
	
};

MOBILE_PAGE.mypage.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.mypage.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('mypage');
		return;
	}
	MOBILE_PAGE.mypage.init(showContainerInfo, hashPrams);
}


MOBILE_PAGE.mypage.defaultBinding = function(){
	console.log('MOBILE_PAGE.mypage.defaultBinding');	
};


MOBILE_PAGE.mypage.init = function(info, params){
	console.log('MOBILE_PAGE.mypage.init');	
	
	
	//login check
	var isLoginedMember = utility.disk.checkIsLogin();
	var memberInfoHtml = '';
	if(isLoginedMember == true){
		var diskMember = DISK_MEMBER_FUN.getMemberInfo(1);
		isLoginedMember = false;
		if(diskMember){
			isLoginedMember = true;
		}
	}
	console.log('isLoginedMember', isLoginedMember);
	//비로그인 처리
	if(isLoginedMember != true){
		GO_LOGIN('mypage');
		return;
	}
	
	//MOBILE_PAGE.mypage.defaultBinding();
	if(isDefined(params) == false){
		return;
	}
	//MOBILE_PAGE.mypage.DATA.GROUP
	var actionType, myGroup, myId, searchKeyword, nextPage;
	if($.isPlainObject(params)){
		actionType = params['!action'];
		searchKeyword = params['k'];
		myGroup = params['group'];
		myId = params['id'];
		nextPage = params['page'];
	}
	
	if(actionType != 'mypage'){
		return;
	}
	if(isDefined(nextPage) == false || $.isNumeric(nextPage) == false){
		nextPage = 1;
	}
	
	//그룹함수 호출
	if(isDefined(myGroup) == true){
		var myGroupFun = MOBILE_PAGE.mypage[myGroup];
		if(myGroupFun){
			if(myGroupFun['start']){
				var startCallBackFun = myGroupFun['start'];
				if (typeof startCallBackFun === "function"){
					
					//remove white
					$('body.white').removeClass('white');
					MOBILE_PAGE.mypage.DATA.LAST_HASH = location.hash;
					$(MOBILE_PAGE.mypage.DATA.ELE.container).data('group','mypage-'+myGroup);
					startCallBackFun.call(null,  myId, nextPage, searchKeyword);
					return;
				}
			}
		}
	}
	//MOBILE_PAGE.mypage.DATA.LAST_HASH = location.hash;
	
	if(MOBILE_PAGE.mypage.DATA.LAST_HASH == location.hash){	
		console.log('same mypage saved hash');
		
		//var $innerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
		var $memberEle = $(MOBILE_PAGE.mypage.DATA.ELE.container).find('.member-info');
		var isLoaded = false;
		if($memberEle.length > 0){
			var containerText = $memberEle.text();
			if(isDefined(containerText) == true && containerText.length > 50){
				isLoaded = true;
			}
		}
		if(isLoaded == true){
			//스토리지 정보 갱신
			var diskMember = DISK_MEMBER_FUN.getMemberInfo(1);
			if(isDefined(diskMember)){
				MOBILE_PAGE.mypage.showLoginData(diskMember);
			}
			return;
		}
		console.log('empty category list');
		//return;
	}
	
	MOBILE_PAGE.mypage.setMypageMain(info, params);
};

MOBILE_PAGE.mypage.showLoginData = function(diskMember){
	//memberInfoHtml = diskMember.getMobileMypageMemberLoginedInfoHtml(diskMember);
	var memberInfoHtml = diskMember.getMobileServiceMemberLoginedInfoHtml('mypage');
	$(MOBILE_PAGE.mypage.DATA.ELE.container).find('.member-info').html(memberInfoHtml);
	MOBILE_COMMON_MEMBER.setChildBlock(diskMember);
}

//로그인에 따른 출력
MOBILE_PAGE.mypage.showMainLoginData = function(loginData, info, params){
	console.log('MOBILE_PAGE.mypage.showMainLoginData');	
	
	//login check
	var isLoginedMember = utility.disk.checkIsLogin();
	var memberInfoHtml = '';
	var diskMember = null;
	if(isLoginedMember == true){
		diskMember = DISK_MEMBER_FUN.getMemberInfo(1);
		isLoginedMember = false;
		if(diskMember){
			isLoginedMember = true;
		}
	}
	console.log('isLoginedMember', isLoginedMember);
	
	
	//로그인 처리
	if(isLoginedMember == true && isDefined(diskMember) == true){
		var containerHtml = MOBILE_TEMPLETE.CONNTAINER.mypage(info, params);
		$(MOBILE_PAGE.mypage.DATA.ELE.container).html(containerHtml);
		/*
		//memberInfoHtml = diskMember.getMobileMypageMemberLoginedInfoHtml(diskMember);
		memberInfoHtml = diskMember.getMobileServiceMemberLoginedInfoHtml('mypage');
		
		$(MOBILE_PAGE.mypage.DATA.ELE.container).find('.member-info').html(memberInfoHtml);
		loginedCls = 'ok-login';
		//set child block
		MOBILE_COMMON_MEMBER.setChildBlock(diskMember);
		*/
		MOBILE_PAGE.mypage.showLoginData(diskMember);
	}else{
		GO_LOGIN('mypage');
		return;
	}
	
	//실명인증
	if(utility.disk.checkIsRealName() != true){
		$('.service_real_name').addClass('none');
	}
	
	//hide top btn
	$('.mobile-bottom-top-btn.show').removeClass('show');
	MOBILE_PAGE.mypage.DATA.LAST_HASH = location.hash;
	MOBILE_PAGE.mypage.defaultBinding();
	return;
	
	
};

//마이페이지 : main 기본
MOBILE_PAGE.mypage.setMypageMain = function(info, params){
	console.log('MOBILE_PAGE.mypage.setMypageMain');	
	if(isDefined(info) == false){
		return;
	}
	var getLoginCheckCallbackFunMypage = function(data){
		console.log('getLoginCheckCallbackFunMypage');
		console.log(data);
		
		if(isDefined(data.member) == false){
			GO_LOGIN('mypage');
			return;
		}
		
		MOBILE_PAGE.mypage.showMainLoginData(data, info, params);
	};
	DISK_MEMBER_FUN.getMemberLoginInfo(1, getLoginCheckCallbackFunMypage, 1);
	
	return;
	//MOBILE_PAGE.mypage.defaultBinding();
};

//마이페이지 : common more data
MOBILE_PAGE.mypage.onclickMoreMobileData = function(thisEle){
	console.log('MOBILE_PAGE.mypage.onclickMoreMobileData');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	
	if($(thisEle).hasClass('ending')){
		console.log('has cls ending');
		return;
	}
	
	var mypageGroup, mypageId, searchKeyword;
	var mypageLoadedPage = 1;
	var mypageTotalPage = 1;
	if(isDefined(eleData.group)){
		mypageGroup = eleData.group; 
	}
	if(isDefined(eleData.id)){
		mypageId = eleData.id; 
	}
	if(isDefined(eleData.loaded)){
		mypageLoadedPage = parseInt(eleData.loaded); 
	}
	if(isDefined(eleData.total_page)){
		mypageTotalPage = parseInt(eleData.total_page); 
	}
	
	var nextPage = mypageLoadedPage + 1;
	if(nextPage > mypageTotalPage){
		console.log('max page');
		$(thisEle).data({page :mypageLoadedPage, loaded : mypageLoadedPage, total_page:mypageLoadedPage}).removeClass('loading').addClass('ending');
		return;
	}
	
	if(mypageGroup == 'contents'){
		MOBILE_PAGE.mypage.contents.getContentsList(mypageId, nextPage, searchKeyword);
	}else if(mypageGroup == 'channel'){
		MOBILE_PAGE.mypage.channel.getChannelList(mypageId, nextPage, searchKeyword);
	}else if(mypageGroup == 'point'){
		MOBILE_PAGE.mypage.point.getPointList(mypageId, nextPage, searchKeyword);
	}else if(mypageGroup == 'community'){
		MOBILE_PAGE.mypage.community.getCommunityList(mypageId, nextPage, searchKeyword);
	}else if(mypageGroup == 'news'){
		MOBILE_PAGE.mypage.news.getNewsList(mypageId, nextPage, searchKeyword);
	}
	

};


