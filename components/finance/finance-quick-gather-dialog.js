(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('finance-quick-gather-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    data() {
        return {
            showFlag: false,
            ids: null,
            gatheringList: [],
            subjectList: [],
            callback: null
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
        setGatheringList(list) {
            list.forEach(g => {
                g.subject = this.subjectList[0].name;
                let total = g.total;
                let smoney = g.smoney;
                g.toGather = (total - smoney) + "";
            })
            this.gatheringList = list;
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        gather() {
            let gatheringList = this.gatheringList;
            if (!gatheringList || !gatheringList.length) {
                alert("请选择你要收款的项");
                return;
            }
            let total = 0;
            this.gatheringList.forEach(g => {
                let toGather = parseFloat(g.toGather);
                total += toGather;
            });
            if (confirm("是否确认收款，收款总金额：" + total)) {
                this.$http.post(webRoot + "/finance/finance!quickGather.do",
                    this.gatheringList).then(res => {
                    res = res.body;
                    if (res.success) {
                        this.hide();
                        if (this.callback) {
                            this.callback();
                        }
                    } else {
                        alert("收款失败");
                    }

                })
            }

        }
    },
    watch: {
        id() {
            this.fetchData();
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :width=\"1000\">\r\n    <div style=\"padding: 10px;\">\r\n        <button @click=\"gather\">全部收款</button>\r\n    </div>\r\n\r\n    <div class=\"jxiaui-table-form\" style=\"padding: 10px;\">\r\n        <table class=\"jxiaui-table-form-table\">\r\n            <tr v-for=\"g in gatheringList\">\r\n                <th>销售单号</th>\r\n                <td>{{g.orderform}}</td>\r\n                <th>票据号</th>\r\n                <td><input v-model=\"g.remark\"></td>\r\n                <th>客户名称</th>\r\n                <td>{{g.coname}}</td>\r\n                <th>金额</th>\r\n                <td><input v-model=\"g.toGather\"></td>\r\n                <th>科目名称</th>\r\n                <td>\r\n                    <select v-model=\"g.subject\">\r\n                        <option v-for=\"s in subjectList\">{{s.name}}</option>\r\n                    </select>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)