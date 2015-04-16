$(document).ready(function() {


    console.log("%c微互动官网", " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:4em");


    $("#toTop").scrollToTop();

    var mySwiper = new Swiper('.swiper-container', {
        calculateHeight: true,
        loop: true,
        autoplay: 3000,
        pagination: '.pagination',
        paginationClickable: true,
        moveStartThreshold: 20
    });

    $(document).ready(function() {
        $('.home_footer').stickUp({
            parts: {
                0: 'home',
                1: 'protfolio',
                2: 'case',
                3: 'intro',
                4: 'contact'
            },
            itemClass: 'menuItem',
            itemHover: 'active',
        });
    });

    var winH = $('body').height();

    $('.home .home_footer .site li a').each(function(i) {
        $(this).click(function(e) {
            $('.navbar-collapse').removeClass('in');
            e.preventDefault();
            if (i == 0) {
                $('body,html').animate({
                    scrollTop: 0
                });
            } else {
                var thisHref = $(this).attr('href');
                $('body,html').animate({
                    scrollTop: $(thisHref).offset().top + 30
                }, 300).animate({
                    scrollTop: $(thisHref).offset().top - 10
                }, 100).animate({
                    scrollTop: $(thisHref).offset().top + 15
                }, 70).animate({
                    scrollTop: $(thisHref).offset().top
                }, 50);
            }
        })
    })

    $('.home .home_footer .contact li a').click(function() {
        var thisId = $(this).attr('id');
        $('.popMask').fadeIn();


        var popWidth = $('.' + thisId).innerWidth();
        var popHeight = $('.' + thisId).innerHeight();
        console.log(popHeight)
        $('.' + thisId).css({
            'margin-left': -popWidth / 2,
            'margin-top': -popHeight / 2
        });
        $('.' + thisId).show().addClass('open');
    })

    $('.popMask').click(function() {
        $(this).fadeOut();
        $('.popBody').fadeOut(200).removeClass('open');
    })

    $('.navbar-toggle').click(function() {
        if ($('body').scrollTop() < $('body').height()) {
            $('body,html').animate({
                scrollTop: winH - 60
            }, 300);
        }
    })

    $('.home .home_footer .logo').click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        });
    })

})

window.onload = function() {
    $('.protfolio').show();
    var $container = $('.portfolioContainer');
    body_item_img_H();
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });


    $('.portfolioFilter a').click(function() {
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
    window.onresize = function() {
        body_item_img_H();
        var $container = $('.portfolioContainer');
        var selector = $('.current').attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
    }
}


function body_item_img_H() {
    var portfolioContainer = $('.portfolioContainer');
    portfolioContainer.find('img').each(function() {
        $(this).height($(this).width());
    });
}



(function(a) {
    a.fn.scrollToTop = function(c) {
        var d = {
            speed: 800
        };
        c && a.extend(d, {
            speed: c
        });
        return this.each(function() {
            var b = a(this);
            a(window).scroll(function() {
                100 < a(this).scrollTop() ? b.fadeIn() : b.fadeOut()
            });
            b.click(function(b) {
                b.preventDefault();
                a("body, html").animate({
                    scrollTop: 0
                }, d.speed)
            })
        })
    }
})(jQuery);
