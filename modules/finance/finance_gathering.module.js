(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('finance_gathering', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.template = 'template/finance_gathering.html';
    exports.init = function() {




    };
    return module.exports;
});