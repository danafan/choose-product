<template>
	<div class="goods_info">
		<div class="goods_name">{{goods_info.title}}</div>
		<div class="info_content">
			<div class="content_row">
				<div class="row_lable">成本价</div>
				<div class="row_price">¥{{goods_info.cost_price}}</div>
			</div>
			<div class="content_row">
				<div class="row_lable">款式编码</div>
				<div class="row_value">{{goods_info.i_id}}</div>
			</div>
			<div class="content_row">
				<div class="row_lable">款号</div>
				<div class="row_value">{{goods_info.style_name}}</div>
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
		</div>
		<div class="button_row">
			<div class="button_item add" @click="addCar">
				<img class="add_car" src="../../../static/add_car.png">
				<div>加入选中</div>
			</div>
			<div class="button_item select" @click="selectStyle">
				<div>立即选款</div>
			</div>
		</div>
		<!-- 选款弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeDialog" :visible.sync="show_select">
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
								<el-select v-model="shop_code" size="mini" clearable placeholder="选择店铺">
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
								<el-select v-model="send_type" size="mini" clearable placeholder="选择发货类型">
									<el-option v-for="item in delivery_type_list" :key="item.name" :label="item.name" :value="item.name">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="form_item">
							<div class="lable"><span>*</span>需求日期：</div>
							<div class="value">
								<el-date-picker size="mini" v-model="demand_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
								</el-date-picker>
							</div>
						</div>
						<div class="form_item">
							<div class="lable"><span>*</span>售卖价格：</div>
							<div class="value">
								<el-input size="mini" type="number" clearable v-model="selling_price" placeholder="请输入售卖价格"></el-input>
							</div>
						</div>
					</div>
					<div class="banner">
						<el-carousel indicator-position="none" arrow="never" @change="changeImage" ref="cardShow">
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
			<div slot="footer" class="dialog_footer">
				<el-button type="primary" size="small" @click="confirmSelect">确认选择</el-button>
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
				show_select:false,		//选款弹窗
				store_list:[],			//店铺列表
				shop_code:"",			//选中的店铺
				need_type:[],			//需求类型列表
				demand_type:[],			//选中的需求类型
				delivery_type_list:[],	//发货类型列表
				send_type:"",			//选中的发货类型
				demand_date:"",			//需求日期
				selling_price:"",		//售卖价格
				remark:"",				//备注
				banner_list:[],			//选款弹窗的轮播图
				active_index:0,			//当前显示的图片下标
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
			}
		},
		methods:{
			//监听选款弹窗关闭
			closeDialog(){
				this.shop_code = "";
				this.demand_type = [];
				this.send_type = "";
				this.demand_date = "";
				this.selling_price = "";
				this.remark = "";
			},	
			//点击选款
			selectStyle(){
				//获取选款轮播图
				this.chooseBeforGetImg();
				//获取店铺列表
				this.ajaxViewShop();
				//获取所有需求/发货类型
				this.getAllDemandSendType();
				this.show_select = true;
			},
			//提交选款
			confirmSelect(){
				if(this.shop_code == ''){
					this.$message.warning('请选择店铺!');
				}else if(this.demand_type.length == 0){
					this.$message.warning('请选择需求类型!');
				}else if(this.send_type == ''){
					this.$message.warning('请选择发货类型!');
				}else if(this.demand_date == ''){
					this.$message.warning('请选择需求时间!');
				}else if(this.selling_price == ''){
					this.$message.warning('请输入售卖价格!');
				}else{
					let shop_arr = this.store_list.filter(item => {
						return item.shop_code == this.shop_code;
					})
					let arg = {
						style_id:this.goods_info.style_id,
						shop_code:this.shop_code,
						shop_name:shop_arr[0].shop_name,
						demand_type:this.demand_type.join(','),
						send_type:this.send_type,
						demand_date:this.demand_date,
						selling_price:this.selling_price,
						remark:this.remark
					}
					resource.chooseGoods(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.show_select = false;
							this.$emit('callback');
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
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
					type:1,
				}
				commonResource.ajaxViewShop(arg).then(res => {
					if(res.data.code == 1){
						this.store_list = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//获取所有需求/发货类型
			getAllDemandSendType(){
				commonResource.getAllDemandSendType().then(res => {
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
			},
			
		},
		components:{
			QuillEditor
		}
	}
</script>
<style lang="less" scoped>
.goods_info{
	width: 512rem;
	height: 546rem;
	display: flex;
	flex-direction: column;
	.goods_name{
		padding-top: 20rem;
		padding-bottom: 20rem;
		font-size: 16rem;
		color: #333333;
		font-weight: 500;
	}
	.info_content{
		flex:1;
		padding: 10rem 20rem;
		background: #FFF8F2;
		.content_row{
			margin-bottom: 16rem;
			display: flex;
			align-items: center;
			.row_lable{
				width: 100rem;
				font-size:12rem;
				color: #666666;
			}
			.row_price{
				color: var(--color);
				font-size:24rem;
				font-weight: 500;
			}
			.row_value{
				flex:1;
				font-size:12rem;
				color: #333333;
			}
		}
	}
	.button_row{
		height: 88rem;
		display: flex;
		align-items: center;
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
		.select{
			background: var(--color);
			color: #ffffff;
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
				padding: 10rem;
				width: 260rem;
				height: 290rem;
				display: flex;
				flex-direction: column;
				.image{
					width: 240rem;
					height: 240rem;
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
						width: 16rem;
						height: 16rem;
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
</style>