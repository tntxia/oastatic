module.exports = {
    name: 'mail-new-dialog',
    data() {
        return {
            showFlag: false,
            title: "新建邮件",
            form: {
                mail_to: null, // 收件人
                mail_to2: null, // 抄送
                mail_to3: null, // 密送,
                mail_sub: null,
                mail_nr: null
            },
            company_id: null,
            sale_number: null,
            companyList: []
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
        setTitle(title) {
            this.title = title;
        },
        setCallbackFun(func) {
            this.callbackFun = func;
        },
        handleChoose(row) {
            if (this.callbackFun) {
                this.callbackFun(row);
            }
            this.hide();
        },
        send() {
            let vm = this;
            var paramMap = this.form;
            $.ajax({
                url: webRoot + '/mail!newMail.do',
                type: 'post',
                data: paramMap
            }).done(function(data) {
                if (data.success) {
                    alert("发送成功");
                    vm.hide();
                    window.location.reload();
                } else {
                    alert("发送失败");
                }
            }).fail(function() {
                alert("发送异常");
            });
        },
        add() {
            let vm = this;
            let company = vm.company_id;
            if (!company) {
                alert("请选择送货单的公司");
                return;
            }
            let saleId = vm.saleId;
            if (!saleId) {
                alert("请选择销售订单");
                return;
            }
            $.ajax({
                url: 'send!createSendBill.do',
                type: 'post',
                data: {
                    company,
                    saleId
                }
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    router.goRoute("send_bill_list");
                } else {
                    alert("操作失败：" + res.msg);
                }
            })
        }
    }
}