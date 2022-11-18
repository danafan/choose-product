<template>
	<div class="back_row" @click="$router.go(-1)">
		<img class="page_back_icon" src="../static/page_back_icon.png">
		返回
	</div>
</template>
<style lang="less" scoped>
.back_row{
	border-radius: 2rem;
	background: var(--color);
	width: 80rem;
	height: 32rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size:14rem;
	color: #ffffff;
	cursor:pointer;
	.page_back_icon{
		margin-right: 4rem;
		width: 16rem;
		height: 16rem;
	}
}
</style>
<script>
	export default{
		name:'go_back'
	}
</script>