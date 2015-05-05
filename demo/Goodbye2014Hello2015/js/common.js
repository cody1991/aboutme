window.onload = function() {
    $('.loading').remove();
    $('.swipe_tip,.music_control').show();
    $('#fullpage').show().fullpage({
        verticalCentered: true,
        continuousVertical: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        //开始播放音乐
        afterRender: function() {
            // $('#bgm')[0].play();
        },
    });

    var nowTime = new Date();
    var endTime = new Date(2015,0,1,00,00);
    var countdown = (endTime - nowTime) / 1000;

    console.log(countdown)

    if(countdown > 3600 && countdown < 0){
        $('.your-clock').hide();
    }
    else if(countdown > 0){
        var clock = $('.your-clock').FlipClock(countdown,{
            autoStart: true,
            countdown: true,
            clockFace: 'MinuteCounter',
            callbacks: {
                stop: function() {
                    $('.your-clock').fadeOut();                   
                }
            }
        });
    }


    //音乐控制
    // $('.music_control').click(function() {
    //     if ($(this).hasClass('close')) {
    //         $('#bgm')[0].play();
    //         $(this).addClass('play').removeClass('close');
    //         $(this).find('p').text('开启').addClass('fadeIn');
    //     } else if ($(this).hasClass('play')) {
    //         $('#bgm')[0].pause();
    //         $(this).removeClass('play').addClass('close');
    //         $(this).find('p').text('关闭').addClass('fadeIn');
    //     }
    //     setTimeout(function() {
    //         $('.music_control').find('p').removeClass('fadeIn');
    //     }, 1000)
    // })
}
