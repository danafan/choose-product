<template>
	<div class="chain_page_content">
		<el-card class="form_card">
			<el-form :inline="true" size="mini">
				<el-form-item class="form_item">
					<el-input clearable v-model="user_name" placeholder="请搜索用户名"></el-input>
				</el-form-item>
				<el-form-item class="form_item">
					<el-button type="primary" @click="checkPage(1)">查询</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card class="card_box" id="card_box">
			<TableTitle title="数据列表" id="table_title">
				<el-button size="mini" type="primary" @click="editFn('1')">添加</el-button>
			</TableTitle>
			<el-table size="mini" :data="data.data" tooltip-effect="dark" style="width: 100%" :header-cell-style="{'background':'#f4f4f4','text-align': 'center'}" :cell-style="{'text-align':'center'}" :max-height="max_height" v-loading="loading">
				<el-table-column prop="" label="序号" align="center" width="50">
					<template slot-scope="scope">
						{{scope.$index+1 + (page-1)*10}}
					</template>
				</el-table-column>
				<el-table-column label="供应商" prop="supplier_name"></el-table-column>
				<el-table-column label="用户名" prop="username"></el-table-column>
				<el-table-column label="是否启用">
					<template slot-scope="scope">
						{{scope.row.status == 1?'是':'否'}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="editFn('2',scope.row.account_id,scope.row.username,scope.row.status)">编辑</el-button>
						<el-button type="text" size="small" @click="deleteFn(scope.row.account_id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<PaginationWidget id="bottom_row" :total="data.total" :page="page" @checkPage="checkPage"/>
		</el-card>
		<!-- 添加或编辑 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close @close="closeDialog" :visible.sync="show_dialog" width="30%">
			<div slot="title" class="dialog_title">
				<div>{{dialog_type == '1'?'添加':'编辑'}}</div>
				<img class="close_icon" src="../../../../static/close_icon.png" @click="show_dialog = false">
			</div>
			<div class="dialog_content">
				<el-form label-position="right" label-width="100px" size="mini">
					<el-form-item class="form_item" label='供应商名称：'>
						<div>{{supplier_name}}</div>
					</el-form-item>
					<el-form-item class="form_item" label='用户名：'>
						<el-input style="width: 200px" :disabled="dialog_type == '2'" v-model="username" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label='登录密码：'>
						<el-input style="width: 200px" v-model="password"  maxlength="20" placeholder="请输入登录密码"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label='确认密码：'>
						<el-input style="width: 200px" v-model="confirm_password"  maxlength="20" placeholder="请输入确认密码"></el-input>
					</el-form-item>
					<el-form-item class="form_item" label='是否启用：'>
						<el-radio-group v-model="status">
							<el-radio :label="1">启用</el-radio>
							<el-radio :label="0">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="mini" @click="show_dialog = false">取消</el-button>
				<el-button size="mini" type="primary" @click="confirmFn">确定</el-button>
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
	.form_card{
		margin-bottom: 16rem;
		.form_item{
			margin-bottom:0 !important;
		}
	}
	.card_box{
		flex:1;
	}
	.dialog_content{
		padding-top: 20px;
	}
}
</style>
<script>
	import resource from '../../../../api/chain_resource.js'

	import TableTitle from '../../components/table_title.vue'
	import PaginationWidget from '../../../../components/pagination_widget.vue'
	export default{
		data(){
			return{
				supplier_name:"",				//供应商名称
				supplier_id:"",					//供应商ID
				loading:false,
				user_name:"",					//用户名
				max_height:0,	
				page:1,
				data:{},						//获取的数据
				button_list:{},
				show_dialog:false,				//弹窗
				dialog_type:'',					//弹窗类型（1:添加；2:编辑）
				account_id:"",					//点击的account_id
				username:"",				//用户名
				password:"",
				confirm_password:"",
				status:1

			}
		},
		created(){
			this.supplier_id = this.$route.query.supplier_id;
			this.supplier_name = this.$route.query.supplier_name;
			//获取供应商账号列表
			this.accountList();
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
    				50 +
    				"px";
    			});
    		},
    		//获取供应商账号列表
    		accountList(){
    			let arg = {
    				search:this.user_name,
    				supplier_id:this.supplier_id,
    				pagesize:10,
    				page:this.page
    			}
    			this.loading = true;
    			resource.accountList(arg).then(res => {
    				if(res.data.code == 1){
    					this.loading = false;
    					this.data = res.data.data;
    					this.button_list =  res.data.data.button_list;
    				}else{
    					this.$message.warning(res.data.msg);
    				}
    			})
    		},
			//切换页码
			checkPage(v){
				this.page = v;
				//获取供应商列表
				this.accountList();
			},
			//关闭弹窗
			closeDialog(){
				this.username = "";
				this.password = "";
				this.confirm_password = "";
				this.status = 1;
			},
			//点击编辑
			editFn(type,account_id,username,status){
				this.dialog_type = type;
				if(type == '2'){		//编辑
					this.username = username;
					this.account_id = account_id;
					this.status = status;
				}
				this.show_dialog = true;
			},
			//添加或编辑确定
			confirmFn(){
				if(this.username == ""){
					this.$message.warning('请输入用户名');
				}else {
					if(this.confirm_password != this.password){
						this.$message.warning('两次密码输入不一致');
						return;
					}
					let arg = {
						username:this.username,
						status:this.status
					}
					if(this.password != '' && this.confirm_password != ''){
						arg.password = this.password;
						arg.confirm_password = this.confirm_password;
					}
					if(this.dialog_type == '1'){	//添加
						arg.supplier_id = this.supplier_id;
						resource.addAccount(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.show_dialog = false;
								//获取供应商账号列表
								this.accountList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{			//编辑
						arg.account_id = this.account_id;
						resource.editAccount(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.show_dialog = false;
								//获取供应商账号列表
								this.accountList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
				}
			},
			//点击删除
			deleteFn(account_id){
				this.$confirm('确认删除该账号?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						account_id:account_id
					}
					resource.delAccount(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							//获取供应商列表
							this.accountList();
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
			PaginationWidget
		}
	}
</script>






