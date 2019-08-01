(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('mail_inbox', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
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
                    let datagrid = this.$refs["gatheringTable"];
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