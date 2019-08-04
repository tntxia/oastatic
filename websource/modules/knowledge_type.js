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
        },
        gatheringId: null,
        totalAll: null,
        stotalAll: null,
        rTotalAll: null,
        gatheredAll: null,
        leftAll: null
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getUrl(row) {
            return "#knowledge_list?id=" + row.id
        },
        loadData() {},
        query() {
            let datagrid = this.$refs["gatheringTable"];
            datagrid.setParams(this.form);
            datagrid.loadData();
            this.loadData();
            console.log("query,,,", this.sdate, this.edate);
        },
        getMail() {
            $.ajax({
                url: webRoot + '/mail!getMail.do'
            }).done(function(data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert("操作失败：" + data.msg);
                }
            }).fail(function() {
                alert("操作异常");
            });
        },
        newMail() {
            let dialog = dialogVue.getDialog("mailNewDialog");
            dialog.show();
        }
    }
});