(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'warehouse-send-bill-edit-dialog',
    data() {
        return {
            id: null,
            showFlag: false,
            detail: {
                company: {},
                list: []
            }
        }
    },
    mounted() {
        this.fillCompanyList();
        this.fetchData();
    },
    updated() {},
    methods: {
        show(id) {
            this.id = id;
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        getUrl(uuid) {
            if (uuid) {
                return "/file_center/file!showPic.do?uuid=" + uuid;
            }
        },
        fetchData() {
            let vm = this;
            let id = this.id;
            if (!id) {
                return;
            }
            $.ajax({
                url: webRoot + '/warehouse/send!getSendBillDetail.do',
                data: {
                    id: id
                }
            }).done(res => {
                vm.detail = res;
            })
        },
        fillCompanyList: function() {
            let vm = this;
            $.ajax({
                url: webRoot + '/company!listAll.do'
            }).done(res => {
                vm.companyList = res;
            });
        },
        update() {
            let vm = this;
            $.ajax({
                url: 'send!updateSendBill.do',
                data: vm.detail
            }).done(res => {
                if (res.success) {
                    router.goRoute("send_bill_detail", { id: id });
                }
                vm.detail = res;
            })
        },
        changeCompany() {

            let companyList = this.companyList;
            for (let i = 0; i < companyList.length; i++) {
                let company = companyList[i];
                if (company.id == this.detail.company_id) {
                    this.detail.company = company;
                    break;
                }
            }
        },
        chooseSale() {
            OACommonUse.openSaleChooseDialog(function(data) {

                var saleId = data.id;

                $.ajax({
                    url: 'send!updateSendBillSale.do',
                    data: {
                        id: id,
                        saleId,
                        saleId
                    }
                }).done(function(res) {
                    if (res.success) {
                        alert("操作成功");
                        window.location.reload();
                    } else {
                        alert("操作失败：" + res.msg);
                    }
                })
                console.log(data);
            }, {
                url: webRoot + '/sale/sale!approvedList.do'
            });
        }
    },
    watch: {
        id() {
            this.fetchData();
        }
    },
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\">\r\n    <div>\r\n        <div style=\"text-align:right;font-size:16px;\">\r\n            <button @click=\"update\">确认修改</button>\r\n        </div>\r\n        <table id=\"detail\" class=\"table table-bordered\">\r\n            <tr>\r\n                <td>送货单号</td>\r\n                <td>{{detail.number}}</td>\r\n                <td>创建人</td>\r\n                <td>{{detail.man}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td>请选择公司</td>\r\n                <td><select v-model=\"detail.company_id\" @change=\"changeCompany\">\r\n                    <option v-for=\"c in companyList\" :value=\"c.id\">{{c.companyname}}</option>\r\n                </select></td>\r\n                <td>公司电话</td>\r\n                <td>{{detail.company.companytel}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td>公司传真</td>\r\n                <td>{{detail.company.companyfax}}</td>\r\n                <td>公司Logo</td>\r\n                <td><img alt=\"公司Logo\" :src=\"getUrl(detail.company.pic_id)\"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>销售单号</td>\r\n                <td>{{detail.sale_number}} <span class=\"choose-btn fa fa-ellipsis-h\" @click=\"chooseSale\"></span></td>\r\n                <td>客户名称</td>\r\n                <td>{{detail.coname}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td>客户电话</td>\r\n                <td>{{detail.co_tel}}</td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</jxiaui-dialog>"
return module.exports;})(), 

)
