<template>
	<div class="back_widget">
		<img class="back_icon" src="../static/feekback_icon.png">
		<div class="back_text">反馈</div>
	</div>
</template>
<script>
	export default{
		
	}
</script>
<style lang="less" scoped>
.back_widget{
	position: absolute;
	top: 60%;
	right: -80rem;
	width: 60rem;
	height: 60rem;
	background: #FFFFFF;
	box-shadow: 0px 2px 11px 0px #FFEAD8;
	border-radius: 30rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 9;
	.back_icon{
		margin-bottom: 2rem;
		width: 25rem;
		height: 26rem;
	}
	.back_text{
		color: #333333;
		font-size: 12rem;
	}
}
</style>