<template>
	<div class="setting_content">
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="addFn('1')" v-if="button_list.add == 1">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column prop="access_name" label="名称" align="center"></el-table-column>
				<el-table-column prop="menu_name" label="所属分组" align="center"></el-table-column>
				<el-table-column prop="access_codes" label="权限码" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right">
					<template slot-scope="scope">
						<el-button class="button_theme" type="text" size="small" @click="addFn('2',scope.row.id)"
						v-if="button_list.edit == 1">编辑</el-button>
						<el-button class="button_theme" type="text" size="small" @click="accessDel(scope.row.id)" v-if="button_list.del == 1">删除
						</el-button>
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
				<el-form size="small" label-width="150px">
					<el-form-item label="权限资源名称：">
						<el-input v-model="access_name" style="width:192px" placeholder="请输入权限资源名称"></el-input>
					</el-form-item>
					<el-form-item label="所属菜单：">
						<el-cascader v-model="menu_id" :show-all-levels="false" :options="menu_list" :props="props" @change="changeMenu">
						</el-cascader>
					</el-form-item>
					<el-form-item label="添加权限码：">
						<el-select v-model="selController" placeholder="请选择">
							<el-option v-for="item in controller" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
						<el-select v-model="selMethod" placeholder="请选择">
							<el-option v-for="item in methodList" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
						<el-button style="margin-left: 20px" type="success" icon="el-icon-plus" circle @click="addAccessCode"></el-button>
						<div style="margin-top: 10px;">
							<el-tag style="margin-right: 20px;margin-bottom: 10px" closable v-for="(item,index) in accessCodes" :key="index"
							type="success" effect="dark" @close="handleClose(index)"> {{ item }}
						</el-tag>
					</div>
				</el-form-item>
				<el-form-item label="是否按钮：">
					<el-switch v-model="is_button" :active-value="1" :inactive-value="0" active-color="#F37605" inactive-color="#778899">
					</el-switch>
				</el-form-item>
				<el-form-item label="按钮名称：" v-if="is_button == 1">
					<el-input v-model="button_name" style='width: 300px;' placeholder="请输入按钮名称"></el-input>
				</el-form-item>
				<el-form-item label="选择按钮：" v-if="is_button == 0">
					<el-checkbox-group v-model="button_access_ids">
						<el-checkbox :label="item.id" :key="item.id" border v-for="item in access_buts">{{item.access_name}}</el-checkbox>
					</el-checkbox-group>
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
				access_name: "", //权限资源名称
			    menu_list: [], //所属菜单列表
			    props: {
			    	expandTrigger: "hover",
			    	emitPath: false,
			    	label: "menu_name",
			    	value: "menu_id",
			    	children: "list",
			    },
			    menu_id: "", //选中的菜单ID
			    controller: [], //所有控制器列表
			    selController: "", //当前选择的控制器名称
			    methodList: [], //控制器下所有方法
			    selMethod: "", //当前选择的方法名称
			    accessCodes: [], //选中的所有权限码列表
			    is_button: 0, //是否按钮
			    button_name: "", //按钮名称
			    access_buts: [], //权限按钮列表
			    button_access_ids: [], //选中的权限按钮列表
			}
		},
		created(){
			//获取列表
			this.getData();
		},
		watch: {
			selController: function (n, o) {
				if (n != o && n != "") {
        			//获取所有控制器列表
        			this.getMethod();
        			this.selMethod = "";
        		}
        	},
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
				resource.accessList(arg).then(res => {
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
			addFn(type,id){
				this.type = type;
				//获取所有菜单列表
				this.getMenu();
      			//获取所有控制器列表
      			this.getControllers();
				if(type == '1'){	//添加
					this.id = "";
					this.dialog_title = '添加权限';
				}else{	//编辑
					this.id = id;
					this.dialog_title = '编辑权限';
					//获取权限详情
					this.accessInfo();
				}
				this.show_dialog = true;
			},
			//获取所有菜单列表
			getMenu() {
				resource.getMainMenus().then((res) => {
					if (res.data.code == 1) {
						this.menu_list = res.data.data.menu_list;
					} else {
						this.$message.warning(res.data.msg);
					}
				});
			},
			//获取权限详情
			accessInfo() {
				let arg = {
					id: this.id,
				};
				resource.accessInfo(arg).then((res) => {
					if (res.data.code == 1) {
						let data = res.data.data;
						this.access_name = data.access_name;
						this.menu_id = data.menu_id;
						this.accessCodes = data.access_codes;
          				this.selController = ""; //当前选择的控制器名称
         			 	this.selMethod = ""; //当前选择的方法名称
          				this.is_button = data.is_button; //是否按钮
          				this.button_name = data.button_name;
          				let strArr = data.button_access_ids.split(",");
          				let intArr = strArr.map((item) => {
          					return +item;
          				});
          				//选择按钮的列表
          				this.changeMenu(this.menu_id, intArr);
          			} else {
          				this.$mesage.warning(res.data.msg);
          			}
          		});
			},
    		//获取所有控制器列表
    		getControllers() {
    			resource.getControllers().then((res) => {
    				if (res.data.code == 1) {
    					this.controller = res.data.data;
    				} else {
    					this.$message.warning(res.data.msg);
    				}
    			});
    		},
    		//获取所有控制器下面的方法列表
    		getMethod() {
    			let arg = {
    				controller_name: this.selController,
    			};
    			resource.getMethods(arg).then((res) => {
    				if (res.data.code == 1) {
    					this.methodList = res.data.data;
    				} else {
    					this.$message.warning(res.data.msg);
    				}
    			});
    		},
    		//点击弹框的添加权限码
    		addAccessCode() {
    			if (this.selController == "" || this.selMethod == "") {
    				this.$message.warning("请完善当前权限码");
    			} else {
    				let str = this.selController + "/" + this.selMethod;
    				for (var i = 0; i < this.accessCodes.length; i++) {
    					if (this.accessCodes[i] == str) {
    						this.$message.warning("已存在该权限码");
    						return;
    					}
    				}
    				this.accessCodes.push(str);
    			}
    		},
    		//点击某一个关闭
    		handleClose(index) {
    			this.accessCodes.splice(index, 1);
    		},
    		//选择按钮的列表
    		changeMenu(menu_id, button_access_ids) {
    			let arg = {
    				menu_id: menu_id,
    			};
    			resource.ajaxAccess(arg).then((res) => {
    				if (res.data.code == 1) {
    					this.access_buts = res.data.data;
    					if (button_access_ids) {
    						this.button_access_ids = button_access_ids;
    					}
    				} else {
    					this.$message.warning(res.data.msg);
    				}
    			});
    		},
			//关闭弹窗
			closeDialog(){
				this.access_name = "";
				this.menu_id = "";
      			this.is_button = 0; //是否按钮
      			this.button_name = "";
      			this.selController = ""; //当前选择的控制器名称
      			this.selMethod = ""; //当前选择的方法名称
      			this.accessCodes = [];
      			this.button_access_ids = [];
      		},
      		//点击删除
      		accessDel(id) {
      			this.$confirm("确认删除该权限?", "提示", {
      				confirmButtonText: "确定",
      				cancelButtonText: "取消",
      				type: "warning",
      			})
      			.then(() => {
      				resource.accessDel({ id: id }).then((res) => {
      					if (res.data.code == 1) {
      						this.$message.success(res.data.msg);
              				//获取列表
              				this.getData();
              			} else {
              				this.$message.warning(res.data.msg);
              			}
              		});
      			})
      			.catch(() => {
      				this.$message({
      					type: "info",
      					message: "取消",
      				});
      			});
      		},
			//点击确认
			commitFn(){
				if (this.access_name == "") {
					this.$message.warning("请输入权限资源名称");
				} else if (this.menu_id == "") {
					this.$message.warning("请选择所属菜单");
				} else if (this.is_button == 1 && this.button_name == "") {
					this.$message.warning("请输入按钮名称");
				} else {
					if (this.accessCodes.length == 0) {
						if (this.selController == "" || this.selMethod == "") {
							this.$message.warning("请选择权限码");
							return;
						} else {
							let str = this.selController + "/" + this.selMethod;
							this.accessCodes.push(str);
						}
					}
					let arg = {
						access_name: this.access_name,
						menu_id: this.menu_id,
						access_codes: JSON.stringify(this.accessCodes),
						is_button: this.is_button,
						button_name: this.button_name,
						button_access_ids: this.button_access_ids.join(","),
					};
					if (this.type == "1") {
          				//添加
          				resource.accessAdd(arg).then((res) => {
          					if (res.data.code == 1) {
          						this.$message.success(res.data.msg);
          						this.show_dialog = false;
              					//获取列表
              					this.getData();
              				} else {
              					this.$message.warning(res.data.msg);
              				}
              			});
          			} else {
          				arg.id = this.id;
          				resource.accessEdit(arg).then((res) => {
          					if (res.data.code == 1) {
          						this.$message.success(res.data.msg);
          						this.show_dialog = false;
              					//获取列表
              					this.getData();
              				} else {
              					this.$message.warning(res.data.msg);
              				}
              			});
          			}
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