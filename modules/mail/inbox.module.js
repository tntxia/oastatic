(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('mail/inbox', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = true;
    exports.init = function() {
        let url = webRoot + "/mail!listMailIn.do";

new Vue({
    el: '#app',
    data: {
        loading: false,
        newMailCount: 0,
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        form: {
            year: '',
            month: '',
            coname: null,
            fpnum: null,
            sdate: null,
            edate: null,
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
        getUrl(row) {
            return webRoot + "/webmail/get-view.jsp?id=" + row.id
        },
        loadData() {
            let me = this;
            $.ajax({
                url: webRoot + "/mail!getToGetCount.do",
                type: 'post',
                success: function(data) {
                    me.newMailCount = data.count;
                }
            });
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.query();
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
        },
        newMail() {
            let mainLayout = webApp.layout;
            mainLayout.showDialog("mailNewDialog");
        },
        pushInHandling() {
            let datagrid = this.$refs["datagrid"];
            let selectedRows = datagrid.getSelectedRows();
            if (!selectedRows || !selectedRows.length) {
                alert("请选择你要放入待处理的邮件");
                return;
            }
            let ids = selectedRows.map(row => {
                return row.id;
            })
            $.ajax({
                url: webRoot + "/mail!pushInMailHandling.do",
                type: 'post',
                data: {
                    ids: ids.join(",")
                }
            }).done(res => {
                if (res.success) {
                    alert("操作成功");
                } else {
                    alert("操作失败:" + res.errorMsg);
                }
            })
            console.log("find selected", datagrid.getSelectedRows());

        },
        delSelected() {
            let datagrid = this.$refs["datagrid"];
            let selectedRows = datagrid.getSelectedRows();
            if (!selectedRows || !selectedRows.length) {
                alert("请选择你要删除的邮件");
                return;
            }
            let vm = this;
            let ids = selectedRows.map(row => {
                return row.id;
            })
            $.ajax({
                url: webRoot + "/mail!delInMail.do",
                type: 'post',
                data: {
                    ids: ids.join(",")
                }
            }).done(res => {
                if (res.success) {
                    alert("操作成功");
                    vm.query();
                } else {
                    alert("操作失败:" + res.errorMsg);
                }
            })
        }
    },

});
    };
    return module.exports;
});