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
})('warehouse/in_manage', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            new Vue({
    el: '#container',
    components: this.components
})
        };
        return module.exports;
    }

    ,
    'list-wait',
    function() {
        var module = Object.create(null);
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
                url: webRoot + '/purchasing/purchasing!listWaitRk.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + "/warehouse/in/purchasingDetail.mvc?id=" + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        采购编号：<input v-model=\"form.number\"> 供 应 商：<input v-model=\"form.coname\"> 型号：\r\n        <input v-model=\"form.model\"> 品牌：\r\n        <input v-model=\"form.supplier\">\r\n        <button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"采购编号\">\r\n                <template v-slot=\"row\">\r\n                        <a :href=\"getUrl(row)\" target=\"_blank\">{{row.number}}</a>\r\n                    </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"供应商名称\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"入库仓库\" field=\"subck\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"责任人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"货期\" field=\"datetime\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>";
        return module.exports;
    }
    ,
    'list-sample',
    function() {
        var module = Object.create(null);
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
                url: 'warehouse/in!listSample.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + "/sale/ypgl/ryp-view.jsp?id=" + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        采购编号：<input v-model=\"form.number\"> 供 应 商：<input v-model=\"form.coname\"> 型号：\r\n        <input v-model=\"form.model\"> 品牌：\r\n        <input v-model=\"form.supplier\">\r\n        <button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"样品编号\">\r\n                <template v-slot=\"row\">\r\n                        <a :href=\"getUrl(row)\" target=\"_blank\">{{row.number}}</a>\r\n                    </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"运输方式\" field=\"delivery_terms\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"责任人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"登记日期\" field=\"datetime\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>";
        return module.exports;
    }
    
);