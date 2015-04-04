+
(function(doc, undefined) {
    var util = {
        addEvent: function(ele, event, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(event, handler, false);
            } else {
                ele.attachEvent('on' + event, handler);
            }
        },
        getTarget: function(event) {
            return event.target ? event.target : event.srcElement;
        },
        $id: function(Id, parent) {
            parent = parent ? parent : doc;
            return parent.getElementById(Id);
        },
        $tag: function(tagName, parent) {
            parent = parent ? parent : doc;
            return parent.getElementsByTagName(tagName);
        },
        hasClass: function(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },
        addClass: function(ele, addString) {
            var temple;
            if (!this.hasClass(ele, addString)) {
                if (ele.className.replace(/^\s+|\s+$/g, '') === '') {
                    temple = '';
                } else {
                    temple = ' ';
                }
                ele.className += (temple + addString);
            }
        },
        removeClass: function(ele, removeString) {
            if (this.hasClass(ele, removeString)) {
                var reg = new RegExp('(\\s|^)' + removeString + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        }
    }
    var tab = (function() {
        var Tab = {
            obj: null,
            nav: null,
            navList: null,
            body: null,
            bodyList: null
        }

        function clickNavList(event) {
            var target = util.getTarget(event);
            var length = Tab.navList.length;
            for (var i = 0; i < length; i++) {
                if (target === Tab.navList[i]) {
                    for (var j = 0; j < length; j++) {
                        if (i !== j) {
                            Tab.bodyList[j].style.display = 'none';
                            util.removeClass(Tab.navList[j], 'active');
                        }
                        Tab.bodyList[i].style.display = 'block';
                        util.addClass(Tab.navList[i], 'active')
                    }
                }
            }
        }

        function init(initObj) {
            initObj.tabId = initObj.tabId ? initObj.tabId : 'tab';
            initObj.tabNav = initObj.tabNav ? initObj.tabNav : 'tab-nav';
            initObj.tabBody = initObj.tabIBody ? initObj.tabIdBody : 'tab-body';

            Tab.obj = util.$id(initObj.tabId);
            Tab.nav = util.$id(initObj.tabNav);
            Tab.body = util.$id(initObj.tabBody);
            Tab.navList = util.$tag('li', Tab.nav);
            Tab.bodyList = util.$tag('li', Tab.body);

            var navListLength = Tab.navList.length;

            for (var i = 0; i < navListLength; i++) {
                var someW = (1 / navListLength * 100);
                Tab.navList[i].style.width = someW + '%';
            }

            util.addEvent(doc, 'click', clickNavList);
            Tab.navList[0].click();
        }

        return {
            init: init
        }
    })();

    tab.init({
        tabId: 'tab',
        tabNav: 'tab-nav',
        tabBody: 'tab-body'
    });

})(document);
