(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('sale_client_follow', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.init = function() {
        let id = router.getParam("id");

let url = `${webRoot}/client/client!listFollow.do?id=${id}`;

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
                    return "#sale_client_view?id=" + row.clientid;
                },
                loadData() {
                    let me = this;

                    $.ajax({
                        url: webRoot + "/department!list.do",
                        type: 'post',
                        success: function(data) {
                            let departmentList = [];
                            
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
                    router.goRoute("sale_client_follow_new", {id});
                },
                del(id) {
                    $.ajax({
                        url: webRoot + "/client/client!delFollow.do",
                        type: 'post',
                        data: {
                            id: id
                        },
                        success: function(data) {

                        },
                        error: function(e) {
                        }
                    });
                },
                back() {
                    router.goRoute("sale_client_view", {id});
                }
            }
        });
    };
    return module.exports;
});