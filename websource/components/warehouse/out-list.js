module.exports = {
    data() {
        return {
            form: {
                coname: null,
                number: null,
                sub: null,
                model: null,
                startdate: null,
                enddate: null
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