module.exports = {
    name: 'brand-select',
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
                url: webRoot + "/brand!list.do",
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