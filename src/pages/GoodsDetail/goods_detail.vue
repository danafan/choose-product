<template>
	<div class="padding_page white_back" ref="paddingPageContent" id="white_back">
		<div class="padding_page_content">
			<PageTitle title="选品详情"/>
			<div class="detail_content">
				<div class="detail_top_row">
					<!-- 主图部分 -->
					<MainImage :image_list="banner_list" v-if="over_loading"/>
					<!-- 商品信息 -->
					<GoodsInfo :goods_info="goods_info"/>
					<!-- 店铺信息 -->
					<StoreInfo :goods_info="goods_info"/>
				</div>
				<div class="flex as">
					<!-- 推荐商品 -->
					<div class="recommended" v-if="goods_info.recommend_list.length > 0">
						<div class="recommended_title">推荐商品</div>
						<div class="flex fc ac">
							<div class="li-item" v-for="(item, index) in goods_info.recommend_list" :key="index" @click="getDetail(item.style_id)">
								<el-image class="goods_img" :src="domain + item.img" fit="scale-down"></el-image>
								<div class="hot_sell_item_price">¥{{item.cost_price}}</div>
								<div class="hot_sell_item_title table_header_text">{{item.title}}</div>
							</div>
						</div>
					</div>
					<!-- 右侧内容 -->
					<div class="bottom_content flex-1">
						<div class="content_top_tab">
							<div class="content_top_tab_item" :class="{'active_content_top_tab_item':active_index == 0}" @click="active_index = 0">详情</div>
							<div class="content_top_tab_item" :class="{'active_content_top_tab_item':active_index == 1}" @click="active_index = 1">选中记录</div>
						</div>
						<TabDetail :goods_info="goods_info" v-if="active_index == 0 && over_loading"/>
						<TabRecord :selected_record="goods_info.info_log" v-if="active_index == 1"/>
					</div>
				</div>
			</div>
			<img class="scroll_top_icon" src="../../static/scroll_top_icon.png" @click="setScrollTop">
			<CarWidget :is_fixed="true"/>
			<FeekbackWidget :style_id="style_id" :is_fixed="true"/>
		</div>
	</div>
</template>
<script>
	import resource from '../../api/resource.js'

	import PageTitle from '../../components/page_title.vue'
	import MainImage from './components/main_image.vue'
	import GoodsInfo from './components/goods_info.vue'
	import StoreInfo from './components/store_info.vue'
	import TabDetail from './components/tab_detail.vue'
	import TabRecord from './components/tab_record.vue'
	import CarWidget from '../../components/car_widget.vue'
	import FeekbackWidget from '../../components/feekback_widget.vue'
	export default{
		data(){
			return{
				over_loading:false,	//是否加载完成
				style_id:"",		//商品ID
				goods_info:{},		//商品详情
				banner_list:[],		//所有图片列表
				active_index:0,		//详情或选中记录下标
			}
		},
		created(){
			this.style_id = this.$route.query.style_id;
			//获取商品详情
			this.getGoodsInfo();
		},
		
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			}
		},
		methods:{
			setScrollTop(){
				console.log(this.$refs.paddingPageContent.scrollTop)
				this.$refs.paddingPageContent.scrollTop = 0;
			},
			//获取商品详情
			getGoodsInfo(){
				let arg = {
					style_id:this.style_id
				}
				resource.getGoodsInfo(arg).then(res => {
					if(res.data.code == 1){
						this.goods_info = res.data.data;
						//处理banner图片
						let banner = this.goods_info.banner;
						let banner_list = [];
						banner.map((item,index) => {
							let img_obj = {
								url:this.domain + item,
								is_active:index == 0?true:false
							}
							banner_list.push(img_obj);
						})
						let newCardList = [];
						for (var i = 0; i < banner_list.length; i += 5) {
							newCardList.push(banner_list.slice(i, i + 5));
						}
						this.banner_list = newCardList;
						this.over_loading = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击跳转详情
			getDetail(style_id){
				let active_path = `/goods_detail?style_id=${style_id}`;
				const routeData = this.$router.resolve(active_path);
				window.open(routeData.href);
			}
		},
		components:{
			PageTitle,
			MainImage,
			GoodsInfo,
			StoreInfo,
			TabDetail,
			TabRecord,
			CarWidget,
			FeekbackWidget
		}
	}
</script>
<style lang="less" scoped>
	.white_back{
		background: #ffffff;
		overflow-y: scroll;
	}
	.padding_page_content{
		width: 1330rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		.detail_content{
			flex:1;
			padding-left: 100rem;
			.detail_top_row{
				display: flex;
				justify-content: space-between;
			}
			.recommended{
				margin-top: 20rem;
				border: 1px solid #E5E5E5;
				margin-right: 10px;
				width: 254px;
				background: #F6F6F6;
				padding-bottom: 10px;
				.recommended_title{
					border-bottom: 1px solid #E5E5E5;
					text-align: center;
					height: 44rem;
					line-height: 44rem;
					font-size: 12px;
					color: #F37605;
				}
				.li-item {
					padding-top: 10px;
					margin-top: 10px;
					background: #ffffff;
					width: 234px;
					.goods_img{
						width: 234px;
						height: 234px;
					}
					.hot_sell_item_price{
						line-height: 22px;
						width: 100%;
						text-align: center;
						color: #F37605;
						font-size: 18px;
						font-weight: bold;
					}
					.hot_sell_item_title{
						padding-left: 8px;
						padding-right: 8px;
						width: 100%;
						text-align: center;
						font-size: 12px;
						line-height: 30px;
						color: #333333;
					}
				}
			}
			.bottom_content{
				margin-top: 20rem;
				border:1px solid #E5E5E5;
				.content_top_tab{
					background: #F6F6F6;
					width: 100%;
					height: 44rem;
					display: flex;
					.content_top_tab_item{
						border-left:1px solid #E5E5E5;
						border-right:1px solid #E5E5E5;
						height: 44rem;
						line-height: 44rem;
						padding-left: 60rem;
						padding-right: 60rem;
						font-size: 12rem;
						color: #333333;
						cursor:pointer;
					}
					.active_content_top_tab_item{
						border:1px solid var(--color);
						background: #ffffff;
						color: var(--color);
					}
				}
			}
		}
	}
	.white_back::-webkit-scrollbar{display:none}
	.scroll_top_icon{
		position: fixed;
		top: 40%;
		right: 8rem;
		width: 82rem;
		height: 82rem;
		z-index: 9;
		cursor:pointer;
	}
</style>
