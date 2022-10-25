<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
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
				<el-form-item label="上架状态：">
					<el-select v-model="status_id" clearable placeholder="全部">
						<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核状态：">
					<el-select v-model="check_status_id" clearable placeholder="全部">
						<el-option v-for="item in check_status_list" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="上新日期：">
					<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="款式编码：">
					<el-input placeholder="款式编码" clearable v-model="search">
					</el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" v-if="is_check == 1 && button_list.agree_refuse == 1" @click="allSetting('audit_1')">批量同意</el-button>
				<el-button size="mini" type="primary" v-if="is_check == 1 && button_list.agree_refuse == 1" @click="allSetting('audit_2')">批量拒绝</el-button>
				<el-button size="mini" type="primary" @click="allSetting('1')" v-if="button_list.in_out == 1">批量上架</el-button>
				<el-button size="mini" type="primary" @click="allSetting('0')" v-if="button_list.in_out == 1">批量下架</el-button>
				<el-button size="mini" type="primary" @click="allSetting('3')" v-if="button_list.del == 1">批量删除</el-button>
				<el-button size="mini" type="primary" @click="allSetting('2')" v-if="button_list.abu == 1">批量对接推单</el-button>
				<el-button size="mini" type="primary" @click="$router.push('/edit_goods?page_type=goods&goods_type=1')" v-if="button_list.add == 1">添加</el-button>
				<el-button size="mini" type="primary" @click="import_dialog = true">导入</el-button>
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" @selection-change="handleSelectionChange" v-loading="loading">
				<el-table-column type="selection" width="55" fixed>
				</el-table-column>
				<el-table-column label="款号" prop="style_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="款式编码" show-overflow-tooltip>
					<template slot-scope="scope">
						<div v-for="item in scope.row.ksbm">{{item}}</div>
					</template>
				</el-table-column>
				<el-table-column label="图片" width="120">
					<template slot-scope="scope">
						<div v-if="scope.row.images.length == 0">暂无</div>
						<el-image :z-index="2006" class="image" :src="scope.row.images[0]" fit="scale-down" :preview-src-list="scope.row.images" v-else></el-image>
					</template>
				</el-table-column>
				<el-table-column label="成本价" prop="cost_price" show-overflow-tooltip></el-table-column>
				<el-table-column label="颜色" prop="color" show-overflow-tooltip></el-table-column>
				<el-table-column label="尺码" prop="size" show-overflow-tooltip></el-table-column>
				<el-table-column label="面料" prop="fabric" show-overflow-tooltip></el-table-column>
				<el-table-column label="市场" prop="market" show-overflow-tooltip></el-table-column>
				<el-table-column label="供应商" prop="supplier" show-overflow-tooltip></el-table-column>
				<el-table-column label="提供拍照" prop="common_text" show-overflow-tooltip>
					<template slot-scope="scope">
						<div>{{scope.row.photograph == 1?'是':'否'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="拍摄风格" prop="shooting_style" show-overflow-tooltip></el-table-column>
				<el-table-column label="类目" prop="category" show-overflow-tooltip></el-table-column>
				<el-table-column label="分类" prop="classification" show-overflow-tooltip></el-table-column>
				<el-table-column label="合作模式" prop="mode" show-overflow-tooltip></el-table-column>
				<el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
				<el-table-column label="上新时间" prop="new_time_name" show-overflow-tooltip></el-table-column>
				<el-table-column label="共享盘地址" prop="shared_disk_address" show-overflow-tooltip></el-table-column>
				<el-table-column label="审核状态" prop="common_text" show-overflow-tooltip>
					<template slot-scope="scope">
						<div v-if="scope.row.check_status == 1">待审核</div>
						<div v-if="scope.row.check_status == 2">审核通过</div>
						<div v-if="scope.row.check_status == 3">审核拒绝</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="160" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if="scope.row.check_status == 1 && button_list.agree_refuse == 1" @click="$router.push('/edit_goods?page_type=goods&goods_type=4&style_id=' + scope.row.style_id)">审核</el-button>
						<el-button style="margin-right: 10px" type="text" size="small" v-if="scope.row.check_status == 2" @click="$router.push('/image_setting?style_id=' + scope.row.style_id + '&style_name=' + scope.row.style_name)">图片管理</el-button>
						<el-dropdown size="small" @command="handleCommand($event,scope.row.style_id)" v-if="scope.row.check_status == 2 && (button_list.info == 1 || button_list.edit == 1 || button_list.del == 1)">
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
						<el-button type="text" size="small" v-if="scope.row.check_status == 3" @click="$router.push('/edit_goods?page_type=goods&goods_type=5&style_id=' + scope.row.style_id)">重新提交</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" @checkPage="checkPage"/>
		</el-card>
		<el-dialog :visible.sync="import_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div>导入</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="import_dialog = false">
			</div>
			<div class="down_box">
				<el-button type="primary" plain size="small" @click="downTemplate">下载模版<i class="el-icon-download el-icon--right"></i></el-button>
				<div class="upload_box">
					<el-button type="primary" size="small">
						导入
						<i class="el-icon-upload el-icon--right"></i>
					</el-button>
					<input type="file" ref="csvUpload" class="upload_file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadCsv">
				</div>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="import_dialog = false">取消</el-button>
			</div>
		</el-dialog>
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
				status_list:[{
					name:'已上架',
					id:1
				},{
					name:'已下架',
					id:0
				}],						//上架状态列表
				status_id:"",			//选中的上架状态
				check_status_list:[{
					name:'待审核',
					id:1
				},{
					name:'审核通过',
					id:2
				},{
					name:'审核拒绝',
					id:3
				}],						//审核状态列表
				check_status_id:"",		//选中的审核状态
				date:[],				//上新日期
				pickerOptions: {
					shortcuts: [
					{
						text: "今日上新",
						onClick(picker) {
							const start = getNowDate();
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "三日上新",
						onClick(picker) {
							const start = getCurrentDate(3);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "七日上新",
						onClick(picker) {
							const start = getCurrentDate(7);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					],
				}, 
				search:"",				//款式编码
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0,
				button_list:{},
				import_dialog:false,	//导入弹窗
				multiple_selection:[],
				is_check:0,				//1:展示批量审核；0：不展示
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.path == '/image_setting' || to.path == '/edit_goods'){	
				from.meta.use_cache = true;
			}else{
				from.meta.use_cache = false;
			}
			next();
		},
		activated(){
			if(!this.$route.meta.use_cache){
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
    			this.supplier_ids = [];
    			this.category_ids = [];
    			this.market_ids = [];
    			this.classification_ids = [];
    			this.shooting_style_ids = [];
    			this.date = [];
    			this.check_status_id = "";
    			this.status_id = "";
    			this.search = "";
    			this.page = 1;
    		}
			//获取列表
			this.getGoodsList();
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
			//下载模版
			downTemplate(){
				window.open(`${this.downLoadUrl}/file/商品批量导入模板.xlsx`);
			},
			//导入
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					resource.addAllProductStyle({file:files[0]}).then(res => {
						this.$refs.csvUpload.value = null;
						this.import_dialog = false;
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.page = 1;
							//获取列表
							this.getGoodsList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//获取列表
			getGoodsList(){
				let arg = {
					supplier_id:this.supplier_ids.join(','),
					category_id:this.category_ids.join(','),
					market_id:this.market_ids.join(','),
					classification_id:this.classification_ids.join(','),
					shooting_id:this.shooting_style_ids.join(','),
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					check_status:this.check_status_id,
					status:this.status_id,
					search:this.search,
					page:this.page,
					pagesize:10
				}
				this.loading = true;
				resource.getGoodsList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
						let data = res.data.data.data;
						this.is_check = res.data.data.check;
						data.map(item => {
							let images = [];
							item.img.map(i => {
								images.push(this.domain + i);
							})
							item.images = images;
							let ksbm = [];
							if(item.i_id){
								item.i_id.split(',').map(i => {
									ksbm.push(i);
								})
								item.ksbm = ksbm;
							}else{
								item.ksbm = [];
							}
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
			//切换多选
			handleSelectionChange(val) {
				this.multiple_selection = val;
			},
			//批量操作
			allSetting(type){
				let title = "";			//提示标题
				let total_num = this.multiple_selection.length;	//选中的总数
				let unset_num = 0;	//不能操作的数量
				let style_id = [];
				if(total_num == 0){
					this.$message.warning('至少选择一条！');
					return;
				}

				if(type == '0'){	//下架
					title = '确认下架？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 2 && item.status == 1;
					})
					unset_list.map(item => {
						style_id.push(item.style_id)
					})
					unset_num = total_num - unset_list.length;
				}else if(type == '1'){	//上架
					title = '确认上架？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 2 && item.status == 0;
					})
					unset_list.map(item => {
						style_id.push(item.style_id)
					})
					unset_num = total_num - unset_list.length;
				}else if(type == '2'){	//对接推单
					title = '确认对接推单？'
					this.multiple_selection.map(item => {
						style_id.push(item.style_id)
					})
					unset_num = 0;
				}else if(type == '3'){	//删除
					title = '确认批量删除？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 2;
					})
					unset_list.map(item => {
						style_id.push(item.style_id)
					})
					unset_num = total_num - unset_list.length;
				}else if(type.indexOf('audit') > -1){	//批量审批
					let ids = [];
					this.multiple_selection.map(item => {
						ids.push(item.style_id)
					})
					this.$confirm(`确认批量${type.split('_')[1] == 1?'同意':'拒绝'}？`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let arg = {
							id:ids.join(','),
							type:type.split('_')[1]
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
					return;
				}
				if(total_num == unset_num){
					this.$message.warning('没有符合操作条件的记录！');
					return;
				}
				this.$confirm(`您选择了${total_num}项，其中不可操作${unset_num}项，${title}`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(type == '0' || type == '1'){	//上架或下架
						let arg = {
							style_id:style_id.join(','),
							type:type
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
					}else if(type == '2'){	//对接推单
						let arg = {
							style_id:style_id.join(','),
							type:1
						}
						resource.setAbutmentType(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								//获取列表
								this.getGoodsList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else if(type == '3'){	//删除
						let arg = {
							style_id:style_id.join(',')
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
					}
					
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






