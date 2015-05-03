;
(function(d) {
    var starBuild = (
        function() {
            var randomObj = {
                left: 0,
                top: 0,
                tempRandom: 0,
                currentCount: 0
            }

            function filterRandom() {
                randomObj.tempRandom = Math.floor(Math.random() * 100);
                while (randomObj.tempRandom < 10 || randomObj.tempRandom > 90) {
                    randomObj.tempRandom = Math.floor(Math.random() * 100);
                }
            }

            function randomStyle() {
                filterRandom();
                randomObj.left = randomObj.tempRandom + '%';
                filterRandom();
                randomObj.top = randomObj.tempRandom + '%';
            }

            function starEle(parent) {
                randomObj.currentCount += 1;
                var starEle = document.createElement('img');
                starEle.src = "images/star.png";
                starEle.className = "star " + "star-" + randomObj.currentCount;
                randomStyle();
                starEle.style.left = randomObj.left;
                starEle.style.top = randomObj.top;
                parent.appendChild(starEle);
            }

            function init(parent, starCount) {

                // 弄了一个加载时的动画，但是这个页面不大，所以模拟了一秒作为加载时间
                window.onload = function() {
                    setTimeout(function() {
                        document.getElementById('loading').style.display = "none";
                        parent.className += " active";
                    },1000);
                }

                // 添加闪烁的星星
                for (var i = 0; i < starCount; i++) {
                    starEle(parent);
                }
            }
            return {
                init: init
            }
        }
    )();
    starBuild.init(document.getElementById('star-parent'), 10);

})(document);
