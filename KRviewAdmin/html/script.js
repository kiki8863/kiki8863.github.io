 $(function () {

        // 검색 버튼 클릭 시
        $('.t_btn.search').click(function () {

            $('.content').toggleClass('.on_search');

            if ($('.content').hasClass("on_search")) {
                $('.content').removeClass('on_search');
            } else {
                $('.content').addClass('on_search');
            }
        });

        // 계정 정보 더보기 버튼 클릭시 
        $('#btnViewAccount').click(function () {

            $('.content').toggleClass('on_view_account');

            if ($('.content').hasClass("on_view_account")) {
                return false;
            } else {
                $('.content').addClass('on_view_account');
            }
        });

         // 계정 정보 영역 닫기 버튼 클릭시
        $('#btnCloseAccount').click(function () {

            $('.content').toggleClass('on_view_account');

            if ($('.content').hasClass("on_view_account")) {
                $('.content').removeClass('on_view_account');
            } else {
                return false;
            }
        });

        // 계정  통계 정보 더보기 버튼 클릭시 
        $('#btnViewAccountStatistics').click(function () {

            $('.content').toggleClass('on_view_account_statistics');

            if ($('.content').hasClass("on_view_account_statistics")) {
                return false;
            } else {
                $('.content').addClass('on_view_account_statistics');
            }
        });

        // 계정   통계 정보 영역 닫기 버튼 클릭시
        $('#btnCloseAccountStatistics').click(function () {

            $('.content').toggleClass('on_view_account_statistics');

            if ($('.content').hasClass("on_view_account_statistics")) {
                $('.content').removeClass('on_view_account_statistics');
            } else {
                return false;
            }
        });

         //수정
        $('.a_btn.edit').click(function () {

            $(this).parent().parent().addClass('info_edit');
            $('.info_edit .t_input_style').removeAttr("disabled");
            $('.info_edit .t_select_style').removeAttr("disabled");
        });

        //추가
        $('.t_btn.add').click(function () {

            $('.content').toggleClass('.on_add');

            if ($('.content').hasClass("on_add")) {
                $('.content').removeClass('on_add');
                $('.main .tbl_style li.active').remove();
            } else {
                $('.content').addClass('on_add');
                $('.main .tbl_style li.top').after('<li class="active"></li>');
            }


        });


    
    });