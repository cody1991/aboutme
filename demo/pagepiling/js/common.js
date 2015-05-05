window.onload = function() {
    setTimeout(function() {
            $('.loading').remove()
        },
        0);
}

$(document).ready(function() {
    $('#pagepiling').show().pagepiling({
        sectionsColor: ['#ee005a', '#2C3E50', '#39C'],
        loopBottom:true,
        loopTop:true,
        direction:'horizontal',
        afterRender: function() {
            $('#bgm')[0].play();
        },
    });


    //音乐控制
    $('.music_control').click(function() {
        if ($(this).hasClass('close')) {
            $('#bgm')[0].play();
            $(this).addClass('play').removeClass('close');
            $(this).find('p').text('开启').addClass('fadeIn');
        } else if ($(this).hasClass('play')) {
            $('#bgm')[0].pause();
            $(this).removeClass('play').addClass('close');
            $(this).find('p').text('关闭').addClass('fadeIn');
        }
        setTimeout(function() {
            $('.music_control').find('p').removeClass('fadeIn');
        }, 1000)
    })


})
