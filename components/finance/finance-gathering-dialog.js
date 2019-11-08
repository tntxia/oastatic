(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('finance-gathering-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    data() {
        return {
            id: null,
            showFlag: false,
            showNoteFlag: false,
            noteValue: '',
            orderform: null,
            custno: null,
            total: null,
            total_out_house: null,
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
            needGather: false,
            subjectList: [],
            form: {
                id: null,
                remark: null,
                toGather: 0,
                subject: null
            },
            saleinfo: {
                man: null,
                proList: []
            }
        }
    },
    mounted() {
        this.initToGather();
        this.fetchData();
    },
    updated() {},
    methods: {
        setData(data) {
            for (let k in data) {
                this[k] = data[k];
            }
            this.form.id = data.id;
            this.initToGather();
            this.fetchData();
        },
        // 初始化待收款金额
        initToGather() {
            this.form.toGather = (this.total - this.smoney) + "";
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
            router.goRoute("finance_gathering");
        },
        fetchData: function() {

            this.$http.post(webRoot + "/finance/finance!getFinanceAccountList.do").then(res => {
                this.subjectList = res.body;
                if (this.subjectList && this.subjectList.length) {
                    this.form.subject = this.subjectList[0].name;
                }
            });

            var vm = this;
            let fyid = this.fyid;
            if (!fyid) {
                return;
            }
            $.ajax({
                url: webRoot + "/finance/finance!getSaleData.do",
                data: {
                    id: fyid
                }
            }).done(function(data) {
                vm.saleinfo = data.data;
                console.log(data);
            })
            console.log("fetchData");
        },
        editInvoiceBtn: function() {
            window.open(webRoot + "/finance/editTax.mvc?id=" + this.id);
        },
        gather() {
            if (confirm("是否确认收款，收款金额：" + this.form.toGather)) {
                this.$http.post(webRoot + "/finance/finance!gather.do", this.form).then(res => {
                    let data = res.body;
                    if (data.success) {
                        window.location.reload();
                    } else {
                        alert("操作失败");
                    }
                }, e => {
                    alert("操作异常");
                });
            }
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

    }
}
module.exports.template = "<jxiaui-dialog ref=\"dialog\" width=\"700\">\r\n    <div style=\"padding: 10px;\" class=\"jxiaui-table-form\">\r\n        <table style=\"width: 100%;\">\r\n            <tr>\r\n                <th>\r\n                    <strong style=\"color:#213e9b\">收款信息 </strong>\r\n                </th>\r\n                <td colspan=\"3\" style=\"text-align: right;\">\r\n                    <jxiaui-button @click=\"editInvoiceBtn\">填写发票</jxiaui-button>\r\n                    <jxiaui-button @click=\"gather\">收款</jxiaui-button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>合同编号</th>\r\n                <td>{{orderform}}</td>\r\n                <th>票据号</th>\r\n                <td><input v-model=\"form.remark\"></td>\r\n            </tr>\r\n            <tr>\r\n                <th>合同金额</th>\r\n                <td>{{total }}</td>\r\n                <th>运费金额</th>\r\n                <td>{{bank }}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>实收金额</th>\r\n                <td>{{smoney }}</td>\r\n                <td>收款金额</td>\r\n                <td><input v-model=\"form.toGather\"></td>\r\n            </tr>\r\n            <tr>\r\n                <th>科目</th>\r\n                <td>\r\n                    <select v-model=\"form.subject\">\r\n                        <option v-for=\"s in subjectList\">{{s.name}}</option>\r\n                    </select>\r\n                </td>\r\n                <th>客户名称</th>\r\n                <td> <a href=\"#\" @click=\"openCoView()\">{{coname }}</a></td>\r\n            </tr>\r\n            <tr>\r\n                <th>目标起运日</th>\r\n                <td>{{yjskdate }}</td>\r\n                <th>实际起运日</th>\r\n                <td>{{sjdate }}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>预计收款日期</th>\r\n                <td width=\"27%\">{{sjskdate }}</td>\r\n                <th>付款方式</th>\r\n                <td>{{mode}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>币　　值</th>\r\n                <td></td>\r\n                <th>是否已开票</th>\r\n                <td>{{bankaccounts }}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>发　　票</th>\r\n                <td>{{rate }}</td>\r\n                <th>开票金额</th>\r\n                <td>{{i_man }}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>开票日期</th>\r\n                <td>{{sendcompany}}</td>\r\n                <th>票据号</th>\r\n                <td>{{remark}}</td>\r\n            </tr>\r\n            <tr>\r\n                <th>销 售 员</th>\r\n                <td>{{saleinfo.man}}</td>\r\n                <th>所在部门</th>\r\n                <td>{{sale_dept}}</td>\r\n            </tr>\r\n\r\n            <tr>\r\n                <th>收款情况</th>\r\n                <td colspan=\"3\"><span id=\"noteShow\">{{note}}</span>&nbsp;\r\n                    <div v-if=\"showNoteFlag\">\r\n                        <select v-model=\"noteValue\">\r\n                        <option value=\"\"></option>\r\n                        <option value=\"已收款\">已收款</option>\r\n                        <option value=\"未收款\">未收款</option>\r\n                        <option value=\"收款中\">收款中</option>\r\n                            <option value=\"部分收款\">部分收款</option>\r\n                        </select>\r\n                        <button @click=\"noteIt\">确定</button><button @click=\"cancelNote\">取消</button>\r\n                    </div>\r\n                    <input v-if=\"!showNoteFlag\" id=\"noteItBut\" type=\"button\" value=\"评论\" @click=\"toNoteIt\">\r\n                </td>\r\n            </tr>\r\n        </table>\r\n        <br>\r\n        <table height=8 width=\"100%\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n            <tr bgcolor=\"#d3d8eb\">\r\n                <td width=\"227\">\r\n                    <div align=\"left\">\r\n                        产品型号&nbsp;</div>\r\n                </td>\r\n                <td width=\"436\">\r\n                    <div align=\"left\">\r\n                        <font size=\"2\">产品批号&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"119\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\">订单数量&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"119\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\">出货数量&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"110\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\">单价&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"111\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\">订单合计&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"111\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\">出货合计&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n            </tr>\r\n\r\n            <tr height=\"8\" v-for=\"pro in saleinfo.proList\">\r\n                <td width=\"227\" height=\"8\">\r\n                    <div align=\"left\">{{pro.epro }} &nbsp;\r\n                    </div>\r\n                </td>\r\n                <td width=\"436\" height=\"8\">\r\n                    {{pro.cpro }}&nbsp;\r\n                </td>\r\n                <td width=\"119\" height=\"8\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\" color=\"#000000\">\r\n                            {{pro.num }}\r\n                        </font>\r\n                        <font size=\"2\">&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"119\" height=\"8\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\" color=\"#000000\">\r\n                            {{pro.s_num }} </font>\r\n                        <font size=\"2\">&nbsp;</font>\r\n                    </div>\r\n                </td>\r\n                <td width=\"110\" height=\"8\">\r\n                    <div align=\"right\">\r\n                        <font size=\"2\" color=\"#000000\">\r\n                            {{pro.salejg }} {{pro.money }}\r\n\r\n                        </font>&nbsp;</div>\r\n                </td>\r\n                <td width=\"111\" height=\"8\">\r\n                    <div align=\"right\">{{pro.num*pro.salejg }} &nbsp;\r\n                    </div>\r\n                </td>\r\n                <td width=\"111\" height=\"8\">\r\n                    <div align=\"right\">{{pro.s_num*pro.salejg }}&nbsp;</div>\r\n                </td>\r\n            </tr>\r\n\r\n\r\n            <tr>\r\n                <td colspan=\"5\">\r\n                    <div align=\"right\">合计金额：</div>\r\n                </td>\r\n                <td>\r\n                    <div align=\"right\">{{total }}</div>\r\n                </td>\r\n                <td>\r\n                    <div align=\"right\">{{total_out_house }}</div>\r\n                </td>\r\n            </tr>\r\n\r\n            <tr>\r\n                <td colspan=\"5\">\r\n                    <div align=\"right\">欠款金额：\r\n                    </div>\r\n                </td>\r\n                <td width=\"111\">\r\n                    <div align=\"right\">\r\n                        {{total_out_house-smoney}}\r\n                    </div>\r\n                </td>\r\n                <td>\r\n\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)