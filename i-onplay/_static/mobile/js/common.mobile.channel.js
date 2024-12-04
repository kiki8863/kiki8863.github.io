/*
* channel 관련
*/


MOBILE_COMMON.CHANNEL = {};



MOBILE_COMMON.CHANNEL.searchBinding = function(){
	console.log('MOBILE_COMMON.CHANNEL.searchBinding');	
	
	
	//채널 검색 form 바인딩
	var $channelSearchFormEle = $('#mobileChannelContentsSearchForm');
	if($channelSearchFormEle.length > 0){
		$channelSearchFormEle.unbind( "submit");
		$channelSearchFormEle.bind('submit', function(event){
			event.preventDefault(); 
			var formValues = $(this).serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData:',formData);
			
			if(isDefined(formData.k) == false || formData.k.length < 2){
				$channelSearchFormEle.find('input[name=k]').blur(); 
				disk_alert('검색하실 콘텐츠 제목이나 출연자 이름을 2자 이상 입력해주세요.');
				//$channelSearchFormEle.find('input[name=k]').focus();
				return false;
			}
			
			if(isDefined(formData.channel_type) == false){
				$channelSearchFormEle.find('input[name=k]').blur();
				disk_alert('검색타입이 올바르지 않습니다.');
				return false;
			}
			
			//MOBILE_PAGE.search.actionSearchForm();
			//formData.is_mobile = 1;
			//MOBILE_PAGE.getMobileSearchResultView(formData);
			
			//location.hash = '#!action='+formData.channel_type+'&k='+encodeURIComponent(formData.k);
			//return false;
			if(formData.channel_type == 'theme'){
				location.hash = '#!action=theme&k='+encodeURIComponent(formData.k);
				return false;
			//}else if(formData.channel_type == 'movie'){
			}else{
				//location.hash = '#!action=channel_search&k='+encodeURIComponent(formData.k);
				MOBILE_COMMON.CHANNEL.goChannelSearch(formData.k, formData.channel_type);
				return false;
			}
			
			return false;
			
		});
	}
};

//채널 검색 이동
MOBILE_COMMON.CHANNEL.goChannelSearch = function(channelSearchKewword, channelType){
	console.log('MOBILE_COMMON.CHANNEL.goChannelSearch', channelSearchKewword);
	if(isDefined(channelSearchKewword) == false || channelSearchKewword.length < 2){
		disk_alert('검색하실 테마의 키워드를 2자 이상 입력해주세요.');
		return;
	}
	location.hash = '#!action=channel_search&k='+encodeURIComponent(channelSearchKewword)+'&type='+channelType;
	return;
};



//채널 검색
MOBILE_COMMON.CHANNEL.searchAction = function(getData, callbackFun){
	console.log('MOBILE_COMMON.CHANNEL.searchAction');	
	console.log(getData);
	
	var $channelSearchFormEle = $('#mobileChannelContentsSearchForm');
	if(isDefined(getData.k) == false || getData.k.length < 2){
		disk_alert('검색하실 테마의 키워드를 2자 이상 입력해주세요.');
		return;
	}
	
	var sendData = {
 		k 	:	getData.k,
 		fc	:	'',
 		sc	:	'',  
 		th	: 	'',
 		t	:	'',
 		a	:	'',
 		d	:	'',
 		is_mobile	: 1,
 		channel_type	: ''
 	};
	
	if(isDefined(getData)){
		if(isDefined(getData['fc'])){ sendData.fc = getData.fc; }
		if(isDefined(getData['sc'])){ sendData.sc = getData.sc; }
		if(isDefined(getData['channel_type'])){ sendData.channel_type = getData.channel_type; }
		if(isDefined(getData['t'])){ sendData.t = getData.t; }
		if(isDefined(getData['a'])){ sendData.a = getData.a; }
		if(isDefined(getData['d'])){ sendData.d = getData.d; }
		if(isDefined(getData['th'])){ sendData.th = getData.th; }
		
	}
	console.log('sendData', sendData);
	
	var successFunGetChannelSearchResult = function(data){
		console.log('successFunGetChannelSearchResult', data);
		if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}
			
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CHANNEL.CHANNEL_SEARCH,
		data		: formData,
		success_fun	: successFunGetChannelSearchResult,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//채널 : 서브 카테고리 클릭
MOBILE_COMMON.CHANNEL.onclickShowChannelSubCategory = function(thisEle){
	var targetEle = $(thisEle).data('target');
	if(isDefined(targetEle)){
		$(thisEle).parent('.'+targetEle).toggleClass('active');	
	}
};
