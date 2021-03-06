(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('finance_gathered', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let url = webRoot + "/finance/finance!listGathered.do";

        new Vue({
            el: '#gathering-container',
            data: {
                dataset: {
                    url: url,
                    method: 'post',
                    pageSize: 50
                },
                form: {
                    coname: null,
                    fpnum: null,
                    sdate: null,
                    edate: null,
                }
            },
            mounted() {},
            methods: {
                query() {
                    let datagrid = this.$refs["gatheringTable"];
                    datagrid.setParams(this.form);
                    datagrid.loadData();
                    console.log("query,,,", this.sdate, this.edate);
                },
                goGathering(row) {
                    let mainLayout = webApp.layout;
                    let dialog = mainLayout.showDialog("financeGatheredDialog");
                    dialog.setId(row.id);
                }
            }
        });

        $("#exportBtn").click(function() {

            http.post({
                url: webRoot + "/finance/finance!exportToGather.do"
            }).then(data => {
                if (data.success) {
                    window.open("/ReportCenter/view.mvc?id=" + data.uuid);
                } else {
                    alert("操作失败：" + data.msg);
                }

            }, e => {
                alert("操作异常");
            })

        });
    };
    return module.exports;
});