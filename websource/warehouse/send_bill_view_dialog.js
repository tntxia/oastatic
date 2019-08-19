module.exports = {
    name: 'warehouse-send-bill-view-dialog',
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
        addPro() {
            let detail = vm.detail;
            OACommonUse.openSaleProChooseDialog({
                saleNumber: detail.sale_number,
                callback(data) {
                    data.pid = id;
                    $.ajax({
                        url: 'send!addSendBillPro.do',
                        type: 'post',
                        data: data
                    }).done(res => {
                        if (res.success) {
                            alert("操作成功");
                            window.location.reload();
                        } else {
                            alert("操作失败");
                        }
                    })
                }
            })
        },
        delPro(id) {
            $.ajax({
                url: 'send!delSendBillPro.do',
                type: 'post',
                data: {
                    id: id
                }
            }).done(res => {
                if (res.success) {
                    alert("操作成功");
                    window.location.reload();
                } else {
                    alert("操作失败");
                }
            })
        },
        print() {
            let id = this.id;
            window.open(webRoot + '/warehouse/send-bill-print.mvc?id=' + id);
        },
        toEdit() {
            this.hide();
            let dialog = mainLayout.showDialog("warehouseSendBillEditDialog");
            dialog.show(this.id);
        }
    },
    watch: {
        id() {
            this.fetchData();
        }
    },
}