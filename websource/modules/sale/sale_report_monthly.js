let yearSelectComp = {
    template: '<select v-model="y"><option v-for="y in yearList">{{y}}</option></select>',
    props: ['value'],
    data() {
        return {
            y: null,
            yearList: []
        }
    },
    mounted() {
        let now = new Date();
        let thisYear = now.getFullYear();
        if (this.value) {
            this.y = this.value;
        } else {
            this.y = thisYear;
        }

        for (let i = 2006; i <= thisYear; i++) {
            this.yearList.push(i);
        }
    },
    watch: {
        y() {
            this.$emit("input", this.y);
        }
    }
}

let monthSelectComp = {
    template: '<select v-model="m"><option v-for="m in monthList">{{m}}</option></select>',
    data() {
        return {
            m: 1,
            monthList: []
        }
    },
    mounted() {
        if (this.value) {
            this.m = this.value;
        } else {
            this.$emit("input", this.m);
        }
        for (let i = 1; i <= 12; i++) {
            this.monthList.push(i);
        }
    },
    watch: {
        m() {
            this.$emit("input", this.m);
        }
    }
}

new Vue({
    el: '#app',
    data: {
        loading: false,
        dataset: {
            url: 'sale/report!saleReportMonth.do',
            method: 'post',
            pageSize: 50
        },
        form: {
            year: null,
            month: null
        }
    },
    components: {
        'year-select': yearSelectComp,
        'month-select': monthSelectComp
    },
    mounted() {},
    methods: {
        getUrl: function(row) {
            return webRoot +
                "/sale/quote/view.mvc?id=" + row.id;
        },
        query() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.loadData();
        },
        exportData() {
            $.ajax({
                url: 'sale/report!exportSaleReportMonth.do',
                data: this.form
            }).done(function(res) {
                if (res.success) {
                    window.open("/ReportCenter/view.mvc?id=" + res.uuid);
                }
            })
        },
        toAdd() {
            let url = webRoot +
                "/sale/quote/new.mvc";
            window.open(url);
        },
        chooseInquiry() {
            window.open(webRoot +
                "/sale/quote/xjmain.jsp");
        }
    }
});