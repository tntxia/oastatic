module.exports = {
    name: 'purchasing-inquiry-list',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            dataset: {
                url: webRoot + '/purchasing/purchasing!listInquiry.do'
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
            return webRoot + "/xjgl/dd-view.jsp?id=" + row.id
        }
    }
}