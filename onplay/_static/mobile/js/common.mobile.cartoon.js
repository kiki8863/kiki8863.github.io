MOBILE_CARTOON = {};
MOBILE_CARTOON.DATA = {
	CARTOON : null
}

MOBILE_CARTOON.mobileCartoonStart =function (cartoon_ext, cartoon_url) {
	console.log('MOBILE_CARTOON.mobileCartoonStart');
	console.log('cartoon_ext', cartoon_ext);
	console.log('cartoon_url', cartoon_url);
	if(isDefined(cartoon_ext)){
		cartoon_ext = cartoon_ext.toLowerCase();
	}
	
	if(isDefined(cartoon_url) == false || cartoon_url.length < 1){
		disk_alert('재생할 도서 파일이 없습니다.');
		return;
	}
	
	//MOBILE_CARTOON.openMobilePdfBook(cFiles);
	if(cartoon_ext == 'pdf' || cartoon_ext == 'PDF'){
		MOBILE_CARTOON.openMobilePdfBook(cartoon_url);	
	}else if(cartoon_ext == 'zip'){
		MOBILE_CARTOON.intMobileCartoonBook(cartoon_url);
	}
	return;
	
	
};


MOBILE_CARTOON.intMobileCartoonBook =function (cFiles) {
	console.log('MOBILE_CARTOON.intMobileCartoonBook');
	console.log(cFiles);
	
	
	if(isDefined(cFiles) == false || cFiles.length < 1){
		disk_alert('재생할 도서 파일이 없습니다.');
		return;
	}
	
	
	
	var successLoadOpenModalFun = function(){
		console.log('successLoadOpenModalFun');
		//마지막으로 본 에피소드 - 스토리지에 저장
		var selectedEpisode = 1;
		var selectedPage = 0;			//마지막으로 본 페이지
		var targetBook = cFiles[0];
		
		for(var i in cFiles){
			if(cFiles[i]['episode'] == selectedEpisode){
				targetBook = cFiles[i];
				break;
			}
		}
		//모달 오픈 완료후
		var openMobileBookViewer = function($modalEle){
			console.log('openMobileBookViewer');
			console.log($modalEle);	
			var deviceView = utility.ui.viewport();
			console.log('deviceView', deviceView);
			var comicH = deviceView.height - 100;
			$modalEle.find('.comic_view').css({'min-height': comicH+'px'});
			MOBILE_CARTOON.openMobileCartoonBook($modalEle, targetBook, selectedEpisode, selectedPage);
		};
		
		//var cartoonBookCoentsSwipHtml = MOBILE_TEMPLETE.BOOKS.getMobileBookViewContentsHtml(targetBook, selectedEpisode, cFiles, selectedPage);
		//console.log('cartoonBookCoentsSwipHtml', cartoonBookCoentsSwipHtml);
		
		var mobileBookViewHtml =  MOBILE_TEMPLETE.MODAL.mobileCartoonBook(targetBook, selectedEpisode, cFiles, selectedPage);
		//$('.mobile_wrap-contents-modal-view').append(mobileBookViewHtml);
        
		if(isDefined(mobileBookViewHtml)){
        	MOBILE_CARTOON.OPEN_PAGE_MODAL(mobileBookViewHtml, openMobileBookViewer);	
        }else{
        	disk_alert('재생할 도서 파일이 없습니다.');
			return;
        }
        
        
		
	};
	
	
	var successLoadJsActionFunCompleted = function(){
		console.log('successLoadJsActionFunCompleted');
		successLoadOpenModalFun();
	};
	
	var successLoadAfterActionFun_2 = function(){
		console.log('successLoadAfterActionFun_1');
		var tagetJsClassName1 = 'photoswipe_ui_default_js';
		var jsSrc2 = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetJsClassName1).data('url');
		if(isDefined(jsSrc2)){
			loadJsAsync(jsSrc2, successLoadJsActionFunCompleted,tagetJsClassName1);
		}
	};
	
	var successLoadCssActionFunCompleted = function(){
		console.log('successLoadCssActionFunCompleted');
		var tagetJsClassName = 'photoswipe_min_js';
		var jsSrc = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetJsClassName).data('url');
		if(isDefined(jsSrc)){
			loadJsAsync(jsSrc, successLoadAfterActionFun_2,tagetJsClassName);
		}
	};

	var successLoadAfterActionFun_1 = function(){
		console.log('successLoadAfterActionFun_1');
		var tagetClassName1 = 'photoswipe_skin_css';
		var cssSrc1 = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetClassName1).data('url');
		if(isDefined(cssSrc1)){
			loadCssAsync(cssSrc1, successLoadCssActionFunCompleted,tagetClassName1);
		}
	};
	var tagetClassName = 'photoswipe_css';
	var cssSrc = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetClassName).data('url');
	if(isDefined(cssSrc)){
		loadCssAsync(cssSrc, successLoadAfterActionFun_1,tagetClassName);
	}
};

MOBILE_CARTOON.openMobileCartoonBook =function ($modalEle, targetBook, selectedEpisode, selectedPage) {
	console.log('MOBILE_CARTOON.openMobileCartoonBook');
	console.log('targetBook', targetBook);
	console.log('selectedEpisode', selectedEpisode);
	console.log('selectedPage', selectedPage);
	
	var deviceViewport = utility.ui.viewport();
	console.log('deviceViewport',deviceViewport);
	var bookH = deviceViewport.height - 65;
	var bookW = deviceViewport.width;
	
	var viewerContainerEleId = 'mobile-comic-viewer-container';
	
	//현재 보던 페이지
	var selectedPage = 0;
	var episodeTotalCnt = parseInt(targetBook.cnt);
	//마지막 본 페이지
	var storagePageKey = targetBook.hash+'_'+targetBook.episode;
	var lastPage = utility.disk.getStorageData(storagePageKey);
	if(isDefined(lastPage)){
		selectedPage = parseInt(lastPage)
	}

	
	
	//fullscreen
	
	var goFS = document.getElementById("goViewFS");
	var fullScreenContainer = document.getElementById(viewerContainerEleId);
	goFS.addEventListener("click", function() {
		
		console.log(fullScreenContainer);
		//fullScreenContainer.requestFullscreen();
		if (document.fullscreenElement) {
			console.log('has full screen');
			document.exitFullscreen();
			
		} else {
			console.log('non full screen');
			fullScreenContainer.requestFullscreen();
		}
	}, false);
	//$('#'+viewerContainerEleId).addClass('c_on');
	
	
	/*
	if(selectedPage > 1){
		startLinkNumber = 10000 + (selectedPage - 1);
	}
	*/
	//var fileNmae = startLinkNumber+'.pdf';
	//var url = targetBook.url+'/'+fileNmae;
	//url ='/_static/down/10000.pdf';
	console.log('url', url);
	
		
	//swip init
	var pswpElement = document.querySelectorAll('.pswp')[0];

	// build items array
	
	var bookItems = [
	    /*
		{
	        src: 'https://placekitten.com/600/400',
	        w: 600,
	        h: 400
	    },
	    {
	        src: 'https://placekitten.com/1200/900',
	        w: 1200,
	        h: 900
	    }
	    */
	];
	var lastSelectIndex = 1;
	var isThumb = false;
	if(targetBook.thumb == 1){
		isThumb = true;
	}
	var startLinkNumber = 10000;
	for(var i =0; i < episodeTotalCnt; i++){
		
		var imgSrc = startLinkNumber+'.jpg';
		if(isThumb == true){
			imgSrc = targetBook.hash +'_'+startLinkNumber+'.jpg';
		}
		var url = targetBook.url+'/'+imgSrc;
		var bookItem = 
		{
	        src: url,
	        w: bookW,
	        h: bookH
	    }
	    //console.log('bookItem', bookItem);
	    bookItems.push(bookItem);
	    startLinkNumber++;
	}
	//console.log('bookItems', bookItems);
	
	// define options (if needed)
	var options = {
	    // optionName: 'option value'
	    // for example:
	    index: selectedPage, // start at first slide,
	    modal : true,
	    loop : true,
	    closeEl:false,
	    shareEl: false,
	    captionEl: false,
	    fullscreenEl: false,
	    counterEl: false,
		loop : false,
	    focus : false,
	    history : false,
	    preload : [1,2],
	    
	    //tapToToggleControls: false,
	    //closeElClasses: ['comic_control'], 
	    //mainClass : 'comic_control',
	};
	
	// Initializes and opens PhotoSwipe
	MOBILE_CARTOON.DATA.CARTOON  = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, bookItems, options);
	MOBILE_CARTOON.DATA.CARTOON.init();
	
	console.log(MOBILE_CARTOON.DATA.CARTOON);
	var isFirstLoad = false;
	MOBILE_CARTOON.DATA.CARTOON.listen('imageLoadComplete', function(index, item) { 
	    // index - index of a slide that was loaded
	    // item - slide object
	    console.log('imageLoadComplete');
	    console.log(index);
	    console.log(item);
	    
	    //하단 바
	    if(isFirstLoad != true){
		    var barPer = index/episodeTotalCnt * 100;
		    console.log('barPer', barPer);
		    $('.comic_bar_wrap').find('.bar').css({'width':barPer+'%'});
		    $('.comic_bar_wrap').find('.dot').css({'left':barPer+'%'});
		    $('.comic_bar_wrap').find('.page_view').find('.cur').text(index+1);
		    $('.comic_bar_wrap').find('.page_view').find('.tot').text(episodeTotalCnt);
		    isFirstLoad = true;
	    }
	    //마지막 페이지 저장
	});
	
	episodeTotalCnt = MOBILE_CARTOON.DATA.CARTOON.options.getNumItemsFn();
	MOBILE_CARTOON.DATA.CARTOON.listen('afterChange', function() { 
		console.log('afterChange');
		
		var index  = MOBILE_CARTOON.DATA.CARTOON.getCurrentIndex();
		console.log('index', index);
		//하단 바
	    var barPer = index/(episodeTotalCnt) * 100 - 3;
	    console.log('barPer', barPer);
	    $('.comic_bar_wrap').find('.bar').css({'width':barPer+'%'});
	    $('.comic_bar_wrap').find('.dot').css({'left':barPer+'%'});
	    $('.comic_bar_wrap').find('.page_view').find('.cur').text(index+1);
	    $('.comic_bar_wrap').find('.page_view').find('.tot').text(episodeTotalCnt);
	    
	    //마지막 페이지 정보
	    //if(lastSelectIndex < index){
	    lastSelectIndex = index;
	    //}
	});
	
	
	
	MOBILE_CARTOON.DATA.CARTOON.listen('close', function() {
		console.log('close event');
		//마지막 페이지 저장
		utility.disk.setStorageData(storagePageKey, lastSelectIndex);
		//MOBILE_CARTOON.DATA.CARTOON = null;
		MOBILE_CARTOON.CLOSE_PAGE_MODAL_ACTION(true);
	});
	
	MOBILE_CARTOON.DATA.CARTOON.listen('unbindEvents', function() {
		console.log('unbindEvents');
		
	});
	
	MOBILE_CARTOON.DATA.CARTOON.framework.bind( MOBILE_CARTOON.DATA.CARTOON.scrollWrap , 'pswpTap', function(e) {
    	console.log('tap', e, e.detail);
    	if($('.pswp__ui ').hasClass('pswp__ui--hidden')){
    		$('.comic_control').removeClass('close_tab');
    	}else{
    		$('.comic_control').addClass('close_tab');
			
    	}
    	
	});

	
	
	//하단 컨트롤
	/*
	$( ".comic_control" ).on( "click", function(event) {
		//event.preventDefault();
		event.stopPropagation();
		//event.stopImmediatePropagation();

		console.log('comic_control click');
		return false;
	  
	});
	*/
	//프로그래시바
	$("#book_cartoon_comic_bar_wrap").click(function(e){
		var thisW = $(this).width();
		var thisO = $(this).find('.bar').offset();
		var thisP = $(this).find('.bar').position();
		var barLeft = parseInt(thisO.left);
		var x = e.pageX - barLeft;
		var y = e.pageY - this.offsetTop;
		console.log('barLeft', barLeft);
		console.log('thisW', thisW);
		console.log('x', x);
		console.log('thisO', thisO);
		console.log('thisP', thisP);
		console.log('this.offsetLeft', this.offsetLeft);
		//console.log('y', y);
		
		//return;
		
		
		var clickPer = x / thisW;
		console.log('clickPer', clickPer);
		//if(clickPer < 1){
			//clickPer = 1;
		//}
		 
		if(clickPer > 1){
			clickPer = 1;
		}
		if(isDefined(MOBILE_CARTOON.DATA.CARTOON)){
			var goPage = parseInt(episodeTotalCnt * clickPer);
			console.log('goPage', goPage);
			if(goPage > episodeTotalCnt){
				goPage = episodeTotalCnt;
			}else if(goPage < 1){
				goPage = 0;
			}
			MOBILE_CARTOON.DATA.CARTOON.goTo(goPage);
		}
		
		
	}); 
	
	//
	
};



MOBILE_CARTOON.openMobilePdfBook =function (cFiles) {
	console.log('MOBILE_CARTOON.openMobilePdfBook');
	console.log(cFiles);
	
	if(isDefined(cFiles) == false || cFiles.length < 1){
		disk_alert('재생할 도서 파일이 없습니다.');
		return;
	}
	
	
	
	var successLoadAfterActionFun = function(){
		console.log('successLoadAfterActionFun');
		//마지막으로 본 에피소드 - 스토리지에 저장
		var selectedEpisode = 1;
		var selectedPage = 0;			//마지막으로 본 페이지
		var targetBook = cFiles[0];
		
		for(var i in cFiles){
			if(cFiles[i]['episode'] == selectedEpisode){
				targetBook = cFiles[i];
				break;
			}
		}
		//모달 오픈 완료후
		var openMobileBookViewer = function($modalEle){
			console.log('openMobileBookViewer');
			console.log($modalEle);	
			var deviceView = utility.ui.viewport();
			console.log('deviceView', deviceView);
			var comicH = deviceView.height - 65;
			$modalEle.find('.comic_view').css({'min-height': comicH+'px'});
			MOBILE_CARTOON.loadMobilePdfViewer($modalEle, targetBook, selectedEpisode, selectedPage);
		};
		
		
		
		var mobileBookViewHtml =  MOBILE_TEMPLETE.MODAL.mobilePdfBook(targetBook, selectedEpisode, cFiles);	
        if(isDefined(mobileBookViewHtml)){
        	MOBILE_CARTOON.OPEN_PAGE_MODAL(mobileBookViewHtml, openMobileBookViewer);	
        }else{
        	disk_alert('재생할 도서 파일이 없습니다.');
			return;
        }
        
		
	};
	successLoadAfterActionFun();
	
};

MOBILE_CARTOON.loadMobilePdfViewer = function($modalEle, targetBook, selectedEpisode, selectedPage)
{
	console.log('MOBILE_CARTOON.loadMobilePdfViewer');
	console.log(targetBook);
	console.log('selectedEpisode',selectedEpisode);
	console.log('selectedPage', selectedPage);
	
	var viewerContainerEleId = 'mobile-comic-viewer-container';
	
	//현재 보던 페이지
	var selectedPage = 1;
	
	if(targetBook.cnt > 0){
		
	}
	var startLinkNumber = 10000;
	if(selectedPage > 1){
		startLinkNumber = 10000 + (selectedPage - 1);
	}
	var fileNmae = startLinkNumber+'.pdf';
	var url = targetBook.url+'/'+fileNmae;
	//url ='/_static/down/10000.pdf';
	console.log('url', url);
	
	//fullscreen
	var goFS = document.getElementById("goViewFS");
	var fullScreenContainer = document.getElementById(viewerContainerEleId);
	goFS.addEventListener("click", function() {
		
		console.log(fullScreenContainer);
		//fullScreenContainer.requestFullscreen();
		if (document.fullscreenElement) {
			console.log('has full screen');
			document.exitFullscreen();
			
		} else {
			console.log('non full screen');
			fullScreenContainer.requestFullscreen();
		}
	}, false);
	
	$('#'+viewerContainerEleId).removeClass('c_on');
	
	
	if(isPdfInBrowse() == true){
		MOBILE_CARTOON.openBookViewerGoogledocsBiewer(url, targetBook.idx);
	}else{
		MOBILE_CARTOON.openBookViewerPdfJsUse(url);	
	}
	
	
	
};

//google api pdf js 사용해서	
MOBILE_CARTOON.openBookViewerGoogledocsBiewer = function(url,idx){
	
	console.log('MOBILE_CARTOON.openBookViewerGoogledocsBiewer');	
	console.log('url', url);
	
	if(isDefined(url) == false){
		return;
	}
	var deviceViewport = utility.ui.viewport();
	console.log('deviceViewport',deviceViewport);
	var ifH = deviceViewport.height - 65;
	//url = '//manga.onplay.co.kr/manga/8f/d1/8fd1128c1d4e522be297d6a3cce993a9/10000.pdf';
	var pdfIf = '<iframe src="'+url+'?pid=explorer&efh=false&a=v&chrome=false&embedded=true" embedded=true></iframe>';
	/*
	if(isPdfInBrowse() != true){
		url = url;
		var pdfIf = '<iframe src="'+url+'" width="'+ deviceViewport.width + '" height="' + ifH + '" style="border:0;top:0;left:0;position: absolute;" allowfullscreen></iframe>';
	}else{
		//+'?pid=explorer&efh=false&a=v&chrome=false&embedded=true
		url = 'http://docs.google.com/gview?embedded=true&url=https:'+url;
		var pdfIf = '<iframe src="'+url+'" width="'+ deviceViewport.width + '" height="' + ifH + '" style="border:0;top:0;left:0;position: absolute;" allowfullscreen embedded=true></iframe>';
	}
	console.log('url', url);
	//var pdfIf = '<iframe src="http://docs.google.com/gview?url=d11xs62myk100c.cloudfront.net/Conference/262/Misc/marcos-ascensin-spanish-national-research-council-csic-spain.ppt&amp;embedded=true'}" frameborder="0" width="100%" height="1000"></iframe>';
	*/
	
	$('.mobile-view-pdf-inner').html(pdfIf);
	
 };


//pdf js 사용해서	
MOBILE_CARTOON.openBookViewerPdfJsUse = function(url){
	
	console.log('MOBILE_CARTOON.openBookViewerPdfJsUse');	
	console.log('url', url);
	
	 if(isDefined(url) == false){
	 	return;
	 }
	
	//var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
	var deviceViewport = utility.ui.viewport();
	console.log('deviceViewport',deviceViewport);
	
	var pdfJsActionFun = function(){
		console.log('pdfJsActionFun');
		// Loaded via <script> tag, create shortcut to access PDF.js exports.
		var pdfjsLib = window['pdfjs-dist/build/pdf'];
		
		// The workerSrc property shall be specified.
		pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/build/pdf.worker.min.js';
		
		
		var renderPage = function(pdf, num){
			
			var pageNumber = num;
			pdf.getPage(pageNumber).then(function(page) {
				console.log('Page loaded');
				
				
				var desiredWidth = 400;
				var originViewport = page.getViewport({ scale: 1, });
				console.log(originViewport);
				var scale = deviceViewport.width / originViewport.width;
				console.log('scale', scale);
				//scale = 1.5;
				var viewport = page.getViewport({ scale: scale, });
				console.log(viewport);
				
				//var scale = 1.5;
				//var viewport = page.getViewport({scale: scale});
				
				console.log(viewport.height);
				console.log(viewport.width);
				
				// Prepare canvas using PDF page dimensions
				var canvasId = 'mobile-view-pdf-canvas-' + num;
				$('.mobile-view-pdf-inner').append($('<canvas/>', {'id': canvasId}));
				var canvas = document.getElementById(canvasId);
				
				//var canvas = document.getElementById('mobile-view-pdf-canvas');
				var context = canvas.getContext('2d');
				//canvas.height = viewport.height;
				canvas.height = viewport.height;
				canvas.width = viewport.width;
				
				// Render PDF page into canvas context
				var renderContext = {
					canvasContext: context,
					viewport: viewport
				};
				
				var renderTask = page.render(renderContext);
				
				
				renderTask.promise.then(function () {
						console.log('Page rendered');
						
					});
			});
			
			
		}
		
		var renderAllPages = function(pdfDoc) {
			for (var i = 1; i <= pdfDoc.numPages; i++) {
				renderPage(pdfDoc, i);
			}
		}
		
		// Asynchronous download of PDF
		var loadingTask = pdfjsLib.getDocument(url);
		loadingTask.promise.then(function(pdf) {
			console.log('PDF loaded');
			
			// Fetch the first page
			var pageNumber = 1;
			renderAllPages(pdf);
			
		}, function (reason) {
		  	// PDF loading error
		  	console.error(reason);
		});
	};
	
	//log js file
	var tagetClassName = 'mobile_pdf_min';
	var scriptSrc = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetClassName).data('url');
	if(isDefined(scriptSrc)){
		loadJsAsync(scriptSrc, pdfJsActionFun,tagetClassName);
	}
	
	
	/*	
	var successLoadAfterActionFun_1 = function(){
		console.log('successLoadAfterActionFun_1');
		var tagetClassName = 'mobile_swiper_min_js';
		var scriptSrc = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetClassName).data('url');
		if(isDefined(scriptSrc)){
			loadJsAsync(scriptSrc, successLoadSwipLibActionFun,tagetClassName);
		}
	};
	
	var tagetClassName = 'mobile_swiper_min_css';
	var cssSrc = $('#onplayMobileHeaderLoadedInfo').find('.'+tagetClassName).data('url');
	if(isDefined(cssSrc)){
		loadCssAsync(cssSrc, successLoadAfterActionFun_1,tagetClassName);
	}
	*/
};




//cartoon modal open
MOBILE_CARTOON.OPEN_PAGE_MODAL = function(modalHtml, callbackFun){

	if(isDefined(modalHtml) == false){
		console.log('empty html');
		return;
	}

	var $navEle = $('#mobile-bottom-navs-0');
	if($navEle.length > 0){
		if($navEle.hasClass('show') == true){
			$navEle.addClass('animated fadeOutDown');
		}
	}

	/*
	var body = document.body,
    html = document.documentElement;

	var maxHeight = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
 	*/

	//$('#mobile-container-modal-page').css({'height': maxHeight+'px' }).html(modalHtml).addClass('show');
	var $modalEle = $('#mobile-bookviewer-container-modal-page');
	$modalEle.html(modalHtml).addClass('show');
	$('body').addClass('page-modal');
	setTimeout(function(){
		if (typeof callbackFun === "function"){
	        callbackFun($modalEle);
	        return;
		}
	}, 100);
};

//cartoon modal close
MOBILE_CARTOON.CLOSE_PAGE_MODAL = function(){
	console.log('CLOSE_PAGE_MODAL');
	var isClose = false;
	if(isDefined(MOBILE_CARTOON.DATA.CARTOON)){
		console.log(MOBILE_CARTOON.DATA.CARTOON);
		if(isDefined(MOBILE_CARTOON.DATA.CARTOON.close)){
			console.log('MOBILE_CARTOON.DATA.CARTOON.destroy');
			MOBILE_CARTOON.DATA.CARTOON.close();
			isClose = true;
		}
	}
	if(isClose != true){
		MOBILE_CARTOON.CLOSE_PAGE_MODAL_ACTION();
	}
	
};

MOBILE_CARTOON.CLOSE_PAGE_MODAL_ACTION = function(isSelf, callbackFun){
	console.log('CLOSE_PAGE_MODAL');

	MOBILE_CARTOON.DATA.CARTOON = null;
	
	var $modalContainerEle = $('#mobile-bookviewer-container-modal-page');
	if($modalContainerEle.hasClass('show')){
		$modalContainerEle.scrollTop(0).removeClass('show').empty();
	}else{
		$modalContainerEle.empty();
	}

	if($('body').hasClass('page-modal')){
		$('body').removeClass('page-modal');
	}else{
		console.log('no body page-modal ');
		return;
	}

	//show nav

	var $navEle = $('#mobile-bottom-navs-0');
	if($navEle.length > 0){
		if($navEle.hasClass('open') == true){
			//if($navEle.hasClass('show') == false){
				$navEle.removeClass('fadeOutDown').addClass('show animated fadeInUp');
			//}
		}
	}


	//remove scroll spy
	if($modalContainerEle.hasClass('show') != true && $modalContainerEle.length > 0){
		$modalContainerEle.off('scroll');
	}
	//on chanell view close
	if(location.hash.indexOf('on_channel') >= 0 && location.hash.indexOf('idx') >= 0){
		//GO_HISTORY_BACK();
		var hashPrams = $.deparam.fragment();
		console.log('hashPrams', hashPrams);
		if(hashPrams['!action'] == 'on_channel' && isDefined(hashPrams['type']) == true){
			location.hash = '#!action='+hashPrams['type'];
			return;
		}
		GO_HISTORY_BACK();
		return;
	}

	if (typeof callbackFun === "function"){
        setTimeout(function(){
			if (typeof callbackFun === "function"){
		        callbackFun();
		        return;
			}
		}, 100);
        return;
	}

	return;
};

	
	