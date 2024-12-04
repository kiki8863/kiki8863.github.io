/*
*	channel search common 
*/


//채널 검색
var PAGE_CHANNEL_SEARCH = {};
PAGE_CHANNEL_SEARCH.DATA = {
	LAST_HASH		: null,
	LOADED_PAGE		: null,
};

PAGE_CHANNEL_SEARCH.start = function(pageSub, pagData){
	console.log('PAGE_CHANNEL_SEARCH.start', pageSub);
	console.log(pagData);
	PAGE_CHANNEL_SEARCH.DATA.LAST_HASH = '#!action=channel_on';
	
	PAGE_CHANNEL_SEARCH.initBinding();
	PAGE_CHANNEL_SEARCH.initOnload();
	
	//오른쪽 매뉴 바인딩
	PAGE_CHANNEL_ON.rightBinding();
	
	//PAGE_CHANNEL_SEARCH.setHashCheck(null);
	
	
};



PAGE_CHANNEL_SEARCH.initBinding = function(){
	console.log('PAGE_CHANNEL_SEARCH.initBinding');
	
	
	//카테고리 클릭
	if($( ".search-cate-item" ).length > 0){
		$( ".search-cate-item" ).unbind( "click");
		$( ".search-cate-item" ).bind( "click", function() {
			console.log('search-cate-item');
			var eleData = $(this).data();
			console.log('eleData', eleData);
			if(isDefined(eleData.category)){
				
				//btn
				$('.search-cate-item.active').removeClass('active');
				$(this).addClass('active');
				
				//show contents
				if(eleData.category == 90000){
					$('.search-channel-show').addClass('active');
					$('.channel-cate-name').empty();
				}else{
					$('.search-channel-show').removeClass('active');
					$('.search-channel-show.'+eleData.target).addClass('active');
					$('.channel-cate-name').text(eleData.name+'채널에서');	
				}
				$('.channel-cate-cnt').text(disk_number_format(eleData.total_count));	
				//WEB_COMMON.setImageLazy();
				
			}
		
		});
	}
};







PAGE_CHANNEL_SEARCH.initOnload = function(){
	console.log('PAGE_CHANNEL_SEARCH.initOnload');
	
	//slick theme
	var $slickTarget = $('.theme_con');
	if($slickTarget.find('.theme_list').length > 1){
		$slickTarget.slick({
			//lazyLoad: 'ondemand',
			slidesToShow: 6,
			slidesToScroll: 3,
			infinite: false,
			arrows : true,
			draggable: false,
			//prevArrow : $('.theme_con-prev'),
			//nextArrow : $('.theme_con-next'),
			dots	: false
		});

	}
	
	//검색 결과 순서 변경
	if($('#channel_on-search_selected_category').length > 0){
		if($('#channel_on-search_selected_category').val() == '90002'){
			console.log('theme search');
			$(".channel-search-result").insertAfter(".theme-search-result");
		}
	}
	
	
};

