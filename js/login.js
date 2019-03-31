// 验证登陆信息
function isValid() {

    if (form1.user_id.value == "") {
        alert("登录名不能为空!");
        form1.user_id.focus();
        return false;
    }
    if (form1.password.value == "") {
        alert("密码不能为空!");
        form1.password.focus();
        return false;
    }
    return true;
}

function isMobile() {
    return navigator.userAgent.indexOf("Mobile") > 0;

}

//用户登陆
function loginAjax() {

    if (!isValid()) {
        return;
    }

    $("[name=form1]").ajaxSubmit({
        beforeSubmit: function(data) {
            $.blockUI({
                message: "正在登陆。。。。"
            });
            $.each(data, function(i, d) {
                d.value = escape(d.value);
            });
        },
        success: function(data) {
            if (data.success) {
                localStorage.username = $("[name=user_id]").val();
                localStorage.password = $("[name=password]").val();

                window.location.reload();


            } else {
                $.unblockUI();
                alert("登陆失败");
            }

        }
    });

}

$(function() {

    if (localStorage) {
        $("[name=user_id]").val(localStorage.username);
        $("[name=password]").val(localStorage.password);
    }
    $("#loginBtn").click(function() {
        loginAjax();
    });
});