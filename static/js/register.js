jQuery(document).ready(function () {

    $('.page-container form.register').submit(function () {
        let username = $(this).find('.username').val();
        let email = $(this).find('.email').val();
        let password = $(this).find('.password').val();
        let confirmPassword = $(this).find('.confirmPassword').val();
        let regUserName = new RegExp("^[-_a-zA-Z0-9]{4,16}$");
        let regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        let regPassword = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d$@!%*#?&.]{6,}$");
        $(this).parent().find('.error-tips').each(function () {
            $(this).children('span').text('');
        });
        if (!username || !regUserName.test(username)) {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '2px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.username').focus();
                $(this).parent().find('.username').next().children('span').text('注：4到16位(字母、数字、下划线、减号)');
            });
            return false;
        }
        if (!email || !regEmail.test(email)) {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '76px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.email').focus();
                $(this).parent().find('.email').next().children('span').text('注：请输入正确的邮箱');
            });
            return false;
        }
        if (!password || !regPassword.test(password)) {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '150px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.password').focus();
                $(this).parent().find('.password').next().children('span').text('注：最少6位(包含大小写字母及数字)');
            });
            return false;
        }
        if (!confirmPassword || confirmPassword != password) {
            $(this).find('.error').fadeOut('fast', function () {
                $(this).css('top', '224px');
            });
            $(this).find('.error').fadeIn('fast', function () {
                $(this).parent().find('.confirmPassword').focus();
                $(this).parent().find('.confirmPassword').next().children('span').text('注：两次密码不一致');
            });
            return false;
        }

        //enter事件
        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                $("button.register").trigger("click");
            }
        });
    });

    $('.page-container form .username,.page-container form .email, .page-container form .password, .page-container form .confirmPassword').keyup(function (event) {
        if (event.keyCode != 13) {
            $(this).parent().find('.error').fadeOut('fast');
            $(this).parent().find('.error-tips').each(function () {
                $(this).children('span').text('');
            });
        }
    });

    //跳转登录
    $('button.login').on('click', function () {
        window.location.href = '/user/login/';
    })

    //用户名重复判断
    $(this).find('.username').blur(function () {
        let username = $(this).val();
        $.post('/user/register/exist', {'username':username}, function (data) {
            if (data.count == 1) {
                $('form.register').find('.username').next().children('span').text('用户名已存在');
            }
        })
    })


});
