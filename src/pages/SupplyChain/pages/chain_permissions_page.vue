<template>
	<div class="chain_page_content">
		<div class="permission_tab">
			<div class="tab_item" :class="{'active_tab_item':active_index == index}" v-for="(item,index) in tab_list" @click="active_index = index">
				<div>{{item.menu_name}}</div>
				<div class="active_line" v-if="active_index == index"></div>
			</div>
		</div>
		<UserTable v-if="web_url == 'user_table'"/>
		<RoleTable v-if="web_url == 'role_table'"/>
		<EntryTable v-if="web_url == 'entry_table'"/>
	</div>
</template>
<script>
	import TableTitle from '../components/table_title.vue'
	import PaginationWidget from '../../../components/pagination_widget.vue'

	import UserTable from './PermissionPages/user_table.vue'
	import RoleTable from './PermissionPages/role_table.vue'
	import EntryTable from './PermissionPages/entry_table.vue'
	export default{
		data(){
			return{
				tab_list:[],	//顶部导航列表
				active_index:0,			//当前选中的导航下标
				web_url:"",
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
				return item.web_url == 'chain_permissions_page';
			});
			this.tab_list = child_arr[0].list;
			this.web_url = this.tab_list[0].web_url;
		},
		components:{
			TableTitle,
			PaginationWidget,
			UserTable,
			RoleTable,
			EntryTable
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
	.permission_tab{
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









