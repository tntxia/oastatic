module.exports = {
    data() {
        return {
            showFlag: false,
            id: null,
            callback: null,
            coId: null,
            dataset: {
                url: webRoot + '/client/client!getContactList.do',
                method: 'post',
                params: {
                    coId: null
                }
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        init() {
            this.$http.post(webRoot + "/finance/finance!getFinanceAccountList.do").then(res => {
                this.subjectList = res.body;
            })
        },
        setCoId(coId) {
            this.dataset.params.coId = coId;
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
            debugger
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams({
                coId: coId,
            });
            datagrid.loadData();
        }
    }
}