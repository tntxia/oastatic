(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'mail-new-dialog',
    data() {
        return {
            showFlag: false,
            title: "新建邮件",
            form: {
                mail_to: null, // 收件人
                mail_to2: null, // 抄送
                mail_to3: null, // 密送,
                mail_sub: null,
                mail_nr: null
            },
            company_id: null,
            sale_number: null,
            companyList: []
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
        send() {
            let vm = this;
            var paramMap = this.form;
            $.ajax({
                url: webRoot + '/mail!newMail.do',
                type: 'post',
                data: paramMap
            }).done(function(data) {
                if (data.success) {
                    alert("发送成功");
                    vm.hide();
                    window.location.reload();
                } else {
                    alert("发送失败");
                }
            }).fail(function() {
                alert("发送异常");
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
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :title=\"title\">\r\n    <div><button @click=\"send\">发送</button></div>\r\n    <table id=\"newMailTable\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n        <tr>\r\n            <td width=\"63\" colspan=\"2\" bgcolor=\"#e8ebf5\">收件人</td>\r\n            <td colspan=\"3\"> <input v-model=\"form.mail_to\" size=\"60\" maxlength=\"100\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td colspan=\"2\" bgcolor=\"#e8ebf5\">抄送人</td>\r\n            <td colspan=\"3\"> <input v-model=\"form.mail_to2\" size=\"60\" maxlength=\"100\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td colspan=\"2\" bgcolor=\"#e8ebf5\">密送人&nbsp;</td>\r\n            <td colspan=\"3\"> <input v-model=\"form.mail_to3\" size=\"60\" maxlength=\"100\"></td>\r\n        </tr>\r\n        <tr>\r\n            <td bgcolor=\"#e8ebf5\">主　　题&nbsp;</td>\r\n            <td colspan=\"4\">\r\n                <input v-model=\"form.mail_sub\" size=\"60\">&nbsp;\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"233\" colspan=\"5\">\r\n                <textarea v-model=\"form.mail_nr\" cols=\"80\" rows=\"15\" id=\"mail_nr\">\r\n                    您好！ \r\n\r\n      致 礼！ \r\n      ${username} ${currentDate?string('yyyy-MM-dd')} </textarea> &nbsp;\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"24\" colspan=\"2\" bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\">发件人:</font>&nbsp;</td>\r\n            <td width=\"298\" height=\"24\">\r\n                <font size=\"2\" color=\"#000080\">\r\n\r\n                    ${username}\r\n                </font>&nbsp;</td>\r\n            <td width=\"89\" height=\"24\" bgcolor=\"#e8ebf5\">\r\n                <font size=\"2\">发件时间\r\n                    <font color=\"#000000\">:</font>\r\n                </font>&nbsp;</td>\r\n            <td width=\"126\" height=\"24\">\r\n                ${currentDate?string('yyyy-MM-dd')}&nbsp;</td>\r\n        </tr>\r\n    </table>\r\n\r\n</jxiaui-dialog>"
return module.exports;})(), 

)
