(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale_client_contact_new', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        selectUrl: webRoot + '/client/client!listActivityTypes.do',
        form: {
            id: id,
            name: null,
            job: null,
            mr: '先生',
            email: null,
            iftx: '否'
        }
    },
    mounted() {
        $.ajax({
            url: webRoot + '/client/client!detail.do',
            data: {
                id
            }
        }).done(res => {
            this.form.coname = res.coname;
        })
    },
    methods: {
        // 查看客户跟进
        viewFollow() {
            router.goRoute("sale_client_follow", { id });
        },
        viewContact() {
            let url = `${webRoot}/xclient/contact.mvc?coid=${id}`;
            window.open(url);
        },
        viewlist() {
            router.goRoute("sale_client_list");
        },
        sub() {
            $.ajax({
                url: webRoot + '/client/client!addContact.do',
                data: this.form,
                type: 'post',
                success: function(data) {
                    if (data.success) {
                        router.goRoute("sale_client_contact", { id });
                    } else {
                        alert("操作失败");
                    }
                },
                error: function() {
                    alert("操作失败");
                }
            });
        },
        back() {
            router.goRoute("sale_client_contact", { id });
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