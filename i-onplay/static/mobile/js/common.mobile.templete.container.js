/*
* container templete
*/


MOBILE_TEMPLETE.CONNTAINER = {};

//하단 공통 메뉴
/*
MOBILE_TEMPLETE.CONNTAINER.footer_menu = function(){
	var returnHtml = '';

		returnHtml += '<div class="slide_banner_wrap event">';

		returnHtml += '	<div class="tab_btn_wrap">';
		returnHtml += '		<span class="t_btn active"></span>';
		returnHtml += '		<span class="t_btn"></span>';
		returnHtml += '		<span class="t_btn"></span>';
		returnHtml += '		<span class="t_btn"></span>';
		returnHtml += '		<span class="t_btn"></span>';
		returnHtml += '	</div>';

		returnHtml += '	<div class="t_banner_wrap">';
		returnHtml += '		<ul>';
		returnHtml += '			<li class="active"><span><img src="/_static/mobile/images/temp/e_banner_1.jpg" alt=""></span></li>';
		returnHtml += '			<li><span><img src="/_static/mobile/images/temp/e_banner_2.jpg" alt=""></span></li>';
		returnHtml += '			<li><span><img src="/_static/mobile/images/temp/e_banner_3.jpg" alt=""></span></li>';
		returnHtml += '			<li><span><img src="/_static/mobile/images/temp/e_banner_4.jpg" alt=""></span></li>';
		returnHtml += '			<li><span><img src="/_static/mobile/images/temp/e_banner_5.jpg" alt=""></span></li>';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

		returnHtml += '<div class="btm_menu_wrap">';
		returnHtml += '	<ul>';
		returnHtml += '		<li><span>전체 서비스</span></li>';
		returnHtml += '		<li><span>받은 파일</span></li>';
		returnHtml += '		<li><span>구독 채널</span></li>';
		returnHtml += '		<li><span>포인트 충전</span></li>';
		returnHtml += '		<li><span>이벤트</span></li>';
		returnHtml += '		<li><span>출석체크</span></li>';
		returnHtml += '		<li><span>APP 설치</span></li>';
		returnHtml += '		<li><span>PC 버전</span></li>';
		returnHtml += '		<li><span>로그인</span></li>';
		returnHtml += '	</ul>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};
*/

MOBILE_TEMPLETE.CONNTAINER.commonEmptyFooterHtml = function(){
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

//인기
MOBILE_TEMPLETE.CONNTAINER.best = function(info, hashs){

	var returnHtml = '';
		returnHtml += '<div class="cate_box">';
		//returnHtml += '	<div class="now_cate hand mobile-top-best-select-sub-cate-arrow" onclick="MOBILE_PAGE.best.onclickBestMainCateSelectArrow(this);">';
		//returnHtml += '		<span class="mobile-best-selected-sub-cate-title">온플레이 인기 콘텐츠</span><span class="arrow"></span>';
		//returnHtml += '	</div>';
		/*
		returnHtml += '	<div class="depth_choice">';
		returnHtml += '		<ul class="mobile-top-best-select-sub-cate-list">';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		*/
		returnHtml += '	<div class="gnb_depth2">';
		returnHtml += '		<nav class="depth2">';
		returnHtml += '			<ul class="mobile-top-best-select-sub-cate-list">';
		returnHtml += '				<li class="active"><span>전체</span></li>';
		returnHtml += '				<li><span>영화</span></li>';
		returnHtml += '				<li><span>방송</span></li>';
		returnHtml += '				<li><span>애니</span></li>';
		returnHtml += '				<li><span>유아</span></li>';
		returnHtml += '				<li><span>교육</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</nav>';
		returnHtml += '	</div>';
		
		returnHtml += '</div>	';
		returnHtml += '<!-- 콘텐츠 리스트 -->';
		returnHtml += '<div class="content_slide_wrap txt_style sub_list">';
		returnHtml += '	<div class="c_list ">';
		returnHtml += '		<ul class="mobile-best-contents-list-wrap"></ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};
//카테고리
MOBILE_TEMPLETE.CONNTAINER.category = function(info, hashs){

	var returnHtml = '';
		returnHtml += '<form name="mobileCatgoryFilterOption" id="mobileCatgoryFilterOption">';
		returnHtml += '	<input type="hidden" name="sub_cate" value="0"/>';
		returnHtml += '	<input type="hidden" name="block_adult" value="0"/>';
		returnHtml += '	<input type="hidden" name="sort_type" value=""/>';
		returnHtml += '</form>';
		returnHtml += '<div class="cate_box">';
		returnHtml += '	<div class="now_cate hand mobile-top-select-sub-cate-arrow" onclick="MOBILE_PAGE.category.onclickSubCateSelectArrow(this);">';
		returnHtml += '		<span class="mobile-category-selected-sub-cate-title">카테고리 선택</span><span class="arrow"></span>';
		returnHtml += '	</div>';
		//서브 카테고리
		returnHtml += '	<div class="depth_choice">';
		returnHtml += '		<ul class="mobile-top-sub-category-list-wrap">';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		//onpick
		returnHtml += '<div class="on_content_list mobile-category-top-onpick-list">';
		returnHtml += '</div>';


		//프리미엄 광고
		returnHtml += '<!-- 콘텐츠 리스트 -->';
		returnHtml += '<div class="content_50_list premium contents-category-premium-top">';
		returnHtml += '	<h2 class="sub_tit">프리미엄 <span class="ico_ad">추천</span></h2>';
		returnHtml += '	<div class="c_list">';
		returnHtml += '		<ul class="mobile-category-premium-contents-list-wrap" id="mobile-category-premium-cotents-list-wrap">';
		/*
		returnHtml += '			<li>';
		returnHtml += '				<div class="c_img">';
		returnHtml += '					<img src="/_static/mobile/images/temp/m_img_3.jpg" alt="">';
		returnHtml += '					<span class="ico hd"></span>';
		returnHtml += '					<span class="time">02:50</span>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="c_txt_area">';
		returnHtml += '					<p class="c_tit">고전 재탕하기 - 2005.07.14 마다가스카 완벽 번역 보기</p>';
		returnHtml += '					<p class="info"><span class="cate">영화</span><span class="dot"></span><span class="sum"><span class="p_ico"></span>1,000</span></p>';
		returnHtml += '					<p class="info"><span class="name">가나다라마바사아</span></p>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="btn_menu"><span class="b_dot"></span><span class="b_dot"></span><span class="b_dot"></span></div>';
		returnHtml += '			</li>';
		*/
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';


		// 콘텐츠 리스트
		returnHtml += '<div class="content_50_list seller">';
		//returnHtml += '	<h2 class="sub_tit">판매자 채널</h2>';
		returnHtml += '	<div class="content_top">';
		returnHtml += '		<div class="sort_type">';
		returnHtml += '			<span class="s_btn mobile-category-sort-btn s-S active" data-type="sort" data-values="S" onclick="MOBILE_PAGE.category.onclickChangeSortType(this);">기본순</span>';
		returnHtml += '			<span class="s_btn mobile-category-sort-btn s-N" data-type="sort" data-values="N" onclick="MOBILE_PAGE.category.onclickChangeSortType(this);">최신순</span>';
		returnHtml += '			<span class="s_btn mobile-category-sort-btn s-B" data-type="sort" data-values="B" onclick="MOBILE_PAGE.category.onclickChangeSortType(this);">인기순</span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="c_box_area">';
		returnHtml += '			<input type="checkbox" name="block_adult" class="c_box_style mobile-category-form-block-adult" onclick="MOBILE_PAGE.category.onclickBlockAdult(this);">';
		returnHtml += '			<label for="">성인제외</label>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="c_list">';
		returnHtml += '		<ul class="mobile-category-contents-list-wrap" id="mobile-category-cotents-list-wrap">';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		//returnHtml += '<div class="category-page-end-spy" data-page="1" data-total_page="1" data-loaded="1" data-target="" data-info="mobile-category-cotents-list-wrap" id="category-page-end-spy">';
		returnHtml += '<div class="page-end-spy category-page-end-spy" data-page="1" data-total_page="1" data-loaded="1" data-target="mobile-category-contents-list-wrap" data-info="category-page-end-spy" id="category-page-end-spy">';
		returnHtml += ' <div class="end_area">';
		returnHtml += ' 	<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="ing_area">';
		returnHtml += '		<p class="txt">불러오는 중입니다 <span class="arrow"></span></p>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}

};

//방송국 채널 리스트 가져오기
MOBILE_TEMPLETE.CONNTAINER.bro_station_list = function(getType){

	var broStationList = [];
		broStationList[1] = { sname: 'SBS', logo_idx : 3, logo : 'sbs'};
		broStationList[2] = { sname: 'KBS', logo_idx : 2, logo : 'kbs'};
		broStationList[3] = { sname: 'MBC', logo_idx : 1, logo : 'mbc'};
		broStationList[4] = { sname: 'EBS', logo_idx : 11, logo : 'ebs'};
		broStationList[5] = { sname: 'JTBC', logo_idx : 5, logo : 'jtbc'};
		broStationList[6] = { sname: '채널A', logo_idx : 12, logo : 'channel_a'};
		broStationList[7] = { sname: 'TV조선', logo_idx : 6, logo : 'tv_cho'};
		broStationList[8] = { sname: 'MBN', logo_idx : 7, logo : 'mbn'};
		broStationList[9] = { sname: 'M.NET', logo_idx : 8, logo : 'mnet'};
		broStationList[10] = { sname: 'TVN', logo_idx : 4, logo : 'tvn'};
		broStationList[11] = { sname: 'OCN', logo_idx : 10, logo : 'ocn'};
		broStationList[12] = { sname: '올리브', logo_idx : 9, logo : 'olive'};

	var bc = 1;
	var lc = null;

	var returnHtml ='';
		for(var bi in broStationList){
			lc = '';
			if(bc % 4 == 0){
				lc = 'm_none';
			}
			returnHtml += '			<span class="b_btn '+broStationList[bi].logo+' '+lc+'" data-name="'+broStationList[bi].sname+'" data-idx="'+bi+'" onclick="GO_BROADCAST_STATION(this);"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_'+broStationList[bi].logo_idx+'.png" alt=""></span></span>';
			bc++;
		}
	try{
	    return returnHtml;
    }finally {
			returnHtml,broStationList, bc, lc  = null;
   	}
};

//하단 : 서비스
MOBILE_TEMPLETE.CONNTAINER.service = function(info, hashs){
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var cateKey, cateStr, isMnone;
	var channelCateList = diskCategory.show_mobile_top_menu_list;

	var returnHtml ='';
		returnHtml += '<div class="f_content mobile-service-contents">';
		returnHtml += '	<div class="login_check_wrap">';
		returnHtml += '		<div class="login none service-login-info">';
		returnHtml += '			<div class="txt">';
		returnHtml += '				<p>로그인하고 알림, 이벤트 등 맞춤형 정보를 이용하세요!</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="cherge_btn_wrap">';
		returnHtml += '				<span class="c_btn login" onclick="GO_LOGIN(this);">로그인</span>';
		returnHtml += '				<span class="c_btn join" onclick="GO_JOIN(this);">회원가입</span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="login ok service-login-info"></div>';
		returnHtml += '	</div>';
		//returnHtml += '	<div class="b_line"></div>';
		returnHtml += '	<div class="b_line"></div>';
		returnHtml += '	<div class="my_menu_list">';
		returnHtml += '		<ul>';
		if(isMobileOnplayWebviewAgent() != true){
			returnHtml += '			<li class="m13" onclick="APP_INSTALL(this);">';
			returnHtml += '				<span class="ico"></span>';
			returnHtml += '				<span class="txt">앱 설치하기</span>';
			returnHtml += '				<span class="arrow"></span>';
			returnHtml += '			</li>';
		}else{
			returnHtml += '			<li class="m17" onclick="OPEN_APP_DOWNLOAD_BOX(this);">';
			returnHtml += '				<span class="ico"></span>';
			returnHtml += '				<span class="txt">다운로드 보관함</span>';
			returnHtml += '				<span class="arrow"></span>';
			returnHtml += '			</li>';
		}
		returnHtml += '			<li class="m6" onclick="GO_MENU(\'news\');">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">피드</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		
		//child block
		/*
		returnHtml += '			<li class="m1 login-ok mobile-member-child-block-area" data-status="off" data-val="0" data-name="Off" onclick="MOBILE_COMMON_FUN.openMobileMemberChildBlockSetForm(this);" >';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">자녀 안심 서비스</span>';
		returnHtml += '				<span class="arrow_txt child-block-status-txt child-block-status">Off</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		*/
		returnHtml += '			<li class="m1 login-ok" data-group="contents" data-id="buy_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">구매 목록</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m2 login-ok" data-group="contents" data-id="wish_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">찜 목록</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';

		returnHtml += '			<li class="m9" data-adult="0" data-idx="1" data-type="1" data-key="on_attend" onclick="GO_EVENT_VIEW(this, 1);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">출석 체크</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m10" onclick="GO_MENU(\'event_list\');">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">온플 이벤트</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m11" onclick="GO_GOUPON(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">쿠폰 등록</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		/*
		returnHtml += '			<li class="m12">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">무료 충전소</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		*/
		returnHtml += '			<li class="m3" onclick="GO_REQUEST();">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">자료 요청 게시판</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

		if(utility.disk.checkIsUploaderMember() == true){
			returnHtml += '<div class="b_line"></div>';
			returnHtml += '<div class="s_channel_btn_wrap">';
			returnHtml += '	<div class="top" onclick="GO_MYSELLER(this);">';
			returnHtml += '		<p class="tit">판매자 채널 관리</p>';
			returnHtml += '		<span class="ico_arrow"></span>';
			returnHtml += '	</div>';
			returnHtml += '</div>';
		}



		returnHtml += '<div class="b_line"></div>';
		returnHtml += '<div class="s_section">';
		returnHtml += '	<div class="top">';
		returnHtml += '		<p class="tit">ON 채널</p>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="s_content">';
		returnHtml += '		<div class="on_btn_wrap">';
		var cc = 1;
		for(var ci in channelCateList){
			cateKey = channelCateList[ci];
			cateStr = diskCategory.get_menu_string(cateKey);
			isMnone = '';
			if(cc % 4 == 0){
				isMnone = 'm_none';
			}
			returnHtml += '	<span class="on_btn '+isMnone+' '+cateStr+'" onclick="GO_TOP_SP_CATEGORY('+cateKey+');">'+diskCategory.get_cate_name(cateKey)+'</span>';
			cc++;
		}
		/*
		returnHtml += '			<span class="on_btn movie">영화 채널</span>';
		returnHtml += '			<span class="on_btn broad">방송 채널</span>';
		returnHtml += '			<span class="on_btn ani">애니 채널</span>';
		returnHtml += '			<span class="on_btn theme m_none">추천 테마</span>';
		returnHtml += '			<span class="on_btn">유아</span>';
		returnHtml += '			<span class="on_btn">무료/할인</span>';
		returnHtml += '			<span class="on_btn">요청</span>';
		returnHtml += '			<span class="on_btn m_none">성인 BJ</span>';
		*/
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="b_line"></div>';
		returnHtml += '<div class="s_section">';
		returnHtml += '	<div class="top">';
		returnHtml += '		<p class="tit">방송관 채널</p>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="s_content">';
		//방송국 채널 리스트
		returnHtml += '		<div class="b_btn_wrap">';
		returnHtml +=			MOBILE_TEMPLETE.CONNTAINER.bro_station_list('service');
		/*
		returnHtml += '			<span class="b_btn mbc"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_1.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn kbs"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_2.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn sbs"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_3.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn tvn m_none"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_4.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn jtbc"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_5.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn tv_cho"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_6.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn mbn"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_7.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn mnet m_none"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_8.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn olive"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_9.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn ocn"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_10.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn ebs"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_11.png" alt=""></span></span>';
		returnHtml += '			<span class="b_btn channel_a m_none"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_12.png" alt=""></span></span>';
		*/
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

		//btn menu
		returnHtml += '<div class="b_line"></div>';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.service_bottom_menu('service');

		//banner
		returnHtml += '	<div class="b_line"></div>';
		returnHtml += '<div class="side_banner_wrap">';
		if(isMobileOnplayWebviewAgent() == true){
			returnHtml += '	<span class="b_img style1" data-adult="0" data-idx="1" data-type="1" data-key="on_attend" onclick="GO_EVENT_VIEW(this, 1);"><img src="//pic.onplay.co.kr/2020/event/20/fa/20fabde2a689ec13c5ab439f54ec323f.jpg" alt=""></span>';
		}else{
			returnHtml += '	<span class="b_img style1" data-adult="0" data-idx="4" data-type="1" data-key="kakao_plus_2005" onclick="GO_EVENT_VIEW(this, 4);"><img src="//i.imgur.com/PO8hE2t.jpg" alt=""></span>';
		}

		returnHtml += '</div>';


	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs, cateKey, cateStr,isMnone, diskCategory  = null;
   	}
};

//하단 : 카테고리
MOBILE_TEMPLETE.CONNTAINER.service_bottom_menu = function(actionType){

	var returnHtml = '';
		returnHtml += '<div class="btm_menu_wrap">';
		returnHtml += '	<ul>';
		returnHtml += '		<li onclick="GO_MENU(\'notice\');"><span>공지사항</span></li>';
		returnHtml += '		<li onclick="GO_MENU(\'news\');"><span>새소식</span></li>';
		returnHtml += '		<li onclick="GO_MENU(\'faq\');"><span>FAQ</span></li>';
		returnHtml += '		<li onclick="GO_MEMBER_MENU(\'qa\');"><span>1:1 문의</span></li>';
		returnHtml += '		<li onclick="APP_INSTALL(\'notice\');"><span>APP 설치</span></li>';
		//returnHtml += '		<li onclick="GO_MENU(\'event_list\');"><span>이벤트</span></li>';
		returnHtml += '		<li onclick="MOBILE_COMMON_MEMBER.onclickLogOutAction();"><span>로그아웃</span></li>';
		returnHtml += '	</ul>';
		returnHtml += '</div>';

	try{
		return returnHtml;
    }finally {
			returnHtml, actionType  = null;
   	}
};


//하단 : 카테고리
MOBILE_TEMPLETE.CONNTAINER.aside = function(info, hashs){
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var cateKey, cateStr;
	var channelCateList = diskCategory.show_mobile_top_menu_list;

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '		<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content">';
		returnHtml += '		<div class="cate_btn_wrap">';
		returnHtml += '			<span class="line top"></span>';
		returnHtml += '			<span class="line btm"></span>';
		for(var ci in diskCategory.show_mobile_top_category_list){
			cateKey = diskCategory.show_mobile_top_category_list[ci];
			returnHtml += '			<span class="cate_btn type'+cateKey+'" onclick="GO_CATEGORY('+cateKey+');"><span class="ico"></span><span class="name">'+diskCategory.get_cate_name(cateKey)+'</span></span>';
		}
		returnHtml += '		</div>';
		returnHtml += '		<div class="s_section style1">';
		returnHtml += '			<div class="s_content">';
		returnHtml += '				<div class="on_btn_wrap">';
		for(var ci in channelCateList){
			cateKey = channelCateList[ci];
			cateStr = diskCategory.get_menu_string(cateKey);
			returnHtml += '					<span class="on_btn '+cateStr+'" onclick="GO_TOP_SP_CATEGORY('+cateKey+');">'+diskCategory.get_cate_name(cateKey)+'</span>';
		}
		//returnHtml += '					<span class="on_btn m_none">성인 BJ</span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="s_section style1 aside-white-bg">';
		returnHtml += '			<div class="s_content">';
		returnHtml += '				<div class="b_btn_wrap">';
		returnHtml +=					MOBILE_TEMPLETE.CONNTAINER.bro_station_list('aside');
		/*
		returnHtml += '					<span class="b_btn mbc"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_1.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn kbs"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_2.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn sbs"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_3.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn tvn m_none"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_4.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn jtbc"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_5.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn tv_cho"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_6.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn mbn"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_7.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn mnet m_none"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_8.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn olive"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_9.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn ocn"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_10.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn ebs"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_11.png" alt=""></span></span>';
		returnHtml += '					<span class="b_btn channel_a m_none"><span class="logo"><img src="/_static/mobile/images/ico/b_logo_12.png" alt=""></span></span>';
		*/
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
		return returnHtml;
    }finally {
			returnHtml, diskCategory, cateKey, cateStr, channelCateList, info, hashs  = null;
   	}
};

//하단 : for you
MOBILE_TEMPLETE.CONNTAINER.for_you = function(info, hashs){
	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '		<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="foryou-container-contents"></div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};

/*
MOBILE_TEMPLETE.CONNTAINER.for_you_contents = function(){
	var returnHtml = '';
		if(utility.disk.checkIsLogin() == true){
			returnHtml += '	<div class="f_tab_style top_style mypage">';
			returnHtml += '		<span class="tab_btn tab-foryou tab-buy active" data-login="1" data-type="buy" data-target="member-foryou-contents-list" onclick="MOBILE_PAGE.for_you.onclickForyouSubTab(this);">구매 콘텐츠<span class="b_line"></span></span>';
			returnHtml += '		<span class="tab_btn tab-foryou tab-wish" data-login="1" data-type="wish" data-target="member-foryou-contents-list" onclick="MOBILE_PAGE.for_you.onclickForyouSubTab(this);">찜 목록<span class="b_line"></span></span>';
			returnHtml += '		<span class="tab_btn tab-foryou tab-subscribe" data-login="1" data-type="subscribe" data-target="member-foryou-contents-list" onclick="MOBILE_PAGE.for_you.onclickForyouSubTab(this);">구독채널<span class="b_line"></span></span>';
			returnHtml += '	</div>';

			returnHtml += '	<div class="f_content has-sub-menu foryou-f-contents">';
			returnHtml += '		<div class="inner login-inner" style="">';
			returnHtml += '			<div class="for-yor-list content_slide_wrap txt_style sub_list type1 member-contents-buy-wish">';
			returnHtml += '				<div class="result-no-channel">';
			returnHtml += '					<div class="no_channel">';
			returnHtml += '						<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">구독채널이 없습니다.<span></p>';
			returnHtml += '					</div>';
			returnHtml += '				</div>';
			//구매 콘텐츠, 찜목록
			returnHtml += '				<div class="c_list contents-list-wrap">';
			returnHtml += '					<ul class="member-foryou-contents-list" data-load="0"></ul>';
			returnHtml += '				</div>';
			returnHtml += '				<span class="g_btn_all btn-foryou-more btn-foryou-more-buy btn-foryou-more-wish" data-select="buy"><span>전체보기</span><span class="ico_arrow"></span></span>';
			returnHtml += '			</div>';

			// 구독채널
			returnHtml += '			<div class="for-yor-list member-contents-subscribe">';

			returnHtml += '				<div class="result-no-channel">';
			returnHtml += '					<div class="no_channel">';
			returnHtml += '						<p class="txt"><span class="e_ico"></span>구독하시는 채널이 없습니다.</p>';
			returnHtml += '					</div>';
			returnHtml += '					<div class="r_chl_wrap">';
			returnHtml += '						<p class="tit">온플에서 추천하는 인기 판매자 채널!</p>';
			returnHtml += '						<div class="chl_list">';
			returnHtml += '							<ul class="seller-channel-rank-list">';
			returnHtml += '							</ul>';
			returnHtml += '						</div>';
			returnHtml += '					</div>';
			returnHtml += '				</div>';

			//구독 채널
			returnHtml += '				<div class="member-foryou-subscribe-contents-list"></div>';
			returnHtml += '				<span class="g_btn_all btn-foryou-more btn-foryou-more-subscribe" data-select="buy"><span>전체보기</span><span class="ico_arrow"></span></span>';
			returnHtml += '			</div>';

			returnHtml += '		</div>';
			returnHtml += '	</div>';
		}
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};
*/


MOBILE_TEMPLETE.CONNTAINER.search_form = function(info, hashs){
	var returnHtml;
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

MOBILE_TEMPLETE.CONNTAINER.search = function(info, hashs){
	var returnHtml;
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

MOBILE_TEMPLETE.CONNTAINER.login = function(info, hashs){
	var isApp = 0;
	if(isMobileOnplayWebviewAgent() == true){
		var isApp = 1;
	}
	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">로그인</h1>';
		returnHtml += '			<span class="btn_back" data-target="login-modal" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<form id="mobileLoginActionForm" name="mobileLoginActionForm" data-loaded="0" novalidate>';
		returnHtml += '				<input type="hidden" name="device_type" value="1"/>';
		returnHtml += '				<input type="hidden" name="is_mobile" value="1"/>';
		returnHtml += '				<input type="hidden" name="is_app" value="'+isApp+'"/>';
		returnHtml += '				<div class="input_wrap">';
		returnHtml += '					<div class="input_line">';
		returnHtml += '						<input type="email" class="input_style full" id="login_user_email" name="user_email" value="" placeholder="아이디(이메일)" required="required">';
		returnHtml += '						<div class="invalid-feedback user_email">';
		returnHtml += '				          아이디는 이메일로 되어 있습니다. SNS계정일 경우 아래 SNS 계정 로그인을 해주세요.';
		returnHtml += '				        </div>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="input_line">';
		returnHtml += '						<input type="password" class="input_style size2" id="login_user_pass" name="user_pass" autocomplete="new-password" placeholder="비밀번호" required="required">';
		returnHtml += '						<div class="invalid-feedback user_pass">';
		returnHtml += '				          비밀 번호를 입력해주세요.';
		returnHtml += '				        </div>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="protect_word security_word" id="disk-login-security_word">';
		returnHtml += '						<p class="txt">아래 이미지를 보이는 대로 입력해주세요.</p>';
		returnHtml += '						<div class="img_wrap">';
		returnHtml += '							<div class="img_area" id="disk-login-security-captcha"></div>';
		returnHtml += '							<div class="btn_refresh" onclick="MOBILE_PAGE.reloadCaptchaLogin();"><span class="ico"></span> 새로고침</div>';
		returnHtml += '						</div>';
		returnHtml += '						<input type="text" class="input_style size2" name="login_captcah" id="disk-login_captcah" placeholder="위 보안문자를 그대로 입력해주세요">';
		returnHtml += '						<div class="invalid-feedback login_captcah">';
		returnHtml += '				          보안 문자를 입력해주세요.';
		returnHtml += '				        </div>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="check_area">';
		returnHtml += '						<input type="checkbox" name="auto_save" class="c_box_style"><label for="" class="label_style">로그인 상태 유지</label>';
		returnHtml += '						<input type="checkbox" name="save_email" class="c_box_style"><label for="" class="label_style">아이디 저장</label>';
		returnHtml += '					</div>';
		returnHtml += '					<button type="submit" class="btn_submit">로그인</button>';
		returnHtml += '					<div class="login_menu">';
		returnHtml += '						<span onclick="GO_FINDID();">아이디 찾기</span>';
		returnHtml += '						<span class="bar">|</span>';
		returnHtml += '						<span onclick="GO_FINDPASS()">비밀번호 찾기</span>';
		returnHtml += '						<span class="bar">|</span>';
		returnHtml += '						<span class="btn_join_txt" onclick="GO_JOIN(this);">회원가입</span>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '			</form>';
		returnHtml += '			<div class="sns_login">';
		returnHtml += '				<p class="s_tit">SNS 계정으로 로그인하기</p>';
		returnHtml += '				<div class="btn_wrap">';
		returnHtml += '					<span class="s_btn naver" data-sns="naver" data-type="mlogin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="ico"><img src="/_static/mobile/images/ico/login_sns_ico_1.png" alt=""></span></span>';
		returnHtml += '					<span class="s_btn kakao" data-sns="kakao" data-type="mlogin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="ico"><img src="/_static/mobile/images/ico/login_sns_ico_2.png" alt=""></span></span>';
		if(isMobileOnplayWebviewAgent() != true){
			returnHtml += '					<span class="s_btn google" data-sns="google" data-type="mlogin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="ico"><img src="/_static/mobile/images/ico/login_sns_ico_3.png" alt=""></span></span>';
		}
		returnHtml += '					<span class="s_btn facebook" data-sns="facebook" data-type="mlogin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="ico"><img src="/_static/mobile/images/ico/login_sns_ico_4.png" alt=""></span></span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, isApp  = null;
   	}
};

//회원가입 - 가입 선택
MOBILE_TEMPLETE.CONNTAINER.join = function(info, hashs){
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<div class="sns_join_wrap">';
		returnHtml += '				<h2 class="tit">SNS 회원가입</h2>';
		returnHtml += '				<p class="txt">SNS계정으로 간편하게 가입하여 서비스를 이용하실 수 있습니다.</p>';
		returnHtml += '				<div class="sns_join_btn_wrap">';
		returnHtml += '					<span class="s_join_btn naver" data-sns="naver" data-type="mJoin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="logo"><img src="/_static/mobile/images/ico/sns_logo_naver.png" alt=""></span>로 회원가입하기</span>';
		returnHtml += '					<span class="s_join_btn kakao" data-sns="kakao" data-type="mJoin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="logo"><img src="/_static/mobile/images/ico/sns_logo_kakao.png" alt=""></span>로 회원가입하기</span>';
		if(isMobileOnplayWebviewAgent() != true){
			returnHtml += '					<span class="s_join_btn google" data-sns="google" data-type="mJoin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="logo"><img src="/_static/mobile/images/ico/sns_logo_google.png" alt=""></span>로 회원가입하기</span>';
		}
		returnHtml += '					<span class="s_join_btn facebook" data-sns="facebook" data-type="mJoin" onclick="MOBILE_PAGE.sns.onclickMobileSnsJoin(this);"><span class="logo"><img src="/_static/mobile/images/ico/sns_logo_facebook.png" alt=""></span>로 회원가입하기</span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="or_wrap">';
		returnHtml += '				<span class="txt">OR</span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="join_btn_wrap">';
		returnHtml += '				<h2 class="tit">온플레이 회원가입</h2>';
		returnHtml += '				<p class="txt">이메일과 패스워드 등록만으로 간편하게 가입하실 수 있습니다.</p>';
		returnHtml += '				<span class="btn_join" onclick="GO_MENU(\'join_form\');">회원가입</span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

MOBILE_TEMPLETE.CONNTAINER.join_form = function(info, hashs){
	var returnHtml;
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//하단: 마이페이지
MOBILE_TEMPLETE.CONNTAINER.mypage = function(info, hashs){

	var returnHtml = '';
		returnHtml += '<div class="f_top">';
		returnHtml += '	<div class="inner">';
		returnHtml += '		<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '		<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="f_content">';
		returnHtml += '	<div class="member-info"></div>';

		returnHtml += '	<div class="b_line"></div>';
		returnHtml += '	<div class="my_menu_list">';
		returnHtml += '		<ul>';
		returnHtml += '			<li class="m1" data-group="contents" data-id="buy_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">구매 목록</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m17" onclick="OPEN_APP_DOWNLOAD_BOX(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">다운로드 보관함</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m2" data-group="contents" data-id="wish_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">찜 목록</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m5" data-group="channel" data-id="channel_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">구독 채널</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		/*
		returnHtml += '			<li class="m4">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">사전 예약 목록</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';



		returnHtml += '			<li class="m6" data-group="channel" data-id="channel_management" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">구독 채널 관리</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		*/


		returnHtml += '			<li class="m3" onclick="GO_REQUEST(\'my\');">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">나의 콘텐츠 업로드 요청</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m7" onclick="GO_MEMBER_MENU(\'qa\');">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">나의 문의 내역</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';

		returnHtml += '			<li class="m8" data-group="info" data-id="info_edit" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">회원정보 / 비밀번호 변경</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';

		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="b_line"></div>';
		returnHtml += '	<div class="my_menu_list">';
		returnHtml += '		<ul>';
		returnHtml += '			<li class="m14" data-group="point" data-id="charge_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">충전(결제) 내역</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		returnHtml += '			<li class="m1" data-group="point" data-id="point_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">포인트 적립/사용 내역</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		/*
		returnHtml += '			<li class="m1">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">마일리지  사용 내역</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';
		*/
		returnHtml += '			<li class="m15" data-group="point" data-id="mileage_list" onclick="GO_MYPAGE(this);">';
		returnHtml += '				<span class="ico"></span>';
		returnHtml += '				<span class="txt">마일리지 사용 내역</span>';
		returnHtml += '				<span class="arrow"></span>';
		returnHtml += '			</li>';

		returnHtml += '		</ul>';
		returnHtml += '	</div>';

		returnHtml += '	<div class="b_line"></div>';
		returnHtml += '	<div class="s_channel_btn_wrap">';
		returnHtml += '		<div class="top" onclick="GO_MYSELLER(this);">';
		returnHtml += '			<p class="tit">판매자 채널 관리</p>';
		returnHtml += '			<span class="ico_arrow"></span>';
		returnHtml += '		</div>';
		/*
		returnHtml += '		<div class="btn_area">';
		returnHtml += '			<span class="c_btn current">판매 현황&amp;내역 &gt;</span>';
		returnHtml += '			<span class="c_btn info">채널 정보관리 &gt;</span>';
		returnHtml += '			<span class="c_btn guide">채널 가이드 &gt;</span>';
		returnHtml += '		</div>';
		*/
		returnHtml += '	</div>';

		returnHtml += '	<div class="b_line"></div>';
		returnHtml += '	<div class="center_area type1">';
		returnHtml += '		<p class="p_num"><a href="16004912"><span class="p_ico"></span>1600-4912</a></p>';
		returnHtml += '		<p class="txt"><span class="s_txt">평일 10:00~19:00<span class="bar">|</span>주말/공휴일 휴무</span></p>';
		returnHtml += '		<div class="btn_wrap">';
		returnHtml += '			<span class="c_btn direct" onclick="GO_MEMBER_MENU(\'qa\');" ><span class="ico"></span>1:1 문의</span>';
		//returnHtml += '			<span class="c_btn kakao"><a href="//pf.kakao.com/_xjhGNxb/chat"><span class="ico"></span>카카오톡 상담</a></span>';
		returnHtml += '			<span class="c_btn kakao" onclick="actionKakaoChannelChat(\'_xjhGNxb\');"><span class="ico"></span>카카오톡 상담</span>';

		returnHtml += '		</div>';
		returnHtml += '	</div>';



		//returnHtml += '<div class="b_line"></div>';
		returnHtml += '<div class="side_banner_wrap">';
		if(isMobileOnplayWebviewAgent() == true){
			returnHtml += '	<span class="b_img style1" data-adult="0" data-idx="1" data-type="1" data-key="on_attend" onclick="GO_EVENT_VIEW(this, 1);"><img src="//pic.onplay.co.kr/2020/event/20/fa/20fabde2a689ec13c5ab439f54ec323f.jpg" alt=""></span>';
		}else{
			returnHtml += '<span class="b_img style1" data-adult="0" data-idx="4" data-type="1" data-key="kakao_plus_2005" onclick="GO_EVENT_VIEW(this, 4);"><img src="//i.imgur.com/PO8hE2t.jpg" alt=""></span>';
		}
		returnHtml += '</div>';

		//btn menu
		//returnHtml += '<div class="b_line"></div>';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.service_bottom_menu('service');

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//환전 안내
MOBILE_TEMPLETE.CONNTAINER.chargeinfomation = function(seller_cash){

    var returnHtml = '';
        returnHtml += '<div class="f_top">';
    	returnHtml +=	'<div class="select_page_wrap">';
    	returnHtml +=		'<h1 class="f_tit">포인트 환전안내</h1>';
    	returnHtml +=			'<span class="btn_back" data-target="myseller" data-loc="top" onclick="GO_BACK(this);"></span>';
    	returnHtml +=		'<div class="click_v_area">';
    	returnHtml +=			'<ul>';
    	returnHtml +=				'<li><span>채널 관리</span></li>';
    	returnHtml +=				'<li><span>채널 관리</span></li>';
    	returnHtml +=				'<li><span>채널 관리</span></li>';
    	returnHtml +=			'</ul>';
    	returnHtml +=		'</div>';
    	returnHtml +=	'</div>';
    	returnHtml +='</div>';
    	returnHtml +='<div class="f_content on_channel">';
    	returnHtml +=	'<div class="my_top_txt">';
    	returnHtml +=		'<ul>';
    	returnHtml +=			'<li><span class="dot"></span><span class="txt">매주 수요일~익주 화요일까지 접수된 출금 신청건에 대해 목요일에 일괄 검수 후 승인처리 됩니다</span></li>';
    	returnHtml +=			'<li><span class="dot"></span><span class="txt">무상으로 발급된 쿠폰, 보너스포인트, 정액제는 적립되지 않습니다. 적립금은 50,000 CP 이상부터 출금 신청이 가능합니다.</span></li>';
    	returnHtml +=		'</ul>';
    	returnHtml +=	'</div>';
    	returnHtml +=	'<div class="point_change_wrap">';
    	returnHtml +=		'<p class="t_txt">현재 회원님의 보유 채널 포인트는 <span class="num" id="end_ssc">'+seller_cash+'</span> CP 입니다.</p>';
    	returnHtml +=		'<div class="p_c_notice">';
    	returnHtml +=			'<span class="ico"></span>';
    	returnHtml +=			'<span class="txt">포인트 환전은 모바일 웹에서 지원하지 않습니다.<br /> PC용 웹 (www.onpaly.co.kr) 에서 이용해주세요.</span>';
    	returnHtml +=		'</div>';
    	returnHtml +=	'</div>';
    	returnHtml +='</div>';
        try{
    	    return returnHtml;
        }finally {
    			returnHtml  = null;
       	}
}

MOBILE_TEMPLETE.CONNTAINER.contents = function(info, hashs){
	var returnHtml;
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


MOBILE_TEMPLETE.CONNTAINER.event_list = function(info, hashs){
	var returnHtml = '';
		returnHtml += '<div class="f_top">';
		returnHtml += '	<div class="inner">';
		returnHtml += '		<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '		<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="f_content event-list">';
		returnHtml += '	<div class="inner">';
		returnHtml += '		<div class="f_tab_style">';
		returnHtml += '			<span class="tab_btn btn-event-list-tab active" data-type="1" onclick="MOBILE_PAGE.event_list.onclickChangeEventType(this);">진행중인 이벤트<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn btn-event-list-tab" data-type="2" onclick="MOBILE_PAGE.event_list.onclickChangeEventType(this);">종료된 이벤트<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="slide_banner_wrap event">';
		returnHtml += '			<div class="t_banner_wrap">';
		returnHtml += '				<div class="swipe-banner disk-mobile-autoplay-slick mobile-swip-event-top-banner disk-slick">';
		//returnHtml += '					<div class="swipe-banner-item"><span><img src="/_static/mobile/images/temp/e_banner_1.jpg" alt=""></span></div>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="f_tab_list_wrap">';
		returnHtml += '			<div class="event_list">';
		returnHtml += '				<ul class="mobile-event-list-wrap"></ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';


		returnHtml += '	<div class="page-end-spy mobile-event-list-page-end-spy loading" onclick="MOBILE_PAGE.event_list.onclickMoreMobileData(this);" data-type="1" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-target="mobile-event-list-wrap" data-info="mobile-event-list-page-end-spy" id="mobile-event-list-page-end-spy">';
		returnHtml += '		<div class="end_area">';
		returnHtml += '			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="ing_area">';
		returnHtml += '			<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';


		returnHtml += '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

//채널 공통 top
MOBILE_TEMPLETE.CONNTAINER.channel_header = function(channelType, info, hashs){
	console.log('MOBILE_TEMPLETE.CONNTAINER.channel_header'+channelType);
	console.log(info);
	console.log(hashs);
	var channel_category_list = {'movie' : 11000, 'broadcast' : 12000, 'ani':13000,'theme': 77702};
	var headetTitle = info.name;
	var placeholderMsg = "온플 채널에서 검색(제목, 배우 등)";
	var selectChannelCategory = channel_category_list[channelType];
	if(channelType == 'theme'){
		placeholderMsg = "온플 테마에서 검색 (제목, 배우, 주제)";
	}

	var backBtn = info.back;
	/*
	if(isDefined(hashs)){
		if(hashs['type']){
			backBtn = hashs['type'];
		}
	}
	*/

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="select_page_wrap mobile-channel-header-select">';
		returnHtml += '			<div class="click_area" onclick="$(\'.mobile-channel-header-select\').toggleClass(\'active\');">';
		returnHtml += '				<span class="txt">'+headetTitle+'</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="click_v_area">';
		returnHtml += '				<ul>';
		returnHtml += '					<li onclick="GO_TOP_SP_CATEGORY(90002);"><span>테마 채널</span></li>';
		returnHtml += '					<li onclick="GO_TOP_SP_CATEGORY(91000);"><span>영화 채널</span></li>';
		returnHtml += '					<li onclick="GO_TOP_SP_CATEGORY(92000);"><span>방송 채널</span></li>';
		returnHtml += '					<li onclick="GO_TOP_SP_CATEGORY(93000);"><span>애니 채널</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		//returnHtml += '		<span class="btn_back"></span>';
		returnHtml += '		<span class="btn_back" data-target="'+backBtn+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_search_input_wrap">';
		returnHtml += '		<form name="mobileChannelContentsSearchForm" id="mobileChannelContentsSearchForm" method="POST">';
		returnHtml += '			<input type="hidden" name="channel_type" id="mobileChannelContentsSearchForm_channel_type" value="'+channelType+'"/>';
		returnHtml += '			<input type="hidden" name="sc" id="mobileChannelContentsSearchForm_selected_category" value="'+selectChannelCategory+'"/>';
		returnHtml += '			<input type="hidden" name="fc" id="mobileChannelContentsSearchForm_force_category" value=""/>';
		returnHtml += '			<input type="hidden" name="is_mobile" value="1"/>';
		if(channelType == 'theme'){
			returnHtml += '			<input type="hidden" name="th" id="mobileChannelContentsSearchForm_th" value="on"/>';
		}else{
			returnHtml += '			<input type="hidden" name="t" id="mobileChannelContentsSearchForm_t" value="on"/>';
			returnHtml += '			<input type="hidden" name="a" id="mobileChannelContentsSearchForm_a" value="on"/>';
			returnHtml += '			<input type="hidden" name="d" id="mobileChannelContentsSearchForm_d" value="on"/>';
		}
		returnHtml += '			<div class="input_area">';
		returnHtml += '				<input type="text" class="s_input" name="k" id="mobileChannelContentsSearchForm-search_keyword" placeholder="'+placeholderMsg+'" autocomplete=off><button class="btn_search btn_submit"></button>';
		returnHtml += '			</div>';
		returnHtml += '		</form>';
		returnHtml += '	</div>';



		returnHtml += '<div class="no_result_wrap channel-search-no-result">';
		returnHtml += '	<div class="txt_area">';
		returnHtml += '		<p><span class="word mobile-channel-search-keyword"></span>에 대한 채널 검색 결과가 없습니다.</p>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="request_btn_wrap">';
		returnHtml += '		<p class="txt">통합 검색을 통해 다시 검색해보세요.</p>';
		//returnHtml += '		<p class="word_content"><span class="word">\'웨딩피치\'</span>로 검색하시겠습니까?</p>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="channel-search-no-result recommend_word">';
		returnHtml += '	<p class="tit">통합 검색</p>';
		returnHtml += '	<p class="word_content">\'<span class="word mobile-channel-search-keyword" onclick="MOBILE_COMMON_FUN.onclickGoSearchOnText(this);"></span>\'로 통합검색하시겠습니까?</p>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, headetTitle, placeholderMsg, backBtn  = null;
   	}
};

//채널 - on channel
MOBILE_TEMPLETE.CONNTAINER.on_channel = function(info, hashs){
	var returnHtml;
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};
//채널 - channel_view
MOBILE_TEMPLETE.CONNTAINER.channel_view = function(info, hashs){
	var returnHtml;
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

//채널 - 테마관
MOBILE_TEMPLETE.CONNTAINER.theme = function(info, hashs){
	var returnHtml = '';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.channel_header('theme', info, hashs);
		returnHtml += '<div class="f_content on_channel">';
		returnHtml += '		<div class="best_search_word mobile-channel-theme-top-tags">';
		returnHtml += '			<div class="m_top">';
		returnHtml += '				<p class="tit">온플 추천 테마</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="tag_area mobile-channel-theme-top-tags-wrap">';
		//returnHtml += '				<span class="tag">#한여름밤 공포영화</span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="theme_wrap mobile-channel-wrap-theme mobile-channel-wrap">';
		returnHtml += '			<div class="mobile-channel-theme-list-wrap"></div>';
		returnHtml += '		</div>';

		returnHtml += '	<div class="channel-theme-page-end-spy loading" onclick="MOBILE_PAGE.theme.onclickMoreMobileTheme(this);" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mobile-channel-theme-list-wrap" data-info="channel-theme-page-end-spy" id="channel-theme-page-end-spy" style="margin-bottom: 20px;margin-top: -20px;">';
		returnHtml += '		<div class="end_area">';
		returnHtml += ' 		<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="ing_area">';
		returnHtml += '			<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

//채널 - 채널 검색
MOBILE_TEMPLETE.CONNTAINER.channel_search = function(info, hashs){
	var returnHtml = '';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.channel_header('channel_search', info, hashs);
		returnHtml += '<div class="channel_search_wrap mobile-channel-wrap mobile-channel-wrap-channel_search">';
		returnHtml += '	<div class="movie_list update channel-search-list">';
		returnHtml += '		<h2 class="tit mobile-channel-search-title-wrap">영화채널</h2>';
		returnHtml += '		<ul class="mobile-channel-search-list-wrap movie-list"></ul>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="broad_list update channel-search-list">';
		returnHtml += '		<h2 class="tit mobile-channel-search-title-wrap">방송채널</h2>';
		returnHtml += '		<ul class="mobile-channel-search-list-wrap broadcast-list"></ul>';
		returnHtml += '	</div>';
		//returnHtml += '		<h2 class="tit mobile-channel-search-title-wrap">애니채널</h2>';
		//returnHtml += '		<ul class="mobile-channel-search-list-wrap search-list"></ul>';


		//returnHtml += '	<span class="btn_more"><span class="ico"></span></span>';
		returnHtml += '	<div class="channel-search-page-end-spy loading" onclick="MOBILE_PAGE.movie.onclickMoreMobileMovie(this);" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mobile-channel-search-list-wrap" data-info="channel-search-page-end-spy" id="channel-search-page-end-spy">';
		returnHtml += '		<div class="end_area">';
		returnHtml += ' 		<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="ing_area">';
		returnHtml += '			<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

//채널 - 영화 채널
MOBILE_TEMPLETE.CONNTAINER.movie = function(info, hashs){
	var mvSubList = { A:'최신업데이트 영화',R:'2020년 결산 인기 영화', B: '명작/인기 영화', C:'한국 영화 흥행 순위', D: '평점 높은 영화', E: '평점 높은 영화', F: '이번주 인기 영화', G: '개봉 예정 영화', P:'핑크무비', Z:'무료/할인 영화'};
	var returnHtml = '';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.channel_header('movie', info, hashs);
		//sub cate
		returnHtml += '<div class="cate_box channel-cate-box channel-movie-sub-category" data-val="A">';
		returnHtml += '	<div class="now_cate" data-target="channel-movie-sub-category" onclick="MOBILE_COMMON.CHANNEL.onclickShowChannelSubCategory(this);">';
		returnHtml += '		<span class="sub-tit">최신업데이트 영화</span><span class="arrow"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="depth_choice">';
		returnHtml += '		<ul>';
		for(var m in mvSubList){
			returnHtml += '			<li class="deep-sub-'+m+'" data-val="'+m+'" onclick="MOBILE_PAGE.movie.onclickChannelMovieCategoryItem(this);"><span class="depth2">'+mvSubList[m]+'</span></li>';
		}
		//returnHtml += '			<li class="deep-sub-F" data-val="F" onclick="MOBILE_PAGE.movie.onclickChannelMovieCategoryItem(this);"><span class="depth2">방송사 추천 영화</span></li>';
		//returnHtml += '			<li class="deep-sub-G" data-val="G" onclick="MOBILE_PAGE.movie.onclickChannelMovieCategoryItem(this);"><span class="depth2">독립 영화관</span></li>';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		returnHtml += '</div>';

		returnHtml += '<div class="theme_wrap mobile-channel-wrap mobile-channel-wrap-movie">';
		returnHtml += '	<div class="movie_list update">';
		returnHtml += '		<h2 class="tit mobile-channel-movie-title-wrap">최신 업데이트 영화</h2>';
		returnHtml += '		<ul class="mobile-channel-movie-list-wrap">';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
		//returnHtml += '	<span class="btn_more"><span class="ico"></span></span>';
		returnHtml += '	<div class="channel-movie-page-end-spy loading" onclick="MOBILE_PAGE.movie.onclickMoreMobileMovie(this);" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mobile-channel-movie-list-wrap" data-info="channel-movie-page-end-spy" id="channel-movie-page-end-spy">';
		returnHtml += '		<div class="end_area">';
		returnHtml += ' 		<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="ing_area">';
		returnHtml += '			<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, mvSubList , info, hashs= null;
   	}
};

//채널 - 애니
MOBILE_TEMPLETE.CONNTAINER.broadcast = function(info, hashs){
	var broSubList = { A:'최신방송',R:'2020년 결산 인기드라마', S:'2020년 결산 인기예능', B: '역대 명품드라마', C:'역대 명품예능', D: '역대 최고 시청률 드라마', E:'오늘의 방송', F:'어제의 인기 드라마', G:'어제의 인기 예능', Z:'무료/할인 방송'};
	var returnHtml = '';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.channel_header('broadcast', info, hashs);
		//sub cate
		/*
		returnHtml += '		<div class="cate_box">';
		returnHtml += '			<div class="now_cate" onclick="">';
		returnHtml += '				<span>전체</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="depth_choice">';
		returnHtml += '				<ul>';
		returnHtml += '					<li><span class="depth2">전체</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="cate_box channel-cate-box channel-broadcast-sub-category" data-val="A">';
		returnHtml += '			<div class="now_cate" data-target="channel-broadcast-sub-category" onclick="MOBILE_COMMON.CHANNEL.onclickShowChannelSubCategory(this);">';
		returnHtml += '				<span class="sub-tit">최신방송</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="depth_choice">';
		returnHtml += '				<ul>';
		for(var m in broSubList){
			returnHtml += '				<li class="deep-sub-'+m+'" data-val="'+m+'" onclick="MOBILE_PAGE.broadcast.onclickChannelBroadcastCategoryItem(this);"><span class="depth2">'+broSubList[m]+'</span></li>';
		}
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="theme_wrap mobile-channel-wrap mobile-channel-wrap-broadcast">';
		returnHtml += '			<div class="broad_list update">';
		returnHtml += '				<h2 class="tit mobile-channel-broadcast-title-wrap"></h2>';
		returnHtml += '				<ul class="mobile-channel-broadcast-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		//returnHtml += '			<span class="btn_more"><span class="ico"></span></span>';
		returnHtml += '			<div class="channel-broadcast-page-end-spy loading" onclick="MOBILE_PAGE.broadcast.onclickMoreMobileBroadcast(this);" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mobile-channel-broadcast-list-wrap" data-info="channel-broadcast-page-end-spy" id="channel-broadcast-page-end-spy">';
		returnHtml += '				<div class="end_area">';
		returnHtml += ' 				<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="ing_area">';
		returnHtml += '					<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';

		returnHtml += '		</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, broSubList, info, hashs = null;
   	}
};

MOBILE_TEMPLETE.CONNTAINER.ani = function(info, hashs){
	var aninSubList = { '11000':'극장판 애니메이션', '12000': 'TV 방영 애니메이션','hot':'명작 애니메이션', 'a_child':'유아 전용 애니메이션', 'jp_anim':'일본 극장판 애니메이션'};


	var returnHtml = '';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.channel_header('ani', info, hashs);
		//sub cate
		returnHtml += '		<div class="cate_box channel-cate-box channel-ani-sub-category" data-val="11000">';
		returnHtml += '			<div class="now_cate" data-target="channel-ani-sub-category" onclick="MOBILE_COMMON.CHANNEL.onclickShowChannelSubCategory(this);">';
		returnHtml += '				<span class="sub-tit">극장판 애니메이션</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="depth_choice">';
		returnHtml += '				<ul>';
		for(var m in aninSubList){
			returnHtml += '				<li class="deep-sub-'+m+'" data-val="'+m+'" onclick="MOBILE_PAGE.ani.onclickChannelAniCategoryItem(this);"><span class="depth2">'+aninSubList[m]+'</span></li>';
		}
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		/*
		returnHtml += '		<div class="cate_box">';
		returnHtml += '			<div class="now_cate" onclick="">';
		returnHtml += '				<span>전체</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="depth_choice">';
		returnHtml += '				<ul>';
		returnHtml += '					<li><span class="depth2">전체</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="theme_wrap mobile-channel-wrap mobile-channel-wrap-ani mobile-channel-ani-wrap">';
		returnHtml += '			<div class="movie_list update channel-category-list">';
		returnHtml += '				<h2 class="tit mobile-channel-ani-title-wrap">극장판 애니메이션</h2>';
		returnHtml += '				<ul class="mobile-channel-ani-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		//returnHtml += '			<span class="btn_more"><span class="ico"></span></span>';
		returnHtml += '			<div class="channel-ani-page-end-spy loading" onclick="MOBILE_PAGE.ani.onclickMoreMobileAni(this);" data-main="11000" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mobile-channel-ani-list-wrap" data-info="channel-ani-page-end-spy" id="channel-ani-page-end-spy">';
		returnHtml += '				<div class="end_area">';
		returnHtml += ' 				<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="ing_area">';
		returnHtml += '					<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml , info, hashs, aninSubList = null;
   	}
};




//판매자 채널 : 판매자 홈
MOBILE_TEMPLETE.CONNTAINER.channel_home = function(info, hashs){

	console.log('MOBILE_TEMPLETE.CONNTAINER.channel');

	var returnHtml = '';

		var returnHtml = '';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.channel_header('ani', info, hashs);


	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};


//판매자 채널
MOBILE_TEMPLETE.CONNTAINER.channel = function(info, hashs){

	console.log('MOBILE_TEMPLETE.CONNTAINER.channel');

	var returnHtml = '';
		//판매자 정보
		returnHtml += '		<div class="channel-seller-info-card">';
		returnHtml += '		</div>';

		returnHtml += '		<div class="f_search_input_wrap">';
		returnHtml += '			<form name="mobileChannelSellerContentsSearchForm" id="mobileChannelSellerContentsSearchForm" method="POST">';
		returnHtml += '				<input type="hidden" name="fc" value="0"/>';
		returnHtml += '				<input type="hidden" name="seller" value=""/>';
		returnHtml += '				<div class="input_area">';
		returnHtml += '					<input type="text" class="s_input" name="k" id="mobileChannelSellerContentsSearchForm-search_keyword" placeholder="" autocomplete=off><button class="btn_search btn_submit" type="submit"></button>';
		returnHtml += '				</div>';
		returnHtml += '			</form>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="content_50_list">';
		returnHtml += '			<div class="c_list">';
		returnHtml += '				<ul class="mobile-channel-seller-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="channel-seller-page-end-spy loading" onclick="MOBILE_PAGE.channel.onclickMoreMobileSeller(this);" data-seller="" data-nick="" data-main="" data-sub="" data-k="" data-cate1="0" data-cate2="" data-limit="20" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-target="mobile-channel-seller-list-wrap" data-info="channel-seller-page-end-spy" id="channel-seller-page-end-spy">';
		returnHtml += '				<div class="end_area">';
		returnHtml += ' 				<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="ing_area">';
		returnHtml += '					<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		//returnHtml += '	</div>';


	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};

//쪽지 - 쪽지 보내기
MOBILE_TEMPLETE.CONNTAINER.memo_write = function(data){
	console.log('MOBILE_TEMPLETE.CONNTAINER.memo_write', data);

	var isReply = false;
	if(data.reply == 1 || isDefined(data.idx)){
		isReply = true;
	}
	if(data.reply == 2){
		isReply = false;
	}

	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">쪽지 보내기</h1>';
		returnHtml += '			<span class="btn_back" data-target="modal" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content">';
		returnHtml += '		<form nmae="mobileSendMemoForm" id="mobileSendMemoForm">';
		returnHtml += '			<input type="hidden" name="sender_idx" value="'+data.idx+'">';
		returnHtml += '			<input type="hidden" name="sender_nick" value="'+data.sender+'">';
		returnHtml += '			<input type="hidden" name="receiver_idx" value="'+data.receiver+'">';
		returnHtml += '			<input type="hidden" name="receiver_nick" value="'+data.receiver_nick+'">';
		returnHtml += '			<input type="hidden" name="memo_is_reply" value="'+data.reply+'">';
		returnHtml += '			<input type="hidden" name="seller" value="'+data.seller+'">';
		returnHtml += '			<div class="inner">';

		returnHtml += '				<div class="content_input_line">';
		returnHtml += '					<label for="" class="label_style">받는 사람</label>';
		returnHtml += '					<input type="text" class="input_style" disabled value="'+data.receiver_nick+'">';
		returnHtml += '				</div>';

		returnHtml += '				<div class="content_input_line">';
		//returnHtml += '					<span class="label_style">분류</span>';
		returnHtml += '					<div class="radio_wrap" style="width:100%;text-align:center;">';
		if(isReply == true){
			//returnHtml += '				<input type="hidden" name="memo_kind" value="답장">';
			returnHtml += '					<input type="radio" name="memo_kind" class="radio_style" id="c1" value="답장" checked><label for="c1" class="type">답장</label>';
			returnHtml += '					<input type="hidden" name="memo_idx" value="'+data.idx+'">';
		}else{
			returnHtml += '					<input type="hidden" name="memo_idx" value="">';
			returnHtml += '					<input type="radio" name="memo_kind" class="radio_style" id="c1" value="문의" checked><label for="c1" class="type">문의</label>';
			returnHtml += '					<input type="radio" name="memo_kind" class="radio_style" id="c2" value="요청"><label for="c2" class="type">요청</label>';
			returnHtml += '					<input type="radio" name="memo_kind" class="radio_style" id="c3" value="불만"><label for="c3" class="type">불만</label>';
			returnHtml += '					<input type="radio" name="memo_kind" class="radio_style" id="c4" value="기타"><label for="c4" class="type">기타</label>';
		}
		returnHtml += '					 </div>';
		returnHtml += '				 </div>';





		returnHtml += '				<div class="content_input_line">';
		returnHtml += '					<textarea class="content_input" name="memo_data" placeholder="보내실 쪽지 내용을 입력해주세요."></textarea>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="content_input_line">';
		returnHtml += '				<span class="btn_submit" onclick="MOBILE_COMMON.MEMO.submitSendMemo(\'mobileSendMemoForm\');">보내기</span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</form>';
		returnHtml += '	</div>';


	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//마이페이지
MOBILE_TEMPLETE.CONNTAINER.m_mypage = {};

//마이페이지 : 구매 목록
MOBILE_TEMPLETE.CONNTAINER.m_mypage.buy_list = function(myId){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_mypage.buy_list', myId);
	if(isDefined(myId) == false){
		myId = 'buy_list';
	}
	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">내가 구매한 콘텐츠 </h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content '+myId+'">';

		returnHtml += '		<div class="f_tab_style mypage">';
		returnHtml += '			<span class="tab_btn active">구매 목록<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn" data-group="contents" data-id="wish_list" onclick="GO_MYPAGE(this);">찜 목록<span class="b_line"></span></span>';
		//returnHtml += '			<span class="tab_btn" data-group="channel" data-id="channel_list" onclick="GO_MYPAGE(this);">구독 채널<span class="b_line"></span></span>';
		//returnHtml += '			<span class="tab_btn">구독채널<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">구매한 콘텐츠는 48시간 무료로 다시보기가 가능합니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">방송사(MBC, KBS, EBS케이블)콘텐츠 및 제휴콘텐츠는 제휴사의 정책에 따라 24시간이내 정해진 횟수만 다시받기가 가능합니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">일부 제휴콘텐츠는 제휴사의 요청에 의해 PC와 모바일 구매내역이 연동되지 않습니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">구매한 목록이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="inner" style="">';
		returnHtml += '			<div class="content_slide_wrap txt_style sub_list type1  card_style">';
		returnHtml += '				<div class="c_list ">';
		returnHtml += '					<ul class="mypage-contents-'+myId+'" data-load="0">';
		returnHtml += '					</ul>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-mypage-'+myId+'-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="contents" data-id="'+myId+'" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-contents-'+myId+'" data-info="mobile-mypage-'+myId+'-page-end-spy" id="mobile-mypage-'+myId+'-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};

//마이페이지 : 찜 목록
MOBILE_TEMPLETE.CONNTAINER.m_mypage.wish_list = function(myId){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_mypage.wish_list');
	if(isDefined(myId) == false){
		myId = 'wish_list';
	}
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">찜한 콘텐츠 목록 </h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content '+myId+'">';
		returnHtml += '		<div class="f_tab_style mypage">';
		returnHtml += '			<span class="tab_btn" data-group="contents" data-id="buy_list" onclick="GO_MYPAGE(this);">구매 목록<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn active">찜 목록<span class="b_line"></span></span>';
		//returnHtml += '			<span class="tab_btn" data-group="channel" data-id="channel_list" onclick="GO_MYPAGE(this);">구독 채널<span class="b_line"></span></span>';
		//returnHtml += '			<span class="tab_btn">구독채널<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">찜한 영상은 30일간 보관되며 제재, 기간 만료 자료는 삭제됩니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">찜한 콘텐츠가 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="inner" style="">';
		returnHtml += '			<div class="">';
		returnHtml += '				<div class="content_i_style">';
		returnHtml += '					<ul class="mypage-contents-'+myId+'" data-load="0">';
		returnHtml += '					</ul>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-mypage-'+myId+'-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="contents" data-id="'+myId+'" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-contents-'+myId+'" data-info="mobile-mypage-'+myId+'-page-end-spy" id="mobile-mypage-'+myId+'-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};

//마이페이지 : 구독 채널 목록
MOBILE_TEMPLETE.CONNTAINER.m_mypage.channel_list = function(myId){
	if(isDefined(myId) == false){
		myId = 'channel_list';
	}

	var isActiveTabA = 'active';
	var isActiveTabB = '';
	var guideTxt = "친구로 추가된 판매자 분들이 최근 콘텐츠 리스트입니다.";
	if(myId == 'channel_management'){
		guideTxt = "구독하는 채널을 관리할 수 있습니다.";
		isActiveTabA = '';
		isActiveTabB = 'active';
	}



	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">구독하는 채널 목록 </h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content '+myId+'">';
		returnHtml += '		<div class="f_tab_style mypage">';
		returnHtml += '			<span class="tab_btn '+isActiveTabA+'" data-group="channel" data-id="channel_list" onclick="GO_MYPAGE(this);">구독 콘텐츠<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn '+isActiveTabB+'" data-group="channel" data-id="channel_management" onclick="GO_MYPAGE(this);">구독 채널 관리<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">'+guideTxt+'</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">구독하시는 채널이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		if(myId == 'channel_list'){
			returnHtml += '		<div class="mypage-channel-'+myId+'" data-load="0">';
			returnHtml += '		</div>';
		}else if(myId == 'channel_management'){
			returnHtml += '		<div class="inner" style="">';
			returnHtml += '			<div class="chl_admin_wrap">';
			returnHtml += '				<div class="chl_list">';
			returnHtml += '					<ul class="mypage-channel-'+myId+'" data-load="0">';
			returnHtml += '					</ul>';
			returnHtml += '				</div>';
			returnHtml += '			</div>';
			returnHtml += '		</div>';
		}

		returnHtml += '		<div class="page-end-spy mobile-mypage-'+myId+'-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="channel" data-id="'+myId+'" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-channel-'+myId+'" data-info="mobile-mypage-'+myId+'-page-end-spy" id="mobile-mypage-'+myId+'-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId, guideTxt, isActiveTabA, isActiveTabB = null;
   	}
};

//마이페이지 : 구독 채널 관리
MOBILE_TEMPLETE.CONNTAINER.m_mypage.channel_management = function(myId){
	var returnHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.channel_list(myId);
	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};


//마이페이지 : 회원정보 수정
MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_edit = function(myId){
	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">회원 정보 / 수정 </h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content info_edit">';
		returnHtml += '		<div class="mypage-info-info_edit" data-load="0">';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml,myId  = null;
   	}
};


//마이페이지 : 비밀번호 확인
MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_security = function(memberEmail, infoType){
	var returnHtml = '';
		if(isDefined(memberEmail)){
			//returnHtml += '<div class="f_content">';
			returnHtml += '	<div class="pw_check_wrap">';
			returnHtml += '		<p class="tit">비밀번호 확인</p>';
			returnHtml += '		<p class="txt">회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.</p>';
			returnHtml += '		<div class="input_wrap">';
			returnHtml += '			<form name="MobileMyPageInfoSecurityLoginForm" id="MobileMyPageInfoSecurityLoginForm">';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="email" name="member_email" class="input_style disabled" value="'+memberEmail+'" readonly="readonly" >';
			returnHtml += '				</div>';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="password" name="member_password" id="MobileMyPageInfoSecurityLoginForm_member_password"  autocomplete="new-password" class="input_style" placeholder="비밀번호">';
			returnHtml += '				</div>';
			returnHtml += '				<button type="button" class="btn_ok btn_submit" data-type="'+infoType+'" data-target="#MobileMyPageInfoSecurityLoginForm" onclick="MOBILE_PAGE.mypage.info.onclickSecurityLoginFormAction(this);">확인</button>';
			returnHtml += '			</form>';
			returnHtml += '		</div>';
			returnHtml += '		<div class="pw_notice_area">';
			returnHtml += '			<ul>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">회원 정보를 확인하고 수정할 수 있습니다.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">온플레이에서는 회원님의 개인정보를 신중히 취급하며, 회원님의 동의 없이는  기재하신 회원정보가 공개되지 않습니다.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">타인의 개인정보 도용 피해를 방지하기 위해 본인 확인 절차를 진행하고 있습니다.</span></li>';
			returnHtml += '			</ul>';
			returnHtml += '		</div>';
			returnHtml += '	</div>';
			//returnHtml += '</div>';
		}
	try{
	    return returnHtml;
    }finally {
			returnHtml, memberEmail, infoType = null;
   	}
};

//마이페이지 : 비밀번호 설정(set) 입력 폼
MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_set_passwd = function(memberEmail, infoType){
	var returnHtml = '';
		if(isDefined(memberEmail)){
			returnHtml += '	<div class="f_top">';
			returnHtml += '		<div class="inner">';
			returnHtml += '		<h1 class="f_tit">비밀번호 설정</h1>';
			returnHtml += '			<span class="btn_back" data-target="modal" data-loc="top" onclick="GO_BACK(this);"></span>';
			returnHtml += '		</div>';
			returnHtml += '	</div>';

			returnHtml += '<div class="f_content">';
			returnHtml += '	<div class="pw_check_wrap">';

			returnHtml += '		<div class="pw_notice_area top-notice">';
			returnHtml += '			<ul>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">비밀번호를 설정하면 SNS로 연동된 아이디나 이메일 주소를 이용하여 바로 로그인이 가능합니다.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">비밀번호는 영문, 숫자를 조합하여 8자리 이상으로 입력 가능합니다.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">비밀번호를 설정하여도 SNS 사이트의 비번은 변경되지 않습니다.</span></li>';
			returnHtml += '			</ul>';
			returnHtml += '		</div>';


			returnHtml += '		<div class="input_wrap pw_set_wrap">';
			returnHtml += '			<form name="MobileMypageUserSetPasswordForm" id="MobileMypageUserSetPasswordForm">';
			returnHtml += '				<input type="hidden" name="is_mobile" value="1">';
			returnHtml += '				<input type="hidden" name="user_email" value="'+memberEmail+'">';
			returnHtml += '				<input type="hidden" name="device_type" value="1">';


			returnHtml += '				<div class="line"> ';
			//returnHtml += '					<label for="" class="label_style">이메일 아이디</label> ';
			returnHtml += '					<p class="mail">'+memberEmail+'</p> ';
			returnHtml += '				</div> ';

			//returnHtml += '				<div class="input_line">';
			//returnHtml += '					<input type="password" name="user_old_passwd" autocomplete="new-password" value="" class="input_style" placeholder="현재 비밀번호">';
			//returnHtml += '				</div>';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="password" name="user_pass1" autocomplete="new-password" value="" class="input_style" placeholder="원하시는 비밀번호를 입력하세요"> ';
			returnHtml += '				</div>';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="password" name="user_pass2" autocomplete="new-password" value="" class="input_style" placeholder="비밀번호 확인"> ';
			returnHtml += '				</div>';
			returnHtml += '				<button type="button" class="btn_ok btn_submit" data-type="'+infoType+'" data-target="#MobileMypageUserSetPasswordForm" onclick="MOBILE_PAGE.mypage.info.onclickMobileSetUserNewPasswordFormAction(this);">설정하기</button>';
			returnHtml += '			</form>';
			returnHtml += '		</div>';


			returnHtml += '	</div>';
			returnHtml += '</div>';

		}
	try{
	    return returnHtml;
    }finally {
			returnHtml, memberEmail, infoType = null;
   	}
};

//마이페이지 : 비밀번호 변경(change) 입력 폼
MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_change_passwd = function(memberEmail, infoType){
	var returnHtml = '';
		if(isDefined(memberEmail)){
			returnHtml += '	<div class="f_top">';
			returnHtml += '		<div class="inner">';
			returnHtml += '		<h1 class="f_tit">비밀번호 변경 </h1>';
			returnHtml += '			<span class="btn_back" data-target="modal" data-loc="top" onclick="GO_BACK(this);"></span>';
			returnHtml += '		</div>';
			returnHtml += '	</div>';

			returnHtml += '<div class="f_content">';
			returnHtml += '	<div class="pw_check_wrap">';

			returnHtml += '		<div class="pw_notice_area top-notice">';
			returnHtml += '			<ul>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">현재 비밀번호를 입력한 후 새롭게 사용할 비밀번호를 입력하세요.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">비밀번호는 영문, 숫자를 조합하여 8자리 이상으로 입력 가능합니다.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">전화번호, 생년월일, 연속 또는 반복되는 숫자 등 타인이 쉽게 알 수 있는 번호는 피해주세요.</span></li>';
			returnHtml += '			</ul>';
			returnHtml += '		</div>';

			returnHtml += '		<div class="input_wrap">';
			returnHtml += '			<form name="MobileMypageUserChangePasswordForm" id="MobileMypageUserChangePasswordForm">';
			returnHtml += '				<input type="hidden" name="is_mobile" value="1"> ';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="password" name="user_old_passwd" autocomplete="new-password" value="" class="input_style" placeholder="현재 비밀번호">';
			returnHtml += '				</div>';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="password" name="user_new_passwd" autocomplete="new-password" value="" class="input_style" placeholder="변경하실 비밀번호"> ';
			returnHtml += '				</div>';
			returnHtml += '				<div class="input_line">';
			returnHtml += '					<input type="password" name="user_new_passwd2" autocomplete="new-password" value="" class="input_style" placeholder="변경하실 비밀번호 확인"> ';
			returnHtml += '				</div>';
			returnHtml += '				<button type="button" class="btn_ok btn_submit" data-type="'+infoType+'" data-target="#MobileMypageUserChangePasswordForm" onclick="MOBILE_PAGE.mypage.info.onclickMobileChangeUserPasswordFormAction(this);">변경하기</button>';
			returnHtml += '			</form>';
			returnHtml += '		</div>';

			returnHtml += '	</div>';
			returnHtml += '</div>';

		}
	try{
	    return returnHtml;
    }finally {
			returnHtml, memberEmail, infoType = null;
   	}
};

//마이페이지 : 회원탈퇴 입력폼
MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_secession = function(memberEmail, infoType){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_mypage.info_secession');
	console.log(memberEmail);

	if(isDefined(memberEmail) == false){
		return '';
	}

	var snsHost = getIsChannelEmailHost(memberEmail);
	console.log('snsHost', snsHost);

	var show_sns_title = '';
	if(isDefined(snsHost)){
		show_sns_title = snsHost.toUpperCase()+' 간편가입';
	}else{
		snsHost = '';
	}


	var returnHtml = '';
		if(isDefined(memberEmail)){
			returnHtml += '	<div class="f_top">';
			returnHtml += '		<div class="inner">';
			returnHtml += '		<h1 class="f_tit">회원 탈퇴</h1>';
			returnHtml += '			<span class="btn_back" data-target="modal" data-loc="top" onclick="GO_BACK(this);"></span>';
			returnHtml += '		</div>';
			returnHtml += '	</div>';

			returnHtml += '<div class="f_content">';
			returnHtml += '	<div class="pw_check_wrap">';

			returnHtml += '		<div class="pw_notice_area top-notice">';
			returnHtml += '			<ul>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">회원을 탈퇴하시면 해당 아이디로는 재가입 하실 수 없습니다.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">보유하고 계신 포인트와 쿠폰이 모두 소멸되며, 복구가 불가능 하오니 신중하게 선택해주십시오.</span></li>';
			returnHtml += '				<li><span class="dot"></span><span class="txt">탈퇴 후 재가입 하셔도 포인트 및 쿠폰은 재발급 되지 않습니다.</span></li>';
			returnHtml += '			</ul>';
			returnHtml += '		</div>';

			returnHtml += '		<div class="input_wrap">';
			returnHtml += '			<form name="mobileMypageUserSecessionActionForm" id="mobileMypageUserSecessionActionForm">';
			returnHtml += '				<input type="hidden" name="sns_host" value="'+snsHost+'">';
			returnHtml += '				<input type="hidden" name="is_mobile" value="1"> ';
			if(isDefined(snsHost) == true && isDefined(show_sns_title) == true){
			returnHtml += '				<div class="input_line">';
				returnHtml += '				<input type="text" name="sns_title" class="input_style" value="'+show_sns_title+'" disabled>';
				returnHtml += '			</div>';
				returnHtml += '			<div class="input_line">';
				returnHtml += '				<input type="email" name="user_email" class="input_style disabled" value="'+memberEmail+'" readonly="readonly" >';
				returnHtml += '			</div>';
				returnHtml += '			<input type="hidden" name="user_passwd" value="'+snsHost+'" />';
			}else{
				returnHtml += '			<div class="input_line">';
				returnHtml += '				<input type="email" name="user_email" class="input_style disabled" value="'+memberEmail+'" readonly="readonly" >';
				returnHtml += '			</div>';
				returnHtml += '			<div class="input_line">';
				returnHtml += '				<input type="password" name="user_passwd" autocomplete="new-password" value="" class="input_style" placeholder="비밀번호"> ';
				returnHtml += '			</div>';
			}
			returnHtml += '				<button type="button" class="btn_ok btn_submit" data-type="'+infoType+'" data-target="#mobileMypageUserSecessionActionForm" onclick="MOBILE_PAGE.mypage.info.onclickMobileUserLeaveFormAction(this);">회원 탈퇴하기</button>';
			returnHtml += '			</form>';
			returnHtml += '		</div>';

			returnHtml += '	</div>';
			returnHtml += '</div>';

		}
	try{
	    return returnHtml;
    }finally {
			returnHtml, memberEmail, infoType, snsHost, show_sns_title = null;
   	}
};

//마이페이지 : 포인트 적립 내역
MOBILE_TEMPLETE.CONNTAINER.m_mypage.charge_list = function(myId){
	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="select_page_wrap mobile-mypage-point-header-select">';
		returnHtml += '			<div class="click_area" onclick="$(\'.mobile-mypage-point-header-select\').toggleClass(\'active\');">';
		returnHtml += '				<span class="txt">결제(충전) 내역</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="click_v_area">';
		returnHtml += '				<ul>';
		returnHtml += '					<li class="active" data-group="point" data-id="charge_list" onclick="GO_MYPAGE(this);"><span>충전(결제) 내역</span></li>';
		returnHtml += '					<li data-group="point" data-id="point_list" onclick="GO_MYPAGE(this);"><span>포인트 적립/사용 내역</span></li>';
		returnHtml += '					<li data-group="point" data-id="mileage_list" onclick="GO_MYPAGE(this);"><span>마일리지 사용 내역</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';

/*
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">포인트 적립 및 사용 내역 </h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
*/
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content charge_list">';
		/*
		returnHtml += '		<div class="f_tab_style mypage">';
		returnHtml += '			<span class="tab_btn active" data-group="contents" data-id="buy_list" onclick="GO_MYPAGE(this);">적립 내역<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn" data-group="contents" data-id="wish_list" onclick="GO_MYPAGE(this);">사용 내역<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">최근 1년간 결제 내역을 확인하실 수 있습니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">적립된 포인트 세부 내역은 더보기를 클릭해주세요.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">적립/사용 내역이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="my_charge_list mypage-point-list">';
		returnHtml += '			<div class="list_style type3">';
		returnHtml += '				<ul>';
		returnHtml += '					<li class="top">';
		returnHtml += '						<div class="l1">날짜</div>';
		returnHtml += '						<div class="l2">결제 상품명</div>';
		//returnHtml += '						<div class="l3">결제방법</div>';
		returnHtml += '						<div class="l3">상태</div>';
		returnHtml += '					</li>';
		returnHtml += '				</ul>';
		returnHtml += '				<ul class="mypage-point-charge_list" data-load="0">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';


		returnHtml += '		<div class="page-end-spy mobile-mypage-charge_list-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="point" data-id="charge_list" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-point-charge_list" data-info="mobile-mypage-charge_list-page-end-spy" id="mobile-mypage-charge_list-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};


//마이페이지 : 포인트 적립/사용 내역
MOBILE_TEMPLETE.CONNTAINER.m_mypage.point_list = function(myId){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_mypage.point_list', myId);

	if(isDefined(myId) == false){
		myId = 'point_list';
	}

	var isActiveTabA = 'active';
	var isActiveTabB = '';
	var listTitle = "적립";
	if(myId == 'point_used'){
		isActiveTabA = '';
		isActiveTabB = 'active';
		listTitle = "사용";
	}

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="select_page_wrap mobile-mypage-point-header-select">';
		returnHtml += '			<div class="click_area" onclick="$(\'.mobile-mypage-point-header-select\').toggleClass(\'active\');">';
		returnHtml += '				<span class="txt">포인트 적립/사용 내역</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="click_v_area">';
		returnHtml += '				<ul>';
		returnHtml += '					<li data-group="point" data-id="charge_list" onclick="GO_MYPAGE(this);"><span>충전(결제) 내역</span></li>';
		returnHtml += '					<li class="active" data-group="point" data-id="point_list" onclick="GO_MYPAGE(this);"><span>포인트 적립/사용 내역</span></li>';
		returnHtml += '					<li data-group="point" data-id="mileage_list" onclick="GO_MYPAGE(this);"><span>마일리지 사용 내역</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content '+myId+'">';
		returnHtml += '		<div class="f_tab_style mypage">';
		returnHtml += '			<span class="tab_btn '+isActiveTabA+'" data-group="point" data-id="point_list" onclick="GO_MYPAGE(this);">적립 내역<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn '+isActiveTabB+'" data-group="point" data-id="point_used" onclick="GO_MYPAGE(this);">사용 내역<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">쿠폰은 콘텐츠 금액에 관계없이 최대 10GB 콘텐츠를 무료로 다운로드 할 수 있습니다. (제휴콘텐츠 제외)</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">캐시 포인트 적립 내역은 결제/충전 내역에서 확인 가능합니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">적립/사용 내역이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="my_charge_list mypage-point-list">';
		returnHtml += '			<div class="list_style">';
		returnHtml += '				<ul>';
		returnHtml += '					<li class="top">';
		returnHtml += '						<div class="l1">날짜</div>';
		returnHtml += '						<div class="l2">'+listTitle+'내역</div>';
		returnHtml += '						<div class="l3">구분</div>';
		returnHtml += '						<div class="l4">'+listTitle+'</div>';
		returnHtml += '					</li>';
		returnHtml += '				</ul>';
		returnHtml += '				<ul class="mypage-point-'+myId+'" data-load="0">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-mypage-'+myId+'-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="point" data-id="'+myId+'" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-point-'+myId+'" data-info="mobile-mypage-'+myId+'-page-end-spy" id="mobile-mypage-'+myId+'-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId, isActiveTabA, isActiveTabB = null;
   	}
};



//마이페이지 : 포인트 적립/사용 내역
MOBILE_TEMPLETE.CONNTAINER.m_mypage.point_used = function(myId){
	var returnHtml = MOBILE_TEMPLETE.CONNTAINER.m_mypage.point_list(myId);
	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};


//마이페이지 : 마일리지 적립/사용 내역
MOBILE_TEMPLETE.CONNTAINER.m_mypage.mileage_list = function(myId){
	var returnHtml = '';

		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="select_page_wrap mobile-mypage-point-header-select">';
		returnHtml += '			<div class="click_area" onclick="$(\'.mobile-mypage-point-header-select\').toggleClass(\'active\');">';
		returnHtml += '				<span class="txt">마일리지 사용 내역</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="click_v_area">';
		returnHtml += '				<ul>';
		returnHtml += '					<li data-group="point" data-id="charge_list" onclick="GO_MYPAGE(this);"><span>충전(결제) 내역</span></li>';
		returnHtml += '					<li data-group="point" data-id="point_list" onclick="GO_MYPAGE(this);"><span>포인트 적립/사용 내역</span></li>';
		returnHtml += '					<li class="active" data-group="point" data-id="mileage_list" onclick="GO_MYPAGE(this);"><span>마일리지 사용 내역</span></li>';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';;
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content mileage_list">';
		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">마일리지 전환 보너스포인트로 지급이 되며 사용기간은 30일 입니다.</span></li>';
		//returnHtml += '				<li><span class="dot"></span><span class="txt">온플레이 마일리지는 온플레이 내에서만 이용이 가능하며, 타 사이트에서는 이용할 수 없습니다.</span></li>';
		//returnHtml += '				<li><span class="dot"></span><span class="txt">마일리지는 포인트 충전 서비스에 한해 적립되며, 정액제 상품은 마일리지가 적립되지 않습니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">이미 사용된 마일리지는 환불, 취소 및 서비스 변경이 되지 않습니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">온플레이 마일리지는 5,000점 이상일 때 사용하며, 마일리지로 결제시 마일리지는 적립되지 않습니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">적립/사용 내역이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="my_charge_list mypage-point-list">';
		returnHtml += '			<div class="list_style">';
		returnHtml += '				<ul>';
		returnHtml += '					<li class="top">';
		returnHtml += '						<div class="l1">날짜</div>';
		returnHtml += '						<div class="l2">사용 내역</div>';
		returnHtml += '						<div class="l3">구분</div>';
		returnHtml += '						<div class="l4">소모M</div>';
		returnHtml += '					</li>';
		returnHtml += '				</ul>';
		returnHtml += '				<ul class="mypage-point-mileage_list" data-load="0">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-mypage-mileage_list-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="point" data-id="mileage_list" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-point-mileage_list" data-info="mobile-mypage-mileage_list-page-end-spy" id="mobile-mypage-mileage_list-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};

//마이페이지 : News
MOBILE_TEMPLETE.CONNTAINER.m_mypage.news = function(myId){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_mypage.news');
	if(isDefined(myId) == false){
		myId = 'news';
	}
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">새소식</h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content '+myId+'">';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">도착한 새소식이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="inner" style="">';
		returnHtml += '			<div class="">';
		returnHtml += '				<div class="content_i_style news">';
		returnHtml += '					<ul class="mypage-news-'+myId+'" data-load="0">';

		returnHtml += '					</ul>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-mypage-'+myId+'-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="news" data-id="'+myId+'" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-contents-'+myId+'" data-info="mobile-mypage-'+myId+'-page-end-spy" id="mobile-mypage-'+myId+'-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};

//마이페이지 : Memo - receive
MOBILE_TEMPLETE.CONNTAINER.m_mypage.memo_send = function(myId){
	return MOBILE_TEMPLETE.CONNTAINER.m_mypage.memo_receive(myId);
}

//마이페이지 : Memo - receive
MOBILE_TEMPLETE.CONNTAINER.m_mypage.memo_receive = function(myId){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_mypage.memo');
	if(isDefined(myId) == false){
		myId = 'memo';
	}
	var receiveActive = 'active';
	var sendActive = '';
	var pageSubTit = '읽지 않은 쪽지';
	if(myId == 'memo_send'){
		receiveActive = '';
		sendActive = 'active';
		pageSubTit = '보낸 쪽지';
	}

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '		<h1 class="f_tit">쪽지</h1>';
		returnHtml += '		<span class="btn_back" data-target="mypage" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content '+myId+'">';
		returnHtml += '		<div class="f_tab_style mypage">';
		returnHtml += '			<span class="tab_btn '+receiveActive+'" data-group="news" data-id="memo_receive" onclick="GO_MYPAGE(this);">받은 쪽지<span class="b_line"></span></span>';
		returnHtml += '			<span class="tab_btn '+sendActive+'" data-group="news" data-id="memo_send" onclick="GO_MYPAGE(this);">보낸 쪽지<span class="b_line"></span></span>';
		returnHtml += '		</div>';
		//returnHtml += '		<div class="my_top_txt">';
		//returnHtml += '			<ul>';
		//returnHtml += '				<li><span class="dot"></span><span class="txt">쪽지는 최근 30일간 보관됩니다.</span></li>';
		//returnHtml += '			</ul>';
		//returnHtml += '		</div>';


		returnHtml += '		<div class="note_num_area">';
		returnHtml += '			<span class="txt" style="float: left;">쪽지는 최근 30일간 보관됩니다.</span><p class="txt">'+pageSubTit+' <span class="num_style '+myId+' memo-tot-cnt">0</span>개</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">'+pageSubTit+'가 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="inner" style="">';
		returnHtml += '			<div class="f_tab_list_wrap">';
		returnHtml += '				<div class="txt_list_style note">';
		returnHtml += '					<ul class="mypage-news-'+myId+'" data-load="0">';
		returnHtml += '					</ul>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-mypage-'+myId+'-page-end-spy loading" onclick="MOBILE_PAGE.mypage.onclickMoreMobileData(this);" data-group="news" data-id="'+myId+'" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="" data-target="mypage-contents-'+myId+'" data-info="mobile-mypage-'+myId+'-page-end-spy" id="mobile-mypage-'+myId+'-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, myId = null;
   	}
};


//coupon
MOBILE_TEMPLETE.CONNTAINER.coupon = function(info, hashs){
	var returnHtml = '';
		returnHtml += '<div class="f_top">';
		returnHtml += '	<div class="inner">';
		returnHtml += '		<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '		<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<div class="f_content">';
		returnHtml += '	<div class="inner mobile-coupon-main-list-wrap"></div>';
		returnHtml += '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml,info, hashs  = null;
   	}
};

//요청 자료 : 리스트
MOBILE_TEMPLETE.CONNTAINER.request_list = function(info, hashs){

	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var cateKey, cateStr;
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_tab_style top_style mypage">';
		returnHtml += '		<span class="tab_btn request-list-top-tab type-0 active" data-group="request" data-id="request-list" data-type="0" data-info="mobile-request-list-page-end-spy" onclick="MOBILE_PAGE.request_list.onclickRequestTypeTab(this);">전체<span class="b_line"></span></span>';
		returnHtml += '		<span class="tab_btn request-list-top-tab type-1" data-group="request" data-id="request-list" data-type="1" data-info="mobile-request-list-page-end-spy" onclick="MOBILE_PAGE.request_list.onclickRequestTypeTab(this);">등록완료<span class="b_line"></span></span>';
		returnHtml += '		<span class="tab_btn request-list-top-tab type-2" data-group="request" data-id="request-list" data-type="2" data-info="mobile-request-list-page-end-spy" onclick="MOBILE_PAGE.request_list.onclickRequestTypeTab(this);">요청중<span class="b_line"></span></span>';
		returnHtml += '		<span class="tab_btn request-list-top-tab type-my" data-group="request" data-id="request-my-list" data-type="my" data-info="mobile-request-list-page-end-spy" onclick="MOBILE_PAGE.request_list.onclickRequestTypeTab(this);">마이요청<span class="b_line"></span></span>';
		returnHtml += '	</div>';

		returnHtml += '	<div class="f_content has-sub-menu request-list">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<form name="mobileRequestListSearchForm" id="mobileRequestListSearchForm" method="POST">';
		returnHtml += '				<div class="f_search_input_wrap">';
		returnHtml += '					<div class="input_area">';
		returnHtml += '						<input type="text" class="s_input" name="req_search" id="mobileRequestListSearchForm_req_search">';
		returnHtml += '						<button class="btn_search" type="button"></button>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '			</form>';

		returnHtml += '			<div class="cate_chioce_wrap style1">';

		returnHtml += '				<div class="choice_area size1 choice-category-area">';
		returnHtml += '					<div class="click_area" onclick="MOBILE_PAGE.request_list.onclickOpenCategoryList(this);">';
		returnHtml += '						<p class="request-selected-category-tit">카테고리 선택</p>';
		returnHtml += '						<span class="ico_arrow"></span>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="list_area">';
		returnHtml += '						<ul>';
		returnHtml += '							<li class="request-list-category category-sub-0" data-target="mobile-request-list-main-list-wrap" data-info="mobile-request-list-page-end-spy" data-key="0" data-name="전체" onclick="MOBILE_PAGE.request_list.onclickSelectCategoryItem(this);"><span class="depth2">전체</span></li>';
		for(var ci in diskCategory.show_mobile_top_category_list){
			cateKey = diskCategory.show_mobile_top_category_list[ci];
			if(cateKey > 30000){
				continue;
			}
			cateStr = diskCategory.get_cate_name(cateKey);
			returnHtml += '						<li class="request-list-category category-sub-'+cateKey+'" data-target="mobile-request-list-main-list-wrap" data-info="mobile-request-list-page-end-spy" data-key="'+cateKey+'" data-name="'+cateStr+'" onclick="MOBILE_PAGE.request_list.onclickSelectCategoryItem(this);"><span class="depth2">'+cateStr+'</span></li>';
		}
		returnHtml += '						</ul>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';

		returnHtml += '				<span class="btn_up" onclick="MOBILE_PAGE.request.openRequestWriteForm(this);"><span class="ico"></span>글쓰기</span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="txt_list_style request">';
		returnHtml += '				<ul class="mobile-request-list-main-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">조건에 만족하는 게시물이 없습니다.<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page_move_btn_wrap pagnation" id="mobile-request-list-page-end-spy" data-my="" data-type="0" data-search="" data-id="request-list" data-page="0" data-total_page="1" data-loaded="0" data-cate1="0" data-target="mobile-request-list-main-list-wrap" data-info="mobile-request-list-page-end-spy" data-load="0" data-loaded="0" data-limit="20">';
		returnHtml += '			<span class="btn prev d-btn btn-request-list disabled" data-info="mobile-request-list-page-end-spy" data-action="prev" ></span>';
		//returnHtml += '			<span class="num_btn active btn-request-list now_page"></span>';
		returnHtml += '			<span class="btn next d-btn btn-request-list" data-info="mobile-request-list-page-end-spy" data-action="next"></span>';
		returnHtml += '		</div>';

		//info ele
		/*
		returnHtml += '		<div class="page-end-spy mobile-request-list-page-end-spy loading" onclick="MOBILE_PAGE.request_list.onclickMoreMobileRequestData(this);" data-my="" data-type="0" data-search="" data-id="request-list" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-cate1="0" data-target="mobile-request-list-main-list-wrap" data-info="mobile-request-list-page-end-spy" id="mobile-request-list-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		*/
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};



//요청 자료 : 글쓰기
MOBILE_TEMPLETE.CONNTAINER.request_write_form = function(reqData){
	console.log('MOBILE_TEMPLETE.CONNTAINER.request_write_form', reqData);
	var containerTitle = "자료요청 글쓰기";
	var req_cate = '';
	var req_cate_name = '분류를 선택하세요.';
	var req_edit = 0;
	var req_idx = '';
	var req_title = '';
	var req_contents = '';
	if(isDefined(reqData) == true){
		containerTitle = "자료요청 글수정";
		req_cate = reqData.show_bbs_category;
		req_cate_name = reqData.show_board_cate_name;
		req_edit = 1;
		req_idx = reqData.bbs_board_idx;
		req_title = reqData.show_board_title;
		req_contents = reqData.show_board_cotnets_detail;
		req_contents = req_contents.replace(/(<br>|<br\/>|<br \/>)/g, '');

	}
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var cateKey, cateStr;

	var returnHtml = '';
		returnHtml += '<div class="board-detail-modal-view-wrap" id="board-detail-modal-view-wrap-request-write-form">';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit event">'+containerTitle+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="modal" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content request-write">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<form name="mobileBoardReqWriteForm" id="mobileBoardReqWriteForm" method="post">';
		returnHtml += '			<input type="hidden" name="req_cate" id="mobileBoardReqWriteForm_req_cate" value="'+req_cate+'" />';
		returnHtml += '			<input type="hidden" name="req_edit" id="mobileBoardReqWriteForm_req_edit" value="'+req_edit+'" />';
		returnHtml += '			<input type="hidden" name="req_idx" id="mobileBoardReqWriteForm_req_idx" value="'+req_idx+'" />';


		returnHtml += '			<div class="cate_chioce_wrap style1">';
		returnHtml += '				<div class="choice_area size2 write-choice-category-area">';
		returnHtml += '					<div class="click_area" onclick="MOBILE_PAGE.request_write.onclickOpenWriteCategoryList(this);">';
		returnHtml += '						<p class="request-selected-category-tit">'+req_cate_name+'</p>';
		returnHtml += '						<span class="ico_arrow"></span>';
		returnHtml += '					</div>';
		returnHtml += '					<div class="list_area">';
		returnHtml += '						<ul>';
		for(var ci in diskCategory.show_mobile_top_category_list){
			cateKey = diskCategory.show_mobile_top_category_list[ci];
			if(cateKey > 30000){
				continue;
			}
			cateStr = diskCategory.get_cate_name(cateKey);
			returnHtml += '						<li class="request-list-category category-sub-'+cateKey+'" data-target="mobile-request-list-main-list-wrap" data-info="mobile-request-list-page-end-spy" data-key="'+cateKey+'" data-name="'+cateStr+'" onclick="MOBILE_PAGE.request_write.onclickWriteSelectCategoryItem(this);"><span>'+cateStr+'</span></li>';
		}
		returnHtml += '						</ul>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';

		returnHtml += '				<div class="input-err-msg req_cate">분류를 선택하세요.</div>';

		returnHtml += '				<div class="tit_input_wrap">';
		returnHtml += '					<input name="req_title" id="mobileBoardReqWriteForm_req_title" minlength="10" maxlength="100" type="text" class="input_area" placeholder="요청하시는 자료의 제목을 작성하세요" value="'+req_title+'" >';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input-err-msg req_title">제목을 10자이상 입력해 주세요.</div>';
		returnHtml += '			</div>';

		returnHtml += '			<div class="content_input_wrap">';
		returnHtml += '				<textarea name="req_contents" id="mobileBoardReqWriteForm_req_contents" class="content_input" placeholder="내용을 작성해 주세요 : 내용을 자세히 적어주시면 채널 담당자들이 좀더 쉽게 요청에 대해 응답을 드릴 수 있습니다.">'+req_contents+'</textarea>';
		returnHtml += '				<div class="input-err-msg req_contents abs">내용을 20자이상 입력해 주세요.</div>';
		returnHtml += '				<button class="btn_submit" type="submit">등록</button>';
		returnHtml += '			</div>';
		returnHtml += '			</form>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="r_notice">';
		returnHtml += '			<p class="tit">파일 요청 전 읽어주세요!</p>';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">파일 요청을 할 때에는 정확한 제목이나 내용을 작성해야 합니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">파일 요청은 하루에 3회만 가능합니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
		returnHtml += '<footer class="footer empty mobile-footer mobile-footer-common show" id="mobile-footer-modal-0">';
		returnHtml += '	<div style="min-height: 1px;">';
		returnHtml += '		&nbsp;';
		returnHtml += '	</div>';
		returnHtml += '</footer>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//cs tab - common
MOBILE_TEMPLETE.CONNTAINER.cs_tab = function(activeTab){
	console.log('MOBILE_TEMPLETE.CONNTAINER.cs_tab', activeTab);
	var isActiveTabNotice = '';
	var isActiveTabNews = '';
	var isActiveTabFaq = '';
	if(activeTab == 'notice'){
		isActiveTabNotice = 'active';
	}else if(activeTab == 'news'){
		isActiveTabNews = 'active';
	}else if(activeTab == 'faq'){
		isActiveTabFaq = 'active';
	}

	var returnHtml = '';
		returnHtml += '	<div class="f_tab_style top_style mypage">';
		returnHtml += '		<span class="tab_btn cs-list-top-tab type-notice '+isActiveTabNotice+'" onclick="GO_MENU(\'notice\');">공지사항<span class="b_line"></span></span>';
		returnHtml += '		<span class="tab_btn cs-list-top-tab type-news '+isActiveTabNews+'" onclick="GO_MENU(\'news\');">새소식<span class="b_line"></span></span>';
		returnHtml += '		<span class="tab_btn cs-list-top-tab type-faq '+isActiveTabFaq+'" onclick="GO_MENU(\'faq\');">자주하는 질문<span class="b_line"></span></span>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, activeTab, isActiveTabNotice, isActiveTabNews, isActiveTabFaq = null;
   	}
}

//cs tail - common
MOBILE_TEMPLETE.CONNTAINER.cs_tail = function(activeTab){
	var csGroup = 'cs';
	if(activeTab == 'faq'){
		csGroup = 'member';
	}
	var returnHtml = '';
		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">조건에 만족하는 게시물이 없습니다.<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page_move_btn_wrap pagnation" id="mobile-'+activeTab+'-list-page-end-spy" data-my="" data-type="0" data-group="'+csGroup+'" data-search="" data-id="'+activeTab+'-list" data-page="0" data-total_page="1" data-loaded="0" data-cate1="0" data-target="mobile-'+activeTab+'-list-main-list-wrap" data-info="mobile-'+activeTab+'-list-page-end-spy" data-load="0" data-limit="10">';
		returnHtml += '			<span class="btn prev d-btn btn-'+activeTab+'-list disabled" data-info="mobile-'+activeTab+'-list-page-end-spy" data-action="prev" ></span>';
		//returnHtml += '			<span class="num_btn active btn-'+activeTab+'-list now_page"></span>';
		returnHtml += '			<span class="btn next d-btn btn-'+activeTab+'-list" data-info="mobile-'+activeTab+'-list-page-end-spy" data-action="next"></span>';
		returnHtml += '		</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, activeTab, csGroup = null;
   	}
}

//cs board : notice
MOBILE_TEMPLETE.CONNTAINER.notice = function(info, hashs){
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.cs_tab(info.id);


		returnHtml += '	<div class="f_content has-sub-menu mobile-cs-list mobile-cs-list-notice">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<div class="txt_list_style">';
		returnHtml += '				<ul class="mobile-notice-list-main-list-wrap">';
		/*
		for(var i =0; i < 10; i++){
			returnHtml += '					<li class="l_section mobile-cs-list-item mobile-notice-list-item">';
			returnHtml += '						<div class="tit_area">';
			returnHtml += '							<p class="txt_over"><span class="type">[제휴]</span> <span class="txt">결제 후 다운로드 하는 방법/바로보기</span></p>';
			returnHtml += '							<span class="ico_arrow"></span>';
			returnHtml += '						</div>';
			returnHtml += '					</li>';
		}
		*/
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml +=		MOBILE_TEMPLETE.CONNTAINER.cs_tail(info.id);
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};

//cs board : news
MOBILE_TEMPLETE.CONNTAINER.news = function(info, hashs){
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.cs_tab(info.id);


		returnHtml += '	<div class="f_content has-sub-menu mobile-cs-list mobile-cs-list-news ending">';
		/*
		returnHtml += '		<div class="inner">';
		returnHtml += '			<div class="txt_list_style news">';
		returnHtml += '				<ul class="mobile-news-list-main-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="content_i_style news">';
		returnHtml += '				<ul class="mobile-news-list-main-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">조건에 만족하는 게시물이 없습니다.<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '			<div class="end_area">';
		returnHtml += ' 			<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};

//cs board : faq
MOBILE_TEMPLETE.CONNTAINER.faq = function(info, hashs){
	var faqCategoryList = utility.disk.getFaqCategoryList();
	var faqCate;

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml +=	MOBILE_TEMPLETE.CONNTAINER.cs_tab(info.id);
		returnHtml += '	<div class="f_content has-sub-menu mobile-cs-list mobile-cs-list-faq">';
		//search form
		returnHtml += '		<div class="f_search_input_wrap">';
		returnHtml += '			<div class="input_area">';
		returnHtml += '				<form name="mobileCsFaqSearchForm" class="mobileCsFaqSearchForm" method="POST">';
		returnHtml += '					<input type="text" name="faq_search" id="mobileCsFaqSearchForm_faq_search" class="s_input" placeholder="단어나 문장을 입력해주세요"><span class="btn_search"></span>';
		returnHtml += '				</form>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		//sub cate
		returnHtml += '		<div class="cate_box cs-faq-sub-category" data-val="">';
		returnHtml += '			<div class="now_cate" data-target="cs-faq-sub-category" onclick="MOBILE_PAGE.faq.onclickShowFaqSubCategory(this);">';
		returnHtml += '				<span class="sub-tit faq-selected-category-tit">FAQ 카테고리를 선택하세요</span><span class="arrow"></span>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="depth_choice">';
		returnHtml += '				<ul>';
		returnHtml += '						<li class="faq-category-list" data-target="mobile-faq-list-main-list-wrap" data-info="mobile-faq-list-page-end-spy" data-key="ALL" data-name="전체 FAQ" onclick="MOBILE_PAGE.faq.onclickFaqSelectCategoryItem(this);"><span>전체 FAQ</span></li>';
		for(var ci in faqCategoryList){
			faqCate = faqCategoryList[ci];
			returnHtml += '						<li class="faq-category-list" data-target="mobile-faq-list-main-list-wrap" data-info="mobile-faq-list-page-end-spy" data-key="'+faqCate.n+'" data-name="'+faqCate.v+'" onclick="MOBILE_PAGE.faq.onclickFaqSelectCategoryItem(this);"><span>'+faqCate.v+'</span></li>';
		}
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<div class="txt_list_style faq">';
		returnHtml += '				<ul class="mobile-faq-list-main-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml +=		MOBILE_TEMPLETE.CONNTAINER.cs_tail(info.id);
		returnHtml += '	</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs, faqCategoryList, faqCate = null;
   	}
};


//cs board : qa
MOBILE_TEMPLETE.CONNTAINER.qa = function(info, hashs){
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content onetoone mobile-cs-list mobile-cs-list-qa">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<div class="txt_list_style qa onetoone">';
		returnHtml += '				<div class="top_btn_wrap">';
		returnHtml += '					<span class="btn_qna" onclick="MOBILE_PAGE.qa.openMobileBoardWriteFormView();"><span class="ico"></span>문의하기</span>';
		returnHtml += '				</div>';
		returnHtml += '				<ul class="mobile-qa-list-main-list-wrap">';
		returnHtml += '				</ul>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">등록된 문의 내역이 없습니다.<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="page-end-spy mobile-cs-qa-list-page-end-spy loading" onclick="MOBILE_PAGE.qa.onclickMoreMobileData(this);" data-group="one" data-search="" data-type="0" data-cate1="0" data-page="0" data-load="0" data-total_page="1" data-loaded="0" data-target="mobile-qa-list-main-list-wrap" data-info="mobile-cs-qa-list-page-end-spy" id="mobile-cs-qa-list-page-end-spy">';
		returnHtml += '			<div class="end_area">';
		returnHtml += '				<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="ing_area">';
		returnHtml += '				<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml, info, hashs = null;
   	}
};


//쪽지 - 쪽지 보내기
MOBILE_TEMPLETE.CONNTAINER.qa_write = function(data){
	console.log('MOBILE_TEMPLETE.CONNTAINER.qa_write', data);

	var qaTypeList = [ {val : '회원정보', name : '회원정보'}, {val : '장애오류', name : '장애 및 오류'},{val : '콘텐츠다운로드', name : '콘텐츠 다운로드'},{val : '결제관련', name : '충전 및 결제관련'},{val : '판매자채널', name : '판매자채널 관련'},{val : '기타', name : '신고 및 기타'} ];

	var returnHtml = '';


		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">문의하기</h1>';
		returnHtml += '			<span class="btn_back" data-target="modal" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content qa-write">';

		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">서비스 사용 중 오류를 발견하셨거나 서비스에 대해 궁금하신 점을 보내주세요</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">문의하신 내용을 검토한 후 빠른 시간 내 답변 드리겠습니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">문의 내용 중 욕설, 성희롱, 인격비하 등의 내용이 포함된 경우, 상담이 제한될 수 있습니다</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';


		returnHtml += '		<form name="MobileCsQaWriteForm" id="MobileCsQaWriteForm" method="post">';
		returnHtml += '		<input type="hidden" name="qa_category" value=""/>';
		returnHtml += '		<div class="inner one_to_one">';
		returnHtml += '			<div class="one_to_one_input">';
		returnHtml += '				<div class="input_line">';
		returnHtml += '					<div class="choice_area size3 qa-type-select-area">';
		returnHtml += '						<div class="click_area" data-target=".qa-type-select-area" onclick="MOBILE_PAGE.qa_write.onclickOpenQaTypeSelectBox(this);">';
		returnHtml += '							<p class="qa-type-selected-show-txt">상담유형을 선택해주세요.</p>';
		returnHtml += '							<span class="ico_arrow"></span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="list_area">';
		returnHtml += '							<ul>';
		for(var qc in qaTypeList){
			returnHtml += '							<li data-val="'+qaTypeList[qc].val+'" data-name="'+qaTypeList[qc].name+'" data-target="qa-type-selected-show-txt" data-form="qa_category" onclick="MOBILE_PAGE.qa_write.onclickSelectedQaTypeItem(this);"><span>'+qaTypeList[qc].name+'</span></li>';
		}
		returnHtml += '							</ul>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input-err-msg qa_category">상담유형을 선택해주세요.</div>';

		returnHtml += '				<div class="input_line">';
		returnHtml += '					<input type="number" name="qa_bbs_id" id="csQaWriteForm-qa_bbs_id" class="input_style size1" placeholder="콘텐츠번호를 입력해주세요.(선택)">';
		returnHtml += '					<span class="btn_m_d" data-target=".one_my_list" onclick="MOBILE_PAGE.qa_write.onclickBuylist(this,1);">내 구매내역 보기</span>';
		returnHtml += '					<span class="btn_q"></span>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="one_my_list"></div>';
		returnHtml += '				<div class="input_line">';
		returnHtml += '					<input type="text" name="qa_title" id="csQaWriteForm-qa_title" class="input_style size2" maxlength="100" placeholder="제목을 입력해주세요" required>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input-err-msg qa_title">제목을 5자이상 50자 이내로 제목을 입력해주세요</div>';
		returnHtml += '				<div class="input_line">';
		//returnHtml += '					<textarea name="" id="" placeholder="문의 내용을 작성해주세요." class="t_a_style"></textarea>';
		returnHtml += '					<textarea required id="csQaWriteForm-qa_contents" name="qa_contents" onfocus="if (this.value==this.defaultValue) {this.value=\'\';}" onblur="if(this.value==\'\'){this.value=this.defaultValue;}" class="t_a_style">&#10;&#10;- 문의해 주시면 1시간 내에 신속히 답변해 드립니다.(주말과 공휴일에는 답변이 늦어질 수 있습니다.)&#10;- 이름, 전화번호 등은 개인 정보 노출의 위험이 있으므로, 문의 내용에는 입력하지 않는 것이 좋습니다.</textarea>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input-err-msg qa_contents">문의 내용을 10자 이상 입력해주세요.</div>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="one_to_one_input">';
		returnHtml += '				<div class="input_line c_style"">';
		returnHtml += '					<input name="qa_reply_email" id="csQaWriteForm-qa_reply_email" type="checkbox" class="c_box_style"><label for="" class="label_style">이메일로 답변 알림</label>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input_line">';
		returnHtml += '					<input type="email" name="qa_email" id="csQaWriteForm-qa_email" class="input_style size2 b_style" value="" placeholder="답변 알림을 받으실 이메일을 입력해주세요.">';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input-err-msg qa_email">답변 알림을 받으실 이메일을 입력해주세요</div>';
		returnHtml += '			</div>';

		returnHtml += '			<div class="one_to_one_input privacy-agree-area">';
		returnHtml += '				<div class="input_line c_style agree">';
		returnHtml += '					<input name="qa_reply_email_agree" id="csQaWriteForm-qa_reply_email_agree" type="checkbox" class="c_box_style"><label for="" class="label_style">개인정보 수집·이용에 동의합니다.</label><span class="btn_more_txt" onclick="MOBILE_PAGE.qa_write.onclickMorePrivacyTxt(this);">세부 내용 내용보기</span>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="input-err-msg qa_reply_email_agree">답변 알림을 받으실려면 개인정보 수집·이용에 동의하셔야 합니다.</div>';

		returnHtml += '				<div class="content_view_area">';
		returnHtml += '					<dl>';
		returnHtml += '						<dt>수집하는 개인정보의 항목</dt>';
		returnHtml += '						<dd>';
		returnHtml += '							<p><span class="dot"></span><span class="txt">이메일</span></p>';
		returnHtml += '						</dd>';
		returnHtml += '					</dl>';
		returnHtml += '					<dl>';
		returnHtml += '						<dt>개인정보의 수집 이용 목적</dt>';
		returnHtml += '						<dd>';
		returnHtml += '							<p><span class="dot"></span><span class="txt">이메일 : 문의 사항에 대한 답변을 전달하기 위한 의사소통 경로의 확보</span></p>';
		returnHtml += '						</dd>';
		returnHtml += '					</dl>';
		returnHtml += '					<dl>';
		returnHtml += '						<dt>개인정보의 보유 및 이용기간</dt>';
		returnHtml += '						<dd>';
		returnHtml += '							<p><span class="dot"></span><span class="txt">원칙적으로 개인정보의 수집 이용 달성시 바로 파기합니다.</span></p>';
		returnHtml += '							<p><span class="dot"></span><span class="txt">수집 이용 목적을 달성한 경우에도 법률의 규정에 따라 보존할 필요가 있다면 고객의 개인정보를 보유할 수 있습니다.</span></p>';
		returnHtml += '							<ul class="txt_list">';
		returnHtml += '								<li>- 계약 또는 청약철회 등에 관한 기록 : 5년</li>';
		returnHtml += '								<li>- 대금 결제 및 재화 등의 공급에 관한 기록 : 5년</li>';
		returnHtml += '								<li>- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 등</li>';
		returnHtml += '							</ul>';
		returnHtml += '						</dd>';
		returnHtml += '					</dl>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="content_input_wrap">';
		//returnHtml += '				<span class="btn_submit">등록</span>';
		returnHtml += '				<button type="submit" class="btn_submit">문의 등록</button>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		</form>';
		returnHtml += '	</div>';



	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//판매자 채널 관리 - idx
MOBILE_TEMPLETE.CONNTAINER.myseller = function(info, hashs){
	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">'+info.name+'</h1>';
		returnHtml += '			<span class="btn_back" data-target="'+info.back+'" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content">';

		returnHtml += '		<div class="myseller-seller-info-wrap"></div>';

		/*
		returnHtml += '		<div class="b_line"></div>';
		returnHtml += '		<div class="my_menu_list channel">';
		returnHtml += '			<ul>';
		returnHtml += '				<li class="m1">';
		returnHtml += '					<span class="txt">인기 판매 콘텐츠</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m2">';
		returnHtml += '					<span class="txt">채널 포인트 적립 내역</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m3">';
		returnHtml += '					<span class="txt">채널 아이템 적립 내역</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m4">';
		returnHtml += '					<span class="txt">프리미엄 등록 현황</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="b_line"></div>';
		returnHtml += '		<div class="my_menu_list channel">';
		returnHtml += '			<ul>';
		returnHtml += '				<li class="m5" data-group="info" data-id="info_edit" onclick="GO_MYSELLER(this);">';
		returnHtml += '					<span class="txt">채널 정보 수정</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m6" data-group="info" data-id="comments" onclick="GO_MYSELLER(this);">';
		returnHtml += '					<span class="txt">이용자 댓글 모아보기</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m7" data-group="info" data-id="payback" onclick="GO_MYSELLER(this);">';
		returnHtml += '					<span class="txt">포인트 환전 안내</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="b_line"></div>';
		returnHtml += '		<div class="my_menu_list channel">';
		returnHtml += '			<ul>';
		returnHtml += '				<li class="m8" data-group="mlog" data-id="sales_history" onclick="GO_MYSELLER(this);">';
		returnHtml += '					<span class="txt">채널포인트 적립내역</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		/*
		returnHtml += '				<li class="m9">';
		returnHtml += '					<span class="txt">프리미엄 / 키워드 등록</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m10">';
		returnHtml += '					<span class="txt">채널 운영 규칙</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		returnHtml += '				<li class="m11">';
		returnHtml += '					<span class="txt">이용 약관</span>';
		returnHtml += '					<span class="arrow"></span>';
		returnHtml += '				</li>';
		*/
		returnHtml += '			</ul>';
		returnHtml += '		</div>';

		returnHtml += '		<div class="b_line"></div>';
		returnHtml += '		<div class="center_area type1">';
		returnHtml += '			<p class="p_num"><a href="16004912"><span class="p_ico"></span>1600-4912</a></p>';
		returnHtml += '			<p class="txt"><span class="s_txt">평일 10:00~19:00<span class="bar">|</span>주말/공휴일 휴무</span></p>';
		returnHtml += '			<div class="btn_wrap">';
		returnHtml += '				<span class="c_btn direct" onclick="GO_MEMBER_MENU(\'qa\');" ><span class="ico"></span>1:1 문의</span>';
		//returnHtml += '				<span class="c_btn kakao"><a href="//pf.kakao.com/_xjhGNxb/chat"><span class="ico"></span>카카오톡 상담</a></span>';
		returnHtml += '				<span class="c_btn kakao" onclick="actionKakaoChannelChat(\'_xjhGNxb\');"><span class="ico"></span>카카오톡 상담</span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};


//마이 판매자
MOBILE_TEMPLETE.CONNTAINER.m_myseller = {};

//마이 판매자 : 채널포인트 적립내역
MOBILE_TEMPLETE.CONNTAINER.m_myseller.commonLogHistory = function(logType){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_myseller.commonLogHistory', logType);
	if(isDefined(logType) == false){
		return '';
	}
	var logListEleWrapId = 'mobile-myseller-mlog-'+logType;
	var logInfoEleWrapId = 'mobile-page-end-spy-mlog-'+logType;

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">채널포인트 적립내역</h1>';
		returnHtml += '			<span class="btn_back btn-top-back" data-target="myseller" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content on_channel myseller '+logType+' no-data">';


		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">채널 콘텐츠를 이용한 채널 포인트 적립 내역을 확인하실 수 있습니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">최대 30일까지만 기록이 보관됩니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		/*
		returnHtml += '		<div class="date_check_wrap">';
		returnHtml += '			<div class="date_choice">';
		returnHtml += '				<span class="c_ico"></span>';
		returnHtml += '				<span class="date">2018.04.13</span>';
		returnHtml += '			</div>';
		returnHtml += '			<span class="line">-</span>';
		returnHtml += '			<div class="date_choice">';
		returnHtml += '				<span class="c_ico"></span>';
		returnHtml += '				<span class="date">2018.04.13</span>';
		returnHtml += '			</div>';<br />
		returnHtml += '			<span class="btn_check">조회</span>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">조건에 만족하는 적립내역이 없습니다..<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="txt_list_style sale_list sales-history-list">';
		returnHtml += '			<ul class="mobile-myseller-mlog-list-wrap '+logType+'"  id="'+logListEleWrapId+'">';
		returnHtml += '				<li class="l_section">';
		returnHtml += '					<div class="tit_area">';
		returnHtml += '						<div class="l_info">';
		returnHtml += '							<span class="num">123456</span><span class="bar">|</span><span class="name">아이디가들어가욧</span><span class="bar">|</span><span class="date">2019-01-01</span><span class="bar">|</span><span class="get_point">+90P</span>';
		returnHtml += '						</div>';
		returnHtml += '						<p class="txt_over"><span class="txt">배두나와 주지훈 나오는 좀비드라마 머시깽이 제목이 어디까지 나올까요?</span></p>';
		returnHtml += '					</div>';
		returnHtml += '				</li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';


		returnHtml += '	<div class="page-end-spy myseller-page-end-spy" data-page="1" data-group="mlog" data-type="'+logType+'" data-total_page="1" data-loaded="1" data-target="'+logListEleWrapId+'" data-info="'+logInfoEleWrapId+'" id="'+logInfoEleWrapId+'" onclick="MOBILE_PAGE.myseller.onclickMoreMobileData(this);">';
		returnHtml += ' 	<div class="end_area">';
		returnHtml += ' 		<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="ing_area">';
		//returnHtml += '			<p class="txt">불러오는 중입니다 <span class="arrow"></span></p>';
		returnHtml += '			<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

		returnHtml += '</div>';

		returnHtml += MOBILE_TEMPLETE.CONNTAINER.commonEmptyFooterHtml();


	try{
	    return returnHtml;
    }finally {
			returnHtml, logType  = null;
   	}
};



//마이 판매자 : 채널포인트 적립내역
MOBILE_TEMPLETE.CONNTAINER.m_myseller.infoCommentsModal = function(logType){
	console.log('MOBILE_TEMPLETE.CONNTAINER.m_myseller.infoCommentsModal', logType);
	if(isDefined(logType) == false){
		return '';
	}
	var logListEleWrapId = 'mobile-myseller-info-'+logType;
	var logInfoEleWrapId = 'mobile-page-end-spy-info-'+logType;

	var returnHtml = '';
		returnHtml += '	<div class="f_top">';
		returnHtml += '		<div class="inner">';
		returnHtml += '			<h1 class="f_tit">이용자 댓글 모아보기</h1>';
		returnHtml += '			<span class="btn_back btn-top-back" data-target="myseller" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="f_content on_channel myseller '+logType+' no-data">';


		returnHtml += '		<div class="my_top_txt">';
		returnHtml += '			<ul>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">콘텐츠를 다운로드한 분들의 댓글 모음입니다.</span></li>';
		returnHtml += '				<li><span class="dot"></span><span class="txt">댓글에 대한 답변글을 바로 달수 있으면 다운로드 쿠폰을 선물할 수도 있습니다.</span></li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		/*
		returnHtml += '		<div class="date_check_wrap">';
		returnHtml += '			<div class="date_choice">';
		returnHtml += '				<span class="c_ico"></span>';
		returnHtml += '				<span class="date">2018.04.13</span>';
		returnHtml += '			</div>';
		returnHtml += '			<span class="line">-</span>';
		returnHtml += '			<div class="date_choice">';
		returnHtml += '				<span class="c_ico"></span>';
		returnHtml += '				<span class="date">2018.04.13</span>';
		returnHtml += '			</div>';
		returnHtml += '			<span class="btn_check">조회</span>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="result-no-data">';
		returnHtml += '			<div class="no_channel">';
		returnHtml += '				<p class="txt"><span class="e_ico"></span><span class="no-rt-msg-txt">댓글이 없습니다.<span></p>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

		/*
		returnHtml += '		<div class="txt_list_style sale_list sales-history-list">';
		returnHtml += '			<ul class="mobile-myseller-mlog-list-wrap '+logType+'"  id="'+logListEleWrapId+'">';
		returnHtml += '				<li class="l_section">';
		returnHtml += '					<div class="tit_area">';
		returnHtml += '						<div class="l_info">';
		returnHtml += '							<span class="num">123456</span><span class="bar">|</span><span class="name">아이디가들어가욧</span><span class="bar">|</span><span class="date">2019-01-01</span><span class="bar">|</span><span class="get_point">+90P</span>';
		returnHtml += '						</div>';
		returnHtml += '						<p class="txt_over"><span class="txt">배두나와 주지훈 나오는 좀비드라마 머시깽이 제목이 어디까지 나올까요?</span></p>';
		returnHtml += '					</div>';
		returnHtml += '				</li>';
		returnHtml += '			</ul>';
		returnHtml += '		</div>';
		*/
		returnHtml += '		<div class="reply_list c_admin mobile-myseller-info-list-wrap '+logType+'" id="'+logListEleWrapId+'">';
		/*
		returnHtml += '			<div class="r_wrap good">';
		returnHtml += '				<span class="f_ico"></span>';
		returnHtml += '				<div class="r_txt_wrap">';
		returnHtml += '					<div class="top">';
		returnHtml += '						<span class="name">레드벨벳조이</span><span class="bar">|</span><span class="date">2018-12-14</span><span class="bar">|</span><span class="btn_gift">쿠폰지급</span>';
		returnHtml += '					</div>';
		returnHtml += '					<p class="t_txt">잘봤습니다! 항상 좋은자료 올려주셔서 감사합니다. 최대 2줄까지, 작성된 댓글 노출</p>';
		returnHtml += '					<p class="p_tit">원문제목 : 2017 가려진 시간 존잘 강동원 주연작!</p>';
		returnHtml += '				</div>';
		returnHtml += '				<div class="reply_input_area">';
		returnHtml += '					<textarea name="" id="" placeholder="댓글을 입력해주세요"  class="r_input" ></textarea><span class="btn_submit">등록</span>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		*/
/*
			<div class="r_wrap bad">
				<span class="f_ico"></span>
				<div class="r_txt_wrap">
					<div class="top">
						<span class="name">레드벨벳조이</span><span class="bar">|</span><span class="date">2018-12-14</span><span class="bar">|</span><span class="btn_gift">쿠폰지급</span>
					</div>
					<p class="t_txt">잘봤습니다! 항상 좋은자료 올려주셔서 감사합니다. 최대 2줄까지, 작성된 댓글 노출</p>
					<p class="p_tit">원문제목 : 2017 가려진 시간 존잘 강동원 주연작!</p>
				</div>
				<div class="r_depth2">
					<span class="bg"></span>
					<div class="txt">
						<p>안녕하세요 판매자입니다 만족도를 표시해주시면 감사하겠다</p>
					</div>
				</div>
			</div>
			<div class="r_wrap bad">
				<span class="f_ico"></span>
				<div class="r_txt_wrap">
					<div class="top">
						<span class="name">레드벨벳조이</span><span class="bar">|</span><span class="date">2018-12-14</span><span class="bar">|</span><span class="btn_gift">쿠폰지급</span>
					</div>
					<p class="t_txt">잘봤습니다! 항상 좋은자료 올려주셔서 감사합니다. 최대 2줄까지, 작성된 댓글 노출</p>
					<p class="p_tit">원문제목 : 2017 가려진 시간 존잘 강동원 주연작!</p>
				</div>
				<div class="reply_input_area">
					<textarea name="" id="" placeholder="댓글을 입력해주세요"  class="r_input" ></textarea><span class="btn_submit">등록</span>
				</div>
			</div>
			<div class="r_wrap bad">
				<span class="f_ico"></span>
				<div class="r_txt_wrap">
					<div class="top">
						<span class="name">레드벨벳조이</span><span class="bar">|</span><span class="date">2018-12-14</span>
					</div>
					<p class="t_txt"><span class="btn_gift">쿠폰지급</span>잘봤습니다! 항상 좋은자료 올려주셔서 감사합니다. 최대 2줄까지, 작성된 댓글 노출</p>
					<p class="p_tit">원문제목 : 2017 가려진 시간 존잘 강동원 주연작!</p>
				</div>
				<div class="reply_input_area">
					<textarea name="" id="" placeholder="댓글을 입력해주세요"  class="r_input" ></textarea><span class="btn_submit">등록</span>
				</div>
			</div>
			<div class="r_wrap">
				<span class="f_ico"></span>
				<div class="r_txt_wrap">
					<div class="top">
						<span class="name">레드벨벳조이</span><span class="bar">|</span><span class="date">2018-12-14</span><span class="bar">|</span><span class="btn_gift">쿠폰지급</span>
					</div>
					<p class="t_txt">잘봤습니다! 항상 좋은자료 올려주셔서 감사합니다. 최대 2줄까지, 작성된 댓글 노출</p>
					<p class="p_tit">원문제목 : 2017 가려진 시간 존잘 강동원 주연작!</p>
				</div>
				<div class="reply_input_area">
					<textarea name="" id="" placeholder="댓글을 입력해주세요"  class="r_input" ></textarea><span class="btn_submit">등록</span>
				</div>
			</div>
*/
		returnHtml += '		</div>';

		returnHtml += '	<div class="page-end-spy myseller-page-end-spy" data-page="1" data-group="info" data-type="'+logType+'" data-total_page="1" data-loaded="1" data-target="'+logListEleWrapId+'" data-info="'+logInfoEleWrapId+'" id="'+logInfoEleWrapId+'" onclick="MOBILE_PAGE.myseller.onclickMoreMobileData(this);">';
		returnHtml += ' 	<div class="end_area">';
		returnHtml += ' 		<p class="txt">마지막 페이지입니다.</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="ing_area">';
		//returnHtml += '			<p class="txt">불러오는 중입니다 <span class="arrow"></span></p>';
		returnHtml += '			<span class="g_btn_more">더보기 <span class="ico"></span></span>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';

		returnHtml += '</div>';

		returnHtml += MOBILE_TEMPLETE.CONNTAINER.commonEmptyFooterHtml();


	try{
	    return returnHtml;
    }finally {
			returnHtml, logType  = null;
   	}
};

MOBILE_TEMPLETE.CONNTAINER.find_pass = function(){
	var returnHtml =  '';
        returnHtml +=  '<div class="f_top">';
    	returnHtml +=	'    <div class="inner">';
    	returnHtml +=	'	   <h1 class="f_tit">비밀번호 찾기</h1>';
    	returnHtml +=   '		<span class="btn_back" data-target="myseller" data-loc="top" onclick="GO_BACK(this);"></span>';
    	returnHtml +=	'    </div>';
    	returnHtml +=	'</div>';
    	returnHtml +=	'<div class="f_content">';
    	returnHtml +=	'	<div class="inner">';
        returnHtml +=	'	 <form method="post" id="mobileFindPASSForm">';
    	returnHtml +=	'		<div class="find_wrap">';
    	returnHtml +=	'			<p class="pw_t_txt">회원가입 여부 확인을 먼저 진행해주세요.</p>';
    	returnHtml +=	'			<div class="input_line">';
    	returnHtml +=	'				<input type="email" class="input_style size2" placeholder="이메일" id="fp_email" name="fp_email">';
    	returnHtml +=	'			</div>';
    	returnHtml +=	'			<div class="protect_word">';
    	returnHtml +=	'				<div class="img_wrap">';
    	returnHtml +=	'					<div class="img_area"></div>';
    	returnHtml +=	'					<div class="btn_refresh"><span class="ico"></span> 새로고침</div>';
    	returnHtml +=	'				</div>';
    	returnHtml +=	'				<input type="text" class="input_style size2"  placeholder="위 보안문자를 그대로 입력해주세요">';
    	returnHtml +=	'			</div>';
    	returnHtml +=	'			<div class="btn_area">';
    	returnHtml +=	'				<span class="btn_find" onclick="MOBILE_COMMON_USER.onclickFindPassAuth();">비밀번호 찾기</span>';
    	returnHtml +=	'			</div>';
    	returnHtml +=	'		   <div class="find_notice">';
    	returnHtml +=	'				<ul>';
    	returnHtml +=	'					<li><span class="dot"></span><span class="txt">회원가입시 입력하신 아이디(이메일) 혹은 실명인증 받으신 정보를 이용해 비밀번호를 찾으실 수 있습니다.</span></li>';
    	returnHtml +=	'					<li><span class="dot"></span><span class="txt">입력하신 메일 주소가 없을 경우에는 10:00~18:00 사이에 고객센터(1600-4912)로 전화주시기 바랍니다.</span></li>';
    	returnHtml +=	'					<li><span class="dot"></span><span class="txt">메일을 이용해 찾이실 경우 스팸 메일함도 꼭 확인해보시길 바랍니다.</span></li>';
    	returnHtml +=	'				</ul>';
    	returnHtml +=	'			</div>';
    	returnHtml +=	'		</div>';
        returnHtml +=	'	 </form>';
    	returnHtml +=	'	</div>';
    	returnHtml +=	'</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};

MOBILE_TEMPLETE.CONNTAINER.find_id = function(){
	var returnHtml =  '';

		returnHtml +=  '	<div class="f_top">';
		returnHtml +=  '		<div class="inner">';
		returnHtml +=  '			<h1 class="f_tit">아이디 찾기</h1>';
		returnHtml +=  '			<span class="btn_back" data-target="myseller" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		returnHtml +=  '	<div class="f_content">';
		returnHtml +=  '		<div class="inner">';
		returnHtml +=  '			<form name="mobileUserFindIdForm" id="mobileUserFindIdForm" method="POST">';
		returnHtml +=  '			<div class="find_wrap">';
		returnHtml +=  '				<p class="pw_t_txt">실명인증시 정보사용에 동의하셨거나<br>혹은 생년월일을 입력하신 회원들만 아이디 찾기가 가능합니다.</p>';
		returnHtml +=  '				<div class="input_line">';
		returnHtml +=  '					<input type="text" name="fa_name" class="input_style size2" placeholder="이름">';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="input_line type2">';
		returnHtml +=  '					<input type="number" name="fa_birthday" class="input_style size2" placeholder="생년월일 8자리 숫자 (ex.19960527)">';
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="btn_area">';
		returnHtml +=  '					<span class="btn_find type2" onclick="MOBILE_COMMON_USER.onclickFindID(\'mobileUserFindIdForm\');">아이디 찾기</span>';
		returnHtml +=  '				</div>';
		returnHtml +=  '			</div>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';


	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};





//findpass
/*
MOBILE_TEMPLETE.CONNTAINER.findpassresult = function(id){
	var returnHtml =  '';
        returnHtml +'<div class="f_top">';
    	returnHtml +'	<div class="inner">';
    	returnHtml +'		<h1 class="f_tit">비밀번호 재설정</h1>';
    	returnHtml +'		<span class="btn_back"></span>';
    	returnHtml +'	</div>';
    	returnHtml +'</div>';
    	returnHtml +'<div class="f_content">';
    	returnHtml +'	<div class="inner">';
    	returnHtml +'		<div class="find_wrap edit">';
    	returnHtml +'			<div class="find_notice">';
    	returnHtml +'				<ul>';
    	returnHtml +'					<li><span class="dot"></span><span class="txt">회원가입시 입력하신 아이디(이메일)로 비밀번호가 발송되며, 가입시 입력하신 메일 주소가 잘못 기재되었거나 없으면 비밀번호를 받으실 수 없습니다.</span></li>';
    	returnHtml +'					<li><span class="dot"></span><span class="txt">입력하신 메일 주소가 없을 경우에는 10:00~18:00 사이에 고객센터(1600-4912)로 전화주시기 바랍니다.</span></li>';
    	returnHtml +'					<li><span class="dot"></span><span class="txt">받은 메일함에 없을 경우, 스팸함도 꼭 확인해보시길 바랍니다.</span></li>';
    	returnHtml +'				</ul>';
    	returnHtml +'			</div>';
    	returnHtml +'			<div class="input_line">';
    	returnHtml +'				<input type="text" class="input_style size2 mb_2"  placeholder="변경하실 비밀번호를 입력해주세요" id="pw" name="pw"/>';
    	returnHtml +'				<input type="text" class="input_style size2"  placeholder="변경하실 비밀번호를 다시 한번 입력해주세요"  id="pw2" name="pw2"/>';
    	returnHtml +'			</div>';
    	returnHtml +'			<div class="btn_area">';
    	returnHtml +'				<span class="btn_find" onclick = "">비밀번호 변경</span>';
    	returnHtml +'			</div>';
        returnHtml +'		    <input type="hidden" value="'+id+'" id="hd_user_id" name="hd_user_id">';
    	returnHtml +'		</div>';
    	returnHtml +'	</div>';
    	returnHtml +'</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};
*/

MOBILE_TEMPLETE.CONNTAINER.paycharge_point_view = function(recomened_charge_list,charge_normal_list)
{
	var returnHtml =  '';
		returnHtml +=  '<div class="f_top">';
		returnHtml +=  '	<div class="inner">';
		returnHtml +=  '		<h1 class="f_tit">충전하기</h1>';
		returnHtml +=	'	   <span class="btn_back" data-target="login-modal" data-loc="top" onclick="GO_BACK(this);"></span>';
		returnHtml +=  '	</div>';
		returnHtml +=  '</div>';
		returnHtml +=  '<div class="f_content">';
		returnHtml +=  '	<div class="inner">';
		returnHtml +=  '		<div class="f_tab_style">';
		returnHtml +=  '			<span class="tab_btn active" onclick="MOBILE_PAGE.pay.pay_charge_point_view();">포인트 충전<span class="b_line"></span></span>';
		returnHtml +=  '			<span class="tab_btn" onclick="MOBILE_PAGE.pay.pay_charge_fixed_view();">정액제 충전<span class="b_line"></span></span>';
		returnHtml +=  '		</div>';
		returnHtml +=  '		<!-- 리스트  -->';
		returnHtml +=  '		<div class="f_tab_list_wrap">';
		returnHtml +=  '			<div class="charge_wrap">';
		returnHtml +=  '				<div class="r_item_wrap">';
		returnHtml +=  '					<div class="c_tit">';
		returnHtml +=  '						<p>온플레이 추천 요금제!</p>';
		returnHtml +=  '					</div>';
		for(var prop in recomened_charge_list ){
			var item_rnum =  Number(prop)+ 1;
			var bp = "";  //보너스포인트
			if (recomened_charge_list[prop].pay_charge_cash_partner > 0){
				bp = recomened_charge_list[prop].pay_charge_cash_partner;
			}
			else if (recomened_charge_list[prop].pay_charge_cash_bonus > 0){
				bp = recomened_charge_list[prop].pay_charge_cash_bonus;
			}
			//이벤트 포인트
			if (recomened_charge_list[prop].pay_charge_event_base > 0){
				ebp = recomened_charge_list[prop].pay_charge_event_base;
			}
			else if (recomened_charge_list[prop].pay_charge_event_bonus > 0){
				ebp = recomened_charge_list[prop].pay_charge_event_bonus;
			}


			returnHtml +=  '					<div class="i_list">';
			returnHtml +=  '						<div class="item r'+ item_rnum +'" onclick="MOBILE_PAGE.pay.pay_method_view('+recomened_charge_list[prop].pay_charge_idx+')">';
			returnHtml +=  '							<div class="i_detail">';
			returnHtml +=  '								<p class="point"><span class="num">'+disk_number_format(recomened_charge_list[prop].pay_charge_prime_price)+'</span> 포인트</p>';
			returnHtml +=  '								<div class="info">';
			if(charge_normal_list[prop].pay_charge_cost_price == 5000){
				returnHtml +=  '									<p class="txt">최저요금</p>';
			}else{
				var bp = "";  //보너스포인트
				if (charge_normal_list[prop].pay_charge_cash_partner > 0){
					bp = charge_normal_list[prop].pay_charge_cash_partner;
				}
				else if (charge_normal_list[prop].pay_charge_cash_bonus > 0){
					bp = charge_normal_list[prop].pay_charge_cash_bonus;
				}
				//이벤트 포인트
				if (charge_normal_list[prop].pay_charge_event_base > 0){
					ebp = charge_normal_list[prop].pay_charge_event_base;
				}
				else if (charge_normal_list[prop].pay_charge_event_bonus > 0){
					ebp = charge_normal_list[prop].pay_charge_event_bonus;
				}

				if(bp > 0){
					returnHtml +=  '									<span class="ico_p">+</span> <span class="b_p"><span class="num">'+disk_number_format(bp)+'</span>BP</span>';
				}
				if(ebp > 0 ){
					returnHtml +=  '									+<span class="ico_p">+</span> <span class="b_p"><span class="num">'+disk_number_format(ebp)+'</span>BP</span>';
				}
				if (charge_normal_list[prop].pay_charge_coupon > 0){
					returnHtml +=  '+ <span class="coupon">쿠폰<span class="num">'+charge_normal_list[prop].pay_charge_coupon+'</span>장</span>';
				}

				if (charge_normal_list[prop].pay_charge_mileage > 0){
					returnHtml +=  '+ <span class="coupon"><span class="num">'+charge_normal_list[prop].pay_charge_mileage+'</span>M</span>';
				}
			}
			returnHtml +=  '								</div>';
			returnHtml +=  '							</div>';
			returnHtml +=  '							<div class="sum_area">';
			returnHtml +=  '								<span class="sum"><span class="num">'+disk_number_format(recomened_charge_list[prop].pay_charge_cost_price)+'</span> 원</span><span class="arrow"></span>';
			returnHtml +=  '							</div>';
			returnHtml +=  '						</div>';
			returnHtml +=  '					</div>';
		}
		returnHtml +=  '				</div>';
		returnHtml +=  '				<div class="p_item_wrap">';
		returnHtml +=  '					<div class="c_tit">';
		returnHtml +=  '						<p>포인트 충전 요금제 안내</p>';
		returnHtml +=  '					</div>';
		returnHtml +=  '					<div class="i_list">';
		for(var prop in charge_normal_list ){
				returnHtml +=  '						<div class="item p_'+charge_normal_list[prop].pay_charge_cost_price+'" onclick="MOBILE_PAGE.pay.pay_method_view('+charge_normal_list[prop].pay_charge_idx+')">';
				returnHtml +=  '							<div class="i_detail">';
				returnHtml +=  '								<p class="point"><span class="num">'+disk_number_format(charge_normal_list[prop].pay_charge_prime_price)+'</span> 포인트</p>';
				returnHtml +=  '								<div class="info">';
			if(charge_normal_list[prop].pay_charge_cost_price == 5000){
				returnHtml +=  '									<p class="txt">최저요금</p>';
			}else{
				var bp = "";  //보너스포인트
				if (charge_normal_list[prop].pay_charge_cash_partner > 0){
					bp = charge_normal_list[prop].pay_charge_cash_partner;
				}
				else if (charge_normal_list[prop].pay_charge_cash_bonus > 0){
					bp = charge_normal_list[prop].pay_charge_cash_bonus;
				}
				//이벤트 포인트
				if (charge_normal_list[prop].pay_charge_event_base > 0){
					ebp = charge_normal_list[prop].pay_charge_event_base;
				}
				else if (charge_normal_list[prop].pay_charge_event_bonus > 0){
					ebp = charge_normal_list[prop].pay_charge_event_bonus;
				}

				if(bp > 0){
					returnHtml +=  '									<span class="ico_p">+</span><span class="b_p"><span class="num">'+disk_number_format(bp)+'</span>BP</span>';
				}
				if(ebp > 0 ){
					returnHtml +=  '									<span class="ico_p">+</span><span class="b_p"><span class="num">'+disk_number_format(ebp)+'</span>BP</span>';
				}
				if (charge_normal_list[prop].pay_charge_coupon > 0){
					returnHtml +=  '+ <span class="coupon">쿠폰<span class="num">'+charge_normal_list[prop].pay_charge_coupon+'</span>장</span>';
				}

				if (charge_normal_list[prop].pay_charge_mileage > 0){
					returnHtml +=  '+ <span class="coupon"> <span class="num">'+charge_normal_list[prop].pay_charge_mileage+'</span>M</span>';
				}
			}
				returnHtml +=  '								</div>';
				returnHtml +=  '							</div>';
				returnHtml +=  '							<div class="sum_area">';
				returnHtml +=  '								<span class="sum"><span class="num">'+disk_number_format(charge_normal_list[prop].pay_charge_cost_price)+'</span> 원</span><span class="arrow"></span>';
				returnHtml +=  '							</div>';
				returnHtml +=  '						</div>';
		}
		returnHtml +=  '					</div>';
		returnHtml +=  '				</div>';
		returnHtml +=  '			</div>';
		returnHtml +=  '			<div class="charge_notice">';
		returnHtml +=  '				<p class="tit">결제시 참고해주세요!</p>';
		returnHtml +=  '				 <ol>';
		returnHtml +=  '					<li><span class="num">1.</span><span class="txt">모든 이용권 금액은 부가세 10% 별도 입니다</span></li>';
		returnHtml +=  '					<li><span class="num">2.</span><span class="txt">월정액 상품의 사용기간은 대한민국 표준시간을 기준으로 합니다.</span></li>';
		returnHtml +=  '					<li><span class="num">3.</span><span class="txt">정기 및 임시 점검시간에는 서비스가 중지될 수 있습니다.</span></li>';
		returnHtml +=  '					<li><span class="num">4.</span><span class="txt">정액제 상품은 온플레이(제휴콘텐츠 제외)의 모든 콘텐츠를 다운로드 하실 수 있습니다.</span></li>';
		returnHtml +=  '					<li><span class="num">5.</span><span class="txt">일반적인 이용이 아닌 다른 용도로 사용 할 경우 다운로드가 제한 될 수 있습니다.</span></li>';
		returnHtml +=  '					<li><span class="num">6.</span><span class="txt">환불로 인한 휴대폰 정보는 환불안내, 온플레이 이벤트 안내 어떠한 용도로도 사용되지 않습니다.</span></li>';
		returnHtml +=  '					<li><span class="num">7.</span><span class="txt">결제 후 48시간 이내에 신청하셔야만 환불이 가능합니다.</span></li>';
		returnHtml +=  '					<li><span class="num">8.</span><span class="txt">환불은 서비스 악용을 막기 위해 1회만 환불이 가능합니다.</span></li>';
		returnHtml +=  '					<li><span class="num">9.</span><span class="txt">결제 후 다운로드 및 실시간 감상 1회(제휴, 성인 제외)에 한하여 자유롭게 환불 신청이 가능하며 다운로드 횟수가 2회 이상일 경우 환불은 불가능합니다.</span></li>';
		returnHtml +=  '					<li><span class="num">10.</span><span class="txt">상품의 내용이 표시, 광고 내용과 다르게 이행된 경우 구매일로부터 30일 이내 취소가 가능합니다.</span></li>';
		returnHtml +=  '					<li><span class="num">11.</span><span class="txt">법정대리인의 동의없이 미성년자 명의로 결제한 경우 법정대리인 또는 미성년자 본인이 취소할 수 있습니다.</span></li>';
		returnHtml +=  '				 </ol>';
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

MOBILE_TEMPLETE.CONNTAINER.paycharge_fixed_view = function(charge_re_list){ //omh
	returnHtml =  '';
	returnHtml +=  '<div class="f_top">';
	returnHtml +=  '	<div class="inner">';
	returnHtml +=  '		<h1 class="f_tit">충전하기</h1>';
	returnHtml +=	'	   <span class="btn_back" data-target="login-modal" data-loc="top" onclick="GO_BACK(this);"></span>';
	returnHtml +=  '	</div>';
	returnHtml +=  '</div>';
	returnHtml +=  '<div class="f_content">';
	returnHtml +=  '	<div class="inner">';
	returnHtml +=  '		<div class="f_tab_style">';
	returnHtml +=  '			<span class="tab_btn " onclick="MOBILE_PAGE.pay.pay_charge_point_view();">포인트 충전<span class="b_line"></span></span>';
	returnHtml +=  '			<span class="tab_btn active" onclick="MOBILE_PAGE.pay.pay_charge_fixed_view();">정액제 충전<span class="b_line"></span></span>';
	returnHtml +=  '		</div>';
	returnHtml +=  '		<div class="f_tab_list_wrap">';
	returnHtml +=  '			<div class="flat_item_wrap">';
	returnHtml +=  '				<span class="bg_line"></span>';
	returnHtml +=  '				<div class="f_item t_basic">';
	returnHtml +=  '					<div class="f_tit">온플레이 멤버십 회원권 <span class="s_txt">(기본형)</span></div>';
	var htmltext = "";
    var onclicktext = "";
	for(var prop in charge_re_list.a ){
		htmltext = "자동결제";
		onclicktext = 'onclick="MOBILE_PAGE.pay.pay_method_view('+charge_re_list.a[prop].pay_charge_idx+',\'AUTO\',\'FIXED\',\'FIXED\')"';
		if(charge_re_list.a[prop].pay_charge_type == "FIXED"){
			htmltext = '1개월';
			onclicktext = 'onclick="MOBILE_PAGE.pay.pay_method_view('+charge_re_list.c[prop].pay_charge_idx+',\'POINT\',\'FIXED\',\'FIXED\')"';
		}
		returnHtml +=  '				<div class="item line" '+onclicktext+'>';
		returnHtml +=  '					<div class="type">';
		returnHtml +=  '						<div class="txt">'+htmltext+'</div>';
		returnHtml +=  '					</div>';
		returnHtml +=  '					<div class="sum_area">';
		returnHtml +=  '						<span class="d_sum"><span class="num">'+disk_number_format(charge_re_list.a[prop].pay_charge_prime_price)+'</span>원</span><span class="t_sum"><span class="num">'+disk_number_format(charge_re_list.a[prop].pay_charge_cost_price)+'</span>원</span><span class="arrow"></span>';
		returnHtml +=  '					</div>';
		returnHtml +=  '				</div>';
	}
	returnHtml +=  '				<span class="bg_line"></span>';
	returnHtml +=  '				<div class="f_item t_5000">';
	returnHtml +=  '					<div class="f_tit">온플레이 멤버십 회원권 (+5000P)</div>';
	for(var prop in charge_re_list.b ){
		htmltext = "자동결제"
		onclicktext = 'onclick="MOBILE_PAGE.pay.pay_method_view('+charge_re_list.b[prop].pay_charge_idx+',\'AUTO\',\'FIXED\',\'FIXED\')"';
		if(charge_re_list.b[prop].pay_charge_type == "FIXED"){
			htmltext = '1개월';
			onclicktext = 'onclick="MOBILE_PAGE.pay.pay_method_view('+charge_re_list.c[prop].pay_charge_idx+',\'POINT\',\'FIXED\',\'FIXED\')"';

 		}

		returnHtml +=  '					<div class="item line" '+onclicktext+'>';
		returnHtml +=  '						<div class="type">';
		returnHtml +=  '							<div class="txt">'+htmltext+'</div>';
		returnHtml +=  '						</div>';
		returnHtml +=  '						<div class="sum_area">';
		returnHtml +=  '							<span class="d_sum"><span class="num">'+disk_number_format(charge_re_list.b[prop].pay_charge_prime_price)+'</span>원</span><span class="t_sum"><span class="num">'+disk_number_format(charge_re_list.b[prop].pay_charge_cost_price)+'</span>원</span><span class="arrow"></span>';
		returnHtml +=  '						</div>';
		returnHtml +=  '					</div>';
	}
	returnHtml +=  '					</div>';
	returnHtml +=  '				<span class="bg_line"></span>';
	returnHtml +=  '				<div class="f_item t_10000">';
	returnHtml +=  '					<div class="f_tit">온플레이 멤버십 회원권 (+10000P)</div>';
	for(var prop in charge_re_list.c ){
		htmltext = "자동결제"
		onclicktext = 'onclick="MOBILE_PAGE.pay.pay_method_view('+charge_re_list.c[prop].pay_charge_idx+',\'AUTO\',\'FIXED\',\'FIXED\')"';
		if(charge_re_list.c[prop].pay_charge_type == "FIXED"){
			htmltext = '1개월';
			onclicktext = 'onclick="MOBILE_PAGE.pay.pay_method_view('+charge_re_list.c[prop].pay_charge_idx+',\'POINT\',\'FIXED\',\'FIXED\')"';
		}
		returnHtml +=  '					<div class="item line" '+onclicktext+'>';
		returnHtml +=  '						<div class="type">';
		returnHtml +=  '							<div class="txt">'+htmltext+'</div>';
		returnHtml +=  '						</div>';
		returnHtml +=  '						<div class="sum_area">';
		returnHtml +=  '							<span class="d_sum"><span class="num">'+disk_number_format(charge_re_list.c[prop].pay_charge_prime_price)+'</span>원</span><span class="t_sum"><span class="num">'+disk_number_format(charge_re_list.c[prop].pay_charge_cost_price)+'</span>원</span><span class="arrow"></span>';
		returnHtml +=  '						</div>';
		returnHtml +=  '					</div>';
		
	}
	returnHtml +=  '		</div>';
	returnHtml +=  '				<span class="bg_line"></span>';
	returnHtml +=  '			<div class="charge_notice">';
	returnHtml +=  '				<p class="tit">결제시 참고해주세요!</p>';
	returnHtml +=  '				 <ol>';
	returnHtml +=  '					<li><span class="num">1.</span><span class="txt">모든 이용권 금액은 부가세 10% 별도 입니다</span></li>';
	returnHtml +=  '					<li><span class="num">2.</span><span class="txt">월정액 상품의 사용기간은 대한민국 표준시간을 기준으로 합니다.</span></li>';
	returnHtml +=  '					<li><span class="num">3.</span><span class="txt">정기 및 임시 점검시간에는 서비스가 중지될 수 있습니다.</span></li>';
	returnHtml +=  '					<li><span class="num">4.</span><span class="txt">정액제 상품은 파일캐스트(제휴콘텐츠 제외)의 모든 콘텐츠를 다운로드 하실 수 있습니다.</span></li>';
	returnHtml +=  '					<li><span class="num">5.</span><span class="txt">일반적인 이용이 아닌 다른 용도로 사용 할 경우 다운로드가 제한 될 수 있습니다.</span></li>';
	returnHtml +=  '					<li><span class="num">6.</span><span class="txt">환불로 인한 휴대폰 정보는 환불안내, 파일캐스트 이벤트 안내 어떠한 용도로도 사용되지 않습니다.</span></li>';
	returnHtml +=  '					<li><span class="num">7.</span><span class="txt">결제 후 48시간 이내에 신청하셔야만 환불이 가능합니다.</span></li>';
	returnHtml +=  '					<li><span class="num">8.</span><span class="txt">환불은 서비스 악용을 막기 위해 1회만 환불이 가능합니다.</span></li>';
	returnHtml +=  '					<li><span class="num">9.</span><span class="txt">결제 후 다운로드 및 실시간 감상 1회(제휴, 성인 제외)에 한하여 자유롭게 환불 신청이 가능하며 다운로드 횟수가 2회 이상일 경우 환불은 불가능합니다.</span></li>';
	returnHtml +=  '					<li><span class="num">10.</span><span class="txt">상품의 내용이 표시, 광고 내용과 다르게 이행된 경우 구매일로부터 30일 이내 취소가 가능합니다.</span></li>';
	returnHtml +=  '					<li><span class="num">11.</span><span class="txt">법정대리인의 동의없이 미성년자 명의로 결제한 경우 법정대리인 또는 미성년자 본인이 취소할 수 있습니다.</span></li>';
	returnHtml +=  '				 </ol>';
	returnHtml +=  '			</div>';
	returnHtml +=  '		</div>';
	returnHtml +=  '	</div>';
	returnHtml +=  '</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
}
//charge_method
MOBILE_TEMPLETE.CONNTAINER.pay_method_view = function(data,pay_code,clicklink){
	console.log("pay_method_view.TEMPLE");
	var pay_method = data.pay_method;
    var charge_data = data.charge_data;
	console.log('pay_method', pay_method);
	console.log(charge_data);
	//pay_charge_type
    var charge_total_point = Number(charge_data.pay_charge_cash_base) + Number(charge_data.pay_charge_cash_bonus) + Number(charge_data.pay_charge_event_bonus) + Number(charge_data.pay_charge_mileage);
    /*
	var pay_title = {};
        pay_title['100'] = '신용카드';
        pay_title['200'] = '계좌이체';
        pay_title['300'] = '휴대폰 / 전화 결제';
        pay_title['400'] = '간편결제';
        pay_title['500'] = '상품권 결제 / 마일리지';
    */

	var returnHtml =  '';
		returnHtml +='<div class="f_top">';
		returnHtml +='	<div class="inner">';
		returnHtml +='		<h1 class="f_tit">결제 금액 확인 및 결제 방법 선택</h1>';
		if(clicklink =='FIXED'){
			//returnHtml +='		<span class="btn_back" onclick="MOBILE_PAGE.pay.pay_charge_fixed_view();"></span>';
		}else{
			//returnHtml +='		<span class="btn_back" onclick="MOBILE_PAGE.pay.pay_charge_point_view();"></span>';
		}
		returnHtml += '			<span class="btn_back" data-target="modal" onclick="GO_BACK(this);"></span>';
		returnHtml +='	</div>';
		returnHtml +='</div>';
		returnHtml +='<div class="f_content">';
		returnHtml +='	<div class="inner">';
		returnHtml +='		<span class="bg_line"></span>';
		returnHtml +='		<div class="charge_info">';
		returnHtml +='			<div class="top">';
		returnHtml +='				<p class="tit">결제금액 <span class="s_txt">(VAT 별도)</span></p>';
		if(charge_data.pay_charge_prime_price == charge_data.pay_charge_cost_price){
			returnHtml +='				<p class="t_sum"><span class="num">'+disk_number_format(charge_data.pay_charge_cost_price)+'</span>원</p>';
		}else{
			returnHtml +='				<p class="t_sum"><span class="d_sum">'+disk_number_format(charge_data.pay_charge_prime_price) +'</span><span class="num">'+disk_number_format(charge_data.pay_charge_cost_price)+'</span>원</p>';
		}

		returnHtml +='			</div>';
		returnHtml +='			<div class="total_point_info">';
		returnHtml +='				<ul class="i_list">';
		
		//정액결제
		if(charge_data.pay_charge_type == 'AUTO' || charge_data.pay_charge_type == 'FIXED'){
			
			returnHtml +='								<li style="margin-bottom:8px;"><span class="name">상품명</span><span class="txt flat">'+charge_data.pay_charge_title+'</span></li>';
			returnHtml +='								<li style="margin-bottom:0;"><span class="name">종료일</span><span class="txt flat t_blue">결제 후 30일 자정까지</span><li>';
			if(parseInt(charge_data.pay_charge_cash_base) > 0){
				//returnHtml +='								<li><span class="txt">보너스 캐시</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_cash_base)+'</b><span class="type">C</span></span> </li>';
	        }
			
			
		}else{
		
			
			if(parseInt(charge_data.pay_charge_cash_base) > 0){
				returnHtml +='								<li><span class="txt">충전 캐시</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_cash_base)+'</b><span class="type">C</span></span> </li>';
	        }
	
			if(parseInt(charge_data.pay_charge_cash_partner) > 0){
				returnHtml +='								<li><span class="txt"><span class="ico_plus"></span>보너스 캐시</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_cash_partner)+'</b><span class="type">BC</span></span> </li>';
	        }
	        else if(parseInt(charge_data.pay_charge_cash_bonus) > 0){
	            returnHtml += '								<li><span class="txt"><span class="ico_plus"></span>보너스 포인트</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_cash_bonus)+'</b><span class="type">BP</span></span> </li>';
	        }
	
	        if(parseInt(charge_data.pay_charge_event_base) > 0){
	            returnHtml += '								<li><span class="txt"><span class="ico_plus"></span>이벤트 보너스</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_event_base)+'</b><span class="type">EB</span></span></li>';
	        }
	        else if(parseInt(charge_data.pay_charge_event_bonus) > 0){
	            returnHtml += '								<li><span class="txt"><span class="ico_plus"></span>이벤트 보너스</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_event_bonus)+'</b><span class="type">EB</span></span></li>';
	        }
	
	        if(charge_data.pay_charge_mileage>0){
	            returnHtml += '								<li><span class="txt"><span class="ico_plus"></span>마일리지</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_mileage)+'</b><span class="type">M</span></span></li>';
	        }
	        if(charge_data.pay_charge_coupon>0){
	            returnHtml += '								<li><span class="txt"><span class="ico_plus"></span>다운로드 쿠폰</span><span class="p_num"><b>'+disk_number_format(charge_data.pay_charge_coupon)+'</b><span class="type">장</span></span></li>';
	        }
	     }
		returnHtml +='				</ul>';
		if(charge_data.pay_charge_type == 'AUTO' || charge_data.pay_charge_type == 'FIXED'){
			//returnHtml +='				<span class="name">종료일</span><span class="txt t_blue">결제 후 30일 자정까지</span>';
		}else{
			returnHtml +='				<div class="t_point">총 적립<span class="num">'+disk_number_format(charge_total_point)+'</span></div>';
		}
		
		returnHtml +='			</div>';
		returnHtml +='		</div>';
		returnHtml +='		<span class="bg_line"></span>';
		returnHtml +='		<div class="charge_type_wrap">';
		returnHtml +='			<div class="type_choice">';
		returnHtml +='				<p class="s_tit">결제 방법을 선택해 주세요.</p>';
		returnHtml +='				<div class="type_list">';
		returnHtml +='					<ul>';
		
		for (var i in pay_method){
			 var isActive = "";
			 var pGroup = pay_method[i];
			 console.log('pGroup', pGroup);
			 var pList =  pGroup.data;
			 console.log('pList', pList);
			 var pGroupKey =  pGroup.key;
			 if(pGroup.name == 'simple_pay'){
			 	isActive = "active";
			 }
			 var showType = 'type1'
			if(pGroup.name == 'giftcard'){
				showType = 'type3'
			}
			if(charge_data.pay_charge_type == "AUTO" && pGroup.name == 'phone'){
				showType = 'type3'
			}
			
			
			if(pList.length < 1){
				continue;
			}

			returnHtml +='						<li class="mobile-pay-method-group '+pGroup.name+' '+showType+' '+isActive+'">';
			returnHtml +='							<div class="t_btn" onclick="MOBILE_PAGE.pay.onclickTabChange(\''+pGroup.name+'\');">';
			returnHtml +='								<span class="name">'+pGroup.title+'</span><span class="arrow"></span>';
			returnHtml +='							</div>';
			returnHtml +='							<div class="t_area">';

			 for(var k in pList){
			 	var pMdthod = pList[k];
			 	console.log(pMdthod);
			 	var subIsActive = '';
					checked = "";
					if(k ==  0 && isActive == 'active'){  
						checked = "checked";
						subIsActive = 'active';
					}
					//returnHtml +='								<span class="r_area active" onclick="MOBILE_PAGE.pay.pay_rd_section_click(' + pay_method[prop_a][prop_b].pay_method_idx+')"><input type="radio" class="r_btn" name="rd_pay"'+checked+' name="charge_type" value="' + pay_method[prop_a][prop_b].pay_method_idx+'" ><label for="" class="label_style">'+pay_method[prop_a][prop_b].pay_method_title+'</label></span>';
					returnHtml +='								<span class="r_area mobile-pay-method-item mobile-pay-method-item-'+ pMdthod.pay_method_idx+' '+subIsActive+'" onclick="MOBILE_PAGE.pay.onclickSelectMethodItem(this);"><input type="radio" class="r_btn r_btn_radio" name="rd_pay"'+checked+' name="charge_type" value="' + pMdthod.pay_method_idx+'" ><label for="" class="label_style">'+pMdthod.pay_method_title+'</label></span>';
					if(charge_data.pay_charge_type == "AUTO" && pMdthod.pay_method_idx == 14 ){ ////정기결제이고 신용카드일때 (일단 다우만일수있어서 다우methodidx만함) 귀찮지 않으려면 pay_method_kind == 'card_auto' 바꿔도됨
						returnHtml +='<p class="t_red">※ BC, 하나, 현대카드는 정기결제가 지원되지 않습니다.</p>';
					}

			}

			returnHtml +='							</div>';
			returnHtml +='						</li>';
		}
		returnHtml +='					</ul>';
		returnHtml +='				</div>';
		returnHtml +='			</div>';
		returnHtml +='			<div class="c_area">';
		//returnHtml +='				<p class="c_txt"><input type="checkbox" id="onAgree" class="c_box"><label for="" class="label_style">온플레이 서비스 약관에 동의합니다.</label><span class="t_blue">[전체보기]</span></p>';
		returnHtml +='				<p class="c_txt"><input type="checkbox" id="onAgree" class="c_box" checked><label for="" class="label_style"><u>상품정보를</u> 확인하였고 <u>결제 진행에 동의</u>합니다.</label></p>';
		//returnHtml +='				<p class="c_txt"><label for="" class="label_style"><u>상품정보를</u> 확인하였고 <u>결제 진행에 동의</u>합니다.</label></p>';
		if(charge_data.pay_charge_type == "AUTO"){
			returnHtml +='				<p class="c_txt"><input type="checkbox" id="onMonthAgree" class="c_box" checked><label for="" class="label_style">매월 정기 <u>결제 되는 것에 동의</u>합니다.</label></p>';
			//returnHtml +='				<p class="c_txt"><label for="" class="label_style"><u>상품정보를</u> 확인하였고 매월 정기 <u>결제 되는 것에 동의</u>합니다.</label></p>';
		}
		returnHtml +='			</div>';
		returnHtml +='			<span class="btn_charge" onclick="MOBILE_PAGE.pay.paymentAction('+charge_data.pay_charge_idx+',\''+charge_data.pay_charge_type+'\')">결제하기</span>';
		returnHtml +='		</div>		';
		returnHtml +='	</div>';
		returnHtml +='</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml  = null;
   	}
};
