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
})('sale/client_contact', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            let id = router.getParam("id");

let url = `${webRoot}/client/contact!list.do?pid=${id}`;

new Vue({
    el: '#app',
    data: {
        loading: false,
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        stasticLoading: false,
        departmentList: [],
        userList: [],
        form: {
            coname: null,
            follower: null
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return "#sale/client_view?id=" + row.clientid;
        },
        loadData() {
            let me = this;

            $.ajax({
                url: webRoot + "/department!list.do",
                type: 'post',
                success: function(data) {
                    let departmentList = [];

                    me.departmentList = departmentList;
                },
                dataType: 'json'
            });

            this.stasticLoading = true;
            $.ajax({
                url: webRoot + "/sale/sale!getSaleUserList.do",
                type: 'post',
                data: this.form
            }).done(function(data) {
                me.userList = data;
            }).fail(function() {
                me.stasticLoading = false;
            })
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            router.goRoute("sale/client_contact_new", { id });
        },
        del(id) {
            let me = this;
            $.ajax({
                url: webRoot + "/client/client!delContact.do",
                type: 'post',
                data: {
                    id: id
                },
                success: function(data) {
                    me.query();
                },
                error: function(e) {}
            });
        },
        back() {
            router.goRoute("sale/client_view", { id });
        }
    }
});
        };
        return module.exports;
    }

    
);