<template>
	<div class="image_box">
		<el-image :z-index="2006" class="goods_image" :src="current_image_list[0]" fit="scale-down" :preview-src-list="current_image_list"></el-image>
		<div class="img_list_title">图片列表</div>
		<div class="carousel_content">
			<img class="detail_arrow" src="../../../static/detail_left.png" @click="checkBanner(-1)">
			<el-carousel class="carousel_box" :autoplay="false" indicator-position="none" arrow="never" ref="detail_carousel">
				<el-carousel-item v-for="(item,index) in image_list">
					<div class="carousel_item">
						<el-image class="img_list_item" :class="{'border_style':iii.is_active == true}" :src="iii.url" fit="scale-down" v-for="(iii,i) in item" @mouseenter="enterImage(index,i)"></el-image>
						<div class="img_list_item" v-for="i in (item.length==5?0:5-item.length)"></div>
					</div>
				</el-carousel-item>
			</el-carousel>
			<img class="detail_arrow" src="../../../static/detail_right.png" @click="checkBanner(1)">
		</div>
	</div>
</template>
<style lang="less" scoped>
.image_box{
	border: 1px solid #E8E8E8;
	width: 420rem;
	height: 546rem;
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
	.carousel_content{
		width: 420rem;
		display: flex;
		align-items: center;
		.detail_arrow{
			margin-left: 8rem;
			margin-right: 8rem;
			width: 17rem;
			height: 30rem;
		}
		.carousel_box{
			height: 66rem !important;
			flex: 1 !important;
			overflow-y: hidden;
			.carousel_item{
				display: flex;
				justify-content: space-between;
				.img_list_item{
					width: 66rem;
					height: 66rem;
				}
				.border_style{
					border:1px solid var(--color);
				}
			}
		}
	}
}
</style>
<script>
	export default{
		data(){
			return{
				current_image_list:[],			//当前展示的图片
				banner_active_index:0,			//当前小图下标
			}
		},
		props:{
			//所有图片列表
			image_list:{
				type:Array,
				default:[]
			}
		},
		created(){
			this.current_image_list[0] = this.image_list[0][0].url;
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
			},
			//切换轮播图
			checkBanner(i){
				if(i < 0){
					this.banner_active_index = this.banner_active_index == 0?0:this.banner_active_index + i;
				}else{
					this.banner_active_index = this.banner_active_index < this.image_list.length - 1?this.banner_active_index + i:this.image_list.length - 1;
				}
				this.$refs.detail_carousel.setActiveItem(this.banner_active_index);
			}
		}
	}
</script>













