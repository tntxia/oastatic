(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'user-select',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            v: null,
            list: []
        }
    },
    mounted() {
        this.v = this.value;
        this.fetchData();
    },
    updated() {},
    methods: {
        handleChange() {
            this.$emit("input", this.v);
        },
        fetchData: function() {
            let vm = this;
            $.ajax({
                url: webRoot + "/user!list.do",
                success: function(data) {
                    vm.list = data;
                },
                error: function(e) {
                    console.error(e);
                }
            });
        }
    }
}
module.exports.template = "<select v-model=\"v\" @change=\"handleChange\">\r\n    <option value=\"\">请选择</option>\r\n    <option v-for=\"user in list\">{{user.name}}</option>\r\n</select>"
return module.exports;})(), 

)
