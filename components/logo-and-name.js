(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('logo-and-name', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
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
module.exports.template = "<div style=\"position: absolute;height: 59px;\">\r\n    <div class=\"logo\">\r\n    </div>\r\n    <div class=\"company-info\">\r\n        <div class=\"company-name\">{{companyName }}</div>\r\n        <div class=\"company-name-en\">{{companyNameEn }}</div>\r\n    </div>\r\n</div>"
        return module.exports;
    })(),

)