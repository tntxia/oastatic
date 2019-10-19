let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {},
        scores: {
            rfq: null
        }
    },
    mounted() {
        $.ajax({
            url: webRoot + '/client/client!detail.do',
            data: {
                id
            }
        }).done(res => {
            this.form = res;
        });
        $.ajax({
            url: webRoot + '/client/client!getScore.do',
            data: {
                id: id
            }
        }).done(data => {
            if (data.success) {
                this.scores = data.score;
            }
        });
    },
    methods: {
        del() {
            if (confirm("确实要删除吗？")) {
                $.ajax({
                    url: webRoot + '/client/client!del.do',
                    data: {
                        id: id
                    }
                }).done(res => {
                    if (res.success) {
                        alert("操作成功");
                        this.viewlist();
                    } else {
                        alert("操作失败");
                    }
                }).fail(e => {
                    alert("操作异常");
                })
            }
        },
        update() {
            $.ajax({
                url: webRoot + '/client/client!update.do',
                data: this.form
            }).done(res => {
                if (res.success) {
                    alert("操作成功");
                    if (window.opener) {
                        window.opener.location.reload();
                    }
                    window.close()
                } else {
                    alert("操作失败");
                }
            }).fail(e => {
                alert("操作异常");
            })
        },
        // 查看客户跟进
        viewFollow() {
            router.goRoute("sale/client_follow", { id });
        },
        // 查看客户联系人
        viewContact() {
            router.goRoute("sale/client_contact", { id });
        },
        viewInquiry() {
            window.open('sale/Inquiry/clientInquiry.mvc?coId=' + id);
        },
        viewProject() {
            router.goRoute("sale/client_project", { id });
        },
        viewQuote() {
            router.goRoute("sale/client_quote", { id });
        },
        viewOrder() {
            router.goRoute("sale/client_order", { id });
        },
        viewGather() {
            router.goRoute("sale/client_gather", { id });
        },
        viewDoc() {
            router.goRoute("sale/client_doc", { id });
        },
        viewlist() {
            router.goRoute("sale_client_list");
        },
        query() {
            let datagrid = this.$refs["gatheringTable"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            console.log("query,,,", this.sdate, this.edate);
        },
        score() {
            let mainLayout = webApp.layout;
            let dialog = mainLayout.showDialog("clientScoreDialog");
            dialog.setId(id);
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