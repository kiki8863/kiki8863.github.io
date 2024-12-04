/*
*	channel on
*/

MOBILE_PAGE.on_channel = {};
MOBILE_PAGE.on_channel.DATA = {
	ACTION			: null,
	CHANNEL_TYPE	: null,
	CHANNEL_IDX	: null,
	LAST_HASH		: null,
	CONTAINER_ELE	: '#mobile-container-deep-31'
};

MOBILE_PAGE.on_channel.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.on_channel.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	//MOBILE_COMMON.loginCheckBinding(1);
	
	
	MOBILE_PAGE.on_channel.init(showContainerInfo, hashPrams);
	
}

MOBILE_PAGE.on_channel.defaultBinding = function(){
	console.log('MOBILE_PAGE.on_channel.defaultBinding');	
	
};

MOBILE_PAGE.on_channel.init = function(info, params){
	console.log('MOBILE_PAGE.on_channel.init');	
	
	
	console.log(params);
	MOBILE_PAGE.on_channel.defaultBinding();
	
	console.log('MOBILE_PAGE.on_channel.DATA.LAST_HASH', MOBILE_PAGE.on_channel.DATA.LAST_HASH);
	console.log('location.hash', location.hash);
	
	
	var actionType = params['!action'];
	var channelType = params['type'];
	var channelIdx = params['idx'];
	if(actionType != 'on_channel' || isDefined(channelType) == false){
		console.log('action type err');
		return;
	}
	MOBILE_PAGE.on_channel.DATA.ACTION = actionType;
	MOBILE_PAGE.on_channel.DATA.CHANNEL_TYPE = channelType;
	
	console.log('movieView', channelIdx);
	if(isDefined(channelIdx) == true){
		console.log('channel view');
		MOBILE_PAGE.on_channel.DATA.CHANNEL_IDX = channelIdx;
		if(isDefined(channelIdx) == true && $.isNumeric(channelIdx) == true){
			MOBILE_COMMON.openMobileChannelContentsView(channelType, channelIdx, 1);
			return;
		}
	}
	
	var hashUrl = "#!action=movie";
	if(channelType == 'movie' || channelType == 'broadcast'){
		hashUrl = "#!action="+channelType;	
	}
	console.log('hashUrl', hashUrl);
	return;
	location.hash = hashUrl;
	
};