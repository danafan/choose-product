<template>
	<div class="padding_page white_back">
		<div class="padding_page_content">
			<PageTitle title="选品详情"/>
			<div class="detail_content">
				<div class="detail_top_row">
					<!-- 主图部分 -->
					<MainImage :image_list="image_list"/>
					<GoodsInfo/>
					<StoreInfo/>
				</div>
				ds
			</div>
			<CarWidget/>
			<FeekbackWidget/>
		</div>
	</div>
</template>
<script>
	import PageTitle from '../../components/page_title.vue'
	import MainImage from './components/main_image.vue'
	import GoodsInfo from './components/goods_info.vue'
	import StoreInfo from './components/store_info.vue'
	import CarWidget from '../../components/car_widget.vue'
	import FeekbackWidget from '../../components/feekback_widget.vue'
	export default{
		data(){
			return{
				image_list:[[{
					url:'http://img.92nu.com/DataCenter_202209021557051929.jpg',
					is_active:true
				},{
					url:'http://img.92nu.com/DataCenter_202209021613479967.jpg',
					is_active:false
				},{
					url:'http://img.92nu.com/DataCenter_202209061504027316.jpg',
					is_active:false
				},{
					url:'http://img.92nu.com/DataCenter_202209061744551069.jpg',
					is_active:false
				},{
					url:'http://img.92nu.com/DataCenter_202208311020224346.jpg',
					is_active:false
				}],[{
					url:'http://img.92nu.com/DataCenter_202208311330183144.jpg',
					is_active:false
				},{
					url:'http://img.92nu.com/DataCenter_202209081717555858.jpg',
					is_active:false
				},{
					url:'http://img.92nu.com/DataCenter_202209011650464990.jpg',
					is_active:false
				}]],					//所有图片列表
			}
		},
		methods:{
			
		},
		components:{
			PageTitle,
			MainImage,
			GoodsInfo,
			StoreInfo,
			CarWidget,
			FeekbackWidget
		}
	}
</script>
<style lang="less" scoped>
.white_back{
	background: #ffffff;
}
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.detail_content{
		border:1px solid red;
		flex:1;
		padding-left: 100rem;
		.detail_top_row{
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
