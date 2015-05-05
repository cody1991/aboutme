window.onload = function() {
    $('.loading').remove();

    console.log('如果是本地的话这里会报错很多，因为使用了prefixfree.js，不能再file协议下用ajax加载那些CSS文件然后给它加上浏览器的CSS前缀')
}

$(document).ready(function() {
    // 把整个分享所用到的JS逻辑代码封装到了一个share对象里面，它的对象在init()中声明，方法为一个一个的变量值声明。最后在下面启用了share.init()来初始化这个页面所需要的逻辑代码
    var share = {
        init: function() {
            var obj = this;
            this.fullpageContainer = $('#fullpage');
            this.menu = $('#menu');
            this.swipeTip = $('#swipeTip');
            this.fullpageContainer.show();
            this.menu.show();
            this.swipeTip.show();

            // 单页框架的构建
            this.fullpageContainer.fullpage({
                sectionsColor: ['#ccddff', '#7BAABE', '#4BBFC3', '#1bbc9b', '#ccddff', '#7BAABE', '#4BBFC3', '#1bbc9b', '#ccddff'],
                anchors: ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p'],
                menu: '#menu',
                verticalCentered: true,
                //easing: 'easeOutBack',
                navigation: true,
                navigationPosition: 'right',
                slidesNavigation: true,
                slidesNavPosition: 'bottom',
                loopHorizontal: false,
                scrollingSpeed: 500,
            });

            this.nextSlide = $('.nextSlide');
            this.popUpImg = $('.popUpImg');
            this.close = $('.pop .close');
            this.cover = $('.cover');
            this.pop = $('.pop');
            this.navDot = $('#fp-nav span, .fp-slidesNav span');
            this.linkGroupA = $('.link-group a');

            this.nextSlide.click(function() {
                obj.nextSlideClick();
            })
            this.popUpImg.click(function() {
                obj.popUpImgClick();
            })
            this.close.click(function() {
                obj.closeClick();
            })
            this.cover.click(function() {
                obj.coverClick();
            })

            this.popUpListBuild(popUpList1, 1);
            this.popUpListBuild(popUpList2, 2);
            this.popUpListBuild(popUpList3, 3);
            this.popUpListBuild(popUpList4, 4);

            this.setNavDot();
            setInterval(function() {
                obj.setNavDot()
            }, 4000);
        },
        popUpListBuild: function(ListName, ListId) {
            var obj = this;
            ListName.forEach(function(v, i, a) {
                $(v.id).click(function() {
                    obj.linkGroupA.removeClass('animated tada');
                    $(this).addClass('animated tada');
                    $('.popUp' + ListId).find('.title').html(v.title);
                    $('.popUp' + ListId).find('.description').html(v.description);
                    $('.popUp' + ListId).show();
                    obj.cover.show();
                    obj.fullpageNot();
                })
            });
        },
        nextSlideClick: function() {
            this.popUpImg.fadeIn();
            this.cover.fadeIn();
            this.fullpageNot();
        },
        popUpImgClick: function() {
            this.popUpImg.fadeOut();
            this.cover.fadeOut();
            this.fullpageAllow()
        },
        closeClick: function() {
            this.pop.hide();
            this.cover.fadeOut();
            this.fullpageAllow();
        },
        coverClick: function() {
            this.pop.hide();
            this.cover.fadeOut();
            this.fullpageAllow();
        },
        fullpageAllow: function() {
            $.fn.fullpage.setAllowScrolling(true);
            $.fn.fullpage.setKeyboardScrolling(true);
        },
        fullpageNot: function() {
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(true);
        },
        setNavDot: function() {
            var ran1 = Math.floor(Math.random() * 255);
            var ran2 = Math.floor(Math.random() * 255);
            var ran3 = Math.floor(Math.random() * 255);
            var color = 'rgb(' + ran1 + ',' + ran2 + ',' + ran3 + ')';
            this.navDot.css({
                'border-color': color
            });
        }
    }
    share.init();
});
