<template>
	<div class="setting_content">
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column prop="menu_role_name" label="角色名称" align="center"></el-table-column>
				<el-table-column prop="num" label="角色数量" align="center">
				</el-table-column>
				<el-table-column prop="remark" label="角色备注" align="center"></el-table-column>
				<el-table-column prop="create_time" width="160" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="creater" width="160" label="创建人" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="120" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="addFn('2',scope.row.menu_role_id)" v-if="button_list.view == 1">查看</el-button>
						<el-button type="text" size="small" @click="addFn('3',scope.row.menu_role_id)" v-if="button_list.edit == 1 && scope.row.is_disable != 1">编辑</el-button>
						<el-button type="text" size="small" @click="deleteFn(scope.row.menu_role_id)" v-if="button_list.del == 1 && scope.row.is_disable != 1">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="data.total" :page="page" @checkPage="checkPage"/>
		</el-card>
		添加或编辑
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeDialog" :visible.sync="show_dialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_title}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form label-position="left" label-width="86px">
					<el-form-item label="角色名称:" :required="type != '2'">
						<el-input style="width:200px" type="text" placeholder="输入角色名称" size="small" v-model="name" :disabled="type == '2'">
						</el-input>
					</el-form-item>
					<el-form-item label="角色备注:" :required="type != '2'">
						<el-input style="width:220px" type="textarea" :rows="3" placeholder="输入备注..." size="small" v-model="remark"
						:disabled="type == '2'">
					</el-input>
				</el-form-item>
				<el-form-item label="权限配置:">
					<div class="menu_list_box" v-if="type == '2'">
						<div class="menu_item" v-for="(item,index) in menu_list" :key="index">
							<el-tree :data="item" ref="tree" node-key="menu_id" :props="props"></el-tree>
						</div>
					</div>
					<div class="menu_list_box" v-else>
						<div class="menu_item" v-for="(item,index) in menu_list" :key="index">
							<el-tree :data="item" ref="tree" node-key="menu_id" :default-checked-keys="checked_keys" :props="props"
							show-checkbox @check="checkChange"></el-tree>
						</div>
					</div>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="small" @click="show_dialog = false">取消</el-button>
			<el-button type="primary" size="small" @click="commitFn" v-if="type != 2">提交</el-button>
		</div>
	</el-dialog>
</div>
</template>
<script>
	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'

	import resource from '../../../../api/chain_resource.js'
	export default{
		data(){
			return{
				loading:false,
				data:{},					//返回数据
				button_list:{},				//按钮权限
				page:1,						//当前页码
				max_height:0,				//表格最大高度
				id:"",						//点击的ID
				show_dialog:false,			//添加或编辑弹窗
				type:"",					//弹窗类型（1:添加；2:查看；3编辑）
				dialog_title:"",			//弹窗标题
				name: "", //角色名称
      			remark: "", //角色备注
      			menu_list: [], //功能列表（角色用）
      			props: {
      				label: "menu_name",
      				children: "list",
      			},
      			checked_keys: [], //已选中的功能id集合
      		}
      	},
      	created(){
			//获取列表
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
			//获取列表
			getData(){
				let arg = {
					pagesize:10,
					page:this.page
				}
				this.loading = true;
				resource.menuroleList(arg).then(res => {
					if(res.data.code == 1){
						this.loading = false;
						this.data = res.data.data;
						this.button_list = this.data.button_list;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击添加或编辑
			addFn(type,role_id){
				this.type = type;
				if(type == '1'){	//添加
					this.id = "";
					this.dialog_title = '添加角色';
					//创建get
					this.addUserGet();
				}else if(type == '2'){	//查看
					this.id = role_id;
					this.dialog_title = '角色详情';
					//查看
					this.menuRoleInfo();
				}else{				//编辑
					this.id = role_id;
					this.dialog_title = '编辑角色';
					//编辑get
					this.editUserGet();
				}
			},
			//查看
			menuRoleInfo() {
				let arg = {
					role_id: this.id,
				};
				resource.menuRoleInfo(arg).then((res) => {
					if (res.data.code == 1) {
						this.menu_list = res.data.data.list;
          				this.name = res.data.data.menu_role_name; 
          				this.remark = res.data.data.remark; 
          				this.show_dialog = true;
          			} else {
          				this.$message.warning(res.data.msg);
          			}
          		});
			},
			//创建get
			addUserGet(){
				resource.menuRoleAddGet().then(res => {
					if(res.data.code == 1){
						this.menu_list = res.data.data;
						this.show_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//编辑get
			editUserGet(){
				let arg = {
					role_id:this.id
				}
				resource.menuRoleEditGet(arg).then(res => {
					if(res.data.code == 1){
						this.menu_list = res.data.data.menu_list;
						this.checked_keys = res.data.data.selected_ids;
          				this.name = res.data.data.menu_role_name; //角色名称
          				this.remark = res.data.data.remark; //备注
          				this.show_dialog = true;
          			}else{
          				this.$message.warning(res.data.msg);
          			}
          		})
			},
			//监听切换权限内容
			checkChange(data, checked) {
				let tree_list = this.$refs.tree;
				let arr = [];
				tree_list.map((item) => {
					arr = [...arr, ...item.getCheckedKeys()];
				});
				this.checked_keys = arr;
			},
			//关闭弹窗
			closeDialog(){
				this.name = ""; //角色名称
      			this.remark = ""; //角色备注
      			this.checked_keys = [];
			},
			//点击删除
			deleteFn(role_id){
				this.$confirm('确认删除该角色?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						role_id:role_id
					}
					resource.delMenuRole(arg).then(res => {
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
			//点击确认
			commitFn(){
				if (this.name == "") {
					this.$message.warning("请输入角色名称!");
					return;
				} else if (this.name.length > 20) {
					this.$message.warning("角色名称不能超过20个字!");
					return;
				} else if (this.remark == "") {
					this.$message.warning("请输入角色备注!");
					return;
				}
				let arg = {
					name: this.name,
					ids: this.checked_keys.join(","),
					remark: this.remark,
				};
				if (this.type == "1") {  //添加
					resource.menuRoleAddPost(arg).then((res) => {
						if (res.data.code == 1) {
							this.$message.success(res.data.msg);
							//获取列表
							this.getData();
							this.show_dialog = false;
						} else {
							this.$message.warning(res.data.msg);
						}
					});
        		} else if (this.type == "3") {  //编辑
        			arg.role_id = this.id;
        			resource.menuRoleEditPost(arg).then((res) => {
        				if (res.data.code == 1) {
        					this.$message.success(res.data.msg);
        					//获取列表
        					this.getData();
        					this.show_dialog = false;
        				} else {
        					this.$message.warning(res.data.msg);
        				}
        			});
        		}
        	},
			//分页
			checkPage(v){
				this.page = v;
				//获取列表
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
	padding: 30rem;
	.menu_list_box {
		display: flex;
		flex-wrap: wrap;
		.menu_item {
			width: 50%;
		}
	}
}
</style>