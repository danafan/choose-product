<template>
	<div class="table_title">
		<div class="table_title_text">{{title}}</div>
		<div class="button_row">
			<slot></slot>
		</div>
	</div>
</template>
<style lang="less" scoped>
.table_title{
	margin-bottom: 10rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.table_title_text{
		font-size: 14rem;
		font-weight: 500;
		color: #333333;
	}
	.button_row{
		display: flex;
		align-items: center;
	}
}
</style>
<script>
	export default{
		props:{
			//标题文字
			title:{
				type:String,
				default:""
			}
		}
	}
</script>