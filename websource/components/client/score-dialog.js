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
        score() {
            let form = this.form;
            if (!form.rfq || !form.gmjl || !form.fk || !form.th) {
                alert("请完成所有的评分项");
                return;
            }
            $.ajax({
                url: webRoot + '/client/client!doScore.do',
                data: this.form,
                type: 'post',
                success: function(data) {
                    if (data.success) {
                        if (window.opener) {
                            window.opener.location.reload();
                        }
                        window.close();
                    } else {
                        alert("操作失败");
                    }
                }
            });
        }
    }
}