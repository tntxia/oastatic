let type = router.getParam("type");
if (!type) {
    type = "1"
}

new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {
            type: type,
            coname: null,
            share: '否',
            cozzxs: '私营有限公司',
            cokhjb: '***',
            cokhyh: 'UPS'
        }
    },
    mounted() {},
    methods: {
        check() {
            let form = this.form;
            if (!form.coname) {
                alert("请输入客户名称!");
                return false;
            }

            if (!form.cotel) {
                alert("请您输入电话号码!");
                return false;
            }
            return true;
        },
        sub() {
            if (!this.check()) {
                return;
            }
            let me = this;
            let form = this.form;
            $.ajax({
                url: webRoot + "/client/client!add.do",
                type: 'post',
                data: form,
                success: function(data) {
                    if (data.success) {
                        me.back();
                    } else {
                        alert("操作失败！" + data.msg);
                    }
                },
                error: function(e) {
                    alert("操作异常！");
                }

            });
        },
        back() {
            if (this.form.type === "2") {
                router.goRoute("sale/client_list_potential");
            } else {
                router.goRoute("sale/client_list");
            }
        }
    }
});