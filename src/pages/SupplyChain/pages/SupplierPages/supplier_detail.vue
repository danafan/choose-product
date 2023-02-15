<template>
	<div class="chain_page_content">
		<el-card class="card_box">
			<div class="form_row">
				<el-form size="small" label-width="120px">
					<el-form-item label="供应商名称：">
						{{data_info.supplier_name}}
					</el-form-item>
					<el-form-item label="供应商地址：">
						{{data_info.address}}
					</el-form-item>
					<el-form-item label="主营：">
						{{data_info.main_business}}
					</el-form-item>
					<el-form-item label="提供拍照：">
						{{data_info.supply_photograph==1?'是':'否'}}
					</el-form-item>
					<el-form-item label="提供退货：">
						{{data_info.supply_return_goods==1?'是':'否'}}
					</el-form-item>
					<el-form-item label="提供换货：">
						{{data_info.supply_exchange_goods==1?'是':'否'}}
					</el-form-item>
					<el-form-item label="提供代发：">
						{{data_info.supply_replace_send==1?'是':'否'}}
					</el-form-item>
					<el-form-item label="提供入仓：">
						{{data_info.supply_warehousing==1?'是':'否'}}
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="140px">
					<el-form-item label="供应商编码：">
						{{data_info.supplier_code}}
					</el-form-item>
					<el-form-item label="供应商联系方式：">
						{{data_info.contact_information}}
					</el-form-item>
					<el-form-item label="联系人：">
						{{data_info.contactor}}
					</el-form-item>
					<el-form-item label="供应商微信：">
						{{data_info.weixin}}
					</el-form-item>
					<el-form-item label="结算方式：">
						{{data_info.supply_monthly_settlement==1?'月结':'现结'}}
					</el-form-item>
					<el-form-item label="核心供应商：">
						{{data_info.is_core==1?'是':'否'}}
					</el-form-item>
					<el-form-item label="供应商等级：">
						{{data_info.grade_name}}
					</el-form-item>
					<el-form-item label="供应商介绍：">
						{{data_info.description}}
					</el-form-item>
					<el-form-item label="营业执照：">
						<el-image class="card_img" :src="img_list[0]" fit="scale-down" :preview-src-list="img_list" v-if="img_list.length > 0"></el-image>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>
<script>
	import resource from '../../../../api/chain_resource.js'
	export default{
		data(){
			return{
				data_info:{},		//详情
				img_list:[],		//营业执照
			}
		},
		created(){
			//获取详情
			this.supplierManagerInfo()
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods:{
			//获取详情
			supplierManagerInfo(){
				let arg = {
					supplier_id:this.$route.query.supplier_id
				}
				resource.supplierManagerInfo(arg).then(res => {
					if(res.data.code == 1){
						this.data_info = res.data.data;
						if(this.data_info.business_license){
							this.img_list.push(this.domain + this.data_info.business_license);
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击返回
			backFn(){
				this.$router.go(-1);
			},
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
		flex:1;
		.form_row{
			display: flex;
			justify-content: space-evenly;
			padding-top: 40rem;
			.card_img{
				width: 160rem;
				height: 160rem;
			}
		}
	}
}
</style>