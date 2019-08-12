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