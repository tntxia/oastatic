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
})('sale/client_list', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"app\">\r\n    <div>\r\n        <span>省份</span>\r\n        <province-select v-model=\"form.province\"></province-select>\r\n        <span>城市</span>\r\n        <city-select v-model=\"form.city\" :province=\"form.province\"></city-select>\r\n        客户名称:<input v-model=\"form.coname\"> 业务跟进人：\r\n        <input v-model='form.follower'>\r\n        <button @click=\"toAdd\">新增</button>\r\n        <button @click=\"query\">查询</button>\r\n        <button @click=\"exportData\">导出</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户编号\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\">{{row.co_number}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"名称\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\">{{row.coname}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"电话\">\r\n                <template v-slot=\"row\">\r\n\t\t\t\t\t<a :href=\"getUrl(row)\" target=\"_blank\">{{row.cotel}}</a>\r\n\t\t\t\t</template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"是否共享\" field=\"share\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"地址\" field=\"coaddr\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"EAU\" field=\"company_management\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"创建用户\" field=\"username\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n</div>";
        

        exports.init = function() {
            let url = webRoot + "/client/client!list.do";

new Vue({
    el: '#app',
    data: {
        loading: false,
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        stasticLoading: false,
        departmentList: [],
        userList: [],
        form: {
            coname: null,
            follower: null
        }
    },
    components: this.components,
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return "#sale/client_view?id=" + row.clientid;
        },
        loadData() {
            let me = this;

            $.ajax({
                url: webRoot + "/department!list.do",
                type: 'post',
                success: function(data) {
                    let departmentList = [];
                    $.each(data, function(i, r) {
                        departmentList.push(r.departname);
                    });
                    me.departmentList = departmentList;
                },
                dataType: 'json'
            });

            this.stasticLoading = true;
            $.ajax({
                url: webRoot + "/sale/sale!getSaleUserList.do",
                type: 'post',
                data: this.form
            }).done(function(data) {
                me.userList = data;
            }).fail(function() {
                me.stasticLoading = false;
            })
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            router.goRoute("sale/client_new");
        },
        exportData() {
            var param = this.form;
            param.type = "2";
            $.ajax({
                url: webRoot + "/client/client!export.do",
                type: 'post',
                data: param,
                success: function(data) {
                    if (data.success) {
                        window.open("/ReportCenter/view.mvc?id=" + data.uuid);
                    } else {
                        alert("操作失败：" + data.msg);
                    }
                },
                error: function(e) {

                }
            });
        }
    }
});
        };
        return module.exports;
    }

    ,
    'province-select',
    function() {
        var module = Object.create(null);
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
module.exports.template = "<select v-model=\"v\">\r\n    <option value=\"\">请选择省份</option>\r\n    <option v-for=\"c in provinceList\">{{c.name}}</option>\r\n</select>";
        return module.exports;
    }
    ,
    'city-select',
    function() {
        var module = Object.create(null);
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
module.exports.template = "<select v-model=\"v\">\r\n    <option value=\"\">请选择城市</option>\r\n    <option v-for=\"c in cityList\">{{c.name}}</option>\r\n</select>";
        return module.exports;
    }
    
);