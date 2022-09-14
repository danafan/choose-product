<template>
	<div>
		<el-table :show-header="false" :data="selected_record">
			<el-table-column width="220" prop="store_name" label="店铺" show-overflow-tooltip></el-table-column>
			<el-table-column width="140" label="销量" align="center">
				<template slot-scope="scope">
					<div class="num">销量 {{scope.row.num}}</div>
				</template>
			</el-table-column>
			<el-table-column width="180" prop="time" label="时间" align="center"></el-table-column>
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