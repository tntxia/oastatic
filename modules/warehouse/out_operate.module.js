(function(name, moduleFun) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    let module = moduleFun();
    if (arguments.length > 2) {
        let components = Object.create(null);
        for (let i = 2; i < arguments.length; i++) {
            let name = arguments[i];
            i++;
            let func = arguments[i];
            if (!func) {
                continue;
            }
            let component = func();
            components[name] = component;
        }
        module.components = components;
    }

    window.modules[name] = module;
})('warehouse/out_operate', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        menudata: null,
        id: id,
        detail: {},
        currentView: null,
        dataset: {
            url: "sale/sale!listProduct.do",
            params: {
                id: id
            }
        }
    },
    components: this.components,
    mounted() {
        this.loadData();
    },
    methods: {
        // 返回此订单
        toReturn() {
            this.$refs.returnDialog.show();
        },
        // 表格行的处理，待出库数量=合同产品数量 - 已出库数量
        rowHandler(row) {
            row.outNum = row.num - row.numOut;
        },
        // 打印订单
        toPrintDeliveryBill() {
            var id = this.id;
            window.open('warehouse/out/company1.jsp?id=' + id, '_blank');
        },
        // 返回出库管理
        back() {
            router.goRoute("warehouse/out_manage");
        },
        // 加载出库信息
        loadData() {
            let me = this;
            $.ajax({
                url: 'sale/sale!detail.do',
                data: {
                    id: id
                }
            }).done(function(res) {
                me.detail = res.data;
            })
        },
        // 重新加载出库信息
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        out(row) {
            if (confirm("是否确认要出库，出库数量：" + row.outNum)) {
                let me = this;
                $.ajax({
                    url: "warehouse/warehouse!out.do",
                    cache: false,
                    type: 'post',
                    data: {
                        id: row.id,
                        ddid: this.id,
                        wid: row.productId,
                        num: row.outNum
                    },
                    success: function(data) {
                        if (data.success) {
                            alert("出库成功！");
                            me.query();
                        } else {
                            alert("操作失败:" + data.msg);
                        }
                    },
                    error: function(e) {
                        alert("服务器发生错误，请稍候重试！");
                        throw e;
                    }
                });
            }
        },
        outAll() {
            if (!confirm("是否确认出库这张订单的所有产品")) {
                return;
            }
            let datagrid = this.$refs["datagrid"];
            let rows = datagrid.getRows();
            let data = {
                id: this.id,
                rows: rows
            }
            let me = this;
            this.$http.post("warehouse/warehouse!doOutSale.do", data).then(function(res) {
                let data = res.body;
                if (data.success) {
                    alert("出库完成");
                    me.back();
                } else {
                    alert("操作失败");
                }
            });
        }
    },
})
        };
        return module.exports;
    }

    ,
    'return-out-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    props: ['id'],
    data() {
        return {
            reason: 'A、退回重新编辑',
            reasonList: ["A、退回重新编辑", "B、货物检验有质量问题", "C、货物不符合合同要求", "D、客户推迟订货时间", "E、供应商没有货", "F、没有收到货款", "G、其他"],
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        sub() {
            var ddid = this.id;
            let me = this;
            $.ajax({
                url: webRoot + "/warehouse/warehouse!outReturn.do",
                type: 'post',
                data: {
                    ddid: ddid,
                    p_states: reason
                },
                success: function(data) {
                    if (data.success) {
                        alert("操作成功");
                        me.$refs.dialog.close();
                    } else {
                        alert("操作失败" + data.msg);
                    }
                }
            });
        }
    }
}
module.exports.template = "<jxiaui-dialog title=\"订单返回\" ref=\"dialog\">\r\n    <div>\r\n        <select v-model=\"reason\"><option  v-for=\"r in reasonList\">{{r}}</option></select> <button @click=\"sub\">确认返回</button>\r\n    </div>\r\n</jxiaui-dialog>";
        return module.exports;
    }
    ,
    'product-select',
    function() {
        var module = Object.create(null);
        module.exports = {
    props: ['model'],
    data() {
        return {
            productId: null,
            productList: []
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: 'warehouse/warehouse!listByModel.do',
                data: {
                    model: this.model
                }
            }).done(function(res) {
                let data = res.data;
                if (data.length) {
                    me.productId = data[0].id;
                }
                me.productList = res.data;
            })
        }
    },
    watch: {
        productId() {
            this.$emit("input", this.productId);
        }
    }
}
module.exports.template = "<select v-model=\"productId\">\r\n    <option :value=\"p.id\" v-for=\"p in productList\">{{p.pro_model}} 当前库存：{{p.pro_num}}</option>\r\n</select>";
        return module.exports;
    }
    
);