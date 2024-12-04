
//mypage >> point
MOBILE_PAGE.mypage.point = {};
MOBILE_PAGE.mypage.point.start = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.start');
	console.log('myId', myId);
	console.log('nextPage', nextPage);
	console.log('searchKeyword', searchKeyword);
	
	//indrt container
	var containerFun = MOBILE_TEMPLETE.CONNTAINER.m_mypage[myId];
	if(containerFun){
		$(MOBILE_PAGE.mypage.DATA.ELE.container).html(containerFun.call(null, myId));	
	}else{
		console.log('empty containerFun');
		return;
	}
	if(isDefined(myId)){
		$(MOBILE_PAGE.mypage.DATA.ELE.container).data('id','mypage-point-'+myId);	
	}
	MOBILE_PAGE.mypage.point.getPointList(myId, nextPage, searchKeyword);
};
//mypage >> point : 페이지 데이타 가져오기
MOBILE_PAGE.mypage.point.getPointList = function(myId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.getPointList');	
	var setPointListFun = MOBILE_PAGE.mypage.point[myId];
	if(isDefined(setPointListFun)){
		setPointListFun.getListPage(nextPage, searchKeyword);
		return;
	}
	console.log('setPointListFun empty');
	/*
	if(myId == 'charge_list'){
		MOBILE_PAGE.mypage.point.charge_list.getListPage(nextPage, searchKeyword);
	}else if(myId == 'point_list'){
		MOBILE_PAGE.mypage.point.point_list.getListPage(nextPage, searchKeyword);
	}else if(myId == 'mileage_list'){
		MOBILE_PAGE.mypage.point.mileage_list.getListPage(nextPage, searchKeyword);
	}
	*/
	
};

MOBILE_PAGE.mypage.point.afterBinding = function(){
	console.log('MOBILE_PAGE.mypage.point.afterBinding');
	//show top
	$('.mobile-bottom-top-btn').addClass('show');
	
	MOBILE_COMMON.afterLoadCommonBinding();	
};

//마이페이지 : 포인트 충전 내역 
MOBILE_PAGE.mypage.point.charge_list = {};
MOBILE_PAGE.mypage.point.charge_list.getListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.getListPage',nextPage);	
	
	
	//get page data
	//MOBILE_PAGE.mypage.point.charge_list.getBuyListData(nextPage, searchKeyword);
	var pointId = 'charge_list';
	MOBILE_PAGE.mypage.point.commonListListData(pointId, nextPage, searchKeyword);
	
};




//마이페이지 : 포인트, 보너스, 쿠폰 적립 내역
MOBILE_PAGE.mypage.point.point_list = {};
MOBILE_PAGE.mypage.point.point_list.getListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.point_list.getListPage',nextPage);	
	//get page data
	var pointId = 'point_list';
	MOBILE_PAGE.mypage.point.commonListListData(pointId, nextPage, searchKeyword);
};

//마이페이지 : 포인트, 보너스, 쿠폰 사용 내역
MOBILE_PAGE.mypage.point.point_used = {};
MOBILE_PAGE.mypage.point.point_used.getListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.point_used.getListPage',nextPage);	
	//get page data
	var pointId = 'point_used';
	MOBILE_PAGE.mypage.point.commonListListData(pointId, nextPage, searchKeyword);
};

/*
//마이페이지 : 보너스, 쿠폰 적립 및 사용 내역  데이타 가져오기
MOBILE_PAGE.mypage.point.point_list.getMoreListData = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.getWishListData');
	
	var pointId = 'point_list';
	MOBILE_PAGE.mypage.point.commonListListData(pointId, nextPage, searchKeyword);
};
*/


//마이페이지 : 마일리지 적립 및 사용 내역 
MOBILE_PAGE.mypage.point.mileage_list = {};
MOBILE_PAGE.mypage.point.mileage_list.getListPage = function(nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.mileage_list.getListPage',nextPage);	
	//get page data
	var pointId = 'mileage_list';
	MOBILE_PAGE.mypage.point.commonListListData(pointId, nextPage, searchKeyword);
	
};



//마이페이지 : 컨텐츠 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.point.commonListListData = function(pointId, nextPage, searchKeyword){
	console.log('MOBILE_PAGE.mypage.point.commonListListData', pointId);
	
	if(isDefined(pointId) == false){
		console.log('empty pointId');
		return;
	}
	
	var startPage = 1;
	if(isDefined(nextPage) == true && $.isNumeric(nextPage)){
		startPage = parseInt(nextPage);
	}
	
	var sendData = {
		page		: startPage,
		is_mobile	: 1
	};

	console.log('sendData', sendData);
	
	//var $innerEle = $('.aaa');
	var $containerEle = $(MOBILE_PAGE.mypage.DATA.ELE.container);
	var $infoEle = $containerEle.find('.mobile-mypage-'+pointId+'-page-end-spy');
	
	var successFunGetBuyListPointList = function(data){
		console.log('successFunGetBuyListPointList', data);
		var bbsListCount = 0;
		var $innerHtmlTarget = $containerEle.find('.mypage-point-'+pointId);
		var $innerSubscribeHtmlTarget;
		var logListHtml = [];
		var channelListHtml = [];
		var diskBbs;
		if(isDefined(MOBILE_TEMPLETE.MY_PAGE.POINT[pointId])){
			//html 먼저
			if(isDefined(data.rt_html) == true){
				logListHtml. push(data.rt_html)
			}else if(isDefined(data.member_log_list)){
				var logList = data.member_log_list;
				bbsListCount = logList.length;
				for(var i =0; i < bbsListCount; i++){
					logListHtml[i] = MOBILE_TEMPLETE.MY_PAGE.POINT[pointId].GET_HTML(logList[i]);
				}
			}
		}
		var curPage = 1;
		if(isDefined(data.page) == true){ curPage = parseInt(data.page);}	
		var pageLimit = 20;
		if(isDefined(data.page_limit) == true){ pageLimit = parseInt(data.page_limit);}
		var pointCount = logListHtml.length;
		if(isDefined(data.point_cnt) == true){ pointCount = parseInt(data.point_cnt);}
		
		var saveData = {
			group	:	'point',
			id		:	pointId
		}	
		console.log('curPage', curPage);	
		if(logListHtml.length > 0){
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage + 1;
			if(curPage == 1){
				$innerHtmlTarget.html(logListHtml.join('')).data('load', 1);	
			}else{
				$innerHtmlTarget.append(logListHtml.join(''));
			}
			if(pageLimit < pointCount){
				saveData.total_page = curPage;
			}
			$infoEle.data(saveData).addClass('loading').removeClass('ending');
			$containerEle.find('.f_content.'+pointId).removeClass('no-data');
			
		}else{
			saveData.page = curPage;
			saveData.loaded = curPage;
			saveData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show', pointId);
				$containerEle.find('.f_content.'+pointId).addClass('no-data');
			}
			$infoEle.data(saveData).removeClass('loading').addClass('ending');

		}
		
		console.log('curPage', curPage);
		if(curPage == 1){
			/*
			if(logListHtml.length < 1){
				console.log('list empty');
				$containerEle.find('.f_content').addClass('no-data');
			}else{
				$containerEle.find('.f_content.no-data').removeClass('no-data');
			}
			*/
			GO_TOP();
		}
		
		MOBILE_PAGE.mypage.point.afterBinding();
		
	};
	
	var serverUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MOBILE[pointId];
	if(isDefined(serverUrl) == false){
		console.log('empty url');
		return;
	}
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: serverUrl,
		data		: formData,
		success_fun	: successFunGetBuyListPointList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//마이페이지 : 컨텐츠 페이지 데이터 가져오기 공통
MOBILE_PAGE.mypage.point.openMypayInfoModal = function(odr){

	console.log('PAGE_MY.point.openMypayInfoModal');
	console.log('odr', odr);
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	
	if(!isDefined(odr)){
		alert('결제 정보를 선택해주세요.');
		return;
	}
	
	var sendData = {
		is_mobile	: 1,
		odr_no		: odr
	};
	
	var openedPayModalCallBackFun = function(data){
		console.log('openedPayModalCallBackFun');
		console.log(data);
	};
	
	
	var successAjaxViewOrderInfoData = function(data){
		console.log('successAjaxViewOrderInfoData');
		//console.log(data);
		
		if(isDefined(data.info_html)){
			
			var $targetModal = $('#disk-pc-big-modal');
			var viewHtml = data.info_html;
			console.log('viewHtml', viewHtml);
			if(isDefined(viewHtml)){
				OPEN_PAGE_MODAL(viewHtml, openedPayModalCallBackFun);
			}
		}	
	}
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.charge_info;
	console.log(contentsUrl);
	var formData = sendData;

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxViewOrderInfoData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};


