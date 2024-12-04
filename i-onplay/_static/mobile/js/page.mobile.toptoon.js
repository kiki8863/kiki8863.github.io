/*
* mobile page : toptoon
*/
MOBILE_PAGE.toptoon = {};

MOBILE_PAGE.toptoon.DATA ={
	ACTION_TYPE : 'toptoon',
	LAST_HASH	: null,
	MAIN		: null,
	SUB			: 0,
	
};

MOBILE_PAGE.toptoon.start = function(pageSub, pageData){
	console.log('MOBILE_PAGE.toptoon.start');
	console.log('pageSub', pageSub);
	console.log('pageData', pageData);
	MOBILE_PAGE.toptoon.intPageLoding(pageData);
	
	MOBILE_PAGE.toptoon.defaultBinding();
	
}

MOBILE_PAGE.toptoon.intPageLoding = function(pageData){
	console.log('MOBILE_PAGE.toptoon.intPageLoding');
	console.log('pageData', pageData);	
	var $targetEle = $('#mobile_topton_view_wrap');
	if($targetEle.length < 1){
		return;
	}
	
	if(isDefined(pageData) == false){
		return;
	}
	var iUrl = null;
	if(isDefined(pageData.url) == true){
		iUrl = pageData.url;
	}
	if(isDefined(iUrl) == false){
		var iUrl = $targetEle.data('url');
	}
	
	if(isDefined(iUrl) == false){
		return;
	}
	
	
	
	var viewPort = utility.ui.viewport();
	var frameHeight =  viewPort.height;
	//jQuery('#mileage-charge-container').css({'min-height':frameHeight+'px'});
	var innerHtmlIfreame = jQuery('<iframe src="'+iUrl+'" id="TOPTOON" name="TOPTOON" width="100%" scrolling="NO" frameborder="0" style="min-height:'+frameHeight+'px;"></iframe>');
	$targetEle.empty().html(innerHtmlIfreame);
	
	
};

MOBILE_PAGE.toptoon.defaultBinding = function(){
	console.log('MOBILE_PAGE.toptoon.defaultBinding');	
};