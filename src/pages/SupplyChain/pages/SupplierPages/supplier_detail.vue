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
					<el-form-item label="供应商联系方式：">
						{{data_info.contact_information}}
					</el-form-item>
					<el-form-item label="供应商微信：">
						{{data_info.weixin}}
					</el-form-item>
					<el-form-item label="结算方式：">
						{{data_info.supply_warehousing==1?'月结':'现结'}}
					</el-form-item>
					<el-form-item label="核心供应商：">
						{{data_info.is_core==1?'是':'否'}}
					</el-form-item>
					<el-form-item label="供应商等级：">
						{{data_info.grade_name}}
					</el-form-item>
					<el-form-item label="营业执照：">
						<el-image class="card_img" :src="img_list[0]" fit="contain" :preview-src-list="img_list"></el-image>
					</el-form-item>
				</el-form>
			</div>
			<el-button class="commit_but" size="small" type="primary" @click="backFn">返回</el-button>
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
						this.img_list.push(this.domain + this.data_info.business_license);
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
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		.form_row{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			padding-top: 40rem;
			.card_img{
				width: 160rem;
				height: 160rem;
			}
		}
		.commit_but{
			position: absolute;
			bottom: 40rem;
		}
	}
}
</style>