<template>
	<div class="chain_page_content">
		<el-card class="card_box" id="card_box">
			<TableTitle :title="table_title" id="title_box">
				<GoBack/>
			</TableTitle>
			<div class="scroll_box" :style="{height:max_height}">
				<div class="form_row">
					<el-form size="small" label-width="100px" style="width:50%">
						<el-form-item label="提交人：" v-if="is_detail">
							<div>{{arg.add_admin_name}}</div>
						</el-form-item>
						<el-form-item label="类目：" required>
							<el-select v-model="arg.category_id" clearable placeholder="请选择类目" :disabled="is_detail || info_edit_fields.indexOf('category_id') > -1">
								<el-option v-for="item in cate_list" :key="item.category_id" :label="item.category_name" :value="item.category_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="面料：" required>
							<el-input placeholder="面料" v-model="arg.fabric" :disabled="is_detail || info_edit_fields.indexOf('fabric') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="成本价：" required>
							<el-input type="number" v-model="arg.cost_price" :disabled="is_detail || info_edit_fields.indexOf('cost_price') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="控价：">
							<el-input type="number" v-model="arg.price_control" :disabled="is_detail || info_edit_fields.indexOf('price_control') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="网盘地址：">
							<el-input :placeholder="is_detail?'':'网盘地址'" v-model="arg.net_disk_address" :disabled="is_detail || info_edit_fields.indexOf('net_disk_address') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="备注：">
							<el-input type="textarea" :rows="5" :placeholder="is_detail?'':'请输入备注'" v-model="arg.remark" :disabled="is_detail || info_edit_fields.indexOf('remark') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="调价状态：" v-if="!!price_status">
							{{price_status | priceStatus}}
						</el-form-item>
						<el-form-item label="修改后价格：" v-if="price_status != 0 && !!edit_price">
							{{edit_price}}
						</el-form-item>
						<el-form-item label="尺码：" required>
							<el-input placeholder="尺码" v-model="arg.size" :disabled="is_detail|| info_edit_fields.indexOf('size') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="颜色：" required>
							<el-input placeholder="颜色" v-model="arg.color" :disabled="is_detail || info_edit_fields.indexOf('color') > -1">
							</el-input>
						</el-form-item>
					</el-form>
					<el-form size="small" label-width="100px" style="width:50%">
						<el-form-item label="商品款号：" required>
							<el-input placeholder="商品款号" style="width:190px" v-model="arg.style_name" :disabled="is_detail || goods_type == '2' || goods_type == '5' || info_edit_fields.indexOf('style_name') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="标题：" required>
							<el-input placeholder="标题" v-model="arg.title" :disabled="is_detail || info_edit_fields.indexOf('title') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="市场：" required>
							<el-select v-model="arg.market_id" clearable placeholder="请选择市场" :disabled="is_detail || info_edit_fields.indexOf('market_id') > -1">
								<el-option v-for="item in market_list" :key="item.market_id" :label="item.market_name" :value="item.market_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="分类：" required>
							<el-select v-model="arg.classification_id" clearable placeholder="请选择分类" :disabled="is_detail || info_edit_fields.indexOf('classification_id') > -1">
								<el-option v-for="item in class_list" :key="item.classification_id" :label="item.classification_name" :value="item.classification_id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="爆款：">
							<el-radio-group v-model="arg.hot_style" :disabled="is_detail || hot_status === 0 || info_edit_fields.indexOf('hot_style') > -1">
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
							<el-radio-group v-model="arg.data_style" :disabled="is_detail || data_status === 0 || info_edit_fields.indexOf('data_style') > -1">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="库存数：" v-if="arg.data_style">
							<el-input type="number" v-model="kcs" :disabled="is_detail || default_data_style === 1 || info_edit_fields.indexOf('data_num') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="调价：" v-if="arg.data_style">
							<el-input type="number" v-model="tj" :disabled="is_detail || default_data_style === 1 || info_edit_fields.indexOf('data_price') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="备注：" v-if="arg.data_style">
							<el-input type="textarea" :rows="3" :placeholder="is_detail?'':'请输入备注'" v-model="bz" :disabled="is_detail || default_data_style === 1 || info_edit_fields.indexOf('data_remark') > -1">
							</el-input>
						</el-form-item>
						<el-form-item label="独家款：">
							<el-radio-group v-model="arg.sole_style" :disabled="is_detail || info_edit_fields.indexOf('sole_style') > -1">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="自主款：">
							<el-radio-group v-model="arg.again_style" :disabled="is_detail || info_edit_fields.indexOf('again_style') > -1">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="深度库存 ：">
							<el-radio-group v-model="arg.depth_inventory" :disabled="is_detail || depth_inventory_status === 0 || info_edit_fields.indexOf('depth_inventory') > -1">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="视频款：">
							<el-radio-group v-model="arg.video_style" :disabled="is_detail || video_style_status === 0|| info_edit_fields.indexOf('video_style') > -1">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
				<!-- <div class="form_row">
					<el-form size="small" label-width="100px">
						<el-form-item label="商品图：">
							<div v-if="is_detail">
								<el-image class="card_img" v-for="item in preview_image" :src="item" fit="scale-down" :preview-src-list="preview_image"></el-image>
							</div>
							<UploadFile :is_main="true" :img_list="img_list" :is_multiple="true" :current_num="arg.img.length" :max_num="99" @callbackFn="callbackFn" v-else/>
						</el-form-item>
					</el-form>
				</div> -->
				<div class="form_row">
			<el-form size="small" label-width="100px">
				<el-form-item label="拍摄风格：" required>
					<div>
						<div class="flex" style="margin-bottom:10px">
							<el-popover ref="stylePopover" placement="right-start" width="400" trigger="click">
								<div>
									<el-select v-model="selected_style" multiple placeholder="全部风格">
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
					<div class="flex" v-for="(item,index) in style_card_list">
						<div class="relative style_item flex ac jc" >
							<div>{{item.shooting_style_name}}</div>
							<img class="delete_style_icon" src="../../static/delete_style_icon.png" v-if="goods_type != '3' && goods_type != '4' && info_edit_fields.indexOf('styles_data') == -1 && item.edit_status == 1" @click.stop="deleteStyleTab(index)">
						</div>
						<div class="flex-1">
							<UploadFile :size="80" :is_multiple="true" :max_num="9" :current_num="style_card_list[index].image_arr.length" :img_list="style_card_list[index].image_arr" :only_view="goods_type == '3' || goods_type == '4' || info_edit_fields.indexOf('styles_data') > -1 || item.edit_status == 0" @callbackFn="currentStyleImgCallBackFn(index,arguments)"/>
							</div>

						</div>
					</div>
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
				preview_bk_image:[],	//查看详情的爆款图片列表
				img_list:[],			
				goods_id:"",			//商品ID
				price_status:"",		//调价审核状态
				edit_price:"",
				max_height:0,
				arg:{
					add_admin_name:"",
					style_name:"",			//商品款号
					title:"",				//标题
					category_id:"",			//选中的类目
					market_id:"",			//选中的市场
					classification_id:"",	//选中的分类
					fabric:"",				//面料
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
				style_card_list:[],				//已选中的风格列表
				style_table_data:[],			//未选中的风格列表
				selected_style:[],				//已选中的风格ID列表
				info_edit_fields:[],			//存在修改记录的字段（不可编辑）
			}
		},
		created(){
			//商品ID
			this.goods_id = this.$route.query.goods_id;
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
					goods_id:this.goods_id
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
				}else{								//编辑
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
				this.info_edit_fields = data_info.info_edit_fields;
				this.price_status = data_info.price_status;
				this.edit_price = data_info.edit_price;

				this.default_hot_style = data_info.hot_style;//默认是否爆款
				this.default_data_style = data_info.data_style;	//默认是否主推款
				this.hot_status = data_info.hot_status; //爆款审核状态
				this.data_status = data_info.data_status; //主推款审核状态
				this.depth_inventory_status = data_info.depth_inventory_status;	//深度库存审核状态
				this.video_style_status = data_info.video_style_status;	//视频款审核状态

				if(data_info.img){
					this.img_list = data_info.img;
				}

				//拍摄风格
				let styles_data = data_info.styles_data;

				styles_data.map(item => {
					let style_card_item = {
						shooting_style_id:item.shooting_style_id,
						shooting_style_name:item.shooting_style_name,
						image_arr:item.imgs,
						edit_status:item.edit_status
					}
					this.style_card_list.push(style_card_item)
				})
				// data_info.img.map(item => {
				// 	// let img_obj = {
				// 	// 	urls:item,
				// 	// 	show_icon:false
				// 	// }
				// 	// this.img_list.push(img_obj);
				// 	this.preview_image.push(this.domain + item);
				// })

				this.link_urls = data_info.hot_url;
				if(data_info.hot_img){
					this.bk_img_list = data_info.hot_img;
				}
				data_info.hot_img.map(item => {
					// let img_obj = {
					// 	urls:item,
					// 	show_icon:false
					// }
					// this.bk_img_list.push(img_obj);
					this.preview_bk_image.push(this.domain + item);
				})
				this.bk_img = data_info.hot_img;
				this.kcs = data_info.data_num;
				this.tj = data_info.data_price;
				this.bz = data_info.data_remark;

				// if(data_info.shooting_style_id != ''){
				// 	let shooting_style_ids = data_info.shooting_style_id.split(',');
				// 	this.shooting_style_ids = shooting_style_ids.map(item => {
				// 		return parseInt(item);
				// 	})
				// }
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
				return arr1.filter((v) => arr2.every((val) => val.shooting_style_id!= v.shooting_style_id));
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
				}else if(!this.arg.title){
					this.$message.warning('请输入标题!');
				}else if(!this.arg.category_id){
					this.$message.warning('请选择类目!');
				}else if(!this.arg.market_id){
					this.$message.warning('请选择市场!');
				}else if(!this.arg.classification_id){
					this.$message.warning('请选择分类!');
				}else if(!this.arg.fabric){
					this.$message.warning('请输入面料!');
				}else if(!this.arg.size){
					this.$message.warning('请输入尺码!');
				}else if(!this.arg.color){
					this.$message.warning('请输入颜色!');
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

					//拍摄风格参数
					arg.style_imgs = style_imgs.join(';');
					// arg.shooting_style_id = this.shooting_style_ids.join(',');

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
		filters:{
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
			UploadFile,
			TableTitle,
			GoBack
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
	padding: 20rem 240rem;
	display: flex;
	flex-direction: column;
	.card_box{
		padding-top: 15rem;
		display: flex;
		flex-direction: column;
		flex:1;
		.scroll_box{
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