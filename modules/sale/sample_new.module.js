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
})('sale/sample_new', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            new Vue({
    el: '#app',
    data: {
        form: {
            clientId: null,
            coname: null,
            co_number: null,
            coaddr: null,
            contact: null,
            contact_tel: null,
            share: '否',
            cozzxs: '私营有限公司',
            cokhjb: '***',
            cokhyh: 'UPS',
            delivery_terms: "UPS",
            delivery_date: null,
            fveight: 0,
            insurance: 0
        }
    },
    mounted() {},
    methods: {
        toChooseClient() {
            this.$refs.clientChooseDialog.show();
        },
        chooseClient(client) {
            let form = this.form;
            form.clientId = client.clientid;
            form.coname = client.coname;
            form.co_number = client.co_number;
            form.coaddr = client.coaddr;
        },
        toChooseContact() {
            this.$refs.clientContactChooseDialog.show();
        },
        chooseContact(contact) {
            let clientId = this.form.clientId;
            if (!clientId) {
                alert("请先选择客户");
                return;
            }
            let form = this.form;
            form.contact = contact.name;
            form.contact_tel = contact.tel;
        },
        check() {
            let form = this.form;
            if (!form.coname) {
                alert("请输入客户名称!");
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
                url: webRoot + "/sale/sample!addSample.do",
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
        back() {
            router.goRoute("sale/sample_list_draft");
        }
    }
});
        };
        return module.exports;
    }

    
);