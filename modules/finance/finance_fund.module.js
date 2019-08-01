(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('finance_fund', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        let url = webRoot + "/bank!list.do";

        new Vue({
            el: '#gathering-container',
            data: {
                loading: false,
                dataset: {
                    url: url,
                    method: 'post',
                    pageSize: 50
                },
                departmentList: [],
                form: {
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
                    return webRoot + "/system/bank/view-hl.jsp?id=" + row.id
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
                },
                query() {
                    let datagrid = this.$refs["gatheringTable"];
                    datagrid.setParams(this.form);
                    datagrid.loadData();
                    this.loadData();
                    console.log("query,,,", this.sdate, this.edate);
                },
                goGathering(row) {
                    this.gatheringId = row.id;
                    this.$refs["view"].show();
                },
                exportGathering() {
                    $.ajax({
                        url: webRoot + "/finance/finance!exportToGather.do"
                    }).done(res => {
                        if (res.success) {
                            window.open("/ReportCenter/view.mvc?id=" + res.uuid);
                        } else {
                            alert("操作失败：" + data.msg);
                        }
                    }).fail(e => {
                        alert("操作异常");
                    });
                }
            }
        });


    };
    return module.exports;
});