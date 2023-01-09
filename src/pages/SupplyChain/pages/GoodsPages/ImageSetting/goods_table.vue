<template>
	<div class="setting_content">
		<el-card class="card_box" id="card_box">
			<TableTitle :title="`商品编号：${style_name}`" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">上传商品图</el-button>
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="图片">
					<template slot-scope="scope">
						<el-image :z-index="2006" class="image" :src="scope.row.image_list[0]" fit="scale-down" :preview-src-list="scope.row.image_list"></el-image>
					</template>
				</el-table-column>
				<el-table-column label="是否主图">
					<template slot-scope="scope">
						<div>{{scope.row.is_main == 1?'是':'否'}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="addFn('2',scope.row.commodity_id)" v-if="button_list.edit == 1">编辑</el-button>
						<el-button type="text" size="small" @click="deleteFn(scope.row.commodity_id)" v-if="button_list.del == 1">删除</el-button>
						<el-button type="text" size="small" @click="changeMainImg(scope.row.commodity_id)" v-if="scope.row.is_main == 0 && button_list.is_main == 1">设为主图</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加或编辑 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="closeDialog" :visible.sync="show_dialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_title}}</div>
				<img class="close_icon" src="../../../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form size="small" label-width="120px">
					<el-form-item label="款式编码：">
						{{i_id}}
					</el-form-item>
					<el-form-item label="图片：" required>
						<UploadFile :img_list="img_list" :is_multiple="true" :current_num="img.length" :max_num="type == '1'?99:1" @callbackFn="callbackFn"/>
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
<script>
	import resource from '../../../../../api/chain_resource.js'

	import TableTitle from '../../../components/table_title.vue'
	import PaginationWidget from '../../../../../components/pagination_widget.vue'
	import UploadFile from '../../../../../components/upload_file.vue'
	export default{
		data(){
			return{
				loading:false,
				max_height:0,	
				page:1,						//页码
				data:[],					//获取的数据
				i_id:"",
				button_list:{},
				total:0,
				commodity_id:"",
				show_dialog:false,			//弹窗
				type:"",
				dialog_title:"",			//弹窗标题
				img:[],						//已上传的图片列表（参数）
				img_list:[],				//已上传的图片列表（显示）
			}
		},
		props:{
			//商品ID
			style_id:{
				type:String,
				default:""
			},
			//商品编号
			style_name:{
				type:String,
				default:""
			},
		},
		created(){
			//获取列表
			this.upLoadImgList();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
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
    				55 +
    				"px";
    			});
    		},
			//获取商品图列表
			upLoadImgList(){
				let arg = {
					style_id:this.style_id,
					page:this.page,
					pagesize:10
				}
				this.loading = true;
				resource.upLoadImgList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						let data = res.data.data.data;
						data.map(item => {
							let image_list = [];
							image_list.push(this.domain + item.img);
							item.image_list = image_list;
						});
						this.data = data;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
						this.i_id = res.data.data.i_id;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击添加或编辑
			addFn(type,commodity_id){
				this.type = type;
				this.dialog_title = type == '1'?'添加商品图':'编辑商品图';
				if(type == '2'){
					this.commodity_id = commodity_id;
					let arg = {
						commodity_id:commodity_id
					}
					resource.editUploadImgGet(arg).then(res => {
						if(res.data.code == 1){
							let data = res.data.data;
							let img_obj = {
								urls:data.img,
								show_icon:false
							}
							this.img_list.push(img_obj);
							this.img.push(data.img);				
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
				this.show_dialog = true;
			},
			//监听图片列表回调
			callbackFn(img_arr) {
				this.img = img_arr;
			},
			//关闭弹窗
			closeDialog(){
				this.img = [];						//已上传的图片列表（参数）
				this.img_list = [];				//已上传的图片列表（显示）
			},
			//弹窗提交
			commitFn(){
				if(this.img.length == 0){
					this.$message.warning('请上传商品图!');
				}else{
					var arg = {
						img:this.img.join(',')
					}
					if(this.type == '1'){	//添加
						arg.style_id = this.style_id;
						resource.addUploadImg(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.show_dialog = false;
								//获取列表
								this.upLoadImgList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{				//编辑
						arg.commodity_id = this.commodity_id;
						resource.editUploadImgPost(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.show_dialog = false;
								//获取列表
								this.upLoadImgList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}
			},
			//点击删除
			deleteFn(commodity_id){
				this.$confirm('确认删除商品图?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						commodity_id:commodity_id
					}
					resource.delUploadImg(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.upLoadImgList();
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
			//设为主图
			changeMainImg(commodity_id){
				this.$confirm('确认删除商品图?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						commodity_id:commodity_id,
						style_id:this.style_id
					}
					resource.changeMainImg(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取列表
							this.upLoadImgList();
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
			//分页
			checkPage(v){
				this.page = v;
				//获取分类列表
				this.upLoadImgList();
			}
		},
		components:{
			TableTitle,
			PaginationWidget,
			UploadFile
		}
	}
</script>
<style lang="less" scoped>
.setting_content{
	flex:1;
	position: relative;
	.card_box{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.image{
			width: 188rem;
			height: 88rem;
		}
	}
}
.dialog_content{
	padding-top: 50rem;
	padding-bottom: 20rem;
}
</style>