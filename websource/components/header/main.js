let mainMenuSelected;



module.exports = {
    data() {
        return {
            companyName: null,
            companyNameEn: null,
            username: null,
            loginList: [],
            toDoCount: 0,
            todoDialogTitle: null,
            menus: [],
            timeStr: null
        }
    },
    mounted() {

        let me = this;

        router.onChange(function(moduleName) {
            let type;
            if (moduleName.indexOf("/") >= 0) {
                type = moduleName.split("/")[0];
            } else {
                type = moduleName.split("_")[0];
            }
            mainMenuSelected = type;
            me.selectMenu(type);
        });

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
        $(window).on("hashchange", function(e) {
            let route = router.getRoute();
            let type = route.split("_")[0];
            console.log(type);
        });
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
        showToDo() {
            let mainLayout = webApp.layout;
            mainLayout.showDialog("myTodoDialog");
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
            let mainLayout = webApp.layout;
            mainLayout.showDialog("changePasswordDialog");
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
    }
}