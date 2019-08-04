module.exports = {
    data() {
        return {
            form: {
                number: null,
                coname: null,
                model: null,
                supplier: null
            },
            dataset: {
                url: webRoot + '/purchasing/purchasing!listWaitRk.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return webRoot + "/warehouse/in/purchasingDetail.mvc?id=" + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        }
    }
}