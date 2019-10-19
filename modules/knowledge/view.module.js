(function(name, module) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    window.modules[name] = module();
})('knowledge/view', function() {
    var module = Object.create(null);
    var exports = Object.create(null);
    module.exports = exports;
    exports.leftbar = false;
    exports.init = function() {
        let id = router.getParam("id");
new Vue({
    el: '#app',
    data: {
        form: {}
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            let me = this;
            let url = webRoot + "/knowledge!detail.do";
            $.ajax({
                url: url,
                data: {
                    id: id
                }
            }).done(function(res) {
                me.form = res;
            })
        },
        uploadAttachment() {
            let input = this.$refs["attachment"];
            let formData = new FormData();
            let file = input.files[0];
            formData.append("id", id);
            formData.append("attachment", file);
            let me = this;
            $.ajax({
                url: 'knowledge!uploadAttachment.do',
                type: "post",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    alert("操作成功");
                    me.listAttachment();
                } else {
                    alert("操作失败");
                }
            })
        },
        listAttachment() {
            let me = this;
            $.ajax({
                url: 'knowledge!getAttachmentList.do',
                type: "post",
                cache: false,
                data: {
                    id: id
                }
            }).done(function(res) {
                me.form.attachList = res;
            })
        }
    }
})
    };
    return module.exports;
});