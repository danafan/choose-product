<template>
	<div class="goods_item">
		<div class="image_box" v-if="info.img != ''">
			<el-image class="goods_img" fit="scale-down" :src="domain + info.img"></el-image>
	</div>
	<img class="image_box" src="../static/load_failure.png" v-else>
	<div class="goods_info">
		<div class="desc">{{info.title}}</div>
		<div class="price_cate">
			<div class="time">{{info.new_time_name}}</div>
			<div class="cate">{{info.style_name}}</div>
		</div>
		<div class="num_row">
			<div>浏览：{{info.views_num}}</div>
			<div>选中：{{info.select_num}}</div>
			<div>30天销量：{{info.sales_num_all}}</div>
		</div>
		<div class="img_list">
			<img class="info_icon" src="../static/tui_icon.png" v-if="info.supply_return_goods == 1">
			<img class="info_icon" src="../static/ru_icon.png" v-if="info.supply_warehousing == 1">
			<img class="info_icon" src="../static/huan_icon.png" v-if="info.supply_exchange_goods == 1">
			<img class="info_icon" src="../static/pai_icon.png" v-if="info.supply_photograph == 1">
			<img class="info_icon" src="../static/dai_icon.png" v-if="info.supply_replace_send == 1">
			<img class="info_icon" src="../static/xian_icon.png" v-if="info.supply_monthly_settlement == 0">
			<img class="info_icon" src="../static/yue_icon.png" v-if="info.supply_monthly_settlement == 1">
		</div>
	</div>
	
</div>
</template>
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
		.price_cate{
			margin-top: 12rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12rem;
			.time{
				color: #999999;
			}
			.cate{
				color: #333333;
			}
		}
		.num_row{
			margin-top: 14rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12rem;
			color: #999999;
		}
		.img_list{
			margin-top: 12rem;
			flex:1;
			display: flex;
			.info_icon{
				margin-right: 6rem;
				width: 20rem;
				height: 20rem;
			}
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				more_image_dialog:false,		//更多图片
				image_title_list:['风格图','封面图'],	//更多图片类型
				active_tab_index:0,		//选中的下标
				style_data:[],			//风格图数据
				commodity_data:[],		//封面图数据
				firstTime: '', 			// mousedown的时间戳
				lastTime: '', 			// mouseup的时间戳
				isClick: false, 		// false--禁止点击，true--可点击
			}
		},
		props:{
			//单个商品
			info:{
				type:Object,
				default:{}
			}
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods:{
			
    	}
    }
</script>







