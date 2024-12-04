

MOBILE_TEMPLETE.MODAL = {};
/*
MOBILE_TEMPLETE.MODAL.commonEmptyFooterHtml = function(){
	var returnHtml = '';
		returnHtml += '<footer class="footer empty mobile-footer mobile-footer-common show" id="mobile-footer-modal-0">';
		returnHtml += '	<div style="min-height: 1px;">';
		returnHtml += '		&nbsp;';
		returnHtml += '	</div>';
		returnHtml += '</footer>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};
*/

MOBILE_TEMPLETE.MODAL.diskAlertModalHtml = function(alertMsg){
	if(isDefined(alertMsg) == false){
		return '';
	}
	var returnHtml = '';
		returnHtml += '<div class="modal-dialog">';
		returnHtml += '	<div class="modal-content">';
		returnHtml += '		<div class="m_content_wrap">';
		returnHtml += '			<div class="txt_area">';
		returnHtml += '				<p>'+alertMsg+'</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="btn_wrap">';
		returnHtml += '				<span class="btn check" onclick="MOBILE_COMMON_FUN.closeDiskAlert(this);">확인</span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, alertMsg = null;
   	}
};

MOBILE_TEMPLETE.MODAL.diskConfirmModalHtml = function(confirmMsg){
	if(isDefined(confirmMsg) == false){
		return '';
	}
	var returnHtml = '';
		returnHtml += '<div class="modal-dialog">';
		returnHtml += '	<div class="modal-content">';
		returnHtml += '		<div class="m_content_wrap">';
		returnHtml += '			<div class="txt_area">';
		returnHtml += '				<p>'+confirmMsg+'</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="btn_wrap">';
		returnHtml += '				<span class="btn confirm" onclick="MOBILE_COMMON_FUN.closeDiskAlert(this);">확인</span>';
		returnHtml += '				<a href="#" rel="modal:close"><span class="btn cancel" rel="modal:close">취소</span></a>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, confirmMsg = null;
   	}
};

//닉네임 설정하고 포인트 받자
MOBILE_TEMPLETE.MODAL.eventSetMemberCommunityNicknameHtml = function(data){

	var returnHtml = '';
		returnHtml += '	<div class="modal-dialog" style="width: 90%;margin: auto;">';
		returnHtml += '		<div class="modal-content nickname">';
		returnHtml += '			<div class="nickname_save_wrap">';
		//returnHtml += '				<span class="btn_close"></span>';
		returnHtml += '				<div class="top">';
		returnHtml += '					<img src="/_static/mobile/images/common/nickname_save.png" alt="">';
		returnHtml += '				</div>';
		returnHtml += '				<form name="modalSetMemberNicknameForm" id="modalSetMemberNicknameForm" method="post">';
		returnHtml += '					<input type="hidden" name="checkedNickname" id="modalSetMemberNicknameForm_check_nickname" value="">';
		returnHtml += '					<div class="nickname_input">';
		returnHtml += '						<div class="input_wrap">';
		returnHtml += '							<input type="text" class="input_style" name="member_nickname" id="modalSetMemberNicknameForm_cmember_nickname" maxlength="8" placeholder="닉네임을 입력해주세요.">';
		returnHtml += '							<span class="btn_check active" data-target="modalSetMemberNicknameForm_cmember_nickname" data-checker="modalSetMemberNicknameForm_check_nickname" onclick="MOBILE_COMMON.EVENT.checkMemberDuplicateNickname(this);">중복체크</span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="check_line">';
		returnHtml += '							<p class=""><input type="checkbox" class="c_box" name="agree_info" id="modalSetMemberNicknameForm_agree_info"><label for="" class="label_style">닉네임 개인정보 수집에 동의합니다.</label><span class="btn_view_terms">개인정보 정책보기 &gt;</span></p>';
		returnHtml += '						</div>';
		returnHtml += '						<span class="btn_submit" onclick="MOBILE_COMMON.EVENT.onclickSetMemberNicknameFormAction(\'modalSetMemberNicknameForm\');">등록하기</span>';
		returnHtml += '					</div>';
		returnHtml += '				</form>';
		returnHtml += '				<div class="nickname_notice">';
		returnHtml += '					<p class="tit">닉네임 등록 안내</p>';
		returnHtml += '					<ul>';
		returnHtml += '						<li>- 닉네임은 최초 1회만 등록이 가능합니다.</li>';
		returnHtml += '						<li>- 닉네임 등록 후 변경이 불가하오니 신중히 입력해주세요.</li>';
		returnHtml += '						<li>- 닉네임은 6자 이내로 설정 가능합니다.</li>';
		returnHtml += '					</ul>';
		returnHtml += '				</div>';
		//returnHtml += '				<div class="week_display_wrap">';
		//returnHtml += '					<input type="checkbox" class="c_box"><label for="" class="label_style">일주일간 보지 않기</label>';
		//returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};



//자녀 안심 서비스 설정
MOBILE_TEMPLETE.MODAL.memberSetChildBlockSetHtml = function(data){
	console.log('MOBILE_TEMPLETE.MODAL.memberSetChildBlockSetHtml', data);
	if(isDefined(data.status) == false){
		return '';
	}
	if(isDefined(data.target) == false){
		data.target = 1;
		if(data.status == 1){
			data.target = 2;
		}
	}

	var blockStatusMsg = data.status.toUpperCase();
	var modalTitle = '자녀 안심 서비스 설정하기';
	if(data.target == 2){
		modalTitle = '자녀 안심 서비스 해지하기';
	}

	var returnHtml = '';
		returnHtml += '<div class="modal-dialog">';
		returnHtml += '	<div class="modal-content child_protect">';
		returnHtml += '		<div class="child_protect_wrap">';
		returnHtml += '			<div class="tit_wrap">';
		returnHtml += '				<h1 class="tti">'+modalTitle+'</h1>';
		//returnHtml += '				<span class="btn_close"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="child_content">';
		returnHtml += '				<form name="mobileMemberSafeChildModalForm" id="mobileMemberSafeChildModalForm" onSubmit="MOBILE_COMMON_FUN.onclickActionSetMemberSafeChild(event, this);">';
		returnHtml += '					<input type="hidden" name="member_safe_child" value="'+data.target+'">';
		returnHtml += '					<p class="now_txt">현재 자녀 안심 서비스가 '+blockStatusMsg+' 상태입니다.</p>';
		if(data.target == 1){
			returnHtml += '					<div class="line">';
			returnHtml += '						<input type="password" name="safe_passwd" id="mobileMemberSafeChildModalForm_safe_passwd" autocomplete="new-password" placeholder="원하시는 비밀번호를 입력하세요. (4자 이상)" class="input_style">';
			returnHtml += '					</div>';
			returnHtml += '					<div class="input-err-msg safe_passwd">비밀번호를 4자이상 입력해 주세요.</div>';
			returnHtml += '					<div class="line">';
			returnHtml += '						<input type="password" name="safe_passwd2" id="mobileMemberSafeChildModalForm_safe_passwd2" autocomplete="new-password" placeholder="비밀번호 확인" class="input_style">';
			returnHtml += '					</div>';
			returnHtml += '					<div class="input-err-msg safe_passwd2">비밀 번호가 서로 일치하지 않습니다.</div>';
		}else{
			returnHtml += '					<div class="line">';
			returnHtml += '						<input type="password" name="safe_passwd" id="mobileMemberSafeChildModalForm_safe_passwd" autocomplete="new-password" placeholder="원하시는 비밀번호를 입력하세요. (4자 이상)" class="input_style">';
			returnHtml += '					</div>';
			returnHtml += '					<div class="input-err-msg safe_passwd">비밀번호를 4자이상 입력해 주세요.</div>';
			/*
			returnHtml += '					<div class="line">';
			returnHtml += '						<input type="text" class="input_style" placeholder="비밀번호 확인">';
			returnHtml += '					</div>';
			*/
		}
		/*
		returnHtml += '					<div class="line">';
		returnHtml += '						<input type="text" class="input_style" placeholder="비밀번호 입력(4자 이상)">';
		returnHtml += '					</div>';
		returnHtml += '					<div class="line">';
		returnHtml += '						<input type="text" class="input_style" placeholder="비밀번호 확인">';
		returnHtml += '					</div>';
		*/
		returnHtml += '					<button type="submit" class="btn btn_check btn_submit">확인</button>';
		returnHtml += '				</form>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="child_notice">';
		returnHtml += '				<p class="tit">자녀 안심 서비스란?</p>';
		returnHtml += '				<ul>';
		returnHtml += '					<li><span class="in_line">-</span> <span class="txt">성인 자료가 노출되지 않도록 설정하는 서비스입니다. 우리 아이들의 성인 자료 접근을 원천 자단 시킴으로 안심하고 사용하실 수 있습니다.</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '				<p class="tit">설정/해제 방법</p>';
		returnHtml += '				<ul>';
		returnHtml += '					<li><span class="in_line">-</span> <span class="txt">원하시는 비밀번호를 입력하신 후 확인을 눌러주세요</span></li>';
		returnHtml += '					<li><span class="in_line">-</span> <span class="txt">비밀번호는 자녀 안심 서비스를 해지하실 경우 필요합니다.</span></li>';
		returnHtml += '					<li><span class="in_line">-</span> <span class="txt">비밀번호를 잊어버리셨다면 고객센터로 문의해주세요.</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};


//아이디가 있는 경우
MOBILE_TEMPLETE.MODAL.findResultUserEmailId = function(userEmail, eKey){
	if(isDefined(userEmail) == false){
		userEmail = '';
	}
	if(isDefined(eKey) == false){
		eKey = '';
	}
	var returnHtml =  '';
        returnHtml +=  '<div class="f_top">';
    	returnHtml +=  '	<div class="inner">';
    	returnHtml +=  '		<h1 class="f_tit">비밀번호 찾기</h1>';
    	returnHtml +=  '		<span class="btn_back" data-target="login-modal" data-loc="top" onclick="GO_BACK(this);"></span>';
    	returnHtml +=  '	</div>';
    	returnHtml +=  '</div>';
    	returnHtml +=  '<div class="f_content">';
    	returnHtml +=  '	<div class="inner">';
        returnHtml +=	'	 <form method="post" id="mobileFindPASSResultForm">';
    	returnHtml +=  '		<div class="find_wrap" style="text-align: center;">';
    	returnHtml +=  '			<div class="guide_txt">';
    	returnHtml +=  '				<p class="txt" style="font-size: 18px;">'+userEmail+'<span class="s_txt">해당 정보와 일치하는 회원 정보가 1건 존재합니다.</span></p>';
    	returnHtml +=  '			</div>';
    	returnHtml +=  '			<span class="btn_join_set" data-email="'+userEmail+'" data-key="'+eKey+'" onclick = "MOBILE_COMMON_USER.onclickRequestMyPasswordCodeWithMail(this);" style="background-color: #86d66d;color: #f9f9f9;border: 1px solid #919b8e;">메일로 비밀번호 재설정하기</span>';
    	returnHtml +=  '			<span class="btn_join_set" onclick="GO_REAL_NAME(\'findPass\', \''+userEmail+'\');" style="background-color: #3d8eee;color: #f9f9f9;">실명 인증을 통한 비밀번호 재설정하기</span>';
    	returnHtml +=  '		</div>';
        returnHtml +=  '	 </form>';
    	returnHtml +=  '	</div>';
    	returnHtml +=  '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//아이디가 없는 경우
MOBILE_TEMPLETE.MODAL.emptyUserEmailId = function(){
	var returnHtml =  '';
        returnHtml +=  '<div class="f_top">';
    	returnHtml +=  '	<div class="inner">';
    	returnHtml +=  '		<h1 class="f_tit">비밀번호 찾기</h1>';
    	returnHtml +=  '		<span class="btn_back" data-target="login-modal" data-loc="top" onclick="GO_BACK(this);"></span>';
    	returnHtml +=  '	</div>';
    	returnHtml +=  '</div>';
    	returnHtml +=  '<div class="f_content">';
    	returnHtml +=  '	<div class="inner">';
        returnHtml +=	'	 <form method="post" id="mobileFindPASSResultForm">';
    	returnHtml +=  '		<div class="find_wrap" style="text-align: center;">';
    	returnHtml +=  '			<div class="guide_txt">';
    	returnHtml +=  '				<p class="txt">해당 정보와 일치하는 회원 정보가 존재하지 않습니다. <span class="s_txt">(실명 인증 혹은 결제 정보가 없는 경우, 비밀번호를 찾을 수 없습니다.)</span></p>';
    	returnHtml +=  '			</div>';
    	returnHtml +=  '			<span class="btn_join_set" onclick = "GO_JOIN(this);" style="width:90%;">무료 간편 회원가입</span>';
    	returnHtml +=  '		</div>';
        returnHtml +=  '	 </form>';
    	returnHtml +=  '	</div>';
    	returnHtml +=  '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//PDF viewer
MOBILE_TEMPLETE.MODAL.mobilePdfBook = function(targetBook, selectedEpisode, selectedPage, cFiles){
	
	if(isDefined(targetBook) == false){
		return false;
	}
	
	var returnHtml =  '';
		returnHtml +=  '<div class="comic_wrap book-pdf" id="mobile-comic-viewer-container">';
		returnHtml +=  '	<div class="f_top" id="comin-f-top">';
		returnHtml +=  '		<div class="inner">';
		returnHtml +=  '			<h1 class="f_tit comic">'+targetBook.name+'</h1>';
		returnHtml +=  '			<span class="btn_back" onclick="MOBILE_CARTOON.CLOSE_PAGE_MODAL();"></span>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		returnHtml +=  '	<div class="btn_full"  id="goViewFS">';
		returnHtml +=  '	</div>';
		returnHtml +=  '	<div class="comic_view">';
		returnHtml +=  '		<div class="comic_inner mobile-view-pdf-inner">';
		//returnHtml +=  '			<canvas id="mobile-view-pdf-canvas"></canvas>';
		//returnHtml +=  '			<img src="/_static/mobile/images/temp/temp_comic.jpg" alt="">';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		returnHtml +=  '	<div class="comic_control">';
		returnHtml +=  '		<div class="comic_menu">';
		returnHtml +=  '			<div class="c_m_btn_group type1">';
		returnHtml +=  '				<div class="c_m_btn divi">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>나눠보기</p>';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="c_m_btn auto active">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>자동넘김</p>';
		returnHtml +=  '					<div class="option_area">';
		returnHtml +=  '						<span class="arrow"></span>';
		returnHtml +=  '						<ul>';
		returnHtml +=  '							<li><span class="option">10초</span></li>';
		returnHtml +=  '							<li><span class="option">8초</span></li>';
		returnHtml +=  '							<li><span class="option">5초</span></li>';
		returnHtml +=  '							<li><span class="option">3초</span></li>';
		returnHtml +=  '							<li><span class="option">자동넘김 ON</span></li>'; 
		returnHtml +=  '						</ul>';
		returnHtml +=  '					</div>';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<!-- <div class="c_m_btn l_r_charge">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>좌우전환</p>';
		returnHtml +=  '				</div> -->';
		returnHtml +=  '			</div>';
		returnHtml +=  '			<div class="c_m_btn_group type2">';
		returnHtml +=  '				<div class="c_m_btn prev"><span class="ico"></span></div>';
		returnHtml +=  '				<div class="c_m_btn list active">';
		returnHtml +=  '					<div class="c_m_inner"><span class="ico"></span></div>';
		returnHtml +=  '					<div class="option_area">';
		returnHtml +=  '						<span class="arrow"></span>';
		returnHtml +=  '						<ul>';
		returnHtml +=  '							<li class="active"><span class="option"> 1 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">2 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">3 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">4 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">5 소년탐정 김전일</span></li>';
		returnHtml +=  '						</ul>';
		returnHtml +=  '					</div>';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="c_m_btn next"><span class="ico"></span></div>';
		returnHtml +=  '			</div>';
		returnHtml +=  '		</div>';
		returnHtml +=  '		<div class="comic_bar_wrap">';
		returnHtml +=  '			<div class="bar_area">';
		returnHtml +=  '				<span class="bar"></span>';
		returnHtml +=  '				<span class="dot"></span>';
		returnHtml +=  '			</div>';
		returnHtml +=  '			<div class="page_view">';
		returnHtml +=  '				<span>153</span>/<span>229</span>';
		returnHtml +=  '			</div>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		
		returnHtml +=  '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//모바일 만화보기 -swpi
//cartoon viewer
MOBILE_TEMPLETE.MODAL.mobileCartoonBook = function(targetBook, selectedEpisode, selectedPage, cFiles, cartoonBookCoentsSwipHtml){
	console.log('MOBILE_TEMPLETE.BANNER.getToptoonSlickBanner');	
	var returnHtml = '';
		returnHtml += '<div class="comic_wrap book-cartoon" id="mobile-comic-viewer-container">';
		returnHtml +=  '	<div class="comic_view">';
		returnHtml +=  '		<div class="comic_inner mobile-view-cartoon-inner">';
		//returnHtml += 				cartoonBookCoentsSwipHtml;
		//returnHtml +=  '			<canvas id="mobile-view-cartoon-canvas"></canvas>';
		//returnHtml +=  '			<img src="/_static/mobile/images/temp/temp_comic.jpg" alt="">';
						
						returnHtml += '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">';
						returnHtml += '	<div class="pswp__bg"></div>';
						returnHtml += '	<div class="pswp__scroll-wrap">';
							
						returnHtml += '		<div class="pswp__container">';
						returnHtml += '			<div class="pswp__item"></div>';
						returnHtml += '			<div class="pswp__item"></div>';
						returnHtml += '			<div class="pswp__item"></div>';
						returnHtml += '		</div>';
								
						returnHtml += '		<div class="pswp__ui pswp__ui--hidden">';
						//top title
						/*
						returnHtml +=  '		<div class="f_top" id="comin-f-top">';
						returnHtml +=  '			<div class="inner">';
						returnHtml +=  '				<h1 class="f_tit comic">'+targetBook.name+'</h1>';
						returnHtml +=  '				<span class="btn_back" onclick="MOBILE_CARTOON.CLOSE_PAGE_MODAL();"></span>';
						returnHtml +=  '			</div>';
						returnHtml +=  '		</div>';
						*/
						
						returnHtml += '			<div class="pswp__top-bar">';
						returnHtml += '				<div class="pswp__counter"></div>';
						//returnHtml += '				<button class="pswp__button pswp__button--share" title="Share"></button>';
						returnHtml += '				<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>';
						returnHtml += '				<button class="pswp__button pswp__button--share" title="Share"></button>';
						returnHtml += '				<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>';
						returnHtml += '				<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>';
						returnHtml += '				<div class="pswp__preloader">';
						returnHtml += '					<div class="pswp__preloader__icn">';
						returnHtml += '						<div class="pswp__preloader__cut">';
						returnHtml += '							<div class="pswp__preloader__donut"></div>';
						returnHtml += '						</div>';
						returnHtml += '					</div>';
						returnHtml += '				</div>';
						
						returnHtml +=  '			<div class="f_top" id="comin-f-top">';
						returnHtml +=  '				<div class="inner">';
						returnHtml +=  '					<h1 class="f_tit comic">'+targetBook.name+'</h1>';
						returnHtml +=  '					<span class="btn_back btn-backbook-close" onclick="MOBILE_CARTOON.CLOSE_PAGE_MODAL();"></span>';
						//returnHtml +=  '					<span class="btn_back btn-backbook-close"></span>';
						returnHtml +=  '				</div>';
						returnHtml +=  '			</div>';
						returnHtml +=  '			<div class="btn_full" id="goViewFS"></div>';
						
						returnHtml += '			</div>';
									
						returnHtml += '			<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">';
						returnHtml += '				<div class="pswp__share-tooltip"></div> ';
						returnHtml += '			</div>';
						returnHtml += '			<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>';
						returnHtml += '			<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>';
						returnHtml += '			<div class="pswp__caption">';
						returnHtml += '				<div class="pswp__caption__center"></div>';
						returnHtml += '			</div>';
						returnHtml += '		</div>';
						returnHtml += '	</div>';
						returnHtml += '</div>';
						
						//custum
						returnHtml +=  '	<div class="comic_control">';
						returnHtml +=  '		<div class="comic_menu">';
						returnHtml +=  '			<div class="c_m_btn_group type1">';
						returnHtml +=  '				<div class="c_m_btn divi">';
						returnHtml +=  '					<p class="txt"><span class="ico"></span>나눠보기</p>';
						returnHtml +=  '				</div>';
						returnHtml +=  '				<div class="c_m_btn auto">';
						returnHtml +=  '					<p class="txt"><span class="ico"></span>자동넘김</p>';
						returnHtml +=  '					<div class="option_area">';
						returnHtml +=  '						<span class="arrow"></span>';
						returnHtml +=  '						<ul>';
						returnHtml +=  '							<li><span class="option">10초</span></li>';
						returnHtml +=  '							<li><span class="option">8초</span></li>';
						returnHtml +=  '							<li><span class="option">5초</span></li>';
						returnHtml +=  '							<li><span class="option">3초</span></li>';
						returnHtml +=  '							<li><span class="option">자동넘김 ON</span></li>'; 
						returnHtml +=  '						</ul>';
						returnHtml +=  '					</div>';
						returnHtml +=  '				</div>';
						returnHtml +=  '				<div class="c_m_btn l_r_charge">';
						returnHtml +=  '					<p class="txt"><span class="ico"></span>좌우전환</p>';
						returnHtml +=  '				</div>';
						returnHtml +=  '			</div>';
						returnHtml +=  '			<div class="c_m_btn_group type2">';
						returnHtml +=  '				<div class="c_m_btn prev"><span class="ico"></span></div>';
						returnHtml +=  '				<div class="c_m_btn list">';
						returnHtml +=  '					<div class="c_m_inner"><span class="ico"></span></div>';
						returnHtml +=  '					<div class="option_area">';
						returnHtml +=  '						<span class="arrow"></span>';
						returnHtml +=  '						<ul>';
						returnHtml +=  '							<li class="active"><span class="option"> 1 소년탐정 김전일</span></li>';
						returnHtml +=  '							<li><span class="option">2 소년탐정 김전일</span></li>';
						returnHtml +=  '							<li><span class="option">3 소년탐정 김전일</span></li>';
						returnHtml +=  '							<li><span class="option">4 소년탐정 김전일</span></li>';
						returnHtml +=  '							<li><span class="option">5 소년탐정 김전일</span></li>';
						returnHtml +=  '						</ul>';
						returnHtml +=  '					</div>';
						returnHtml +=  '				</div>';
						returnHtml +=  '				<div class="c_m_btn next"><span class="ico"></span></div>';
						returnHtml +=  '			</div>';
						returnHtml +=  '		</div>';
						returnHtml +=  '		<div class="comic_bar_wrap" id="book_cartoon_comic_bar_wrap">';
						returnHtml +=  '			<div class="bar_area">';
						returnHtml +=  '				<span class="bar"></span>';
						returnHtml +=  '				<span class="dot"></span>';
						returnHtml +=  '			</div>';
						returnHtml +=  '			<div class="page_view">';
						returnHtml +=  '				<span class="cur">153</span> / <span class="tot">229</span>';
						//returnHtml += '					<div class="pswp__counter"></div>';
						returnHtml +=  '			</div>';
						returnHtml +=  '		</div>';
						returnHtml +=  '	</div>';
						//-custem
						
		returnHtml +=  '		</div>';
		
		
		
		returnHtml +=  '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};



//cartoon viewer
MOBILE_TEMPLETE.MODAL.mobileCartoonBookBack = function(targetBook, selectedEpisode, selectedPage, cFiles, cartoonBookCoentsSwipHtml){
	if(isDefined(targetBook) == false){
		return false;
	}
	
	var returnHtml =  '';
		returnHtml +=  '<div class="comic_wrap book-cartoon" id="mobile-comic-viewer-container">';
		/*
		returnHtml +=  '	<div class="f_top" id="comin-f-top">';
		returnHtml +=  '		<div class="inner">';
		returnHtml +=  '			<h1 class="f_tit comic">'+targetBook.name+'</h1>';
		returnHtml +=  '			<span class="btn_back" onclick="MOBILE_CARTOON.CLOSE_PAGE_MODAL();"></span>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		returnHtml +=  '	<div class="btn_full"  id="goViewFS">';
		returnHtml +=  '	</div>';
		*/
		returnHtml +=  '	<div class="comic_view">';
		returnHtml +=  '		<div class="comic_inner mobile-view-cartoon-inner">';
		returnHtml += 				cartoonBookCoentsSwipHtml;
		//returnHtml +=  '			<canvas id="mobile-view-cartoon-canvas"></canvas>';
		//returnHtml +=  '			<img src="/_static/mobile/images/temp/temp_comic.jpg" alt="">';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		/*
		returnHtml +=  '	<div class="comic_control">';
		returnHtml +=  '		<div class="comic_menu">';
		returnHtml +=  '			<div class="c_m_btn_group type1">';
		returnHtml +=  '				<div class="c_m_btn divi">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>나눠보기</p>';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="c_m_btn auto active">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>자동넘김</p>';
		returnHtml +=  '					<div class="option_area">';
		returnHtml +=  '						<span class="arrow"></span>';
		returnHtml +=  '						<ul>';
		returnHtml +=  '							<li><span class="option">10초</span></li>';
		returnHtml +=  '							<li><span class="option">8초</span></li>';
		returnHtml +=  '							<li><span class="option">5초</span></li>';
		returnHtml +=  '							<li><span class="option">3초</span></li>';
		returnHtml +=  '							<li><span class="option">자동넘김 ON</span></li>'; 
		returnHtml +=  '						</ul>';
		returnHtml +=  '					</div>';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<!-- <div class="c_m_btn l_r_charge">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>좌우전환</p>';
		returnHtml +=  '				</div> -->';
		returnHtml +=  '			</div>';
		returnHtml +=  '			<div class="c_m_btn_group type2">';
		returnHtml +=  '				<div class="c_m_btn prev"><span class="ico"></span></div>';
		returnHtml +=  '				<div class="c_m_btn list active">';
		returnHtml +=  '					<div class="c_m_inner"><span class="ico"></span></div>';
		returnHtml +=  '					<div class="option_area">';
		returnHtml +=  '						<span class="arrow"></span>';
		returnHtml +=  '						<ul>';
		returnHtml +=  '							<li class="active"><span class="option"> 1 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">2 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">3 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">4 소년탐정 김전일</span></li>';
		returnHtml +=  '							<li><span class="option">5 소년탐정 김전일</span></li>';
		returnHtml +=  '						</ul>';
		returnHtml +=  '					</div>';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="c_m_btn next"><span class="ico"></span></div>';
		returnHtml +=  '			</div>';
		returnHtml +=  '		</div>';
		returnHtml +=  '		<div class="comic_bar_wrap">';
		returnHtml +=  '			<div class="bar_area">';
		returnHtml +=  '				<span class="bar"></span>';
		returnHtml +=  '				<span class="dot"></span>';
		returnHtml +=  '			</div>';
		returnHtml +=  '			<div class="page_view">';
		returnHtml +=  '				<span>153</span>/<span>229</span>';
		returnHtml +=  '			</div>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		*/
		returnHtml +=  '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};
