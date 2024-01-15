<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="提交时间：">
						<div @click.once="changeInitCalendarPage">
							<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
							</el-date-picker>
						</div>
					</el-form-item>
					<el-form-item label="审核状态：">
						<el-select v-model="status" clearable placeholder="全部">
							<el-option v-for="item in status_list" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商：">
						<el-select v-model="supplier_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="对接人：">
						<el-select v-model="maintainer_ids" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option v-for="item in maintainer_list" :key="item.maintainer_id" :label="item.maintainer" :value="item.maintainer_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="白坯二开类型：">
						<el-select v-model="supplier_type" clearable multiple filterable collapse-tags placeholder="全部">
							<el-option label="内部" :value="1"></el-option>
							<el-option label="外部" :value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="款号：">
						<el-input placeholder="输入款号搜索" v-model="style_name"></el-input>
					</el-form-item>
					<el-form-item label="提交人：">
						<el-input placeholder="输入提交人搜索" v-model="username"></el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" v-if="button_list.audit == 1" @click="allSetting('1')">批量审核</el-button>
					<el-button size="mini" type="primary" @click="exportFn" v-if="button_list.export == 1">导出</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" @selection-change="handleSelectionChange" v-loading="loading">
					<el-table-column type="selection" width="55" fixed>
					</el-table-column>
					<el-table-column label="款号" prop="style_name"></el-table-column>
					<el-table-column label="供应商" prop="supplier_name"></el-table-column>
					<el-table-column label="图片" width="200">
						<template slot-scope="scope">
							<el-image :z-index="2006" class="image" :src="`${domain}${scope.row.img}?imageMogr2/thumbnail/200x200`" fit="scale-down" :preview-src-list="[domain + scope.row.img]" v-if="scope.row.img != ''"></el-image>
						</template>
					</el-table-column>
					<el-table-column label="原商品信息/修改后商品信息" width="400">
						<template slot-scope="scope">
							<div class="flex fc as">
								<div class="flex" v-for="(item,index) in scope.row.info_arr.length">
									<div class="flex as" style="width:180px;text-align: start;margin-right:10px" v-if="scope.row.info_arr[index].indexOf('：') == -1">
										<div class="flex fc ac">
											<div style="color:red">（{{scope.row.shooting_style_name}}）</div>
											<div>图片：</div>
										</div>
										<div class="flex-1 flex-warp" v-if="scope.row.info_arr[index].length > 0">
											<el-image :z-index="2006" class="edit_image" :src="`${iii}?imageMogr2/thumbnail/30x30`" fit="scale-down":preview-src-list="scope.row.info_arr[index]" v-for="iii in scope.row.info_arr[index]"></el-image>
										</div>
									</div>
									<div style="width:180px;text-align: start;margin-right:10px" v-html="scope.row.info_arr[index]" v-else></div>

									<div class="flex as" style="width:180px;text-align: start;margin-right:10px" v-if="scope.row.edit_info_arr[index].indexOf('：') == -1">
										<div class="flex fc ac">
											<div style="color:red">（{{scope.row.shooting_style_name}}）</div>
											<div>图片：</div>
										</div>
										<div class="flex-1 flex-warp" v-if="scope.row.edit_info_arr[index].length > 0">
											<el-image :z-index="2006" class="edit_image" :src="`${iii}?imageMogr2/thumbnail/30x30`" fit="scale-down" :preview-src-list="scope.row.edit_info_arr[index]" v-for="iii in scope.row.edit_info_arr[index]"></el-image>
										</div>
									</div>
									<div style="width:180px;text-align: start" v-html="scope.row.edit_info_arr[index]" v-else></div>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="修改提交时间" width="140" prop="add_time"></el-table-column>
					<el-table-column label="修改提交人" prop="add_admin_name"></el-table-column>
					<el-table-column label="审核状态" prop="common_text" width="150">
						<template slot-scope="scope">
							<div class="flex jc">
								<div>{{scope.row.check_status | check_status_filter}}</div>
								<div v-if="scope.row.check_admin_name">（{{scope.row.check_admin_name}}）</div>
							</div>
							<div>{{scope.row.check_time}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="120" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" v-if="button_list.audit == 1 && scope.row.check_status == 1" @click="allSetting('2',scope.row.log_id)">审核</el-button>
							<el-button type="text" size="small" v-if="button_list.revoke == 1 && scope.row.is_self == 1 && scope.row.check_status == 1" @click="revokeFn(scope.row.log_id)">撤销</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget :total="total" :page="page" :multiple_selection_num="multiple_selection.length" :pagesize="100" @checkPage="checkPage"/>
		</el-card>
		<!-- 审批 -->
		<el-dialog :visible.sync="audit_dialog" @close="audit_status = 1" width="30%">
			<div slot="title" class="dialog_title">
				<div>{{audit_title}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="audit_dialog = false">
			</div>
			<div class="down_box">
				<el-radio-group v-model="audit_status">
					<el-radio :label="1">通过</el-radio>
					<el-radio :label="2">拒绝</el-radio>
				</el-radio-group>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="audit_dialog = false">取消</el-button>
				<el-button size="small" type="primary" @click="confirmAudit">确定</el-button>
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
	.el-tooltip__popper {
		max-width: 800px;
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
	.edit_image{
		margin-right: 3px;
		margin-bottom: 3px;
		width: 30px;
		height: 30px;
	}
</style>
<script>
	import commonResource from '../../../../api/common_resource.js'
	import resource from '../../../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../../../api/date.js";

	import { MessageBox, Message } from "element-ui";

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				loading:false,
				supplier_list:[],		//供应商列表
				supplier_ids:[],		//选中的供应商
				style_name:"",			//款式编码
				username:"",			//提交人
				maintainer_list:[],
				maintainer_ids:[],			//对接人
				supplier_type:[],			
				status_list:[{
					name:'待审核',
					id:1
				},{
					name:'审核通过',
					id:2
				},{
					name:'审核拒绝',
					id:3
				},{
					name:'已撤销',
					id:4
				}],						//审核状态列表
				status:"",				//选中的审核状态
				date:[],				//日期
				pickerOptions: {
					shortcuts: [
					{
						text: "今日",
						onClick(picker) {
							const start = getNowDate();
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "近三日",
						onClick(picker) {
							const start = getCurrentDate(3);
							const end = getNowDate();
							picker.$emit("pick", [start, end]);
						},
					},
					{
						text: "近七日",
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
				multiple_selection:[],
				log_id:"",				//单个或批量选中的id
				audit_dialog:false,		//审批弹窗
				audit_status:1,			//审批类型
				audit_title:"",
			}
		},
		created(){
			let new_menu_list = [];
			let arr = this.menu_arr.filter(item => {
				return item.web_url == 'supply_chain';
			});
			let child_list = arr[0].list;
			let child_arr = child_list.filter(item => {
				return item.web_url == 'chain_goods_page';
			});
			let tab_list = child_arr[0].list;
			let edit_record_arr = tab_list.filter(item => {
				return item.web_url == "edit_record";
			})
			if(edit_record_arr.length > 0){
				//获取用户列表
				this.ajaxSupplierMaintainer();
				//获取供应商列表
				this.ajaxSupplierList();
				//获取列表
				this.editLogList();
			}
		},
		props:{
			//监听url变化
			webUrl:{
				type:String,
			default:''
			}
		},
		watch:{
			//监听切换到审核修改记录页面重新获取列表
			webUrl:function(n,o){
				if(n == 'edit_record'){
					//获取列表
					this.editLogList();
				}
			},
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
			},
			menu_arr() {
				return this.$store.state.menu_list;
			}
		},
		methods: {
			//将日期筛选改为默认上月到当前月
			changeInitCalendarPage() {
				let nodeList = document.querySelectorAll("button.el-picker-panel__icon-btn.el-icon-arrow-left");
				nodeList[0].click()
				setTimeout(() => {
					nodeList[1].click()
				},10);
			},
    		//监听屏幕大小变化
			onResize() {
				this.$nextTick(() => {
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 70 + "px";
				});
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
			ajaxSupplierList(){
				commonResource.ajaxSupplierList().then(res => {
					if(res.data.code == 1){
						this.supplier_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取列表
			editLogList(){
				let arg = {
					supplier_id:this.supplier_ids.join(','),
					status:this.status,
					style_name:this.style_name,
					start_date:this.date && this.date.length > 0?this.date[0]:"",
					end_date:this.date && this.date.length > 0?this.date[1]:"",
					username:this.username,
					maintainer:this.maintainer_ids.join(','),
					maintainer_ids:this.maintainer_ids,
					supplier_type:this.supplier_type.join(','),
					page:this.page,
					pagesize:100
				}
				this.loading = true;
				resource.editLogList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						this.data = data.data;
						this.data.map(item => {
							let info_arr = [];
							for(let k in item.info){
								if(k == 'hot_style' || k == 'sole_style' || k == 'data_style' || k == 'again_style' || k == 'depth_inventory' || k == 'video_style'){
									if(item.info[k] == 0){
										info_arr.push(`${this.label_filter(k)}：否`)
									}else{
										info_arr.push(`${this.label_filter(k)}：是`)
									}
								}else if(k == 'all_imgs'){
									let all_imgs_arr = [];
									if(item.info[k] != ''){
										item.info[k].split(',').map(iii => {
											all_imgs_arr.push(this.domain + iii)
										})
									}
									info_arr.push(all_imgs_arr)
								}else if(k == 'brand_ksbm'){
									let brand_ksbm_str = `${this.label_filter(k)}：`;

									let arr = item.info[k].split(';');
									if(arr.length > 0){
										brand_ksbm_str += `<br/>`
										arr.map(info_item => {
											brand_ksbm_str += `${info_item}<br/>`
										})
										info_arr.push(brand_ksbm_str)
									}
								}else{
									info_arr.push(`${this.label_filter(k)}：${item.info[k]}`)
								}
							}
							item['info_arr'] = info_arr;

							let edit_info_arr = [];
							for(let k in item.edit_info){
								if(k == 'hot_style' || k == 'sole_style' || k == 'data_style' || k == 'again_style' || k == 'depth_inventory' || k == 'video_style'){
									if(item.edit_info[k] == 0){
										edit_info_arr.push(`${this.label_filter(k)}：否`)
									}else{
										edit_info_arr.push(`${this.label_filter(k)}：是`)
									}
								}else if(k == 'all_imgs'){
									let all_imgs_arr = [];
									if(item.edit_info[k] != ''){
										item.edit_info[k].split(',').map(iii => {
											all_imgs_arr.push(this.domain + iii)
										})
									}
									edit_info_arr.push(all_imgs_arr)
								}else if(k == 'brand_ksbm'){
									let brand_ksbm_str = `${this.label_filter(k)}：`;

									let arr = item.edit_info[k].split(';');
									if(arr.length > 0){
										brand_ksbm_str += `<br/>`
										arr.map(edit_item => {
											brand_ksbm_str += `${edit_item}<br/>`
										})
										edit_info_arr.push(brand_ksbm_str)
									}
								}else{
									edit_info_arr.push(`${this.label_filter(k)}：${item.edit_info[k]}`)
								}
							}
							item['edit_info_arr'] = edit_info_arr;
						})
						this.button_list = data.button_list;
						this.total = data.total;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
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
						supplier_id:this.supplier_ids.join(','),
						status:this.status,
						style_name:this.style_name,
						start_date:this.date && this.date.length > 0?this.date[0]:"",
						end_date:this.date && this.date.length > 0?this.date[1]:"",
						username:this.username,
						maintainer:this.maintainer_ids.join(','),
						maintainer_ids:this.maintainer_ids,
						supplier_type:this.supplier_type.join(',')
					}
					if(this.multiple_selection.length > 0){
						let log_ids = this.multiple_selection.map(item => {
							return item.log_id
						})
						arg['log_id'] = log_ids.join(',');
					}
					var arr = [];
					for(let k in arg){
						if(arg[k]){
							arr.push(`${k}=${arg[k]}`)
						}
					}
					let baseURL = `${location.origin}/api/editlog/export?${arr.join('&')}`;
					window.open(baseURL)
				})
				.catch(() => {
					Message({
						type: "info",
						message: "取消导出",
					});
				});
			},
			label_filter(v){
				switch(v){
				case 'title':
					return '标题';
				case 'style_name':
					return '供应商款号'
				case 'supplier_ksbm':
					return '供应商款式编码'
				case 'i_id':
					return '内部款式编码'
				case 'bd_i_id':
					return 'BD款式编码'
				case 'supplier_name':
					return '供应商'
				case 'market_name':
					return '市场'
				case 'season_name':
					return '季节'
				case 'category_name':
					return '类目'
				case 'classification_name':
					return '分类'
				case 'shooting_style_name':
					return '拍摄风格'
				case 'fabric':
					return '面料'
				case 'size':
					return '尺码'
				case 'cost_price':
					return '成本价'
				case 'net_disk_address':
					return '网盘地址'
				case 'remark':
					return '备注'
				case 'wholesale_price':
					return '档口批价'
				case 'hot_style':
					return '爆款'
				case 'sole_style':
					return '独家款'
				case 'data_style':
					return '主推款'
				case 'again_style':
					return '自主款'
				case 'color':
					return '颜色'
				case 'hot_url':
					return '爆款链接'
				case 'hot_img':
					return '爆款图片'
				case 'data_num':
					return '主推款库存'
				case 'data_price':
					return '主推款调价'
				case 'data_remark':
					return '主推款备注'
				case 'depth_inventory':
					return '深度库存'
				case 'video_style':
					return '视频款'
				case 'price_control':
					return '控价'
				case 'all_imgs':
					return '图片'
				case 'replace_ksbm':
					return '替代款'
				case 'brand_ksbm':
					return '二开品牌款式编码'
				}
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取列表
				this.editLogList();
			},
			//切换多选
			handleSelectionChange(val) {
				this.multiple_selection = val;
			},
			//批量操作
			allSetting(type,log_id){
				if(type == '1'){		//批量审核
					if(this.multiple_selection.length == 0){
						this.$message.warning('还没有选中的数据哦～')
					}else{
						let unset_list = this.multiple_selection.filter(item => {
							return item.check_status == 1;
						})
						let log_ids = unset_list.map(item => {
							return item.log_id;
						})
						let unset_num = this.multiple_selection.length - unset_list.length;
						this.audit_title = `您选择了${this.multiple_selection.length}项，其中不可操作${unset_num}项，确认批量审核？`;
						this.log_id = log_ids.join(',');
						this.audit_dialog = true;
					}
				}else{					//单个审核
					this.audit_title = '审核';
					this.log_id = log_id.toString();
					this.audit_dialog = true;
				}
			},
			//提交审批
			confirmAudit(){
				let arg = {
					log_id:this.log_id,
					status:this.audit_status
				}
				resource.editlogAudit(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.audit_dialog = false;
						let new_log_ids = this.log_id.split(',');
						let newArr = this.data.filter((v) => new_log_ids.some((val) => val == v.log_id))
						let goods_ids = newArr.map(item => {
							return item.goods_id
						})
						this.$emit('updateGoods',goods_ids.join(','));
						//获取列表
						this.editLogList()
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//撤销修改
			revokeFn(log_id){
				this.$confirm('确认撤销编辑?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						log_id:log_id
					}
					resource.editLogRevoke(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.editLogList()
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
		filters:{
			//审核状态
			check_status_filter:function(v){
				switch(v){
				case 1:
					return '待审核';
				case 2:
					return '审核通过'
				case 3:
					return '审核拒绝'
				case 4:
					return '已撤销'
				}
			},
			
		},
		components:{
			TableTitle,
			PaginationWidget
		}
	}
</script>






