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
})('sale/client_view', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"changeNameDiv\" style=\"display:none\">\r\n    <input id=\"nameToChange\" value=\"${coname }\"><button id=\"changeNameConfirmBtn\">修改</button>\r\n</div>\r\n\r\n<br>\r\n<div id=\"app\">\r\n    <div class=\"jxiaui-table-form\">\r\n        <table style=\"width: 100%\">\r\n            <tr>\r\n                <td colspan=\"4\">\r\n                    <button @click=\"viewFollow\">客户跟进</button>\r\n                    <button @click=\"viewContact\">联系人</button>\r\n                    <button @click=\"viewInquiry\">客户询价</button>\r\n                    <button @click=\"viewProject\">客户项目</button>\r\n                    <button @click=\"viewQuote\">客户报价</button>\r\n                    <button @click=\"viewOrder\">客户订单</button>\r\n                    <button @click=\"viewGather\">客户收款</button>\r\n                    <button @click=\"update\">修改</button>\r\n                    <button @click=\"del\">删除</button>\r\n                    <button @click=\"viewlist\">查看列表</button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>公司编号</th>\r\n                <td>{{form.co_number }}</td>\r\n                <th>是否共享</th>\r\n                <td>\r\n                    <select v-model=\"form.share\">\r\n                        <option>是</option>\r\n                        <option>否</option>\r\n                    </select>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>公司名称</th>\r\n                <td>{{form.coname}}</td>\r\n                <th>电　　话</th>\r\n                <td><input v-model=\"form.cotel\"></td>\r\n            </tr>\r\n            <tr>\r\n                <th>公司地址</th>\r\n                <td><input v-model=\"form.coaddr\" style=\"width: 80%\"></td>\r\n                <th>传　　真</th>\r\n                <td><input v-model=\"form.cofax\"></td>\r\n            </tr>\r\n            <tr>\r\n                <th>网　　址</th>\r\n                <td>\r\n                    <input v-model=\"form.conet\">\r\n                </td>\r\n                <th>电子邮件</th>\r\n                <td>\r\n                    <input v-model=\"form.email\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>邮　　编</th>\r\n                <td>\r\n                    <input v-model=\"form.post\">\r\n                </td>\r\n                <th>城　　市</th>\r\n                <td>\r\n                    <input v-model=\"form.city\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>省　　市</th>\r\n                <td>\r\n                    <input v-model=\"form.province\">\r\n                </td>\r\n                <th>国　　家</th>\r\n                <td>\r\n                    <input v-model=\"form.coman\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>组织形式</th>\r\n                <td>\r\n                    <select v-model=\"form.cozzxs\">\r\n                        <option>私营有限公司</option>\r\n                        <option>国营有限公司</option>\r\n                        <option>股份制公司</option>\r\n                        <option>外资企业</option>\r\n                        <option>中外合资企业</option>\r\n                        <option>个体户</option>\r\n                    </select>\r\n                </td>\r\n                <th>付款方式</th>\r\n                <td>\r\n                    <jxiaui-select v-model=\"form.cozczb\" :url=\"paywaySelectUrl\" value-name=\"payment\" label-name=\"payment\"></jxiaui-select>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>付款逾期期限</th>\r\n                <td colspan=\"3\">\r\n                    <input v-model=\"form.pay_deadline\">天\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>行业性质</th>\r\n                <td>\r\n                    <input v-model=\"form.tradetypes\">\r\n                </td>\r\n                <th>开户名称</th>\r\n                <td>\r\n                    <input v-model=\"form.coclrq\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>银行名称</th>\r\n                <td>\r\n                    <input v-model=\"form.bank_name\">\r\n                </td>\r\n                <th>银行地址</th>\r\n                <td>\r\n                    <input v-model=\"form.bank_addr\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>Swift Code</th>\r\n                <td>\r\n                    <input v-model=\"form.swift_code\">\r\n                </td>\r\n                <th>IBAN</th>\r\n                <td>\r\n                    <input v-model=\"form.iban\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>Route</th>\r\n                <td>\r\n                    <input v-model=\"form.route\">\r\n                </td>\r\n                <th>BIC #</th>\r\n                <td>\r\n                    <input v-model=\"form.bic\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>信用级别</th>\r\n                <td>\r\n                    <input v-model=\"form.cokhjb\">\r\n                </td>\r\n                <th>银行帐号</th>\r\n                <td>\r\n                    <input v-model=\"form.coyhzh\">\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>运输方式</th>\r\n                <td>\r\n                    <input v-model=\"form.cokhjb\"> 帐号：\r\n                    <input v-model=\"form.cokhjb\">\r\n                </td>\r\n                <th>评 分</th>\r\n                <td>\r\n                    <table style=\"font-size:12px\">\r\n                        <tr>\r\n                            <td>询价单(RFQs)回应速度:</td>\r\n                            <td><span>{{scores.rfq}}</span></td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>购买机率:</td>\r\n                            <td>{{scores.gmjl}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>付款情况:</td>\r\n                            <td>{{scores.fk}}</td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>退货速度:</td>\r\n                            <td>{{scores.th}}</td>\r\n                        </tr>\r\n                    </table>\r\n                    <button @click=\"score\">我要评分</button>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>使用货币</th>\r\n                <td>\r\n                    <select v-model=\"form.cosyhb\">\r\n                        <option>CNY</option>\r\n                        <option>USD</option>\r\n                    </select>\r\n                </td>\r\n                <th>注册资本</th>\r\n                <td>\r\n                    <input v-model=\"form.nsnumber\"> 万元\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>员工总数</th>\r\n                <td>\r\n                    <input v-model=\"form.number\"> 人\r\n                </td>\r\n                <th>创建用户</th>\r\n                <td>\r\n                    {{form.username}}\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>所在部门</th>\r\n                <td>\r\n                    {{form.dept}}\r\n                </td>\r\n                <th>创建日期</th>\r\n                <td>\r\n                    {{form.rg_date}}\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>修改用户</th>\r\n                <td>\r\n                    {{form.modman}}\r\n                </td>\r\n                <th>修改日期</th>\r\n                <td>\r\n                    {{form.mod_date}}\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>生产产品及转移记录</th>\r\n                <td colspan=\"3\">\r\n                    {{form.mproduct}}\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>经营情况</th>\r\n                <td>\r\n                    {{form.company_management}}\r\n                </td>\r\n                <th>推荐产品</th>\r\n                <td>\r\n                    {{form.product}}\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <th>备　　注</th>\r\n                <td colspan=\"3\">\r\n                    {{form.describee}}\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n</div>";
        

        exports.init = function() {
            let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        paywaySelectUrl: webRoot + '/payway!list.do',
        form: {},
        scores: {
            rfq: null
        }
    },
    mounted() {
        $.ajax({
            url: webRoot + '/client/client!detail.do',
            data: {
                id
            }
        }).done(res => {
            this.form = res;
        });
        $.ajax({
            url: webRoot + '/client/client!getScore.do',
            data: {
                id: id
            }
        }).done(data => {
            if (data.success) {
                this.scores = data.score;
            }
        });
    },
    methods: {
        del() {
            if (confirm("确实要删除吗？")) {
                $.ajax({
                    url: webRoot + '/client/client!del.do',
                    data: {
                        id: id
                    }
                }).done(res => {
                    if (res.success) {
                        alert("操作成功");
                        this.viewlist();
                    } else {
                        alert("操作失败");
                    }
                }).fail(e => {
                    alert("操作异常");
                })
            }
        },
        update() {
            $.ajax({
                url: webRoot + '/client/client!update.do',
                data: this.form
            }).done(res => {
                if (res.success) {
                    alert("操作成功");
                    if (window.opener) {
                        window.opener.location.reload();
                    }
                    window.close()
                } else {
                    alert("操作失败");
                }
            }).fail(e => {
                alert("操作异常");
            })
        },
        // 查看客户跟进
        viewFollow() {
            router.goRoute("sale/client_follow", { id });
        },
        // 查看客户联系人
        viewContact() {
            router.goRoute("sale/client_contact", { id });
        },
        viewInquiry() {
            window.open('sale/Inquiry/clientInquiry.mvc?coId=' + id);
        },
        viewProject() {
            router.goRoute("sale/client_project", { id });
        },
        viewQuote() {
            router.goRoute("sale/client_quote", { id });
        },
        viewOrder() {
            router.goRoute("sale/client_order", { id });
        },
        viewGather() {
            router.goRoute("sale/client_gather", { id });
        },
        viewDoc() {
            router.goRoute("sale/client_doc", { id });
        },
        viewlist() {
            router.goRoute("sale_client_list");
        },
        query() {
            let datagrid = this.$refs["gatheringTable"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            console.log("query,,,", this.sdate, this.edate);
        },
        score() {
            let mainLayout = webApp.layout;
            let dialog = mainLayout.showDialog("clientScoreDialog");
            dialog.setId(id);
            dialog.show();
        }
    }
});

$("#exportBtn").click(function() {

    http.post({
        url: webRoot + "/finance/finance!exportToGather.do"
    }).then(data => {
        if (data.success) {
            window.open("/ReportCenter/view.mvc?id=" + data.uuid);
        } else {
            alert("操作失败：" + data.msg);
        }

    }, e => {
        alert("操作异常");
    })

});
        };
        return module.exports;
    }

    
);