module.exports = {
    data() {
        return {
            form: {
                ddnum: null,
                orderNumber: null,
                coname: null,
                model: null,
                supplier: null
            },
            dataset: {
                url: webRoot + "/warehouse/warehouse!getOutList.do",
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + "/warehouse/out/operate.mvc?id=" + row.ddid;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        toAdd() {
            window.open(webRoot + '/warehouse/in/new.mvc', '_blank');
        }
    }
}