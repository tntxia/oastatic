(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('header-user-pic', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
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
        // 加载用户的图片数据
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
        // 打开上传文件窗口
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

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('unit-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: null,
            unitList: []
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
                url: 'unit!list.do'
            }).done(function(res) {

                if (res && res.length) {
                    me.v = res[0].punit_name;
                }
                me.unitList = res;
            })
        }
    },
    watch: {
        v() {
            this.$emit("input", this.v);
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option v-for=\"u in unitList\">{{u.punit_name}}</option>\r\n</select>"
        return module.exports;
    })(),

);
(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('tax-select', arguments[i]);
    }
})(window,

    (() => {
        let module = Object.create(null);
        module.exports = {
    props: ['value'],
    data() {
        return {
            v: "不含税",
            taxList: ["不含税", "增值发票3%", "普通发票3%", "普通发票13%", "增值发票13%", "普通发票16%", "增值发票16%", "普通发票17%", "增值发票17%", "商业发票"]
        }
    },
    mounted() {
        if (this.value) {
            this.v = this.value;
        }
    },
    updated() {},
    methods: {},
    watch: {
        v() {
            this.$emit("input", this.v);
        }
    }
}
module.exports.template = "<select v-model=\"v\">\r\n    <option v-for=\"t in taxList\">{{t}}</option>\r\n</select>"
        return module.exports;
    })(),

);