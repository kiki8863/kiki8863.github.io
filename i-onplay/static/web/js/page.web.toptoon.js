var PAGE_TOPTOON = {};
PAGE_TOPTOON.DATA = {
	USER_KEY : null,
	CP_CODE : 'onplay',
};

PAGE_TOPTOON.start = function(pageSub, pageData){
	console.log('PAGE_TOPTOON.start', pageSub);
	console.log(pageData);
	
	PAGE_TOPTOON.topTonAuth(pageData);
			
	PAGE_TOPTOON.initBinding(pageData);
	
	
	$('.adult_roll_wrap').hide();	
	
	return;

	
	
	
};

PAGE_TOPTOON.initBinding = function(pageData){
	console.log('PAGE_TOPTOON.initBinding');
	
	console.log('pageData', pageData);	
	var $targetEle = $('#web_toptoon_view_wrap');
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

PAGE_TOPTOON.topTonAuth = function(pageData){
	console.log('PAGE_TOPTOON.topTonAuth');
	console.log('pageData', pageData);
};

/*
* web novel
*/
var PAGE_WEBNOVEL = {};
PAGE_WEBNOVEL.DATA = {
	USER_KEY : null,
	CP_CODE : 'onplay',
};

PAGE_WEBNOVEL.start = function(pageSub, pageData){
	console.log('PAGE_WEBNOVEL.start', pageSub);
	console.log(pageData);
	
	return;
	PAGE_WEBNOVEL.topTonAuth(pageData);
	PAGE_WEBNOVEL.initBinding(pageData);
	
	
	//$('.adult_roll_wrap').hide();	
	
	return;

	
	
	
};

PAGE_WEBNOVEL.initBinding = function(pageData){
	console.log('PAGE_WEBNOVEL.initBinding');
	
	console.log('pageData', pageData);	
	var $targetEle = $('#web_webnovel_view_wrap');
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
	//var innerHtmlIfreame = jQuery('<iframe src="'+iUrl+'" id="TOPTOON" name="TOPTOON" width="100%" scrolling="NO" frameborder="0" style="min-height:'+frameHeight+'px;"></iframe>');
	var innerHtmlIfreame = jQuery('<iframe src="'+iUrl+'" name="PNSWN" id="PNSWN" allowtransparency="true" width="100%" height="1000" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"  allowtransparency="true" allowfullscreen="true" style="min-height:'+frameHeight+'px;"></iframe>');
	$targetEle.empty().html(innerHtmlIfreame);
};

PAGE_WEBNOVEL.topTonAuth = function(pageData){
	console.log('PAGE_WEBNOVEL.topTonAuth');
	console.log('pageData', pageData);
	
	
}