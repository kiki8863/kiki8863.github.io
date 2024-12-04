/*
*	channel on
*/

MOBILE_PAGE.pay = {};


MOBILE_PAGE.pay.pay_charge_point_view = function(){
	
	location.href ='/mobile.php/charge/m_point';
	return;
	
	var is_mobile = 1;

	console.log('MOBILE_PAGE.pay.pay_charge_point_view');

	var sendData = {
		is_mobile	: 1,		//is mobile
	};

	var successChargeList = function(data){

		var chargeListFormHtml = MOBILE_TEMPLETE.CONNTAINER.paycharge_point_view(data.charge_recommend_list,data.charge_normal_list );
		OPEN_PAGE_MODAL(chargeListFormHtml, null);
	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHARGE.PAY_CHARGE_LIST,
		data		: formData,
		success_fun	: successChargeList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);


};

MOBILE_PAGE.pay.pay_charge_fixed_view  = function(){
	location.href ='/mobile.php/charge/m_flat';
	
	return;
	var is_mobile = 1;

	console.log('MOBILE_PAGE.pay.pay_charge_fixed_view');

	var sendData = {
		is_mobile	: 1,		//is mobile
		is_type     : "FIXED"

	};

	var successChargeList = function(data){
		console.log(data.charge_re_list);
		var chargeListFormHtml =MOBILE_TEMPLETE.CONNTAINER.paycharge_fixed_view(data.charge_re_list);
		OPEN_PAGE_MODAL(chargeListFormHtml, null);
	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHARGE.PAY_CHARGE_LIST,
		data		: formData,
		success_fun	: successChargeList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
}
MOBILE_PAGE.pay.pay_method_view = function(pay_idx ,pay_code,clicklink){
	var is_mobile = 1;

	console.log('MOBILE_PAGE.pay.pay_method_view');
	if(!isDefined(pay_idx)){
		alert("오류가 있습니다.");
		return;
	}

	if(!isDefined(pay_code)){
	    pay_code = "P";
	}else{
		switch (pay_code) {
			case 'POINT':
			case 'FIXED':
				pay_code = "P";
				break;
			case 'AUTO':
				pay_code = "A";
				break;

		}
	}

	var sendData = {
		is_mobile	: 1,		//is mobile
		pay_idx		: pay_idx,
		pay_code    : pay_code
	};

	var successChargeList = function(data){
		var chargeListFormHtml = MOBILE_TEMPLETE.CONNTAINER.pay_method_view(data,pay_code,clicklink);
		OPEN_PAGE_MODAL(chargeListFormHtml, null);
	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHARGE.PAY_METHOD_LIST,
		data		: formData,
		success_fun	: successChargeList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);


};


MOBILE_PAGE.pay.paymentAction = function(pay_charge  , on_month_agree ){
	if(utility.disk.checkIsLogin() == false){
		alert("로그인하지 않으셨습니다.");
		GO_MENU('home');
		return;
	}
    if(!isDefined(pay_charge)){
        alert("결제정보를 찾을 수 없습니다.");
        return;
    }

    if(!$("input:checkbox[id='onAgree']").is(":checked")){
        alert("하단에 결제 진행에 동의를 먼저 채크해 주세요.");
        return;
    }


    if(on_month_agree == 'AUTO'){
        if(!$("input:checkbox[id='onMonthAgree']").is(":checked")){
            alert("매월결제하는것에 동의하셔야합니다.");
            return;
        }
    }

    var pay_method_idx = $(":input:radio[name='rd_pay']:checked").val();
	//var pay_method_idx = 11;
	var params = '?pay_method_idx='+pay_method_idx +"&pay_charge_idx="+pay_charge+"&is_mobile=1";
    if(!isDefined(pay_method_idx)){
        alert("결제정보를 찾을 수 없습니다. 다시 시도 해주세요.");
        return;
    }
	window.location.href = '/mobile.php/pay_u/pay_charge_connect'+params;

	/*if(pay_method_idx == 12 || pay_method_idx == 13){
		window.location.href = 'https://m.onplay.co.kr/mobile.php/pay_u/pay_charge_connect'+params;

	}else {
		window.location.href = 'https://pay.onplay.co.kr/ssl.php/pay_u/pay_charge_connect'+params;
	}*/

};



MOBILE_PAGE.pay.onclickTabChange = function(mGroup){
    //var $tab =  $(thisData);
    //$tab.parent().toggleClass('active');
    
    var $thieEle = $('.mobile-pay-method-group.'+mGroup);
    
    $('.mobile-pay-method-group').removeClass('active');
    $thieEle.addClass('active');
    
    $('.mobile-pay-method-item').removeClass('active');
    $thieEle.find('.mobile-pay-method-item').eq(0).addClass('active');
    
    $('.r_btn_radio').prop('checked', false);
    $thieEle.find('.r_btn_radio').eq(0).prop('checked', true);
    
};


MOBILE_PAGE.pay.onclickSelectMethodItem = function(thisEle){
	console.log('MOBILE_PAGE.pay.onclickSelectMethodItem');
	console.log($(thisEle));
		
	$('.mobile-pay-method-item').removeClass('active');
    $(thisEle).addClass('active');
    
	$('.r_btn_radio').prop('checked', false);
    $(thisEle).find('.r_btn_radio').eq(0).prop('checked', true);
};

