module.exports = {
    props: ['value'],
    data() {
        return {
            v: null,
            paywaySelectUrl: webRoot + '/payway!list.do',
        }
    },
    mounted() {
        if (this.value) {
            this.v = this.value;
        }
    },
    updated() {},
    methods: {

    },
    watch: {
        v() {
            this.$emit("input", this.v);
        }
    }
}