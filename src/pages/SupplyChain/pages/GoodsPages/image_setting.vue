<template>
	<div class="chain_page_content">
		<div class="setting_tab">
			<div class="tab_item" :class="{'active_tab_item':active_index == index}" v-for="(item,index) in tab_list" @click="active_index = index">
				<div>{{item}}</div>
				<div class="active_line" v-if="active_index == index"></div>
			</div>
		</div>
		<StyleTable :style_id="style_id" :style_name="style_name" v-if="active_index == 0"/>
		<GoodsTable :style_id="style_id" :style_name="style_name" v-if="active_index == 1"/>
	</div>
</template>
<script>
	import StyleTable from './ImageSetting/style_table.vue'
	import GoodsTable from './ImageSetting/goods_table.vue'
	export default{
		data(){
			return{
				style_id:"",					//商品ID
				style_name:"",
				tab_list:['风格图'],		//顶部导航列表
				active_index:0,					//当前选中的导航下标
			}
		},
		created(){
			this.style_id = this.$route.query.style_id;
			this.style_name = this.$route.query.style_name;
		},
		components:{
			StyleTable,
			GoodsTable,
		}
	}
</script>
<style lang="less" scoped>
.chain_page_content{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 24rem;
	display: flex;
	flex-direction: column;
	.setting_tab{
		margin-bottom: 18rem;
		background: #ffffff;
		width: 100%;
		height: 64rem;
		display: flex;
		padding-left: 30rem;
		.tab_item{
			margin-right: 170rem;
			position: relative;
			height: 64rem;
			line-height: 64rem;
			width: 80rem;
			text-align: center;
			font-size: 16rem;
			color: #333333;
			font-weight: bold;
			.active_line{
				background: var(--color);
				position: absolute;
				left: 0;
				bottom:0;
				width: 100%;
				height: 2px;
			}
		}
		.active_tab_item{
			color:var(--color);
		}
	}
}
</style>









