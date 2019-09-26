(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('warehouse/in_manage', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = true;
    exports.init = function() {
        new Vue({
    el: '#container'
})
    };
    return module.exports;
});