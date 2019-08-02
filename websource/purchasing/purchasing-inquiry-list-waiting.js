module.exports = {
    name: 'purchasing-inquiry-list-waiting',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            dataset: {
                url: webRoot + '/purchasing/purchasing!listInquiryToReply.do'
            }
        }
    },
    mounted() {
        this.v = this.value;
        this.fetchData();
    },
    updated() {},
    methods: {
        handleChange() {
            this.$emit("input", this.v);
        },
        fetchData: function() {
            let vm = this;
            $.ajax({
                url: webRoot + "/sale/sale!getSaleUserList.do",
                success: function(data) {
                    vm.list = data;
                },
                error: function(e) {
                    console.error(e);
                }
            });
        },
        getUrl(row) {
            return webRoot + "/xjgl/quote-view.jsp?id=" + row.id
        },
        query() {

        },
        queryReplied() {
            window.open(webRoot + "/xjgl/imain.jsp");
        },
        sortByProduct() {
            window.open(webRoot + "/xjgl/ppmain.jsp");
        }
    }
}