<template>
	<div class="chain_page_content">
		<el-card class="card_box">
			<div class="form_row">
				<el-form size="small" label-width="120px">
					<el-form-item label="供应商名称：" required>
						<el-input clearable v-model="supplier_name" placeholder="供应商名称"></el-input>
					</el-form-item>
					<el-form-item label="供应商地址：" required>
						<el-input clearable v-model="supplier_address" placeholder="供应商地址"></el-input>
					</el-form-item>
					<el-form-item label="供应商微信：" required>
						<el-input clearable v-model="supplier_wx" placeholder="供应商微信"></el-input>
					</el-form-item>
					<el-form-item label="提供拍照：" required>
						<el-radio-group v-model="is_camera">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供退货：" required>
						<el-radio-group v-model="is_back">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供换货：" required>
						<el-radio-group v-model="is_replace">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供代发：" required>
						<el-radio-group v-model="is_df">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="提供入仓：" required>
						<el-radio-group v-model="is_levite">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="140px">
					<el-form-item label="选择市场：" required>
						<el-select v-model="market_id" clearable placeholder="请选择市场">
							<el-option v-for="item in market_list" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商联系方式：" required>
						<el-input clearable v-model="supplier_phone" placeholder="供应商联系方式"></el-input>
					</el-form-item>
					<el-form-item label="主营：" required>
						<el-select v-model="business_id" allow-create filterable default-first-option placeholder="请选择主营（可新增）">
							<el-option v-for="item in business_type_list" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结算方式：" required>
						<el-select v-model="payment_id" clearable placeholder="请选择结算方式">
							<el-option v-for="item in payment_method" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="结算方式：" required>
						<UploadFile @callbackFn="callbackFn" v-if="image_url == ''" />
						<div class="view_card_img" @mouseenter="show_icon = true" @mouseleave="show_icon = false" v-else>
							<el-image class="card_img" :src="domain + image_url" fit="contain"></el-image>
							<div class="delete_img" v-if="show_icon == true">
								<img class="delete_icon" src="../../../../static/delete_icon.png" @click="deleteFile(item.urls,index)">
							</div>
						</div>
					</el-form-item>
				</el-form>
			</div>
			<el-button class="commit_but" size="small" type="primary" @click="commitFn">提交</el-button>
		</el-card>
	</div>
</template>
<script>
	import UploadFile from '../../../../components/upload_file.vue'
	export default{
		data(){
			return{
				supplier_name:"",		//供应商名称
				supplier_address:"",	//供应商地址
				supplier_wx:"",			//供应商微信
				is_camera:0,			//是否拍照
				is_back:0,				//是否退货
				is_replace:0,			//是否换货
				is_df:0,				//是否代发
				is_levite:0,			//是否入仓
				market_list:[{
					name:'市场1',
					id:'1'
				},{
					name:'市场2',
					id:'2'
				},{
					name:'市场3',
					id:'3'
				}],						//市场列表
				market_id:"",			//选中的市场
				supplier_phone:"",		//供应商联系方式
				business_type_list:[
				'主营1',
				'主营2',
				'主营3'],						//主营列表
				business_id:"",			//选中的主营
				payment_method:[{
					name:'结算方式1',
					id:'1'
				},{
					name:'结算方式2',
					id:'2'
				},{
					name:'结算方式3',
					id:'3'
				}],						//结算方式
				payment_id:"",			//选中的结算方式
				show_icon:false,		//营业执照删除遮罩
				domain:"",				//图片前缀
				image_url:"",			//图片后缀
			}
		},
		created(){
			let id = this.$route.query.id;
			console.log(id);
		},
		methods:{
			//点击提交
			commitFn(){
				console.log(this.business_id);
			},
			//上传图片回调
			callbackFn(v) {
				console.log(v);
				// v.file.show_icon = false;
				// this.preview_images.push(v.file);
			},
    		//删除文件
    		deleteFile(url, index) {
    			// let arg = {
    			// 	url: url,
    			// };
    			// resource.deleteFile(arg).then((res) => {
    			// 	if (res.data.code == 1) {
    			// 		this.preview_images.splice(index, 1);
    			// 	} else {
    			// 		this.$message.warning(res.data.msg);
    			// 	}
    			// });
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
		.commit_but{
			position: absolute;
			bottom: 40rem;
		}
	}
}
</style>