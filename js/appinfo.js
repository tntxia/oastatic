$(function() {
    $.ajax({
        url: '/oa_static/json/app.json'
    }).done(function(data) {
        $(".company-name").html(data.companyName);
        $(".company-name-en").html(data.companyNameEn);
    });
	$.ajax({
		url:webRoot+"/logininfo.do"
	}).done(res=>{
		$("#loginList").empty();
		$("#online-num").text(res.loginList.length);
		$.each(res.loginList,function(i,d){
			$("#loginList").append(d+";")
		})
	})
})