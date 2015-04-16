$(document).ready(function() {
    var mySwiper2;
    if ($('.prizeSwiper').find('.item').length > 3) {
        mySwiper2 = new Swiper('.prizeSwiper', {
            mode: 'vertical',
            autoplay: 5000,
            loop: true,
            slidesPerView: 3,
        })
    } else if ($('.prizeSwiper').find('.item').length <= 3) {
        mySwiper2 = new Swiper('.prizeSwiper', {
            mode: 'vertical',
            slidesPerView: 3,
        })
    }
})
