$(document).ready(function() {

    // 这个是底部的奖品轮播，一般不更改
    var mySwiper2;
    if ($('.prizeSwiper').find('.item').length > 3) {
        mySwiper2 = new Swiper('.prizeSwiper', {
            mode: 'horizontal',
            autoplay: 5000,
            loop: true,
            slidesPerView: 3,
        })
    } else if ($('.prizeSwiper').find('.item').length <= 3) {
        mySwiper2 = new Swiper('.prizeSwiper', {
            mode: 'horizontal',
            slidesPerView: 3,
        })
    }
})
