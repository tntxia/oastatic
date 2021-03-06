(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('header-user-pic', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        let mainMenuSelected;
module.exports = {
    data() {
        return {
            src: '/static/images/no-user-pic.png'
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        // 加载用户的图片数据
        loadData() {
            let me = this;
            $.ajax({
                url: 'user!picId.do'
            }).done(function(res) {
                if (res.success && res.picId) {
                    me.src = '/file_center/file!showPic.do?uuid=' + res.picId
                }
            })
        },
        // 打开上传文件窗口
        toUpload() {
            this.$refs["picFile"].click();

        },
        // 上传用户图片
        uploadUserPic() {
            let userFile = this.$refs["picFile"].files[0];
            console.log("userFile", userFile);
            let formData = new FormData();
            formData.append("pic", userFile);
            $.ajax({
                url: 'user!uploadPic.do',
                type: "post",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    me.loadData();
                } else {
                    alert("操作失败");
                }
            })

        },
    }
}
module.exports.template = "<div style=\"display: inline-block;\">\r\n    <img :src=\"src\" style=\"border-radius: 50%;width: 25px;\" title=\"点击上传头像\" @click=\"toUpload\">\r\n    <input type=\"file\" style=\"display: none;\" ref=\"picFile\" @change=\"uploadUserPic\">\r\n</div>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('unit-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: null,
            unitList: []
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: 'unit!list.do'
            }).done(function(res) {

                if (res && res.length) {
                    me.v = res[0].punit_name;
                }
                me.unitList = res;
            })
        }
    },
    watch: {
        v() {
            this.$emit("input", this.v);
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option v-for=\"u in unitList\">{{u.punit_name}}</option>\r\n</select>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('tax-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: "不含税",
            taxList: ["不含税", "增值发票3%", "普通发票3%", "普通发票13%", "增值发票13%", "普通发票16%", "增值发票16%", "普通发票17%", "增值发票17%", "商业发票"]
        }
    },
    mounted() {
        if (this.value) {
            this.v = this.value;
        } else {
            this.$emit("input", this.v);
        }
    },
    updated() {},
    methods: {},
    watch: {
        v() {
            this.$emit("input", this.v);
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option v-for=\"t in taxList\">{{t}}</option>\r\n</select>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('country-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: '中国',
            countryList: []
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: '/gis/country!listAll.do'
            }).done(function(res) {
                let data = res.data;
                me.countryList = data;
            })
        }
    },
    watch: {
        v() {
            this.$emit("input", this.v);
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option v-for=\"c in countryList\">{{c.name}}</option>\r\n</select>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('province-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: '',
            provinceList: []
        }
    },
    mounted() {
        console.log("this.value", this.value);
        if (this.value) {
            this.v = this.value;
        }
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: '/gis/province!listAll.do'
            }).done(function(res) {
                let data = res.data;
                me.provinceList = data;
            })
        }
    },
    watch: {
        v() {
            console.log("select change!!!", this.v);
            this.$emit("input", this.v);
        },
        value() {
            this.v = this.value;
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option value=\"\">请选择省份</option>\r\n    <option v-for=\"c in provinceList\">{{c.name}}</option>\r\n</select>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('city-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value', 'province'],
    data() {
        return {
            v: '',
            cityList: []
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            if (!this.province) {
                return;
            }
            let me = this;
            $.ajax({
                url: '/gis/city!listAllByProvinceName.do',
                type: 'post',
                data: {
                    parent: this.province
                }
            }).done(function(res) {
                let data = res.data;
                me.cityList = data;
            })
        }
    },
    watch: {
        province() {
            this.loadData();
        },
        v() {
            this.$emit("input", this.v);
        },
        value() {
            this.v = this.value;
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option value=\"\">请选择城市</option>\r\n    <option v-for=\"c in cityList\">{{c.name}}</option>\r\n</select>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('client-choose-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    data() {
        return {
            id: null,
            callback: null,
            form: {
                id: null,
                rfq: null,
                gmjl: null,
                fk: null,
                th: null
            },
            dataset: {
                url: webRoot + '/client/client!list.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        choose(row) {
            this.$emit("choose", row);
            this.$refs.dialog.close();
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        }
    }
}
module.exports.template = "<jxiaui-dialog :width=\"1000\" ref=\"dialog\">\r\n    <div>\r\n        <span>客户名称:</span><input v-model=\"form.coname\"><button @click=\"query\">查询</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"编号\" field=\"co_number\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"名称\" field=\"coname\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"电话\" field=\"cotel\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"地址\" field=\"coaddr\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"选择\">\r\n                <template v-slot=\"row\">\r\n                    <button @click=\"choose(row)\">选择</button>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('client-choose-contact-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['pid'],
    data() {
        return {
            showFlag: false,
            id: null,
            callback: null,
            coId: null,
            dataset: {
                url: webRoot + '/client/contact!list.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
            this.$nextTick(function() {
                this.query();
            });
        },
        choose(row) {
            this.$emit("choose", row);
            this.$refs.dialog.close();
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            if (!datagrid) {
                return;
            }
            datagrid.loadData({
                pid: this.pid
            });
        }
    },
    watch: {
        pid() {
            if (!this.pid) {
                return;
            }
            this.query();
        }
    }
}
module.exports.template = "<jxiaui-dialog :width=\"1000\" ref=\"dialog\">\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\" :load-data-when-init=\"false\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"联系人\" field=\"name\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"先生/小姐\" field=\"mr\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"职位\" field=\"job\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"办公室电话\" field=\"tel\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"手机\" field=\"waptel\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"选择\">\r\n                <template v-slot=\"row\">\r\n                    <button @click=\"choose(row)\">选择</button>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('warehouse-out-list', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {

    data() {
        return {
            form: {
                coname: null,
                number: null,
                sub: null,
                model: null,
                startdate: null,
                enddate: null
            },
            dataset: {
                url: "warehouse/warehouse!getOutList.do",
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return '#warehouse/out_view?id=' + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        toAdd() {
            window.open(webRoot + '/warehouse/in/new.mvc', '_blank');
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        客户名称：<input v-model=\"form.coname\"> 型号：\r\n        <input v-model=\"form.model\"> 合同编号：\r\n        <input v-model=\"form.number\"> 公司合同号： <input v-model=\"form.sub\"> 公司合同号： <input v-model=\"form.sub\"> 起始日期:\r\n        <jxiaui-datepicker v-model=\"form.startdate\"></jxiaui-datepicker>\r\n        终止日期:\r\n        <jxiaui-datepicker v-model=\"form.enddate\"></jxiaui-datepicker>\r\n        <button @click=\"query\">查询</button>\r\n        <button @click=\"toAdd\">新增</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n                    <a :href=\"getUrl(row)\">{{row.pro_fynum}}</a>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n\r\n            <jxiaui-datagrid-item label=\"公司合同号\" field=\"sub\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\" field=\"pro_coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"产品型号\" field=\"pro_model\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"税率\" field=\"pro_rate\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"单价\" field=\"salejg\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"数量\" field=\"pro_num\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"出库日期\" field=\"pro_datetime\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"出库人\" field=\"slinkman\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"销售员\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>"
        return module.exports;
    })(),

);