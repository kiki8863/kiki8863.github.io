/*
page coupon
*/


var PAGE_COUPON = {};
PAGE_COUPON.DATA = {
	
};

PAGE_COUPON.start = function(pageMain, pageSub, pagData){
	
	console.log('PAGE_COUPON.start');
	console.log('pageMain:', pageMain);
	console.log('pageSub:',pageSub);
	console.log('pagData:', pagData);
	
	if(isDefined(pageSub) == false){
		//pageSub = 'faq';
	}
	
	PAGE_COUPON.intFormBinding();
	

};


PAGE_COUPON.intFormBinding = function()
{
	
	
    var successRegistCouponFun = function(data){
    	console.log('successRegistCouponFun');
    	console.log(data);
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
		//input reset
		$('.disk-coupon-code-input').val('');
		//disk-coupon-code-input
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		
		GO_HOME();
    };
    
    
	console.log('PAGE_COUPON.intFormBinding');
	$(".diskCouponRegistForm").unbind('submit');
	$(".diskCouponRegistForm").submit(function(event){
		
		event.preventDefault(); 
		/*
		if(isDefined(targetForm) == false){
			console.log('empty targetForm');
			return;
		}
		*/
		console.log('diskCouponRegistForm');
		
		//로그인 체크
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
		if(utility.disk.checkIsRealName() != true){
			alert('실명 인증후 쿠폰 등록을 해주세요.');
			GO_REAL_NAME();
			return;
		}
		var $targetForm = $(this);
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
			alert('쿠폰 코드를 입력해주세요.');
			$(this).find('input[name=code]').focus();
			return false;
		}
	
	    formData.is_mobile = 0;
	    
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
	});
};