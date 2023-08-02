<template>
	<div class="chain_page_content">
		<el-card class="card_box flex-scroll-y">
			<div class="form_row">
				<el-form style="width: 50%" size="small" label-width="140px">
					<el-form-item label="供应商名称：" required>
						<el-input clearable v-model="supplier_name" style="width: 192px;" placeholder="供应商名称"></el-input>
					</el-form-item>
					<el-form-item label="供应商地址：" required>
						<el-input clearable v-model="address" placeholder="供应商地址" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="主营：" required>
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" clearable v-model="main_business" placeholder="主营" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="提供拍照：">
						<el-radio-group v-model="supply_photograph">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供退货：">
						<el-radio-group v-model="supply_return_goods">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供换货：">
						<el-radio-group v-model="supply_exchange_goods">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供代发：">
						<el-radio-group v-model="supply_replace_send">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供入仓：">
						<el-radio-group v-model="supply_warehousing">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="供应商编码：">
						<el-input clearable v-model="supplier_code" placeholder="供应商编码" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="供应商联系方式：" required>
						<el-input clearable v-model="contact_information" placeholder="供应商联系方式" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人：">
						<el-input clearable v-model="contactor" placeholder="联系人" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="供应商微信：">
						<el-input clearable v-model="weixin" placeholder="供应商微信" style="width: 192px;"></el-input>
					</el-form-item>
				</el-form>
				<el-form style="width: 50%" size="small" label-width="140px">
					<el-form-item label="结算方式："required>
						<el-select v-model="supply_monthly_settlement" clearable placeholder="请选择结算方式">
							<el-option v-for="item in payment_method" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="核心供应商：">
						<el-radio-group v-model="is_core">
							<el-radio :label="0">否</el-radio>
							<el-radio :label="1">是</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="供应商等级：">
						<el-select v-model="grade_id" clearable placeholder="请选择供应商等级">
							<el-option v-for="item in grade_list" :key="item.grade_id" :label="item.grade_name" :value="item.grade_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作模式：">
						<el-input clearable v-model="mode" placeholder="合作模式" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="供应商介绍：">
						<el-input type="textarea" maxlength="500"
						show-word-limit :rows="3" clearable v-model="description" placeholder="供应商介绍" style="width: 260px;"></el-input>
					</el-form-item>
					<el-form-item label="营业执照：">
						<UploadFile v-if="loading" :img_list="business_license" :is_multiple="true" :current_num="business_license.length" :max_num="3" @callbackFn="callbackFn"/>
					</el-form-item>
					<el-form-item label="公司名称：">
						<el-input clearable v-model="company_name" placeholder="公司名称" style="width: 192px;"></el-input>
					</el-form-item>
					<el-form-item label="公司照片：">
						<UploadFile v-if="loading" :img_list="company_img" :is_multiple="true" :current_num="company_img.length" :max_num="6" @callbackFn="companyCallbackFn"/>
					</el-form-item>
					<el-form-item label="供应商维护人：">
						<el-select v-model="maintainer_id" clearable filterable placeholder="全部" @change="changeUser">
							<el-option v-for="item in user_list" :key="item.ding_user_id" :label="item.ding_user_name" :value="item.ding_user_id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="flex jc" style="padding-bottom: 15px;">
				<el-button size="small" type="primary" @click="commitFn">提交</el-button>
			</div>
			
		</el-card>
	</div>
</template>
<script>
	import commonResource from '../../../../api/common_resource.js'
	import resource from '../../../../api/chain_resource.js'

	import UploadFile from '../../../../components/upload_file.vue'
	export default{
		data(){
			return{
				loading:true,
				type:"",				//页面类型（1:添加；2:编辑）
				supplier_id:"",			//供应商id
				supplier_name:"",		//供应商名称
				address:"",				//供应商地址
				main_business:"",		//主营
				supply_photograph:0,	//是否拍照
				supply_return_goods:0,	//是否退货
				supply_exchange_goods:0,//是否换货
				supply_replace_send:0,	//是否代发
				supply_warehousing:0,	//是否入仓
				supplier_code:"",		//供应商编码
				contact_information:"",	//供应商联系方式
				contactor:"",			//联系人
				description:"",			//介绍
				weixin:"",				//供应商微信
				payment_method:[{
					name:'现结',
					id:0
				},{
					name:'月结',
					id:1
				}],						//结算方式
				supply_monthly_settlement:"",//选中的结算方式
				is_core:0,				//核心供应商
				grade_list:[],			//供应商等级列表
				grade_id:"",			//选中的供应商等级
				mode:"",				//合作模式
				business_license:[],	//营业执照图片列表
				company_name:'',		//公司名称
				company_img:[],			//公司图片
				user_list:[],			//所有用户列表
				maintainer_id:"",		//供应商维护人钉钉ID
				maintainer:"",			//供应商维护人姓名
			}
		},
		created(){
			//页面类型
			this.type = this.$route.query.supplier_type;
			if(this.type == '2'){
				this.supplier_id = this.$route.query.supplier_id;
				//获取详情
				this.supplierManagerInfo();
			}
			//获取供应商等级列表
			this.ajaxSupplierGradeList();
			//获取用户列表
			this.getUserList();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods:{
			//获取供应商等级列表
			ajaxSupplierGradeList(){
				commonResource.ajaxSupplierGradeList().then(res => {
					if(res.data.code == 1){
						this.grade_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取用户列表
			getUserList(){
				commonResource.getUserList().then(res => {
					if(res.data.code == 1){
						this.user_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			changeUser(e){
				let maintainer_arr = this.user_list.filter(item => {
					return item.ding_user_id == e
				})
				this.maintainer = maintainer_arr.length > 0?maintainer_arr[0].ding_user_name:"";
			},
			//获取详情
			supplierManagerInfo(){
				let arg = {
					supplier_id:this.supplier_id
				}
				this.loading = false;
				resource.supplierManagerInfo(arg).then(res => {
					if(res.data.code == 1){
						this.loading = true;
						let data = res.data.data;
						this.supplier_name = data.supplier_name;
						this.address = data.address;
						this.contact_information = data.contact_information;
						this.contactor = data.contactor;
						this.description = data.description;
						this.main_business = data.main_business;
						this.supplier_code = data.supplier_code?data.supplier_code:"";
						this.supply_photograph = data.supply_photograph;
						this.supply_return_goods = data.supply_return_goods;
						this.supply_exchange_goods = data.supply_exchange_goods;
						this.supply_replace_send = data.supply_replace_send;
						this.supply_warehousing = data.supply_warehousing;
						this.supply_monthly_settlement = data.supply_monthly_settlement;
						this.company_name = data.company_name;
						this.maintainer = data.maintainer?data.maintainer:'';
						this.maintainer_id = data.maintainer_id?data.maintainer_id:'';
						this.weixin = data.weixin?data.weixin:"";
						this.grade_id = data.grade_id?data.grade_id:'';
						this.mode = data.mode?data.mode:'';

						//工商营业执照
						if(data.business_license){
							this.business_license = data.business_license.split(',');
						}
						
						// business_license.map(item => {
						// 	let img_obj = {
						// 		urls:item,
						// 		show_icon:false
						// 	}
						// 	this.business_license.push(img_obj);
						// })

						//公司照片
						if(data.company_img){
							this.company_img = data.company_img.split(',');
						}
						
						// this.company_img = [];
						// let company_img = data.company_img.split(',');
						// company_img.map(item => {
						// 	let img_obj = {
						// 		urls:item,
						// 		show_icon:false
						// 	}
						// 	this.company_img.push(img_obj);
						// })
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击提交
			commitFn(){
				if(this.supplier_name == ''){
					this.$message.warning('请输入供应商名称');
				}else if(this.address == ''){
					this.$message.warning('请输入供应商地址');
				}else if(this.contact_information == ''){
					this.$message.warning('请输入供应商联系方式');
				}else if(this.supply_monthly_settlement === ''){
					this.$message.warning('请选择结算方式');
				}else if(this.main_business == ''){
					this.$message.warning('请输入主营业务');
				}else{
					var arg = {
						supplier_name:this.supplier_name,
						address:this.address,
						contact_information:this.contact_information,
						contactor:this.contactor,
						description:this.description,
						business_license:this.business_license.join(','),
						company_name:this.company_name,
						company_img:this.company_img.join(','),
						main_business:this.main_business,
						supplier_code:this.supplier_code,
						supply_photograph:this.supply_photograph,
						supply_return_goods:this.supply_return_goods,
						supply_exchange_goods:this.supply_exchange_goods,
						supply_replace_send:this.supply_replace_send,
						supply_warehousing:this.supply_warehousing,
						supply_monthly_settlement:this.supply_monthly_settlement,
						is_core:this.is_core,
						weixin:this.weixin,
						grade_id:this.grade_id,
						mode:this.mode,
						maintainer:this.maintainer,
						maintainer_id:this.maintainer_id
					}
					console.log(arg)
					// return;
					this.$confirm('确认提交?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if(this.type == '1'){		//添加
							resource.addSupplierManager(arg).then(res => {
								if(res.data.code == 1){
									this.$message.success(res.data.msg);
									this.$router.go(-1);
								}else{
									this.$message.warning(res.data.msg);
								}
							})
						}else{	//编辑
							arg.supplier_id = this.supplier_id;
							resource.supplierManagerEdit(arg).then(res => {
								if(res.data.code == 1){
									this.$message.success(res.data.msg);
									this.$router.go(-1);
								}else{
									this.$message.warning(res.data.msg);
								}
							})
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}
			},
			//监听图片列表回调
			callbackFn(img_arr) {
				this.business_license = img_arr;
				// this.business_license = img_arr.length > 0?img_arr[0]:'';
			},
			//监听公司图片列表回调
			companyCallbackFn(img_arr) {
				this.company_img = img_arr;
				// this.company_img = img_arr.length > 0?img_arr[0]:'';
			},
		},
		components:{
			UploadFile
		}
	}
</script>
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
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow-y: scroll;
			.form_row{
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding-top: 40rem;
				padding-bottom: 60rem;
				.view_card_img {
					margin-right: 40rem;
					margin-bottom: 20rem;
					border-radius: 2rem;
					position: relative;
					width: 160rem;
					height: 160rem;
					.card_img,
					.delete_img {
						border-radius: 2rem;
						position: absolute;
						width: 100%;
						height: 100%;
					}
					.delete_img {
						background: rgba(0, 0, 0, 0.4);
						display: flex;
						align-items: center;
						justify-content: center;
						.delete_icon {
							width: 40rem;
							height: 40rem;
						}
					}
				}
			}
		}
	}
</style>