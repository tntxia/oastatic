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
})('purchasing/view', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <table width=\"100%\" border=\"0\" cellpadding=\"3\" height=\"50\">\r\n        <tr>\r\n            <td>\r\n                <div align=\"center\" style=\"color:#213e9b;font-size:28px;\"><b>合　同　基　本　信　息</b></div>\r\n                <hr width=\"100%\" size=\"1\" noshade color=\"#213e9b\">\r\n            </td>\r\n        </tr>\r\n    </table>\r\n    <table height=8 width=\"100%\" bordercolor=\"#CCBE5A\" cellspacing=\"0\" bordercolordark=\"#ffffff\" cellpadding=\"3\" align=\"center\" bgcolor=\"#ffffff\" bordercolorlight=\"#7f9db9\" border=\"1\">\r\n        <tr bgcolor=\"#d3d8eb\">\r\n            <td width=\"12%\" bgcolor=\"#d3d8eb\">\r\n                合同编号\r\n            </td>\r\n            <td width=\"35%\" bgcolor=\"#ffffff\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.number }}</font>\r\n                </div>\r\n            </td>\r\n            <td width=\"11%\" nowrap bgcolor=\"#d3d8eb\"><span class=\"STYLE1\"><font size=\"2\">负 责 人</font></span></td>\r\n            <td width=\"12%\" bgcolor=\"#ffffff\">\r\n                <font size=\"2\" color=\"#000000\">{{detail.man}}</font>&nbsp;</td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"12%\" height=\"2\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">公司合同号</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"2\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">\r\n                        {{detail.sub}}　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"12%\" height=\"2\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">PO#</font>&nbsp;</div>\r\n            </td>\r\n            <td colspan=\"5\" height=\"19\">{{detail.custno}}　　</td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"12%\" height=\"19\" nowrap bgcolor=\"#e8ebf5\">\r\n                客户名称\r\n            </td>\r\n            <td>\r\n                {{detail.coname}}\r\n            </td>\r\n            <td width=\"12%\" height=\"19\" nowrap bgcolor=\"#e8ebf5\">\r\n                客户编号\r\n            </td>\r\n            <td>\r\n                {{detail.co_number}}\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"12%\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">客户性质</font>&nbsp;</div>\r\n            </td>\r\n            <td>\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.senddate}}　</font>&nbsp;</div>\r\n            </td>\r\n            <td nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">银行费用</font>&nbsp;</div>\r\n            </td>\r\n            <td colspan=\"3\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.yj}} {{detail.money}}　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">货　　币</font>&nbsp;</div>\r\n            </td>\r\n            <td bgcolor=\"#ffffff\">\r\n                <div align=\"left\" class=\"STYLE3\"><span class=\"STYLE3\"> \r\n        <font size=\"2\">{{detail.money}}</font></span></div>\r\n            </td>\r\n            <td width=\"10%\" nowrap bgcolor=\"#e8ebf5\">\r\n                发　　票\r\n            </td>\r\n            <td colspan=\"3\">\r\n                {{detail.rate}}\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td nowrap bgcolor=\"#e8ebf5\">\r\n                付款方式\r\n            </td>\r\n            <td height=\"17\" colspan=\"5\" bgcolor=\"#ffffff\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\"><span class=\"STYLE3\"> {{detail.pay_type }}</span>　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"12%\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">快递帐号</font>&nbsp;</div>\r\n            </td>\r\n            <td width=\"35%\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.trade }}　</font>&nbsp;</div>\r\n            </td>\r\n            <td width=\"10%\" height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">合同日期</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\" colspan=\"3\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.datetime }}　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">运输方式</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.tr}}　</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">发货日期</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\" colspan=\"3\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.send_date}}　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"2\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    运费支付方&nbsp;</div>\r\n            </td>\r\n            <td height=\"2\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.yf_types}}</font>\r\n                    <font size=\"2\">&nbsp;　</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"2\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">运费金额</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"2\" colspan=\"3\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.yf_money}}</font>\r\n                    <font size=\"2\">&nbsp;</font>\r\n                    <font size=\"2\" color=\"#000000\">{{detail.money}}</font>\r\n                    <font size=\"2\">\r\n                    </font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">收货地址</font>&nbsp;</div>\r\n            </td>\r\n            <td colspan=\"5\" height=\"17\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.tr_addr}}　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">联 系 人</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.tr_man}}　</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">联系电话</font>&nbsp;</div>\r\n            </td>\r\n            <td height=\"17\" colspan=\"3\">\r\n                <div align=\"left\">\r\n                    <font size=\"2\" color=\"#000000\">{{detail.tr_tel}}　</font>&nbsp;</div>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td width=\"12%\" height=\"17\" nowrap bgcolor=\"#e8ebf5\">\r\n                <div align=\"left\" class=\"STYLE1\">\r\n                    <font size=\"2\">条　　款</font>&nbsp;</div>\r\n            </td>\r\n            <td colspan=\"5\">\r\n                <jxiaui-html-view v-model=\"detail.tbyq\"></jxiaui-html-view>\r\n            </td>\r\n        </tr>\r\n        <tr>\r\n            <td nowrap bgcolor=\"#e8ebf5\">备　　注</td>\r\n            <td colspan=\"5\">\r\n                <jxiaui-html-view v-model=\"detail.remarks\"></jxiaui-html-view>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n    <product-datagrid :pid=\"id\" ref=\"productDatagrid\"></product-datagrid>\r\n    <div>\r\n        <button @click=\"toBatchChoose\">批量选择产品</button> |\r\n        <button @click=\"toEdit\">编辑合同</button> |\r\n        <button @click=\"del\">删除合同</button> |\r\n        <button @click=\"printList\">打印清单</button> |\r\n        <button @click=\"sub\">提交审批</button>\r\n    </div>\r\n    <warehouse-choose-dialog ref=\"warehouseChooseDialog\" @choose=\"chooseWarehouseProduct\"></warehouse-choose-dialog>\r\n</div>";
        

        exports.init = function() {
            let id = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        id: id,
        detail: {
            coname: null,
            tr_addr: null,
            contact: null,
            tr_tel: null,
            source: 0,
            yj: 0,
            rate: null,
            yf_money: 0,
            other_fy: 0,
            tbyq: null
        }
    },
    components: this.components,
    mounted() {
        this.loadData();
    },
    methods: {
        back() {
            router.goRoute("purchasing/list_draft");
        },
        loadData() {
            let me = this;
            $.ajax({
                url: 'purchasing/purchasing!detail.do',
                data: {
                    id: id
                }
            }).done(function(res) {
                if (res.success) {
                    let data = res.data;
                    me.detail = data;
                }
            }).fail(e => {
                alert("加载模板信息异常");
            });
        },
        toBatchChoose() {
            this.$refs.warehouseChooseDialog.show();
        },
        chooseWarehouseProduct(data) {
            let params = {
                ddid: id,
                data: data
            }
            let me = this;
            this.$http.post("warehouse/warehouse!pushProductIntoPurchasingOrder.do", params).then(function(res) {
                me.$refs.productDatagrid.query();
            });
        },
        toEdit() {
            window.open('ddgl/editdd.jsp?id=' + id);
        },
        del() {
            if (!confirm("是否确认删除此合同")) {
                return;
            }
            let me = this;
            $.ajax({
                url: 'purchasing/purchasing!del.do',
                data: {
                    id: id
                }
            }).done(function(res) {
                if (res.success) {
                    me.back()
                }
            });
        },
        printList() {
            window.open('ddgl/ecompany.jsp?id=' + id);
        },
        check() {
            let productDatagrid = this.$refs.productDatagrid;
            let rows = productDatagrid.getRows();
            if (!rows.length) {
                alert("你还没有为这个订单录入产品信息，请录入产品信息后再提交");
                return false;
            }
            return true;
        },
        sub() {
            if (!this.check()) {
                return;
            }
            let me = this;
            $.ajax({
                url: "purchasing/purchasing!toAudit.do",
                type: 'post',
                data: {
                    id: id
                }
            }).done(function(data) {
                if (data.success) {
                    alert("订单已提交");
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

    ,
    'warehouse-choose-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    data() {
        return {
            form: {},
            dataset: {
                url: webRoot + "/warehouse/warehouse!warehouseList.do",
                method: 'post'
            }
        }
    },
    mounted() {

    },
    updated() {},
    methods: {
        show() {
            this.form = {};
            this.$refs.dialog.show();
            this.$nextTick(function() {
                this.query();
            });
        },
        close() {
            this.$refs.dialog.close();
        },
        choose(row) {
            this.$emit("choose", row);
            this.close();
        },
        chooseSelected() {
            let datagrid = this.$refs["datagrid"];
            let rows = datagrid.getSelectedRows();
            debugger
            this.$emit("choose", rows);
            this.close();
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        }
    }
}
module.exports.template = "<jxiaui-dialog ref=\"dialog\" title=\"增加仓库产品\">\r\n    <div id=\"toolbar\">\r\n        型号：<input v-model=\"form.model\"> 品牌：\r\n        <brand-select v-model=\"form.supplier\"></brand-select>\r\n        <button @click=\"query\">查询</button>\r\n        <button @click=\"chooseSelected\">选择勾选</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\" :load-data-when-init=\"false\" :check=\"true\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"产品型号\" field=\"promodel\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"品牌\" field=\"pro_sup_number\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"货期\" field=\"yqdate\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"操作\">\r\n                <template v-slot=\"row\">\r\n                    <button @click=\"choose(row)\">选择</button>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n</jxiaui-dialog>";
        return module.exports;
    }
    ,
    'product-datagrid',
    function() {
        var module = Object.create(null);
        module.exports = {
    props: {
        pid: {},
        editable: {
            default: true
        }
    },
    data() {
        return {
            dataset: {
                url: 'purchasing/pro!getProList.do',
                method: 'post',
                pageSize: 50
            },
            zprice: 0
        }
    },
    mounted() {
        if (this.pid) {
            this.query();
        }
    },
    updated() {},
    methods: {
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.loadData({
                ddid: this.pid
            });
        },
        addProduct() {
            let datagrid = this.$refs["datagrid"];
            datagrid.addRow({
                epro: null,
                mpn: '0',
                cpro: '0',
                fypronum: '0',
                num: 1
            });
        },
        calc(rows) {
            let total = 0;
            rows.forEach(r => {
                if (r.selljg && Number(r.selljg) && r.num && Number(r.num)) {
                    total += parseFloat(r.selljg) * parseInt(r.num);
                }
            });
            this.zprice = total;
        },
        save(row) {
            let data = row;
            this.saveProData([data]);
        },
        saveAllPro() {
            let datagrid = this.$refs["datagrid"];
            let rows = datagrid.getRows();
            let data = rows;
            this.saveProData(data);
        },
        saveProData(data) {
            let me = this;
            let params = {
                ddid: this.pid,
                pros: data
            }
            this.$http.post("purchasing/pro!save.do", params).then(function(res) {
                let data = res.body;
                if (data.success) {
                    me.query();
                } else {
                    alert("操作失败");
                }

            });
        },
        del(row) {
            if (!confirm("是否确认确认")) {
                return;
            }
            let me = this;
            $.ajax({
                url: webRoot + "/purchasing/pro!del.do",
                type: 'post',
                data: { id: row.id }
            }).done(function(data) {
                if (data.success) {
                    me.query();
                } else {
                    alert("操作失败！" + data.msg);
                }
            }).fail(function(e) {
                alert("操作异常！");
            });
        },
        getRows() {
            return this.$refs.datagrid.getRows();
        }
    },
    watch: {
        pid() {
            if (this.pid) {
                this.query();
            }
        }
    }
}
module.exports.template = "<div>\r\n    <div v-if=\"editable\">\r\n        <button @click=\"addProduct\">增加产品</button>\r\n        <button @click=\"saveAllPro\">保存产品</button>\r\n    </div>\r\n    <jxiaui-datagrid ref=\"datagrid\" :dataset=\"dataset\" :load-data-when-init=\"false\" @change=\"calc\">\r\n        <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"产品型号\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.epro\" size=\"25\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"年份\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.cpro\" size=\"5\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"封装\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.pro_number\" size=\"18\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"数量\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.num\" size=\"18\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"单位\">\r\n            <template v-slot=\"row\">\r\n                <unit-select v-model=\"row.unit\"></unit-select>\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"采购单价\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.selljg\" size=\"18\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"税率%\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.rate\" size=\"18\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"品牌\" field=\"supplier\">\r\n            <template v-slot=\"row\">\r\n                <brand-select v-model=\"row.supplier\"></brand-select>\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"货期\" field=\"s_tr_date\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.cgpro_ydatetime\" size=\"18\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"备注\" field=\"remark\">\r\n            <template v-slot=\"row\">\r\n                <input v-model=\"row.remark\" size=\"18\">\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"操作\" v-if=\"editable\">\r\n            <template v-slot=\"row\">\r\n                <button @click=\"save(row)\">保存</button>\r\n                <button @click=\"del(row)\">删除</button>\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n    </jxiaui-datagrid>\r\n    <div>\r\n        合计: {{zprice}}\r\n    </div>\r\n\r\n</div>";
        return module.exports;
    }
    
);