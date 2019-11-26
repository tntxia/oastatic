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
})('sale/new', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <div align=\"center\">\r\n        <font size=\"5\"><b><font color=\"#213e9b\">合　同　基　本　信　息</font></b></font>\r\n    </div>\r\n    <hr width=\"100%\" size=\"1\" noshade color=\"#213e9b\">\r\n    <table height=8 width=\"100%\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">\r\n                PO#\r\n            </td>\r\n            <td>\r\n                <input type=\"text\" v-model=\"form.custno\">\r\n            </td>\r\n            <td bgcolor=\"#e8ebf5\">\r\n                客户合同号\r\n            </td>\r\n            <td>\r\n                <input type=\"text\" v-model=\"form.sub\">\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"7\" bgcolor=\"#e8ebf5\">\r\n                客户名称</td>\r\n            <td colspan=\"3\">\r\n                <input v-model=\"form.coname\" readonly=\"readonly\"> <button @click=\"toChooseClient\">选择</button>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\" color=\"#000000\">收货地址</font>&nbsp;</td>\r\n            <td colspan=\"3\">\r\n                <font size=\"2\">\r\n                    <input v-model=\"form.tr_addr\" size=\"75\" maxlength=\"150\">\r\n                </font>&nbsp;</td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">\r\n                联 系 人</td>\r\n            <td>\r\n                <input v-model=\"form.contact\"> <button @click=\"toChooseContact\">选择</button>\r\n            </td>\r\n            <td bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\" color=\"#000000\">联系电话</font>&nbsp;</td>\r\n            <td>\r\n                <font size=\"2\">\r\n                    <input v-model=\"form.tr_tel\" type=\"text\">\r\n                </font>&nbsp;</td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"2\" bgcolor=\"#e8ebf5\">发票&nbsp;</td>\r\n            <td height=\"2\">\r\n                <tax-select v-model=\"form.item\"></tax-select>\r\n            </td>\r\n            <td height=\"2\" bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\" color=\"#000000\">银行费用</font>&nbsp;</td>\r\n            <td height=\"2\">\r\n                <input v-model=\"form.yj\" size=\"10\" value=\"0\" maxlength=\"10\">\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">运输方式</td>\r\n            <td><input v-model=\"form.tr\"></td>\r\n            <td bgcolor=\"#e8ebf5\">快递帐号</td>\r\n            <td><input v-model=\"form.trade\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">付款方式</td>\r\n            <td>\r\n                <payway-select v-model=\"form.mode\"></payway-select> 付款天数 <input type=\"text\" v-model=\"form.source\" size=\"3\" value=\"0\"> 天\r\n            </td>\r\n            <td bgcolor=\"#e8ebf5\">发货日期</td>\r\n            <td>\r\n                <jxiaui-datepicker v-model=\"form.send_date\"></jxiaui-datepicker>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">运费负担</td>\r\n            <td>\r\n                <select v-model=\"form.yf_types\">\r\n                    <option value=\"Freight Collection\">Freight Collection</option>\r\n                    <option value=\"Freight Prepaid\">Freight Prepaid</option>\r\n                    <option value=\"公司支付\">公司支付</option>\r\n                    <option value=\"客户支付\">客户支付</option>\r\n                </select>\r\n            </td>\r\n            <td bgcolor=\"#e8ebf5\">运费金额</td>\r\n            <td>\r\n                <input type=\"text\" v-model=\"form.yf_money\" size=\"10\"> (如是公司支付运费金额填写0)\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">其它费用</td>\r\n            <td><input type=\"text\" v-model=\"form.other_fy\" size=\"10\" value=\"0\" maxlength=\"10\">仅作为核算利润不参与其它运算</td>\r\n            <td bgcolor=\"#e8ebf5\">PI#</td>\r\n            <td><input v-model=\"form.fy_number\" type=\"text\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">客户订单日期&nbsp;</td>\r\n            <td><input type=\"text\" v-model=\"form.datetime\" size=\"10\" ui=\"date\" show-now=\"true\">*&nbsp;&nbsp;</td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"15%\" bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\" color=\"#000000\">条款</font>&nbsp;</td>\r\n            <td colspan=\"3\">\r\n                <jxiaui-rich-editor v-model=\"form.tbyq\"></jxiaui-rich-editor>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"15%\" height=\"15\" bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\" color=\"#000000\">备　　注</font>&nbsp;</td>\r\n            <td colspan=\"3\">\r\n                <jxiaui-rich-editor v-model=\"form.remarks\"></jxiaui-rich-editor>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n\r\n    <p align=\"center\">\r\n        <button @click=\"sub\">登记产品</button>\r\n    </p>\r\n    <client-choose-dialog ref=\"clientChooseDialog\" @choose=\"chooseClient\"></client-choose-dialog>\r\n    <client-choose-contact-dialog :pid=\"form.clientId\" ref=\"clientContactChooseDialog\" @choose=\"chooseContact\"></client-choose-contact-dialog>\r\n\r\n</div>";
        

        exports.init = function() {
            let templateId = router.getParam("templateId");
new Vue({
    el: '#app',
    data: {
        form: {
            coname: null,
            tr_addr: null,
            contact: null,
            tr_tel: null,
            source: 0,
            yj: 0,
            yf_money: 0,
            other_fy: 0,
            tbyq: null
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        back() {
            router.goRoute("sale/list_draft");
        },
        loadData() {
            let me = this;
            $.ajax({
                url: 'template!detail.do',
                data: {
                    id: templateId
                }
            }).done(function(res) {
                if (res.success) {
                    let data = res.data;
                    me.form.tbyq = data.q_tk;
                    me.form.remarks = data.remark;
                    console.log(me.form);
                }
            }).fail(e => {
                alert("加载模板信息异常");
            });
        },
        toChooseClient() {
            this.$refs.clientChooseDialog.show();
        },
        chooseClient(client) {
            let form = this.form;
            form.clientId = client.clientid;
            form.coname = client.coname;
            form.co_number = client.co_number;
            form.tr_addr = client.coaddr;
        },
        toChooseContact() {
            this.$refs.clientContactChooseDialog.show();
        },
        chooseContact(contact) {
            let clientId = this.form.clientId;
            if (!clientId) {
                alert("请先选择客户");
                return;
            }
            let form = this.form;
            form.contact = contact.name;
            form.tr_tel = contact.tel;
        },
        check() {
            let form = this.form;
            if (!form.coname) {
                alert("请输入客户名称!");
                return false;
            }
            if (form.send_date == "") {
                alert("请填写发货日期!");
                return false;
            }
            if (form.yf_types == "") {
                alert("请您选择运费负担方!");
                return false;
            }
            if (form.datetime == "") {
                alert("请填写日期!");
                return false;
            }
            return true;
        },
        sub() {
            if (!this.check()) {
                return;
            }
            let me = this;
            let form = this.form;
            $.ajax({
                url: webRoot + "/sale/sale!add.do",
                type: 'post',
                data: form
            }).done(function(data) {
                if (data.success) {
                    me.back();
                } else {
                    alert("操作失败！" + data.msg);
                }
            }).fail(function(e) {
                alert("操作异常！");
            });
        }
    }
});
        };
        return module.exports;
    }

    
);