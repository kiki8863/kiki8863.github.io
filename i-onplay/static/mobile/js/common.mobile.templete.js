
//마이페이지 관련 템플릿
MOBILE_TEMPLETE.MY_PAGE = {};
MOBILE_TEMPLETE.MY_PAGE.POINT = {};
MOBILE_TEMPLETE.MY_PAGE.POINT.charge_list = {};
MOBILE_TEMPLETE.MY_PAGE.POINT.point_list = {};
MOBILE_TEMPLETE.MY_PAGE.POINT.point_used = {};
MOBILE_TEMPLETE.MY_PAGE.POINT.mileage_list = {};
//마이페이지 > 포인트 > 포인트 충전 및 적립 내역
MOBILE_TEMPLETE.MY_PAGE.POINT.charge_list.GET_HTML = function(data) {
	console.log('MOBILE_TEMPLETE.MY_PAGE.POINT.point_list', data);

	var returnHtml = '';
		returnHtml += '					<li>';
		returnHtml += '						<div class="l1"><span class="date">'+data.show_reg_date+'</span></div>';
		returnHtml += '						<div class="l2">';
		returnHtml += '							<span class="tit">';
		if(isDefined(data.show_pay_type)){
			returnHtml += '							<span class="t-tit">['+data.show_pay_type+']</span>';
		}
		returnHtml += '								<span >'+data.pay_info_name+'</span>';
		returnHtml += '							</span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="l3"><span>'+data.show_remaining_expire_time+'</span></div>';
		returnHtml += '						<div class="l4"><span class="point">'+data.show_charge_cash+''+data.show_pay_unit+'</span></div>';
		returnHtml += '					</li>';
	try{
	    return returnHtml;
    }finally {
			data, returnHtml = null;
   	}
};

//마이페이지 > 포인트 > 포인트 적립/사용 내역 : 적립 내역
MOBILE_TEMPLETE.MY_PAGE.POINT.point_list.GET_HTML = function(data) {
	console.log('MOBILE_TEMPLETE.MY_PAGE.POINT.point_list.GET_HTML', data);

	var returnHtml = '';
		returnHtml += '					<li>';
		returnHtml += '						<div class="l1"><span class="date">'+data.show_reg_date+'</span></div>';
		returnHtml += '						<div class="l2">';
		returnHtml += '							<span class="tit">'+data.cb_info+'</span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="l3"><span>'+data.show_pay_type+'</span> </div>';
		returnHtml += '						<div class="l4">';
		returnHtml += '							<span class="point">'+data.show_point+'</span>';
		if(isDefined(data.show_remaining_expire_time) == true && data.show_remaining_expire_time != '-'){
			returnHtml += '							<span class="text-muted small-font">('+data.show_remaining_expire_time+')<span>';
		}
		returnHtml += '						</div>';
		returnHtml += '					</li>';
	try{
	    return returnHtml;
    }finally {
			data, returnHtml = null;
   	}
};


//마이페이지 > 포인트 > 포인트 충전 및 적립 내역 : 사용내역
MOBILE_TEMPLETE.MY_PAGE.POINT.point_used.GET_HTML = function(data) {
	console.log('MOBILE_TEMPLETE.MY_PAGE.POINT.point_used', data);
	var showTitle = data.show_title;
	var showUsedType = '';
	if(isDefined(data.show_use_type) == true && isDefined(data.show_title) == false){
		showTitle = data.show_use_type;
	}else{
		showUsedType = data.show_use_type;
	}

	var returnHtml = '';
		returnHtml += '					<li>';
		returnHtml += '						<div class="l1"><span class="date">'+data.show_reg_date+'</span></div>';
		returnHtml += '						<div class="l2">';
		/*
		if(isDefined(showUsedType) == true){
			returnHtml += '						<span class="t-tit">['+data.show_use_type+']</span>';
		}
		*/
		returnHtml += '							<span class="tit">'+showTitle+'</span>';
		returnHtml += '						</div>';
		returnHtml += '						<div class="l3"><span>'+data.show_pay_type+'</span></div>';
		returnHtml += '						<div class="l4"><span class="point">'+data.show_cash_point+''+data.show_pay_str+'</span></div>';
		returnHtml += '					</li>';
	try{
	    return returnHtml;
    }finally {
			data,showTitle, showUsedType, returnHtml = null;
   	}
};



//마이페이지 > 포인트 > 보너스, 쿠폰 적립 및 사용 내역
MOBILE_TEMPLETE.MY_PAGE.POINT.mileage_list.GET_HTML = function(data) {
	console.log('MOBILE_TEMPLETE.MY_PAGE.POINT.mileage_list.GET_HTML', data);

	var returnHtml = '';
		returnHtml += '					<li>';
		returnHtml += '						<div class="l1"><span class="date">'+data.show_reg_date+'</span></div>';
		returnHtml += '						<div class="l2"><span class="tit">'+data.show_title+'</span></div>';
		returnHtml += '						<div class="l3"><span>'+data.show_type_msg+'</span> </div>';
		returnHtml += '						<div class="l4">';
		returnHtml += '							<span class="point">'+data.used_mileage+'M</span>';
		//returnHtml += '							<span class="text-muted small-font">'+data.get_point+'<span>';
		returnHtml += '						</div>';
		returnHtml += '					</li>';
	try{
	    return returnHtml;
    }finally {
			data, returnHtml = null;
   	}
};

//마이 셀러
MOBILE_TEMPLETE.MY_SELLER = {};

MOBILE_TEMPLETE.MY_SELLER.MINFO = {};
//마이 셀러 : comment list
MOBILE_TEMPLETE.MY_SELLER.MINFO.comments = function(logType, data) {
	console.log('MOBILE_TEMPLETE.MY_SELLER.MINFO.comments', logType);
	console.log(data);

	var returnHtml = '';

		returnHtml += '			<div class="r_wrap '+data.show_grade_icon+'">';
		returnHtml += '				<span class="f_ico"></span>';
		//returnHtml += '				<span class="btn_gift">쿠폰지급</span>';
		returnHtml += '				<div class="r_txt_wrap">';
		returnHtml += '					<div class="top">';
		returnHtml += '						<span class="name">'+data.show_write_nickname+'</span>';
		returnHtml += '						<span class="bar">|</span><span class="date">'+data.show_reg_date+'</span>';
		if(data.bc_is_down_coupon != '1'){
			returnHtml += '					<span class="btn_gift">쿠폰지급</span>';
		}
		returnHtml += '					</div>';
		returnHtml += '					<p class="t_txt">'+data.show_bc_contents+'</p>';
		returnHtml += '					<p class="p_tit">'+data.bbs_title+'</p>';
		returnHtml += '				</div>';
		if(parseInt(data.bc_reply_cnt) > 0 && isDefined(data.show_reply_contents) == true){
			returnHtml += '				<div class="r_depth2">';
			returnHtml += '					<span class="bg"></span>';
			returnHtml += '					<div class="txt">';
			returnHtml += '						<p>'+data.show_reply_contents+'</p>';
			returnHtml += '					</div>';
			returnHtml += '				</div>';
		}else{
			var commentSectionName = 'bbs-comment-list-section-name-'+data.bbs_comment_idx;
	    var sellerReplyInputFormName = "sellersViewCommentWriteForm_"+data.bbs_comment_idx+"_"+data.is_best;
			returnHtml += '';
			returnHtml += '				<div class="reply_input_area">';
			returnHtml += '		<form name="'+sellerReplyInputFormName+'" id="'+sellerReplyInputFormName+'" class="common-comment-write-form">';
		  returnHtml += '			<input type="hidden" name="onplay_rating" id="contentsViewCommentWriteForm_onplay_rating" value="9"/>';
		  returnHtml += '			<input type="hidden" name="comment_type" value="contents"/>';
		  returnHtml += '			<input type="hidden" name="reply_idx" value="'+data.bbs_comment_idx+'"/>';
		  returnHtml += '			<input type="hidden" name="idx" value="'+data.bc_target_idx+'"/>';
		  returnHtml += '			<input type="hidden" name="target" value="reply-contents-wrap-'+commentSectionName+'"/>';
		  returnHtml += '			<input type="hidden" name="member" value="'+data.read_member_idx+'"/>';
		  returnHtml += '			<input type="hidden" name="location" value="sellermanager"/>';
			returnHtml += '					<textarea name="comment_contents" id="comment_contents" placeholder="댓글에 대한 답글을 입력해주세요"  class="r_input" ></textarea><span class="btn_submit"  onclick="MOBILE_COMMON.COMMENT.onclickWriteCommentFormAction(\''+sellerReplyInputFormName+'\')";>등록</span>';
			returnHtml += '			</div>';
			returnHtml += '		</form>';
		}
        returnHtml += '			</div>';

	try{
	    return returnHtml;
    }finally {
			logType, data, returnHtml = null;
   	}
};

MOBILE_TEMPLETE.MY_SELLER.MLOG = {};
//마이 셀러 : log
MOBILE_TEMPLETE.MY_SELLER.MLOG.sales_history = function(logType, data) {
	console.log('MOBILE_TEMPLETE.MY_SELLER.MLOG.sales_history', logType);
	console.log(data);

	var returnHtml = '';
		returnHtml += '				<li class="l_section">';
		returnHtml += '					<div class="tit_area">';
		returnHtml += '						<div class="l_info">';
		returnHtml += '							<span class="num">'+data.idx+'</span><span class="bar">|</span><span class="name">'+data.show_nickname+'</span><span class="bar">|</span><span class="date">'+data.show_log_date+'</span><span class="bar">|</span><span class="get_point">+'+data.show_log_cash+' '+data.show_pay_type+'</span>';
		returnHtml += '						</div>';
		returnHtml += '						<p class="txt_over"><span class="txt">'+data.show_title+'</span></p>';
		returnHtml += '					</div>';
		returnHtml += '				</li>';
	try{
	    return returnHtml;
    }finally {
			logType, data, returnHtml = null;
   	}
};



MOBILE_TEMPLETE.PAGE = {};


MOBILE_TEMPLETE.PAGE.mobileOnpickRankHtml = function(data, onpickType){
	console.log('MOBILE_TEMPLETE.PAGE.mobileOnpickRankHtml');
	console.log(data);
	var showThumbnail = data.rank_thumbnail;
	if (showThumbnail.indexOf('//') < 0) {
		showThumbnail = '//pic.onplay.co.kr'+data.rank_thumbnail;
	}
	var channelIdx = '';
	if(isDefined(data.channel_content_idx)){
		channelIdx = data.channel_content_idx;
	}
	var channelType = 'movie';
	if(data.rank_cate1 == 12000 || data.rank_group == 'broadcast'){
		channelType = 'broadcast';
	}
	if(isDefined(data.rank_group)){
		channelType = data.rank_group;
	}

	var returnHtml = '';
		returnHtml += '			<li style="display: inline-block;" data-idx="'+channelIdx+'" data-bro="" data-rank_type="'+data.rank_type+'" data-type="'+channelType+'" data-cate="'+data.rank_cate1+'" data-search="'+data.rank_keyword+'" data-adult="'+data.rank_is_adult+'" data-copy="1" onclick="GO_CHANNEL(this);">';
		//returnHtml += '				<span><img class="disk-image-lazy" loading="lazy" data-src="'+showThumbnail+'" alt=""></span>';
		returnHtml += '				<span><img class="disk-image-lazy" loading="lazy" src="" data-src="'+showThumbnail+'" alt=""></span>';
		returnHtml += '				<span class="p_tit">'+data.rank_bbs_title+'</span>';
		returnHtml += '			</li>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data,onpickType,showThumbnail,channelIdx,channelType = null;
   	}
}

MOBILE_TEMPLETE.PAGE.categoryTopOnpickContenstsHtml = function(rankData, rankName, rankCode, onpick_type){
	console.log('MOBILE_TEMPLETE.PAGE.categoryTopOnpickContensts', rankData);
	console.log(rankData);
	var rankCount = rankData.length;
	if(rankCount > 5){
		 rankCount = 6;
	}
	var eleWidth = 139 * rankCount;

	var returnHtml = '';
		returnHtml += '	<h2 class="tit"><span class="t_green"></span>'+rankName+'</h2>';
		returnHtml += '	<span class="c_more" data-type="'+onpick_type+'" data-code="'+rankCode+'" onclick="GO_ONPICK(this);">더보기 &gt;</span>';
		returnHtml += '	<div class="poster_list horizontal-scroll">';
		returnHtml += '		<ul style="width:'+eleWidth+'px">';
		var kc = 0;
		for(var k in rankData){
			if(kc > 5){
				break;
			}
			returnHtml += MOBILE_TEMPLETE.PAGE.mobileOnpickRankHtml(rankData[k], onpick_type);
			kc++;
		}
		//returnHtml += '			<li><span><img src="/_static/mobile/images/temp/on_poster_1.jpg" alt=""></span></li>';
		//returnHtml += '			<li><span><img src="/_static/mobile/images/temp/on_poster_1.jpg" alt=""></span></li>';
		//returnHtml += '			<li><span><img src="/_static/mobile/images/temp/on_poster_1.jpg" alt=""></span></li>';
		//returnHtml += '			<li><span><img src="/_static/mobile/images/temp/on_poster_1.jpg" alt=""></span></li>';
		returnHtml += '		</ul>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml,eleWidth,rankName,rankCode, rankData, onpick_type, rankCount,  kc = null;
   	}
};

//최근 검색어
MOBILE_TEMPLETE.PAGE.searchFormGetRecentSearchKeywordListHtml = function(rKeyData, rOrder){
	//console.log('MOBILE_TEMPLETE.PAGE.searchFormGetRecentSearchKeywordListHtml', rKeyData);
	var returnHtml = '';
		returnHtml += '<li class="recent-list-item">';
		returnHtml += '	<span class="word" data-kw="'+rKeyData+'" onclick="MOBILE_PAGE.search_form.setSearchHistoryKeyword(this);">'+rKeyData+'</span>';
		returnHtml += '	<span class="btn_delete" data-kw="'+rKeyData+'" onclick="MOBILE_PAGE.search_form.delSearchHistoryKeyword(this);"></span>';
		returnHtml += '</li>';

	try{
	    return returnHtml;
    }finally {
			returnHtml,rKeyData, rOrder = null;
   	}
};


//온플 추천 테마 키워드
MOBILE_TEMPLETE.PAGE.mobileChannelThemeTopThemeTagHtml = function(tagData){
	//console.log('MOBILE_TEMPLETE.PAGE.themeTopThemeTagHtml', tagData);

	var tagLink = "#!action=theme&k="+encodeURIComponent(tagData.rank_theme_tags_keyword);
	var returnHtml = '';
		returnHtml += '<a href="'+tagLink+'"><span class="tag">#'+tagData.rank_theme_tags_keyword+'</span></a>';

	try{
	    return returnHtml;
    }finally {
			returnHtml,tagData,tagLink = null;
   	}
};


//테마리스트
/*
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
*/

//테마리스트
MOBILE_TEMPLETE.PAGE.mobileChannelThemeListHtml = function(data){
	//console.log('MOBILE_TEMPLETE.PAGE.mobileChannelThemeListHtml');
	//console.log(data);

	var themeContentsList = [];
	if(isDefined(data.tlist)){
		themeContentsList = data.tlist;
	}
	var scrollWidth = themeContentsList.length  * 143 + 20;
	var returnHtml = '';

		//143
		returnHtml += '				<div class="movie_list detail mobile-channel-theme-list" id="mobile-theme-wrap-'+data.channel_theme_idx+'">';
		returnHtml += '					<h2 class="tit">'+data.theme_title+'</h2>';

		returnHtml += '					<div class="theme-contents-list-wrap horizontal-scroll">';
		returnHtml += '					<ul class="theme-list" style="width:'+scrollWidth+'px;">';
		for(var ti = 0; ti < themeContentsList.length; ti++){
			returnHtml += '						<li data-idx="'+data.channel_theme_idx+'" data-url="'+themeContentsList[ti].show_theme_mobile_link+'" onclick="MOBILE_PAGE.theme.onclickThemeContentsItem(this)">';
			returnHtml += '							<span class="m_img"><img src="'+themeContentsList[ti].empty_thumb+'" class="disk-image-lazy" data-src="'+themeContentsList[ti].show_theme_content_thumbnail+'" data-lazy="'+themeContentsList[ti].show_theme_content_thumbnail+'"></span>';
			returnHtml += '							<span class="m_tit">'+themeContentsList[ti].show_title+'</span>';
			returnHtml += '						</li>';
		}
		returnHtml += '					</ul>';
		returnHtml += '					</div>';

		returnHtml += '				</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, data, themeContentsList, scrollWidth  = null;
   	}

};

//channel : search
MOBILE_TEMPLETE.PAGE.getSearchChannelMobileHtml = function(data, offSetList) {
	console.log('MOBILE_TEMPLETE.PAGE.getSearchChannelMobileHtml', offSetList);
	console.log(data);
	var eleId = 'channel-search-list-item-'+data.channel_content_idx;
	var emptyThumbnail = '/_static//web/images/common/m_no_img_143_207.jpg';
	var returnHtml = '';
		if(data.IS_MOVIE == 1){
			returnHtml += '			<li class="channel-list-item channel-search-list-item" id="'+eleId+'" style="width:'+offSetList.width+'px;height:'+offSetList.height+'px;">';
			returnHtml += '				<span class="m_img" onclick="MOBILE_PAGE.channel_search.onclickChannelContentsItem(this);" data-ani="1" data-cate="'+data.cc_cate1+'" data-keyword="'+data.cc_title+'" data-type="movie" data-idx="'+data.channel_content_idx+'" data-adult="'+data.cc_is_adult+'"><img class="disk-image-lazy" src="'+emptyThumbnail+'" data-src="'+data.show_thumbnail_img+'" alt=""></span>';
			returnHtml += '				<span class="m_tit">'+data.cc_title+'</span>';
			returnHtml += '				<span class="m_cate">'+data.show_genre+'</span>';
			returnHtml += '				<span class="m_date">'+data.show_release_date+'</span>';
			returnHtml += '				<div class="score_wrap">';
			returnHtml += '					<div class="star_score">';
			returnHtml += '						<span class="up_img"></span>';
			returnHtml += '						<span class="s_size" style="width:'+data.show_rank_grade_per+'%;"></span>';
			returnHtml += '					</div>';
			//returnHtml += '					<span class="score">'+data.show_rank_grade+'</span>';
			returnHtml += '				</div>';
			returnHtml += '			</li>';
		}else if(data.IS_BROADCAST == 1){
			returnHtml += '					<li class="channel-list-item channel-broadcast-list-item" id="'+eleId+'" onclick="MOBILE_PAGE.channel_search.onclickChannelContentsItem(this);" data-ani="1" data-cate="'+data.cc_cate1+'" data-keyword="'+data.cc_title+'" data-type="broadcast" data-idx="'+data.channel_content_idx+'" data-adult="'+data.cc_is_adult+'">';
			returnHtml += '						<div class="img_area">';
			returnHtml += '							<span class="c_img"><img class="disk-image-lazy" src="'+emptyThumbnail+'" data-src="'+data.show_thumbnail_img+'" alt="'+data.cc_title+'" data-type="poster" onerror="utility.ui.onErrorImgLoadViewContents(this);"></span>';
			//returnHtml += '							<span class="b_ico on"></span>';
			if(data.cb_is_running == 1){
				returnHtml += '							<span class="b_ico on"></span>';
			}
			returnHtml += '						</div>';
			returnHtml += '						<div class="txt_area">';
			returnHtml += '							<div class="i_line">';
			returnHtml += '								<p class="p_name">'+data.cc_title+'</p>';
			returnHtml += '							</div>';
			returnHtml += '							<div class="i_line">';
			returnHtml += '								<span>'+data.show_cb_station+'</span><span class="bar">|</span><span>'+data.show_genre+'</span><span class="bar">|</span><span>'+data.cc_watch_grade+'</span>';
			returnHtml += '							</div>';
			returnHtml += '							<div class="i_line">';
			returnHtml += '								<span>'+data.show_release_date+'</span>';
			returnHtml += '							</div>';
			returnHtml += '							<div class="i_line">';
			returnHtml += '								<span class="link">'+data.show_cc_cast+'</span>';
			returnHtml += '							</div>';
			returnHtml += '						</div>';
			returnHtml += '					</li>';


		}else{
			returnHtml += '';
		}


	try{
	    return returnHtml;
    }finally {
			data, returnHtml, offSetList = null;
   	}
};

//회원 : 구독채널 - 가로 스크롤형
MOBILE_TEMPLETE.PAGE.getMemberSubscribeListMobileHtml = function(data) {
	console.log('getMemberSubscribeListMobileHtml', data)

	var tmpBbs = null;
	var tmpListHtml = [];
	var tmpBbsListData = null;
	if(isDefined(data.contents_list)){
		tmpBbsListData = data.contents_list;
	}
	console.log('bbsListData', tmpBbsListData);
	var bbsListCount = 0;
	if(isDefined(tmpBbsListData) == true){
		bbsListCount = tmpBbsListData.length;
		for(var t =0; t < bbsListCount; t++){
			tmpBbs = new Contents_list(t+1, 0, 'channel');
			tmpBbs.setData(tmpBbsListData[t]);
			tmpListHtml.push(tmpBbs.getMobileCategoryListHtml(false, 'channel'));
		}
	}
	var bbsListWidth = 140 * bbsListCount + 10;
	var channelInfo = data.seller_data;

	var returnHtml = '';
		returnHtml += '				<div class="content_slide_wrap">';
		returnHtml += '					<h2 class="tit"><span class="c_id">'+channelInfo.seller_nickname+'</span></h2>';
		returnHtml += '					<span class="c_more">더보기 &gt;</span>';
		returnHtml += '					<div class="swipe_wrap">';
		returnHtml += '						<div class="swipe_area">';
		returnHtml += '							<div class="c_list">';
		returnHtml += '								<ul style="width:'+bbsListWidth+'px">';
		returnHtml += 									tmpListHtml.join('');
		returnHtml += '								</ul>';
		returnHtml += '							</div>';
		returnHtml += '						</div>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';


	try{
	    return returnHtml;
    }finally {
			data, returnHtml, tmpBbs,tmpListHtml,tmpBbsListData,bbsListCount, bbsListWidth, channelInfo  = null;
   	}
};



//회원 : 마이 구독채널 - list 형
MOBILE_TEMPLETE.PAGE.getMemberMySubscribeListMobileHtml = function(data) {
	console.log('getMemberSubscribeListMobileHtml', data)

	var tmpBbs = null;
	var tmpListHtml = [];
	var tmpBbsListData = null;
	if(isDefined(data.contents_list)){
		tmpBbsListData = data.contents_list;
	}
	console.log('bbsListData', tmpBbsListData);
	var bbsListCount = 0;
	if(isDefined(tmpBbsListData) == true){
		bbsListCount = tmpBbsListData.length;
		for(var t =0; t < bbsListCount; t++){
			tmpBbs = new Contents_list(t+1, 0, 'channel');
			tmpBbs.setData(tmpBbsListData[t]);
			tmpListHtml.push(tmpBbs.getMobileCategoryListHtml(false, 'channel'));
		}
	}
	var bbsListWidth = 140 * bbsListCount + 10;
	var channelInfo = data.seller_data;
	var listEleName = "mobile-my-page-subscribe-list-item-"+channelInfo.member_subscribe_idx;

	var returnHtml = '';
		//returnHtml += '				<div class="content_slide_wrap">';
		returnHtml += '				<div class="content_50_list content_my_channel_wrap" id="'+listEleName+'">';
		returnHtml += '					<h2 class="tit mobile-my-page-subscribe-item">';
		returnHtml += '						<span class="c_id" data-seller="'+channelInfo.seller_nickname+'" data-idx="'+channelInfo.seller_idx+'" data-member="" onclick="GO_SELLER(this);">'+channelInfo.seller_nickname+'</span>';
		returnHtml += '						<span class="btn_clear" data-idx="'+channelInfo.member_subscribe_idx+'" data-target="#'+listEleName+'" onclick="MOBILE_PAGE.mypage.channel.channel_management.unsubscribe(this);">구독해제</span>';
		returnHtml += '					</h2>';
		returnHtml += '					<span class="c_more" data-seller="'+channelInfo.seller_nickname+'" data-idx="'+channelInfo.seller_idx+'" data-member="" onclick="GO_SELLER(this);">더보기 &gt;</span>';
		returnHtml += '					<div class="c_list">';
		returnHtml += '						<ul class="mobile-channel-seller-list-wrap">';
		returnHtml += 								tmpListHtml.join('');
		returnHtml += '						</ul>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';


	try{
	    return returnHtml;
    }finally {
			data, returnHtml, tmpBbs,tmpListHtml,tmpBbsListData,bbsListCount, bbsListWidth, channelInfo, listEleName  = null;
   	}
};



//회원 : 마이 구독채널 관리 -
MOBILE_TEMPLETE.PAGE.getMemberMySellerChannelListHtml = function(data) {
	console.log('getMemberMySellerChannelListHtml', data)
	var defaultProfileImg = "/_static/mobile/images/temp/ch_img_2.png";
	var show_seller_profile_picture = defaultProfileImg;
	if(isDefined(data.seller_profile_picture)){
		show_seller_profile_picture = data.seller_profile_picture;
	}
	var showMsg = '';
	if(isDefined(data.seller_theme)){
		showMsg += data.seller_theme;
	}
	if(isDefined(data.seller_memo)){
		showMsg +=' '+data.seller_memo;
	}

	if(isDefined(data.ms_memo)){
		showMsg = data.ms_memo;
		if(isDefined(data.seller_theme) == true){
			showMsg += ' : '+data.seller_theme;
		}
	}
	var showNickname = '';
	if(isDefined(data.seller_nickname)){
		showNickname = data.seller_nickname;
	}
	var listEleName = "mobile-my-page-subscribe-item-"+data.member_subscribe_idx;
	var returnHtml = '';

		returnHtml += '<li class="mobile-my-page-subscribe-item" id="'+listEleName+'">';
		returnHtml += '	<span class="c_img"><img class="disk-image-lazy img" data-src="'+show_seller_profile_picture+'" src="'+defaultProfileImg+'" alt=""></span>';
		returnHtml += '	<div class="c_info">';
		returnHtml += '		<p class="t_txt"><span class="name">'+showNickname+'</span> <span class="intro">'+showMsg+'</span></p>';
		returnHtml += '		<span class="btn_delete" data-idx="'+data.member_subscribe_idx+'" data-target="#'+listEleName+'" onclick="MOBILE_PAGE.mypage.channel.channel_management.unsubscribe(this);">구독해제</span>';
		returnHtml += '	</div>';
		returnHtml += '</li>';
/*
		returnHtml += '<li>';
		returnHtml += '	<span class="c_img"><img src="'+rank.seller_profile_picture+'" alt=""></span>';
		returnHtml += '	<div class="c_info">';
		returnHtml += '		<p class="t_txt"><span class="name">'+rank.seller_nickname+'</span> <span class="intro">'+rank.seller_theme+'</span></p>';
		returnHtml += '		<div class="cate_wrap">';
		for(var i in rank.seller_category_list){
			cKey = rank.seller_category_list[i];
			cName = diskCategory.get_cate_name(cKey);
			returnHtml += '				<span class="cate seller-category-tag tags-'+cKey+'" data-seller="'+rank.seller_nickname+'" data-idx="'+rank.seller_idx+'" data-cate1="'+cKey+'" onclick="GO_SELLER(this);">#'+cName+'</span>,';
		}
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</li>';
*/


	try{
	    return returnHtml;
    }finally {
			data, returnHtml  = null;
   	}
};


//판매자 카드
MOBILE_TEMPLETE.PAGE.getChannelSellerInfoCardHtml = function(seller) {
	console.log('getChannelSellerInfoCardHtml', seller)
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var cKey, cName;
	var hasPic = 'no_img_b';
	if(isDefined(seller.seller_profile_picture)){
		hasPic = '';
	}
	var returnHtml = '';
		returnHtml += '		<div class="channel_seller_info">';
		returnHtml += '			<div class="top '+hasPic+'">';
		returnHtml += '				<div class="c_img"><img src="'+seller.show_seller_profile_picture+'"></div>';
		returnHtml += '				<div class="c_info">';
		//returnHtml += '					<p class="c_id"><span class="ico"></span><span class="txt">'+seller.seller_nickname+'</span></p>';
		if(isDefined(seller.show_seller_theme)){
			returnHtml += '					<p class="c_txt"><span class="s-theme">'+seller.show_seller_theme+'</span><br><span class="s-memo">'+seller.show_seller_memo+'</span></p>';
		}
		//returnHtml += '					<div class="v_num">';
		//returnHtml += '						<span class="follower">구독자 <span>'+disk_number_format(seller.seller_contetns_subscribe_cnt)+'</span></span>';
		//returnHtml += '						<span class="bar">|</span><span class="today">게시자료 <span>'+disk_number_format(seller.seller_contents_up_cnt)+'</span></span>';
		//returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="tag_area">';
		returnHtml += '				<span class="tag seller-category-tag tags-0 active" data-seller="'+seller.seller_nickname+'" data-idx="'+seller.seller_idx+'" data-cate1=""  onclick="GO_SELLER(this);">#전체</span>';
		for(var i in seller.show_seller_category){
			cKey = seller.show_seller_category[i];
			cName = diskCategory.get_cate_name(cKey);
			returnHtml += '				<span class="tag seller-category-tag tags-'+cKey+'" data-seller="'+seller.seller_nickname+'" data-idx="'+seller.seller_idx+'" data-cate1="'+cKey+'" onclick="GO_SELLER(this);">#'+cName+'</span>';
		}
		returnHtml += '			</div>';
		returnHtml += '			<div class="channel_btn_wrap">';
		returnHtml += '				<span class="c_btn follow" data-idx="'+seller.seller_idx+'" onclick="MOBILE_COMMON_FUN.onclickMobileActionSubscribeSellerChannel(this);"><span class="ico"></span> 구독 <span style="font-size:10px;">'+disk_number_format(seller.seller_contetns_subscribe_cnt)+'</span></span>';
		returnHtml += '				<span class="c_btn note" data-seller="'+seller.seller_idx+'" data-kind="" data-reply="0" data-sender="" data-sender_nick="" data-receiver="'+seller.member_idx+'" data-receiver_nick="'+seller.seller_nickname+'" data-idx="" onclick="MOBILE_COMMON.MEMO.openMobileBbsMemoForm(this);"><span class="ico"></span> 쪽지</span>';
		returnHtml += '				<span class="c_btn share"><span class="ico"></span> 공유</span>';
		returnHtml += '			</div>';
		returnHtml += '		</div>';

	try{
	    return returnHtml;
    }finally {
			seller, returnHtml, diskCategory, cKey,cName  = null;
   	}
}


//판매자 채널 랭킹
MOBILE_TEMPLETE.PAGE.getSellerChannelRankingHtml = function(rank) {
	console.log('getSellerChannelRankingHtml', rank)
	var diskCategory = MOBILE_COMMON.DATA.CACHE.CATEGORY;
	var cKey, cName;
	//var sellerCategoryList = seller_category;
	var returnHtml = '';
		returnHtml += '<li>';
		returnHtml += '	<span class="c_img"><img src="'+rank.seller_profile_picture+'" alt=""></span>';
		returnHtml += '	<div class="c_info">';
		returnHtml += '		<p class="t_txt"><span class="name">'+rank.seller_nickname+'</span> <span class="intro">'+rank.seller_theme+'</span></p>';
		returnHtml += '		<div class="cate_wrap">';
		for(var i in rank.seller_category_list){
			cKey = rank.seller_category_list[i];
			cName = diskCategory.get_cate_name(cKey);
			returnHtml += '				<span class="cate seller-category-tag tags-'+cKey+'" data-seller="'+rank.seller_nickname+'" data-idx="'+rank.seller_idx+'" data-cate1="'+cKey+'" onclick="GO_SELLER(this);">#'+cName+'</span>,';
		}
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</li>';



	try{
	    return returnHtml;
    }finally {
			rank, returnHtml, diskCategory, cKey,cName  = null;
   	}
};

//쿠폰 등록 - 메인 리스트
MOBILE_TEMPLETE.PAGE.getCouponMainListHtml = function(data) {

	var couponFromName = 'mobileCouponRegistForm-'+data.coupon_main_idx;
	var preFixedCode = '';
	if(isDefined(data.coupon_pre_fix)){
		preFixedCode = data.coupon_pre_fix;
	}
	var coupon_idx = '';
	if(isDefined(data.coupon_idx)){
		coupon_idx = data.coupon_idx;
	}
	var returnHtml = '';
		returnHtml += '		<div class="coupon_section">';
		returnHtml += '			<div class="coupon_name">';
		returnHtml += '				<p>'+data.coupon_main_m_title+'</p>';
		returnHtml += '			</div>';
		returnHtml += '			<div class="coupon_img">';
		returnHtml += '				<img src="'+data.coupon_main_m_img_url+'" alt="">';
		returnHtml += '			</div>';
		returnHtml += '			<div class="coupon_input">';

		returnHtml += '				<form class="mobileCouponRegistForm" name="'+couponFromName+'" id="'+couponFromName+'" method="POST" onsubmit="return false">';
		returnHtml += '					<input type="hidden" name="idx" value="'+data.coupon_main_idx+'" />';
		returnHtml += '					<input type="hidden" name="main_partner" value="'+data.coupon_main_partner+'" />';
		returnHtml += '					<input type="hidden" name="main_title" value="'+data.coupon_main_title+'" />';
		returnHtml += '					<input type="hidden" name="cup_idx" value="'+coupon_idx+'">';
		returnHtml += '					<input type="text" type="number" name="code" autocomplete="off" class="input_style disk-coupon-code-input" placeholder="쿠폰번호를 입력해주세요 (-제외)" value="'+preFixedCode+'">';
		returnHtml += '					<span class="btn_ok" onclick="MOBILE_PAGE.coupon.onclickActionRegist(\''+couponFromName+'\');">등록</span>';

		returnHtml += '				</form>';



		returnHtml += '			</div>';
		returnHtml += '		</div>';
	try{
	    return returnHtml;
    }finally {
			data, returnHtml, couponFromName, preFixedCode = null;
   	}
};



//event list : list html
MOBILE_TEMPLETE.PAGE.getMobileEventListHtml = function(data) {
	console.log('getMobileEventListHtml', data)
	var returnHtml = '';
		returnHtml += '					<li class="e_section mobile-event-list-item" data-ani="1" data-adult="'+data.event_is_adult+'" data-idx="'+data.event_idx+'" data-type="'+data.event_status+'" data-key="'+data.event_key+'" data-title="'+data.event_title+'" onclick="GO_EVENT_VIEW(this);">';
		returnHtml += '						<div class="e_img">';
		returnHtml += '							<img class="disk-image-lazy" src="'+data.empty_thumbnail+'" data-src="'+data.show_event_mobile_thumbnail+'"  alt="'+data.event_title+'">';
		if(data.event_status == 2){
			returnHtml += '						<span class="img_blind"></span>';
		}
		returnHtml += '						</div>';
		returnHtml += '						<div class="e_info">';
		returnHtml += '							<p class="e_tit">'+data.event_title+'</p>';
		returnHtml += '							<p class="e_period">기간 : '+data.show_event_start_time+' ~ '+data.show_event_end_time+'</p>';
		returnHtml += '						</div>';
		returnHtml += '					</li>';
	try{
	    return returnHtml;
    }finally {
			data, returnHtml  = null;
   	}
};

//event list : top banner
MOBILE_TEMPLETE.PAGE.getMobileEventTopBannerHtml = function(data) {
	console.log('MOBILE_TEMPLETE.PAGE.getMobileEventTopBannerHtml', data)
	var returnHtml = '';
		returnHtml += '<div class="swipe-banner-item"><span><img data-lazy="'+data.ui_event_banner_m_thumbnail+'" alt=""></span></div>';
	try{
	    return returnHtml;
    }finally {
			data, returnHtml  = null;
   	}
};

//게시판 코멘트 입력  form html
MOBILE_TEMPLETE.PAGE.getMobileBoardCommentInputFormHtml = function(data) {
	console.log('MOBILE_TEMPLETE.PAGE.getMobileBoardCommentInputFormHtml', data);

	if(isDefined(data) == false){
		console.log('data err');
		return '';
	}
	if(isDefined(data.idx) == false || isDefined(data.type) == false || isDefined(data.group) == false){
		console.log('data idx err');
		return '';
	}
	var commentType = data.type;
	var boardType = data.group;

	var $comment_form_ele = 'mobileBoardViewCommentWriteForm-'+data.idx;
	var $comment_inner_target_ele = "disk-board-view-comment-list-warp-"+data.type+"-"+data.idx;
	//var $comment_info_ele = "comment-list-board-view-pagnation-controller-"+data.idx;

	var loc = 'board_view';
	if(isDefined(data.loc)){
		loc = data.loc;
	}

	var placeholderMsg = '간단하게 댓글을 남겨주세요.(10자이상)';
	if(data.type == 'qa'){
		placeholderMsg = '추가 문의사항을 입력해주세요.(10자이상)';
	}


	var returnHtml = '';

		returnHtml += '<div class="reply_input_wrap">';
		returnHtml += '	<form name="mobileBoardViewCommentWriteForm" id="'+$comment_form_ele+'" class="common-comment-write-form">';
		returnHtml += '		<input type="hidden" name="onplay_rating" id="mobileBoardViewCommentWriteForm_onplay_rating-'+data.idx+'" value=""/>';
		returnHtml += '		<input type="hidden" name="comment_type" value="'+commentType+'"/>';
		returnHtml += '		<input type="hidden" name="board_name" value="'+boardType+'">';

		returnHtml += '		<input type="hidden" name="idx" value="'+data.idx+'"/>';
		returnHtml += '		<input type="hidden" name="member" value=""/>';
		returnHtml += '		<input type="hidden" name="target" value="'+$comment_inner_target_ele+'"/>';
		returnHtml += '		<input type="hidden" name="location" value="'+loc+'"/>';
		returnHtml += '		<input type="hidden" name="is_mobile" value="1"/>';
		returnHtml += '		<div class="reply_input_area">';
		returnHtml += '			<textarea name="comment_contents" id="mobileBoardViewCommentWriteForm_comment_contents" class="r_input" placeholder="'+placeholderMsg+'"></textarea>';
		returnHtml += '			<span class="btn_submit" onclick="MOBILE_COMMON.COMMENT.onclickWriteCommentFormAction(\''+$comment_form_ele+'\');">등록</span>';
		//returnHtml += '			<div class="login_check_area disk-need-login-contents" onclick="GO_LOGIN(this)">';
		//returnHtml += '				<p class="txt_area">로그인 후 이용해주세요.</p>';
		//returnHtml += '			</div>';
		returnHtml += '		</div>';
		returnHtml += '	</form>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			data, returnHtml, commentType, boardType, $comment_form_ele, $comment_inner_target_ele, loc, placeholderMsg  = null;
   	}
};

//받은 쪽지함
MOBILE_TEMPLETE.PAGE.getMobileMemoListHtml = function(data, myId) {
	console.log('MOBILE_TEMPLETE.PAGE.getMobileEventTopBannerHtml', data);
	var showNickname = '';
	var memoType = data.memo_type;
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
		/*
		returnHtml += '			<input type="hidden" name="sender_idx" value="'+data.idx+'">';
		returnHtml += '			<input type="hidden" name="sender_nick" value="'+data.sender+'">';
		returnHtml += '			<input type="hidden" name="receiver_idx" value="'+data.receiver+'">';
		returnHtml += '			<input type="hidden" name="receiver_nick" value="'+data.receiver_nick+'">';
		returnHtml += '			<input type="hidden" name="memo_is_reply" value="'+data.reply+'">';
		returnHtml += '			<input type="hidden" name="seller" value="'+data.seller+'">';
		*/
	var eleName = 	'mypage-mobile-bbs-memo-item-'+data.bbs_memo_idx;
		
	var returnHtml = '';
		
		returnHtml += '<li class="l_section '+is_read+' '+eleName+'">';
		returnHtml += '	<div class="tit_area" data-target=".'+eleName+'" data-idx="'+data.bbs_memo_idx+'" data-type="'+memoType+'" data-readed="'+isReaded+'" data-group="news" data-id="'+myId+'" data-action="read" id="mypage-bbs-memo-item-'+data.bbs_memo_idx+'" data-is_read="'+isReaded+'" data-idx="'+data.bbs_memo_idx+'" onclick="MOBILE_PAGE.mypage.news.onClickMemoRead(this);">';
		returnHtml += '		<div class="l_info">';
		returnHtml += '			<span class="date">'+data.show_date+'</span><span class="bar"></span><span class="name">'+data.sender_nick+'</span>';
		returnHtml += '		</div>';
		returnHtml += '		<p class="txt_over"><span class="txt">'+data.show_title+'</span></p>';
		returnHtml += '		<span class="ico_arrow"></span>';
		returnHtml += '	</div>';
		returnHtml += '	<div class="content_view">';
		returnHtml += '		<div class="content_area">';
		returnHtml += '			<p>'+data.show_contents+'</p>';
		returnHtml += '		</div>';
		returnHtml += '		<div class="btn_wrap">';
		if(memoType == 'send'){
			returnHtml += '			<span class="c_btn reply" data-reply="2" data-idx="'+data.sender_idx+'" data-sender="'+data.sender_nick+'" data-receiver="'+data.receiver_idx+'" data-receiver_nick="'+data.receiver_nick+'" data-seller="" onclick="MOBILE_COMMON.MEMO.openMobileBbsMemoForm(this);"><span class="ico"></span> 쪽지보내기 <span class="bar"></span></span>';
		}else{
			returnHtml += '			<span class="c_btn reply" data-reply="1" data-idx="'+data.receiver_idx+'" data-sender="'+data.receiver_nick+'" data-receiver="'+data.sender_idx+'" data-receiver_nick="'+data.sender_nick+'" data-seller="" onclick="MOBILE_COMMON.MEMO.openMobileBbsMemoForm(this);"><span class="ico"></span> 답장하기 <span class="bar"></span></span>';
			returnHtml += '			<span class="c_btn delete" data-idx="'+data.bbs_memo_idx+'" data-type="'+memoType+'" data-readed="'+isReaded+'" data-group="news" data-id="'+myId+'" data-action="del" id="mypage-bbs-memo-item-'+data.bbs_memo_idx+'" data-is_read="'+isReaded+'" data-idx="'+data.bbs_memo_idx+'" onclick="MOBILE_PAGE.mypage.news.onClickMemoDelete(this);"><span class="ico"></span> 삭제하기</span>';	
		}
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</li>';
		
	try{
	    return returnHtml;
    }finally {
			data, returnHtml  = null;
   	}
};



/* contents list - rank */
MOBILE_TEMPLETE.CONTENTS_LIST = {};
MOBILE_TEMPLETE.CONTENTS_LIST.getMobileRankingContentsListHtml = function(rankData, odr, isAdultMember) {
	console.log('MOBILE_TEMPLETE.CONTENTS_LIST.getMobileRankingContentsListHtml');
	console.log(rankData);

	var linkType = 'rank';
	//var empty_thumb_url = rankData.empty_thumb_url;
	var is_adult_member = false
	if(isDefined(isAdultMember)){
		is_adult_member = isAdultMember;
	}
	//console.log('is_adult_member',is_adult_member);
	if(rankData.rank_is_adult == 1 && rankData.is_ad_domain == 1){
		return '';
	}
	var showCateDarkDeep ="thumb_cate_"+rankData.rank_bbs_cate1;
	
	var isCoinEvent = 'non-event';
	var coinIcon = 'p_ico';
	
	if(isDefined(rankData.is_sale)){
		if(rankData.is_sale == 1){
			isCoinEvent = 'event_sale';
			coinIcon = 'icon_sale';
			//isCoinEvent = 'event_10';
			if(rankData.show_rank_contnets_prices == 10){
				coinIcon = 'ico_e_10';
				isCoinEvent = 'event_10';	
			}else if(rankData.is_vip_event == 1){
				coinIcon = 'icon_vip';
			}
		}
	}		
	//is_adult_member
	var is_adult_layer = '';
	if(is_adult_member != true && rankData.rank_is_adult == 1){
		is_adult_layer = 'thumb-need-auth-adult';
	}
	
	var contentsEleName = 'mobile-contents-list-'+rankData.rank_bbs_idx;
	var returnHtml = '';
		returnHtml += '			<li class="mobile-contents-list  cate-'+rankData.rank_bbs_cate1+' '+is_adult_layer+' '+linkType+' mobile-contents-list-'+linkType+' ">';

		returnHtml += '				<div class="mobile-contents-area '+contentsEleName+'" data-idx="'+rankData.rank_bbs_idx+'" data-cate1="'+rankData.rank_bbs_cate1+'" data-cate2="'+rankData.rank_cate2+'" data-adult="'+rankData.rank_is_adult+'" data-state="'+rankData.rank_state+'" data-copy="'+rankData.rank_is_copy+'" data-link="'+linkType+'" onclick="GO_CONTENTS(this);">';

		returnHtml += '					<div class="c_img">';
		returnHtml += '						<img class="disk-image-lazy img" src="'+rankData.empty_thumb_url+'" data-src="'+rankData.show_rank_thumbnail+'" alt="">';
		returnHtml += '						<span class="ico '+rankData.is_hd_ico+'"></span>';
		if(isDefined(rankData.show_rank_bbs_play_time) == true){
			returnHtml += '					<span class="time">'+rankData.show_rank_bbs_play_time+'</span>';
		}
		if(rankData.rank_is_adult == 1){
			returnHtml += '					<div class="adult_area">';
			returnHtml += '						<span class="ico_19">19</span>';
			returnHtml += '						<p class="a_txt">성인 인증이 필요합니다</p>';
			returnHtml += '					</div>';
		
			returnHtml += '					<span class="adult_thumb '+showCateDarkDeep+'">';
			returnHtml += '						<span class="a_ico"></span>';
			returnHtml += '					</span>';
		}
		returnHtml += '					</div>';
		returnHtml += '					<div class="c_txt_area '+isCoinEvent+'">';
		returnHtml += '						<p class="c_tit">';
		returnHtml += 							rankData.show_rank_title
		returnHtml += 						'</p>';

		returnHtml += '						<p class="info">';
		returnHtml += '							<span class="cate">'+rankData.show_rank_cate_name+'</span>';
		if(isCoinEvent == 'event_10'){
			returnHtml += '							<span class="bar">|</span><span class="sum"><span class="'+coinIcon+'"></span>'+disk_number_format(rankData.show_rank_contnets_prices)+'</span>';
		}else if(coinIcon == 'icon_vip'){
			returnHtml += '							<span class="bar">|</span><span><span class="'+coinIcon+'"></span><span class="d_sum"><span class="line">'+disk_number_format(rankData.orignal_cash)+'</span></span><span class="e_arrow"></span> <span class="p_ico"></span>'+disk_number_format(rankData.show_rank_contnets_prices)+'</span>';
		}else{
			returnHtml += '							<span class="bar">|</span><span class="sum"><span class="'+coinIcon+'"></span>'+disk_number_format(rankData.show_rank_contnets_prices)+'</span>';	
		}
		
		returnHtml += '						</p>';
		returnHtml += '					</div>';
		returnHtml += '				</div>';
		returnHtml += '			</li>';

	try{
	    return returnHtml;
    }finally {
			returnHtml, linkType, contentsEleName, is_adult_member, showCateDarkDeep = null;
   	}
};



/* contentsbuy list */
MOBILE_TEMPLETE.QA_IN_BUY_LIST = {};
MOBILE_TEMPLETE.QA_IN_BUY_LIST.getMobileBuyContentsListHtml = function (buylist){
	console.log('MOBILE_TEMPLETE.QA_IN_BUY_LIST.getMobileBuyContentsListHtml');
	console.log(buylist);

    var returnHtml = '';
    var fordata    = '';
    var moreSpan   = '';

    for(var k in buylist){
                fordata += '			          <li onclick="MOBILE_PAGE.qa_write.bbsInputClick('+buylist[k].bbs_idx +')">';

                    fordata += '			             <div class="c_img">';
                    fordata += '			                  <img src="'+ buylist[k].show_mobile_thumbnail+'" alt="">';
                    fordata += '			                  <span class="ico '+buylist[k].is_hd_ico+'"></span>';
        			fordata += '					<span class="time">'+buylist[k].show_bbs_play_time+'</span>';
                    fordata += '			             </div>';
                    fordata += '			             <div class="c_txt_area">';
                    fordata += '			                  <p class="c_tit">'+buylist[k].show_title+'</p>';
                if(parseInt(buylist[k].down_expire_time) > 0){
                    fordata += '			                  <p class="info"><span class="r_time">남은시간 : '+buylist[k].show_down_expire_time+'</span></p>';
                }else{
                    fordata += '			                  <p class="info"><span class="r_time">'+buylist[k].show_down_expire_time+'</span></p>';
                }
                    fordata += '			                  <p class="info"><span class="name">'+buylist[k].seller_nickname+'</span></p>';
                    fordata += '			             </div>';

                fordata += '			          </li>';
    }

    if(qa_page == 1 ){

    		returnHtml += '			<div class="content_slide_wrap txt_style sub_list type1 card_style innerSubDiv">';
            returnHtml += '			  <div class="c_list">';
            returnHtml += '			      <ul  class="c_list_ul">';
            returnHtml += fordata;
            returnHtml += '			       </ul>';
            returnHtml += '			   </div>';

            returnHtml += '			</div>';

     }else {
        returnHtml += fordata;
     }


	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
}
MOBILE_TEMPLETE.QA_IN_BUY_LIST.getMobileBuyContentsListHtmlVer2 = function (buylist){
	console.log('MOBILE_TEMPLETE.QA_IN_BUY_LIST.getMobileBuyContentsListHtmlVer2');
	console.log(buylist);

    var returnHtml = '';
    var fordata    = '';
    var moreSpan   = '';

    for(var k in buylist){
                fordata += '			          <li onclick="MOBILE_PAGE.qa_write.bbsInputClick('+buylist[k].bbs_idx +')">';

                    fordata += '			             <div class="c_img">';
                    fordata += '			                  <img src="'+ buylist[k].show_mobile_thumbnail+'" alt="">';
                    fordata += '			             </div>';
                    fordata += '			             <div class="c_txt_area">';
                    fordata += '			                  <p class="c_tit">'+buylist[k].show_title+'</p>';
                if(parseInt(buylist[k].down_expire_time) > 0){
                    fordata += '			                  <p class="info"><span class="r_time">남은시간 : '+buylist[k].show_down_expire_time+'</span></p>';
                }else{
                    fordata += '			                  <p class="info"><span class="r_time">'+buylist[k].show_down_expire_time+'</span></p>';
                }
                    fordata += '			                  <p class="info"><span class="name">'+buylist[k].seller_nickname+'</span></p>';
                    fordata += '			             </div>';

                fordata += '			          </li>';
    }

    if(qa_page == 1 ){

    		returnHtml += '			<div class="content_slide_wrap txt_style sub_list type1 card_style innerSubDiv">';
            returnHtml += '			  <div class="c_list">';
            returnHtml += '			      <ul  class="c_list_ul mobile-contents-list-buy_list">';
            returnHtml += fordata;
            returnHtml += '			       </ul>';
            returnHtml += '			   </div>';

            returnHtml += '			</div>';

     }else {
        returnHtml += fordata;
     }


	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

MOBILE_TEMPLETE.VIDEO = {};
//모바일 1분 미리보기
MOBILE_TEMPLETE.VIDEO.getMobilePrevVedeoHtml = function(vEleId, vUrl, vPoster, isBlockVideo, eleData){
	console.log('MOBILE_TEMPLETE.VIDEO.getMobilePrevVedeoHtml', vEleId);
	var vEle = 'mobile-view-video-js-video-player';
	if(isDefined(vEleId)){
		vEle = vEleId;
	}
	if(isDefined(vUrl) == false){
		return '';
	}
	var isBlock = '0';
	if(isBlockVideo){
		isBlock = '1';
	}	
	var returnHtml = '';
		returnHtml += '<video';
		returnHtml += '    id="'+vEle+'" data-block="'+isBlock+'"';
		returnHtml += '    class="vjs-big-play-centered video-js mobile_video_player"';
		returnHtml += '    controls';
		returnHtml += '    preload="auto"';
		if(isDefined(vPoster)){
			returnHtml += '    poster="'+vPoster+'"';
		}
		//returnHtml += '    data-setup=\'{"fluid": true}\' ';
		returnHtml += '    style="min-width: 100%;min-height:auto;">';
		returnHtml += '  <source src="'+vUrl+'" type="video/mp4"></source>';
		returnHtml += '  <p class="vjs-no-js">';
		returnHtml += '    To view this video please enable JavaScript, and consider upgrading to a';
		returnHtml += '    web browser that';
		returnHtml += '    <a href="https://videojs.com/html5-video-support/" target="_blank">';
		returnHtml += '      supports HTML5 video';
		returnHtml += '    </a>';
		returnHtml += '  </p>';
		returnHtml += '</video>';
		if(isBlockVideo == true){
			returnHtml += '			<span class="btn live-play" data-pay="cash" data-action_type="'+eleData.action_type+'" data-type="stream" data-bbs="'+eleData.idx+'" data-target="0" data-file="'+eleData.file+'" data-info="#mobileContentsViewBbsInfoForm" onclick="MOBILE_PAGE.contents.onclickContentsBuy(this);">';
			returnHtml += '				<span class="p_txt btn-down-f">실시간 바로보기</span><span class="p_txt btn-down-redown">다시보기</span>';
			returnHtml += '			</span>';
			returnHtml += '<div class="player_guide_show_prev">미리보기를 지원하지 않는 콘텐츠입니다.</div>';	
		}else{
			//returnHtml += '			<span>';
			//returnHtml += '				<span class="p_txt">1분 미리보기</span>';
			//returnHtml += '			</span>';
				
		}
		//returnHtml += '<div class="player_guide_show_prev">1분 미리보기</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

MOBILE_TEMPLETE.VIDEO.getMobileEmptyPrevHtml = function(eleData, vPoster){
	console.log('MOBILE_TEMPLETE.VIDEO.getMobileEmptyPrevHtml');
	console.log('eleData', eleData);
	var dataType = 'stream';
	if(eleData.action_type =='M_CARTOON_VIEWER'){
		dataType = 'cartoon';
	}
	
	var returnHtml = '';
		returnHtml += '<div class="v_preview_area">';
		returnHtml += '		<div class="login_check_area" style="display:none;" onclick="GO_LOGIN();"></div>';
		returnHtml += '		<div class="preview_inner">';
		returnHtml += '			<span class="ico hd"></span>';
		returnHtml += '			<span class="btn play now">';
		returnHtml += '				<span class="p_ico"></span>';
		returnHtml += '			</span>';
		returnHtml += '			<span class="btn play replay active comic" data-pay="cash" data-action_type="'+eleData.action_type+'" data-type="'+dataType+'" data-bbs="'+eleData.idx+'" data-target="0" data-file="'+eleData.file+'" data-info="#mobileContentsViewBbsInfoForm" onclick="MOBILE_PAGE.contents.onclickContentsBuy(this);">';
		returnHtml += '				<span class="p_ico"></span>';
		returnHtml += '			</span>';
		returnHtml += '			<span class="btn play preview">';
		returnHtml += '				<span class="p_ico"></span>';
		returnHtml += '			</span>';
		returnHtml += '			<div class="play"><img src="'+vPoster+'" alt="" class="img"></div>';
		returnHtml += '			<div class="player_guide_show_live">미리보기를 지원하지 않는 콘텐츠입니다.</div>';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

/*
MOBILE_TEMPLETE.BOOKS = {};
//모바일 만화보기 -swpi
MOBILE_TEMPLETE.BOOKS.getMobileBookViewContentsHtml = function(targetBook, selectedEpisode, cFiles, selectedPage){
	console.log('MOBILE_TEMPLETE.BANNER.getToptoonSlickBanner');	
	var returnHtml = '';
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
		
		
		returnHtml += '			<div class="pswp__top-bar">';
		returnHtml += '				<div class="pswp__counter"></div>';
		returnHtml += '				<button class="pswp__button pswp__button--share" title="Share"></button>';
		//returnHtml += '				<h1 class="f_tit comic">'+targetBook.name+'</h1>';
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
		returnHtml +=  '					<span class="btn_back" onclick="MOBILE_CARTOON.CLOSE_PAGE_MODAL();"></span>';
		returnHtml +=  '				</div>';
		returnHtml +=  '			</div>';
		
		returnHtml += '			</div>';
					
		returnHtml += '			<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">';
		returnHtml += '				<div class="pswp__share-tooltip"></div> ';
		returnHtml += '			</div>';
		returnHtml += '			<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>';
		returnHtml += '			<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>';
		returnHtml += '			<div class="pswp__caption">';
		returnHtml += '				<div class="pswp__caption__center"></div>';
		returnHtml += '			</div>';
		
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
		returnHtml +=  '				<!-- <div class="c_m_btn l_r_charge">';
		returnHtml +=  '					<p class="txt"><span class="ico"></span>좌우전환</p>';
		returnHtml +=  '				</div> -->';
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
		returnHtml +=  '		<div class="comic_bar_wrap">';
		returnHtml +=  '			<div class="bar_area">';
		returnHtml +=  '				<span class="bar"></span>';
		returnHtml +=  '				<span class="dot"></span>';
		returnHtml +=  '			</div>';
		//returnHtml +=  '			<div class="page_view">';
		//returnHtml +=  '				<span>153</span>/<span>229</span>';
		//returnHtml += '					<div class="pswp__counter"></div>';
		//returnHtml +=  '			</div>';
		returnHtml +=  '		</div>';
		returnHtml +=  '	</div>';
		//-custem
		
		
		returnHtml += '		</div>';
				
		returnHtml += '	</div>';
		returnHtml += '</div>';

	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};
*/

MOBILE_TEMPLETE.BANNER = {};

MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerHtml = function(){
	console.log('MOBILE_TEMPLETE.BANNER.getToptoonSlickBanner');	
	var returnHtml = '';
		returnHtml += '<div class="disk_slick_item adult_roll_area b1 mobile-topton-banner" data-idx="2055" onclick="GO_TOPTOON(this);">';
		returnHtml += '	<div class="adult-toptoon-banner" >';
		returnHtml += '		<div class="a_img">';
		returnHtml += '			<img src="//i.imgur.com/uNfXViD.jpg" alt="">';
		returnHtml += '		</div>';
		returnHtml += '	</div>';
		returnHtml += '</div>';
	
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};

MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerSmallHtml = function(){
	console.log('MOBILE_TEMPLETE.BANNER.getToptoonSlickBannerSmallHtml');	
	var returnHtml = '<div class="disk_slick_item mobile-topton-banner-center" data-idx="2178" onclick="GO_TOPTOON(this);"> <span><img src="//i.imgur.com/Q5HIyV9.png"  alt=""></span></div>';
	try{
	    return returnHtml;
    }finally {
			returnHtml = null;
   	}
};



