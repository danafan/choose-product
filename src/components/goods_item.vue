<template>
	<div class="goods_item">
		<div class="image_box">
			<el-popover
			placement="right-start"
			width="450"
			trigger="hover">
			<img style="width: 100%" fit="contain" src="http://img.92nu.com/DataCenter_202208311330183144.jpg"/>
			<img class="goods_image" src="../static/user_img.png" slot="reference" @click="more_image_dialog = true"/>
		</el-popover>
		<img class="goods_tag" src="../static/bao_icon.png">
	</div>
	<div class="goods_info" @click="getDetail">
		<div class="price_cate">
			<div class="price">
				<div class="p_icon">¥</div>
				<div class="p_value">{{info.price}}</div>
			</div>
			<div class="cate">日系、平铺</div>
		</div>
		<div class="desc">这是描述这是描述这是描述这是描述这是描述这是描述</div>
		<div class="code_time">
			<div class="code">asdhkjasdasdhkjasd</div>
			<div class="time">2022-09-09 19:09</div>
		</div>
		<div class="set_row">
			<div class="button_row">
				<div class="add" @click.stop="addCar">
					<img class="add_car" src="../static/add_car.png">
					<div>待选</div>
				</div>
				<div class="xk" @click.stop="show_select = true">选款</div>
			</div>
			<div class="store_name">聚合服饰聚合服饰聚合服饰聚合服饰聚合服饰</div>
		</div>
		<div class="num_row">
			<div>浏览：3354</div>
			<div>选中：3354</div>
			<div>销量：3354</div>
		</div>
		<div class="img_back">
			<div class="img_list">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
				<img class="info_icon" src="../static/pai_icon.png">
			</div>
			<div class="feek_back" @click.stop="feekBack">反馈</div>
		</div>
	</div>
	<!-- 选款弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="show_select">
		<div slot="title" class="dialog_title">
			<div>选款</div>
			<img class="close_icon" src="../static/close_icon.png" @click="show_select = false">
		</div>
		<div class="select_content">
			<div class="content_top">
				<div class="top_form">
					<div class="form_item">
						<div class="value">情侣装秋装开衫连帽卫衣学生宽松</div>
					</div>
					<div class="form_item">
						<div class="lable">供应商：</div>
						<div class="value">123908</div>
					</div>
					<div class="form_item">
						<div class="lable">款号：</div>
						<div class="value">123908</div>
					</div>
					<div class="form_item">
						<div class="lable">价格：</div>
						<div class="value">56</div>
					</div>
					<div class="form_item">
						<div class="value">2021-09-08 18:00</div>
					</div>
					<div class="form_item">
						<div class="lable">店铺：</div>
						<div class="value">
							<el-select v-model="store_ids" size="mini" clearable placeholder="选择店铺">
								<el-option v-for="item in store_list" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="form_item">
						<div class="lable">需求类型：</div>
						<div class="value">
							<el-radio-group size="mini" v-model="need_type_id">
								<el-radio :label="item.id" v-for="item in need_type">{{item.name}}</el-radio>
							</el-radio-group>
						</div>
					</div>
					<div class="form_item">
						<div class="lable">发货类型：</div>
						<div class="value">
							<el-select v-model="delivery_type_ids" size="mini" clearable placeholder="选择发货类型">
								<el-option v-for="item in delivery_type_list" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="form_item">
						<div class="lable">需求日期：</div>
						<div class="value">
							<el-date-picker size="mini" v-model="date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
							</el-date-picker>
						</div>
					</div>
					<div class="form_item">
						<div class="lable">售卖价格：</div>
						<div class="value">
							<el-input size="mini" clearable v-model="price" placeholder="请输入售卖价格"></el-input>
						</div>
					</div>
				</div>
				<div class="banner">
					<el-carousel indicator-position="none" arrow="never" @change="changeImage" ref="cardShow">
						<el-carousel-item v-for="item in banner_list" :key="item">
							<el-image :z-index="2006" class="image" :src="item" fit="contain" :preview-src-list="banner_list"></el-image>
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
			<el-button type="primary" size="small" @click="show_select = false">确认选择</el-button>
		</div>
	</el-dialog>
	<!-- 反馈弹窗 -->
	<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="feekback_dialog">
		<div slot="title" class="dialog_title">
			<div>意见反馈</div>
			<img class="close_icon" src="../static/close_icon.png" @click="feekback_dialog = false">
		</div>
		<div class="feekback_content">
			<el-input type="textarea" :rows="5" placeholder="请描述哪条描述数据不对，或者缺失，我们尽快调整" v-model="feekback_value">
			</el-input>
			<div class="upload_title">上传截图</div>
			<div class="image_list">
				<div class="view_card_img" @mouseenter="item.show_icon = true" @mouseleave="item.show_icon = false"
				v-for="(item,index) in preview_images" :key="index">
				<el-image class="card_img" :src="item.domain + item.urls" fit="contain"></el-image>
				<div class="delete_img" v-if="item.show_icon == true">
					<img class="delete_icon" src="../static/delete_icon.png" @click="deleteFile(item.urls,index)">
				</div>
			</div>
			<UploadFile :is_multiple="true" :current_num="preview_images.length" :max_num="5" @callbackFn="callbackFn"
			v-if="preview_images.length < 5" />
		</div>
		<div class="upload_toast">上传“有效截图”，可以让问题优先被发现哦！最多可以上传5张截图</div>
	</div>
	<div slot="footer" class="dialog_footer">
		<el-button size="small" @click="feekback_dialog = false">取消</el-button>
		<el-button type="primary" size="small" @click="feekback_dialog = false">提交</el-button>
	</div>
</el-dialog>
<!-- 更多图片 -->
<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="more_image_dialog">
	<div slot="title" class="dialog_title">
		<div>更多图片</div>
		<img class="close_icon" src="../static/close_icon.png" @click="more_image_dialog = false">
	</div>
	<div class="image_content">
		<div class="tab_row">
			<div class="tab_item" :class="{'active_tab_item':active_tab_index == index}" v-for="(item,index) in image_title_list" @click="active_tab_index = index">
				<div>风格图</div>
				<div class="active_line" v-if="active_tab_index == index"></div>
			</div>
		</div>
		<div class="source_url">共享盘地址：共享盘地址：www.huapen.con</div>
		<div class="source_url">网盘地址：共享盘地址：www.huapen.con</div>
		<div class="more_image">
			<el-image :z-index="2006" class="more_image_item" :src="item" fit="contain" v-for="item in banner_list" :preview-src-list="banner_list"></el-image>
		</div>
	</div>
	<div slot="footer" class="dialog_footer">
		<el-button type="primary" size="small" @click="more_image_dialog = false">关闭</el-button>
	</div>
</el-dialog>
</div>
</template>
<style type="text/css">
.el-carousel__container{
	width: 240rem !important;
	height: 240rem !important; 
}
</style>
<style lang="less" scoped>
.goods_item{
	margin-bottom: 20rem;
	border:1px solid #EDEDED;
	width: 265rem;
	height: 436rem;
	.image_box{
		position: relative;
		width: 263rem;
		height: 263rem;
		.goods_image{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		.goods_tag{
			position: absolute;
			top: 0;
			right: 0;
			width: 44rem;
			height: 44rem;
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
			.cate{
				font-size: 12rem;
				color: #333333;
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
				word-break: break-all;
				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
			}
			.time{
				white-space:normal;
			}
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
					width: 52rem;
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
				.xk{
					margin-left: 10rem;
					border-radius: 2rem;
					background: var(--color);
					width: 36rem;
					text-align: center;
					height: 20rem;
					line-height: 20rem;
					font-size: 12rem;
					color: #ffffff;
				}
			}
			.store_name{
				margin-left: 10rem;
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
	padding-top: 18rem;
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
	}
	.image_list {
		display: flex;
		flex-wrap: wrap;
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
</style>
<script>
	import QuillEditor from '../components/quill_editor.vue'
	import UploadFile from '../components/upload_file.vue'
	export default{
		data(){
			return{
				image_dialog:false,
				show_select:false,		//选款弹窗
				store_list:[{
					name:'店铺1',
					id:'1'
				},{
					name:'店铺2',
					id:'2'
				},{
					name:'店铺3',
					id:'3'
				}],						//店铺列表
				store_ids:[],			//选中的店铺
				need_type:[{
					name:'上架',
					id:'1'
				},{
					name:'调样',
					id:'2'
				},{
					name:'拍摄',
					id:'3'
				},{
					name:'其他',
					id:'4'
				}],						//需求类型列表
				need_type_id:"",		//选中的需求类型
				delivery_type_list:[{
					name:'发货类型1',
					id:'1'
				},{
					name:'发货类型2',
					id:'2'
				},{
					name:'发货类型3',
					id:'3'
				}],						//发货类型列表
				delivery_type_ids:[],	//选中的发货类型
				date:"",				//需求日期
				price:"",				//售卖价格
				banner_list:[
				'http://img.92nu.com/DataCenter_202209081659447849.jpg',
				'http://img.92nu.com/DataCenter_202209080938036416.jpg',
				'http://img.92nu.com/DataCenter_202209080937367725.jpg',
				'http://img.92nu.com/DataCenter_202209080938036416.jpg',
				],
				active_index:0,			//当前显示的图片下标
				feekback_dialog:false,	//反馈弹窗
				feekback_value:"",		//反馈文字
				preview_images:[],		//上传的图片列表
				more_image_dialog:false,		//更多图片
				image_title_list:[{
					name:'风格图',
					id:'1'
				},{
					name:'封面图',
					id:'2'
				}],						//更多图片类型
				active_tab_index:0,		//选中的下标
				popover_img:false,	
				timer:null	
			}
		},
		props:{
			//单个商品
			info:{
				type:Object,
				default:{}
			}
		},
		methods:{
			//点击加入购物车
			addCar(){
				let arg = {
					goods_items:[],
					type:'add'
				}
				arg.goods_items.push(this.info)
				this.$store.commit('setCarGoods',arg);
				localStorage.setItem("car_goods",JSON.stringify(this.$store.state.car_goods));
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
				console.log(v)
			},
			//点击反馈
			feekBack(){
				this.feekback_dialog = true;
			},
			//上传图片回调
			callbackFn(v) {
				v.file.show_icon = false;
				this.preview_images.push(v.file);
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
    		//切换图片类型
    		checkImageType(tab, event) {
    			console.log(tab.name);
    		},
    		//点击跳转详情
    		getDetail(){
    			const routeData = this.$router.resolve(`/goods_detail`);
    			window.open(routeData.href);
    		}
    	},
    	components:{
    		QuillEditor,
    		UploadFile
    	}
    }
</script>







