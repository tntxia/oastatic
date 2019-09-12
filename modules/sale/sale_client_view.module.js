(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale_client_view', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {}
    },
    mounted() {
        $.ajax({
            url: webRoot + '/client/client!detail.do',
            data: {
                id
            }
        }).done(res=> {
            this.form = res;
        })
    },
    methods: {
        del() {
            if (confirm("确实要删除吗？")) {
                $.ajax({
                    url: webRoot + '/client/client!del.do',
                    data: {
                        id: id
                    }
                }).done(res=> {
                    if (res.success) {
                        alert("操作成功");
                        if (window.opener) {
                            window.opener.location.reload();
                        }
                        window.close()
                    } else {
                        alert("操作失败");
                    }
                }).fail(e=> {
                    alert("操作异常");
                })
            }
        },
        update() {
            $.ajax({
                url: webRoot + '/client/client!update.do',
                data: this.form
            }).done(res=> {
                if (res.success) {
                    alert("操作成功");
                    if (window.opener) {
                        window.opener.location.reload();
                    }
                    window.close()
                } else {
                    alert("操作失败");
                }
            }).fail(e=> {
                alert("操作异常");
            })
        },
        viewContact() {
            let url = `${webRoot}/xclient/contact.mvc?coid=${id}`;
            window.open(url);
        },
        query() {
            let datagrid = this.$refs["gatheringTable"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            console.log("query,,,", this.sdate, this.edate);
        },
        goGathering(row) {
            let dialog = mainLayout.showDialog("financeGatheredDialog");
            dialog.setId(row.id);
            dialog.show();
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