module.exports = {
    name: 'warehouse-send-bill-add-dialog',
    data() {
        return {
            showFlag: false,
            company_id: null,
            sale_number: null,
            companyList: [],
            sale: null,
            company: {

            },
            callbackFun: null
        }
    },
    mounted() {
        this.fetchData();
    },
    updated() {},
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        setCallbackFunc(func) {
            this.callbackFun = func;
        },
        setSale(sale) {
            this.sale = sale;
            this.sale_number = sale.number;
            this.saleId = sale.id;
        },
        changeCompany() {

            let companyList = this.companyList;
            for (let i = 0; i < companyList.length; i++) {
                let company = companyList[i];
                if (company.id == this.company_id) {
                    this.company = company;
                    break;
                }
            }
        },
        getUrl(picId) {
            if (picId)
                return "/file_center/file!showPic.do?uuid=" + picId
        },
        fetchData() {
            let vm = this;
            $.ajax({
                url: webRoot + '/company!listAll.do'
            }).done(function(data) {
                vm.companyList = data;
            }).fail(function() {

            })
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
                url: webRoot + '/warehouse/send!createSendBill.do',
                type: 'post',
                data: {
                    company,
                    saleId
                }
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    vm.hide();
                    if (vm.callbackFun) {
                        vm.callbackFun();
                    }
                } else {
                    alert("操作失败：" + res.msg);
                }
            })
        }
    }
}