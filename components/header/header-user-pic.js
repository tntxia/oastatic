(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('header-user-pic', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        let mainMenuSelected;
module.exports = {
    data() {
        return {
            src: '/static/images/no-user-pic.png'
        }
    },
    mounted() {
        this.loadData();
    },
    updated() {},
    methods: {
        loadData() {
            let me = this;
            $.ajax({
                url: 'user!picId.do'
            }).done(function(res) {
                if (res.success && res.picId) {
                    me.src = '/file_center/file!showPic.do?uuid=' + res.picId
                }
            })
        },
        toUpload() {
            this.$refs["picFile"].click();

        },
        // 上传用户图片
        uploadUserPic() {
            let userFile = this.$refs["picFile"].files[0];
            console.log("userFile", userFile);
            let formData = new FormData();
            formData.append("pic", userFile);
            $.ajax({
                url: 'user!uploadPic.do',
                type: "post",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
            }).done(function(res) {
                if (res.success) {
                    me.loadData();
                } else {
                    alert("操作失败");
                }
            })

        },
    }
}
module.exports.template = "<div style=\"display: inline-block;\">\r\n    <img :src=\"src\" style=\"border-radius: 50%;width: 25px;\" title=\"点击上传头像\" @click=\"toUpload\">\r\n    <input type=\"file\" style=\"display: none;\" ref=\"picFile\" @change=\"uploadUserPic\">\r\n</div>"
        return module.exports;
    })(),

)