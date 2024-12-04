/*
*	disk event web page
*/

var PAGE_EVENT = {};

PAGE_EVENT.start = function(pageSub, pagData){
	console.log('PAGE_EVENT.start', pageSub);
	console.log(pagData);
	
	PAGE_EVENT.initBinding();
	PAGE_EVENT.kakaoBinding();
	
	if(pageSub == 'e_list'){
		PAGE_EVENT_LIST.start(pageSub, pagData);
	}
	else if(pageSub == 'e_view'){
		PAGE_EVENT_VIEW.start(pageSub, pagData);
	}
	
};

PAGE_EVENT.initBinding = function(){
	console.log('PAGE_EVENT.initBinding');
	
	//event center big banner
	if($('#top-event-list-slick').find('.top-slick-item').length > 1){
		$('#top-event-list-slick').slick({
			lazyLoad: 'ondemand',
			infinite: true,
			autoplay: true,
			autoplaySpeed	: 2500,
			cssEase: 'linear',
			speed: 400,
			fade: false,
			arrows : false,
			dots	: true
		});
	}
};


//load kakao api
PAGE_EVENT.kakaoBinding = function(){
	
	var bindingKakaoFun = function(){
		console.log('bindingKakaoFun');	
		
		//kakao binding
		if($('#kakao-channel-add-button').length > 0){
			console.log('kakao-channel-add-button');
			var DF = get_disk_config(false);
			if(isDefined(Kakao)){
				console.log('Kakao', Kakao);
				if(isDefined(Kakao.Link) == false){
					Kakao.init(DF.kokao_key);	
				}
				console.log('Kakao', Kakao);
			}
		}
		
	};
	
	
	if($('.kakao_developers_1').data('loaded') == 1){
		bindingKakaoFun();
	}else{
		
		var successLoadKakaoCallbackFun = function(){
			console.log('successLoadKakaoCallbackFun');
			bindingKakaoFun();
		}
		
		var kakaoJs = $('#kakao_developers_1').val();
		if(isDefined(kakaoJs)){
			loadJsAsync(kakaoJs, successLoadKakaoCallbackFun, 'kakao_developers_1');	
		}
		
	}
};

//이벤트 리스트
var PAGE_EVENT_LIST = {};
PAGE_EVENT_LIST.DATA = {
	HASH_ACTION		: 'event_list',
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	paginationEle	: null,
	pagination		: null,
	
	
};

PAGE_EVENT_LIST.start = function(pageSub, pagData){
	console.log('PAGE_EVENT_LIST.start', pageSub);
	console.log(pagData);
	PAGE_EVENT_LIST.DATA.LAST_HASH = '#!action='+PAGE_EVENT_LIST.DATA.HASH_ACTION+'&s=1&page=1';
	
	PAGE_EVENT_LIST.initBinding();
	PAGE_EVENT_LIST.initOnload();
	
	//오른쪽 매뉴 바인딩
	//PAGE_CHANNEL_ON.rightBinding();
	//return;
	PAGE_EVENT_LIST.setHashCheck(null);
	
	
};


PAGE_EVENT_LIST.initBinding = function(){
	console.log('PAGE_EVENT_LIST.initBinding');
	
	PAGE_EVENT_LIST.pageLoadAfterBinding();
	
	

};

//리스트 클릭 바인딩
PAGE_EVENT_LIST.pageLoadAfterBinding = function(){
	console.log('PAGE_EVENT_LIST.pageLoadAfterBinding');
	$( ".disk-e-list.s-1" ).unbind( "click");
	$( ".disk-e-list.s-1" ).bind( "click", function() {
		console.log('disk-e-list click');
		WEB_COMMON_GO.goEventView($(this));
	});
}

PAGE_EVENT_LIST.initOnload = function(){
	console.log('PAGE_EVENT_LIST.initOnload');
	
	
	//return;
	PAGE_EVENT_LIST.initOnloadSlick();
	
	//pagination
	var $paginationEle = $('#channel-event-common-pagination');
	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		if(isDefined(eleData.load)){
			PAGE_EVENT_LIST.DATA.LOADED_PAGE = parseInt(eleData.load);
		}
		
		
		var totalPages = 1;
		if(isDefined(eleData.total_page)){
			totalPages = parseInt(eleData.total_page);
		}
		var eventStatus = 1;
		if(isDefined(eleData.event_status)){
			eventStatus = eleData.event_status;
			PAGE_EVENT_LIST.DATA.LAST_HASH = '#!action='+PAGE_EVENT_LIST.DATA.HASH_ACTION+'&s='+eventStatus+'&page=1';
		}
		var pageLinkUrl = '#!action='+PAGE_EVENT_LIST.DATA.HASH_ACTION+'&s='+eventStatus+'&page=';
		PAGE_EVENT_LIST.DATA.paginationEle = $paginationEle;
		PAGE_EVENT_LIST.DATA.pagination = $paginationEle.pagination({
			/*
			items: totalPages,
			itemsOnPage: 20,
			*/
			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: pageLinkUrl,
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_EVENT_LIST.goCategoryPage(page);
			}
		});
		
		console.log(PAGE_EVENT_LIST.DATA.pagination);
	}
};

PAGE_EVENT_LIST.initOnloadSlick = function(){

	//slick theme
	var $slickTarget = $('.theme_con');
	if($('.theme_con').find('.theme_list').length > 1){
		$('.theme_con').slick({
			//lazyLoad: 'ondemand',
			slidesToShow: 6,
			slidesToScroll: 3,
			infinite: false,
			arrows : true,
			draggable: false,
			//prevArrow : $('.theme_con-prev'),
			//nextArrow : $('.theme_con-next'),
			dots	: false
		});
	}
}

//기본 페이지 로드
PAGE_EVENT_LIST.setDefaultPagination = function(){
	console.log('PAGE_EVENT_LIST.setDefaultPagination');
	var $infoEle = $('#channel-event-common-pagination');
	var infoEleData = $infoEle.data();
	console.log('infoEleData', infoEleData);
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
    var curPage = infoEleData.page;
    if(isDefined(curPage)){
		$infoEle.pagination('selectPage', curPage);
	}

}



//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_EVENT_LIST.setHashCheck = function(hashPrams){
	console.log('PAGE_EVENT_LIST.setLoadHashCheck');
	//hash check
	
	if(isLoadedBbqScript() != true){
		return;
	}
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(!hashPrams['!action']){
		PAGE_EVENT_LIST.setDefaultPagination();
		return;
	}
	if(hashPrams['!action'] != PAGE_EVENT_LIST.DATA.HASH_ACTION){
		
		console.log(hashPrams['!action']);
		if(isDefined(hashPrams['!action']) == false){
			//page 1 load
			location.hash = PAGE_EVENT_LIST.DATA.LAST_HASH;
			return;	
		}
		
		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']));
			}	
		}
		
		
		
		return;
	}
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}
	
	console.log('hashPage',hashPage);
	
	//return;
	if(isDefined(hashPage)){
		console.log('has hash', hashPage);
		
		if(PAGE_EVENT_LIST.DATA.LAST_HASH != location.hash){
			PAGE_EVENT_LIST.setEventListPage(hashPage);
			return;
		}
		
		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_EVENT_LIST.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_EVENT_LIST.DATA.LOADED_PAGE);
			}
			//var loadEleData = $('#channel-themecommon-pagination').data('load');
			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	PAGE_EVENT_LIST.setEventListPage(hashPage);
};

//페이지 이동 분기 처리
/*
PAGE_EVENT_LIST.goChangeEventPage = function(goPage, addHash){
	console.log('PAGE_EVENT_LIST.goChangeEventPage', goPage);
	var hashUrl = $.param.fragment();
	console.log('hashUrl', hashUrl);
	
	//return;
	if(hashUrl){
		var goHash = '#!action=movie_list&page='+goPage;
		if(isDefined(addHash) == true){
			goHash += addHash;
		}
		console.log('goHash', goHash);
		if(goHash != hashUrl){
			console.log('gohash'+goHash);
			location.hash = goHash;
			
		}else{
			PAGE_EVENT_LIST.setEventListPage(goPage);	
		}
	}else{
		PAGE_EVENT_LIST.setEventListPage(goPage);	
	}
};
*/


PAGE_EVENT_LIST.setEventListPage = function(nextPage){
	console.log('PAGE_EVENT_LIST.setEventListPage:',nextPage);	
	//console.log('loadedPage', loadedPage);
	/*
	if(isDefined(nextPage) == fasle){
		nextPage = 1;
	}
	*/
	if(isDefined(nextPage) == false){
		nextPage = 1;
	}
	
	var $infoEle = null;
	if(PAGE_EVENT_LIST.DATA.paginationEle){
		$infoEle = PAGE_EVENT_LIST.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#channel-themecommon-pagination');
	}
	var infoEleData = $infoEle.data();
	
	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }
 	
 	var sendData = {
 		page 			:	nextPage,
 		limit			: 	null,
 		event_status	: 1
 	};
 	
 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;	
		}
		if(isDefined(infoEleData.event_status)){
			sendData.event_status = infoEleData.event_status;	
		}
	}

	console.log('sendData', sendData);
	PAGE_EVENT_LIST.getEventListContentsData(sendData, $infoEle);
	return;

};



//get getEventListContentsData
PAGE_EVENT_LIST.getEventListContentsData = function(getData, $infoEle){
	console.log('PAGE_EVENT_LIST.getEventListContentsData', getData);
	
	var sendData = {
		s			: 1,		//status
		l			: '',		//limit
		page		: 1,
		is_mobile	: 0,		//is mobile
	};
	
	if(isDefined($infoEle) == false){
		$infoEle = PAGE_EVENT_LIST.DATA.paginationEle;
		if(isDefined($infoEle) == false){
			$infoEle = $('#channel-themecommon-pagination');
		}
	}
	
	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['event_status'])){ sendData.s = getData.event_status; }
	}
	console.log('sendData', sendData);
	var $innerTargetEle = $('#disk-event-list-inner-wrap');
	var successFunGetEventContentsList = function(data){
			console.log('successFunGetEventContentsList', data);
			var tmData = null;
			if(isDefined(data.disk_event_list)){
				
				
				
				var tmData = data.disk_event_list;
				var tmListData = tmData.list;
				var mvListHtml = [];
				var lCnt = 0;
				for(var i in tmListData){
					mvListHtml.push(TEMPLETE.WEB_PAGE.eventListHtml(tmListData[i]));
				}
				//console.log('mvListHtml', mvListHtml);
				//페이지 상단으로 이동
				utility.ui.goToElement('.container');
				$innerTargetEle.html(mvListHtml.join(''));
				
				var curPage = tmData.page;
				var reSavePageData =
				{
					load		:	parseInt(curPage),
					page		:	parseInt(curPage),
					limit		:	parseInt(tmData.limit),
				};

				
				var get_total_count = 0
				var get_total_page = 0;
				if(parseInt(curPage) == 1){
					if(isDefined(tmData.total_count)){
						reSavePageData.total_count	= parseInt(tmData.total_count);	
						get_total_count = parseInt(tmData.total_count);
					}
					if(isDefined(tmData.total_page)){
						reSavePageData.total_page	= parseInt(tmData.total_page);	
						get_total_page = parseInt(tmData.total_page);
					}
				}
				$infoEle.data(reSavePageData);
				
				
				//pagination
				if(parseInt(curPage) == 1 && isDefined(PAGE_EVENT_LIST.DATA.pagination)){
					
					console.log('drawPage',get_total_count);
					console.log('get_total_page', get_total_page);
					$infoEle.pagination('updateItems', get_total_page);
					$infoEle.pagination('selectPage', curPage);
				}else{
					console.log('aaa');
					if(isDefined(PAGE_EVENT_LIST.DATA.pagination)){
						$infoEle.pagination('selectPage', curPage);
					}
					
				}
				
				//$infoEle.pagination('selectPage', curPage);
				PAGE_EVENT_LIST.DATA.LOADED_PAGE = parseInt(curPage);
				
				//save cache
				PAGE_EVENT_LIST.DATA.LAST_HASH = location.hash;
				
				//img lazy 스크롤 때문에 lazy가 의미 없음
				$('.disk-image-lazy').lazy();
				
				//page binding
				if(sendData.s == 1){
					PAGE_EVENT_LIST.pageLoadAfterBinding();
				}
				
				//slick
				//PAGE_EVENT_LIST.initOnloadSlick();
			}
	};
		
	var formData = sendData;
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT.E_LIST,
		data		: formData,
		success_fun	: successFunGetEventContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};













//이벤트 view
var PAGE_EVENT_VIEW = {};
PAGE_EVENT_VIEW.M_VIEW = {};
PAGE_EVENT_VIEW.DATA = {
	HASH_ACTION		: 'event_view',
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	paginationEle	: null,
	pagination		: null,
	
	
};

PAGE_EVENT_VIEW.start = function(pageSub, pagData){
	console.log('PAGE_EVENT_VIEW.start', pageSub);
	console.log(pagData);
	PAGE_EVENT_VIEW.DATA.LAST_HASH = '#!action='+PAGE_EVENT_VIEW.DATA.HASH_ACTION+'&m=&page=1';
	
	PAGE_EVENT_VIEW.initBinding(pagData);
	PAGE_EVENT_VIEW.initOnload(pagData);
	
	//오른쪽 매뉴 바인딩
	//PAGE_CHANNEL_ON.rightBinding();
	
	//PAGE_EVENT_VIEW.setHashCheck(null);
	
	//만일 디테일 페이지 스크립트가 있으면 실행
	if(isDefined(pagData)){
		if(pagData.event_view_key){
			var mViewFun = pagData.event_view_key;
			console.log('mViewFun', mViewFun);
			if (PAGE_EVENT_VIEW.M_VIEW[mViewFun]) {
			  console.log('PAGE_EVENT_VIEW.M_VIEW[mViewFun]');  
			  var viewDetailFun = PAGE_EVENT_VIEW.M_VIEW[mViewFun];
			  if (typeof viewDetailFun === "function"){
					viewDetailFun(pagData);
					return null;
				}
			}
		}
	}
	
	
	var eventSuccessRegistCouponFun = function(data)
	{
		console.log('eventSuccessRegistCouponFun');
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
	
	//쿠폰등록 binding
	if($("#diskCouponRegistForm103").length > 0){
		$("#diskCouponRegistForm103").unbind('submit');
		$("#diskCouponRegistForm103").submit(function(event){
			event.preventDefault(); 
			console.log('diskCouponRegistForm');
			
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_MENU('login');
				return;
			}
			if(utility.disk.checkIsRealName() != true){
				alert('쿠폰 등록은 본인 인증 후 등록이 가능합니다.');
				GO_REAL_NAME();
				return;
			}
			var $targetForm = $(this);
			if($targetForm.length != 1){
				console.log('form length err');
				return;
			}
			var formValues = $targetForm.serializeArray();
			var formData = changeFormArrToObject(formValues);
			if(isDefined(formData)== false){
				return false;
			}
			console.log('formData', formData);
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
				success_fun	: eventSuccessRegistCouponFun,
				error_fun	: null,
				isSpinner	: true,
			};
			DISK_PROTOCOL.AJAX(ajaxData);
			
			return false;
		});
	}
	
	//image lazy
	PAGE_EVENT_VIEW.setImageLazy();

	
};

//category image lazy
PAGE_EVENT_VIEW.setImageLazy = function(){
	console.log('PAGE_EVENT_VIEW.setImageLazy');
	//image lazy
	if($('.disk-image-lazy-event').length > 0){
		$('.disk-image-lazy-event').lazy();
	}
};


PAGE_EVENT_VIEW.initBinding = function(pagData){
	console.log('PAGE_EVENT_VIEW.initBinding');

};




PAGE_EVENT_VIEW.initOnload = function(pagData){
	console.log('PAGE_EVENT_VIEW.initOnload');
	
	
	//코멘트 스크롤 스파이
	$('.common-comment-write-wrap').on('scrollSpy:enter', function() {
		var eleData = $(this).data();
		console.log('enter', eleData);
		
		//load -0 첨, 1-불러오는중, 2-완료
		if(isDefined(eleData.load)){
			if(eleData.load == 0){
				console.log('get event comment');
				var sendData = {
					idx		: eleData.idx,
					page	: 1,
					t		: 'event',
					target	: 'disk-event-comment-list-warp-'+eleData.idx,
					info	: 'comment-list-event-pagnation-controller',
				}
				WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
				$(this).data('load', 1);
			}
		}
	});
	var $scrollSpy =  $('.common-comment-write-wrap').scrollSpy();
	/*
	$('.e_reply_wrap').on('scrollSpy:exit', function() {
		console.log('exit:', $(this).attr('id'));
	});
	*/

};

//출석 채크 이벤트
PAGE_EVENT_VIEW.M_VIEW.on_attend = {};
PAGE_EVENT_VIEW.M_VIEW.on_attend.DATA =
{
	CALENDAR : null,
}
PAGE_EVENT_VIEW.M_VIEW.on_attend = function(pagData){
	console.log('PAGE_EVENT_VIEW.M_VIEW.on_attend');
	console.log(pagData);
	
	PAGE_EVENT_VIEW.M_VIEW.on_attend.setAttendCalendar(pagData, true);
};

PAGE_EVENT_VIEW.M_VIEW.on_attend.onclickJoinAttend = function(toDay)
{
	console.log('PAGE_EVENT_VIEW.M_VIEW.on_attend.onclickJoinAttend', toDay);
	
	//로그인 체크
	if(utility.disk.checkIsLogin() != true){
		alert('로그인 후 이벤트 참여가 가능합니다.');
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		alert('본인 인증 후 이벤트 참여가 가능합니다.');
		GO_REAL_NAME();
		return;
	}
	
	
    var successHttpJoinAttendEvent = function(data){
	    console.log('successHttpJoinAttendEvent');
	    console.debug(data);
	    //회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
	    var eventPoint = data.log_data.event_point;
	    alert('출석체크가 되었습니다.\n'+eventPoint+'p가 지급되었습니다.');
	    jQuery('.today').parent().addClass('event active');
	};
	
	var formData = {
		action_date		: toDay,
		is_mobile		: 0
	}
	COMMON_ACTION.DISK_EVENT.joinAttendAction(formData, successHttpJoinAttendEvent);
	
	
};


PAGE_EVENT_VIEW.M_VIEW.on_attend.setAttendCalendar = function(pagData, loadFirst)
{
	console.log('setAttendCalendar');
	var firstLoad = loadFirst;
	var memberId = parseInt(jQuery('#memberLoginOk').val());
	var membervAauthentic = parseInt(jQuery('#memberValidAauthentic').val());
	var attend_data = null;
	var member_data = null;
	
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	if(mm < 10){
		mm = '0'+''+mm;
	}
	var yyyy = today.getFullYear();
	
	var thisDay = yyyy+'-'+mm+'-'+dd;
	console.log('thisDay', thisDay);
	
	//날짜를 클릭하면 출석 채크
	var myDateFunction = function(id, fromModal) {
        console.log('myDateFunction');
        //return;
        
        var $thisEle = $("#" + id);
        
        
        console.debug('id', id);
        var date = $thisEle.data("date");
        console.log('date', date);
    	var hasEvent = $thisEle.data("hasEvent");
    	console.log('hasEvent', hasEvent);
    	
    	var $infoEle = $thisEle.find('.day');
        console.log($infoEle.data());
        if($infoEle.hasClass('today')){
        	//alert('has today');
        	
        	PAGE_EVENT_VIEW.M_VIEW.on_attend.onclickJoinAttend(thisDay);
        	return;
        }
        
        
    	if(date == thisDay){
    		alert('today');
    		PAGE_EVENT_VIEW.M_VIEW.on_attend.onclickJoinAttend(thisDay);
    		return;
    	}
    
    
        
        
        var thisYear = thisEle.data('year');
        var thisMonth = thisEle.data('month');
        var thisType = thisEle.data('type');
        if(thisDay == 'today'){
			WEB_EVENT.attend.onclickJoinAttend();
        	return;
        }
        return;
    }

    var myNavFunction = function(id, self) {
        console.log('myNavFunction');
        //return;
        var nav = $("#" + id).data("navigation");
        var to = $("#" + id).data("to");
        console.log('nav ' + nav + ' to:'+ to.month + '/' + to.year);
        var sendData = {
        	year : to.year,
        	month :  to.month
        }
    }
    
    //$("#onplay-attend-calendar").zabuto_calendar({language: "kr"});
    
    //return;
    
    var callbackFun = function(listData){
    	console.log('callbackFun');
    	console.debug(listData);
    	return;
    	//member
		if(isDefined(listData[33]) == true){
    		member_data = listData[33];
    		console.debug(member_data);
    		app.setMember(member_data);
    		jQuery('#event-attend-member-check').show();
    		jQuery('#event-attend-member-check').find('.user_id').html(member_data.nickname);
    	}
    	
    	//attend data
		if(isDefined(listData[32]) == true){
    		attend_data = listData[32];
    		console.debug(attend_data);
			jQuery('#event-attend-member-check').find('.total').html(attend_data.attend_days);
    		jQuery('#event-attend-member-check').find('.check-day').html(attend_data.succession_count);
    	}

    }
    
	PAGE_EVENT_VIEW.M_VIEW.on_attend.DATA = null;
	//var getUrl = app.DEFINE.SERVER_PROTOCOL + app.PROTOCOL.URL.EVENT.ATTEND_LIST+'/1/';
	var getUrl = DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.ATTEND_LIST+'/1/';
	
	PAGE_EVENT_VIEW.M_VIEW.on_attend.DATA = $("#onplay-attend-calendar").zabuto_calendar({
  		/*
		  year: gYear,
      	month: gMonth,
  		//data : gEventData,
  		*/
  		cell_border: true,
  		action: function () {
			return myDateFunction(this.id, false);
    	},
        action_nav: function () {
            
			return myNavFunction(this.id, this);
        },
        ajax: {
            url: getUrl,
            /*modal: true*/
        },
		language: "kr",
		//today: true,
		weekstartson: 0,
		nav_icon: {
	        prev: '<i class="onple-select-month m_prev btn_move prev"><a></a></i>',
	        next: '<i class="onple-select-month m_next btn_move next"><a></a></i>'
		},
		callbackFun : callbackFun,
	});
	console.debug(PAGE_EVENT_VIEW.M_VIEW.on_attend.DATA);
};


//vip coupon download
PAGE_EVENT_VIEW.M_VIEW.getVipDownloadCoupon = function(){
	console.log('M_VIEW.getVipDownloadCoupon');
	
	if(utility.disk.checkIsVip() != true){
		alert('VIP 회원 전용 이벤트입니다.');
		return;
	}
	var sendData = {
		is_mobile	: 0,
	};
	
	
	var successFunGetEventJoinFun = function(data){
		console.log('successFunGetEventJoinFun', data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			return;
		}
	};

	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.VIP_DOWNCOUPON_GET,
		data		: sendData,
		success_fun	: successFunGetEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//vip coupon download
PAGE_EVENT_VIEW.M_VIEW.getWebtoonGetPoint = function(){
	console.log('M_VIEW.getWebtoonGetPoint');
	
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		if(confirm("실명인증 후 이벤트에 참여가능합니다.\n실명인증을 진행하시겠어요?") == true){
			GO_MENU('real_name');
			return;	
		}
		return;
	}
	var sendData = {
		is_mobile	: 0,
	};
	
	
	var successFunGetWebtoonEventJoinFun = function(data){
		console.log('successFunGetWebtoonEventJoinFun', data);
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//return;
		}
		GO_TOPTOON();
		return;
	};

	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.WEBTOONPOINT_GET,
		data		: sendData,
		success_fun	: successFunGetWebtoonEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


/* event detail fun */

//test event view
PAGE_EVENT_VIEW.M_VIEW.test = function(pagData){
	console.log('PAGE_EVENT_VIEW.M_VIEW.test');
	console.log(pagData);
};


//blog posting
PAGE_EVENT_VIEW.M_VIEW.joinBlogPostingEvent = function(formEleId){
	console.log('M_VIEW.joinBlogPostingEvent');
	
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	if(utility.disk.checkIsRealName() != true){
		if(confirm("실명인증 후 이벤트에 참여가능합니다.\n실명인증을 진행하시겠어요?") == true){
			GO_MENU('real_name');
			return;	
		}
		return;
	}
	
	if(isDefined(formEleId) == false){
		alert('정보가 올바르지 않습니다.');
		return;
	}
	
	var regUrlType = function(data) {
		var regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;
		return regex.test(data);
	};

	
	var $targetFrom = $('#'+formEleId);
	if($targetFrom.length < 1){
		return false;
	}
	var formValues = $targetFrom.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);
	
	if(isDefined(formData.blogId) == false){
		alert('포털 아이디를 입력해 주세요.');
		$targetFrom.find('input[name=blogId]').focus();
		return false;
	}
	
	if(isDefined(formData.blogUrl) == false){
		alert('등록한 사이트 Url를 입력해 주세요.');
		$targetFrom.find('input[name=blogUrl]').focus();
		return false;
	}
	
	if(formData.blogUrl.length < 10 || regUrlType(formData.blogUrl) != true){
		alert('정확한 Url를 입력해 주세요.');
		$targetFrom.find('input[name=blogUrl]').focus();
		return false;
	}
	
	var sendData = 
	{
		blog_type : formData.postingType,
		blog_id : formData.blogId,
		blog_url : formData.blogUrl,
		is_mobile : 0
	};
	
	var successFunSetJoinEventJoinFun = function(data){
		console.log('successFunSetJoinEventJoinFun', data);
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//return;
		}
		
		return;
	};

	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.JOIN_BLOG_POST_GET,
		data		: sendData,
		success_fun	: successFunSetJoinEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//2021 happy new year coupon download
PAGE_EVENT_VIEW.M_VIEW.getHappyNewYear2021DownloadCoupon = function(targetModal){
	console.log('M_VIEW.getHappyNewYear2021DownloadCoupon');
	
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	
	if(utility.disk.checkIsRealName() != true){
		if(confirm("실명인증 후 이벤트에 참여가능합니다.\n실명인증을 진행하시겠어요?") == true){
			GO_MENU('real_name');
			return;	
		}
		return;
	}
	
	var sendData = {
		is_mobile	: 0,
	};
		
	var successHappyFunGetEventJoinFun = function(data){
		console.log('successHappyFunGetEventJoinFun', data);
		
		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}
		
		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//return;
		}
		
		//쿠키저장 - 다시 노출 안함
		if(isDefined(targetModal)){
			var DF = get_disk_config(false);
			$.cookie(DF.cookiePrefix+targetModal, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
			$.modal.close();
		}
	};

	
	var ajaxData = 
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.DISK_EVENT_LIST.HAPPY_2021_DOWNCOUPON_GET,
		data		: sendData,
		success_fun	: successHappyFunGetEventJoinFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};