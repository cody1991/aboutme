$(function() {
    var g = $(".slider-e .cs3").html(),
        e = {
            effects: "bricks",
            autoplay: {
                enabled: !1,
                delay: 2E3
            },
            navigation: {
                enabled: !0,
                next: ".slider-e .cs3-slide-next",
                prev: ".slider-e .cs3-slide-prev"
            },
            pagination: {
                enabled: !0,
                container: ".slider-e .cs3-pagination"
            }
        };
    $(".slider-e .cs3").cs3(e);


    $(".cs-effects input").change(function(d) {
        d.preventDefault();
        0 < $(this).parents("ul#cs-e-2d").length && !Modernizr.csstransitions && alert('Sorry, your browser do not support CSS3 Transitions. You will see degradation to "Flat" effect');
        0 < $(this).parents("ul#cs-e-3d").length && !Modernizr.csstransforms3d && alert('Sorry, your browser do not support 3D Transforms. You will see degradation to "Flat" effect');
        0 < $(this).parents("ul#cs-e-canvas").length &&
            !Modernizr.canvas && alert('Sorry, your browser do not support Canvas. You will see degradation to "Flat" effect');
        d = $(".cs-effects input:checked").val();
        e.effects = d;
        $(".slider-e .cs3").remove();
        $(".slider-e .center").prepend('<div class="cs3">' + g + "</div>");
        $(".slider-e .cs3").cs3(e)
    });
});


