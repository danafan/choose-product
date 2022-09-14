<template>
	<div>
		<div class="detail_info">
			<div class="info_box">
				<div>浏览量：95次</div>
				<div>销量：95件</div>
			</div>
			<div class="info_box">
				<div>选中量：95</div>
				<div>市场：杭州</div>
			</div>
			<div class="info_box">
				<div>提供拍照：是</div>
				<div>&nbsp</div>
			</div>
		</div>
		<div class="style_row">
			<div class="style_item">拍摄风格：</div>
			<div class="style_item" :class="{'active_style_item':active_style_index == index}" v-for="(item,index) in style_list" @click="active_style_index = index">平铺</div>
		</div>
		<div class="source_box">
			<div class="source_item">共享盘：www.xinyifu.com</div>
			<div class="source_item">百度网盘：www.xinyifu.com</div>
		</div>
		<div class="image_box">
			<el-image :z-index="2006" class="style_image" :src="item" fit="contain" :preview-src-list="style_image_list" v-for="item in style_image_list"></el-image>
			<div class="style_image" v-if="style_image_list.length%2 > 0"></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				active_style_index:0,			//当前选中的风格下标
			}
		},
		props:{
			//风格列表
			style_list:{
				type:Array,
				default:[]
			},
			//下面图片列表
			style_image_list:{
				type:Array,
				default:[]
			}
		}
	}
</script>
<style lang="less" scoped>
.detail_info{
	padding-left: 12rem;
	display: flex;
	.info_box{
		width: 210rem;
		height: 85rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-evenly;
		font-size: 12rem;
		color: #333333;
	}
}
.style_row{
	border-top: 1px solid #E5E5E5;
	border-bottom: 1px solid #E5E5E5;
	background: #F6F6F6;
	height: 32rem;
	display: flex;
	font-size:12rem;
	color: #333333;
	.style_item{
		border-left: 1px solid #E5E5E5;
		border-right: 1px solid #E5E5E5;
		padding-left: 24rem;
		padding-right: 24rem;
		height: 32rem;
		line-height: 32rem;
	}
	.active_style_item{
		border:1px solid var(--color);
		background: #ffffff;
		color: var(--color);
	}
}
.source_box{
	border-bottom: 1px solid #E5E5E5;
	height: 52rem;
	display: flex;
	align-items: center;
	padding-left:12rem;
	font-size: 12rem;
	color: #333333;
	.source_item{
		margin-right: 66rem;
	}
}
.image_box{
	padding-top: 30rem;
	padding-bottom: 30rem;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	.style_image{
		margin-bottom: 25rem;
		width: 520rem;
	}
}
</style>











