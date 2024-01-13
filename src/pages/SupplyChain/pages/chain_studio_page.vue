<template>
	<div class="chain_page_content">
		<el-card class="card_box height-100 flex fc">
			<div class="scroll_box flex-1 scroll-y" id="scroll_box">
				<el-form style="padding-top: 20px;" :inline="true" size="mini" id="form_height">
					<el-form-item class="form_item" label="工作室：">
						<el-input clearable v-model="studio_name" placeholder="输入工作室搜索"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label="联系人：">
						<el-input clearable v-model="contacter" placeholder="输入联系人搜索"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label="风格：">
						<el-input clearable v-model="style" placeholder="输入风格搜索"></el-input>
					</el-form-item>
					<el-form-item class="form_item">
						<el-button type="primary" @click="checkPage(1)">查询</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<TableTitle title="数据列表" id="table_title">
					<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
				</TableTitle>
				<el-table ref="table" size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
					<el-table-column label="工作室名称" prop="studio_name"></el-table-column>
					<el-table-column label="风格" prop="style"></el-table-column>
					<el-table-column label="联系人" prop="contacter"></el-table-column>
					<el-table-column label="联系方式" prop="contact_information"></el-table-column>
					<el-table-column label="示例图" width="150">
						<template slot-scope="scope">
							<div v-if="scope.row.images.length == 0">暂无</div>
							<el-carousel trigger="hover" indicator-position="none" :autoplay="false" height="100px" v-else>
								<el-carousel-item v-for="(item,index) in scope.row.images" :key="index">
									<el-image :z-index="2006" class="image" :src="item" fit="scale-down" :preview-src-list="scope.row.images"></el-image>
								</el-carousel-item>
							</el-carousel>
						</template>
					</el-table-column>
					<el-table-column label="添加时间" prop="add_time"></el-table-column>
					<el-table-column label="添加人" prop="add_admin_name"></el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="addFn('2',scope.row.studio_id)" v-if="button_list.edit == 1">编辑</el-button>
							<el-button type="text" size="small" @click="deleteFn(scope.row.studio_id)" v-if="button_list.del == 1">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<PaginationWidget id="bottom_row" :total="total" :page="page" :pagesize="30" :show_multiple="false" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加/编辑 -->
		<el-dialog :visible.sync="dialog" @close="closeDialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_type == '1'?'添加':'编辑'}}工作室</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="dialog = false">
			</div>
			<!-- 内容 -->
			<div class="pt-15">
				<el-form size="mini">
					<el-form-item label="工作室名称：" required>
						<el-input clearable v-model="arg.studio_name" style="width: 120px;" placeholder="工作室名称"></el-input>
					</el-form-item>
					<el-form-item label="风格：">
						<el-input style="width: 192px;" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="风格" v-model="arg.style">
						</el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input clearable v-model="arg.contacter" style="width: 120px;" placeholder="联系人"></el-input>
					</el-form-item>
					<el-form-item label="联系方式：" required>
						<el-input clearable v-model="arg.contact_information" style="width: 120px;" placeholder="联系方式"></el-input>
					</el-form-item>
					<el-form-item label="图片：">
						<UploadFile v-if="show_upload_file" :img_list="imgs_list" :is_multiple="true" :current_num="imgs_list.length" :max_num="9" @callbackFn="imgCallbackFn"/>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="commitFn">提交</el-button>
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
		.pt-15{
			padding-top: 15rem;
		}
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
				studio_name:"",			//工作室名称
				contacter:"",			//联系人
				style:"",				//风格
				max_height:0,	
				button_list:{},
				page:1,
				data:[],				//获取的数据
				total:0,
				dialog:false,
				dialog_type:'1',		//1:添加；2:编辑
				studio_id:"",
				arg:{
					studio_name:"",
					style:"",
					contacter:"",
					contact_information:""
				},
				imgs_list:[],			//工商营业执照
				show_upload_file:true
			}
		},
		created(){
			//工作室列表
			this.getData();
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
    		//工作室列表
			getData(){
				let arg = {
					studio_name:this.studio_name,
					contacter:this.contacter,
					style:this.style,
					page:this.page,
					pagesize:30
				}
				this.loading = true;
				resource.studioList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data;
						this.button_list = data.button_list;
						let table_data = data.data;
						table_data.map(item => {
							let images = [];
							if(item.imgs){
								item.imgs.split(',').map(i => {
									images.push(this.domain + i);
								})
							}
							item['images'] = images;
						})
						this.data = table_data;
						this.total = data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//切换页码
			checkPage(v){
				this.page = v;
				this.getData();
			},
			//点击添加或编辑
			addFn(type,studio_id){
				this.dialog_type = type;
				if(type == '1'){		//添加
					this.dialog = true;
				}else{					//编辑
					this.studio_id = studio_id;
					let arg = {
						studio_id:this.studio_id
					}
					resource.editStudioGet(arg).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							for(let k in this.arg){
								this.arg[k] = data[k];
							}
							if(data.imgs){
								this.imgs_list = data.imgs.split(',');
							}
							this.dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//添加/编辑提交
			commitFn(){
				if(this.arg.studio_name == ''){
					this.$message.warning('请输入工作室名称！')
				}else if(this.arg.contact_information == ''){
					this.$message.warning('请输入联系方式！')
				}else{
					let arg = JSON.parse(JSON.stringify(this.arg));
					arg['imgs'] = this.imgs_list.join(',');
					if(this.dialog_type == '1'){	//添加
						resource.addStudio(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.dialog = false;
								//工作室列表
								this.getData();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{							//编辑
						arg['studio_id'] = this.studio_id;
						resource.editStudioPost(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.dialog = false;
								//工作室列表
								this.getData();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}
			},
			//监听工商营业执照图片列表回调
			imgCallbackFn(v) {
				this.imgs_list = v.image_arr;
			},
			//关闭弹窗
			closeDialog(){
				this.arg = {
					studio_name:"",
					style:"",
					contacter:"",
					contact_information:""
				};
				this.imgs_list = [];			//工商营业执照
			},
			//点击删除
			deleteFn(studio_id){
				this.$confirm('确认删除该工作室?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						studio_id:studio_id
					}
					resource.delStudio(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.getData();
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






