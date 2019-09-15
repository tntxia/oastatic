(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('current-select', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: null,
            paywaySelectUrl: webRoot + '/current!list.do',
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
module.exports.template = "<div>\r\n    <jxiaui-select v-model=\"v\" :url=\"paywaySelectUrl\" value-name=\"currname\" label-name=\"currname\"></jxiaui-select>\r\n</div>"
        return module.exports;
    })(),

)