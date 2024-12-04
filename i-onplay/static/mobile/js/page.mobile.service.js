/*
* mobile page service js
*/


MOBILE_PAGE.service = {};

MOBILE_PAGE.service.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.service.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.service.init();
	
}

MOBILE_PAGE.service.defaultBinding = function(){
	console.log('MOBILE_PAGE.service.defaultBinding');	
	
	
};

MOBILE_PAGE.service.showLoginData = function(diskMember){
	console.log('MOBILE_PAGE.service.showLoginData');
	var memberInfoHtml = diskMember.getMobileServiceMemberLoginedInfoHtml('service');
		$('.service-login-info.ok').html(memberInfoHtml);
		loginedCls = 'ok-login';
		//set child block
		MOBILE_COMMON_MEMBER.setChildBlock(diskMember);
		$('.mobile-service-contents').addClass(loginedCls).removeClass('none-login');
};


//회원 정보에 따른 출력
MOBILE_PAGE.service.showServiceMainLoginData = function(data){
	console.log('MOBILE_PAGE.service.showServiceMainLoginData');
	//login check
	var isLoginedMember = utility.disk.checkIsLogin();
	//var memberInfoHtml = '';
	var loginedCls = 'none-login';
	if(isLoginedMember == true){
		var diskMember = DISK_MEMBER_FUN.getMemberInfo(1);
		isLoginedMember = false;
		if(diskMember){
			isLoginedMember = true;
			MOBILE_PAGE.service.showLoginData(diskMember);
		}
	}
	console.log('isLoginedMember', isLoginedMember);
	//비로그인 처리
	if(isLoginedMember != true){
		oginedCls = 'none-login';
		$('.mobile-service-contents').addClass(loginedCls).removeClass('ok-login');
	}else{
		//실명인증
		if(utility.disk.checkIsRealName() != true){
			$('.service_real_name').addClass('none');
		}
		
	}
		
	MOBILE_PAGE.service.defaultBinding();
};

MOBILE_PAGE.service.init = function(){
	console.log('MOBILE_PAGE.service.init');	
	var getLoginCheckCallbackFun = function(data){
		console.log('getLoginCheckCallbackFun');
		console.log(data);
		
		MOBILE_PAGE.service.showServiceMainLoginData(data);
	};
	
	DISK_MEMBER_FUN.getMemberLoginInfo(1, getLoginCheckCallbackFun);
	
	
	return;
	
};


MOBILE_PAGE.aside = {};
MOBILE_PAGE.aside.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.aside.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
}