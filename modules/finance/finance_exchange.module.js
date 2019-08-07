(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('finance_exchange', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        let url = webRoot + "/finance/finance!listExchange.do";

        new Vue({
            el: '#app',
            data: {
                loading: false,
                accountList: [],
                accountTypeList: [],
                dataset: {
                    url: url,
                    method: 'post',
                    pageSize: 50
                },
                form: {
                    km: '',
                    l_topic: '',
                    l_c_d: null,
                    l_menber: null,
                    xsdh: null,
                    remarks: null,
                    cgdh: null,
                    coname: null,
                    sdate: null,
                    edate: null,

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
                    return webRoot + "/system/money/w-view.jsp?id=" + row.id
                },
                loadData() {
                    let me = this;

                    $.ajax({
                        url: webRoot + "/finance/finance!listAllAccount.do",
                        type: 'post',
                        success: function(data) {
                            me.accountList = data;
                        },
                        dataType: 'json'
                    });

                    $.ajax({
                        url: webRoot + "/finance/finance!getAccountDetailTypeList.do",
                        type: 'post',
                        success: function(data) {
                            me.accountTypeList = data;
                        },
                        dataType: 'json'
                    });
                },
                toAdd() {
                    window.open('yksqt.jsp', '_blank', 'height=458, width=955, top=50, left=50, toolbar=yes, menubar=no, scrollbars=yes, resizable=yes,location=no, status=no');
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