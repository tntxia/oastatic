$(function() {
    $.ajax({
        url: '/oa_static/json/app.json'
    }).done(function(data) {
        $(".company-name").html(data.companyName);
        $(".company-name-en").html(data.companyNameEn);
    });
	
})