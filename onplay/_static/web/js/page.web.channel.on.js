/*
*	channel on common
*/

//채널
var PAGE_CHANNEL_ON = {};
PAGE_CHANNEL_ON.DATA = {
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_CHANNEL_ON.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL_ON.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL_ON.DATA.LAST_HASH = '#!action=channel_on';

	PAGE_CHANNEL_ON.initBinding();
	PAGE_CHANNEL_ON.initOnload();
	//PAGE_CHANNEL_ON.setHashCheck(null);


};

PAGE_CHANNEL_ON.initBinding = function(){
	console.log('PAGE_CHANNEL_ON.initBinding');



};

//오른쪽 메뉴 바인딩
PAGE_CHANNEL_ON.rightBinding = function(){
	console.log('PAGE_CHANNEL_ON.initBinding');

	//오른쪽 메뉴 오픈
	$( ".on-channel-right-arrow-menu" ).unbind( "click");
	$( ".on-channel-right-arrow-menu" ).bind( "click", function() {
		console.log('.on-channel-right-arrow-menu');
		$(this).parent().toggleClass('active');
	});
	
	//click binding
	$( "a.channel-on-right-sub-menu" ).unbind( "click");
	$( "a.channel-on-right-sub-menu" ).bind( "click", function(e) {
		console.log('a.channel-on-right-sub-menu');
		//$(this).parent().toggleClass('active');
		var channelType = 'theme';
		if(isDefined($(this).data('type')) == true){
			 channelType = $(this).data('type');
		}
		var channelSubTitle = $(this).find('.channel-cate-menu').text();
		console.log('channelSubTitle', channelSubTitle);
		if(isDefined(channelSubTitle)){
			$('#channelSubTitle').text(channelSubTitle);
		}
		
		var url = $(this).attr('href');
		if(isDefined(url) == true){
			if(channelType == 'movie'){
				PAGE_MOVIE_M_LIST.goSearchContentsDatayPjax(url);
			}else if(channelType == 'broadcast'){
				PAGE_BROADCAST_B_LIST.goSearchContentsDatayPjax(url);
			}else{
				location.href = url;
			}
			e.preventDefault();
		}
		$('.on_pick_right.active').find('.list-itme.active').removeClass('active');
		$(this).closest('.list-itme').addClass('active');
		
	});
	

};

//채널 추천하기
PAGE_CHANNEL_ON.onclickChannelRecommend = function(thisEle){
	console.log('PAGE_CHANNEL_ON.onclickChannelRecommend');
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(isDefined(eleData.idx) == false){
		console.log('idx err');
		alert('정보가 올바르지 않습니다.');
		return;
	}

	//로그인 채크
	if(utility.disk.checkIsLoginWithModal() != true){
		return;
	}

	if($(thisEle).hasClass('active')){
		$.ambiance({message: '이미 추천하셨습니다.', type: "alert-danger"});
		return;
	}

	$(thisEle).addClass('active');

	var successChannelRecommendFun = function(data){
		console.log('successChannelRecommendFun');
		console.log(data);
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		if(isDefined(eleData.target)){
			var $numEle = $(eleData.target);
			if($numEle.length > 0){
				$numEle.text(disk_number_format(data.ok_cnt));
			}
		}
	};
	COMMON_ACTION.CHANNEL.setRecommend(eleData, successChannelRecommendFun);
};


//채널 view
var PAGE_CHANNEL_ON_VIEW = {};
PAGE_CHANNEL_ON_VIEW.DATA = {
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_CHANNEL_ON_VIEW.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL_ON_VIEW.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL_ON_VIEW.DATA.LAST_HASH = '#!action=channel_on';

	PAGE_CHANNEL_ON_VIEW.initBinding();
	PAGE_CHANNEL_ON_VIEW.initOnload();
	//PAGE_CHANNEL_ON_VIEW.setHashCheck(null);


};



PAGE_CHANNEL_ON_VIEW.initBinding = function(){
	console.log('PAGE_CHANNEL_ON_VIEW.initBinding');

	//출연자의 다른 작품
	$( ".arrow-channel-other-actor" ).unbind( "click");
	$( ".arrow-channel-other-actor" ).bind( "click", function() {
		console.log('.arrow-channel-other-actor');
		$(this).parent().toggleClass('active');
	});


};

//오른쪽 메뉴 바인딩
PAGE_CHANNEL_ON_VIEW.rightBinding = function(){
	console.log('PAGE_CHANNEL_ON_VIEW.initBinding');
	PAGE_CHANNEL_ON.rightBinding();

};


PAGE_CHANNEL_ON_VIEW.initOnload = function(){
	console.log('PAGE_CHANNEL_ON_VIEW.initOnload');
	
	//평점  별표 - stars
	utility.halfRatingStars('#halfRatingStars');
	
	//slick steel cut
	var $slickTarget = $('#channel-view-steel-cut-slick');
	if($slickTarget.find('.slick-item').length > 1){
		$slickTarget.on('init', function(slick){
		  console.log('init');
		  console.log(slick);
		  $('.btn-channel-movie-steel-cut-slick').removeAttr("style");
		});

		$slickTarget.slick({
			lazyLoad: 'ondemand',
			infinite: true,
			arrows : true,
			draggable: false,
			prevArrow : $('.channel-movie-steel-cut-slick-prev'),
			nextArrow : $('.channel-movie-steel-cut-slick-next'),
			dots	: false
		});

		$slickTarget.on('afterChange', function(event, slick, currentSlide){
			console.log(currentSlide);
			$('.channel-movie-steel-cut-slick-current-page').text((currentSlide + 1));
		});
	}

	//코멘트 스크롤 스파이
	/*
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
					t		: 'channel',
					target	: 'disk-channel-comment-list-warp-'+eleData.idx,
					info	: 'comment-list-channel-pagnation-controller',
				}
				WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
				$(this).data('load', 1);
			}
		}
	});
	var $scrollSpy =  $('.common-comment-write-wrap').scrollSpy();
	*/

	//스크롤 스파이 - 최신자료, 코멘트
	if($('#onplayFormHeaderLoadedInfo').find('.scrollspy_js_file').data('loaded') == 1){
		var $scrollSpyEle = $('.common-channel-scroll-spy-wrap');
		if($scrollSpyEle.length > 0){
			$scrollSpyEle.on('scrollSpy:enter', function() {
				var eleData = $(this).data();
				console.log('enter', eleData);
	
				var spyType = 'comment';
				if(isDefined(eleData.type)){
					spyType = eleData.type;
				}
				//load -0 첨, 1-불러오는중, 2-완료
				var isLoaded = 0;
				if(isDefined(eleData.load)){
					isLoaded = parseInt(eleData.load);
				}
	
				if(isLoaded > 0){
					console.log('already loaded:'+spyType);
					return;
				}
	
				if(isLoaded == 0){
					//코멘트
					if(eleData.type == 'comment'){
						console.log('comment not loaded');
						var sendData = {
							idx		: eleData.idx,
							page	: 1,
							t		: 'channel',
							target	: 'disk-channel-comment-list-warp-'+eleData.idx,
							info	: 'comment-list-channel-pagnation-controller',
						}
						if(isDefined(eleData.count) == true){
							if(eleData.count > 0){
								WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
							}
						}
						$(this).data('load', 1);
	
					//채널 최신 자료
					}else if(eleData.type == 'channel'){
						console.log('channel not loaded');
	
						eleData.target	= 'disk-channel-contents-list-warp-'+eleData.idx;
						eleData.infoEle = $(this);
	
						$(this).data('load', 1);
						if(isDefined(eleData.cate) == false || isDefined(eleData.search) == false){
							return;
						}
						console.log('enter', eleData);
	
						//console.log('sendData', sendData);
						//WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
						PAGE_CHANNEL_ON_VIEW.getLastContentsList(eleData);
	
	
	
					}
				}
	
	
			});
			var $scrollSpy =  $scrollSpyEle.scrollSpy();
		}
	}


};


//최신 자료 가져오기
PAGE_CHANNEL_ON_VIEW.getLastContentsList = function(eleData){
	console.log('PAGE_CHANNEL_ON_VIEW.getLastContentsList', eleData);

	if(isDefined(eleData.search) == false || isDefined(eleData.cate) == false || eleData.type != 'channel'){
		console.log('err prams');
		return;
	}

	var sendData = {
		k			: eleData.search,		//kewword
		c			: eleData.cate,		//select category
		m			: eleData.cate,		//cate1
		l			: 15,		//limit
		sk			: 'N',		//sort
		ba			: '',		//block adult
		page		: 1,
		is_mobile	: 0,		//is mobile
		nc			: 1,			//no count
		is_channel  : 1
	};


	var successFunGetLastSearchContentsList = function(data){
		console.log('successFunGetSearchContentsList', data);

		if(isDefined(data.search_data)){

			var bbsListData = data.search_data.contents_list;
			var bbsListHtml = [];
			var diskBbs = null;
			var contentsCount = 0;
			for(var i =0; i < bbsListData.length; i++){
				diskBbs = new Contents_list(i+1, 0, 'search');
				diskBbs.setData(bbsListData[i]);
				//console.log(diskBbs);
				bbsListHtml[i] = diskBbs.getCantegoryListSmallHtml('channel');
				contentsCount++;
			}
			//contentsCount = 0;
			var innerContentsHtml = bbsListHtml.join('');
			if(isDefined(eleData.target) == true){
				$('#'+eleData.target).html(innerContentsHtml);
			}

			if(isDefined(eleData.infoEle)){
				eleData.infoEle.data('load', 2);
			}

			if(contentsCount < 1){
				if(isDefined(eleData.infoEle)){
					eleData.infoEle.hide();
					$('.on_new_content.noc').show();
				}
			}
			
			
		}

	};

	COMMON_ACTION.SEARCH.getSearchContentsList(sendData, successFunGetLastSearchContentsList);


};


//채널 자세히 보기 클릭
PAGE_CHANNEL_ON_VIEW.openChannelView = function(thisEle){
	console.log('PAGE_CHANNEL_ON_VIEW.openChannelView');

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	var retrunUrl = getSelfHostFullUrl();
	console.log('retrunUrl', retrunUrl);
	
	var rankType = 'movie';
	if(isDefined(eleData.rank_type)){
		rankType = eleData.rank_type;
	}
	var rankIdx = null;
	if(isDefined(eleData.idx)){
		rankIdx = eleData.idx;
	}
	if(rankType == 'magazine' || rankType == 'mag'){
		if(isDefined(rankIdx)){
			WEB_COMMON_GO.openContents(rankIdx, 'magazine');
			return;
		}
	}
	
	var actionHref = '';
	if(isDefined(eleData.href) == false){
		voidLinkHref();
		return;
	}

	var actionHref = eleData.href;
	if(isDefined(retrunUrl)){
		//actionHref = eleData.href + '?rt_url='+encodeURIComponent(retrunUrl);
		var DF = get_disk_config(false);
		$.cookie(DF.cookiePrefix+'rt_channel_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });

	}
	//console.log(actionHref);
	//return;
	
	//광고도메인은 로그인후
	if(isAdDomain() == true){
		if(utility.disk.checkIsLogin() != true){
			GO_MENU('login');
			return;
		}
	}

	//성인 체크
	if(eleData.is_adult == 1){
		/* omh 219-12-18 성인체크*/
		if(utility.disk.checkIsLogin() == true){
			  if(!utility.disk.checkIsAdultMember()){
					  alert("성인인증을 하셔야만 볼 수 있는 콘텐츠입니다.");
						GO_ADULT_AUTH();
						return;
				}else{
						window.location = actionHref;
				}
		}else{
			 alert("로그인을 하셔야만 볼 수 있는컨텐츠입니다.");
			 GO_LOGIN();
			 return;
		}
		return;

	}else{
		window.location = actionHref;
	}
};


//onpick rank click
PAGE_CHANNEL_ON_VIEW.onclickOnpickRank = function(thisEle){
	console.log('PAGE_CHANNEL_ON_VIEW.onclickOnpickRank');
	PAGE_CHANNEL_ON_VIEW.openChannelView(thisEle);
	return;

};

//목록으로 돌아가기
PAGE_CHANNEL_ON_VIEW.onclickChannelDetailBack = function(thisEle){
	console.log('PAGE_CHANNEL_ON_VIEW.onclickChannelDetailBack');
	var eleData = $(thisEle).data();

	var DF = get_disk_config(false);
	var returnUrl = $.cookie(DF.cookiePrefix+'rt_channel_url');
	if(isDefined(returnUrl)){
		$.removeCookie(DF.cookiePrefix+'rt_channel_url', { path: '/',domain: DF.COOKIE_DOMAIN });
		location.href = returnUrl;
		return;
	}

	if(isDefined(eleData.link)){
		location.href = eleData.link;
	}

};


//숨긴 출연진 보이기
PAGE_CHANNEL_ON_VIEW.onclickShowInfoListAll = function(thisEle){
	console.log('PAGE_CHANNEL_ON_VIEW.onclickShowInfoListAll');
	if(isDefined($(thisEle).data('target'))){
		$($(thisEle).data('target')).find('.hide-list').removeClass('hide-list');
		$(thisEle).remove();
	}
};


//channel on homm
PAGE_CHANNEL_ON_HOME = {};

PAGE_CHANNEL_ON_HOME.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL_ON_HOME.start', pageSub);
	console.log(pagData);

	PAGE_CHANNEL_ON.rightBinding();
	PAGE_CHANNEL_ON_HOME.initBinding();
	

};



PAGE_CHANNEL_ON_HOME.initBinding = function(){
	console.log('PAGE_CHANNEL_ON_HOME.initBinding');


};

PAGE_CHANNEL_ON_HOME.initOnload = function(){
	console.log('PAGE_CHANNEL_ON_HOME.initOnload');
};

PAGE_CHANNEL_ON_HOME.clickOnpicTab = function(thisEle){
	console.log('PAGE_CHANNEL_ON_HOME.clickOnpicTab');	
	
	$('.onpick-home-tab').removeClass('active');
	$(thisEle).addClass('active');
	$('.onpick-home-tab-view').removeClass('active');
	utility.onClikcTogleTargetEle('#'+$(thisEle).data('target'));
};


/*매거진 */

var PAGE_MAG = {};

PAGE_MAG.start = function(pageSub, pagData){
	console.log('PAGE_MAG.start', pageSub);
	console.log(pagData);

	PAGE_CHANNEL_ON.rightBinding();

	if(pageSub == 'g_list'){
		PAGE_MAG_G_LIST.start(pageSub, pagData);
	}else if(pageSub == 'best_list'){
		PAGE_MAG_BEST_LIST.start(pageSub, pagData);
	}
};


//영화 리스트
var PAGE_MAG_BEST_LIST = {};
PAGE_MAG_BEST_LIST.start = function(pageSub, pagData){
	console.log('PAGE_MAG_BEST_LIST.start');
	
	//WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS = null;
	WEB_COMMON.setBindingAfterPageDataLoad();	
	
	
};


var PAGE_MAG_G_LIST = {};


PAGE_MAG_G_LIST.start = function(pageSub, pagData){
	console.log('PAGE_MAG_G_LIST.start', pageSub);
	console.log(pagData);
	//PAGE_MAG_G_LIST.DATA.LAST_HASH = '#!action=movie_list&page=1';
	PAGE_MAG_G_LIST.setBindingPjax();
	
	PAGE_MAG_G_LIST.initBinding();
	
	//PAGE_MAG_G_LIST.setHashCheck(null);
	
	
};

PAGE_MAG_G_LIST.initBinding = function(){
	console.log('PAGE_MAG_G_LIST.initBinding');	
	//WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS = null;
};

PAGE_MAG_G_LIST.afterOnload = function(){
	console.log('PAGE_MAG_G_LIST.afterOnload');	
	
	WEB_COMMON.setBindingAfterPageDataLoad();
};

//pjax binding
PAGE_MAG_G_LIST.setBindingPjax = function(){
	console.log('PAGE_MAG_G_LIST.setBindingPjax');
		
	if($.support.pjax) {
		$.pjax.defaults.scrollTo = false;
		console.log('support pajx');
		//var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
		//console.log('url', url);
		$(document).on('click', 'a.pjax-link', function(event) {
			console.log('clike pjax');
			console.log($(this));
			var containerSelector = '#mag-rank-contents-list-data-thumb';
			var url = $(this).attr('href'); // 앵커태그가 이동할 주소 추출
			console.log('url', url);
			
			$.pjax.click(event, {
				container: containerSelector,
				url: url
			});
            return false;
		});
	}
	
	$(document).on('pjax:send', function() {
		utility.spinnerLoading.show();
	});
	
	$(document).on('pjax:complete', function() {
		utility.spinnerLoading.hide();
		//go top
		//utility.ui.goToElement('#search-contents-list-wrap');
		utility.ui.goToElement('.content.sub');
		
		//image lazy
		WEB_COMMON.setImageLazy();
		PAGE_MAG_G_LIST.afterOnload();
	});
	
	PAGE_MAG_G_LIST.afterOnload();
	
	// for google analytics
	$(document).on('pjax:end', function() {
		ga('set', 'location', window.location.href); // 현재 바뀐 주소를
		ga('send', 'pageview'); // 보고한다
	});
};




//코멘트 쓰기
/*
PAGE_CHANNEL_ON_VIEW.onclickWriteCommentFormAction = function(actionForm){

	if(utility.disk.checkIsLoginWithModal() != true){
		return;
	}

	var $formEle = $('#'+actionForm);

	//event.preventDefault();
	if($formEle.hasClass('was-validated')){
		console.log('was-validated');
		//return false;
	}
	var formValues = $formEle.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}
	if(isDefined(formData.channel_idx)== false || isDefined(formData.comment_type)== false){
		alert('정보가 올바르지 않습니다. 페이지 새로고침후 다시 시도하세요.');
		return;
	}

	if(isDefined(formData.comment_contents)== false || formData.comment_contents.length < 10){
		alert('코멘트를 10자이상 작성해주세요.');
		$formEle.find('textarea[name=comment_contents]').focus();
		return false;
	}

	var sendData = {
		idx	: formData.channel_idx,
		t	: formData.comment_type,
		cc	: formData.comment_contents,
		g	: formData.onplay_rating,
	};

	var successWriteCommentCallbackFun = function(data){
		console.log('successWriteCommentCallbackFun');
		console.log(data);

		var commentListHtml;
		var innerEleName = '#disk-channel-comment-list-warp-'+sendData.idx;

		if(isDefined(data.comment_data)){
			var disk_comment = new Comment_list(sendData.t, 0, 0);
			disk_comment.setData(data.comment_data);
			commentListHtml = disk_comment.getWebEventCommentListHtml();
			$(innerEleName).prepend(commentListHtml);

		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			var msgType =  "alert-info";
			if(data.is_level_up == 1){
				msgType =  "alert-danger";
			}
			$.ambiance({message: data.show_msg, type:msgType});
		}
		//remove
		$formEle.find('textarea[name=comment_contents]').val('');
	};

	COMMON_ACTION.BBS.COMMENT.actionWriteComment(sendData, successWriteCommentCallbackFun);

	return;

};
*/
