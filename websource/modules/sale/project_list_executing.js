let url = webRoot + '/sale/sale!listProject.do';

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
            window.open(webRoot + '/sale/xmgl/xmglt.jsp');
        }
    }
});