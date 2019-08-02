module.exports = {
    name: 'sale-approved-choose-dialog',
    data() {
        return {
            showFlag: false,
            title: "请选择销售订单",
            company_id: null,
            sale_number: null,
            companyList: [],
            dataset: {
                url: webRoot + '/sale/sale!approvedList.do',
                method: 'post'
            },
            callbackFun: null
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
        chooseSale() {
            let vm = this;
            OACommonUse.openSaleChooseDialog(function(data) {
                vm.sale_number = data.number;
                vm.saleId = data.id;
            }, {
                url: webRoot + '/sale/sale!approvedList.do'
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