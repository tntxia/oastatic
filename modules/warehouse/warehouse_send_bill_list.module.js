(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('warehouse_send_bill_list', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.template = 'template/sendBill/list.html';
    exports.init = function() {

    };
    return module.exports;
});