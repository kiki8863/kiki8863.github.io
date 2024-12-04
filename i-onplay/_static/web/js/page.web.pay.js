
var PAGE_PAY = {};


PAGE_PAY.layerDisplay_modal  = function(pay_idx, group){
	console.log('PAGE_PAY.layerDisplay_modal');
	
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	
	if(!isDefined(pay_idx)){
	   	return false;
	}
	if(!isDefined(group)){
	    group = "P";
	}else{
		switch (group) {
			case 'POINT':
			case 'FIXED':
				group = "P";
				break;
			case 'AUTO':
				group = "A";
				break;

		}
	}
	
	
	var sendData = {idx : pay_idx , code : group}
	
	var successAjaxViewData = function(res){
		console.log('successAjaxViewData');
		//console.log(data);
		
		//return;
		var $targetModal = $('#disk-pc-pay-modal');
		var viewHtml = null;
		viewHtml = res;
		if(isDefined(viewHtml) == false){
			alert('잠시후 다시 시도해주세요.');
			return;
		}
		if(isDefined(viewHtml)){
			$targetModal.html(viewHtml).data(sendData).modal({
				escapeClose: false,
				clickClose: false,
				showClose: true,
				blockerClass	: 'contents-charge-blocker'
			});

			
			//console.log($.modal.OPEN);
		}
	}
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CHARGE.PAY_METHOD_LIST_MODAL;
	var formData = sendData;

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxViewData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'html',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};


PAGE_PAY.layerDisplay  = function(pay_idx, group){

	console.log('PAGE_PAY.point');
	if(!isDefined(pay_idx)){
	   	return false;
	}
	if(!isDefined(group)){
	    group = "P";
	}else{
		switch (group) {
			case 'POINT':
			case 'FIXED':
				group = "P";
				break;
			case 'AUTO':
				group = "A";
				break;

		}
	}
	PAGE_PAY.layerDisplay_modal(pay_idx, group);
	
	return;	


	//if(confirm("5000원 충전은 추가혜택이 없습니다. \n 진행하시겠습니까? ") == false){
	//	return;
	//}

    var sendData = {pay_idx : pay_idx , pay_code : group}
	var successLayerCharge = function(data){
		console.log('successLayerCharge', data);
    	var $targetModal = $('#disk-pc-pay-modal');
    	$targetModal.empty();

    	var isModalCloseExisting = false;
    	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.getChargeLayer(data);
    	if(isDefined(modalHtml)){
    		$targetModal.html(modalHtml).modal({
    			closeExisting: isModalCloseExisting,
    			blockerClass	: "common-modal-blocker",
    			clickClose		: false,
    			escapeClose		: false
    		});
    	}

	};

	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHARGE.PAY_METHOD_LIST,
		data		: sendData,
		success_fun	: successLayerCharge,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};




PAGE_PAY.paymentAction = function(pay_charge  ,onMonthAgree ){

    if(!isDefined(pay_charge)){
        alert("결제 정보를 확인할 수 없습니다. 다시 진행해 주세요");
        return;
    }

    if(!$("input:checkbox[id='onAgree']").is(":checked")){
        alert("먼저 결제 진행에 동의를 해주세요.");
        return;
    }

    /*정액제*/
    if(onMonthAgree == 'AUTO'){
        if(!$("input:checkbox[id='onMonthAgree']").is(":checked")){
            alert("매월결제하는것에 동의하셔야합니다.");
            return;
        }
    }

    var pay_method_idx = $(":input:radio[name='rd_pay']:checked").val();
		var params = '?pay_method_idx='+pay_method_idx +"&pay_charge_idx="+pay_charge;
	    if(!isDefined(pay_method_idx)){
	        alert("결제 정보를 확인할 수 없습니다. 다시 진행해 주세요");
	        return;
	    }
		var popup_witdh = $(":input:radio[name='rd_pay']:checked").data('width');
		var popup_height = $(":input:radio[name='rd_pay']:checked").data('height');


		var windowLocation = {
			left:  (window.screen.availLeft + (window.screen.availWidth / 5)) - (popup_witdh / 2),
		    top: (window.screen.availTop + (window.screen.availHeight / 3)) - (popup_height / 2)
		}

	    var popup_specs ='toolbar=yes,scrollbars=yes,resizable=yes,'+'left='+windowLocation.left+',top='+windowLocation.top+',width='+popup_witdh+',height='+popup_height;
		var ret = window.open('/pay_u/pay_charge_connect'+params, "pay_pop",popup_specs);
};

PAGE_PAY.onclickTabChange = function(thisData){
    var $tab =  $(thisData);
    $tab.parent().toggleClass('active');
}
