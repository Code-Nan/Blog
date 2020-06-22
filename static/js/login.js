jQuery(document).ready(function () {
    $('.page-container form.login').submit(function () {
        let username = $(this).find('.username').val();
        let password = $(this).find('.password').val();
        $(this).parent().find('.error-tips').each(function () {
            $(this).children('span').text('');
        });
        if (username == '') {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '2px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.username').focus();
                $(this).parent().find('.username').next().children('span').text('注：请输入正确的用户名');
            });
            return false;
        }
        if (password == '') {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '76px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.password').focus();
                $(this).parent().find('.password').next().children('span').text('注：请输入正确的密码')
            });
            return false;
        }

        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                $("button.login").trigger("click");
            }
        });
    });

    $('.page-container form .username, .page-container form .password').keyup(function (event) {
        if (event.keyCode != 13) {
            $(this).parent().find('.error').fadeOut('fast');
            $(this).parent().find('.error-tips').each(function () {
                $(this).children('span').text('');
            });
        }
    });

    $('button.register').on('click', function () {
        window.location.href = "/user/register/";
    })


});
