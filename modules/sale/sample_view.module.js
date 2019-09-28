(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale/sample_view', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = true;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {},
        dataset: {
            url: webRoot + '/sale/sample!listPro.do',
            params: {
                id: id
            }
        },
        total: 0,
    },
    mounted() {
        $.ajax({
            url: webRoot + '/sale/sample!detail.do',
            data: {
                id
            }
        }).done(res => {
            this.form = res;
        });
    },
    methods: {
        getRowTotal(row) {
            return row.num * row.salejg;
        },
        delRow(row) {
            if (confirm("删除后无法恢复，是否确定删除？")) {
                let me = this;
                $.ajax({
                    url: webRoot + "/sale/sample!delPro.do",
                    type: 'post',
                    data: {
                        id: row.id
                    },
                    success: function(data) {
                        if (data.success) {
                            me.query();
                        } else {
                            alert("操作失败！" + data.msg);
                        }
                    },
                    error: function(e) {
                        alert("操作异常！");
                    }
                });
            }
        },
        toEdit() {
            window.open(webRoot + "/sale/ypgl/editdd.jsp?id=" + id);
        },
        toAdd() {
            window.open(webRoot + "/sale/ypgl/pronew.mvc?ddid=" + id);
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.loadData();
        },
        check() {
            return true;
        },
        sub() {
            if (!this.check()) {
                return;
            }
            let me = this;
            let form = this.form;
            $.ajax({
                url: webRoot + "/sale/sample!toAudit.do",
                type: 'post',
                data: form,
                success: function(data) {
                    if (data.success) {
                        me.back();
                    } else {
                        alert("操作失败！" + data.msg);
                    }
                },
                error: function(e) {
                    alert("操作异常！");
                }

            });
        },
        back() {
            router.goRoute("sale/sample_list_draft");
        }
    }
});
    };
    return module.exports;
});