(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'sale-approved-choose-dialog',
    data() {
        return {
            showFlag: false,
            title: "请选择销售订单",
            company_id: null,
            sale_number: null,
            companyList: [],
            dataset: {
                url: webRoot + '/sale/sale!approvedList.do',
                method: 'post'
            },
            callbackFun: null
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        setTitle(title) {
            this.title = title;
        },
        setCallbackFun(func) {
            this.callbackFun = func;
        },
        handleChoose(row) {
            if (this.callbackFun) {
                this.callbackFun(row);
            }
            this.hide();
        },
        chooseSale() {
            let vm = this;
            OACommonUse.openSaleChooseDialog(function(data) {
                vm.sale_number = data.number;
                vm.saleId = data.id;
            }, {
                url: webRoot + '/sale/sale!approvedList.do'
            });
        },
        add() {
            let vm = this;
            let company = vm.company_id;
            if (!company) {
                alert("请选择送货单的公司");
                return;
            }
            let saleId = vm.saleId;
            if (!saleId) {
                alert("请选择销售订单");
                return;
            }
            $.ajax({
                url: 'send!createSendBill.do',
                type: 'post',
                data: {
                    company,
                    saleId
                }
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    router.goRoute("send_bill_list");
                } else {
                    alert("操作失败：" + res.msg);
                }
            })
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :title=\"title\">\r\n    <div id=\"searchSaleForm\">\r\n        销售单号：<input name=\"number\"><button id=\"chooseSaleSearchBtn\">查询</button>\r\n    </div>\r\n    <div id=\"chooseSaleDiv\">\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a href=\"javascript:void(0)\" @click=\"handleChoose(row)\">{{row.number}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"含增值税率\" field=\"item\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"发货日期\" field=\"send_date\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"当前状态\" field=\"state\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n</jxiaui-dialog>"
return module.exports;})(), 

)
