<template>
	<div class="chain_page_content">
		<div class="setting_tab">
			<div class="tab_item" :class="{'active_tab_item':active_index == index}" v-for="(item,index) in tab_list" @click="active_index = index">
				<div>{{item}}</div>
				<div class="active_line" v-if="active_index == index"></div>
			</div>
		</div>
		<CategoryTable v-if="active_index == 0"/>
		<ClassTable v-if="active_index == 1"/>
		<StyleTable v-if="active_index == 2"/>
		<SeasonTable v-if="active_index == 3"/>
	</div>
</template>
<script>
	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'
	import CategoryTable from './SettingPages/category_table.vue'
	import ClassTable from './SettingPages/class_table.vue'
	import StyleTable from './SettingPages/style_table.vue'
	import SeasonTable from './SettingPages/season_table.vue'
	export default{
		data(){
			return{
				tab_list:['类目','分类','风格','季节'],	//顶部导航列表
				active_index:0,			//当前选中的导航下标
				card_height:0,			//card的高度
			}
		},
		components:{
			TableTitle,
			PaginationWidget,
			CategoryTable,
			ClassTable,
			StyleTable,
			SeasonTable
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
			width: 50rem;
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









