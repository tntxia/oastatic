
function initDatetime(){
	var today=new Date;
	var week=new Array(7);
	week[0]="天";
	week[1]="一";
	week[2]="二";
	week[3]="三";
	week[4]="四";
	week[5]="五";
	week[6]="六";
	$("#timeDiv").html("今天是:"+today.getFullYear()+"年"+(today.getMonth()+1)+"月"+today.getDate()+"日  星期"+week[today.getDay()]);
}

var dialogVue;
var $globe = {};

$(function(){
	
	let jsList = ["components/brand-select.js", "components/user-select.js", "components/saleman-select.js", "components/my-todo-dialog.js", "components/warehouse/warehouse-send-bill-add-dialog.js",
		"components/warehouse/warehouse-send-bill-view-dialog.js", "components/warehouse/warehouse-send-bill-edit-dialog.js",
		"components/purchasing/purchasing-inquiry-list.js","components/purchasing/purchasing-inquiry-list-waiting.js",
		"components/sale/sale-approved-choose-dialog.js"]
	JsInstall.install(jsList).then(()=> {
		installMainLayout().then((mainLayout)=> {
			$.ajax({
				url: '/oa_static/json/moduleMapping.json'
			}).done(res=> {
				init(mainLayout, res);
			})
		});
	});	
	
	function installMainLayout() {
		return MainLayoutInstall.install({
	        headerHeight: 80,
	        headerTemplate: '/oa_static/template/header.html',
	        mainSecTemplate: '/oa_static/template/content.html',
	    });
	}
	
	function init(mainLayout, mapping) {
		
		initTop();
		let currLeftbar;
		initDatetime();
		
		let dialogsDiv = $("<div>", {
			id: 'dialogsDiv'
		});
		dialogsDiv.css({
			position: 'relative',
			'z-index': 10000
		})
		mainLayout.append(dialogsDiv);
		let components = [{
			name: 'my-todo-dialog',
			ref: 'myTodoDialog'
		}, {
			name: 'warehouse-send-bill-add-dialog',
			ref: 'warehouseSendBillAddDialog'
		}, {
			name: 'warehouse-send-bill-view-dialog',
			ref: 'warehouseSendBillViewDialog'
		}, {
			name: 'warehouse-send-bill-edit-dialog',
			ref: 'warehouseSendBillEditDialog'
		}, {
			name: 'sale-approved-choose-dialog',
			ref: 'saleApprovedChooseDialog'
		}];
		components.forEach(comp=> {
			let compEl = $("<" + comp.name + ">");
			compEl.attr("ref", comp.ref);
			dialogsDiv.append(compEl);
		});
		
		dialogVue = new Vue({
			el: '#dialogsDiv',
			methods: {
				getDialog(name) {
					return this.$refs[name];
				}
			}
		})
		
		router.register({
			target:$(".main_sec"),
			defaultModule: 'index_main',
			mapping: mapping,
			onChange(module) {

				let type = module.split("_")[0];
				if (type === currLeftbar) {
					$(".leftbar li").removeClass("selected");
					$(".leftbar li").each(function() {
						let href = $(this).find("a").attr("href");
						if (href.endsWith(module)) {
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
					data: {
						type: type
					}
				}).done(res=> {
					res.forEach(item=> {
						let buttons = item.buttons;
						buttons.forEach(button=> {
							if (button.url.endsWith(module)) {
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
	        el: '#topDiv',
	        data: {
	        	companyName: null,
	        	companyNameEn: null,
	            username: null,
	            loginList: [],
	            toDoCount: 0,
	            todoDialogTitle: null,
	            
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
	                    url: '/oa_static/json/app.json'
	                }).done(function(data) {
	                    vm.companyName = data.companyName;
	                    vm.companyNameEn = data.companyNameEn;
	                });
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
	}
});

