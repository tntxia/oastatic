(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('purchasing/refund_list_approving', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = true;
    exports.init = function() {
        let url = webRoot + "/purchasing/purchasing!listRefundApproving.do";
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
        brandList: [],
        form: {
            epro: null,
            supplier: ''
        },
        gatheringId: null,
        totalAll: null,
        stotalAll: null,
        rTotalAll: null,
        gatheredAll: null,
        leftAll: null
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return webRoot + "/xclient/product/thgl/ddd-view.jsp?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            BootstrapUtils.createDialog({
                id: 'chooseOrderTemplateModal',
                title: "新增采购合同 - 选择模板",
                template: webRoot + '/template/chooseOrderTemplate.mvc',
                onFinish: function() {
                    var dialog = this;
                    var vm = new Vue({
                        data: {
                            rows: [],
                            page: 1,
                            params: {
                                type: 'purchase'
                            }
                        },
                        created: function() {
                            this.fetchData();
                        },
                        methods: {
                            fetchData: function() {
                                var vm = this;
                                $.ajax({
                                    url: webRoot + "/template!list.do",
                                    type: 'post',
                                    data: vm.params,
                                    success: function(data) {
                                        vm.rows = data;
                                    }
                                });
                            },
                            getUrl: function(id) {
                                return "../ddgl/new.mvc?id=" + id;
                            }
                        }
                    });

                    vm.$mount(this.find(".modal-body").get(0));
                }
            });
            $("#chooseOrderTemplateModal").modal('show');
        }
    }
});
    };
    return module.exports;
});