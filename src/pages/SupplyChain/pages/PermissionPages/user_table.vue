<template>
	<div class="setting_content">
		<el-card class="card_box" id="card_box">
			<el-form :inline="true" size="mini">
				<el-form-item>
					<el-input placeholder="搜索姓名" clearable v-model="search">
					</el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column label="姓名" prop="ding_user_name"></el-table-column>
				<el-table-column label="主部门" prop="main_dept_name"></el-table-column>
				<el-table-column label="职位" prop="position"></el-table-column>
				<el-table-column label="角色" prop="menu_role_name"></el-table-column>
				<el-table-column label="创建时间" prop="add_time"></el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="addFn('2',scope.row.user_id)" v-if="button_list.edit == 1">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="data.total" :page="page" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加或编辑 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeDialog" :visible.sync="show_dialog">
			<div slot="title" class="dialog_title">
				<div>{{dialog_title}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form size="small" label-width="120px">
					<el-form-item label="员工：" required>
						<el-select v-model="user_id" filterable clearable placeholder="请选择员工" v-if="type == '1'">
							<el-option v-for="item in user_list" :key="item.user_id" :label="item.real_name" :value="item.user_id">
							</el-option>
						</el-select>
						<div v-else>{{user_name}}</div>
					</el-form-item>
					<el-form-item label="角色：" required>
						<el-select v-model="menu_role_ids" clearable multiple filterable collapse-tags placeholder="请选择角色">
							<el-option v-for="item in role_list" :key="item.menu_role_id" :label="item.menu_role_name" :value="item.menu_role_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="绑定部门：" v-if="menu_role_ids.indexOf(1) == -1">
						<div style="display: flex">
							<el-tree :data="dept_list" ref="tree" node-key="dept_id" :default-checked-keys="dept_ids" :props="props" show-checkbox @check="checkChange"></el-tree>
							<el-checkbox style="margin-left: 8px;position: relative;top:-3px;" :indeterminate="isIndeterminateDept" v-model="checkAllDept" @change="checkAllDeptFn">全选</el-checkbox>
						</div>
					</el-form-item>
					<el-form-item label="绑定店铺：" v-if="menu_role_ids.indexOf(1) == -1">
						<el-select v-model="shop_codes" clearable multiple filterable collapse-tags placeholder="选择店铺" @change="selectedStore">
							<el-option v-for="item in shop_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
							</el-option>
						</el-select>
						<el-checkbox style="margin-left: 8px" :indeterminate="isIndeterminate" v-model="checkAll" @change="checkAllStore">全选</el-checkbox>
					</el-form-item>
					<el-form-item label="是否查看记录：" v-if="menu_role_ids.indexOf(1) == -1">
						<el-radio-group v-model="view_type">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
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
	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'

	import resource from '../../../../api/chain_resource.js'
	import commonResource from '../../../../api/common_resource.js'
	export default{
		data(){
			return{
				search:"",
				loading:false,
				data:{},					//返回数据
				button_list:{},				//按钮权限
				page:1,						//当前页码
				max_height:0,				//表格最大高度
				id:"",						//点击的ID
				show_dialog:false,			//添加或编辑弹窗
				user_list:[],				//所有员工列表
				user_id:"",					//选中的员工
				user_name:"",				//编辑时的员工姓名
				role_list:[],				//所有角色列表
				menu_role_ids:[],			//选中的角色
				props:{
					label: 'dept_name',
					children: 'list'
				},
				dept_list:[],				//所有部门列表
				dept_ids:[],				//选中的部门
				shop_list:[],				//店铺列表
				shop_codes:[],				//选中的店铺列表
				view_type:1,				//是否查看记录
				dialog_title:"",			//弹窗标题
				type:"",					//弹窗类型
				isIndeterminateDept: false,	//当前半全选状态(部门)
				isIndeterminate: false,		//当前半全选状态（店铺）
				checkAllDept: false,			//当前全选状态（部门）
				checkAll: false,			//当前全选状态（店铺）
				arr:[]
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
					search:this.search,
					pagesize:10,
					page:this.page
				}
				this.loading = true;
				resource.getUserList(arg).then(res => {
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
			addFn(type,user_id){
				this.type = type;
				if(type == '1'){	//添加
					this.id = "";
					this.dialog_title = '添加用户';
					//创建get
					this.addUserGet();
				}else{				//编辑
					this.id = user_id;
					this.dialog_title = '编辑用户';
					//编辑get
					this.editUserGet();
				}
			},
			//关闭弹窗
			closeDialog(){
				this.user_id = "";
				this.menu_role_ids = [];
				this.dept_ids = [];
				this.shop_codes = [];
				this.view_type = 1;
			},
			//创建get
			addUserGet(){
				resource.addUserGet().then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.user_list = data.user_list;
						this.role_list = data.role_list;
						this.dept_list = data.dept_list;
						//获取店铺列表
						this.ajaxViewShop(this.dept_ids);
						this.show_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//编辑get
			editUserGet(){
				let arg = {
					user_id:this.id
				}
				resource.editUserGet(arg).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						this.user_name = data.info.ding_user_name;
						this.role_list = data.menu_role_list;
						this.menu_role_ids = data.info.menu_role_ids;
						this.dept_list = data.dept_list;
						this.dept_ids = data.selected_depts;
						this.isIndeterminateDept =
						this.dept_ids.length > 0 &&
						this.dept_ids.length < this.dept_list.length;
						this.checkAllDept = this.dept_ids.length == this.arr.length;
						this.view_type = data.view_type;
						//获取店铺列表
						this.ajaxViewShop(this.dept_ids,data.selected_shops);
						this.show_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击某个部门选项
			checkChange(data, checked) {
				this.dept_ids = checked.checkedKeys;
				this.ajaxViewShop(this.dept_ids);
			},
			//切换选中部门
			ajaxViewShop(dept_ids,selected_shops) {
				this.arr = [];
				this.getDeptIds(this.dept_list);
				this.isIndeterminateDept =
				dept_ids.length > 0 &&
				dept_ids.length < this.arr.length;
				this.checkAllDept = dept_ids.length == this.arr.length;
				let arg = {
					type: 2,
					dept_ids: dept_ids.join(","),
				};
				commonResource.ajaxViewShop(arg).then((res) => {
					if (res.data.code == 1) {
						this.shop_list = res.data.data;
						if (!!selected_shops) {
							this.shop_codes = selected_shops;
							this.isIndeterminate =
							selected_shops.length > 0 &&
							selected_shops.length < this.shop_list.length;
							this.checkAll = selected_shops.length == this.shop_list.length;
						} else {
							this.shop_codes = [];
							this.isIndeterminate = false;
							this.checkAll = false;
						}
					} else {
						this.$message.warning(res.data.msg);
					}
				});
			},
			//切换选中店铺
			selectedStore(selected_shops) {
				this.isIndeterminate =
				selected_shops.length > 0 &&
				selected_shops.length < this.shop_list.length;
				this.checkAll = selected_shops.length == this.shop_list.length;
			},
			//切换是否全选部门
			checkAllDeptFn(val) {
				this.isIndeterminateDept = false;
				if (val) {
					this.dept_ids = this.arr;
				} else {
					this.dept_ids.splice(0,this.dept_ids.length);
					this.arr.map(item => {
						this.$refs.tree.setChecked(item,false);
					})
				}
    			//获取店铺列表
    			this.ajaxViewShop(this.dept_ids);
    		},
    		getDeptIds(list){
    			list.map((item) => {
    				if(item.list){
    					this.arr.push(item.dept_id);
    					this.getDeptIds(item.list)
    				}else{
    					this.arr.push(item.dept_id);
    				}
    			});
    		},
    		//切换是否全选店铺
    		checkAllStore(val) {
    			this.isIndeterminate = false;
    			if (val) {
    				let arr = [];
    				this.shop_list.map((item) => {
    					arr.push(item.shop_code);
    				});
    				this.shop_codes = arr;
    			} else {
    				this.shop_codes = [];
    			}
    		},
			//点击确认
			commitFn(){
				if(this.type == '1' && this.user_id == ''){	
					this.$message.warning('请选择用户!');
					return;
				}
				if(this.menu_role_ids.length == 0){	
					this.$message.warning('请选择角色!');
					return;
				}
				let arg = {
					user_id:this.type == '1'?this.user_id:this.id,
					menu_role_id:this.menu_role_ids.join(','),
					dept_ids:this.menu_role_ids.indexOf(1) == -1?this.dept_ids.join(','):'-1',
					shop_codes:this.menu_role_ids.indexOf(1) == -1?this.shop_codes.join(','):'-1',
					view_type:this.view_type
				}
				if(this.type == '1'){		//添加
					resource.addUserPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_dialog = false;
							//获取列表
							this.getData();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{						//编辑
					resource.editUserPost(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_dialog = false;
							//获取列表
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
	padding-top: 50rem;
	padding-bottom: 20rem;
}
</style>