<template>
	<div class="chain_page_content">
		<el-card class="card_box height-100 flex fc">
			<div class="scroll_box flex-1 scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height" @submit.native.prevent>
					<el-form-item class="form_item" label="公告内容：">
						<el-input clearable v-model="keyword" placeholder="请输入关键字搜索"></el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加公告</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column width="140" label="公告标题" prop="notice_title"></el-table-column>
					<el-table-column width="180" label="公告内容" prop="notice_content"></el-table-column>
					<el-table-column label="图片" width="150">
						<template slot-scope="scope">
							<div v-if="scope.row.images.length == 0">暂无</div>
							<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
								<el-carousel-item v-for="(item,index) in scope.row.images" :key="index">
									<el-image :z-index="2006" class="image" :src="`${item}?imageMogr2/thumbnail/200x200`" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
								</el-carousel-item>
							</el-carousel>
						</template>
					</el-table-column>
					<el-table-column width="95" label="发布日期" prop="add_time"></el-table-column>
					<el-table-column width="95" label="开始时间" prop="start_day"></el-table-column>
					<el-table-column width="95" label="结束时间" prop="end_day"></el-table-column>
					<el-table-column label="发布人" prop="add_user_name"></el-table-column>
					<el-table-column label="审核状态">
						<template slot-scope="scope">
							<div>{{scope.row.status | status}}</div>
						</template>
					</el-table-column>
					<el-table-column label="审核人" prop="check_user"></el-table-column>
					<el-table-column label="操作" width="140" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" disabled v-if="scope.row.is_online">已发布</el-button>
							<el-button type="text" size="small" @click="auditFn('1',scope.row.notice_id)" v-if="button_list.check == 1 && scope.row.status == 0">同意发布</el-button>
							<el-button type="text" size="small" @click="auditFn('2',scope.row.notice_id)" v-if="button_list.check == 1 && scope.row.status == 0">拒绝发布</el-button>
							<el-button type="text" size="small" @click="addFn('2',scope.row.notice_id)" v-if="!scope.row.is_online && button_list.edit == 1 && scope.row.status != 0">编辑</el-button>
							<el-button type="text" size="small" @click="deleteFn(scope.row.notice_id)" v-if="button_list.del == 1 && scope.row.status != 0">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget id="bottom_row" :total="data.total" :page="page" :pagesize="20" :show_multiple="false" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加或编辑 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="closeDialog" :visible.sync="show_dialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_title}}</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form size="small" label-width="100px">
					<el-form-item label="公告标题：" required>
						<el-input style="width: 260px" clearable v-model="notice_title" placeholder="请输入公告标题"></el-input>
					</el-form-item>
					<el-form-item label="公告内容：" required>
						<el-input style="width: 320px" type="textarea" :rows="5" clearable v-model="notice_content" placeholder="请输入公告内容">
						</el-input>
					</el-form-item>
					<el-form-item label="在线时间：" required>
						<el-date-picker v-model="date" type="datetimerange"
						value-format="yyyy-MM-dd HH:mm:ss" range-separator="至"
						start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="可见范围：" required>
					<el-checkbox-group v-model="arg_view_type">
						<el-checkbox :label="1">内部</el-checkbox>
						<el-checkbox :label="2">供应商</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="公告图片：">
					<UploadFile :img_list="img_list" :is_multiple="true" :current_num="img_list.length" :max_num="6" @callbackFn="callbackFn"/>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="small" @click="show_dialog = false">取消</el-button>
			<el-button type="primary" size="small" @click="commitFn">提交</el-button>
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
	.dialog_content{
		padding: 20rem;
	}
	.image{
		width: 100px;
		height: 50px;
	}
</style>
<script>
	import resource from '../../../api/chain_resource.js'

	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	import UploadFile from '../../../components/upload_file.vue'
	export default{
		data(){
			return{
				loading:false,
				keyword:"",			//关键字
				max_height:0,	
				page:1,
				data:{},				//获取的数据
				button_list:{},
				show_dialog:false,		//添加或编辑弹窗
				dialog_title:"",		//弹窗标题
				type:"",				//弹窗类型（1:添加；2:编辑）
				notice_id:"",
				notice_title:"",		//公告标题
				notice_content:"",		//公告内容
				date:[],				//开始和结束时间
				pickerOptions:{                                 
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					},
				},
				arg_view_type:[1],			//添加或编辑可见范围
				img_list:[],				//公告图片
			}
		},
		created(){
			//公告列表
			this.noticeList();
		},
		destroyed() {
			window.removeEventListener("resize", () => {});
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
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
					this.max_height = card_box_height - form_height + 20 + "px";
				});
			},
			//监听图片列表回调
			callbackFn(file) {
				this.img_list = file.image_arr;
			},
    		//公告列表
			noticeList(){
				let arg = {
					page:this.page,
					pagesize:20,
					title:this.keyword
				}
				this.loading = true;
				resource.noticeList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						data.data.map(item => {
							var start_day = new Date(item.start_day).getTime();
							var end_day = new Date(item.end_day).getTime();
							var current_time = new Date().valueOf();
							let is_online = false;
							if(((current_time > start_day && current_time < end_day)  || current_time > end_day) && item.status == 1){
								is_online = true
							}
							item.is_online = is_online;

							let images = [];
							if(item.img){
								item.img.split(',').map(i => {
									images.push(this.domain + i);
								})
							}
							
							item['images'] = images;
						})

						this.data = data;
						this.button_list = data.button_list;
						this.$refs.table.bodyWrapper.scrollTop = 0;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				this.page = v;
				//公告列表
				this.noticeList();
			},
			//点击添加或编辑
			addFn(type,notice_id){
				this.type = type;
				if(this.type == '2'){
					this.notice_id = notice_id;
					//获取公告详情
					this.noticeInfo();
				}
				this.dialog_title = type == '1'?'添加公告':'编辑公告';
				this.show_dialog = true;
			},
			//获取公告详情
			noticeInfo(){
				let arg = {
					notice_id:this.notice_id
				}
				resource.noticeInfo(arg).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.notice_title = data.notice_title;
						this.notice_content = data.notice_content;
						this.arg_view_type = data.view_type;
						if(data.img){
							this.img_list = data.img.split(',');
						}

						// let img_list = data.img.split(',');
						// img_list.map(item => {
						// 	let img_obj = {
						// 		urls:item,
						// 		show_icon:false
						// 	}
						// 	this.img_list.push(img_obj)
						// })
						let info_date = [];
						info_date[0] = data.start_day;
						info_date[1] = data.end_day;
						this.date = info_date;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击确认
			commitFn(){
				if(this.notice_title == ''){
					this.$message.warning('请输入公告标题');
				}else if(this.notice_content == ''){
					this.$message.warning('请输入公告内容');
				}else if(!this.date || this.date.length == 0){
					this.$message.warning('请选择在线时间');
				}else if(this.arg_view_type.length == 0){
					this.$message.warning('请选择可见范围');
				}else{
					var arg = {
						notice_title:this.notice_title,
						notice_content:this.notice_content,
						start_date:this.date && this.date.length > 0?this.date[0]:"",
						end_date:this.date && this.date.length > 0?this.date[1]:"",
						view_type:this.arg_view_type,
						img:this.img_list.join(',')
					}
					if(this.type == '1'){		//创建
						resource.addNotice(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.show_dialog = false;
								//公告列表
								this.noticeList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{				//编辑
						arg.notice_id = this.notice_id;
						resource.editNotice(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.show_dialog = false;
								//公告列表
								this.noticeList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					//获取公告列表
					this.$store.dispatch('getNotice')
				}
			},
			//点击删除
			deleteFn(notice_id){
				this.$confirm('确认删除该公告?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						notice_id:notice_id
					}
					resource.noticeDel(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.noticeList();
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
			//关闭弹窗
			closeDialog(){
				this.img_list = [];
				this.notice_title = '';
				this.notice_content = '';
				this.date = [];
				this.arg_view_type = [1];
			},
			//公告审核
			auditFn(status,notice_id){
				this.$confirm(`${status == '1'?'同意发布':'拒绝发布'}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						notice_id:notice_id,
						status:status
					}
					resource.auditNotice(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.$store.dispatch('ajaxNum')
							//公告列表
							this.noticeList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消审核'
					});          
				});
			}
		},
		filters:{
			//审核状态
			status:function(v){
				switch(v){
				case 0:
					return '待审核';
				case 1:
					return '审核通过';
				case 2:
					return '审核拒绝';
				}	
			}
		},
		components:{
			TableTitle,
			PaginationWidget,
			UploadFile
		}
	}
</script>






