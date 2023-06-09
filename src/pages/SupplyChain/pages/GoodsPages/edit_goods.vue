<template>
	<div class="chain_page_content">
		<el-card class="card_box">
			<div class="form_row">
				<el-form size="small" style="width: 50%" label-width="130px">
					<el-form-item label="提交人：" v-if="is_detail">
						<div>{{add_admin_name}}</div>
					</el-form-item>
					<el-form-item label="款式编码：">
						<el-input type="textarea" autosize :placeholder="is_detail?'':'多个请用分号间隔'" v-model="arg.i_id" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="BD款式编码：">
						<el-input type="textarea" autosize :placeholder="is_detail?'':'多个请用分号间隔'" v-model="arg.bd_i_id" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="供应商款式编码：">
						<el-input type="textarea" autosize :placeholder="is_detail?'':'多个请用分号间隔'" v-model="arg.supplier_ksbm" :disabled="is_detail">
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
					<el-form-item label="拍摄风格：">
						<el-select v-model="shooting_style_ids" multiple filterable clearable :placeholder="is_detail?'':'请选择拍摄风格'" :disabled="is_detail">
							<el-option v-for="item in style_list" :key="item.shooting_style_id" :label="item.shooting_style_name" :value="item.shooting_style_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="面料：">
						<el-input :placeholder="is_detail?'':'面料'" v-model="arg.fabric" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="成本价：">
						<el-input type="number" v-model="arg.cost_price" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="控价：">
						<el-input type="number" v-model="arg.price_control" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="调价状态：" v-if="!!price_status">
						{{price_status | priceStatus}}
					</el-form-item>
					<el-form-item label="修改后价格：" v-if="price_status != 0 && !!edit_price">
						{{edit_price}}
					</el-form-item>
					<el-form-item label="网盘地址：">
						<el-input :placeholder="is_detail?'':'网盘地址'" v-model="arg.net_disk_address" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="备注：">
						<el-input type="textarea" :rows="5" :placeholder="is_detail?'':'请输入备注'" v-model="arg.remark" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="下架原因：" v-if="check_status == 4">
						<div>{{off_reason}}</div>
					</el-form-item>
					<el-form-item label="拒绝原因：" v-if="check_status == 3 || check_status == 6 || price_status == 3">
						<div>{{refuse_reason}}</div>
					</el-form-item>
				</el-form>
				<el-form size="small" style="width: 50%" label-width="100px">
					<el-form-item label="商品款号：" required>
						<el-input placeholder="商品款号" v-model="arg.style_name" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="标题：">
						<el-input :placeholder="is_detail?'':'标题'" v-model="arg.title" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="市场：" required>
						<el-select v-model="arg.market_id" clearable placeholder="请选择市场" :disabled="is_detail">
							<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="分类：">
						<el-select v-model="arg.classification_id" clearable :placeholder="is_detail?'':'请选择分类'" :disabled="is_detail">
							<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="合作模式：">
						<el-input :placeholder="is_detail?'':'合作模式'" v-model="arg.mode" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="尺码：">
						<el-input :placeholder="is_detail?'':'尺码'" v-model="arg.size" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="颜色：">
						<el-input :placeholder="is_detail?'':'颜色'"  v-model="arg.color" :disabled="is_detail">
						</el-input>
					</el-form-item>
					<el-form-item label="审核状态：" v-if="is_detail">
						{{check_status | checkStatus}}
					</el-form-item>
					<el-form-item label="爆款：">
						<el-radio-group v-model="arg.hot_style" :disabled="is_detail || hot_status === 0">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="爆款链接：" v-if="arg.hot_style">
						<div style="display: flex;flex-wrap: wrap">
							<div :key="url" v-for="url in link_urls">
								<el-tooltip class="item" effect="dark" :content="url" placement="top-start">
									<el-tag size="small" :closable="!is_detail && default_hot_style === 0" :disable-transitions="false" @close="handleClose(url)">
										{{url}}
									</el-tag>
								</el-tooltip>
							</div>
						</div>
						<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
						</el-input>
						<el-button size="mini" v-if="!inputVisible && !is_detail && default_hot_style === 0" type="primary" icon="el-icon-plus" @click="showInput">新增</el-button>
					</el-form-item>
					<el-form-item label="爆款图片：" v-if="arg.hot_style">
						<div v-if="is_detail || default_hot_style === 1">
							<el-image class="bk_card_img" v-for="item in preview_bk_image" :src="item" fit="scale-down" :preview-src-list="preview_bk_image"></el-image>
						</div>
						<UploadFile :img_list="bk_img_list" :is_multiple="true" :current_num="bk_img.length" :size="80" :max_num="9" @callbackFn="bkCallbackFn" v-else/>
					</el-form-item>
					<el-form-item label="主推款：">
						<el-radio-group v-model="arg.data_style" :disabled="is_detail || data_status === 0">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="库存数：" v-if="arg.data_style">
						<el-input type="number" v-model="kcs" :disabled="is_detail || default_data_style === 1">
						</el-input>
					</el-form-item>
					<el-form-item label="调价：" v-if="arg.data_style">
						<el-input type="number" v-model="tj" :disabled="is_detail || default_data_style === 1">
						</el-input>
					</el-form-item>
					<el-form-item label="备注：" v-if="arg.data_style">
						<el-input type="textarea" :rows="3" :placeholder="is_detail?'':'请输入备注'" v-model="bz" :disabled="is_detail || default_data_style === 1">
						</el-input>
					</el-form-item>
					<el-form-item label="独家款：">
						<el-radio-group v-model="arg.sole_style" :disabled="is_detail">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="自主款：">
						<el-radio-group v-model="arg.again_style" :disabled="is_detail">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="深度库存 ：">
						<el-radio-group v-model="arg.depth_inventory" :disabled="is_detail || depth_inventory_status === 0">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="视频款：">
						<el-radio-group v-model="arg.video_style" :disabled="is_detail || video_style_status === 0">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="商品图：">
						<div v-if="is_detail">
							<el-image class="card_img" v-for="item in preview_image" :src="item" fit="scale-down" :preview-src-list="preview_image"></el-image>
						</div>
						<UploadFile :is_main="true" :img_list="img_list" :is_multiple="true" :current_num="arg.img.length" :max_num="99" @callbackFn="callbackFn" v-else/>
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
				preview_bk_image:[],	//查看详情的爆款图片列表
				img_list:[],			
				style_id:"",			//商品ID
				add_admin_name:"",		//提交人
				check_status:"",		//审核状态
				price_status:"",		//调价审核状态
				edit_price:"",			//修改后价格
				off_reason:"",			//下架原因
				refuse_reason:"",		//拒绝原因
				arg:{
					i_id:"",				//款式编码
					bd_i_id:"",				//bd款式编码
					supplier_ksbm:"",		//供应商款式编码
					style_name:"",			//商品款号
					supplier_id:"",			//选中的供应商
					title:"",				//标题
					category_id:"",			//选中的类目
					market_id:"",			//选中的市场
					classification_id:"",	//选中的分类
					fabric:"",				//面料
					mode:"",				//合作模式
					cost_price:"",			//成本价
					price_control:"",		//控价
					size:"",				//尺码
					color:"",				//颜色
					hot_style:0,			//爆款
					sole_style:0,			//独家款
					data_style:0,			//主推款
					again_style:0,			//二开款
					depth_inventory:0,		//深度库存
					video_style:0,			//视频款
					net_disk_address:"",	//网盘地址
					img:[],					//图片列表
					remark:"",				//备注
				},							//可传递的参数
				shooting_style_ids:[],		//已选中的拍摄风格
				default_hot_style:0,		//默认是否爆款
				default_data_style:0,		//默认是否主推款
				hot_status:10,				//爆款审核状态
				data_status:10,				//主推款审核状态
				depth_inventory_status:10,	//深度库存审核状态
				video_style_status:10,		//视频款审核状态
				link_urls: [],				//已填写的爆款链接列表
				inputVisible: false,		//是否显示新建链接的输入框
				inputValue: '',				//新建链接的输入框内容
				bk_img_list:[],				//选中的爆款图片列表(可查看)
				bk_img:[],					//选中的爆款图片列表（可传递）
				kcs:"",						//库存数
				tj:"",						//调价
				bz:"",						//备注

			}
		},
		created(){
			//商品ID
			this.style_id = this.$route.query.style_id;
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
				var arg = {
					style_id:this.style_id
				}
				if(this.page_type == 'goods'){	//商品管理
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
					}else if(this.goods_type == '4'){//审核
						resource.examEditGoods(arg).then(res => {
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
						resource.editGoodsGet(arg).then(res => {
							if(res.data.code == 1){
								let data_info = res.data.data;
								//处理详情
								this.setInfo(data_info);
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
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
							this.add_admin_name = data_info.add_admin_name;
							this.check_status = data_info.check_status;
							this.off_reason = data_info.off_reason;
							this.refuse_reason = data_info.refuse_reason;
							for(let key in this.arg){
								for(let k in data_info){
									if(key == k){
										//款式编码逗号转分号
										if((k == 'i_id' || k == 'bd_i_id' || k == 'supplier_ksbm') && data_info[k].indexOf(',') > -1){
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
				this.add_admin_name = data_info.add_admin_name;
				this.check_status = data_info.check_status;
				this.off_reason = data_info.off_reason;
				this.refuse_reason = data_info.refuse_reason;
				this.price_status = data_info.price_status;
				this.edit_price = data_info.edit_price;

				this.default_hot_style = data_info.hot_style;//默认是否爆款
				this.default_data_style = data_info.data_style;	//默认是否主推款
				this.hot_status = data_info.hot_status; //爆款审核状态
				this.data_status = data_info.data_status; //主推款审核状态
				this.depth_inventory_status = data_info.depth_inventory_status;	//深度库存审核状态
				this.video_style_status = data_info.video_style_status;	//视频款审核状态

				this.link_urls = data_info.hot_url;
				data_info.hot_img.map(item => {
					let img_obj = {
						urls:item,
						show_icon:false
					}
					this.bk_img_list.push(img_obj);
					this.preview_bk_image.push(this.domain + item);
				})
				this.bk_img = data_info.hot_img;
				this.kcs = data_info.data_num;
				this.tj = data_info.data_price;
				this.bz = data_info.data_remark;

				if(data_info.shooting_style_id != ''){
					let shooting_style_ids = data_info.shooting_style_id.split(',');
					this.shooting_style_ids = shooting_style_ids.map(item => {
						return parseInt(item);
					})
				}
				
				for(let key in this.arg){
					for(let k in data_info){
						if(key == k){
							//款式编码逗号转分号
							if((k == 'i_id' || k == 'bd_i_id' || k == 'supplier_ksbm') && data_info[k].indexOf(',') > -1){
								data_info[k] = data_info[k].replaceAll(",", ";");
							}
							this.arg[key] = data_info[k];
						}
					}
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
			//删除当前选中的爆款链接
			handleClose(url) {
				this.link_urls.splice(this.link_urls.indexOf(url), 1);
			},
			//监听爆款图片列表回调
			bkCallbackFn(img_arr){
				this.bk_img = img_arr;
			},
			//点击新增爆款链接
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.link_urls.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			//底部提交
			commitEditGoods(){
				if(!this.arg.style_name){
					this.$message.warning('请输入商品款号!');
				}else if(!this.arg.supplier_id){
					this.$message.warning('请选择供应商!');
				}else if(!this.arg.category_id){
					this.$message.warning('请选择类目!');
				}else if(!this.arg.market_id){
					this.$message.warning('请选择市场!');
				}else{
					var arg = this.goods_type == '1'?this.arg:{...this.arg,...{style_id:this.style_id}};
					if (arg.i_id.indexOf(";") > -1) {
						arg.i_id = arg.i_id.replaceAll(";", ",");
					}
					if (arg.bd_i_id.indexOf(";") > -1) {
						arg.bd_i_id = arg.bd_i_id.replaceAll(";", ",");
					}
					if (arg.supplier_ksbm.indexOf(";") > -1) {
						arg.supplier_ksbm = arg.supplier_ksbm.replaceAll(";", ",");
					}
					arg.shooting_style_id = this.shooting_style_ids.join(',');

					arg.hot_url = this.link_urls.join(',');
					arg.hot_img = this.bk_img.join(',');
					arg.data_num = this.kcs;
					arg.data_price = this.tj;
					arg.data_remark = this.bz;


					this.$confirm(`确认${this.goods_type == '1'?'添加':'编辑'}此商品吗?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
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
									resource.editGoodsPost(arg).then(res => {
										if(res.data.code == 1){
											this.$message.success(res.data.msg);
											this.$router.go(-1);
										}else{
											this.$message.warning(res.data.msg);
										}
									})
								}
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
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});          
					});
				}
			},
			//审批
			auditFn(type){
				let arg = {
					type:type,
					id:this.style_id
				}
				if(type == '1'){
					this.$confirm('确认同意?', '提示', {		//同意
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
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
				}else{						//拒绝
					this.$prompt('请输入拒绝原因', '拒绝', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
					}).then(({ value }) => {
						if(!value){
							this.$message.warning('请输入拒绝原因');
							return;
						}
						arg.refuse_reason = value;
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
							message: '取消输入'
						});       
					});
				}
			},
		},
		filters:{
			//审核状态
			checkStatus:function(val){
				let ss = "";
				switch(val){
					case 1:
					ss =  '上架待审核';
					break;
					case 2:
					ss =  '审核通过(已上架)';
					break;
					case 3:
					ss =  '上架审核拒绝';
					break;
					case 4:
					ss =  '下架待审核';
					break;
					case 5:
					ss =  '下架审核通过(已下架)';
					break;
					case 6:
					ss =  '下架审核拒绝';
					break;
				}
				return ss;
			},
			priceStatus:function(e){
				let status_str = "";
				switch(e){
					case 1:
					status_str = '待审核';
					break;
					case 2:
					status_str = '审核通过';
					break;
					case 3:
					status_str = '审核拒绝';
					break;
				}
				return status_str;
			}
		},
		components:{
			UploadFile
		}
	}
</script>
<style>
.el-tag {
	position: relative;
	max-width: 300px;
	margin-right: 10px;
	margin-bottom: 0!important;
	overflow: hidden!important;
	text-overflow: ellipsis!important;
	white-space: nowrap!important;
	padding-right: 18px;
}
.el-tag__close{
	position: absolute!important;
	right: 1px!important;
	top: 3px!important;
}
</style>
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
		.bk_card_img{
			margin-right: 16px;
			margin-bottom: 16px;
			border-radius: 2rem;
			width: 80px;
			height: 80px;
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