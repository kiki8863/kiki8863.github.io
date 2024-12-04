/*
* web modal templete
*/


TEMPLETE.WEB_PAGE_MODAL = {};

//modal : 판매자 정보 보기
TEMPLETE.WEB_PAGE_MODAL.getSellerInfoPopupHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.getSellerInfoPopupHtml');
	console.log(data);
	var isNoImg = '';
	if(isDefined(data.seller_profile_picture) == false){
		isNoImg = 'no_img_b';
	}
	var showSellerMemo = '';
	if(isDefined(data.seller_memo)){
		showSellerMemo = data.seller_memo;
	}
	var returnHtml = '';
		returnHtml += '	<div class="modal-dialog onplay" style="display:block;width:600px;">';
		returnHtml += '		<div class="modal-content seller">';
		returnHtml += '			<div class="modal-header"> ';
		returnHtml += '			<h4 class="modal-title">판매자 채널 정보</h4>';
		//returnHtml += '			<button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		returnHtml += '				<div class="p_channel_wrap">';
		returnHtml += '					<div class="channel_top '+isNoImg+'">';
		if(isNoImg == ''){
			returnHtml += '						<div class="c_img">';
			returnHtml += '							<span>';
			returnHtml += '								<img src="'+data.seller_profile_picture+'" alt="'+data.seller_nickname+'" data-type="seller_info" onerror="utility.ui.onErrorImgLoadViewContents(this);">';
			returnHtml += '							</span>';
			returnHtml += '						</div>';
		}
		returnHtml += '						<div class="c_info">';
		returnHtml += '							<p class="c_name hand" data-idx="'+data.idx+'" data-nick="'+data.seller_nickname+'" onclick="WEB_COMMON_SELLER.onclickGoSellerChannel(this);">'+data.seller_nickname+' <span class="btn_share"></span></p>';
		returnHtml += '							<div class="line"></div>';
		if(isDefined(data.seller_theme)){
			returnHtml += '							<p class="channel_txt">'+data.seller_theme+'</p>';
		}
		returnHtml += '							<div class="tag_area">';
		if(isDefined(data.seller_category_list)){
			for(var k in data.seller_category_list){
				returnHtml += '								<span class="tag">#'+ data.seller_category_list[k]+'</span> ';
			}
		}
		//returnHtml += '								<span class="tag">#영화</span>, <span class="tag">#방송</span>, <span class="tag">#게임</span>, <span class="tag">#유틸</span>, <span class="tag">#음악</span>, <span class="tag">#교육</span>, <span class="tag">#이미지</span>, <span class="tag">#성인</span>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="c_popup_btn">';
		returnHtml += '						<span class="c_btn type1" data-idx="'+data.idx+'" onclick="WEB_COMMON_SELLER.onclickActionSubscribeSellerChannel(this);">구독</span>';
		returnHtml += '						<span class="c_btn type2" data-seller="'+data.idx+'" data-kind="" data-reply="0" data-sender="" data-sender_nick="" data-receiver="'+data.member+'" data-receiver_nick="'+data.seller_nickname+'" data-idx="" onclick="WEB_COMMON_GO.openBbsMemoForm(this);">쪽지</span>';
		returnHtml += '						<span class="c_btn type3" data-idx="'+data.idx+'" data-nick="'+data.seller_nickname+'" onclick="WEB_COMMON_SELLER.onclickGoSellerChannel(this);">채널로 이동</span>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="p_c_detail_txt">';
		returnHtml += '						<p>'+showSellerMemo+'</p>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};


//modal : 쪽지 보내기
TEMPLETE.WEB_PAGE_MODAL.sendMemoPopupHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.getSellerInfoPopupHtml');
	console.log(data);

	var isReply = false;
	if(data.reply == 1 || isDefined(data.idx)){
		isReply = true;
	}

	var returnHtml = '';
		returnHtml += '<form nmae="pcSendMemoForm" id="pcSendMemoForm">';
		returnHtml += '	<input type="hidden" name="sender_idx" value="'+data.sender+'">';
		returnHtml += '	<input type="hidden" name="sender_nick" value="'+data.sender_nick+'">';
		returnHtml += '	<input type="hidden" name="receiver_idx" value="'+data.receiver+'">';
		returnHtml += '	<input type="hidden" name="receiver_nick" value="'+data.receiver_nick+'">';
		returnHtml += '	<input type="hidden" name="memo_is_reply" value="'+data.reply+'">';
		returnHtml += '	<input type="hidden" name="seller" value="'+data.seller+'">';
		returnHtml += '	<div class="modal-dialog onplay">';
		returnHtml += '		<div class="modal-content">';
		returnHtml += '			<div class="modal-header">';
		returnHtml += '			<h4 class="modal-title">쪽지 보내기</h4>';
		//returnHtml += '			<button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		returnHtml += '			<div class="note_wrap">';
		returnHtml += '				<div class="type_chioce">';
		//returnHtml += '					 <p class="tit">분류</p>';
		returnHtml += '					 <div class="radio_wrap">';
		if(isReply == true){
			returnHtml += '	<input type="hidden" name="memo_kind" value="답장">';
			returnHtml += '	<input type="hidden" name="memo_idx" value="'+data.idx+'">';
		}else{
			returnHtml += '	<input type="hidden" name="memo_idx" value="">';
			returnHtml += '						<input type="radio" name="memo_kind" class="" value="문의" checked><span class="r_btn"></span><label for="" class="l_style">문의</label>';
			returnHtml += '						<input type="radio" name="memo_kind" class="" value="요청"><span class="r_btn"></span><label for="" class="l_style">요청</label>';
			returnHtml += '						<input type="radio" name="memo_kind" class="" value="불만"><span class="r_btn"></span><label for="" class="l_style">불만</label>';
			returnHtml += '						<input type="radio" name="memo_kind" class="" value="기타"><span class="r_btn"></span><label for="" class="l_style">기타</label>';
		}
		returnHtml += '					 </div>';
		returnHtml += '				</div>';

		returnHtml += '				<div class="get_name">';
		returnHtml += '					<p class="tit">받는 사람</p>';
		returnHtml += '					<div class="input_wrap">';
		returnHtml += '						<span class="nick">'+data.receiver_nick+'</span>';
		//returnHtml += '						<input type="text" class="input_style">';
		//returnHtml += '						<p class="p_txt">받는 사람의 닉네임을 입력하세요</p>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';

		returnHtml += '				<div class="note_content">';
		returnHtml += '					<textarea name="memo_data" class="t_area_style" placeholder="보내실 쪽지 내용을 입력해주세요."></textarea>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="note_notice">최대 150자까지 보내실 수 있습니다.</div>';
		returnHtml += '				<div class="btn_send_note" onclick="WEB_COMMON_BBS.MEMO.submitSendMemo(\'pcSendMemoForm\');">쪽지 보내기</div>';
		returnHtml += '			</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</form>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
}

//닉네임 설정하고 포인트 받자
TEMPLETE.WEB_PAGE_MODAL.setMemberNickname = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.setMemberNickname');
	console.log(data);
	var returnHtml = '';

		returnHtml += '	<div class="modal-dialog onplay" style="">';
		returnHtml += '		<div class="modal-content nickname">';
		returnHtml += '			<div class="modal-header"> ';
		returnHtml += '				<p>닉네임 설정하고 포인트 받자</p>';
		//returnHtml += '				<button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		returnHtml += '				<form name="modalSetMemberNicknameForm" id="modalSetMemberNicknameForm" method="post">';
		returnHtml += '					<input type="hidden" name="checkedNickname" id="modalSetMemberNicknameForm_check_nickname" value="">';

		returnHtml += '					<div class="nickname_wrap">';
		returnHtml += '						<div class="name_top">';
		returnHtml += '							<div class="input_wrap">';
		returnHtml += '								<input type="text" class="input_style" name="member_nickname" id="modalSetMemberNicknameForm_cmember_nickname" maxlength="8"><span class="btn_check hand active" data-target="modalSetMemberNicknameForm_cmember_nickname" data-checker="modalSetMemberNicknameForm_check_nickname" onclick="PAGE_MY.info.checkMemberDuplicateNickname(this);">중복체크</span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="c_box_wrap">';
		returnHtml += '								<input type="checkbox" name="agree_info" id="modalSetMemberNicknameForm_agree_info" class=""><span class="txt">닉네임 개인정보 수집에 동의합니다.</span><a href="/company/privacy" target="blank"><span class="view_terms">개인정보정책보기 &gt;</span></a>';
		returnHtml += '							</div>';
		returnHtml += '							<span class="btn_submit" onclick="PAGE_MY.info.onclickSetMemberNicknameFormAction(\'modalSetMemberNicknameForm\');">등록</span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="name_btm">';
		returnHtml += '							<p class="b_tit">닉네임 등록 안내</p>';
		returnHtml += '							<ul>';
		returnHtml += '								<li>- 닉네임은 최초 1회만 등록이 가능합니다.</li>';
		returnHtml += '								<li>- 닉네임 등록 후 변경이 불가하오니 신중히 입력해주세요.</li>';
		returnHtml += '								<li>- 닉네임은 6자 이내로 설정 가능합니다.</li>';
		returnHtml += '							</ul>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';

		returnHtml += '				</form>';

		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};

//SNS 비밀번호 신규 등록
TEMPLETE.WEB_PAGE_MODAL.setUserPasswordReg = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.setMemberNickname');
	console.log(data);
	var userEmail = '';
	if(isDefined(data.email)){
		userEmail = data.email;
	}
	var returnHtml = '';

		returnHtml += '	<div class="modal-dialog onplay" style="display:block;">';
		returnHtml += '		<div class="modal-content">';

		returnHtml += '			<div class="modal-header">';
		returnHtml += '			<h4 class="modal-title">비밀번호 설정</h4>';
		//returnHtml += '			<button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		returnHtml += '				<form name="modalSetUserPasswordRegForm" id="modalSetUserPasswordRegForm" method="post">';
		returnHtml += '					<input type="hidden" name="user_email" id="modalSetUserPasswordRegForm_user_email" value="'+userEmail+'">';
		returnHtml += '					<div class="pw_change_wrap">';
		returnHtml += '						<div class="input_wrap">';
		returnHtml += '							<p class="line"><label for="" class="label_style">아이디(이메일)</label><input type="text" class="input_style" placeholder="이메일" value="'+userEmail+'" disabled></p>';
		returnHtml += '							<p class="line"><label for="" class="label_style">비밀번호</label><input type="password" name="user_pass1" id="modalSetUserPasswordRegForm_user_pass1" class="input_style" placeholder="원하시는 비밀번호를 입력하세요."></p>';
		returnHtml += '							<p class="line"><label for="" class="label_style">비밀번호 확인</label><input type="password" name="user_pass2" id="modalSetUserPasswordRegForm_user_pass2" class="input_style" placeholder="비밀번호 확인"></p>';
		returnHtml += '							<span class="btn_ok" onclick="PAGE_MY.info.onclickSetUserPasswordNewSetFormAction(\'modalSetUserPasswordRegForm\');">확인</span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_notice">';
		returnHtml += '							<ul>';
		returnHtml += '								<li><span class="dot"></span><span class="txt">비밀번호를 등록하면 SNS 연동된 아이디나 이메일 주소를 이용하여 바로 로그인이 가능합니다.</span></li>';
		returnHtml += '								<li><span class="dot"></span><span class="txt">비밀번호는 영문 대소문자, 숫자, 특수문자 2종류 조합 8~16자 로 설정 가능합니다.</span></li>';
		returnHtml += '								<li><span class="dot"></span><span class="txt">비밀번호를 설정하여도 SNS 사이트의 비번은 변경되지 않습니다.</span></li>';
		returnHtml += '							</ul>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';
		returnHtml += '				</form>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';


	try{
	    return returnHtml;
    }finally {
			returnHtml, data, userEmail = null;
   	}
};

//자녀안심 서비스 : 설정, 해제
TEMPLETE.WEB_PAGE_MODAL.setMemberSafeChildModeHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.setMemberSafeChildModeHtml');
	console.log(data);
	var returnHtml = '';

		returnHtml += '<form name="memberSafeChildModalForm" id="memberSafeChildModalForm">';
		returnHtml += '	<input type="hidden" name="member_safe_child" value="'+data.member_safe_child+'">';
		returnHtml += '	<div class="modal-dialog onplay" style="">';
		returnHtml += '		<div class="modal-content">';
		returnHtml += '			<div class="modal-header">';
		if(data.member_safe_child == 1){
			returnHtml += '			<h4 class="modal-title">자녀 안심 서비스: 보호 설정하기 </h4>';
		}else{
			returnHtml += '			<h4 class="modal-title">자녀 안심 서비스: 보호 해제하기 </h4>';
		}

		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		if(data.member_safe_child == 2){
			returnHtml += '				<p class="t_txt">현재 자녀 안심 서비스가 ON 상태입니다. (성인정보가 노출되지 않습니다.)</p>';
			returnHtml += '				<p class="input_line"><input type="password" name="safe_passwd" id="memberSafeChildModalForm_safe_passwd" autocomplete="new-password" placeholder="원하시는 비밀번호를 입력하세요. (4자 이상)" class="input_style"></p>';
		}else{
			returnHtml += '				<p class="t_txt">현재 자녀 안심 서비스가 OFF 상태입니다. (성인정보가 노출되고 있습니다.)</p>';
			returnHtml += '				<p class="input_line"><input type="password" name="safe_passwd" id="memberSafeChildModalForm_safe_passwd" autocomplete="new-password" placeholder="원하시는 비밀번호를 입력하세요. (4자 이상)" class="input_style"></p>';
			returnHtml += '				<p class="input_line"><input type="password" name="safe_passwd2" id="memberSafeChildModalForm_safe_passwd2" autocomplete="new-password" placeholder="비밀번호 확인" class="input_style"></p>';
		}


		returnHtml += '				<div class="btn_ok" onclick="WEB_COMMON_MEMBER.onclickSetMemberSafeChild('+data.member_safe_child+');">확인</div>';
		returnHtml += '				<div class="btm">';
		returnHtml += '					<dl>';
		returnHtml += '						<dt>자녀 안심 서비스란 ?</dt>';
		returnHtml += '						<dd>성인 자료가 노출되지 않도록 설정하는 서비스입니다.</dd>';
		returnHtml += '						<dd>우리 아이들의 성인 자료 접근을 원천차단시킴으로 안심하고 사용하실 수 있습니다.</dd>';
		returnHtml += '					</dl>';
		returnHtml += '					<dl>';
		returnHtml += '						<dt>설정/해제 방법</dt>';
		returnHtml += '						<dd>- 자녀 안심 서비스 사용시 원하시는 비밀번호를 입력하신 후 확인을 눌러주세요</dd>';
		returnHtml += '						<dd>- 비밀번호는 자녀 안심 서비스를 해지하실 경우 필요합니다.</dd>';
		returnHtml += '						<dd>- 비밀번호를 잊어버리셨다면 고객센터로 문의해주세요.</dd>';
		returnHtml += '					</dl>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</form>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};

//modal : 콘텐츠 평가하기
TEMPLETE.WEB_PAGE_MODAL.getContentsSetGradeFormPopupHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.getContentsSetGradeFormPopupHtml');
	console.log(data);
	if(isDefined(data.idx) == false){
		return NULL;
	}
	if(isDefined(data.log) == false){
		return NULL;
	}
	var bbsId = data.idx;
	var sellerIdx = data.seller;
	var targetEle = data.target;
	var contentsTitle = '';
	if(isDefined(data.name) == true){
		contentsTitle = data.name;
	}
	var returnHtml = '';


		returnHtml += '	<div class="modal-dialog onplay" id="getContentsSetGradeFormPopupHtml">';
		returnHtml += '	<form name="contentsLogCommentWriteForm" id="contentsLogCommentWriteForm" class="common-comment-write-form">';
		returnHtml += '		<input type="hidden" name="onplay_rating" id="contentsLogCommentWriteForm_onplay_rating" value="0"/>';
		returnHtml += '		<input type="hidden" name="comment_type" value="contents"/>';
		returnHtml += '		<input type="hidden" name="idx" value="'+bbsId+'"/>';
		returnHtml += '		<input type="hidden" name="target" value=""/>';
		returnHtml += '		<input type="hidden" name="log_target" value="'+targetEle+'"/>';
		returnHtml += '		<input type="hidden" name="log" value="'+data.log+'"/>';
		returnHtml += '		<input type="hidden" name="member" value="'+sellerIdx+'"/>';
		returnHtml += '		<input type="hidden" name="location" value="log"/>';
		returnHtml += '		<div class="modal-content note">';
		returnHtml += '			<div class="modal-header"> ';
		returnHtml += '			<h4 class="modal-title">평가하기</h4>';
		//returnHtml += '			<button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		if(isDefined(data.point) == true && data.point > 0){
			returnHtml += '				<div class="top_txt">';
			returnHtml += '					<p>평가와 리뷰를 남겨주시면 '+data.point+'B가 적립됩니다.</p>';
			returnHtml += '				</div>';
		}
		returnHtml += '				<div class="report_area">';
		returnHtml += '					<dl>';
		returnHtml += '						<dt class="p_style1"><label for="">콘텐츠명</label></dt>';
		returnHtml += '						<dd><span class="input_style txt">'+contentsTitle+'</span></dd>';
		returnHtml += '					</dl>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="review_input">';
		returnHtml += '					<div class="pick">';
		returnHtml += '						<span class="p_btn log-contents-grade-icon good" onclick="PAGE_MY.contents.onclickContentsGradeIcon(this);" data-form="contentsLogCommentWriteForm" data-grade="1" data-target="contentsLogCommentWriteForm_onplay_rating"><span class="ico"></span><span class="txt">만족합니다.</span></span>';
		returnHtml += '						<span class="p_btn log-contents-grade-icon bad" onclick="PAGE_MY.contents.onclickContentsGradeIcon(this);" data-form="contentsLogCommentWriteForm" data-grade="2" data-target="contentsLogCommentWriteForm_onplay_rating"><span class="ico"></span><span class="txt">별로에요.</span></span>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="t_area_wrap">';
		returnHtml += '						<textarea name="comment_contents" id="contentsLogCommentWriteForm_comment_contents" placeholder="다운 받으신 콘텐츠에 대해 피드백을 해주세요.&#10;간단 리뷰를 남기시면 포인트 보상과 커뮤니티 경험치가 올라갑니다" class="t_area_style"></textarea>';
		returnHtml += '						<div class="total_word"><span></span>최소 10자 에서 최대 200 자까지 작성가능합니다.</div>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="btn_ok" onclick="WEB_COMMON_BBS.COMMENT.onclickWriteCommentFormAction(\'contentsLogCommentWriteForm\');">등록하기</div>';
		returnHtml += '				<div class="review_btm">';
		returnHtml += '					<p class="tit"><span class="ico"></span>작성시 주의사항</p>';
		returnHtml += '					<ul>';
		returnHtml += '						<li><span class="dot"></span><span class="txt">등록된 내용은 콘테츠 정보에 댓글로 자동으로 노출됩니다.</span></li>';
		returnHtml += '						<li><span class="dot"></span><span class="txt">상대방에 대한 욕설, 비방, 명예훼손, 불성실한 내용, 반복문자, 특정 효능에 있어 오해의 소지가 있는 내용을 담고 있거나 저작권등 타인의 권리를 침해하는 내용이 있으면 삭제될 수 있습니다. 다만, 콘텐츠에 대한 불만, 판매자에게 불리한 내용이라는 이유만으로는 삭제하지 않습니다.</span></li>';
		returnHtml += '						<li><span class="dot"></span><span class="txt">게시글에 회원님의 이메일, 휴대폰 번호와 같은 개인 정보의 입력은 금지되어 있으며, 발생하는 모든 피해에 대해 온플레이에서는 책임지지 않습니다.</span></li>';
		returnHtml += '						<li><span class="dot"></span><span class="txt">게시글과 관련된 저작권 침해에 대한 책임은 본인에게 있습니다.</span></li>';
		returnHtml += '					</ul>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</form>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data, bbsId, sellerIdx, targetEle, contentsTitle = null;
   	}
};

//
TEMPLETE.WEB_PAGE_MODAL.getContentsReportModalHtml = function(data,title){
    var returnHtml = '';
        returnHtml += '<div class="modal-dialog onplay" id="contents_report">';
        returnHtml += '	<div class="modal-content note">';
        returnHtml += '		<div class="modal-header">';
        returnHtml += '		<h4 class="modal-title">콘텐츠 신고하기</h4>';
        returnHtml += '		<button type="button" class="m_close" onclick="window.close();"></button>';
        returnHtml += '		</div>';
        returnHtml += '		<div class="modal-body">';
        returnHtml += '			<div class="report_area">';
        returnHtml += '				<dl>';
        returnHtml += '					<dt class="p_style1"><label for="">제목</label></dt>';
        returnHtml += '					<dd><input type="text" class="input_style" disabled value="'+data.bbs_contents.bbs_title+'"></dd>';
        returnHtml += '				</dl>';
        returnHtml += '			</div>';
        returnHtml += '			<div class="report_area type1">';
        returnHtml += '				<dl>';
        returnHtml += '					<dt class="p_style2"><label for="">분류</label></dt>';
        returnHtml += '					<dd>';
        returnHtml += '						<ul>';
        returnHtml += '							<li class="size1"><input type="radio" class="radio_style" name="same" value="0"/><span class="r_btn" onclick="PAGE_CONTENTS.actionRdbutton(0)"></span><span class="ico"></span><label for="" class="l_style">불량 콘텐츠</label></li>';
        returnHtml += '							<li class="size2"><input type="radio" class="radio_style" name="same" value="1"/><span class="r_btn" onclick="PAGE_CONTENTS.actionRdbutton(1)"></span><label for="" class="l_style">허위 자료</label></li>';
        returnHtml += '							<li class="size3"><input type="radio" class="radio_style" name="same" value="2"/><span class="r_btn" onclick="PAGE_CONTENTS.actionRdbutton(2)"></span><label for="" class="l_style">저작권 위반</label></li>';
        returnHtml += '							<li class="size1"><input type="radio" class="radio_style" name="same" value="3"/><span class="r_btn" onclick="PAGE_CONTENTS.actionRdbutton(3)"></span><label for="" class="l_style">불법 성인물</label></li>';
        returnHtml += '							<li class="size2"><input type="radio" class="radio_style" name="same" value="4"/><span class="r_btn" onclick="PAGE_CONTENTS.actionRdbutton(4)"></span><label for="" class="l_style">불법 성인물(아청)</label></li>';
        returnHtml += '							<li class="size3"><input type="radio" class="radio_style" name="same" value="5"/><span class="r_btn" onclick="PAGE_CONTENTS.actionRdbutton(5)"></span><label for="" class="l_style">기타</label></li>';
        returnHtml += '						</ul>';
        returnHtml += '					</dd>';
        returnHtml += '				</dl>';
        returnHtml += '			</div>';
        returnHtml += '			<div class="report_area">';
        returnHtml += '				<dl>';
        returnHtml += '					<dt class="p_style3"><label for="">신고<br />내용</label></dt>';
        returnHtml += '					<dd>';
        returnHtml += '						<div class="t_area_wrap">';
        returnHtml += '							<textarea name="report_memo" id="report_memo" class="t_area_style"  onkeyup="PAGE_CONTENTS.reportLength(this)" maxlength="200"></textarea>';
        returnHtml += '							<div class="total_word"><span id="report_cur_length">000</span> / 200 자</div>';
        returnHtml += '						</div>';
        returnHtml += '					</dd>';
        returnHtml += '				</dl>';
        returnHtml += '			</div>';
        returnHtml += '			<div class="btn_ok" data-idx="'+data.bbs_idx+'" data-type="contents" data-action="report" data-idx="bbs_report" onclick="PAGE_CONTENTS.actionContents(this)">신고하기</div>';
        returnHtml += '		</div>';
        returnHtml += '	</div><!-- /.modal-content -->';
        returnHtml += '</div>';

        try{
    	    return returnHtml;
        }finally {
    			returnHtml = null;
       	}
};


//modal : 비밀번호 휴대폰 인증 팝
TEMPLETE.WEB_PAGE_MODAL.getPassAuthPopupHtml = function(email, email_key){
	console.log('TEMPLETE.WEB_PAGE_MODAL.getPassAuthPopupHtml');
	if(isDefined(email) == false){
		email = '';
	}
	var returnHtml = '';
		returnHtml += '	<div class="modal-dialog onplay" id="getPassAuthPopupHtml" style="width: 600px;margin: 0px;max-width:600px;">';
		returnHtml += '	<form name="passAuthForm" id="passAuthForm" class="common-comment-write-form">';
		returnHtml += '		<div class="modal-content find_pw">';
		returnHtml += '			<div class="modal-header"> ';
		returnHtml += '			    <h4 class="modal-title">비밀번호 재설정</h4>';
		returnHtml += '			</div>';
        returnHtml += '			<div class="modal-body">';
		returnHtml += '			    <div class="find_pw_top">';
        returnHtml += '			      <p class="txt">가입하신 메일 주소로 비밀번호 안내를 받으시거나 본인 명의의 휴대폰 번호로 인증을 통해 비밀번호 재설정이 가능합니다. <br />';
        returnHtml += '			                   타인 명의 메일주소나 휴대폰을 이용하시거나 법인 폰을 이용중이신 회원님은<br />';
        returnHtml += '			                   본인인증이 불가합니다.<br />';
        returnHtml += '			                  진행하시려면 인증방법을 선택해주세요.</p>';
        returnHtml += '			      <p class="txt">선택하신 email: '+email+'</p>';
        returnHtml += '		           <span style="background: #4fbc2d;" class="btn_out" data-type="email" data-email="'+email+'" data-key="'+email_key+'" onclick="PAGE_USER.FIND_PASSWORD.requestMyPasswordCodeWithMail(this);">메일로 비밀번호 재설정 요청</span>';
        //returnHtml += '		           <span class="btn_out" data-type="phone" data-openpage="findPass" data-email="'+email+'" data-open="/adult/phone_auth" data-rt=""  onclick="PAGE_USER.ADULT_FORM.openAdultCheck(this);">실명 인증후 재설정</span>';
        returnHtml += '		           <span class="btn_out" data-type="" data-openpage="findPass" data-email="'+email+'" data-open="" data-rt=""  onclick="PAGE_USER.ADULT_FORM.openFindPassRealNameCheck(this);">실명 인증후 재설정</span>';



		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
        returnHtml += ' </form>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};


//modal : 결제 모달

TEMPLETE.WEB_PAGE_MODAL.getChargeLayer = function(data){
	console.log('TEMPLETE.WEB_PAGE_MODAL.getChargeLayer');
	console.log(data.pay_method);
    var pay_method = data.pay_method;
    var charge_data = data.charge_data;
    var charge_total_point = Number(charge_data.pay_charge_cash_base) + Number(charge_data.pay_charge_cash_bonus) + Number(charge_data.pay_charge_event_bonus) + Number(charge_data.pay_charge_mileage);
    
    /*
    var pay_title = {};
        pay_title['100'] = '신용카드';
        pay_title['200'] = '계좌이체';
        pay_title['300'] = '휴대폰  결제';
        pay_title['400'] = '간편결제';
        pay_title['500'] = '상품권 결제 ';
        */

	var returnHtml = '';
		returnHtml += '<div class="modal-dialog charge" style="display:block;">';
        returnHtml += '	<div class="modal-content charge">';
        returnHtml += '		<div class="modal-header"> ';
        returnHtml += '			<h4 class="modal-title">온플레이 포인트 충전</h4>';
        returnHtml += '		</div>';
        returnHtml += '		<div class="modal-body">';
        returnHtml += '			<div class="charge_type">';
        returnHtml += '				<div class="type_chioce">';
        returnHtml += '					<p class="s_tit">결제 방법을 선택해 주세요</p>';
        returnHtml += '					<div class="type_list">';
        returnHtml += '						<ul>';
        
        
        for (var i in pay_method){
			 var isActive = "";
			 var pGroup = pay_method[i];
			 var pList =  pGroup.data;
			 var pGroupKey =  pGroup.key;
			 if(charge_data.pay_charge_type == 'AUTO' && (pGroup.name =='giftcard' || pGroup.name =='bank')){
			 	continue;
			 }
			 if(pGroup.name == 'simple_pay'){
			 	isActive = "active";
			 }
			returnHtml += '							<li class="type'+pGroupKey+' '+isActive+'" >';
            returnHtml += '								<div class="t_btn" onclick = "PAGE_PAY.onclickTabChange(this)">';
            returnHtml += '									<span class="ico"></span><span class="name">'+ pGroup.title+'</span><span class="arrow"></span>';
            returnHtml += '								</div>';
            returnHtml += '								<div class="t_area">';
			 for(var k in pList){
			 	var pMdthod = pList[k];
				var checked = "";
				var kakao_ico = '';
					
				if(pMdthod.pay_method_idx == 12){
					kakao_ico = "<span class='k_pay_ico'></span>";
				}
                if(k ==  0 && isActive == 'active'){  checked = "checked";}
                	returnHtml += '									<span class="r_area"><input type="radio" class="r_btn" name="rd_pay" data-width = "' + pMdthod.ui_pay_width+'" data-height = "' + pMdthod.ui_pay_height+'" value="' +pMdthod.pay_method_idx+'" '+checked+'><label for="" class="label_style">'+ kakao_ico + pMdthod.pay_method_title +'</label></span>';
				if(charge_data.pay_charge_type == 'AUTO' && pMdthod.pay_method_idx == "10"){
					returnHtml += '<span class="t_red">※ BC, 하나, 현대카드는 정기결제가 지원되지 않습니다.</span>';  //정기결제이고 신용카드일때 (일단 다우만일수있어서 다우methodidx만함)  귀찮지 않으려면 pay_method_kind == 'card_auto' 바꿔도됨
				}
            }
			returnHtml +='								</div>';
			returnHtml +='							</li>';
		}
		
		/*
        
        for (var prop_a in pay_method){
            var active = "active";
			if(pay_method[prop_a].length >0 ){
			if(prop_a == 100){  
					
			}
	                returnHtml += '							<li class="type'+prop_a+' '+active+'" >';
	                returnHtml += '								<div class="t_btn" onclick = "PAGE_PAY.onclickTabChange(this)">';
	                returnHtml += '									<span class="ico"></span><span class="name">'+ pay_title[prop_a]+'</span><span class="arrow"></span>';
	                returnHtml += '								</div>';
	                returnHtml += '								<div class="t_area">';

                    var checked = "";
					var kakao_ico = "";

                    for(var prop_b in pay_method[prop_a]){
						if(pay_method[prop_a][prop_b].pay_method_idx == 12){
							kakao_ico = "<span class='k_pay_ico'></span>";
						}
                        if(prop_b ==  0 && prop_a == 100){  checked = "checked";}

                        returnHtml += '									<span class="r_area"><input type="radio" class="r_btn" name="rd_pay" data-width = "' + pay_method[prop_a][prop_b].ui_pay_width+'" data-height = "' + pay_method[prop_a][prop_b].ui_pay_height+'" value="' + pay_method[prop_a][prop_b].pay_method_idx+'" '+checked+'><label for="" class="label_style">'+ kakao_ico + pay_method[prop_a][prop_b].pay_method_title +'</label></span>';
						if(charge_data.pay_charge_type == 'AUTO' && pay_method[prop_a][prop_b].pay_method_idx == "10"){
							returnHtml += '<span class="t_red">※ BC, 하나, 현대카드는 정기결제가 지원되지 않습니다.</span>';  //정기결제이고 신용카드일때 (일단 다우만일수있어서 다우methodidx만함)  귀찮지 않으려면 pay_method_kind == 'card_auto' 바꿔도됨
						}
                    }
                    returnHtml += '								</div>';
                returnHtml += '							</li>';
            }
        }
		*/
		
        returnHtml += '						</ul>';
        returnHtml += '					</div>';
        returnHtml += '				</div>';
		var f_h_style = "";
		if(charge_data.pay_charge_type == 'AUTO'){
			f_h_style = "f_h_style";
		}
        returnHtml += '				<div class="charge_info '+ f_h_style +'">';
        returnHtml += '					<p class="s_tit">결제 정보</p>';
        returnHtml += '					<div class="info_detail">';
        returnHtml += '						<div class="i_area">';
        returnHtml += '							<p class="i_tit">'+ charge_data.pay_charge_title +'</p>';
        returnHtml += '							<ul class="i_list">';
        if(charge_data.pay_charge_cash_base>0){
			returnHtml += '								<li><span class="txt">- 캐시</span><span class="p_num">'+number_with_delimiter(charge_data.pay_charge_cash_base)+' C</span></li>';
		}
        if(charge_data.pay_charge_cash_partner>0){
            returnHtml += '								<li><span class="txt">- 보너스 캐시</span><span class="p_num">'+number_with_delimiter(charge_data.pay_charge_cash_partner)+' BC</span></li>';
        }
        if(charge_data.pay_charge_cash_bonus>0){
            returnHtml += '								<li><span class="txt">- 보너스 포인트</span><span class="p_num">'+number_with_delimiter(charge_data.pay_charge_cash_bonus)+' B</span></li>';
        }

        if(charge_data.pay_charge_event_base>0){
            returnHtml += '								<li><span class="txt">- 이벤트 보너스</span><span class="p_num">'+number_with_delimiter(charge_data.pay_charge_event_base)+' BP</span></li>';
        }
        if(charge_data.pay_charge_event_bonus > 0){
            returnHtml += '								<li><span class="txt">- 이벤트 보너스</span><span class="p_num">'+number_with_delimiter(charge_data.pay_charge_event_bonus)+' BP</span></li>';
        }

        if(charge_data.pay_charge_mileage>0){
            returnHtml += '								<li><span class="txt">- 마일리지</span><span class="p_num">'+number_with_delimiter(charge_data.pay_charge_mileage)+' M</span></li>';
        }


        returnHtml += '							</ul>';
        if(charge_total_point > 0){
        	returnHtml += '							<div class="t_point">총 <span class="num">'+number_with_delimiter(charge_total_point)+'</span> P</div>';
       	}
        returnHtml += '						</div>';
        returnHtml += '						<div class="i_area">';
        returnHtml += '							<p class="i_tit">결제 금액 <span class="s_txt">(VAT 별도)</span></p>';
        returnHtml += '							<div class="sum_area">';
        returnHtml += '								<p class="d_sum">정상가 <span class="sum">'+number_with_delimiter(charge_data.pay_charge_prime_price)+'원</span></p>';
        returnHtml += '								<div class="t_sum"><span class="num">'+number_with_delimiter(charge_data.pay_charge_cost_price)+'</span> 원</div>';
        returnHtml += '							</div>';
        returnHtml += '						</div>';
        returnHtml += '						<div class="c_area">';
        returnHtml += '							<p class="c_txt"><input type="checkbox" class="c_box" id="onAgree"><label for="" class="label_style">위 상품의 구매조건 확인 및 결제 진행에 동의합니다.</label></p>';
        //returnHtml += '							<div class="c_term_area"></div>';
        if(charge_data.pay_charge_type == 'AUTO'){ //정액제일 경우에만
            returnHtml += '							<p class="c_txt"><input type="checkbox" class="c_box" id="onMonthAgree"><label for="" class="label_style">매월 정기 결제 되는 것에 동의합니다.</label></p>';
        }
        returnHtml += '						</div>';
        returnHtml += '						<span class="btn_charge" onclick = "PAGE_PAY.paymentAction('+charge_data.pay_charge_idx+',\''+charge_data.pay_charge_type+'\')">결제하기</span>';
        returnHtml += '					</div>';
        returnHtml += '				</div>';
        returnHtml += '			</div>';
        returnHtml += '		</div>';
        returnHtml += '	</div>';
        returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//modal : 등급안내표
TEMPLETE.WEB_PAGE_MODAL.getGradeInfoLayer = function(cunrrent_grade){
	if(isDefined(cunrrent_grade) == false){
		cunrrent_grade = 1;
	}
	console.log('TEMPLETE.WEB_PAGE_MODAL.getChargeLayer');
	var returnHtml = '';
	returnHtml += '<div class="modal-dialog onplay style2" id="getGradeInfoLayer" style="display:block;">';
	returnHtml += '	<div class="modal-content community">';
	returnHtml += '		<div class="modal-header"> ';
	returnHtml += '			<h4 class="modal-title">커뮤니티 등급 안내</h4>';
	//returnHtml += '			<a  class="m_close"  href="#close-modal" rel="modal:close" class="close-modal "></a>';
	returnHtml += '		</div>';
	returnHtml += '		<div class="modal-body">';
	returnHtml += '			<div class="community_wrap">';
	returnHtml += '				<div class="mdl_section">';
	returnHtml += '					<div class="top">';
	returnHtml += '						<p class="tit">커뮤니티 등급이란?</p>';
	returnHtml += '					</div>';
	returnHtml += '					<div class="mdl_container">';
	returnHtml += '						<p class="txt">글을 작성하시면 커뮤니티 포인트가 올라갑니다. 포인트에 따라 기본 등급 Lv.1 부터 <br /> 최고 등급 Lv.100 까지 커뮤니티 등급이 나눠집니다.</p>';
	returnHtml += '					</div>';
	returnHtml += '				</div>';
	returnHtml += '				<div class="mdl_section">';
	returnHtml += '					<div class="top">';
	returnHtml += '						<p class="tit">등급별 아이콘</p>';
	returnHtml += '					</div>';
	returnHtml += '					<div class="mdl_container">';
	returnHtml += '						<div class="now_grade now">';
	returnHtml += '							<span class="ico_area"><span class="m_level type'+cunrrent_grade+'"></span></span>';
	returnHtml += '							<span class="g_level">Lv.<span class="num member-current-grade-num">'+cunrrent_grade+'</span> 현재 등급</span>';
	returnHtml += '						</div>';

	returnHtml += '						<div class="grade_wrap">';
	returnHtml += '							<span class="m_btn prev" id="aro1_prev"></span>';
	returnHtml += '							<span class="m_btn next" id="aro1_next"></span>';
	returnHtml += '							<div class="grade_inner">';
	returnHtml += '								<div class="grade_view" ><!-- 1 - 20 -->';
	returnHtml += '									<ul class="grade_list type1">';

	for(var i = 1; i<101 ; i++){

	returnHtml += '										<li>';
	returnHtml += '											<span class="ico_area"><span class="m_level type'+i+'"></span></span>';
	returnHtml += '											<span class="g_level">Lv.<span class="num">'+i+'</span></span>';
	returnHtml += '										</li>';
		if(i%5 == 0 ){
			returnHtml += '									</ul>';
			if(i < 100){
				returnHtml += '									<ul class="grade_list">';
			}
		}

		if(i%20 == 0 ){
			returnHtml += '								</div>';

			if(i < 100){
				returnHtml += '								<div class="grade_view">';
				returnHtml += '									<ul class="grade_list ">';
			}
		}
	}

	returnHtml += '							</div>';
	returnHtml += '						</div>';
	returnHtml += '					</div>';
	returnHtml += '				</div>';
	returnHtml += '			</div>';
	returnHtml += '		</div>';
	returnHtml += '	 </div>';
	returnHtml += '</div>';

	try{
		return returnHtml;
	}finally {
			returnHtml = null;
	}
};


//modal : 등급안내표
TEMPLETE.WEB_PAGE_MODAL.getPointInfoLayer = function(){

	console.log('TEMPLETE.WEB_PAGE_MODAL.getPointInfoLayer');
	var returnHtml = '';
		returnHtml += '<div class="modal-dialog onplay style2 point" style="display:block;">';
		returnHtml += '		<div class="modal-content point">';
		returnHtml += '			<div class="modal-header"> ';
		returnHtml += '				<h4 class="modal-title">온플 포인트 안내</h4>';
		//returnHtml += '				<a  class="m_close" href="#close-modal" rel="modal:close" class="close-modal "></a>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="modal-body">';
		returnHtml += '				<div class="op_point_wrap">';
		returnHtml += '					<div class="mdl_section">';
		returnHtml += '						<div class="top">';
		returnHtml += '							<p class="tit">온플 포인트?</p>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_etxt_area">';
		returnHtml += '							<div class="point_area">';
		returnHtml += '								<span class="t_ico type"></span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="txt_area">';
		returnHtml += '								<p class="t_tit">온플 포인트란?</p>';
		returnHtml += '								<p class="e_txt">캐시, 보너스, 웹툰 포인트를 합산한 포인트입니다.</p>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_etxt_area">';
		returnHtml += '							<div class="point_area">';
		returnHtml += '								<span class="t_ico type2"></span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="txt_area">';
		returnHtml += '								<p class="t_tit">캐시란?</p>';
		returnHtml += '								<p class="e_txt">포인트 충전을 통해서 지급되는 포인트입니다. 제휴를 포함한 모든 콘텐츠를 구매할 수 있습니다.</p>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_etxt_area">';
		returnHtml += '							<div class="point_area">';
		returnHtml += '								<span class="t_ico type3"></span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="txt_area">';
		returnHtml += '								<p class="t_tit">보너스란?</p>';
		returnHtml += '								<p class="e_txt">포인트 충전 또는 이벤트 참여 시 무상으로 지급되는 포인트입니다. 제휴를 제외한 모든 콘텐츠를 구매할 수<br /> 있습니다. 보너스에 따라 사용 기한이 다르며 보너스 지급 시  명시되어 있습니다.</p>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_etxt_area b_none">';
		returnHtml += '							<div class="point_area">';
		returnHtml += '								<span class="t_ico type5"></span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="txt_area">';
		returnHtml += '								<p class="t_tit">웹툰 포인트란?</p>';
		returnHtml += '								<p class="e_txt">이벤트 참여 시 무상으로 지급되는 웹툰 전용 포인트입니다. 웹툰 이외의 콘텐츠에는 사용할 수 없습니다.</p>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="mdl_section">';
		returnHtml += '						<div class="top">';
		returnHtml += '							<p class="tit">기타 포인트</p>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_etxt_area">';
		returnHtml += '							<div class="point_area">';
		returnHtml += '								<span class="t_ico type4"></span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="txt_area">';
		returnHtml += '								<p class="t_tit">마일리지란?</p>';
		returnHtml += '								<p class="e_txt">포인트 충전 시 일정 금액이 마일리지로 적립되며 적립률은 상품에 따라 달라질 수 있습니다. 적립된<br />  마일리지는 포인트 전환 후 콘텐츠 구매에 사용할 수 있습니다. </p>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="p_etxt_area b_none">';
		returnHtml += '							<div class="point_area">';
		returnHtml += '								<span class="t_ico type6"></span>';
		returnHtml += '							</div>';
		returnHtml += '							<div class="txt_area">';
		returnHtml += '								<p class="t_tit">쿠폰이란?</p>';
		returnHtml += '								<p class="e_txt">콘텐츠를 교환할 수 있는 쿠폰입니다. 제휴를 제외한 10GB 이하의 일반 콘텐츠와 교환할 수 있고 1건당<br />  1장이 소진됩니다. 쿠폰에 따라 사용 기한이 다르며 쿠폰 지급 시 명시되어 있습니다.</p>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
		return returnHtml;
	}finally {
			returnHtml = null;
	}
};

/*************event modal***********************/
//event modal - new_join_2009

TEMPLETE.WEB_EVENT_MODAL = {};

TEMPLETE.WEB_EVENT_MODAL.eventNewJoinOnplayModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventNewJoinOnplayModal');

	var returnHtml = '';

		returnHtml += '<div class="modal-dialog new_join_2009"  id="eventNewJoinOnplayModal">';
		returnHtml += '	<p>신규 회원 가입 즉시 100% 포인트 증정</p>';
		returnHtml += '	<a href="#close" rel="modal:close"><button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button></a>';
		returnHtml += '	<p>10초면 끝나는 간편 회원가입하고, 무료 포인트 받아가세요!</p>';
		returnHtml += '	<span class="btn_go_join" data-target="eventNewJoinOnplayModal" data-url="/event/e_view/new_join_2009?page=1" data-event_id="new_join_2009" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">자세히 보기</span>';
		returnHtml += '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};
//앱 다운로드 이벤트
TEMPLETE.WEB_EVENT_MODAL.eventAppInstallOnplayModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventAppInstallOnplayModal');

	var returnHtml = '';
		returnHtml += '		<div class="modal-dialog app_down_2009" id="eventAppInstallOnplayModal">';
		returnHtml += '			<p>온플레이 앱 다운로드 즉시 100% 포인트 증정</p>';
		returnHtml += '			<a href="#close" rel="modal:close"><button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button></a>';
		returnHtml += '			<p>온플레이 앱 다운로드하고, 무료 포인트 받아가세요!</p>';
		//returnHtml += '			<span class="btn_go_app" data-target="eventAppInstallOnplayModal" data-open="1" data-url="https://play.google.com/store/apps/details?id=com.arkworks.onplay" data-event_id="app_down_2009" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">다운로드 받으러 가기</span>';
		returnHtml += '			<span class="btn_go_app" data-target="eventAppInstallOnplayModal" data-url="/event/e_view/app_down_2009?page=1" data-event_id="app_down_2009" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">다운로드 받으러 가기</span>';
		returnHtml += '			<span class="btn_close_day" data-target="eventAppInstallOnplayModal" data-url="" data-event_id="app_down_2009" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
		returnHtml += '		</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//출석 체크 이벤트
TEMPLETE.WEB_EVENT_MODAL.eventAttendJoinOnplayModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventAttendJoinOnplayModal');

	var returnHtml = '';
		returnHtml += '	<div class="modal-dialog on_attend_2009" id="eventAttendJoinOnplayModal">';
		returnHtml += '		<p>온플레이 출석체크!</p>';
		returnHtml += '		<a href="#close" rel="modal:close"><button type="button" class="m_close" data-dismiss="modal" aria-label="Close"></button></a>';
		returnHtml += '		<p>온플레이 회원이시라면 출석체크 하세요 출석만 해도 20P 개근시 최대 500P 지급</p>';
		returnHtml += '		<span class="btn_go_attend" data-target="eventAttendJoinOnplayModal" data-url="/event/e_view/on_attend?page=1" data-event_id="on_attend" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">출석체크 하러가기</span>';
		returnHtml += '		<span class="btn_close_day" data-target="eventAttendJoinOnplayModal" data-url="" data-event_id="on_attend" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//10원 이벤트 - 추석 버전
TEMPLETE.WEB_EVENT_MODAL.eventContentsSale10WonTGModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventContentsSale10WonTGModal');

	var returnHtml = '';
		returnHtml += '<div class="modal-dialog content_10_2009" id="eventContentsSale10WonTGModal">';
		returnHtml += '	<p>온플레이의 모든 콘텐츠가 10원!</p>';
		returnHtml += '	<a href="#close" rel="modal:close"><button type="button" class="m_close"></button></a>';
		returnHtml += '	<span class="btn_go_detail" data-target="eventContentsSale10WonTGModal" data-url="/event/e_view/content_10_2009?page=1" data-event_id="content_10_2009" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">자세히 보기</span>';
		
		returnHtml += '</div>';
		returnHtml += '<span class="btn_close_today" data-target="eventContentsSale10WonTGModal" data-url="" data-event_id="content_10_2009" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//앱 리뷰 이벤트
TEMPLETE.WEB_EVENT_MODAL.eventAppReviewCouponGiftModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventAppReviewCouponGiftModal');

	var returnHtml = '';
		returnHtml += '<div class="modal-dialog app_review_2011" id="eventAppReviewCouponGiftModal">';
		returnHtml += '	<p>온플레이 전용 앱에 리뷰 남기고 무료쿠폰 받아가세요!</p>';
		returnHtml += '	<a href="#close" rel="modal:close"><button type="button" class="m_close"></button></a>';
		returnHtml += '	<span class="btn_go_detail" data-target="eventAppReviewCouponGiftModal" data-url="/event/e_view/app_review_2011?page=1" data-event_id="app_review_2011" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">자세히 보기</span>';
		returnHtml += '</div>';
		returnHtml += '<span class="btn_close_today" data-target="eventAppReviewCouponGiftModal" data-url="" data-event_id="app_review_2011" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//웹툰 포인트 이벤트
TEMPLETE.WEB_EVENT_MODAL.eventWebtoonGiftPointtModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventWebtoonGiftPointtModal');

	var returnHtml = '';
		returnHtml += '<div class="modal-dialog webtoon_2011_p" id="eventWebtoonGiftPointtModal">';
		returnHtml += '	<p>온플레이에 접속하면 누구나 웹툰 포인트 1천원 공짜!</p>';
		returnHtml += '	<a href="#close" rel="modal:close"><button type="button" class="m_close"></button></a>';
		returnHtml += '	<span class="btn_go_detail" data-target="eventWebtoonGiftPointtModal" data-url="/event/e_view/webtoon_2011?page=1" data-event_id="webtoon_2011" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">자세히 보기</span>';
		returnHtml += '</div>';
		returnHtml += '<span class="btn_close_today" data-target="eventWebtoonGiftPointtModal" data-url="" data-event_id="webtoon_2011" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
			
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//웹툰 포인트 이벤트
TEMPLETE.WEB_EVENT_MODAL.eventBlogPostingJoinModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventBlogPostingJoinModal');

	var returnHtml = '';
		returnHtml += '	<div class="modal-dialog blog_in_p" id="eventBlogPostingJoinModal">';
		returnHtml += '		<p>온플레이 소문내고 10,000 캐시 받아가세요!</p>';
		returnHtml += '		<a href="#close" rel="modal:close"><button type="button" class="m_close"></button></a>';
		returnHtml += '		<span class="btn_go_detail" data-target="eventWebtoonGiftPointtModal" data-url="/event/e_view/blog_in_2012?page=1" data-event_id="blog_in_2012" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">자세히 보기</span>';
		returnHtml += '	</div>';
		returnHtml += '<span class="btn_close_today" data-target="eventBlogPostingJoinModal" data-url="" data-event_id="blog_in_2012" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
			
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//닉네임설정 포인트 이벤트
TEMPLETE.WEB_EVENT_MODAL.eventJoinNicknamePointGiftModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventJoinNicknamePointGiftModal');

	var returnHtml = '';
		returnHtml += '	<div class="modal-dialog nick_p" id="eventJoinNicknamePointGiftModal">';
		returnHtml += '		<p>나만의 닉네임 설정하고 300포인트 받아가세요!</p>';
		returnHtml += '		<a href="#close" rel="modal:close"><button type="button" class="m_close"></button></a>';
		returnHtml += '		<span class="btn_go_detail" data-target="eventJoinNicknamePointGiftModal" data-url="/event/e_view/nick_2012?page=1" data-event_id="nick_2012" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">자세히 보기</span>';
		returnHtml += '	</div>';
		returnHtml += '<span class="btn_close_today" data-target="eventJoinNicknamePointGiftModal" data-url="" data-event_id="nick_2012" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
			
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

//2101 신년선물 팝업 
TEMPLETE.WEB_EVENT_MODAL.eventHappyNewYearEventModal = function(){
	console.log('TEMPLETE.WEB_EVENT_MODAL.eventHappyNewYearEventModal');
	var returnHtml = '';
		returnHtml += '<div class="modal-dialog gift_2101">';
		returnHtml += '	<p class="txt">새해에는 언제나 좋은일만 가득하시길 온플레이가 기원합니다.</p>';
		returnHtml += '	<p class="txt">새해 선물받고, 2021년도 온플레이와 함께하세요.</p>';
		returnHtml += '	<a href="#close" rel="modal:close"><button type="button" class="m_close"></button></a>';
		returnHtml += '	<span class="btn_get" data-target="eventHappyNewYearEventModal" onclick="PAGE_EVENT_VIEW.M_VIEW.getHappyNewYear2021DownloadCoupon(\'eventHappyNewYearEventModal\');">새해 선물 받기</span>';
		returnHtml += '</div>';
		returnHtml += '<span class="btn_close_today" data-target="eventHappyNewYearEventModal" data-url="" data-event_id="gift_2101" onclick="PAGE_HOME.onclickEventModalPopupGoDetailPage(this);">오늘 하루 팝업 닫기</span>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};