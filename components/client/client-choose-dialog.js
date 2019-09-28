(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('client-choose-dialog', arguments[i]);
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
            },
            dataset: {
                url: webRoot + '/client/client!list.do',
                method: 'post'
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
        choose(row) {
            if (this.callback) {
                this.callback(row);
            }
            this.hide();
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :width=\"1000\">\r\n    <div>\r\n        <span>客户名称:</span><input v-model=\"form.coname\"><button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"编号\" field=\"co_number\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"名称\" field=\"coname\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"电话\" field=\"cotel\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"地址\" field=\"coaddr\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"选择\">\r\n                <template v-slot=\"row\">\r\n                    <button @click=\"choose(row)\">选择</button>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)