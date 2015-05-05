$(function() {
    var showcase = $("#showcase"),
        title = $('#item-title')

    showcase.Cloud9Carousel({
        yOrigin: 42,
        yRadius: 48,

        //reflection.js
        mirror: {
            gap: 12,
            height: 0.2
        },
        buttonLeft: $("#nav > .left"),
        buttonRight: $("#nav > .right"),
        autoPlay: 1,
        bringToFront: true,
        onRendered: rendered,
        onLoaded: function() {
            showcase.css('visibility', 'visible')
            showcase.css('display', 'none')
            showcase.fadeIn(1500)
        }
    })

    function rendered(carousel) {
        title.text(carousel.nearestItem().element.alt)
        var c = Math.cos((carousel.floatIndex() % 1) * 2 * Math.PI)
        title.css('opacity', 0.5 + (0.5 * c))
    }

    $('#nav > button').click(function(e) {
        var b = $(e.target).addClass('down')
        setTimeout(function() {
            b.removeClass('down')
        }, 80)
    })

    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 37:
                $('#nav > .left').click()
                break
            case 39:
                $('#nav > .right').click()
        }
    })
})
