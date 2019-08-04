$(function() {

    $.ajax({
        url: webRoot + "/menu!list.do",
        cache: false
    }).done(res => {
        $.each(res, (i, d) => {
            let li = $("<li>");
            let a = $("<a>", {
                text: d.name,
                href: webRoot + "/" + d.url
            });
            li.append(a);
            $("#menu1").append(li);
        });
    })

    new Vue({
        el: '#topDiv',
        data: {
            username: null,
            loginList: [],
            toDoCount: 0,
            todoDialogTitle: null
        },
        mounted() {
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
                let dialog = dialogVue.getDialog("myTodoDialog");
                dialog.show();
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
                    vm.loginList = res.loginList;
                })
            },
            passchange: function() {
                openChangePassDialog();
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
                    url: webRoot + '/checkwork/checkwork.do',
                    data: {
                        method: 'record'
                    },
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

    function openChangePassDialog() {
        BootstrapUtils.createDialog({
            id: 'changePassModal',
            template: webRoot + '/template/changePass.html',
            onConfirm: function() {
                var password = this.find("[name=password]").val();
                var password2 = this.find("[name=password2]").val();

                if (password != password2) {
                    alert("两次输入的密码不一定，请重新输入！");
                }

                $.ajax({
                    url: webRoot +
                        "/user!changePass.do",
                    data: {
                        password: password
                    },
                    success: function(data) {
                        if (data.success) {
                            alert("密码修改成功！");
                            $("#changePassModal").modal("hide");
                        } else {
                            alert("修改失败！");
                        }
                    }
                });
            }
        });
        $("#changePassModal").modal("show");
    }


});