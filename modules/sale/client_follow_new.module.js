(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale/client_follow_new', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = false;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        selectUrl: webRoot + '/client/client!listActivityTypes.do',
        form: {
            id: id,
            actypes: null,
            coname: null,
            c_nr: null,
            remark: null,
            iftx: '否'
        }
    },
    mounted() {
        $.ajax({
            url: webRoot + '/client/client!detail.do',
            data: {
                id
            }
        }).done(res=> {
            this.form.coname = res.coname;
        })
    },
    methods: {
        addConversation() {
            $.ajax({
                url: webRoot + "/client/client!addClientFollow.do",
                data: this.form
            }).done(res=> {
                if (res.success) {
                    alert("操作成功");
                    router.goRoute("sale_client_follow", {id});
                }else {
                    alert("操作失败");
                }
            })
        },
        // 查看客户跟进
        viewFollow() {
            router.goRoute("sale_client_follow", {id});
        },
        viewContact() {
            let url = `${webRoot}/xclient/contact.mvc?coid=${id}`;
            window.open(url);
        },
        viewlist() {
            router.goRoute("sale_client_list");
        },
        query() {
            let datagrid = this.$refs["gatheringTable"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            console.log("query,,,", this.sdate, this.edate);
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