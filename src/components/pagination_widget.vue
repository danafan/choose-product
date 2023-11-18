<template>
	<div class="pagination_widget flex ac" :class="[{'jsb':show_multiple},{'jse':!show_multiple}]">
		<div class="selection_length" v-if="show_multiple">已勾选 {{multiple_selection_num}} 项记录</div>
		<div class=" flex ac">
			<el-pagination small background @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="slot, prev, pager, next" :total="total">
				<div class="index_button" @click="handleCurrentChange(1)">首页</div>
			</el-pagination>
			<el-pagination small background @current-change="handleCurrentChange" :current-page="page" :page-size="pagesize" layout="slot,jumper" :total="total">
				<div class="page_toast">{{page}}/{{Math.floor(total/pagesize) + (total%pagesize>0?1:0)}}</div>
			</el-pagination>
			<div class="page_toast">共{{total}}条</div>
		</div>
	</div>
	
</template>
<style lang="less" scoped>
	.pagination_widget{
		width: 100%;
		height: 50rem;
	}
	.selection_length{
		font-weight: bold;
		color: var(--color);
		font-size: 12px;
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
			show_multiple:{
				type:Boolean,
				default:true
			},
			multiple_selection_num:{
				type:Number,
			default:0
			},
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













