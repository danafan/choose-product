<template>
	<div class="goods_info">
		<div class="goods_name">男式防紫外线轻薄便携连帽防晒外套男式防紫外线轻薄便携连帽防晒外套男式防紫外线轻薄便携连帽防晒外套</div>
		<div class="info_content">
			<div class="content_row">
				<div class="row_lable">成本价</div>
				<div class="row_price">¥56.88</div>
			</div>
			<div class="content_row">
				<div class="row_lable">款式编码</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">款号</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">类目</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">分类</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">颜色</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">尺码</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
			<div class="content_row">
				<div class="row_lable">面料</div>
				<div class="row_value">五月五IEu人员68374</div>
			</div>
		</div>
		<div class="button_row">
			<div class="button_item add" @click="addCar">
				<img class="add_car" src="../../../static/add_car.png">
				<div>加入选中</div>
			</div>
			<div class="button_item select" @click="show_select = true">
				<div>立即选款</div>
			</div>
		</div>
		<!-- 选款弹窗 -->
		<el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" destroy-on-close :visible.sync="show_select">
			<div slot="title" class="dialog_title">
				<div>选款</div>
				<img class="close_icon" src="../../../static/close_icon.png" @click="show_select = false">
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
	</div>
</template>
<script>
	import QuillEditor from '../../../components/quill_editor.vue'
	export default{
		data(){
			return{
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
			}
		},
		methods:{
			//点击加入购物车
			addCar(){
				// let arg = {
				// 	goods_items:[],
				// 	type:'add'
				// }
				// arg.goods_items.push(this.info)
				// this.$store.commit('setCarGoods',arg);
				// localStorage.setItem("car_goods",JSON.stringify(this.$store.state.car_goods));
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
}
</style>