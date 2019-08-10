(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('change-password-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
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
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :title=\"title\">\r\n    <table class=\"table table-bordered\">\r\n        <tr>\r\n            <th>原密码：</th>\r\n            <td><input v-model=\"passwordOld\"></td>\r\n        </tr>\r\n        <tr>\r\n            <th>新密码：</th>\r\n            <td><input v-model=\"newPassword\"></td>\r\n        </tr>\r\n        <tr>\r\n            <th>重复输入新密码：</th>\r\n            <td><input v-model=\"newPasswordRepeat\"></td>\r\n        </tr>\r\n    </table>\r\n    <div>\r\n        <button @click=\"sub\">确认</button>\r\n    </div>\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)