<template>
	<div class="page_title">
		{{title}}
	</div>
</template>
<style lang="less" scoped>
.page_title{
	height: 64rem;
	line-height: 64rem;
	width: 100%;
	display: flex;
	align-items: center;
	font-size: 20rem;
	color: var(--color);
	font-weight: bold;
}
</style>
<script>
	export default{
		props:{
			title:{
				type:String,
				default:""
			}
		}
	}
</script>