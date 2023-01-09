<template>
	<div>
		<el-table :show-header="false" :data="selected_record">
			<el-table-column width="220" prop="shop_name" label="店铺">
				<template slot-scope="scope">
					<div>{{scope.row.shop_name}}：{{scope.row.ding_user_name}}</div>
				</template>
			</el-table-column>
			<el-table-column width="140" label="销量" align="center">
				<template slot-scope="scope">
					<div class="num">30天销量 {{scope.row.sales_num}}</div>
				</template>
			</el-table-column>
			<el-table-column width="180" prop="select_time" label="时间" align="center"></el-table-column>
		</el-table>
	</div>
</template>
<script>
	export default{
		props:{
			//选中记录
			selected_record:{
				type:Array,
				default:[]
			}
		}
	}
</script>
<style lang="less" scoped>
.num{
	color: var(--color);
	font-size: 12rem;
}
</style>