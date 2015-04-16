$(document).ready(function() {
    // 点击关闭按钮和弹出按钮的事件，放在JS文件，一般不会改动
    $('.confirm').click(function() {
        $('.popMain,.popMask').fadeOut(300);
    });
    $('.popMask').click(function() {
        $('.popMain,.popMask').fadeOut(300);
    })

    //  模拟placeholder事件，不会改动
    var user_name = document.getElementById('username');
    var user_tel = document.getElementById('phone');
    var user_random = document.getElementById('randomNumber');
    asPlacholder(randomNumber);
    asPlacholder(user_name);
    asPlacholder(user_tel);

    function asPlacholder(ele) {
        var default_val = ele.getAttribute('placeholder');
        ele.onfocus = function() {
            ele.setAttribute('placeholder', '');
        }
        ele.onblur = function() {
            if (ele.value == '') {
                ele.setAttribute('placeholder', default_val);
            }
        }
    }
})
