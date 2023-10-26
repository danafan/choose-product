<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="供应商等级：">
						<el-select v-model="grade_list_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in grade_list" :key="item.grade_id" :label="item.grade_name" :value="item.grade_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商维护人：">
						<el-select v-model="maintainer_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in maintainer_list" :key="item.maintainer_id" :label="item.maintainer" :value="item.maintainer_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提供拍照：">
						<el-select v-model="supply_photograph" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提供退货：">
						<el-select v-model="supply_return_goods" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提供换货：">
						<el-select v-model="supply_exchange_goods" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提供代发：">
						<el-select v-model="supply_replace_send" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提供入仓：">
						<el-select v-model="supply_warehousing" clearable placeholder="全部">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结算方式：">
						<el-select v-model="supply_monthly_settlement" clearable placeholder="全部">
							<el-option label="现结" :value="0"></el-option>
							<el-option label="月结" :value="1"></el-option>
							<el-option label="半月结" :value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品牌：">
						<el-select v-model="brand_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in brand_list" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否启用：">
						<el-select v-model="is_enable" clearable placeholder="全部">
							<el-option label="已启用" :value="1"></el-option>
							<el-option label="已禁用" :value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="form_item">
						<el-input clearable v-model="search" placeholder="搜索供应商、主营"></el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-input clearable v-model="address" placeholder="搜索供应商地址"></el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" @click="exportFn" v-if="button_list.export == 1">导出</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="table_data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column label="供应商名称" prop="supplier_name"></el-table-column>
					<el-table-column label="供应商地址" prop="address"></el-table-column>
					<el-table-column label="联系人" width="120" prop="contactor"></el-table-column>
					<el-table-column label="联系方式" width="120" prop="contact_information"></el-table-column>
					<el-table-column label="主营" prop="main_business"></el-table-column>
					<el-table-column label="微信" prop="weixin"></el-table-column>
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
							<div v-if="scope.row.supply_monthly_settlement == 0">现结</div>
							<div v-if="scope.row.supply_monthly_settlement == 1">月结</div>
							<div v-if="scope.row.supply_monthly_settlement == 2">半月结</div>
						</template>
					</el-table-column>
					<el-table-column label="供应商等级" prop="grade_name"></el-table-column>
					<el-table-column label="评价记录">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="getEvaluate(scope.row.reserve_id,scope.row.supplier_name)">{{scope.row.evaluate_num}}</el-button>
						</template>
					</el-table-column>
					<el-table-column label="是否启用" v-if='button_list.onoff'>
						<template slot-scope="scope">
							<el-switch
							@change="changeStatus($event,scope.row,scope.$index)"
							size="mini"
							v-model="scope.row.is_enable"
							:active-value="1"
							:inactive-value="0"
							>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="detailEditFn(scope.row.supplier_id,'1')" v-if="button_list.view == 1">查看</el-button>
						<el-button type="text" size="small" @click="detailEditFn(scope.row.supplier_id,'2')" v-if="button_list.edit == 1">编辑</el-button>
						<el-button type="text" size="small" @click="deleteFn(scope.row.supplier_id)" v-if="button_list.del == 1">删除</el-button>
						<el-button type="text" size="small" @click="$router.push(`/account_list?supplier_id=${scope.row.supplier_id}&supplier_name=${scope.row.supplier_name}`)" v-if="button_list.add_account == 1">账号管理</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<PaginationWidget id="bottom_row" :total="total" :page="page" :pagesize="20" :show_multiple="false" @checkPage="checkPage"/>
	</el-card>
	<!-- 评价记录 -->
	<el-dialog :visible.sync="evaluate_dialog" @close="evaluate_page = 1">
		<div slot="title" class="dialog_title">
			<div>【{{supplier_name}}】评价记录</div>
			<img class="close_icon" src="../../../../static/close_icon.png" @click="evaluate_dialog = false">
		</div>
		<!-- 内容 -->
		<div class="pt-15">
			<TableTitle title="数据列表" id="table_title"></TableTitle>
			<el-table ref="table" size="mini" :data="evaluate_data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" v-loading="evaluate_loading">
				<el-table-column label="评价内容" prop="evaluate_content">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="addEvakuateFn('评价内容',scope.row.evaluate_content)"><p style="text-decoration:underline">{{scope.row.evaluate_content}}</p></el-button>
					</template>
				</el-table-column>
				<el-table-column label="评价时间" prop="add_time"></el-table-column>
			</el-table>
			<PaginationWidget :total="evaluate_data.total" :page="evaluate_page" :show_multiple="false" :pagesize="10" @checkPage="checkEvaluatePage"/>
		</div>
		<!-- 添加或查看评价内容 -->
		<el-dialog width="30%" :visible.sync="evaluate_info_dialog" append-to-body>
			<div slot="title" class="dialog_title">
				<div>{{evaluate_info_title}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="evaluate_info_dialog = false">
			</div>
			<div class="pt-15 pb-15">
				<el-input type="textarea" :rows="4" :disabled="evaluate_info_title == '评价内容'" placeholder="请输入评价内容" v-model="evaluate_content" maxlength="300" show-word-limit v-if="evaluate_info_title == '添加评价'">
				</el-input>
				<div v-else>{{evaluate_content}}</div>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="evaluate_info_dialog = false">取消</el-button>
				<el-button size="mini" type="primary" @click="evaluateSaveInfo" v-if="evaluate_info_title == '添加评价'">保存</el-button>
			</div>
		</el-dialog>
		<div slot="footer" class="dialog_footer">
			<el-button size="small" @click="evaluate_dialog = false">关闭</el-button>
		</div>
	</el-dialog>
	<!-- 编辑 -->
	<el-dialog :visible.sync="edit_dialog" width="80%" top="0">
		<div slot="title" class="dialog_title">
			<div>{{dialog_name}}</div>
			<img class="close_icon" src="../../../../static/close_icon.png" @click="edit_dialog = false">
		</div>
		<AddEditSupplier ref="addEditSupplier" v-if="edit_dialog" :supplier_type="supplier_type" :supplier_id="supplier_id" @onLoad="supplierManagerList"/>
		<div slot="footer" class="dialog_footer">
			<el-button size="small" @click="edit_dialog = false">关闭</el-button>
			<el-button size="small" type="primary" @click="commitFn" v-if="supplier_type == '2'">提交</el-button>
		</div>
	</el-dialog>
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
	.card_box{
		.scroll_box{
			.image{
				width: 100px;
				height: 100px;
			}

		}
		.item_row{
			display: flex;
			.item_label{
				width: 96px;
				text-align:end;
			}
		}
	}
	.down_box{
		display:flex;
		padding:30rem;
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
	.pt-15{
		padding-top: 15px;
	}
	.pb-15{
		padding-bottom:15rem;
	}
// }
</style>
<script>
	import { exportPost } from "../../../../api/export.js";

	import { MessageBox, Message } from "element-ui";
	import resource from '../../../../api/chain_resource.js'
	import commonResource from '../../../../api/common_resource.js'

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	import AddEditSupplier from '../SupplierPages/add_edit_supplier'
	export default{
		data(){
			return{
				loading:false,
				search:"",				//供应商、主营
				address:"",				//地址
				supply_photograph:'',	//是否拍照
				supply_return_goods:'',	//是否退货
				supply_exchange_goods:'',//是否换货
				supply_replace_send:'',	//是否代发
				supply_warehousing:'',	//是否入仓
				supply_monthly_settlement:'',	//结算方式
				grade_list:[],			//供应商等级
				grade_list_ids:[],		//选中的供应商等级
				brand_list:[],			//品牌列表
				brand_ids:[],				//选中的品牌
				maintainer_list:[],			//供应商维护人列表
				maintainer_ids:[],			//选中的供应商维护人列表
				is_enable:"",				//是否启用
				max_height:0,	
				page:1,
				data:{},				//获取的数据
				table_data:[],			//获取的数据
				total:0,				//总数量
				button_list:{},
				evaluate_dialog:false,		//评价列表弹窗
				supplier_name:"",			//供应商名称
				evaluate_data:{},			//评价列表数据
				evaluate_page:1,
				evaluate_loading:false,		
				reserve_id:"",
				evaluate_info_dialog:false,	//添加或查看评价弹窗
				evaluate_info_title:"",		//添加或查看评价弹窗标题
				evaluate_content:"",		//评价内容
				supplier_id:"",				//点击的供应商
				supplier_type:'1',			//弹窗类型（1:详情；2:编辑）
				dialog_name:"",				//详情或编辑弹窗标题
				edit_dialog:false,			//编辑弹窗
			}
		},
		created(){
			//获取品牌列表下拉框筛选项
			this.selectionMap();
			//供应商等级
			this.ajaxSupplierGradeList();
			//供应商维护人
			this.ajaxSupplierMaintainer();
			//获取供应商列表
			this.supplierManagerList();
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
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 60 + "px";
				});
			},
			//获取品牌列表下拉框筛选项
			selectionMap(){
				resource.selectionMap({type:8}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.brand_list = data.brand;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//供应商等级
			ajaxSupplierGradeList(){
				commonResource.ajaxSupplierGradeList().then(res => {
					if(res.data.code == 1){
						this.grade_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//供应商维护人
			ajaxSupplierMaintainer(){
				commonResource.ajaxSupplierMaintainer().then(res => {
					if(res.data.code == 1){
						this.maintainer_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
    		//获取供应商列表
			supplierManagerList(){
				let arg = {
					search:this.search,
					address:this.address,
    				supply_photograph:this.supply_photograph,	//是否拍照
					supply_return_goods:this.supply_return_goods,	//是否退货
					supply_exchange_goods:this.supply_exchange_goods,//是否换货
					supply_replace_send:this.supply_replace_send,	//是否代发
					supply_warehousing:this.supply_warehousing,	//是否入仓
					supply_monthly_settlement:this.supply_monthly_settlement,	//结算方式
					grade_id:this.grade_list_ids.join(','),
					maintainer_id:this.maintainer_ids.join(','),
					brand:this.brand_ids.join(','),
					is_enable:this.is_enable,
					pagesize:20,
					page:this.page
				}
				this.loading = true;
				this.edit_dialog = false;
				resource.supplierManagerList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						this.table_data = data.data;
						this.total = data.total;
						this.button_list =  res.data.data.button_list;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
    		//导出
			exportFn() {
				MessageBox.confirm("确认导出?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
				.then(() => {
					let arg = {
						search:this.search,
						address:this.address,
						supply_photograph:this.supply_photograph,	
						supply_return_goods:this.supply_return_goods,	
						supply_exchange_goods:this.supply_exchange_goods,
						supply_replace_send:this.supply_replace_send,	
						supply_warehousing:this.supply_warehousing,	
						supply_monthly_settlement:this.supply_monthly_settlement,
						grade_id:this.grade_list_ids.join(','),
						maintainer_id:this.maintainer_ids.join(','),
						brand:this.brand_ids.join(','),
						is_enable:this.is_enable,
					};
					resource.supplierExport(arg).then((res) => {
						if (res) {
							exportPost("\ufeff" + res.data, "供应商");
						}
					});
				})
				.catch(() => {
					Message({
						type: "info",
						message: "取消导出",
					});
				});
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取供应商列表
				this.supplierManagerList();
			},
			//点击查看/编辑
			detailEditFn(supplier_id,supplier_type){
				this.supplier_id = supplier_id;
				this.supplier_type = supplier_type;
				this.dialog_name = supplier_type == '1'?'供应商详情':'编辑供应商';
				this.edit_dialog = true;
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
			//点击查看评价记录
			getEvaluate(reserve_id,supplier_name){
				this.reserve_id = reserve_id;
				this.supplier_name = supplier_name;
				this.evaluate_dialog = true;
				//获取评级记录
				this.evaluateList();
			},
			//获取评级记录
			evaluateList(){
				let arg = {
					reserve_id:this.reserve_id,
					page:this.evaluate_page,
					pagesize:10
				}
				this.evaluate_loading = true;
				resource.evaluateList(arg).then(res => {
					if(res.data.code == 1){
						this.evaluate_loading = false;
						this.evaluate_data = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//评价记录切换页码
			checkEvaluatePage(v){
				this.evaluate_page = v;
				//查看评价记录
				this.evaluateList();
			},
			//点击添加或查看评价详情
			addEvakuateFn(evaluate_info_title,evaluate_content){
				this.evaluate_info_dialog = true;
				this.evaluate_info_title = evaluate_info_title;
				this.evaluate_content = evaluate_content;
			},
			//点击评价详情保存
			evaluateSaveInfo(){
				if(this.evaluate_content == ''){
					this.$message.warning('请输入评价内容');
				}else{
					let arg = {
						reserve_id:this.reserve_id,
						evaluate_content:this.evaluate_content
					}
					resource.addEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.evaluate_info_dialog = false;
							//查看评价记录
							this.evaluateList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//点击删除评价记录
			delEvaluate(evaluate_log_id){
				this.$confirm('确认删除该评价记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						evaluate_log_id:evaluate_log_id
					}
					resource.delEvaluate(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.evaluateList();
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
			//点击切换是否启用
			changeStatus(v,row,index){
				if(v == 0){
					this.$confirm(`确认禁用【${row.supplier_name}】供应商，并下架全部款式吗?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						// 设置供应商启用禁用
						this.setOnOff(row.supplier_id,v);
					}).catch(() => {
						row.is_enable = 1;
						this.$set(this.table_data,index,row)
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}else{
					// 设置供应商启用禁用
					this.setOnOff(row.supplier_id,v);
				}
			},
			// 设置供应商启用禁用
			setOnOff(supplier_id,status){
				let arg = {
					supplier_id:supplier_id,
					status:status
				}
				resource.setSupplierOnOff(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//编辑提交
			commitFn(){
				this.$refs.addEditSupplier.commitFn();
			}
		},
		components:{
			TableTitle,
			PaginationWidget,
			AddEditSupplier
		}
	}
</script>






