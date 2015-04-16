var raiseUnit = $('#raiseUnit').val();
console.log(raiseUnit)

function addmoney() {


    var src_bag = $('#bag').val();
    $('#iscroll_wrap ul li span.count,#iscroll2_wrap ul li span.word .help_count').css({
        'background-image': 'url(' + src_bag + ')'
    })

    var src_10 = $('#money10').val();
    var src_50 = $('#money50').val();
    var src_100 = $('#money100').val();

    var money_left = Math.random().toFixed(2);
    money_left = money_left * 100 + '%';
    var money_scale = Math.random().toFixed(2);
    while (money_scale < 0.7) {
        money_scale = Math.random().toFixed(2);
    }
    money_scale = money_scale * 40;
    var money = document.createElement('img');
    money.className = 'money';
    money.style.left = money_left;
    money.style.width = money_scale + 'px';
    var pic_select = Math.random();
    if (pic_select < 0.33) {
        money.src = src_10;
        ''
    } else if (pic_select >= 0.33 && pic_select <= 0.66) {
        money.src = src_50;
    } else if (pic_select > 0.66) {
        money.src = src_100;
    }
    var container = document.getElementsByClassName('act_main')[0];
    container.appendChild(money);
    setTimeout(function() {
        container.removeChild(money);
    }, 2500);
}

function progress_bar_add(add_money_count) {
    var add_money_count_span = $('#add_money_count');
    add_money_count_span.html(add_money_count);

    var curr_num = parseInt($('#curr_num').html()) + add_money_count;
    var max_num = parseInt($('#max_num').html());


    $('#curr_num').html(curr_num);

    var progress_bar = $('.progress_bar');

    var curr_bar_num = $('.curr_bar_num');
    curr_bar_num.html(curr_num + raiseUnit);


    if (curr_num > max_num) {
        curr_num = max_num;
    }

    var progress_bar_width = curr_num / max_num * 100 + '%';
    progress_bar.animate({
        'width': progress_bar_width
    });
}

$(document).ready(function() {





    FastClick.attach(document.body);

    if ($('.act_main').length > 0) {

        var src_sound = $('#sound').val();
        $('#purseMusic').attr('src', src_sound);
        $('#purseMusic')[0].loop = true;

        setTimeout(function() {
            var music = $('#purseMusic');
            if (src_sound != '') {
                music[0].play();
            }
            var moneyInterval1 = setInterval(function() {
                addmoney();
            }, 500);

            setTimeout(function() {
                clearInterval(moneyInterval1);
                if (src_sound != '') {
                    music[0].pause();
                }
            }, 5000);
        }, 1000);
    }


    var win_H = $(window).height();
    var scroll_max_H = (win_H - 150);

    $('.popBody').each(function() {

        var rule_max_H = win_H - 100;
        if ($(this).find('.rule_main').length > 0) {

            $(this).find('.rule_main').css({
                'max-height': rule_max_H
            })
        }

        var thisHeight = $(this).height();
        $(this).css({
            'margin-top': -(thisHeight / 2)
        })
    })

    var myScroll1_flag = 0;
    $('.rankPop').click(function() {
        $('.rankBody,.popMask').fadeIn();
        if (myScroll1_flag == 0) {
            $('#iscroll_wrap').css('max-height', scroll_max_H);
            myScroll = new IScroll('#iscroll_wrap', {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
            myScroll_flag = 1;
            var thisHeight = $('.rankBody').height();
            $('.rankBody').css({
                'margin-top': -thisHeight / 2,
            })
        }
    });
    $('.rankBody .close').click(function() {
        $('.rankBody,.popMask').fadeOut();
    });


    $('.popMask').click(function() {
        $('.popBody,.popMask,.register_form,.guide').fadeOut();
        $('.index_btn_group a').removeClass('active');
        $('.act_btn_group a').removeClass('active');
    })

    $('.rulePop').click(function() {
        $(this).addClass('active');
        $('.ruleBody,.popMask').fadeIn();
    });
    $('.ruleBody .close').click(function() {
        $('.rulePop').removeClass('active');
        $('.ruleBody,.popMask').fadeOut();
    });

    $('.ask_help').click(function() {
        $('.guide,.popMask').fadeIn();
    })
    $('.guide').click(function() {
        $('.guide,.popMask').fadeOut();
    })

    if ($('.progress_wrapper').length > 0) {
        var curr_num = parseInt($('#curr_num').html());
        var max_num = parseInt($('#max_num').html());

        var progress_bar = $('.progress_bar');
        var curr_bar_num = $('.curr_bar_num');
        curr_bar_num.html(curr_num + raiseUnit);

        var mid_bar_num = $('.mid_num');
        mid_bar_num.html(max_num / 2);

        if (curr_num > max_num) {
            curr_num = max_num;
        }

        var progress_bar_width = curr_num / max_num * 100 + '%';


        progress_bar.animate({
            'width': progress_bar_width
        });
    }


    if ($('#guideSubscribe2').length > 0) {
        $('#guideSubscribe2 .focus_btn_group').find('a').css({
            'width': '100%'
        }).find('button').css({
            'width': '150px'
        });;
    }

    $('.act_main').click(function() {
        $(this).removeClass('clickAnim');
        setTimeout(function() {
            $('.act_main').addClass('clickAnim');
        }, 1)
    })
});
