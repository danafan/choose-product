<template>
	<div class="chain_page_content" v-loading.fullscreen.lock="fullscreenLoading">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
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
				<el-form-item label="款号">
					<el-input placeholder="款号" v-model="style_name"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="allSetting('1')">批量上架</el-button>
				<el-button size="mini" type="primary" @click="allSetting('0')">批量下架</el-button>
				<el-button size="mini" type="primary" @click="$router.push('/gys_edit_goods?goods_type=1')">添加</el-button>
				<el-button size="mini" type="primary" @click="import_dialog = true">导入</el-button>
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" @selection-change="handleSelectionChange" v-loading="loading">
				<el-table-column type="selection" width="55" fixed>
				</el-table-column>
				<el-table-column label="标题" prop="title"></el-table-column>
				<el-table-column label="款号" prop="style_name"></el-table-column>
				<el-table-column label="拍摄风格" width="180" >
					<template slot-scope="scope">
						<el-tabs size="mini" v-model="scope.row.active_index" @tab-click="handleClick($event,scope.$index)">
							<el-tab-pane :label="item.shooting_style_name" :name="index.toString()" v-for="(item,index) in scope.row.shooting_style_list"></el-tab-pane>
						</el-tabs>
						<div :style="{'width':'100%','height':scope.row.style_loading?'100px':'0px'}" v-loading="scope.row.style_loading"></div>
						<div v-if="scope.row.shooting_style_list[parseInt(scope.row.active_index)].img.length == 0 && !scope.row.style_loading">暂无</div>
						<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-if="scope.row.shooting_style_list[parseInt(scope.row.active_index)].img.length > 0 && !scope.row.style_loading">
							<el-carousel-item v-for="(item,index) in scope.row.shooting_style_list[parseInt(scope.row.active_index)].img" :key="item">
								<el-image :z-index="2006" class="image" :src="domain + item" fit="scale-down" @click="viewImage(scope.row.shooting_style_list,scope.row.active_index,index)"></el-image>
							</el-carousel-item>
						</el-carousel>
					</template>
				</el-table-column>
				<el-table-column label="颜色" prop="color"></el-table-column>
				<el-table-column label="成本价" prop="cost_price"></el-table-column>
				<el-table-column label="尺码" prop="size"></el-table-column>
				<el-table-column label="面料" prop="fabric" show-overflow-tooltip></el-table-column>
				<el-table-column label="市场" prop="market"></el-table-column>
				<el-table-column label="提供拍照" prop="common_text">
					<template slot-scope="scope">
						<div>{{scope.row.photograph == 1?'是':'否'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="拍摄风格" prop="shooting_style"></el-table-column>
				<el-table-column label="类目" prop="category"></el-table-column>
				<el-table-column label="分类" prop="classification"></el-table-column>
				<el-table-column label="合作模式" prop="mode"></el-table-column>
				<el-table-column label="上新时间" prop="new_time_name"></el-table-column>
				<el-table-column label="审核状态" prop="common_text">
					<template slot-scope="scope">
						<div v-if="scope.row.check_status == 1">上架待审核</div>
						<div v-if="scope.row.check_status == 2">已上架</div>
						<div v-if="scope.row.check_status == 3">拒绝上架</div>
						<div v-if="scope.row.check_status == 4">下架待审核</div>
						<div v-if="scope.row.check_status == 5">已下架</div>
						<div v-if="scope.row.check_status == 6">拒绝下架</div>
					</template>
				</el-table-column>
				<el-table-column label="拒绝备注" prop="refuse_reason"></el-table-column>
				<el-table-column label="操作" width="160" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if="scope.row.check_status == 2 || scope.row.check_status == 5 || scope.row.check_status == 6" @click="checkStatus(scope.row.goods_id,scope.row.check_status)">{{scope.row.check_status == 2 || scope.row.check_status == 6?'下架':'上架'}}</el-button>
						<el-button style="margin-right: 10px" type="text" size="small" v-if="scope.row.check_status == 2 || scope.row.check_status == 6" @click="$router.push('/gys_edit_goods?goods_type=2&goods_id=' + scope.row.goods_id)">编辑</el-button>
						<el-dropdown size="small" v-if="scope.row.check_status == 2 || scope.row.check_status == 6" @command="handleCommand($event,scope.row.goods_id,scope.row.style_name)">
							<el-button type="text" size="small">
								更多<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="1">查看</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-button type="text" size="small" v-if="scope.row.check_status == 3" @click="$router.push('/gys_edit_goods?goods_type=5&goods_id=' + scope.row.goods_id)">重新提交</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :multiple_selection_num="multiple_selection.length" :total="total" :page="page" :pagesize="100" @checkPage="checkPage"/>
		</el-card>
		<!-- 导入 -->
		<el-dialog :visible.sync="import_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div>导入</div>
				<img class="close_icon" src="../../static/close_icon.png" @click="import_dialog = false">
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
		<!-- 下架原因 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="off_reason = ''" :visible.sync="down_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div>确认下架？</div>
				<img class="close_icon" src="../../static/close_icon.png" @click="down_dialog = false">
			</div>
			<div class="remark_content">
				<el-input type="textarea" :rows="3" placeholder="请输入下架原因" v-model="off_reason">
				</el-input>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="mini" @click="down_dialog = false">关闭</el-button>
				<el-button size="mini" type="primary" @click="confirmOff">提交</el-button>
			</div>
		</el-dialog>
		<!-- 图片放大 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="view_dialog">
			<div class="remark_content">
				<el-tabs size="mini" v-model="view_active_index" @tab-click="handleViewClick">
					<el-tab-pane :label="item.shooting_style_name" :name="index.toString()" v-for="(item,index) in view_shooting_style_list"></el-tab-pane>
				</el-tabs>
				<el-carousel style="width: 100%;height: 310px;" trigger="hover" indicator-position="none" :autoplay="false" :initial-index="default_img_index" v-if="view_shooting_style_list.length > 0">
					<el-carousel-item v-for="item in view_shooting_style_list[parseInt(view_active_index)].view_img" :key="item">
						<el-image :z-index="2999" class="view_image" :src="item" fit="scale-down" :preview-src-list="view_shooting_style_list[parseInt(view_active_index)].view_img"></el-image>
					</el-carousel-item>
				</el-carousel>
				<div v-else>暂无</div>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="mini" type="primary" @click="view_dialog = false">关闭</el-button>
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
		padding: 20rem 98rem;
		display: flex;
		flex-direction: column;
		.form_card{
			margin-bottom: 16rem;
			.form_item{
				margin-bottom:0 !important;
			}
		}
		.card_box{
			padding-top: 15rem;
			flex:1;
			.image{
				width: 100px;
				height: 100px;
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
		.remark_content{
			padding:20rem;
		}
		.view_image{
			width: 100%;
			height: 320px;
		}
	}
</style>
<script>
	import commonResource from '../../api/common_resource.js'
	import resource from '../../api/supplier_resource.js'
	import chainResource from '../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../api/date.js";

	import TableTitle from '../SupplyChain/components/table_title.vue'
	import PaginationWidget from '../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				cate_list:[],			//类目列表
				category_ids:[],		//选中的类目
				market_list:[],			//市场列表
				market_ids:[],			//选中的市场
				style_list:[],			//拍摄风格列表
				shooting_style_ids:[],	//选中的拍摄风格
				class_list:[],			//分类列表
				classification_ids:[],	//选中的分类
				check_status_list:[{
					name:'上架待审核',
					id:1
				},{
					name:'审核通过(已上架)',
					id:2
				},{
					name:'上架审核拒绝',
					id:3
				},{
					name:'下架待审核',
					id:4
				},{
					name:'下架审核通过(已下架)',
					id:5
				},{
					name:'下架审核拒绝',
					id:6
				}],						//审核状态列表
				check_status_id:"",		//选中的审核状态
				style_name:"",			//款号
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
				max_height:0,	
				page:1,
				data:[],				//获取的数据
				total:0,
				button_list:{},
				import_dialog:false,	//导入弹窗
				multiple_selection:[],
				fullscreenLoading:false,	//导入加载弹窗
				goods_id:"",				//点击的style_id
				down_dialog:false,			//下架原因弹窗
				off_reason:"",				//下架原因
				view_dialog:false,			//放大图片弹窗
				view_active_index:'0',		//图片放大顶部标签的选中下标
				default_img_index:0,		//图片放大默认图片下标
				view_shooting_style_list:[],//放大图片列表
			}
		},
		activated(){
			if(!this.$route.meta.use_cache){
    			//获取类目列表
				this.ajaxCateList();
    			//市场列表
				this.ajaxMarketList();
    			//拍摄风格列表
				this.ajaxStyleList();
    			//分类列表
				this.ajaxClassList();

				this.category_ids = [];
				this.market_ids = [];
				this.classification_ids = [];
				this.shooting_style_ids = [];
				this.date = [];
				this.check_status_id = "";
				this.style_name = "";
				this.status_id = "";
				this.page = 1;
			}
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
					45 +
					"px";
				});
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
				// window.open(`${this.downLoadUrl}/file/供应商商品批量导入模板.xls`);
				window.open(`${this.downLoadUrl}/file/供应商商品批量导入模板.xlsx`);
			},
			//导入
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					this.fullscreenLoading = true;
					resource.addAllProductStyle({file:files[0]}).then(res => {
						this.$refs.csvUpload.value = null;
						this.import_dialog = false;
						this.fullscreenLoading = false;
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
					category_id:this.category_ids.join(','),
					market_id:this.market_ids.join(','),
					classification_id:this.classification_ids.join(','),
					shooting_id:this.shooting_style_ids.join(','),
					start_time:this.date && this.date.length > 0?this.date[0]:"",
					end_time:this.date && this.date.length > 0?this.date[1]:"",
					check_status:this.check_status_id,
					status:this.status_id,
					style_name:this.style_name,
					page:this.page,
					pagesize:100
				}
				this.loading = true;
				resource.getSupplierGoods(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
						let data = res.data.data.data;
						data.map(item => {
							item['active_index'] = '0';
							item['style_loading'] = false;
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
				let goods_id = [];
				if(total_num == 0){
					this.$message.warning('至少选择一条！');
					return;
				}

				if(type == '0'){	//下架
					title = '确认下架？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 2 ||  item.check_status == 6;
					})
					unset_list.map(item => {
						goods_id.push(item.goods_id)
					})
					unset_num = total_num - unset_list.length;
				}else if(type == '1'){	//上架
					title = '确认上架？'
					let unset_list = this.multiple_selection.filter(item => {
						return item.check_status == 5;
					})
					unset_list.map(item => {
						goods_id.push(item.goods_id)
					})
					unset_num = total_num - unset_list.length;
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
							goods_id:goods_id.join(','),
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
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			//监听更多操作按钮
			handleCommand(e,goods_id,name){
				if(e == '1'){	//查看
					this.$router.push('/gys_edit_goods?goods_type=3&goods_id=' + goods_id);
				}
			},
			//切换上架或下架
			checkStatus(goods_id,type){
				this.goods_id = goods_id;
				if(type == 5){	//上架
					this.$confirm('确认上架?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let arg = {
							goods_id:this.goods_id,
							type:1
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
				}else{	//下架
					this.down_dialog = true;
				}
			},
			//确认下架
			confirmOff(){
				let arg = {
					goods_id:this.goods_id,
					type:0,
					off_reason:this.off_reason
				}
				resource.checkStatus(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.down_dialog = false;
						//获取列表
						this.getGoodsList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换风格图展示
			handleClick(event,index){
				let current_row = JSON.parse(JSON.stringify(this.data[index]));
				let style_id = current_row.shooting_style_list[event.index].style_id;
				current_row.style_loading = true;
				this.$set(this.data,index,current_row);
				chainResource.getStyleImgs({style_id:style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						current_row.shooting_style_list[event.index].img = res.data.data;
						current_row.active_index = event.index.toString();
						current_row.style_loading = false;
						this.$set(this.data,index,current_row);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//放大弹窗切换图片
			handleViewClick(e){
				let style_id = this.view_shooting_style_list[e.index].style_id;
				chainResource.getStyleImgs({style_id:style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						let current_info = JSON.parse(JSON.stringify(this.view_shooting_style_list[e.index]));
						let view_img = [];
						data.map(item => {
							view_img.push(this.domain + item)
						})
						current_info.view_img = view_img;
						this.view_active_index = e.index.toString();
						this.$set(this.view_shooting_style_list,e.index,current_info);
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击放大查看图片
			viewImage(shooting_style_list,active_index,default_img_index){
				this.view_active_index = active_index.toString();
				this.default_img_index = default_img_index;
				shooting_style_list.map(item => {
					item['view_img'] = [];
					item.img.map(img_item => {
						item.view_img.push(this.domain + img_item);
					})
				})
				this.view_shooting_style_list = shooting_style_list;
				this.view_dialog = true;
			},
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






