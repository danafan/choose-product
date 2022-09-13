<template>
	<div class="padding_page white_back">
		<div class="padding_page_content">
			<PageTitle title="选品详情"/>
			<div class="detail_content">
				<div class="detail_top_row">
					<div class="image_box">
						<el-image :z-index="2006" class="goods_image" :src="current_image_list[0]" fit="contain" :preview-src-list="current_image_list"></el-image>
						<div class="img_list_title">图片列表</div>
						<el-carousel class="carousel_box" :autoplay="false" indicator-position="none" arrow="never">
							<el-carousel-item v-for="(item,index) in image_list">
								<div class="carousel_item">
									<el-image class="img_list_item" :class="{'border_style':iii.is_active == true}" :src="iii.url" fit="contain" v-for="(iii,i) in item" @mouseenter="enterImage(index,i)"></el-image>
									<div class="img_list_item" v-for="i in (5-item.length%5==0?5:item.length%5)"></div>
								</div>
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="goods_info"></div>
					<div class="store_info"></div>
				</div>
				ds
			</div>
		</div>
	</div>
</template>
<script>
	import PageTitle from '../../components/page_title.vue'
	export default{
		data(){
			return{
				current_image_list:['http://img.92nu.com/DataCenter_202209021557051929.jpg'],			//当前展示的图片列表
				image_list:[[{
					url:'http://img.92nu.com/DataCenter_202209021557051929.jpg',
					is_active:false
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
				}]],
			}
		},
		methods:{
			//鼠标移入小图
			enterImage(index,i){
				this.image_list.map((item,item_index) => {
					item.map((iii,iii_i) => {
						if(index == item_index && i == iii_i){
							iii.is_active = true;
							this.current_image_list[0] = iii.url;
						}else{
							iii.is_active = false;
						}
					})
				});
			}
		},
		components:{
			PageTitle
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
	.detail_content{
		border:1px solid red;
		flex:1;
		padding-left: 100rem;
		.detail_top_row{
			display: flex;
			justify-content: space-between;
			.image_box{
				border: 1px solid #E8E8E8;
				width: 420rem;
				.goods_image{
					width: 420rem;
					height: 420rem;
				}
				.img_list_title{
					padding-left: 20rem;
					height: 38rem;
					line-height: 38rem;
					font-size: 12rem;
					color: #333333;
				}
				.carousel_box{
					height: 76rem !important;
					.carousel_item{
						width: 420rem;
						display: flex;
						justify-content: space-between;
						.img_list_item{
							width: 76rem;
							height: 76rem;
						}
						.border_style{
							border:1px solid var(--color);
						}
					}
				}
				
			}
			.goods_info{
				border: 1px solid #E8E8E8;
				width: 512rem;
			}
			.store_info{
				border: 1px solid #E8E8E8;
				width: 198rem;
			}
		}
	}
}
</style>
