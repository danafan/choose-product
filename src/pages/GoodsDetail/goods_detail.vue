<template>
	<div class="padding_page white_back">
		<div class="padding_page_content">
			<PageTitle title="选品详情"/>
			<div class="detail_content">
				<div class="detail_top_row">
					<!-- 主图部分 -->
					<MainImage :image_list="image_list"/>
					<!-- 商品信息 -->
					<GoodsInfo/>
					<!-- 店铺信息 -->
					<StoreInfo/>
				</div>
				<div class="bottom_content">
					<div class="content_top_tab">
						<div class="content_top_tab_item" :class="{'active_content_top_tab_item':active_index == 0}" @click="active_index = 0">详情</div>
						<div class="content_top_tab_item" :class="{'active_content_top_tab_item':active_index == 1}" @click="active_index = 1">选中记录</div>
					</div>
					<TabDetail :style_list="style_list" :style_image_list="style_image_list" v-if="active_index == 0"/>
					<TabRecord :selected_record="selected_record" v-if="active_index == 1"/>
				</div>
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
	import TabDetail from './components/tab_detail.vue'
	import TabRecord from './components/tab_record.vue'
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
				active_index:0,			//详情或选中记录下标
				style_list:[{
					name:'平铺',
					id:'1'
				},{
					name:'背景墙',
					id:'2'
				}],						//风格列表
				style_image_list:[
				'http://img.92nu.com/DataCenter_202209011650464990.jpg',
				'http://img.92nu.com/DataCenter_202209081717555858.jpg',
				'http://img.92nu.com/DataCenter_202208311330183144.jpg',
				'http://img.92nu.com/DataCenter_202208311020224346.jpg',
				'http://img.92nu.com/DataCenter_202209061744551069.jpg',
				'http://img.92nu.com/DataCenter_202209061504027316.jpg',
				'http://img.92nu.com/DataCenter_202209021613479967.jpg',
				],						//底部的图片列表
				selected_record:[{
					store_name:'胖胖哥旗舰店：张三',
					num:'56' ,
					time:"2022-09-09 15:00"
				},{
					store_name:'胖胖哥旗舰店：张三',
					num:'56' ,
					time:"2022-09-09 15:00"
				},{
					store_name:'胖胖哥旗舰店：张三',
					num:'56' ,
					time:"2022-09-09 15:00"
				}],						//选中记录
			}
		},
		methods:{
			
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
}
.padding_page_content{
	width: 1440rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.detail_content{
		flex:1;
		overflow-y: scroll;
		padding-left: 100rem;
		.detail_top_row{
			display: flex;
			justify-content: space-between;
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
</style>
