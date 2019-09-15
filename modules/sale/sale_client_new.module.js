(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale_client_new', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {
            coname: null,
            share: '否',
            cozzxs: '私营有限公司',
            cokhjb: '***',
            cokhyh: 'UPS'
        }
    },
    mounted() {},
    methods: {
        sub() {
            let form = this.form;
            if (!form.coname) {
                alert("请输入客户名称!");
                return false;
            }

            if (!form.cotel) {
                alert("请您输入电话号码!");
                return false;
            }

            $.ajax({
                url: webRoot + "/client/client!add.do",
                type: 'post',
                data: form,
                success: function(data) {
                    if (data.success) {
                        if (window.opener) {
                            window.opener.location.reload();
                        }
                        window.close();
                    } else {
                        alert("操作失败！" + data.msg);
                    }
                },
                error: function(e) {
                    alert("操作异常！");
                }

            });
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