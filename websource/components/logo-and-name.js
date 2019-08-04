module.exports = {
    data() {
        return {
            companyName: null,
            companyNameEn: null
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
                url: '/oa_static/json/app.json'
            }).done(function(data) {
                vm.companyName = data.companyName;
                vm.companyNameEn = data.companyNameEn;
            });
        }
    }
}