<template>
	<div class="chain_page_content">
		<el-card class="card_box">
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="款式编码：">
						<el-input type="textarea" autosize :placeholder="is_detail?'':'多个请用分号间隔'" v-model="arg.i_id" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="供应商：" required>
						<el-select v-model="arg.supplier_id" clearable placeholder="请选择供应商" :disabled="is_detail">
							<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="类目：" required>
						<el-select v-model="arg.category_id" clearable placeholder="请选择类目" :disabled="is_detail">
							<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="拍摄风格：" required>
						<el-select v-model="arg.shooting_style_id" clearable placeholder="请选择拍摄风格" :disabled="is_detail">
							<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="面料：" required>
						<el-input placeholder="面料" v-model="arg.fabric" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="成本价：" required>
						<el-input type="number" placeholder="成本价" v-model="arg.cost_price" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="颜色：" required>
						<el-input placeholder="颜色" v-model="arg.color" :disabled="is_detail">
						</el-input>
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="100px">
					<el-form-item label="商品款号：" required>
						<el-input placeholder="商品款号" v-model="arg.style_name" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="标题：" required>
						<el-input placeholder="标题" v-model="arg.title" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="市场：" required>
						<el-select v-model="arg.market_id" clearable placeholder="请选择市场" :disabled="is_detail">
							<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类：" required>
						<el-select v-model="arg.classification_id" clearable placeholder="请选择分类" :disabled="is_detail">
							<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作模式：">
						<el-input :placeholder="is_detail?'':'合作模式'" v-model="arg.mode" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="尺码：" required>
						<el-input placeholder="尺码" v-model="arg.size" :disabled="is_detail">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="form_row margin_bottom">
				<el-checkbox v-model="arg.hot_style" :true-label="1" :false-label="0" :disabled="is_detail">爆款</el-checkbox>
				<el-checkbox v-model="arg.sole_style" :true-label="1" :false-label="0" :disabled="is_detail">独家款</el-checkbox>
				<el-checkbox v-model="arg.data_style" :true-label="1" :false-label="0" :disabled="is_detail">主推款</el-checkbox>
				<el-checkbox v-model="arg.again_style" :true-label="1" :false-label="0" :disabled="is_detail">二开款</el-checkbox>
			</div>
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="网盘地址：">
						<el-input :placeholder="is_detail?'':'网盘地址'" v-model="arg.net_disk_address" :disabled="is_detail">
						</el-input>
					</el-form-item>
				</el-form>
				<el-form size="small" label-width="150px">
					<el-form-item label="共享盘地址：">
						<el-input :placeholder="is_detail?'':'共享盘地址'" v-model="arg.shared_disk_address" :disabled="is_detail">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="商品图：">
						<div v-if="is_detail">
							<el-image class="card_img" v-for="item in preview_image" :src="item" fit="scale-down" :preview-src-list="preview_image"></el-image>
						</div>
						<UploadFile :img_list="img_list" :is_multiple="true" :current_num="arg.img.length" :max_num="99" @callbackFn="callbackFn" v-else/>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input type="textarea" :rows="5" :placeholder="is_detail?'':'请输入备注'" v-model="arg.remark" :disabled="is_detail">
						</el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="bottom_row" v-if="goods_type == '1' || goods_type == '2' || goods_type == '5'">
				<el-button size="small" type="primary" @click="commitEditGoods">提交</el-button>
			</div>
			<div class="bottom_row" v-if="goods_type == '4'">
				<el-button size="small" type="primary" @click="auditFn('1')">同意</el-button>
				<el-button size="small" type="primary" @click="auditFn('2')">拒绝</el-button>
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
				is_detail:false,		//是否是详情
				page_type:'',			//页面来源（goods:商品；feekback:反馈）
				goods_type:"",			//类型（1:添加；2:编辑；3:查看；4:审核；5：重新提交）
				supplier_list:[],		//供应商列表
				cate_list:[],			//类目列表
				market_list:[],			//市场列表
				style_list:[],			//拍摄风格列表
				class_list:[],			//分类列表
				preview_image:[],		//查看详情的图片列表
				img_list:[],			
				style_id:"",			//商品ID
				arg:{
					i_id:"",				//款式编码
					style_name:"",			//商品款号
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
			this.is_detail = this.$route.query.goods_type == '3' || this.$route.query.goods_type == '4'?true:false;
			//页面来源
			this.page_type = this.$route.query.page_type;
			//类型
			this.goods_type = this.$route.query.goods_type;
			//获取数据列表
			this.getInfoList();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
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
				if(this.goods_type == '2' || this.goods_type == '3' || this.goods_type == '4' || this.goods_type == '5'){	//2:编辑;3:详情；4:审核；5:重新提交
					//获取商品详情
					this.getGoodsDetail();
				}
			},
			//获取商品详情
			getGoodsDetail(){
				//商品ID
				this.style_id = this.$route.query.style_id;
				var arg = {
					style_id:this.style_id
				}
				if(this.page_type == 'goods'){	//商品管理
					resource.editGoodsGet(arg).then(res => {
						if(res.data.code == 1){
							let data_info = res.data.data;
							data_info.img.map(item => {
								let img_obj = {
									urls:item,
									show_icon:false
								}
								this.img_list.push(img_obj);
								this.preview_image.push(this.domain + item);
							})
							for(let key in this.arg){
								for(let k in data_info){
									if(key == k){
										//款式编码逗号转分号
										if(k == 'i_id' && data_info[k].indexOf(',') > -1){
											data_info[k] = data_info[k].replaceAll(",", ";");
										}
										this.arg[key] = data_info[k];
									}
								}
							}
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{		//反馈管理
					resource.feedBackEditGoodsGet(arg).then(res => {
						if(res.data.code == 1){
							let data_info = res.data.data;
							data_info.img.map(item => {
								let img_obj = {
									urls:item,
									show_icon:false
								}
								this.img_list.push(img_obj);
							})
							for(let key in this.arg){
								for(let k in data_info){
									if(key == k){
										//款式编码逗号转分号
										if(k == 'i_id' && data_info[k].indexOf(',') > -1){
											data_info[k] = data_info[k].replaceAll(",", ";");
										}
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
				this.arg.img = img_arr;
			},
			//底部提交
			commitEditGoods(){
				if(!this.arg.style_name){
					this.$message.warning('请输入商品款号!');
				}else if(!this.arg.supplier_id){
					this.$message.warning('请选择供应商!');
				}else if(!this.arg.title){
					this.$message.warning('请输入标题!');
				}else if(!this.arg.category_id){
					this.$message.warning('请选择类目!');
				}else if(!this.arg.market_id){
					this.$message.warning('请选择市场!');
				}else if(!this.arg.shooting_style_id){
					this.$message.warning('请选择拍摄风格!');
				}else if(!this.arg.classification_id){
					this.$message.warning('请选择分类!');
				}else if(!this.arg.fabric){
					this.$message.warning('请输入面料!');
				}else if(!this.arg.cost_price){
					this.$message.warning('请输入成本价!');
				}else if(!this.arg.size){
					this.$message.warning('请输入尺码!');
				}else if(!this.arg.color){
					this.$message.warning('请输入颜色!');
				}else{
					var arg = this.goods_type == '1'?this.arg:{...this.arg,...{style_id:this.style_id}};
					if (arg.i_id.indexOf(";") > -1) {
						arg.i_id = arg.i_id.replaceAll(";", ",");
					}
					if(this.goods_type == '1'){	//添加
						resource.addGoods(arg).then(res => {
							if(res.data.code == 1){
								this.$message.success(res.data.msg);
								this.$router.go(-1);
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}else{			//编辑或重新提交
						if(this.page_type == 'goods'){	//商品管理
							if(this.goods_type == '5'){
								arg.type = 1;
							}
							resource.editGoodsPost(arg).then(res => {
								if(res.data.code == 1){
									this.$message.success(res.data.msg);
									this.$router.go(-1);
								}else{
									this.$message.warning(res.data.msg);
								}
							})
						}else{		//反馈管理
							resource.feedBackEditGoodsPost(arg).then(res => {
								if(res.data.code == 1){
									this.$message.success(res.data.msg);
									this.$router.go(-1);
								}else{
									this.$message.warning(res.data.msg);
								}
							})
						}
					}
				}
			},
			//审批
			auditFn(type){
				this.$confirm(`确认${type == '1'?'同意':'拒绝'}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arg = {
						type:type,
						id:this.style_id
					}
					resource.auditGoods(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.$router.go(-1);
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
			.card_img{
				margin-right: 40rem;
				margin-bottom: 20rem;
				border-radius: 2rem;
				width: 160rem;
				height: 160rem;
			}
		}
		.margin_bottom{
			margin-bottom: 20px;
		}
		.bottom_row{
			display: flex;
			justify-content: center;
		}
	}
}
</style>