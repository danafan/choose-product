<template>
	<div class="chain_page_content">
		<el-card class="card_box">
			<div class="form_row">
				<el-form size="small" label-width="120px">
					<el-form-item label="供应商名称：">
						供应商名称
					</el-form-item>
					<el-form-item label="供应商地址：">
						供应商地址
					</el-form-item>
					<el-form-item label="供应商微信：">
						供应商微信
					</el-form-item>
					<el-form-item label="提供拍照：">
						是
					</el-form-item>
					<el-form-item label="提供退货：">
						是
					</el-form-item>
					<el-form-item label="提供换货：">
						是
					</el-form-item>
					<el-form-item label="提供代发：">
						是
					</el-form-item>
					<el-form-item label="提供入仓：">
						是
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="140px">
					<el-form-item label="选择市场：">
						市场
					</el-form-item>
					<el-form-item label="供应商联系方式：">
						供应商联系方式
					</el-form-item>
					<el-form-item label="主营：">
						主营
					</el-form-item>
					<el-form-item label="结算方式：">
						结算方式
					</el-form-item>
					<el-form-item label="供应商营业执照：">
						<el-image class="card_img" :src="image_list[0]" fit="contain" :preview-src-list="image_list"></el-image>
					</el-form-item>
				</el-form>
			</div>
			<el-button class="commit_but" size="small" type="primary" @click="backFn">返回</el-button>
		</el-card>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				image_list:["http://img.92nu.com/DataCenter_202208311330183144.jpg"],	//营业执照
			}
		},
		created(){
			let id = this.$route.query.id;
		},
		methods:{
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