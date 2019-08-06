(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('warehouse-out-list', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    data() {
        return {
            form: {
                coname: null,
                number: null,
                sub: null,
                startdate: null,
                enddate: null
            },
            dataset: {
                url: webRoot + "/warehouse/warehouse!getOutList.do",
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + "/warehouse/out/operate.mvc?id=" + row.ddid;
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
module.exports.template = "<div>\r\n    <div>\r\n        客户名称：<input v-model=\"form.coname\"> 型号：\r\n        <input v-model=\"form.model\"> 合同编号：\r\n        <input v-model=\"form.number\"> 公司合同号： <input v-model=\"form.sub\"> 公司合同号： <input v-model=\"form.sub\"> 起始日期:\r\n        <jxiaui-datepicker v-model=\"form.startdate\"></jxiaui-datepicker>\r\n        终止日期:\r\n        <jxiaui-datepicker v-model=\"form.enddate\"></jxiaui-datepicker>\r\n        <button @click=\"query\">查询</button>\r\n        <button @click=\"toAdd\">新增</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n                    <a :href=\"getUrl(row)\" target=\"_blank\">{{row.pro_fynum}}</a>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n\r\n            <jxiaui-datagrid-item label=\"公司合同号\" field=\"sub\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\" field=\"pro_coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"产品型号\" field=\"pro_model\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"税率\" field=\"pro_rate\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"单价\" field=\"salejg\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"数量\" field=\"pro_num\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"出库日期\" field=\"pro_datetime\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"出库人\" field=\"slinkman\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"销售员\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>"
        return module.exports;
    })(),

)