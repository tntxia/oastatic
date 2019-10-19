(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('header-main', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
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
module.exports.template = "<div>\r\n    <div class=\"logo_and_nav\">\r\n        <logo-and-name></logo-and-name>\r\n        <div class=\"right-top-nav\">\r\n            <ul>\r\n                <li @click=\"showToDo()\">\r\n                    <div>\r\n                        <span class=\"glyphicon glyphicon-user\"></span> {{username }}\r\n                        <span class=\"message-num-circle\">{{toDoCount}}</span>\r\n                    </div>\r\n                    <!--  \r\n                    <div style=\"position: absolute;top: 30px;width: 180px;background:white;display:none;\">\r\n                        部门: ${dept } 职位：${role }\r\n                    </div> -->\r\n                </li>\r\n                <li>\r\n                    <a>个人设置</a><span class=\"glyphicon glyphicon-chevron-down\"></span>\r\n                    <div class=\"submenu\" style=\"position: absolute; top: 14px; border: 1px solid #ccc; background: white;\">\r\n                        <div>\r\n                            <a @click=\"passchange\">更改口令</a>\r\n                        </div>\r\n                        <div>\r\n                            <a href=\"workAgent.mvc\">工作代理</a>\r\n                        </div>\r\n                        <div>\r\n                            <a @click=\"openHelp\">Office Online 帮助</a>\r\n                        </div>\r\n                        <div>\r\n                            <a @click=\"openAboat\">关于Office Online </a>\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n                <li><a href=\"#knowledge/type\">知识库</a></li>\r\n                <li><a href=\"#rule\">规章制度</a></li>\r\n                <li><a @click=\"checkwork\">打卡登记</a></li>\r\n                <li><a @click=\"logout\">退出</a></li>\r\n            </ul>\r\n            <div id=\"topMessage\"></div>\r\n        </div>\r\n        <div class=\"current-online-info\">\r\n            {{timeStr}} 当前在线人数：{{loginList.length}} 在线人员列表：{{loginList.join(\";\")}}\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"top_bottom_menu\">\r\n        <ul id=\"historyMenu\">\r\n            <li id=\"home\"><span class=\"fa fa-home\" @click=\"home\"></span>\r\n            </li>\r\n            <li id=\"back\"><span class=\"fa fa-arrow-left\" @click=\"back\"></span>\r\n\r\n            </li>\r\n            <li id=\"forward\"><span class=\"fa fa-arrow-right\" @click=\"back\"></span>\r\n            </li>\r\n            <li>|</li>\r\n        </ul>\r\n        <ul id=\"menu1\">\r\n            <li v-for=\"m in menus\" :class=\"{selected: m.selected}\"><a :href=\"m.url\">{{m.name}}</a></li>\r\n        </ul>\r\n    </div>\r\n</div>"
        return module.exports;
    })(),

)