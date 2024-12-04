/*
*	channel search common
*/

var PAGE_ANI = {};

PAGE_ANI.start = function(pageSub, pagData){
	console.log('PAGE_ANI.start', pageSub);
	console.log(pagData);
	/*
    PAGE_ANI_LIST.start();

	if(pageSub == 't_list'){
		PAGE_ANI_LIST.start(pageSub, pagData);
	}
	*/
	//if(pageSub == 'a_list'){
		//PAGE_ANI_LIST.start(pageSub);
	//}
	PAGE_CHANNEL_ON.rightBinding();
	
	if(isDefined(pagData)){
		if(isDefined(pagData.ani_type)){
			if(pagData.ani_type == 'mv'){
				PAGE_MOVIE_M_LIST.start(pageSub, pagData);
			}else if(pagData.ani_type == 'tv'){
				PAGE_BROADCAST_B_LIST.start(pageSub, pagData);
			}
		}
	}
};

/*

//채널 검색
var PAGE_ANI_LIST = {};
PAGE_ANI_LIST.DATA = {
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_ANI_LIST.start = function(pageSub, aniType){
	console.log('PAGE_ANI_LIST.start', pageSub);
	console.log(aniType);
	PAGE_ANI_LIST.DATA.LAST_HASH = '#!action=ani_list';

	PAGE_ANI_LIST.initBinding();
	PAGE_ANI_LIST.initOnload();

	//오른쪽 매뉴 바인딩
	PAGE_CHANNEL_ON.rightBinding();
	//PAGE_ANI_LIST.setHashCheck(null);
	
	PAGE_ANI_A_LIST.setHashCheck('start');


};

PAGE_ANI_LIST.initBinding = function(){
	console.log('PAGE_ANI_LIST.initBinding');

	//영화 및 방송
	$( "#btn-ani-top-rank_type" ).unbind( "click");
	$( "#btn-ani-top-rank_type" ).bind( "click", function() {
		console.log('btn-ani-top-rank_type');
		$( '#select-area-ani-top' ).toggleClass('active');
	});

    //필터 옵션 클릭
    $( ".select-top-ain-option" ).unbind( "click");
	$( ".select-top-ain-option" ).bind( "click", function() {
	//$( ".select-top-movie-option" ).click(function() {
		console.log('select-top-ani-option');
		var eleData = $(this).data();
		console.log(eleData);
		var rankType = 1;
		if(isDefined(eleData.values) == true){
			rankType = eleData.values;
		}
		
		var showRankType = $("#topListOptionAniFormIsTopCategorytype").val();
		console.log('showRankType', showRankType);
		console.log('rankType', rankType);
		
		
		
		
		$("#topListOptionAniFormIsTopCategorytype").val(rankType);
 		$(".select_area").removeClass("active");
 		if(isDefined(eleData.target)){
			var saveEleData = {};
			saveEleData[eleData.type] = rankType;
			console.log(saveEleData);
 			$('#'+eleData.target).data(saveEleData).text(eleData.txt);
		}
 		
 		//var isChange = false;
		if(parseInt(showRankType) == parseInt(rankType)){
			return;
		}

       
	   //var addHash = '&'+optName+'='+rankType;
	   //PAGE_ANI_A_LIST.goChangePage(1, rankType);
	   location.hash = PAGE_ANI_LIST.DATA.LAST_HASH+'&type='+rankType+'&page=1';
	   PAGE_ANI_LIST.initOnload(rankType);
	   
	   return;

	});

};



//애니 리스트 2019-12-20 신설
var PAGE_ANI_A_LIST = {};
PAGE_ANI_A_LIST.DATA = {
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};



//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_ANI_A_LIST.setHashCheck = function(hashPrams){
	console.log('PAGE_ANI_A_LIST.setHashCheck');
	//hash check
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != 'ani_list'){
		console.log(hashPrams['!action']);
		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']),'channel');
			}
		}
		
		$('#channelAniSubTitle').text('극장판 애니메이션');
		
		return;
	}
	
	//메인에서 바로 들어온 경우 : 해시 제거
	if(hashPrams == 'start'){
		$.bbq.removeState();
		return;
	}
	
	
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}
	console.log('hashPage',hashPage);
	
	var hashType = 1;
	if(hashPrams['type']){
		hashType = parseInt(hashPrams['type']);
	}
	console.log('hashType', hashType);
	//return;
	if(isDefined(hashPage)){
		console.log('has hash', hashPage);

		if(PAGE_ANI_A_LIST.DATA.LAST_HASH != location.hash){
			PAGE_ANI_A_LIST.setPage(hashPage, hashType);
			return;
		}

		else if(parseInt(hashPage) == 1){
			console.log('1 default page');
			var loadedPage = null;
			if(isDefined(PAGE_ANI_A_LIST.DATA.LOADED_PAGE)){
				loadedPage = parseInt(PAGE_ANI_A_LIST.DATA.LOADED_PAGE);
			}

			if(parseInt(loadedPage) == 1){
				console.log('loaded page');
				return
			}
		}
	}
	PAGE_ANI_A_LIST.setPage(hashPage, hashType);
};


PAGE_ANI_LIST.initOnload = function(rank_type){
	console.log('PAGE_ANI_LIST.initOnload : ' + rank_type);
	if(isDefined(rank_type) == false){
		rank_type = 1;
	}
	//pagination
	var $paginationEle = $('#channel-ani-common-pagination');
	var loadedPage = $paginationEle.data('load');
	if(isDefined(loadedPage)){
		PAGE_ANI_A_LIST.DATA.LOADED_PAGE = parseInt(loadedPage);
	}
	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);
		var startPage = 1;
		var initiateStartPageClick = false;
		var totalPages = 1;
		if(isDefined(eleData.total_page)){
			totalPages = parseInt(eleData.total_page);
		}

        var pagenation = $paginationEle.pagination({
			pages 		: totalPages,
			displayedPages: 5,
			cssStyle: 'page-link',
			edges	: 0,
			prevText: '&lt;',
			nextText: '&gt;',
			hrefTextPrefix	: '#!action=ani_list&type='+rank_type+'&page=',
			onPageClick		: function(page, event){
				console.log('page', page);
				console.log('onPageClick', event);
				//utility.ui.goToElement('.l_content_wrap');
				//PAGE_ANI_A_LIST.goCategoryPage(page);
			}
		});
        PAGE_ANI_A_LIST.DATA.paginationEle = $paginationEle;
        PAGE_ANI_A_LIST.DATA.pagination    = pagenation;
	}
};


//페이지 이동 분기 처리
PAGE_ANI_A_LIST.goChangePage = function(goPage, rankType){
	console.log('PAGE_ANI_A_LIST.goChangePage', goPage);
	console.log('rankType', rankType);
	var hashUrl = $.param.fragment();
	console.log('hashUrl', hashUrl);
	
	PAGE_ANI_A_LIST.setPage(goPage, rankType);

};


PAGE_ANI_A_LIST.setPage = function(nextPage, rank_type){
	console.log('PAGE_ANI_A_LIST.setBroadcastPage:',nextPage);
	//console.log('loadedPage', loadedPage);

	if(isDefined(nextPage) == false){
		nextPage = 1;
	}

	var $infoEle = null;
	if(PAGE_ANI_A_LIST.DATA.paginationEle){
		$infoEle = PAGE_ANI_A_LIST.DATA.paginationEle;
	}
	if(isDefined($infoEle) == false){
		$infoEle = $('#channel-ani-common-pagination');
	}
	var infoEleData = $infoEle.data();

	var loadPage = 0;
    if(isDefined($infoEle.data('load'))){
    	loadPage = parseInt($infoEle.data('load'));
    }

 	var sendData = {
 		page 	:	nextPage,
 		limit	: 	null
 	};

 	if(isDefined(infoEleData)){
		console.log('infoEleData', infoEleData);
		if(isDefined(infoEleData.limit)){
			sendData.limit = infoEleData.limit;
		}
	}



	//nation
	if($('#topListOptionAniFormNation').length > 0){
		var aNation = $('#topListOptionAniFormNation').val();
		if(isDefined(aNation)){
			sendData.nation = aNation;
		}
	}

	console.log("sendData");
    console.log(sendData);
	//genre
	var aGenre = $('#topListOptionAniFormGenre').val();
	if(isDefined(aGenre)){
		sendData.genre = aGenre;
	}

	//is hot
	var aIsHot = $('#topListOptionAniFormIsHot').val();
	if(isDefined(aIsHot)){
		sendData.is_hot = aIsHot;
	}

	//is event
	var aIsEvent = $('#topListOptionAniFormIsEvent').val();
	if(isDefined(aIsEvent)){
		sendData.is_event = aIsEvent;
	}

	//is top
	var aIsTop = $('#topListOptionAniFormIsTop').val();
	if(isDefined(aIsTop)){
		sendData.is_top = aIsTop;
	}
    //is top
	var aIsTop = $('#topListOptionAniFormIsTop').val();
	if(isDefined(aIsTop)){
		sendData.is_top = aIsTop;
	}
	
	
	var aRankType = '';
	if(isDefined(rank_type)){
		aRankType = rank_type;
	}else{
		aRankType = $('#topListOptionAniFormIsTopCategorytype').val();
	}
	
	sendData.rank_type = aRankType;
	PAGE_ANI_A_LIST.getContentsData (sendData, $infoEle);

	return;

};


//get getContentsData
PAGE_ANI_A_LIST.getContentsData = function(getData, $infoEle){
	console.log('PAGE_ANI_A_LIST.getContentsData', getData);

	var sendData = {
	    r           : '',        //rank_type
		c			: 13000,	//cate1
		l			: '',		//limit
		ba			: '',		//block adult
		it			: '',		//is thumb
		page		: 1,
		is_mobile	: 0,		//is mobile
		bn			: '',		//nation
		bg			: '',		//genre
		is_hot		: '',		//is hot
		is_new		: '',		//is new
		is_event	: '',		//is event
		is_top		: '',		//is top
        a_child     : ''        // a_child

	};


	if(isDefined(getData)){
		if(isDefined(getData['page'])){ sendData.page = getData.page; }
		if(isDefined(getData['limit'])){ sendData.l = getData.limit; }
		if(isDefined(getData['nation'])){ sendData.bn = getData.nation; }
		if(isDefined(getData['station'])){ sendData.bs = getData.station; }
		if(isDefined(getData['genre'])){ sendData.bg = getData.genre; }
		if(isDefined(getData['is_hot'])){ sendData.is_hot = getData.is_hot; }
		if(isDefined(getData['is_new'])){ sendData.is_new = getData.is_new; }
		if(isDefined(getData['is_event'])){ sendData.is_event = getData.is_event; }
		if(isDefined(getData['is_top'])){ sendData.is_top = getData.is_top; }
        if(isDefined(getData['a_child'])){ sendData.is_top = getData.a_child; }
        if(isDefined(getData['rank_type'])){ sendData.r = getData.rank_type; }
	}


	console.log('sendData', sendData);
	
	var $innerTargetEle = $('#anin-list-rank-contents-list-data-thumb');
	
	//movie-rank-contents-list-data-thumb_option
    
    //movie-rank-contents-list-data-thumb
	var successFunGetContentsList = function(data){
		console.log('successFunGetContentsList', data);
        if(sendData.r == 1){
			$innerTargetEle.addClass('on_movie_wrap').removeClass('on_broad_wrap');
		}else{
			$innerTargetEle.addClass('on_broad_wrap').removeClass('on_movie_wrap');
		}
		
		PAGE_ANI_A_LIST.SetSuccAniList(data, sendData.r, $innerTargetEle);


	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.ANI.ANI_LIST,
		data		: formData,
		success_fun	: successFunGetContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};

PAGE_ANI_A_LIST.SetSuccAniList = function(data, rankType, $innerTargetEle){
	console.log('PAGE_ANI_A_LIST.SetSuccAniList', rankType);
	    
	var aniData = null;
	var selectedOptTxt = '영화';
	var subAniTitle = '극장판 애니메이션';
	if(rankType == 1){
		if(isDefined(data.channel_movie_list)){
			aniData = data.channel_movie_list;	
			PAGE_ANI_A_LIST.succMovieList(data, $innerTargetEle);
		}
		
	}else if(rankType == 2){
		if(isDefined(data.channel_broadcast_list)){
			aniData = data.channel_broadcast_list;	
			PAGE_ANI_A_LIST.succBroadcastList(data, $innerTargetEle);
		}
		selectedOptTxt = '방송';
		subAniTitle = '방송 애니메이션';
	}else{
		return;
	}
	$('#channelAniSubTitle').text(subAniTitle);
	$('#btn-ani-top-rank_type').text(selectedOptTxt);
	$("#topListOptionAniFormIsTopCategorytype").val(rankType);
	
	var $infoEle = $('#channel-ani-common-pagination');
	if(isDefined(aniData)){
		var curPage = aniData.page;
		var reSavePageData =
		{
			load		:	parseInt(curPage),
			page		:	parseInt(curPage),
			limit		:	parseInt(aniData.limit),
		};

		var get_total_count = 0
		var get_total_page = 0;
		if(parseInt(curPage) == 1){
			if(isDefined(aniData.total_count)){
				reSavePageData.total_count	= parseInt(aniData.total_count);
				get_total_count = parseInt(aniData.total_count);
			}
			if(isDefined(aniData.total_page)){
				reSavePageData.total_page	= parseInt(aniData.total_page);
				get_total_page = parseInt(aniData.total_page);
			}
		}
		$infoEle.data(reSavePageData);

		//pagination
		if(parseInt(curPage) == 1 && isDefined(PAGE_ANI_A_LIST.DATA.pagination)){

			console.log('drawPage',get_total_count);
			console.log('get_total_page', get_total_page);
			$infoEle.pagination('updateItems', get_total_page);
			$infoEle.pagination('selectPage', curPage);
		}else{
			if(isDefined(PAGE_ANI_A_LIST.DATA.pagination)){
				$infoEle.pagination('selectPage', curPage);
			}

		}

		//$infoEle.pagination('selectPage', curPage);
		PAGE_ANI_A_LIST.DATA.LOADED_PAGE = parseInt(curPage);

		//save cache
		PAGE_ANI_A_LIST.DATA.LAST_HASH = location.hash;
	}
};


PAGE_ANI_A_LIST.succMovieList = function(data, $innerTargetEle){
	console.log('PAGE_ANI_A_LIST.succMovieList', data);
    var mvData = null;
	if(isDefined(data.channel_movie_list)){
		var mvData = data.channel_movie_list;
		var mvDataGroup = mvData['group'];

		var mvListHtml = [];
		var lCnt = 0;
		for(var i in mvDataGroup){
			//console.log(mvDataGroup[i]);
			var mDataList = mvDataGroup[i];
			mvListHtml.push('<div class="update_movie_list"><ul>');
			for(var k in mDataList){
				var mRank = new Movie_rank(lCnt);
				mRank.setData(mDataList[k]);
				//console.log(mRank);
				mvListHtml.push(mRank.getRankMovieHtml());
			}
			mvListHtml.push('</ul></div>');
			lCnt++;
		}
		//console.log('mvListHtml', mvListHtml);

		//페이지 상단으로 이동
		utility.ui.goToElement('.l_content_wrap');

		$innerTargetEle.html(mvListHtml.join(''));
		
		//img lazy 스크롤 때문에 lazy가 의미 없음
		$('.disk-image-lazy').lazy();
	}
};


PAGE_ANI_A_LIST.succBroadcastList = function(data, $innerTargetEle){
    console.log('PAGE_ANI_A_LIST.succBroadcastList', data);
	var broData = null;
	if(isDefined(data.channel_broadcast_list)){
		var broData = data.channel_broadcast_list;
        console.log(broData);
		var broDataList = broData['list'];
		var broListHtml = [];
		var lCnt = 0;
		broListHtml.push('<div class="broad_list" id="broadcast-rank-contents-list-data-thumb_option" >');
		for(var i in broDataList){
			//console.log(broDataList[i]);
			//var bDataList = broDataList[i];
			var broRank = new Broadcast_rank(lCnt);
			broRank.setData(broDataList[i]);
			broListHtml.push(broRank.getRankBroadcastHtml('ani'));
			lCnt++;
		}
		broListHtml.push('</div>');
		//console.log('broListHtml', broListHtml);
		//페이지 상단으로 이동
		utility.ui.goToElement('.l_content_wrap');

		$innerTargetEle.html(broListHtml.join(''));

		//img lazy 스크롤 때문에 lazy가 의미 없음
		$('.disk-image-lazy').lazy();

	}
};
*/