var addDownEffect;
$(document).ready(function() {

    $(".start_page").show();

    start_page();
    card();
    makeCard();

    var iTid = $("#templateId").val(),
        sMusicUrl = $("#musicUrl").val(),
        sEffectUrl = $("#effectUrl").val(),
        sWords = $("#sendWrods").val();

    if ($('.card').length != 0) {
        $('#bgm').attr('src', sMusicUrl);
        document.getElementById('bgm').play();
        addDown(sEffectUrl);
        addDownEffect = setInterval("addDown('" + sEffectUrl + "')", 800);

        var card_text = $('.card_main textarea').val();
        if ($('textarea').length != 0) {
            $('textarea').flexText();
        }
        $('.card_main input').prop('disabled', true);
        $('.flex-text-wrap').hide();
        $('.card_main').prepend('<pre class="send_card_text">' + card_text + '</pre>');
        $('.send_card_text').lettering();
        var send_card_text_L = $('.send_card_text').children().length;
        $('.send_card_text span').each(function(i) {
            $(this).hide().delay(i * 300).show(100);

        })
        if ($('#sender').val() != "") {
            $('#sender').hide().delay(send_card_text_L * 300).fadeIn();
        }
        $('.custom_card_btn').hide().delay((send_card_text_L + 1) * 300).fadeIn();
        $('.make_card_btn').hide();
        $('.down_menu').hide();
        $('.custom_card_btn').click(function() {
            $('.make_card_nav').show().animate({
                'bottom': '0'
            }, 250);
            $('.card_main textarea').val(sWords);
            $('.send_card_text').remove();
            $('.card_main #sender').attr('placeholder', '请输入你的名字');
            $('.flex-text-wrap').show();
            $(this).fadeOut();
            $('.card_main textarea').prop('disabled', false);
            $('.card_main input').prop('disabled', false);
            $('.card_main input').val("");
        })
    }
    fullHeight('index_menu');
    $(window).resize(function() {
        start_page();
        card();
    })
    $('.click_to_menu,.hand,.hand_after').click(function(e) {
        e.preventDefault();
        $('.hand,.hand_after').fadeOut();
        $('.click_to_menu img.logo').fadeIn();
        $('.start_main').addClass('smd');
        $('.img_all').addClass('rotate');
        setTimeout(function() {
            window.location.href = "make_card.html";
        }, 2500);
    })


    function start_page() {
        fullHeight('start_page');
        var start_main_H = $('.start_main').height();
        $('.click_to_menu').height(start_main_H);
    }

    function card() {
        fullHeight('card');
    }

    function fullHeight(className) {
        var $winH = $(window).height();
        var jqueryClass = '.' + className;
        $(jqueryClass).height($winH);
    }

    function makeCard() {
        $('.ne1').show();
        $('.be1').show();
        $('.templet_back').show();
        if ($('#templet_list').length != 0) {
            var owl1 = $('#templet_list');
            $('#templet_list').owlCarousel({
                loop: false,
                items: 3,
                margin: 0,
                smartSpeed: 300,
                autoplayHoverPause: true
            });
            if (($('#templet_list .item').length) <= 3) {
                $('.ne1').hide();
                $('.be1').hide();
            }
            $('.ne1').click(function() {
                owl1.trigger('next.owl.carousel');
            });
            $('.be1').click(function() {
                owl1.trigger('prev.owl.carousel');
            })
        }

        $('.templet_back').click(function() {
            $('.down_menu').delay(500).show(100);
            $('.make_card_nav').animate({
                'bottom': '-250'
            }, 750);
            $('.make_card_btn').fadeIn();
        })
        $('.effect_btn').click(function() {
            if ($(this).hasClass('second')) {
                $(this).removeClass('second');
                $(this).find('img').attr('src', 'http://www.playwx.com/hd/static/postcard/images/effect_icon.png');
                $(this).find('p').text('特效');
                $('#effect_list').hide();
                $('#templet_list').show();
                $('.ne2,.be2').hide();
                $('.ne1,.be1').show();
                if (($('#templet_list .item').length) <= 3) {
                    $('.ne1').hide();
                    $('.be1').hide();
                }
            } else {
                $(this).addClass('second');
                $(this).find('img').attr('src', 'http://www.playwx.com/hd/static/postcard/images/templet_icon.png');
                $(this).find('p').text('模板');

                $('.templet_back').show();
                $('.ne1,.be1').hide();
                $('.ne2,.be2').show();
                if (($('#effect_list .item').length) <= 3) {
                    $('.ne2').hide();
                    $('.be2').hide();
                }
                $('#templet_list').hide();
                $('#effect_list').show();
                var $make_card_nav_H = $('.make_card_nav').height();
                var owl2 = $('#effect_list');
                $('#effect_list').owlCarousel({
                    loop: false,
                    items: 3,
                    margin: 0,
                    smartSpeed: 300,
                    autoplayHoverPause: true
                });
                if (($('#effect_list .item').length) <= 3) {
                    $('.ne2').hide();
                    $('.be2').hide();
                }
                $('.ne2').click(function() {
                    owl2.trigger('next.owl.carousel');
                })
                $('.be2').click(function() {
                    owl2.trigger('prev.owl.carousel');
                })
            }

        })
        $('#templet_list').find('a').click(function() {
            $('#templet_list .item_select').remove();
            $(this).append('<div class="item_select"><img src="http://www.playwx.com/hd/static/postcard/images/select.png"></div>');
            iTid = $(this).find('img').data('id');
            var MainWords = $(this).find('img').data('words');
            var MainCss = $(this).find('img').data('css').split(";");
            for (var mc in MainCss) {
                if (MainCss[mc] != "") {
                    MainCss[mc] = MainCss[mc].split(":");
                    $('.card_main').css(MainCss[mc][0], MainCss[mc][1]);
                }
            }
            $('.card_main pre span').text(MainWords);
            $('.card_main textarea').val(MainWords);
            var bgUrl = $(this).find('img').data('img');
            $('.card').css('background-image', 'url("' + bgUrl + '")');
        });

        $('.music').click(function() {
            var bgm = document.getElementById('bgm');
            if ($(this).find('span').hasClass('music_rotate')) {
                bgm.pause();
                bgm.currentTime = 0;
                $(this).find('span').removeClass('music_rotate');
                $(this).find('.music_open').css('opacity', '0');
                $(this).find('.music_close').animate({
                    'opacity': '1'
                }).delay(100).animate({
                    'opacity': '0'
                });
                $('.s-music').hide();
            } else {
                $('.s-music:first-of-type').show();
                $('.s-music:nth-of-type(2)').delay(1000).show();
                $('.s-music:nth-of-type(3)').delay(1500).show();
                bgm.play();
                $(this).find('span').addClass('music_rotate');
                $(this).find('.music_close').css('opacity', '0');
                $(this).find('.music_open').animate({
                    'opacity': '1'
                }).delay(100).animate({
                    'opacity': '0'
                });
            }
        })
        $('#music_select').change(function() {
            sMusicUrl = $(this).val();
            if (sMusicUrl != "none") {
                $('#bgm').attr('src', sMusicUrl);
                $('.music span').addClass('music_rotate');
                $('.music_close').css('opacity', '0');
                $('.music_open').animate({
                    'opacity': '1'
                }).delay(100).animate({
                    'opacity': '0'
                });
                $('.s-music:first-of-type').show();
                $('.s-music:nth-of-type(2)').delay(1000).show();
                $('.s-music:nth-of-type(3)').delay(1500).show();
            } else {
                $('#bgm').attr('src', '');
                $('.music span').removeClass('music_rotate');
                $('.music_open').css('opacity', '0');
                $('.music_close').animate({
                    'opacity': '1'
                }).delay(100).animate({
                    'opacity': '0'
                });
                $('.s-music').hide();
            }
        })

        $('#effect_list').find('a').click(function() {
            clearInterval(addDownEffect);
            $('#effect_list .item_select').remove();
            $(this).append('<div class="item_select"><img src="http://www.playwx.com/hd/static/postcard/images/select.png"></div>');
            sEffectUrl = $(this).find('img').data('val');
            $('.down').remove();
            addDown(sEffectUrl);
            addDownEffect = setInterval("addDown('" + sEffectUrl + "')", 800);
        });

        $('.make_card_btn a.made').click(function() {
            $('.down_menu').hide();
            if ($(this).find('img').attr('src').indexOf('send') == -1) {
                toast('生成成功')
                $(this).find('img').attr('src', 'http://www.playwx.com/hd/static/postcard/images/send_card_btn.png');
                $('.make_card_nav').hide();
                $('.down_tip').hide();
                $('.up_tip').hide();
                var card_text = $('.card_main textarea').val();
                var card_height = $('.card_main').height();
                $('.card_main textarea').prop('disabled', true);
                $('.card_main input').prop({
                    'disabled': 'true',
                    "placeholder": ""
                });
                $('.flex-text-wrap').hide();
                $('.card_main').prepend('<pre class="send_card_text">' + card_text + '</pre>');
                $('.send_card_text').lettering();
                var send_card_text_L = $('.send_card_text').children().length;
                $('.send_card_text span').each(function(i) {
                    $(this).hide().delay(i * 300).show(100);
                });
                if ($('#sender').val() != "") {
                    $('#sender').hide().delay(send_card_text_L * 300).fadeIn();
                }
            } else {
                $('.send_friend_main').show();
            }
            $('.send_friend_main').click(function() {
                $(this).hide();
            })
        })

        $('.card_main textarea,.card_main input').focus(function() {
            $('.make_card_nav').animate({
                'bottom': '-250'
            }, 750);
            $('.down_menu').fadeIn();
            $('.make_card_btn').fadeIn();
            $('.mask').show();
        });
        $('.card_main input').focus(function() {
            $(this).attr('placeholder', "");
        })
        $('.card_main textarea,.card_main input').blur(function() {
            $('.mask').hide();
        });
        $('.card_main input').blur(function() {
            $(this).attr('placeholder', "请输入你的名字");
        })


        $('.down_menu').click(function() {
            $('.make_card_nav').show().animate({
                'bottom': '0'
            }, 250);
            $(this).delay(250).hide(100);
            $('.make_card_btn').fadeOut();
        })

        $('.card').click(function(e) {
            if (e.target.className == 'row' && $('.make_card_nav').css('bottom') == '0px') {
                $('.down_menu').delay(500).show(100);
                $('.make_card_nav').animate({
                    'bottom': '-250'
                }, 750);
                $('.make_card_btn').fadeIn();
            }
        })
    }
})

function toast(text) {
    $(".tips").html(text).show();
    window.setTimeout(function() {
        $(".tips").hide();
    }, 1500);
}

function addDown(effectUrl) {
    if (effectUrl != '' && $('.down').length < 10) {
        $('.card .row').append('<img src="' + effectUrl + '" class="down"/>');
        var $down = $('.down');
        var randomLeft = Math.random();
        randomLeft = randomLeft * 100 + '%';
        var randomScale;
        randomScale = Math.random();
        while (randomScale < 0.5) {
            randomScale = Math.random();
        }
        $('.down:last-child').css({
            'left': randomLeft,
            '-webkit-transform': 'scale(' + randomScale + ')',
            '-moz-transform': 'scale(' + randomScale + ')',
            'transform': 'scale(' + randomScale + ')',
        });
    } else if ($('.down').length >= 10) {
        setTimeout(function() {
            $('.down').remove();
        }, 5000);
        clearInterval(addDownEffect);
    }
}
