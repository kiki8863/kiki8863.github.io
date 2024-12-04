TEMPLETE = {};
TEMPLETE.COMMON = {};
TEMPLETE.WEB_PAGE = {};


//판매자 이름 클릭시
TEMPLETE.COMMON.sellerShortInfoHtml = function(data){
	console.log('TEMPLETE.COMMON.sellerShortInfoHtml');
	console.log(data);

	var sellerNickname = '';
	if(isDefined(data.name) == true){
		sellerNickname = data.name;
	}
	var sellerIdx = '';
	var channelLink = '';

	var receiverIdx = '';
	if(isDefined(data.idx)){
		receiverIdx = data.idx;
	}

	if(isDefined(data.seller) == true){
		sellerIdx = data.seller;
		channelLink = '/channel/seller/'+sellerIdx;
	}else if(isDefined(sellerNickname) == true){
		channelLink = '/channel/seller/'+encodeURIComponent(sellerNickname);
	}
	var returnHtml = '';
		returnHtml += '<span class="bg"></span>';
		returnHtml += '<p class="m_name"><span class="name">'+sellerNickname+'</span></p>';
		returnHtml += '<div class="c_list">';
		returnHtml += '	<ul>';
		returnHtml += '		<li class="hand" data-idx="'+sellerIdx+'" data-nick="'+sellerNickname+'" onclick="WEB_COMMON_SELLER.openSellerInfoModal(this);"><span class="c_ico type4"></span><span>판매자 정보</span></li>';
		returnHtml += '		<li><a href="'+channelLink+'"><span class="c_ico type2"></span><span>채널로 이동</span></a></li>';
		returnHtml += '		<li class="hand" data-seller="'+sellerIdx+'" data-kind="" data-reply="0" data-sender="" data-sender_nick="" data-receiver="'+receiverIdx+'" data-receiver_nick="'+sellerNickname+'" data-idx="" onclick="WEB_COMMON_GO.openBbsMemoForm(this);"><span class="c_ico type1"></span><span>쪽지 보내기</span></li>';
		returnHtml += '		<li class="hand" data-idx="'+sellerIdx+'" onclick="WEB_COMMON_SELLER.onclickActionSubscribeSellerChannel(this);"><span class="c_ico type3"></span><span>채널 구독</span></li>';
		returnHtml += '	</ul>';
		returnHtml += '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data, sellerNickname, sellerIdx, receiverIdx, channelLink  = null;
   	}
};


//테마리스트
TEMPLETE.WEB_PAGE.channelThemeListHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE.channelThemeListHtml');
	console.log(data);

	var themeContentsList = [];
	if(isDefined(data.tlist)){
		themeContentsList = data.tlist;
	}
	var returnHtml = '';
		returnHtml += '<div class="movie_tab_content keyword search-channel-show active channel-cate-90002" id="search-channel-theme-wrap-'+data.channel_theme_idx+'">';
		returnHtml += '	<p class="k_tit"><span>'+data.theme_title+'</span></p>';
		returnHtml += '	<div class="tab_view">';
		returnHtml += '		<div class="theme_con">';
		for(var ti = 0; ti < themeContentsList.length; ti++){
				returnHtml += '<a href="'+themeContentsList[ti].show_theme_link+'">';
				returnHtml += '	<div class="theme_list">';
				returnHtml += '		<span class="m_img"><img src="'+themeContentsList[ti].empty_thumb+'" class="disk-image-lazy" data-src="'+themeContentsList[ti].show_theme_content_thumbnail+'" data-lazy="'+themeContentsList[ti].show_theme_content_thumbnail+'" alt="'+themeContentsList[ti].show_title+'" title="'+themeContentsList[ti].show_title+'"><span class="img_b"></span></span>';
				returnHtml += '		<p class="m_tit">'+themeContentsList[ti].show_title+'</span>';
				returnHtml += '	</div>';
				returnHtml += '</a>';
		}
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data, themeContentsList  = null;
   	}
};


//이벤트 리스트
TEMPLETE.WEB_PAGE.eventListHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE.eventListHtml');
	console.log(data);
	var imgEndClass = 's-'+data.event_status;
	if(data.is_debug == true){
		imgEndClass = 's-1';
	}
	var returnHtml = '';
		returnHtml += '<li class="disk-e-list '+imgEndClass+'" data-status="'+data.event_status+'" data-href="'+data.show_event_link_url+'" data-is_adult="'+data.event_is_adult+'" data-is_copy="'+data.event_is_copy+'" data-is_vip="'+data.event_is_vip+'">';
		returnHtml += '	<div class="e_img '+imgEndClass+'">';
		returnHtml += '		<img class="disk-image-lazy" src="'+data.empty_thumbnail+'" data-src="'+data.show_event_web_thumbnail+'"  alt="'+data.event_title+'">';
		returnHtml += '		<span class="e_end"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="e_info">';
		returnHtml += '		<p class="e_tit">'+data.event_title+'</p>';
		returnHtml += '		<p class="e_txt">'+data.show_event_sub_title+'</p>';
		returnHtml += '		<p class="e_period">기간 : <span>'+data.show_event_start_time+' ~ '+data.show_event_end_time+'</span></p>';
		returnHtml += '	</div>';
		returnHtml += '</li>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, imgEndClass, data = null;
   	}
};

//판매자 콘텐츠 리스트
TEMPLETE.WEB_PAGE.contentsViewSimpleSellerContents = function(data, odr){
	console.log('TEMPLETE.WEB_PAGE.contentsViewSimpleSellerContents', odr);
	console.log(data);
	var show_category_name = data.show_category_name;
	var	show_contents_size = number_to_human_size(data.bbs_size);
	//hd icon
	var	is_hd_ico = '';
	if(data.flag_hd == 1){ is_hd_ico = 'hd';}
	else if(data.flag_hd == 2){ is_hd_ico = 'fhd';}
	var is_bg ='';
	if((odr % 2) == 1){
		is_bg = 'bg';
	}

	var returnHtml = '';
		returnHtml += '<li class="'+is_bg+'" onclick="WEB_COMMON_GO.openContents(null,\'seller\', this);" data-link="seller" data-on_view="1" data-idx="'+data.bbs_idx+'" rank-cate1="'+data.cate1+'" data-is_copy="'+data.flag_copy+'" data-is_adult="'+data.flag_adult+'">';
		returnHtml += '	<div class="l1"><span class="ico '+is_hd_ico+'"></span><span  class="tit">'+data.bbs_title+' </span></div>';
		returnHtml += '	<div class="l2"><span>'+show_category_name+'</span></div>';
		returnHtml += '	<div class="l3"><span>'+show_contents_size+'</span></div>';
		returnHtml += '</li>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, show_category_name,show_contents_size,is_hd_ico,is_bg,data = null;
   	}
};

//판매자 검색 결과 - 상단 카테고리
TEMPLETE.WEB_PAGE.caegoryListSellerSearchResult = function(data, selectedCategory){
	console.log('TEMPLETE.WEB_PAGE.caegoryListSellerSearchResult', selectedCategory);
	console.log(data);
	//var show_category_name = data.show_category_name;
	//var	show_contents_size = number_to_human_size(data.bbs_size);

	var isActive = '';
	if(selectedCategory == data.key){
		isActive = 'active';
	}

	var returnHtml = '';
		returnHtml += '<span class="cate seller-owner-category-list-item cate1-'+data.key+' '+isActive+' " data-action="search" data-cate1="'+data.key+'" data-cnt="'+data.cnt+'" data-name="'+data.name+'"><span class="b_txt">'+data.name+'</span><span class="s_txt">('+data.cnt+')</span></span>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, selectedCategory,isActive, data = null;
   	}
};



//메모 리스트
TEMPLETE.WEB_PAGE.getMyMemoListHtml = function(data, memoType){
	console.log('TEMPLETE.WEB_PAGE.getMyMemoListHtml');

	var showNickname = '';
	if(memoType == 'receive' || memoType == 'box'){
		showNickname = data.sender_nick;
	}else if(memoType == 'send'){
		showNickname = data.receiver_nick;
	}
	var isReaded = 0;
	var is_read = 'not_read';
	if(data.receiver_state != 1){
		isReaded = 1;
		is_read = 'read';
	}
										
	var returnHtml = '';
		returnHtml += '	<li class="m_click_area mypage-bbs-memo-item '+is_read+' '+data.switch_bg+'" data-type="'+memoType+'" data-idx="'+data.bbs_memo_idx+'" data-readed="'+isReaded+'"  data-group="community" data-id="community_memo" data-action="read" id="mypage-bbs-memo-item-'+data.bbs_memo_idx+'">';
		returnHtml += '		<div class="l1"><input type="checkbox" class="input_c my_momo_check" name="my_momo_check" value="'+data.bbs_memo_idx+'" data-idx="'+data.bbs_memo_idx+'"></div>';
		returnHtml += '		<div class="l4"><span>'+showNickname+'</span></div>';
		returnHtml += '		<div class="l2">';
		if(data.show_kind != ''){
			returnHtml += '			<span class="kind">['+data.show_kind+']</span> ';
		}
		returnHtml += '			<span class="tit">'+data.show_title+'</span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="l3"><span>'+data.show_date+'</span><span class="arrow" style=""></span></div>';
		returnHtml += '	</li>';
		returnHtml += '	<li class="m_view_area">';
		returnHtml += '		<div class="memo_content">';
		returnHtml += '			<p>'+data.show_contents+'</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="btn_area">';
		if(memoType == 'send'){
			//returnHtml += '			<span class="m_btn memo">답장하기</span>';
		}else{
			returnHtml += '			<span class="m_btn memo" data-kind="답장" data-reply="1" data-sender="'+data.receiver_idx+'" data-sender_nick="'+data.receiver_nick+'" data-receiver="'+data.sender_idx+'" data-receiver_nick="'+data.sender_nick+'" data-idx="'+data.bbs_memo_idx+'" onclick="WEB_COMMON_GO.openBbsMemoForm(this);">답장하기</span>';
		}

		//returnHtml += '			<!-- <span class="m_btn delete">삭제하기</span>-->';
		returnHtml += '		</div>';
		returnHtml += '	</li>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data, memoType, showNickname, isReaded = null;
   	}
};


//공지사항 리스트 -cs, seller
TEMPLETE.WEB_PAGE.getCsNoticeListHtml = function(data, order){
	console.log('TEMPLETE.WEB_PAGE.getCsNoticeListHtml');
	//console.log(data);
	var showBoardTitle = '';
	if(isDefined(data.bbs_board_category)){
		showBoardTitle = '['+data.bbs_board_category+'] ';
	}
	showBoardTitle +=  data.bbs_board_title;

	var showRegDate = '';
	if(isDefined(data.bbs_board_reg_date)){
		var tmpD = data.bbs_board_reg_date.split(' ');
		if(tmpD.length > 0){
			showRegDate = 	tmpD[0];
		}
	}
	var isBg = '';
	if(order % 2 == 1){
		isBg = 'bg';
	}
	var eleDataId = 'cs-notice-board-contets-'+data.bbs_board_idx;

	var returnHtml = '';
		returnHtml += '		<li class="'+isBg+'">';
		returnHtml += '			<div class="l1"><span>'+data.bbs_board_idx+'</span></div>';
		returnHtml += '			<div class="l2"><span class="tit cs-notice-list-tit" data-target="cs-notice-view-contents" data-saved="'+eleDataId+'" data-type="'+data.bbs_board_type+'" data-idx="'+data.bbs_board_idx+'">'+showBoardTitle+'</span></div>';
		returnHtml += '			<div class="l3"><span>'+showRegDate+'</span></div>';
		returnHtml += '			<div class="notice-data hide" id="'+eleDataId+'"></div>';
		returnHtml += '		</li>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data, order, showBoardTitle, showRegDate, isBg, eleDataId = null;
   	}
};


//공지사항 내용 - cs
TEMPLETE.WEB_PAGE.getCsNoticeViewHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE.getCsNoticeViewHtml', data);


	var returnHtml = '';
		returnHtml += '<div class="top">';
		returnHtml += '	<div class="l_area">';
		returnHtml += '		<span class="num">'+data.idx+'</span>';
		returnHtml += '		<span class="cate">['+data.show_board_category+']</span>';
		returnHtml += '		<span class="tit">'+data.show_board_title+' </span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="r_area">';
		returnHtml += '		<span class="name">'+data.show_board_writer+'</span>';
		returnHtml += '		<span class="date">'+data.show_reg_date+'</span>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="lv_content">';
		returnHtml += '	<p>'+data.show_board_contents+'</p>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};


//FAQ 리스트 -cs
TEMPLETE.WEB_PAGE.getCsFaqListHtml = function(data, order, isActive){
	console.log('TEMPLETE.WEB_PAGE.getCsFaqListHtml');
	var showBoardCategoryName = '';
	if(isDefined(data.bbs_board_category)){
		showBoardCategoryName = data.bbs_board_category;
	}
	var showBoardTitle =  data.bbs_board_title;
	var showBoardContents = nl2br(data.bbs_board_contents);

	var isBg = '';
	if(order % 2 == 1){
		isBg = 'bg';
	}
	if(isActive == true){
		isBg += ' active';
	}
	var eleDataId = 'cs-faq-board-contets-'+data.bbs_board_idx;

	var returnHtml = '';
		returnHtml += '<li class="list_tit cs-faq-list-item hand '+isBg+'" id="'+eleDataId+'">';
		returnHtml += '	<div class="l1"><span>'+showBoardCategoryName+'</span></div>';
		returnHtml += '	<div class="l2"><span class="tit">'+showBoardTitle+'</span><span class="arrow"></span></div>';
		returnHtml += '</li>';
		returnHtml += '<li class="list_content">'+showBoardContents+'</li>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data, order,isActive, showBoardTitle, showBoardCategoryName,showBoardContents, isBg, eleDataId = null;
   	}
};


//QA 리스트 -QA
TEMPLETE.WEB_PAGE.getCsQaListHtml = function(data, order){
	console.log('TEMPLETE.WEB_PAGE.getCsQaListHtml');
	var is_num_active = '';
	if(data.reply_cnt > 0){
		is_num_active = 'active';
	}
	var returnHtml = '';
		returnHtml += '<li class="'+data.is_bg+'" id="'+data.ele_data_id+'">';
		returnHtml += '	<div class="l1"><span>['+data.show_board_category+']</span></div>';
		returnHtml += '	<div class="l2">';
		returnHtml += '		<span class="tit cs-qa-list-tit" data-type="one" data-idx="'+data.bbs_board_idx+'" data-info="'+data.ele_data_id+'" data-target="one-to-one-view-wrap">'+data.show_board_title+'</span>';
		returnHtml += '		<span class="reply_num '+is_num_active+'">(<span class="reply_num_txt">'+data.reply_cnt+'</span>)</span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="l3"><span class="'+data.btn_cla+'">'+data.show_answer_state_msg+'</span></div>';
		returnHtml += '	<div class="l4"><span>'+data.show_reg_date+'</span></div>';
		returnHtml += '</li>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data, order, is_num_active = null;
   	}
};


//요청게시판 리스트
TEMPLETE.WEB_PAGE.getCsReqestBoardListHtml = function(data, order){
	console.log('TEMPLETE.WEB_PAGE.getCsReqestBoardListHtml');

	var $ele_class_name = 'req-board-list-ele-all';
	if(data.is_my == 1){
		$ele_class_name = 'req-board-list-ele-my';
	}

	var returnHtml = '';
		returnHtml += '<li class="req-board-list-item '+data.is_bg+' '+$ele_class_name+'" id="'+data.show_ele_id+'">';
		returnHtml += '	<div class="l1"><span>'+data.bbs_board_idx+'</span></div>';
		returnHtml += '	<div class="l2"><span>'+data.show_board_cate_name+'</span></div>';
		returnHtml += '	<div class="l3"><span class="tit board-req-list-tit" data-target="board-req-view-contents" data-saved="'+data.show_data_ele_id+'" data-type="req" data-idx="'+data.bbs_board_idx+'">'+data.show_board_title+'</span><!--<span class="btn_go"></span>--></div>';
		returnHtml += '	<div class="l4"><span class="r_ico '+data.show_is_ok_icon+'">'+data.show_is_ok_txe+'</span></div>';
		//returnHtml += '	<div class="l5"><span>'+data.show_reg_date+'</span></div>';
		returnHtml += '	<div class="l6 my-request">';
		returnHtml += '		<span class="r_btn edit" onclick="PAGE_REQUEST_LIST.onclickEditRequest('+data.bbs_board_idx+');"></span><span class="bar"></span><span class="r_btn del" onclick="PAGE_REQUEST_LIST.onclickDelRequest('+data.bbs_board_idx+');"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="notice-data hide" id="'+data.show_data_ele_id+'"></div>';
		returnHtml += '</li>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data, order, $ele_class_name = null;
   	}
};


//요청 사항 내용 - req
TEMPLETE.WEB_PAGE.getCsBoardReqViewHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE.getCsBoardReqViewHtml', data);



	var returnHtml = '';
		returnHtml += '<div class="top">';
		returnHtml += '	<div class="l_area">';
		returnHtml += '		<span class="num">'+data.bbs_board_idx+'</span>';
		returnHtml += '		<span class="cate">['+data.show_board_cate_name+']</span>';
		returnHtml += '		<span class="tit">'+data.show_board_title+' </span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="r_area">';
		returnHtml += '		';
		returnHtml += '		<span class="name"><span class="m_level type'+data.show_member_level+'"></span>'+data.show_board_writer+'</span>';
		returnHtml += '		<span class="date">'+data.show_reg_date+'</span>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="lv_content">';
		returnHtml += '	<p>'+data.show_board_cotnets_detail+'</p>';
		returnHtml += '</div>';
		if(data.has_file == 1){
			returnHtml += '<div class="btm">';
			returnHtml += '	<p class="file_name">업로드된 자료 : <span>'+data.show_bbs_title+'</span></p>';
			returnHtml += '	<span class="btn_r_data_go" onclick="WEB_COMMON_GO.openContents(null,\'req\', this);" data-link="req" data-req="'+data.bbs_board_idx+'" data-idx="'+data.bbs_id+'" rank-cate1="'+data.show_bbs_cate+'" data-is_copy="'+data.copy+'" data-is_adult="'+data.adult+'">요청 자료 바로보기</span>';
			returnHtml += '</div>';
		}else{
			returnHtml += '<div class="btm up-file">';
			returnHtml += '	<span class="btn_fileup" data-url="/upload/upload_form" data-cate="'+data.show_bbs_category+'" data-req="'+data.bbs_board_idx+'" onclick="WEB_COMMON_GO.openFileUploadForm(this);"><span class="ico"></span><span>요청 자료 업로드</span></span>';
			returnHtml += '</div>';
		}
		if(data.is_owner == 1){
			returnHtml += '<div class="btn_wrap">';
			if(data.has_file != 1){
				returnHtml += '	<span class="v_btn" onclick="PAGE_REQUEST_LIST.onclickEditRequest('+data.bbs_board_idx+', 1);">수정</span>';
			}
			returnHtml += '	<span class="v_btn" onclick="PAGE_REQUEST_LIST.onclickDelRequest('+data.bbs_board_idx+', 1);">삭제</span>';
			returnHtml += '</div>';
		}

	try{
	    return returnHtml;
    }finally {
			returnHtml, data = null;
   	}
};


//회원 탑 공지 리스트 - news, notice

TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml = function(noticeType, data){
	//console.log('TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml', noticeType);
	//console.log(data);
	var showIcon = 'n_alim';
	if(data.show_type == 'memo'){
		showIcon = 'memo';
	}
	var returnHtml = '';
	
		returnHtml += '<li class="alarm-item '+showIcon+'" data-type="'+data.show_type+'" data-idx="'+data.show_idx+'" onclick="WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail(this);">';
		returnHtml += '	<span class="i_ico"></span>';
		returnHtml += '	<div class="txt_area">';
		returnHtml += '		<p class="a_txt">'+data.show_title+'</p>';
		returnHtml += '		<span class="date">'+data.show_date+'</span>';
		if(data.show_type == 'memo'){
			returnHtml += '	<span class="date">'+data.show_writer+'</span>';
		}
		returnHtml += '	</div>';
		returnHtml += '</li>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, showIcon, noticeType, data = null;
   	}
}



//프리미엄 등록 현황
TEMPLETE.WEB_PAGE.getSellerMyPremiumListHtml = function(data){
	console.log('TEMPLETE.WEB_PAGE.getSellerMyPremiumListHtml', data);


	var $p_ele_name = "my-seller-premium-list-"+data.show_premium_type+"-"+data.show_idx;
	var isEnd = 'update';
	var showBtnTxt = "기간연장";
	var show_premium_type_name = "상위등록";
	if(data.show_premium_type == 'search'){
		show_premium_type_name = "키워드광고";
	}
	var returnHtml = '';
		returnHtml += '<div class="l1"><span class="tit" onclick="WEB_COMMON_GO.openContents(null,\'seller_edit\', this);" data-link="seller_edit" data-on_view="0" data-idx="'+data.show_idx+'" data-cate1="'+data.cate1+'" data-is_copy="'+data.is_copy+'" data-is_adult="'+data.is_adult+'">'+data.show_title+'</span></div>';
		returnHtml += '<div class="l2"><span>'+show_premium_type_name+'</span></div>';
		returnHtml += '<div class="l4"><span>'+data.show_expire_date+'</span></div>';
		returnHtml += '<div class="l5"><span>'+data.show_reg_date+'</span></div>';
		returnHtml += '<div class="l6 '+isEnd+'"><span class="c_preiod" data-type="'+data.show_premium_type+'" data-action="log" data-p_type="'+isEnd+'" data-target="'+$p_ele_name+'" data-adult="'+data.is_adult+'" data-cate1="'+data.cate1+'" data-idx="'+data.show_idx+'" data-state="'+data.state+'" onclick="PAGE_SELLER.premium.openSellerPremiumRegistModalForm(this);">'+showBtnTxt+'</span></div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, data, $p_ele_name, isEnd, showBtnTxt, show_premium_type_name = null;
   	}
}


//회원 탑 공지 리스트 - news, notice -- old
/*
TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml = function(noticeType, noticeList){
	console.log('TEMPLETE.WEB_PAGE.getMemberTopNoticeListHtml', noticeType);
	console.log(noticeList);
	//noticeList = [];

	var noticeTit = '새소식';
	var emptyMsg = "새로운 소식이 없습니다.";
	if(noticeType == 'memo'){
		noticeTit = '받은 쪽지';
		emptyMsg = "새로운 쪽지가 없습니다.";
	}
	var nData;
	var returnHtml = '';
		returnHtml += '		<span class="bg_arrow"></span>';
		returnHtml += '		<div class="top">';
		returnHtml += '			<p class="tit">'+noticeTit+'</p>';
		//returnHtml += '			<span class="btn_all" data-type="'+noticeType+'" data-idx="" onclick="WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail(this);">전체보기 &gt;</span>';
		returnHtml += '			<span class="close" onclick="WEB_COMMON_MEMBER.onclickOpenMemberNoticeClose(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="news_list_wrap">';
		if(noticeList.length > 0){
			for(var nc in noticeList){
				nData = noticeList[nc];
				returnHtml += '			<div class="n_section">';
				returnHtml += '				<p class="n_content" data-type="'+nData.show_type+'" data-idx="'+nData.show_idx+'" onclick="WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail(this);">'+nData.show_title+'</p>';
				if(nData.show_type == 'memo'){
					returnHtml += '				<span class="n_name">'+nData.show_writer+'</span>';
					returnHtml += '				<span class="n_time">'+nData.show_date+'</span>';
				}else{
					returnHtml += '				<span class="time">'+nData.show_date+'</span>';
				}
				returnHtml += '			</div>';
			}
		}else{
			returnHtml += '			<div class="n_section no-data">';
			returnHtml += '				<p class="n_content" >'+emptyMsg+'</p>';
			returnHtml += '			</div>';
		}
		returnHtml += '		</div>';
		returnHtml += '		<div class="btm">';
		//returnHtml += '			<span class="all_read">모두 읽음으로 상태 변경</span>';
		returnHtml += '			<span class="btn_all" data-type="'+noticeType+'" data-idx="" onclick="WEB_COMMON_MEMBER.onclickGoMemberNoticeDetail(this);">전체보기 <span class="arrow"></span></span>';
		returnHtml += '			';
		returnHtml += '		</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, noticeType, noticeList, emptyMsg = null;
   	}
}
*/
