(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('client-contact-choose-dialog', arguments[i]);
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
            coId: null,
            dataset: {
                url: webRoot + '/client/client!getContactList.do',
                method: 'post',
                params: {
                    coId: null
                }
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        init() {
            this.$http.post(webRoot + "/finance/finance!getFinanceAccountList.do").then(res => {
                this.subjectList = res.body;
            })
        },
        setCoId(coId) {
            this.dataset.params.coId = coId;
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
        choose(row) {
            if (this.callback) {
                this.callback(row);
            }
            this.hide();
        },
        query() {
            debugger
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams({
                coId: coId,
            });
            datagrid.loadData();
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :width=\"1000\">\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"联系人\" field=\"name\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"先生/小姐\" field=\"mr\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"职位\" field=\"job\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"办公室电话\" field=\"tel\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"手机\" field=\"waptel\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"选择\">\r\n                <template v-slot=\"row\">\r\n                    <button @click=\"choose(row)\">选择</button>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)