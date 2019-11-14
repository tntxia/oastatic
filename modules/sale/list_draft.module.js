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
})('sale/list_draft', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        exports.init = function() {
            let url = webRoot + '/sale/sale!list.do';
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
            model: null,
            coname: null,
            number: null,
            pro_number: null,
            depts: '',
            man: '',
            pStates: null,
            startdate: null,
            enddate: null
        },
        gatheringId: null,
        totalAll: null,
        stotalAll: null,
        rTotalAll: null,
        gatheredAll: null,
        leftAll: null
    },
    components: this.components,
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return webRoot +
                "/sale/ddgl/detailDraft.mvc?id=" + row.id;
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
            this.$refs.chooseTemplateDialog.show();
        }
    }
});
        };
        return module.exports;
    }

    ,
    'choose-template-dialog',
    function() {
        var module = Object.create(null);
        module.exports = {
    data() {
        return {
            dataset: {
                url: 'template!list.do'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        show() {
            this.$refs.dialog.show();
        },
        choose: function(row) {
            this.$refs.dialog.close();
            window.open("sale/ddgl/new.mvc?id=" + row.id);
        },
        sub() {
            let me = this;
            $.ajax({
                url: webRoot + "/warehouse/warehouse!add.do",
                type: 'post',
                data: this.form
            }).done(function(data) {
                if (data.success) {
                    alert("操作成功");
                    me.$emit("success");
                    me.$refs.dialog.close();
                } else {
                    alert("操作失败" + data.msg);
                }
            });
        }
    }
}
module.exports.template = "<jxiaui-dialog ref=\"dialog\" title=\"新增销售合同 - 选择模板\">\r\n    <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n        <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"合同名称\" field=\"q_name\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"公司名称\" field=\"q_company\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"日期\" field=\"q_date\"></jxiaui-datagrid-item>\r\n        <jxiaui-datagrid-item label=\"操作\">\r\n            <template v-slot=\"row\">\r\n                <button @click=\"choose(row)\">选择</button>\r\n            </template>\r\n        </jxiaui-datagrid-item>\r\n    </jxiaui-datagrid>\r\n</jxiaui-dialog>";
        return module.exports;
    }
    
);