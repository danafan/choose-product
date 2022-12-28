<template>
	<div class="chain_page_content">
		<el-card class="card_box" id="card_box">
			<TableTitle :title="table_title" id="title_box">
				<GoBack/>
			</TableTitle>
			<div class="scroll_box" :style="{height:max_height}">
				<div class="form_row">
					<el-form size="small" label-width="100px" style="width:60%">
						<el-form-item label="提交人：" v-if="is_detail">
							<div>{{arg.add_admin_name}}</div>
						</el-form-item>
						<el-form-item label="款式编码：">
							<el-input type="textarea" autosize :placeholder="is_detail?'':'多个请用分号间隔'" v-model="arg.i_id" :disabled="is_detail">
							</el-input>
						</el-form-item>
						<el-form-item label="类目：" required>
							<el-select v-model="arg.category_id" clearable placeholder="请选择类目" :disabled="is_detail">
								<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="拍摄风格：">
						<el-select v-model="shooting_style_ids" multiple filterable clearable placeholder="请选择拍摄风格" :disabled="is_detail">
							<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
							</el-option>
						</el-select>
					</el-form-item>
						<el-form-item label="面料：" required>
							<el-input placeholder="面料" v-model="arg.fabric" :disabled="is_detail">
							</el-input>
						</el-form-item>
						<el-form-item label="成本价：" required>
							<el-input type="number" v-model="arg.cost_price" :disabled="is_detail">
							</el-input>
						</el-form-item>
						<el-form-item label="颜色：" required>
							<el-input placeholder="颜色" v-model="arg.color" :disabled="is_detail">
							</el-input>
						</el-form-item>
					</el-form>
					<el-form size="small" label-width="100px">
						<el-form-item label="商品款号：" required>
							<el-input placeholder="商品款号" style="width:190px" v-model="arg.style_name" :disabled="is_detail">
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
						<el-form-item label="合作模式：" required>
							<el-input :placeholder="is_detail?'':'合作模式'" style="width:190px" v-model="arg.mode" :disabled="is_detail">
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
			</div>
		</el-card>
	</div>
</template>
<script>
	import commonResource from '../../api/common_resource.js'
	import resource from '../../api/supplier_resource.js'

	import UploadFile from '../../components/upload_file.vue'
	import GoBack from '../../components/go_back.vue'
	import TableTitle from '../SupplyChain/components/table_title.vue'
	export default{
		data(){
			return{
				table_title:"",			//顶部标题
				is_detail:false,		//是否是详情
				goods_type:"",			//类型（1:添加；2:编辑；3:查看；5：重新提交）
				cate_list:[],			//类目列表
				market_list:[],			//市场列表
				style_list:[],			//拍摄风格列表
				class_list:[],			//分类列表
				preview_image:[],		//查看详情的图片列表
				img_list:[],			
				style_id:"",			//商品ID
				max_height:0,
				arg:{
					i_id:"",				//款式编码
					add_admin_name:"",
					style_name:"",			//商品款号
					title:"",				//标题
					category_id:"",			//选中的类目
					market_id:"",			//选中的市场
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
					img:[],					//图片列表
					remark:"",				//备注
				},								//可传递的参数
				shooting_style_ids:[],		//已选中的拍摄风格
			}
		},
		created(){
			//商品ID
			this.style_id = this.$route.query.style_id;
			this.is_detail = this.$route.query.goods_type == '3'?true:false;
			//类型
			this.goods_type = this.$route.query.goods_type;
			switch(this.goods_type){
				case '1': // 添加
				this.table_title = "添加商品";
				break;
				case '2': // 编辑
				this.table_title = "编辑商品";
				break;
				case '3': // 商品详情
				this.table_title = "商品详情";
				break;
				case '5': // 重新提交
				this.table_title = "重新提交";
				break;
			}
			//获取数据列表
			this.getInfoList();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
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
					let title_height = document.getElementById("title_box").offsetHeight;
					this.max_height =
					card_box_height -
					title_height -
					50 +
					"px";
				});
			},
			//获取数据列表
			async getInfoList(){
				//获取类目列表
				await this.ajaxCateList();
				//市场列表
				await this.ajaxMarketList();
				//拍摄风格列表
				await this.ajaxStyleList();
				//分类列表
				await this.ajaxClassList();
				if(this.goods_type == '2' || this.goods_type == '3' || this.goods_type == '5'){	//2:编辑;3:详情；5:重新提交
					//获取商品详情
					this.getGoodsDetail();
				}
			},
			//获取商品详情
			getGoodsDetail(){
				var arg = {
					style_id:this.style_id
				}
				if(this.goods_type == '3'){	//查看
					resource.getOnepro(arg).then(res => {
						if(res.data.code == 1){
							let data_info = res.data.data;
							//处理详情
							this.setInfo(data_info);
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else if(this.goods_type == '5'){	//重新提交
					resource.returnEditGoodsGet(arg).then(res => {
						if(res.data.code == 1){
							let data_info = res.data.data;
							//处理详情
							this.setInfo(data_info);
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{
					resource.editProductStyleGet(arg).then(res => {
						if(res.data.code == 1){
							let data_info = res.data.data;
							//处理详情
							this.setInfo(data_info);
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}

			},
			//处理详情
			setInfo(data_info){
				data_info.img.map(item => {
					let img_obj = {
						urls:item,
						show_icon:false
					}
					this.img_list.push(img_obj);
					this.preview_image.push(this.domain + item);
				})
				if(data_info.shooting_style_id != ''){
					let shooting_style_ids = data_info.shooting_style_id.split(',');
					this.shooting_style_ids = shooting_style_ids.map(item => {
						return parseInt(item);
					})
				}
				for(let key in this.arg){
					for(let k in data_info){
						if(key == k){
							this.arg[key] = data_info[k];
						}
					}
				}
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
				}else if(!this.arg.title){
					this.$message.warning('请输入标题!');
				}else if(!this.arg.category_id){
					this.$message.warning('请选择类目!');
				}else if(!this.arg.market_id){
					this.$message.warning('请选择市场!');
				}else if(!this.arg.mode){
					this.$message.warning('请填写合作模式!');
				}else if(!this.arg.classification_id){
					this.$message.warning('请选择分类!');
				}else if(!this.arg.fabric){
					this.$message.warning('请输入面料!');
				}else if(!this.arg.size){
					this.$message.warning('请输入尺码!');
				}else if(!this.arg.color){
					this.$message.warning('请输入颜色!');
				}else{
					var arg = this.goods_type == '1'?this.arg:{...this.arg,...{style_id:this.style_id}};
					this.$confirm(`确认${this.goods_type == '1'?'添加':'编辑'}此商品吗?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if(this.goods_type == '1'){	//添加
							resource.addProductStyle(arg).then(res => {
								if(res.data.code == 1){
									this.$message.success(res.data.msg);
									this.$router.go(-1);
								}else{
									this.$message.warning(res.data.msg);
								}
							})
						}else{			//编辑或重新提交
							if(this.goods_type == '5'){	//重新提交
								arg.type = 1;
								resource.returnEditGoodsPost(arg).then(res => {
									if(res.data.code == 1){
										this.$message.success(res.data.msg);
										this.$router.go(-1);
									}else{
										this.$message.warning(res.data.msg);
									}
								})
							}else if(this.goods_type == '2'){	//编辑
								resource.editProductStylePost(arg).then(res => {
									if(res.data.code == 1){
										this.$message.success(res.data.msg);
										this.$router.go(-1);
									}else{
										this.$message.warning(res.data.msg);
									}
								})
							}

						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}
			}
		},
		components:{
			UploadFile,
			TableTitle,
			GoBack
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
	padding: 20rem 240rem;
	display: flex;
	flex-direction: column;
	.card_box{
		display: flex;
		flex-direction: column;
		flex:1;
		.scroll_box{
			// height: 800px;
			overflow-y: scroll;
		}
		.scroll_box::-webkit-scrollbar{display:none}
		.form_row{
			margin: 0 auto;
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