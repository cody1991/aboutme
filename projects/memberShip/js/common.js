$(document).ready(function() {

    if ($('.myselfMain').length > 0) {
        var oldValueList = new Array();

        $('.myselfMain').find('input').each(function(i) {
            oldValueList[i] = $(this).val();
        });

        $('.myselfMain').find('input').each(function(i) {

            $(this).focus(function() {
                $('.myselfMain').find('input').removeClass('inputfocus');
                $(this).val('').addClass('inputfocus');
            });
            $(this).blur(function() {
                $('.myselfMain').find('input').removeClass('inputfocus');
                if ($(this).val() == '') {
                    $(this).val(oldValueList[i]);
                } else {
                    oldValueList[i] = $(this).val();
                }
            })
        })
    }



    if ($('.tab_main').length > 0) {
        $('.tab_main').show();
    }

    var mySwiper;
    if ($('.swiper-container').length > 0) {
        mySwiper = $('.swiper-container').swiper({
            mode: 'horizontal',
            loop: false,
            calculateHeight: true,
            visibilityFullFit: true,
            onSlideChangeEnd: function(current_swiper) {

                resizeSwiperH();
                var index = current_swiper.activeIndex;
                $('.nav_wrapper a').removeClass('active');
                $('.nav_wrapper a').eq(index).addClass('active');
            }
        });
        setTimeout(function() {
            var no_data_HTML = $('<li class="no_data"><img src="images/tip.png" /><p>没有数据哦~</p></li>');
            $('.tab_main ul').each(function() {
                if ($(this).find('li').length == 0) {
                    $(this).append(no_data_HTML);
                }
            })
            resizeSwiperH();
        }, 1);



        $('.cou_btn').click(function() {
            var parentLi = $(this).parent('li');
            parentLi.find('.cou_btn').remove();
            parentLi.find('.cou_date span').eq(0).html('使用时间：');
            var nowTime = new Date();
            var nowTimeString = nowTime.getFullYear() + '年' + (nowTime.getMonth()+1) + '月' + nowTime.getDate()  + '日';
            parentLi.find('.cou_date span').eq(1).html(nowTimeString);
            parentLi.find('.state').attr('src', 'http://www.playwx.com/hd/demo/cody/11/membershipCard/images/has_use.png');
            mySwiper.swipeTo(1);
            parentLi.addClass('addFadeIn');
            $('#table2').find('ul').prepend(parentLi);
            setTimeout(function() {
                var no_data_HTML = $('<li class="no_data"><img src="images/tip.png" /><p>没有数据哦~</p></li>');
                $('.tab_main ul').each(function() {
                    if ($(this).find('li').length == 0) {
                        $(this).append(no_data_HTML);
                    }
                })
                resizeSwiperH();
            }, 1);
        });

    }

    if ($('.nav_wrapper a').length > 0) {
        $('.nav_wrapper a').each(function(i) {
            $(this).click(function() {
                $('.nav_wrapper a').removeClass('active');
                $(this).addClass('active');
                mySwiper.swipeTo(i);
            })
        });
    }

})


function resizeSwiperH() {
    var swiperWrapper = $('.swiper-wrapper');
    var activeSlide = $('.swiper-slide-active');
    var innerULHeight = activeSlide.find('ul').height();
    // swiperWrapper.height(innerULHeight + 50);
    // activeSlide.height(innerULHeight + 50);
    //
    swiperWrapper.animate({
        'height': innerULHeight + 30
    }, 500);
    activeSlide.animate({
        'height': innerULHeight + 30
    }, 500);
}
