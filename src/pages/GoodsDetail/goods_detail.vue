<template>
	<div class="padding_page white_back" :class="{'mobile_total_width':windowWidth <= 750}" ref="paddingPageContent">
		<div class="padding_page_content" :class="{'mobile_width':windowWidth <= 750}">
			<PageTitle title="选品详情"/>
			<div class="detail_content">
				<div class="detail_top_row">
					<!-- 主图部分 -->
					<MainImage :image_list="banner_list" :checkStatus="goods_info.check_status" v-if="over_loading && domain"/>
					<!-- 商品信息 -->
					<GoodsInfo :goods_info="goods_info"/>
					<!-- 店铺信息 -->
					<div>
						<StoreInfo :goods_info="goods_info"/>
					</div>
				</div>
				<div class="flex as">
					<!-- 推荐商品 -->
					<div class="recommended" v-if="goods_info.recommend_list.length > 0">
						<div class="recommended_title" :class="{'delist_recommended_title':goods_info.check_status == 5}">推荐商品</div>
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
							<div class="content_top_tab_item" :class="[{'active_content_top_tab_item':goods_info.check_status != 5 &&active_index == 0},{'delist_active_content_top_tab_item':goods_info.check_status == 5 && active_index == 0}]" @click="active_index = 0">详情</div>
							<div class="content_top_tab_item" :class="[{'active_content_top_tab_item':goods_info.check_status != 5 &&active_index == 1},{'delist_active_content_top_tab_item':goods_info.check_status == 5 && active_index == 1}]" @click="active_index = 1">销售店铺</div>
						</div>
						<TabDetail :goods_info="goods_info" v-if="active_index == 0 && over_loading && domain"/>
						<SalenumChart :style_id="goods_info.style_id" v-if="active_index == 1"/>
					</div>
				</div>
			</div>
			<FixedButtons :permission="[3,4,5]" :style_id="style_id" @scrollTopCallback="setScrollTop"/>
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
	import SalenumChart from './components/salenum_chart.vue'
	import FixedButtons from '../../components/fixed_buttons.vue'
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
			console.log(this.windowWidth)
			this.style_id = this.$route.query.style_id;
			//获取商品详情
			this.getGoodsInfo();
		},
		computed:{
			//图片前缀
			domain(){
				return this.$store.state.domain;
			},
			//屏幕宽度
			windowWidth(){
				return this.$store.state.windowWidth;
			},
		},
		methods:{
			setScrollTop(){
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
						//处理海澜和jeep
						let brand_ksbm = this.goods_info.brand_ksbm;
						if(!brand_ksbm){
							this.goods_info['hl_ksbm'] = '';
							this.goods_info['jeep_ksbm'] = '';
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
						//处理banner图片
						let banner = this.goods_info.banner;
						let banner_list = [];
						banner.map((item,index) => {
							let img_obj = {
								// url:this.domain + item,
								url:item,
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
			//给海澜和jeep赋值
			setHJValue(name){
				var name_arr = name.split('_');
				if(name_arr[0] == '海澜'){
					this.goods_info['hl_ksbm'] = name_arr[1].replaceAll(",", ";")
				}else if(name_arr[0] == 'JEEP'){
					this.goods_info['jeep_ksbm'] = name_arr[1].replaceAll(",", ";")
				}
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
			SalenumChart,
			FixedButtons
		}
	}
</script>
<style lang="less" scoped>
	.white_back{
		background: #ffffff;
		overflow-y: scroll;
	}
	.white_back::-webkit-scrollbar{display:none}
	.padding_page_content{
		height: 100%;
		width: 1430rem;
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
				.delist_recommended_title{
					color: #494744;
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
					.delist_active_content_top_tab_item{
						border:1px solid #494744;
						background: #ffffff;
						color: #494744;
					}
				}
			}
		}
	}
	.mobile_total_width{
		width: 1920px;
		height: 100%;
	}
	.mobile_width{
		width: 1430px;
		height: 100%;
	}
</style>
