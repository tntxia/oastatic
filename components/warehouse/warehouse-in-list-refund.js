(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('warehouse-in-list-refund', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    data() {
        return {
            form: {
                number: null,
                coname: null,
                model: null,
                supplier: null
            },
            dataset: {
                url: webRoot + '/purchasing/purchasing!listRefund.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + "/warehouse/in/supplier-refund-view.mvc?id=" + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        采购编号：<input v-model=\"form.number\"> 供 应 商：<input v-model=\"form.coname\"> 型号：\r\n        <input v-model=\"form.model\"> 品牌：\r\n        <input v-model=\"form.supplier\">\r\n        <button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"退货编号\">\r\n                <template v-slot=\"row\">\r\n                        <a :href=\"getUrl(row)\" target=\"_blank\">{{row.number}}</a>\r\n                    </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"供应商名称\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"责任人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"当前状态\" field=\"state\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>"
        return module.exports;
    })(),

)