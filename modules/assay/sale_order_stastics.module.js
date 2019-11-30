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
})('assay/sale_order_stastics', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        <h1>销售合同统计</h1>\r\n    </div>\r\n    <div>\r\n        <span>合同号</span><input name=\"form.fpnum\" size=\"10\">\r\n        <span>销售人员</span>\r\n        <saleman-select v-model=\"form.man\"></saleman-select>\r\n\r\n        <input v-model=\"form.coname\" type=\"text\" size=\"10\"> 品牌\r\n        <input v-model=\"form.supplier\" type=\"text\" size=\"10\">\r\n        <span>型号</span><input v-model=\"form.model\" type=\"text\" size=\"10\">\r\n        <span>起始日期:</span>\r\n        <jxiaui-datepicker v-model=\"form.sdate\"></jxiaui-datepicker>\r\n        <span>终止日期:</span>\r\n        <jxiaui-datepicker v-model=\"form.edate\"></jxiaui-datepicker>\r\n        <button @click=\"sub\">统计</button>\r\n    </div>\r\n\r\n    <div>\r\n        <jxiaui-datagrid ref=\"datagrid\" :dataset=\"dataset\" :load-data-when-init=\"false\">\r\n            <jxiaui-datagrid-item label=\"#\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同号\" field=\"number\">\r\n                <template v-slot=\"row\">\r\n                    <a :href=\"getUrl(row.id)\" target=\"_blank\">{{row.number}}</a>\r\n\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同金额\" field=\"totalPrice\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"暂估成本\" field=\"totalPurchasePrice\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"暂估利润\" field=\"totalProfit\">\r\n                <template v-slot=\"row\">\r\n                    {{getTotalProfit(row)}}\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"发货成本\" field=\"totalSendPurchasePrice\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"开票金额\" field=\"iman\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"回款金额\" field=\"sk\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"冲销金额\" field=\"sk\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"销售员\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户合同号\" field=\"sub\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"签订日期\" field=\"datetime\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"发货金额\" field=\"totalSendPrice\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n        <div style=\"position:fixed;bottom:0;right:30px;background:white;padding:20px;border:1px solid #ccc;\">\r\n            累计销售金额:\r\n            <div v-for=\"t in totals\">{{t.money}}:{{t.ys}}</div>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
        

        exports.init = function() {
            var vue = new Vue({
    el: '#app',
    data: {
        rows: [],
        totals: [],
        count: 0,
        page: 1,
        pageJump: 1,
        totalPage: 0,
        userList: [],
        form: {
            fpnum: null,
            man: '',
            coname: null,
            supplier: null,
            model: null,
            sdate: null,
            edate: null
        },
        dataset: {
            url: "assay/assay!getStatistic.do",
            method: 'post',
            pageSize: 20
        }
    },
    created: function() {

    },
    methods: {

        getUrl: function(id) {
            return "sale/ddgl/detailAudited.mvc?id=" + id;
        },
        getTotalProfit(row) {
            let totalPrice = row.totalPrice;
            let totalPurchasePrice = row.totalPurchasePrice;
            if (!totalPrice) {
                totalPrice = 0;
            }
            if (!totalPurchasePrice) {
                totalPurchasePrice = 0;
            }
            return totalPrice - totalPurchasePrice;
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        fetchData: function() {
            this.query();
            let param = this.form;
            $.ajax({
                url: 'assay/assay!getStatisticTotal.do',
                type: 'post',
                data: param,
                success: function(data) {
                    Vue.set(vue, "totals", data);
                },
                error: function(e) {
                    alert("获取信息异常");
                }
            });

        },
        sub() {
            vue.fetchData();
        }
    }
});
        };
        return module.exports;
    }

    
);