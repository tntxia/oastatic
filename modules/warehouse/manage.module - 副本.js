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
})('warehouse/manage', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            new Vue({
    el: '#app',
    data: {
        brandList: [],
        form: {
            model: null
        },
        dataset: {
            url: webRoot + "/warehouse/warehouse!warehouseList.do",
            method: 'post'
        }
    },
    components: this.components,
    mounted() {},
    methods: {
        add() {
            this.$refs.addDialog.show();
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        exports: function() {
            $.ajax({
                url: webRoot + '/warehouse/warehouse.do',
                data: {
                    method: 'export'
                },
                type: 'post',
                success: function(data) {
                    if (data.success) {
                        window.open("/ReportCenter/view.mvc?id=" + data.uuid);
                    } else {
                        alert("操作失败：" + data.msg);
                    }
                },
                dataType: "json"
            }).fail(e => {
                alert("操作异常");
            });
        },
        // 表格的链接地址
        getUrl(row) {
            return webRoot +
                "/warehouse/productView.mvc?id=" + row.id;
        },
        getProNumClass(row) {
            let val = row.pro_num;
            var pro_min_num = row.pro_min_num;
            var pro_max_num = row.pro_max_num;
            var color;
            if (pro_min_num) {
                if (val < pro_min_num) {
                    return 'not-enough-num';
                }
            }
            if (pro_max_num) {
                if (val > pro_max_num) {
                    return 'too-much-num';
                }
            }
        },
        // 查看待出库
        viewToOut(row) {
            BootstrapUtils.createDialog({
                id: 'showOutingModal',
                title: '查看待出库信息',
                template: webRoot + '/warehouse/template/viewComming.html',
                init: function() {

                    var target = this.find(".datagrid");
                    BootstrapUtils.createGrid({

                        target: target,
                        url: webRoot + "/warehouse/warehouse!viewToOut.do",
                        paramMap: {
                            model: row.pro_model
                        },
                        cols: [{
                            label: '销售订单编号',
                            field: 'number',
                            renderer: function(data) {
                                return "<a target='_blank' href='" + webRoot + "/sale/ddgl/detailAudited.mvc?id=" + data.id + "'>" + data.number + "</a>";
                            }
                        }, {
                            label: '供应商',
                            field: 'coname'
                        }, {
                            label: '交付时间',
                            field: 'send_date'
                        }, {
                            label: '待出库数量',
                            field: 'numLeft'
                        }]
                    })

                }
            });
            $("#showOutingModal").modal('show');

        },
        viewComming(row) {
            BootstrapUtils.createDialog({
                id: 'showCommingModal',
                title: '查看在途信息',
                template: webRoot + '/warehouse/template/viewComming.html',
                init: function() {

                    var target = this.find(".datagrid");

                    BootstrapUtils.createGrid({

                        target: target,
                        url: webRoot + "/warehouse/warehouse!viewComing.do",
                        paramMap: {
                            model: escape(row.pro_model)
                        },
                        cols: [{
                            label: '采购订单编号',
                            field: 'number',
                            renderer: function(data) {
                                return "<a target='_blank' href='" + webRoot + "/purchasing/detail/audited.mvc?id=" + data.id + "'>" + data.number + "</a>";
                            }
                        }, {
                            label: '供应商',
                            field: 'coname'
                        }, {
                            label: '交付时间',
                            field: 'pay_if'
                        }, {
                            label: '在途数量',
                            field: 'numLeft'
                        }]
                    })
                }
            });
            $("#showCommingModal").modal('show');
        }
    }
});
        };
        return module.exports;
    }

    ,
    'add-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    props: ['id'],
    data() {
        return {
            form: {}
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
                data: this.form,
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
module.exports.template = "<jxiaui-dialog ref=\"dialog\" title=\"增加仓库产品\">\r\n    <div class=\"jxiaui-table-form\">\r\n        <table style=\"width: 100%;\">\r\n            <tr>\r\n                <td>型号</td>\r\n                <td><input v-model=\"form.promodel\"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>批号</td>\r\n                <td><input v-model=\"form.pro_name\"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>数量</td>\r\n                <td><input v-model=\"form.num\">\r\n                    <unit-select></unit-select>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>备注</td>\r\n                <td><input v-model=\"form.pro_remark\"></td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <div style=\"text-align: right;padding: 5px 20px;\">\r\n        <button @click=\"sub\">增加</button>\r\n    </div>\r\n</jxiaui-dialog>";
        return module.exports;
    }
    
);