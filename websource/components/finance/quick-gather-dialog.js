module.exports = {
    data() {
        return {
            showFlag: false,
            ids: null,
            gatheringList: [],
            subjectList: [],
            callback: null
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
        setGatheringList(list) {
            list.forEach(g => {
                g.subject = this.subjectList[0].name;
                let total = g.total;
                let smoney = g.smoney;
                let toGather = Math.round((total - smoney) * 1000000) / 1000000;
                g.toGather = toGather + "";
            })
            this.gatheringList = list;
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        gather() {
            let gatheringList = this.gatheringList;
            if (!gatheringList || !gatheringList.length) {
                alert("请选择你要收款的项");
                return;
            }
            let total = 0;
            this.gatheringList.forEach(g => {
                let toGather = parseFloat(g.toGather);
                total += toGather;
            });
            if (confirm("是否确认收款，收款总金额：" + total)) {
                this.$http.post(webRoot + "/finance/finance!quickGather.do",
                    this.gatheringList).then(res => {
                    res = res.body;
                    if (res.success) {
                        this.hide();
                        if (this.callback) {
                            this.callback();
                        }
                    } else {
                        alert("收款失败");
                    }

                })
            }

        }
    },
    watch: {
        id() {
            this.fetchData();
        }
    }
}