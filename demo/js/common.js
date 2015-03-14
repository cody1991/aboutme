;
(function(d) {
    var starBuild = (
        function() {
            var randomObj = {
                left: 0,
                top: 0,
                tempRandom: 0,
                currentCount:0
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
                for (var i = 0; i < starCount; i++) {
                    starEle(parent);
                }
            }
            return {
                init: init
            }
        }
    )();
    starBuild.init(document.getElementById('star-parent'), 6);

})(document);
