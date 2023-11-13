<template>
	<div class="chain_page_content">
		<div class="form_row">
			<el-form size="small" style="width: 50%" label-width="140px">
				<el-form-item label="提交人：" v-if="is_detail">
					<div>{{add_admin_name}}</div>
				</el-form-item>
				<el-form-item label="内部款式编码：">
					<div v-if="is_detail">{{arg.i_id}}</div>
					<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="arg.i_id" :disabled="info_edit_fields.indexOf('i_id') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="BD款式编码：">
					<div v-if="is_detail">{{arg.bd_i_id}}</div>
					<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="arg.bd_i_id" :disabled="info_edit_fields.indexOf('bd_i_id') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="供应商款式编码：">
					<div v-if="is_detail">{{arg.supplier_ksbm}}</div>
					<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="arg.supplier_ksbm" :disabled="info_edit_fields.indexOf('supplier_ksbm') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="二开品牌款式编码：">
					<div class="ekpp">
						<el-form size="small" label-width="65px">
							<el-form-item label="海澜：">
								<div v-if="is_detail">{{海澜_ksbm}}</div>
								<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="海澜_ksbm" v-else>
								</el-input>
							</el-form-item>
							<el-form-item label="JEEP：">
								<div v-if="is_detail">{{JEEP_ksbm}}</div>
								<el-input type="textarea" autosize placeholder="多个请用分号间隔" v-model="JEEP_ksbm" v-else>
								</el-input>
							</el-form-item>
						</el-form>
					</div>
				</el-form-item>
				<el-form-item label="供应商：" :required="!is_detail && goods_type != '2' && goods_type != '5' && info_edit_fields.indexOf('supplier_id') == -1 && page_type != 'feedback'">
					<div v-if="is_detail || page_type == 'feedback'">{{arg.supplier_id | filterSupplier}}</div>
					<el-select v-model="arg.supplier_id" filterable clearable placeholder="请选择供应商" :disabled="info_edit_fields.indexOf('supplier_id') > -1 || goods_type == '2' || goods_type == '5'" v-else>
						<el-option v-for="item in supplier_list" :key="item.supplier_id" :label="item.supplier_name" :value="item.supplier_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类目：" :required="!is_detail && info_edit_fields.indexOf('category_id') == -1">
					<div v-if="is_detail">{{arg.category_id | filterCate}}</div>
					<el-select v-model="arg.category_id" clearable placeholder="请选择类目" :disabled="info_edit_fields.indexOf('category_id') > -1" v-else>
						<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="面料：">
					<div v-if="is_detail">{{arg.fabric}}</div>
					<el-input placeholder="面料" v-model="arg.fabric" :disabled="info_edit_fields.indexOf('fabric') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="成本价：">
					<div v-if="is_detail">{{arg.cost_price}}</div>
					<el-input type="number" placeholder="成本价" v-model="arg.cost_price" :disabled="info_edit_fields.indexOf('cost_price') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="控价：">
					<div v-if="is_detail">{{arg.price_control}}</div>
					<el-input type="number" placeholder="控价" v-model="arg.price_control" :disabled="info_edit_fields.indexOf('price_control') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="档口批价：">
					<div v-if="is_detail">{{arg.wholesale_price}}</div>
					<el-input type="number" placeholder="档口批价" v-model="arg.wholesale_price" :disabled="info_edit_fields.indexOf('wholesale_price') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="调价状态：" v-if="!!price_status">
					{{price_status | priceStatus}}
				</el-form-item>
				<el-form-item label="修改后价格：" v-if="price_status != 0 && !!edit_price">
					{{edit_price}}
				</el-form-item>
				<el-form-item label="网盘地址：">
					<div v-if="is_detail">{{arg.net_disk_address}}</div>
					<el-input placeholder="网盘地址" v-model="arg.net_disk_address" :disabled="info_edit_fields.indexOf('net_disk_address') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="备注：">
					<div v-if="is_detail">{{arg.remark}}</div>
					<el-input type="textarea" :rows="5" placeholder="请输入备注" v-model="arg.remark" :disabled="info_edit_fields.indexOf('remark') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="拒绝原因：" v-if="check_status == 3 || check_status == 6 || price_status == 3">
					<div>{{refuse_reason}}</div>
				</el-form-item>
			</el-form>
			<el-form size="small" style="width: 50%" label-width="120px">
				<el-form-item label="供应商款号：" required>
					<div v-if="is_detail || page_type == 'feedback'">{{arg.style_name}}</div>
					<el-input placeholder="供应商款号" v-model="arg.style_name" :disabled="goods_type == '2' || goods_type == '5' || info_edit_fields.indexOf('style_name') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="标题：">
					<div v-if="is_detail">{{arg.title}}</div>
					<el-input placeholder="标题" v-model="arg.title" :disabled="info_edit_fields.indexOf('title') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="市场：" required>
					<div v-if="is_detail">{{arg.market_id | filterMarket}}</div>
					<el-select v-model="arg.market_id" clearable placeholder="请选择市场" :disabled="info_edit_fields.indexOf('market_id') > -1" v-else>
						<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类：">
					<div v-if="is_detail">{{arg.classification_id | filterClass}}</div>
					<el-select v-model="arg.classification_id" clearable placeholder="请选择分类" :disabled="info_edit_fields.indexOf('classification_id') > -1" v-else>
						<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="尺码：">
					<div v-if="is_detail">{{arg.size}}</div>
					<el-input placeholder="尺码" v-model="arg.size" :disabled="info_edit_fields.indexOf('size') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="颜色：">
					<div v-if="is_detail">{{arg.color}}</div>
					<el-input placeholder="颜色" v-model="arg.color" :disabled="info_edit_fields.indexOf('color') > -1" v-else>
					</el-input>
				</el-form-item>
				<el-form-item label="替代款号：">
					<div v-if="is_detail">{{arg.replace_ksbm}}</div>
					<el-input type="textarea" placeholder="多个请用分号间隔" v-model="arg.replace_ksbm" :disabled="info_edit_fields.indexOf('replace_ksbm') > -1" v-else maxlength="100"
						show-word-limit>
					</el-input>
				</el-form-item>
				<el-form-item label="审核状态：" v-if="is_detail">
					{{check_status | checkStatus}}
				</el-form-item>
				<el-form-item label="下架原因：" v-if="is_detail && check_status == 5	">
					{{arg.off_reason}}
				</el-form-item>
				<el-form-item label="爆款：">
					<div v-if="is_detail || hot_status === 0">{{arg.hot_style == 1?'是':'否'}}</div>
					<el-radio-group v-model="arg.hot_style" :disabled="info_edit_fields.indexOf('hot_style') > -1 || info_edit_fields.indexOf('hot_url') > -1 || info_edit_fields.indexOf('hot_img') > -1" v-else>
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="爆款链接：" v-if="arg.hot_style">
					<div style="display: flex;flex-wrap: wrap">
						<div :key="url" v-for="url in link_urls">
							<el-tooltip class="item" effect="dark" :content="url" placement="top-start">
								<el-tag size="small" :closable="!is_detail && info_edit_fields.indexOf('hot_style') == -1 && info_edit_fields.indexOf('hot_url') == -1 && info_edit_fields.indexOf('hot_img') == -1" :disable-transitions="false" @close="handleClose(url)">
									{{url}}
								</el-tag>
							</el-tooltip>
						</div>
					</div>
					<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
					</el-input>
					<el-button size="mini" v-if="!inputVisible && !is_detail && info_edit_fields.indexOf('hot_style') == -1 && info_edit_fields.indexOf('hot_url') == -1 && info_edit_fields.indexOf('hot_img') == -1" type="primary" icon="el-icon-plus" @click="showInput">新增</el-button>
				</el-form-item>
				<el-form-item label="爆款图片：" v-if="arg.hot_style">
					<UploadFile :img_list="bk_img_list" :is_multiple="true" :current_num="bk_img.length" :size="80" :max_num="9" :only_view="is_detail || info_edit_fields.indexOf('hot_style') > -1 || info_edit_fields.indexOf('hot_url') > -1 || info_edit_fields.indexOf('hot_img') > -1" @callbackFn="bkCallbackFn"/>
					</el-form-item>
					<el-form-item label="主推款：">
						<div v-if="is_detail || data_status === 0">{{arg.data_style == 1?'是':'否'}}</div>
						<el-radio-group v-model="arg.data_style" :disabled="info_edit_fields.indexOf('data_style') > -1 || info_edit_fields.indexOf('data_num') > -1 || info_edit_fields.indexOf('data_price') > -1 || info_edit_fields.indexOf('data_remark') > -1" v-else>
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="库存数：" v-if="arg.data_style">
						<div v-if="is_detail || info_edit_fields.indexOf('data_style') > -1 || info_edit_fields.indexOf('data_num') > -1 || info_edit_fields.indexOf('data_price') > -1 || info_edit_fields.indexOf('data_remark') > -1">{{kcs}}</div>
						<el-input type="number" v-model="kcs" v-else>
						</el-input>
					</el-form-item>
					<el-form-item label="调价：" v-if="arg.data_style">
						<div v-if="is_detail || info_edit_fields.indexOf('data_style') > -1 || info_edit_fields.indexOf('data_num') > -1 || info_edit_fields.indexOf('data_price') > -1 || info_edit_fields.indexOf('data_remark') > -1">{{tj}}</div>
						<el-input type="number" v-model="tj" v-else>
						</el-input>
					</el-form-item>
					<el-form-item label="备注：" v-if="arg.data_style">
						<div v-if="is_detail || info_edit_fields.indexOf('data_style') > -1 || info_edit_fields.indexOf('data_num') > -1 || info_edit_fields.indexOf('data_price') > -1 || info_edit_fields.indexOf('data_remark') > -1">{{bz}}</div>
						<el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="bz" v-else>
						</el-input>
					</el-form-item>
					<el-form-item label="独家款：">
						<div v-if="is_detail">{{arg.sole_style == 1?'是':'否'}}</div>
						<el-radio-group v-model="arg.sole_style" :disabled="info_edit_fields.indexOf('sole_style') > -1" v-else>
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="自主款：">
						<div v-if="is_detail">{{arg.again_style == 1?'是':'否'}}</div>
						<el-radio-group v-model="arg.again_style" :disabled="info_edit_fields.indexOf('again_style') > -1" v-else>
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="深度库存 ：">
						<div v-if="is_detail || depth_inventory_status === 0">{{arg.depth_inventory == 1?'是':'否'}}</div>
						<el-radio-group v-model="arg.depth_inventory" :disabled="info_edit_fields.indexOf('depth_inventory') > -1" v-else>
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="视频款：">
						<div v-if="is_detail || video_style_status === 0">{{arg.video_style == 1?'是':'否'}}</div>
						<el-radio-group v-model="arg.video_style" :disabled="info_edit_fields.indexOf('video_style') > -1" v-else>
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
			<div class="form_row">
				<el-form size="small" label-width="100px">
					<el-form-item label="拍摄风格：" required>
						<div>
							<div class="flex" style="margin-bottom:10px">
								<el-popover ref="stylePopover" placement="right-start" width="400" trigger="click">
									<div>
										<el-select v-model="selected_style" multiple filterable placeholder="全部风格">
											<el-option
											v-for="item in style_table_data"
											:key="item.shooting_style_id"
											:label="item.shooting_style_name"
											:value="item.shooting_style_id">
										</el-option>
									</el-select>
									<div class="dialog_footer">
										<el-button size="small" type="primary" @click="setStyleFn">保存</el-button>
									</div>
								</div>
								<el-button size="mini" type="primary" slot="reference" v-if="goods_type != '3' && goods_type != '4' && info_edit_fields.indexOf('styles_data') == -1">添加</el-button>
							</el-popover>
						</div>
						<div class="flex relative style_row" v-for="(item,index) in style_card_list">
							<div class="relative style_item flex ac jc" >
								<div>{{item.shooting_style_name}}</div>
								<img class="delete_style_icon" src="../../../../static/delete_style_icon.png" v-if="goods_type != '3' && goods_type != '4' && info_edit_fields.indexOf('styles_data') == -1 && (item.edit_status == 1 || !item.edit_status)" @click.stop="deleteStyleTab(index)">
								<div class="primary_color style_new_time flex space-nowrap" v-if="goods_type == '3' || goods_type == '4'">
									<div>上新时间：</div>
									<div style="width:70px">{{item.style_new_time}}</div>
								</div>
							</div>
							<div class="flex-1">
								<UploadFile :index="index" :size="80" :request_del="goods_type == '1'" :is_multiple="true" :max_num="9" :current_num="style_card_list[index].image_arr.length" :img_list="style_card_list[index].image_arr" :only_view="goods_type == '3' || goods_type == '4' || info_edit_fields.indexOf('styles_data') > -1 || item.edit_status == 0" @callbackFn="currentStyleImgCallBackFn(index,arguments)"/>
								</div>
								<div class="audit_ing" v-if="item.edit_status == 0">审核中</div>
							</div>			
						</div>
					</el-form-item>
				</el-form>
			</div>
			<div class="bottom_row" v-if="goods_type == '1' || goods_type == '2' || goods_type == '5' || page_type == 'feedback'">
				<el-button size="small" type="primary" @click="commitEditGoods">提交</el-button>
			</div>
			<div class="bottom_row" v-if="goods_type == '4'">
				<el-button size="small" type="primary" @click="auditFn('1')">同意</el-button>
				<el-button size="small" type="primary" @click="auditFn('2')">拒绝</el-button>
			</div>
		</div>
	</template>
	<script>
		import commonResource from '../../../../api/common_resource.js'
		import resource from '../../../../api/chain_resource.js'

		import UploadFile from '../../../../components/upload_file.vue'
		let that;
		export default{
			data(){
				return{
					that:this,
				is_detail:false,		//是否是详情
				page_type:'',			//页面来源（goods:商品；feekback:反馈）
				supplier_list:[],		//供应商列表
				cate_list:[],			//类目列表
				market_list:[],			//市场列表
				class_list:[],			//分类列表
				preview_image:[],		//查看详情的图片列表
				preview_bk_image:[],	//查看详情的爆款图片列表
				img_list:[],			
				goods_id:"",			//商品ID
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
					cost_price:"",			//成本价
					price_control:"",		//控价
					wholesale_price:"",		//档口批价
					size:"",				//尺码
					color:"",				//颜色
					replace_ksbm:"",		//替代款号
					hot_style:0,			//爆款
					sole_style:0,			//独家款
					data_style:0,			//主推款
					again_style:0,			//二开款
					depth_inventory:0,		//深度库存
					video_style:0,			//视频款
					net_disk_address:"",	//网盘地址
					img:[],					//图片列表
					remark:"",				//备注
					off_reason:"",			//下架原因
				},							//可传递的参数
				海澜_ksbm:"",
				JEEP_ksbm:"",
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
				style_card_list:[],				//已选中的风格列表
				style_table_data:[],			//未选中的风格列表
				selected_style:[],				//已选中的风格ID列表
				info_edit_fields:[],			//存在修改记录的字段（不可编辑）
			}
		},
		beforeCreate() {
			that = this;
		},
		created(){
			//商品ID
			this.goods_id = this.$route.query.page_type == 'feedback'?this.$route.query.goods_id:this.edit_goods_id;
			//查看、审核展示不可编辑
			this.is_detail = this.goods_type == '3' || this.goods_type == '4'?true:false;
			//页面来源
			this.page_type = this.$route.query.page_type?this.$route.query.page_type:'goods';
			//获取数据列表
			this.getInfoList();
		},
		props:{
			//商品ID
			edit_goods_id:{
				type:String,
			default:''
			},
			//弹窗类型（1:添加；2:编辑；3:查看；4:审核；5：重新提交）
			goods_type:{
				type:String,
			default:''
			},
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
				if(this.goods_type == '2' || this.goods_type == '3' || this.goods_type == '4' || this.goods_type == '5' || this.page_type == 'feedback'){	//2:编辑;3:详情；4:审核；5:重新提交
					//获取商品详情
					this.getGoodsDetail();
				}
			},
			//获取商品详情
			getGoodsDetail(){
				var arg = {
					goods_id:this.goods_id
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
					}else{								//修改
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
				if(data_info.img){
					this.img_list = data_info.img;
				}
				this.info_edit_fields = data_info.info_edit_fields;
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
				if(data_info.hot_img){
					this.bk_img_list = data_info.hot_img;
				}
				data_info.hot_img.map(item => {
					this.preview_bk_image.push(this.domain + item);
				})
				this.bk_img = data_info.hot_img;
				this.kcs = data_info.data_num;
				this.tj = data_info.data_price;
				this.bz = data_info.data_remark;

				//处理海澜和jeep
				let brand_ksbm = data_info.brand_ksbm;
				if(!brand_ksbm){
					this.海澜_ksbm = '';
					this.JEEP_ksbm = '';
				}else{
					if(brand_ksbm.indexOf(';') > -1){
						let new_brand_ksbm_arr = brand_ksbm.split(';');
						new_brand_ksbm_arr.map(item => {
							//给海澜和jeep赋值
							this.setHJValue(item)
						})
					}else{
						//给海澜和jeep赋值
						this.setHJValue(brand_ksbm)
					}
				}

				//拍摄风格
				let styles_data = data_info.styles_data;

				styles_data.map(item => {
					let style_card_item = {
						shooting_style_id:item.shooting_style_id,
						shooting_style_name:item.shooting_style_name,
						image_arr:item.imgs,
						style_new_time:item.style_new_time,
						edit_status:item.edit_status
					}
					this.style_card_list.push(style_card_item)
				})
				//找到审核中的拍摄风格并删除
				let shz_arr = this.style_card_list.filter(item => {
					return item.edit_status == 0
				})
				let shz_ids = shz_arr.map(item => {
					return item.shooting_style_id;
				})
				shz_ids.map(item => {
					this.style_table_data.map((iii,index) => {
						if(item == iii.shooting_style_id){
							this.style_table_data.splice(index,1);
						}
					})
				})
				//确认商品风格多选
				this.setStyleFn();

				for(let key in this.arg){
					for(let k in data_info){
						if(key == k){
							//款式编码逗号转分号
							if((k == 'i_id' || k == 'bd_i_id' || k == 'supplier_ksbm' || k == 'replace_ksbm') && data_info[k].indexOf(',') > -1){
								data_info[k] = data_info[k].replaceAll(",", ";");
							}
							this.arg[key] = data_info[k];
						}
					}
				}
			},
			//给海澜和jeep赋值
			setHJValue(name){
				var name_arr = name.split('_');
				if(name_arr[0] == '海澜'){
					this.海澜_ksbm = name_arr[1].replaceAll(",", ";")
				}else if(name_arr[0] == 'JEEP'){
					this.JEEP_ksbm = name_arr[1].replaceAll(",", ";")
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
							let style_list = res.data.data;
							style_list.map(item => {
								item['image_arr'] = [];
							})
							this.style_table_data = style_list;
							resolve();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				})
			},
			//确认商品风格多选
			setStyleFn(){
				this.selected_style.map(item => {
					let name_arr = this.style_table_data.filter(i => {
						return i.shooting_style_id == item;
					})
					let style_card_item = {
						shooting_style_id:item,
						shooting_style_name:name_arr[0].shooting_style_name,
						image_arr:[]
					}
					this.style_card_list.push(style_card_item);
				})
				this.style_table_data = this.filterStyle(this.style_table_data,this.style_card_list);
				this.selected_style = [];
				this.$refs.stylePopover.doClose()
			},
			//点击删除已选的风格
			deleteStyleTab(index){
				let current_style = this.style_card_list[index];
				this.$confirm(`确认删除【${current_style.shooting_style_name}】风格及包含的${current_style.image_arr.length}张图片?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.style_table_data.unshift(current_style);
					this.style_card_list.splice(index,1);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消删除'
					});          
				});
			},
			//监听风格图列表回调
			currentStyleImgCallBackFn(index,data){
				let old_item = JSON.parse(JSON.stringify(this.style_card_list[index]));
				old_item.image_arr = data[0].image_arr;
				this.$set(this.style_card_list,index,old_item);

				if(data[0].newIndex > -1){
					let new_item = JSON.parse(JSON.stringify(this.style_card_list[data[0].newIndex]));
					new_item.image_arr = data[0].new_image_arr;
					this.$set(this.style_card_list,data[0].newIndex,new_item);
				}
				
			},
			//对比已选中的过滤右侧未选中的风格  
			filterStyle(arr1, arr2) {
				return arr1.filter((v) => arr2.every((val) => val.shooting_style_id != v.shooting_style_id));
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
			bkCallbackFn(v){
				this.bk_img = v.image_arr;
			},
			//点击新增爆款链接
			showInput() {
				this.inputVisible = true;
				this.$nextTick(() => {
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
				}else if(this.style_card_list.length == 0){
					this.$message.warning('至少上传一个拍摄风格!');
				}else{
					//处理拍摄风格参数
					let style_imgs = [];
					let null_arr = [];
					this.style_card_list.map(item => {
						if(item.image_arr.length == 0){
							null_arr.push(item.shooting_style_name)
						}else{
							let img_arr = [];
							item.image_arr.map(i => {
								img_arr.push(i)
							})
							style_imgs.push(`${item.shooting_style_id}-${img_arr.join(',')}`)
						}
					})
					if(null_arr.length > 0){
						this.$message.warning(`【${null_arr.join(',')}】风格图片为空!`);
						return;
					}

					var arg = this.goods_type == '1'?this.arg:{...this.arg,...{goods_id:this.goods_id}};
					if (arg.i_id.indexOf(";") > -1) {
						arg.i_id = arg.i_id.replaceAll(";", ",");
					}
					if (arg.bd_i_id.indexOf(";") > -1) {
						arg.bd_i_id = arg.bd_i_id.replaceAll(";", ",");
					}
					if (arg.supplier_ksbm.indexOf(";") > -1) {
						arg.supplier_ksbm = arg.supplier_ksbm.replaceAll(";", ",");
					}
					if (arg.replace_ksbm.indexOf(";") > -1) {
						arg.replace_ksbm = arg.replace_ksbm.replaceAll(";", ",");
					}

					//拍摄风格参数
					arg.style_imgs = style_imgs.join(';');
					

					arg.hot_url = this.link_urls.join(',');
					arg.hot_img = this.bk_img.join(',');
					arg.data_num = this.kcs;
					arg.data_price = this.tj;
					arg.data_remark = this.bz;

					//处理海澜和jeep
					var new_海澜_ksbm = '';
					if (!this.海澜_ksbm) {
						new_海澜_ksbm = '';
					}else if (this.海澜_ksbm.indexOf(";") > -1) {
						new_海澜_ksbm = '海澜_' + this.海澜_ksbm.replaceAll(";", ",");
					}else{
						new_海澜_ksbm = '海澜_' + this.海澜_ksbm;
					}
					var new_JEEP_ksbm = '';
					if (!this.JEEP_ksbm) {
						new_JEEP_ksbm = '';
					}else if (this.JEEP_ksbm.indexOf(";") > -1) {
						new_JEEP_ksbm = 'JEEP_' + this.JEEP_ksbm.replaceAll(";", ",");
					}else{
						new_JEEP_ksbm = 'JEEP_' + this.JEEP_ksbm;
					}
					if(new_海澜_ksbm && new_JEEP_ksbm){
						arg['brand_ksbm'] = new_海澜_ksbm + ';' + new_JEEP_ksbm;
					}else if(!new_海澜_ksbm && !new_JEEP_ksbm){
						arg['brand_ksbm'] = '';
					}else{
						if(new_海澜_ksbm){
							arg['brand_ksbm'] = new_海澜_ksbm;
						}else{
							arg['brand_ksbm'] = new_JEEP_ksbm;
						}
					}

					this.$confirm(`确认${this.goods_type == '1'?'添加':'编辑'}此商品吗?`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if(this.goods_type == '1'){	//添加
							resource.addGoods(arg).then(res => {
								if(res.data.code == 1){
									this.$message.success(res.data.msg);
									this.$emit('callBack');
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
											this.$emit('callBack');
										}else{
											this.$message.warning(res.data.msg);
										}
									})
								}else if(this.goods_type == '2'){	//编辑
									resource.editGoodsPost(arg).then(res => {
										if(res.data.code == 1){
											this.$message.success(res.data.msg);
											this.$emit('callBack');
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
					goods_id:this.goods_id
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
								this.$emit('callBack');
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
								this.$emit('callBack');
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
			},
			//供应商
			filterSupplier:function(supplier_id){
				if(supplier_id && that.supplier_list.length > 0){
					let supplier_obj = that.supplier_list.find(item => {
						return item.supplier_id == supplier_id;
					});
					return supplier_obj.supplier_name;
				}
			},
			//类目
			filterCate:function(category_id){
				if(category_id && that.cate_list.length > 0){
					let category_obj = that.cate_list.find(item => {
						return item.category_id == category_id;
					});
					return category_obj.category_name;
				}
			},
			//市场
			filterMarket:function(market_id){
				if(market_id && that.market_list.length > 0){
					let market_obj = that.market_list.find(item => {
						return item.market_id == market_id;
					});
					return market_obj.market_name;
				}
			},
			//分类
			filterClass:function(classification_id){
				if(classification_id && that.class_list.length > 0){
					let class_obj = that.class_list.find(item => {
						return item.classification_id == classification_id;
					});
					return class_obj.classification_name;
				}
			},
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
		width: 100%;
		max-height: 820rem;
		padding: 24rem;
		display: flex;
		flex-direction: column;
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
		.style_row{
			margin-bottom: 25rem;
		}
		.style_item{
			border: 1px solid #FFC998;
			background: #FFFCFA;
			color: #E47A1A;
			font-size: 14rem;
			width:80px;
			height:80px;
			margin-right:24px;
			margin-bottom:16px;
			.delete_style_icon{
				position: absolute;
				top: 0;
				right: 0;
				width: 14rem;
				height: 14rem;
			}
			.add_style_icon{
				margin-right: 6rem;
				width: 14rem;
				height: 14rem;
			}
			.style_new_time{
				position: absolute;
				bottom: -45rem;
				right: 0;
			}
		}
		.ekpp{
			border: 1px solid #DCDFE6;
			border-radius: 3px;
			padding-top: 25rem;
			padding-right: 10rem;
		}
		.border_bottom{
			border-bottom:1px solid #DDDDDD;
			margin-bottom: 20px;
		}
		.view_box{
			height: 360rem;
			overflow-y: scroll;
		}
		.info_value{
			display: initial;
			font-size: 13rem;
			color: #333333;
		}
		.audit_ing{
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			background: rgba(71, 71, 71, 0.2);
			font-size: 36rem;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 9;
		}
	}
</style>