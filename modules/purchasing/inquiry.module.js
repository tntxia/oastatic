(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('purchasing/inquiry', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = true;
    exports.init = function() {
        new Vue({
    el: '#app',
    data: {

    },
    mounted() {},
    methods: {

    }
});
    };
    return module.exports;
});