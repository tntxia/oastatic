new Vue({
    el: '#app',
    data: {
        dataset: {
            url: webRoot + '/warehouse/warehouse!listSale.do',
            method: 'post',
            pageSize: 50
        },
        form: {
            number: null,
            coname: null,
            sub: null,
            epro: null,
            man: '',
            pp: null,
            startdate: null,
            enddate: null
        }
    },
    methods: {
        getUrl: function(row) {
            return webRoot +
                "/sale/ddgl/detailAudited.mvc?id=" + row.id;
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        }
    },
});