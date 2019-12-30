(function(name, moduleFun) {
    if (!window.modules) {
        window.modules = Object.create(null);
    };
    let module = moduleFun();
    if (arguments.length > 2) {
        let components = Object.create(null);
        for (let i = 2; i < arguments.length; i++) {
            let name = arguments[i];
            i++;
            let func = arguments[i];
            if (!func) {
                continue;
            }
            let component = func();
            components[name] = component;
        }
        module.components = components;
    }

    window.modules[name] = module;
})('warehouse/out_manage', function() {
        var module = Object.create(null);
        var exports = Object.create(null);
        module.exports = exports;

        
        module.exports.template = "<div id=\"container\">\r\n    <jxiaui-tabs>\r\n        <jxiaui-tabs-item label=\"销售待出库列表\" template=\"warehouse/out/template_to_out.mvc\" onload=\"loadWait\">\r\n            <out-list-wait></out-list-wait>\r\n        </jxiaui-tabs-item>\r\n        <jxiaui-tabs-item label=\"样品待出库列表\" template=\"warehouse/out/template_sample_to_out.mvc\" onload=\"loadWaitSample\">\r\n            <warehouse-out-list-sample></warehouse-out-list-sample>\r\n        </jxiaui-tabs-item>\r\n        <jxiaui-tabs-item label=\"退货待出库列表\" template=\"warehouse/out/template_refund_to_out.mvc\" onload=\"loadWaitRefund\">\r\n            <warehouse-out-list-refund></warehouse-out-list-refund>\r\n        </jxiaui-tabs-item>\r\n        <jxiaui-tabs-item label=\"已出库列表\" template=\"warehouse/out/template_outed.mvc\">\r\n            <warehouse-out-list></warehouse-out-list>\r\n            </jxia-tabs-item>\r\n    </jxiaui-tabs>\r\n</div>";
        

        exports.init = function() {
            new Vue({
    el: '#container',
    components: this.components
});
// var tabs = new JxiaUI({
// 	methods: {
// 		loadWaitRefund() {
// 			listWaitRefund();
// 		},
// 		loadOuted() {
// 			new Vue({
// 				el:'#outed',
// 				data:{
// 					coname:null,
// 					model:null,
// 					sub:null,
// 					number:null,
// 					totalAmount:0,
// 					page:1,
// 					totalPage:0,
// 					rows:[]
// 				},
// 				created:function(){
// 					this.fetchData();
// 				},
// 				methods:{
// 					fetchData:function(){

// 						var vm = this;

// 						var coname = vm.coname;
// 						var model = vm.model;
// 						var number = vm.number;

// 						$.ajax({
// 							url:webRoot+'/warehouse/warehouse!getOutList.do',
// 							type:'post',
// 							data:{
// 								coname:coname,
// 								model:model,
// 								number:number,
// 								page:vm.page,
// 								pageSize:50,
// 								totalAmount:0,
// 								totalPage:0
// 							},
// 							success:function(data){
// 								vm.page = data.page;
// 								vm.totalAmount = data.totalAmount;
// 								vm.rows = [];
// 								$.each(data.rows,function(i,r){
// 									vm.rows.push(r);
// 								});

// 								vm.totalPage = data.totalPage;
// 							}
// 						});
// 					},
// 					nextPage:function(){
// 						this.page++;
// 						this.fetchData();
// 					},
// 					prevPage:function(){
// 						this.page--;
// 						this.fetchData();
// 					},
// 					getUrl:function(ddid){
// 						return webRoot+"/warehouse/out/operate.mvc?id=" + ddid;
// 					}
// 				}
// 			});
// 		}
// 	}
// });

// 	$("#waitOutListSearchForm").buildform({
// 		actions: {
// 			search() {
// 				let paramMap = this.getParamMap();
// 				grid.load(paramMap);
// 			}
// 		}
// 	});
// }

// function listWaitRefund(){

// 	let target = $("#waitRefundList");

// 	let grid = new BootstrapGrid({
// 		url:webRoot+'/warehouse/warehouse!waitRefundList.do',
// 		target:target,
// 		cols:[{
// 			label:'退货编号',
// 			field:'number',
// 			renderer:function(value,data){
// 				var a = $("<a>",{
// 					text:data.number,
// 					target:'_blank',
// 					href:webRoot+'/server/thgl/th-view.jsp?t=111&id='+data.id
// 				});
// 				return a;
// 			}
// 		},{
// 			field:'coname',
// 			label:'客户名称'
// 		},{
// 			field:'man',
// 			label:'申请人'
// 		},{
// 			field:'state',
// 			label:'当前状态'
// 		}]
// 	});
// 	grid.init();
// }
        };
        return module.exports;
    }

    ,
    'out-list-wait',
    function() {
        var module = Object.create(null);
        module.exports = {

    data() {
        return {
            form: {
                epro: null,
                number: null,
                coname: null,
                model: null,
                epro: null
            },
            dataset: {
                url: webRoot + '/warehouse/warehouse!waitOutList.do',
                method: 'post'
            }
        }
    },
    mounted() {},
    updated() {},
    methods: {
        getUrl(row) {
            return '#warehouse/out_operate?id=' + row.id;
        },
        query: function() {
            let datagrid = this.$refs["datagrid"];
            datagrid.setParams(this.form);
            datagrid.query();
        },
        toAdd() {
            window.open(webRoot + '/warehouse/in/new.mvc', '_blank');
        }
    }
}
module.exports.template = "<div>\r\n    <div>\r\n        <span>型号： </span><input v-model=\"form.epro\">\r\n        <span>客户名称：</span><input v-model=\"form.coname\">\r\n        <span>负责人：</span><input v-model=\"form.man\">\r\n        <span>销售合同号：</span><input v-model=\"form.number\">\r\n        <span>发货时间：</span><input v-model=\"form.number\">\r\n        <button @click=\"query\">查询</button>\r\n        <button @click=\"toAdd\">新增</button>\r\n    </div>\r\n    <div>\r\n        <jxiaui-datagrid class=\"table\" ref=\"datagrid\" :dataset=\"dataset\">\r\n            <jxiaui-datagrid-item label=\"合同编号\">\r\n                <template v-slot=\"row\">\r\n                    <a :href=\"getUrl(row)\">{{row.number}}</a>\r\n                </template>\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"公司合同号\" field=\"sub\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"客户名称\" field=\"coname\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"申请人\" field=\"man\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"状态\" field=\"state\">\r\n            </jxiaui-datagrid-item>\r\n            <jxiaui-datagrid-item label=\"发货日期\" field=\"send_date\">\r\n            </jxiaui-datagrid-item>\r\n        </jxiaui-datagrid>\r\n    </div>\r\n\r\n</div>";
        return module.exports;
    }
    
);