let url = webRoot + "/checkwork/checkwork!list.do";

let pid = router.getParam("id");

new Vue({
    el: '#app',
    data: {
        loading: false,
        newMailCount: 0,
        dataset: {
            url: url,
            params: {
                pid: pid
            },
            method: 'post',
            pageSize: 50
        },
        form: {
            user: '',
            sdate: '',
            edate: null
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        back() {
            router.goRoute("knowledge_type");
        },
        toAdd() {
            window.open("fvfg/ngz.jsp");
        },
        getUrl(row) {
            return "knowledgeView.mvc?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        }
    }
});