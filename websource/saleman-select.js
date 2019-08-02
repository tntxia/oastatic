module.exports = {
    name: 'saleman-select',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            v: null,
            list: []
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
        }
    }
}