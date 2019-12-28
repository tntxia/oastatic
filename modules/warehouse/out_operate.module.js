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

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        <button @click=\"toReturn\">返回合同</button>\r\n        <button @click=\"toPrintDeliveryBill\">打印送货单</button>\r\n        <button @click=\"outAll\">出库所有产品</button>\r\n        <button @click=\"back\">返回出库管理</button>\r\n    </div>\r\n\r\n    <div class=\"jxiaui-table-form\">\r\n        <table>\r\n            <tr>\r\n                <th>销售单号</th>\r\n                <td>{{detail.number}}</td>\r\n                <th>负 责 人</th>\r\n                <td>{{detail.man}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>客户名称</th>\r\n                <td>{{detail.coname}}</td>\r\n                <th>客户合同号</th>\r\n                <td>{{detail.custno}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>帐单地址</th>\r\n                <td colspan=\"3\">{{detail.coaddr}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>销售时间</th>\r\n                <td>{{detail.datetime}}</td>\r\n                <th>发货时间</th>\r\n                <td>{{detail.send_date}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td colspan=\"4\">\r\n                    <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\" :self-define-row-handler=\"rowHandler\">\r\n                        <jxiaui-datagrid-item label=\"#\" type=\"index\"></jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"型号\" field=\"epro\"></jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"批号\" field=\"cpro\">\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"数量\" field=\"num\">\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"货期\" field=\"fypronum\">\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"已出库数量\" field=\"s_num\">\r\n                            <template v-slot=\"row\">\r\n                                {{row.s_num}}\r\n                            </template>\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"品牌\" field=\"supplier\">\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"出库数量\">\r\n                            <template v-slot=\"row\">\r\n                                <input v-model=\"row.outNum\">\r\n                            </template>\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"出库产品\">\r\n                            <template v-slot=\"row\">\r\n                                <product-select v-model=\"row.productId\" :model=\"row.epro\"></product-select>\r\n                            </template>\r\n                        </jxiaui-datagrid-item>\r\n                        <jxiaui-datagrid-item label=\"操作\">\r\n                            <template v-slot=\"row\">\r\n                                <button @click=\"out(row)\">出库</button>\r\n                            </template>\r\n                        </jxiaui-datagrid-item>\r\n                    </jxiaui-datagrid>\r\n                </td>\r\n\r\n            </tr>\r\n        </table>\r\n    </div>\r\n\r\n    <!-- 返回合同的弹出框 -->\r\n    <return-out-dialog ref=\"returnDialog\"></return-out-dialog>\r\n</div>";
        

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
            url: "warehouse/warehouse!listSaleProductToOut.do",
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
            if (!row.s_num) {
                row.s_num = 0;
            }
            let numOut = row.s_num;
            if (!numOut) {
                numOut = 0;
            }
            row.outNum = row.num - numOut;
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
                    alert("操作失败:" + data.msg);
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
                type: 'post',
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