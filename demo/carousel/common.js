;
(function() {
    var util = {
        addEvent: function(element, event, handler) {
            if (element.addEventListener) {
                element.addEventListener(event, handler, false);
            } else {
                element.attachEvent('on' + event, handler);
            }
        },
        getTarget: function(event) {
            return event.target ? event.target : event.srcElement;
        },
        id: function(ID) {
            return document.getElementById(ID);
        },
        className: function(parent, classname) {
            parent = parent || document;
            var all = parent.getElementsByTagName('*');
            var allLength = all.length;
            var classList = [];
            for (var i = 0; i < allLength; i++) {
                if (all[i].className.match(new RegExp(classname))) {
                    classList.push(all[i]);
                }
            }
            return classList;
        },
        setOpacity: function(ele, opacity) {
            if (ele.style.opacity != undefined) {
                ele.style.opacity = opacity / 100;
            } else {
                ele.style.filter = "alpha(opacity=" + opacity + ")";
            }
        },
        hide: function(ele) {
            var currentOpacity = 100;
            var hideInterval = setInterval(function() {
                util.setOpacity(ele, currentOpacity);
                currentOpacity -= 10;
                if (currentOpacity < 0) {
                    clearInterval(hideInterval);
                    ele.style.display = 'none';
                }
            }, 70);
        },
        show: function(ele) {
            ele.style.display = 'block';
            var currentOpacity = 10;
            var showInterval = setInterval(function() {
                util.setOpacity(ele, currentOpacity);
                currentOpacity += 10;
                if (currentOpacity > 100) {
                    clearInterval(showInterval);
                }
            }, 30);
        },
        addActive: function(ele) {
            ele.className = 'active';
        },
        removeActive: function(ele) {
            ele.className = '';
        }
    }
    var carousel = (
        function() {
            var carousel = {
                obj: null,
                items: null,
                itemsCount: 0,
                currentIndex: 0,
                carouselInterval: null,
                nav: null,
                navItem: null,
                canClick: true
            }

            function carouselInit() {
                for (var i = 0; i < carousel.itemsCount; i++) {
                    carousel.items[i].style.display = "none";
                    util.setOpacity(carousel.items[i], 0);
                }
                util.show(carousel.items[0]);
                carousel.currentIndex = 0;
                buildNav();
            }

            function buildNav() {
                carousel.navItem = [];
                var nav = util.id('nav');
                for (var i = 0; i < carousel.itemsCount; i++) {
                    var navLi = document.createElement('li');
                    if (i === 0) {
                        navLi.className = 'active';
                    }
                    var navLiI = document.createElement('i');
                    navLi.appendChild(navLiI);
                    carousel.navItem.push(navLi);
                    nav.appendChild(navLi);
                }
                util.addEvent(carousel.obj, 'click', clickNav);
                carousel.nav = nav;
            }

            function clickNav(event) {
                if (carousel.canClick) {
                    clearInterval(carousel.carouselInterval);

                    var target = util.getTarget(event);
                    var currentIndex;
                    if (target.nodeName.toLowerCase() === 'li' || target.nodeName.toLowerCase() === 'i') {
                        for (var i = 0; i < carousel.navItem.length; i++) {
                            if (target === carousel.navItem[i] || target === carousel.navItem[i].getElementsByTagName('i')[0]) {
                                currentIndex = i;
                            }
                        }
                        if (currentIndex !== carousel.currentIndex) {

                            util.removeActive(carousel.navItem[carousel.currentIndex]);
                            util.addActive(carousel.navItem[currentIndex]);

                            util.hide(carousel.items[carousel.currentIndex]);
                            util.show(carousel.items[currentIndex]);
                            carousel.currentIndex = currentIndex;
                        }
                    }
                    if (target.id == 'pre') {
                        carouselPre();
                    }
                    if (target.id == 'next') {
                        carouselNext();
                    }

                }
                // 防止点击过快 页面错乱
                carousel.canClick = false;
                setTimeout(function() {
                    carousel.canClick = true;
                }, 700);
            }

            function autoCarousel(autoplayTime) {
                carousel.carouselInterval = setInterval(carouselNext, autoplayTime)
            }

            function carouselPre() {
                if (carousel.currentIndex > 0) {
                    util.removeActive(carousel.navItem[carousel.currentIndex]);
                    util.addActive(carousel.navItem[carousel.currentIndex - 1]);
                    util.hide(carousel.items[carousel.currentIndex]);
                    util.show(carousel.items[carousel.currentIndex - 1]);
                    carousel.currentIndex = carousel.currentIndex - 1;

                } else {
                    util.removeActive(carousel.navItem[carousel.currentIndex]);
                    util.addActive(carousel.navItem[carousel.itemsCount - 1]);
                    util.hide(carousel.items[carousel.currentIndex]);
                    util.show(carousel.items[carousel.itemsCount - 1]);
                    carousel.currentIndex = carousel.itemsCount - 1;
                }
            }

            function carouselNext() {
                if (carousel.currentIndex < carousel.itemsCount - 1) {
                    util.removeActive(carousel.navItem[carousel.currentIndex]);
                    util.addActive(carousel.navItem[carousel.currentIndex + 1]);
                    util.hide(carousel.items[carousel.currentIndex]);
                    util.show(carousel.items[carousel.currentIndex + 1]);
                    carousel.currentIndex = carousel.currentIndex + 1;
                } else {
                    util.removeActive(carousel.navItem[carousel.currentIndex]);
                    util.addActive(carousel.navItem[0]);
                    util.hide(carousel.items[carousel.currentIndex]);
                    util.show(carousel.items[0]);
                    carousel.currentIndex = 0;
                }
            }

            function init(wrapperId, isAuto, autoplayTime) {
                carousel.obj = util.id(wrapperId);
                carousel.items = util.className(carousel.obj, 'item');
                carousel.itemsCount = carousel.items.length;
                carouselInit();
                if (isAuto) {
                    autoCarousel(autoplayTime);
                }
            };
            return {
                init: init
            }
        }
    )()

    carousel.init('carousel', false, 2000);

})();
