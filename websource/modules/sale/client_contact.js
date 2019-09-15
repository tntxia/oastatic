let id = router.getParam("id");

let url = `${webRoot}/client/client!getContactList.do?coId=${id}`;

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
            router.goRoute("sale_client_contact_new", { id });
        },
        del(id) {
            let me = this;
            $.ajax({
                url: webRoot + "/client/client!delContact.do",
                type: 'post',
                data: {
                    id: id
                },
                success: function(data) {
                    me.query();
                },
                error: function(e) {}
            });
        },
        back() {
            router.goRoute("sale_client_view", { id });
        }
    }
});