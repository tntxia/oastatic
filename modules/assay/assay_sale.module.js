(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('assay_sale', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.template = 'template/assay_sale.html';
    exports.init = function() {

        var vue = new Vue({
            el: '#app',
            data: {
                rows: [],
                totals: [],
                count: 0,
                page: 1,
                pageJump: 1,
                totalPage: 0,
                userList: [],
                form: {
                    fpnum: null,
                    man: '',
                    coname: null,
                    supplier: null,
                    model: null,
                    sdate: null,
                    edate: null
                }
            },
            created: function() {

            },
            methods: {

                getUrl: function(id) {
                    return webRoot + "/sale/ddgl/detailAudited.mvc?id=" + id;
                },

                nextPage: function() {
                    this.page = this.page + 1;
                    this.fetchData();
                },

                prePage: function() {
                    this.page = this.page - 1;
                    this.fetchData();
                },

                jumpPage: function() {
                    this.page = this.pageJump;
                    this.fetchData();
                },

                fetchData: function() {
                    let param = this.form;
                    param.page = this.page;

                    $.ajax({
                        url: webRoot + '/sale/sale!getStatistic.do',
                        type: 'post',
                        data: param,
                        success: function(data) {
                            Vue.set(vue, "rows", data.rows);
                            Vue.set(vue, "count", data.totalAmount);
                            Vue.set(vue, "page", data.page);
                            Vue.set(vue, "pageJump", data.page);
                            Vue.set(vue, "totalPage", data.totalPage);
                        },
                        error: function(e) {
                            alert("获取信息异常");
                        }
                    });

                    $.ajax({
                        url: webRoot + '/sale/sale!getStatisticTotal.do',
                        type: 'post',
                        data: param,
                        success: function(data) {
                            Vue.set(vue, "totals", data);
                        },
                        error: function(e) {
                            alert("获取信息异常");
                        }
                    });

                },
                sub() {
                    vue.fetchData();
                }
            }
        });

    };
    return module.exports;
});