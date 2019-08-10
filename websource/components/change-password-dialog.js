module.exports = {
    data() {
        return {
            showFlag: false,
            title: "修改密码",
            passwordOld: null,
            newPassword: null,
            newPasswordRepeat: null
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        sub() {
            let me = this;
            var password = this.newPassword;
            var password2 = this.newPasswordRepeat;

            if (password != password2) {
                alert("两次输入的密码不一定，请重新输入！");
                return;
            }

            $.ajax({
                url: webRoot +
                    "/user!changePass.do",
                data: {
                    passwordOld: this.passwordOld,
                    password: password
                },
                success: function(data) {
                    if (data.success) {
                        alert("密码修改成功！");
                        me.hide();
                    } else {
                        alert("修改失败！");
                    }
                }
            });

        }
    }
}