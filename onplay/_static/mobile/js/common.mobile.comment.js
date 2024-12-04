
//코멘트 관련




MOBILE_COMMON.COMMENT = {};

//코멘트 페이지 네이션
/*
MOBILE_COMMON.COMMENT.setPagination  = function($infoEle){

	console.log('MOBILE_COMMON.COMMENT.setPagination');
	console.log($infoEle);
	var eleData = $infoEle.data();
	console.log('eleData', eleData);

	if(parseInt(eleData.total_page) > 1){
		$infoEle.show();
		$infoEle.find('.next.d-btn.disabled').removeClass('disabled');
	}
	//comment-list-event-pagnation-controller
	//이전, 다음
	var $btnChannelBroChapterControler = $infoEle.find( ".btn-get-comment-list" );
	if($btnChannelBroChapterControler.length > 0){
		$btnChannelBroChapterControler.unbind( "click");
		$btnChannelBroChapterControler.bind( "click", function() {
			console.log('btn-get-comment-list');
			utility.shortPagination.action($(this), '.btn-get-comment-list', MOBILE_COMMON.COMMENT.getMoreCommentListData);	//반드시 .을 붙인다
		});
	}
};
*/

//코멘트 데이타 Callback Fun
MOBILE_COMMON.COMMENT.successFunCommentListData = function(sendData, data, isFirst, callbackFun){
	console.log('MOBILE_COMMON.COMMENT.successFunCommentListData', sendData);
	console.log(data);
	if(isDefined(data.comment_data) == false){
		return;
	}
	var commentData = data.comment_data;
	var curPage = 1;
	if(isDefined(data.comment_data.page)){
		curPage = parseInt(data.comment_data.page);
	}
	var commentList = data.comment_data.list;
	var commentListHtml = [];
	//var disk_comment;

	for(var c in commentList){
		var disk_comment = new Comment_list(sendData.t, c, 0);
		/*
		if(isDefined(sendData.o) == true){
			disk_comment.bbs_owner_idx = sendData.o;
		}
		*/
		console.log('disk_comment', disk_comment);
		disk_comment.setData(commentList[c]);
		if(sendData.t == 'contents'){
			commentListHtml.push(disk_comment.getMobileContentsCommentListHtml());
		}else{
			commentListHtml.push(disk_comment.getMobileEventCommentListHtml());
		}
	}
	console.log('commentListHtml');
	console.log(commentListHtml);

	//inser html;
	var $innerEle = $('#'+sendData.target);
	if(isDefined(data.idx) && commentListHtml.length > 0){
		//$innerEle.html(commentListHtml.join(''));
		if(curPage == 1){
			$innerEle.html(commentListHtml.join(''));
		}else{
			$innerEle.append(commentListHtml.join(''));
		}
	}

	/*
	var savedEleData = {
		page		: parseInt(data.comment_data.page),
		limit		: parseInt(data.comment_data.limit),
		board_name	: data.comment_data.board_name,
		idx			: parseInt(data.comment_data.idx),
	}
	console.log('savedEleData', savedEleData);
	*/

	var savedEleData = {
		page		: parseInt(data.comment_data.page),
		limit		: parseInt(data.comment_data.limit),
		board_name	: data.comment_data.board_name,
		idx			: parseInt(data.comment_data.idx),
		type		: data.comment_type
	}
	console.log('savedEleData', savedEleData);

	//paging
	var $infoEle = $('.comment-panation-wrap');
	if(isDefined(sendData.info)){
		$infoEle = $('#'+sendData.info);
	}
	if($infoEle.length > 0 && $infoEle.hasClass('btn-more-comment')){
		console.log('btn-more-comment paging set');


		console.log('curPage', curPage);
		var contentsCount = commentListHtml.length;
		if(isDefined(commentData.data_count)){
			contentsCount = parseInt(commentData.data_count);
		}
		var pageLimit = 20;
		if(isDefined(commentData.limit) == true){ pageLimit = parseInt(commentData.limit);}

		if(contentsCount > 0){
			savedEleData.page = curPage;
			savedEleData.loaded = curPage;
			savedEleData.total_page = curPage + 1;
			if(contentsCount < pageLimit){
				savedEleData.total_page = curPage;
				$infoEle.data(savedEleData).removeClass('loading').addClass('ending');
			}else{
				$infoEle.data(savedEleData).addClass('loading').removeClass('ending');
			}

		}else{
			savedEleData.page = curPage;
			savedEleData.loaded = curPage;
			savedEleData.total_page = curPage;
			if(curPage == 1){
				console.log('no data show');
				//$containerEle.find('.f_content.'+contentsId).addClass('no-data');
			}
			$infoEle.data(savedEleData).removeClass('loading').addClass('ending');
		}
	}

	/*

	//page
	var $targetPagnationEle = $('#'+sendData.info);
	console.log($targetPagnationEle);
	console.log('$targetPagnationEle data');
	console.log($targetPagnationEle.data());

	//no data, no-more data
	if($targetPagnationEle.length > 0){
		if(commentListHtml.length < savedEleData.limit){
			if(curPage == 1){
				$targetPagnationEle.addClass('no-data no-more');
			}else{
				$targetPagnationEle.addClass('no-more');
			}
		}
	}


	var checkTotalPage = 1;
	if(data.force_page == 1 || data.comment_data.page == 1){
		savedEleData.total_count	= parseInt(data.comment_data.total_count);
		savedEleData.total_page		= parseInt(data.comment_data.total_page);
		console.log('savedEleData', savedEleData);
		if($targetPagnationEle.length > 0){
			$targetPagnationEle.data(savedEleData);
			//페이징 로드
			//more btn
			if(isFirst == true){
				if(commentListHtml.length > 0){
					console.log('has comment~~~~~~~');
					$innerEle.addClass('has-comment');
				}
			}

		}
		checkTotalPage = savedEleData.total_page;
	}else{
		console.log('savedEleData', savedEleData);
		$targetPagnationEle.data(savedEleData);
		checkTotalPage = $targetPagnationEle.data('total_page');
	}


	console.log('disabled set');
	if(checkTotalPage <= data.comment_data.page){
		$targetPagnationEle.addClass('disabled').data('loaded', 1);
	}else{
		$targetPagnationEle.removeClass('disabled').data('loaded', 1);
	}
	*/

	if (typeof callbackFun === "function"){
		callbackFun(data);
		return;
	}

};

//코멘트 리스트 : 가져오기 - 처음
MOBILE_COMMON.COMMENT.setCommentList = function(sendData, callbackFun){
	console.log('MOBILE_COMMON.COMMENT.setCommentList', sendData);

	if(isDefined(sendData.idx) == false || isDefined(sendData.t) == false){
		disk_alert('정보가 올바르지 않습니다.');
		return;
	}
	var successGetCommmentListFun = function(data){
		console.log('successGetCommmentListFun');
		console.log(data);

		//set list html
		if(isDefined(data.comment_data)){
			MOBILE_COMMON.COMMENT.successFunCommentListData(sendData, data, true, callbackFun);
			commentData = data.comment_data;
		}
		//스크롤 스파이어
		$('.common-comment-write-wrap').data('load', 2);

		//데이타가 있으면
		if(data.comment_data.list.length < 1){
			$('.no_content .txt').show();
		}
	};
	sendData.is_mobile = 1;
	COMMON_ACTION.BBS.COMMENT.actionGetCommentList(sendData, successGetCommmentListFun, true);
};

//코멘트 리스트 : 더가져오기
MOBILE_COMMON.COMMENT.getMoreCommentListData = function(eleData, callbackFun){
	console.log('MOBILE_COMMON.COMMENT.getMoreCommentListData');
	console.log('eleData', eleData);
	//var eleData = $slickTarget.data();
	if(isDefined(eleData.idx) == false || isDefined(eleData.page) == false || isDefined(eleData.next_page) == false){
		return;
	}
	var nextPage = 1;
	if(isDefined(eleData.next_page)){ nextPage = parseInt(eleData.next_page);}
	if(nextPage > parseInt(eleData.total_page)){console.log('end page');return;}
	var sendData = {
		t		: eleData.type,
		n		: eleData.board_name,
		idx		: eleData.idx,
		page	: nextPage,
		l		: eleData.limit,
		o		: eleData.owner,
	};

	var successFunGetMoreCommentList = function(data){
		console.log('successFunGetSellerContentsList', data);
		if(isDefined(data.comment_data)){
			var oData = {
				idx		: eleData.idx,
				page	: nextPage,
				t		: eleData.type,
				target	: eleData.target,
				info	: eleData.info,
			}
			MOBILE_COMMON.COMMENT.successFunCommentListData(oData, data, false, callbackFun);
		}
	};
	COMMON_ACTION.BBS.COMMENT.actionGetCommentList(sendData, successFunGetMoreCommentList);
};

MOBILE_COMMON.COMMENT.onclickMoreCommentList = function(thisEle){
	console.log('MOBILE_COMMON.COMMENT.onclickMoreCommentList');

	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if($(thisEle).hasClass('ending')){
		console.log('has cls ending');
		return;
	}

	var boardName, boardType, boardIdx;
	var loadedPage = 1;
	var totalPage = 1;
	if(isDefined(eleData.board_name)){
		boardName = eleData.board_name;
	}
	if(isDefined(eleData.type)){
		boardType = eleData.type;
	}
	if(isDefined(eleData.idx)){
		boardIdx = eleData.idx;
	}

	if(isDefined(boardIdx) == false || $.isNumeric(boardIdx) == false || isDefined(boardType) == false){
		console.log('ele data err');
		return;
	}

	if(isDefined(eleData.loaded)){
		loadedPage = parseInt(eleData.loaded);
	}
	if(isDefined(eleData.total_page)){
		totalPage = parseInt(eleData.total_page);
	}

	var nextPage = loadedPage + 1;
	if(nextPage > totalPage){
		console.log('max page');
		$(thisEle).data({page :loadedPage, loaded : loadedPage, total_page:loadedPage}).removeClass('loading').addClass('ending');
		return;
	}
	eleData.next_page = nextPage;

	var successMoreCommentListCallbackFun = function(data){
		console.log('successMoreCommentListCallbackFun', data);
	};

	var sendData = eleData;
	console.log('sendData', sendData);

	MOBILE_COMMON.COMMENT.getMoreCommentListData(sendData, successMoreCommentListCallbackFun);
	return;

};


//코멘트 메뉴 오픈
MOBILE_COMMON.COMMENT.openBbsCommentMenu = function(thisEle){
	console.log('MOBILE_COMMON.COMMENT.openBbsCommentMenu');

	if($(thisEle).hasClass('active')){
		$(thisEle).removeClass('active');
	}else{
		$('.r_menu.hand.active').removeClass('active');
		$(thisEle).toggleClass('active');
	}
};

//코멘트 액션 - 삭제, 신고, 좋아요
MOBILE_COMMON.COMMENT.actionBbsCommentList = function(e, thisEle, callbackFun){
	console.log('MOBILE_COMMON.COMMENT.actionBbsCommentList');
	e.stopPropagation();

	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}

	var eleData = $(thisEle).data();
	console.log(eleData);

	var sendData = {
		idx	: eleData.idx,
		t	: eleData.type,
		board	: eleData.board,
		action : eleData.action,
	};

	var sTime = Math.floor(+ new Date() / 1000);
	var actionCommentCallbackFun = function(data){
		console.log('actionCommentCallbackFun');
		console.log(data);
		if(isDefined(data.show_msg)){
			var msgType =  "alert-info";
			if(data.action == 'like'){
				msgType =  "alert-danger";
				$(thisEle).addClass('active');
				utility.disk.setStorageData('heartTime', sTime);
			}
			$.ambiance({message: data.show_msg, type:msgType});
		}
		if (typeof callbackFun === "function"){
			callbackFun(data);
			return;
		}
		if(data.is_ok == 1){
			if(data.action == 'reply_del'){
				if(isDefined(eleData.target)){
					$('.'+eleData.target).remove();
				}
			}else if(data.action == 'report'){
				console.log('report');
				//save storage
				//var sTime = data.s_time;
				utility.disk.setStorageData('reportSTime', sTime);
			}

		}
	};
	COMMON_ACTION.BBS.COMMENT.actionChangeComment(sendData, actionCommentCallbackFun);
};


//코멘트 삭제하기
MOBILE_COMMON.COMMENT.delBbsCommentList = function(e, thisEle){
	console.log('MOBILE_COMMON.COMMENT.delBbsCommentList');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}

	var eleData = $(thisEle).data();
	console.log(eleData);

	var sendData = {
		idx	: eleData.idx,
		t	: eleData.type,
		board	: eleData.board,
		action 	: eleData.action,
	};

	var successFunActionCommentDel = function(data){
		console.log('successFunActionCommentDel');
		console.log(data);

		if(data.is_ok == 1){
			if(data.action == 'del'){
				if(isDefined(eleData.target)){
					$('.'+eleData.target).remove();
				}
				if(eleData.type == 'contents'){
					if($('.bbs-comment-list-section').length < 1){
						location.reload(true);
					}
				}
			}else if(data.action == 'reply_del'){
				if(isDefined(eleData.target)){
					$('.'+eleData.target).remove();
				}
			}
		}
		//정보 갱신
		if(isDefined(data.up_data.bbs)){
			if(data.comment_type == 'contents'){
				MOBILE_PAGE.contents.setCommentDataUpdateViewEle(data, 'del');
			}
		}
	};

	MOBILE_COMMON.COMMENT.actionBbsCommentList(e, thisEle, successFunActionCommentDel);
	return;
};



//코멘트 답글달기
MOBILE_COMMON.COMMENT.replyBbsCommentList = function(e, thisEle){
	console.log('MOBILE_COMMON.COMMENT.replyBbsCommentList');
	e.stopPropagation();
	var eleData = $(thisEle).data();
	console.log(eleData);
	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}

	var savedMemberIdx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
	console.log('savedMemberIdx');

	//if(is)
	if(isDefined(eleData.type) == false){
		console.log('err type');
		return;
	}
	if(eleData.type == 'contents'){
		if(eleData.bbs_owner  != savedMemberIdx ){
			disk_alert('콘텐츠 판매자만 댓글을 다실 수 있습니다.');
			return;
		}
	}

	if($('.depth2.input.'+eleData.target).length < 1){
		console.log('no ele');
		return;
	}

	if(isDefined(eleData.target)){
		///$('.depth2.input.'+eleData.target).toggleClass('active');
		$('.depth2.input.'+eleData.target).toggle('fast');
	}
	$('.r_menu.hand.active').removeClass('active');
	return;
};



//코멘트 신고하기
MOBILE_COMMON.COMMENT.reportBbsCommentList = function(e, thisEle){
	console.log('MOBILE_COMMON.COMMENT.reportBbsCommentList');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}

	var eleData = $(thisEle).data();
	console.log(eleData);
	if(isDefined(eleData.action) == false){
		eleData.action = 'report';
	}
	var lastTime = utility.disk.getStorageData('reportSTime');
	console.log('lastTime', lastTime);

	var timestampSecond = Math.floor(+ new Date() / 1000);
	console.log('timestampSecond', timestampSecond);
	//return;
	var checkTime = 0;
	if(isDefined(lastTime) == true){
		checkTime = parseInt(lastTime);
	}
	//신고 시간 체크 -3분
	if(timestampSecond < (checkTime + 180) ){
		//alert('신고 오남용을 막기 위해 일정시간 뒤에 다시 신고가 가능합니다.');
		var show_msg = '신고 오남용을 막기 위해 일정시간 뒤에 다시 신고가 가능합니다.';
		var msgType =  "alert-warning";
		$.ambiance({message: show_msg, type:msgType});
		return;
	}
	MOBILE_COMMON.COMMENT.actionBbsCommentList(e, thisEle);
};

//코멘트 좋아요
MOBILE_COMMON.COMMENT.likeBbsCommentList = function(e, thisEle){
	console.log('MOBILE_COMMON.COMMENT.likeBbsCommentList');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}
	var eleData = $(thisEle).data();
	console.log(eleData);

	eleData.action = 'like';

	if($(thisEle).hasClass('active')){
		console.log('active');
		var show_msg = '코멘트를 좋아합니다.';
		var msgType =  "alert-danger";
		$.ambiance({message: show_msg, type:msgType});
		return;
	}

	var lastTime = utility.disk.getStorageData('heartTime');
	console.log('lastTime', lastTime);

	var timestampSecond = Math.floor(+ new Date() / 1000);
	console.log('timestampSecond', timestampSecond);
	//return;
	var checkTime = 0;
	if(isDefined(lastTime) == true){
		checkTime = parseInt(lastTime);
	}
	//시간  체크 -10초
	/*
	if(timestampSecond < (checkTime + 10) ){
		//alert('당신의 하트는 기다림이 필요합니다. 1분뒤에 다시 시도해주세요.');
		console.log('time check');
		//var show_msg = '코멘트를 좋아합니다.';
		var show_msg = '어뷰징 방지를 위해 10초뒤에 다시 눌러주세요.';
		var msgType =  "alert-warning";
		$.ambiance({message: show_msg, type:msgType});
		//$(thisEle).addClass('active');
		return;
	}
	*/
	var successFunActionLike = function(data){
		console.log('successFunActionLike');
		console.log(data);
		if(data.is_ok == 1){
			if(data.action == 'like'){
				console.log('like');
				//save storage
				//var sTime = data.s_time;


				var savedCnt = eleData.cnt;
				if(isDefined(savedCnt) == false){
					savedCnt = 0;
				}
				if($.isNumeric(savedCnt)){
					savedCnt++
					$(thisEle).find('.good-cnt').text(savedCnt);
					$(thisEle).data('cnt', savedCnt);
				}

			}
		}

	};

	MOBILE_COMMON.COMMENT.actionBbsCommentList(e, thisEle, successFunActionLike);

};


//코멘트 쓰기
MOBILE_COMMON.COMMENT.onclickWriteCommentFormAction = function(actionForm){
	console.log('MOBILE_COMMON.COMMENT.onclickWriteCommentFormAction');
	//event.preventDefault();
	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}


	//닉네임 설정 이벤트 팝업
	var savedMemberNick = DISK_MEMBER_FUN.getMyMemberData('member_nickname');
	console.log('savedMemberNick');
	if(isDefined(savedMemberNick) == false){

		var checkNeverOpen =  utility.disk.getStorageData('setNaverNewNicknameModal');
		if(checkNeverOpen != 'Y'){
			MOBILE_COMMON_FUN.openMobileMemberNicknameSetForm($('#'+actionForm));
			return;
		}
	}
	var $formEle = $('#'+actionForm);
	var formValues = $formEle.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	var replyIdx = '';
	if(isDefined(formData.reply_idx) == true){
		replyIdx = formData.reply_idx;
	}

	if(isDefined(formData)== false){
		return false;
	}
	if(isDefined(formData.idx)== false || isDefined(formData.comment_type)== false){
		disk_alert('정보가 올바르지 않습니다. 페이지 새로고침후 다시 시도하세요.');
		return;
	}

	var minStr = 2;
	if(formData.comment_type == 'qa'){
		minStr = 1;
	}

	if(isDefined(formData.comment_contents)== false || formData.comment_contents.length < minStr){
		disk_alert('내용을 '+minStr+'자이상 작성해주세요.');
		$formEle.find('textarea[name=comment_contents]').focus();
		return false;
	}

	if(formData.comment_type == 'contents' && isDefined(replyIdx) == false){

		if(isDefined(formData.onplay_rating)== false || formData.onplay_rating == 0){
			disk_alert('콘텐츠 만족도를 평가해주세요.');
			$('.onplay_rating_wrap').addClass('is-invalid').focus();
			return false;
		}

		$('.onplay_rating_wrap').removeClass('is-invalid');
	}

	if(isDefined(formData.member) == false){
		formData.member = '';
	}

	var boardName = '';
	if(isDefined(formData.board_name) == true){
		boardName = formData.board_name;
	}

	var actionLocation
	if(isDefined(formData.location) == true){
		actionLocation = formData.location;
	}

	var sendData = {
		idx	: formData.idx,
		t	: formData.comment_type,
		cc	: formData.comment_contents,
		g	: formData.onplay_rating,
		o	: formData.member,
		n	: boardName,
		l	: '',
		r	: replyIdx,
		is_mobile: 1
	};
	if(isDefined(formData.log) == true){
		sendData.l = formData.log;
	}

	console.log('sendData', sendData);

	var successWriteCommentCallbackFun = function(data){
		console.log('successWriteCommentCallbackFun');
		console.log(data);

		var commentListHtml;
		var innerEleName = '#'+formData.target;

		if(isDefined(formData.target) == true && isDefined(data.comment_data)){
			var disk_comment = new Comment_list(sendData.t, 0, 0);
			disk_comment.setData(data.comment_data);
			if(sendData.t == 'contents'){
				if(data.comment_data.is_reply == 1 && isDefined(data.comment_data.bbs_comment_reply_idx)){
					console.log('is reply yes');


					if(actionLocation == 'seller'){
						commentListHtml = disk_comment.getMobileSellerCommentReplyListHtml();
						$('.'+formData.target).prepend(commentListHtml);
						$('.'+formData.target).find('.reply-seller-form').remove();
					} else if (actionLocation == 'sellermanager'){
						MOBILE_PAGE.myseller.info.setMySellerCommentList("comments", 1);
					}
					else{
						commentListHtml = disk_comment.getMobileContentsCommentReplyListHtml();
						$('.'+formData.target).html(commentListHtml);
					}

				}else{
					commentListHtml = disk_comment.getMobileContentsCommentListHtml();
					$(innerEleName).prepend(commentListHtml);
				}

			}else if(sendData.t == 'qa'){
				commentListHtml = disk_comment.getMobileQaCommentListHtml();
				$(innerEleName).append(commentListHtml);
			}else{
				commentListHtml = disk_comment.getMobileEventCommentListHtml();
				$(innerEleName).prepend(commentListHtml);
			}
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

		//contents view
		if(formData.comment_type == 'contents'){
			//로그인지 on view인지
			var isCommentLocation = 'view';
			if(isDefined(formData.location) == true){
				if(formData.location == 'log'){
					isCommentLocation = 'log';
				}
			}
			if(data.comment_data.is_reply != 1){
				$formEle.find('.btn-comment-rating').removeClass('active');
				$formEle.find('input[name=onplay_rating]').val('0');
			}

			//구매 로그
			if(isCommentLocation == 'log'){
				PAGE_MY.contents.setCommentDataUpdateLogEle(data, formData);

			}else{
				MOBILE_PAGE.contents.setCommentDataUpdateViewEle(data, 'new');
			}


		}else if(formData.comment_type == 'board'){
			if(sendData.n == 'request'){
				console.log('request empty');
				$('#req-board-contets-'+sendData.idx).empty();
			}

		}else if(formData.comment_type == 'qa'){
			var $infoEle = $('#cs-qa-board-contets-'+sendData.idx);
			var rCnt = $infoEle.find('.reply_num_txt').text();
			if(isDefined(rCnt) == false || $.isNumeric(rCnt) == false){
				rCnt = 0;
			}
			var newCnt = parseInt(rCnt) + 1;
			$infoEle.find('.reply_num_txt').text(newCnt);
			$infoEle.find('.reply_num').addClass('active');
			$infoEle.data({load: 0, view_html: ''});


		}
	};
	COMMON_ACTION.BBS.COMMENT.actionWriteComment(sendData, successWriteCommentCallbackFun);
	return;
};


//코멘트 : 쿠폰선물
MOBILE_COMMON.COMMENT.couponSendBbsComment  = function(e, thisEle){
	console.log('MOBILE_COMMON.COMMENT.couponSendBbsComment');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal(true);
	if(isLogined != true){
		console.log('need login');
		return;
	}
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(isDefined(eleData.idx) == false || isDefined(eleData.coupon) == false  || isDefined(eleData.comment) == false){
		disk_alert('정보가 올바르지 않습니다.');
		return;
	}

	if(eleData.coupon > 0){
		disk_alert('이미 쿠폰이 지급된 리뷰입니다.');
		return;
	}

	var savedMemberIdx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
	console.log('savedMemberIdx', savedMemberIdx);

	if(eleData.type == 'contents'){
		if(eleData.bbs_owner  != parseInt(savedMemberIdx) ){
			disk_alert('콘텐츠 판매자만 쿠폰선물을 하실 수 있습니다.[A]');
			return;
		}

		if(eleData.location == 'view'){
			var $bbsViewEle = $('#contentsModalViewSellerMemberIdx_'+eleData.idx);
			if($bbsViewEle.length < 1 || $bbsViewEle.val() != savedMemberIdx){
				disk_alert('콘텐츠 판매자만 쿠폰선물을 하실 수 있습니다.B');
				return;
			}
		}
	}

	var successFunSentDownloadCouponFun = function(data){
		console.log('successFunSentDownloadCouponFun');
		console.log(data);

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}


		if(eleData.location == 'view'){
			if(isDefined(data.is_ok)){
				if(data.is_ok == 1){
					$(thisEle).remove();
				}
			}
			if(isDefined(data.comment_data) == true){
				var targetEle = '.reply-contents-wrap-'+eleData.target;
				console.log('is reply yes');
				var disk_comment = new Comment_list(eleData.type, 0, 0);
				disk_comment.setData(data.comment_data);
				commentListHtml = disk_comment.getMobileContentsCommentReplyListHtml();
				$(targetEle).html(commentListHtml);
			}
		}
		else if(eleData.location == 'seller'){
			if(isDefined(data.is_ok)){
				if(data.is_ok == 1){
					$(thisEle).data({'coupon': 1}).addClass('is-invalid');
				}
			}

			if(isDefined(data.comment_data) == true){
				var targetEle = '.'+eleData.target;
				console.log('is reply yes');
				var disk_comment = new Comment_list(eleData.type, 0, 0);
				disk_comment.setData(data.comment_data);
				commentListHtml = disk_comment.getMobileSellerCommentReplyListHtml();
				$(targetEle).prepend(commentListHtml);
				$(targetEle).find('.reply-seller-form').remove();

			}
		}
	};
	COMMON_ACTION.BBS.COMMENT.actionSendDownloadCoupon(eleData, successFunSentDownloadCouponFun);
};
