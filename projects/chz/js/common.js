$(document).ready(function() {
    //选择礼盒 里面的横向切换
    if ($('#pick_body').length > 0) {
        $("#pick_body").show().owlCarousel({
            items: 1,
            loop: false,
            margin: 0,
            smartSpeed: 450,
            dots: true,
            onDrag: function() {
                $('#pick_body .item img').addClass('anim');
                setTimeout(function() {
                    $('#pick_body .item img').removeClass('anim');
                }, 250);
            },
            onDragged: function() {
                $('.imgshadow').addClass('anim');
                setTimeout(function() {
                    $('.imgshadow').removeClass('anim');
                }, 500);
            }
        });
    }

    // 主页，各版块之间的切换
    var win_H = $(window).height();
    var scroll_max_H = (win_H - 43 - 35 - 20 - 37 - 20);
    var myScroll_flag = 0;
    $('.price_btn').click(function() {
        $('.btn_group').addClass('fadeOutBottom');
        $('.price_list').addClass('price_list_open').show().removeClass('fadeOutBottom');
        $('#iscroll_wrap').css('max-height', scroll_max_H);
        if (myScroll_flag == 0) {
            myScroll = new IScroll('#iscroll_wrap', {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                // fadeScrollbars: true
            });
            myScroll_flag = 1;
        }
    });
    $('.price_list .back_btn').click(function() {
        $('.btn_group').removeClass('fadeOutBottom');
        $('.price_list').addClass('fadeOutBottom').removeClass('price_list_open');
        setTimeout(function() {
            $('.price_list').hide();
        }, 1000)
    });
    $('.rule_btn').click(function() {
        $('.btn_group').addClass('fadeOutBottom');
        $('.rule_intro').show().removeClass('fadeOutBottom');
    });
    $('.rule_intro .back_btn').click(function() {
        $('.btn_group').removeClass('fadeOutBottom');
        $('.rule_intro').addClass('fadeOutBottom');
        setTimeout(function() {
            $('.rule_intro').hide();
        }, 1000)
    });


    // 分享
    $('.share_thank_btn').click(function() {
        $('.share_thank').fadeIn();
    })
    $('.share_help_btn').click(function() {
        $('.share_help').fadeIn();
    })
    $('.share_tip').click(function() {
        $(this).fadeOut();
    })

    // 注册的表单
    $('#btn_choose').click(function() {
        $('.register_form_wrap').fadeIn();
    })

    $('.register_form_wrap .close').click(function() {
        $('.register_form_wrap').fadeOut();
    });

})
