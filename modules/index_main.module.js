(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('index_main', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {

        let url = webRoot + "/purchasing/supplier!list.do";
        new Vue({
            el: '#app',
            data: {
                countryDataset: {
                    url: "/geography/country!list.do"
                },
                dataset: {
                    url: url,
                    method: 'post',
                    pageSize: 50
                },
                customerFollowDataset: {
                    url: webRoot + "/client/client!listCustomerChat.do"
                },
                publicDataset: {
                    url: webRoot + '/public/notice!list.do'
                }
            },
            mounted() {},
            methods: {
                getUrl: function(row) {
                    return webRoot + "/xclient/custo/conversationFollow.mvc?id=" + row.id
                },
                getUrlCo: function(row) {
                    return webRoot + "/xclient/cview.jsp?coid=" + row.coid
                },
                getUrlPublic(row) {
                    return webRoot + "/public/view.mvc?id=" + row.id;
                },
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