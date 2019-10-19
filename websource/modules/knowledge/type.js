let url = webRoot + "/knowledge!listType.do";

new Vue({
    el: '#app',
    data: {
        loading: false,
        newMailCount: 0,
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        form: {
            year: '',
            month: '',
            coname: null,
            fpnum: null,
            sdate: null,
            edate: null,
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl(row) {
            return "#knowledge/list?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["gatheringTable"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            this.loadData();
            console.log("query,,,", this.sdate, this.edate);
        }
    }
});