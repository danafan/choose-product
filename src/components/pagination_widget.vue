<template>
	<div class="page">
		<el-pagination small background @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="slot, prev, pager, next" :total="total">
			<div class="index_button" @click="handleCurrentChange(1)">首页</div>
		</el-pagination>
		<el-pagination small background @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="slot,jumper" :total="total">
			<div class="page_toast">{{page}}/{{Math.floor(total/pagesize) + (total%pagesize>0?1:0)}}</div>
		</el-pagination>
		<div class="page_toast">共{{total}}条</div>
	</div>
</template>
<style lang="less" scoped>
.page{
	margin-top: 10px;
	display:flex;
	align-items: center;
	justify-content: flex-end;
}
.el-pagination{
	display: flex;
	align-items: center;
}
.index_button{
	background: #f4f4f5;
	border-radius: 4px;
	width: 50px;
	text-align: center;
	height: 22px;
	line-height: 22px;
	font-size: 12px;
	color: #606266;
	cursor:pointer;
}
.page_toast{
	font-size: 12px;
	color: #606266;
}
</style>
<script>
	export default{
		props:{
			page:{
				type:Number,
				default:1
			},
			pagesize:{
				type:Number,
				default:10
			},
			total:{
				type:Number,
				default:0
			}
		},
		methods:{
			//翻页
			handleCurrentChange(val) {
				this.$emit('checkPage',val);
			},
		}
	}
</script>













