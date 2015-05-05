(function($) {
    $.fn.jquizzy = function(settings) {
        var defaults = {
            questions: null,
            startText: 'Let\'s get started!',
            endText: 'Finished!',
            splashImage: 'img/start.png',
            shortURL: null,
            sendResultsURL: null
        };
        var config = $.extend(defaults, settings);

        var superContainer = $(this),
            answers = [],
            contentFob = '',
            questionsIteratorIndex, answersIteratorIndex;

        superContainer.addClass('main-quiz-holder');

        // 开始封装文件列表
        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {

            contentFob += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question">' + config.questions[questionsIteratorIndex].question + '</div><ul class="answers">';

            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
                contentFob += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }

            contentFob += '</ul><div class="nav-container">';
            if (questionsIteratorIndex !== 0) {
                contentFob += '<div class="prev"><a class="nav-previous" href="#">Prev</a></div>';
            }
            if (questionsIteratorIndex < config.questions.length - 1) {
                contentFob += '<div class="next"><a class="nav-next" href="#">Next</a></div>';
            } else {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#">Finish</a></div>';
            }
            contentFob += '</div></div>';

            // 收集答案
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }

        // 把问题列表放在指导页之后
        var guideContainer = superContainer.find('.intro-container');
        $(contentFob).insertAfter(guideContainer);



        // 下面开始处理后面的答题了
        function checkAnswers() {
            var resultArr = [],
                flag = false;
            for (i = 0; i < answers.length; i++) {
                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }

        function judgeSkills(score) {
            var returnString;
            if (score === 100)
                return config.resultComments.perfect;
            else if (score > 90)
                return config.resultComments.excellent;
            else if (score > 70)
                return config.resultComments.good;
            else if (score > 50)
                return config.resultComments.average;
            else if (score > 35)
                return config.resultComments.bad;
            else if (score > 20)
                return config.resultComments.poor;
            else
                return config.resultComments.worst;
        }

        function roundReloaded(num, dec) {
                var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
                return result;
            }
            // 各种变量的初始化
        var progress = superContainer.find('.progress'),
            progressKeeper = superContainer.find('.progress-keeper'),
            notice = superContainer.find('.notice'),
            progressWidth = progressKeeper.width(),
            userAnswers = [],
            questionLength = config.questions.length,
            slidesList = superContainer.find('.slide-container');


        // 隐藏一开始的进度条和提示
        progressKeeper.hide();
        notice.hide();

        slidesList.hide().first().fadeIn(500);


        // 开始答题的事件
        superContainer.find('.nav-start').click(function() {
            $(this).parents('.slide-container').fadeOut(500, function() {
                $(this).next().fadeIn(500);
                progressKeeper.fadeIn(500);
            });
            return false;
        });

        // 选择选项时候的事件
        superContainer.find('li').click(function() {
            var thisLi = $(this);
            if (thisLi.hasClass('selected')) {
                thisLi.removeClass('selected');
            } else {
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.addClass('selected');
            }
        });

        // 点击下一题的时候，判断有没有选择答案了
        // 没有的话弹出提示
        // 成功的话跳转到下一个页面，并且增加进度条进度
        superContainer.find('.next').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500, function() {
                $(this).next().fadeIn(500);
            });
            progress.animate({
                width: progress.width() + Math.round(progressWidth / questionLength)
            }, 500);
            return false;
        });


        // 点击上一题的事件，和点击下一题的事件基本一致
        superContainer.find('.prev').click(function() {
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500, function() {
                $(this).prev().fadeIn(500);
            });
            progress.animate({
                width: progress.width() - Math.round(progressWidth / questionLength)
            }, 500);
            return false;
        });

        // 点击结束时候的事件，
        // 如果没有选择的话，就提示选择
        // 否则的话，开始统计
        superContainer.find('.final').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }
            superContainer.find('li.selected').each(function(index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });
            if (config.sendResultsURL !== null) {
                var collate = [];
                for (r = 0; r < userAnswers.length; r++) {
                    collate.push('{"questionNumber":"' + parseInt(r + 1, 10) + '", "userAnswer":"' + userAnswers[r] + '"}');
                }
                $.ajax({
                    type: 'POST',
                    url: config.sendResultsURL,
                    data: '{"answers": [' + collate.join(",") + ']}',
                    complete: function() {
                        console.log("OH HAI");
                    }
                });
            }
            progressKeeper.hide();
            var results = checkAnswers(),
                resultSet = '',
                trueCount = 0,
                shareButton = '',
                score, url;
            if (config.shortURL === null) {
                config.shortURL = window.location
            };
            for (var i = 0, toLoopTill = results.length; i < toLoopTill; i++) {
                if (results[i] === true) {
                    trueCount++;
                }

                // 增加对错集合
                resultSet += '<div class="result-row"> Question #' + (i + 1) + (results[i] === true ? "<div class='correct'><span>Correct</span></div>" : "<div class='wrong'><span>Incorrect</span></div>");
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                        classestoAdd += 'right';
                    }
                    if (userAnswers[i] == answersIteratorIndex + 1) {
                        classestoAdd += ' selected';
                    }
                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                }
                resultSet += '</ul></div></div>';
            }

            // 统计分数
            score = roundReloaded(trueCount / questionLength * 100, 2);
            resultSet = '<h2 class="qTitle">' + judgeSkills(score) + ' You scored ' + score + '%</h2>' + shareButton + '<div class="jquizzy-clear"></div>' + resultSet + '<div class="jquizzy-clear"></div>';

            superContainer.find('.result-keeper').html(resultSet).show(500);
            superContainer.find('.resultsview-qhover').hide();
            superContainer.find('.result-row').hover(function() {
                $(this).find('.resultsview-qhover').show();
            }, function() {
                $(this).find('.resultsview-qhover').hide();
            });
            $(this).parents('.slide-container').fadeOut(500, function() {
                $(this).next().fadeIn(500);
            });
            return false;
        });
    };
})(jQuery);
