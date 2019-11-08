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