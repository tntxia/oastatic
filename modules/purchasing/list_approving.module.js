(function(name, moduleFun) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    let module = moduleFun();
    if (arguments.length > 2) {
        let components = Object.create(null);
        for (let i = 2; i < arguments.length; i++) {
            let name = arguments[i];
            i++;
            let func = arguments[i];
            if (!func) {
                continue;
            }
            let component = func();
            components[name] = component;
        }
        module.components = components;
    }

    window.modules[name] = module;
})('purchasing/list_approving', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        型号：<input v-model=\"form.epro\"> 品牌：\r\n        <brand-select v-model=\"form.supplier\"></brand-select>\r\n        <button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\">{{row.number}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"供应商\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\">{{row.coname}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"销售合同号\" field=\"sub\">\r\n            </jxiaui-datagrid-item>\r\n\r\n            <jxiaui-datagrid-item label=\"货币\" field=\"money\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"采购金额\" field=\"totalPrice\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"运费\" field=\"pay_je\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"采购方向\" field=\"senddate\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"责任人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"状态\" field=\"l_spqk\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"日期\" field=\"datetime\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n</div>";
        

        exports.init = function() {
            let url = webRoot + "/purchasing/purchasing!listToAudit.do";
new Vue({
    el: '#app',
    data: {
        loading: false,
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        stasticLoading: false,
        brandList: [],
        form: {
            epro: null,
            supplier: ''
        },
        gatheringId: null,
        totalAll: null,
        stotalAll: null,
        rTotalAll: null,
        gatheredAll: null,
        leftAll: null
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return "#purchasing/view_approving?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        }
    }
});
        };
        return module.exports;
    }

    
);