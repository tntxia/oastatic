$(function() {

    $.ajax({
        url: webRoot + "/menu!list.do"
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
        el: '#historyMenu',
        methods: {
            home: function() {
                window.location.href = webRoot + "/index.mvc";
            },
            back: function() {
                history.back();
            },
            forward: function() {
                history.forward();
            }
        }
    });

    new Vue({
        el: '#menu2',
		data:{
			toDoCount:0
		},
		mounted(){
			this.fetchData();
		},
        methods: {
			showToDo(){
				BootstrapUtils.createDialog({
					id:'toToDialog',
					template:webRoot+'/template/todo.html',
					onFinish(){
						let vueTarget = this.find("#useralert");
						let vm = new Vue({
							data:{
								username:null,
								items:[]
							},
							mounted(){
								this.fetchData();
							},
							methods:{
								fetchData:function(){
									let vm = this;
									
									$.ajax({
										url:webRoot+"/userAlert.do",
										success:function(data){
											vm.username = data.username;
											vm.items = data.items;
										},
										error:function(e){
											console.error(e);
										}
									});
								}
							}
						});
						vm.$mount(vueTarget.get(0));
					}
				});
				$("#toToDialog").modal('show');
			},
			fetchData(){
				let vm = this;
				$.ajax({
					url:webRoot+"/userAlert.do",
					success:function(data){
						$.each(data.items,function(i,d){
							vm.toDoCount += d.count;
						})
					},
					error:function(e){
						console.error(e);
					}
				});
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
                            if (confirm("打卡成功！是否跳转到打卡记录页面？")) {
                                window.location.href = webRoot + "/checkwork/main.mvc";
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