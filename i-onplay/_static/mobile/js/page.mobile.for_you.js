

MOBILE_PAGE.for_you = {};
MOBILE_PAGE.for_you.DATA = {
	LAST_HASH	: null
}
MOBILE_PAGE.for_you.start = function(showContainerInfo, hashPrams){
	
	console.log('MOBILE_PAGE.for_you.start');
	console.log('showContainerInfo', showContainerInfo);
	console.log('hashPrams', hashPrams);
	
	MOBILE_PAGE.for_you.init(showContainerInfo, hashPrams);	
};




MOBILE_PAGE.for_you.defaultBinding = function(){
	console.log('MOBILE_PAGE.for_you.defaultBinding');	
	
	
};


MOBILE_PAGE.for_you.init = function(info, params){
	console.log('MOBILE_PAGE.for_you.init');
	MOBILE_PAGE.for_you.getForyouIndexDataMenu('menu');
	return;
};





//데이타 로딩 후 바인딩
MOBILE_PAGE.for_you.afterBinding = function(){
	console.log('MOBILE_PAGE.for_you.dataAfterBinding');
	//common binding
	MOBILE_COMMON.afterLoadCommonBinding();
};





//tab click
/*
MOBILE_PAGE.for_you.onclickForyouSubTab = function(thisEle){
	console.log('MOBILE_PAGE.for_you.onclickForyouSubTab');
	var eleData = $(thisEle).data();
	
	console.log('eleData', eleData);
	
	$('.tab-foryou.active').removeClass('active');
	$(thisEle).addClass('active');
	
	MOBILE_PAGE.for_you.getForyouIndexDataMenu(eleData.type);

};
*/



//for you contetns : index
MOBILE_PAGE.for_you.getForyouIndexDataMenu = function(foryouType){
	console.log('MOBILE_PAGE.for_you.getForyouIndexDataMenu', foryouType);
	
	if(isDefined(foryouType) == false){
		foryouType = 'menu';
	}
	
	/*
	//log out
	if(foryouType == 'recommend'){
		//$('.foryou-container').removeClass('fix_style');
		//인기 랭킹 보여주기
		$('.realtime-rank-container').addClass('show');
		return;
	}
	*/
	
	
	var sendData = {
		type		: foryouType,
		is_mobile	: 1
	};

	console.log('sendData', sendData);
	
	//var $innerEle = $('.aaa');
	//var $contentsInnerEle = $('.foryou-f-contents');
	//foryou-container-contents
	var $contentsInnerEle = $('.foryou-container-contents');
	
	var successFunGetForyouContentsList = function(data){
		console.log('successFunGetForyouContentsList', data);
		var bbsListCount = 0;
		if(isDefined(data.contents_count)){
			bbsListCount = parseInt(data.contents_count);
		}
		
		if(isDefined(data.contents_html) == true){
			if(data.contents_html.length > 100){
				$contentsInnerEle.html(data.contents_html);
			}
		}			
		
		
		if(data.is_logined == 1){
			
			
		}else{
			
		}
		
		//인기 랭킹 보여주기
		if(data.contents_count < 1){
			console.log('contents_count: ', data.contents_count);
			$('.realtime-rank-container').addClass('show');
		}
		
		
		//탭 active 처리
		//$('.tab-foryou.active').removeClass('active');
		//$('.tab-foryou.tab-'+foryouType).addClass('active');
		MOBILE_PAGE.for_you.afterBinding();
		MOBILE_PAGE.for_you.DATA.LAST_HASH = location.hash;
		if(bbsListCount > 0){
			MOBILE_COMMON.DATA.HASH.LAST_LIST = null;	
		}
		
		GO_TOP();
		
		
		return;
		
	};
	
	MOBILE_PAGE.for_you.getForyouIndexData(foryouType, successFunGetForyouContentsList)

};





//for you contetns : index
MOBILE_PAGE.for_you.getForyouIndexData = function(foryouType, callbackFun){
	console.log('MOBILE_PAGE.for_you.getForyouIndexData', foryouType);
	
	if(isDefined(foryouType) == false){
		foryouType = 'index';
	}
	var sendData = {
		type		: foryouType,
		is_mobile	: 1
	};
	var successFunGetForyouContents = function(data){
		console.log('successFunGetForyouContents');
		if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.FOR_YOU.INDEX,
		data		: formData,
		success_fun	: successFunGetForyouContents,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};








MOBILE_PAGE.for_you.init_back = function(info, params){
	console.log('MOBILE_PAGE.for_you.init');
	
	
	return;
	var isLoginMember = false;
	var foryouType = 'recommend';
	if(utility.disk.checkIsLogin() == true){
		isLoginMember = true;
		foryouType = 'buy';
	}
	
	var $foryouContainerEle = $('.foryou-container-contents');
	var $foryouContentsEle = $foryouContainerEle.find('.foryou-f-contents');
	if(isLoginMember == true){
		if($foryouContentsEle.length < 1){
			var foryouContentsHtml = MOBILE_TEMPLETE.CONNTAINER.for_you_contents();
			if(foryouContentsHtml.length > 100){
				$foryouContainerEle.html(foryouContentsHtml);
			}else{
				$('.realtime-rank-container').addClass('show');
				return;
			}
		}
	}else{
		//$contentsInnerEle.addClass('logout').removeClass('login');
		//인기 랭킹 보여주기
		$('.realtime-rank-container').addClass('show');
		return;
	}
	
	
	
	
	if(MOBILE_PAGE.for_you.DATA.LAST_HASH == location.hash){	
		console.log('same saved hash');
		
		var $foryouContentsEle = $('.foryou-f-contents').find('.foryou-contents-list');
		if(isLoginMember == true){
			$foryouContentsEle = $('.foryou-f-contents').find('.member-foryou-contents-list');
		}
		//console.log($foryouContentsEle.data('load'));
		if(isDefined($foryouContentsEle) == true){
			console.log($foryouContentsEle);
			if($foryouContentsEle.text().length < 100 || $foryouContentsEle.data('load') != 1){
				console.log('empty foryou contents list 1');
				MOBILE_PAGE.for_you.getForyouMemberData(foryouType);	
			}
		}else{
			console.log('empty foryou contents list 2');
			MOBILE_PAGE.for_you.getForyouMemberData(foryouType);
		}
		return;
	}
	
	MOBILE_PAGE.for_you.getForyouMemberData(foryouType);
	
};



//for you contetns : member
MOBILE_PAGE.for_you.getForyouMemberData_back = function(foryouType){
	console.log('MOBILE_PAGE.for_you.getForyouMemberData', foryouType);
	
	if(isDefined(foryouType) == false){
		foryouType = 'recommend';
		if(utility.disk.checkIsLogin() == true){
			foryouType = 'buy';
		}
	}
	
	
	//log out
	if(foryouType == 'recommend'){
		//$('.foryou-container').removeClass('fix_style');
		//인기 랭킹 보여주기
		$('.realtime-rank-container').addClass('show');
		return;
	}
	
	
	var sendData = {
		type		: foryouType,
		is_mobile	: 1
	};

	console.log('sendData', sendData);
	//성인인증 여부
	var isAdultMember =utility.disk.checkIsAdultMember();
	console.log('isAdultMember', isAdultMember);
	
	//var $innerEle = $('.aaa');
	var $contentsInnerEle = $('.foryou-f-contents');
	
	var successFunGetForyouContentsList = function(data){
		console.log('successFunGetForyouContentsList', data);
		var bbsListCount = 0;
		
		if(data.is_logined == 1){
			var $innerHtmlTarget = $contentsInnerEle.find('.member-foryou-contents-list');
			var $innerSubscribeHtmlTarget;
			var bbsListHtml = [];
			var channelListHtml = [];
			var diskBbs;
			if(isDefined(data.member_contents_list)){
				var bbsListData = data.member_contents_list;
				bbsListCount = bbsListData.length;
				for(var i =0; i < bbsListCount; i++){
					diskBbs = new Contents_list(i+1, 0, 'category');
					diskBbs.is_adult_member = isAdultMember;
					diskBbs.setData(bbsListData[i]);
					//console.log(diskBbs);
					if(foryouType == 'wish'){
						bbsListHtml[i] = diskBbs.getMobileWishContentsListHtml('wish');
					}else{
						bbsListHtml[i] = diskBbs.getMobileCategoryListHtml(false, 'category');	
					}
				}
				
			}
			
			if(isDefined(data.member_channel_contents_list)){
				if(data.member_channel_contents_list.length > 0){
					console.log('member_channel_contents_list');
					var subList = data.member_channel_contents_list;
					$innerSubscribeHtmlTarget = $contentsInnerEle.find('.member-foryou-subscribe-contents-list');
					for(var k = 0; k < subList.length; k++){
						channelListHtml.push(MOBILE_TEMPLETE.PAGE.getMemberSubscribeListMobileHtml(subList[k]));
					}
				}	
				
			}
			
			if(foryouType == 'wish'){
				$contentsInnerEle.find('.contents-list-wrap').addClass('content_i_style');
			}else{
				$contentsInnerEle.find('.contents-list-wrap.content_i_style').removeClass('content_i_style');
			}
			
			
			if(bbsListHtml.length > 0){
				$innerHtmlTarget.html(bbsListHtml.join('')).data('load', 1);
				$contentsInnerEle.find('.member-contents-buy-wish').removeClass('no-data');	
				//인기 랭킹 보여주기
				$('.realtime-rank-container').removeClass('show');
			}else{
				var noResultMsg = '구매한 목록이 없습니다.';
				if(foryouType == 'wish'){
					noResultMsg = '짐한 목록이 없습니다.';
				}
				$('.no-rt-msg-txt').text(noResultMsg);
				$contentsInnerEle.find('.member-contents-buy-wish').addClass('no-data');
				
				//인기 랭킹 보여주기
				if(foryouType == 'buy' || foryouType == 'wish'){
					$('.realtime-rank-container').addClass('show');
				}
	
			}
			
			if(foryouType == 'subscribe'){
				$('.realtime-rank-container').removeClass('show');
				
				if(channelListHtml.length < 1){
					
					if(isDefined(data.seller_channel_rank_list)){
						var sellerRankHtml = [];
						for(var si in data.seller_channel_rank_list){
							sellerRankHtml.push(MOBILE_TEMPLETE.PAGE.getSellerChannelRankingHtml(data.seller_channel_rank_list[si]));
						}
						
						$contentsInnerEle.find('.seller-channel-rank-list').html(sellerRankHtml.join(''));
					}	
				}
				
				
			}
			
			if(isDefined($innerSubscribeHtmlTarget) == true && channelListHtml.length > 0){
				$innerSubscribeHtmlTarget.html(channelListHtml.join('')).data('load', 1);
				
				$contentsInnerEle.find('.member-contents-subscribe').removeClass('no-data');
				
				//$contentsInnerEle.find('.member-contents-buy-wish').hide();
				//$contentsInnerEle.find('.member-contents-subscribe').show();
			}else{
				//$contentsInnerEle.find('.member-contents-subscribe').hide();
				//$contentsInnerEle.find('.member-contents-buy-wish').show();
				
				
				
				$contentsInnerEle.find('.member-contents-subscribe').addClass('no-data');
				
				
			}
			
			
			console.log('diskBbs', diskBbs);
			
			$contentsInnerEle.addClass('login').removeClass('logout');
			$contentsInnerEle.find('.login-inner').removeClass('wish buy subscribe');
			$contentsInnerEle.find('.login-inner').addClass(foryouType);
			
			
			
		}else{
			$contentsInnerEle.addClass('logout').removeClass('login');
			//인기 랭킹 보여주기
			$('.realtime-rank-container').addClass('show');
		}
		
		//더보기 버튼 데이타
		if(isDefined(data.foryou_type)){
			$contentsInnerEle.find('.btn-foryou-more').data('select', data.foryou_type);
		}
		
		//탭 active 처리
		$('.tab-foryou.active').removeClass('active');
		$('.tab-foryou.tab-'+foryouType).addClass('active');
		
		MOBILE_PAGE.for_you.afterBinding();
		
		MOBILE_PAGE.for_you.DATA.LAST_HASH = location.hash;
		if(bbsListCount > 0){
			MOBILE_COMMON.DATA.HASH.LAST_LIST = null;	
		}
		
		GO_TOP();
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.FOR_YOU.INDEX,
		data		: formData,
		success_fun	: successFunGetForyouContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};