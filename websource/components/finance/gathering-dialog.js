module.exports = {
    data() {
        return {
            id: null,
            showFlag: false,
            showNoteFlag: false,
            noteValue: '',
            orderform: null,
            custno: null,
            total: null,
            total_out_house: null,
            ymoney: null,
            smoney: null,
            bank: null,
            coname: null,
            co_number: null,
            yjskdate: null,
            sjdate: null,
            sjskdate: null,
            mode: null,
            rate: null,
            i_man: null,
            sendcompany: null,
            remark: null,
            saleman: null,
            sale_dept: null,
            priceTotal: {},
            note: null,
            yjskdate: null,
            sjdate: null,
            sjskdate: null,
            rate: null,
            i_man: null,
            mode: null,
            bankaccounts: null,
            remark: null,
            proList: [],
            needGather: false,
            subjectList: [],
            form: {
                id: null,
                ticketNo: null,
                toGather: 0,
                subject: null
            }
        }
    },
    mounted() {
        this.initToGather();
        this.fetchData();
    },
    updated() {},
    methods: {
        setData(data) {
            for (let k in data) {
                this[k] = data[k];
            }
            this.form.id = data.id;
            this.initToGather();
        },
        // 初始化待收款金额
        initToGather() {
            this.form.toGather = (this.total - this.smoney) + "";
        },
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
            router.goRoute("finance_gathering");
        },
        fetchData: function() {

            this.$http.post(webRoot + "/finance/finance!getFinanceAccountList.do").then(res => {
                this.subjectList = res.body;
                if (this.subjectList && this.subjectList.length) {
                    this.form.subject = this.subjectList[0].name;
                }
            })

            var vm = this;
            let id = this.id;

            if (!id) {
                return;
            }
            $.ajax({
                url: webRoot + "/finance/finance!getGatheringDataById.do",
                data: {
                    id
                }
            }).done(function(data) {
                if (data.states == "待收款") {
                    vm.needGather = true;
                }
                vm.orderform = data.orderform;
                vm.custno = data.custno;
                vm.smoney = data.smoney;
                vm.total = data.total;
                vm.ymoney = data.ymoney;
                vm.bank = data.bank;
                vm.coname = data.coname;
                vm.co_number = data.co_number;
                vm.note = data.note;
                vm.yjskdate = data.yjskdate;
                vm.sjdate = data.sjdate;
                vm.sjskdate = data.sjskdate;
                vm.rate = data.rate;
                vm.i_man = data.i_man;
                vm.sendcompany = data.sendcompany;
                vm.mode = data.mode;
                vm.bankaccounts = data.bankaccounts;
                vm.remark = data.remark;
                vm.proList = data.proList;
                vm.priceTotal = data.priceTotal;
            })
            console.log("fetchData");
        },
        editInvoiceBtn: function() {
            window.open(webRoot + "/finance/editTax.mvc?id=" + this.id);
        },
        gather() {
            if (confirm("是否确认收款，收款金额：" + this.form.toGather)) {
                this.$http.post(webRoot + "/finance/finance!gather.do", this.form).then(res => {
                    let data = res.body;
                    if (data.success) {
                        window.location.reload();
                    } else {
                        alert("操作失败");
                    }
                }, e => {
                    alert("操作异常");
                });
            }
        },
        addCredit: function() {
            window.open(webRoot + "/finance/addCredit.mvc?id=" + this.id);
        },
        toNoteIt: function() {
            this.showNoteFlag = true;
        },
        cancelNote: function() {
            this.showNoteFlag = false;
        },
        noteIt: function() {
            var noteValue = this.noteValue;
            $.ajax({
                url: webRoot + "/finance/finance!comment.do",
                type: 'post',
                data: {
                    id: this.id,
                    noteValue: noteValue
                }
            }).done(function(data) {
                if (data.success) {
                    window.location.reload();
                } else {
                    alert("操作失败");
                }
            }).fail(function() {
                alert("操作异常");
            })
        }

    },
    watch: {
        id() {
            this.fetchData();
        }
    }
}