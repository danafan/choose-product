<template>
	<div class="goods_info">
		<div class="goods_name">{{goods_info.title}}</div>
		<div class="info_content" :class="{'delist_info_content':goods_info.check_status == 5}">
			<div class="season_box flex ac jc" v-if="goods_info.season_name">
				<div class="season_small_box flex ac jc">
					{{goods_info.season_name}}
				</div>
			</div>
			<div class="content_row">
				<div class="row_lable">成本价</div>
				<div class="row_price flex" :class="{'delist_price':goods_info.check_status == 5}">
					<div class="price_tag">¥</div>
					<div class="price_value">{{goods_info.cost_price}}</div>
				</div>
			</div>
			<div class="content_row">
				<div class="row_lable">档口批价</div>
				<div class="row_value">{{goods_info.wholesale_price}}</div>
			</div>
			<div class="content_row">
				<div class="row_lable">供应商款式编码</div>
				<div class="row_value">{{goods_info.supplier_ksbm}}</div>
			</div>
			<div class="content_row">
				<div class="row_lable">内部款式编码</div>
				<div class="row_value">{{goods_info.i_id}}</div>
			</div>
			<div class="content_row">
				<div class="row_lable">BD款式编码</div>
				<div class="row_value">{{goods_info.bd_i_id}}</div>
			</div>
			<div class="ek_content">
				<div class="row_lable mb13">二开品牌款式编码</div>
				<div class="ek_value flex fc jsb" :class="{'delist_ek_value':goods_info.check_status == 5}">
					<div class="flex">
						<div class="ek_row_lable space-nowrap">海澜</div>
						<div class="row_value pre-line">{{goods_info.hl_ksbm}}</div>
					</div>
					<div class="flex">
						<div class="ek_row_lable space-nowrap">JEEP</div>
						<div class="row_value pre-line">{{goods_info.jeep_ksbm}}</div>
					</div>
				</div>
			</div>
			<div class="content_row">
				<div class="row_lable">供应商款号</div>
				<div class="row_value">{{goods_info.style_name}}</div>
			</div>
			<div class="content_row">
				<div class="row_lable space-nowrap">替代款款号</div>
				<div class="flex-1 pre_wrap">
					<span class="row_value" :class="{'link':item.style_id > 0}" @click="getDetail(item.style_id)" v-for="(item,index) in goods_info.replace_ksbm_data">{{item.ksbm}}<span v-if="index < goods_info.replace_ksbm_data.length - 1">，</span>
				</span>
			</div>
		</div>
		<div class="content_row">
			<div class="row_lable">类目</div>
			<div class="row_value">{{goods_info.category_name}}</div>
		</div>
		<div class="content_row">
			<div class="row_lable">分类</div>
			<div class="row_value">{{goods_info.classification_name}}</div>
		</div>
		<div class="content_row">
			<div class="row_lable">颜色</div>
			<div class="row_value">{{goods_info.color}}</div>
		</div>
		<div class="content_row">
			<div class="row_lable">尺码</div>
			<div class="row_value">{{goods_info.size}}</div>
		</div>
		<div class="content_row">
			<div class="row_lable">面料</div>
			<div class="row_value">{{goods_info.fabric}}</div>
		</div>
		<div class="content_row">
			<div class="row_lable">网盘地址</div>
			<div class="flex-1 link" :class="{'delist_link':goods_info.check_status == 5}" @click="windowOpen(goods_info.net_disk_address)">{{goods_info.or_net_disk_address}}</div>
		</div>
		<div class="content_row">
			<div class="row_lable">备注</div>
			<div class="row_value">{{goods_info.remark}}</div>
		</div>
	</div>
	<div class="button_row">
		<div class="button_item add" :class="{'delist_add':goods_info.check_status == 5}" @click="addCar">
			<img class="add_car" src="../../../static/delist_add_car.png" v-if="goods_info.check_status == 5">
			<img class="add_car" src="../../../static/add_car.png" v-else>
			<div>加入选中</div>
		</div>
		<div class="button_item select" :class="{'drak_back':goods_info.cost_price == '' || goods_info.check_status == 5}" @click="selectStyle">
			<div>立即选款</div>
		</div>
	</div>
	<!-- 选款弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeDialog" destroy-on-close :visible.sync="show_select">
		<div slot="title" class="dialog_title">
			<div>选款</div>
			<img class="close_icon" src="../../../static/close_icon.png" @click="show_select = false">
		</div>
		<div class="select_content">
			<div class="content_top">
				<div class="top_form">
					<div class="form_item">
						<div class="value">{{goods_info.title}}</div>
					</div>
					<div class="form_item">
						<div class="lable">供应商：</div>
						<div class="value">{{goods_info.supplier_name}}</div>
					</div>
					<div class="form_item">
						<div class="lable">款号：</div>
						<div class="value">{{goods_info.style_name}}</div>
					</div>
					<div class="form_item">
						<div class="lable">价格：</div>
						<div class="value">{{goods_info.cost_price}}</div>
					</div>
					<div class="form_item">
						<div class="value">{{goods_info.new_time_name}}</div>
					</div>
					<div class="form_item">
						<div class="lable"><span>*</span>店铺：</div>
						<div class="value">
							<el-select v-model="shop_code" size="mini" multiple collapse-tags filterable clearable placeholder="选择店铺">
								<el-option v-for="item in store_list" :key="item.shop_code" :label="item.shop_name" :value="item.shop_code">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="form_item">
						<div class="lable"><span>*</span>需求类型：</div>
						<div class="value">
							<el-checkbox-group size="mini" v-model="demand_type">
								<el-checkbox :label="item.name" v-for="item in need_type">{{item.name}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</div>
					<div class="form_item">
						<div class="lable"><span>*</span>发货类型：</div>
						<div class="value">
							<el-select v-model="send_type" size="mini"  multiple collapse-tags filterable clearable placeholder="选择发货类型">
								<el-option v-for="item in delivery_type_list" :key="item.name" :label="item.name" :value="item.name">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="form_item">
						<div class="lable">需求日期：</div>
						<div class="value">
							<el-date-picker size="mini" v-model="demand_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</div>
					</div>
					<div class="form_item">
						<div class="lable">售卖价格：</div>
						<div class="value">
							<el-input size="mini" type="number" clearable v-model="selling_price" placeholder="请输入售卖价格"></el-input>
						</div>
					</div>
				</div>
				<div class="banner">
					<el-carousel indicator-position="none" arrow="never" @change="changeImage" ref="cardShow" class="el-carousel-container">
						<el-carousel-item v-for="item in banner_list" :key="item">
							<el-image :z-index="9999" class="image" :src="item" fit="scale-down" :preview-src-list="banner_list"></el-image>
						</el-carousel-item>
					</el-carousel>
					<div class="indicator_box">
						<div class="indicator" :class="{'is_active':active_index == index}" v-for="(item,index) in banner_list" @mouseenter="checkIndex(index)"></div>
					</div>
				</div>
			</div>
			<QuillEditor @callback="getEditor"/>
		</div>
		<!-- 提示弹窗 -->
		<el-dialog :close-on-click-modal="false" width="35%" :close-on-press-escape="false" :show-close="false" :visible.sync="toast_dialog" append-to-body>
			<div slot="title" class="dialog_title">
				<div>温馨提示</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="toast_dialog = false">
			</div>
			<div class="toast_content">
				<div class="toast_text">{{toast_content}}</div>
				<el-checkbox :true-label="1" :false-label="0" v-model="type">24小时内不再提示</el-checkbox>
			</div>
			<div slot="footer" class="dialog_footer">
				<el-button size="small" @click="toast_dialog = false">取消</el-button>
				<el-button type="primary" size="small" @click="confirmSelect(1)">继续选择</el-button>
			</div>
		</el-dialog>
		<div slot="footer" class="dialog_footer">
			<el-button type="primary" :disabled="disabled" size="small" @click="confirmSelect(0)">确认选择</el-button>
		</div>
	</el-dialog>
</div>
</template>
<script>
	import QuillEditor from '../../../components/quill_editor.vue'

	import resource from '../../../api/resource.js'
	import commonResource from '../../../api/common_resource.js'
	export default{
		data(){
			return{
				hl_ksbm:"",
				jeep_ksbm:"",				
				show_select:false,		//选款弹窗
				store_list:[],			//店铺列表
				shop_code:[],			//选中的店铺
				need_type:[],			//需求类型列表
				demand_type:[],			//选中的需求类型
				delivery_type_list:[],	//发货类型列表
				send_type:[],			//选中的发货类型
				demand_date:"",			//需求日期
				selling_price:"",		//售卖价格
				remark:"",				//备注
				banner_list:[],			//选款弹窗的轮播图
				active_index:0,			//当前显示的图片下标
				is_loading:false,
				toast_dialog:false,		//有提交过的提示
				toast_content:"",		//提示内容
				type:0,					//0:提示；1:不提示
			}
		},
		props:{	
			//商品信息
			goods_info:{
				type:Object,
			default:{}
			},
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			},
			//确认选择按钮是否可点击
			disabled(){
				return this.shop_code.length == 0 || this.demand_type.length == 0 || this.send_type.length == 0 || this.is_loading;
			}
		},
		watch:{
			//切换24小时内不提示
			type:function(n,o){
				this.checkToast(n);
			},
		},
		methods:{
			//监听选款弹窗关闭
			closeDialog(){
				this.shop_code = [];
				this.demand_type = [];
				this.send_type = [];
				this.demand_date = "";
				this.selling_price = "";
				this.remark = "";
			},	
			//点击选款
			selectStyle(){
				if(this.goods_info.cost_price != '' && this.goods_info.check_status != 5){
					//获取选款轮播图
					this.chooseBeforGetImg();
					//获取店铺列表
					this.ajaxViewShop();
					//获取所有需求/发货类型
					this.getAllDemandSendType();
					this.show_select = true;
				}else{
					if(this.goods_info.cost_price == ''){
						this.$message.warning('该商品没有成本价,不能选款!')
					}else{
						this.$message.warning('该商品已下架,不能选款!')
					}
				}
			},
			//缓存选款的店铺、需求类型、发货类型参数
			changeSelectForm(){	
				let form = {
					shop_code:this.shop_code,
					demand_type:this.demand_type,
					send_type:this.send_type
				}
				sessionStorage.setItem("selectedForm",JSON.stringify(form))
			},
			//提交选款
			confirmSelect(go_on){
				if(this.shop_code.length == 0){
					this.$message.warning('请选择店铺!');
				}else if(this.demand_type.length == 0){
					this.$message.warning('请选择需求类型!');
				}else if(this.send_type.length == 0){
					this.$message.warning('请选择发货类型!');
				}else if(this.selling_price < 0){
					this.$message.warning('售卖价格应大于0!');
				}else{
					var shop_code_arr = [];
					var shop_name_arr = [];
					this.shop_code.map(item => {
						this.store_list.map(i => {
							if(item == i.shop_code){
								shop_code_arr.push(i.shop_code);
								shop_name_arr.push(i.shop_name);
							}
						})
					})
					let arg = {
						style_id:this.goods_info.style_id,
						shop_code:shop_code_arr.join(','),
						shop_name:shop_name_arr.join(','),
						demand_type:this.demand_type.join(','),
						send_type:this.send_type.join(','),
						demand_date:this.demand_date?this.demand_date:"",
						selling_price:this.selling_price,
						remark:this.remark,
						go_on:go_on
					}
					this.is_loading = true;
					resource.chooseGoods(arg).then(res => {
						this.is_loading = false;
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_select = false;
							this.toast_dialog = false;
							this.changeSelectForm();
							this.$emit('callback');
						}else if(res.data.code == 5){
							this.toast_content = res.data.msg;
							this.toast_dialog = true;
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//切换24小时内不提示
			checkToast(type){
				resource.twoFourTitle({type:type}).then(res => {
					if(res.data.code != 1){
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取选款轮播图
			chooseBeforGetImg(){
				let arg = {
					style_id:this.goods_info.style_id
				}
				resource.chooseBeforGetImg(arg).then(res => {
					if(res.data.code == 1){
						let img_arr = res.data.data.img;
						let banner_list = [];
						img_arr.map(item => {
							banner_list.push(this.domain + item);
						})
						this.banner_list = banner_list;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取店铺列表
			ajaxViewShop(){
				let arg = {
					type:3,
				}
				commonResource.ajaxViewShop(arg).then(res => {
					if(res.data.code == 1){
						this.store_list = res.data.data;
						let selectedForm = sessionStorage.getItem("selectedForm");
						if(selectedForm){
							let new_selected_form = JSON.parse(sessionStorage.getItem("selectedForm"));
							this.shop_code = [];
							new_selected_form.shop_code.map(item => {
								let arr = this.store_list.filter(i => {
									return i.shop_code == item;
								})
								if(arr.length > 0){
									this.shop_code.push(arr[0].shop_code)
								}
							})
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取所有需求/发货类型
			getAllDemandSendType(){
				commonResource.getAllDemandSendType({style_id:this.goods_info.style_id}).then(res => {
					if(res.data.code == 1){
						let data = res.data.data;
						//需求类型
						this.need_type = data.filter(item => {
							return item.type == 1;
						})
						//发货类型
						this.delivery_type_list = data.filter(item => {
							return item.type == 2;
						})
						
						this.demand_type = [];
						this.send_type = [];

						let selectedForm = sessionStorage.getItem("selectedForm");
						if(selectedForm){
							let new_selected_form = JSON.parse(sessionStorage.getItem("selectedForm"));

							new_selected_form.demand_type.map(item => {
								let arr = this.need_type.filter(i => {
									return i.name == item;
								})
								if(arr.length > 0){
									this.demand_type.push(arr[0].name)
								}
							})

							if(this.delivery_type_list.length == 1){
								this.send_type.push(this.delivery_type_list[0].name);
							} else {
								new_selected_form.send_type.map(item => {
									let arr = this.delivery_type_list.filter(i => {
										return i.name == item;
									})
									if(arr.length > 0){
										this.send_type.push(arr[0].name)
									}
								})
							}
							
						}else{
							if(this.delivery_type_list.length == 1){
								this.send_type.push(this.delivery_type_list[0].name);
							} 
						}
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//幻灯片自动切换事件
			changeImage(e){
				this.active_index = e;
			},
			//鼠标移入指示器切换当前显示图片
			checkIndex(index){
				this.$refs.cardShow.setActiveItem(index);
			},
			//监听富文本编辑器内容变化
			getEditor(v){
				this.remark = v;
			},
			//点击加入购物车
			addCar(){
				if(this.goods_info.cost_price != '' && this.goods_info.check_status != 5){
					let arg = {
						style_id:this.goods_info.style_id
					}
					resource.addSelectCart(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							let arg = {
								type:'add',
								num:1
							}
							this.$store.commit('setCarGoods',arg);
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}else{
					if(this.goods_info.cost_price == ''){
						this.$message.warning('该商品没有成本价,不能加入待选!')
					}else{
						this.$message.warning('该商品已下架,不能加入待选!')
					}
				}
			},
			windowOpen(url){
				if(!this.goods_info.or_net_disk_address || this.goods_info.or_net_disk_address.indexOf('https://pan.baidu.com') == -1){
					this.$message.warning('该地址不是网盘地址格式!')
				}else{
					window.open(url)
				}
			},
			//点击替换款号跳转详情
			getDetail(style_id){
				if(style_id > 0){
					let active_path = `/goods_detail?style_id=${style_id}`;
					const routeData = this.$router.resolve(active_path);
					window.open(routeData.href);
				}
			}
		},
		components:{
			QuillEditor
		}
	}
</script>
<style type="text/css">
	.el-carousel-container .el-carousel__container{
		width: 208px!important;
		height: 222px!important;
	}
</style>
<style lang="less" scoped>
	.goods_info{
		width: 512rem;
		display: flex;
		flex-direction: column;
		.goods_name{
			padding-bottom: 20rem;
			font-size: 16rem;
			color: #333333;
			font-weight: bold;
		}
		.info_content{
			position: relative;
			flex:1;
			padding: 10rem 20rem;
			background: #FFF8F2;
			.season_box{
				position: absolute;
				top: 10rem;
				right: 10rem;
				min-width: 48rem;
				height: 30rem;
				padding: 2rem;
				border-radius: 6px;
				border: 1px solid #FF7900;
				.season_small_box{
					font-family: Ma;
					color: var(--color);
					font-size: 18rem;
					font-weight: bold;
					width: 100%;
					padding-left: 4px;
					padding-right: 4px;
					border-radius: 4px;
					border: 1px solid #FF7900;
				}
			}
			.content_row{
				margin-bottom: 13rem;
				display: flex;
				align-items:center;
				.row_price{
					color: var(--color);
					.price_tag{
						position: relative;
						margin-right: 3rem;
						top: 5rem;
						font-size:20rem;
					}
					.price_value{
						font-size:26rem;
						font-weight:bold;
					}
				}
				.delist_price{
					color: #494744;
				}
				.link{
					font-size: 12px;
					cursor: pointer;
					padding-top: 0;
					white-space:pre-wrap;
					word-wrap: break-word;
					word-break: normal;
					line-height: 16px;
					color: #f37605;
				}
				.delist_link{
					color: #333333;
				}
			}
			.mb13{
				margin-bottom: 13rem;
			}
			.row_lable{
				width: 155rem;
				font-size:12rem;
				color: #666666;
			}
			.ek_value{
				width: 294rem;
				overflow-y: scroll;
				padding: 12rem;
				margin-bottom: 13rem;
				height: 63rem;
				background: #FFF6EE;
				border: 1px solid #FFDFC1;
			}
			.ek_value::-webkit-scrollbar{display:none}
			.delist_ek_value{
				background: #F2F2F2;
				border: 1px solid #CCCCCC;
			}
			.ek_row_lable{
				width: 143rem;
				font-size:12rem;
				color: #666666;
			}
			.row_value{
				flex:1;
				font-size:12rem;
				color: #333333;
			}
		}
		.delist_info_content{
			background: #F6F6F6;
		}
		.button_row{
			position: relative;
			height: 88rem;
			display: flex;
			align-items: center;
			justify-content:center;
			.button_item{
				border:1px solid var(--color);
				border-radius: 4rem;
				width: 184rem;
				height: 42rem;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size:12rem;
				cursor:pointer;
				.add_car{
					margin-right: 8rem;
					width: 14rem;
					height: 14rem;
				}
			}
			.add{
				margin-right: 22rem;
				background: #FEEDDD;
				color: var(--color);
			}
			.delist_add{
				border: 1px solid #494744;
				cursor: not-allowed;
				background: #CDCDCD;
				color: #494744;
			}
			.select{
				background: var(--color);
				color: #ffffff;
			}
			.drak_back{
				cursor: not-allowed;
				border:1px solid #494744;
				background-color: #494744;
			}
		}
		.select_content{
			padding: 18rem;
			.content_top{
				display: flex;
				.top_form{
					flex:1;
					.form_item{
						display: flex;
						align-items: center;
						margin-bottom:12rem;
						font-size:14rem;
						.lable{
							color: #666666;
							span{
								color: red;
							}
						}
						.value{
							color: #333333;
							font-weight: 500;
						}
					}
				}
				.banner{
					border:1px solid #D9D9D9;
					padding: 10rem 10rem 0 10rem;
					width: 222px;
					height: 252px;
					display: flex;
					flex-direction: column;
					.image img{
						width: 192px;
						height: 172px;
					}
					.indicator_box{
						flex:1;
						display: flex;
						align-items: center;
						justify-content: space-evenly;
						.indicator{
							border: 1px solid #979797;
							background: #D8D8D8;
							border-radius: 50%;
							width: 8px;
							height: 8px;
						}
						.is_active{
							border: 1px solid var(--color);
							background: var(--color);
						}
					}
				}
			}
		}

	}
	.toast_content{
		padding: 10rem 20rem;
		.toast_text{
			margin-bottom: 15rem;
		}
	}
</style>