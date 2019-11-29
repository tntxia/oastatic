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
})('assay/sale', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        <h1>销售合同统计</h1>\r\n    </div>\r\n    <div>\r\n        <span>合同号</span><input name=\"form.fpnum\" size=\"10\">\r\n        <span>销售人员</span>\r\n        <saleman-select v-model=\"form.man\"></saleman-select>\r\n\r\n        <input v-model=\"form.coname\" type=\"text\" size=\"10\"> 品牌\r\n        <input v-model=\"form.supplier\" type=\"text\" size=\"10\">\r\n        <span>型号</span><input v-model=\"form.model\" type=\"text\" size=\"10\">\r\n        <span>起始日期:</span>\r\n        <jxiaui-datepicker v-model=\"form.sdate\"></jxiaui-datepicker>\r\n        <span>终止日期:</span>\r\n        <jxiaui-datepicker v-model=\"form.edate\"></jxiaui-datepicker>\r\n        <button @click=\"sub\">统计</button>\r\n    </div>\r\n\r\n    <div id=\"res_table\">\r\n        <table class=\"table table-border table-hover\">\r\n            <thead>\r\n                <tr>\r\n                    <th>合同号</th>\r\n                    <th>客户名称</th>\r\n                    <th>合同金额</th>\r\n                    <th>暂估成本</th>\r\n                    <th>暂估利润</th>\r\n                    <th>发货成本</th>\r\n                    <th>开票金额</th>\r\n                    <th>回款金额</th>\r\n                    <th>冲销金额</th>\r\n                    <th>销售员</th>\r\n                    <th>客户合同号</th>\r\n                    <th>签订日期</th>\r\n                    <th>发货金额</th>\r\n                    <th>执行情况</th>\r\n                    <th>成本合计</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr v-for=\"r in rows\">\r\n                    <td><a :href=\"getUrl(r.id)\" target=\"_blank\">{{r.number}}</a></td>\r\n                    <td>{{r.coname}}</td>\r\n                    <td>{{r.totalPrice}}</td>\r\n                    <td>{{r.totalPurchasePrice}}</td>\r\n                    <td>{{r.totalPrice - r.totalPurchasePrice}}</td>\r\n                    <td>{{r.totalSendPurchasePrice}}</td>\r\n                    <td>{{r.iman}}</td>\r\n                    <td>{{r.sk}}</td>\r\n                    <td></td>\r\n                    <td>{{r.man}}</td>\r\n                    <td></td>\r\n                    <td>{{r.send_date}}</td>\r\n                    <td>{{r.totalSendPrice}}</td>\r\n                    <td>{{r.totalPrice - r.totalSendPrice}}</td>\r\n                    <td>{{r.totalSendPrice}}</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n        <div>\r\n            <span v-if=\"page<totalPage\"> <a @click=\"nextPage\">下一页</a></span>\r\n            <span v-if=\"page>1\"> <a @click=\"prePage\">上一页</a></span>\r\n            <input size=3 v-model=\"pageJump\">页\r\n            <button @click=\"jumpPage\">转页</button>共{{count}}销售合同累计，当前第{{page}}页,共{{totalPage}}页\r\n        </div>\r\n\r\n        <div style=\"position:fixed;bottom:0;right:30px;background:white;padding:20px;border:1px solid #ccc;\">\r\n            累计销售金额:\r\n            <div v-for=\"t in totals\">{{t.money}}:{{t.ys}}</div>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
        

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
        }
    },
    created: function() {

    },
    methods: {

        getUrl: function(id) {
            return webRoot + "/sale/ddgl/detailAudited.mvc?id=" + id;
        },

        nextPage: function() {
            this.page = this.page + 1;
            this.fetchData();
        },

        prePage: function() {
            this.page = this.page - 1;
            this.fetchData();
        },

        jumpPage: function() {
            this.page = this.pageJump;
            this.fetchData();
        },

        fetchData: function() {
            let param = this.form;
            param.page = this.page;

            $.ajax({
                url: webRoot + '/sale/sale!getStatistic.do',
                type: 'post',
                data: param,
                success: function(data) {
                    Vue.set(vue, "rows", data.rows);
                    Vue.set(vue, "count", data.totalAmount);
                    Vue.set(vue, "page", data.page);
                    Vue.set(vue, "pageJump", data.page);
                    Vue.set(vue, "totalPage", data.totalPage);
                },
                error: function(e) {
                    alert("获取信息异常");
                }
            });

            $.ajax({
                url: webRoot + '/sale/sale!getStatisticTotal.do',
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