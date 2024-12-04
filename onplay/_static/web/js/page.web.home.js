/*
* home
*/

var PAGE_HOME = {};

PAGE_HOME.start = function(pageSub, pageData){
	console.log('PAGE_HOME.start', pageSub);
	console.log('pagData', pageData);
	if(isDefined(pageData)){
		PAGE_HOME.bindingPageData(pageData);
	}

	PAGE_HOME.initBinding();
	PAGE_HOME.initOnload();
	PAGE_HOME.initHashCheck();
};


PAGE_HOME.bindingPageData = function(pageData){
	console.log('PAGE_HOME.bindingPageData', pageData);
	if(isDefined(pageData) == false){
		return;
	}
	
	//event
	var isOpenEventModal = false;
	
	//정적 이벤트 모달 - 1
	
	//새해 복많이 받으세요
	var savedReadData = 0;
	var eventStaticModal = 'eventHappyNewYearEventModal';
	if(isDefined(eventStaticModal)){
		var DF = get_disk_config(false);
		savedReadData = $.cookie(DF.cookiePrefix+eventStaticModal);
	}
	console.log('savedReadData', savedReadData);
	if(savedReadData != 1){
		if(TEMPLETE.WEB_EVENT_MODAL[eventStaticModal]){
			var modalHtml = TEMPLETE.WEB_EVENT_MODAL[eventStaticModal];
			if(isDefined(modalHtml) == true){
				var isModalCloseExisting = false;
				$('#disk-pc-common-modal-event').html(modalHtml).css('border-radius','15px').modal({
					closeExisting: isModalCloseExisting,
					blockerClass	: "common-event-modal-blocker",
					clickClose: false,
					escapeClose: true,
					showClose	: false
				});
				isOpenEventModal = true;
			}
		}
	}
	
	// 블로그 
	if(isOpenEventModal != true){
		var savedReadData = 0;
		var eventStaticModal = 'eventBlogPostingJoinModal';
		if(isDefined(eventStaticModal)){
			var DF = get_disk_config(false);
			savedReadData = $.cookie(DF.cookiePrefix+eventStaticModal);
		}
		console.log('savedReadData', savedReadData);
		if(savedReadData != 1){
			if(TEMPLETE.WEB_EVENT_MODAL[eventStaticModal]){
				var modalHtml = TEMPLETE.WEB_EVENT_MODAL[eventStaticModal];
				if(isDefined(modalHtml) == true){
					var isModalCloseExisting = false;
					$('#disk-pc-common-modal-event').html(modalHtml).css('border-radius','15px').modal({
						closeExisting: isModalCloseExisting,
						blockerClass	: "common-event-modal-blocker",
						clickClose: false,
						escapeClose: true,
						showClose	: false
					});
					isOpenEventModal = true;
				}
			}
		}
	}
	
	// 닉네임 이벤트
	/*
	if(isOpenEventModal != true){
		var savedReadData = 0;
		var eventStaticModal = 'eventJoinNicknamePointGiftModal';
		if(isDefined(eventStaticModal)){
			var DF = get_disk_config(false);
			savedReadData = $.cookie(DF.cookiePrefix+eventStaticModal);
		}
		console.log('savedReadData', savedReadData);
		if(savedReadData != 1){
			if(TEMPLETE.WEB_EVENT_MODAL[eventStaticModal]){
				var modalHtml = TEMPLETE.WEB_EVENT_MODAL[eventStaticModal];
				if(isDefined(modalHtml) == true){
					var isModalCloseExisting = false;
					$('#disk-pc-common-modal-event').html(modalHtml).css('border-radius','15px').modal({
						closeExisting: isModalCloseExisting,
						blockerClass	: "common-event-modal-blocker",
						clickClose: false,
						escapeClose: true,
						showClose	: false
					});
					isOpenEventModal = true;
				}
			}
		}
	}
	*/
	
	// 리뷰 이벤트
	/*
	if(isOpenEventModal != true){
		var savedReadData = 0;
		var eventStaticModal = 'eventAppReviewCouponGiftModal';
		if(isDefined(eventStaticModal)){
			var DF = get_disk_config(false);
			savedReadData = $.cookie(DF.cookiePrefix+eventStaticModal);
		}
		console.log('savedReadData', savedReadData);
		if(savedReadData != 1){
			if(TEMPLETE.WEB_EVENT_MODAL[eventStaticModal]){
				var modalHtml = TEMPLETE.WEB_EVENT_MODAL[eventStaticModal];
				if(isDefined(modalHtml) == true){
					var isModalCloseExisting = false;
					$('#disk-pc-common-modal-event').html(modalHtml).css('border-radius','15px').modal({
						closeExisting: isModalCloseExisting,
						blockerClass	: "common-event-modal-blocker",
						clickClose: false,
						escapeClose: true,
						showClose	: false
					});
					isOpenEventModal = true;
				}
			}
		}
	}
	*/
	
	//view server modal
	/*
	if(isOpenEventModal != true){
		if(isDefined(pageData.has_event)){
			if(pageData.has_event == true){
				var eventData = pageData.event_data;
				//쿠키 채크
				var savedReadData = 0;
				if(isDefined(eventData.modal)){
					var DF = get_disk_config(false);
					savedReadData = $.cookie(DF.cookiePrefix+eventData.modal);
				}
				console.log('savedReadData', savedReadData);
				if(savedReadData != 1){
					if(TEMPLETE.WEB_EVENT_MODAL[eventData.modal]){
						var modalHtml = TEMPLETE.WEB_EVENT_MODAL[eventData.modal];
						if(isDefined(modalHtml) == true){
							var isModalCloseExisting = false;
							$('#disk-pc-common-modal-event').html(modalHtml).css('border-radius','15px').modal({
								closeExisting: isModalCloseExisting,
								blockerClass	: "common-event-modal-blocker",
								clickClose: false,
								escapeClose: true,
								showClose	: false
							});
							isOpenEventModal = true;
						}
					}
				}
			}
		}
	}
	*/
	
	//정적 이벤트 모달 - attend
	/*
	if(isOpenEventModal != true){
		//쿠키 채크
		var savedReadData = 0;
		var eventStaticModal = 'eventAttendJoinOnplayModal';
		if(isDefined(eventStaticModal)){
			var DF = get_disk_config(false);
			savedReadData = $.cookie(DF.cookiePrefix+eventStaticModal);
		}
		console.log('savedReadData', savedReadData);
		if(savedReadData != 1){
			if(TEMPLETE.WEB_EVENT_MODAL[eventStaticModal]){
				var modalHtml = TEMPLETE.WEB_EVENT_MODAL[eventStaticModal];
				if(isDefined(modalHtml) == true){
					var isModalCloseExisting = false;
					$('#disk-pc-common-modal-event').html(modalHtml).css('border-radius','15px').modal({
						closeExisting: isModalCloseExisting,
						blockerClass	: "common-event-modal-blocker",
						clickClose: false,
						escapeClose: true,
						showClose	: false
					});
					isOpenEventModal = true;
				}
			}
		}
	}
	*/
	
};

PAGE_HOME.initBinding = function(){
	console.log('PAGE_HOME.initBinding');
	
	WEB_COMMON.setBindingAfterPageDataLoad();

	//on pic
	$( ".on_tab_action" ).bind( "click");
	$( ".on_tab_action" ).bind( "click", function() {
		var eleData = $(this).data();
		console.log('eleData',eleData);

		//taget list
		$tagetContentsEle = $('.'+eleData.target+'.'+eleData.type);
		$('.'+eleData.target).removeClass('active');
		$tagetContentsEle.addClass('active');

		//tab
		$('.on_tab_action.'+eleData.onpick).removeClass('active');
		$(this).addClass('active');

	});



	//rank top 100
	$( ".rank_tab_tit" ).bind( "click");
	$( ".rank_tab_tit" ).bind( "click", function() {
		var selfEle = this;
		var eleData = $(selfEle).data();
		console.log('eleData',eleData);

		/*
		//taget list
		$tagetContentsEle = $('.'+eleData.target+'.'+eleData.type);
		$('.'+eleData.target).removeClass('active');
		$tagetContentsEle.addClass('active');

		//tab
		$('.on_tab_action.'+eleData.onpick).removeClass('active');
		$(this).addClass('active');
		*/

		if(isDefined(eleData.cate) == false){
			return;
		}

		var targetEleClass = '.top_list.cate_'+eleData.cate;
		if($(targetEleClass).find('.main_rank_list_item').length > 0){
			console.log('has data load yet');
			WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS = [];
			$('.'+eleData.target+'.active').removeClass('active');
			$(targetEleClass).addClass('active');

			$('.rank_tab_tit.active').removeClass('active');
			$(selfEle).addClass('active');
			if(eleData.cate == '0'){
				WEB_COMMON.setBindingAfterPageDataLoad();	
			}
			return;
		}



		var successFunGetRankMainList = function(data){
			console.log('successFunGetRankMainList', data);
			//console.log('eleData', eleData);

			if(isDefined(data.main_rank_top)){
				var rankList = data.main_rank_top.rank_list;
				var rankListHtml = [];
				WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS = [];
				for(var i =0; i < rankList.length; i++){
					var diskRank = new Main_rank_list(0, i+1);
					diskRank.setData(rankList[i]);
					var bg = "";
					if(i+1 <= rankList.length && (i+1)%2 == 0){
						bg = "bg";
					}
					//랭크 갱신
					//WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS.push(parseInt(rankList[i].rank_bbs_idx));
					//console.log(diskRank);
					rankListHtml[i] = diskRank.getMainRankListHtml(bg);
				}

				//console.log('rankListHtml', rankListHtml);
				var getCategory = data.main_rank_top.rank_category;
				targetEleClass = '.top_list.cate_'+getCategory;

				if(rankListHtml.length > 0){
					$(targetEleClass).find('.main_rank_list').html(rankListHtml.join(''));

					$('.'+eleData.target+'.active').removeClass('active');
					$(targetEleClass).addClass('active');

					$('.rank_tab_tit.active').removeClass('active');
					$(selfEle).addClass('active');
				}

			}


		};

		var formData =
		{
			category	: eleData.cate
		};

		var ajaxData =
		{
			url			: DISK_PROTOCOL.ONPLAY_URL.HOME.TOP_RANK,
			data		: formData,
			success_fun	: successFunGetRankMainList,
			error_fun	: null
		};
		DISK_PROTOCOL.AJAX(ajaxData);


	});
};




PAGE_HOME.initOnload = function(){
	console.log('PAGE_HOME.initOnload');
	
	//onpic random default select
	var randomOnPickShow = function(){

		var tmpTimestamp = new Date().getTime();
		var tM = tmpTimestamp % 3;
		var tB = (tmpTimestamp + tmpTimestamp) % 3;
		console.log('tM', tM);
		console.log('tB', tB);
		$(".on_tab_action.movie").eq(tM).trigger( "click" );
		$(".on_tab_action.broadcast").eq(tB).trigger( "click" );
	};
	randomOnPickShow();
	/*
	//main center big banner
	$('#main_banner_slider').simpleBanner({
		autoPlayDuration:3000,
		eventType:'mouseenter',
		animation:'slide'
	});
	//main good contents list

	$('#main_good_contents_slider').simpleBanner({
		speed:1000,
		autoPlayDuration:2500,
		dots:'good_dots',
		eventType:'mouseenter',
		animation:'fade'
	});
	//main_right_banner_slider
	$('#main_right_banner_slider').simpleBanner({
		autoPlayDuration:2000,
		eventType:'mouseenter',
		animation:'slide'
	});
	*/

	//keyword ranking
	if($('#main_top_keyword_rank_slick').find('.rk_item').length > 1){
		$('#main_top_keyword_rank_slick').slick({
			vertical: true,
			autoplay: true,
			autoplaySpeed: 3000,
			speed: 300,
			arrows : false,
			dots	: false
		});
	}

	//main center big banner
	if($('#main_banner_slick').find('.main_banner_slick_item').length > 1){
		$('#main_banner_slick').slick({
			infinite: true,
			speed: 400,
			fade: false,
			autoplay: true,
			autoplaySpeed	: 3000,
			cssEase: 'linear',
			arrows : false,
			dots	: false
		});
	}
	//main good contents list
	
	if($('#main_good_contents_slick').find('.main_good_contents_slick_item').length > 1){
		$('#main_good_contents_slick').slick({
			dots: false,
			infinite: true,
			speed: 500,
			fade: true,
			autoplay: true,
			autoplaySpeed	: 3000,
			cssEase: 'linear',
			arrows : false,
			dotsClass : 'good_dots'
		});
	}
	
	//main_right_banner_slider
	if($('#main_right_banner_slick').find('.main_right_banner_slick_item').length > 1){
		$('#main_right_banner_slick').slick({
			infinite: true,
			speed: 500,
			fade: false,
			autoplay: true,
			autoplaySpeed	: 3500,
			cssEase: 'linear',
			arrows : false,
			dots	: false
		});
	}
	
	
	


	/*
	$(".lazy").slick({
        lazyLoad: 'ondemand', // ondemand progressive anticipated
        infinite: true,
        autoplay: true,
        speed: 500
      });
 	*/

};


//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_HOME.initHashCheck = function(hashPrams){
	console.log('PAGE_HOME.initHashCheck');
	
	if(isLoadedBbqScript() != true){
		
		var homeHash = location.hash;
		console.log('homeHash', homeHash);
		//if(homeHash)
		if(homeHash == '#!action=login'){
			$('#disk-pc-login-modal').modal({
				clickClose		: false,
				escapeClose		: true
			});
			//location.hash = '';
			history.replaceState({}, document.title, ".");
		}else if(homeHash == '#!action=join'){
			location.href = '/login/join/?rt_uri=';
		}
		
		return;
	}
	if(isDefined(hashPrams) == false){
		//hash check
		hashPrams = $.deparam.fragment();
	}
	console.log('hashPrams', hashPrams);
	if(isDefined(hashPrams['!action']) == false){
		return;
	}
	console.log(hashPrams['!action']);
	if(hashPrams['!action'] == 'login'){
		$('#disk-pc-login-modal').modal({
			clickClose		: false,
			escapeClose		: true
		});
	}

	if(hashPrams['!action'] == 'contents'){
		if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
			WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']));
		}
	}

	return;

};

PAGE_HOME.openOuterPop =  function (popUrl){
    var url = popUrl;
    var option="resizable=no, scrollbars=yes, status=no,width=500, height=500";
    window.open(url,"",option);
};

//인기 검색어 전체 보기
PAGE_HOME.onclickOpenRealrankingKeywordPop =  function (thisEle){
	console.log('PAGE_HOME.onclickOpenRealrankingKeywordPop');
	var targetEle = $(thisEle).data('target');
	var openType = $(thisEle).data('type');
	console.log('targetEle', targetEle);
	console.log('openType', openType);

	if(isDefined(targetEle)){
		if(openType == 'add'){
			$(targetEle).addClass('active');
			$(thisEle).data('type','remove');
		}else{
			$(targetEle).removeClass('active');
			$(thisEle).data('type','add');
		}
	}
};

//event modal 페이지 세부보기
PAGE_HOME.onclickEventModalPopupGoDetailPage = function(thieEle){
	var eleData = $(thieEle).data();
	console.log(eleData);
	if(isDefined(eleData) == true){
		
		//쿠키저장 - 다시 노출 안함
		if(isDefined(eleData.target)){
			var DF = get_disk_config(false);
			$.cookie(DF.cookiePrefix+eleData.target, 1, { expires: 7,  path: '/', domain: DF.COOKIE_DOMAIN });
		}
		//외부 링크 여부 - blank open
		var isOpen = 0;
		if(isDefined(eleData.open)){
			isOpen = 1;
		}
		if(isDefined(eleData.url)){
			//location.href = eleData.url;
			if(isOpen == 1){
				var a = document.createElement('a');
				a.target='_blank';
				a.href = eleData.url;
				a.click();
				
				$.modal.close();
				return;	
			}else{
				location.href = eleData.url;
				return;
			}
		}
		$.modal.close();
	}
		
};




PAGE_HOME.remote = {};

PAGE_HOME.remote.go = function(){
    window.open('http://939.co.kr/onplay','온플레이 원격지원서비스','width=1200, height=650, left=100, top=100, menubar=no, status=no, toolbar=no, scrollbars=no');
};


