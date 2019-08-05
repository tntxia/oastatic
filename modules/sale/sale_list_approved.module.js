(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale_list_approved', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        let url = webRoot + '/sale/sale!approvedList.do';

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
                    epro: null,
                    coname: null
                }
            },
            mounted() {
                this.loadData();
            },
            methods: {
                getUrl: function(row) {
                    return webRoot +
                        "/sale/ddgl/detailAudited.mvc?id=" + row.id;
                },
                loadData() {},
                query() {
                    let datagrid = this.$refs["datagrid"];
                    datagrid.setParams(this.form);
                    datagrid.loadData();
                }
            }
        });

    };
    return module.exports;
});