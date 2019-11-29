(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('assay_sale_ranking_product', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.template = 'template/assay_sale_ranking_product.html';
    exports.init = function() {

    };
    return module.exports;
});