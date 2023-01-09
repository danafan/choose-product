<template>
	<div class="setting_content">
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="所属类目" prop="category_name"></el-table-column>
				<el-table-column label="分类名称" prop="classification_name"></el-table-column>
				<el-table-column label="创建人" prop="add_user_name"></el-table-column>
				<el-table-column label="创建时间" prop="add_time"></el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="addFn('2',scope.row.classification_id)" v-if="button_list.edit == 1">编辑</el-button>
						<el-button type="text" size="small" @click="deleteFn(scope.row.classification_id)" v-if="button_list.del == 1">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="total" :page="page" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加或编辑 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeDialog" :visible.sync="show_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div>{{dialog_title}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form size="small" label-width="100px">
					<el-form-item label="所属类目：" required>
						<el-select v-model="category_id" clearable placeholder="请选择所属类目">
							<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类名称：" required>
						<el-input type="textarea" style="width: 220px" autosize placeholder="请输入分类名称（多个请换行）" v-model="name">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="show_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="commitFn">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'

	import resource from '../../../../api/chain_resource.js'
	import commonResource from '../../../../api/common_resource.js'
	export default{
		data(){
			return{
				loading:false,
				data:[],					//返回数据
				button_list:{},
				total:0,
				page:1,						//当前页码
				max_height:0,				//表格最大高度
				id:"",						//点击的ID
				show_dialog:false,			//添加或编辑弹窗
				dialog_title:"",			//弹窗标题
				type:"",					//弹窗类型
				cate_list:[],				//所有类目列表
				category_id:"",				//选中的类目ID
				name:"",					//输入的分类名称
			}
		},
		created(){
			//获取分类列表
			this.getData();
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
			//获取分类列表
			getData(){
				let arg = {
					pagesize:10,
					page:this.page
				}
				this.loading = true;
				resource.getClassList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.data = res.data.data.data;
						this.button_list = res.data.data.button_list;
						this.total = res.data.data.total;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击删除
			deleteFn(id){
				this.$confirm('确认删除该分类?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						id:id
					}
					resource.deleteClass(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取分类列表
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
			//点击添加或编辑
			addFn(type,id){
				this.type = type;
				if(type == '1'){
					this.dialog_title = '添加分类';
				}else{
					this.dialog_title = '编辑分类';
					this.id = id;
				}
				this.show_dialog = true;
				//获取所有类目列表
				this.ajaxCateList();
			},
			//关闭弹窗
			closeDialog(){
				this.category_id = "";
				this.name = "";
			},
			//获取所有类目列表
			ajaxCateList(){
				commonResource.ajaxCateList().then(res => {
					if(res.data.code == 1){
						this.cate_list = res.data.data;
						if(this.type == '2'){
							//获取分类详情
							this.getClassInfo();
						}else{	//创建的时候默认是男装
							let man_arr = this.cate_list.filter(item => {
								return item.category_name === '男装';
							})
							this.category_id = man_arr[0].category_id;
						}

					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取分类详情
			getClassInfo(){
				let arg = {
					id:this.id
				}
				resource.getClassInfo(arg).then(res => {
					if(res.data.code == 1){
						this.category_id = res.data.data.category_id;
						this.name = res.data.data.classification_name;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击确认
			commitFn(){
				if(this.category_id == ''){	
					this.$message.warning('请选择所属类目!');
					return;
				}
				if(this.name == ''){	
					this.$message.warning('请输入分类!');
					return;
				}
				let arg = {
					category_id:this.category_id,
					name:""
				}
				if (this.name.indexOf("\n") > -1) {
					arg.name = this.name.replaceAll("\n", ",");
				} else {
					arg.name = this.name;
				}
				if(this.type == '1'){		//添加分类
					resource.addClass(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_dialog = false;
							//获取分类列表
							this.getData();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{						//编辑分类
					arg.id = this.id;
					resource.editClass(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_dialog = false;
							//获取分类列表
							this.getData();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//分页
			checkPage(v){
				this.page = v;
				//获取分类列表
				this.getData();
			}
		},
		components:{
			TableTitle,
			PaginationWidget
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
	}
}
.dialog_content{
	padding-top: 50rem;
	padding-bottom: 20rem;
}
</style>