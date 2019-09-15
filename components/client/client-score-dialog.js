(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('client-score-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    data() {
        return {
            showFlag: false,
            id: null,
            callback: null,
            form: {
                id: null,
                rfq: null,
                gmjl: null,
                fk: null,
                th: null
            }
        }
    },
    mounted() {
        this.init();
    },
    updated() {},
    methods: {
        init() {
            this.$http.post(webRoot + "/finance/finance!getFinanceAccountList.do").then(res => {
                this.subjectList = res.body;
            })
        },
        setCallback(callback) {
            this.callback = callback;
        },
        setId(id) {
            this.form.id = id;
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        score() {
            let form = this.form;
            if (!form.rfq || !form.gmjl || !form.fk || !form.th) {
                alert("请完成所有的评分项");
                return;
            }
            $.ajax({
                url: webRoot + '/client/client!doScore.do',
                data: this.form,
                type: 'post',
                success: function(data) {
                    if (data.success) {
                        if (window.opener) {
                            window.opener.location.reload();
                        }
                        window.close();
                    } else {
                        alert("操作失败");
                    }
                }
            });
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :width=\"1000\">\r\n\r\n    <div>\r\n        <button @click=\"score\">评分</button>\r\n    </div>\r\n    <div id=\"score-div\" class=\"jxiaui-table-form\" style=\"padding: 10px;\">\r\n        <table height=8 width=\"100%\" id=\"score-table\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n            <tr>\r\n                <th>\r\n                    询价单(RFQs)回应速度\r\n                </th>\r\n                <td>\r\n                    <jxiaui-radio-group v-model=\"form.rfq\">\r\n                        <jxiaui-radio-group-item value=\"5\" label=\"5- 极好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"4\" label=\"4- 好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"3\" label=\"3- 一般\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"2\" label=\"2- 差\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"1\" label=\"1- 极差\"></jxiaui-radio-group-item>\r\n                    </jxiaui-radio-group>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>\r\n                    购买机率\r\n                </th>\r\n                <td>\r\n                    <jxiaui-radio-group v-model=\"form.gmjl\">\r\n                        <jxiaui-radio-group-item value=\"5\" label=\"5- 极好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"4\" label=\"4- 好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"3\" label=\"3- 一般\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"2\" label=\"2- 差\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"1\" label=\"1- 极差\"></jxiaui-radio-group-item>\r\n                    </jxiaui-radio-group>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>\r\n                    付款情况\r\n                </th>\r\n                <td>\r\n                    <jxiaui-radio-group v-model=\"form.fk\">\r\n                        <jxiaui-radio-group-item value=\"5\" label=\"5- 极好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"4\" label=\"4- 好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"3\" label=\"3- 一般\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"2\" label=\"2- 差\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"1\" label=\"1- 极差\"></jxiaui-radio-group-item>\r\n                    </jxiaui-radio-group>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>\r\n                    退货速度\r\n                </th>\r\n                <td>\r\n                    <jxiaui-radio-group v-model=\"form.th\">\r\n                        <jxiaui-radio-group-item value=\"5\" label=\"5- 极好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"4\" label=\"4- 好\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"3\" label=\"3- 一般\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"2\" label=\"2- 差\"></jxiaui-radio-group-item>\r\n                        <jxiaui-radio-group-item value=\"1\" label=\"1- 极差\"></jxiaui-radio-group-item>\r\n                    </jxiaui-radio-group>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>评论：</th>\r\n                <td>\r\n                    <textarea name=\"remark\" style=\"width:100%\"></textarea>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)