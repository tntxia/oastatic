(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('finance_gathered', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.template = 'template/finance_gathered.html';
    exports.init = function() {

        let url = webRoot + "/finance/finance!listGathered.do";

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
                gatheringId: null
            },
            mounted() {
                this.loadData();
            },
            methods: {
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
                    this.loadData();
                    console.log("query,,,", this.sdate, this.edate);
                },
                goGathering(row) {
                    let dialog = dialogVue.getDialog("financeGatheredDialog");
                    dialog.setId(row.id);
                    dialog.show();
                }
            }
        });

        renderStatic();

        function renderStatic() {

            var param = $("#searchForm").getParamMap();

            $.ajax({
                url: webRoot + "/finance/finance!gatherStatist.do",
                type: 'post',
                data: param
            }).done(function(data) {
                $("#statistSpan").html("合同总金额：" + data.totalAll + " 出库总金额：" + data.stotalAll + " 退货总金额：" + data.rTotalAll + " 已收款：" + data.gatheredAll + " 欠款：" + data.leftAll);
            }).fail(function() {

            })
        }

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