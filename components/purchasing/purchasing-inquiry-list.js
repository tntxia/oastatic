(function(globe){
if (!globe.Vue) {console.warn("可能你还没导入Vue的引用。。。");}
if(arguments.length<2) {console.warn('参数不对');return;}
for(let i=1;i<arguments.length;i++){
Vue.component(arguments[i].name, arguments[i]);
}
})(window, 

(()=>{let module = {};
module.exports = {
    name: 'purchasing-inquiry-list',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            dataset: {
                url: webRoot + '/purchasing/purchasing!listInquiry.do'
            }
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
                url: webRoot + "/sale/sale!getSaleUserList.do",
                success: function(data) {
                    vm.list = data;
                },
                error: function(e) {
                    console.error(e);
                }
            });
        },
        getUrl(row) {
            return webRoot + "/xjgl/dd-view.jsp?id=" + row.id
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        询价编号<input name=\"number\" type=\"text\" size=\"10\"> 产品型号\r\n        <input name=\"product\" type=\"text\" size=\"10\"> 品牌\r\n        <input name=\"supplier\" type=\"text\" size=\"10\"> 销售负责人\r\n        <saleman-select></saleman-select>\r\n        起始日期\r\n        <input type=\"text\" id=\"startdate\" name=\"startdate\" size=\"10\"> 终止日期\r\n        <input type=\"text\" id=\"enddate\" name=\"enddate\" size=\"10\">\r\n        <button @click=\"query\">检索</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"序号\" type=\"index\"></jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"询价编号\">\r\n                <template v-slot=\"row\">\r\n                    <a :href=\"getUrl(row)\" target=\"_blank\">{{row.number}}</a>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"产品型号\">\r\n                <template v-slot=\"row\">\r\n                            <a :href=\"getUrl(row)\" target=\"_blank\">{{row.product}}</a>\r\n                        </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"年份\" field=\"pro_p_year\">\r\n            </jxiaui-datagrid-item>\r\n\r\n            <jxiaui-datagrid-item label=\"封装\" field=\"cpro2\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"品牌\" field=\"supplier\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"数量\" field=\"quantity\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"目标价格\" field=\"price\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"询价日期\" field=\"xj_date\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"负责人\" field=\"saleMan\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"重要性\" field=\"c_types\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n</div>"
return module.exports;})(), 

)
