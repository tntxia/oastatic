(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('system', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = false;
    exports.init = function() {
        $.ajax({
    url: "/oa_static/json/manage_items.json",
    success: function(data) {
        $.each(data, function(i, d) {
            var row = $("<div>");
            if (d.items) {
                $.each(d.items, function(i, d) {
                    var but = $("<button>", {
                        text: d.name,
                        'class': 'manageButton',
                        url: d.url,
                        click: function() {
                            var url = $(this).attr("url");
                            goToThePage(url);
                        }
                    });
                    row.append(but);
                });
            } else {

                var hr = $("<div style='clear:both'><hr></div>");
                row.append(hr);
            }

            $("#manageBoard").append(row);
        });
    }
});

function goToThePage(url) {
    window.open(url, '_blank');
}
    };
    return module.exports;
});