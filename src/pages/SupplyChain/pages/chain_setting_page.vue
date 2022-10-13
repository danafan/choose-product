<template>
	<div class="chain_page_content">
		<div class="setting_tab">
			<div class="tab_item" :class="{'active_tab_item':active_index == index}" v-for="(item,index) in tab_list" @click="active_index = index">
				<div>{{item.menu_name}}</div>
				<div class="active_line" v-if="active_index == index"></div>
			</div>
		</div>
		<CategoryTable v-if="web_url == 'category_table'"/>
		<ClassTable v-if="web_url == 'class_table'"/>
		<StyleTable v-if="web_url == 'style_table'"/>
		<SeasonTable v-if="web_url == 'season_table'"/>
	</div>
</template>
<script>
	import CategoryTable from './SettingPages/category_table.vue'
	import ClassTable from './SettingPages/class_table.vue'
	import StyleTable from './SettingPages/style_table.vue'
	import SeasonTable from './SettingPages/season_table.vue'
	export default{
		data(){
			return{
				tab_list:[],	//顶部导航列表
				active_index:0,			//当前选中的导航下标
				web_url:""
			}
		},
		watch:{
			active_index:function(n,o){
				this.web_url = this.tab_list[n].web_url;
			}
		},
		computed: {
			menu_arr() {
				return this.$store.state.menu_list;
			}
		},
		created(){
			let new_menu_list = [];
			let arr = this.menu_arr.filter(item => {
				return item.web_url == 'supply_chain';
			});
			let child_list = arr[0].list;
			let child_arr = child_list.filter(item => {
				return item.web_url == 'chain_setting_page';
			});
			let tab_list = child_arr[0].list;
			tab_list.some((item, i) => {
				if (item.web_url == 'edit_record') {
					tab_list.splice(i, 1)
    				return true //当内部return true时跳出整个循环
    			}
    		})
    		this.tab_list = tab_list;
			this.web_url = this.tab_list[0].web_url;
		},
		components:{
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
			cursor:pointer;
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









