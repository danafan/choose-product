<template>
	<div class="height-100">
		<el-card class="card_box height-100" id="card_box">
			<div class="scroll_box flex-1 flex-scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item label="供应商：">
						<el-input placeholder="供应商名称" v-model="supplier_name">
						</el-input>
					</el-form-item>
					<el-form-item label="区域：">
						<el-select v-model="area" clearable placeholder="全部">
							<el-option :label="item" :value="item" v-for="item in area_list"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="拜访员：">
						<el-select v-model="visit_user_id" clearable filterable placeholder="全部">
							<el-option v-for="item in user_list" :key="item.visit_user_id" :label="item.visit_user_name" :value="item.visit_user_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="拜访时间：">
						<el-date-picker v-model="date" size="mini" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column label="供应商名称" prop="supplier_name"></el-table-column>
					<el-table-column label="区域" prop="area"></el-table-column>
					<el-table-column label="供应商地址" prop="address"></el-table-column>
					<el-table-column label="拜访员" prop="visit_user_name"></el-table-column>
					<el-table-column label="拜访时间" width="120" prop="visit_time"></el-table-column>
					<el-table-column label="拜访目的" prop="visit_purpose"></el-table-column>
					<el-table-column label="拜访过程描述" prop="description"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="图片" width="150" >
						<template slot-scope="scope">
							<div v-if="scope.row.images.length == 0">暂无</div>
							<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-if="scope.row.images.length > 0 && loading == false">
								<el-carousel-item v-for="item in scope.row.images" :key="item">
									<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
								</el-carousel-item>
							</el-carousel>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="addFn('2',scope.row.visit_log_id)" v-if="button_list.detail == 1">查看</el-button>
							<el-button size="mini" type="text" @click="addFn('3',scope.row.visit_log_id)" v-if="button_list.edit == 1">编辑</el-button>
							<el-button size="mini" type="text" @click="delVisit(scope.row.visit_log_id)" v-if="button_list.del == 1">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget :total="data.total" :page="page" :show_multiple="false" :pagesize="10" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加/编辑 -->
		<el-dialog :visible.sync="edit_dialog" @close="closeDialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_type == '1'?'添加':dialog_type == '2'?'详情':'编辑'}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="edit_dialog = false">
			</div>
			<!-- 内容 -->
			<div class="pt-15">
				<el-form size="mini">
					<el-form-item label="供应商名称：" :required="dialog_type == '1' || dialog_type == '3'">
						<el-input style="width: 192px;" placeholder="供应商名称" v-model="dialog_arg.supplier_name" v-if="dialog_type == '1' || dialog_type == '3'">
						</el-input>
						<div v-else>{{detail_info.supplier_name}}</div>
					</el-form-item>
					<el-form-item label="拜访目的：" :required="dialog_type == '1' || dialog_type == '3'">
						<el-input style="width: 192px;" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="拜访目的" v-model="dialog_arg.visit_purpose" v-if="dialog_type == '1' || dialog_type == '3'">
						</el-input>
						<div v-else>{{detail_info.visit_purpose}}</div>
					</el-form-item>
					<el-form-item label="拜访员：" :required="dialog_type == '1' || dialog_type == '3'">
						<el-select v-model="dialog_arg.visit_user_id" clearable filterable placeholder="全部" v-if="dialog_type == '1' || dialog_type == '3'">
							<el-option v-for="item in user_list" :key="item.visit_user_id" :label="item.visit_user_name" :value="item.visit_user_id">
							</el-option>
						</el-select>
						<div v-else>{{detail_info.visit_user_name}}</div>
					</el-form-item>
					<el-form-item label="拜访时间：" :required="dialog_type == '1' || dialog_type == '3'">
						<el-date-picker v-model="dialog_arg.visit_time" type="date" clearable value-format="yyyy-MM-dd" placeholder="选择日期" v-if="dialog_type == '1' || dialog_type == '3'">
						</el-date-picker>
						<div v-else>{{detail_info.visit_time}}</div>
					</el-form-item>
					<el-form-item label="拜访过程描述：">
						<el-input style="width: 192px;" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="拜访过程描述" v-model="dialog_arg.description" v-if="dialog_type == '1' || dialog_type == '3'">
						</el-input>
						<div v-else>{{detail_info.description}}</div>
					</el-form-item>
					<el-form-item label="区域：">
						<el-select v-model="dialog_arg.area" clearable placeholder="选择区域" v-if="dialog_type == '1' || dialog_type == '3'">
							<el-option :label="item" :value="item" v-for="item in area_list"></el-option>
						</el-select>
						<div v-else>{{detail_info.area}}</div>
					</el-form-item>
					<el-form-item label="供应商地址：" :required="dialog_type == '1' || dialog_type == '3'">
						<el-input style="width: 192px;" placeholder="供应商地址" v-model="dialog_arg.address" v-if="dialog_type == '1' || dialog_type == '3'">
						</el-input>
						<div v-else>{{detail_info.address}}</div>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input style="width: 192px;" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="备注" v-model="dialog_arg.remark" v-if="dialog_type == '1' || dialog_type == '3'">
						</el-input>
						<div v-else>{{detail_info.remark}}</div>
					</el-form-item>
					<el-form-item label="图片：">
						<UploadFile v-if="edit_dialog && (dialog_type == '1' || dialog_type == '3')" :img_list="attachment_img" :is_multiple="true" :current_num="attachment_img.length" :max_num="9" @callbackFn="attachmentCallbackFn"/>
						<div v-else>
							<el-image style="width: 80px;height: 80px;margin-right: 10px;" :z-index="99999" :src="item" :initial-index="index" :preview-src-list="detail_attachment_img" v-for="(item,index) in detail_attachment_img">
							</el-image>
						</div>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="edit_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="saveFn">保存</el-button>
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
	.chain_page_content{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 24rem;
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
	}
	.pt-15{
		padding-top: 15px;
	}
</style>
<script>
	import commonResource from '../../../../api/common_resource.js'
	import resource from '../../../../api/chain_resource.js'
	import { getNowDate,getCurrentDate } from "../../../../api/date.js";

	import { MessageBox, Message } from "element-ui";

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	import UploadFile from '../../../../components/upload_file.vue'
	export default{
		data(){
			return{
				loading:false,
				supplier_name:"",		//供应商名称
				// supplier_list:[],		//供应商列表
				// supplier_ids:[],		//选中的供应商
				area_list:[],			//区域
				area:"",				//选中的区域
				user_list:[],			//拜访员列表
				visit_user_id:"",		//选中的拜访员
				date:[],				//上新日期
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
				button_list:{},
				data:{},				//获取的数据
				visit_log_id:"",		//点击的记录ID
				edit_dialog:false,		//添加/编辑弹窗
				dialog_type:'1',		//1:添加；2:查看；3:编辑
				dialog_arg:{
					supplier_name:"",
					visit_purpose:"",
					visit_user_id:"",
					description:"",
					area:"",
					remark:"",
					address:"",
					visit_time:""
				},
				attachment_img:[],				//编辑图片
				detail_info:{},					//详情
				detail_attachment_img:[],		//详情图片
			}
		},
		created(){
			//Ajax获取预备库供应商列表接口
			// this.ajaxReserveSupplier();
			//拜访员工列表
			this.ajaxVisitUser();
			//预备库下拉框筛选项
			this.selectionMap();
			//获取列表
			this.getVisitList();
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
					let card_box_height = document.getElementById("scroll_box").offsetHeight;
					let form_height = document.getElementById("form_height").offsetHeight;
					this.max_height = card_box_height - form_height + 70 + "px";
				});
			},
			//Ajax获取预备库供应商列表接口
			// ajaxReserveSupplier(){
			// 	resource.ajaxReserveSupplier().then(res => {
			// 		if(res.data.code == 1){
			// 			this.supplier_list = res.data.data;
			// 		}else{
			// 			this.$message.warning(res.data.msg);
			// 		}
			// 	})
			// },
			//预备库下拉框筛选项
			selectionMap(){
				resource.selectionMap().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.area_list = data.area;						//区域
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取用户列表
			ajaxVisitUser(){
				resource.ajaxVisitUser().then(res => {
					if(res.data.code == 1){
						this.user_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取列表
			getVisitList(){
				let arg = {
					visit_user_id:this.visit_user_id,
					supplier_name:this.supplier_name,
					area:this.area,
					start_date:this.date && this.date.length > 0?this.date[0]:"",
					end_date:this.date && this.date.length > 0?this.date[1]:"",
					from:1,
					page:this.page,
					pagesize:10
				}

				this.loading = true;
				resource.visitList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.button_list = res.data.data.button_list;
						this.data = res.data.data;
						this.data.data.map(item => {
							item['images'] = [];
							let images = item.attachment == ''?[]:item.attachment.split(',');
							images.map(i => {
								item.images.push(this.domain + i)
							})
						})
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
				this.getVisitList();
			},
			//点击添加/编辑
			addFn(type,visit_log_id){
				this.dialog_type = type;
				if(this.dialog_type == '1'){	//添加
					this.edit_dialog = true;	
				}else if(this.dialog_type == '2'){	//查看
					this.visit_log_id = visit_log_id;
					let arg = {
						visit_log_id:this.visit_log_id
					}
					resource.visitInfo(arg).then(res => {
						if(res.data.code == 1){
							this.detail_info = res.data.data;
							if(this.detail_info.attachment){
								let attachment_img = this.detail_info.attachment.split(',');
								attachment_img.map(item => {
									this.detail_attachment_img.push(this.domain + item);
								})
							}
							this.edit_dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{
					this.visit_log_id = visit_log_id;
					let arg = {
						visit_log_id:this.visit_log_id
					}
					resource.editVisitGet(arg).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							for(let k in this.dialog_arg){
								this.dialog_arg[k] = data[k];
							}
							if(data.attachment){
								this.attachment_img = data.attachment.split(',');
							}
							this.edit_dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//拜访图片回调
			attachmentCallbackFn(v){
				this.attachment_img = v.image_arr;
			},
			//关闭添加/编辑弹窗
			closeDialog(){
				this.dialog_arg = {
					supplier_name:"",
					visit_purpose:"",
					visit_user_id:"",
					description:"",
					area:"",
					remark:"",
					address:"",
					visit_time:""
				};
				this.attachment_img = [];				//编辑图片
				this.detail_info = {};					//详情
				this.detail_attachment_img = [];		//详情图片
			},
			//添加/编辑提交
			saveFn(){
				if(this.dialog_arg.reserve_id == ''){
					this.$message.warning('请填写供应商');
					return;
				}else if(this.dialog_arg.visit_purpose == ''){
					this.$message.warning('请输入拜访目的');
					return;
				}else if(this.dialog_arg.visit_user_id == ''){
					this.$message.warning('请选择拜访员');
					return;
				}else if(!this.dialog_arg.visit_time){
					this.$message.warning('请选择拜访时间');
					return;
				}else if(!this.dialog_arg.address){
					this.$message.warning('请输入供应商地址');
					return;
				}
				let arg = JSON.parse(JSON.stringify(this.dialog_arg));
				arg['attachment'] = this.attachment_img.join(',');
				if(this.dialog_type == '1'){	//添加
					resource.addVisit(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.edit_dialog = false;
							//获取列表
							this.getVisitList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{	//编辑
					arg['visit_log_id'] = this.visit_log_id;
					resource.editVisitPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.edit_dialog = false;
							//获取列表
							this.getVisitList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
				
			},
			//删除拜访记录接口
			delVisit(visit_log_id){
				this.$confirm('确认删除该拜访记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						visit_log_id:visit_log_id
					}
					resource.delVisit(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getVisitList();
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
			PaginationWidget,
			UploadFile
		}
	}
</script>






