(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale/sample_list_approving', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = true;
    exports.init = function() {
        let queryStatus = router.getParam("status");
if (!queryStatus) {
    queryStatus = "";
}

let url = webRoot + '/sale/sample!listAuditing.do';

new Vue({
    el: '#app',
    data: {
        loading: false,
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        form: {
            model: null,
            coname: null,
            number: null,
            status: queryStatus
        }
    },
    mounted() {},
    methods: {
        getUrl: function(row) {
            return "#sale/sample_view?id=" + row.id;
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            router.goRoute("sale/sample_new");
        },
        chooseInquiry() {
            window.open(webRoot +
                "/sale/quote/xjmain.jsp");
        }
    }
});
    };
    return module.exports;
});