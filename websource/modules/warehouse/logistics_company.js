$("#addBtn").click(function() {

});

new Vue({
    el: '#app',
    data: {
        form: {
            number: null,
            saleNumber: null
        },
        dataset: {
            url: webRoot + '/warehouse/warehouse!getHdCompanyList.do',
            method: 'post'
        }
    },
    methods: {
        toAdd() {
            window.open(webRoot + '/dzzz/ysgl/hdgst.mvc');
        },
        getUrl(row) {
            return webRoot + '/dzzz/ysgl/hdview.mvc?id=' + row.id;
        },
        del(row) {
            if (confirm("确实要删除吗？")) {
                let row = $(this).data("row");
                let id = row.id;
                $.ajax({
                    url: webRoot + '/warehouse/warehouse!delLogisticsCompany.do',
                    type: 'post',
                    data: {
                        id
                    }
                }).done(function(res) {
                    if (res.success) {
                        alert("操作成功");
                        window.location.reload();
                    } else {
                        alert("操作失败：" + res.msg);
                    }
                })
            }
        }
    }
});