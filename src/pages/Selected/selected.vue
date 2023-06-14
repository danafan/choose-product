<template>
	<div class="padding_page">
		<div class="padding_page_content">
			<SearchWidget page_path="selected_history" @callback="searchFn" placeholder="款号 款式编码"/>
			<el-card class="card_box" id="card_box">
				<div class="tab_row" id="tab_row">
					<div class="tab_item" :class="{'active_item':active_index == index}" v-for="(item,index) in tab_list" @click="active_index = index">
						<div>{{item.name}}</div>
						<div class="active_line" v-if="active_index == index"></div>
					</div>
				</div>
				<div class="form_row">
					<el-form :inline="true" size="mini">
						<el-form-item label="店铺：">
							<el-select v-model="shop_code" filterable clearable placeholder="全部">
								<el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="需求人：">
							<el-select v-model="search_user" filterable clearable placeholder="全部">
								<el-option v-for="item in user_list" :key="item.search_user" :label="item.search_user" :value="item.search_user">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="时间：">
							<el-date-picker
							v-model="date_time"
							type="datetimerange"
							value-format="yyyy-MM-dd HH"
							format="yyyy-MM-dd HH"
							range-separator="至"
							start-placeholder="开始时间"
							end-placeholder="结束时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
					<el-form-item class="form_item">
						<el-checkbox :true-label="1" :false-label="0" v-model="only_self" @change="checkPage(1)">只看自己</el-checkbox>
					</el-form-item>
				</el-form>
			</div>
			<TableTitle id="table_title">
				<el-button size="mini" type="primary" @click="exportFn">导出</el-button>
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="图片" width="150">
					<template slot-scope="scope">
						<div v-if="scope.row.images.length == 0">暂无</div>
						<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
							<el-carousel-item v-for="(item,index) in scope.row.images" :key="index">
								<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
							</el-carousel-item>
						</el-carousel>
					</template>
				</el-table-column>
				<el-table-column label="款号" prop="style_name"></el-table-column>
				<el-table-column label="款式编码" width="140">
					<template slot-scope="scope">
						<div class="item_row" v-if="scope.row.new_supplier_ksbm">
							<div class="item_label">供应商：</div>
							<div class="item_value">
								<div v-for="item in scope.row.new_supplier_ksbm">{{item}}</div>
							</div>
						</div>
						<div class="item_row" v-if="scope.row.new_i_id">
							<div class="item_label">普通：</div>
							<div class="flex-1">
								<div v-for="item in scope.row.new_i_id">{{item}}</div>
							</div>
						</div>
						<div class="item_row" v-if="scope.row.new_bd_i_id">
							<div class="item_label">BD：</div>
							<div class="flex-1">
								<div v-for="item in scope.row.new_bd_i_id">{{item}}</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="成本价" prop="cost_price"></el-table-column>
				<el-table-column label="售卖价" prop="selling_price"></el-table-column>
				<el-table-column label="需求部门" prop="select_main_dept_name"></el-table-column>
				<el-table-column label="需求店铺" prop="shop_name"></el-table-column>
				<el-table-column label="需求日期" prop="demand_date"></el-table-column>
				<el-table-column label="需求人" prop="ding_user_name"></el-table-column>
				<el-table-column label="需求类型" prop="demand_type">
				</el-table-column>
				<el-table-column label="对接推单">
					<template slot-scope="scope">
						<div v-if="scope.row.abutment_type == 1">是</div>
						<div v-if="scope.row.abutment_type == 0">否</div>
					</template>
				</el-table-column>
				<el-table-column label="当前状态">
					<template slot-scope="scope">
						<div v-if="scope.row.audit_status == 1">待审核</div>
						<div v-if="scope.row.audit_status == 2">已确认</div>
						<div v-if="scope.row.audit_status == 4">已拒绝</div>
						<div v-if="scope.row.audit_status == 0">已撤销</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="undoSelected(scope.row.select_id)" v-if="scope.row.audit_status == 1">撤销</el-button>
						<el-button type="text" size="small" @click="selectedInfo(scope.row.select_id)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" @checkPage="checkPage"/>
		</el-card>
		<CarWidget/>
	</div>
	<!-- 详情弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="detail_dialog">
		<div slot="title" class="dialog_title">
			<div>商品详情</div>
			<img class="close_icon" src="../../static/close_icon.png" @click="detail_dialog = false">
		</div>
		<div class="dialog_content">
			<div class="detail_row">
				<div class="lable">标题</div>
				<div class="value">{{goods_info.title}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">款号</div>
				<div class="value">{{goods_info.style_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">款式编码</div>
				<div class="value">
					<div>供应商：{{goods_info.supplier_ksbm}}</div>
					<div>普通：{{goods_info.i_id}}</div>
					<div>BD：{{goods_info.bd_i_id}}</div>
				</div>
			</div>
			<div class="detail_row">
				<div class="lable">供应商</div>
				<div class="value">{{goods_info.supplier_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">市场</div>
				<div class="value">{{goods_info.market_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供拍照</div>
				<div class="value">{{goods_info.supply_photograph == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供退货</div>
				<div class="value">{{goods_info.supply_return_goods == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供换货</div>
				<div class="value">{{goods_info.supply_exchange_goods == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">提供代发</div>
				<div class="value">{{goods_info.supply_replace_send == 1?'是':'否'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">结算方式</div>
				<div class="value">{{goods_info.supply_monthly_settlement == 1?'月结':'现结'}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">类目</div>
				<div class="value">{{goods_info.category_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">分类</div>
				<div class="value">{{goods_info.classification_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">拍摄风格</div>
				<div class="value">{{goods_info.shooting_style_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">合作模式</div>
				<div class="value">{{goods_info.mode}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">备注</div>
				<div class="value">{{goods_info.remark}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">面料</div>
				<div class="value">{{goods_info.fabric}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">尺码</div>
				<div class="value">{{goods_info.size}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">成本价</div>
				<div class="value">{{goods_info.cost_price}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">百度网盘</div>
				<div class="value">{{goods_info.net_disk_address}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">店铺</div>
				<div class="value">{{goods_info.shop_name}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">需求类型</div>
				<div class="value">{{goods_info.demand_type}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">发货类型</div>
				<div class="value">{{goods_info.send_type}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">需求日期</div>
				<div class="value">{{goods_info.demand_date}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">售卖价格</div>
				<div class="value">{{goods_info.selling_price}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">当前状态</div>
				<div class="value" v-if="goods_info.audit_status == 0">已撤销</div>
				<div class="value" v-if="goods_info.audit_status == 1">待审核</div>
				<div class="value" v-if="goods_info.audit_status == 2">已确认</div>
				<div class="value" v-if="goods_info.audit_status == 4">已拒绝</div>
			</div>
			<div class="detail_row" v-if="goods_info.audit_status == 4">
				<div class="lable">拒绝原因</div>
				<div class="value">{{goods_info.refund_reason}}</div>
			</div>
			<div class="detail_row">
				<div class="lable">选款要求</div>
				<div class="value" v-html="goods_info.demand_remark"></div>
			</div>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button type="primary" size="small" @click="detail_dialog = false">关闭</el-button>
		</div>
	</el-dialog>
</div>
</template>
<script>
	import { MessageBox, Message } from "element-ui";
	import { exportPost } from "../../api/export.js";
	import resource from '../../api/resource.js'
	import commonResource from '../../api/common_resource.js'

	import SearchWidget from '../../components/search_widget.vue'
	import TableTitle from '../SupplyChain/components/table_title.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	import CarWidget from '../../components/car_widget.vue'
	export default{
		data(){
			return{
				loading:false,	
				store_list:[],			//店铺列表
				shop_code:"",			//选中的店铺
				user_list:[],			//需求人列表
				search_user:"",			//需求人
				date_time:[],
				tab_list:[{
					name:'全部',
					id:''
				},{
					name:'待确认',
					id:'1'
				},{
					name:'已确认',
					id:'2'
				},{
					name:'已拒绝',
					id:'4'
				},{
					name:'已撤销',
					id:'0'
				}],							//tab列表
				active_index:0,				//当前选中的tab下标
				search:"",					//搜索框的内容
				only_self:0,
				page:1,
				data:[],
				total:0,
				max_height:0,	
				detail_dialog:false,		//详情弹窗
				goods_info:{},				//详情数据
			}
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		watch:{
			active_index:function(n,o){
				this.page = 1;
				//获取列表
				this.getSelected();
			}
		},
		created(){
			//获取所有店铺列表
			this.ajaxViewShop();
			//获取所有需求人
			this.getUserName();
			//获取列表
			this.getSelected();
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
			focus(){
				this.$nextTick(() => {
					document
					.getElementsByClassName('el-button--text')[0]
					.setAttribute('style', 'display:none')
				})
			},
    		//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("card_box").offsetHeight;
					let all_title_height = document.getElementById("tab_row").offsetHeight;
					let table_title_height = document.getElementById('table_title').offsetHeight;
					let bottom_row_height = document.getElementById("bottom_row").offsetHeight;
					this.max_height =
					card_box_height -
					all_title_height -
					table_title_height - 
					bottom_row_height -
					110 +
					"px";
				});
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
    		//获取所有需求人
			getUserName(){
				resource.getUserName().then(res => {
					if(res.data.code == 1){
						this.user_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//搜索
			searchFn(value){
				this.page = 1;
				this.search = value;
				//获取列表
				this.getSelected();
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
						status:this.tab_list[this.active_index].id,
						search:this.search,
						shop_code:this.shop_code,
						search_user:this.search_user,
						only_self:this.only_self,
						start_time:this.date_time && this.date_time.length> 0?this.date_time[0]:"",
						end_time:this.date_time && this.date_time.length> 0?this.date_time[1]:"",
					};
					resource.selectedExport(arg).then((res) => {
						if (res) {
							exportPost("\ufeff" + res.data, "已选商品");
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
			//获取列表
			getSelected(){
				let arg = {
					status:this.tab_list[this.active_index].id,
					search:this.search,
					shop_code:this.shop_code,
					search_user:this.search_user,
					only_self:this.only_self,
					start_time:this.date_time && this.date_time.length> 0?this.date_time[0]:"",
					end_time:this.date_time && this.date_time.length> 0?this.date_time[1]:"",
					page:this.page
				}
				this.loading = true;
				resource.getSelected(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						let data_list = data.data;
						data_list.map(item => {
							let images = [];
							item.img.map(i => {
								images.push(this.domain + i);
							})
							item.images = images;

							if(item.i_id){
								item.new_i_id = item.i_id.split(',')
							}
							if(item.bd_i_id){
								item.new_bd_i_id = item.bd_i_id.split(',')
							}
							if(item.supplier_ksbm){
								item.new_supplier_ksbm = item.supplier_ksbm.split(',')
							}
						})
						this.data = data_list;
						this.total = data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//翻页
			checkPage(val) {
				this.page = val;
				//获取列表
				this.getSelected();
			},
			//获取详情
			selectedInfo(select_id){
				let arg = {
					select_id:select_id,
					select_type:1
				}
				resource.selectedInfo(arg).then(res => {
					if(res.data.code == 1){
						this.goods_info = res.data.data;
						this.detail_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击撤销
			undoSelected(select_id){
				this.$confirm('确认撤销?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//商品ID
					let arg = {
						select_id:select_id
					}
					resource.undoSelected(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getSelected();
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
			//点击取消
			cancelSelected(select_id){
				this.$confirm('确认取消?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//商品ID
					let arg = {
						select_id:select_id
					}
					resource.cancelSelected(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getSelected();
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
			SearchWidget,
			PaginationWidget,
			CarWidget,
			TableTitle
		}
	}
</script>
<style type="text/css">
	.el-dialog__body{
		padding: 0!important;
	}
</style>
<style lang="less" scoped>
	.padding_page_content{
		width: 1440rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		.card_box{
			flex:1;
			.tab_row{
				border:1px solid var(--color);
				border-radius: 4rem;
				background: #FFFCFA;
				height: 64rem;
				display: flex;
				padding-left: 30rem;
				margin-bottom: 15rem;
				.tab_item{
					cursor:pointer;
					margin-right: 80rem;
					position: relative;
					height: 64rem;
					line-height: 64rem;
					color: #333333;
					font-size: 14rem;
					font-weight: bold;
					.active_line{
						background: var(--color);
						position: absolute;
						bottom: 2rem;
						width: 100%;
						height: 2rem;
					}
				}
				.active_item{
					color: var(--color);
				}
			}
			.image{
				width: 100px;
				height: 100px;
			}
			.item_row{
				display: flex;
				.item_label{
					width: 48px;
					text-align:end;
				}
			}
		}
	}
	.dialog_content{
		max-height: 450px;
		overflow-y: scroll;
		.detail_row{
			border-bottom:1px solid #F0F0F0;
			display: flex;
			font-size:14rem;
			color: #333333;
			.lable{
				border-right:1px solid #F0F0F0;
				width: 120rem;
				padding:12rem 20rem;
				display: flex;
				align-items: center;
			}
			.value{
				flex:1;
				padding: 12rem 20rem;
			}
		}
	}
</style>










