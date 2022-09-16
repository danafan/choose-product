<template>
	<div class="chain_page_content">
		<el-card class="card_box">
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="款式编码：" required>
						<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="arg.i_id">
						</el-input>
					</el-form-item>
					<el-form-item label="供应商：" required>
						<el-select v-model="arg.supplier_id" clearable placeholder="请选择供应商">
							<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="类目：" required>
						<el-select v-model="arg.category_id" clearable placeholder="请选择类目">
							<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="拍摄风格：" required>
						<el-select v-model="arg.shooting_style_id" clearable placeholder="请选择拍摄风格">
							<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="面料：" required>
						<el-input placeholder="面料" v-model="arg.fabric">
						</el-input>
					</el-form-item>
					<el-form-item label="成本价：" required>
						<el-input type="number" placeholder="成本价" v-model="arg.cost_price">
						</el-input>
					</el-form-item>
					<el-form-item label="颜色：" required>
						<el-input placeholder="颜色" v-model="arg.color">
						</el-input>
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="100px">
					<el-form-item label="商品款号：" required>
						<el-input placeholder="商品款号" v-model="arg.style_id">
						</el-input>
					</el-form-item>
					<el-form-item label="标题：" required>
						<el-input placeholder="标题" v-model="arg.title">
						</el-input>
					</el-form-item>
					<el-form-item label="市场：" required>
						<el-select v-model="arg.market_id" clearable placeholder="请选择市场">
							<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类：" required>
						<el-select v-model="arg.classification_id" clearable placeholder="请选择分类">
							<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作模式：" required>
						<el-input placeholder="合作模式" v-model="arg.mode">
						</el-input>
					</el-form-item>
					<el-form-item label="尺码：" required>
						<el-input placeholder="尺码" v-model="arg.size">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="form_row margin_bottom">
				<el-checkbox v-model="arg.hot_style">爆款</el-checkbox>
				<el-checkbox v-model="arg.sole_style">独家款</el-checkbox>
				<el-checkbox v-model="arg.data_style">主推款</el-checkbox>
				<el-checkbox v-model="arg.again_style">二开款</el-checkbox>
			</div>
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="网盘地址：" required>
						<el-input placeholder="网盘地址" v-model="arg.net_disk_address">
						</el-input>
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="150px">
					<el-form-item label="共享盘地址：" required>
						<el-input placeholder="共享盘地址" v-model="arg.shared_disk_address">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="商品图：">
						<UploadFile :img_list="img_list" :is_multiple="true" :current_num="arg.img.length" :max_num="99" @callbackFn="callbackFn"/>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="arg.remark">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="bottom_row">
				<el-button size="small" type="primary">提交</el-button>
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
				page_type:'',			//页面来源（goods:商品；feekback:反馈）
				goods_type:"",			//类型（1:添加；2:编辑）
				supplier_list:[],		//供应商列表
				cate_list:[],			//类目列表
				market_list:[],			//市场列表
				style_list:[],			//拍摄风格列表
				class_list:[],			//分类列表
				img_list:[],			
				arg:{
					i_id:"",				//款式编码
					style_id:"",			//商品款号
					supplier_id:"",			//选中的供应商
					title:"",				//标题
					category_id:"",			//选中的类目
					market_id:"",			//选中的市场
					shooting_style_id:"",	//选中的拍摄风格
					classification_id:"",	//选中的分类
					fabric:"",				//面料
					mode:"",				//合作模式
					cost_price:"",			//成本价
					size:"",				//尺码
					color:"",				//颜色
					hot_style:0,			//爆款
					sole_style:0,			//独家款
					data_style:0,			//主推款
					again_style:0,			//二开款
					net_disk_address:"",	//网盘地址
					shared_disk_address:"",	//共享盘地址
					img:[],					//图片列表
					remark:"",				//备注
				},									//可传递的参数
			}
		},
		created(){
			//页面来源
			this.page_type = this.$route.query.page_type;
			//类型
			this.goods_type = this.$route.query.goods_type;
			//获取数据列表
			this.getInfoList();
		},
		methods: {
			//获取数据列表
			async getInfoList(){
				//获取供应商列表
				await this.ajaxSupplierList();
				//获取类目列表
				await this.ajaxCateList();
				//市场列表
				await this.ajaxMarketList();
				//拍摄风格列表
				await this.ajaxStyleList();
				//分类列表
				await this.ajaxClassList();
				if(this.goods_type == '2'){	//编辑
					//获取商品详情
					this.getGoodsDetail();
				}
			},
			//获取商品详情
			getGoodsDetail(){
				//商品ID
				this.style_id = this.$route.query.style_id;
				if(this.page_type == 'goods'){	//商品管理

				}else{		//反馈管理
					let arg = {
						style_id:this.style_id
					}
					resource.feedBackEditGoodsGet(arg).then(res => {
						if(res.data.code == 1){
							let data_info = res.data.data;
							data_info.img.map(item => {
								let o = {
									urls:item,
									show_icon:false
								}
								this.img_list.push(o);
							})
							for(let key in this.arg){
								for(let k in data_info){
									if(key == k){
										this.arg[key] = data_info[k];
									}
								}
							}
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//获取供应商列表
			ajaxSupplierList(){
				return new Promise((resolve)=>{
					commonResource.ajaxSupplierList().then(res => {
						if(res.data.code == 1){
							this.supplier_list = res.data.data;
							resolve();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				})
			},
			//获取类目列表
			ajaxCateList(){
				return new Promise((resolve)=>{
					commonResource.ajaxCateList().then(res => {
						if(res.data.code == 1){
							this.cate_list = res.data.data;
							resolve();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				})
			},
			//市场列表
			ajaxMarketList(){
				return new Promise((resolve)=>{
					commonResource.ajaxMarketList().then(res => {
						if(res.data.code == 1){
							this.market_list = res.data.data;
							resolve();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				})
			},
			//拍摄风格列表
			ajaxStyleList(){
				return new Promise((resolve)=>{
					commonResource.ajaxStyleList().then(res => {
						if(res.data.code == 1){
							this.style_list = res.data.data;
							resolve();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				})
			},
			//分类列表
			ajaxClassList(){
				return new Promise((resolve)=>{
					commonResource.ajaxClassList().then(res => {
						if(res.data.code == 1){
							this.class_list = res.data.data;
							resolve();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				})
			},
			//监听图片列表回调
			callbackFn(img_arr) {
				this.img = img_arr;
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
		overflow-y: scroll;
		.form_row{
			width: 1000rem;
			display: flex;
			justify-content: space-between;
		}
		.margin_bottom{
			margin-bottom: 20px;
		}
		// .image_list {
		// 	display: flex;
		// 	flex-wrap: wrap;
		// 	.view_card_img {
		// 		margin-right: 40rem;
		// 		margin-bottom: 20rem;
		// 		border-radius: 2rem;
		// 		position: relative;
		// 		width: 160rem;
		// 		height: 160rem;
		// 		.card_img,
		// 		.delete_img {
		// 			border-radius: 2rem;
		// 			position: absolute;
		// 			width: 100%;
		// 			height: 100%;
		// 		}
		// 		.delete_img {
		// 			background: rgba(0, 0, 0, 0.4);
		// 			display: flex;
		// 			align-items: center;
		// 			justify-content: center;
		// 			.delete_icon {
		// 				width: 40rem;
		// 				height: 40rem;
		// 			}
		// 		}
		// 	}
		// }
		.bottom_row{
			display: flex;
			justify-content: center;
		}
	}
}
</style>