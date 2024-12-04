/*
* my page
*/

var PAGE_MY = {};
PAGE_MY.DATA = {
	PAGE_SUB		: null,
	PAGE_MEMU		: null,
	paginationEle	: null,
	pagination		: null,
	LAST_HASH		: null,
	LOADED_PAGE		: null,
	LAST_HASH_NO_PAGE : null,
	IS_LOADED_PAGE	: false,
	IS_LOADED_PAGE_ID	: null,
};

PAGE_MY.start = function(pageSub, pagData){
	console.log('PAGE_MY.start', pageSub);
	console.log(pagData);

	var hasSubPage = false;
	if(isDefined(pageSub)){
		$('.mypage-l_content.l_content').show();
		var pageMenu = '';
		if(isDefined(pagData)){
			if(isDefined(pagData.selected_group)){
				pageSub = pagData.selected_group;
			}
			if(isDefined(pagData.selected_menu)){
				pageMenu = pagData.selected_menu;
			}
		}
		if(isDefined(pageSub) == false){
			pageSub = '';
		}

		PAGE_MY.DATA.PAGE_SUB = pageSub;
		PAGE_MY.DATA.PAGE_MEMU = pageMenu;
		var defaultHash = '#!action=my&group='+pageSub+'&id='+pageMenu;
		PAGE_MY.DATA.LAST_HASH = defaultHash+'&page=1';
		PAGE_MY.DATA.LAST_HASH_NO_PAGE = defaultHash;

		hasSubPage = true;

		console.log('defaultHash', defaultHash);
	}else{
		//$('.mypage-l_content.l_content').hide();
	}


	console.log('PAGE_MY.DATA', PAGE_MY.DATA);




	PAGE_MY.initBinding();
	PAGE_MY.initOnload();
	if(hasSubPage == true){
		PAGE_MY.setHashCheck(null);
	}



};



PAGE_MY.initBinding = function(){
	console.log('PAGE_MY.initBinding');


	//탑 메뉴
	/*
	$( ".btn-my-top-menu" ).unbind( "click");
	$( ".btn-my-top-menu" ).bind( "click", function() {
		console.log('btn-my-top-menu');
		$( '.mypage_all_menu' ).toggleClass('active');
	});
	*/

	//오른쪽 서브 메뉴 오픈
	if($( ".my_left_main_menu" ).length > 0){
		$( ".my_left_main_menu" ).unbind( "click");
		$( ".my_left_main_menu" ).bind( "click", function() {
			console.log('.my_left_main_menu');
			$(this).parent().toggleClass('active');
		});
	}


	//modal bindig
	$('#disk-pc-guide-modal').off($.modal.OPEN);
	$('#disk-pc-guide-modal').on($.modal.OPEN , function(event, modal) {
	  	console.log('disk-pc-guide-modal');
	  	if($('#getGradeInfoLayer').length > 0){
	  		var memberGride = $('#getGradeInfoLayer').find('.member-current-grade-num').text();
		  	console.log('memberGride', memberGride);
		  	PAGE_MY.slickGredeInfomation(memberGride);
	  	}

	});
};

PAGE_MY.initOnload = function(){
	console.log('PAGE_MY.initOnload');

	//열려진 메뉴가 없는 경우
	if($('.my-menu-group.active').length < 1){
		$('.my-menu-group.contents').addClass('active');
	}
};

//페이지 로드후 공통 바인딩
PAGE_MY.afterLoadCommonBinding = function(){

	//툴팁
	WEB_COMMON.setDiskToolTipster();

	//image lazy
	WEB_COMMON.setImageLazy();

	//전체 선택
	var $selectAllCheckBox = $( "#my-contents-list-check-all");
	if($selectAllCheckBox.length > 0){
		$selectAllCheckBox.unbind( "click");
		$selectAllCheckBox.bind( "click", function() {
			console.log('my-contents-list-check-all');
			var targetForm = '#'+$(this).data('target');
			if($(this).prop("checked")) {
				$(targetForm).find("input[name=my_contents_check]").prop("checked",true);
			}else{
				$(targetForm).find("input[name=my_contents_check]").prop("checked",false);
			}
		});
	}


	//개별 선택
	if($( ".my_contents_check").length > 0){
		console.log('input_c my_contents_check binding');
		$( ".my_contents_check").unbind( "click");
		$( ".my_contents_check").bind( "click", function() {
			console.log('my_contents_check click');
			checkBoxLength = $("[name=my_contents_check]").length;
			checkedLength = $("[name=my_contents_check]:checked").length;
			if(checkBoxLength == checkedLength){
				$selectAllCheckBox.prop("checked",true);
			}else{
				$selectAllCheckBox.prop("checked",false);
			}
		});
	}


	//datepicker :날짜 조회 : 시작
	var $starDatePicker = $('#myPageRangeDateForm_start_date');
	var startDatepickerDate;
	if($starDatePicker.length > 0){
		console.log('$starDatePicker');

		var startDate = new Date();
		var isLoadDate = false;
		if(isDefined($starDatePicker.val())){
			startDate = new Date(Date.parse($starDatePicker.val()));
			isLoadDate = true;
		}
		console.log(startDate);

		var pickerOption = {
			language	: 'kr',
			startDate	: startDate,
			autoClose	: true,
			maxDate: new Date(),
		};

		// Initialization
		$starDatePicker.datepicker(pickerOption);
		// Access instance of plugin
		startDatepickerDate = $starDatePicker.data('datepicker');
		if(isLoadDate){
			startDatepickerDate.selectDate(startDate);
		}
	}

	//datepicker :날짜 조회 : 종료
	var $endDatePicker = $('#myPageRangeDateForm_end_date');
	var endDatepickerDate;
	if($endDatePicker.length > 0){
		console.log('$endDatePicker');

		var loadDate = new Date();
		var isLoadDate = false;
		if(isDefined($endDatePicker.val())){
			loadDate = new Date(Date.parse($endDatePicker.val()));
			var isLoadDate = true;
		}
		console.log(loadDate);

		var pickerOption = {
			language	: 'kr',
			startDate	: loadDate,
			autoClose	: true,
			maxDate: new Date(),
		};

		// Initialization
		$endDatePicker.datepicker(pickerOption);
		// Access instance of plugin
		endDatepickerDate = $endDatePicker.data('datepicker');
		if(isLoadDate){
			endDatepickerDate.selectDate(loadDate);
		}
	}

	//btn btn_calendar_start
	if($( "#btn_calendar_start").length > 0){
		$( "#btn_calendar_start").unbind( "click");
		$( "#btn_calendar_start").bind( "click", function() {
			console.log('#btn_calendar_start');
			if(isDefined(startDatepickerDate)){
				startDatepickerDate.show();
			}
		});
	}

	//btn btn_calendar_end
	if($( "#btn_calendar_end").length > 0){
		$( "#btn_calendar_end").unbind( "click");
		$( "#btn_calendar_end").bind( "click", function() {
			console.log('#btn_calendar_end');
			if(isDefined(endDatepickerDate)){
				endDatepickerDate.show();
			}
		});
	}

	//날짜 조회 버튼 : btn-mypage-search-date-action
	if($( "#btn-mypage-search-date-action").length > 0){
		$( "#btn-mypage-search-date-action").unbind( "click");
		$( "#btn-mypage-search-date-action").bind( "click", function() {
			console.log('btn-mypage-search-date-action');

			var $sDate = $('#myPageRangeDateForm_start_date');
			var sDate = $sDate.val();
			if(isDefined(sDate) == false){
				alert('조회 시작일을 입력해주세요.');
				$sDate.focus();
				return;
			}

			var $eDate = $('#myPageRangeDateForm_end_date');
			var eDate = $eDate.val();
			if(isDefined(eDate) == false){
				alert('조회 종료일을 입력해주세요.');
				$eDate.focus();
				return;
			}
			var actionHash = PAGE_MY.DATA.LAST_HASH_NO_PAGE+'&sd='+encodeURI(sDate)+'&ed='+encodeURI(eDate);
			if(PAGE_MY.DATA.LAST_HASH == actionHash){
				$.ambiance({message: '이미 조회한 날짜입니다.', type: "alert-warning"});
				return;
			}

			PAGE_MY.DATA.IS_LOADED_PAGE = false;
			//$.bbq.removeState();
			location.hash = actionHash;


		});
	}



};

//해시가 있는지 여부 체크 - 페이지 처음 로드시
PAGE_MY.setHashCheck = function(hashPrams){
	console.log('PAGE_MY.setLoadHashCheck');
	//hash check
	if(isLoadedBbqScript() != true){
		return;	
	}
	var hashPrams = $.deparam.fragment();
	console.log('hashPrams', hashPrams);
	if(hashPrams['!action'] != 'my'){
		console.log(hashPrams['!action']);

		//바로 들어온경우
		if(isDefined(hashPrams['!action']) == false){
			console.log('undefined');
			var contentsHtml = $('#mypage-contents-session').html();
			//console.log(contentsHtml);
			console.log(contentsHtml.length);
			if($('#mypage-contents-session').length > 0){
				if(contentsHtml.length < 200){
					console.log('empty');
					if(isDefined(PAGE_MY.DATA.LAST_HASH)){
						location.hash = PAGE_MY.DATA.LAST_HASH;
						return;
					}
				}
			}
		}

		if(hashPrams['!action'] == 'contents'){
			if(isDefined(hashPrams['idx']) == true && $.isNumeric(hashPrams['idx'])){
				WEB_COMMON_GO.openContents(parseInt(hashPrams['idx']));
			}
		}

		//판매자  채널에서 넘어온 경우
		if(hashPrams['!action'] == 'seller'){
			location.hash = PAGE_MY.DATA.LAST_HASH;
			return;
		}

		return;
	}
	var hashPage = null;
	if(hashPrams['page']){
		hashPage = parseInt(hashPrams['page']);
	}

	console.log('hashPage',hashPage);



	console.log(hashPrams['group']);

	var menuGroup = null;
	if(isDefined(hashPrams['group'])){
		menuGroup = hashPrams['group'];
	}
	console.log('menuGroup', menuGroup);

	var menuItem = null;
	if(isDefined(hashPrams['id'])){
		menuItem = hashPrams['id'];
	}
	console.log('menuItem', menuItem);
	/*
	if(hashPrams['group'] == 'contents'){

	}else if(hashPrams['group'] == 'point'){

	}
	*/

	console.log('PAGE_MY.DATA.LAST_HASH:', PAGE_MY.DATA.LAST_HASH);

	/*
	console.log('location.hash', location.hash);
	if(PAGE_MY.DATA.LAST_HASH == location.hash){
		return;
	}
	*/


	if(isDefined(menuGroup) == false){
		console.log('has not menuGroup');
		return;
	}

	if(isDefined(menuItem) == false){
		console.log('has not menuItem');
		return;
	}

	if(isDefined(hashPage) == false){
		hashPage = 1;
	}

	if(PAGE_MY.hasOwnProperty(menuGroup)){
		console.log('hasOwnProperty', menuGroup);

		var force_page = 0;
		if(PAGE_MY.DATA.IS_LOADED_PAGE != true){
			force_page = 1;
		}

		var sendData = {
			force_page	: force_page,
			id		: menuItem,
			page	: hashPage,
			group	: menuGroup,
			sd		: '',
			ed		: ''
		};
		var callbackFun = PAGE_MY[menuGroup].callbackFun;

		PAGE_MY.getMyPageContentsData(sendData, callbackFun);
	}

	return;
};



PAGE_MY.setMypageTopMenu = function(getData){
	console.log('PAGE_MY.setMypageTopMenu', getData)

	//top title
	/*
	$('.l_contents_top_wrap.mypage.active').removeClass('active');
	if(isDefined(getData.group) && isDefined(getData.id)){
		$('.l_contents_top_wrap.mypage.'+getData.group+'.'+getData.id).addClass('active');
	}
	*/

	PAGE_MY.setMypageRightMenu(getData);
	return;
	/*
	var pageGroup = 'contents';
	if(isDefined(getData.group)){
		pageGroup = getData.group;
	}
	var pageMenu = 'contents_buying_list';
	if(isDefined(getData.id)){
		pageMenu = getData.id;
	}

	//group btn
	$( '.mypage_all_menu' ).removeClass('active');
	$('.btn-my-top-menu.active').removeClass('active');
	$('.btn-my-top-menu.menu-'+pageGroup).addClass('active');

	//item btn
	var activeTargetEleName = '#my-top-menu-item-'+pageGroup+'-'+pageMenu+'';
	$('.my-top-menu-itme.t_style').removeClass('t_style');
	$(activeTargetEleName).addClass('t_style');

	//navy text
	var navyDepth1 = $('.btn-my-top-menu.menu-'+pageGroup).find('.txt').text();
	if(isDefined(navyDepth1)){
		$('.my-page-top-navy .depth-1').text(navyDepth1);
	}
	var navyDepth2 = $(activeTargetEleName).text();
	if(isDefined(navyDepth2)){
		$('.my-page-top-navy .depth-2').text(navyDepth2);
	}
	*/
};


PAGE_MY.setMypageRightMenu = function(getData){
	console.log('PAGE_MY.setMypageRightMenu', getData)

	var pageGroup = 'contents';
	if(isDefined(getData.group)){
		pageGroup = getData.group;
	}
	var pageMenu = 'contents_buying_list';
	if(isDefined(getData.id)){
		pageMenu = getData.id;
	}

	//group btn
	//$('.btn-my-top-menu.active').removeClass('active');
	//$('.btn-my-top-menu.menu-'+pageGroup).addClass('active');

	//item btn
	var $activeTargetEleName = $('#my-right-menu-item-'+pageGroup+'-'+pageMenu);
	$('.my-right-menu-itme.active').removeClass('active');
	$activeTargetEleName.addClass('active');

	//navy text
	var navyDepth1 = $('.my-menu-group.menu-'+pageGroup).find('.txt').text();
	if(isDefined(navyDepth1)){
		$('.my-page-top-navy .depth-1').text(navyDepth1);
		$('.my-page-top-navy .in-1').css({'display': 'inline-block'});
		$('.my-page-top-navy .depth-1').css({'display': 'inline-block'});
	}
	var navyDepth2 = $activeTargetEleName.text();
	if(isDefined(navyDepth2)){
		$('.my-page-top-navy .depth-2').text(navyDepth2);
		$('.my-page-top-navy .in-2').css({'display': 'inline-block'});
		$('.my-page-top-navy .depth-2').css({'display': 'inline-block'});
	}
};





//get getMyPageContentsData
PAGE_MY.getMyPageContentsData = function(getData, callbackFun){
	console.log('PAGE_MY.getMyPageContentsData', getData);

	var pageGroup = 'contents';
	if(isDefined(getData.group)){
		pageGroup = getData.group;
	}

	//date
	if(PAGE_MY.DATA.IS_LOADED_PAGE_ID == getData.id){
		if(isDefined($('#myPageRangeDateForm_start_date').val()) == true){
			var startSearchDate = $('#myPageRangeDateForm_start_date').val();
			var endSearchDate = $('#myPageRangeDateForm_end_date').val();
			if(isDefined(startSearchDate) == true && isDefined(endSearchDate) == true){
				getData.sd = startSearchDate;
				getData.ed = endSearchDate;
			}
		}
	}else{
		//조회날짜 초기화
		if(getData.group == 'point'){
			$('#myPageRangeDateForm_start_date').val('');
			$('#myPageRangeDateForm_end_date').val('');
		}
	}

	var sendData = getData;
	console.log('sendData', sendData);

	var $paginationEle = $('#mypage-manager-contents-pagination');
	var $infoEle = $('#mypage-contents-session');
	var successFunGetContentsList = function(data){
		console.log('successFunGetMovieContentsList');

		if(isDefined(data.my_page_data)){
			$infoEle.html(data.my_page_data);
		}else{
			$infoEle.empty();
		}

		PAGE_MY.DATA.PAGE_SUB = getData.group;
		PAGE_MY.DATA.PAGE_MEMU = getData.id;

		var saveData =
		{
			group 	: getData.group,
			id		: getData.id,
			page	: getData.page,
			is_page	: 0
		};
		var curPage = parseInt(getData.page);
		var isPageShow = false;
		if(isDefined(data.my)){
			if(isDefined(data.my.is_page)){
				if(data.my.is_page == '1' || data.my.is_page == 1){
					isPageShow = true;
				}
				saveData.is_page = data.my.is_page;
			}
			//save cash
			if(isDefined(data.my.group)){
				PAGE_MY.DATA.PAGE_SUB = data.my.group;
				saveData.group = 	data.my.group;
			}
			if(isDefined(data.my.id)){
				PAGE_MY.DATA.PAGE_MEMU = data.my.id;
				saveData.id = 	data.my.id;
			}

			if(isDefined(data.my.id)){
				PAGE_MY.DATA.PAGE_MEMU = data.my.id;
				saveData.id = 	data.my.id;
			}
			PAGE_MY.DATA.LAST_HASH =  '#!action=my&group='+saveData.group+'&id='+saveData.id+'&page=1';
			PAGE_MY.DATA.LAST_HASH_NO_PAGE =  '#!action=my&group='+saveData.group+'&id='+saveData.id;
			PAGE_MY.DATA.IS_LOADED_PAGE_ID = saveData.id;
		}
		if(isDefined(data.my_page_info)){
			if(isDefined(data.my_page_info.page)){
				curPage = parseInt(data.my_page_info.page);
				saveData.page = curPage;
			}

			if(isPageShow == true){
				if(isDefined(data.my_page_info.total_count)){
					if(parseInt(data.my_page_info.total_count) > 0){
						saveData.total_count	= parseInt(data.my_page_info.total_count);
					}

				}
				if(isDefined(data.my_page_info.total_page)){
					if(parseInt(data.my_page_info.total_page) > 0){
						saveData.total_page	= parseInt(data.my_page_info.total_page);
					}
				}
			}
		}


		//set top menu
		PAGE_MY.setMypageTopMenu(saveData);

		if(parseInt(curPage) == 1){
			//페이지 상단으로 이동
			utility.ui.goToElement('.mypage-contents-start');
			//utility.ui.goToElement('.l_content');
		}else{
			//페이지 상단으로 이동- paging
			utility.ui.goToElement('.mypage-contents-start');
			//utility.ui.goToElement('.l_content');
		}

		//save data
		$infoEle.data(saveData);


		//pagination
		console.log('isPageShow', isPageShow);
		var isChangePage = false;
		if(isPageShow == true){
			if(isDefined(PAGE_MY.DATA.pagination) == true && isDefined(PAGE_MY.DATA.paginationEle) == true){
				var pagingEleData = $paginationEle.data();
				if(pagingEleData.group != saveData.group || pagingEleData.id != saveData.id){
					console.log('destroy');
					PAGE_MY.DATA.paginationEle.pagination('destroy');
					PAGE_MY.DATA.paginationEle = null;
					PAGE_MY.DATA.pagination = null;
					//조회날짜 초기화
					if(saveData.group == 'point'){
						$('#myPageRangeDateForm_start_date').val('');
						$('#myPageRangeDateForm_end_date').val('');
					}
					isChangePage = true;
				}
			}
			$paginationEle.data(saveData);
			PAGE_MY.setPagination(saveData, isChangePage);
		}else{
			if(isDefined(PAGE_MY.DATA.pagination) == true && isDefined(PAGE_MY.DATA.paginationEle) == true){
				PAGE_MY.DATA.paginationEle.pagination('destroy');
				PAGE_MY.DATA.paginationEle = null;
				PAGE_MY.DATA.pagination = null;
			}
		}


		//$infoEle.pagination('selectPage', curPage);

		//save loaded page
		PAGE_MY.DATA.IS_LOADED_PAGE = true;

		//save cache
		PAGE_MY.DATA.LAST_HASH = location.hash;

		//img lazy 스크롤 때문에 lazy가 의미 없음
		WEB_COMMON.setImageLazy();

		//common binding
		PAGE_MY.afterLoadCommonBinding();

		if (typeof callbackFun=== "function"){
			callbackFun(data, saveData);
			return;
		}
	};

	var formData = sendData;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.GET_PAGE_DATA[pageGroup],
		data		: formData,
		success_fun	: successFunGetContentsList,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//pagination
PAGE_MY.setPagination = function(saveData, getIsChangePage){
	console.log('PAGE_MY.setPagination', saveData);
	var $paginationEle = $('#mypage-manager-contents-pagination');
	if(isDefined(saveData.page) == false){
		if(isDefined(PAGE_MY.DATA.pagination) == true && isDefined(PAGE_MY.DATA.paginationEle) == true){
			PAGE_MY.DATA.paginationEle.pagination('destroy');
		}
		return;
	}
	var curPage = parseInt(saveData.page);
	if($.isNumeric( saveData.page ) != true){
		curPage = 1;
	}
	//#!action=seller&group=contents&id=SA0&page=1

	console.log('getIsChangePage', getIsChangePage);

	var isChangePage = false;
	if(isDefined(getIsChangePage) == true){
		isChangePage = getIsChangePage;
	}

	if($paginationEle.length){
		var eleData = $paginationEle.data();
		console.log('eleData', eleData);

		var loadedPage = 0;
		if(isDefined(eleData.load)){
			loadedPage = eleData.load;
		}

		var get_total_count = parseInt(saveData.total_count);
		var get_total_page = parseInt(saveData.total_page);


		//pagination

		if(isDefined(PAGE_MY.DATA.pagination) == true && isChangePage == false){
			if(parseInt(curPage) == 1){
				console.log('drawPage',get_total_count);
				console.log('get_total_page', get_total_page);
				$paginationEle.pagination('updateItems', get_total_page);
				$paginationEle.pagination('selectPage', curPage);
			}else{
				$paginationEle.pagination('selectPage', curPage);
			}
		}else{
			console.log('paginationEle new load');
			PAGE_MY.DATA.paginationEle = $paginationEle;
			PAGE_MY.DATA.pagination = $paginationEle.pagination({
				/*
				items: totalPages,
				itemsOnPage: 20,
				*/
				currentPage	: curPage,
				pages 		: get_total_page,
				displayedPages: 5,
				cssStyle: 'page-link',
				edges	: 0,
				prevText: '&lt;',
				nextText: '&gt;',
				hrefTextPrefix	: PAGE_MY.DATA.LAST_HASH_NO_PAGE+'&page=',
				//hrefTextPrefix	: null,
				onPageClick		: function(page, event){
					console.log('page', page);
					console.log('onPageClick', event);
					//utility.ui.goToElement('.l_content_wrap');
					//PAGE_MY.goCategoryPage(page);
				}
			});
		}
		PAGE_MY.DATA.LOADED_PAGE = parseInt(curPage);
		console.log(PAGE_MY.DATA.pagination.pagination);



	}else{
		console.log('has no pagination ele');
		return;
	}


	//$infoEle.data(saveData);
	//$infoEle.data(saveData);
	//$infoEle.pagination('selectPage', curPage);
};

//자녀 안심 서비스
PAGE_MY.onclickSafeChild = function(){
	$( "#top-pc-disk-safe-child" ).trigger('click');
	return;

};

//등급표 정보 모달
PAGE_MY.onclickGredeInfomation = function(cur_grade){
	var $targetModal = $('#disk-pc-guide-modal');
	$targetModal.empty();
	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.getGradeInfoLayer(cur_grade);
	var isModalCloseExisting = false;
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			escapeClose: true,
			 clickClose: true,
			 showClose : true,
			 closeClass	: "m_close",
		})
	}



};

//slick
PAGE_MY.slickGredeInfomation = function(cur_grade){
	console.log('PAGE_MY.slickGredeInfomation');
	var initialslide = 0;
	initialslide = Math.floor(cur_grade/20);

   	 $('.grade_inner').slick({
   		speed: 500,
   		slidesToShow: 3,
   		slidesToScroll: 1,
   		arrows: true,
 		variableWidth: true,
   		initialSlide : parseInt(initialslide),
   		prevArrow: $('#aro1_prev'),
   		nextArrow: $('#aro1_next')
   	});

	return;
}

//등급표 정보 모달
PAGE_MY.onclickPointInfomation = function(){
	var $targetModal = $('#disk-pc-670-modal');
	$targetModal.empty();
	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.getPointInfoLayer();
	var isModalCloseExisting = false;
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			escapeClose: true,
			 clickClose: true,
			 showClose : true,
			 closeClass	: "m_close",

		})
	}
	return;

};


//실명인증 서비스
PAGE_MY.onclickOpenAuthenticSevice = function(thisEle){
	var eleData = $(thisEle).data();
	if(isDefined(eleData.auth)){
		if(eleData.auth == 1){
			alert('이미 실명인증 서비스를 이용하여 인증된 회원입니다.');
			return;
		}
	}
	
	var winOpenUrl = '/adult/phone_auth?authType=phone&returnURL=my_info';
	console.log('winOpenUrl', winOpenUrl);
	window.open(winOpenUrl,'MobileAuthWindow','width=628,height=580');
	
	
	/*
	var url = "/certify/phone_step1_pop";
    var option="resizable=no, scrollbars=yes, status=no,width=428, height=640";
    window.open(url,"",option);
	return;
	*/

};


PAGE_MY.contents = {};
PAGE_MY.contents.start = function(){

};
PAGE_MY.contents.callbackFun = function(data, saveData){
	console.log('PAGE_MY.contents.callbackFun');
	console.log(data);
};

//다운로드 자료 평가하기
PAGE_MY.contents.onclickContentsRateIt = function(thisEle){
	console.log('PAGE_MY.contents.onclickContentsRateIt');
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(isDefined(eleData.rate) == true && eleData.rate > 0){
		alert('다운받은 콘텐츠에 대하여 이미 평가를 하셨습니다.');
		return;
	}

	var $targetModal = $('#disk-pc-pw_layer-modal');
	$targetModal.empty();
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		return;
	}
	var isModalCloseExisting = true;
	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.getContentsSetGradeFormPopupHtml(eleData);
	console.log(modalHtml);
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker",
			clickClose		: false,
			escapeClose		: false
		});
	}

};


//다운자료 평가하기 - 점수 클릭
PAGE_MY.contents.onclickContentsGradeIcon = function(thisEle){
	console.log('PAGE_MY.contents.onclickContentsGradeIcon');
	var eleData = $(thisEle).data();
	console.log(eleData);

	if(isDefined(eleData.grade) == true){
		if(isDefined(eleData.target) == true){
			$('#'+eleData.target).val(eleData.grade);
		}
	}

	$('.log-contents-grade-icon.active').removeClass('active');
	$(thisEle).addClass('active');

};

//코멘트 작성후 view 정보 업데이트
PAGE_MY.contents.setCommentDataUpdateLogEle = function(data, formData){
	console.log('PAGE_MY.contents.setCommentDataUpdateLogEle');
	console.log(data);
	console.log(formData);

	if(isDefined(formData.log_target) == true){
		var $targetListEle = $('#'+formData.log_target);
		if($targetListEle.length > 0 && isDefined(formData.onplay_rating) == true){
			if(formData.onplay_rating == 1){
				$targetListEle.find('.f_ico').removeClass('bad').addClass('good').data({rate: 1});
			}else if(formData.onplay_rating == 2){
				$targetListEle.find('.f_ico').removeClass('good').addClass('bad').data({rate: 2});
			}
			$targetListEle.find('.line_set').data({rate: formData.onplay_rating}).hide();
		}
	}

	if($('#getContentsSetGradeFormPopupHtml').length > 0){
		$.modal.close();
	}


	return;

};


//선택 목록 삭제 : 구매 목록, 찜한 목록
PAGE_MY.contents.onclickDelMyContentsList = function(thisEle){
	console.log('PAGE_MY.contents.onclickDelMyContentsList');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.target) == false){
		console.log('target empty');
		return;
	}

	var checkDelList = [];
	var checkDelbbsList = [];
	$('#'+eleData.target).find("input[name=my_contents_check]:checked").each(function() {
		checkDelList.push($(this).val());
	});

	$('#'+eleData.target).find("input[name=my_contents_check]:checked").each(function() {
		checkDelbbsList.push($(this).data().bbs_idx);
	});

	console.log('checkDelList', checkDelList);

	if(isDefined(checkDelList) == false){
		alert('삭제할 콘텐츠를 선택해주세요.');
		return;
	}

	if(checkDelList.length > 20){
		alert('한번에 최대 삭제 가능한 콘텐츠는 20개입니다.');
		return;
	}

	if(confirm('선택한 리스트를 모두 삭제할까요?') != true){
		return;
	}

	var successFunChangeContents = function(data){
		console.log('successFunChangeContents', data);
		var $targetList;
		if(isDefined(data.idxs)){
			for(var i in data.idxs){
				var contentsIdx = data.idxs[i];
				$targetList = $('#mypage-contents-action-list-'+contentsIdx);
				$targetList.remove();
			}
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		if($('.mypage-contents-action-list').length < 1){
			location.reload(true);
		}
		//var $targetList = $('#seller-contents-action-list-'+eleData.idx);

	};

	console.log(eleData.id);
	var formData = {
		id			: eleData.id,
		group		: eleData.group,
		action		: 'del',
		idxs		: checkDelList,
		bbsidxs		: checkDelbbsList
	};


	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.CONTENTS.SET_LIST_CHANGE,
		data		: formData,
		success_fun	: successFunChangeContents,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);




};


PAGE_MY.point = {};
PAGE_MY.point.start = function(){

};
PAGE_MY.point.callbackFun = function(data, saveData){
	console.log('PAGE_MY.point.callbackFun');
	console.log(data);
};


PAGE_MY.point.openPayDetailInfomodal  = function(odr){
	console.log('PAGE_MY.point.openPayDetailInfomodal');
	console.log('odr', odr);
	if(utility.disk.checkIsLogin() != true){
		GO_MENU('login');
		return;
	}
	
	if(!isDefined(odr)){
		alert('결제 정보를 선택해주세요.');
		return;
	}
	
	var sendData = {
		is_mobile	: 0,
		odr_no		: odr
	};
	
	
	var successAjaxViewOrderInfoData = function(data){
		console.log('successAjaxViewOrderInfoData');
		//console.log(data);
		
		if(isDefined(data.info_html)){
			
			var $targetModal = $('#disk-pc-big-modal');
			var viewHtml = data.info_html;
			//console.log('viewHtml', viewHtml);
			if(isDefined(viewHtml)){
				$targetModal.html(viewHtml).data(sendData).modal({
					escapeClose: true,
					clickClose: true,
					showClose: false,
					blockerClass	: 'contents-charge-blocker'
				});
	
				
				//console.log($.modal.OPEN);
			}
		}	
	}
	var contentsUrl = DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.charge_info;
	console.log(contentsUrl);
	var formData = sendData;

	var ajaxData =
	{
		url			: contentsUrl,
		data		: formData,
		success_fun	: successAjaxViewOrderInfoData,
		error_fun	: null,
		isSpinner	: true,
		data_type	: 'json',
		cache		: true
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};



//마이페이지 > 구독채널
PAGE_MY.channel = {};
PAGE_MY.channel.start = function(){

};
PAGE_MY.channel.callbackFun = function(data, saveData){
	console.log('PAGE_MY.channel.callbackFun', saveData);
	console.log(data);

	if(isDefined(saveData.id)){
		if(saveData.id == 'channel_create'){
			//WEB_COMMON_SELLER.joinformBinding();
		}
	}
};

//채널 생성 요청
PAGE_MY.channel.createSeller = function(eleId){
	console.log('PAGE_MY.channel.createSeller');

	if(isDefined(eleId) == false){
		return;
	}
	
	/*
	if(utility.disk.checkIsRealName() != true){
		alert('먼저 본인 인증 후 등록이 가능합니다.');
		GO_REAL_NAME();
		return;
	}
	*/

	var getf = $( '#'+eleId ).serialize();
	console.log('getf');
	console.log(getf);

	var getFormData = $( '#'+eleId ).serializeArray();
	console.log('getFormData', getFormData);

	var formData = {
		"join_seller_nickname_check"	: null,
		"join_seller_nickname"			: null,
		"join_seller_theme"				: null,
		"join_seller_category"			: null,
		"join_seller_first_category"	: null,
		"req_nickname"					: ''
	};

	var selectCategory = [];
	for(var i in getFormData){
		var fName = getFormData[i].name;
		var fVal = getFormData[i].value;
		if(fName == 'join_seller_category_item[]'){
			selectCategory.push(fVal);
			continue;
		}
		formData[fName] = fVal;
	}
	formData.join_seller_category = selectCategory;

	console.log('formData', formData);
	if(isDefined(formData.join_seller_nickname) == false ){
		$('#sellerForm-join_seller_nickname').focus();
		alert('판매자 닉네임을 입력해주세요.');
		return;
	}

	if(formData.join_seller_nickname.length < 2 || formData.join_seller_nickname.length > 8){
		alert('채널이름을 2자 이상 8자 이사롤 입력해주세요.');
		$('#sellerForm-join_seller_nickname').focus();
		return;
	}

	//form check
	if(isDefined(formData.join_seller_nickname_check) == false ){
		alert('닉네임 중복 체크를 해주세요.');
		return;
	}

	if(formData.join_seller_nickname_check != formData.join_seller_nickname ){
		alert('닉네임 중복 체크를 다시 해주세요.');
		return;
	}

	if(selectCategory.length < 1 ){
		alert('최소 1개 이상의 카테고리를 선택해주세요.');
		$('#sellerForm-join_seller_category-11000').focus();
		return;
	}
	formData.req_nickname = formData.join_seller_nickname;
	console.log('formData', formData);

	WEB_COMMON_SELLER.joinFormAction(formData, PAGE_MY.channel.createSellerCallbackFun);
};

//채널 생성후 완료 처리
PAGE_MY.channel.createSellerCallbackFun = function(data){
	console.log('PAGE_MY.channel.createSellerCallbackFun');
	console.log(data);
	if(isDefined(data.seller)){
		if(isDefined(data.seller.seller_idx)){
			$('.channel-wrap-card').hide();
			if(data.is_completed == '1'){
				$('.channel_completed_wrap').show();
				return;
			}
		}
	}
	$('.channel-wrap-card').hide();
	$('.channel_examination_wrap').show();
};

//채널 구독해제
PAGE_MY.channel.unsubscribe = function(thisEle){
	console.log('PAGE_MY.channel.unsubscribe');
	if(utility.disk.checkIsLoginWithModal() != true){
		return;
	}
	var eleData = $(thisEle).data();

	console.log('eleData', eleData);
	var sIdx;
	if(isDefined(eleData.idx)){
		sIdx = parseInt(eleData.idx);
	}

	var successCallbackFun = function(data){
		console.log('successCallbackFun', data);
		if(isDefined(data.show_msg)){
			$.ambiance({message: data.show_msg, type: "alert-warning"});
		}
		if(isDefined(data.idx)){
			$('#my-page-subscribe-item-'+data.idx).remove();
		}


		if($('.my-page-subscribe-item').length < 1){
			location.reload(true);
		}

	};

	COMMON_ACTION.SUBSCRIBE.actionUnsubscribe(sIdx, successCallbackFun);
};

PAGE_MY.community = {};
PAGE_MY.community.start = function(){

};
PAGE_MY.community.callbackFun = function(data, saveData){
	console.log('PAGE_MY.community.callbackFun');
	console.log(data);
	console.log(saveData);

	if(isDefined(data.my)){
		if(data.my.id == 'community_news'){
			PAGE_MY.community.bindingNews();
		}else if(data.my.id == 'community_memo'){
			PAGE_MY.community.bindingMemo();
			PAGE_MY.community.bindingMemoPagnation();
		}
	}


};


PAGE_MY.community.bindingNews = function(){
	console.log('PAGE_MY.community.bindingNews');
	//새소식 제목 클릭 - 내용보기
	if($( ".mypage-bbs-news-item" ).length > 0){
		$( ".mypage-bbs-news-item" ).unbind( "click");
		$( ".mypage-bbs-news-item" ).bind( "click", function() {
			console.log('.mypage-bbs-news-item');
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$('.mypage-bbs-news-item.active').removeClass('active');
				$(this).toggleClass('active');
			}

		});
	}
};


PAGE_MY.community.bindingMemo = function(){
	console.log('PAGE_MY.community.bindingMemo');

	//메모 : 제목 클릭 - 내용보기
	if($( ".mypage-bbs-memo-item" ).length > 0){
		$( ".mypage-bbs-memo-item" ).unbind( "click");
		$( ".mypage-bbs-memo-item" ).bind( "click", function() {
			console.log('.mypage-bbs-memo-item');
			if($(this).hasClass('active')){
				$(this).removeClass('active');
			}else{
				$('.mypage-bbs-memo-item.active').removeClass('active');
				$(this).toggleClass('active');
			}
			if($(this).hasClass('read') == false){
				$(this).removeClass('not_read').addClass('read');
			}
				
			if($(this).data('readed') != 1){
				PAGE_MY.community.onclickChangeMyMemoList(this);
			}

		});
	}

	//메모 : 탭 클릭
	if($( ".tab-mypage-memo" ).length > 0){
		$( ".tab-mypage-memo" ).unbind( "click");
		$( ".tab-mypage-memo" ).bind( "click", function() {
			console.log('.tab-mypage-memo');
			var memoType = $(this).data('type');
			if(isDefined(memoType) == false){
				console.log('err memo type');
				return;
			}
			if(memoType =='receive' || memoType =='box'){
				$('.mypage-memo-target-title').text('보낸사람');
			}
			else if(memoType =='send'){
				$('.mypage-memo-target-title').text('받는사람');
			}

			var sendData =
			{
				type		: memoType,
				page		: 0,
				next_page	: 1,
				limit		: 15,
				idx			: 1,
				info		: 'channel-mypage-memo-list-controller',
				target		: 'channel-mypage-memo-list',

			}

			console.log('sendData', sendData);

			$('.tab-mypage-memo.active').removeClass('active');
			$(this).addClass('active');

			PAGE_MY.community.getMoreMyPageMemorData(sendData, true);

		});
	}

	//메모 : 전체 선택
	var $selectAllCheckBox = $( "#my-memo-list-check-all");
	if($selectAllCheckBox.length > 0){
		$selectAllCheckBox.unbind( "click");
		$selectAllCheckBox.bind( "click", function() {
			console.log('my-memo-list-check-all');
			var targetForm = '#'+$(this).data('target');
			if($(this).prop("checked")) {
				$(targetForm).find("input[name=my_momo_check]").prop("checked",true);
			}else{
				$(targetForm).find("input[name=my_momo_check]").prop("checked",false);
			}
		});
	}


	//메모: 개별 선택
	if($( ".my_momo_check").length > 0){
		console.log('input_c my_momo_check binding');
		$( ".my_momo_check").unbind( "click");
		$( ".my_momo_check").bind( "click", function(event) {
			console.log('my_momo_check click');

			//부모 이벤트는 막자
			if(event.stopPropagation) event.stopPropagation(); //MOZILLA
			else event.cancelBubble = true; //IE

			checkBoxLength = $("[name=my_momo_check]").length;
			checkedLength = $("[name=my_momo_check]:checked").length;
			if(checkBoxLength == checkedLength){
				$selectAllCheckBox.prop("checked",true);
			}else{
				$selectAllCheckBox.prop("checked",false);
			}
		});
	}




};


PAGE_MY.community.bindingMemoPagnation = function(){
	console.log('PAGE_MY.community.bindingMemoTab');



	//메모 - 이전, 다음
	var $btnChannelBroChapterControler = $( ".btn-mypage-memo-list" );
	if($btnChannelBroChapterControler.length > 0){
		$btnChannelBroChapterControler.unbind( "click");
		$btnChannelBroChapterControler.bind( "click", function() {
			console.log('btn-mypage-memo-list');
			utility.shortPagination.action($(this), '.btn-mypage-memo-list', PAGE_MY.community.getMoreMyPageMemorData);	//반드시 .을 붙인다
		});
	}

};


//메모 : 더가져오기
PAGE_MY.community.getMoreMyPageMemorData = function(eleData, isTab){
	console.log('PAGE_MY.community.getMoreMyPageMemorData');
	console.log('eleData', eleData);
	console.log('isTab', isTab);


	//var eleData = $slickTarget.data();
	if(isDefined(eleData.idx) == false || isDefined(eleData.page) == false || isDefined(eleData.next_page) == false){
		return;
	}

	var nextPage = 1;
	if(isDefined(eleData.next_page)){
		nextPage = parseInt(eleData.next_page);
	}

	if(nextPage > 1 && nextPage > parseInt(eleData.total_page)){
		console.log('end page');
		return;
	}

	var successFunGetMyPageMomoList = function(data){
		console.log('successFunGetMyPageMomoList', data);
		if(isDefined(data.memo_data)){
			var cList = data.memo_data.list;
			var cHtml = [];
			var bChapter = null;
			for(var i = 0; i < cList.length; i++){
				cHtml[i] = TEMPLETE.WEB_PAGE.getMyMemoListHtml(cList[i], data.memo_type);
			}

			if(cList.length > 0){
				$('.memo.no-contents').removeClass('show');
			}else{
				$('.memo.no-contents').addClass('show');
			}

			if(isDefined(eleData.target) == true){
				//$('#'+eleData.target).addClass('animated fadeIn').html(cHtml.join(''));
				$('#'+eleData.target).html(cHtml.join(''));
			}


			if(isDefined(eleData.info) == true){
				var saveData = {
					page : parseInt(data.memo_data.page),
					limit : parseInt(data.memo_data.limit),
				};

			}
			if(isDefined(data.memo_type)){
				saveData.type = data.memo_type;
			}
			if(data.memo_data.page == 1){
				saveData.total_page = parseInt(data.memo_data.total_page);
				saveData.total_count = parseInt(data.memo_data.total_count);
			}
			console.log('saveData', saveData);
			$('#'+eleData.info).data(saveData);

			//set arfter binding
			PAGE_MY.community.bindingMemo();

			//set oPagnation
			if(isTab == true && data.memo_data.page == 1){
				console.log('set Pagnation')
				$('.prev.btn-mypage-memo-list').addClass('disabled');
				if(data.memo_data.total_page < 1){
					$('.next.btn-mypage-memo-list').addClass('disabled')
				}else{
					$('.next.btn-mypage-memo-list').removeClass('disabled')
				}

				//set count
				console.log($('.mypage-memo-'+data.memo_type+'-cnt'));
				$('.mypage-memo-'+data.memo_type+'-cnt').text(data.memo_data.total_count);

				//PAGE_MY.community.bindingMemoPagnation();
			}

			//체크 해제
			var $selectAllCheckBox = $( "#my-memo-list-check-all");
			$selectAllCheckBox.prop("checked",false);
			$("input[name=my_momo_check]").prop("checked",false);

			//이동
			if(data.memo_data.page == 1){
				utility.ui.goToElement('.mypage-contents-start');
			}else{
				utility.ui.goToElement('.file_list_wrap.memo');
			}
		}
	};

	var sendData = {
		idx		: eleData.idx,
		page	: nextPage,
		limit	: eleData.limit,
		type	: eleData.type,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.COMMUNITY.MORE_MY_MEMO,
		data		: sendData,
		success_fun	: successFunGetMyPageMomoList,
		error_fun	: null,
		isSpinner	: false,
	};
	DISK_PROTOCOL.AJAX(ajaxData);

};



//메노 : 선택 목록 삭제 action
PAGE_MY.community.onclickChangeMyMemoList = function(thisEle){
	console.log('PAGE_MY.contents.onclickChangeMyMemoList');
	var eleData = $(thisEle).data();
	console.log('eleData', eleData);

	if(isDefined(eleData.action) == false){
		console.log('action empty');
		return;
	}
	var tabEleType = $('.tab-mypage-memo.active').data('type');
	if(isDefined(tabEleType) == false){
		alert('선택한 정보가 올바르지 않습니다.');
		return;
	}
	var memoType = tabEleType;

	var checkDelList = [];
	var isSpinner = true;
	if(eleData.action == 'del'){
		if(isDefined(eleData.target) == false){
			console.log('target empty');
			return;
		}
		$('#'+eleData.target).find("input[name=my_momo_check]:checked").each(function() {
			checkDelList.push($(this).val());
		});

		console.log('checkDelList', checkDelList);

		if(isDefined(checkDelList) == false){
			alert('삭제할 콘텐츠를 선택해주세요.');
			return;
		}

		if(checkDelList.length > 20){
			alert('한번에 최대 삭제 가능한 콘텐츠는 20개입니다.');
			return;
		}

		if(confirm('선택한 리스트를 모두 삭제할까요?') != true){
			return;
		}
	}else if(eleData.action == 'read'){
		var readIdx = eleData.idx;
		if(memoType != 'receive'){
			console.log('not receive', memoType);
			$('#mypage-bbs-memo-item-'+readIdx).data('readed', 1);
			return;
		}
		isSpinner = false;
		checkDelList.push(readIdx);

	}else{
		console.log('action empty 2');
		return;
	}





	var successFunDelMyMemo = function(data){
		console.log('successFunDelMyMemo', data);
		var $targetList;
		if(isDefined(data.idxs)){
			for(var i in data.idxs){
				var contentsIdx = data.idxs[i];
				$targetList = $('#mypage-bbs-memo-item-'+contentsIdx);
				if(data.action_type == 'read'){
					$targetList.data('readed', 1);
				}else if(data.action_type == 'del'){
					$targetList.remove();
				}
			}
		}
		//new count update
		if(data.action_type == 'read'){
			var newMemoCnt = $('.mypage-memo-receive-cnt').text() -1;
			if(newMemoCnt < 0){
				newMemoCnt = 1;
			}
			$('.mypage-memo-receive-cnt').text(newMemoCnt);
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			if(data.action_type == 'read'){
				$.ambiance({message: data.show_msg, type: "alert-info"});
			}else{
				$.ambiance({message: data.show_msg, type: "alert-warning"});
			}
		}

		if($('.mypage-bbs-memo-item').length < 1){
			//location.reload(true);
			var sendData =
			{
				type		: memoType,
				page		: 0,
				next_page	: 1,
				limit		: 15,
				idx			: 1,
				info		: 'channel-mypage-memo-list-controller',
				target		: 'channel-mypage-memo-list',

			}

			console.log('sendData', sendData);
			PAGE_MY.community.getMoreMyPageMemorData(sendData, true);

		}
	};

	var formData = {
		id			: eleData.id,
		group		: eleData.group,
		action		: eleData.action,
		idxs		: checkDelList,
		type		: tabEleType
	};
	//console.log(formData);
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.COMMUNITY.CHANGE_MY_MEMO,
		data		: formData,
		success_fun	: successFunDelMyMemo,
		error_fun	: null,
		isSpinner	: isSpinner,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};



PAGE_MY.info = {};
PAGE_MY.info.start = function(){

};
PAGE_MY.info.callbackFun = function(data, saveData){
	console.log('PAGE_MY.info.callbackFun');
	console.log(data.my);

	PAGE_MY.info.initBindigCommon();

	if(isDefined(data.my.id) == true){
		if(data.my.id == 'info_edit'){

			PAGE_MY.info.initBindigInfoEdit();

		}
	}




};

//비밀번호확인 성공
PAGE_MY.info.successSecurityLogin = function(data){
	console.log('PAGE_MY.info.successSecurityLogin', data);

	if(isDefined(data.is_ok)){
		if(data.is_ok == 1){
			PAGE_MY.DATA.LAST_HASH = PAGE_MY.DATA.LAST_HASH +'&is_ok=1';
			location.hash = PAGE_MY.DATA.LAST_HASH;
		}
	}


};

//마이페이지: 정보 수정 - 보안 로그인
PAGE_MY.info.initBindigCommon = function(){
	if($('#myPageInfoSecurityLoginForm').length > 0){
		console.log('myPageInfoSecurityLoginForm');
		$("#myPageInfoSecurityLoginForm").unbind('submit');
		$("#myPageInfoSecurityLoginForm").submit(function(event){
			console.log('channelSellerContentsOwnerSearchForm submit');
			//event.preventDefault();
			var formValues = $(this).serializeArray();
			console.log('formValues:', formValues);

			var formData = changeFormArrToObject(formValues);
			console.log('formData:',formData);

	    	if(isDefined(formData.member_password) == false){
				alert('비밀번호를 입력해주세요.');
				$('#myPageInfoSecurityLoginForm_member_password').focus();
				return false;
			}

			COMMON_ACTION.MYPAGE.actionSecurityLogin(formData, PAGE_MY.info.successSecurityLogin);
			return false;

		});

	}
};

PAGE_MY.info.initBindigInfoEdit = function(){

	//메일 수신 여부 동의
	if($(':radio[name="agree_user_email"]').length > 0){
		$(':radio[name="agree_user_email"]').unbind('submit');
		$(':radio[name="agree_user_email"]').change(function() {
			console.log('agree_user_email submit');

			var changeVal = $(this).val();
			console.log('changeVal', changeVal);

			var loadVal = $('#myPageEditText_user_agree_email').data('loaded');
			console.log('loadVal', loadVal);
			if(changeVal != loadVal){
				PAGE_MY.info.changeUserAgreeEmail(changeVal);
			}
		});
	}

	//자녀 안심 서비스
	if($(':radio[name="member_safe_child"]').length > 0){
		$(':radio[name="member_safe_child"]').unbind('submit');
		$(':radio[name="member_safe_child"]').change(function() {
			console.log('member_safe_child submit');

			$( "#top-pc-disk-safe-child" ).trigger('click');
			return;
			var changeVal = $(this).val();
			console.log('changeVal', changeVal);

			var loadVal = $('#myPageEditText_member_safe_child').data('loaded');
			console.log('loadVal', loadVal);

			if(changeVal != loadVal){
				PAGE_MY.info.changeMemberChildBlock(changeVal);
			}

		});
	}
};


//닉네임 중복 체크
PAGE_MY.info.checkMemberDuplicateNickname = function(thisEle){
	console.log('PAGE_MY.info.checkMemberDuplicateNickname');

	var eleData = $(thisEle).data();
	console.log(eleData);

	//var targetEleId = $(thisEle).data('target');
	//var checkEleId = $(thisEle).data('check');

	if(isDefined(eleData.target) == false){
		console.log('empty targetEleId');
		return;
	}
	var $targetEle = $('#'+eleData.target);
	var memberNick = $targetEle.val();
	console.log(memberNick.length);

	if(isDefined(memberNick) == false || memberNick == ''){
		alert('원하시는 닉네임을 입력해주세요.');
		$targetEle.focus();
		return;
	}

	if(memberNick.length < 2 || memberNick.length > 8){
		alert('닉네임은 2자 이상 8자까지 입력이 가능합니다..');
		$targetEle.focus();
		return;
	}

	console.log('memberNick', memberNick);

	var successFunGetMemberDupCheck = function(data){
		console.log('successFunGetMovieContentsList', data);
		if(isDefined(data.check)){
			if(data.check == 'OK'){
				alert('탁월한 선택입니다. 사용가능한 닉네임입니다.');
				$('#'+eleData.checker).val(data.nickname);

				$(thisEle).removeClass('active');
				return;
			}
		}
		alert('사용하실 없는 닉네임입니다. 다른 닉네임을 선택해주세요.');
	};
	var formData = {
		req_nickname	: memberNick,
		type			: 'member'
	};

	COMMON_ACTION.MEMBER.checkDuplicateNicknames(formData, successFunGetMemberDupCheck);
};

//이메일 수신 여부
PAGE_MY.info.changeUserAgreeEmail = function(changeVal){

	if(isDefined(changeVal) == false || $.isNumeric(changeVal) == false){
		alert('변경된 정보가 없습니다.');
		return;
	}
	var successChangeUserAgreeEmail = function(data){
		console.log('successChangeUserAgreeEmail');

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		$('#myPageEditText_user_agree_email').data('loaded', changeVal);

	};

	var formData = {
		user_agree_email: parseInt(changeVal)
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.CHANGE_EMAIL_STATUS,
		data		: formData,
		success_fun	: successChangeUserAgreeEmail,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);
};


//자녀 안심 보호 서비스
PAGE_MY.info.changeMemberChildBlock = function(changeVal){

	if(isDefined(changeVal) == false || $.isNumeric(changeVal) == false){
		alert('변경된 정보가 없습니다.');
		return;
	}
	var successChangeMemberChildBlock = function(data){
		console.log('successChangeMemberChildBlock');

		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		$('#myPageEditText_member_safe_child').data('loaded', changeVal);
	};

	var sendData = {
		member_safe_child : parseInt(changeVal)
	}
	COMMON_ACTION.MEMBER.changeMemberInfoChildBlock(sendData, successChangeMemberChildBlock);
};

//닉네임 설정 폼데이타 전송
PAGE_MY.info.onclickSetMemberNicknameFormAction = function(targetFormId){
	console.log('PAGE_MY.info.onclickSetMemberNicknameFormAction');
	console.log('targetFormId', targetFormId);

	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}

	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}

	if(isDefined(formData.member_nickname) == false){
		alert('원하시는 닉네임을 입력해주세요.');
		return;
	}

	if(formData.member_nickname != formData.checkedNickname){
		alert('사용하실 닉네임에 대하여 중복채크를 해주세요.');
		$targetForm.find('.btn_check').addClass('active');
		return;
	}


	if(isDefined(formData.agree_info) == false){
		alert('닉네임 개인정보 수집에 동의해 주세요');
		return;
	}
	console.log('formData:',formData);

	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}


	var successMemberNicknameRegistActionFun = function(data){
		console.log('successMemberNicknameRegistActionFun', data);

		//회원정보 저장
		if(isDefined(data.member)){
			var saveMemberData = JSON.stringify(data.member);
			utility.disk.setStorageData('member_data', saveMemberData);
			DISK_MEMBER_FUN.setMemberInfo(data.member, false);
		}

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		if(isDefined(data.member_nickname)){
			$('.mypage-member-nickname-span').text(data.member_nickname);
			$('.common-member-nickname-span').text(data.member_nickname);
		}

		$.modal.close();
		//location.reload(true); // 2019-11-04 omh 추가 (이름등 안바뀌어서 아예 새로고침)
	};
    //return false;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.MY_PAGE.INFO.SET_NICKNAME_ACTION,
		data		: formData,
		success_fun	: successMemberNicknameRegistActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};


//맴버 생일 설정 오픈
PAGE_MY.info.openMemberBirthSetForm = function(thisEle){
	console.log('PAGE_MY.info.openMemberBirthSetForm');
	var $targetModal = $('#disk-pc-set-birthday-modal');
	//$targetModal.empty();
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		return;
	}

	var eleData = $(thisEle).data();
	var isModalCloseExisting = false;
	$targetModal.modal({
		closeExisting: isModalCloseExisting,
		blockerClass	: "common-modal-blocker"
	});

	return;
};



//생일 입력 전송 폼
PAGE_MY.info.onclickSetMemberBirthFormAction = function(targetFormId){
	console.log('PAGE_MY.info.onclickSetMemberBirthFormAction');
	console.log('targetFormId', targetFormId);

	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}

	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}

	if(isDefined(formData.agree_brith) == false){
		alert('개인정보 수집에 동의해 주세요');
		$targetForm.find('input[name=agree_brith]').focus();
		return;
	}


	if(isDefined(formData.member_brith_year) == false){
		alert('태어나신 년도를 선택해주세요.');
		$targetForm.find('select[name=member_brith_year]').focus();
		return;
	}

	if(isDefined(formData.member_brith_month) == false){
		alert('태어나신 년도의 월을 선택해주세요.');
		$targetForm.find('select[name=member_brith_month]').focus();
		return;
	}
	if(isDefined(formData.member_brith_day) == false){
		alert('태어나신 날짜(일)를 선택해주세요.');
		$targetForm.find('select[name=member_brith_day]').focus();
		return;
	}



	console.log('formData:',formData);

	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}
	var successUserBrithDataActionFun = function(data){
		console.log('successUserBrithDataActionFun', data);

		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		if(isDefined(data.show_user_birth)){
			$('#mypage-user-birth-txt').text(data.show_user_birth);
			$('.brith-info').removeClass('no_data');
			$('.birth-empty-info').addClass('no_data');

		}

		$.modal.close();
	};
    //return false;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.SET_BRITHDAY_INFO,
		data		: formData,
		success_fun	: successUserBrithDataActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;

};


//비밀번호 변경 전송 폼
PAGE_MY.info.onclickSetMemberNewPasswordFormAction = function(targetFormId){
	console.log('PAGE_MY.info.onclickSetMemberNewPasswordFormAction');
	console.log('targetFormId', targetFormId);

	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}

	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}

	if(isDefined(formData.user_old_passwd) == false){
		alert('현재 비밀번호를 입력해주세요.');
		$targetForm.find('input[name=user_old_passwd]').focus();
		return;
	}

	if(isDefined(formData.user_new_passwd) == false){
		alert('변경할 비밀번호를 입력해주세요.');
		$targetForm.find('input[name=user_new_passwd]').focus();
		return;
	}
	if(isDefined(formData.user_new_passwd2) == false){
		alert('비밀번호 재확인를 입력해주세요.');
		$targetForm.find('input[name=user_new_passwd2]').focus();
		return;
	}

	if(formData.user_new_passwd != formData.user_new_passwd2){
		alert('변경하실 비밀번호가 서로 다릅니다.');
		$targetForm.find('input[name=user_new_passwd2]').focus();
		return;
	}

	if(formData.user_old_passwd == formData.user_new_passwd){
		alert('변경하실 비밀번호가 이전과 동일합니다.');
		$targetForm.find('input[name=user_new_passwd]').focus();
		return;
	}

	if(formData.user_new_passwd.length < 8){
		alert('변경할 비밀번호를 8자 이상 입력해주세요.');
		$targetForm.find('input[name=user_new_passwd]').focus();
		return;
	}
	console.log('formData:',formData);

	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}
	var successUserPassDataActionFun = function(data){
		console.log('successUserPassDataActionFun', data);

		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		GO_MENU('info_edit');
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.PASSWORD_CHANGE_ACTION,
		data		: formData,
		success_fun	: successUserPassDataActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;

};
//정기 결제 해지

PAGE_MY.info.onclickUserLeaveFormAction = function(targetFormId){
	console.log('PAGE_MY.info.onclickUserLeaveFormAction');
	console.log('targetFormId', targetFormId);

	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}

	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}
	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}
	if(isDefined(formData.agree_secession) == false){
		alert('먼저 회원탈퇴에 동의를 체크하셔야합니다. ');
		return;
	}
	if(formData.agree_secession != 'on'){
		alert('먼저 회원탈퇴에 동의를 체크하셔야합니다. ');
		return;
	}

	if(isDefined(formData.user_passwd) == false){
		alert('비밀번호를 입력해주세요.');
		$targetForm.find('input[name=user_passwd]').focus();
		return;
	}

	if(isDefined(formData.user_email) == false){
		alert('로그인 이메일 정보가 올바르지 않습니다.');
		$targetForm.find('input[name=user_email]').focus();
		return;
	}

	console.log('formData:',formData);



	if(confirm("보유하고 계신 포인트와 쿠폰이 모두 소멸되며,일정기간 재가입이 불가능하며  계정 복구가 불가능합니다.\n탈퇴를 진행하시겠습니까? ") == false){
		return;
	}


	var successUserLeaveActionFun = function(data){
		console.log('successUserLeaveActionFun', data);

		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			//$.ambiance({message: data.show_msg, type: "alert-info"});
		}
		DISK_MEMBER_FUN.setMemberLogout(false);

		GO_MENU('home');
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.LEAVE_ACTION,
		data		: formData,
		success_fun	: successUserLeaveActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};

//회원 탈퇴
PAGE_MY.info.onclickAutoPayCancelFormAction = function(targetFormId){
	console.log('PAGE_MY.info.onclickUserLeaveFormAction');
	console.log('targetFormId', targetFormId);

	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}

	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}
	if(isDefined(formData) == false){
		alert('전송정보가 올바르지 않습니다.');
		return;
	}
	if(isDefined(formData.agree_autocancel) == false){
		alert('매달 정기결제되는 것이 동의를 체크하셔야합니다. ');
		return;
	}
	if(formData.agree_autocancel != 'on'){
		alert('매달 정기결제되는 것이 동의를 체크하셔야합니다. ');
		return;
	}


	console.log('formData:',formData);



	if(confirm("매달 정기결제되는 것이 해지하시겠습니까? ") == false){
		return;
	}


	var successUserLeaveActionFun = function(data){
		console.log('onclickAutoPayCancelFormAction', data);

		if(isDefined(data.show_msg)){
			alert(data.show_msg);
			window.location.href = '/my';
			//$.ambiance({message: data.show_msg, type: "alert-info"});
		}
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.AUTOPAY_CANCEL,
		data		: formData,
		success_fun	: successUserLeaveActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};




//sns 연동
PAGE_MY.info.onclickUserSnsConnectAction = function(thisEle){
	console.log('PAGE_MY.info.onclickUserSnsConnectAction');
	var DF = get_disk_config(false);
	var eleData = $(thisEle).data();
	var actionType = 'connect';

	if(isDefined(eleData.sns) == false){
		alert('연동할 SNS 타입을 선택해주세요.');
		return;
	}
	console.log('eleData', eleData);
	//돌아갈 페이지는 없고 새로고침
	var retrunUrl = '';
	retrunUrl = 'reload';
	//돌아갈 페이지를 쿠키에 저장
	//retrunUrl = getSelfHostFullUrl();
	console.log('retrunUrl', retrunUrl);
	if(isDefined(retrunUrl) == true){
		if (retrunUrl.indexOf('/login') != -1) {
		  retrunUrl = '/index.php/home/';
		}
		$.cookie(DF.cookiePrefix+'rt_url', retrunUrl, { path: '/',domain: DF.COOKIE_DOMAIN });
	}
	console.log('retrunUrl', retrunUrl);
	//return;


	var snsType = eleData.sns;
	console.log('snsType::'+snsType);
	var openUrl = null;
	//var snsOauthPopup = null;
	var snsOauthPopup = window.open('about:blank', 'sns_oAuth', 'scrollbars=yes, width=600, height=600, top=0, left=0');

	if(snsType == 'naver'){
		openUrl = '/index.php/login/sns_naver/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);
	}else if(snsType == 'kakao'){
		openUrl = '/index.php/login/sns_kakao/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);

	}else if(snsType == 'facebook'){
		openUrl = '/index.php/login/sns_facebook/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);

	}else if(snsType == 'google'){
		openUrl = '/index.php/login/sns_google/0/?url='+retrunUrl+'&login_type='+actionType;
		//snsOauthPopup = PopupCenter(openUrl, 'sns_oAuth', 600, 600);

	}else{
		//location.href = "/index.php/login/";

	}
	//console.log('snsOauthPopup', snsOauthPopup);
	//window.postMessage({ childData : 'test data' }, '*');

	//return;
	if(snsOauthPopup && openUrl){
		snsOauthPopup.location.href = openUrl;
	}else{
		snsOauthPopup.close();
		snsOauthPopup = null;
	}
	return;
};


//sns 연동 해제
PAGE_MY.info.onclickUserSnsDisConnectAction = function(thisEle){
	console.log('PAGE_MY.info.onclickUserSnsDisConnectAction');
	var eleData = $(thisEle).data();
	var actionType = 'connect';
	if(isDefined(eleData.sns) == false || isDefined(eleData.sns_key) == false){
		alert('연동 해제할 SNS 정보를 선택해주세요.');
		return;
	}
	if(isDefined(eleData.idx) == false){
		alert('선택한 데이타가 올바르지 않습니다.');
		return;
	}
	console.log('eleData', eleData);

	//컨펌
	if( confirm('선택하신 SNS 연동을 해제하시겠습니까?\n해제된 연동은 다시 연돌하기를 통해 재연결이 가능합니다.') != true){
		return;
	}


	var successSnsDisconnectFun = function(data){
		console.log('successSnsDisconnectFun');
		console.log(data);
		if(isDefined(data.inner_sns_html)){
			$('.my_info_sns_section').html(data.inner_sns_html);
		}
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}
	};


	var formData = {
		is_mobile	: 0,
		idx			: eleData.idx,
		sns_channel	: eleData.sns_key

	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.DISCONNECT_SNS_ACTION,
		data		: formData,
		success_fun	: successSnsDisconnectFun,
		error_fun	: null,
		isSpinner	: true,
	};
	DISK_PROTOCOL.AJAX(ajaxData);


	return;
};


//sns 연동 최신정보로 가져오기
PAGE_MY.info.getReloadSnsConnectList = function(){
	console.log('PAGE_MY.info.getReloadSnsConnectList');

	var successSnsDisconnectFun = function(data){
		console.log('successSnsDisconnectFun');
		console.log(data);
		if(isDefined(data.is_ok)){
			if(isDefined(data.inner_sns_html)){
				$('.my_info_sns_section').html(data.inner_sns_html);
			}
		}
	};

	var errSnsConnectFun = function(){
		console.log('errSnsConnectFun');
	};

	var formData = {
		is_mobile	: 0,
	};
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.GET_SNS_CONNECT_LIST,
		data		: formData,
		success_fun	: successSnsDisconnectFun,
		error_fun	: errSnsConnectFun,
		isSpinner	: false,
	};
	DISK_PROTOCOL.AJAX(ajaxData);


	return;
};

//SNS 비밀번호 신규 등록 설정 오픈
PAGE_MY.info.openUserPasswordNewSetForm = function(thisEle){
	console.log('PAGE_MY.info.openUserPasswordNewSetForm');
	var $targetModal = $('#disk-pc-common-modal');
	$targetModal.empty();
	var isLogined = utility.disk.checkIsLoginWithModal();
	if(isLogined != true){
		return;
	}

	var eleData = $(thisEle).data();
	var isModalCloseExisting = false;
	console.log('eleData');
	/*
	if($('.common-modal-blocker').length > 0){
		isModalCloseExisting = false;
	}
	*/

	var modalHtml = TEMPLETE.WEB_PAGE_MODAL.setUserPasswordReg(eleData);
	if(isDefined(modalHtml)){
		$targetModal.html(modalHtml).modal({
			closeExisting: isModalCloseExisting,
			blockerClass	: "common-modal-blocker",
			clickClose		: false,
			escapeClose		: false
		});
	}
};


//SNS 비밀번호 신규 등록  폼데이타 전송
PAGE_MY.info.onclickSetUserPasswordNewSetFormAction = function(targetFormId){
	console.log('PAGE_MY.info.onclickSetUserPasswordNewSetFormAction');
	console.log('targetFormId', targetFormId);

	if(isDefined(targetFormId) == false){
		console.log('empty targetFormId');
		return;
	}

	var $targetForm = $('#'+targetFormId);
	var formValues = $targetForm.serializeArray();
	console.log('formValues:', formValues);

	var formData = changeFormArrToObject(formValues);
	console.log('formData:',formData);

	if(isDefined(formData)== false){
		return false;
	}

	if(isDefined(formData.user_email) == false){
		alert('이메일 정보가 올바르지 않습니다.');
		return;
	}
	//remove invalid class
	$targetForm.find('input').removeClass('is-invalid');

	if(isDefined(formData.user_pass1) == false){
		alert('원하시는 비밀번호를 입력해 주세요.');
		$targetForm.find('input[name=user_pass1]').addClass('is-invalid');
		return;
	}
	if(formData.user_pass1.length < 8){
		alert('비밀번호는 최소 8자 이상입니다.');
		$targetForm.find('input[name=user_pass1]').addClass('is-invalid');
		return;
	}

	if(isDefined(formData.user_pass2) == false){
		alert('비밀번호가 서로 일치하지 않습니다.');
		$targetForm.find('input[name=user_pass2]').addClass('is-invalid');
		return;
	}

	if(formData.user_pass1 != formData.user_pass2){
		alert('비밀번호가 서로 일치하지 않습니다.');
		$targetForm.find('input[name=user_pass2]').addClass('is-invalid');
		return;
	}

	var sendFormData = {
			user_email	: formData.user_email,
			user_password	: formData.user_pass1,
	};


	var successUserSnsNewPasswordRegistActionFun = function(data){
		console.log('successUserSnsNewPasswordRegistActionFun', data);
		if(isDefined(data.show_msg)){
			//alert(data.show_msg);
			$.ambiance({message: data.show_msg, type: "alert-info"});
		}

		//
		if(isDefined(data.is_ok)){
			//$('.mypage-member-nickname-span').text(data.member_nickname);
			if(data.is_ok){
				//alert('ok');
				$('#onplayMyInfoPasswordTypeWeb').addClass('has_password');
			}
		}



		$.modal.close();
		//location.reload(); // 2019-11-04 omh 추가 (이름등 안바뀌어서 아예 새로고침)
	};
    //return false;
	var ajaxData =
	{
		url			: DISK_PROTOCOL.ONPLAY_URL.USER.SET_SNS_PASS_ACTION,
		data		: sendFormData,
		success_fun	: successUserSnsNewPasswordRegistActionFun,
		error_fun	: null
	};
	DISK_PROTOCOL.AJAX(ajaxData);

	return false;
};
