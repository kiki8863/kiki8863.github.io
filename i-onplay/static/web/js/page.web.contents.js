/*
* contents
*/

var PAGE_CONTENTS = {};
PAGE_CONTENTS.DATA = {
	SLICK				: null,
	OPENED_MODAL_IDX	: null,		//현재 열려 있는 모달 idx
	OPENED_HASH_IDX		: null,		//현재 열려 있는 hash bbs idx
	OPENED_OPENED_IDX	: null,		//현재 열려 있는 bbs idx
	KAKAO_SHARE_SETTING : null,		//kakao share link setting
};

PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING = 
{
	container: '#KAKAO_SHARD_BTN_ID',
	objectType: 'feed',
	content: {
		title: 'Onplay',
		description: '',
		imageUrl: null,
		link: {
			webUrl:  'https://onplay.co.kr'
		}
	},
	social: {
		likeCount: 100
	},
	buttons: [
		{
			title: '웹에서 동영상 다운로드',
			link: {
				webUrl:   'https://onplay.co.kr'
			}
		}
	]
};
		

PAGE_CONTENTS.start = function(pageSub, pageData){
	console.log('PAGE_CONTENTS.start', pageSub);
	console.log('pageData', pageData);

	PAGE_CONTENTS.initBinding();
	PAGE_CONTENTS.initOnload(pageData);
	
	//PAGE_CONTENTS.setLoadHashCheck();
	
	

	if(isDefined(pageData)){
		if(isDefined(pageData.link)){
			if(pageData.link == 'seller_edit'){
				PAGE_CONTENTS.initOnloadSellerOwner(pageData);
			}
		}
	}

};


PAGE_CONTENTS.initOnload = function(pageData){
	console.log('PAGE_CONTENTS.initOnload');
	console.log('pageData', pageData);

	//회원 로그인에 따른 노출 처리
	var diskMember = DISK_MEMBER_FUN.setMemberInfo(null, false);
	console.log('diskMember', diskMember);

	//컨텐츠 접근권한 체크
	var pagePermision = PAGE_CONTENTS.checkContentsPermision(diskMember,pageData);
	console.log('pagePermision', pagePermision);
	if(pagePermision == false){
		alert('삭제된 콘텐츠이거나 제휴사 요청에 의해서 게시가 중지된 콘텐츠입니다');
		//return;
		/*
		var hashPrams = $.deparam.fragment();
		console.log('hashPrams', hashPrams);
		if(hashPrams['!action'] == 'contents'){
			history.back(true);
			//$.bbq.pushState( {}, 2 );
			//$.bbq.pushState();
			return;
		}
		*/
		if($('.contents-view-blocker.blocker').hasClass('current')){
			$.modal.close();	
		}else{
			history.back(true);
		}
		
		
		return;
	}

	//tooltip
	/*
	$('.disk-tooltip').tooltipster({
		theme: 'tooltipster-light',
		//theme: 'tooltipster-shadow',
		contentCloning: true,
		timer		: 200000,
		debug : false,
		maxWidth	: 200,
		minWidth	: 200,
		side		: 'right'			//top', 'bottom', 'right', 'left'
	});
	*/
	
	PAGE_CONTENTS.setContentsViewScrollSpy(pageData);
		
	//preview player
	if($('.disk-preview-video-player-area').length > 0){
		
		//COMMON_WEB_VIDEO.contentsPreviewVideoInit('#disk-view-video-js-preview-contents', false);
		
		
		var loadFileCnt = 0;
		var successLoadAfterActionFun = function(f, loadedEle){
			console.log('successLoadAfterActionFun', f);
			console.log('loadedEle', loadedEle);
			
			loadFileCnt++;
			if($('.mediaelementplayer_1').data('loaded') != 1){
				
			}
			//미리보기 로드
			if(loadFileCnt > 2){
				if($('.disk-preview-video-player-area').length > 0){
					COMMON_WEB_VIDEO.contentsPreviewVideoInit('#disk-view-video-js-preview-contents', false);
				}
			}
		}

		//media js load
		var scriptSrc = $('#mediaelementplayer_1').val();
		if($('.mediaelementplayer_1').data('loaded') != 1){
			if(isDefined(scriptSrc)){
				loadJsAsync(scriptSrc, successLoadAfterActionFun, 'mediaelementplayer_1');	
			}
		}else{
			loadFileCnt++;
		}
		
		scriptSrc = $('#mediaelementplayer_2').val();
		if($('.mediaelementplayer_2').data('loaded') != 1){
			if(isDefined(scriptSrc)){
				loadJsAsync(scriptSrc, successLoadAfterActionFun, 'mediaelementplayer_2');	
			}
		}else{
			loadFileCnt++;
		}
		
		var cssSrc = $('#mediaelementplayer_css').val();
		if($('.mediaelementplayer_css').data('loaded') != 1){
			if(isDefined(cssSrc)){
				loadCssAsync(cssSrc, successLoadAfterActionFun, 'mediaelementplayer_css');	
			}
		}else{
			loadFileCnt++;
		}
		if(loadFileCnt > 2){
			successLoadAfterActionFun();
		}

		//check login
		if(utility.disk.checkIsLogin() == true){
			$('.wrap-contents-modal-view').addClass('logined');
			$('.disk-preview-video-player-area').find('.login_check_area').addClass('logined');
		}else{
			$('.wrap-contents-modal-view').removeClass('logined');
			$('.disk-preview-video-player-area').find('.login_check_area').removeClass('logined');
			$('.disk-preview-video-player-area').find('.player_guide_login').show();
			
		}
	}
	
	if($('#KAKAO_SHARD_BTN_ID').length > 0){
		console.log('has kakao btn');
		if($('.kakao_developers_1').data('loaded') == 1){
			PAGE_CONTENTS.initKakaoShareBtnBinding();
		}else{
			
			var successLoadKakaoCallbackFun = function(){
				console.log('successLoadKakaoCallbackFun');
				PAGE_CONTENTS.initKakaoShareBtnBinding();
			}
			
			var kakaoJs = $('#kakao_developers_1').val();
			if(isDefined(kakaoJs)){
				loadJsAsync(kakaoJs, successLoadKakaoCallbackFun, 'kakao_developers_1');	
			}
			
		}
		
	}

	//페이지 이전 다음
	if(isDefined(WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS)){
		if(WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS.length > 0){
			console.log('WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS');
			console.log(WEB_COMMON.DATA.PAGE_LOADED_CONTENS_IDXS);
			$('.view_wrap .v_m_btn_area.right').addClass('active').data(pageData);
			$('.view_wrap .v_m_btn_area.left').addClass('active').data(pageData);
		}
	};
	
	//성인 콘텐츠 리스트 성인 아이콘 제거
	if(utility.disk.checkIsAdultMember() == true){
		$('.web-contents-list-li .img_body').removeClass('adult');
		
		if($('.web-contents-list-li .img_body').find('.img-adult-lazy').length > 0){
			$('.img-adult-lazy').lazy();
		}
	}
	
};

//페이지 접근 권한 체크
PAGE_CONTENTS.checkContentsPermision = function(diskMember, pageData){
	console.log('PAGE_CONTENTS.checkContentsPermision');
	console.log('diskMember', diskMember);
	console.log('pageData', pageData);
	//return false;
	if($('.contentsModalViewIsPopup').val() == 1){
		var bbsIdx	= $('.contentsModalViewBbsIdx').val();
	}else{
		if($('#disk-pc-contents-view-modal').length < 1){
			return false;
		}
		var bbsIdx	= $('#disk-pc-contents-view-modal').find('.contentsModalViewBbsIdx').val();
	}
	if(isDefined(bbsIdx) == false || bbsIdx != pageData.bbs_id){
		console.log('bbsIdx', bbsIdx);
		return false;
	}

	var viewData =
	{
		bbsIsCopy	: 	$('#contentsModalViewFlagCopy_'+bbsIdx).val(),
		bbsCopyIdx	: 	$('#contentsModalViewCopyIdx_'+bbsIdx).val(),
		bbsState	: 	$('#contentsModalViewState_'+bbsIdx).val(),
		bbsIsAdult	: 	$('#contentsModalViewFlagAdult_'+bbsIdx).val(),
	};
	console.log('viewData', viewData);
	var bbsState = parseInt(viewData.bbsState);
	var bbsIsAdult	= parseInt(viewData.bbsIsAdult);
	//성인
	if(bbsIsAdult == 1){
		if(isDefined(diskMember) == false){
			console.log('empty diskMember');
			return false;
		}
		if(diskMember.is_adult != 1){
			console.log('diskMember.is_adult', diskMember.is_adult);
			return false;
		}
	}
	//vip
	var jbAry = [1,98,99];
	if(diskMember){
		if(diskMember.member_is_vip < 1){
			//if(bbsState != 1){
			if(jQuery.inArray( bbsState, jbAry ) == -1){
				console.log('member bbsState', bbsState);
				return false;
			}
		}
	}else{
		if(bbsState != 1){
			console.log('non-member bbsState', bbsState);
			return false;
		}
	}
	return true;
};


//컨텐츠 스크롤 제어
PAGE_CONTENTS.setContentsViewScrollSpy = function(pageData){
	console.log('PAGE_CONTENTS.setContentsViewScrollSpy');
	console.log('pageData', pageData);

	var isCheckCommentScrollSpy = false;
	var isActionBtnScrollTopFixed = false;
	var isActionBtnScrollTopBtnFixed = false;

	var enterCommentScrollSpy = function($spyEle){
		console.log('enterCommentScrollSpy');
		var eleData = $spyEle.data();
		console.log('enter', eleData);

		if(isCheckCommentScrollSpy == true){
			return;
		}

		if(isDefined(eleData.count)){
			if(eleData.count < 1){
				console.log('empty comment count', eleData.count);
				isCheckCommentScrollSpy = true;
				return;
			}
		}
		//load -0 첨, 1-불러오는중, 2-완료
		if(isDefined(eleData.load)){
			if(eleData.load > 0){
				return;
			}
			if(eleData.load == 0){
				console.log('get contents comment');
				var sendData = {
					idx		: eleData.idx,
					page	: 1,
					t		: 'contents',
					target	: 'disk-contents-view-comment-list-warp-'+eleData.idx,
					info	: 'comment-list-contents-view-pagnation-controller',
					o		: eleData.owner,
				}
				WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
				$spyEle.data('load', 1);
				isCheckCommentScrollSpy = true;
			}
		}
		return;
	};


	//스크롤 스파이
	if(isDefined(pageData)){
		if(isDefined(pageData.bbs_id)){

			var $blockerModalEle = $('.contents-view-blocker');									//스크롤
			var $contentsViewEle = $('#wrap-contents-modal-view-'+pageData.bbs_id);				//view ele
			var $actionBtnScrollSpyEle = $('.spy-contents-viwe-btn-wrap');						//다운버튼 시작점 ele
			//var $actionBtnScrollSpyEle = $('.spy-contents-viwe-user-area');						//다운버튼 시작점 ele
			var $commentScrollSpyEle =  $('#common-comment-write-wrap-'+pageData.bbs_id);		//코멘트 시작점 ele
			var $userAreaSpyEle = $('.spy-contents-viwe-user-area');							//사용자 만족도 ele
			var $viewTitEle = $('.disk-contents-view-tit');										//view title ele
			var $cWindow = $(window);

			var btnPaddingTop = 36;	//버튼는 감싸고 있는 패딩 높이

			//var 85 70

			if($contentsViewEle.length > 0){

				console.log('window scroll');

				$blockerModalEle.bind('scroll', function() {

					var winTop = $cWindow.scrollTop();
					var currentTop = $blockerModalEle.scrollTop();
					var winHeight = window.innerHeight;
					var vTitHeight = $viewTitEle.outerHeight();
					/*
					console.log('***************************');
					console.log('winTop', winTop);
					console.log('currentTop', currentTop);
					console.log('winHeight', winHeight);
					console.log('vTitHeight', vTitHeight);
					console.log('***************************');
					*/

					//viwe_btn_wrap spy-contents-viwe-btn-wrap
					//btn
					//var btnScrollTop = $actionBtnScrollSpyEle.scrollTop();
					var btnElemTop	= $actionBtnScrollSpyEle.offset().top;
					//var btnElemTopPosition	= $actionBtnScrollSpyEle.position().top;
					var userElemTop	= $userAreaSpyEle.offset().top;
					//var userElemTopPosition	= $userAreaSpyEle.position().top;
					var btnOutHeight = $actionBtnScrollSpyEle.outerHeight();

					//var checkBtnScroll = (btnElemTop + 125) - currentTop;
					//var checkBtnScroll = btnElemTop - (currentTop + btnPaddingTop);
					//var checkBtnScroll = vTitHeight - btnElemTop;
					var checkBtnScroll = btnElemTop - winTop - vTitHeight + 16;
					//var checkOpenScroll = userElemTop - winTop - vTitHeight - btnOutHeight;
					var checkOpenScroll = btnElemTop - winTop - vTitHeight + btnOutHeight;

					var checkFixedTopHeight = vTitHeight + btnOutHeight;

					if(btnOutHeight < 125){
						//checkBtnScrollShow = userElemTop - (currentTop - btnElemTop);
						checkOpenScroll = userElemTop - winTop - vTitHeight - btnOutHeight;
					}
					/*
					console.log('------------------------');
					//console.log('btnScrollTop', btnScrollTop);
					console.log('btnElemTop', btnElemTop);
					//console.log('btnElemTopPosition', btnElemTopPosition);
					console.log('winTop', winTop);
					console.log('btnPaddingTop', btnPaddingTop);
					console.log('userElemTop', userElemTop);
					//console.log('userElemTopPosition', userElemTopPosition);
					console.log('btnOutHeight', btnOutHeight);
					console.log('checkBtnScroll', checkBtnScroll);
					console.log('checkOpenScroll', checkOpenScroll);
					console.log('checkFixedTopHeight', checkFixedTopHeight);
					console.log('------------------------');
					*/
					
					//top title
					if(currentTop > 20){
					//if(btnElemTop < 0){
						//console.log('title top fixed');
						if(isActionBtnScrollTopFixed == false){
							$contentsViewEle.addClass('scroll');
							isActionBtnScrollTopFixed = true;
							$('.view_wrap .btn_top').addClass('active');
						}
					}else if(currentTop < 20){
						if(isActionBtnScrollTopFixed == true){
							$contentsViewEle.removeClass('scroll fixed');
							isActionBtnScrollTopFixed = false;
							//isActionBtnScrollTopBtnFixed = false;
							//isActionBtnScrollTopBtnFixed = false;
							if($contentsViewEle.hasClass('fixed') == true){
								//if(checkBtnScrollShow > -12){
									$contentsViewEle.removeClass('fixed');
									isActionBtnScrollTopBtnFixed = false;
								//}
							}
							$('.view_wrap .btn_top').removeClass('active');
						}
					}

					if(isActionBtnScrollTopFixed == true){

						if(checkBtnScroll < 16 && checkOpenScroll < btnOutHeight && checkFixedTopHeight >= 177){
							if(isActionBtnScrollTopBtnFixed == false){
								if($contentsViewEle.hasClass('fixed') == false){
									$contentsViewEle.addClass('fixed');
									isActionBtnScrollTopBtnFixed = true;
									//btnPaddingTop = 16;
								}
							}

						}

						else if(isActionBtnScrollTopBtnFixed == true && checkBtnScroll <= 16 && checkOpenScroll > 0 && checkFixedTopHeight < 177){
							if($contentsViewEle.hasClass('fixed') == true){
								console.log('checkBtnScroll_b', checkBtnScroll);
								//if(checkBtnScrollShow > -12){
									$contentsViewEle.removeClass('fixed');
									isActionBtnScrollTopBtnFixed = false;
								//}

							}

						}


					}

					/*
					 else if(checkBtnScroll < 0 && checkOpenScroll > 0){
						if(isActionBtnScrollTopBtnFixed == true){
							if($contentsViewEle.hasClass('fixed') == true){
								$contentsViewEle.removeClass('fixed');
								isActionBtnScrollTopBtnFixed = false;
						 		//btnPaddingTop = 36;
							}
						}
					}
					*/

					/*
					//top btn
					if(checkBtnScroll < 8){
					//if(btnElemTop < 0){
						//console.log('btn top fixed');
						if(isActionBtnScrollTopBtnFixed == false){
							$contentsViewEle.addClass('fixed');
							isActionBtnScrollTopBtnFixed = true;
						}
					}
					else if(currentTop < 52){
						if(isActionBtnScrollTopBtnFixed == true){
							$contentsViewEle.removeClass('fixed');
							isActionBtnScrollTopBtnFixed = false;
						}
					}
					*/



					//코멘트 불러오기
					var commentElemTop 	= $commentScrollSpyEle.offset().top;
					var spyEle = commentElemTop - currentTop;
					//console.log('------------------------');
					//console.log('commentElemTop', commentElemTop);
					//console.log('winHeight', winHeight);
					//console.log('btnOutHeight', btnOutHeight);
					//console.log('spyEle', spyEle);
					//console.log('------------------------');
					if((spyEle) < 0){
						//console.log('enter spyEle', spyEle);
						if(isCheckCommentScrollSpy == false){
							console.log('enter spyEle', spyEle);
							enterCommentScrollSpy($commentScrollSpyEle);
						}
					}

				});
			}else{
				//onvie scroll spy
				if($('.webContentsViewIsOuter').val() == 1){
					PAGE_CONTENTS.onViewInit(pageData);
				}
				
			}
		}
	}
};

//on view - no modal
PAGE_CONTENTS.onViewInit = function(pageData){
	console.log('PAGE_CONTENTS.onViewInit');
	console.log(pageData);
	if(isDefined(pageData) == false){
		return;
	}
	if(isDefined(pageData.bbs_id) == false){
		return;
	}
	
	var $commentScrollSpyEle =  $('#common-comment-write-wrap-'+pageData.bbs_id);		//코멘트 시작점 ele
	var isCheckCommentScrollSpy = false;
	var isActionBtnScrollTopFixed = false;
	var isActionBtnScrollTopBtnFixed = false;
	//var loadCommentData = false;
	var enterCommentScrollSpy = function($spyEle){
		console.log('enterCommentScrollSpy');
		var eleData = $spyEle.data();
		console.log('enter', eleData);
		console.log('isCheckCommentScrollSpy', isCheckCommentScrollSpy);
		
		if(isCheckCommentScrollSpy == true){
			return;
		}

		if(isDefined(eleData.count)){
			if(eleData.count < 1){
				console.log('empty comment count', eleData.count);
				isCheckCommentScrollSpy = true;
				return;
			}
		}
		//load -0 첨, 1-불러오는중, 2-완료
		if(isDefined(eleData.load)){
			if(eleData.load > 0){
				return;
			}
			if(eleData.load == 0){
				console.log('get contents comment');
				var sendData = {
					idx		: eleData.idx,
					page	: 1,
					t		: 'contents',
					target	: 'disk-contents-view-comment-list-warp-'+eleData.idx,
					info	: 'comment-list-contents-view-pagnation-controller',
					o		: eleData.owner,
				}
				WEB_COMMON_BBS.COMMENT.setCommentList(sendData);
				$spyEle.data('load', 1);
				isCheckCommentScrollSpy = true;
			}
		}
		return;
	};
	/*
	//스크롤 스파이 - 최신자료, 코멘트
	var $scrollSpyEle = $('.common-contents-scroll-spy-wrap');
	if($scrollSpyEle.length > 0){
		$scrollSpyEle.on('scrollSpy:enter', function() {
			enterCommentScrollSpy($commentScrollSpyEle);
			console.log('scrollSpy:enter');
			return;
		});
		var $scrollSpy =  $scrollSpyEle.scrollSpy();
	}
	
	*/
	//view scroll
	var $cWindow = $(window);
	var $targetSpyEle = $('#contents-view-detail-info-scroll-spy');
	var $fixedEle = $('.scroll-target-menu-fixed-ele');
	var $commentEle = $('.common-contents-scroll-spy-wrap');
	if($targetSpyEle.length < 1){
		return;
	}
	
	var checkMenuHight = 58;
	var offElemTop 	= $targetSpyEle.offset().top;
	var checkTop = offElemTop - checkMenuHight;
	var commentTop = $commentEle.position().top;
	var checkCommentTop = commentTop - 400;
	
	$cWindow.bind('scroll', function() {

		var winTop = $cWindow.scrollTop();
		var currentTop = $targetSpyEle.position().top;
		var winHeight = window.innerHeight;
		//var commentTop = $commentEle.offset().top;
		
		//var vTitHeight = $viewTitEle.outerHeight();
		/*
		console.log('***************************');
		console.log('winTop', winTop);
		console.log('checkTop', checkTop);
		console.log('currentTop', currentTop);
		console.log('offElemTop', offElemTop);
		console.log('winHeight', winHeight);
		console.log('commentTop', commentTop);
		//console.log('commentTop2', commentTop2);
		console.log('***************************');
		*/
		
		if(winTop > checkTop){
			if($fixedEle.hasClass('fixed') == false){
				console.log('menu fixd');
				$fixedEle.addClass('fixed');	
			}
			
		}else{
			if($fixedEle.hasClass('fixed') == true){
				console.log('menu non fixed');
				$fixedEle.removeClass('fixed');
			}
			
		}
		//comment
		if(winTop > checkCommentTop && isCheckCommentScrollSpy == false){
			console.log('isCheckCommentScrollSpy check');
			enterCommentScrollSpy($commentScrollSpyEle);
		}
		
	});		
		

		
};

//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_CONTENTS.setLoadHashCheck = function(){
	console.log('PAGE_CONTENTS.setLoadHashCheck');
	
	if($('.onplay_form_info_bbq_load').length < 1){
		return;
	}
	if($('.onplay_form_info_bbq_load').data('loaded') != 1){
		return;
	}
	
	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != 'contents'){
		return;
	}
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}

	if(isDefined(hashPage)){
		console.log('has hash', hashPage);

	}else{

	}
};


PAGE_CONTENTS.initBinding = function(){
	console.log('PAGE_CONTENTS.initBinding');
	
	//push state 
	if(WEB_COMMON.DATA.ONPOPSTATE_BINDING != true){
		window.onpopstate = function(event) {
			//$("#loading").show();
			console.log('window.onpopstate');
			console.log('event');
			console.log(event);
			console.log("pathname: "+location.pathname);
			//loadContent(location.pathname);
			//location.href = location.pathname;
			var showLocation = location.pathname;
			var urlQuery = getUrlParams();
			console.log('urlQuery',urlQuery);
			if(isDefined(urlQuery)){
				if(Object.keys(urlQuery).length > 0){
					var sendSrt = $.param( urlQuery );
					console.log('sendSrt', sendSrt);
					showLocation +='?'+sendSrt;
				}
			}
			//alert(showLocation);
			location.href = showLocation;
		};
	}
	
	$( ".btn-contents-modal-view-close" ).unbind( "click");
	$( ".btn-contents-modal-view-close" ).bind( "click", function() {
		$.modal.close();
	});
	
	//close bind
	/*
	$( ".btn-contents-modal-view-close" ).unbind( "click");
	$( ".btn-contents-modal-view-close" ).bind( "click", function() {
		var hashPrams = $.deparam.fragment();
		var eleData = $('#disk-pc-contents-view-modal').data();
		console.log('hashPrams', hashPrams);
		console.log('eleData', eleData);
		
		console.log(PAGE_CONTENTS.DATA.OPENED_MODAL_IDX);
		console.log(WEB_COMMON.DATA.CHANGE_HASH);
		//no modal
		if($('.contents-view-blocker').length < 1){
			GO_HOME();
			return;
		}
		//바로 들어온것
		if(isDefined(WEB_COMMON.DATA.CHANGE_HASH) == false){
			var hashHash = location.hash;
			if(isDefined(location.hash) == false){
				$.modal.close();
				return;
			}else{
				if (hashHash.indexOf('action=contents') != -1) {
					history.back(true);
				}else{
					$.modal.close();
					return;
				}
			}
			$.bbq.removeState();
			return;
		}
		
		if(hashPrams['!action'] == 'contents'){
			//if(hashPrams['idx'] == eleData.bbs_id){
			if(hashPrams['idx'] == PAGE_CONTENTS.DATA.OPENED_MODAL_IDX && hashPrams['idx'] == eleData.bbs_id){
				console.log('same idx');
				//return;
				history.back(true);
				return;
			}else{
				if(eleData.link == 'seller' && eleData.bbs_id == eleData.loaded){
					console.log('seller loaded');
					history.back(true);
					return;
				}
			}
		}
		if(isDefined(location.hash) == false){
			$.modal.close();
			return;
		}
		$.modal.close();
		return;
				
		
		if(hashPrams['!action'] == 'contents'){
			//history.back(true);
			//$.bbq.pushState( {}, 2 );
			//$.bbq.pushState();
			//return;
		}
		$.modal.close();
	});
	*/
	/*
	if($('.jquery-modal.blocker.current').length > 0){
		$( ".jquery-modal.blocker.current" ).unbind( "click");
		$( ".jquery-modal.blocker.current" ).bind( "click", function(e) {
			console.log(e);
			if (e.target === this){
				var hashPrams = $.deparam.fragment();
				console.log('hashPrams', hashPrams);
				if(hashPrams['!action'] == 'contents'){
					history.back(true);
					return;
				}
			}
			$.modal.close();
		});
	}
	*/


	//파일 더보기
	$( ".btn-contents-view-more-files" ).unbind( "click");
	$( ".btn-contents-view-more-files" ).bind( "click", function() {
		console.log('btn-contents-view-more-files');
		//$( '.file-list-over.hide' ).toggle();
		$('.v_file_list_wrap').toggleClass('full');

	});

	//방송회차 - 다른시즌 보기
	if($( ".btn-broadcast-another-season" ).length > 0){
		$( ".btn-broadcast-another-season" ).unbind( "click");
		$( ".btn-broadcast-another-season" ).bind( "click", function() {
			console.log('btn-broadcast-another-season');
			$( '.channel-broadcast-another-season-list' ).toggle();

		});
	}

	//tooltip
	/*
	$('.tooltip').tooltipster({
		theme: 'tooltipster-light',
		contentCloning: true,
		debug : true,
		maxWidth	: 200,
		minWidth	: 200,
		side		: 'top'			//top', 'bottom', 'right', 'left'
	});
	*/

	//방송회차 - slick
	if(isDefined(PAGE_CONTENTS.DATA.SLICK)){
		PAGE_CONTENTS.DATA.SLICK.slick('unslick');
	}
	var $slickTarget = $('#contents-view-bro-chapter-slick');
	if($slickTarget.find('.bro-chapter-slick-item').length > 4){
		//버튼 hover
		$slickTarget.on('init', function(slick){
		  console.log('init');
		  console.log(slick);
		  $('.btn-view-bro-chapter-slick').removeAttr("style");
		});
		//set slick
		PAGE_CONTENTS.DATA.SLICK = $slickTarget.slick({
			lazyLoad: 'ondemand',
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows : true,
			draggable: false,
			prevArrow : $('.btn-view-bro-chapter-slick-prev'),
			nextArrow : $('.btn-view-bro-chapter-slick-next'),
			dots	: false
		});

		console.log('PAGE_CONTENTS.DATA.SLICK', PAGE_CONTENTS.DATA.SLICK);

		//방송회차 - 마지막
		$slickTarget.on('afterChange', function(event, slick, currentSlide){
		  console.log('afterChange');
		  console.log(currentSlide);
		  console.log(slick);
		  var _ = slick;
		  if(_.slideCount == (currentSlide + _.options.slidesToShow)){
		  	var eleData = $slickTarget.data();
		  	var broTotalPage = 1;
		  	var broPage = 1;
		  	if(isDefined(eleData.total_page)){
		  		broTotalPage = parseInt(eleData.total_page);
		  	}
		  	if(isDefined(eleData.total_page)){
		  		broPage = parseInt(eleData.page);
		  	}
		  	if(broTotalPage > broPage){
		  		PAGE_SEARCH.getMoreBroadcastChapterData($slickTarget);
		  	}
		  }
		});
	}else{
		$('.contents-view-bro-chapter').addClass('disable');
	}


	//판매자 다른 콘텐츠 - 이전, 다음
	var $btnChannelBroChapterControler = $( ".btn-view-seller-contents" );
	if($btnChannelBroChapterControler.length > 0){
		$btnChannelBroChapterControler.unbind( "click");
		$btnChannelBroChapterControler.bind( "click", function() {
			console.log('btn-view-seller-contents');
			utility.shortPagination.action($(this), '.btn-view-seller-contents', PAGE_CONTENTS.getMoreSellerOtherContentsListData);	//반드시 .을 붙인다
		});
	}

	//만족도 평가
	$( ".btn-comment-rating" ).unbind( "click");
	$( ".btn-comment-rating" ).bind( "click", function() {
		console.log('rating btn');
		var eleData = $(this).data();
		console.log('eleData', eleData);
		if(isDefined(eleData.grade)){
			$('#'+eleData.target).val(eleData.grade);
		}
		var formEle = 'contentsViewCommentWriteForm';
		if(isDefined(eleData.form)){
			formEle = eleData.form;
		}

		$('.btn-comment-rating.active').removeClass('active');
		$(this).addClass('active');


		return;
		//코멘트 평가후 자동 등록
		if($('.onplay_rating_wrap').hasClass('is-invalid')){
			$('.onplay_rating_wrap').removeClass('is-invalid');
			WEB_COMMON_BBS.COMMENT.onclickWriteCommentFormAction(formEle);
			return;
		}


		var commentContents = $('#'+formEle).find('textarea[name=comment_contents]').val();
		console.log('commentContents', commentContents);
		if(isDefined(commentContents)){
			if(commentContents.length > 10){
				WEB_COMMON_BBS.COMMENT.onclickWriteCommentFormAction(eleData.form);
				return;
			}
		}
	});
	
	//PAGE_CONTENTS.initKakaoShareBtnBinding();
};

PAGE_CONTENTS.initKakaoShareBtnBinding = function(){
	console.log('PAGE_CONTENTS.initKakaoShareBtnBinding');
	//kakao share
	if($('#KAKAO_SHARD_BTN_ID').length > 0){
		
		var shareData = $('#KAKAO_SHARD_BTN_ID').data();
		if(isDefined(shareData)){
			var DF = get_disk_config(false);
			console.log('Kakao', Kakao);
			if(isDefined(Kakao.Link) == false){
				Kakao.init(DF.kokao_key);	
			}
			console.log('Kakao', Kakao);
			
			console.log('shareData', shareData);
			PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING.content.title = shareData.title;
			PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING.content.imageUrl = shareData.img;
			PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING.content.link.webUrl = shareData.url;
			PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING.buttons[0].link.webUrl = shareData.url;
			console.log(PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING);
			Kakao.Link.createDefaultButton(PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING);
		}
	}
	
	
};


PAGE_CONTENTS.initOnloadSellerOwner = function(pageData){
	console.log('PAGE_CONTENTS.initOnloadSellerOwner', pageData);

	var bbsIdx = '';
	if(isDefined(pageData.bbs_id) == true){
		bbsIdx = pageData.bbs_id;
	}

	if(isDefined(bbsIdx) == false || bbsIdx == '' || $.isNumeric(bbsIdx) == false || parseInt(bbsIdx) < 1){
		console.log('no bbs id');
		return;
	}
	var $targetView = $('#wrap-contents-modal-view-'+bbsIdx);
	if($targetView.length < 1){
		console.log('no view modal');
		return;
	}
	var sellerIdx = $('#contentsModalViewSellerIdx_'+bbsIdx).val();
	var sellerMemberIdx = $('#contentsModalViewSellerMemberIdx_'+bbsIdx).val();

	//test
	//sellerMemberIdx = 77;

	console.log('sellerMemberIdx', sellerMemberIdx);

	//var DF = get_disk_config(false);
	var isLoginedMember = utility.disk.checkIsLogin();
	console.log('isLoginedMember', isLoginedMember);

	var disk_member = null;
	if(isLoginedMember == true){
		console.log('isLoginedMember');
		//세션여부 체크 - 세션을 읽었을때만
		disk_member = DISK_MEMBER_FUN.getMemberInfo(false);
	}

	console.log('disk_member', disk_member);
	var contentsViewMemberIdx = $()
	if(isDefined(disk_member)){
		if(isDefined(sellerMemberIdx) == true && disk_member.member_idx == sellerMemberIdx){
			console.log('contents owner');
			$targetView.find('.btn-contents-view-buyer').hide();
			$targetView.find('.btn-contents-view-seller').css({'display': 'inline-block'});
		}
	}


};


//판매자 다른 콘텐츠 더가져오기
PAGE_CONTENTS.getMoreSellerOtherContentsListData = function(eleData){
	console.log('PAGE_CONTENTS.getMoreSellerOtherContentsListData');
	console.log('eleData', eleData);
	//var eleData = $slickTarget.data();
	if(isDefined(eleData.idx) == false || isDefined(eleData.page) == false || isDefined(eleData.next_page) == false){
		return;
	}

	var nextPage = 1;
	if(isDefined(eleData.next_page)){
		nextPage = parseInt(eleData.next_page);
	}

	if(nextPage > parseInt(eleData.total_page)){
		console.log('end page');
		return;
	}

	var successFunGetSellerContentsList = function(data){
		console.log('successFunGetSellerContentsList', data);


		if(isDefined(data.seller_contents_list)){
			var cList = data.seller_contents_list.list;
			var cHtml = [];
			var bChapter = null;
			var disk_category = new Disk_category();
			//console.log(disk_category);
			for(var i = 0; i < cList.length; i++){
				//bChapger = new Bchapter(i, false);
				//bChapger.setData(cList[i]);
				cList[i]['show_category_name'] = disk_category.get_full_cate_name(cList[i].cate1, cList[i].cate2);
				cHtml[i] = TEMPLETE.WEB_PAGE.contentsViewSimpleSellerContents(cList[i], i);
			}

			if(isDefined(eleData.target) == true){
				//$('#'+eleData.target).addClass('animated fadeIn').html(cHtml.join(''));
				$('#'+eleData.target).html(cHtml.join(''));
			}


			if(isDefined(eleData.info) == true){
				var saveData = {
					page : parseInt(data.seller_contents_list.page),
					limit : parseInt(data.seller_contents_list.limit),
				};
				$('#'+eleData.info).data(saveData);
			}
		}
	};

	var sendData = {
		idx		: eleData.idx,
		page	: nextPage,
		limit	: eleData.limit,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.CONTENTS.SELLER_CONTENTS_LIST,
		data		: sendData,
		success_fun	: successFunGetSellerContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};


//수정
PAGE_CONTENTS.openContentsEditForm = function(thisEle){
	console.log('WEB_COMMON.openContentsEditForm');

	//로그인 체크

	//판매자 체크


	var eleData = $(thisEle).data();
	console.log(eleData);

	var openUrl = '';
	var openCategory = 0;
	if(isDefined(eleData.url) == false){
		alert('새로고침후 다시 시도해 주세요.');
		return;
	}
	openUrl = eleData.url+'?bbsIdx=';


	//수정
	if(isDefined(eleData.idx) == true){
		openUrl += eleData.idx+'&isEdit=1';
	}
	console.log('openUrl', openUrl);

	var rtOpen = PopupCenter(openUrl, 'bbsContentsUpload', 882, 880);
	if(rtOpen == null || rtOpen.screenLeft == 0){
		alert('팝업 차단 중');
	}


	return;
};

//찜하기
PAGE_CONTENTS.addContentsMemberWishList = function(thisEle){
	console.log('PAGE_CONTENTS.getMoreSellerOtherContentsListData');

	var checkLogin = utility.disk.checkIsLoginWithModal();
	if(checkLogin != true){
		return;
	}

	if($(thisEle).hasClass('active')){
		$.ambiance({message: '이미 찜하신 콘텐츠입니다.', type: 'alert-warning'});
		return;
	}

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.idx) == false){
		return;
	}

	var successFunSetWishContentsList = function(data){
		console.log('successFunSetWishContentsList', data);

		if(isDefined(eleData.target) == true){
			var beforeCnt = 0;
			var beforeCntData = $('#'+eleData.target).text();
			if(isDefined(beforeCnt) == true && $.isNumeric(beforeCnt) == true){
				beforeCnt = parseInt(beforeCntData);
			}

		 	$('#'+eleData.target).text(disk_number_format(beforeCnt + 1));

			//disk_number_format
		}
		var alertMsg = '찜목록에 선택한 콘텐츠를 추가하였습니다.';
		var msgType = 'alert-danger';
		if(data.is_ok != 1){
			msgType = 'alert-warning';
		}
		if(isDefined(data.show_msg)){
			alertMsg = data.show_msg;
		}
		$.ambiance({message: alertMsg, type: msgType});
		$(thisEle).addClass('active');
	};

	var sendData = {
		idx		: eleData.idx
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.MEMBER_SET_WISHLIST,
		data		: sendData,
		success_fun	: successFunSetWishContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

//코멘트 작성후 view 정보 업데이트
PAGE_CONTENTS.setCommentDataUpdateViewEle = function(data){
	console.log('PAGE_CONTENTS.setCommentDataUpdateViewEle');
	console.log(data);


	//view 속성 수정
	$contentsViewEle = $('#wrap-contents-modal-view-'+data.idx);
	if(isDefined(data.up_data.bbs)){
		//update like cnt
		if(data.up_data.bbs.like > 0){
			var $targetEle = $('#contents-view-good-count-'+data.idx);
			var beforeLike = $targetEle.data('cnt');
			if(isDefined(beforeLike) == false){
				beforeLike = 0;
			}
			var nextLike = beforeLike + 1;
			console.log('nextLike', nextLike);
			$targetEle.data('cnt', nextLike);
			$contentsViewEle.find('.contents-view-like-cnt-txt').text(disk_number_format(nextLike));

		}
		//update dislike cnt
		if(data.up_data.bbs.dislike > 0){
			var $targetEle = $('#contents-view-bad-count-'+data.idx);
			var beforeDislike = $targetEle.data('cnt');
			if(isDefined(beforeDislike) == false){
				beforeDislike = 0;
			}
			var nextDislike = beforeDislike + 1;
			console.log('nextDislike', nextDislike);
			$targetEle.data('cnt', nextDislike);
			$contentsViewEle.find('.contents-view-dislike-cnt-txt').text(disk_number_format(nextDislike));
		}

		//update comment cnt
		if(data.up_data.bbs.comment > 0){
			var $targetEle = $('#contents-view-comment-count-'+data.idx);
			var beforeComment = $targetEle.data('cnt');
			if(isDefined(beforeComment) == false){
				beforeComment = 0;
			}
			var nextComment = beforeComment + 1;
			console.log('nextComment', nextComment);
			$targetEle.data('cnt', nextComment);
			$contentsViewEle.find('.contents-view-comment-cnt-txt').text(disk_number_format(nextComment));
		}
	}


};

//난 이미 설치했어요
PAGE_CONTENTS.onclickIamOkInstalled = function(){
	setDiskInstalledCUS('download');
	alert("감사합니다.\n이제 ActiveX없이 안전하게 콘텐츠 다운로드를 이용하실 수 있습니다.");
	return;
};

//컨텐츠 다운로드
PAGE_CONTENTS.onclickContentsDownload = function(thisEle){

	var checkLogin = utility.disk.checkIsLoginWithModal();
	if(checkLogin != true){
		return;
	}

	var isDiskDownloaderInstalled = checkDiskInstalledCUS();
	console.log('isDiskDownloaderInstalled', isDiskDownloaderInstalled);
	//alert('isDiskDownloaderInstalled:'+isDiskDownloaderInstalled);
	//isDiskDownloaderInstalled = 1;

	//show mini guide
	PAGE_CONTENTS.showDownloaderGuideMini();

	var sendData =
	{
		is_mobile	: 0,
		deviceType	: 0,
		bbsIdx		: null,
		actionType	: null,
		payType		: 'cache',
		searchKeyword	: '',
		lastIdx		: '',
	}
	var eleData = $(thisEle).data();
	console.log('eleData',eleData);

	if(isDefined(eleData.bbs_idx) == false){
		alert('다운로드할 콘텐츠를 선택해 주세요.');
		return;
	}
	sendData.bbsIdx = eleData.bbs_idx;

	if(isDefined(eleData.action_type) == false){
		alert('다운로드할 콘텐츠를 선택해 주세요.');
		return;
	}
	sendData.actionType = eleData.action_type;

	if(isDefined(eleData.pay) == true){
		sendData.payType = eleData.pay;
	}
	var isCopy = false;
	if(isDefined(eleData.copy)){
		if(eleData.copy == 1){
			isCopy = true;
		}
	}
	var bbsCate = null;
	if(isDefined(eleData.cate1)){
		bbsCate = eleData.cate1;
	}
	var bbsPrice = '';
	if(isDefined(eleData.price) == true){
		bbsPrice = disk_number_format(eleData.price);
	}
	//저작권 성인 알림
	if(bbsCate == 21100 && isCopy == true){
		var alertMsg = "해당 성인 콘텐츠는 저작권사와 제휴 된 콘텐츠입니다.\n캐시 포인트 "+bbsPrice+"P가 소모됩니다.";
		if(confirm(alertMsg) != true){
			return;
		}
	}
	
	if(isDefined($('#disk_search_form_keyword').val()) == true){
		sendData.searchKeyword = $('#disk_search_form_keyword').val();
	}

	var DF = get_disk_config(false);
	var successDownloadfun = function(data){
		console.log('successDownloadfun', data);
		if(!isDefined(data)){
			return "err";
		}
		if(!isDefined(data.download)){
			return "err";
		}

		$download_data = data.download;
		//재다운이면서 해당 엘리멘트가 있을때
		if($download_data.action_type == "WEB_RE_DOWN_ALL" && $('.my_re_down_contents').length >0){
			if($download_data.next_wdown_cnt > 0){
				$("#re_down_contents_wdown_cnt").text($download_data.next_wdown_cnt);
			}else {
				$("#my_re_down_div").text('남은횟수 없음');
			}
		}
	};

	//다운로더 설치 확인(커스텀) - 분기(성공, 실패)
	var checkDownloaderInstall = function(isConnected, ws){
		console.log('checkDownloaderInstall', isConnected);
		console.log(ws);

		if(isConnected == true){
			setDiskInstalledCUS('download');
			COMMON_WEB_DOWNLOAD.actionWebContentsDownload(sendData, successDownloadfun);
		}else{
			alert('다운로더를 먼저 설치해야 합니다.');
			COMMON_WEB_DOWNLOAD.showDownloaderApp();
		}
		/*
		if(isDefined(ws)){
			ws.close();
			ws = null;
		}
		*/
	};


	//다운로더 설치 확인(소켓) - 분기(성공, 실패)
	var checkDownloadWsInstall = function(wsData){
		console.log('checkUloaderInstall');
		console.log(wsData);

		if(isDefined(wsData.status)){
			if(wsData.status < 0 || wsData.status == 100){
				alert('콘텐츠를 다운로드 하기위해서는 다운로더 프로그램을 먼저 설치해야 합니다.');
				COMMON_WEB_DOWNLOAD.showDownloaderApp();
				delDiskInstalledCUS('download');
				return;
			}else if(wsData.status == 1 && wsData.s_msg =='onplay.starter'){
				console.log('ok!!!!!!!!');
				setDiskInstalledCUS('download');
				if(isDefined(wsData.ws)){
					console.log(wsData.ws);
					wsData.ws.close();
					wsData.ws = null;
					COMMON_WEB_DOWNLOAD.WS = null;
				}

				if(isDefined(wsData.callbackFun)){
					//console.log(wsData.callbackFun);
					console.log('callback fun del');
					wsData.callbackFun = null;
				}

				COMMON_WEB_DOWNLOAD.actionWebContentsDownload(sendData, successDownloadfun);
			}
		}

	};

	//커스텀 url 호출
	var customUrlCheckerFailFun = function(){
		console.log('customUrlCheckerFailFun');

		alert('다운로더를 먼저 설치해야 합니다.');
		COMMON_WEB_DOWNLOAD.showDownloaderApp();
	};

	var customUrlCheckersuccessFun = function(){
		console.log('customUrlCheckersuccessFun');
		alert('customUrlCheckersuccessFun');

		setDiskInstalledCUS('download');
		//var isCheckDiskDownloaderInstalled = $.cookie('DISK_DOWNLOADER_INSTALLED');
		if(isDiskDownloaderInstalled == false){
			alert('설치확인이 완료 되었습니다. \n다운로드를 시작합니다.');
			isDiskDownloaderInstalled = true;
			checkDownloaderInstall(true, null);
			//setDiskInstalledCUS('download');
		}
	};

	if(isWebSocketSuport() == true){
		//다운로드 프로그램 먼저 설치되어 있는 지 검사
		console.log('isBrowserIe', isBrowserIe());
		if(isBrowserIe() == true){
			console.log('IE~~~~~~~~~~~~');
		}else{
			COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER(checkDownloadWsInstall);
			return;
		}
		//COMMON_WEB_DOWNLOAD.DISK_WEBSOCKET.IS_INSTALL_DOWNLOADER(checkDownloadWsInstall);
		//return;
	}else{
		
		/*
		if(isBrowserIe() == true){
			console.log('IE~~~~~~~~~~~~');
		}
		*/
		
		console.log('not suport socket', isDiskDownloaderInstalled);
		
		if(isDiskDownloaderInstalled != true){
			console.log('커스텀 실행해줘잉~~~<');
	 		console.log('customUrl');
	 		
			var customUrlCheckerFailFunS = function(){
				console.log('customUrlCheckerFailFun');
				customUrlCheckerFailFun();
			}
			var customUrlCheckersuccessFunS = function(){
				console.log('customUrlCheckersuccessFun');
				//ie 컨펌을 띠운다 
				if(IsBrowserIE_FC() == true){
					console.log('_FC_BrowserRuntimeVersion')
					console.log(_FC_BrowserRuntimeVersion);
					COMMON_WEB_DOWNLOAD.showDownloaderApp();
					if(confirm("다운로드 전용 프로그램이 설치되어 있어야 합니다.확인을 누르면 포이트가 차감되며 다운로드가 진행됩니다.\n프로그램이 설치 되어 있으십니까?") == true){
				 		console.log('yes');
				 		checkDownloaderInstall(true, null);
					}else{
						console.log('no');
						return;
					}
					
					
					
				}
			}
			//delDiskInstalledCUS('download');
			var installCheckerUrl = DF.WEB_APP_PROTOCOL_NAME.cu_down_checker+'://';
			console.log('customUrl installCheckerUrl:'+installCheckerUrl);
			window.custom_url_checker(installCheckerUrl,customUrlCheckerFailFunS, customUrlCheckersuccessFunS);
		 	event.preventDefault ? event.preventDefault() : event.returnValue = false;
		 	
		}
		//delDiskInstalledCUS('download');
		//return;
	}
	//custum url
	
	if(isDiskDownloaderInstalled == true){
		//설치확인
		checkDownloaderInstall(true, null);
	
	
	}else{
		console.log(DF);
		
		if(isWebSocketSuport() == true){
			var checkUrl = DF.WEB_APP_PROTOCOL_NAME['starter'] +'://';
	 	}else{
	 		var checkUrl = DF.WEB_APP_PROTOCOL_NAME['cu_down_checker']+'://';
	 	}
	 	console.log('checkUrl', checkUrl);
		window.custom_url_checker(checkUrl,customUrlCheckerFailFun, customUrlCheckersuccessFun);
	 	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	}

	
};


//show 설치 프로그램 가이드 - mini
PAGE_CONTENTS.showDownloaderGuideMini = function(){
	$('.disk-web-downloader-setup-guide-mini').addClass('show');
};

//show 설치 프로그램 가이드
PAGE_CONTENTS.showDownloaderGuide = function(){
	$('.disk-web-downloader-setup-guide').addClass('show');
};

//hide 설치 프로그램 가이드
PAGE_CONTENTS.hideDownloaderGuide = function(){
	$('.disk-web-downloader-setup-guide').removeClass('show');
	$('.disk-web-downloader-setup-guide-mini').removeClass('show');
};

//로그인 창 불러오기
PAGE_CONTENTS.openLoginModal = function(){
	console.log('PAGE_CONTENTS.openLoginModal');
	GO_LOGIN();
};


PAGE_CONTENTS.shareOpenPop = function(thisEle){
    console.log('PAGE_CONTENTS.shareOpenPop');
    var eleData = $(thisEle).data();
    console.log('eleData', eleData);
    
	var contentsUrl = null;
	if(isDefined(eleData.url)){
		contentsUrl = eleData.url;
	}
	var shardType = null;
	if(isDefined(eleData.share)){
		shardType = eleData.share;
	}
	if(isDefined(contentsUrl) == false || isDefined(shardType) == false){
		alert('공유할 주소를 먼저 선택해주세요.');
		return;
	}
	var shardTitle = '영화가 보고싶을 땐 onPlay';
	if(isDefined(eleData.title)){
		shardTitle = eleData.title+' -- onPlay';
	}
	shardTitle = encodeURI(shardTitle);
	var openUrl = null;
	switch (shardType)
	{
		case "facebook" :
				contentsUrl = encodeURI(contentsUrl);
		 		openUrl = "https://www.facebook.com/sharer/sharer.php?u=" + contentsUrl;
				break;
		case "twitter" :
				contentsUrl = encodeURI(contentsUrl);
		 		openUrl = "https://twitter.com/intent/tweet?text="+shardTitle+"&url=" + contentsUrl;
				break;
		case "kakao" :
				//contentsUrl = encodeURI(contentsUrl);
		 		//openUrl = "/popup/open_kakao_share/?title="+shardTitle+"&url=" + contentsUrl;
		 		//Kakao.Link.createDefaultButton(PAGE_CONTENTS.DATA.KAKAO_SHARE_SETTING);
				break;		
		case "copy" :
				$('#clip_target').val(contentsUrl);
				$('#clip_target').select();
				try { // The important part (copy selected text)
					var successful = document.execCommand('copy');
					alert("복사되었습니다");
				}
				catch (err) { alert('이 브라우저는 지원하지 않습니다.') }
				openUrl = null;
				break;
		defalut :
				break;

	}
	
	
	if(isDefined(openUrl)){
		window.open(openUrl, 'onplayShareWin','left=20,top=20,width=700,height=500,toolbar=1,resizable=0');
	}

	return;
};

PAGE_CONTENTS.showReportPop = function(bbsIdx){
	console.log('PAGE_CONTENTS.showReportPop', bbsIdx);

	if(isDefined(bbsIdx) == false){
		console.log('bbsIdx empty');
		return;
	}

	if(!$.isNumeric(bbsIdx)){
		console.log('no numberic');
		return;
	}
	var successReportModal = function (data){

		console.log('successReportModal', data);
    	var $targetModal = $('#disk-pc-common-modal');
    	$targetModal.empty();
    	var isLogined = utility.disk.checkIsLoginWithModal();
    	if(isLogined != true){
    		return;
    	}
    	var isModalCloseExisting = false;
    	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.getContentsReportModalHtml(data.report_data,data.report_title);
    	if(isDefined(modalHtml)){
    		$targetModal.html(modalHtml).modal({
    			closeExisting: isModalCloseExisting,
    			blockerClass	: "common-modal-blocker",
    			clickClose		: false,
    			escapeClose		: false
    		});
    	}
		;
	}
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.CONTENTS.CONTENTS_REPORT_MODAL_VIEW;


    var sendData = {bbsIdx : bbsIdx};
    var ajaxData =
	{
		url			: contentsUrl,
		data		: sendData,
		success_fun	: successReportModal,
		error_fun	: null
	};
    DISK_PROTOCOL.AJAX(ajaxData);
    return;

}

PAGE_CONTENTS.actionContents = function(thisEle){
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		console.log('need login');
		return;
	}

    var report_title = ['[불량콘텐츠]', '[허위 자료]', '[저작권 위반]', '[불법 성인물]', '[불법 성인물(아청)]', '[기타]'];

	var eleData = $(thisEle).data();
	console.log(eleData);
    if(!isDefined($("input[name='same']:checked"). val())){
        alert("분류를 선택해주세요.");
        return;
    }
    var subject = report_title[$("input[name='same']:checked"). val()];
	var sendData = {
		idx	: eleData.idx,
		t	: eleData.type,
		action : eleData.action,
        memo: subject+" "+$("#report_memo").val()
	};

	var sTime = Math.floor(+ new Date() / 1000);
	var actionCallbackFun = function(data){

		console.log(data);
		if(isDefined(data.show_msg)){
		    alert(data.show_msg);
            if(data.action == 'report'){ //omh  2020-03-30
                $.modal.close();
            }else{
                window.close();
            }
		}


		if(data.is_ok == 1){
			 if(data.action == 'report'){
				console.log('report');
				//save storage
				var sTime = data.s_time;
				utility.disk.setStorageData('reportSTime', sTime);
			}
		}
	};
	COMMON_ACTION.CONTENS.actionChangeContents(sendData, actionCallbackFun);
};


PAGE_CONTENTS.actionRdbutton = function(number){ //omh 2020-03-30 rd 버튼 체크

    if(isDefined(number) == false){
		console.log('actionRdbutton number empty');
		return;
	}

	if(!$.isNumeric(number)){
		console.log('actionRdbutton number no numberic');
		return;
	}
    $('input:radio[name=same]').attr("checked", false);
    $('input:radio[name=same]:input[value=' + number + ']').attr("checked", true);
};


PAGE_CONTENTS.reportLength = function (thiseEle){
    var eleVal = $(thiseEle).val();
    if(eleVal.length > 0){
        $("#report_cur_length").text(eleVal.length);
    }
}

PAGE_CONTENTS.goContentsLink = function(thisEle){
	console.log('PAGE_CONTENTS.goContentsLink');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);
	if(isDefined(eleData)){
		var goLink = null;
		var isAdult = 1;
		if(isDefined(eleData.href)){
			goLink = eleData.href;
		}
		if(isDefined(eleData.adult)){
			isAdult = eleData.adult;
		}
		
		if(isAdult == 1){
			//로그인 체크
			if(utility.disk.checkIsLogin() != true){
				GO_MENU('login');
				return;
			}
			if(utility.disk.checkIsRealName() != true){
				GO_MENU('adult_auth');
				return;
			}
		}
		
		if(isDefined(goLink)){
			location.href = goLink;
		}
	}	
}
