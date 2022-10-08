<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item label="需求类型：">
					<el-select v-model="demand_type" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in demand_list" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求状态：">
					<el-select v-model="status_id" clearable placeholder="全部">
						<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求部门：">
					<el-select v-model="select_main_dept_id" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in dept_list" :key="item.main_dept_id" :label="item.main_dept_name" :value="item.main_dept_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="需求人：">
					<el-select v-model="select_userid" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in user_list" :key="item.ding_user_id" :label="item.ding_user_name" :value="item.ding_user_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="店铺：">
					<el-select v-model="shop_code" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="供应商：">
					<el-select v-model="supplier_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类目：">
					<el-select v-model="category_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="拍摄风格：">
					<el-select v-model="shooting_style_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="市场：">
					<el-select v-model="market_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类：">
					<el-select v-model="classification_ids" clearable multiple filterable collapse-tags placeholder="全部">
						<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary">导出</el-button>
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="款号" prop="style_id" show-overflow-tooltip></el-table-column>
				<el-table-column label="款式编码" prop="i_id" show-overflow-tooltip></el-table-column>
				<el-table-column label="图片" width="120">
					<template slot-scope="scope">
						<div v-if="scope.row.images.length == 0">暂无</div>
						<el-image :z-index="2006" class="image" :src="scope.row.images[0]" fit="scale-down" :preview-src-list="scope.row.images" v-else></el-image>
					</template>
				</el-table-column>
				<el-table-column label="成本价" prop="cost_price" show-overflow-tooltip></el-table-column>
				<el-table-column label="售卖价" prop="selling_price" show-overflow-tooltip></el-table-column>
				<el-table-column label="需求人" prop="ding_user_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="需求店铺" prop="shop_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="需求部门" prop="select_main_dept_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="需求日期" prop="demand_date" show-overflow-tooltip></el-table-column>
				<el-table-column label="需求类型" prop="demand_type" show-overflow-tooltip></el-table-column>
				<el-table-column label="发货类型" prop="send_type" show-overflow-tooltip></el-table-column>
				<el-table-column label="提交时间" prop="select_time" show-overflow-tooltip></el-table-column>
				<el-table-column label="共享盘地址" prop="shared_disk_address" show-overflow-tooltip></el-table-column>
				<el-table-column label="供应商" prop="supplier_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="需求状态" prop="common_text" show-overflow-tooltip>
					<template slot-scope="scope">
						<div v-if="scope.row.audit_status == 0">已撤销</div>
						<div v-if="scope.row.audit_status == 1">待审核</div>
						<div v-if="scope.row.audit_status == 2">已确认</div>
						<div v-if="scope.row.audit_status == 3">已取消</div>
						<div v-if="scope.row.audit_status == 4">已拒绝</div>
					</template>
				</el-table-column>
				<el-table-column label="备注" prop="select_remark" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="160" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if="scope.row.check_status == 1 && button_list.agree_refuse == 1" @click="auditFn('1',scope.row.style_id)">同意</el-button>
						<el-button type="text" size="small" v-if="scope.row.check_status == 1 && button_list.agree_refuse == 1" @click="auditFn('2',scope.row.style_id)">拒绝</el-button>
						<el-button style="margin-right: 10px" type="text" size="small" v-if="scope.row.check_status == 2" @click="$router.push('/image_setting?style_id=' + scope.row.style_id)">图片管理</el-button>
						<el-dropdown size="small" @command="handleCommand($event,scope.row.style_id)" v-if="scope.row.check_status == 2">
							<el-button type="text" size="small">
								更多<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="1" v-if="button_list.info == 1">查看</el-dropdown-item>
								<el-dropdown-item command="2" v-if="button_list.edit == 1">编辑</el-dropdown-item>
								<el-dropdown-item command="3" v-if="button_list.del == 1">删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-button type="text" size="small" v-if="scope.row.check_status == 2 && button_list.in_out == 1" @click="checkStatus(scope.row.style_id,scope.row.status)">{{scope.row.status == 1?'下架':'上架'}}</el-button>
						<el-button type="text" size="small" v-if="scope.row.check_status == 3" @click="$router.push('/edit_goods?page_type=goods&goods_type=2&style_id=' + scope.row.style_id)">重新提交</el-button>
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
		.image{
			width: 58rem;
			height: 58rem;
		}
	}
	.down_box{
		display:flex;
		padding:30rem 0;
		.upload_box{
			margin-left: 10px;
			position: relative;
			.upload_file{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
	}
}
</style>
<script>
	import commonResource from '../../../api/common_resource.js'
	import resource from '../../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../../api/date.js";

	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				demand_list:[],			//需求类型
				demand_type:[],			//选中的需求类型
				status_list:[{
					name:'已撤销',
					id:0
				},{
					name:'待审核',
					id:1
				},{
					name:'已确认',
					id:2
				},{
					name:'已取消',
					id:3
				},{
					name:'已拒绝',
					id:4
				}],						//需求状态
				status_id:"",			//选中的需求状态
				dept_list:[],			//所有部门列表
				select_main_dept_id:[], //所有部门列表
				user_list:[],			//所有用户列表
				select_userid:[],		//选中的用户列表
				store_list:[],			//店铺列表
				shop_code:[],			//选中的店铺
				supplier_list:[],		//供应商列表
				supplier_ids:[],		//选中的供应商
				cate_list:[],			//类目列表
				category_ids:[],		//选中的类目
				market_list:[],			//市场列表
				market_ids:[],			//选中的市场
				style_list:[],			//拍摄风格列表
				shooting_style_ids:[],	//选中的拍摄风格
				class_list:[],			//分类列表
				classification_ids:[],	//选中的分类
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0,
				button_list:{},
				import_dialog:false,	//导入弹窗
			}
		},
		created(){
			//获取需求类型列表
    		this.getAllDemandSendType();
			//获取部门列表
    		this.getDeptList();
			//获取用户列表
    		this.getUserList();
			//获取所有店铺列表
			this.ajaxViewShop();
			//获取供应商列表
			this.ajaxSupplierList();
    		//获取类目列表
    		this.ajaxCateList();
    		//市场列表
    		this.ajaxMarketList();
    		//拍摄风格列表
    		this.ajaxStyleList();
    		//分类列表
    		this.ajaxClassList();
    		//获取列表
    		this.getGoodsList();
    	},
    	destroyed() {
    		window.removeEventListener("resize", () => {});
    	},
    	mounted() {
    		//获取表格最大高度
    		this.onResize();
    		window.addEventListener("resize", this.onResize());
    	},
    	computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
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
    		//获取需求类型列表
    		getAllDemandSendType(){
    			commonResource.getAllDemandSendType().then(res => {
    				if(res.data.code == 1){
    					let data = res.data.data;
    					this.demand_list = data.filter(item => {
    						return item.type == 1;
    					})
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取部门列表
    		getDeptList(){
    			commonResource.getDeptList().then(res => {
    				if(res.data.code == 1){
    					this.dept_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取用户列表
    		getUserList(){
    			commonResource.getUserList().then(res => {
    				if(res.data.code == 1){
    					this.user_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取所有店铺列表
    		ajaxViewShop(){
    			commonResource.ajaxViewShop().then(res => {
    				if(res.data.code == 1){
    					this.store_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
    		//获取供应商列表
    		ajaxSupplierList(){
    			commonResource.ajaxSupplierList().then(res => {
    				if(res.data.code == 1){
    					this.supplier_list = res.data.data;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
			//获取类目列表
			ajaxCateList(){
				commonResource.ajaxCateList().then(res => {
					if(res.data.code == 1){
						this.cate_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//市场列表
			ajaxMarketList(){
				commonResource.ajaxMarketList().then(res => {
					if(res.data.code == 1){
						this.market_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//拍摄风格列表
			ajaxStyleList(){
				commonResource.ajaxStyleList().then(res => {
					if(res.data.code == 1){
						this.style_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分类列表
			ajaxClassList(){
				commonResource.ajaxClassList().then(res => {
					if(res.data.code == 1){
						this.class_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取列表
			getGoodsList(){
				let arg = {
					demand_type:this.demand_type.join(','),
					status:this.status_id,
					select_userid:this.select_userid.join(','),
					select_main_dept_id:this.select_main_dept_id.join(','),
					shop_code:this.shop_code.join(','),
					supplier_id:this.supplier_ids.join(','),
					category_id:this.category_ids.join(','),
					market_id:this.market_ids.join(','),
					classification_id:this.classification_ids.join(','),
					shooting_id:this.shooting_style_ids.join(','),
					page:this.page,
					pagesize:10
				}
				this.loading = true;
				resource.examineList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
						let data = res.data.data.data;
						data.map(item => {
							let images = [];
							item.img.map(i => {
								images.push(this.domain + i);
							})
							item.images = images;
						})
						this.data = data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取列表
				this.getGoodsList();
			},
			//审批
			auditFn(type,id){
				this.$confirm(`确认${type == '1'?'同意':'拒绝'}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						type:type,
						id:id
					}
					resource.auditGoods(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getGoodsList();
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
			//监听更多操作按钮
			handleCommand(e,id){
				if(e == '1'){	//查看
					this.$router.push('/edit_goods?page_type=goods&goods_type=3&style_id=' + id);
				}else if(e == '2'){	//编辑
					this.$router.push('/edit_goods?page_type=goods&goods_type=2&style_id=' + id);
				}else if(e == '3'){	//删除
					this.$confirm(`确认删除?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let arg = {
							style_id:id
						}
						resource.delGoods(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
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
				}
			},
			//切换上架或下架
			checkStatus(style_id,type){
				this.$confirm(`确认${type == 0?'上架':'下架'}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						style_id:style_id,
						type:type == 0?1:0
					}
					resource.checkStatus(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
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
			}
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






