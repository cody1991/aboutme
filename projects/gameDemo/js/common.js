$(document).ready(function() {
    if ($('.banner_owl').length > 0) {
        $('.banner_owl').show().owlCarousel({
            loop: true,
            items: 1,
            dots: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 3000
        });
    }

    if ($('.mainBody_owl').length > 0) {
        $('.mainBody_owl').show().owlCarousel({
            center:true,
            items:2,
            loop:true,
            margin:10,
            dots:false
        });
    }


    $('.ADfooter .close').click(function() {
        $('.ADfooter').fadeOut();
    })
})
