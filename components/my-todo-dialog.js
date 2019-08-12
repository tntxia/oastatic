(function(globe) {
    if (!globe.Vue) { console.warn("可能你还没导入Vue的引用。。。"); }
    if (arguments.length < 2) { console.warn('参数不对'); return; }
    for (let i = 1; i < arguments.length; i++) {
        Vue.component('my-todo-dialog', arguments[i]);
    }
})(window,

    (() => {
        let module = {};
        module.exports = {
    name: 'my-todo-dialog',
    data() {
        return {
            showFlag: false,
            username: null,
            title: null,
            items: []
        }
    },
    mounted() {
        this.fetchData();
    },
    updated() {},
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        fetchData: function() {
            let vm = this;
            $.ajax({
                url: webRoot + "/userAlert.do",
                success: function(data) {
                    vm.username = data.username;
                    vm.title = vm.username + "的待办事项"
                    vm.items = data.items;
                },
                error: function(e) {
                    console.error(e);
                }
            });
        },
        handleClick() {
            this.hide();
        }
    }
}
module.exports.template = "<jxiaui-dialog @close=\"hide\" v-if=\"showFlag\" :title=\"title\">\r\n    <div class=\"my-todo-dialog-content\">\r\n        <jxiaui-table-form v-if=\"items && items.length\">\r\n            <jxiaui-table-form-item :key=\"index\" :label=\"item.label\" v-for=\"(item,index) in items\" v-if=\"item.count>0\">\r\n                <a :href=\"item.url\" @click=\"handleClick\"> \r\n                    {{item.count}}\r\n                </a>\r\n            </jxiaui-table-form-item>\r\n        </jxiaui-table-form>\r\n    </div>\r\n</jxiaui-dialog>"
        return module.exports;
    })(),

)