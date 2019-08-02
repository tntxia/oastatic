(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'warehouse-send-bill-add-dialog',
    data() {
        return {
            showFlag: false,
            company_id: null,
            sale_number: null,
            companyList: [],
            sale: null,
            company: {

            },
            callbackFun: null
        }
    },
    mounted() {
        this.fetchData();
    },
    updated() {},
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        setCallbackFunc(func) {
            this.callbackFun = func;
        },
        setSale(sale) {
            this.sale = sale;
            this.sale_number = sale.number;
            this.saleId = sale.id;
        },
        changeCompany() {

            let companyList = this.companyList;
            for (let i = 0; i < companyList.length; i++) {
                let company = companyList[i];
                if (company.id == this.company_id) {
                    this.company = company;
                    break;
                }
            }
        },
        getUrl(picId) {
            if (picId)
                return "/file_center/file!showPic.do?uuid=" + picId
        },
        fetchData() {
            let vm = this;
            $.ajax({
                url: webRoot + '/company!listAll.do'
            }).done(function(data) {
                vm.companyList = data;
            }).fail(function() {

            })
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
                url: webRoot + '/warehouse/send!createSendBill.do',
                type: 'post',
                data: {
                    company,
                    saleId
                }
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    vm.hide();
                    if (vm.callbackFun) {
                        vm.callbackFun();
                    }
                } else {
                    alert("操作失败：" + res.msg);
                }
            })
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\">\r\n    <div>\r\n        <div id=\"vue\">\r\n            <div id=\"company-info\">\r\n                <div>请选择公司：\r\n                    <select name=\"company\" v-model=\"company_id\" @change=\"changeCompany\">\r\n\t\t\t\t\t\t<option v-for=\"c in companyList\" :value=\"c.id\">{{c.companyname}}</option>\r\n\t\t\t\t\t</select>\r\n                </div>\r\n                <div><img alt=\"\" :src=\"getUrl(company.pic_id)\">{{company.picpath}}</div>\r\n                <div><b>公司名称：</b>{{company.companyname}} <b>公司电话：</b>{{company.companytel}}</div>\r\n                <div><b>公司传真：</b>{{company.companyfax}}</div>\r\n            </div>\r\n            <div>\r\n                <input v-model=\"saleId\" type=\"hidden\"> 销售单号: <input v-model=\"sale_number\" readonly=\"readonly\">\r\n                <span class=\"choose-btn fa fa-ellipsis-h\"></span>\r\n            </div>\r\n            <div>\r\n                <button @click=\"add\">增加送票单</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</jxiaui-dialog>"
return module.exports;})(), 

)
