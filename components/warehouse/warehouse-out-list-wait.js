(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('warehouse-out-list-wait', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    data() {
        return {
            form: {
                epro: null,
                number: null,
                coname: null,
                model: null,
                epro: null
            },
            dataset: {
                url: webRoot + '/warehouse/warehouse!waitOutList.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + '/warehouse/out/operate.mvc?id=' + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        toAdd() {
            window.open(webRoot + '/warehouse/in/new.mvc', '_blank');
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        <span>型号： </span><input v-model=\"form.epro\">\r\n        <span>客户名称：</span><input v-model=\"form.coname\">\r\n        <span>负责人：</span><input v-model=\"form.man\">\r\n        <span>销售合同号：</span><input v-model=\"form.number\">\r\n        <span>发货时间：</span><input v-model=\"form.number\">\r\n        <button @click=\"query\">查询</button>\r\n        <button @click=\"toAdd\">新增</button>\r\n\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n                    <a :href=\"getUrl(row)\" target=\"_blank\">{{row.number}}</a>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"公司合同号\" field=\"sub\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"申请人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"发货日期\" field=\"send_date\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>"
        return module.exports;
    })(),

)