<template>
	<div class="goods_item">
		<div class="image_box" @click="getMoreImage" v-if="info.img != ''">
			<el-popover
			:open-delay="500"
			:close-delay="0"
			placement="right-start"
			trigger="hover"
			>
			<el-image class="popover_image" fit="scale-down" :src="domain + info.img"></el-image>
			<el-image class="goods_img" :src="domain + info.img" slot="reference" fit="scale-down"></el-image>
		</el-popover>
	</div>
	<img class="image_box" src="../static/load_failure.png" @click="getMoreImage" v-else>
	<div class="goods_info" @click="getDetail" @mousedown="mouseDownFn" @mouseup="mouseUpFn">
		<div class="price_cate">
			<div class="price">
				<div class="p_icon">¥</div>
				<div class="p_value">{{info.cost_price}}</div>
			</div>
			<div class="style_row">
				<img class="goods_tag" src="../static/bao_icon.png" v-if="info.hot_style == 1">
				<img class="goods_tag" src="../static/du_icon.png" v-if="info.sole_style == 1">
				<img class="goods_tag" src="../static/tui_tag_icon.png" v-if="info.data_style == 1">
				<img class="goods_tag" src="../static/kai_icon.png" v-if="info.again_style == 1">
				<img class="goods_tag" src="../static/shen_icon.png" v-if="info.depth_inventory == 1">
				<img class="goods_tag" src="../static/shi_icon.png" v-if="info.video_style == 1">
			</div>
			<div class="cate">{{info.style_name}}</div>
		</div>
		<div class="desc">&nbsp{{info.title}}</div>
		<div class="code_time">
			<el-tooltip class="item" effect="dark" placement="top-start">
				<div slot="content">
					{{info.sstyle_name}}
					<div v-if="info.i_id != ''">{{`普通：${info.i_id}`}}</div>
					<div v-if="info.bd_i_id != ''">{{`BD：${info.bd_i_id}`}}</div>
				</div>
				<div class="code">
					<span>{{info.sstyle_name}}</span>
					<span v-if="info.i_id != '' || info.bd_i_id != ''">（</span>
					<span>{{info.i_id != ''?`普通:${info.i_id}`:""}}</span>
					<span>{{info.bd_i_id != ''?`BD:${info.bd_i_id}`:""}}</span>
					<span v-if="info.i_id != '' || info.bd_i_id != ''">）</span>
				</div>
			</el-tooltip>
			<div class="time">{{info.new_time_name}}</div>
		</div>
		<div class="line mt-6"></div>
		<div class="flex jsb mt-6 f12">
			<div class="flex ac">
				<div class="dark">40%毛利：</div>
				<div class="primary_color">¥{{info.price_40}}</div>
			</div>
			<div class="flex ac">
				<div class="dark">50%毛利：</div>
				<div class="primary_color">¥{{info.price_50}}</div>
			</div>
		</div>
		<div class="flex ac mt-6 f12">
				<div class="dark">控价：</div>
				<div class="primary_color">¥{{info.price_control}}</div>
			</div>
		<div class="line mt-6"></div>
		<div class="set_row">
			<div class="button_row">
				<div class="add" @click.stop="addCar(info.cost_price)" v-if="info.in_cart == 0">
					<img class="add_car" src="../static/add_car.png">
					<div>待选</div>
				</div>
				<div class="yjr" v-else @click.stop>已加入</div>
				<div class="xk" :class="{'drak_back':info.cost_price == ''}" @click.stop="selectStyle(info.style_id)">选款</div>
			</div>
			<div class="flex ac">
				<div class="grade_name">{{info.grade_name}}</div>
				<div class="store_name">{{info.supplier_name}}</div>
			</div>
		</div>
		<div class="line mt-6"></div>
		<div class="num_row">
			<div>浏览：{{info.views_num}}</div>
			<div>选中：{{info.select_num}}</div>
			<div>30天销量：{{info.sales_num_all}}</div>
		</div>
		<div class="num_row">
			<div>7天销量：{{info.sales_num_7}}</div>
		</div>
		<div class="line mt-6"></div>
		<div class="img_back">
			<div class="img_list">
				<img class="info_icon" src="../static/tui_icon.png" v-if="info.supply_return_goods == 1">
				<img class="info_icon" src="../static/ru_icon.png" v-if="info.supply_warehousing == 1">
				<img class="info_icon" src="../static/huan_icon.png" v-if="info.supply_exchange_goods == 1">
				<img class="info_icon" src="../static/pai_icon.png" v-if="info.supply_photograph == 1">
				<img class="info_icon" src="../static/dai_icon.png" v-if="info.supply_replace_send == 1">
				<img class="info_icon" src="../static/xian_icon.png" v-if="info.supply_monthly_settlement == 0">
				<img class="info_icon" src="../static/yue_icon.png" v-if="info.supply_monthly_settlement == 1">
			</div>
			<div class="feek_back" @click.stop="feekback_dialog = true">反馈</div>
		</div>
	</div>
	<!-- 选款弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeSelectDialog" destroy-on-close :visible.sync="show_select">
		<div slot="title" class="dialog_title">
			<div>选款</div>
			<img class="close_icon" src="../static/close_icon.png" @click="show_select = false">
		</div>
		<div class="select_content">
			<div class="content_top">
				<div class="top_form">
					<div class="form_item">
						<div class="value">{{info.title}}</div>
					</div>
					<div class="form_item">
						<div class="lable">供应商：</div>
						<div class="value">{{info.supplier_name}}</div>
					</div>
					<div class="form_item" v-if="info.supplier_ksbm != ''">
						<div class="lable">供应商款式编码：</div>
						<div class="value">{{info.supplier_ksbm}}</div>
					</div>
					<div class="form_item" v-if="info.i_id != ''">
						<div class="lable">款式编码：</div>
						<div class="value">{{info.i_id}}</div>
					</div>
					<div class="form_item" v-if="info.bd_i_id != ''">
						<div class="lable">BD款式编码：</div>
						<div class="value">{{info.bd_i_id}}</div>
					</div>
					<div class="form_item">
						<div class="lable">价格：</div>
						<div class="value">{{info.cost_price}}</div>
					</div>
					<div class="form_item">
						<div class="value">{{info.new_time_name}}</div>
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
							<el-select v-model="send_type" size="mini" multiple collapse-tags filterable clearable placeholder="选择发货类型">
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
		<!-- 提示弹窗 -->
		<el-dialog :close-on-click-modal="false" width="35%" :close-on-press-escape="false" :show-close="false" :visible.sync="toast_dialog" append-to-body>
			<div slot="title" class="dialog_title">
				<div>温馨提示</div>
				<img class="close_icon" src="../static/close_icon.png" @click="toast_dialog = false">
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
			<el-button type="primary" size="small" :disabled="disabled" @click="confirmSelect(0)">确认选择</el-button>
		</div>
	</el-dialog>
	<!-- 反馈弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" @close="closeFeekDialog" destroy-on-close :visible.sync="feekback_dialog">
		<div slot="title" class="dialog_title">
			<div>意见反馈</div>
			<img class="close_icon" src="../static/close_icon.png" @click="feekback_dialog = false">
		</div>
		<div class="feekback_content">
			<div class="upload_title"><span>*</span>反馈内容</div>
			<el-input type="textarea" :rows="5" placeholder="请描述哪条描述数据不对，或者缺失，我们尽快调整" v-model="feedback_content">
			</el-input>
			<div class="upload_title">上传截图</div>
			<UploadFile :img_list="feedback_img" :is_multiple="true" :current_num="feedback_img.length" :max_num="5" @callbackFn="uploadFn"/>
			<div class="upload_toast">上传“有效截图”，可以让问题优先被发现哦！最多可以上传5张截图</div>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button size="small" @click="feekback_dialog = false">取消</el-button>
			<el-button type="primary" size="small" @click="confirmFeekBack">提交</el-button>
		</div>
	</el-dialog>
	<!-- 更多图片 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="more_image_dialog">
		<div slot="title" class="dialog_title">
			<div>更多图片</div>
			<img class="close_icon" src="../static/close_icon.png" @click="more_image_dialog = false">
		</div>
		<div class="image_content">
			<div class="tab_row">
				<div class="tab_item" :class="{'active_tab_item':active_tab_index == index}" v-for="(item,index) in image_title_list" @click="active_tab_index = index">
					<div>{{item}}</div>
					<div class="active_line" v-if="active_tab_index == index"></div>
				</div>
			</div>
			<div class="source_url">拍摄风格：
				{{shooting_style_name}}
			</div>
			<div class="source_url">网盘地址：
				<el-button type="text" @click="windowOpen(net_disk_address)">{{or_net_disk_address}}</el-button>
			</div>
			<div class="more_image">
				<el-image :z-index="9009" class="more_image_item" :src="img_url" fit="scale-down" v-for="(img_url,i) in img_arr" :key="i" :preview-src-list="img_arr"></el-image>
			</div>
		</div>
		<div slot="footer" class="dialog_footer">
			<el-button type="primary" size="small" @click="more_image_dialog = false">关闭</el-button>
		</div>
	</el-dialog>
	
</div>
</template>
<style type="text/css">
.popover_image{
	height: 400px!important;
	width: 400px!important;
}
</style>
<style lang="less" scoped>
.goods_item{
	margin-bottom: 20rem;
	border:1px solid #EDEDED;
	width: 265rem;
	cursor:pointer;
	.image_box{
		position: relative;
		width: 263rem;
		height: 263rem;
		display: flex;
		align-items: center;
		justify-content: center;
		.goods_img{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	.goods_info{
		padding: 8rem 10rem;
		.price_cate{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.price{
				display: flex;
				align-items: flex-end;
				color: var(--color);
				font-weight: bold;
				.p_icon{
					position: relative;
					top: -1px;
					font-size:14rem;
				}
				.p_value{
					margin-left: 1rem;
					font-size:18rem;
				}
			}
			.style_row{
				flex: 1;
				display: flex;
				align-items: center;
				.goods_tag{
					width: 22rem;
					height: 22rem;
				}
			}
			.cate{
				font-size: 12rem;
				color: #333333;
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
		.desc{
			margin-top: 6rem;
			font-size:12rem;
			color: #333333;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.code_time{
			margin-top: 6rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size:12rem;
			color: #999999;
			.code{
				flex:1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.time{
				margin-left: 5px;
				white-space:normal;
			}
		}
		.line{
			background:#F0F0F0;
			width: 100%;
			height: 1px;
		}
		.mt-6{
			margin-top: 6px;
		}
		.f12{
			font-size: 12px;
		}
		.dark{
			color: #666666;
		}
		.primary_color{
			color: #F37605;
		}
		.set_row{
			margin-top: 10rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.button_row{
				display: flex;
				align-items: center;
				.add{
					border:1px solid var(--color);
					border-radius: 2rem;
					padding: 0 3rem;
					height: 20rem;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 12rem;
					color: var(--color);
					.add_car{
						margin-right: 4rem;
						width: 12rem;
						height: 12rem;
					}
				}
				.yjr{
					font-size: 12rem;
					color: #999999;
				}
				.xk{
					margin-left: 10rem;
					border-radius: 2rem;
					background: var(--color);
					padding: 0 3rem;
					height: 20rem;
					line-height: 20rem;
					font-size: 12rem;
					color: #ffffff;
				}
				.drak_back{
					background-color: #999999;
				}
			}
			.grade_name{
				font-weight: normal;
				color:#F35005;
				font-size: 12rem;
			}
			.store_name{
				margin-left: 4rem;
				font-size: 12rem;
				color: var(--color);
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
		}
		.num_row{
			margin-top: 10rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12rem;
			color: #999999;
		}
		.img_back{
			margin-top: 10rem;
			display: flex;
			align-items: center;
			.img_list{
				flex:1;
				display: flex;
				.info_icon{
					margin-right: 6rem;
					width: 20rem;
					height: 20rem;
				}
			}
			.feek_back{
				font-size: 12rem;
				color: #37A3FF;
			}
		}
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
.feekback_content{
	padding: 10rem 20rem;
	.upload_title{
		margin-top: 20rem;
		margin-bottom:10rem;
		font-size:14rem;
		color: #333333;
		span{
			color: red;
		}
	}
	.upload_toast{
		margin-top: 10rem;
		font-size:14rem;
		color: #666666;
	}
}
.image_content{
	padding: 10rem 20rem;
	.tab_row{
		margin-bottom: 13rem;
		padding-left: 30rem;
		border-radius:2rem;
		border:1px solid #FFC998;
		background: #FFFCFA;
		width: 100%;
		height: 36rem;
		display: flex;
		.tab_item{
			margin-right: 68rem;
			position: relative;
			height: 36rem;
			display: flex;
			align-items: center;
			font-size:14rem;
			color:#333333;
			.active_line{
				background: #FFC998;
				position: absolute;
				left: 0;
				bottom:3rem;
				width: 100%;
				height: 1px;
			}
		}
		.active_tab_item{
			color: var(--color);
		}
	}
	.source_url{
		margin-bottom: 10rem;
		font-size:14rem;
		color: #333333;
		cursor: initial;
	}
	.more_image{
		display: flex;
		flex-wrap: wrap;
		.more_image_item{
			margin-right: 25rem;
			margin-bottom: 25rem;
			width: 220rem;
			height: 220rem;
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
<script>
	import resource from '../api/resource.js'
	import commonResource from '../api/common_resource.js'

	import QuillEditor from '../components/quill_editor.vue'
	import UploadFile from '../components/upload_file.vue'
	export default{
		data(){
			return{
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
				feekback_dialog:false,	//反馈弹窗
				feedback_content:"",		//反馈文字
				feedback_img:[],		//上传的图片列表
				more_image_dialog:false,		//更多图片
				image_title_list:['风格'],	//更多图片类型
				active_tab_index:0,		//选中的下标
				img_arr:[],				//风格图图片列表
				net_disk_address:"",	//网盘地址（跳转）
				or_net_disk_address:"",	//显示地址
				shooting_style_name:"",
				commodity_data:[],		//封面图数据
				commodity_url:"",		//封面图网盘地址(显示)
				commodity_open_url:"",	//封面图网盘地址（可跳转）
				firstTime: '', 			// mousedown的时间戳
				lastTime: '', 			// mouseup的时间戳
				isClick: false, 		// false--禁止点击，true--可点击
				is_loading:false,		//是否正在提交（防止重复点击）
				toast_dialog:false,		//有提交过的提示
				toast_content:"",		//提示内容
				type:0,					//0:提示；1:不提示
			}
		},
		props:{
			//单个商品
			info:{
				type:Object,
				default:{}
			}
		},
		watch:{
			active_tab_index:function(n,o){
				if(n == 0){
					//获取风格图
					this.getMoreImage();
				}else{
					//获取封面图
					this.moreImgCommodity();
				}
			},
			//切换24小时内不提示
			type:function(n,o){
				this.checkToast(n);
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
		methods:{
			mouseDownFn () {
				this.firstTime = new Date().getTime();
			},
			mouseUpFn () {
				this.lastTime = new Date().getTime();
				if((this.lastTime - this.firstTime) < 200){
					this.isClick = true
				} else {
					this.isClick = false
				}
			},
			//点击选款
			selectStyle(style_id){
				if(this.info.cost_price != ''){
					//获取选款轮播图
					this.chooseBeforGetImg(style_id);
					//获取店铺列表
					this.ajaxViewShop();
					//获取所有需求/发货类型
					this.getAllDemandSendType();
					this.show_select = true;
				}else{
					this.$message.warning('该商品没有成本价,不能选款!')
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
						style_id:this.info.style_id,
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
			chooseBeforGetImg(style_id){
				let arg = {
					style_id:style_id
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
				commonResource.getAllDemandSendType({style_id:this.info.style_id}).then(res => {
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
			//获取风格图
			getMoreImage(){
				let arg = {
					style_id:this.info.style_id
				}
				resource.moreImgStyle(arg).then(res => {
					if(res.data.code == 1){
						let style_data = res.data.data;
						let img_arr = [];
						style_data.img.map(item => {
							img_arr.push(this.domain + item)
						})
						this.img_arr = img_arr;
						this.net_disk_address = style_data.net_disk_address;	//网盘地址（跳转）
						this.or_net_disk_address = style_data.or_net_disk_address;	//显示地址
						this.shooting_style_name = style_data.shooting_style_name;
						this.more_image_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})		
			},
			//获取封面图
			moreImgCommodity(){
				let arg = {
					style_id:this.info.style_id
				}
				resource.moreImgCommodity(arg).then(res => {
					if(res.data.code == 1){
						let commodity_data = res.data.data.img;
						let img_arr = [];
						commodity_data.map(item => {
							img_arr.push(this.domain + item);
						})
						this.commodity_data = img_arr;
						this.commodity_url = res.data.data.or_net_disk_address;
						this.commodity_open_url = res.data.data.net_disk_address;
						this.more_image_dialog = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击加入购物车
			addCar(cost_price){
				if(cost_price == ''){
					this.$message.warning('该商品没有成本价，不能加入待选！')
					return;
				}
				let arg = {
					style_id:this.info.style_id
				}
				resource.addSelectCart(arg).then(res => {
					if(res){
						this.$message.success(res.data.msg);
						this.$emit('setStatus',this.info.style_id)
						let arg = {
							type:'add',
							num:1
						}
						this.$store.commit('setCarGoods',arg);
					}
				})
			},
			//监听富文本编辑器内容变化
			getEditor(v){
				this.remark = v;
			},
			//关闭选款弹窗
			closeSelectDialog(){
				this.demand_date = "";			//需求日期
				this.selling_price = "";		//售卖价格
				this.remark = "";				//备注
				this.banner_list = [];			//选款弹窗的轮播图
				this.active_index = 0;			//当前显示的图片下标
			},
			//上传图片回调
			uploadFn(v) {
				this.feedback_img = v;
			},
			//提交反馈
			confirmFeekBack(){
				if(this.feedback_content == ''){
					this.$message.warning('请输入反馈内容!');
				}else{
					let arg = {
						style_id:this.info.style_id,
						feedback_content:this.feedback_content,
						feedback_img:this.feedback_img.join(',')
					}
					resource.confirmFeekBack(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.feekback_dialog = false;
							this.$emit('callback');
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//关闭反馈弹窗
			closeFeekDialog(){
				this.feedback_content = "";		//反馈文字
				this.feedback_img = [];	//上传的图片列表
			},
    		//点击跳转详情
    		getDetail(){
    			if(!this.isClick) return;
    			let active_path = `/goods_detail?style_id=${this.info.style_id}`;
    			const routeData = this.$router.resolve(active_path);
    			window.open(routeData.href);
    		},
    		//点击查看网盘
    		windowOpen(url){
    			if(!this.or_net_disk_address || this.or_net_disk_address.indexOf('https://pan.baidu.com') == -1){
    				this.$message.warning('该地址不是网盘地址格式!')
    			}else{
    				window.open(url)
    			}
    			
    		}
    	},
    	components:{
    		QuillEditor,
    		UploadFile
    	}
    }
</script>







