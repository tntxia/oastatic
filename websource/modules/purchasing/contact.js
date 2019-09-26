let url = webRoot + "/purchasing/supplier!listContact.do";
new Vue({
    el: '#app',
    data: {
        dataset: {
            url: url,
            method: 'post',
            pageSize: 50
        },
        form: {
            name: null
        }
    },
    mounted() {},
    methods: {
        getUrl: function(row) {
            return webRoot + "/qcontact/c-main-1v.jsp?id=" + row.nameid
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        toAdd() {
            window.open(webRoot + '/supplier/new.mvc');
        },
        toImport() {
            window.open(webRoot + '/supplier/import.mvc');
        }
    }
});