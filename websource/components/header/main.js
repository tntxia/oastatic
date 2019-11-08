let updatePasswordDialogComp = {
    template: "<jxiaui-dialog ref=\"dialog\" @close=\"hide\" :title=\"title\">\r\n    <table class=\"table table-bordered\">\r\n        <tr>\r\n            <th>原密码：</th>\r\n            <td><input v-model=\"passwordOld\"></td>\r\n        </tr>\r\n        <tr>\r\n            <th>新密码：</th>\r\n            <td><input v-model=\"newPassword\"></td>\r\n        </tr>\r\n        <tr>\r\n            <th>重复输入新密码：</th>\r\n            <td><input v-model=\"newPasswordRepeat\"></td>\r\n        </tr>\r\n    </table>\r\n    <div>\r\n        <button @click=\"sub\">确认</button>\r\n    </div>\r\n</jxiaui-dialog>",
    data() {
        return {
            title: "修改密码",
            passwordOld: null,
            newPassword: null,
            newPasswordRepeat: null
        }
    },
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        hide() {
            this.$refs.dialog.close();
        },
        sub() {
            let me = this;
            let passwordOld = this.passwordOld;
            var password = this.newPassword;
            var password2 = this.newPasswordRepeat;

            if (!passwordOld) {
                alert("请输入原始密码");
                return;
            }

            if (!password) {
                alert("请输入密码");
                return;
            }

            if (!password) {
                alert("请输入重复密码");
                return;
            }

            if (password != password2) {
                alert("两次输入的密码不一定，请重新输入！");
                return;
            }

            $.ajax({
                url: webRoot +
                    "/user!changePass.do",
                data: {
                    passwordOld: passwordOld,
                    password: password
                },
                success: function(data) {
                    if (data.success) {
                        alert("密码修改成功！");
                        me.hide();
                    } else {
                        alert("修改失败！" + data.msg);
                    }
                }
            });

        }
    }
}

let mainMenuSelected;

module.exports = {
    props: ['module'],
    data() {
        return {
            username: null,
            loginList: [],
            toDoCount: 0,
            todoDialogTitle: null,
            menus: [],
            timeStr: null
        }
    },
    components: {
        'update-password-dialog': updatePasswordDialogComp
    },
    mounted() {

        let me = this;

        this.showTime();

        let vm = this;
        $.ajax({
            url: "menu!list.do"
        }).done(res => {
            res.forEach(m => {
                if (m.key_name === mainMenuSelected) {
                    m.selected = true;
                } else {
                    m.selected = false;
                }
            })
            vm.menus = res;
        })
        this.fetchData();
    },
    updated() {},
    methods: {
        showTime() {
            let me = this;

            var today = new Date;
            var week = new Array(7);
            week[0] = "天";
            week[1] = "一";
            week[2] = "二";
            week[3] = "三";
            week[4] = "四";
            week[5] = "五";
            week[6] = "六";
            this.timeStr = "今天是:" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日  星期" + week[today.getDay()];
        },
        home: function() {
            router.goRoute("index_main");
        },
        back: function() {
            history.back();
        },
        forward: function() {
            history.forward();
        },
        fetchData() {
            let vm = this;
            $.ajax({
                url: "userAlertCount.do",
                success: function(data) {
                    vm.toDoCount = data;
                },
                error: function(e) {
                    console.error(e);
                }
            });
            $.ajax({
                url: "logininfo.do"
            }).done(res => {
                vm.username = res.username;
                vm.todoDialogTitle = vm.username + "的待办事项"
                let loginList = res.loginList;
                if (!loginList) {
                    loginList = [];
                }
                vm.loginList = loginList;
            })
        },
        passchange: function() {
            debugger
            this.$refs.updatePasswordDialog.show();
        },
        selectMenu(key) {
            this.menus.forEach(m => {
                if (m.key_name == key) {
                    m.selected = true;
                } else {
                    m.selected = false;
                }
            })
        },
        openWork: function() {
            var url = 'setting/setting.dispatch?method=toWorkAgent';
            window.open(url);
        },
        openHelp: function() {
            var url = 'setting/help.jsp';

            window.open(url);

        },
        openAboat: function() {
            var url = 'viewSystemInfo.dispatch';

            window.open(url);
        },
        checkwork: function() {
            $.ajax({
                url: 'checkwork/checkwork!record.do',
                success: function(data) {
                    if (data.success) {
                        if (confirm("打卡成功！是否查看我的考勤？")) {
                            router.goRoute("hr_my_attandance");
                        }
                    } else {
                        alert("操作失败！");
                    }
                },
                error: function(e) {
                    alert("后台服务异常");
                }
            });
        },
        logout: function() {
            $.ajax({
                url: 'logout.do',
                success: function() {
                    window.location.reload();
                }
            });
        }
    },
    watch: {
        module() {
            let moduleName = this.module;
            let type;
            if (moduleName.indexOf("/") >= 0) {
                type = moduleName.split("/")[0];
            } else {
                type = moduleName.split("_")[0];
            }
            mainMenuSelected = type;
            this.selectMenu(type);
        }
    }
}