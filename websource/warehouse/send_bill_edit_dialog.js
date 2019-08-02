module.exports = {
    name: 'warehouse-send-bill-edit-dialog',
    data() {
        return {
            id: null,
            showFlag: false,
            detail: {
                company: {},
                list: []
            }
        }
    },
    mounted() {
        this.fillCompanyList();
        this.fetchData();
    },
    updated() {},
    methods: {
        show(id) {
            this.id = id;
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        getUrl(uuid) {
            if (uuid) {
                return "/file_center/file!showPic.do?uuid=" + uuid;
            }
        },
        fetchData() {
            let vm = this;
            let id = this.id;
            if (!id) {
                return;
            }
            $.ajax({
                url: webRoot + '/warehouse/send!getSendBillDetail.do',
                data: {
                    id: id
                }
            }).done(res => {
                vm.detail = res;
            })
        },
        fillCompanyList: function() {
            let vm = this;
            $.ajax({
                url: webRoot + '/company!listAll.do'
            }).done(res => {
                vm.companyList = res;
            });
        },
        update() {
            let vm = this;
            $.ajax({
                url: 'send!updateSendBill.do',
                data: vm.detail
            }).done(res => {
                if (res.success) {
                    router.goRoute("send_bill_detail", { id: id });
                }
                vm.detail = res;
            })
        },
        changeCompany() {

            let companyList = this.companyList;
            for (let i = 0; i < companyList.length; i++) {
                let company = companyList[i];
                if (company.id == this.detail.company_id) {
                    this.detail.company = company;
                    break;
                }
            }
        },
        chooseSale() {
            OACommonUse.openSaleChooseDialog(function(data) {

                var saleId = data.id;

                $.ajax({
                    url: 'send!updateSendBillSale.do',
                    data: {
                        id: id,
                        saleId,
                        saleId
                    }
                }).done(function(res) {
                    if (res.success) {
                        alert("操作成功");
                        window.location.reload();
                    } else {
                        alert("操作失败：" + res.msg);
                    }
                })
                console.log(data);
            }, {
                url: webRoot + '/sale/sale!approvedList.do'
            });
        }
    },
    watch: {
        id() {
            this.fetchData();
        }
    },
}