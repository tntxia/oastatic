new Vue({
    el: '#app',
    data: {
        form: {
            number: null,
            saleNumber: null
        },
        dataset: {
            url: webRoot + '/warehouse/send!getSendBillList.do',
            method: 'post'
        }
    },
    methods: {
        toAdd() {
            let vm = this;
            let saleChooseDialog = mainLayout.showDialog("saleApprovedChooseDialog");
            saleChooseDialog.setCallbackFun(row => {
                console.log("show me the sale,,,", row);
                let addDialog = mainLayout.showDialog("warehouseSendBillAddDialog");
                addDialog.setSale(row);
                addDialog.setCallbackFunc(() => {
                    vm.reload();
                })
                addDialog.show();
            });
            saleChooseDialog.show();
        },
        reload() {
            let datagrid = this.$refs["datagrid"];
            datagrid.query();
        },
        query() {

        },
        view(row) {
            let mainLayout = webApp.layout;
            let dialog = mainLayout.showDialog("warehouseSendBillViewDialog");
            dialog.show(row.id);
        },
        del(row) {
            let id = row.id;
            $.ajax({
                url: 'send!delSendBill.do',
                type: 'post',
                data: {
                    id
                }
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    window.location.reload();
                } else {
                    alert("操作失败：" + res.msg);
                }
            })
        }
    }
});