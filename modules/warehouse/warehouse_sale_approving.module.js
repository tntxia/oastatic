(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('warehouse_sale_approving', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        new Vue({
            el: '#app',
            data: {
                dataset: {
                    url: webRoot + '/warehouse/warehouse!listSaleApproving.do',
                    method: 'post',
                    pageSize: 50
                },
                form: {
                    number: null,
                    coname: null,
                    sub: null,
                    epro: null,
                    man: '',
                    pp: null,
                    startdate: null,
                    enddate: null
                }
            },
            methods: {
                getUrl: function(row) {
                    return webRoot +
                        "/sale/ddgl/approvingView.mvc?id=" + row.id;
                },
                query() {
                    let datagrid = this.$refs["datagrid"];
                    datagrid.setParams(this.form);
                    datagrid.loadData();
                }
            },
        });

    };
    return module.exports;
});