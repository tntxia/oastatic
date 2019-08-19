function initDatetime() {
    var today = new Date;
    var week = new Array(7);
    week[0] = "天";
    week[1] = "一";
    week[2] = "二";
    week[3] = "三";
    week[4] = "四";
    week[5] = "五";
    week[6] = "六";
    $("#timeDiv").html("今天是:" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日  星期" + week[today.getDay()]);
}

var mainLayout;
var topVue;
var $globe = {};
var mainMenuSelected;

$(function() {
    checkLogin().then(() => {
        loadWebConfig().then(() => {
            $(document.body).append($("<div>", {
                text: '查询系统所需的组件'
            }));
            getComponents().then(components => {
                let jsList = components.map(c => {
                    return c.url
                });
                $(document.body).append($("<div>", {
                    text: `总共需要，jsList${jsList.length}个组件，开始加载组件`
                }));

                let dialogs = components.filter(c => c.isDialog);

                WebInstall.install({
                    cssList: [],
                    jsList
                }).then(() => {
                    $(document.body).append($("<div>", {
                        text: '组件加载完成，开始渲染'
                    }));
                    installMainLayout(dialogs).then((mainLayout) => {
                        window.mainLayout = mainLayout;
                        $.ajax({
                            url: '/oa_static/json/moduleMapping.json'
                        }).done(res => {
                            init(mainLayout, res, components);
                        })
                    });
                });
            });
        });
    })

    function checkLogin() {
        $(document.body).append($("<div>", {
            text: '正在检查登陆状态'
        }));
        return new Promise((resolve, reject) => {
            $.ajax({
                url: webRoot + "/checkLogin.do",
                cache: false
            }).done(res => {
                if (res.success) {
                    if (res.login) {
                        $(document.body).append($("<div>", {
                            text: '用户已登陆'
                        }));
                        resolve();
                    } else {
                        $(document.body).append($("<div>", {
                            text: '用户还没有登陆，重新刷新页面'
                        }));
                        reject(new Error("用户还没有登陆"));
                    }
                } else {
                    reject(new Error("检查登陆状态失败"));
                }
            }).fail(e => {
                reject(new Error("检查登陆状态异常"));
            });
        });
    }

    function loadWebConfig() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/oa_static/json/webConfig.json'
            }).done(res => {
                WebInstall.install(res).then(() => {
                    resolve();
                }, e => {
                    reject(e);
                });
            }).fail(e => {
                console.error(e);
                reject(e);
            })
        });

    }

    function getComponents() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/oa_static/json/components.json'
            }).done(res => {
                resolve(res.components)
            }).fail(e => {
                reject(e);
            })
        });

    }

    function installMainLayout(dialogs) {
        $(document.body).empty();
        return MainLayoutInstall.install({
            headerHeight: 80,
            headerTemplate: '/oa_static/template/header.html',
            mainSecTemplate: '/oa_static/template/content.html',
            dialogs: dialogs
        });
    }

    function init(mainLayout, mapping) {

        initTop();
        let currLeftbar;
        initDatetime();

        router.register({
            target: $(".main_sec"),
            defaultModule: 'index_main',
            mapping: mapping,
            onChange(moduleName) {
                let module = mapping[moduleName];
                let leftbarFlag = module.leftbar;
                if (leftbarFlag === false) {
                    mainLayout.hideLeftbar();
                    return;
                }
                mainLayout.showLeftbar();
                let type = moduleName.split("_")[0];
                mainMenuSelected = type;
                topVue.selectMenu(type);
                if (type === currLeftbar) {
                    $(".leftbar li").removeClass("selected");
                    $(".leftbar li").each(function() {
                        let href = $(this).find("a").attr("href");
                        if (href.endsWith(moduleName)) {
                            $(this).addClass("selected");
                        }
                    });
                    return;
                }
                currLeftbar = type;
                let leftbar = $(".leftbar");
                leftbar.empty();
                $.ajax({
                    url: 'leftbar.do',
                    cache: false,
                    data: {
                        type: type
                    }
                }).done(res => {
                    res.forEach(item => {
                        let buttons = item.buttons;
                        buttons.forEach(button => {
                            if (button.url.endsWith(moduleName)) {
                                button.selected = true;
                            }
                        })
                    });
                    mainLayout.setLeftbar(res);

                    console.log(res);
                })
            }
        });
    }

    function initTop() {
        topVue = new Vue({
            el: '#topDiv',
            data: {
                companyName: null,
                companyNameEn: null,
                username: null,
                loginList: [],
                toDoCount: 0,
                todoDialogTitle: null,
                menus: []
            },
            mounted() {
                let vm = this;
                $.ajax({
                    url: webRoot + "/menu!list.do"
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
            methods: {
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
                    mainLayout.showDialog("myTodoDialog");

                },
                fetchData() {
                    let vm = this;
                    $.ajax({
                        url: webRoot + "/userAlertCount.do",
                        success: function(data) {
                            vm.toDoCount = data;
                        },
                        error: function(e) {
                            console.error(e);
                        }
                    });
                    $.ajax({
                        url: webRoot + "/logininfo.do"
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
                    var url = webRoot +
                        '/setting/setting.dispatch?method=toWorkAgent';

                    window.open(url);
                },
                openHelp: function() {
                    var url = webRoot + '/setting/help.jsp';

                    window.open(url);

                },
                openAboat: function() {
                    var url = webRoot + '/viewSystemInfo.dispatch';

                    window.open(url);
                },
                checkwork: function() {
                    $.ajax({
                        url: webRoot + '/checkwork/checkwork!record.do',
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
                        url: webRoot + '/logout.do',
                        success: function() {
                            window.location.reload();
                        }
                    });
                }
            }
        });
    }
});