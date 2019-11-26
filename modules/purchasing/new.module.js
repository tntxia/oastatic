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
})('purchasing/new', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        <button @click=\"sub\">增加</button>\r\n        <button @click=\"back\">返回</button>\r\n    </div>\r\n    <div class=\"jxiaui-table-form\">\r\n        <table style=\"width: 100%\">\r\n            <tr>\r\n                <th>销售合同号</th>\r\n                <td>\r\n                    <input v-model=\"form.sub\">\r\n                </td>\r\n                <th>供应商名称</th>\r\n                <td>\r\n                    <input v-model=\"form.coname\" readonly=\"readonly\"> <button @click=\"chooseSupplier\">选择</button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>供应商编码</th>\r\n                <td>\r\n                    <input v-model=\"form.co_number\" readonly=\"readonly\">\r\n                </td>\r\n                <th>供应商联系人</th>\r\n                <td>\r\n                    <input v-model=\"form.lxr\" readonly=\"readonly\">\r\n                    <button @click=\"chooseContact\">选择</button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>运费</th>\r\n                <td>\r\n                    <input v-model=\"form.pay_je\" type=\"number\">\r\n                </td>\r\n                <th>运费负担</th>\r\n                <td colspan=\"3\">\r\n                    <select v-model=\"form.freight\">\r\n                        <option value=\"\">请选择</option>\r\n                        <option>卖家支付</option>\r\n                        <option>买家支付</option>\r\n                    </select>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>付款方式</th>\r\n                <td>\r\n                    <payway-select v-model=\"form.payment\"></payway-select>\r\n                </td>\r\n                <th>发票</th>\r\n                <td colspan=\"3\">\r\n                    <tax-select v-model=\"form.rate\"></tax-select>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>收件人</th>\r\n                <td><input v-model=\"form.receiver\"></td>\r\n                <th>收件人电话</th>\r\n                <td><input v-model=\"form.receiver_tel\"></td>\r\n            </tr>\r\n            <tr>\r\n                <th>收件地址</th>\r\n                <td colspan=\"3\"><input v-model=\"form.receiver_addr\"></td>\r\n            </tr>\r\n            <tr>\r\n                <th>交货日期</th>\r\n                <td colspan=\"3\">\r\n                    <jxiaui-datepicker v-model=\"form.pay_if\"></jxiaui-datepicker>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>条款</th>\r\n                <td colspan=\"3\">\r\n                    <jxiaui-rich-editor v-model=\"form.tbyq\"></jxiaui-rich-editor>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>备注</th>\r\n                <td colspan=\"3\">\r\n                    <jxiaui-rich-editor v-model=\"form.remarks\"></jxiaui-rich-editor>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n    <choose-supplier-dialog ref=\"chooseSupplierDialog\" @choose=\"fillSupplierData\"></choose-supplier-dialog>\r\n    <choose-contact-dialog ref=\"chooseContactDialog\" @choose=\"fillContactData\" :supplier-number=\"form.co_number\"></choose-contact-dialog>\r\n</div>";
        

        exports.init = function() {
            let templateId = router.getParam("templateId");

new Vue({
    el: '#app',
    data: {
        form: {
            coname: null,
            co_number: null,
            lxr: null,
            rate: null,
            pay_je: 0,
            tbyq: null,
            remarks: null
        }
    },
    components: this.components,
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: 'template!detail.do',
                data: {
                    id: templateId
                }
            }).done(function(res) {
                if (res.success) {
                    let data = res.data;
                    me.form.tbyq = data.q_tk;
                    me.form.remarks = data.remark;
                    me.form.receiver = data.q_man;
                    me.form.receiver_tel = data.q_tel;
                    me.form.receiver_addr = data.q_addr;
                }
            }).fail(e => {
                alert("加载模板信息异常");
            });
        },
        back() {
            router.goRoute("purchasing/list_draft");
        },
        check() {
            let form = this.form;
            if (!form.coname) {
                alert("请输入供应商名称!");
                return false;
            }
            if (!form.co_number) {
                alert("请输入供应商编号!");
                return false;
            }
            return true;
        },
        sub() {
            if (!this.check()) {
                return;
            }
            let me = this;
            let form = this.form;
            $.ajax({
                url: "purchasing/purchasing!create.do",
                type: 'post',
                data: form
            }).done(function(data) {
                if (data.success) {
                    me.back();
                } else {
                    alert("操作失败！" + data.msg);
                }
            }).fail(function(e) {
                alert("操作异常！");
            });
        },
        chooseSupplier() {
            this.$refs.chooseSupplierDialog.show();
        },
        fillSupplierData(supplier) {
            this.form.coname = supplier.coname;
            this.form.supplierId = supplier.id;
            this.form.co_number = supplier.co_number;
        },
        chooseContact() {
            if (!this.form.co_number) {
                alert("请先选择供应商");
                return;
            }
            this.$refs.chooseContactDialog.show();
        },
        fillContactData(contact) {
            this.form.lxr = contact.name;
        },
    }
});
        };
        return module.exports;
    }

    ,
    'choose-supplier-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    data() {
        return {
            form: {
                coname: null
            },
            dataset: {
                url: 'purchasing/supplier!list.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        choose: function(row) {
            this.$refs.dialog.close();
            this.$emit("choose", row);
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
    }
}
module.exports.template = "<jxiaui-dialog ref=\"dialog\" title=\"选择供应商\">\r\n    <div>\r\n        <div>\r\n            <input v-model=\"form.coname\"> <button @click=\"query\">查询</button>\r\n        </div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"编号\" field=\"co_number\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"公司名称\" field=\"coname\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"操作\">\r\n                <template v-slot=\"row\">\r\n                                <button @click=\"choose(row)\">选择</button>\r\n                            </template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</jxiaui-dialog>";
        return module.exports;
    }
    ,
    'choose-contact-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    props: ['supplierNumber'],
    data() {
        return {
            form: {
                number: null
            },
            dataset: {
                url: 'purchasing/supplier!getContactList.do',
                params: {
                    number: this.supplierNumber
                }
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
            this.$nextTick(function() {
                this.query();
            });
        },
        choose: function(row) {
            this.$refs.dialog.close();
            this.$emit("choose", row);
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            if (!datagrid) {
                return;
            }
            if (this.form.number) {
                datagrid.query(this.form);
            }
        },
    },
    watch: {
        supplierNumber() {

            if (!this.supplierNumber) {
                return;
            }
            this.form.number = this.supplierNumber;
            this.query();
        }
    }
}
module.exports.template = "<jxiaui-dialog ref=\"dialog\" title=\"选择联系人\">\r\n    <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\" :load-data-when-init=\"false\">\r\n        <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"名称\" field=\"name\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"操作\">\r\n            <template v-slot=\"row\">\r\n                    <button @click=\"choose(row)\">选择</button>\r\n                </template>\r\n        </jxiaui-datagrid-item>\r\n    </jxiaui-datagrid>\r\n</jxiaui-dialog>";
        return module.exports;
    }
    
);