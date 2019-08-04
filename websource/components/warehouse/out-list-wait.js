module.exports = {
    data() {
        return {
            form: {
                epro: null,
                number: null,
                coname: null,
                model: null,
                epro: null
            },
            dataset: {
                url: webRoot + '/warehouse/warehouse!waitOutList.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + '/warehouse/out/operate.mvc?id=' + row.id;
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