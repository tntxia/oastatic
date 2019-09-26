new Vue({
    el: '#container'
})

// var target = $("#container");

// var tabs = new JxiaUI({
// 	el:target,
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