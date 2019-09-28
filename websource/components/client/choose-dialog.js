module.exports = {
    data() {
        return {
            showFlag: false,
            id: null,
            callback: null,
            form: {
                id: null,
                rfq: null,
                gmjl: null,
                fk: null,
                th: null
            },
            dataset: {
                url: webRoot + '/client/client!list.do',
                method: 'post'
            }
        }
    },
    mounted() {
        this.init();
    },
    updated() {},
    methods: {
        init() {
            this.$http.post(webRoot + "/finance/finance!getFinanceAccountList.do").then(res => {
                this.subjectList = res.body;
            })
        },
        setCallback(callback) {
            this.callback = callback;
        },
        setId(id) {
            this.form.id = id;
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        choose(row) {
            if (this.callback) {
                this.callback(row);
            }
            this.hide();
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        }
    }
}