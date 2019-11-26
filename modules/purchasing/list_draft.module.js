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

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        型号：<input v-model=\"form.model\"> 客户名称:\r\n        <input v-model=\"form.coname\"> 合同编号:\r\n        <input v-model=\"form.number\"> 产品编号:\r\n        <input v-model=\"form.pro_number\"> 销售员:\r\n        <saleman-select v-model=\"form.man\"></saleman-select>\r\n        返回原因:\r\n        <select v-model=\"form.pStates\">\r\n\t\t\t\t<option>请选择</option>\r\n\t\t\t\t<option>A、退回重新编辑</option>\r\n\t\t\t\t<option>B、货物检验有质量问题</option>\r\n\t\t\t\t<option>C、货物不符合合同要求</option>\r\n\t\t\t\t<option>D、客户推迟订货时间</option>\r\n\t\t\t\t<option>E、供应商没有货</option>\r\n\t\t\t\t<option>F、没有收到货款</option>\r\n\t\t\t\t<option>G、其他</option>\r\n\t\t\t\t</select> 起始日期：\r\n        <input v-model=\"form.startdate\"> 终止日期:\r\n        <input v-model=\"form.enddate\">\r\n\r\n        <button @click=\"toAdd\">新增合同</button>\r\n        <button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\">{{row.number}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\">{{row.coname}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"付款方式\" field=\"mode\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"责任人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"返回原因\" field=\"pstates\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"创建时间\" field=\"datetime\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n    <choose-template-dialog ref=\"chooseTemplateDialog\" @choose=\"goAdd\"></choose-template-dialog>\r\n</div>";
        

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
            return "#purchasing/view?id=" + row.id
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