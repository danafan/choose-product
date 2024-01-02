<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="供应商：">
						<el-select v-model="gys" clearable multiple filterable remote reserve-keyword placeholder="请输入供应商" :remote-method="ajaxSupplierNo" collapse-tags>
							<el-option v-for="item in gys_list" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="款式编码：">
						<el-select v-model="ksbm" clearable multiple filterable remote reserve-keyword placeholder="请输入款式编码" :remote-method="ajaxKsbm" collapse-tags>
							<el-option v-for="item in ksbm_list" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="仓库位置：">
						<el-select v-model="ckwz" clearable multiple filterable reserve-keyword placeholder="请输入仓库位置" collapse-tags>
							<el-option v-for="item in ckwz_list" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" @click="exportFn" v-if="button_list.export == 1">导出</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column label="供应商" prop="gys"></el-table-column>
					<el-table-column label="款式编码" prop="ksbm"></el-table-column>
					<el-table-column label="库存数量" prop="sl"></el-table-column>
					<el-table-column label="仓库位置" prop="ckwz"></el-table-column>
				</el-table>
			</div>
			<PaginationWidget :total="total" :page="page" :show_multiple="false" :pagesize="10" @checkPage="checkPage"/>
		</el-card>
	</div>
</template>
<style type="text/css">
	.card_box .el-card__body{
		height: 100%!important;
		display: flex!important;
		flex-direction: column!important;
		padding-top: 0!important;
		padding-bottom: 0!important;
	}
</style>
<style lang="less" scoped>
</style>
<script>
	import commonResource from '../../../../api/common_resource.js'
	import resource from '../../../../api/chain_resource.js'
	import { MessageBox, Message } from "element-ui";

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				gys_list:[],				//供应商列表
				gys:[],						//选中的供应商
				ksbm_list:[],				//款式编码列表
				ksbm:[],					//选中的款式编码
				ckwz_list:[],				//仓库位置列表
				ckwz:[],					//选中的仓库位置
				max_height:0,	
				page:1,
				button_list:{},
				tableData:[],				//获取的数据
				total:0
			}
		},
		created(){
			//供应商编码
			this.ajaxSupplierNo();
			//款式编码
			this.ajaxKsbm();
			//仓库位置列表
			this.ajaxVisitUser();
			//获取列表
			this.getData();
		},
		mounted() {
    		//获取表格最大高度
			this.onResize();
			window.addEventListener("resize", this.onResize());
		},
		methods: {
    		//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 70 + "px";
				});
			},
			//供应商编码
			ajaxSupplierNo(e){
				let arg = {}
				if(e){
					arg['name'] = e
				}
				resource.ajaxSupplierNo(arg).then(res => {
					if(res.data.code == 1){
						this.gys_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//款式编码
			ajaxKsbm(e){
				let arg = {}
				if(e){
					arg['name'] = e
				}
				resource.ajaxKsbm(arg).then(res => {
					if(res.data.code == 1){
						this.ksbm_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//仓库位置列表
			ajaxVisitUser(){
				resource.ajaxCkwz().then(res => {
					if(res.data.code == 1){
						this.ckwz_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取列表
			getData(){
				let arg = {
					ksbm:this.ksbm.join(','),
					ckwz:this.ckwz.join(','),
					gys:this.gys.join(','),
					page:this.page,
					pagesize:10
				}
				this.loading = true;
				resource.supplierManagerStock(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						this.button_list = data.button_list;
						this.tableData = data.data;
						this.total = data.total;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取列表
				this.getData();
			},
			//导出
			exportFn(){
				MessageBox.confirm("确认导出?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
				.then(() => {
					let arg = {
						ksbm:this.ksbm.join(','),
						ckwz:this.ckwz.join(','),
						gys:this.gys.join(','),
					}
					var arr = [];
					for(let k in arg){
						if(arg[k]){
							arr.push(`${k}=${arg[k]}`)
						}
					}
					let baseURL = `${location.origin}/api/supplier_manager/stock_export?${arr.join('&')}`;
					window.open(baseURL)
				})
				.catch(() => {
					Message({
						type: "info",
						message: "取消导出",
					});
				});
			},
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






