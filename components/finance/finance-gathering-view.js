(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'finance-gathering-view',
    props: ['id'],
    data() {
        return {
            showFlag: false,
            showNoteFlag: false,
            noteValue: '',
            orderform: null,
            custno: null,
            total: null,
            ymoney: null,
            smoney: null,
            bank: null,
            coname: null,
            co_number: null,
            yjskdate: null,
            sjdate: null,
            sjskdate: null,
            mode: null,
            rate: null,
            i_man: null,
            sendcompany: null,
            remark: null,
            saleman: null,
            sale_dept: null,
            priceTotal: {},
            note: null,
            yjskdate: null,
            sjdate: null,
            sjskdate: null,
            rate: null,
            i_man: null,
            mode: null,
            bankaccounts: null,
            remark: null,
            proList: [],
            needGather: false
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
            router.goRoute("finance_gathering");
        },
        fetchData: function() {

            var vm = this;
            let id = this.id;

            if (!id) {
                return;
            }
            $.ajax({
                url: webRoot + "/finance/finance!getGatheringDataById.do",
                data: {
                    id
                }
            }).done(function(data) {
            	if (data.states=="待收款") {
            		vm.needGather = true;
            	}
                vm.orderform = data.orderform;
                vm.custno = data.custno;
                vm.smoney = data.smoney;
                vm.total = data.total;
                vm.ymoney = data.ymoney;
                vm.bank = data.bank;
                vm.coname = data.coname;
                vm.co_number = data.co_number;
                vm.note = data.note;
                vm.yjskdate = data.yjskdate;
                vm.sjdate = data.sjdate;
                vm.sjskdate = data.sjskdate;
                vm.rate = data.rate;
                vm.i_man = data.i_man;
                vm.sendcompany = data.sendcompany;
                vm.mode = data.mode;
                vm.bankaccounts = data.bankaccounts;
                vm.remark = data.remark;
                vm.proList = data.proList;
                vm.priceTotal = data.priceTotal;
            })
            console.log("fetchData");
        },
        editInvoiceBtn: function() {
            window.open("editTax.mvc?id=" + this.id);
        },
        finishGathering() {
            $.ajax({
                url: webRoot + "/finance/finance!markGatheringFinish.do",
                type: 'post',
                data: {
                    id: this.id
                }
            }).done(function(data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert("操作失败");
                }
            }).fail(function() {
                alert("操作异常");
            })

        },
        del() {
            if (confirm("是否确认将这个收款信息删除")) {
                $.ajax({
                    url: webRoot + "/finance/finance!delGathering.do",
                    type: 'post',
                    data: {
                        id: id
                    }
                }).done(function(data) {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        alert("操作失败");
                    }
                }).fail(function() {
                    alert("操作异常");
                })
            }

        },
        addCredit: function() {
            window.open("addCredit.mvc?id=" + this.id);
        },
        toNoteIt: function() {
            this.showNoteFlag = true;
        },
        cancelNote: function() {
            this.showNoteFlag = false;
        },
        noteIt: function() {
            var noteValue = this.noteValue;
            $.ajax({
                url: webRoot + "/finance/finance!comment.do",
                type: 'post',
                data: {
                    id: this.id,
                    noteValue: noteValue
                }
            }).done(function(data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert("操作失败");
                }
            }).fail(function() {
                alert("操作异常");
            })
        }

    },
    watch: {
        id() {
            this.fetchData();
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\">\r\n\t<div style=\"padding: 10px;\">\r\n\t\t<table height=8 width=\"100%\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n\r\n\t        <tr bgcolor=\"#d3d8eb\" height=\"5\">\r\n\t            <td width=\"17%\" bgcolor=\"#d3d8eb\">\r\n\t                <strong style=\"color:#213e9b\">收款信息 </strong>\r\n\t            </td>\r\n\t            <td colspan=\"3\" bgcolor=\"#d3d8eb\" align=\"right\">\r\n\t                <button @click=\"editInvoiceBtn\">填写发票</button>\r\n\t                <button v-if=\"needGather\" @click=\"finishGathering\">完成收款</button>\r\n\t                <button @click=\"hide\">返回</button>\r\n\t                <button @click=\"del\">删除</button>\r\n\t            </td>\r\n\t        </tr>\r\n\t\r\n\t        <tr>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">合同编号</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{orderform}}</font>&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">PO#</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{custno}}</font>\r\n\t            </td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td width=\"17%\" bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">实收金额</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{smoney }}</FONT>\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000080\">\r\n\t                </font>&nbsp;</td>\r\n\t            <td>&nbsp;</td>\r\n\t            <td>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\"> 合同金额</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\">{{priceTotal.orderTotal }}</font>&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\"> 运费金额</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\">{{bank }}</font>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td width=\"17%\" bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">客户名称</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\"> <a href=\"#\" @click=\"openCoView()\">{{coname }}</a></font>&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">客户类别</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\"> <a href=\"#\" @click=\"openCoView()\">{{co_number}}</a></font>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td width=\"17%\" bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">目标起运日</font>&nbsp;</td>\r\n\t            <td width=\"27%\">\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{yjskdate }}</font>&nbsp;</td>\r\n\t            <td width=\"17%\" bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">实际起运日</font>&nbsp;</td>\r\n\t            <td width=\"40%\">\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{sjdate }}</font>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td width=\"17%\" bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">预计收款日期</font>&nbsp;</td>\r\n\t            <td width=\"27%\">\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{sjskdate }}</font>&nbsp;</td>\r\n\t            <td width=\"17%\" height=\"15\" bgcolor=\"#e8ebf5\">\r\n\t                <FONT SIZE=\"2\">付款方式</font>&nbsp;</td>\r\n\t            <td width=\"40%\" height=\"15\">\r\n\t                <FONT SIZE=\"2\" COLOR=\"#000000\">{{mode}}</font>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td width=\"16%\" bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">币　　值</font>&nbsp;</td>\r\n\t            <td width=\"29%\">\r\n\t                <font size=\"2\" color=\"#000000\"></font>&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">是否已开票</td>\r\n\t            <td>{{bankaccounts }}</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">发　　票</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\" face=\"Arial, Helvetica, sans-serif\">{{rate }}</font>&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">开票金额</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\" face=\"Arial, Helvetica, sans-serif\">{{i_man }}</font>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td bgcolor=\"#e8ebf5\">开票日期&nbsp;</td>\r\n\t            <td>{{sendcompany}}&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">票据号</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\" face=\"Arial, Helvetica, sans-serif\">{{remark}}</font>&nbsp;</td>\r\n\t        </tr>\r\n\t        <tr>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">销 售 员</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\">{{saleman}}</font>&nbsp;</td>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">所在部门</font>&nbsp;</td>\r\n\t            <td>\r\n\t                <font size=\"2\" color=\"#000000\">{{sale_dept}}</font>&nbsp;</td>\r\n\t        </tr>\r\n\t\r\n\t        <tr>\r\n\t            <td bgcolor=\"#e8ebf5\">\r\n\t                <font size=\"2\">收款情况</font>&nbsp;</td>\r\n\t\r\n\t\r\n\t            <td colspan=\"3\"><span id=\"noteShow\">{{note}}</span>&nbsp;\r\n\t\r\n\t                <div v-if=\"showNoteFlag\">\r\n\t                    <select v-model=\"noteValue\">\r\n\t              <option value=\"\"></option>\r\n\t              <option value=\"已收款\">已收款</option>\r\n\t              <option value=\"未收款\">未收款</option>\r\n\t              <option value=\"收款中\">收款中</option>\r\n\t                <option value=\"部分收款\">部分收款</option>\r\n\t            </select>\r\n\t                    <button @click=\"noteIt\">确定</button><button @click=\"cancelNote\">取消</button>\r\n\t\r\n\t                </div>\r\n\t                <input v-if=\"!showNoteFlag\" id=\"noteItBut\" type=\"button\" value=\"评论\" @click=\"toNoteIt\">\r\n\t\r\n\t\r\n\t\r\n\t            </td>\r\n\t        </tr>\r\n\t    </table>\r\n\t    <br>\r\n\t    <table height=8 width=\"100%\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n\t        <tr bgcolor=\"#d3d8eb\">\r\n\t            <td width=\"227\">\r\n\t                <div align=\"left\">\r\n\t\r\n\t                    产品型号&nbsp;</div>\r\n\t            </td>\r\n\t            <td width=\"436\">\r\n\t                <div align=\"left\">\r\n\t                    <font size=\"2\">产品批号&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"119\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\">订单数量&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"119\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\">出货数量&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"110\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\">单价&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"111\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\">订单合计&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"111\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\">出货合计&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t        </tr>\r\n\t\r\n\t        <tr height=\"8\" v-for=\"pro in proList\">\r\n\t            <td width=\"227\" height=\"8\">\r\n\t                <div align=\"left\">{{pro.epro }} &nbsp;\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"436\" height=\"8\">\r\n\t                {{pro.cpro }}&nbsp;\r\n\t            </td>\r\n\t            <td width=\"119\" height=\"8\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\" color=\"#000000\">\r\n\t                        {{pro.num }}\r\n\t                    </font>\r\n\t                    <font size=\"2\">&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"119\" height=\"8\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\" color=\"#000000\">\r\n\t                        {{pro.s_num }} </font>\r\n\t                    <font size=\"2\">&nbsp;</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"110\" height=\"8\">\r\n\t                <div align=\"right\">\r\n\t                    <font size=\"2\" color=\"#000000\">\r\n\t                        {{pro.salejg }} {{pro.money }}\r\n\t\r\n\t                    </font>&nbsp;</div>\r\n\t            </td>\r\n\t            <td width=\"111\" height=\"8\">\r\n\t                <div align=\"right\">{{pro.num*pro.salejg }} &nbsp;\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"111\" height=\"8\">\r\n\t                <div align=\"right\">{{pro.s_num*pro.salejg }}&nbsp;</div>\r\n\t            </td>\r\n\t        </tr>\r\n\t\r\n\t\r\n\t        <tr>\r\n\t            <td colspan=\"5\">\r\n\t                <div align=\"right\">合计金额：</div>\r\n\t            </td>\r\n\t            <td>\r\n\t                <div align=\"right\">{{priceTotal.orderTotal }}</div>\r\n\t            </td>\r\n\t            <td>\r\n\t                <div align=\"right\">{{priceTotal.outTotal }}</div>\r\n\t            </td>\r\n\t        </tr>\r\n\t\r\n\t        <tr>\r\n\t            <td colspan=\"5\">\r\n\t                <div align=\"right\">\r\n\t                    <a @click=\"addCredit\">新增往来帐目</a>\r\n\t\r\n\t                    <font size=\"2\">欠款金额：</font>\r\n\t                </div>\r\n\t            </td>\r\n\t            <td width=\"111\">\r\n\t                <div align=\"right\">\r\n\t                    {{priceTotal.outTotal-smoney}}\r\n\t                </div>\r\n\t            </td>\r\n\t            <td>\r\n\t\r\n\t            </td>\r\n\t        </tr>\r\n\t    </table>\r\n\t</div>\r\n    \r\n</jxiaui-dialog>"
return module.exports;})(), 

)
