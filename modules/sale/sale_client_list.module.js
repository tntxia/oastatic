(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale_client_list', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let url = webRoot + "/client/client!list.do";

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
        },
        gatheringId: null,
        totalAll: null,
        stotalAll: null,
        rTotalAll: null,
        gatheredAll: null,
        leftAll: null
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return "#sale_client_view?id=" + row.clientid;
        },
        loadData() {
            let me = this;

            $.ajax({
                url: webRoot + "/department!list.do",
                type: 'post',
                success: function(data) {
                    let departmentList = [];
                    $.each(data, function(i, r) {
                        departmentList.push(r.departname);
                    });
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
            return router.goRoute("sale_client_new");
        },
        exportData() {
            var param = this.form;
            param.type = "2";
            $.ajax({
                url: webRoot + "/client/client!export.do",
                type: 'post',
                data: param,
                success: function(data) {
                    if (data.success) {
                        window.open("/ReportCenter/view.mvc?id=" + data.uuid);
                    } else {
                        alert("操作失败：" + data.msg);
                    }
                },
                error: function(e) {

                }
            });
        }
    }
});
    };
    return module.exports;
});