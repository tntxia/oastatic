(function(name,module){
if(!window.modules){
window.modules=Object.create(null);
};
window.modules[name]=module();
})('purchasing_refund_list_approved',function(){
var module=Object.create(null);
var exports = Object.create(null);
module.exports=exports;
exports.init = function(){
	
	let url = webRoot+"/purchasing/purchasing!listRefundApproved.do";
	new Vue({
		el: '#app',
		data: {
			loading: false,
			dataset: {
				url: url,
				method: 'post',
				pageSize: 50
			},
			stasticLoading: false,
			brandList: [],
			form: {
				epro : null,
				supplier : ''
			},
			gatheringId: null,
			totalAll: null,
			stotalAll: null,
			rTotalAll: null,
			gatheredAll: null,
			leftAll: null
		},
		mounted() {
			this.loadData();
		},
		methods: {
			getUrl:function(row){
				return webRoot+"/xclient/product/thgl/ddd-view.jsp?id="+row.id
			},
			loadData() {
			},
			query() {
				let datagrid = this.$refs["datagrid"];
				datagrid.setParams(this.form);
				datagrid.loadData();
			}
		}
	});
	
};
return module.exports;});