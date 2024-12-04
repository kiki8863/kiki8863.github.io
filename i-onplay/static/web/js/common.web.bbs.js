/*
* bbs : memo, comment, board
*/

var WEB_COMMON_BBS = {};

//메모 관련
WEB_COMMON_BBS.MEMO = {};
WEB_COMMON_BBS.MEMO.submitSendMemo = function(formEleId){
	console.log('WEB_COMMON_BBS.MEMO.submitSendMemo');

	var isLogined = utility.disk.checkIsLogin();
	if(isLogined != true){
		alert('로그인이 필요한 서비스입니다.');
		return;
	}

	if(isDefined(formEleId) == false){
		console.log('empty formEleId');
		return;
	}

	var formValues = $('#'+formEleId).serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);


	var sendMemoSuccessCallbackFun = function(data){
		console.log('sendMemoSuccessCallbackFun', data);
		$.modal.close();

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}


	};

	COMMON_ACTION.BBS.actionSendMemo(formData, sendMemoSuccessCallbackFun);

};

//코멘트 관련




WEB_COMMON_BBS.COMMENT = {};

//코멘트 페이지 네이션
WEB_COMMON_BBS.COMMENT.setPagination  = function($infoEle){

	console.log('WEB_COMMON_BBS.COMMENT.setPagination');
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
			utility.shortPagination.action($(this), '.btn-get-comment-list', WEB_COMMON_BBS.COMMENT.getMoreCommentListData);	//반드시 .을 붙인다
		});
	}
};

//코멘트 데이타 Callback Fun
WEB_COMMON_BBS.COMMENT.successFunCommentListData = function(sendData, data, isFirst){
	console.log('WEB_COMMON_BBS.COMMENT.successFunCommentListData', sendData);
	if(isDefined(data.comment_data) == false){
		return;
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
		disk_comment.setData(commentList[c]);
		if(sendData.t == 'contents'){
			commentListHtml.push(disk_comment.getWebContentsCommentListHtml());
		}else{
			commentListHtml.push(disk_comment.getWebEventCommentListHtml());
		}
	}
	console.log('commentListHtml');
	console.log(commentListHtml);

	//inser html;
	var $innerEle = $('#'+sendData.target);
	if(isDefined(data.idx) && commentListHtml.length > 0){
		$innerEle.html(commentListHtml.join(''));
	}

	var savedEleData = {
		page		: parseInt(data.comment_data.page),
		limit		: parseInt(data.comment_data.limit),
		board_name	: data.comment_data.board_name,
		idx			: parseInt(data.comment_data.idx),
	}
	//console.log('savedEleData', savedEleData);

	//page
	var $targetPagnationEle = $('#'+sendData.info);
	console.log($targetPagnationEle);
	console.log('$targetPagnationEle data');
	console.log($targetPagnationEle.data());

	if(data.force_page == 1 || data.comment_data.page == 1){
		savedEleData.total_count	= parseInt(data.comment_data.total_count);
		savedEleData.total_page		= parseInt(data.comment_data.total_page);
		console.log('savedEleData', savedEleData);
		if($targetPagnationEle.length > 0){
			$targetPagnationEle.data(savedEleData);

			//페이징 로드
			if($targetPagnationEle.data('loaded') != 1 && isFirst == true){
				WEB_COMMON_BBS.COMMENT.setPagination($targetPagnationEle);
				//savedEleData.loaded	=1;
				$targetPagnationEle.data('loaded', 1);
			}
		}
	}else{
		$targetPagnationEle.data(savedEleData);
	}

	if(isFirst != true && sendData.t != 'contents'){
		utility.ui.goToElement('#'+sendData.target);
	}
};

//코멘트 리스트 : 가져오기 - 처음
WEB_COMMON_BBS.COMMENT.setCommentList = function(sendData){
	console.log('WEB_COMMON_BBS.COMMENT.setCommentList', sendData);

	if(isDefined(sendData.idx) == false || isDefined(sendData.t) == false){
		alert('이벤트 정보가 올바르지 않습니다.');
		return;
	}
	var successGetCommmentListFun = function(data){
		console.log('successGetCommmentListFun');
		console.log(data);

		//set list html
		if(isDefined(data.comment_data)){
			WEB_COMMON_BBS.COMMENT.successFunCommentListData(sendData, data, true);
		}
		//스크롤 스파이어
		$('.common-comment-write-wrap').data('load', 2);

		//데이타가 있으면
		if(data.comment_data.list.length > 4){
			if(sendData.t == 'contents'){
				$('.disk-comment-list-warp').css({'min-height': '565px'});
			}else{
				$('.disk-comment-list-warp').css({'min-height': '750px'});
			}
		}else{
			$('.no_content .txt').show();
		}

	};
	COMMON_ACTION.BBS.COMMENT.actionGetCommentList(sendData, successGetCommmentListFun, true);
};

//코멘트 리스트 : 더가져오기
WEB_COMMON_BBS.COMMENT.getMoreCommentListData = function(eleData){
	console.log('WEB_COMMON_BBS.COMMENT.getMoreCommentListData');
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
			WEB_COMMON_BBS.COMMENT.successFunCommentListData(oData, data);
		}
	};
	COMMON_ACTION.BBS.COMMENT.actionGetCommentList(sendData, successFunGetMoreCommentList);

};

//코멘트 메뉴 오픈
WEB_COMMON_BBS.COMMENT.openBbsCommentMenu = function(thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.openBbsCommentMenu');

	if($(thisEle).hasClass('active')){
		$(thisEle).removeClass('active');
	}else{
		$('.r_menu.hand.active').removeClass('active');
		$(thisEle).toggleClass('active');
	}

};

//코멘트 액션 - 삭제, 신고, 좋아요
WEB_COMMON_BBS.COMMENT.actionBbsCommentList = function(e, thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.actionBbsCommentList');
	e.stopPropagation();

	var isLogined = utility.disk.checkIsLoginWithModal();
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

		if(data.is_ok == 1){
			if(data.action == 'del'){
				if(isDefined(eleData.target)){
					$('.'+eleData.target).remove();
				}
				if($('.bbs-comment-list-section').length < 1){
					location.reload(true);
				}
			}else if(data.action == 'reply_del'){
				if(isDefined(eleData.target)){
					$('.'+eleData.target).remove();
				}
			}else if(data.action == 'report'){
				console.log('report');
				//save storage
				//var sTime = data.s_time;
				utility.disk.setStorageData('reportSTime', sTime);
			}
			else if(data.action == 'like'){
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
	COMMON_ACTION.BBS.COMMENT.actionChangeComment(sendData, actionCommentCallbackFun);
};


//코멘트 삭제하기
WEB_COMMON_BBS.COMMENT.delBbsCommentList = function(e, thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.delBbsCommentList');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal();
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

	WEB_COMMON_BBS.COMMENT.actionBbsCommentList(e, thisEle);
	return;
};



//코멘트 답글달기
WEB_COMMON_BBS.COMMENT.replyBbsCommentList = function(e, thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.replyBbsCommentList');
	e.stopPropagation();
	var eleData = $(thisEle).data();
	console.log(eleData);
	var isLogined = utility.disk.checkIsLoginWithModal();
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
			alert('콘텐츠 판매자만 댓글을 다실 수 있습니다.');
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
WEB_COMMON_BBS.COMMENT.reportBbsCommentList = function(e, thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.reportBbsCommentList');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal();
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

	WEB_COMMON_BBS.COMMENT.actionBbsCommentList(e, thisEle);

};




//코멘트 좋아요
WEB_COMMON_BBS.COMMENT.likeBbsCommentList = function(e, thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.reportBbsCommentList');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal();
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
	//시간  체크 -30초
	if(timestampSecond < (checkTime + 30) ){
		//alert('당신의 하트는 기다림이 필요합니다. 1분뒤에 다시 시도해주세요.');
		console.log('time check');
		//var show_msg = '코멘트를 좋아합니다.';
		var show_msg = '30초뒤에 다시 눌러주세요.';
		var msgType =  "alert-warning";
		$.ambiance({message: show_msg, type:msgType});
		//$(thisEle).addClass('active');
		return;
		//return;
	}

	WEB_COMMON_BBS.COMMENT.actionBbsCommentList(e, thisEle);

};


//코멘트 쓰기
WEB_COMMON_BBS.COMMENT.onclickWriteCommentFormAction = function(actionForm){
	console.log('WEB_COMMON_BBS.COMMENT.onclickWriteCommentFormAction');
	//event.preventDefault();
	if(utility.disk.checkIsLoginWithModal() != true){
		return;
	}

	//닉네임 설정 이벤트 팝업
	var savedMemberNick = DISK_MEMBER_FUN.getMyMemberData('member_nickname');
	console.log('savedMemberNick');
	if(isDefined(savedMemberNick) == false){

		var checkNeverOpen =  utility.disk.getStorageData('setNaverNewNicknameModal');
		if(checkNeverOpen != 'Y'){
			WEB_COMMON_GO.openMemberNicknameSetForm($('#'+actionForm));
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
		alert('정보가 올바르지 않습니다. 페이지 새로고침후 다시 시도하세요.');
		return;
	}

	if(isDefined(formData.comment_contents)== false || formData.comment_contents.length < 10){
		alert('내용을 10자이상 작성해주세요.');
		$formEle.find('textarea[name=comment_contents]').focus();
		return false;
	}

	if(formData.comment_type == 'contents' && isDefined(replyIdx) == false){

		if(isDefined(formData.onplay_rating)== false || formData.onplay_rating == 0){
			alert('콘텐츠 만족도를 평가해주세요.');
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
		r	: replyIdx
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
		var commentBoardName = sendData.n;
		if(isDefined(data.board_name)){
			commentBoardName = data.board_name;
		}
		var commentBoardIdx =  sendData.idx;

		if(isDefined(formData.target) == true && isDefined(data.comment_data)){
			var disk_comment = new Comment_list(sendData.t, 0, 0);
			disk_comment.setData(data.comment_data);
			if(sendData.t == 'contents'){
				if(data.comment_data.is_reply == 1 && isDefined(data.comment_data.bbs_comment_reply_idx)){
					console.log('is reply yes');

					if(actionLocation == 'seller'){
						commentListHtml = disk_comment.getWebSellerCommentReplyListHtml();
						$('.'+formData.target).prepend(commentListHtml);
						$('.'+formData.target).find('.reply-seller-form').remove();
					}else{
						commentListHtml = disk_comment.getWebContentsCommentReplyListHtml();
						$('.'+formData.target).html(commentListHtml);

							console.log(0);
					}

				}else{
					commentListHtml = disk_comment.getWebContentsCommentListHtml();
					$(innerEleName).prepend(commentListHtml);
					console.log(1);
				}

			}else if(sendData.t == 'qa'){

				commentListHtml = disk_comment.getWebQaCommentListHtml();
				console.log(commentListHtml)
				$(innerEleName).append(commentListHtml);
			}else{
				console.log('etc comment');
				console.log('innerEleName', innerEleName);
				if(data.comment_data.is_reply == 1 && isDefined(data.comment_data.bbs_comment_reply_idx)){
					console.log('is reply yes');
					commentListHtml = disk_comment.getWebContentsCommentReplyListHtml();
					$('.'+formData.target).html(commentListHtml);
					$('.'+formData.target).find('.reply_input').remove();
				}else{
					commentListHtml = disk_comment.getWebEventCommentListHtml();
					$(innerEleName).prepend(commentListHtml);	
				}
				
				
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
				PAGE_CONTENTS.setCommentDataUpdateViewEle(data);
			}


		}else if(formData.comment_type == 'board'){
			if(sendData.n == 'request'){
				console.log('request empty');
				$('#req-board-contets-'+sendData.idx).empty();
				var rCnt = $('.comment-cnt-num').text();
				if(isDefined(rCnt) == false || $.isNumeric(rCnt) == false){
					rCnt = 0;
				}
				var newCnt = parseInt(rCnt) + 1;
				$('.comment-cnt-num').text(newCnt);

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
WEB_COMMON_BBS.COMMENT.couponSendBbsComment  = function(e, thisEle){
	console.log('WEB_COMMON_BBS.COMMENT.couponSendBbsComment');
	e.stopPropagation();
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		console.log('need login');
		return;
	}
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(isDefined(eleData.idx) == false || isDefined(eleData.coupon) == false  || isDefined(eleData.comment) == false){
		alert('정보가 올바르지 않습니다.');
		return;
	}

	if(eleData.coupon > 0){
		alert('이미 쿠폰이 지급된 리뷰입니다.');
		return;
	}


	var savedMemberIdx = DISK_MEMBER_FUN.getMyMemberData('member_idx');
	console.log('savedMemberIdx', savedMemberIdx);

	if(eleData.type == 'contents'){
		if(eleData.bbs_owner  != parseInt(savedMemberIdx) ){
			alert('콘텐츠 판매자만 쿠폰선물을 하실 수 있습니다.[A]');
			return;
		}

		if(eleData.location == 'view'){
			var $bbsViewEle = $('#contentsModalViewSellerMemberIdx_'+eleData.idx);
			if($bbsViewEle.length < 1 || $bbsViewEle.val() != savedMemberIdx){
				alert('콘텐츠 판매자만 쿠폰선물을 하실 수 있습니다.B');
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
				commentListHtml = disk_comment.getWebContentsCommentReplyListHtml();
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
				commentListHtml = disk_comment.getWebSellerCommentReplyListHtml();
				$(targetEle).prepend(commentListHtml);
				$(targetEle).find('.reply-seller-form').remove();

			}
		}



	};


	COMMON_ACTION.BBS.COMMENT.actionSendDownloadCoupon(eleData, successFunSentDownloadCouponFun);
};


	/*

	var sTime = Math.floor(+ new Date() / 1000);
	var delCommentCallbackFun = function(data){
		console.log('delCommentCallbackFun');
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

		if(data.is_ok == 1){
			if(data.action == 'del'){
				if(isDefined(eleData.target)){
					$('.'+eleData.target).remove();
				}
				if($('.bbs-comment-list-section').length < 1){
					location.reload(true);
				}
			}else if(data.action == 'report'){
				console.log('report');
				//save storage
				//var sTime = data.s_time;
				utility.disk.setStorageData('reportSTime', sTime);
			}
			else if(data.action == 'like'){
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
	COMMON_ACTION.BBS.COMMENT.actionChangeComment(sendData, delCommentCallbackFun);
	*/
