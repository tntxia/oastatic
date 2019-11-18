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

        
        module.exports.template = null;
        

        exports.init = function() {
            let templateId = router.getParam("templateId");

new Vue({
    el: '#app',
    data: {
        form: {
            coname: null,
            co_number: null,
            lxr: null,
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

                    console.log(me.form);
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
                url: 'purchasing/supplier!list.do'
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