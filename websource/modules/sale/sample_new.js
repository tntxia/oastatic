new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {
            clientId: null,
            coname: null,
            co_number: null,
            coaddr: null,
            contact: null,
            contact_tel: null,
            share: '否',
            cozzxs: '私营有限公司',
            cokhjb: '***',
            cokhyh: 'UPS',
            delivery_terms: "UPS",
            delivery_date: null,
            fveight: 0,
            insurance: 0
        }
    },
    mounted() {},
    methods: {
        choose() {
            let me = this;
            let dialog = mainLayout.showDialog("clientChooseDialog");
            dialog.setCallback(function(row) {
                me.form.clientId = row.clientid;
                me.form.coname = row.coname;
                me.form.co_number = row.co_number;
                me.form.coaddr = row.coaddr;
                console.log("callback", row);
            });
        },
        chooseContact() {
            let clientId = this.form.clientId;
            if (!clientId) {
                alert("请先选择客户");
                return;
            }
            let dialog = mainLayout.showDialog("clientContactChooseDialog");
            dialog.setCoId(clientId);
            let me = this;
            dialog.setCallback(function(row) {
                me.form.contact = row.name;
                me.form.contact_tel = row.tel;
                console.log("callback", row);
            });
            dialog.query();
        },
        check() {
            let form = this.form;
            if (!form.coname) {
                alert("请输入客户名称!");
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
                url: webRoot + "/sale/sample!addSample.do",
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
            router.goRoute("sale/sample_list_draft");
        }
    }
});