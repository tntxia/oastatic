let id = router.getParam("id");

let url = `${webRoot}/client/client!listProject.do?id=${id}`;

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
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl: function(row) {
            return webRoot +
                "/sale/xmgl/view.mvc?id=" + row.id;
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
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            router.goRoute("sale_client_follow_new", { id });
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
                error: function(e) {}
            });
        },
        back() {
            router.goRoute("sale/client_view", { id });
        }
    }
});