<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item class="form_item">
					<el-input clearable v-model="supplier_name" placeholder="供应商"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-input clearable v-model="main_business" placeholder="主营业务"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="供应商名称" prop="supplier_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="供应商地址" prop="address" show-overflow-tooltip></el-table-column>
				<el-table-column label="供应商联系方式" width="120" prop="contact_information" show-overflow-tooltip></el-table-column>
				<el-table-column label="主营" prop="main_business" show-overflow-tooltip></el-table-column>
				<el-table-column label="微信" prop="weixin" show-overflow-tooltip></el-table-column>
				<el-table-column label="拍照">
					<template slot-scope="scope">
						{{scope.row.supply_photograph == 1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column label="退货">
					<template slot-scope="scope">
						{{scope.row.supply_return_goods == 1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column label="换货">
					<template slot-scope="scope">
						{{scope.row.supply_exchange_goods == 1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column label="代发">
					<template slot-scope="scope">
						{{scope.row.supply_replace_send == 1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column label="入仓">
					<template slot-scope="scope">
						{{scope.row.supply_warehousing == 1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column label="结算">
					<template slot-scope="scope">
						{{scope.row.supply_monthly_settlement == 1?'月结':'现结'}}
					</template>
				</el-table-column>
				<el-table-column label="评级" prop="grade_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="getDetail(scope.row.supplier_id)" v-if="button_list.view == 1">查看</el-button>
						<el-button type="text" size="small" @click="addFn('2',scope.row.supplier_id)" v-if="button_list.edit == 1">编辑</el-button>
						<el-button type="text" size="small" @click="deleteFn(scope.row.supplier_id)" v-if="button_list.del == 1">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="data.total" :page="page" @checkPage="checkPage"/>
		</el-card>
	</div>
</template>
<style lang="less" scoped>
.chain_page_content{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 24rem;
	display: flex;
	flex-direction: column;
	.form_card{
		margin-bottom: 16rem;
		.form_item{
			margin-bottom:0 !important;
		}
	}
	.card_box{
		flex:1;
	}
}
</style>
<script>
	import resource from '../../../api/chain_resource.js'

	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				supplier_name:"",			//供应商名称
				main_business:"",			//主营业务
				max_height:0,	
				page:1,
				data:{},				//获取的数据
				button_list:{}
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path == '/chain_supplier_detail' || to.path == '/add_edit_supplier'){	
				from.meta.use_cache = true;
			}else{
				from.meta.use_cache = false;
			}
			next();
		},
		activated(){
			if(!this.$route.meta.use_cache){
				this.supplier_name = "";
				this.main_business = "";
				this.page = 1;
			}
			//获取供应商列表
			this.supplierManagerList();
			this.$route.meta.use_cache = false;
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
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
    				let card_box_height = document.getElementById("card_box").offsetHeight;
    				let table_title_height = document.getElementById("table_title").offsetHeight;
    				let bottom_row_height = document.getElementById("bottom_row").offsetHeight;
    				this.max_height =
    				card_box_height -
    				table_title_height -
    				bottom_row_height -
    				50 +
    				"px";
    			});
    		},
    		//获取供应商列表
    		supplierManagerList(){
    			let arg = {
    				supplier_name:this.supplier_name,
    				main_business:this.main_business,
    				pagesize:10,
    				page:this.page
    			}
    			this.loading = true;
    			resource.supplierManagerList(arg).then(res => {
    				if(res.data.code == 1){
    					this.loading = false;
    					this.data = res.data.data;
    					this.button_list =  res.data.data.button_list;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取供应商列表
				this.supplierManagerList();
			},
			//点击查看
			getDetail(supplier_id){
				this.$router.push(`/chain_supplier_detail?supplier_id=${supplier_id}`);
			},
			//点击添加或编辑
			addFn(type,supplier_id){
				if(type == '1'){
					this.$router.push('/add_edit_supplier?supplier_type=1')
				}else{
					this.$router.push(`/add_edit_supplier?supplier_type=2&supplier_id=${supplier_id}`);
				}
			},
			//点击删除
			deleteFn(supplier_id){
				this.$confirm('确认删除该供应商?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						supplier_id:supplier_id
					}
					resource.supplierManagerDel(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取供应商列表
							this.supplierManagerList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
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






