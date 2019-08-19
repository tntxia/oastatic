(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component(arguments[i].name, arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
            name: 'warehouse-send-bill-view-dialog',
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
                addPro() {
                    let detail = vm.detail;
                    OACommonUse.openSaleProChooseDialog({
                        saleNumber: detail.sale_number,
                        callback(data) {
                            data.pid = id;
                            $.ajax({
                                url: 'send!addSendBillPro.do',
                                type: 'post',
                                data: data
                            }).done(res => {
                                if (res.success) {
                                    alert("操作成功");
                                    window.location.reload();
                                } else {
                                    alert("操作失败");
                                }
                            })
                        }
                    })
                },
                delPro(id) {
                    $.ajax({
                        url: 'send!delSendBillPro.do',
                        type: 'post',
                        data: {
                            id: id
                        }
                    }).done(res => {
                        if (res.success) {
                            alert("操作成功");
                            window.location.reload();
                        } else {
                            alert("操作失败");
                        }
                    })
                },
                print() {
                    let id = this.id;
                    window.open(webRoot + '/warehouse/send-bill-print.mvc?id=' + id);
                },
                toEdit() {
                    this.hide();
                    let dialog = mainLayout.showDialog("warehouseSendBillEditDialog");
                    dialog.show(this.id);
                }
            },
            watch: {
                id() {
                    this.fetchData();
                }
            },
        }
        module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\">\r\n    <div id=\"vue\">\r\n        <div style=\"text-align:right;font-size:16px;\">\r\n            <button @click=\"toEdit\">编辑</button>\r\n            <button @click=\"addPro\">增加送货产品</button>\r\n            <button @click=\"print\">打印</button>\r\n        </div>\r\n        <table id=\"detail\" class=\"table table-bordered\">\r\n            <tr>\r\n                <td>送货单号</td>\r\n                <td>{{detail.number}}</td>\r\n                <td>创建人</td>\r\n                <td>{{detail.man}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td>公司名称</td>\r\n                <td>{{detail.company.companyname}}</td>\r\n                <td>公司电话</td>\r\n                <td>{{detail.company.companytel}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td>公司传真</td>\r\n                <td>{{detail.company.companyfax}}</td>\r\n                <td>公司Logo</td>\r\n                <td><img alt=\"公司Logo\" :src=\"getUrl(detail.company.pic_id)\"></td>\r\n            </tr>\r\n            <tr>\r\n                <td>销售单号</td>\r\n                <td>{{detail.sale_number}}</td>\r\n                <td>客户名称</td>\r\n                <td>{{detail.coname}}</td>\r\n            </tr>\r\n            <tr>\r\n                <td>客户电话</td>\r\n                <td>{{detail.co_tel}}</td>\r\n            </tr>\r\n        </table>\r\n\r\n        <div id=\"datagrid\">\r\n            <table class=\"table\">\r\n                <tr>\r\n                    <th>产品型号</th>\r\n                    <th>品牌</th>\r\n                    <th>批号</th>\r\n                    <th>数量</th>\r\n                    <th>单价</th>\r\n                    <th>备注</th>\r\n                    <th>操作</th>\r\n                </tr>\r\n                <tr v-for=\"p in detail.list\">\r\n                    <td>{{p.model}}</td>\r\n                    <td>{{p.brand}}</td>\r\n                    <td>{{p.batch}}</td>\r\n                    <td>{{p.num}}</td>\r\n                    <td>{{p.price}}</td>\r\n                    <td>{{p.remark}}</td>\r\n                    <td><button @click=\"delPro(p.id)\">删除</button></td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)