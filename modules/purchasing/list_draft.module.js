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
})('purchasing/list_draft', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            let url = webRoot + "/purchasing/purchasing!list.do";
new Vue({
    el: '#app',
    data: {
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
        }
    },
    components: this.components,
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return "purchasing/detail.mvc?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            this.$refs.chooseTemplateDialog.show();
        },
        goAdd(templateId) {
            router.goRoute("purchasing/new", {
                templateId: templateId
            })
        }
    }
});
        };
        return module.exports;
    }

    ,
    'choose-template-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    data() {
        return {
            dataset: {
                url: 'template!list.do'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        choose: function(row) {
            this.$emit("choose", row.id);
            this.$refs.dialog.close();
        }
    }
}
module.exports.template = "<jxiaui-dialog ref=\"dialog\" title=\"新增采购合同 - 选择模板\">\r\n    <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n        <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"合同名称\" field=\"q_name\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"公司名称\" field=\"q_company\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"日期\" field=\"q_date\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"操作\">\r\n            <template v-slot=\"row\">\r\n                <button @click=\"choose(row)\">选择</button>\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n    </jxiaui-datagrid>\r\n</jxiaui-dialog>";
        return module.exports;
    }
    
);