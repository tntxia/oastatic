let url = webRoot + "/purchasing/supplier!list.do";
new Vue({
    el: '#app',
    data: {
        supplierDataset: {
            url: webRoot + '/purchasing/supplier!list.do',
            field: 'coname',
            label: 'coname'
        },
        form: {
            man1: '',
            coname: null,
            man2: '',
            share: 'Y'
        }
    },
    mounted() {},
    methods: {
        supplierChange(supplier) {
            $.ajax({
                url: webRoot + '/purchasing/supplier!getSupplierByName.do',
                data: {
                    coname: supplier.coname
                }
            }).done(res => {
                if (res.success) {
                    let supplier = res.supplier;
                    this.form.man1 = supplier.username;
                    this.form.share = supplier.share;
                } else {
                    alert("查询供应商所属用户失败");
                }
            }).fail(e => {

            });
            console.log("supplier change,,,,", supplier);
        },
        sub() {
            var param = this.form;
            console.log("sub param,,,", param);
            if (!param.man1 || !param.man2) {
                alert("请选择你要转移的用户");
                return;
            }
            $.ajax({
                url: webRoot + "/purchasing/supplier!shift.do",
                data: param,
                type: 'post',
                success: function(data) {
                    if (data.success) {
                        alert("操作成功");
                    } else {
                        alert("操作失败！" + data.msg);
                    }
                },
                error: function() {
                    alert("请求后台服务失败");
                }
            });
        }
    }
});