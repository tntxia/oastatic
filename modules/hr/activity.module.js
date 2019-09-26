(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('hr/activity', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = false;
    exports.init = function() {
        let url = webRoot + "/activity!list.do";

let pid = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        loading: false,
        newMailCount: 0,
        dataset: {
            url: url,
            params: {
                pid: pid
            },
            method: 'post',
            pageSize: 50
        },
        form: {
            sdate: null,
            edate: null,
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        back() {
            router.goRoute("knowledge_type");
        },
        toAdd() {
            window.open("fvfg/ngz.jsp");
        },
        getUrl(row) {
            return "knowledgeView.mvc?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            this.loadData();
            console.log("query,,,", this.sdate, this.edate);
        },
        getMail() {
            $.ajax({
                url: webRoot + '/mail!getMail.do'
            }).done(function(data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert("操作失败：" + data.msg);
                }
            }).fail(function() {
                alert("操作异常");
            });
        }
    }
});
    };
    return module.exports;
});