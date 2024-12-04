/*
*	moible coupon
*/

MOBILE_PAGE.coupon = {};
MOBILE_PAGE.coupon.DATA = {
	LAST_HASH	: null
}
MOBILE_PAGE.coupon.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.coupon.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.coupon.init(showContainerInfo, hashPrams);	
};




MOBILE_PAGE.coupon.defaultBinding = function(){
	console.log('MOBILE_PAGE.coupon.defaultBinding');	
	
	
};

MOBILE_PAGE.coupon.afterBinding  = function(){
	console.log('MOBILE_PAGE.coupon.afterBinding ');	
	
	
};



MOBILE_PAGE.coupon.init = function(info, params){
	console.log('MOBILE_PAGE.coupon.init');
	if(utility.disk.checkIsLogin() != true){
		GO_LOGIN('coupon');
		return;		
	}
	
	
	var actionType = params['!action'];
	if(actionType != 'coupon'){
		console.log('action type err');
		return;
	}
	
	var $couponContentsEle = $('.mobile-coupon-main-list-wrap');
	if(isDefined(info.m_list) == true){
		$couponContentsEle = $(info.m_list);
	}
	
	if(MOBILE_PAGE.coupon.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		
		
		
		//console.log($couponContentsEle.data('load'));
		if($couponContentsEle.length > 0){
			if($couponContentsEle.text().length < 100 || $couponContentsEle.data('load') != 1){
				console.log('empty coupon contents list 1');
				MOBILE_PAGE.coupon.getCouponMainData($couponContentsEle);	
			}
		}else{
			console.log('empty foryou contents list 2');
			MOBILE_PAGE.coupon.getCouponMainData($couponContentsEle);
		}
		return;
	}
	
	MOBILE_PAGE.coupon.getCouponMainData($couponContentsEle);
	
};




//for you contetns : member
MOBILE_PAGE.coupon.getCouponMainData = function($couponContentsEle){
	console.log('MOBILE_PAGE.coupon.getCouponMainData');
	
	if(isDefined($couponContentsEle) == false){
		$couponContentsEle = $('.mobile-coupon-main-list-wrap');
	}
	
	if($couponContentsEle.length < 1){
		console.log('$couponContentsEle empty');
		return;
	}
	
	var sendData = {
		is_mobile	: 1
	};

	console.log('sendData', sendData);
	
	
	
	
	var successFunGetCouponContentsList = function(data){
		console.log('successFunGetCouponContentsList', data);
		
		if(isDefined(data.coupon_main_list)){
			
			var couponListData = data.coupon_main_list;
			var couponMainHtml = [];
			for(var i in couponListData){
				couponMainHtml.push(MOBILE_TEMPLETE.PAGE.getCouponMainListHtml(couponListData[i]));
			}
			
			$couponContentsEle.html(couponMainHtml.join('')).data('load', 1);
		}
		
		MOBILE_PAGE.coupon.DATA.LAST_HASH = location.hash;
		
		GO_TOP();
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.COUPON.MAIN_LIST,
		data		: formData,
		success_fun	: successFunGetCouponContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//regist action
MOBILE_PAGE.coupon.onclickActionRegist = function(targetFormName){
	console.log('MOBILE_PAGE.coupon.onclickActionRegist', targetFormName);
	//event.preventDefault(); 
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		alert('실명 인증후 쿠폰 등록을 해주세요.');
		GO_REAL_NAME('realName');
		return;
	}
	
	if(isDefined(targetFormName) == false){
		console.log('empty targetForm');
		return;
	}
	var $targetForm = $('#'+targetFormName);
	if($targetForm.length != 1){
		console.log('form length err');
		return;
	}
	
	
	//event.preventDefault(); 
	
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);
	
	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData)== false){
		return false;
	}
	
	if(isDefined(formData.idx)== false || isDefined(formData.code)== false){
		disk_alert('쿠폰 코드를 입력해주세요.');
		return false;
	}
	formData.is_mobile = 1;
    
    	
    var successRegistCouponFun = function(data){
    	console.log('successRegistCouponFun');
    	console.log(data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, true);
		}
		
		//input reset
		$('.disk-coupon-code-input').val('');
		//disk-coupon-code-input
		
		if(isDefined(data.show_msg)){
			//disk_alert(data.show_msg, GO_HOME);
			//$.ambiance({message: data.show_msg, type: "alert-info"});
			alert(data.show_msg);
			GO_HOME();
		}else{
			GO_HOME();	
		}
		
		
    };
    
    
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.COUPON.REGIST_COUPON,
		data		: formData,
		success_fun	: successRegistCouponFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
	
	return false;
}